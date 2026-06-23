import type {
  BranchId,
  StoreId,
  TenantId,
  UserId,
} from "../../shared/domain/index.js";

export const ROLE_NAMES = [
  "RENTER",
  "STORE_OWNER",
  "STORE_MANAGER",
  "STORE_STAFF",
  "STORE_ACCOUNTING",
  "PLATFORM_ADMIN",
  "PLATFORM_MODERATOR",
  "PLATFORM_SUPPORT",
] as const;

export type RoleName = (typeof ROLE_NAMES)[number];

export const PERMISSION_NAMES = [
  "store.read",
  "store.update",
  "branch.create",
  "asset.create",
  "asset.update",
  "booking.read",
  "booking.confirm",
  "booking.cancel",
  "payment.cash.confirm",
  "rental.handover",
  "return.accept",
  "report.financial.read",
  "staff.manage",
  "sos.location.read",
  "content.approve",
  "platform.store.suspend",
  "audit.read",
  "payment.refund",
  "user.suspend",
  "dispute.manage",
] as const;

export type PermissionName = (typeof PERMISSION_NAMES)[number];
export type PermissionResource =
  | "store"
  | "branch"
  | "asset"
  | "booking"
  | "payment"
  | "rental"
  | "return_request"
  | "report"
  | "staff"
  | "sos_case"
  | "content_submission"
  | "platform"
  | "audit_log"
  | "user"
  | "dispute";
export type PermissionAction =
  | "read"
  | "create"
  | "update"
  | "confirm"
  | "cancel"
  | "handover"
  | "accept"
  | "approve"
  | "suspend"
  | "refund"
  | "manage";
export type AccessScope = "user" | "tenant" | "store" | "branch" | "platform";

export interface PermissionDefinition {
  readonly name: PermissionName;
  readonly resource: PermissionResource;
  readonly action: PermissionAction;
  readonly scopes: readonly AccessScope[];
  readonly description: string;
}

export interface PermissionGrant {
  readonly permission: PermissionName;
  readonly scope: AccessScope;
}

export interface RoleAssignment {
  readonly role: RoleName;
  readonly tenantId?: TenantId;
  readonly storeId?: StoreId;
  readonly branchIds?: readonly BranchId[];
  readonly grantedPermissions?: readonly PermissionName[];
  readonly deniedPermissions?: readonly PermissionName[];
}

export interface AuthorizationTarget {
  readonly ownerUserId?: UserId;
  readonly tenantId?: TenantId;
  readonly storeId?: StoreId;
  readonly branchId?: BranchId;
}

export interface AuthorizationRequest {
  readonly actorUserId?: UserId;
  readonly permission: PermissionName;
  readonly assignments: readonly RoleAssignment[];
  readonly target: AuthorizationTarget;
}

export interface PermissionDecision {
  readonly allowed: boolean;
  readonly reason:
    | "role_grant"
    | "user_scope"
    | "permission_missing"
    | "scope_mismatch"
    | "explicit_deny";
  readonly matchedRole?: RoleName;
  readonly matchedScope?: AccessScope;
}

export const PERMISSION_CATALOG: Record<PermissionName, PermissionDefinition> =
  {
    "store.read": {
      name: "store.read",
      resource: "store",
      action: "read",
      scopes: ["store", "branch", "platform"],
      description:
        "Read store profile and operational data within assigned scope.",
    },
    "store.update": {
      name: "store.update",
      resource: "store",
      action: "update",
      scopes: ["store", "platform"],
      description:
        "Update store details, settings, and approval-sensitive fields.",
    },
    "branch.create": {
      name: "branch.create",
      resource: "branch",
      action: "create",
      scopes: ["store", "platform"],
      description: "Create new branches for an assigned store.",
    },
    "asset.create": {
      name: "asset.create",
      resource: "asset",
      action: "create",
      scopes: ["store", "branch", "platform"],
      description: "Create asset or equipment inventory records.",
    },
    "asset.update": {
      name: "asset.update",
      resource: "asset",
      action: "update",
      scopes: ["store", "branch", "platform"],
      description: "Update asset state, pricing, metadata, and availability.",
    },
    "booking.read": {
      name: "booking.read",
      resource: "booking",
      action: "read",
      scopes: ["user", "store", "branch", "platform"],
      description: "Read booking records within the caller's assigned scope.",
    },
    "booking.confirm": {
      name: "booking.confirm",
      resource: "booking",
      action: "confirm",
      scopes: ["store", "branch", "platform"],
      description: "Confirm store-side booking workflow actions.",
    },
    "booking.cancel": {
      name: "booking.cancel",
      resource: "booking",
      action: "cancel",
      scopes: ["store", "branch", "platform"],
      description: "Cancel booking records on behalf of the store or platform.",
    },
    "payment.cash.confirm": {
      name: "payment.cash.confirm",
      resource: "payment",
      action: "confirm",
      scopes: ["store", "branch", "platform"],
      description: "Confirm cash payment receipt for a booking.",
    },
    "rental.handover": {
      name: "rental.handover",
      resource: "rental",
      action: "handover",
      scopes: ["store", "branch", "platform"],
      description: "Perform the handover that starts a rental session.",
    },
    "return.accept": {
      name: "return.accept",
      resource: "return_request",
      action: "accept",
      scopes: ["store", "branch", "platform"],
      description: "Accept a return request or inspection outcome.",
    },
    "report.financial.read": {
      name: "report.financial.read",
      resource: "report",
      action: "read",
      scopes: ["store", "platform"],
      description: "Read financial and settlement reports.",
    },
    "staff.manage": {
      name: "staff.manage",
      resource: "staff",
      action: "manage",
      scopes: ["store", "platform"],
      description: "Invite, suspend, or edit store staff assignments.",
    },
    "sos.location.read": {
      name: "sos.location.read",
      resource: "sos_case",
      action: "read",
      scopes: ["store", "branch", "platform"],
      description:
        "Read renter location during an SOS or active ride support flow.",
    },
    "content.approve": {
      name: "content.approve",
      resource: "content_submission",
      action: "approve",
      scopes: ["platform"],
      description:
        "Approve or reject routes, places, and review moderation actions.",
    },
    "platform.store.suspend": {
      name: "platform.store.suspend",
      resource: "platform",
      action: "suspend",
      scopes: ["platform"],
      description: "Suspend or close a store from the platform control plane.",
    },
    "audit.read": {
      name: "audit.read",
      resource: "audit_log",
      action: "read",
      scopes: ["store", "platform"],
      description: "Read audit logs within a permitted scope.",
    },
    "payment.refund": {
      name: "payment.refund",
      resource: "payment",
      action: "refund",
      scopes: ["store", "platform"],
      description: "Issue a refund or deposit correction with audit coverage.",
    },
    "user.suspend": {
      name: "user.suspend",
      resource: "user",
      action: "suspend",
      scopes: ["platform"],
      description: "Suspend or reactivate a user account.",
    },
    "dispute.manage": {
      name: "dispute.manage",
      resource: "dispute",
      action: "manage",
      scopes: ["platform"],
      description: "Handle support and dispute escalation workflows.",
    },
  };

export const ROLE_PERMISSION_MATRIX: Record<
  RoleName,
  readonly PermissionGrant[]
> = {
  RENTER: [{ permission: "booking.read", scope: "user" }],
  STORE_OWNER: [
    { permission: "store.read", scope: "store" },
    { permission: "store.update", scope: "store" },
    { permission: "branch.create", scope: "store" },
    { permission: "asset.create", scope: "store" },
    { permission: "asset.update", scope: "store" },
    { permission: "booking.read", scope: "store" },
    { permission: "booking.confirm", scope: "store" },
    { permission: "booking.cancel", scope: "store" },
    { permission: "payment.cash.confirm", scope: "store" },
    { permission: "rental.handover", scope: "store" },
    { permission: "return.accept", scope: "store" },
    { permission: "report.financial.read", scope: "store" },
    { permission: "staff.manage", scope: "store" },
    { permission: "sos.location.read", scope: "store" },
    { permission: "audit.read", scope: "store" },
    { permission: "payment.refund", scope: "store" },
  ],
  STORE_MANAGER: [
    { permission: "store.read", scope: "store" },
    { permission: "asset.create", scope: "branch" },
    { permission: "asset.update", scope: "branch" },
    { permission: "booking.read", scope: "branch" },
    { permission: "booking.confirm", scope: "branch" },
    { permission: "booking.cancel", scope: "branch" },
    { permission: "payment.cash.confirm", scope: "branch" },
    { permission: "rental.handover", scope: "branch" },
    { permission: "return.accept", scope: "branch" },
    { permission: "staff.manage", scope: "store" },
    { permission: "sos.location.read", scope: "branch" },
    { permission: "audit.read", scope: "store" },
  ],
  STORE_STAFF: [
    { permission: "store.read", scope: "branch" },
    { permission: "asset.update", scope: "branch" },
    { permission: "booking.read", scope: "branch" },
    { permission: "payment.cash.confirm", scope: "branch" },
    { permission: "rental.handover", scope: "branch" },
    { permission: "return.accept", scope: "branch" },
    { permission: "sos.location.read", scope: "branch" },
  ],
  STORE_ACCOUNTING: [
    { permission: "store.read", scope: "store" },
    { permission: "booking.read", scope: "store" },
    { permission: "report.financial.read", scope: "store" },
    { permission: "audit.read", scope: "store" },
    { permission: "payment.refund", scope: "store" },
  ],
  PLATFORM_ADMIN: PERMISSION_NAMES.map((permission) => ({
    permission,
    scope: "platform" as const,
  })),
  PLATFORM_MODERATOR: [
    { permission: "content.approve", scope: "platform" },
    { permission: "audit.read", scope: "platform" },
  ],
  PLATFORM_SUPPORT: [
    { permission: "store.read", scope: "platform" },
    { permission: "booking.read", scope: "platform" },
    { permission: "sos.location.read", scope: "platform" },
    { permission: "audit.read", scope: "platform" },
    { permission: "dispute.manage", scope: "platform" },
  ],
};

const scopeMatches = (
  assignment: RoleAssignment,
  grant: PermissionGrant,
  actorUserId: UserId | undefined,
  target: AuthorizationTarget,
): boolean => {
  if (grant.scope === "platform") {
    return true;
  }

  if (grant.scope === "user") {
    return (
      actorUserId !== undefined &&
      target.ownerUserId !== undefined &&
      actorUserId === target.ownerUserId
    );
  }

  if (grant.scope === "tenant") {
    return (
      assignment.tenantId !== undefined &&
      target.tenantId !== undefined &&
      assignment.tenantId === target.tenantId
    );
  }

  if (grant.scope === "store") {
    if (assignment.storeId !== undefined && target.storeId !== undefined) {
      return assignment.storeId === target.storeId;
    }

    return (
      assignment.tenantId !== undefined &&
      target.tenantId !== undefined &&
      assignment.tenantId === target.tenantId
    );
  }

  if (grant.scope === "branch") {
    return (
      target.branchId !== undefined &&
      assignment.branchIds?.includes(target.branchId) === true
    );
  }

  return false;
};

const collectGrantsForAssignment = (
  assignment: RoleAssignment,
): readonly PermissionGrant[] => {
  const base = ROLE_PERMISSION_MATRIX[assignment.role];
  const extras =
    assignment.grantedPermissions?.map((permission) => ({
      permission,
      scope: "store" as const,
    })) ?? [];

  return [...base, ...extras];
};

export const evaluatePermission = ({
  actorUserId,
  permission,
  assignments,
  target,
}: AuthorizationRequest): PermissionDecision => {
  let sawScopeMismatch = false;

  for (const assignment of assignments) {
    if (assignment.deniedPermissions?.includes(permission)) {
      return {
        allowed: false,
        reason: "explicit_deny",
        matchedRole: assignment.role,
      };
    }

    const grants = collectGrantsForAssignment(assignment).filter(
      (grant) => grant.permission === permission,
    );
    if (grants.length === 0) {
      continue;
    }

    for (const grant of grants) {
      if (scopeMatches(assignment, grant, actorUserId, target)) {
        return {
          allowed: true,
          reason: grant.scope === "user" ? "user_scope" : "role_grant",
          matchedRole: assignment.role,
          matchedScope: grant.scope,
        };
      }
      sawScopeMismatch = true;
    }
  }

  return {
    allowed: false,
    reason: sawScopeMismatch ? "scope_mismatch" : "permission_missing",
  };
};
