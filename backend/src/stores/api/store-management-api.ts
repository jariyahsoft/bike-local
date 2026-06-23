import { buildApiErrorResponse } from "../../shared/api/api-error.js";
import {
  asDomainId,
  type BranchId,
  type CorrelationId,
  type IsoUtcDateTime,
  type StaffInvitationId,
  type StoreDocumentId,
  type StoreId,
  type StoreMemberId,
  type TenantId,
} from "../../shared/domain/index.js";
import { DomainError } from "../../shared/domain/index.js";
import {
  authorizeRequest,
  type AuthorizedRequestContext,
  type SecurityPipelineDependencies,
} from "../../identity/application/security-pipeline.js";
import type { PermissionName, RoleName } from "../../identity/domain/rbac.js";
import {
  SecurityError,
  mapSecurityErrorToApiResponse,
} from "../../identity/api/security-error.js";
import {
  serializeBranch,
  serializeStaffInvitation,
  serializeStore,
  serializeStoreMember,
  type StoreManagementService,
} from "../application/store-management-service.js";
import type {
  Branch,
  StaffInvitationChannel,
  StoreApprovalStatus,
  StoreDocumentMetadata,
} from "../domain/store-repository.js";

export interface StoreManagementApiDependencies {
  readonly security: SecurityPipelineDependencies;
  readonly storeManagementService: StoreManagementService;
  readonly now: () => IsoUtcDateTime;
  readonly buildStoreId: () => string;
  readonly buildBranchId: () => string;
  readonly buildStoreDocumentId: () => string;
  readonly buildStaffInvitationId: () => string;
}

export interface StoreApiRequestBase {
  readonly requestId: CorrelationId;
  readonly authorizationHeader?: string;
  readonly appCheckHeader?: string;
}

export interface CreateStoreApiRequest extends StoreApiRequestBase {
  readonly body: {
    readonly legal_name: string;
    readonly display_name: string;
    readonly description?: string;
    readonly phone?: string;
    readonly email?: string;
    readonly default_currency: string;
    readonly timezone: string;
    readonly documents?: readonly {
      readonly type: StoreDocumentMetadata["type"];
      readonly storage_object_ref: string;
      readonly file_name: string;
      readonly content_type: string;
      readonly size_bytes: number;
    }[];
  };
}

export interface VersionedStoreApiRequest extends StoreApiRequestBase {
  readonly storeId: StoreId;
  readonly body: {
    readonly version: number;
  };
}

export interface DecideStoreApprovalApiRequest extends StoreApiRequestBase {
  readonly storeId: StoreId;
  readonly body: {
    readonly version: number;
    readonly decision: StoreApprovalStatus;
    readonly reason: string;
  };
}

export interface CreateBranchApiRequest extends StoreApiRequestBase {
  readonly storeId: StoreId;
  readonly body: {
    readonly name: string;
    readonly address: string;
    readonly province?: string;
    readonly district?: string;
    readonly country: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly geohash?: string;
    readonly phone?: string;
    readonly opening_hours?: Readonly<Record<string, unknown>>;
    readonly timezone?: string;
  };
}

export interface UpdateBranchApiRequest extends StoreApiRequestBase {
  readonly branchId: BranchId;
  readonly body: {
    readonly version: number;
    readonly name?: string;
    readonly phone?: string;
    readonly opening_hours?: Readonly<Record<string, unknown>>;
    readonly status?: Branch["status"];
    readonly temporary_closure?: {
      readonly reason: string;
      readonly reopen_at?: IsoUtcDateTime;
    };
  };
}

export interface CreateStaffInvitationApiRequest extends StoreApiRequestBase {
  readonly storeId: StoreId;
  readonly body: {
    readonly role: RoleName;
    readonly channel: StaffInvitationChannel;
    readonly email?: string;
    readonly phone?: string;
    readonly branch_ids?: readonly BranchId[];
    readonly permission_overrides?: readonly PermissionName[];
    readonly expires_at?: IsoUtcDateTime;
  };
}

export interface UpdateStoreMemberApiRequest extends StoreApiRequestBase {
  readonly memberId: StoreMemberId;
  readonly body: {
    readonly version: number;
    readonly role?: RoleName;
    readonly branch_ids?: readonly BranchId[];
    readonly granted_permissions?: readonly PermissionName[];
    readonly denied_permissions?: readonly PermissionName[];
    readonly status?: "ACTIVE" | "SUSPENDED";
  };
}

const buildActor = (authorized: AuthorizedRequestContext) => ({
  userId: authorized.user.userId,
  roleNames: authorized.assignments.map((assignment) => assignment.role),
});

const mapDomainError = (error: DomainError, requestId: string) => {
  const code =
    error.code === "NOT_FOUND"
      ? error.details.branchId !== undefined
        ? "BRANCH_NOT_FOUND"
        : error.details.memberId !== undefined
          ? "STORE_MEMBER_NOT_FOUND"
          : "STORE_NOT_FOUND"
      : error.code === "VERSION_CONFLICT"
        ? "STORE_VERSION_CONFLICT"
        : error.code;
  const status =
    error.code === "NOT_FOUND"
      ? 404
      : error.code === "VERSION_CONFLICT"
        ? 409
        : error.code === "STORE_OWNER_ROLE_REQUIRED"
          ? 403
          : 422;

  return {
    status,
    body: buildApiErrorResponse(
      code,
      error.message,
      { ...error.details },
      requestId,
    ),
  };
};

const toStoreDocuments = (
  documents: CreateStoreApiRequest["body"]["documents"],
  dependencies: StoreManagementApiDependencies,
): readonly StoreDocumentMetadata[] =>
  (documents ?? []).map((document) => {
    const now = dependencies.now();

    return {
      id: asDomainId<"StoreDocument">(
        dependencies.buildStoreDocumentId(),
      ) as StoreDocumentId,
      type: document.type,
      storageObjectRef: document.storage_object_ref,
      fileName: document.file_name,
      contentType: document.content_type,
      sizeBytes: document.size_bytes,
      status: "PENDING_REVIEW",
      uploadedAt: now,
      createdAt: now,
      updatedAt: now,
      version: 1 as never,
    };
  });

const authorizeStoreTarget = async (
  request: StoreApiRequestBase,
  dependencies: StoreManagementApiDependencies,
  permission: PermissionName,
  target: { readonly storeId: StoreId; readonly tenantId: TenantId },
) =>
  authorizeRequest({
    requestId: request.requestId,
    authorizationHeader: request.authorizationHeader,
    appCheckHeader: request.appCheckHeader,
    requirement: {
      appCheck: "required",
      permissions: [permission],
    },
    target,
    dependencies: dependencies.security,
  });

export const createStoreEndpoint = async (
  request: CreateStoreApiRequest,
  dependencies: StoreManagementApiDependencies,
) => {
  try {
    const authorized = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: {
        appCheck: "required",
        permissions: [],
      },
      target: {},
      dependencies: dependencies.security,
    });

    const storeId = asDomainId<"Store">(dependencies.buildStoreId()) as StoreId;
    const store = await dependencies.storeManagementService.createStoreDraft({
      storeId,
      tenantId: asDomainId<"Tenant">(storeId) as TenantId,
      ownerUserId: authorized.user.userId,
      legalName: request.body.legal_name,
      displayName: request.body.display_name,
      description: request.body.description,
      phone: request.body.phone,
      email: request.body.email,
      defaultCurrency: request.body.default_currency,
      timezone: request.body.timezone,
      documentMetadata: toStoreDocuments(request.body.documents, dependencies),
      actorAssignments: authorized.assignments,
      now: dependencies.now(),
    });

    return {
      status: 201,
      body: {
        data: serializeStore(store),
        meta: {
          request_id: request.requestId,
        },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const submitStoreEndpoint = async (
  request: VersionedStoreApiRequest,
  dependencies: StoreManagementApiDependencies,
) => {
  try {
    const existing = await dependencies.storeManagementService.getStore(
      request.storeId,
    );
    const authorized = await authorizeStoreTarget(
      request,
      dependencies,
      "store.update",
      {
        storeId: existing.id,
        tenantId: existing.tenantId,
      },
    );
    const store = await dependencies.storeManagementService.submitStore({
      storeId: request.storeId,
      version: request.body.version as never,
      actor: buildActor(authorized),
      now: dependencies.now(),
      correlationId: request.requestId,
    });

    return {
      status: 200,
      body: {
        data: serializeStore(store),
        meta: {
          request_id: request.requestId,
        },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const decideStoreApprovalEndpoint = async (
  request: DecideStoreApprovalApiRequest,
  dependencies: StoreManagementApiDependencies,
) => {
  try {
    const authorized = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: {
        appCheck: "required",
        permissions: ["platform.store.suspend"],
      },
      target: {},
      dependencies: dependencies.security,
    });

    const store = await dependencies.storeManagementService.decideApproval({
      storeId: request.storeId,
      version: request.body.version as never,
      decision: request.body.decision,
      reason: request.body.reason,
      actor: buildActor(authorized),
      now: dependencies.now(),
      correlationId: request.requestId,
    });

    return {
      status: 200,
      body: {
        data: serializeStore(store),
        meta: {
          request_id: request.requestId,
        },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const createBranchEndpoint = async (
  request: CreateBranchApiRequest,
  dependencies: StoreManagementApiDependencies,
) => {
  try {
    const store = await dependencies.storeManagementService.getStore(
      request.storeId,
    );
    await authorizeStoreTarget(request, dependencies, "branch.create", {
      storeId: store.id,
      tenantId: store.tenantId,
    });

    const branch = await dependencies.storeManagementService.createBranch({
      branchId: asDomainId<"Branch">(dependencies.buildBranchId()) as BranchId,
      storeId: request.storeId,
      name: request.body.name,
      address: request.body.address,
      province: request.body.province,
      district: request.body.district,
      country: request.body.country,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      geohash: request.body.geohash,
      phone: request.body.phone,
      openingHours: request.body.opening_hours,
      timezone: request.body.timezone,
      now: dependencies.now(),
    });
    const available =
      await dependencies.storeManagementService.isBranchAvailableForBooking(
        branch.id,
      );

    return {
      status: 201,
      body: {
        data: serializeBranch(branch, available),
        meta: {
          request_id: request.requestId,
        },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const updateBranchEndpoint = async (
  request: UpdateBranchApiRequest,
  dependencies: StoreManagementApiDependencies,
) => {
  try {
    const existing = await dependencies.storeManagementService.getBranch(
      request.branchId,
    );
    const authorized = await authorizeStoreTarget(
      request,
      dependencies,
      "store.update",
      {
        storeId: existing.storeId,
        tenantId: existing.tenantId,
      },
    );

    const branch = await dependencies.storeManagementService.updateBranch({
      branchId: request.branchId,
      version: request.body.version as never,
      name: request.body.name,
      phone: request.body.phone,
      openingHours: request.body.opening_hours,
      status: request.body.status,
      temporaryClosure:
        request.body.temporary_closure === undefined
          ? undefined
          : {
              reason: request.body.temporary_closure.reason,
              reopenAt: request.body.temporary_closure.reopen_at,
            },
      actor: buildActor(authorized),
      now: dependencies.now(),
      correlationId: request.requestId,
    });
    const available =
      await dependencies.storeManagementService.isBranchAvailableForBooking(
        branch.id,
      );

    return {
      status: 200,
      body: {
        data: serializeBranch(branch, available),
        meta: {
          request_id: request.requestId,
        },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const createStaffInvitationEndpoint = async (
  request: CreateStaffInvitationApiRequest,
  dependencies: StoreManagementApiDependencies,
) => {
  try {
    const store = await dependencies.storeManagementService.getStore(
      request.storeId,
    );
    const authorized = await authorizeStoreTarget(
      request,
      dependencies,
      "staff.manage",
      {
        storeId: store.id,
        tenantId: store.tenantId,
      },
    );

    const invitation =
      await dependencies.storeManagementService.createStaffInvitation({
        invitationId: asDomainId<"StaffInvitation">(
          dependencies.buildStaffInvitationId(),
        ) as StaffInvitationId,
        storeId: request.storeId,
        role: request.body.role,
        channel: request.body.channel,
        email: request.body.email,
        phone: request.body.phone,
        branchIds: request.body.branch_ids,
        permissionOverrides: request.body.permission_overrides,
        invitedByUserId: authorized.user.userId,
        expiresAt: request.body.expires_at,
        now: dependencies.now(),
      });

    return {
      status: 202,
      body: {
        data: serializeStaffInvitation(invitation),
        meta: {
          request_id: request.requestId,
        },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const updateStoreMemberEndpoint = async (
  request: UpdateStoreMemberApiRequest,
  dependencies: StoreManagementApiDependencies,
) => {
  try {
    const existing = await dependencies.storeManagementService.getStoreMember(
      request.memberId,
    );
    const authorized = await authorizeStoreTarget(
      request,
      dependencies,
      "staff.manage",
      {
        storeId: existing.storeId,
        tenantId: existing.tenantId,
      },
    );
    const member = await dependencies.storeManagementService.updateStoreMember({
      memberId: request.memberId,
      version: request.body.version as never,
      role: request.body.role,
      branchIds: request.body.branch_ids,
      grantedPermissions: request.body.granted_permissions,
      deniedPermissions: request.body.denied_permissions,
      status: request.body.status,
      actor: buildActor(authorized),
      now: dependencies.now(),
      correlationId: request.requestId,
    });

    return {
      status: 200,
      body: {
        data: serializeStoreMember(member),
        meta: {
          request_id: request.requestId,
        },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};
