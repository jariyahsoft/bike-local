import { DomainError } from "../../shared/domain/index.js";
import type {
  BookingId,
  DepositId,
  IdempotencyKey,
  OutboxEventId,
  Page,
  PageRequest,
  PaymentEventId,
  PaymentId,
  SaveOptions,
} from "../../shared/domain/index.js";
import type {
  Deposit,
  DepositRepository,
  OutboxEvent,
  OutboxEventRepository,
  Payment,
  PaymentEvent,
  PaymentEventRepository,
  PaymentRepository,
  PaymentSearchFilter,
} from "../domain/payment-repository.js";

export class InMemoryPaymentRepository implements PaymentRepository {
  private readonly payments = new Map<PaymentId, Payment>();

  async findById(id: PaymentId): Promise<Payment | null> {
    return this.payments.get(id) ?? null;
  }

  async findByIdempotencyKey(key: IdempotencyKey): Promise<Payment | null> {
    return (
      [...this.payments.values()].find(
        (payment) => payment.idempotencyKey === key,
      ) ?? null
    );
  }

  async search(
    filter: PaymentSearchFilter,
    page: PageRequest,
  ): Promise<Page<Payment>> {
    const items = [...this.payments.values()]
      .filter((payment) => payment.tenantId === filter.tenantId)
      .filter(
        (payment) =>
          filter.bookingId === undefined ||
          payment.bookingId === filter.bookingId,
      )
      .filter(
        (payment) =>
          filter.storeId === undefined || payment.storeId === filter.storeId,
      )
      .filter(
        (payment) =>
          filter.status === undefined || payment.status === filter.status,
      )
      .slice(0, page.limit);

    return { items };
  }

  async save(payment: Payment, options?: SaveOptions): Promise<Payment> {
    const current = this.payments.get(payment.id);
    if (
      options?.expectedVersion !== undefined &&
      current?.version !== options.expectedVersion
    ) {
      throw new DomainError("VERSION_CONFLICT", "Payment version conflict", {
        paymentId: payment.id,
      });
    }
    this.payments.set(payment.id, payment);
    return payment;
  }
}

export class InMemoryPaymentEventRepository implements PaymentEventRepository {
  private readonly events = new Map<PaymentEventId, PaymentEvent>();

  async findById(id: PaymentEventId): Promise<PaymentEvent | null> {
    return this.events.get(id) ?? null;
  }

  async findByProviderEvent(
    provider: string,
    providerEventId: string,
  ): Promise<PaymentEvent | null> {
    return (
      [...this.events.values()].find(
        (event) =>
          event.provider === provider &&
          event.providerEventId === providerEventId,
      ) ?? null
    );
  }

  async save(
    event: PaymentEvent,
    options?: SaveOptions,
  ): Promise<PaymentEvent> {
    const current = this.events.get(event.id);
    if (
      options?.expectedVersion !== undefined &&
      current?.version !== options.expectedVersion
    ) {
      throw new DomainError(
        "VERSION_CONFLICT",
        "Payment event version conflict",
        {
          paymentEventId: event.id,
        },
      );
    }
    this.events.set(event.id, event);
    return event;
  }
}

export class InMemoryDepositRepository implements DepositRepository {
  private readonly deposits = new Map<DepositId, Deposit>();

  async findById(id: DepositId): Promise<Deposit | null> {
    return this.deposits.get(id) ?? null;
  }

  async findByBookingId(bookingId: BookingId): Promise<Deposit | null> {
    return (
      [...this.deposits.values()].find(
        (deposit) => deposit.bookingId === bookingId,
      ) ?? null
    );
  }

  async save(deposit: Deposit, options?: SaveOptions): Promise<Deposit> {
    const current = this.deposits.get(deposit.id);
    if (
      options?.expectedVersion !== undefined &&
      current?.version !== options.expectedVersion
    ) {
      throw new DomainError("VERSION_CONFLICT", "Deposit version conflict", {
        depositId: deposit.id,
      });
    }
    this.deposits.set(deposit.id, deposit);
    return deposit;
  }
}

export class InMemoryOutboxEventRepository implements OutboxEventRepository {
  private readonly events = new Map<OutboxEventId, OutboxEvent>();

  async findById(id: OutboxEventId): Promise<OutboxEvent | null> {
    return this.events.get(id) ?? null;
  }

  async list(): Promise<readonly OutboxEvent[]> {
    return [...this.events.values()];
  }

  async save(event: OutboxEvent, options?: SaveOptions): Promise<OutboxEvent> {
    const current = this.events.get(event.id);
    if (
      options?.expectedVersion !== undefined &&
      current?.version !== options.expectedVersion
    ) {
      throw new DomainError(
        "VERSION_CONFLICT",
        "Outbox event version conflict",
        {
          outboxEventId: event.id,
        },
      );
    }
    this.events.set(event.id, event);
    return event;
  }
}
