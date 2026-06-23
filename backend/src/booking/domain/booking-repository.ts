import type {
  AssetId,
  BookingId,
  BranchId,
  EntityTimestamps,
  EquipmentItemId,
  IdempotencyKey,
  Money,
  Page,
  PageRequest,
  RentalPointId,
  StoreId,
  TenantId,
  TenantScopedEntity,
  UserId,
  VersionedEntity,
  IsoUtcDateTime,
} from "../../shared/domain/index.js";
import type { Repository, SaveOptions } from "../../shared/domain/index.js";

export type BookingStatus =
  | "PENDING_PAYMENT"
  | "PENDING_STORE_CONFIRMATION"
  | "CONFIRMED"
  | "PREPARING"
  | "AWAITING_PICKUP"
  | "IN_PROGRESS"
  | "RETURN_PENDING"
  | "INSPECTION_PENDING"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW"
  | "DISPUTED";
export type BookingPaymentMethod = "ONLINE" | "CASH";

export interface BookingStatusTransition {
  readonly fromStatus: BookingStatus;
  readonly toStatus: BookingStatus;
  readonly changedAt: IsoUtcDateTime;
  readonly changedByUserId?: UserId | undefined;
  readonly reason?: string | undefined;
}

export interface Booking
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: BookingId;
  readonly bookingNumber: string;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly assetIds: readonly AssetId[];
  readonly equipmentIds: readonly EquipmentItemId[];
  readonly status: BookingStatus;
  readonly startAt: IsoUtcDateTime;
  readonly endAt: IsoUtcDateTime;
  readonly pickupPointId: RentalPointId;
  readonly returnPointId: RentalPointId;
  readonly paymentMethod: BookingPaymentMethod;
  readonly currency: string;
  readonly subtotalAmount: Money["amount"];
  readonly feeAmount: Money["amount"];
  readonly depositAmount: Money["amount"];
  readonly discountAmount: Money["amount"];
  readonly totalAmount: Money["amount"];
  readonly priceSnapshot: Readonly<Record<string, unknown>>;
  readonly policySnapshot: Readonly<Record<string, unknown>>;
  readonly qrBookingTokenReference: string;
  readonly idempotencyKey: IdempotencyKey;
  readonly statusHistory: readonly BookingStatusTransition[];
}

export interface BookingSearchFilter {
  readonly tenantId: TenantId;
  readonly storeId?: StoreId;
  readonly branchId?: BranchId;
  readonly userId?: UserId;
  readonly status?: BookingStatus;
}

export interface BookingRepository extends Repository<Booking, BookingId> {
  findByIdempotencyKey(key: IdempotencyKey): Promise<Booking | null>;
  findOverlappingConfirmedBooking(
    assetId: AssetId,
    startAt: IsoUtcDateTime,
    endAt: IsoUtcDateTime,
  ): Promise<Booking | null>;
  search(
    filter: BookingSearchFilter,
    page: PageRequest,
  ): Promise<Page<Booking>>;
  save(booking: Booking, options?: SaveOptions): Promise<Booking>;
}
