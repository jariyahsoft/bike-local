import { DomainError } from "../../shared/domain/domain-error.js";
import {
  asEntityVersion,
  asMinorUnitAmount,
  type AssetId,
  type BookingId,
  type BranchId,
  type EquipmentItemId,
  type IdempotencyKey,
  type IsoUtcDateTime,
  type RentalPointId,
  type StoreId,
  type TenantId,
  type UserId,
} from "../../shared/domain/index.js";
import type {
  Booking,
  BookingPaymentMethod,
  BookingStatus,
  BookingStatusTransition,
} from "./booking-repository.js";

const ALLOWED_TRANSITIONS: Readonly<
  Record<BookingStatus, readonly BookingStatus[]>
> = {
  PENDING_PAYMENT: ["PENDING_STORE_CONFIRMATION", "CONFIRMED", "CANCELLED"],
  PENDING_STORE_CONFIRMATION: ["CONFIRMED", "CANCELLED", "DISPUTED"],
  CONFIRMED: ["PREPARING", "AWAITING_PICKUP", "CANCELLED", "NO_SHOW"],
  PREPARING: ["AWAITING_PICKUP", "CANCELLED", "DISPUTED"],
  AWAITING_PICKUP: ["IN_PROGRESS", "NO_SHOW", "CANCELLED", "DISPUTED"],
  IN_PROGRESS: ["RETURN_PENDING", "DISPUTED"],
  RETURN_PENDING: ["INSPECTION_PENDING", "DISPUTED"],
  INSPECTION_PENDING: ["COMPLETED", "DISPUTED"],
  COMPLETED: [],
  CANCELLED: [],
  NO_SHOW: [],
  DISPUTED: ["CANCELLED", "COMPLETED"],
};

export const assertBookingTransitionAllowed = (
  fromStatus: BookingStatus,
  toStatus: BookingStatus,
): void => {
  if (!ALLOWED_TRANSITIONS[fromStatus].includes(toStatus)) {
    throw new DomainError(
      "BOOKING_STATE_TRANSITION_INVALID",
      "Booking state transition is not allowed.",
      {
        fromStatus,
        toStatus,
      },
    );
  }
};

export const createBookingProfile = (input: {
  readonly bookingId: BookingId;
  readonly tenantId: TenantId;
  readonly bookingNumber: string;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly assetIds: readonly AssetId[];
  readonly equipmentIds: readonly EquipmentItemId[];
  readonly startAt: IsoUtcDateTime;
  readonly endAt: IsoUtcDateTime;
  readonly pickupPointId: RentalPointId;
  readonly returnPointId: RentalPointId;
  readonly paymentMethod: BookingPaymentMethod;
  readonly currency: string;
  readonly subtotalAmount: number;
  readonly feeAmount: number;
  readonly depositAmount: number;
  readonly discountAmount: number;
  readonly totalAmount: number;
  readonly priceSnapshot: Readonly<Record<string, unknown>>;
  readonly policySnapshot: Readonly<Record<string, unknown>>;
  readonly qrBookingTokenReference: string;
  readonly idempotencyKey: IdempotencyKey;
  readonly now: IsoUtcDateTime;
}): Booking => ({
  id: input.bookingId,
  tenantId: input.tenantId,
  bookingNumber: input.bookingNumber,
  userId: input.userId,
  storeId: input.storeId,
  branchId: input.branchId,
  assetIds: input.assetIds,
  equipmentIds: input.equipmentIds,
  status:
    input.paymentMethod === "CASH"
      ? "PENDING_STORE_CONFIRMATION"
      : "PENDING_PAYMENT",
  startAt: input.startAt,
  endAt: input.endAt,
  pickupPointId: input.pickupPointId,
  returnPointId: input.returnPointId,
  paymentMethod: input.paymentMethod,
  currency: input.currency,
  subtotalAmount: asMinorUnitAmount(input.subtotalAmount),
  feeAmount: asMinorUnitAmount(input.feeAmount),
  depositAmount: asMinorUnitAmount(input.depositAmount),
  discountAmount: asMinorUnitAmount(input.discountAmount),
  totalAmount: asMinorUnitAmount(input.totalAmount),
  priceSnapshot: input.priceSnapshot,
  policySnapshot: input.policySnapshot,
  qrBookingTokenReference: input.qrBookingTokenReference,
  idempotencyKey: input.idempotencyKey,
  statusHistory: [],
  createdAt: input.now,
  updatedAt: input.now,
  version: asEntityVersion(1),
});

export const transitionBooking = (
  booking: Booking,
  toStatus: BookingStatus,
  input: {
    readonly changedAt: IsoUtcDateTime;
    readonly changedByUserId?: UserId | undefined;
    readonly reason?: string | undefined;
  },
): Booking => {
  assertBookingTransitionAllowed(booking.status, toStatus);
  const transition: BookingStatusTransition = {
    fromStatus: booking.status,
    toStatus,
    changedAt: input.changedAt,
    changedByUserId: input.changedByUserId,
    reason: input.reason,
  };

  return {
    ...booking,
    status: toStatus,
    statusHistory: [...booking.statusHistory, transition],
    updatedAt: input.changedAt,
    version: asEntityVersion((booking.version as number) + 1),
  };
};
