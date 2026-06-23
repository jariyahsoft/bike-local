import { buildApiErrorResponse } from "../../shared/api/api-error.js";
import {
  asDomainId,
  type CorrelationId,
  type IsoUtcDateTime,
} from "../../shared/domain/index.js";
import {
  buildUserId,
  serializeCurrentUserProfile,
  type IdentityService,
} from "../application/identity-service.js";
import {
  authorizeRequest,
  type SecurityPipelineDependencies,
  type VerifiedFirebaseIdToken,
} from "../application/security-pipeline.js";
import {
  SecurityError,
  mapSecurityErrorToApiResponse,
} from "./security-error.js";
import { DomainError } from "../../shared/domain/index.js";
import type {
  AuthProvider,
  ConsentInput,
  OnboardingSelectableRole,
} from "../domain/identity-repository.js";

export interface IdentityApiDependencies {
  readonly security: SecurityPipelineDependencies;
  readonly identityService: IdentityService;
  readonly now: () => IsoUtcDateTime;
  readonly buildUserId: () => string;
  readonly buildTenantId: () => string;
}

export interface CreateUserApiRequest {
  readonly requestId: CorrelationId;
  readonly authorizationHeader?: string;
  readonly appCheckHeader?: string;
  readonly body: {
    readonly display_name: string;
    readonly locale: "th" | "en";
    readonly selected_roles: readonly OnboardingSelectableRole[];
    readonly consents: {
      readonly terms: { readonly version: string };
      readonly privacy: { readonly version: string };
      readonly gps?: {
        readonly version: string;
        readonly purpose: string;
        readonly background_allowed: boolean;
      };
      readonly marketing?: {
        readonly version: string;
        readonly granted: boolean;
        readonly purpose: string;
      };
    };
  };
}

export interface UpdateMeApiRequest {
  readonly requestId: CorrelationId;
  readonly authorizationHeader?: string;
  readonly appCheckHeader?: string;
  readonly body: {
    readonly version: number;
    readonly display_name?: string;
    readonly locale?: "th" | "en";
    readonly additional_roles?: readonly OnboardingSelectableRole[];
    readonly consents?: CreateUserApiRequest["body"]["consents"];
  };
}

export interface AccountDeletionApiRequest {
  readonly requestId: CorrelationId;
  readonly authorizationHeader?: string;
  readonly appCheckHeader?: string;
  readonly body: {
    readonly version: number;
    readonly reason?: string;
  };
}

const mapProvider = (firebaseToken: VerifiedFirebaseIdToken): AuthProvider => {
  const firebaseClaim = firebaseToken.claims.firebase as
    | { readonly sign_in_provider?: string }
    | undefined;

  switch (firebaseClaim?.sign_in_provider) {
    case "phone":
      return "PHONE";
    case "google.com":
      return "GOOGLE";
    case "apple.com":
      return "APPLE";
    default:
      return firebaseToken.email !== undefined ? "EMAIL_PASSWORD" : "PHONE";
  }
};

const toConsentInputs = (
  consents: CreateUserApiRequest["body"]["consents"],
): readonly ConsentInput[] => {
  const next: ConsentInput[] = [
    {
      type: "TERMS",
      status: "GRANTED",
      versionCode: consents.terms.version,
      purpose: "terms_acceptance",
    },
    {
      type: "PRIVACY",
      status: "GRANTED",
      versionCode: consents.privacy.version,
      purpose: "privacy_notice_acceptance",
    },
  ];

  if (consents.gps !== undefined) {
    next.push({
      type: "GPS",
      status: "GRANTED",
      versionCode: consents.gps.version,
      purpose: consents.gps.purpose,
      gpsScope: consents.gps.background_allowed
        ? "BACKGROUND_ALLOWED"
        : "FOREGROUND_ONLY",
    });
  }

  if (consents.marketing !== undefined) {
    next.push({
      type: "MARKETING",
      status: consents.marketing.granted ? "GRANTED" : "DENIED",
      versionCode: consents.marketing.version,
      purpose: consents.marketing.purpose,
    });
  }

  return next;
};

const mapDomainError = (error: DomainError, requestId: string) => {
  const code = error.code === "NOT_FOUND" ? "USER_NOT_FOUND" : error.code;
  const status =
    error.code === "AUTH_IDENTITY_ALREADY_LINKED" ||
    error.code === "USER_ALREADY_EXISTS"
      ? 409
      : error.code === "NOT_FOUND"
        ? 404
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

const verifyIdentityOnly = async (
  requestId: CorrelationId,
  authorizationHeader: string | undefined,
  appCheckHeader: string | undefined,
  dependencies: SecurityPipelineDependencies,
): Promise<VerifiedFirebaseIdToken> => {
  const authorized = await authorizeRequest({
    requestId,
    authorizationHeader,
    appCheckHeader,
    requirement: {
      appCheck: "required",
      permissions: [],
    },
    target: {},
    dependencies: {
      ...dependencies,
      userResolver: {
        resolveByFirebaseUid: async () => ({
          userId: buildUserId("bootstrap-user"),
          status: "ACTIVE",
        }),
      },
      roleLookup: {
        listRoleAssignments: async () => [],
      },
    },
  });

  return authorized.firebaseToken;
};

export const createUserEndpoint = async (
  request: CreateUserApiRequest,
  dependencies: IdentityApiDependencies,
) => {
  try {
    const firebaseToken = await verifyIdentityOnly(
      request.requestId,
      request.authorizationHeader,
      request.appCheckHeader,
      dependencies.security,
    );

    const created = await dependencies.identityService.createUser({
      userId: buildUserId(dependencies.buildUserId()),
      tenantId: asDomainId<"Tenant">(dependencies.buildTenantId()),
      displayName: request.body.display_name,
      locale: request.body.locale,
      email: firebaseToken.email,
      phone: firebaseToken.phoneNumber,
      selectedRoles: request.body.selected_roles,
      consentInputs: toConsentInputs(request.body.consents),
      firebaseUid: firebaseToken.uid,
      authProvider: mapProvider(firebaseToken),
      authProviderSubject: firebaseToken.uid,
      verified: true,
      now: dependencies.now(),
      correlationId: request.requestId,
    });

    return {
      status: 201,
      body: {
        data: serializeCurrentUserProfile(created),
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

export const getMeEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
  },
  dependencies: IdentityApiDependencies,
) => {
  try {
    const authorized = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: {
        appCheck: "optional",
        permissions: [],
      },
      target: {},
      dependencies: dependencies.security,
    });

    const profile = await dependencies.identityService.getCurrentUserProfile(
      authorized.user.userId,
    );

    return {
      status: 200,
      body: {
        data: serializeCurrentUserProfile(profile),
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

export const updateMeEndpoint = async (
  request: UpdateMeApiRequest,
  dependencies: IdentityApiDependencies,
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

    const updated = await dependencies.identityService.updateCurrentUser({
      userId: authorized.user.userId,
      version: request.body.version as never,
      displayName: request.body.display_name,
      locale: request.body.locale,
      additionalRoles: request.body.additional_roles,
      consentInputs:
        request.body.consents === undefined
          ? undefined
          : toConsentInputs(request.body.consents),
      now: dependencies.now(),
      correlationId: request.requestId,
    });

    return {
      status: 200,
      body: {
        data: serializeCurrentUserProfile(updated),
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

export const requestAccountDeletionEndpoint = async (
  request: AccountDeletionApiRequest,
  dependencies: IdentityApiDependencies,
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

    const updated = await dependencies.identityService.requestAccountDeletion({
      userId: authorized.user.userId,
      version: request.body.version as never,
      reason: request.body.reason,
      now: dependencies.now(),
      correlationId: request.requestId,
    });

    return {
      status: 202,
      body: {
        data: serializeCurrentUserProfile(updated),
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
