import assert from "node:assert/strict";
import test from "node:test";

import type { AuditLogEntry } from "../../audit/domain/audit-log.js";
import { BookingService } from "../application/booking-service.js";
import { createBookingEndpoint } from "../api/booking-api.js";
import { InMemoryBookingRepository } from "../infrastructure/in-memory-booking-repository.js";
import type {
  AppCheckTokenVerifier,
  DomainUserResolver,
  FirebaseIdTokenVerifier,
  RoleAssignmentLookup,
} from "../../identity/application/security-pipeline.js";
import type { RoleAssignment } from "../../identity/domain/rbac.js";
import { InventoryService } from "../../inventory/application/inventory-service.js";
import {
  InMemoryAssetCategoryRepository,
  InMemoryAssetRepository,
  InMemoryAvailabilityBlockRepository,
  InMemoryEquipmentItemRepository,
  InMemoryInventoryUnitRepository,
  InMemoryPricingRuleRepository,
  InMemoryRentalPointRepository,
} from "../../inventory/infrastructure/in-memory-inventory-repositories.js";
import {
  PaymentService,
  type PaymentIntentProvider,
  type PaymentWebhookVerifier,
} from "../../payment/application/payment-service.js";
import {
  confirmCashPaymentEndpoint,
  createPaymentEndpoint,
  processPaymentWebhookEndpoint,
} from "../../payment/api/payment-api.js";
import {
  InMemoryDepositRepository,
  InMemoryOutboxEventRepository,
  InMemoryPaymentEventRepository,
  InMemoryPaymentRepository,
} from "../../payment/infrastructure/in-memory-payment-repository.js";
import {
  asDomainId,
  asIsoUtcDateTime,
  type AssetId,
  type BookingId,
  type BranchId,
  type DepositId,
  type PaymentId,
  type RentalPointId,
  type StoreId,
} from "../../shared/domain/index.js";
import {
  applyApprovalDecision,
  createBranchProfile,
  createStoreDraft,
  submitStoreForApproval,
} from "../../stores/domain/store-policies.js";
import {
  InMemoryBranchRepository,
  InMemoryStoreRepository,
} from "../../stores/infrastructure/in-memory-store-management-repositories.js";

class InMemoryAuditLogWriter {
  readonly entries: AuditLogEntry[] = [];

  async append(entry: AuditLogEntry): Promise<void> {
    this.entries.push(entry);
  }
}

const expectData = <T>(response: { readonly body: unknown }): T => {
  assert.equal(typeof response.body, "object");
  assert.notEqual(response.body, null);
  const body = response.body as Record<string, unknown>;
  assert.ok("data" in body);

  return body.data as T;
};

const expectErrorCode = (response: { readonly body: unknown }): string => {
  assert.equal(typeof response.body, "object");
  assert.notEqual(response.body, null);
  const body = response.body as Record<string, unknown>;
  assert.ok("error" in body);

  return (body.error as { readonly code: string }).code;
};

const createApprovedStore = async (
  storeRepository: InMemoryStoreRepository,
  branchRepository: InMemoryBranchRepository,
) => {
  const now = asIsoUtcDateTime("2026-06-23T16:00:00Z");
  const draft = createStoreDraft({
    storeId: asDomainId<"Store">("store_1"),
    tenantId: asDomainId<"Tenant">("store_1"),
    ownerUserId: asDomainId<"User">("usr_owner"),
    legalName: "Bike Local Demo Co.",
    displayName: "Bike Local Demo",
    defaultCurrency: "THB",
    timezone: "Asia/Bangkok",
    now,
  });
  const store = applyApprovalDecision(
    submitStoreForApproval(draft, now),
    "APPROVED",
    asDomainId<"User">("usr_admin"),
    "documents_verified",
    now,
  );
  const branch = createBranchProfile({
    branchId: asDomainId<"Branch">("brn_1"),
    store,
    name: "Old Town",
    address: "1 Demo Road",
    country: "TH",
    latitude: 13.7563,
    longitude: 100.5018,
    now,
  });
  await storeRepository.save(store);
  await branchRepository.save(branch);

  return { store, branch };
};

const createTestContext = async () => {
  const storeRepository = new InMemoryStoreRepository();
  const branchRepository = new InMemoryBranchRepository();
  const bookingRepository = new InMemoryBookingRepository();
  const paymentRepository = new InMemoryPaymentRepository();
  const paymentEventRepository = new InMemoryPaymentEventRepository();
  const depositRepository = new InMemoryDepositRepository();
  const outboxEventRepository = new InMemoryOutboxEventRepository();
  const auditLogWriter = new InMemoryAuditLogWriter();
  const assetCategoryRepository = new InMemoryAssetCategoryRepository();
  const assetRepository = new InMemoryAssetRepository();
  const equipmentItemRepository = new InMemoryEquipmentItemRepository();
  const inventoryUnitRepository = new InMemoryInventoryUnitRepository();
  const rentalPointRepository = new InMemoryRentalPointRepository();
  const pricingRuleRepository = new InMemoryPricingRuleRepository();
  const availabilityBlockRepository = new InMemoryAvailabilityBlockRepository();
  let bookingCounter = 0;
  let paymentCounter = 0;
  let paymentEventCounter = 0;
  let outboxCounter = 0;
  let blockCounter = 0;

  const { store, branch } = await createApprovedStore(
    storeRepository,
    branchRepository,
  );
  const tokenVerifier: FirebaseIdTokenVerifier = {
    verifyIdToken: async (token) => {
      const uidByToken = new Map([
        ["renter-token", "renter_uid"],
        ["owner-token", "owner_uid"],
        ["staff-token", "staff_uid"],
      ]);
      const uid = uidByToken.get(token);
      if (uid === undefined) {
        throw new Error("invalid token");
      }

      return {
        uid,
        claims: {},
        issuedAt: asIsoUtcDateTime("2026-06-23T16:00:00Z"),
        expiresAt: asIsoUtcDateTime("2026-06-23T17:00:00Z"),
      };
    },
  };
  const appCheckVerifier: AppCheckTokenVerifier = {
    verifyToken: async (token) => {
      if (token !== "valid-app-check") {
        throw new Error("invalid app check");
      }

      return {
        appId: "bike-local",
        tokenId: "app-check-1",
        issuedAt: asIsoUtcDateTime("2026-06-23T16:00:00Z"),
        expiresAt: asIsoUtcDateTime("2026-06-23T17:00:00Z"),
      };
    },
  };
  const userResolver: DomainUserResolver = {
    resolveByFirebaseUid: async (firebaseUid) => {
      const userIdByUid = new Map([
        ["renter_uid", asDomainId<"User">("usr_renter")],
        ["owner_uid", asDomainId<"User">("usr_owner")],
        ["staff_uid", asDomainId<"User">("usr_staff")],
      ]);
      const userId = userIdByUid.get(firebaseUid);

      return userId === undefined ? null : { userId, status: "ACTIVE" };
    },
  };
  const assignments = new Map<string, readonly RoleAssignment[]>([
    ["usr_renter", [{ role: "RENTER" }]],
    [
      "usr_owner",
      [{ role: "STORE_OWNER", tenantId: store.tenantId, storeId: store.id }],
    ],
    [
      "usr_staff",
      [
        {
          role: "STORE_STAFF",
          tenantId: store.tenantId,
          storeId: store.id,
          branchIds: [branch.id],
        },
      ],
    ],
  ]);
  const roleLookup: RoleAssignmentLookup = {
    listRoleAssignments: async (userId) =>
      assignments.get(userId as string) ?? [],
  };

  const inventoryService = new InventoryService({
    storeRepository,
    branchRepository,
    bookingRepository,
    assetCategoryRepository,
    assetRepository,
    equipmentItemRepository,
    inventoryUnitRepository,
    rentalPointRepository,
    pricingRuleRepository,
    availabilityBlockRepository,
  });
  const bookingService = new BookingService({
    bookingRepository,
    depositRepository,
    storeRepository,
    branchRepository,
    inventoryService,
  });
  const paymentIntentProvider: PaymentIntentProvider = {
    createIntent: async ({ payment }) => ({
      provider: "stub_gateway",
      providerReference: `intent_${payment.id}`,
    }),
  };
  const webhookVerifier: PaymentWebhookVerifier = {
    verify: async ({ provider, headers, payload }) => {
      if (headers["x-stub-signature"] !== "valid") {
        throw new Error("invalid signature");
      }

      return {
        providerEventId: payload.provider_event_id as string,
        eventType: payload.event_type as "payment.paid",
        paymentId: payload.payment_id as PaymentId,
        bookingId: payload.booking_id as BookingId,
        providerReference: `${provider}_paid_ref`,
        payload,
      };
    },
  };
  const paymentService = new PaymentService({
    bookingService,
    paymentRepository,
    paymentEventRepository,
    depositRepository,
    outboxEventRepository,
    paymentIntentProvider,
    webhookVerifier,
    auditLogWriter,
  });

  const category = await inventoryService.createAssetCategory({
    categoryId: asDomainId<"AssetCategory">("cat_1"),
    storeId: store.id,
    name: "City bike",
    type: "BIKE",
    defaultBasePrice: 10000,
    defaultDepositAmount: 50000,
    currency: "THB",
    now: asIsoUtcDateTime("2026-06-23T16:05:00Z"),
  });
  const point = await inventoryService.createRentalPoint({
    rentalPointId: asDomainId<"RentalPoint">("point_1"),
    storeId: store.id,
    branchId: branch.id,
    name: "Front desk",
    latitude: 13.7563,
    longitude: 100.5018,
    now: asIsoUtcDateTime("2026-06-23T16:05:00Z"),
  });
  const equipment = await inventoryService.createEquipmentItem({
    equipmentItemId: asDomainId<"EquipmentItem">("eq_1"),
    storeId: store.id,
    branchId: branch.id,
    name: "Helmet",
    rentalMode: "DEPOSIT_REQUIRED",
    priceAmount: 1000,
    depositAmount: 5000,
    currency: "THB",
    now: asIsoUtcDateTime("2026-06-23T16:05:00Z"),
  });
  const asset = await inventoryService.createAsset({
    assetId: asDomainId<"Asset">("asset_1"),
    storeId: store.id,
    branchId: branch.id,
    categoryId: category.id,
    code: "BIKE-001",
    basePrice: 10000,
    depositAmount: 50000,
    currency: "THB",
    currentPointId: point.id,
    equipmentIds: [equipment.id],
    now: asIsoUtcDateTime("2026-06-23T16:05:00Z"),
  });
  await inventoryService.createPricingRule({
    pricingRuleId: asDomainId<"PricingRule">("rule_1"),
    storeId: store.id,
    categoryId: category.id,
    type: "FIXED_FEE",
    amount: 2500,
    currency: "THB",
    now: asIsoUtcDateTime("2026-06-23T16:05:00Z"),
  });

  return {
    store,
    branch,
    asset,
    point,
    equipment,
    bookingService,
    paymentService,
    bookingRepository,
    paymentRepository,
    depositRepository,
    outboxEventRepository,
    auditLogWriter,
    bookingApiDependencies: {
      security: {
        tokenVerifier,
        appCheckVerifier,
        userResolver,
        roleLookup,
      },
      bookingService,
      now: () => asIsoUtcDateTime("2026-06-23T16:10:00Z"),
      buildBookingId: () => `booking_${++bookingCounter}`,
      buildDepositId: () => `deposit_${bookingCounter}`,
      buildBookingNumber: () =>
        `BL-${bookingCounter.toString().padStart(6, "0")}`,
      buildQrBookingTokenReference: () => `qr_booking_ref_${bookingCounter}`,
      buildAvailabilityBlockId: () => `block_${++blockCounter}`,
    },
    paymentApiDependencies: {
      security: {
        tokenVerifier,
        appCheckVerifier,
        userResolver,
        roleLookup,
      },
      paymentService,
      now: () => asIsoUtcDateTime("2026-06-23T16:20:00Z"),
      buildPaymentId: () => `payment_${++paymentCounter}`,
      buildPaymentEventId: () => `payment_event_${++paymentEventCounter}`,
      buildOutboxEventId: () => `outbox_${++outboxCounter}`,
    },
  };
};

const createBooking = async (
  context: Awaited<ReturnType<typeof createTestContext>>,
  input?: {
    readonly idempotencyKey?: string;
    readonly paymentMethod?: "ONLINE" | "CASH";
    readonly assetId?: AssetId;
    readonly startAt?: string;
    readonly endAt?: string;
  },
) =>
  createBookingEndpoint(
    {
      requestId: "req_booking" as never,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      idempotencyKey: (input?.idempotencyKey ?? "idem_booking_1") as never,
      body: {
        store_id: context.store.id,
        branch_id: context.branch.id,
        asset_ids: [input?.assetId ?? context.asset.id],
        equipment_ids: [context.equipment.id],
        start_at: asIsoUtcDateTime(input?.startAt ?? "2026-06-24T01:00:00Z"),
        end_at: asIsoUtcDateTime(input?.endAt ?? "2026-06-24T04:00:00Z"),
        pickup_point_id: context.point.id as RentalPointId,
        return_point_id: context.point.id as RentalPointId,
        payment_method: input?.paymentMethod ?? "ONLINE",
      },
    },
    context.bookingApiDependencies,
  );

test("booking creation is idempotent and creates deposit snapshot", async () => {
  const context = await createTestContext();
  const first = await createBooking(context);
  const duplicate = await createBooking(context);

  assert.equal(first.status, 201);
  assert.equal(duplicate.status, 201);
  const firstBooking = expectData<{
    readonly id: BookingId;
    readonly total_amount: number;
    readonly qr_booking_token_reference: string;
  }>(first);
  const duplicateBooking = expectData<{ readonly id: BookingId }>(duplicate);
  assert.equal(duplicateBooking.id, firstBooking.id);
  assert.equal(firstBooking.total_amount, 90500);
  assert.equal(firstBooking.qr_booking_token_reference, "qr_booking_ref_1");

  const deposit = await context.depositRepository.findByBookingId(
    firstBooking.id,
  );
  assert.notEqual(deposit, null);
  assert.equal(deposit?.amount.amount as number, 55000);
});

test("booking availability reservation prevents double booking", async () => {
  const context = await createTestContext();
  await createBooking(context, { idempotencyKey: "idem_booking_1" });

  const conflict = await createBooking(context, {
    idempotencyKey: "idem_booking_2",
    startAt: "2026-06-24T02:00:00Z",
    endAt: "2026-06-24T03:00:00Z",
  });
  assert.equal(conflict.status, 409);
  assert.equal(expectErrorCode(conflict), "AVAILABILITY_CONFLICT");
});

test("booking state machine accepts valid transitions and rejects invalid transitions", async () => {
  const context = await createTestContext();
  const response = await createBooking(context);
  const booking = expectData<{ readonly id: BookingId }>(response);

  const confirmed = await context.bookingService.transitionBooking({
    bookingId: booking.id,
    toStatus: "CONFIRMED",
    now: asIsoUtcDateTime("2026-06-23T16:30:00Z"),
    reason: "payment_completed",
  });
  assert.equal(confirmed.status, "CONFIRMED");

  await assert.rejects(
    () =>
      context.bookingService.transitionBooking({
        bookingId: booking.id,
        toStatus: "COMPLETED",
        now: asIsoUtcDateTime("2026-06-23T16:31:00Z"),
      }),
    /Booking state transition is not allowed/,
  );
});

test("payment intent webhook is verified and replay-safe", async () => {
  const context = await createTestContext();
  const bookingResponse = await createBooking(context);
  const booking = expectData<{ readonly id: BookingId }>(bookingResponse);

  const paymentResponse = await createPaymentEndpoint(
    {
      requestId: "req_payment" as never,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      idempotencyKey: "idem_payment_1" as never,
      body: {
        booking_id: booking.id,
        method: "GATEWAY",
        amount: 90500,
        currency: "THB",
      },
    },
    context.paymentApiDependencies,
  );
  assert.equal(paymentResponse.status, 201);
  const payment = expectData<{
    readonly id: PaymentId;
    readonly status: string;
  }>(paymentResponse);
  assert.equal(payment.status, "PROCESSING");

  const webhook = await processPaymentWebhookEndpoint(
    {
      requestId: "req_webhook_1" as never,
      provider: "stub_gateway",
      headers: { "x-stub-signature": "valid" },
      body: {
        provider_event_id: "evt_1",
        event_type: "payment.paid",
        payment_id: payment.id,
        booking_id: booking.id,
      },
    },
    context.paymentApiDependencies,
  );
  assert.equal(webhook.status, 202);
  assert.equal(
    expectData<{ readonly replayed: boolean }>(webhook).replayed,
    false,
  );

  const replay = await processPaymentWebhookEndpoint(
    {
      requestId: "req_webhook_2" as never,
      provider: "stub_gateway",
      headers: { "x-stub-signature": "valid" },
      body: {
        provider_event_id: "evt_1",
        event_type: "payment.paid",
        payment_id: payment.id,
        booking_id: booking.id,
      },
    },
    context.paymentApiDependencies,
  );
  assert.equal(replay.status, 202);
  assert.equal(
    expectData<{ readonly replayed: boolean }>(replay).replayed,
    true,
  );
  assert.equal((await context.outboxEventRepository.list()).length, 1);
});

test("cash confirmation requires scoped permission, writes audit, and confirms booking", async () => {
  const context = await createTestContext();
  const bookingResponse = await createBooking(context, {
    idempotencyKey: "idem_cash_booking",
    paymentMethod: "CASH",
  });
  const booking = expectData<{ readonly id: BookingId }>(bookingResponse);
  await createPaymentEndpoint(
    {
      requestId: "req_cash_payment" as never,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      idempotencyKey: "idem_cash_payment" as never,
      body: {
        booking_id: booking.id,
        method: "CASH",
        amount: 90500,
        currency: "THB",
      },
    },
    context.paymentApiDependencies,
  );

  const rejected = await confirmCashPaymentEndpoint(
    {
      requestId: "req_cash_rejected" as never,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      bookingId: booking.id,
      idempotencyKey: "idem_cash_confirm_rejected" as never,
      body: {
        amount: 90500,
        currency: "THB",
        receiver_user_id: asDomainId<"User">("usr_staff"),
        branch_id: context.branch.id,
      },
    },
    context.paymentApiDependencies,
  );
  assert.equal(rejected.status, 403);

  const confirmed = await confirmCashPaymentEndpoint(
    {
      requestId: "req_cash_confirmed" as never,
      authorizationHeader: "Bearer staff-token",
      appCheckHeader: "valid-app-check",
      bookingId: booking.id,
      idempotencyKey: "idem_cash_confirmed" as never,
      body: {
        amount: 90500,
        currency: "THB",
        receiver_user_id: asDomainId<"User">("usr_staff"),
        branch_id: context.branch.id,
        notes: "received at counter",
      },
    },
    context.paymentApiDependencies,
  );
  assert.equal(confirmed.status, 200);
  assert.equal(
    expectData<{ readonly status: string }>(confirmed).status,
    "PAID",
  );
  assert.equal(context.auditLogWriter.entries.length, 1);
  assert.equal(
    (await context.bookingService.getBooking(booking.id)).status,
    "CONFIRMED",
  );
});

test("deposit cannot release before return inspection", async () => {
  const context = await createTestContext();
  const bookingResponse = await createBooking(context);
  const booking = expectData<{ readonly id: BookingId }>(bookingResponse);
  const deposit = await context.depositRepository.findByBookingId(booking.id);

  await assert.rejects(
    () =>
      context.paymentService.releaseDeposit({
        depositId: deposit?.id as DepositId,
        now: asIsoUtcDateTime("2026-06-23T16:40:00Z"),
      }),
    /Deposit cannot be released before return inspection/,
  );
});
