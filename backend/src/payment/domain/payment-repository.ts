import type {
  BookingId,
  BranchId,
  DepositId,
  EntityTimestamps,
  IdempotencyKey,
  Money,
  OutboxEventId,
  Page,
  PageRequest,
  PaymentEventId,
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
export type DepositStatus =
  | "NOT_REQUIRED"
  | "PENDING"
  | "HELD"
  | "PARTIALLY_DEDUCTED"
  | "RELEASED"
  | "FORFEITED";

export interface Payment
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: PaymentId;
  readonly bookingId: BookingId;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly method: PaymentMethod;
  readonly status: PaymentStatus;
  readonly amount: Money;
  readonly idempotencyKey: IdempotencyKey;
  readonly provider?: string;
  readonly providerReference?: string;
  readonly paidAt?: IsoUtcDateTime;
  readonly confirmedByUserId?: UserId;
  readonly cashReceivedAt?: IsoUtcDateTime;
  readonly cashNotes?: string;
  readonly cashEvidenceImageRef?: string;
}

export interface PaymentEvent
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: PaymentEventId;
  readonly provider: string;
  readonly providerEventId: string;
  readonly paymentId?: PaymentId | undefined;
  readonly bookingId?: BookingId | undefined;
  readonly eventType: string;
  readonly verified: boolean;
  readonly payload: Readonly<Record<string, unknown>>;
}

export interface Deposit
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: DepositId;
  readonly bookingId: BookingId;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly status: DepositStatus;
  readonly amount: Money;
  readonly deductedAmount: Money;
  readonly heldAt?: IsoUtcDateTime;
  readonly releasedAt?: IsoUtcDateTime;
}

export interface OutboxEvent
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: OutboxEventId;
  readonly type: string;
  readonly aggregateType: string;
  readonly aggregateId: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly occurredAt: IsoUtcDateTime;
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

export interface PaymentEventRepository extends Repository<
  PaymentEvent,
  PaymentEventId
> {
  findByProviderEvent(
    provider: string,
    providerEventId: string,
  ): Promise<PaymentEvent | null>;
  save(event: PaymentEvent, options?: SaveOptions): Promise<PaymentEvent>;
}

export interface DepositRepository extends Repository<Deposit, DepositId> {
  findByBookingId(bookingId: BookingId): Promise<Deposit | null>;
  search(
    filter: {
      readonly tenantId: TenantId;
      readonly storeId?: StoreId | undefined;
      readonly status?: DepositStatus | undefined;
    },
    page: PageRequest,
  ): Promise<Page<Deposit>>;
  save(deposit: Deposit, options?: SaveOptions): Promise<Deposit>;
}

export interface OutboxEventRepository extends Repository<
  OutboxEvent,
  OutboxEventId
> {
  list(): Promise<readonly OutboxEvent[]>;
  save(event: OutboxEvent, options?: SaveOptions): Promise<OutboxEvent>;
}
