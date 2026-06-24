import {
  SecurityError,
  mapSecurityErrorToApiResponse,
} from "../../identity/api/security-error.js";
import {
  authorizeRequest,
  defaultPermissionChecker,
  type SecurityPipelineDependencies,
} from "../../identity/application/security-pipeline.js";
import { buildApiErrorResponse } from "../../shared/api/api-error.js";
import {
  DomainError,
  asDomainId,
  type CorrelationId,
  type IsoUtcDateTime,
  type OutboxEventId,
  type RideSessionId,
  type SosCaseId,
} from "../../shared/domain/index.js";
import {
  serializeSosCase,
  type SosService,
} from "../application/sos-service.js";

export interface SosApiDependencies {
  readonly security: SecurityPipelineDependencies;
  readonly sosService: SosService;
  readonly now: () => IsoUtcDateTime;
  readonly buildSosCaseId: () => string;
  readonly buildOutboxEventId: () => string;
}

const mapDomainError = (error: DomainError, requestId: string) => ({
  status:
    error.code === "NOT_FOUND"
      ? 404
      : error.code === "PERMISSION_DENIED"
        ? 403
        : error.code === "SOS_STATE_TRANSITION_INVALID"
          ? 409
          : 422,
  body: buildApiErrorResponse(
    error.code,
    error.message,
    { ...error.details },
    requestId,
  ),
});

const authorizeSosStaffAction = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly sosCaseId: SosCaseId;
  },
  dependencies: SosApiDependencies,
) => {
  const sosCase = await dependencies.sosService.getSosCase(request.sosCaseId);
  const context = await authorizeRequest({
    requestId: request.requestId,
    authorizationHeader: request.authorizationHeader,
    appCheckHeader: request.appCheckHeader,
    requirement: { appCheck: "required", permissions: [] },
    target: {},
    dependencies: dependencies.security,
  });
  defaultPermissionChecker.assertAllowed({
    actorUserId: context.user.userId,
    permission: "sos.location.read",
    assignments: context.assignments,
    target: {
      tenantId: sosCase.tenantId,
      storeId: sosCase.storeId,
      branchId: sosCase.branchId,
    },
  });

  return { context, sosCase };
};

export const createSosCaseEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly body: {
      readonly booking_id: string;
      readonly ride_session_id?: RideSessionId | undefined;
      readonly phone: string;
      readonly latest_location: {
        readonly latitude: number;
        readonly longitude: number;
        readonly accuracy_meters: number;
      };
      readonly issue_type:
        | "BIKE_BROKEN"
        | "FLAT_TIRE"
        | "ACCIDENT"
        | "LOST"
        | "HEALTH"
        | "UNSAFE"
        | "OTHER";
    };
  },
  dependencies: SosApiDependencies,
) => {
  try {
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: { appCheck: "required", permissions: [] },
      target: {},
      dependencies: dependencies.security,
    });
    const outboxEventIds = [
      asDomainId<"OutboxEvent">(
        dependencies.buildOutboxEventId(),
      ) as OutboxEventId,
      asDomainId<"OutboxEvent">(
        dependencies.buildOutboxEventId(),
      ) as OutboxEventId,
      asDomainId<"OutboxEvent">(
        dependencies.buildOutboxEventId(),
      ) as OutboxEventId,
    ];
    const sosCase = await dependencies.sosService.createSosCase({
      sosCaseId: asDomainId<"SosCase">(
        dependencies.buildSosCaseId(),
      ) as SosCaseId,
      outboxEventIds,
      bookingId: request.body.booking_id as never,
      rideSessionId: request.body.ride_session_id,
      actorUserId: context.user.userId,
      phone: request.body.phone,
      latestLocation: {
        latitude: request.body.latest_location.latitude,
        longitude: request.body.latest_location.longitude,
        accuracyMeters: request.body.latest_location.accuracy_meters,
      },
      issueType: request.body.issue_type,
      now: dependencies.now(),
    });
    return {
      status: 201,
      body: {
        data: serializeSosCase(sosCase),
        meta: { request_id: request.requestId },
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

export const acknowledgeSosCaseEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly sosCaseId: SosCaseId;
    readonly body?: { readonly notes?: string | undefined };
  },
  dependencies: SosApiDependencies,
) => {
  try {
    const { context } = await authorizeSosStaffAction(request, dependencies);
    const sosCase = await dependencies.sosService.acknowledge({
      sosCaseId: request.sosCaseId,
      actorUserId: context.user.userId,
      notes: request.body?.notes,
      now: dependencies.now(),
    });
    return {
      status: 200,
      body: {
        data: serializeSosCase(sosCase),
        meta: { request_id: request.requestId },
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

export const assignSosCaseEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly sosCaseId: SosCaseId;
    readonly body: {
      readonly assigned_staff_user_id: string;
      readonly notes?: string | undefined;
    };
  },
  dependencies: SosApiDependencies,
) => {
  try {
    const { context } = await authorizeSosStaffAction(request, dependencies);
    const sosCase = await dependencies.sosService.assign({
      sosCaseId: request.sosCaseId,
      actorUserId: context.user.userId,
      assignedStaffUserId: request.body.assigned_staff_user_id as never,
      outboxEventIds: [
        asDomainId<"OutboxEvent">(
          dependencies.buildOutboxEventId(),
        ) as OutboxEventId,
      ],
      notes: request.body.notes,
      now: dependencies.now(),
    });
    return {
      status: 200,
      body: {
        data: serializeSosCase(sosCase),
        meta: { request_id: request.requestId },
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

export const startSosCaseEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly sosCaseId: SosCaseId;
    readonly body?: { readonly notes?: string | undefined };
  },
  dependencies: SosApiDependencies,
) => {
  try {
    const { context } = await authorizeSosStaffAction(request, dependencies);
    const sosCase = await dependencies.sosService.startHandling({
      sosCaseId: request.sosCaseId,
      actorUserId: context.user.userId,
      notes: request.body?.notes,
      now: dependencies.now(),
    });
    return {
      status: 200,
      body: {
        data: serializeSosCase(sosCase),
        meta: { request_id: request.requestId },
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

export const resolveSosCaseEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly sosCaseId: SosCaseId;
    readonly body: { readonly notes: string };
  },
  dependencies: SosApiDependencies,
) => {
  try {
    const { context } = await authorizeSosStaffAction(request, dependencies);
    const sosCase = await dependencies.sosService.resolve({
      sosCaseId: request.sosCaseId,
      actorUserId: context.user.userId,
      notes: request.body.notes,
      now: dependencies.now(),
    });
    return {
      status: 200,
      body: {
        data: serializeSosCase(sosCase),
        meta: { request_id: request.requestId },
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

export const closeSosCaseEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly sosCaseId: SosCaseId;
    readonly body: { readonly notes: string };
  },
  dependencies: SosApiDependencies,
) => {
  try {
    const { context } = await authorizeSosStaffAction(request, dependencies);
    const sosCase = await dependencies.sosService.close({
      sosCaseId: request.sosCaseId,
      actorUserId: context.user.userId,
      notes: request.body.notes,
      now: dependencies.now(),
    });
    return {
      status: 200,
      body: {
        data: serializeSosCase(sosCase),
        meta: { request_id: request.requestId },
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
