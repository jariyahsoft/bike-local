import assert from "node:assert/strict";
import test from "node:test";

import type { AuditLogEntry } from "../../audit/domain/audit-log.js";
import {
  asDomainId,
  asIsoUtcDateTime,
  type BranchId,
  type StoreId,
} from "../../shared/domain/index.js";
import type {
  AppCheckTokenVerifier,
  DomainUserResolver,
  FirebaseIdTokenVerifier,
  RoleAssignmentLookup,
} from "../../identity/application/security-pipeline.js";
import type { RoleAssignment } from "../../identity/domain/rbac.js";
import { StoreManagementService } from "../application/store-management-service.js";
import {
  createBranchEndpoint,
  createStaffInvitationEndpoint,
  createStoreEndpoint,
  decideStoreApprovalEndpoint,
  submitStoreEndpoint,
  updateBranchEndpoint,
  updateStoreMemberEndpoint,
} from "../api/store-management-api.js";
import {
  InMemoryBranchRepository,
  InMemoryStaffInvitationRepository,
  InMemoryStoreMemberRepository,
  InMemoryStoreRepository,
} from "../infrastructure/in-memory-store-management-repositories.js";
import type { StoreMember } from "../domain/store-repository.js";

class InMemoryAuditLogWriter {
  readonly entries: AuditLogEntry[] = [];

  async append(entry: AuditLogEntry): Promise<void> {
    this.entries.push(entry);
  }
}

const expectData = <T>(response: { readonly body: unknown }): T => {
  assert.equal(typeof response.body, "object");
  assert.notEqual(response.body, null);
  const body = response.body as Record<string, unknown>;
  assert.ok("data" in body);

  return body.data as T;
};

const expectErrorCode = (response: { readonly body: unknown }): string => {
  assert.equal(typeof response.body, "object");
  assert.notEqual(response.body, null);
  const body = response.body as Record<string, unknown>;
  assert.ok("error" in body);

  return (body.error as { readonly code: string }).code;
};

const createTestContext = () => {
  const storeRepository = new InMemoryStoreRepository();
  const branchRepository = new InMemoryBranchRepository();
  const storeMemberRepository = new InMemoryStoreMemberRepository();
  const staffInvitationRepository = new InMemoryStaffInvitationRepository();
  const auditLogWriter = new InMemoryAuditLogWriter();
  let storeCounter = 0;
  let branchCounter = 0;
  let documentCounter = 0;
  let invitationCounter = 0;
  let memberCounter = 0;

  const userByToken = new Map([
    [
      "owner-token",
      { firebaseUid: "owner_uid", userId: asDomainId<"User">("usr_owner") },
    ],
    [
      "admin-token",
      { firebaseUid: "admin_uid", userId: asDomainId<"User">("usr_admin") },
    ],
    [
      "other-owner-token",
      {
        firebaseUid: "other_owner_uid",
        userId: asDomainId<"User">("usr_other"),
      },
    ],
    [
      "staff-token",
      { firebaseUid: "staff_uid", userId: asDomainId<"User">("usr_staff") },
    ],
  ]);

  const tokenVerifier: FirebaseIdTokenVerifier = {
    verifyIdToken: async (token) => {
      const user = userByToken.get(token);
      if (user === undefined) {
        throw new Error("invalid token");
      }

      return {
        uid: user.firebaseUid,
        claims: {},
        issuedAt: asIsoUtcDateTime("2026-06-23T14:00:00Z"),
        expiresAt: asIsoUtcDateTime("2026-06-23T15:00:00Z"),
      };
    },
  };

  const appCheckVerifier: AppCheckTokenVerifier = {
    verifyToken: async (token) => {
      if (token !== "valid-app-check") {
        throw new Error("invalid app check");
      }

      return {
        appId: "bike-local-merchant",
        tokenId: "app-check-1",
        issuedAt: asIsoUtcDateTime("2026-06-23T14:00:00Z"),
        expiresAt: asIsoUtcDateTime("2026-06-23T15:00:00Z"),
      };
    },
  };

  const userResolver: DomainUserResolver = {
    resolveByFirebaseUid: async (firebaseUid) => {
      const user = [...userByToken.values()].find(
        (candidate) => candidate.firebaseUid === firebaseUid,
      );

      return user === undefined
        ? null
        : {
            userId: user.userId,
            status: "ACTIVE",
          };
    },
  };

  const baseAssignments = new Map<string, readonly RoleAssignment[]>([
    [
      "usr_owner",
      [
        {
          role: "STORE_OWNER",
          tenantId: asDomainId<"Tenant">("owner_onboarding"),
        },
      ],
    ],
    [
      "usr_other",
      [
        {
          role: "STORE_OWNER",
          tenantId: asDomainId<"Tenant">("other_onboarding"),
        },
      ],
    ],
    [
      "usr_admin",
      [
        {
          role: "PLATFORM_ADMIN",
        },
      ],
    ],
  ]);

  const roleLookup: RoleAssignmentLookup = {
    listRoleAssignments: async (userId) => {
      const memberships = await storeMemberRepository.listByUserId(userId);
      const membershipAssignments = memberships
        .filter((member) => member.status === "ACTIVE")
        .map((member) => ({
          role: member.role,
          tenantId: member.tenantId,
          storeId: member.storeId,
          branchIds: member.branchIds,
          grantedPermissions: member.grantedPermissions,
          deniedPermissions: member.deniedPermissions,
        }));

      return [
        ...(baseAssignments.get(userId as string) ?? []),
        ...membershipAssignments,
      ];
    },
  };

  const storeManagementService = new StoreManagementService({
    storeRepository,
    branchRepository,
    storeMemberRepository,
    staffInvitationRepository,
    auditLogWriter,
    buildStoreMemberId: () =>
      asDomainId<"StoreMember">(`member_${++memberCounter}`),
  });

  return {
    storeManagementService,
    storeMemberRepository,
    roleLookup,
    auditLogWriter,
    apiDependencies: {
      security: {
        tokenVerifier,
        appCheckVerifier,
        userResolver,
        roleLookup,
      },
      storeManagementService,
      now: () => asIsoUtcDateTime("2026-06-23T14:10:00Z"),
      buildStoreId: () => `store_${++storeCounter}`,
      buildBranchId: () => `brn_${++branchCounter}`,
      buildStoreDocumentId: () => `doc_${++documentCounter}`,
      buildStaffInvitationId: () => `invite_${++invitationCounter}`,
    },
  };
};

test("store management API supports approval, branches, closures, and staff audit", async () => {
  const context = createTestContext();

  const created = await createStoreEndpoint(
    {
      requestId: "req_store_create" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      body: {
        legal_name: "Bike Local Demo Co.",
        display_name: "Bike Local Demo",
        default_currency: "THB",
        timezone: "Asia/Bangkok",
        documents: [
          {
            type: "BUSINESS_REGISTRATION",
            storage_object_ref: "merchant-documents/store_1/doc_1.pdf",
            file_name: "registration.pdf",
            content_type: "application/pdf",
            size_bytes: 1024,
          },
        ],
      },
    },
    context.apiDependencies,
  );

  assert.equal(created.status, 201);
  const store = expectData<{ readonly id: StoreId; readonly version: number }>(
    created,
  );

  const submitted = await submitStoreEndpoint(
    {
      requestId: "req_store_submit" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      storeId: store.id,
      body: {
        version: store.version,
      },
    },
    context.apiDependencies,
  );

  assert.equal(submitted.status, 200);
  const submittedStore = expectData<{
    readonly id: StoreId;
    readonly version: number;
    readonly approval_status: string;
  }>(submitted);
  assert.equal(submittedStore.approval_status, "SUBMITTED");

  const approved = await decideStoreApprovalEndpoint(
    {
      requestId: "req_store_approve" as never,
      authorizationHeader: "Bearer admin-token",
      appCheckHeader: "valid-app-check",
      storeId: submittedStore.id,
      body: {
        version: submittedStore.version,
        decision: "APPROVED",
        reason: "documents_verified",
      },
    },
    context.apiDependencies,
  );

  assert.equal(approved.status, 200);
  const approvedStore = expectData<{
    readonly id: StoreId;
    readonly approval_status: string;
    readonly operational_status: string;
  }>(approved);
  assert.equal(approvedStore.approval_status, "APPROVED");
  assert.equal(approvedStore.operational_status, "ACTIVE");

  const branchResponse = await createBranchEndpoint(
    {
      requestId: "req_branch_create" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      storeId: approvedStore.id,
      body: {
        name: "Old Town",
        address: "1 Demo Road",
        province: "Bangkok",
        district: "Phra Nakhon",
        country: "TH",
        latitude: 13.7563,
        longitude: 100.5018,
      },
    },
    context.apiDependencies,
  );

  assert.equal(branchResponse.status, 201);
  const branch = expectData<{
    readonly id: BranchId;
    readonly version: number;
    readonly available_for_booking: boolean;
  }>(branchResponse);
  assert.equal(branch.available_for_booking, true);

  const closedBranch = await updateBranchEndpoint(
    {
      requestId: "req_branch_close" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      branchId: branch.id,
      body: {
        version: branch.version,
        status: "TEMPORARILY_CLOSED",
        temporary_closure: {
          reason: "storm_warning",
          reopen_at: asIsoUtcDateTime("2026-06-24T02:00:00Z"),
        },
      },
    },
    context.apiDependencies,
  );

  assert.equal(closedBranch.status, 200);
  assert.equal(
    expectData<{ readonly available_for_booking: boolean }>(closedBranch)
      .available_for_booking,
    false,
  );

  const invitation = await createStaffInvitationEndpoint(
    {
      requestId: "req_staff_invite" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      storeId: approvedStore.id,
      body: {
        role: "STORE_STAFF",
        channel: "EMAIL",
        email: "staff@example.com",
        branch_ids: [branch.id],
      },
    },
    context.apiDependencies,
  );

  assert.equal(invitation.status, 202);
  assert.equal(
    expectData<{ readonly status: string; readonly role: string }>(invitation)
      .status,
    "PENDING",
  );

  const member: StoreMember = {
    id: asDomainId<"StoreMember">("member_staff"),
    tenantId: approvedStore.id as never,
    storeId: approvedStore.id,
    userId: asDomainId<"User">("usr_staff"),
    role: "STORE_STAFF",
    branchIds: [branch.id],
    grantedPermissions: [],
    deniedPermissions: [],
    status: "ACTIVE",
    createdAt: asIsoUtcDateTime("2026-06-23T14:10:00Z"),
    updatedAt: asIsoUtcDateTime("2026-06-23T14:10:00Z"),
    version: 1 as never,
  };
  await context.storeMemberRepository.save(member);

  const updatedMember = await updateStoreMemberEndpoint(
    {
      requestId: "req_member_update" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      memberId: member.id,
      body: {
        version: 1,
        role: "STORE_MANAGER",
        denied_permissions: ["payment.cash.confirm"],
        status: "SUSPENDED",
      },
    },
    context.apiDependencies,
  );

  assert.equal(updatedMember.status, 200);
  assert.equal(
    expectData<{ readonly status: string; readonly role: string }>(
      updatedMember,
    ).status,
    "SUSPENDED",
  );
  assert.equal(
    (await context.roleLookup.listRoleAssignments(member.userId)).length,
    0,
  );
  assert.equal(context.auditLogWriter.entries.length, 4);
});

test("store management API rejects cross-tenant branch creation", async () => {
  const context = createTestContext();

  const created = await createStoreEndpoint(
    {
      requestId: "req_store_create" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      body: {
        legal_name: "Bike Local Demo Co.",
        display_name: "Bike Local Demo",
        default_currency: "THB",
        timezone: "Asia/Bangkok",
      },
    },
    context.apiDependencies,
  );
  const store = expectData<{ readonly id: StoreId; readonly version: number }>(
    created,
  );
  const submitted = await submitStoreEndpoint(
    {
      requestId: "req_store_submit" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      storeId: store.id,
      body: {
        version: store.version,
      },
    },
    context.apiDependencies,
  );
  const submittedStore = expectData<{
    readonly id: StoreId;
    readonly version: number;
  }>(submitted);
  await decideStoreApprovalEndpoint(
    {
      requestId: "req_store_approve" as never,
      authorizationHeader: "Bearer admin-token",
      appCheckHeader: "valid-app-check",
      storeId: submittedStore.id,
      body: {
        version: submittedStore.version,
        decision: "APPROVED",
        reason: "documents_verified",
      },
    },
    context.apiDependencies,
  );

  const rejected = await createBranchEndpoint(
    {
      requestId: "req_branch_cross_tenant" as never,
      authorizationHeader: "Bearer other-owner-token",
      appCheckHeader: "valid-app-check",
      storeId: store.id,
      body: {
        name: "Other Tenant Branch",
        address: "2 Demo Road",
        country: "TH",
        latitude: 13.7563,
        longitude: 100.5018,
      },
    },
    context.apiDependencies,
  );

  assert.equal(rejected.status, 403);
  assert.equal(expectErrorCode(rejected), "PERMISSION_DENIED");
});
