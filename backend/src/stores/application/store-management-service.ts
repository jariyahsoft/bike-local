import type {
  AuditActor,
  AuditLogEntry,
} from "../../audit/domain/audit-log.js";
import type { AuditLogWriter } from "../../identity/application/security-pipeline.js";
import { DomainError } from "../../shared/domain/index.js";
import type {
  BranchId,
  CorrelationId,
  EntityVersion,
  IsoUtcDateTime,
  Page,
  PageRequest,
  StaffInvitationId,
  StoreId,
  StoreMemberId,
  TenantId,
  UserId,
} from "../../shared/domain/index.js";
import type { PermissionName, RoleName } from "../../identity/domain/rbac.js";
import {
  applyApprovalDecision,
  applyBranchUpdate,
  applyStoreMemberUpdate,
  assertStoreOwnerOnboardingRole,
  createBranchProfile,
  createOwnerMember,
  createStaffInvitationRecord,
  createStoreDraft,
  isBranchAvailableForBooking,
  isStoreAvailableForBooking,
  submitStoreForApproval,
} from "../domain/store-policies.js";
import type {
  Branch,
  BranchRepository,
  CreateStoreDraftInput,
  StaffInvitation,
  StaffInvitationChannel,
  StaffInvitationRepository,
  Store,
  StoreApprovalStatus,
  StoreDocumentMetadata,
  StoreMember,
  StoreMemberRepository,
  StoreRepository,
  TemporaryClosure,
} from "../domain/store-repository.js";
import type { RoleAssignment } from "../../identity/domain/rbac.js";

export interface StoreManagementActor {
  readonly userId: UserId;
  readonly roleNames: readonly RoleName[];
}

export interface StoreManagementServiceDependencies {
  readonly storeRepository: StoreRepository;
  readonly branchRepository: BranchRepository;
  readonly storeMemberRepository: StoreMemberRepository;
  readonly staffInvitationRepository: StaffInvitationRepository;
  readonly auditLogWriter: AuditLogWriter;
  readonly buildStoreMemberId: () => StoreMemberId;
}

export interface CreateStoreServiceInput extends Omit<
  CreateStoreDraftInput,
  "now"
> {
  readonly actorAssignments: readonly RoleAssignment[];
  readonly now: IsoUtcDateTime;
}

export interface CreateBranchServiceInput {
  readonly branchId: BranchId;
  readonly storeId: StoreId;
  readonly name: string;
  readonly address: string;
  readonly province?: string | undefined;
  readonly district?: string | undefined;
  readonly country: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly geohash?: string | undefined;
  readonly phone?: string | undefined;
  readonly openingHours?: Readonly<Record<string, unknown>> | undefined;
  readonly timezone?: string | undefined;
  readonly now: IsoUtcDateTime;
}

export interface UpdateBranchServiceInput {
  readonly branchId: BranchId;
  readonly version: EntityVersion;
  readonly name?: string | undefined;
  readonly phone?: string | undefined;
  readonly openingHours?: Readonly<Record<string, unknown>> | undefined;
  readonly status?: Branch["status"] | undefined;
  readonly temporaryClosure?: TemporaryClosure | undefined;
  readonly actor: StoreManagementActor;
  readonly now: IsoUtcDateTime;
  readonly correlationId: CorrelationId;
}

export interface CreateStaffInvitationServiceInput {
  readonly invitationId: StaffInvitationId;
  readonly storeId: StoreId;
  readonly role: string;
  readonly channel: StaffInvitationChannel;
  readonly email?: string | undefined;
  readonly phone?: string | undefined;
  readonly branchIds?: readonly BranchId[] | undefined;
  readonly permissionOverrides?: readonly PermissionName[] | undefined;
  readonly invitedByUserId: UserId;
  readonly expiresAt?: IsoUtcDateTime | undefined;
  readonly now: IsoUtcDateTime;
}

export interface UpdateStoreMemberServiceInput {
  readonly memberId: StoreMemberId;
  readonly version: EntityVersion;
  readonly role?: string | undefined;
  readonly branchIds?: readonly BranchId[] | undefined;
  readonly grantedPermissions?: readonly PermissionName[] | undefined;
  readonly deniedPermissions?: readonly PermissionName[] | undefined;
  readonly status?: StoreMember["status"] | undefined;
  readonly actor: StoreManagementActor;
  readonly now: IsoUtcDateTime;
  readonly correlationId: CorrelationId;
}

const buildAuditActor = (actor: StoreManagementActor): AuditActor => ({
  actorType: "USER",
  actorUserId: actor.userId,
  roleNames: actor.roleNames,
});

const appendAudit = async (
  auditLogWriter: AuditLogWriter,
  entry: AuditLogEntry,
): Promise<void> => {
  await auditLogWriter.append(entry);
};

export class StoreManagementService {
  constructor(
    private readonly dependencies: StoreManagementServiceDependencies,
  ) {}

  async createStoreDraft(input: CreateStoreServiceInput): Promise<Store> {
    assertStoreOwnerOnboardingRole(input.actorAssignments);

    const store = createStoreDraft(input);
    const ownerMember = createOwnerMember(
      store,
      this.dependencies.buildStoreMemberId(),
      input.now,
    );

    await this.dependencies.storeRepository.save(store);
    await this.dependencies.storeMemberRepository.save(ownerMember);

    return store;
  }

  async listVisibleStores(page: PageRequest): Promise<Page<Store>> {
    return this.dependencies.storeRepository.listVisible(page);
  }

  async getStore(storeId: StoreId): Promise<Store> {
    const store = await this.dependencies.storeRepository.findById(storeId);
    if (store === null) {
      throw new DomainError("NOT_FOUND", "Store not found", {
        storeId,
      });
    }

    return store;
  }

  async submitStore(input: {
    readonly storeId: StoreId;
    readonly version: EntityVersion;
    readonly actor: StoreManagementActor;
    readonly now: IsoUtcDateTime;
    readonly correlationId: CorrelationId;
  }): Promise<Store> {
    const store = await this.getStore(input.storeId);
    const submitted = submitStoreForApproval(store, input.now);
    await this.dependencies.storeRepository.save(submitted, {
      expectedVersion: input.version,
    });

    await appendAudit(this.dependencies.auditLogWriter, {
      action: "store.submitted",
      resourceType: "store",
      resourceId: submitted.id,
      actor: buildAuditActor(input.actor),
      before: {
        approval_status: store.approvalStatus,
      },
      after: {
        approval_status: submitted.approvalStatus,
        submitted_at: submitted.submittedAt,
      },
      metadata: {
        correlationId: input.correlationId,
        occurredAt: input.now,
        immutable: true,
        classification: "CONFIDENTIAL",
      },
      tenantId: submitted.tenantId,
    });

    return submitted;
  }

  async decideApproval(input: {
    readonly storeId: StoreId;
    readonly version: EntityVersion;
    readonly decision: StoreApprovalStatus;
    readonly reason: string;
    readonly actor: StoreManagementActor;
    readonly now: IsoUtcDateTime;
    readonly correlationId: CorrelationId;
  }): Promise<Store> {
    const store = await this.getStore(input.storeId);
    const decided = applyApprovalDecision(
      store,
      input.decision,
      input.actor.userId,
      input.reason,
      input.now,
    );

    await this.dependencies.storeRepository.save(decided, {
      expectedVersion: input.version,
    });

    await appendAudit(this.dependencies.auditLogWriter, {
      action: "store.approval.decided",
      resourceType: "store",
      resourceId: decided.id,
      actor: buildAuditActor(input.actor),
      reason: input.reason,
      before: {
        approval_status: store.approvalStatus,
        operational_status: store.operationalStatus,
      },
      after: {
        approval_status: decided.approvalStatus,
        operational_status: decided.operationalStatus,
      },
      metadata: {
        correlationId: input.correlationId,
        occurredAt: input.now,
        immutable: true,
        classification: "CONFIDENTIAL",
      },
      tenantId: decided.tenantId,
    });

    return decided;
  }

  async createBranch(input: CreateBranchServiceInput): Promise<Branch> {
    const store = await this.getStore(input.storeId);
    const branch = createBranchProfile({
      ...input,
      store,
    });

    await this.dependencies.branchRepository.save(branch);
    return branch;
  }

  async getBranch(branchId: BranchId): Promise<Branch> {
    const branch = await this.dependencies.branchRepository.findById(branchId);
    if (branch === null) {
      throw new DomainError("NOT_FOUND", "Branch not found", {
        branchId,
      });
    }

    return branch;
  }

  async updateBranch(input: UpdateBranchServiceInput): Promise<Branch> {
    const branch = await this.getBranch(input.branchId);
    const updated = applyBranchUpdate(branch, input, input.now);
    await this.dependencies.branchRepository.save(updated, {
      expectedVersion: input.version,
    });

    if (updated.status === "TEMPORARILY_CLOSED") {
      const auditReason = updated.temporaryClosure?.reason;
      await appendAudit(this.dependencies.auditLogWriter, {
        action: "branch.temporarily_closed",
        resourceType: "branch",
        resourceId: updated.id,
        actor: buildAuditActor(input.actor),
        ...(auditReason === undefined ? {} : { reason: auditReason }),
        before: {
          status: branch.status,
        },
        after: {
          status: updated.status,
          reopen_at: updated.temporaryClosure?.reopenAt,
        },
        metadata: {
          correlationId: input.correlationId,
          occurredAt: input.now,
          immutable: true,
          classification: "INTERNAL",
        },
        tenantId: updated.tenantId,
      });
    }

    return updated;
  }

  async isBranchAvailableForBooking(branchId: BranchId): Promise<boolean> {
    const branch = await this.getBranch(branchId);
    const store = await this.getStore(branch.storeId);

    return isBranchAvailableForBooking(store, branch);
  }

  async createStaffInvitation(
    input: CreateStaffInvitationServiceInput,
  ): Promise<StaffInvitation> {
    const store = await this.getStore(input.storeId);
    const invitation = createStaffInvitationRecord({
      ...input,
      store,
    });

    await this.dependencies.staffInvitationRepository.save(invitation);
    return invitation;
  }

  async getStoreMember(memberId: StoreMemberId): Promise<StoreMember> {
    const member =
      await this.dependencies.storeMemberRepository.findById(memberId);
    if (member === null) {
      throw new DomainError("NOT_FOUND", "Store member not found", {
        memberId,
      });
    }

    return member;
  }

  async updateStoreMember(
    input: UpdateStoreMemberServiceInput,
  ): Promise<StoreMember> {
    const member = await this.getStoreMember(input.memberId);
    const updated = applyStoreMemberUpdate(member, input, input.now);

    await this.dependencies.storeMemberRepository.save(updated, {
      expectedVersion: input.version,
    });

    await appendAudit(this.dependencies.auditLogWriter, {
      action: "permission.changed",
      resourceType: "store_member",
      resourceId: updated.id,
      actor: buildAuditActor(input.actor),
      reason:
        updated.status === "SUSPENDED"
          ? "Store member access suspended with immediate revocation."
          : "Store member permissions updated.",
      before: {
        role: member.role,
        branch_ids: member.branchIds,
        granted_permissions: member.grantedPermissions,
        denied_permissions: member.deniedPermissions,
        status: member.status,
      },
      after: {
        role: updated.role,
        branch_ids: updated.branchIds,
        granted_permissions: updated.grantedPermissions,
        denied_permissions: updated.deniedPermissions,
        status: updated.status,
      },
      metadata: {
        correlationId: input.correlationId,
        occurredAt: input.now,
        immutable: true,
        classification: "CONFIDENTIAL",
      },
      tenantId: updated.tenantId,
    });

    return updated;
  }
}

export interface SerializedStoreDocumentMetadata {
  readonly id: StoreDocumentMetadata["id"];
  readonly type: StoreDocumentMetadata["type"];
  readonly storage_object_ref: string;
  readonly file_name: string;
  readonly content_type: string;
  readonly size_bytes: number;
  readonly status: StoreDocumentMetadata["status"];
  readonly uploaded_at: IsoUtcDateTime;
}

export interface SerializedStore {
  readonly id: StoreId;
  readonly tenant_id: TenantId;
  readonly owner_user_id: UserId;
  readonly legal_name: string;
  readonly display_name: string;
  readonly description?: string | undefined;
  readonly phone?: string | undefined;
  readonly email?: string | undefined;
  readonly default_currency: string;
  readonly timezone: string;
  readonly approval_status: Store["approvalStatus"];
  readonly operational_status: Store["operationalStatus"];
  readonly commission_plan_id?: string | undefined;
  readonly document_metadata: readonly SerializedStoreDocumentMetadata[];
  readonly submitted_at?: IsoUtcDateTime | undefined;
  readonly reviewed_at?: IsoUtcDateTime | undefined;
  readonly reviewed_by?: UserId | undefined;
  readonly decision_reason?: string | undefined;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: Store["version"];
}

export interface SerializedBranch {
  readonly id: BranchId;
  readonly tenant_id: TenantId;
  readonly store_id: StoreId;
  readonly name: string;
  readonly address: string;
  readonly province?: string | undefined;
  readonly district?: string | undefined;
  readonly country: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly geohash?: string | undefined;
  readonly phone?: string | undefined;
  readonly opening_hours?: Readonly<Record<string, unknown>> | undefined;
  readonly timezone: string;
  readonly status: Branch["status"];
  readonly temporary_closure?: {
    readonly reason: string;
    readonly reopen_at?: IsoUtcDateTime | undefined;
  };
  readonly available_for_booking?: boolean;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: Branch["version"];
}

export interface SerializedStaffInvitation {
  readonly id: StaffInvitationId;
  readonly tenant_id: TenantId;
  readonly store_id: StoreId;
  readonly role: StaffInvitation["role"];
  readonly channel: StaffInvitation["channel"];
  readonly email?: string | undefined;
  readonly phone?: string | undefined;
  readonly invite_link_hint?: string | undefined;
  readonly branch_ids: readonly BranchId[];
  readonly permission_overrides: readonly PermissionName[];
  readonly status: StaffInvitation["status"];
  readonly invited_by_user_id: UserId;
  readonly expires_at?: IsoUtcDateTime | undefined;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: StaffInvitation["version"];
}

export interface SerializedStoreMember {
  readonly id: StoreMemberId;
  readonly tenant_id: TenantId;
  readonly store_id: StoreId;
  readonly user_id: UserId;
  readonly role: StoreMember["role"];
  readonly branch_ids: readonly BranchId[];
  readonly granted_permissions: readonly PermissionName[];
  readonly denied_permissions: readonly PermissionName[];
  readonly status: StoreMember["status"];
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: StoreMember["version"];
}

export const serializeStore = (store: Store): SerializedStore => ({
  id: store.id,
  tenant_id: store.tenantId,
  owner_user_id: store.ownerUserId,
  legal_name: store.legalName,
  display_name: store.displayName,
  description: store.description,
  phone: store.phone,
  email: store.email,
  default_currency: store.defaultCurrency,
  timezone: store.timezone,
  approval_status: store.approvalStatus,
  operational_status: store.operationalStatus,
  commission_plan_id: store.commissionPlanId,
  document_metadata: store.documentMetadata.map((document) => ({
    id: document.id,
    type: document.type,
    storage_object_ref: document.storageObjectRef,
    file_name: document.fileName,
    content_type: document.contentType,
    size_bytes: document.sizeBytes,
    status: document.status,
    uploaded_at: document.uploadedAt,
  })),
  submitted_at: store.submittedAt,
  reviewed_at: store.reviewedAt,
  reviewed_by: store.reviewedBy,
  decision_reason: store.decisionReason,
  created_at: store.createdAt,
  updated_at: store.updatedAt,
  version: store.version,
});

export const serializeBranch = (
  branch: Branch,
  availableForBooking?: boolean,
): SerializedBranch => {
  const temporaryClosure =
    branch.temporaryClosure === undefined
      ? {}
      : {
          temporary_closure: {
            reason: branch.temporaryClosure.reason,
            reopen_at: branch.temporaryClosure.reopenAt,
          },
        };
  const availability =
    availableForBooking === undefined
      ? {}
      : { available_for_booking: availableForBooking };

  return {
    id: branch.id,
    tenant_id: branch.tenantId,
    store_id: branch.storeId,
    name: branch.name,
    address: branch.address,
    province: branch.province,
    district: branch.district,
    country: branch.country,
    latitude: branch.latitude,
    longitude: branch.longitude,
    geohash: branch.geohash,
    phone: branch.phone,
    opening_hours: branch.openingHours,
    timezone: branch.timezone,
    status: branch.status,
    ...temporaryClosure,
    ...availability,
    created_at: branch.createdAt,
    updated_at: branch.updatedAt,
    version: branch.version,
  };
};

export const serializeStaffInvitation = (
  invitation: StaffInvitation,
): SerializedStaffInvitation => ({
  id: invitation.id,
  tenant_id: invitation.tenantId,
  store_id: invitation.storeId,
  role: invitation.role,
  channel: invitation.channel,
  email: invitation.email,
  phone: invitation.phone,
  invite_link_hint: invitation.inviteLinkHint,
  branch_ids: invitation.branchIds,
  permission_overrides: invitation.permissionOverrides,
  status: invitation.status,
  invited_by_user_id: invitation.invitedByUserId,
  expires_at: invitation.expiresAt,
  created_at: invitation.createdAt,
  updated_at: invitation.updatedAt,
  version: invitation.version,
});

export const serializeStoreMember = (
  member: StoreMember,
): SerializedStoreMember => ({
  id: member.id,
  tenant_id: member.tenantId,
  store_id: member.storeId,
  user_id: member.userId,
  role: member.role,
  branch_ids: member.branchIds,
  granted_permissions: member.grantedPermissions,
  denied_permissions: member.deniedPermissions,
  status: member.status,
  created_at: member.createdAt,
  updated_at: member.updatedAt,
  version: member.version,
});
