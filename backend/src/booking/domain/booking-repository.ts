import type {
  AssetId,
  BookingId,
  BranchId,
  EntityTimestamps,
  EntityVersion,
  Money,
  Page,
  PageRequest,
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

export interface Booking
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: BookingId;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly assetIds: readonly AssetId[];
  readonly status: BookingStatus;
  readonly startAt: IsoUtcDateTime;
  readonly endAt: IsoUtcDateTime;
  readonly total: Money;
  readonly deposit: Money;
  readonly policySnapshot: Readonly<Record<string, unknown>>;
}

export interface BookingSearchFilter {
  readonly tenantId: TenantId;
  readonly storeId?: StoreId;
  readonly branchId?: BranchId;
  readonly userId?: UserId;
  readonly status?: BookingStatus;
}

export interface BookingRepository extends Repository<Booking, BookingId> {
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
