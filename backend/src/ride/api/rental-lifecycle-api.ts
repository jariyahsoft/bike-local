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
  asEntityVersion,
  type BookingId,
  type CorrelationId,
  type IdempotencyKey,
  type IsoUtcDateTime,
  type OutboxEventId,
  type ReturnRequestId,
  type RideSessionId,
  type UserId,
} from "../../shared/domain/index.js";
import { serializeBooking } from "../../booking/application/booking-service.js";
import type { BookingService } from "../../booking/application/booking-service.js";
import type { ReturnInspectionDecision } from "../../return/domain/return-repository.js";
import {
  serializeReturnRequest,
  type RentalLifecycleService,
} from "../application/rental-lifecycle-service.js";
import {
  serializeRideSession,
  serializeRideTrackChunk,
  type RideService,
} from "../application/ride-service.js";

export interface RentalLifecycleApiDependencies {
  readonly security: SecurityPipelineDependencies;
  readonly bookingService: BookingService;
  readonly rentalLifecycleService: RentalLifecycleService;
  readonly rideService: RideService;
  readonly now: () => IsoUtcDateTime;
  readonly buildRideSessionId: () => string;
  readonly buildReturnRequestId: () => string;
  readonly buildReturnInspectionId: () => string;
  readonly buildOutboxEventId: () => string;
}

export interface ApiRequestBase {
  readonly requestId: CorrelationId;
  readonly authorizationHeader?: string;
  readonly appCheckHeader?: string;
  readonly idempotencyKey?: IdempotencyKey;
}

export interface HandoverBookingApiRequest extends ApiRequestBase {
  readonly bookingId: BookingId;
  readonly body: {
    readonly staff_user_id: UserId;
    readonly qr_booking_token: string;
    readonly checklist_image_refs: readonly string[];
    readonly condition_notes: string;
    readonly equipment_confirmed: boolean;
    readonly existing_damage_notes?: string | undefined;
    readonly version: number;
  };
}

export interface CreateRideSessionApiRequest extends ApiRequestBase {
  readonly body: {
    readonly booking_id: BookingId;
  };
}

export interface UploadRideTrackChunkApiRequest extends ApiRequestBase {
  readonly rideSessionId: RideSessionId;
  readonly body: {
    readonly sequence: number;
    readonly checksum: string;
    readonly captured_from: IsoUtcDateTime;
    readonly captured_to: IsoUtcDateTime;
    readonly location_consent_granted: boolean;
    readonly points: readonly {
      readonly captured_at: IsoUtcDateTime;
      readonly latitude: number;
      readonly longitude: number;
      readonly accuracy_meters: number;
      readonly speed_mps?: number | undefined;
      readonly altitude_meters?: number | undefined;
    }[];
    readonly gaps?: readonly {
      readonly from: IsoUtcDateTime;
      readonly to: IsoUtcDateTime;
      readonly reason:
        | "APP_INTERRUPTED"
        | "PERMISSION_REVOKED"
        | "SIGNAL_LOST"
        | "DEVICE_OFFLINE";
    }[];
  };
}

export interface EndRideSessionApiRequest extends ApiRequestBase {
  readonly rideSessionId: RideSessionId;
  readonly body: {
    readonly ended_at: IsoUtcDateTime;
    readonly distance_meters?: number | undefined;
    readonly gps_gap_count?: number | undefined;
    readonly version: number;
  };
}

export interface CreateReturnRequestApiRequest extends ApiRequestBase {
  readonly body: {
    readonly booking_id: BookingId;
    readonly return_type: "STORE" | "DEFINED_POINT" | "STAFF_PICKUP";
    readonly return_point_id?: string | undefined;
    readonly evidence_image_refs: readonly string[];
    readonly location: {
      readonly latitude: number;
      readonly longitude: number;
      readonly accuracy_meters?: number | undefined;
    };
    readonly notes?: string | undefined;
  };
}

export interface AcceptReturnRequestApiRequest extends ApiRequestBase {
  readonly returnRequestId: ReturnRequestId;
  readonly body: {
    readonly condition: string;
    readonly image_refs: readonly string[];
    readonly equipment_complete: boolean;
    readonly damage_notes?: string | undefined;
    readonly damage_charge_amount?: number | undefined;
    readonly currency?: string | undefined;
    readonly decision: ReturnInspectionDecision;
  };
}

const mapDomainError = (error: DomainError, requestId: string) => {
  const status =
    error.code === "NOT_FOUND"
      ? 404
      : error.code === "PERMISSION_DENIED"
        ? 403
        : error.code === "VERSION_CONFLICT" ||
            error.code.endsWith("_STATE_INVALID") ||
            error.code.endsWith("_CONFLICT")
          ? 409
          : 422;

  return {
    status,
    body: buildApiErrorResponse(
      error.code,
      error.message,
      { ...error.details },
      requestId,
    ),
  };
};

export const handoverBookingEndpoint = async (
  request: HandoverBookingApiRequest,
  dependencies: RentalLifecycleApiDependencies,
) => {
  try {
    const booking = await dependencies.bookingService.getBooking(
      request.bookingId,
    );
    const context = await authorizeRequest({
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
    defaultPermissionChecker.assertAllowed({
      actorUserId: context.user.userId,
      permission: "rental.handover",
      assignments: context.assignments,
      target: {
        tenantId: booking.tenantId,
        storeId: booking.storeId,
        branchId: booking.branchId,
      },
    });

    const updated = await dependencies.rentalLifecycleService.handover({
      bookingId: booking.id,
      rideSessionId: asDomainId<"RideSession">(
        dependencies.buildRideSessionId(),
      ) as RideSessionId,
      actorUserId: context.user.userId,
      staffUserId: request.body.staff_user_id,
      presentedQrToken: request.body.qr_booking_token,
      checklistImageRefs: request.body.checklist_image_refs,
      conditionNotes: request.body.condition_notes,
      equipmentConfirmed: request.body.equipment_confirmed,
      existingDamageNotes: request.body.existing_damage_notes,
      expectedBookingVersion: asEntityVersion(request.body.version),
      outboxEventId: asDomainId<"OutboxEvent">(
        dependencies.buildOutboxEventId(),
      ) as OutboxEventId,
      correlationId: request.requestId,
      now: dependencies.now(),
    });

    return {
      status: 200,
      body: {
        data: serializeBooking(updated),
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

export const createRideSessionEndpoint = async (
  request: CreateRideSessionApiRequest,
  dependencies: RentalLifecycleApiDependencies,
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
    const session = await dependencies.rideService.startOrResumeRideSession({
      rideSessionId: asDomainId<"RideSession">(
        dependencies.buildRideSessionId(),
      ) as RideSessionId,
      bookingId: request.body.booking_id,
      userId: context.user.userId,
      now: dependencies.now(),
    });

    return {
      status: 201,
      body: {
        data: serializeRideSession(session),
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

export const uploadRideTrackChunkEndpoint = async (
  request: UploadRideTrackChunkApiRequest,
  dependencies: RentalLifecycleApiDependencies,
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
    const chunk = await dependencies.rideService.uploadTrackChunk({
      rideSessionId: request.rideSessionId,
      actorUserId: context.user.userId,
      sequence: request.body.sequence,
      checksum: request.body.checksum,
      capturedFrom: request.body.captured_from,
      capturedTo: request.body.captured_to,
      locationConsentGranted: request.body.location_consent_granted,
      points: request.body.points.map((point) => ({
        capturedAt: point.captured_at,
        latitude: point.latitude,
        longitude: point.longitude,
        accuracyMeters: point.accuracy_meters,
        speedMps: point.speed_mps,
        altitudeMeters: point.altitude_meters,
      })),
      gaps: request.body.gaps,
      idempotencyKey: request.idempotencyKey,
    });

    return {
      status: 202,
      body: {
        data: serializeRideTrackChunk(chunk),
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

export const endRideSessionEndpoint = async (
  request: EndRideSessionApiRequest,
  dependencies: RentalLifecycleApiDependencies,
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
    const session = await dependencies.rideService.endRideSession({
      rideSessionId: request.rideSessionId,
      actorUserId: context.user.userId,
      endedAt: request.body.ended_at,
      distanceMeters: request.body.distance_meters,
      gpsGapCount: request.body.gps_gap_count,
      expectedVersion: asEntityVersion(request.body.version),
    });

    return {
      status: 200,
      body: {
        data: serializeRideSession(session),
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

export const createReturnRequestEndpoint = async (
  request: CreateReturnRequestApiRequest,
  dependencies: RentalLifecycleApiDependencies,
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
    const returnRequest =
      await dependencies.rentalLifecycleService.createReturnRequest({
        returnRequestId: asDomainId<"ReturnRequest">(
          dependencies.buildReturnRequestId(),
        ) as ReturnRequestId,
        bookingId: request.body.booking_id,
        actorUserId: context.user.userId,
        returnType: request.body.return_type,
        returnPointId:
          request.body.return_point_id === undefined
            ? undefined
            : (request.body.return_point_id as never),
        evidenceImageRefs: request.body.evidence_image_refs,
        location: {
          latitude: request.body.location.latitude,
          longitude: request.body.location.longitude,
          accuracyMeters: request.body.location.accuracy_meters,
        },
        notes: request.body.notes,
        outboxEventId: asDomainId<"OutboxEvent">(
          dependencies.buildOutboxEventId(),
        ) as OutboxEventId,
        correlationId: request.requestId,
        now: dependencies.now(),
      });

    return {
      status: 201,
      body: {
        data: serializeReturnRequest(returnRequest),
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

export const acceptReturnRequestEndpoint = async (
  request: AcceptReturnRequestApiRequest,
  dependencies: RentalLifecycleApiDependencies,
) => {
  try {
    const existingReturn =
      await dependencies.rentalLifecycleService.getReturnRequest(
        request.returnRequestId,
      );
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
      permission: "return.accept",
      assignments: context.assignments,
      target: {
        tenantId: existingReturn.tenantId,
        storeId: existingReturn.storeId,
        branchId: existingReturn.branchId,
      },
    });
    const closed = await dependencies.rentalLifecycleService.inspectReturn({
      returnRequestId: request.returnRequestId,
      inspectionId: dependencies.buildReturnInspectionId(),
      actorUserId: context.user.userId,
      condition: request.body.condition,
      imageRefs: request.body.image_refs,
      equipmentComplete: request.body.equipment_complete,
      damageNotes: request.body.damage_notes,
      damageChargeAmount: request.body.damage_charge_amount,
      currency: request.body.currency,
      decision: request.body.decision,
      correlationId: request.requestId,
      now: dependencies.now(),
    });

    return {
      status: 200,
      body: {
        data: serializeReturnRequest(closed),
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
