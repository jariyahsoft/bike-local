import type { AuditLogWriter } from "../../identity/application/security-pipeline.js";
import type { BookingService } from "../../booking/application/booking-service.js";
import type { Booking } from "../../booking/domain/booking-repository.js";
import { DomainError, asEntityVersion } from "../../shared/domain/index.js";
import type {
  BookingId,
  CorrelationId,
  DepositId,
  IdempotencyKey,
  IsoUtcDateTime,
  OutboxEventId,
  PaymentEventId,
  PaymentId,
  UserId,
} from "../../shared/domain/index.js";
import {
  createPaymentEventProfile,
  createPaymentProfile,
  markPaymentPaid,
  transitionDeposit,
} from "../domain/payment-policies.js";
import type {
  Deposit,
  DepositRepository,
  OutboxEvent,
  OutboxEventRepository,
  Payment,
  PaymentEventRepository,
  PaymentMethod,
  PaymentRepository,
} from "../domain/payment-repository.js";

export interface PaymentIntentRequest {
  readonly payment: Payment;
  readonly booking: Booking;
}

export interface PaymentIntentResult {
  readonly provider: string;
  readonly providerReference: string;
  readonly clientSecretReference?: string | undefined;
}

export interface PaymentIntentProvider {
  createIntent(request: PaymentIntentRequest): Promise<PaymentIntentResult>;
}

export interface VerifiedWebhookEvent {
  readonly providerEventId: string;
  readonly eventType: "payment.paid" | "payment.failed" | "payment.expired";
  readonly paymentId?: PaymentId | undefined;
  readonly bookingId?: BookingId | undefined;
  readonly providerReference?: string | undefined;
  readonly payload: Readonly<Record<string, unknown>>;
}

export interface PaymentWebhookVerifier {
  verify(input: {
    readonly provider: string;
    readonly headers: Readonly<Record<string, string>>;
    readonly payload: Readonly<Record<string, unknown>>;
  }): Promise<VerifiedWebhookEvent>;
}

export interface PaymentServiceDependencies {
  readonly bookingService: BookingService;
  readonly paymentRepository: PaymentRepository;
  readonly paymentEventRepository: PaymentEventRepository;
  readonly depositRepository: DepositRepository;
  readonly outboxEventRepository: OutboxEventRepository;
  readonly paymentIntentProvider: PaymentIntentProvider;
  readonly webhookVerifier: PaymentWebhookVerifier;
  readonly auditLogWriter: AuditLogWriter;
}

export interface CreatePaymentInput {
  readonly paymentId: PaymentId;
  readonly bookingId: BookingId;
  readonly method: PaymentMethod;
  readonly amount: number;
  readonly currency: string;
  readonly idempotencyKey: IdempotencyKey;
  readonly now: IsoUtcDateTime;
}

export interface ProcessWebhookInput {
  readonly paymentEventId: PaymentEventId;
  readonly outboxEventId: OutboxEventId;
  readonly provider: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly now: IsoUtcDateTime;
}

export interface ConfirmCashInput {
  readonly bookingId: BookingId;
  readonly amount: number;
  readonly currency: string;
  readonly receiverUserId: UserId;
  readonly actorUserId: UserId;
  readonly branchId: string;
  readonly notes?: string | undefined;
  readonly evidenceImageRef?: string | undefined;
  readonly correlationId: CorrelationId;
  readonly now: IsoUtcDateTime;
}

export class PaymentService {
  constructor(private readonly dependencies: PaymentServiceDependencies) {}

  async createPayment(input: CreatePaymentInput): Promise<Payment> {
    const existing =
      await this.dependencies.paymentRepository.findByIdempotencyKey(
        input.idempotencyKey,
      );
    if (existing !== null) {
      return existing;
    }

    const booking = await this.dependencies.bookingService.getBooking(
      input.bookingId,
    );
    this.assertAmountMatchesBooking(booking, input.amount, input.currency);

    const payment = createPaymentProfile({
      paymentId: input.paymentId,
      tenantId: booking.tenantId,
      bookingId: booking.id,
      userId: booking.userId,
      storeId: booking.storeId,
      branchId: booking.branchId,
      method: input.method,
      amount: input.amount,
      currency: input.currency,
      idempotencyKey: input.idempotencyKey,
      now: input.now,
    });

    if (input.method === "GATEWAY") {
      const intent = await this.dependencies.paymentIntentProvider.createIntent(
        {
          payment,
          booking,
        },
      );
      return this.dependencies.paymentRepository.save({
        ...payment,
        provider: intent.provider,
        providerReference: intent.providerReference,
      });
    }

    return this.dependencies.paymentRepository.save(payment);
  }

  async processWebhook(input: ProcessWebhookInput): Promise<{
    readonly replayed: boolean;
    readonly payment?: Payment | undefined;
  }> {
    let verified: VerifiedWebhookEvent;
    try {
      verified = await this.dependencies.webhookVerifier.verify({
        provider: input.provider,
        headers: input.headers,
        payload: input.payload,
      });
    } catch (error) {
      throw new DomainError(
        "PAYMENT_PROVIDER_PROOF_INVALID",
        "Payment webhook provider proof is invalid.",
        {
          provider: input.provider,
          cause: error instanceof Error ? error.message : "unknown",
        },
      );
    }

    const existing =
      await this.dependencies.paymentEventRepository.findByProviderEvent(
        input.provider,
        verified.providerEventId,
      );
    if (existing !== null) {
      return { replayed: true };
    }

    const payment = await this.resolveWebhookPayment(verified);
    const event = createPaymentEventProfile({
      paymentEventId: input.paymentEventId,
      tenantId: payment.tenantId,
      provider: input.provider,
      providerEventId: verified.providerEventId,
      paymentId: payment.id,
      bookingId: payment.bookingId,
      eventType: verified.eventType,
      verified: true,
      payload: verified.payload,
      now: input.now,
    });
    await this.dependencies.paymentEventRepository.save(event);

    if (verified.eventType !== "payment.paid") {
      return { replayed: false, payment };
    }

    const paid = markPaymentPaid(payment, {
      paidAt: input.now,
      providerReference: verified.providerReference,
    });
    const saved = await this.dependencies.paymentRepository.save(paid, {
      expectedVersion: payment.version,
    });
    await this.dependencies.outboxEventRepository.save(
      this.buildOutboxEvent({
        id: input.outboxEventId,
        tenantId: saved.tenantId,
        type: "payment.completed",
        aggregateType: "payment",
        aggregateId: saved.id,
        payload: {
          payment_id: saved.id,
          booking_id: saved.bookingId,
          amount: saved.amount.amount,
          currency: saved.amount.currency,
        },
        now: input.now,
      }),
    );

    return { replayed: false, payment: saved };
  }

  async confirmCash(input: ConfirmCashInput): Promise<Payment> {
    const booking = await this.dependencies.bookingService.getBooking(
      input.bookingId,
    );
    this.assertAmountMatchesBooking(booking, input.amount, input.currency);
    if (input.branchId !== booking.branchId) {
      throw new DomainError("PERMISSION_DENIED", "Cash branch mismatch.", {
        bookingId: booking.id,
        branchId: input.branchId,
      });
    }

    const payments = await this.dependencies.paymentRepository.search(
      {
        tenantId: booking.tenantId,
        bookingId: booking.id,
        status: "PENDING",
      },
      { limit: 10 },
    );
    const payment = payments.items.find(
      (candidate) => candidate.method === "CASH",
    );
    if (payment === undefined) {
      throw new DomainError("NOT_FOUND", "Cash payment not found.", {
        bookingId: booking.id,
      });
    }

    const paid = markPaymentPaid(payment, {
      paidAt: input.now,
      confirmedByUserId: input.receiverUserId,
      cashNotes: input.notes,
      cashEvidenceImageRef: input.evidenceImageRef,
    });
    const saved = await this.dependencies.paymentRepository.save(paid, {
      expectedVersion: payment.version,
    });

    await this.dependencies.auditLogWriter.append({
      tenantId: booking.tenantId,
      action: "payment.cash.confirmed",
      resourceType: "payment",
      resourceId: saved.id,
      actor: {
        actorType: "USER",
        actorUserId: input.actorUserId,
        roleNames: [],
      },
      after: {
        booking_id: booking.id,
        amount: input.amount,
        currency: input.currency,
        receiver_user_id: input.receiverUserId,
        branch_id: input.branchId,
      },
      metadata: {
        correlationId: input.correlationId,
        occurredAt: input.now,
        immutable: true,
        classification: "FINANCIAL",
      },
    });

    if (booking.status === "PENDING_STORE_CONFIRMATION") {
      await this.dependencies.bookingService.transitionBooking({
        bookingId: booking.id,
        toStatus: "CONFIRMED",
        actorUserId: input.actorUserId,
        reason: "cash_confirmed",
        now: input.now,
      });
    }

    return saved;
  }

  async releaseDeposit(input: {
    readonly depositId: DepositId;
    readonly now: IsoUtcDateTime;
  }): Promise<Deposit> {
    const deposit = await this.getDeposit(input.depositId);
    const booking = await this.dependencies.bookingService.getBooking(
      deposit.bookingId,
    );
    const updated = transitionDeposit(deposit, "RELEASED", {
      now: input.now,
      bookingStatus: booking.status,
    });

    return this.dependencies.depositRepository.save(updated, {
      expectedVersion: deposit.version,
    });
  }

  async getDeposit(depositId: DepositId): Promise<Deposit> {
    const deposit =
      await this.dependencies.depositRepository.findById(depositId);
    if (deposit === null) {
      throw new DomainError("NOT_FOUND", "Deposit not found.", { depositId });
    }

    return deposit;
  }

  async getBookingForPayment(bookingId: BookingId): Promise<Booking> {
    return this.dependencies.bookingService.getBooking(bookingId);
  }

  private async resolveWebhookPayment(
    verified: VerifiedWebhookEvent,
  ): Promise<Payment> {
    if (verified.paymentId !== undefined) {
      const payment = await this.dependencies.paymentRepository.findById(
        verified.paymentId,
      );
      if (payment !== null) {
        return payment;
      }
    }

    if (verified.bookingId !== undefined) {
      const booking = await this.dependencies.bookingService.getBooking(
        verified.bookingId,
      );
      const payments = await this.dependencies.paymentRepository.search(
        {
          tenantId: booking.tenantId,
          bookingId: booking.id,
        },
        { limit: 10 },
      );
      const payment = payments.items.find(
        (candidate) => candidate.method === "GATEWAY",
      );
      if (payment !== undefined) {
        return payment;
      }
    }

    throw new DomainError("NOT_FOUND", "Payment for webhook was not found.", {
      paymentId: verified.paymentId,
      bookingId: verified.bookingId,
    });
  }

  private assertAmountMatchesBooking(
    booking: Booking,
    amount: number,
    currency: string,
  ): void {
    if (
      (booking.totalAmount as number) !== amount ||
      booking.currency !== currency
    ) {
      throw new DomainError(
        "BOOKING_PAYMENT_AMOUNT_MISMATCH",
        "Payment amount does not match booking total snapshot.",
        {
          bookingId: booking.id,
          expectedAmount: booking.totalAmount,
          expectedCurrency: booking.currency,
          amount,
          currency,
        },
      );
    }
  }

  private buildOutboxEvent(input: {
    readonly id: OutboxEventId;
    readonly tenantId: Booking["tenantId"];
    readonly type: string;
    readonly aggregateType: string;
    readonly aggregateId: string;
    readonly payload: Readonly<Record<string, unknown>>;
    readonly now: IsoUtcDateTime;
  }): OutboxEvent {
    return {
      id: input.id,
      tenantId: input.tenantId,
      type: input.type,
      aggregateType: input.aggregateType,
      aggregateId: input.aggregateId,
      payload: input.payload,
      occurredAt: input.now,
      createdAt: input.now,
      updatedAt: input.now,
      version: asEntityVersion(1),
    };
  }
}

export interface SerializedPayment {
  readonly id: PaymentId;
  readonly tenant_id: Payment["tenantId"];
  readonly booking_id: BookingId;
  readonly user_id: Payment["userId"];
  readonly store_id: Payment["storeId"];
  readonly branch_id: Payment["branchId"];
  readonly provider?: string | undefined;
  readonly provider_reference?: string | undefined;
  readonly method: Payment["method"];
  readonly status: Payment["status"];
  readonly amount: number;
  readonly currency: string;
  readonly idempotency_key: IdempotencyKey;
  readonly paid_at?: IsoUtcDateTime | undefined;
  readonly confirmed_by?: UserId | undefined;
  readonly cash_received_at?: IsoUtcDateTime | undefined;
  readonly cash_notes?: string | undefined;
  readonly cash_evidence_image_ref?: string | undefined;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: Payment["version"];
}

export const serializePayment = (payment: Payment): SerializedPayment => ({
  id: payment.id,
  tenant_id: payment.tenantId,
  booking_id: payment.bookingId,
  user_id: payment.userId,
  store_id: payment.storeId,
  branch_id: payment.branchId,
  provider: payment.provider,
  provider_reference: payment.providerReference,
  method: payment.method,
  status: payment.status,
  amount: payment.amount.amount as number,
  currency: payment.amount.currency,
  idempotency_key: payment.idempotencyKey,
  paid_at: payment.paidAt,
  confirmed_by: payment.confirmedByUserId,
  cash_received_at: payment.cashReceivedAt,
  cash_notes: payment.cashNotes,
  cash_evidence_image_ref: payment.cashEvidenceImageRef,
  created_at: payment.createdAt,
  updated_at: payment.updatedAt,
  version: payment.version,
});
