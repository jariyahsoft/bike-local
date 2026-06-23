import { DomainError } from "../../shared/domain/domain-error.js";
import {
  asEntityVersion,
  asMinorUnitAmount,
  type BookingId,
  type BranchId,
  type DepositId,
  type IdempotencyKey,
  type IsoUtcDateTime,
  type PaymentEventId,
  type PaymentId,
  type StoreId,
  type TenantId,
  type UserId,
} from "../../shared/domain/index.js";
import type {
  Deposit,
  DepositStatus,
  Payment,
  PaymentEvent,
  PaymentMethod,
  PaymentStatus,
} from "./payment-repository.js";

const ALLOWED_PAYMENT_TRANSITIONS: Readonly<
  Record<PaymentStatus, readonly PaymentStatus[]>
> = {
  PENDING: ["PROCESSING", "PAID", "FAILED", "EXPIRED"],
  PROCESSING: ["PAID", "FAILED", "EXPIRED", "DISPUTED"],
  PAID: ["PARTIALLY_REFUNDED", "REFUNDED", "DISPUTED"],
  FAILED: [],
  EXPIRED: [],
  PARTIALLY_REFUNDED: ["REFUNDED", "DISPUTED"],
  REFUNDED: [],
  DISPUTED: ["PARTIALLY_REFUNDED", "REFUNDED"],
};

export const assertPaymentTransitionAllowed = (
  fromStatus: PaymentStatus,
  toStatus: PaymentStatus,
): void => {
  if (!ALLOWED_PAYMENT_TRANSITIONS[fromStatus].includes(toStatus)) {
    throw new DomainError(
      "PAYMENT_STATE_TRANSITION_INVALID",
      "Payment state transition is not allowed.",
      {
        fromStatus,
        toStatus,
      },
    );
  }
};

export const createPaymentProfile = (input: {
  readonly paymentId: PaymentId;
  readonly tenantId: TenantId;
  readonly bookingId: BookingId;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly method: PaymentMethod;
  readonly amount: number;
  readonly currency: string;
  readonly idempotencyKey: IdempotencyKey;
  readonly provider?: string | undefined;
  readonly providerReference?: string | undefined;
  readonly now: IsoUtcDateTime;
}): Payment => ({
  id: input.paymentId,
  tenantId: input.tenantId,
  bookingId: input.bookingId,
  userId: input.userId,
  storeId: input.storeId,
  branchId: input.branchId,
  method: input.method,
  status: input.method === "CASH" ? "PENDING" : "PROCESSING",
  amount: {
    amount: asMinorUnitAmount(input.amount),
    currency: input.currency,
  },
  idempotencyKey: input.idempotencyKey,
  ...(input.provider === undefined ? {} : { provider: input.provider }),
  ...(input.providerReference === undefined
    ? {}
    : { providerReference: input.providerReference }),
  createdAt: input.now,
  updatedAt: input.now,
  version: asEntityVersion(1),
});

export const markPaymentPaid = (
  payment: Payment,
  input: {
    readonly paidAt: IsoUtcDateTime;
    readonly providerReference?: string | undefined;
    readonly confirmedByUserId?: UserId | undefined;
    readonly cashNotes?: string | undefined;
    readonly cashEvidenceImageRef?: string | undefined;
  },
): Payment => {
  assertPaymentTransitionAllowed(payment.status, "PAID");
  const providerReference =
    input.providerReference === undefined
      ? payment.providerReference
      : input.providerReference;

  return {
    ...payment,
    status: "PAID",
    paidAt: input.paidAt,
    ...(providerReference === undefined ? {} : { providerReference }),
    ...(input.confirmedByUserId === undefined
      ? {}
      : {
          confirmedByUserId: input.confirmedByUserId,
          cashReceivedAt: input.paidAt,
        }),
    ...(input.cashNotes === undefined ? {} : { cashNotes: input.cashNotes }),
    ...(input.cashEvidenceImageRef === undefined
      ? {}
      : { cashEvidenceImageRef: input.cashEvidenceImageRef }),
    updatedAt: input.paidAt,
    version: asEntityVersion((payment.version as number) + 1),
  };
};

export const createPaymentEventProfile = (input: {
  readonly paymentEventId: PaymentEventId;
  readonly tenantId: TenantId;
  readonly provider: string;
  readonly providerEventId: string;
  readonly paymentId?: PaymentId | undefined;
  readonly bookingId?: BookingId | undefined;
  readonly eventType: string;
  readonly verified: boolean;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly now: IsoUtcDateTime;
}): PaymentEvent => ({
  id: input.paymentEventId,
  tenantId: input.tenantId,
  provider: input.provider,
  providerEventId: input.providerEventId,
  paymentId: input.paymentId,
  bookingId: input.bookingId,
  eventType: input.eventType,
  verified: input.verified,
  payload: input.payload,
  createdAt: input.now,
  updatedAt: input.now,
  version: asEntityVersion(1),
});

export const createDepositProfile = (input: {
  readonly depositId: DepositId;
  readonly tenantId: TenantId;
  readonly bookingId: BookingId;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly amount: number;
  readonly currency: string;
  readonly now: IsoUtcDateTime;
}): Deposit => ({
  id: input.depositId,
  tenantId: input.tenantId,
  bookingId: input.bookingId,
  userId: input.userId,
  storeId: input.storeId,
  branchId: input.branchId,
  status: input.amount > 0 ? "PENDING" : "NOT_REQUIRED",
  amount: {
    amount: asMinorUnitAmount(input.amount),
    currency: input.currency,
  },
  deductedAmount: {
    amount: asMinorUnitAmount(0),
    currency: input.currency,
  },
  createdAt: input.now,
  updatedAt: input.now,
  version: asEntityVersion(1),
});

export const transitionDeposit = (
  deposit: Deposit,
  status: DepositStatus,
  input: {
    readonly now: IsoUtcDateTime;
    readonly bookingStatus: string;
  },
): Deposit => {
  if (
    status === "RELEASED" &&
    !["INSPECTION_PENDING", "COMPLETED", "DISPUTED"].includes(
      input.bookingStatus,
    )
  ) {
    throw new DomainError(
      "DEPOSIT_RELEASE_REQUIRES_INSPECTION",
      "Deposit cannot be released before return inspection.",
      {
        bookingId: deposit.bookingId,
        bookingStatus: input.bookingStatus,
      },
    );
  }

  return {
    ...deposit,
    status,
    ...(status === "HELD"
      ? { heldAt: input.now }
      : deposit.heldAt === undefined
        ? {}
        : { heldAt: deposit.heldAt }),
    ...(status === "RELEASED"
      ? { releasedAt: input.now }
      : deposit.releasedAt === undefined
        ? {}
        : { releasedAt: deposit.releasedAt }),
    updatedAt: input.now,
    version: asEntityVersion((deposit.version as number) + 1),
  };
};
