import assert from "node:assert/strict";
import test from "node:test";

import type { AuditLogEntry } from "../../audit/domain/audit-log.js";
import { BookingService } from "../../booking/application/booking-service.js";
import { createBookingEndpoint } from "../../booking/api/booking-api.js";
import { InMemoryBookingRepository } from "../../booking/infrastructure/in-memory-booking-repository.js";
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
  InMemoryDepositRepository,
  InMemoryOutboxEventRepository,
} from "../../payment/infrastructure/in-memory-payment-repository.js";
import { InMemoryReturnRepository } from "../../return/infrastructure/in-memory-return-repository.js";
import {
  asDomainId,
  asIsoUtcDateTime,
  type AssetId,
  type BookingId,
  type CorrelationId,
  type IdempotencyKey,
  type RentalPointId,
  type ReturnRequestId,
  type RideSessionId,
  type UserId,
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
import {
  RentalLifecycleService,
  type BookingQrTokenVerifier,
} from "../application/rental-lifecycle-service.js";
import { RideService } from "../application/ride-service.js";
import {
  acceptReturnRequestEndpoint,
  createReturnRequestEndpoint,
  createRideSessionEndpoint,
  endRideSessionEndpoint,
  handoverBookingEndpoint,
  uploadRideTrackChunkEndpoint,
} from "../api/rental-lifecycle-api.js";
import { InMemoryRideRepository } from "../infrastructure/in-memory-ride-repository.js";

class InMemoryAuditLogWriter {
  readonly entries: AuditLogEntry[] = [];

  async append(entry: AuditLogEntry): Promise<void> {
    this.entries.push(entry);
  }
}

class StubBookingQrTokenVerifier implements BookingQrTokenVerifier {
  private readonly tokens = new Map<
    string,
    { readonly token: string; readonly expiresAt: string; used: boolean }
  >();

  register(reference: string, token: string, expiresAt: string): void {
    this.tokens.set(reference, { token, expiresAt, used: false });
  }

  markUsed(reference: string): void {
    const token = this.tokens.get(reference);
    if (token !== undefined) {
      token.used = true;
    }
  }

  async verify(input: {
    readonly tokenReference: string;
    readonly presentedToken: string;
    readonly now: string;
  }): Promise<void> {
    const token = this.tokens.get(input.tokenReference);
    if (
      token === undefined ||
      token.token !== input.presentedToken ||
      token.used ||
      token.expiresAt <= input.now
    ) {
      throw new Error("token rejected");
    }
    token.used = true;
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
    storeId: asDomainId<"Store">("store_ride_1"),
    tenantId: asDomainId<"Tenant">("store_ride_1"),
    ownerUserId: asDomainId<"User">("usr_owner"),
    legalName: "Bike Local Ride Co.",
    displayName: "Bike Local Ride",
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
    branchId: asDomainId<"Branch">("brn_ride_1"),
    store,
    name: "Ride Branch",
    address: "2 Demo Road",
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
  const rideRepository = new InMemoryRideRepository();
  const returnRepository = new InMemoryReturnRepository();
  const qrTokenVerifier = new StubBookingQrTokenVerifier();
  let bookingCounter = 0;
  let blockCounter = 0;
  let rideCounter = 0;
  let returnCounter = 0;
  let inspectionCounter = 0;
  let outboxCounter = 0;

  const { store, branch } = await createApprovedStore(
    storeRepository,
    branchRepository,
  );
  const tokenVerifier: FirebaseIdTokenVerifier = {
    verifyIdToken: async (token) => {
      const uidByToken = new Map([
        ["renter-token", "renter_uid"],
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
        tokenId: "app-check-ride",
        issuedAt: asIsoUtcDateTime("2026-06-23T16:00:00Z"),
        expiresAt: asIsoUtcDateTime("2026-06-23T17:00:00Z"),
      };
    },
  };
  const userResolver: DomainUserResolver = {
    resolveByFirebaseUid: async (firebaseUid) => {
      const userIdByUid = new Map([
        ["renter_uid", asDomainId<"User">("usr_renter")],
        ["staff_uid", asDomainId<"User">("usr_staff")],
      ]);
      const userId = userIdByUid.get(firebaseUid);

      return userId === undefined ? null : { userId, status: "ACTIVE" };
    },
  };
  const assignments = new Map<string, readonly RoleAssignment[]>([
    ["usr_renter", [{ role: "RENTER" }]],
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
  const rideService = new RideService({
    bookingService,
    rideRepository,
  });
  const rentalLifecycleService = new RentalLifecycleService({
    bookingService,
    inventoryService,
    rideRepository,
    returnRepository,
    depositRepository,
    outboxEventRepository,
    qrTokenVerifier,
    auditLogWriter,
  });

  const category = await inventoryService.createAssetCategory({
    categoryId: asDomainId<"AssetCategory">("cat_ride_1"),
    storeId: store.id,
    name: "City bike",
    type: "BIKE",
    defaultBasePrice: 10000,
    defaultDepositAmount: 50000,
    currency: "THB",
    now: asIsoUtcDateTime("2026-06-23T16:05:00Z"),
  });
  const point = await inventoryService.createRentalPoint({
    rentalPointId: asDomainId<"RentalPoint">("point_ride_1"),
    storeId: store.id,
    branchId: branch.id,
    name: "Front desk",
    latitude: 13.7563,
    longitude: 100.5018,
    now: asIsoUtcDateTime("2026-06-23T16:05:00Z"),
  });
  const asset = await inventoryService.createAsset({
    assetId: asDomainId<"Asset">("asset_ride_1"),
    storeId: store.id,
    branchId: branch.id,
    categoryId: category.id,
    code: "RIDE-001",
    basePrice: 10000,
    depositAmount: 50000,
    currency: "THB",
    currentPointId: point.id,
    now: asIsoUtcDateTime("2026-06-23T16:05:00Z"),
  });

  const security = {
    tokenVerifier,
    appCheckVerifier,
    userResolver,
    roleLookup,
  };

  return {
    store,
    branch,
    asset,
    point,
    bookingService,
    inventoryService,
    rideRepository,
    depositRepository,
    outboxEventRepository,
    auditLogWriter,
    qrTokenVerifier,
    bookingApiDependencies: {
      security,
      bookingService,
      now: () => asIsoUtcDateTime("2026-06-23T16:10:00Z"),
      buildBookingId: () => `booking_ride_${++bookingCounter}`,
      buildDepositId: () => `deposit_ride_${bookingCounter}`,
      buildBookingNumber: () =>
        `BLR-${bookingCounter.toString().padStart(6, "0")}`,
      buildQrBookingTokenReference: () =>
        `qr_booking_ref_ride_${bookingCounter}`,
      buildAvailabilityBlockId: () => `block_ride_${++blockCounter}`,
    },
    lifecycleApiDependencies: {
      security,
      bookingService,
      rentalLifecycleService,
      rideService,
      now: () => asIsoUtcDateTime("2026-06-23T16:20:00Z"),
      buildRideSessionId: () => `ride_session_${++rideCounter}`,
      buildReturnRequestId: () => `return_request_${++returnCounter}`,
      buildReturnInspectionId: () => `return_inspection_${++inspectionCounter}`,
      buildOutboxEventId: () => `outbox_ride_${++outboxCounter}`,
    },
  };
};

const createBooking = async (
  context: Awaited<ReturnType<typeof createTestContext>>,
  input?: {
    readonly idempotencyKey?: string;
    readonly assetId?: AssetId;
    readonly startAt?: string;
    readonly endAt?: string;
  },
) =>
  createBookingEndpoint(
    {
      requestId: "req_booking" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      idempotencyKey: (input?.idempotencyKey ??
        "idem_booking_ride_1") as IdempotencyKey,
      body: {
        store_id: context.store.id,
        branch_id: context.branch.id,
        asset_ids: [input?.assetId ?? context.asset.id],
        start_at: asIsoUtcDateTime(input?.startAt ?? "2026-06-24T01:00:00Z"),
        end_at: asIsoUtcDateTime(input?.endAt ?? "2026-06-24T04:00:00Z"),
        pickup_point_id: context.point.id as RentalPointId,
        return_point_id: context.point.id as RentalPointId,
        payment_method: "ONLINE",
      },
    },
    context.bookingApiDependencies,
  );

const prepareAwaitingPickupBooking = async (
  context: Awaited<ReturnType<typeof createTestContext>>,
) => {
  const bookingResponse = await createBooking(context);
  const booking = expectData<{
    readonly id: BookingId;
    readonly qr_booking_token_reference: string;
  }>(bookingResponse);
  context.qrTokenVerifier.register(
    booking.qr_booking_token_reference,
    "handover-token",
    "2026-06-23T16:30:00Z",
  );
  await context.bookingService.transitionBooking({
    bookingId: booking.id,
    toStatus: "CONFIRMED",
    now: asIsoUtcDateTime("2026-06-23T16:11:00Z"),
  });
  const awaitingPickup = await context.bookingService.transitionBooking({
    bookingId: booking.id,
    toStatus: "AWAITING_PICKUP",
    now: asIsoUtcDateTime("2026-06-23T16:12:00Z"),
  });

  return {
    id: booking.id,
    qrReference: booking.qr_booking_token_reference,
    version: awaitingPickup.version as number,
  };
};

const handover = async (
  context: Awaited<ReturnType<typeof createTestContext>>,
  booking: Awaited<ReturnType<typeof prepareAwaitingPickupBooking>>,
  token = "handover-token",
) =>
  handoverBookingEndpoint(
    {
      requestId: "req_handover" as CorrelationId,
      authorizationHeader: "Bearer staff-token",
      appCheckHeader: "valid-app-check",
      bookingId: booking.id,
      body: {
        staff_user_id: asDomainId<"User">("usr_staff") as UserId,
        qr_booking_token: token,
        checklist_image_refs: ["handover-bike.jpg", "handover-lock.jpg"],
        condition_notes: "ready",
        equipment_confirmed: true,
        existing_damage_notes: "small scratch on basket",
        version: booking.version,
      },
    },
    context.lifecycleApiDependencies,
  );

test("handover rejects invalid, expired, and used QR booking tokens", async () => {
  const invalidContext = await createTestContext();
  const invalidBooking = await prepareAwaitingPickupBooking(invalidContext);
  const invalid = await handover(invalidContext, invalidBooking, "wrong-token");
  assert.equal(invalid.status, 422);
  assert.equal(expectErrorCode(invalid), "HANDOVER_QR_TOKEN_INVALID");

  const expiredContext = await createTestContext();
  const expiredBooking = await prepareAwaitingPickupBooking(expiredContext);
  expiredContext.qrTokenVerifier.register(
    expiredBooking.qrReference,
    "expired-token",
    "2026-06-23T16:19:00Z",
  );
  const expired = await handover(
    expiredContext,
    expiredBooking,
    "expired-token",
  );
  assert.equal(expired.status, 422);
  assert.equal(expectErrorCode(expired), "HANDOVER_QR_TOKEN_INVALID");

  const usedContext = await createTestContext();
  const usedBooking = await prepareAwaitingPickupBooking(usedContext);
  usedContext.qrTokenVerifier.markUsed(usedBooking.qrReference);
  const used = await handover(usedContext, usedBooking);
  assert.equal(used.status, 422);
  assert.equal(expectErrorCode(used), "HANDOVER_QR_TOKEN_INVALID");
});

test("handover starts rental atomically across booking, asset, deposit, ride, audit, and outbox", async () => {
  const context = await createTestContext();
  const booking = await prepareAwaitingPickupBooking(context);
  const response = await handover(context, booking);

  assert.equal(response.status, 200);
  assert.equal(
    expectData<{ readonly status: string }>(response).status,
    "IN_PROGRESS",
  );
  assert.equal(
    (await context.inventoryService.getAsset(context.asset.id)).status,
    "RENTED",
  );
  assert.equal(
    (await context.depositRepository.findByBookingId(booking.id))?.status,
    "HELD",
  );
  const sessions = await context.rideRepository.search(
    {
      tenantId: context.store.tenantId,
      bookingId: booking.id,
      status: "ACTIVE",
    },
    { limit: 10 },
  );
  assert.equal(sessions.items.length, 1);
  assert.equal(context.auditLogWriter.entries.length, 1);
  assert.equal(
    (await context.outboxEventRepository.list())[0]?.type,
    "rental.started",
  );
});

test("ride tracking uploads buffered chunks, records GPS gaps, enforces consent, and ending ride keeps rental open", async () => {
  const context = await createTestContext();
  const booking = await prepareAwaitingPickupBooking(context);
  await handover(context, booking);
  const sessionResponse = await createRideSessionEndpoint(
    {
      requestId: "req_ride_start" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      body: { booking_id: booking.id },
    },
    context.lifecycleApiDependencies,
  );
  const session = expectData<{
    readonly id: RideSessionId;
    readonly version: number;
  }>(sessionResponse);

  const noConsent = await uploadRideTrackChunkEndpoint(
    {
      requestId: "req_chunk_no_consent" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      rideSessionId: session.id,
      body: {
        sequence: 0,
        checksum: "sha256:no-consent",
        captured_from: asIsoUtcDateTime("2026-06-23T16:21:00Z"),
        captured_to: asIsoUtcDateTime("2026-06-23T16:22:00Z"),
        location_consent_granted: false,
        points: [
          {
            captured_at: asIsoUtcDateTime("2026-06-23T16:21:10Z"),
            latitude: 13.7563,
            longitude: 100.5018,
            accuracy_meters: 8,
          },
          {
            captured_at: asIsoUtcDateTime("2026-06-23T16:21:40Z"),
            latitude: 13.7564,
            longitude: 100.5019,
            accuracy_meters: 8,
          },
        ],
      },
    },
    context.lifecycleApiDependencies,
  );
  assert.equal(noConsent.status, 422);
  assert.equal(expectErrorCode(noConsent), "RIDE_LOCATION_CONSENT_REQUIRED");

  const chunkRequest = {
    requestId: "req_chunk" as CorrelationId,
    authorizationHeader: "Bearer renter-token",
    appCheckHeader: "valid-app-check",
    rideSessionId: session.id,
    idempotencyKey: "idem_chunk_1" as IdempotencyKey,
    body: {
      sequence: 1,
      checksum: "sha256:chunk-1",
      captured_from: asIsoUtcDateTime("2026-06-23T16:21:00Z"),
      captured_to: asIsoUtcDateTime("2026-06-23T16:24:00Z"),
      location_consent_granted: true,
      points: [
        {
          captured_at: asIsoUtcDateTime("2026-06-23T16:21:10Z"),
          latitude: 13.7563,
          longitude: 100.5018,
          accuracy_meters: 8,
        },
        {
          captured_at: asIsoUtcDateTime("2026-06-23T16:23:50Z"),
          latitude: 13.757,
          longitude: 100.5022,
          accuracy_meters: 10,
        },
      ],
      gaps: [
        {
          from: asIsoUtcDateTime("2026-06-23T16:21:40Z"),
          to: asIsoUtcDateTime("2026-06-23T16:23:30Z"),
          reason: "APP_INTERRUPTED" as const,
        },
      ],
    },
  };
  const uploaded = await uploadRideTrackChunkEndpoint(
    chunkRequest,
    context.lifecycleApiDependencies,
  );
  assert.equal(uploaded.status, 202);
  const uploadedChunk = expectData<{
    readonly point_count: number;
    readonly gaps: readonly unknown[];
  }>(uploaded);
  assert.equal(uploadedChunk.point_count, 2);
  assert.equal(uploadedChunk.gaps.length, 1);

  const duplicate = await uploadRideTrackChunkEndpoint(
    { ...chunkRequest, requestId: "req_chunk_duplicate" as CorrelationId },
    context.lifecycleApiDependencies,
  );
  assert.equal(duplicate.status, 202);

  const ended = await endRideSessionEndpoint(
    {
      requestId: "req_ride_end" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      rideSessionId: session.id,
      body: {
        ended_at: asIsoUtcDateTime("2026-06-23T16:40:00Z"),
        distance_meters: 1250,
        gps_gap_count: 1,
        version: session.version,
      },
    },
    context.lifecycleApiDependencies,
  );
  assert.equal(ended.status, 200);
  assert.equal(
    (await context.bookingService.getBooking(booking.id)).status,
    "IN_PROGRESS",
  );
});

test("return request notifies store and inspection closes rental only after staff acceptance", async () => {
  const context = await createTestContext();
  const booking = await prepareAwaitingPickupBooking(context);
  await handover(context, booking);

  const returnResponse = await createReturnRequestEndpoint(
    {
      requestId: "req_return" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      body: {
        booking_id: booking.id,
        return_type: "STORE",
        return_point_id: context.point.id,
        evidence_image_refs: ["bike-return.jpg", "parking-return.jpg"],
        location: {
          latitude: 13.7563,
          longitude: 100.5018,
          accuracy_meters: 9,
        },
        notes: "left at counter",
      },
    },
    context.lifecycleApiDependencies,
  );
  assert.equal(returnResponse.status, 201);
  const returnRequest = expectData<{
    readonly id: ReturnRequestId;
    readonly status: string;
  }>(returnResponse);
  assert.equal(returnRequest.status, "WAITING_FOR_STORE");
  assert.equal(
    (await context.bookingService.getBooking(booking.id)).status,
    "RETURN_PENDING",
  );
  assert.equal(
    (await context.depositRepository.findByBookingId(booking.id))?.status,
    "HELD",
  );
  assert.equal(
    (await context.outboxEventRepository.list()).at(-1)?.type,
    "return.requested",
  );

  const rejected = await acceptReturnRequestEndpoint(
    {
      requestId: "req_return_rejected" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      returnRequestId: returnRequest.id,
      body: {
        condition: "clean",
        image_refs: ["inspection.jpg"],
        equipment_complete: true,
        decision: "PASS",
      },
    },
    context.lifecycleApiDependencies,
  );
  assert.equal(rejected.status, 403);

  const accepted = await acceptReturnRequestEndpoint(
    {
      requestId: "req_return_accept" as CorrelationId,
      authorizationHeader: "Bearer staff-token",
      appCheckHeader: "valid-app-check",
      returnRequestId: returnRequest.id,
      body: {
        condition: "clean",
        image_refs: ["inspection.jpg"],
        equipment_complete: true,
        decision: "PASS",
      },
    },
    context.lifecycleApiDependencies,
  );
  assert.equal(accepted.status, 200);
  assert.equal(
    expectData<{ readonly status: string }>(accepted).status,
    "ACCEPTED",
  );
  assert.equal(
    (await context.bookingService.getBooking(booking.id)).status,
    "COMPLETED",
  );
  assert.equal(
    (await context.inventoryService.getAsset(context.asset.id)).status,
    "AVAILABLE",
  );
  assert.equal(
    (await context.depositRepository.findByBookingId(booking.id))?.status,
    "RELEASED",
  );
  assert.equal(
    context.auditLogWriter.entries.some(
      (entry) => entry.action === "return.confirmed",
    ),
    true,
  );
});
