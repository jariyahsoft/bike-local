import assert from "node:assert/strict";
import test from "node:test";

import type { AuditLogEntry } from "../../audit/domain/audit-log.js";
import { asIsoUtcDateTime } from "../../shared/domain/index.js";
import {
  IdentityService,
  type SerializedCurrentUserProfile,
} from "../application/identity-service.js";
import type {
  AppCheckTokenVerifier,
  FirebaseIdTokenVerifier,
  VerifiedAppCheckToken,
  VerifiedFirebaseIdToken,
} from "../application/security-pipeline.js";
import {
  createUserEndpoint,
  getMeEndpoint,
  requestAccountDeletionEndpoint,
  updateMeEndpoint,
} from "../api/onboarding-api.js";
import {
  InMemoryAuthIdentityRepository,
  InMemoryConsentRecordRepository,
  InMemoryUserRepository,
} from "../infrastructure/in-memory-identity-repositories.js";
import {
  RepositoryDomainUserResolver,
  RepositoryRoleAssignmentLookup,
} from "../infrastructure/repository-security-context.js";

class InMemoryAuditLogWriter {
  readonly entries: AuditLogEntry[] = [];

  async append(entry: AuditLogEntry): Promise<void> {
    this.entries.push(entry);
  }
}

const expectData = (response: {
  readonly body: unknown;
}): SerializedCurrentUserProfile => {
  assert.equal(typeof response.body, "object");
  assert.notEqual(response.body, null);
  const body = response.body as Record<string, unknown>;
  assert.ok("data" in body);

  return body.data as SerializedCurrentUserProfile;
};

const expectError = (response: {
  readonly body: unknown;
}): { readonly code: string } => {
  assert.equal(typeof response.body, "object");
  assert.notEqual(response.body, null);
  const body = response.body as Record<string, unknown>;
  assert.ok("error" in body);

  return body.error as { readonly code: string };
};

const verifiedFirebaseToken: VerifiedFirebaseIdToken = {
  uid: "firebase_uid_1",
  email: "renter@example.com",
  phoneNumber: "+66000000001",
  claims: {
    firebase: {
      sign_in_provider: "password",
    },
  },
  issuedAt: asIsoUtcDateTime("2026-06-23T10:00:00Z"),
  expiresAt: asIsoUtcDateTime("2026-06-23T11:00:00Z"),
};

const verifiedAppCheckToken: VerifiedAppCheckToken = {
  appId: "bike-local-mobile",
  tokenId: "app-check-token-1",
  issuedAt: asIsoUtcDateTime("2026-06-23T10:00:00Z"),
  expiresAt: asIsoUtcDateTime("2026-06-23T11:00:00Z"),
};

const createTestContext = () => {
  const userRepository = new InMemoryUserRepository();
  const authIdentityRepository = new InMemoryAuthIdentityRepository();
  const consentRecordRepository = new InMemoryConsentRecordRepository();
  const auditLogWriter = new InMemoryAuditLogWriter();
  let userCounter = 0;
  let tenantCounter = 0;
  let authIdentityCounter = 0;
  let consentCounter = 0;

  const tokenVerifier: FirebaseIdTokenVerifier = {
    verifyIdToken: async (token) => {
      if (token !== "valid-token") {
        throw new Error("invalid token");
      }

      return verifiedFirebaseToken;
    },
  };

  const appCheckVerifier: AppCheckTokenVerifier = {
    verifyToken: async (token) => {
      if (token !== "valid-app-check") {
        throw new Error("invalid app check");
      }

      return verifiedAppCheckToken;
    },
  };

  const identityService = new IdentityService({
    userRepository,
    authIdentityRepository,
    consentRecordRepository,
    auditLogWriter,
    buildAuthIdentityId: () => `auth_${++authIdentityCounter}` as never,
    buildConsentRecordId: (type) =>
      `consent_${type}_${++consentCounter}` as never,
  });

  return {
    identityService,
    userRepository,
    authIdentityRepository,
    consentRecordRepository,
    auditLogWriter,
    apiDependencies: {
      security: {
        tokenVerifier,
        appCheckVerifier,
        userResolver: new RepositoryDomainUserResolver(
          authIdentityRepository,
          userRepository,
        ),
        roleLookup: new RepositoryRoleAssignmentLookup(userRepository),
      },
      identityService,
      now: () => asIsoUtcDateTime("2026-06-23T10:15:00Z"),
      buildUserId: () => `usr_${++userCounter}`,
      buildTenantId: () => `tenant_${++tenantCounter}`,
    },
  };
};

test("onboarding API happy path supports multi-role account, consent capture, and deletion request", async () => {
  const context = createTestContext();

  const created = await createUserEndpoint(
    {
      requestId: "req_create" as never,
      authorizationHeader: "Bearer valid-token",
      appCheckHeader: "valid-app-check",
      body: {
        display_name: "Demo Renter",
        locale: "en",
        selected_roles: ["RENTER"],
        consents: {
          terms: { version: "terms-2026-06" },
          privacy: { version: "privacy-2026-06" },
          gps: {
            version: "gps-2026-06",
            purpose: "ride_tracking_and_sos",
            background_allowed: true,
          },
          marketing: {
            version: "marketing-2026-06",
            granted: false,
            purpose: "campaign_updates",
          },
        },
      },
    },
    context.apiDependencies,
  );

  assert.equal(created.status, 201);
  const createdData = expectData(created);
  assert.deepEqual(createdData.roles, ["RENTER"]);
  assert.equal(createdData.locale, "en");
  assert.equal(createdData.auth_identities.length, 1);
  assert.equal(
    createdData.auth_identities[0]?.provider_subject_hint,
    "fi***_1",
  );
  assert.equal(createdData.consent_summaries.length, 4);

  const me = await getMeEndpoint(
    {
      requestId: "req_me" as never,
      authorizationHeader: "Bearer valid-token",
      appCheckHeader: "valid-app-check",
    },
    context.apiDependencies,
  );

  assert.equal(me.status, 200);
  const meData = expectData(me);
  assert.equal(meData.display_name, "Demo Renter");

  const updated = await updateMeEndpoint(
    {
      requestId: "req_update" as never,
      authorizationHeader: "Bearer valid-token",
      appCheckHeader: "valid-app-check",
      body: {
        version: meData.version as number,
        display_name: "Demo Renter Owner",
        additional_roles: ["STORE_OWNER"],
      },
    },
    context.apiDependencies,
  );

  assert.equal(updated.status, 200);
  const updatedData = expectData(updated);
  assert.deepEqual(updatedData.roles, ["RENTER", "STORE_OWNER"]);

  const deletion = await requestAccountDeletionEndpoint(
    {
      requestId: "req_delete" as never,
      authorizationHeader: "Bearer valid-token",
      appCheckHeader: "valid-app-check",
      body: {
        version: updatedData.version as number,
        reason: "user_requested_cleanup",
      },
    },
    context.apiDependencies,
  );

  assert.equal(deletion.status, 202);
  const deletionData = expectData(deletion);
  assert.equal(deletionData.status, "DELETION_REQUESTED");
  assert.equal(context.auditLogWriter.entries.length, 1);

  const profile = await context.identityService.getCurrentUserProfile(
    deletionData.id,
  );
  assert.equal(profile.authIdentities.length, 1);
  assert.equal(profile.consents.length, 4);
});

test("onboarding API rejects duplicate auth identity mapping", async () => {
  const context = createTestContext();

  await createUserEndpoint(
    {
      requestId: "req_create_1" as never,
      authorizationHeader: "Bearer valid-token",
      appCheckHeader: "valid-app-check",
      body: {
        display_name: "Demo Renter",
        locale: "en",
        selected_roles: ["RENTER"],
        consents: {
          terms: { version: "terms-2026-06" },
          privacy: { version: "privacy-2026-06" },
        },
      },
    },
    context.apiDependencies,
  );

  const duplicate = await createUserEndpoint(
    {
      requestId: "req_create_2" as never,
      authorizationHeader: "Bearer valid-token",
      appCheckHeader: "valid-app-check",
      body: {
        display_name: "Demo Duplicate",
        locale: "en",
        selected_roles: ["RENTER"],
        consents: {
          terms: { version: "terms-2026-06" },
          privacy: { version: "privacy-2026-06" },
        },
      },
    },
    context.apiDependencies,
  );

  assert.equal(duplicate.status, 409);
  assert.equal(expectError(duplicate).code, "AUTH_IDENTITY_ALREADY_LINKED");
});

test("identity APIs reject invalid token and invalid onboarding role selection", async () => {
  const context = createTestContext();

  const invalidToken = await createUserEndpoint(
    {
      requestId: "req_invalid_token" as never,
      authorizationHeader: "Bearer invalid-token",
      appCheckHeader: "valid-app-check",
      body: {
        display_name: "Invalid User",
        locale: "en",
        selected_roles: ["RENTER"],
        consents: {
          terms: { version: "terms-2026-06" },
          privacy: { version: "privacy-2026-06" },
        },
      },
    },
    context.apiDependencies,
  );

  assert.equal(invalidToken.status, 401);
  assert.equal(expectError(invalidToken).code, "AUTH_INVALID_TOKEN");

  const invalidRole = await createUserEndpoint(
    {
      requestId: "req_invalid_role" as never,
      authorizationHeader: "Bearer valid-token",
      appCheckHeader: "valid-app-check",
      body: {
        display_name: "Invalid Role User",
        locale: "th",
        selected_roles: ["PLATFORM_ADMIN" as never],
        consents: {
          terms: { version: "terms-2026-06" },
          privacy: { version: "privacy-2026-06" },
        },
      },
    },
    context.apiDependencies,
  );

  assert.equal(invalidRole.status, 422);
  assert.equal(expectError(invalidRole).code, "USER_ROLE_SELECTION_INVALID");
});

test("identity APIs reject missing authentication on self-service read", async () => {
  const context = createTestContext();

  const response = await getMeEndpoint(
    {
      requestId: "req_unauthenticated" as never,
    },
    context.apiDependencies,
  );

  assert.equal(response.status, 401);
  assert.equal(expectError(response).code, "AUTH_UNAUTHENTICATED");
});
