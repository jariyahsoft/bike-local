import { DomainError } from "../../shared/domain/index.js";
import type {
  IdempotencyKey,
  Page,
  PageRequest,
  PaymentId,
  SaveOptions,
} from "../../shared/domain/index.js";
import type {
  Payment,
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
