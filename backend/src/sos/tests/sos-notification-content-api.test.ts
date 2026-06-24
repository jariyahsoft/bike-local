import assert from "node:assert/strict";
import test from "node:test";

import type { AuditLogEntry } from "../../audit/domain/audit-log.js";
import { createBookingEndpoint } from "../../booking/api/booking-api.js";
import { BookingService } from "../../booking/application/booking-service.js";
import { InMemoryBookingRepository } from "../../booking/infrastructure/in-memory-booking-repository.js";
import {
  acknowledgeSosCaseEndpoint,
  assignSosCaseEndpoint,
  closeSosCaseEndpoint,
  createSosCaseEndpoint,
  resolveSosCaseEndpoint,
  startSosCaseEndpoint,
} from "../api/sos-api.js";
import { SosService } from "../application/sos-service.js";
import { InMemorySosRepository } from "../infrastructure/in-memory-sos-repository.js";
import {
  createPlaceEndpoint,
  createReviewEndpoint,
  createRouteEndpoint,
  hideReviewEndpoint,
  approveContentSubmissionEndpoint,
  rejectContentSubmissionEndpoint,
  reportContentEndpoint,
} from "../../content/api/content-api.js";
import { ContentService } from "../../content/application/content-service.js";
import {
  InMemoryContentReportRepository,
  InMemoryContentSubmissionRepository,
  InMemoryPlaceRepository,
  InMemoryReviewRepository,
  InMemoryRouteRepository,
} from "../../content/infrastructure/in-memory-content-repositories.js";
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
  listNotificationsEndpoint,
  markNotificationReadEndpoint,
  registerNotificationDeviceEndpoint,
} from "../../notifications/api/notification-api.js";
import {
  NotificationService,
  type FcmTokenProtector,
  type NotificationProvider,
} from "../../notifications/application/notification-service.js";
import {
  InMemoryNotificationDeliveryLogRepository,
  InMemoryNotificationDeviceRepository,
  InMemoryNotificationRepository,
} from "../../notifications/infrastructure/in-memory-notification-repositories.js";
import {
  InMemoryDepositRepository,
  InMemoryOutboxEventRepository,
} from "../../payment/infrastructure/in-memory-payment-repository.js";
import { InMemoryReturnRepository } from "../../return/infrastructure/in-memory-return-repository.js";
import { RideService } from "../../ride/application/ride-service.js";
import {
  RentalLifecycleService,
  type BookingQrTokenVerifier,
} from "../../ride/application/rental-lifecycle-service.js";
import { handoverBookingEndpoint } from "../../ride/api/rental-lifecycle-api.js";
import { InMemoryRideRepository } from "../../ride/infrastructure/in-memory-ride-repository.js";
import {
  asDomainId,
  asIsoUtcDateTime,
  type BookingId,
  type ContentSubmissionId,
  type CorrelationId,
  type IdempotencyKey,
  type NotificationId,
  type OutboxEventId,
  type RentalPointId,
  type ReviewId,
  type RideSessionId,
  type SosCaseId,
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
  InMemoryStoreMemberRepository,
  InMemoryStoreRepository,
} from "../../stores/infrastructure/in-memory-store-management-repositories.js";

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
      throw new Error("invalid qr token");
    }
    token.used = true;
  }
}

class StubFcmTokenProtector implements FcmTokenProtector {
  async protect(token: string) {
    return {
      tokenReference: `token_ref_${token.slice(-6)}`,
      tokenFingerprint: `token_fp_${token.slice(-6)}`,
    };
  }
}

class StubNotificationProvider implements NotificationProvider {
  readonly providerName = "stub_fcm";

  constructor(private shouldFail = false) {}

  async send(input: {
    readonly tokenReference: string;
    readonly type: string;
    readonly payload: Readonly<Record<string, unknown>>;
  }) {
    if (this.shouldFail) {
      throw new Error(`delivery_failed:${input.type}`);
    }
    return {
      providerMessageId: `msg_${input.tokenReference}`,
    };
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
  const now = asIsoUtcDateTime("2026-06-24T00:00:00Z");
  const draft = createStoreDraft({
    storeId: asDomainId<"Store">("store_task12"),
    tenantId: asDomainId<"Tenant">("store_task12"),
    ownerUserId: asDomainId<"User">("usr_owner"),
    legalName: "Bike Local Safety Co.",
    displayName: "Bike Local Safety",
    defaultCurrency: "THB",
    timezone: "Asia/Bangkok",
    now,
  });
  const store = applyApprovalDecision(
    submitStoreForApproval(draft, now),
    "APPROVED",
    asDomainId<"User">("usr_admin"),
    "verified",
    now,
  );
  const branch = createBranchProfile({
    branchId: asDomainId<"Branch">("brn_task12"),
    store,
    name: "Old Town",
    address: "3 Demo Road",
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
  const storeMemberRepository = new InMemoryStoreMemberRepository();
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
  const notificationRepository = new InMemoryNotificationRepository();
  const notificationDeviceRepository =
    new InMemoryNotificationDeviceRepository();
  const notificationDeliveryLogRepository =
    new InMemoryNotificationDeliveryLogRepository();
  const sosRepository = new InMemorySosRepository();
  const routeRepository = new InMemoryRouteRepository();
  const placeRepository = new InMemoryPlaceRepository();
  const reviewRepository = new InMemoryReviewRepository();
  const contentSubmissionRepository = new InMemoryContentSubmissionRepository();
  const contentReportRepository = new InMemoryContentReportRepository();
  let bookingCounter = 0;
  let blockCounter = 0;
  let rideCounter = 0;
  let outboxCounter = 0;
  let notificationDeviceCounter = 0;
  let notificationDeliveryLogCounter = 0;
  let sosCaseCounter = 0;
  let routeCounter = 0;
  let placeCounter = 0;
  let reviewCounter = 0;
  let contentSubmissionCounter = 0;
  let contentReportCounter = 0;

  const { store, branch } = await createApprovedStore(
    storeRepository,
    branchRepository,
  );

  await storeMemberRepository.save({
    id: asDomainId<"StoreMember">("member_owner"),
    tenantId: store.tenantId,
    storeId: store.id,
    userId: asDomainId<"User">("usr_owner"),
    role: "STORE_OWNER",
    branchIds: [branch.id],
    grantedPermissions: [],
    deniedPermissions: [],
    status: "ACTIVE",
    createdAt: asIsoUtcDateTime("2026-06-24T00:00:00Z"),
    updatedAt: asIsoUtcDateTime("2026-06-24T00:00:00Z"),
    version: 1 as never,
  });
  await storeMemberRepository.save({
    id: asDomainId<"StoreMember">("member_manager"),
    tenantId: store.tenantId,
    storeId: store.id,
    userId: asDomainId<"User">("usr_manager"),
    role: "STORE_MANAGER",
    branchIds: [branch.id],
    grantedPermissions: [],
    deniedPermissions: [],
    status: "ACTIVE",
    createdAt: asIsoUtcDateTime("2026-06-24T00:00:00Z"),
    updatedAt: asIsoUtcDateTime("2026-06-24T00:00:00Z"),
    version: 1 as never,
  });
  await storeMemberRepository.save({
    id: asDomainId<"StoreMember">("member_staff"),
    tenantId: store.tenantId,
    storeId: store.id,
    userId: asDomainId<"User">("usr_staff"),
    role: "STORE_STAFF",
    branchIds: [branch.id],
    grantedPermissions: [],
    deniedPermissions: [],
    status: "ACTIVE",
    createdAt: asIsoUtcDateTime("2026-06-24T00:00:00Z"),
    updatedAt: asIsoUtcDateTime("2026-06-24T00:00:00Z"),
    version: 1 as never,
  });

  const tokenVerifier: FirebaseIdTokenVerifier = {
    verifyIdToken: async (token) => {
      const uidByToken = new Map([
        ["renter-token", "renter_uid"],
        ["staff-token", "staff_uid"],
        ["manager-token", "manager_uid"],
        ["owner-token", "owner_uid"],
        ["moderator-token", "moderator_uid"],
      ]);
      const uid = uidByToken.get(token);
      if (uid === undefined) {
        throw new Error("invalid token");
      }
      return {
        uid,
        claims: {},
        issuedAt: asIsoUtcDateTime("2026-06-24T00:00:00Z"),
        expiresAt: asIsoUtcDateTime("2026-06-24T01:00:00Z"),
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
        tokenId: "task12-app-check",
        issuedAt: asIsoUtcDateTime("2026-06-24T00:00:00Z"),
        expiresAt: asIsoUtcDateTime("2026-06-24T01:00:00Z"),
      };
    },
  };
  const userResolver: DomainUserResolver = {
    resolveByFirebaseUid: async (firebaseUid) => {
      const userIdByUid = new Map([
        ["renter_uid", asDomainId<"User">("usr_renter")],
        ["staff_uid", asDomainId<"User">("usr_staff")],
        ["manager_uid", asDomainId<"User">("usr_manager")],
        ["owner_uid", asDomainId<"User">("usr_owner")],
        ["moderator_uid", asDomainId<"User">("usr_moderator")],
      ]);
      const userId = userIdByUid.get(firebaseUid);
      return userId === undefined
        ? null
        : { userId, tenantId: store.tenantId, status: "ACTIVE" };
    },
  };
  const assignments = new Map<string, readonly RoleAssignment[]>([
    ["usr_renter", [{ role: "RENTER", tenantId: store.tenantId }]],
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
    [
      "usr_manager",
      [
        {
          role: "STORE_MANAGER",
          tenantId: store.tenantId,
          storeId: store.id,
          branchIds: [branch.id],
        },
      ],
    ],
    [
      "usr_owner",
      [{ role: "STORE_OWNER", tenantId: store.tenantId, storeId: store.id }],
    ],
    [
      "usr_moderator",
      [{ role: "PLATFORM_MODERATOR", tenantId: store.tenantId }],
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
  const notificationService = new NotificationService({
    notificationRepository,
    notificationDeviceRepository,
    notificationDeliveryLogRepository,
    outboxEventRepository,
    auditLogWriter,
    fcmTokenProtector: new StubFcmTokenProtector(),
  });
  const sosService = new SosService({
    bookingService,
    rideRepository,
    sosRepository,
    storeMemberRepository,
    notificationService,
    outboxEventRepository,
    auditLogWriter,
    escalationPolicy: {
      managerEscalationMinutes: 5,
      ownerEscalationMinutes: 10,
    },
  });
  const contentService = new ContentService({
    bookingService,
    storeRepository,
    branchRepository,
    storeMemberRepository,
    routeRepository,
    placeRepository,
    reviewRepository,
    contentSubmissionRepository,
    contentReportRepository,
    auditLogWriter,
  });

  const category = await inventoryService.createAssetCategory({
    categoryId: asDomainId<"AssetCategory">("cat_task12"),
    storeId: store.id,
    name: "City bike",
    type: "BIKE",
    defaultBasePrice: 10000,
    defaultDepositAmount: 50000,
    currency: "THB",
    now: asIsoUtcDateTime("2026-06-24T00:01:00Z"),
  });
  const point = await inventoryService.createRentalPoint({
    rentalPointId: asDomainId<"RentalPoint">("point_task12"),
    storeId: store.id,
    branchId: branch.id,
    name: "Front desk",
    latitude: 13.7563,
    longitude: 100.5018,
    now: asIsoUtcDateTime("2026-06-24T00:01:00Z"),
  });
  const asset = await inventoryService.createAsset({
    assetId: asDomainId<"Asset">("asset_task12"),
    storeId: store.id,
    branchId: branch.id,
    categoryId: category.id,
    code: "SOS-001",
    basePrice: 10000,
    depositAmount: 50000,
    currency: "THB",
    currentPointId: point.id,
    now: asIsoUtcDateTime("2026-06-24T00:01:00Z"),
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
    rideRepository,
    notificationService,
    sosService,
    contentService,
    qrTokenVerifier,
    contentSubmissionRepository,
    notificationRepository,
    notificationDeliveryLogRepository,
    auditLogWriter,
    bookingApiDependencies: {
      security,
      bookingService,
      now: () => asIsoUtcDateTime("2026-06-24T00:05:00Z"),
      buildBookingId: () => `booking_task12_${++bookingCounter}`,
      buildDepositId: () => `deposit_task12_${bookingCounter}`,
      buildBookingNumber: () =>
        `BL12-${bookingCounter.toString().padStart(6, "0")}`,
      buildQrBookingTokenReference: () =>
        `qr_booking_ref_task12_${bookingCounter}`,
      buildAvailabilityBlockId: () => `block_task12_${++blockCounter}`,
    },
    lifecycleApiDependencies: {
      security,
      bookingService,
      rentalLifecycleService,
      rideService,
      now: () => asIsoUtcDateTime("2026-06-24T00:10:00Z"),
      buildRideSessionId: () => `ride_session_task12_${++rideCounter}`,
      buildReturnRequestId: () => "unused",
      buildReturnInspectionId: () => "unused",
      buildOutboxEventId: () => `outbox_task12_${++outboxCounter}`,
    },
    notificationApiDependencies: {
      security,
      notificationService,
      now: () => asIsoUtcDateTime("2026-06-24T00:15:00Z"),
      buildNotificationDeviceId: () =>
        `notification_device_${++notificationDeviceCounter}`,
    },
    sosApiDependencies: {
      security,
      sosService,
      now: () => asIsoUtcDateTime("2026-06-24T00:20:00Z"),
      buildSosCaseId: () => `sos_case_${++sosCaseCounter}`,
      buildOutboxEventId: () => `outbox_task12_${++outboxCounter}`,
    },
    contentApiDependencies: {
      security,
      contentService,
      now: () => asIsoUtcDateTime("2026-06-24T00:25:00Z"),
      buildRouteId: () => `route_${++routeCounter}`,
      buildPlaceId: () => `place_${++placeCounter}`,
      buildReviewId: () => `review_${++reviewCounter}`,
      buildContentSubmissionId: () =>
        `submission_${++contentSubmissionCounter}`,
      buildContentReportId: () => `report_${++contentReportCounter}`,
    },
    buildNotificationDeliveryLogId: () =>
      asDomainId<"NotificationDeliveryLog">(
        `notification_delivery_log_${++notificationDeliveryLogCounter}`,
      ),
  };
};

const createBooking = async (
  context: Awaited<ReturnType<typeof createTestContext>>,
) =>
  createBookingEndpoint(
    {
      requestId: "req_booking_task12" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      idempotencyKey: "idem_booking_task12" as IdempotencyKey,
      body: {
        store_id: context.store.id,
        branch_id: context.branch.id,
        asset_ids: [context.asset.id],
        start_at: asIsoUtcDateTime("2026-06-24T01:00:00Z"),
        end_at: asIsoUtcDateTime("2026-06-24T04:00:00Z"),
        pickup_point_id: context.point.id as RentalPointId,
        return_point_id: context.point.id as RentalPointId,
        payment_method: "ONLINE",
      },
    },
    context.bookingApiDependencies,
  );

const createActiveRental = async (
  context: Awaited<ReturnType<typeof createTestContext>>,
) => {
  const bookingResponse = await createBooking(context);
  const booking = expectData<{
    readonly id: BookingId;
    readonly qr_booking_token_reference: string;
  }>(bookingResponse);
  await context.bookingService.transitionBooking({
    bookingId: booking.id,
    toStatus: "CONFIRMED",
    now: asIsoUtcDateTime("2026-06-24T00:06:00Z"),
  });
  const awaitingPickup = await context.bookingService.transitionBooking({
    bookingId: booking.id,
    toStatus: "AWAITING_PICKUP",
    now: asIsoUtcDateTime("2026-06-24T00:07:00Z"),
  });
  const handoverQrToken = "handover-task12-token";
  context.qrTokenVerifier.register(
    booking.qr_booking_token_reference,
    handoverQrToken,
    "2026-06-24T00:30:00Z",
  );

  await handoverBookingEndpoint(
    {
      requestId: "req_handover_task12" as CorrelationId,
      authorizationHeader: "Bearer staff-token",
      appCheckHeader: "valid-app-check",
      bookingId: booking.id,
      body: {
        staff_user_id: asDomainId<"User">("usr_staff") as UserId,
        qr_booking_token: handoverQrToken,
        checklist_image_refs: ["handover-bike.jpg"],
        condition_notes: "ready",
        equipment_confirmed: true,
        version: awaitingPickup.version as number,
      },
    },
    context.lifecycleApiDependencies,
  );

  const sessions = await context.rideRepository.search(
    {
      tenantId: context.store.tenantId,
      bookingId: booking.id,
      status: "ACTIVE",
    },
    { limit: 10 },
  );

  return {
    bookingId: booking.id,
    rideSessionId: sessions.items[0]?.id as RideSessionId,
  };
};

test("SOS requires active ride, captures location, escalates, and closes with timeline", async () => {
  const context = await createTestContext();

  const inactiveBookingResponse = await createBooking(context);
  const inactiveBooking = expectData<{ readonly id: BookingId }>(
    inactiveBookingResponse,
  );
  const missingRide = await createSosCaseEndpoint(
    {
      requestId: "req_sos_inactive" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      body: {
        booking_id: inactiveBooking.id,
        phone: "+66000000001",
        latest_location: {
          latitude: 13.7563,
          longitude: 100.5018,
          accuracy_meters: 8,
        },
        issue_type: "FLAT_TIRE",
      },
    },
    context.sosApiDependencies,
  );
  assert.equal(missingRide.status, 422);
  assert.equal(expectErrorCode(missingRide), "SOS_ACTIVE_RIDE_REQUIRED");

  const activeRental = await createActiveRental(context);
  const missingLocation = await createSosCaseEndpoint(
    {
      requestId: "req_sos_no_location" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      body: {
        booking_id: activeRental.bookingId,
        ride_session_id: activeRental.rideSessionId,
        phone: "+66000000001",
        latest_location: {
          latitude: 13.7563,
          longitude: 100.5018,
          accuracy_meters: 0,
        },
        issue_type: "FLAT_TIRE",
      },
    },
    context.sosApiDependencies,
  );
  assert.equal(missingLocation.status, 422);
  assert.equal(expectErrorCode(missingLocation), "SOS_LOCATION_REQUIRED");

  const created = await createSosCaseEndpoint(
    {
      requestId: "req_sos_create" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      body: {
        booking_id: activeRental.bookingId,
        ride_session_id: activeRental.rideSessionId,
        phone: "+66000000001",
        latest_location: {
          latitude: 13.7563,
          longitude: 100.5018,
          accuracy_meters: 8,
        },
        issue_type: "FLAT_TIRE",
      },
    },
    context.sosApiDependencies,
  );
  assert.equal(created.status, 201);
  const sosCase = expectData<{
    readonly id: SosCaseId;
    readonly status: string;
    readonly disclaimer_text: string;
  }>(created);
  assert.equal(sosCase.status, "OPEN");
  assert.match(sosCase.disclaimer_text, /not an emergency rescue/i);

  const acknowledged = await acknowledgeSosCaseEndpoint(
    {
      requestId: "req_sos_ack" as CorrelationId,
      authorizationHeader: "Bearer staff-token",
      appCheckHeader: "valid-app-check",
      sosCaseId: sosCase.id,
      body: { notes: "received" },
    },
    context.sosApiDependencies,
  );
  assert.equal(acknowledged.status, 200);
  assert.equal(
    expectData<{ readonly status: string }>(acknowledged).status,
    "ACKNOWLEDGED",
  );

  const assigned = await assignSosCaseEndpoint(
    {
      requestId: "req_sos_assign" as CorrelationId,
      authorizationHeader: "Bearer manager-token",
      appCheckHeader: "valid-app-check",
      sosCaseId: sosCase.id,
      body: {
        assigned_staff_user_id: asDomainId<"User">("usr_staff"),
        notes: "dispatching branch staff",
      },
    },
    context.sosApiDependencies,
  );
  assert.equal(assigned.status, 200);
  assert.equal(
    expectData<{ readonly status: string }>(assigned).status,
    "ASSIGNED",
  );

  const started = await startSosCaseEndpoint(
    {
      requestId: "req_sos_start" as CorrelationId,
      authorizationHeader: "Bearer staff-token",
      appCheckHeader: "valid-app-check",
      sosCaseId: sosCase.id,
      body: { notes: "on the way" },
    },
    context.sosApiDependencies,
  );
  assert.equal(started.status, 200);
  assert.equal(
    expectData<{ readonly status: string }>(started).status,
    "IN_PROGRESS",
  );

  const resolved = await resolveSosCaseEndpoint(
    {
      requestId: "req_sos_resolve" as CorrelationId,
      authorizationHeader: "Bearer staff-token",
      appCheckHeader: "valid-app-check",
      sosCaseId: sosCase.id,
      body: { notes: "tube replaced" },
    },
    context.sosApiDependencies,
  );
  assert.equal(resolved.status, 200);
  assert.equal(
    expectData<{ readonly status: string }>(resolved).status,
    "RESOLVED",
  );

  const closed = await closeSosCaseEndpoint(
    {
      requestId: "req_sos_close" as CorrelationId,
      authorizationHeader: "Bearer manager-token",
      appCheckHeader: "valid-app-check",
      sosCaseId: sosCase.id,
      body: { notes: "case closed" },
    },
    context.sosApiDependencies,
  );
  assert.equal(closed.status, 200);
  const closedCase = expectData<{
    readonly status: string;
    readonly timeline: readonly { readonly event_type: string }[];
  }>(closed);
  assert.equal(closedCase.status, "CLOSED");
  assert.deepEqual(
    closedCase.timeline.map((event) => event.event_type),
    ["OPENED", "ACKNOWLEDGED", "ASSIGNED", "STARTED", "RESOLVED", "CLOSED"],
  );

  const escalationContext = await createTestContext();
  const escalationRental = await createActiveRental(escalationContext);
  const escalatedCase = await createSosCaseEndpoint(
    {
      requestId: "req_sos_escalate" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      body: {
        booking_id: escalationRental.bookingId,
        ride_session_id: escalationRental.rideSessionId,
        phone: "+66000000001",
        latest_location: {
          latitude: 13.7563,
          longitude: 100.5018,
          accuracy_meters: 8,
        },
        issue_type: "UNSAFE",
      },
    },
    escalationContext.sosApiDependencies,
  );
  const escalatedCaseId = expectData<{ readonly id: SosCaseId }>(
    escalatedCase,
  ).id;
  const escalated = await escalationContext.sosService.runEscalations({
    notificationIds: ["notif_escalation_1", "notif_escalation_2"],
    outboxEventIds: [
      asDomainId<"OutboxEvent">("outbox_escalation_1") as OutboxEventId,
      asDomainId<"OutboxEvent">("outbox_escalation_2") as OutboxEventId,
    ],
    now: asIsoUtcDateTime("2026-06-24T00:26:00Z"),
  });
  assert.equal(escalated[0]?.id, escalatedCaseId);
  assert.equal(escalated[0]?.escalationLevel, 1);
});

test("notification registration, delivery log, retry, inbox, and read flow work", async () => {
  const context = await createTestContext();
  const registered = await registerNotificationDeviceEndpoint(
    {
      requestId: "req_register_device" as CorrelationId,
      authorizationHeader: "Bearer staff-token",
      appCheckHeader: "valid-app-check",
      body: {
        platform: "ANDROID",
        device_id: "device-1",
        fcm_token: "token-staff-123456",
      },
    },
    context.notificationApiDependencies,
  );
  assert.equal(registered.status, 201);
  assert.equal(
    expectData<{ readonly token_fingerprint: string }>(registered)
      .token_fingerprint,
    "token_fp_123456",
  );

  const queued = await context.notificationService.queueNotifications({
    notificationIds: [asDomainId<"Notification">("notif_1") as NotificationId],
    outboxEventIds: [
      asDomainId<"OutboxEvent">("outbox_notification_1") as OutboxEventId,
    ],
    tenantId: context.store.tenantId,
    recipientUserIds: [asDomainId<"User">("usr_staff")],
    type: "SOS_OPENED",
    payload: { sos_case_id: "sos_1" },
    now: asIsoUtcDateTime("2026-06-24T00:30:00Z"),
  });
  assert.equal(queued[0]?.deliveryStatus, "QUEUED");

  const failed = await context.notificationService.deliverQueuedNotifications({
    provider: new StubNotificationProvider(true),
    buildNotificationDeliveryLogId: context.buildNotificationDeliveryLogId,
    now: asIsoUtcDateTime("2026-06-24T00:31:00Z"),
  });
  assert.equal(failed[0]?.deliveryStatus, "FAILED");
  assert.equal(
    (
      await context.notificationService.listDeliveryLogs(
        asDomainId<"Notification">("notif_1"),
      )
    ).length,
    1,
  );

  const retried = await context.notificationService.retryFailedNotifications({
    provider: new StubNotificationProvider(false),
    buildNotificationDeliveryLogId: context.buildNotificationDeliveryLogId,
    now: asIsoUtcDateTime("2026-06-24T00:32:00Z"),
  });
  assert.equal(retried[0]?.deliveryStatus, "SENT");
  assert.equal(
    (
      await context.notificationService.listDeliveryLogs(
        asDomainId<"Notification">("notif_1"),
      )
    ).length,
    2,
  );

  const inbox = await listNotificationsEndpoint(
    {
      requestId: "req_list_notifications" as CorrelationId,
      authorizationHeader: "Bearer staff-token",
      appCheckHeader: "valid-app-check",
    },
    context.notificationApiDependencies,
  );
  assert.equal(inbox.status, 200);
  assert.equal(expectData<readonly unknown[]>(inbox).length, 1);

  const read = await markNotificationReadEndpoint(
    {
      requestId: "req_mark_read" as CorrelationId,
      authorizationHeader: "Bearer staff-token",
      appCheckHeader: "valid-app-check",
      notificationId: asDomainId<"Notification">("notif_1") as NotificationId,
    },
    context.notificationApiDependencies,
  );
  assert.equal(read.status, 200);
  assert.equal(
    expectData<{ readonly delivery_status: string }>(read).delivery_status,
    "READ",
  );
});

test("content moderation enforces approval, rejection, report, review eligibility, and audit", async () => {
  const context = await createTestContext();

  const routeResponse = await createRouteEndpoint(
    {
      requestId: "req_route_create" as CorrelationId,
      authorizationHeader: "Bearer staff-token",
      appCheckHeader: "valid-app-check",
      body: {
        store_id: context.store.id,
        branch_id: context.branch.id,
        name: "Riverside Loop",
        description: "Quiet morning route",
        start_location: {
          latitude: 13.7563,
          longitude: 100.5018,
          accuracy_meters: 8,
        },
        end_location: {
          latitude: 13.7569,
          longitude: 100.5024,
          accuracy_meters: 8,
        },
        distance_meters: 5200,
        difficulty: "EASY",
      },
    },
    context.contentApiDependencies,
  );
  assert.equal(routeResponse.status, 201);
  const route = expectData<{ readonly id: string; readonly status: string }>(
    routeResponse,
  );
  assert.equal(route.status, "SUBMITTED");
  const routeSubmission =
    (await context.contentSubmissionRepository.findByContent(
      "ROUTE",
      route.id,
    )) as {
      readonly id: ContentSubmissionId;
    };

  const approved = await approveContentSubmissionEndpoint(
    {
      requestId: "req_route_approve" as CorrelationId,
      authorizationHeader: "Bearer moderator-token",
      appCheckHeader: "valid-app-check",
      contentSubmissionId: routeSubmission.id,
      body: { reason: "safe and useful" },
    },
    context.contentApiDependencies,
  );
  assert.equal(approved.status, 200);
  assert.equal(
    expectData<{ readonly status: string }>(approved).status,
    "APPROVED",
  );

  const placeResponse = await createPlaceEndpoint(
    {
      requestId: "req_place_create" as CorrelationId,
      authorizationHeader: "Bearer staff-token",
      appCheckHeader: "valid-app-check",
      body: {
        store_id: context.store.id,
        branch_id: context.branch.id,
        name: "Broken Pump",
        place_type: "REPAIR_POINT",
        location: {
          latitude: 13.757,
          longitude: 100.503,
          accuracy_meters: 8,
        },
      },
    },
    context.contentApiDependencies,
  );
  const place = expectData<{ readonly id: string }>(placeResponse);
  const placeSubmission =
    (await context.contentSubmissionRepository.findByContent(
      "PLACE",
      place.id,
    )) as {
      readonly id: ContentSubmissionId;
    };
  const rejected = await rejectContentSubmissionEndpoint(
    {
      requestId: "req_place_reject" as CorrelationId,
      authorizationHeader: "Bearer moderator-token",
      appCheckHeader: "valid-app-check",
      contentSubmissionId: placeSubmission.id,
      body: { reason: "duplicate listing" },
    },
    context.contentApiDependencies,
  );
  assert.equal(rejected.status, 200);
  assert.equal(
    expectData<{ readonly status: string }>(rejected).status,
    "REJECTED",
  );

  const incompleteBooking = await createBooking(context);
  const incompleteBookingId = expectData<{ readonly id: BookingId }>(
    incompleteBooking,
  ).id;
  const reviewRejected = await createReviewEndpoint(
    {
      requestId: "req_review_reject" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      body: {
        booking_id: incompleteBookingId,
        rating: 5,
        body: "great ride",
      },
    },
    context.contentApiDependencies,
  );
  assert.equal(reviewRejected.status, 422);
  assert.equal(expectErrorCode(reviewRejected), "REVIEW_BOOKING_NOT_COMPLETED");

  const activeRental = await createActiveRental(context);
  await context.bookingService.transitionBooking({
    bookingId: activeRental.bookingId,
    toStatus: "RETURN_PENDING",
    now: asIsoUtcDateTime("2026-06-24T00:40:00Z"),
  });
  await context.bookingService.transitionBooking({
    bookingId: activeRental.bookingId,
    toStatus: "INSPECTION_PENDING",
    now: asIsoUtcDateTime("2026-06-24T00:41:00Z"),
  });
  await context.bookingService.transitionBooking({
    bookingId: activeRental.bookingId,
    toStatus: "COMPLETED",
    now: asIsoUtcDateTime("2026-06-24T00:42:00Z"),
  });

  const reviewCreated = await createReviewEndpoint(
    {
      requestId: "req_review_create" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      body: {
        booking_id: activeRental.bookingId,
        rating: 4,
        body: "helpful handover and smooth support",
      },
    },
    context.contentApiDependencies,
  );
  assert.equal(reviewCreated.status, 201);
  const review = expectData<{ readonly id: ReviewId; readonly status: string }>(
    reviewCreated,
  );
  assert.equal(review.status, "APPROVED");

  const reported = await reportContentEndpoint(
    {
      requestId: "req_content_report" as CorrelationId,
      authorizationHeader: "Bearer renter-token",
      appCheckHeader: "valid-app-check",
      body: {
        content_type: "ROUTE",
        content_id: route.id,
        reason: "OUTDATED",
        notes: "construction blocks this section",
      },
    },
    context.contentApiDependencies,
  );
  assert.equal(reported.status, 201);

  const hidden = await hideReviewEndpoint(
    {
      requestId: "req_review_hide" as CorrelationId,
      authorizationHeader: "Bearer moderator-token",
      appCheckHeader: "valid-app-check",
      reviewId: review.id,
      body: { reason: "contains personal data" },
    },
    context.contentApiDependencies,
  );
  assert.equal(hidden.status, 200);
  assert.equal(
    expectData<{ readonly status: string }>(hidden).status,
    "SUSPENDED",
  );

  assert.equal(
    context.auditLogWriter.entries.some(
      (entry) => entry.action === "content.approved",
    ),
    true,
  );
  assert.equal(
    context.auditLogWriter.entries.some(
      (entry) => entry.action === "content.rejected",
    ),
    true,
  );
  assert.equal(
    context.auditLogWriter.entries.some(
      (entry) => entry.action === "content.reported",
    ),
    true,
  );
  assert.equal(
    context.auditLogWriter.entries.some(
      (entry) => entry.action === "review.hidden",
    ),
    true,
  );
});
