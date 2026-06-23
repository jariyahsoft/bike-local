import type { AuditLogEntry } from "../../audit/domain/audit-log.js";
import type {
  CorrelationId,
  IsoUtcDateTime,
  TenantId,
  UserId,
} from "../../shared/domain/index.js";
import {
  evaluatePermission,
  type AuthorizationTarget,
  type PermissionName,
  type RoleAssignment,
} from "../domain/rbac.js";
import { SecurityError } from "../api/security-error.js";

export interface VerifiedFirebaseIdToken {
  readonly uid: string;
  readonly email?: string;
  readonly phoneNumber?: string;
  readonly claims: Readonly<Record<string, unknown>>;
  readonly issuedAt: IsoUtcDateTime;
  readonly expiresAt: IsoUtcDateTime;
}

export interface VerifiedAppCheckToken {
  readonly appId: string;
  readonly tokenId: string;
  readonly issuedAt: IsoUtcDateTime;
  readonly expiresAt: IsoUtcDateTime;
}

export interface ResolvedDomainUser {
  readonly userId: UserId;
  readonly tenantId?: TenantId;
  readonly status: "ACTIVE" | "SUSPENDED" | "DELETION_REQUESTED";
}

export interface FirebaseIdTokenVerifier {
  verifyIdToken(token: string): Promise<VerifiedFirebaseIdToken>;
}

export interface AppCheckTokenVerifier {
  verifyToken(token: string): Promise<VerifiedAppCheckToken>;
}

export interface DomainUserResolver {
  resolveByFirebaseUid(firebaseUid: string): Promise<ResolvedDomainUser | null>;
}

export interface RoleAssignmentLookup {
  listRoleAssignments(userId: UserId): Promise<readonly RoleAssignment[]>;
}

export interface PermissionCheckRequest {
  readonly actorUserId: UserId;
  readonly permission: PermissionName;
  readonly assignments: readonly RoleAssignment[];
  readonly target: AuthorizationTarget;
}

export interface PermissionChecker {
  assertAllowed(request: PermissionCheckRequest): void;
}

export interface TenantAccessGuard {
  assertTenantAccess(
    assignments: readonly RoleAssignment[],
    tenantId: TenantId,
  ): void;
  assertBranchAccess(
    assignments: readonly RoleAssignment[],
    branchId: string,
  ): void;
}

export interface AuditLogWriter {
  append(entry: AuditLogEntry): Promise<void>;
}

export interface EndpointSecurityRequirement {
  readonly appCheck: "required" | "optional" | "disabled";
  readonly permissions: readonly PermissionName[];
  readonly auditAction?: string;
}

export interface SecurityPipelineDependencies {
  readonly tokenVerifier: FirebaseIdTokenVerifier;
  readonly appCheckVerifier: AppCheckTokenVerifier;
  readonly userResolver: DomainUserResolver;
  readonly roleLookup: RoleAssignmentLookup;
}

export interface AuthorizedRequestContext {
  readonly requestId: CorrelationId;
  readonly firebaseToken: VerifiedFirebaseIdToken;
  readonly appCheckToken?: VerifiedAppCheckToken | undefined;
  readonly user: ResolvedDomainUser;
  readonly assignments: readonly RoleAssignment[];
}

export interface AuthorizeRequestInput {
  readonly requestId: CorrelationId;
  readonly authorizationHeader?: string | undefined;
  readonly appCheckHeader?: string | undefined;
  readonly requirement: EndpointSecurityRequirement;
  readonly target: AuthorizationTarget;
  readonly dependencies: SecurityPipelineDependencies;
}

export const defaultPermissionChecker: PermissionChecker = {
  assertAllowed: ({ actorUserId, permission, assignments, target }) => {
    const decision = evaluatePermission({
      actorUserId,
      permission,
      assignments,
      target,
    });

    if (!decision.allowed) {
      throw new SecurityError("permission_denied", undefined, {
        permission,
        decision: decision.reason,
      });
    }
  },
};

export const defaultTenantAccessGuard: TenantAccessGuard = {
  assertTenantAccess: (assignments, tenantId) => {
    const allowed = assignments.some(
      (assignment) =>
        assignment.tenantId === tenantId ||
        assignment.role.startsWith("PLATFORM_"),
    );
    if (!allowed) {
      throw new SecurityError(
        "permission_denied",
        "Tenant access is outside the caller scope.",
        {
          tenantId,
        },
      );
    }
  },
  assertBranchAccess: (assignments, branchId) => {
    const allowed = assignments.some(
      (assignment) =>
        assignment.role.startsWith("PLATFORM_") ||
        assignment.branchIds?.includes(branchId as never) === true,
    );
    if (!allowed) {
      throw new SecurityError(
        "permission_denied",
        "Branch access is outside the caller scope.",
        {
          branchId,
        },
      );
    }
  },
};

const extractBearerToken = (authorizationHeader?: string): string => {
  if (authorizationHeader === undefined || authorizationHeader.trim() === "") {
    throw new SecurityError("unauthenticated");
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme !== "Bearer" || token === undefined || token.trim() === "") {
    throw new SecurityError("unauthorized");
  }

  return token;
};

export const authorizeRequest = async ({
  requestId,
  authorizationHeader,
  appCheckHeader,
  requirement,
  target,
  dependencies,
}: AuthorizeRequestInput): Promise<AuthorizedRequestContext> => {
  const bearerToken = extractBearerToken(authorizationHeader);

  let firebaseToken: VerifiedFirebaseIdToken;
  try {
    firebaseToken = await dependencies.tokenVerifier.verifyIdToken(bearerToken);
  } catch (error) {
    throw new SecurityError("unauthorized", undefined, {
      cause: error instanceof Error ? error.message : "unknown",
    });
  }

  let appCheckToken: VerifiedAppCheckToken | undefined;
  if (
    requirement.appCheck === "required" &&
    (appCheckHeader === undefined || appCheckHeader.trim() === "")
  ) {
    throw new SecurityError("app_check_required");
  }

  if (appCheckHeader !== undefined && appCheckHeader.trim() !== "") {
    try {
      appCheckToken =
        await dependencies.appCheckVerifier.verifyToken(appCheckHeader);
    } catch (error) {
      throw new SecurityError("app_check_invalid", undefined, {
        cause: error instanceof Error ? error.message : "unknown",
      });
    }
  }

  const user = await dependencies.userResolver.resolveByFirebaseUid(
    firebaseToken.uid,
  );
  if (user === null || user.status !== "ACTIVE") {
    throw new SecurityError(
      "unauthenticated",
      "Authenticated identity is not linked to an active domain user.",
    );
  }

  const assignments = await dependencies.roleLookup.listRoleAssignments(
    user.userId,
  );
  for (const permission of requirement.permissions) {
    defaultPermissionChecker.assertAllowed({
      actorUserId: user.userId,
      permission,
      assignments,
      target,
    });
  }

  return {
    requestId,
    firebaseToken,
    appCheckToken,
    user,
    assignments,
  };
};
