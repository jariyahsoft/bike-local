import type {
  BookingId,
  EntityTimestamps,
  IdempotencyKey,
  Money,
  Page,
  PageRequest,
  PaymentId,
  StoreId,
  TenantId,
  TenantScopedEntity,
  UserId,
  VersionedEntity,
  IsoUtcDateTime,
} from "../../shared/domain/index.js";
import type { Repository, SaveOptions } from "../../shared/domain/index.js";

export type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "PAID"
  | "FAILED"
  | "EXPIRED"
  | "PARTIALLY_REFUNDED"
  | "REFUNDED"
  | "DISPUTED";
export type PaymentMethod = "GATEWAY" | "CASH";

export interface Payment
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: PaymentId;
  readonly bookingId: BookingId;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly method: PaymentMethod;
  readonly status: PaymentStatus;
  readonly amount: Money;
  readonly idempotencyKey: IdempotencyKey;
  readonly provider?: string;
  readonly providerReference?: string;
  readonly paidAt?: IsoUtcDateTime;
}

export interface PaymentSearchFilter {
  readonly tenantId: TenantId;
  readonly bookingId?: BookingId;
  readonly storeId?: StoreId;
  readonly status?: PaymentStatus;
}

export interface PaymentRepository extends Repository<Payment, PaymentId> {
  findByIdempotencyKey(key: IdempotencyKey): Promise<Payment | null>;
  search(
    filter: PaymentSearchFilter,
    page: PageRequest,
  ): Promise<Page<Payment>>;
  save(payment: Payment, options?: SaveOptions): Promise<Payment>;
}
