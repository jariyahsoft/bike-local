import {
  SecurityError,
  mapSecurityErrorToApiResponse,
} from "../../identity/api/security-error.js";
import {
  authorizeRequest,
  type SecurityPipelineDependencies,
} from "../../identity/application/security-pipeline.js";
import { buildApiErrorResponse } from "../../shared/api/api-error.js";
import {
  DomainError,
  asDomainId,
  type BookingId,
  type BranchId,
  type CorrelationId,
  type IdempotencyKey,
  type IsoUtcDateTime,
  type OutboxEventId,
  type PaymentEventId,
  type PaymentId,
  type UserId,
} from "../../shared/domain/index.js";
import {
  serializePayment,
  type PaymentService,
} from "../application/payment-service.js";

export interface PaymentApiDependencies {
  readonly security: SecurityPipelineDependencies;
  readonly paymentService: PaymentService;
  readonly now: () => IsoUtcDateTime;
  readonly buildPaymentId: () => string;
  readonly buildPaymentEventId: () => string;
  readonly buildOutboxEventId: () => string;
}

export interface PaymentApiRequestBase {
  readonly requestId: CorrelationId;
  readonly authorizationHeader?: string;
  readonly appCheckHeader?: string;
}

export interface CreatePaymentApiRequest extends PaymentApiRequestBase {
  readonly idempotencyKey: IdempotencyKey;
  readonly body: {
    readonly booking_id: BookingId;
    readonly method: "GATEWAY" | "CASH";
    readonly amount: number;
    readonly currency: string;
  };
}

export interface ProcessPaymentWebhookApiRequest {
  readonly requestId: CorrelationId;
  readonly provider: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: Readonly<Record<string, unknown>>;
}

export interface ConfirmCashPaymentApiRequest extends PaymentApiRequestBase {
  readonly bookingId: BookingId;
  readonly idempotencyKey: IdempotencyKey;
  readonly body: {
    readonly amount: number;
    readonly currency: string;
    readonly receiver_user_id: UserId;
    readonly branch_id: BranchId;
    readonly notes?: string;
    readonly evidence_image_ref?: string;
  };
}

const mapDomainError = (error: DomainError, requestId: string) => {
  const code =
    error.code === "NOT_FOUND"
      ? "PAYMENT_NOT_FOUND"
      : error.code === "VERSION_CONFLICT"
        ? "PAYMENT_VERSION_CONFLICT"
        : error.code;
  const status =
    error.code === "NOT_FOUND"
      ? 404
      : error.code === "VERSION_CONFLICT" ||
          error.code === "PAYMENT_WEBHOOK_REPLAYED"
        ? 409
        : error.code === "PERMISSION_DENIED"
          ? 403
          : error.code === "PAYMENT_PROVIDER_PROOF_INVALID"
            ? 401
            : 422;

  return {
    status,
    body: buildApiErrorResponse(
      code,
      error.message,
      { ...error.details },
      requestId,
    ),
  };
};

export const createPaymentEndpoint = async (
  request: CreatePaymentApiRequest,
  dependencies: PaymentApiDependencies,
) => {
  try {
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: {
        appCheck: "required",
        permissions: [],
      },
      target: {},
      dependencies: dependencies.security,
    });
    const booking = await dependencies.paymentService.getBookingForPayment(
      request.body.booking_id,
    );
    if (booking.userId !== context.user.userId) {
      throw new DomainError(
        "PERMISSION_DENIED",
        "Payment creation is limited to the booking owner.",
        {
          bookingId: booking.id,
        },
      );
    }

    const payment = await dependencies.paymentService.createPayment({
      paymentId: asDomainId<"Payment">(
        dependencies.buildPaymentId(),
      ) as PaymentId,
      bookingId: request.body.booking_id,
      method: request.body.method,
      amount: request.body.amount,
      currency: request.body.currency,
      idempotencyKey: request.idempotencyKey,
      now: dependencies.now(),
    });

    return {
      status: 201,
      body: {
        data: serializePayment(payment),
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const processPaymentWebhookEndpoint = async (
  request: ProcessPaymentWebhookApiRequest,
  dependencies: PaymentApiDependencies,
) => {
  try {
    const result = await dependencies.paymentService.processWebhook({
      paymentEventId: asDomainId<"PaymentEvent">(
        dependencies.buildPaymentEventId(),
      ) as PaymentEventId,
      outboxEventId: asDomainId<"OutboxEvent">(
        dependencies.buildOutboxEventId(),
      ) as OutboxEventId,
      provider: request.provider,
      headers: request.headers,
      payload: request.body,
      now: dependencies.now(),
    });

    return {
      status: 202,
      body: {
        data: {
          accepted: true,
          replayed: result.replayed,
          payment_id: result.payment?.id,
        },
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const confirmCashPaymentEndpoint = async (
  request: ConfirmCashPaymentApiRequest,
  dependencies: PaymentApiDependencies,
) => {
  try {
    const booking = await dependencies.paymentService.getBookingForPayment(
      request.bookingId,
    );
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: {
        appCheck: "required",
        permissions: ["payment.cash.confirm"],
      },
      target: {
        tenantId: booking.tenantId,
        storeId: booking.storeId,
        branchId: booking.branchId,
      },
      dependencies: dependencies.security,
    });

    const payment = await dependencies.paymentService.confirmCash({
      bookingId: request.bookingId,
      amount: request.body.amount,
      currency: request.body.currency,
      receiverUserId: request.body.receiver_user_id,
      actorUserId: context.user.userId,
      branchId: request.body.branch_id,
      notes: request.body.notes,
      evidenceImageRef: request.body.evidence_image_ref,
      correlationId: request.requestId,
      now: dependencies.now(),
    });

    return {
      status: 200,
      body: {
        data: serializePayment(payment),
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};
