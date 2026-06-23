import type {
  BookingId,
  EntityTimestamps,
  Money,
  Page,
  PageRequest,
  ReturnRequestId,
  StoreId,
  TenantId,
  TenantScopedEntity,
  UserId,
  VersionedEntity,
  IsoUtcDateTime,
} from "../../shared/domain/index.js";
import type { Repository, SaveOptions } from "../../shared/domain/index.js";

export type ReturnRequestStatus =
  | "REQUESTED"
  | "VALIDATING_LOCATION"
  | "WAITING_FOR_STORE"
  | "STAFF_ASSIGNED"
  | "PICKUP_IN_PROGRESS"
  | "INSPECTION_PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "DISPUTED"
  | "CANCELLED";

export interface ReturnRequest extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: ReturnRequestId;
  readonly bookingId: BookingId;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly status: ReturnRequestStatus;
  readonly requestedAt: IsoUtcDateTime;
  readonly evidenceImageRefs: readonly string[];
  readonly damageCharge?: Money;
}

export interface ReturnRequestSearchFilter {
  readonly tenantId: TenantId;
  readonly bookingId?: BookingId;
  readonly storeId?: StoreId;
  readonly status?: ReturnRequestStatus;
}

export interface ReturnRepository extends Repository<ReturnRequest, ReturnRequestId> {
  findByBookingId(bookingId: BookingId): Promise<ReturnRequest | null>;
  search(filter: ReturnRequestSearchFilter, page: PageRequest): Promise<Page<ReturnRequest>>;
  save(request: ReturnRequest, options?: SaveOptions): Promise<ReturnRequest>;
}
