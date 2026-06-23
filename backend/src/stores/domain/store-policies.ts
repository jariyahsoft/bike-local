import { DomainError } from "../../shared/domain/index.js";
import type { IsoUtcDateTime, UserId } from "../../shared/domain/index.js";
import type {
  PermissionName,
  RoleAssignment,
} from "../../identity/domain/rbac.js";
import type {
  Branch,
  CreateBranchInput,
  CreateStoreDraftInput,
  StaffAssignableRole,
  StaffInvitation,
  StaffInvitationChannel,
  Store,
  StoreApprovalStatus,
  StoreMember,
  TemporaryClosure,
} from "./store-repository.js";

const staffAssignableRoles = new Set<StaffAssignableRole>([
  "STORE_MANAGER",
  "STORE_STAFF",
  "STORE_ACCOUNTING",
]);

const ensureNonEmpty = (value: string | undefined, field: string): string => {
  if (value === undefined || value.trim() === "") {
    throw new DomainError("VALIDATION_INVALID", `${field} is required`, {
      field,
    });
  }

  return value.trim();
};

export const assertStoreOwnerOnboardingRole = (
  assignments: readonly RoleAssignment[],
): void => {
  if (!assignments.some((assignment) => assignment.role === "STORE_OWNER")) {
    throw new DomainError(
      "STORE_OWNER_ROLE_REQUIRED",
      "Store registration requires the store owner role.",
      {
        role: "STORE_OWNER",
      },
    );
  }
};

export const validateStaffRole = (role: string): StaffAssignableRole => {
  if (!staffAssignableRoles.has(role as StaffAssignableRole)) {
    throw new DomainError(
      "STAFF_ROLE_INVALID",
      "Only store manager, staff, and accounting roles can be assigned through staff management.",
      {
        role,
      },
    );
  }

  return role as StaffAssignableRole;
};

export const validateStaffInvitationContact = (input: {
  readonly channel: StaffInvitationChannel;
  readonly email?: string | undefined;
  readonly phone?: string | undefined;
}): void => {
  const hasRequiredContact =
    input.channel === "EMAIL"
      ? input.email !== undefined
      : input.channel === "PHONE"
        ? input.phone !== undefined
        : true;

  if (!hasRequiredContact) {
    throw new DomainError(
      "STAFF_INVITATION_CONTACT_REQUIRED",
      "Staff invitation channel requires matching contact information.",
      {
        channel: input.channel,
      },
    );
  }
};

export const createStoreDraft = (input: CreateStoreDraftInput): Store => ({
  id: input.storeId,
  tenantId: input.tenantId,
  ownerUserId: input.ownerUserId,
  legalName: ensureNonEmpty(input.legalName, "legal_name"),
  displayName: ensureNonEmpty(input.displayName, "display_name"),
  description: input.description,
  phone: input.phone,
  email: input.email,
  defaultCurrency: ensureNonEmpty(input.defaultCurrency, "default_currency"),
  timezone: ensureNonEmpty(input.timezone, "timezone"),
  approvalStatus: "DRAFT",
  operationalStatus: "DRAFT",
  documentMetadata: input.documentMetadata ?? [],
  createdAt: input.now,
  updatedAt: input.now,
  version: 1 as never,
});

export const createOwnerMember = (
  store: Store,
  memberId: StoreMember["id"],
  now: IsoUtcDateTime,
): StoreMember => ({
  id: memberId,
  tenantId: store.tenantId,
  storeId: store.id,
  userId: store.ownerUserId,
  role: "STORE_OWNER",
  branchIds: [],
  grantedPermissions: [],
  deniedPermissions: [],
  status: "ACTIVE",
  createdAt: now,
  updatedAt: now,
  version: 1 as never,
});

export const submitStoreForApproval = (
  store: Store,
  now: IsoUtcDateTime,
): Store => {
  if (
    store.approvalStatus !== "DRAFT" &&
    store.approvalStatus !== "REVISION_REQUIRED"
  ) {
    throw new DomainError(
      "STORE_APPROVAL_TRANSITION_INVALID",
      "Only draft or revision-required stores can be submitted for approval.",
      {
        currentStatus: store.approvalStatus,
      },
    );
  }

  return {
    ...store,
    approvalStatus: "SUBMITTED",
    operationalStatus: "INACTIVE",
    submittedAt: now,
    updatedAt: now,
    version: ((store.version as number) + 1) as Store["version"],
  };
};

export const applyApprovalDecision = (
  store: Store,
  decision: StoreApprovalStatus,
  reviewerUserId: UserId,
  reason: string,
  now: IsoUtcDateTime,
): Store => {
  if (
    ![
      "UNDER_REVIEW",
      "REVISION_REQUIRED",
      "APPROVED",
      "REJECTED",
      "SUSPENDED",
      "CLOSED",
    ].includes(decision)
  ) {
    throw new DomainError(
      "STORE_APPROVAL_TRANSITION_INVALID",
      "Approval decision is not valid for platform review.",
      {
        decision,
      },
    );
  }

  if (
    decision !== "UNDER_REVIEW" &&
    (store.approvalStatus === "DRAFT" || store.approvalStatus === "CLOSED")
  ) {
    throw new DomainError(
      "STORE_APPROVAL_TRANSITION_INVALID",
      "Store must be submitted before a terminal approval decision.",
      {
        currentStatus: store.approvalStatus,
        decision,
      },
    );
  }

  const operationalStatus =
    decision === "APPROVED"
      ? "ACTIVE"
      : decision === "SUSPENDED"
        ? "SUSPENDED"
        : decision === "CLOSED"
          ? "CLOSED"
          : "INACTIVE";

  return {
    ...store,
    approvalStatus: decision,
    operationalStatus,
    reviewedAt: now,
    reviewedBy: reviewerUserId,
    decisionReason: ensureNonEmpty(reason, "reason"),
    updatedAt: now,
    version: ((store.version as number) + 1) as Store["version"],
  };
};

export const isStoreAvailableForBooking = (store: Store): boolean =>
  store.approvalStatus === "APPROVED" && store.operationalStatus === "ACTIVE";

export const createBranchProfile = (input: CreateBranchInput): Branch => {
  if (!isStoreAvailableForBooking(input.store)) {
    throw new DomainError(
      "STORE_NOT_APPROVED",
      "Only approved active stores can manage active branches.",
      {
        storeId: input.store.id,
        approvalStatus: input.store.approvalStatus,
        operationalStatus: input.store.operationalStatus,
      },
    );
  }

  return {
    id: input.branchId,
    tenantId: input.store.tenantId,
    storeId: input.store.id,
    name: ensureNonEmpty(input.name, "name"),
    address: ensureNonEmpty(input.address, "address"),
    province: input.province,
    district: input.district,
    country: ensureNonEmpty(input.country, "country"),
    latitude: input.latitude,
    longitude: input.longitude,
    geohash: input.geohash,
    phone: input.phone,
    openingHours: input.openingHours,
    timezone: input.timezone ?? input.store.timezone,
    status: "ACTIVE",
    createdAt: input.now,
    updatedAt: input.now,
    version: 1 as never,
  };
};

export const applyBranchUpdate = (
  branch: Branch,
  update: {
    readonly name?: string | undefined;
    readonly phone?: string | undefined;
    readonly openingHours?: Readonly<Record<string, unknown>> | undefined;
    readonly status?: Branch["status"] | undefined;
    readonly temporaryClosure?: TemporaryClosure | undefined;
  },
  now: IsoUtcDateTime,
): Branch => {
  if (
    update.status === "TEMPORARILY_CLOSED" &&
    update.temporaryClosure === undefined
  ) {
    throw new DomainError(
      "BRANCH_TEMPORARY_CLOSURE_INVALID",
      "Temporary branch closure requires a reason and optional reopen date.",
      {
        branchId: branch.id,
      },
    );
  }

  return {
    ...branch,
    name:
      update.name === undefined
        ? branch.name
        : ensureNonEmpty(update.name, "name"),
    phone: update.phone ?? branch.phone,
    openingHours: update.openingHours ?? branch.openingHours,
    status: update.status ?? branch.status,
    temporaryClosure:
      update.status === "TEMPORARILY_CLOSED"
        ? update.temporaryClosure
        : update.status === "ACTIVE"
          ? undefined
          : branch.temporaryClosure,
    updatedAt: now,
    version: ((branch.version as number) + 1) as Branch["version"],
  };
};

export const isBranchAvailableForBooking = (
  store: Store,
  branch: Branch,
): boolean => isStoreAvailableForBooking(store) && branch.status === "ACTIVE";

export const createStaffInvitationRecord = (input: {
  readonly invitationId: StaffInvitation["id"];
  readonly store: Store;
  readonly role: string;
  readonly channel: StaffInvitationChannel;
  readonly email?: string | undefined;
  readonly phone?: string | undefined;
  readonly branchIds?: readonly Branch["id"][] | undefined;
  readonly permissionOverrides?: readonly PermissionName[] | undefined;
  readonly invitedByUserId: UserId;
  readonly expiresAt?: IsoUtcDateTime | undefined;
  readonly now: IsoUtcDateTime;
}): StaffInvitation => {
  validateStaffInvitationContact(input);

  return {
    id: input.invitationId,
    tenantId: input.store.tenantId,
    storeId: input.store.id,
    role: validateStaffRole(input.role),
    channel: input.channel,
    email: input.email,
    phone: input.phone,
    inviteLinkHint:
      input.channel === "LINK" || input.channel === "QR"
        ? "invite_***"
        : undefined,
    branchIds: input.branchIds ?? [],
    permissionOverrides: input.permissionOverrides ?? [],
    status: "PENDING",
    invitedByUserId: input.invitedByUserId,
    expiresAt: input.expiresAt,
    createdAt: input.now,
    updatedAt: input.now,
    version: 1 as never,
  };
};

export const applyStoreMemberUpdate = (
  member: StoreMember,
  update: {
    readonly role?: string | undefined;
    readonly branchIds?: readonly Branch["id"][] | undefined;
    readonly grantedPermissions?: readonly PermissionName[] | undefined;
    readonly deniedPermissions?: readonly PermissionName[] | undefined;
    readonly status?: StoreMember["status"] | undefined;
  },
  now: IsoUtcDateTime,
): StoreMember => ({
  ...member,
  role:
    update.role === undefined ? member.role : validateStaffRole(update.role),
  branchIds: update.branchIds ?? member.branchIds,
  grantedPermissions: update.grantedPermissions ?? member.grantedPermissions,
  deniedPermissions: update.deniedPermissions ?? member.deniedPermissions,
  status: update.status ?? member.status,
  updatedAt: now,
  version: ((member.version as number) + 1) as StoreMember["version"],
});
