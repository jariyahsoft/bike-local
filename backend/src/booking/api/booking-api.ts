import {
  SecurityError,
  mapSecurityErrorToApiResponse,
} from "../../identity/api/security-error.js";
import {
  authorizeRequest,
  type SecurityPipelineDependencies,
} from "../../identity/application/security-pipeline.js";
import { buildApiErrorResponse } from "../../shared/api/api-error.js";
import {
  DomainError,
  asDomainId,
  type AssetId,
  type BookingId,
  type BranchId,
  type CorrelationId,
  type DepositId,
  type EquipmentItemId,
  type IdempotencyKey,
  type IsoUtcDateTime,
  type RentalPointId,
  type StoreId,
} from "../../shared/domain/index.js";
import {
  serializeBooking,
  type BookingService,
} from "../application/booking-service.js";

export interface BookingApiDependencies {
  readonly security: SecurityPipelineDependencies;
  readonly bookingService: BookingService;
  readonly now: () => IsoUtcDateTime;
  readonly buildBookingId: () => string;
  readonly buildDepositId: () => string;
  readonly buildBookingNumber: () => string;
  readonly buildQrBookingTokenReference: () => string;
  readonly buildAvailabilityBlockId: () => string;
}

export interface BookingApiRequestBase {
  readonly requestId: CorrelationId;
  readonly authorizationHeader?: string;
  readonly appCheckHeader?: string;
}

export interface CreateBookingApiRequest extends BookingApiRequestBase {
  readonly idempotencyKey: IdempotencyKey;
  readonly body: {
    readonly store_id: StoreId;
    readonly branch_id: BranchId;
    readonly asset_ids: readonly AssetId[];
    readonly equipment_ids?: readonly EquipmentItemId[];
    readonly start_at: IsoUtcDateTime;
    readonly end_at: IsoUtcDateTime;
    readonly pickup_point_id: RentalPointId;
    readonly return_point_id: RentalPointId;
    readonly payment_method: "ONLINE" | "CASH";
  };
}

const mapDomainError = (error: DomainError, requestId: string) => {
  const code =
    error.code === "NOT_FOUND"
      ? "BOOKING_NOT_FOUND"
      : error.code === "VERSION_CONFLICT"
        ? "BOOKING_VERSION_CONFLICT"
        : error.code;
  const status =
    error.code === "NOT_FOUND"
      ? 404
      : error.code === "VERSION_CONFLICT" ||
          error.code === "AVAILABILITY_CONFLICT" ||
          error.code === "BOOKING_ASSET_NOT_AVAILABLE"
        ? 409
        : error.code === "PERMISSION_DENIED"
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

export const createBookingEndpoint = async (
  request: CreateBookingApiRequest,
  dependencies: BookingApiDependencies,
) => {
  try {
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

    const booking = await dependencies.bookingService.createBooking({
      bookingId: asDomainId<"Booking">(
        dependencies.buildBookingId(),
      ) as BookingId,
      depositId: asDomainId<"Deposit">(
        dependencies.buildDepositId(),
      ) as DepositId,
      bookingNumber: dependencies.buildBookingNumber(),
      userId: context.user.userId,
      storeId: request.body.store_id,
      branchId: request.body.branch_id,
      assetIds: request.body.asset_ids,
      equipmentIds: request.body.equipment_ids,
      startAt: request.body.start_at,
      endAt: request.body.end_at,
      pickupPointId: request.body.pickup_point_id,
      returnPointId: request.body.return_point_id,
      paymentMethod: request.body.payment_method,
      idempotencyKey: request.idempotencyKey,
      qrBookingTokenReference: dependencies.buildQrBookingTokenReference(),
      availabilityBlockId: dependencies.buildAvailabilityBlockId,
      now: dependencies.now(),
    });

    return {
      status: 201,
      body: {
        data: serializeBooking(booking),
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
