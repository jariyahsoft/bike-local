import type { DepositRepository } from "../../payment/domain/payment-repository.js";
import { createDepositProfile } from "../../payment/domain/payment-policies.js";
import { DomainError, asDomainId } from "../../shared/domain/index.js";
import type {
  AssetId,
  BookingId,
  BranchId,
  DepositId,
  EquipmentItemId,
  IdempotencyKey,
  IsoUtcDateTime,
  RentalPointId,
  StoreId,
  UserId,
} from "../../shared/domain/index.js";
import type {
  BranchRepository,
  StoreRepository,
} from "../../stores/domain/store-repository.js";
import { isBranchAvailableForBooking } from "../../stores/domain/store-policies.js";
import type { InventoryService } from "../../inventory/application/inventory-service.js";
import {
  createBookingProfile,
  transitionBooking,
} from "../domain/booking-policies.js";
import type {
  Booking,
  BookingPaymentMethod,
  BookingRepository,
  BookingStatus,
} from "../domain/booking-repository.js";

export interface BookingServiceDependencies {
  readonly bookingRepository: BookingRepository;
  readonly depositRepository: DepositRepository;
  readonly storeRepository: StoreRepository;
  readonly branchRepository: BranchRepository;
  readonly inventoryService: InventoryService;
}

export interface CreateBookingInput {
  readonly bookingId: BookingId;
  readonly depositId: DepositId;
  readonly bookingNumber: string;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly assetIds: readonly AssetId[];
  readonly equipmentIds?: readonly EquipmentItemId[] | undefined;
  readonly startAt: IsoUtcDateTime;
  readonly endAt: IsoUtcDateTime;
  readonly pickupPointId: RentalPointId;
  readonly returnPointId: RentalPointId;
  readonly paymentMethod: BookingPaymentMethod;
  readonly idempotencyKey: IdempotencyKey;
  readonly qrBookingTokenReference: string;
  readonly availabilityBlockId: () => string;
  readonly now: IsoUtcDateTime;
}

export class BookingService {
  constructor(private readonly dependencies: BookingServiceDependencies) {}

  async createBooking(input: CreateBookingInput): Promise<Booking> {
    if (input.assetIds.length === 0) {
      throw new DomainError(
        "VALIDATION_INVALID",
        "Booking must include at least one asset.",
        {},
      );
    }

    const existing =
      await this.dependencies.bookingRepository.findByIdempotencyKey(
        input.idempotencyKey,
      );
    if (existing !== null) {
      return existing;
    }

    const assets = await Promise.all(
      input.assetIds.map((assetId) =>
        this.dependencies.inventoryService.getAsset(assetId),
      ),
    );
    const firstAsset = assets[0] as (typeof assets)[number];
    const branch = await this.getBranch(input.branchId);
    const store = await this.getStore(input.storeId);
    if (
      assets.some(
        (asset) =>
          asset.storeId !== input.storeId || asset.branchId !== input.branchId,
      ) ||
      !isBranchAvailableForBooking(store, branch)
    ) {
      throw new DomainError(
        "BOOKING_ASSET_NOT_AVAILABLE",
        "Booking asset is not available for the selected branch.",
        {
          storeId: input.storeId,
          branchId: input.branchId,
          assetId: firstAsset.id,
        },
      );
    }

    const quote = await this.dependencies.inventoryService.createPricingQuote({
      assetIds: input.assetIds,
      equipmentIds: input.equipmentIds,
      startAt: input.startAt,
      endAt: input.endAt,
      paymentMethod: input.paymentMethod,
    });

    await this.dependencies.inventoryService.reserveAvailability({
      assetIds: input.assetIds,
      startAt: input.startAt,
      endAt: input.endAt,
      referenceId: input.bookingId,
      availabilityBlockId: () =>
        asDomainId<"AvailabilityBlock">(input.availabilityBlockId()),
      now: input.now,
    });

    const booking = createBookingProfile({
      bookingId: input.bookingId,
      tenantId: firstAsset.tenantId,
      bookingNumber: input.bookingNumber,
      userId: input.userId,
      storeId: input.storeId,
      branchId: input.branchId,
      assetIds: input.assetIds,
      equipmentIds: input.equipmentIds ?? [],
      startAt: input.startAt,
      endAt: input.endAt,
      pickupPointId: input.pickupPointId,
      returnPointId: input.returnPointId,
      paymentMethod: input.paymentMethod,
      currency: quote.currency,
      subtotalAmount: quote.subtotalAmount,
      feeAmount: quote.feeAmount,
      depositAmount: quote.depositAmount,
      discountAmount: quote.discountAmount,
      totalAmount: quote.totalAmount,
      priceSnapshot: quote.priceSnapshot,
      policySnapshot: quote.policySnapshot,
      qrBookingTokenReference: input.qrBookingTokenReference,
      idempotencyKey: input.idempotencyKey,
      now: input.now,
    });

    const saved = await this.dependencies.bookingRepository.save(booking);
    await this.dependencies.depositRepository.save(
      createDepositProfile({
        depositId: input.depositId,
        tenantId: saved.tenantId,
        bookingId: saved.id,
        userId: saved.userId,
        storeId: saved.storeId,
        branchId: saved.branchId,
        amount: saved.depositAmount as number,
        currency: saved.currency,
        now: input.now,
      }),
    );

    return saved;
  }

  async transitionBooking(input: {
    readonly bookingId: BookingId;
    readonly toStatus: BookingStatus;
    readonly actorUserId?: UserId | undefined;
    readonly reason?: string | undefined;
    readonly now: IsoUtcDateTime;
  }): Promise<Booking> {
    const booking = await this.getBooking(input.bookingId);
    const updated = transitionBooking(booking, input.toStatus, {
      changedAt: input.now,
      changedByUserId: input.actorUserId,
      reason: input.reason,
    });

    return this.dependencies.bookingRepository.save(updated, {
      expectedVersion: booking.version,
    });
  }

  async getBooking(bookingId: BookingId): Promise<Booking> {
    const booking =
      await this.dependencies.bookingRepository.findById(bookingId);
    if (booking === null) {
      throw new DomainError("NOT_FOUND", "Booking not found", { bookingId });
    }

    return booking;
  }

  private async getBranch(branchId: BranchId) {
    const branch = await this.dependencies.branchRepository.findById(branchId);
    if (branch === null) {
      throw new DomainError("NOT_FOUND", "Branch not found", { branchId });
    }

    return branch;
  }

  private async getStore(storeId: StoreId) {
    const store = await this.dependencies.storeRepository.findById(storeId);
    if (store === null) {
      throw new DomainError("NOT_FOUND", "Store not found", { storeId });
    }

    return store;
  }
}

export interface SerializedBooking {
  readonly id: BookingId;
  readonly tenant_id: Booking["tenantId"];
  readonly booking_number: string;
  readonly user_id: UserId;
  readonly store_id: StoreId;
  readonly branch_id: BranchId;
  readonly asset_ids: readonly AssetId[];
  readonly equipment_ids: readonly EquipmentItemId[];
  readonly status: BookingStatus;
  readonly start_at: IsoUtcDateTime;
  readonly end_at: IsoUtcDateTime;
  readonly pickup_point_id: RentalPointId;
  readonly return_point_id: RentalPointId;
  readonly payment_method: BookingPaymentMethod;
  readonly currency: string;
  readonly subtotal_amount: number;
  readonly fee_amount: number;
  readonly deposit_amount: number;
  readonly discount_amount: number;
  readonly total_amount: number;
  readonly price_snapshot: Readonly<Record<string, unknown>>;
  readonly policy_snapshot: Readonly<Record<string, unknown>>;
  readonly qr_booking_token_reference: string;
  readonly status_history: readonly {
    readonly from_status: BookingStatus;
    readonly to_status: BookingStatus;
    readonly changed_at: IsoUtcDateTime;
    readonly changed_by_user_id?: UserId | undefined;
    readonly reason?: string | undefined;
  }[];
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: Booking["version"];
}

export const serializeBooking = (booking: Booking): SerializedBooking => ({
  id: booking.id,
  tenant_id: booking.tenantId,
  booking_number: booking.bookingNumber,
  user_id: booking.userId,
  store_id: booking.storeId,
  branch_id: booking.branchId,
  asset_ids: booking.assetIds,
  equipment_ids: booking.equipmentIds,
  status: booking.status,
  start_at: booking.startAt,
  end_at: booking.endAt,
  pickup_point_id: booking.pickupPointId,
  return_point_id: booking.returnPointId,
  payment_method: booking.paymentMethod,
  currency: booking.currency,
  subtotal_amount: booking.subtotalAmount as number,
  fee_amount: booking.feeAmount as number,
  deposit_amount: booking.depositAmount as number,
  discount_amount: booking.discountAmount as number,
  total_amount: booking.totalAmount as number,
  price_snapshot: booking.priceSnapshot,
  policy_snapshot: booking.policySnapshot,
  qr_booking_token_reference: booking.qrBookingTokenReference,
  status_history: booking.statusHistory.map((transition) => ({
    from_status: transition.fromStatus,
    to_status: transition.toStatus,
    changed_at: transition.changedAt,
    changed_by_user_id: transition.changedByUserId,
    reason: transition.reason,
  })),
  created_at: booking.createdAt,
  updated_at: booking.updatedAt,
  version: booking.version,
});
