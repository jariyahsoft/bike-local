import assert from "node:assert/strict";
import test from "node:test";
import type { CorrelationId } from "../../shared/domain/index.js";
import type {
  AuthorizeRequestInput,
  VerifiedAppCheckToken,
  VerifiedFirebaseIdToken,
} from "../application/security-pipeline.js";
import { authorizeRequest } from "../application/security-pipeline.js";
import {
  mapSecurityErrorToApiResponse,
  SecurityError,
} from "../api/security-error.js";
import { evaluatePermission, type RoleAssignment } from "../domain/rbac.js";
import { asDomainId, asIsoUtcDateTime } from "../../shared/domain/index.js";

const baseFirebaseToken: VerifiedFirebaseIdToken = {
  uid: "firebase_uid_1",
  claims: {},
  issuedAt: asIsoUtcDateTime("2026-06-23T09:00:00Z"),
  expiresAt: asIsoUtcDateTime("2026-06-23T10:00:00Z"),
};

const baseAppCheckToken: VerifiedAppCheckToken = {
  appId: "app_mobile",
  tokenId: "app_check_1",
  issuedAt: asIsoUtcDateTime("2026-06-23T09:00:00Z"),
  expiresAt: asIsoUtcDateTime("2026-06-23T10:00:00Z"),
};

const activeUser = {
  userId: asDomainId<"User">("usr_1"),
  tenantId: asDomainId<"Tenant">("tenant_1"),
  status: "ACTIVE" as const,
};

const ownerAssignments: readonly RoleAssignment[] = [
  {
    role: "STORE_OWNER",
    tenantId: asDomainId<"Tenant">("tenant_1"),
    storeId: asDomainId<"Store">("store_1"),
    branchIds: [asDomainId<"Branch">("branch_1")],
  },
];

const makeAuthorizeInput = (
  overrides: Partial<AuthorizeRequestInput> = {},
): AuthorizeRequestInput => ({
  requestId: "req_1" as CorrelationId,
  authorizationHeader: "Bearer token_1",
  appCheckHeader: "app_check_token_1",
  requirement: {
    appCheck: "required",
    permissions: ["booking.read", "payment.cash.confirm"],
  },
  target: {
    tenantId: asDomainId<"Tenant">("tenant_1"),
    storeId: asDomainId<"Store">("store_1"),
    branchId: asDomainId<"Branch">("branch_1"),
  },
  dependencies: {
    tokenVerifier: {
      verifyIdToken: async () => baseFirebaseToken,
    },
    appCheckVerifier: {
      verifyToken: async () => baseAppCheckToken,
    },
    userResolver: {
      resolveByFirebaseUid: async () => activeUser,
    },
    roleLookup: {
      listRoleAssignments: async () => ownerAssignments,
    },
  },
  ...overrides,
});

test("authorizeRequest accepts valid token, App Check, and scoped permissions", async () => {
  const context = await authorizeRequest(makeAuthorizeInput());
  assert.equal(context.user.userId, activeUser.userId);
  assert.equal(context.appCheckToken?.appId, "app_mobile");
});

test("authorizeRequest rejects missing App Check for protected endpoint", async () => {
  await assert.rejects(
    authorizeRequest(
      makeAuthorizeInput({
        appCheckHeader: undefined,
      }),
    ),
    (error: unknown) =>
      error instanceof SecurityError &&
      error.code === "AUTH_APP_CHECK_REQUIRED" &&
      error.status === 403,
  );
});

test("authorizeRequest rejects invalid bearer token", async () => {
  await assert.rejects(
    authorizeRequest(
      makeAuthorizeInput({
        dependencies: {
          ...makeAuthorizeInput().dependencies,
          tokenVerifier: {
            verifyIdToken: async () => {
              throw new Error("expired");
            },
          },
        },
      }),
    ),
    (error: unknown) =>
      error instanceof SecurityError &&
      error.code === "AUTH_INVALID_TOKEN" &&
      error.status === 401,
  );
});

test("evaluatePermission denies cross-tenant branch access", () => {
  const decision = evaluatePermission({
    actorUserId: asDomainId<"User">("usr_staff"),
    permission: "booking.read",
    assignments: [
      {
        role: "STORE_STAFF",
        tenantId: asDomainId<"Tenant">("tenant_1"),
        storeId: asDomainId<"Store">("store_1"),
        branchIds: [asDomainId<"Branch">("branch_1")],
      },
    ],
    target: {
      tenantId: asDomainId<"Tenant">("tenant_2"),
      storeId: asDomainId<"Store">("store_2"),
      branchId: asDomainId<"Branch">("branch_9"),
    },
  });

  assert.equal(decision.allowed, false);
  assert.equal(decision.reason, "scope_mismatch");
});

test("evaluatePermission allows renter to read only own bookings", () => {
  const allowed = evaluatePermission({
    actorUserId: asDomainId<"User">("usr_renter"),
    permission: "booking.read",
    assignments: [
      {
        role: "RENTER",
      },
    ],
    target: {
      ownerUserId: asDomainId<"User">("usr_renter"),
    },
  });

  const denied = evaluatePermission({
    actorUserId: asDomainId<"User">("usr_renter"),
    permission: "booking.read",
    assignments: [
      {
        role: "RENTER",
      },
    ],
    target: {
      ownerUserId: asDomainId<"User">("usr_other"),
    },
  });

  assert.equal(allowed.allowed, true);
  assert.equal(allowed.reason, "user_scope");
  assert.equal(denied.allowed, false);
});

test("security errors map to API error responses with contract fields", () => {
  const mapped = mapSecurityErrorToApiResponse(
    new SecurityError("permission_denied", undefined, {
      permission: "payment.cash.confirm",
    }),
    "req_123",
  );

  assert.equal(mapped.status, 403);
  assert.deepEqual(mapped.body, {
    error: {
      code: "PERMISSION_DENIED",
      message: "The caller does not have permission to perform this action.",
      details: {
        permission: "payment.cash.confirm",
      },
      requestId: "req_123",
    },
  });
});
