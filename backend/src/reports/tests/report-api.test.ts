import assert from "node:assert/strict";
import test from "node:test";

import type { AuditLogEntry } from "../../audit/domain/audit-log.js";
import { InMemoryBookingRepository } from "../../booking/infrastructure/in-memory-booking-repository.js";
import type {
  AppCheckTokenVerifier,
  DomainUserResolver,
  FirebaseIdTokenVerifier,
  RoleAssignmentLookup,
} from "../../identity/application/security-pipeline.js";
import type { RoleAssignment } from "../../identity/domain/rbac.js";
import { InMemoryUserRepository } from "../../identity/infrastructure/in-memory-identity-repositories.js";
import { InMemoryAssetRepository } from "../../inventory/infrastructure/in-memory-inventory-repositories.js";
import {
  InMemoryDepositRepository,
  InMemoryPaymentRepository,
} from "../../payment/infrastructure/in-memory-payment-repository.js";
import {
  createReportExportEndpoint,
  createSettlementEndpoint,
  getAssetReportEndpoint,
  getPlatformOverviewReportEndpoint,
  getStaffReportEndpoint,
  getStoreRentalReportEndpoint,
  getStoreRevenueReportEndpoint,
  transitionSettlementEndpoint,
} from "../api/report-api.js";
import { ReportService } from "../application/report-service.js";
import {
  InMemoryReportExportRepository,
  InMemorySettlementRepository,
} from "../infrastructure/in-memory-report-repositories.js";
import {
  asDomainId,
  asEntityVersion,
  asIsoUtcDateTime,
  asMinorUnitAmount,
  type BranchId,
  type CorrelationId,
  type IdempotencyKey,
  type IsoUtcDateTime,
  type SettlementId,
  type StoreId,
  type TenantId,
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

class StubTokenVerifier implements FirebaseIdTokenVerifier {
  async verifyIdToken(token: string) {
    return {
      uid: token,
      claims: {},
      issuedAt: asIsoUtcDateTime("2026-06-24T00:00:00Z"),
      expiresAt: asIsoUtcDateTime("2026-06-24T01:00:00Z"),
    };
  }
}

class StubAppCheckVerifier implements AppCheckTokenVerifier {
  async verifyToken(token: string) {
    return {
      appId: token,
      tokenId: token,
      issuedAt: asIsoUtcDateTime("2026-06-24T00:00:00Z"),
      expiresAt: asIsoUtcDateTime("2026-06-24T01:00:00Z"),
    };
  }
}

class StubUserResolver implements DomainUserResolver {
  constructor(
    private readonly users: ReadonlyMap<
      string,
      { readonly userId: UserId; readonly tenantId: TenantId }
    >,
  ) {}

  async resolveByFirebaseUid(firebaseUid: string) {
    const user = this.users.get(firebaseUid);
    return user === undefined ? null : { ...user, status: "ACTIVE" as const };
  }
}

class StubRoleLookup implements RoleAssignmentLookup {
  constructor(
    private readonly assignments: ReadonlyMap<
      UserId,
      readonly RoleAssignment[]
    >,
  ) {}

  async listRoleAssignments(userId: UserId) {
    return this.assignments.get(userId) ?? [];
  }
}

const expectData = <T>(response: { readonly body: unknown }): T => {
  assert.equal(typeof response.body, "object");
  assert.notEqual(response.body, null);
  return (response.body as { readonly data: T }).data;
};

const expectErrorCode = (response: { readonly body: unknown }): string => {
  assert.equal(typeof response.body, "object");
  assert.notEqual(response.body, null);
  return (response.body as { readonly error: { readonly code: string } }).error
    .code;
};

const requestId = "req_reports" as CorrelationId;
const now = asIsoUtcDateTime("2026-06-24T00:00:00Z");
const tenantId = asDomainId<"Tenant">("store_reports");
const storeId = asDomainId<"Store">("store_reports") as StoreId;
const branchId = asDomainId<"Branch">("brn_reports") as BranchId;
const otherStoreId = asDomainId<"Store">("store_other") as StoreId;
const ownerUserId = asDomainId<"User">("usr_owner") as UserId;
const accountingUserId = asDomainId<"User">("usr_accounting") as UserId;
const platformUserId = asDomainId<"User">("usr_platform") as UserId;
const staffUserId = asDomainId<"User">("usr_staff") as UserId;

const createFixture = async (withSettlementPolicy = true) => {
  const userRepository = new InMemoryUserRepository();
  const storeRepository = new InMemoryStoreRepository();
  const branchRepository = new InMemoryBranchRepository();
  const storeMemberRepository = new InMemoryStoreMemberRepository();
  const assetRepository = new InMemoryAssetRepository();
  const bookingRepository = new InMemoryBookingRepository();
  const paymentRepository = new InMemoryPaymentRepository();
  const depositRepository = new InMemoryDepositRepository();
  const settlementRepository = new InMemorySettlementRepository();
  const reportExportRepository = new InMemoryReportExportRepository();
  const auditLogWriter = new InMemoryAuditLogWriter();

  const store = applyApprovalDecision(
    submitStoreForApproval(
      createStoreDraft({
        storeId,
        tenantId,
        ownerUserId,
        legalName: "Bike Local Reports Co.",
        displayName: "Bike Local Reports",
        defaultCurrency: "THB",
        timezone: "Asia/Bangkok",
        now,
      }),
      now,
    ),
    "APPROVED",
    platformUserId,
    "verified",
    now,
  );
  const branch = createBranchProfile({
    branchId,
    store,
    name: "Reports Branch",
    address: "1 Report Road",
    country: "TH",
    latitude: 13.7563,
    longitude: 100.5018,
    now,
  });
  await storeRepository.save(store);
  await branchRepository.save(branch);

  await Promise.all([
    userRepository.save({
      id: ownerUserId,
      tenantId,
      displayName: "Owner",
      locale: "en",
      status: "ACTIVE",
      roles: [],
      consentVersionSummary: {
        TERMS: "terms",
        PRIVACY: "privacy",
        GPS: undefined,
        MARKETING: undefined,
      },
      createdAt: now,
      updatedAt: now,
      version: asEntityVersion(1),
    }),
    userRepository.save({
      id: platformUserId,
      tenantId,
      displayName: "Platform",
      locale: "en",
      status: "ACTIVE",
      roles: [],
      consentVersionSummary: {
        TERMS: "terms",
        PRIVACY: "privacy",
        GPS: undefined,
        MARKETING: undefined,
      },
      createdAt: now,
      updatedAt: now,
      version: asEntityVersion(1),
    }),
  ]);

  await storeMemberRepository.save({
    id: asDomainId<"StoreMember">("member_owner"),
    tenantId,
    storeId,
    userId: ownerUserId,
    role: "STORE_OWNER",
    branchIds: [branchId],
    grantedPermissions: [],
    deniedPermissions: [],
    status: "ACTIVE",
    createdAt: now,
    updatedAt: now,
    version: asEntityVersion(1),
  });
  await storeMemberRepository.save({
    id: asDomainId<"StoreMember">("member_staff"),
    tenantId,
    storeId,
    userId: staffUserId,
    role: "STORE_STAFF",
    branchIds: [branchId],
    grantedPermissions: [],
    deniedPermissions: [],
    status: "ACTIVE",
    createdAt: now,
    updatedAt: now,
    version: asEntityVersion(1),
  });
  await storeMemberRepository.save({
    id: asDomainId<"StoreMember">("member_accounting"),
    tenantId,
    storeId,
    userId: accountingUserId,
    role: "STORE_ACCOUNTING",
    branchIds: [branchId],
    grantedPermissions: [],
    deniedPermissions: [],
    status: "ACTIVE",
    createdAt: now,
    updatedAt: now,
    version: asEntityVersion(1),
  });

  await assetRepository.save({
    id: asDomainId<"Asset">("asset_reports"),
    tenantId,
    storeId,
    branchId,
    categoryId: asDomainId<"AssetCategory">("cat_reports"),
    code: "BIKE-13",
    status: "AVAILABLE",
    basePrice: asMinorUnitAmount(30000),
    depositAmount: asMinorUnitAmount(100000),
    currency: "THB",
    images: [],
    cashAccepted: true,
    differentReturnAllowed: false,
    equipmentIds: [],
    statusHistory: [],
    createdAt: now,
    updatedAt: now,
    version: asEntityVersion(1),
  });

  await bookingRepository.save({
    id: asDomainId<"Booking">("booking_completed"),
    tenantId,
    bookingNumber: "BL-13-1",
    userId: asDomainId<"User">("usr_renter"),
    storeId,
    branchId,
    assetIds: [asDomainId<"Asset">("asset_reports")],
    equipmentIds: [],
    status: "COMPLETED",
    startAt: asIsoUtcDateTime("2026-06-20T01:00:00Z"),
    endAt: asIsoUtcDateTime("2026-06-20T03:00:00Z"),
    pickupPointId: asDomainId<"RentalPoint">("point_reports"),
    returnPointId: asDomainId<"RentalPoint">("point_reports"),
    paymentMethod: "ONLINE",
    currency: "THB",
    subtotalAmount: asMinorUnitAmount(100000),
    feeAmount: asMinorUnitAmount(0),
    depositAmount: asMinorUnitAmount(100000),
    discountAmount: asMinorUnitAmount(0),
    totalAmount: asMinorUnitAmount(200000),
    priceSnapshot: {},
    policySnapshot: {},
    qrBookingTokenReference: "qr_ref",
    idempotencyKey: "booking_key_1" as IdempotencyKey,
    statusHistory: [
      {
        fromStatus: "IN_PROGRESS",
        toStatus: "COMPLETED",
        changedAt: asIsoUtcDateTime("2026-06-20T03:30:00Z"),
        changedByUserId: staffUserId,
      },
    ],
    createdAt: asIsoUtcDateTime("2026-06-20T00:30:00Z"),
    updatedAt: asIsoUtcDateTime("2026-06-20T03:30:00Z"),
    version: asEntityVersion(1),
  });
  await bookingRepository.save({
    id: asDomainId<"Booking">("booking_cancelled"),
    tenantId,
    bookingNumber: "BL-13-2",
    userId: asDomainId<"User">("usr_renter"),
    storeId,
    branchId,
    assetIds: [asDomainId<"Asset">("asset_reports")],
    equipmentIds: [],
    status: "CANCELLED",
    startAt: asIsoUtcDateTime("2026-06-21T01:00:00Z"),
    endAt: asIsoUtcDateTime("2026-06-21T02:00:00Z"),
    pickupPointId: asDomainId<"RentalPoint">("point_reports"),
    returnPointId: asDomainId<"RentalPoint">("point_reports"),
    paymentMethod: "CASH",
    currency: "THB",
    subtotalAmount: asMinorUnitAmount(50000),
    feeAmount: asMinorUnitAmount(0),
    depositAmount: asMinorUnitAmount(0),
    discountAmount: asMinorUnitAmount(0),
    totalAmount: asMinorUnitAmount(50000),
    priceSnapshot: {},
    policySnapshot: {},
    qrBookingTokenReference: "qr_ref_2",
    idempotencyKey: "booking_key_2" as IdempotencyKey,
    statusHistory: [],
    createdAt: asIsoUtcDateTime("2026-06-21T00:30:00Z"),
    updatedAt: asIsoUtcDateTime("2026-06-21T00:45:00Z"),
    version: asEntityVersion(1),
  });
  await bookingRepository.save({
    id: asDomainId<"Booking">("booking_overdue"),
    tenantId,
    bookingNumber: "BL-13-3",
    userId: asDomainId<"User">("usr_renter"),
    storeId,
    branchId,
    assetIds: [asDomainId<"Asset">("asset_reports")],
    equipmentIds: [],
    status: "IN_PROGRESS",
    startAt: asIsoUtcDateTime("2026-06-22T01:00:00Z"),
    endAt: asIsoUtcDateTime("2026-06-22T02:00:00Z"),
    pickupPointId: asDomainId<"RentalPoint">("point_reports"),
    returnPointId: asDomainId<"RentalPoint">("point_reports"),
    paymentMethod: "CASH",
    currency: "THB",
    subtotalAmount: asMinorUnitAmount(50000),
    feeAmount: asMinorUnitAmount(0),
    depositAmount: asMinorUnitAmount(0),
    discountAmount: asMinorUnitAmount(0),
    totalAmount: asMinorUnitAmount(50000),
    priceSnapshot: {},
    policySnapshot: {},
    qrBookingTokenReference: "qr_ref_3",
    idempotencyKey: "booking_key_3" as IdempotencyKey,
    statusHistory: [],
    createdAt: asIsoUtcDateTime("2026-06-22T00:30:00Z"),
    updatedAt: asIsoUtcDateTime("2026-06-22T01:30:00Z"),
    version: asEntityVersion(1),
  });

  await paymentRepository.save({
    id: asDomainId<"Payment">("payment_online"),
    tenantId,
    bookingId: asDomainId<"Booking">("booking_completed"),
    userId: asDomainId<"User">("usr_renter"),
    storeId,
    branchId,
    method: "GATEWAY",
    status: "PAID",
    amount: { amount: asMinorUnitAmount(200000), currency: "THB" },
    idempotencyKey: "payment_key_1" as IdempotencyKey,
    paidAt: asIsoUtcDateTime("2026-06-20T00:40:00Z"),
    createdAt: asIsoUtcDateTime("2026-06-20T00:40:00Z"),
    updatedAt: asIsoUtcDateTime("2026-06-20T00:40:00Z"),
    version: asEntityVersion(1),
  });
  await paymentRepository.save({
    id: asDomainId<"Payment">("payment_cash"),
    tenantId,
    bookingId: asDomainId<"Booking">("booking_overdue"),
    userId: asDomainId<"User">("usr_renter"),
    storeId,
    branchId,
    method: "CASH",
    status: "PAID",
    amount: { amount: asMinorUnitAmount(50000), currency: "THB" },
    idempotencyKey: "payment_key_2" as IdempotencyKey,
    paidAt: asIsoUtcDateTime("2026-06-22T01:00:00Z"),
    confirmedByUserId: staffUserId,
    cashReceivedAt: asIsoUtcDateTime("2026-06-22T01:00:00Z"),
    createdAt: asIsoUtcDateTime("2026-06-22T01:00:00Z"),
    updatedAt: asIsoUtcDateTime("2026-06-22T01:00:00Z"),
    version: asEntityVersion(1),
  });
  await depositRepository.save({
    id: asDomainId<"Deposit">("deposit_completed"),
    tenantId,
    bookingId: asDomainId<"Booking">("booking_completed"),
    userId: asDomainId<"User">("usr_renter"),
    storeId,
    branchId,
    status: "PARTIALLY_DEDUCTED",
    amount: { amount: asMinorUnitAmount(100000), currency: "THB" },
    deductedAmount: { amount: asMinorUnitAmount(10000), currency: "THB" },
    heldAt: asIsoUtcDateTime("2026-06-20T00:45:00Z"),
    releasedAt: asIsoUtcDateTime("2026-06-20T04:00:00Z"),
    createdAt: asIsoUtcDateTime("2026-06-20T00:45:00Z"),
    updatedAt: asIsoUtcDateTime("2026-06-20T04:00:00Z"),
    version: asEntityVersion(1),
  });

  const reportService = new ReportService({
    userRepository,
    storeRepository,
    branchRepository,
    storeMemberRepository,
    assetRepository,
    bookingRepository,
    paymentRepository,
    depositRepository,
    settlementRepository,
    reportExportRepository,
    auditLogWriter,
    ...(withSettlementPolicy
      ? {
          settlementPolicy: {
            platformCommissionBps: 1000,
            paymentFeeBps: 300,
            includeCashInTransferPayable: false,
          },
        }
      : {}),
  });

  const users = new Map([
    ["owner_token", { userId: ownerUserId, tenantId }],
    ["platform_token", { userId: platformUserId, tenantId }],
    ["other_token", { userId: asDomainId<"User">("usr_other"), tenantId }],
  ]);
  const assignments = new Map<UserId, readonly RoleAssignment[]>([
    [
      ownerUserId,
      [{ role: "STORE_OWNER", tenantId, storeId, branchIds: [branchId] }],
    ],
    [platformUserId, [{ role: "PLATFORM_SUPPORT", tenantId, branchIds: [] }]],
    [
      asDomainId<"User">("usr_other") as UserId,
      [{ role: "STORE_OWNER", tenantId, storeId: otherStoreId, branchIds: [] }],
    ],
  ]);

  const dependencies = {
    security: {
      tokenVerifier: new StubTokenVerifier(),
      appCheckVerifier: new StubAppCheckVerifier(),
      userResolver: new StubUserResolver(users),
      roleLookup: new StubRoleLookup(assignments),
    },
    reportService,
    now: () => now,
    buildSettlementId: () => "settlement_reports",
    buildReportExportId: () => "export_reports",
  };

  return { dependencies, auditLogWriter };
};

const reportQuery = {
  tenant_id: tenantId,
  store_id: storeId,
  branch_id: branchId,
  from: asIsoUtcDateTime("2026-06-20T00:00:00Z"),
  to: asIsoUtcDateTime("2026-06-24T00:00:00Z"),
};

const auth = {
  requestId,
  authorizationHeader: "Bearer owner_token",
  appCheckHeader: "app_check",
};

test("store reports aggregate rentals, revenue, asset, and staff data with branch filters", async () => {
  const { dependencies } = await createFixture();

  const rental = expectData<Record<string, unknown>>(
    await getStoreRentalReportEndpoint(
      { ...auth, query: reportQuery },
      dependencies,
    ),
  );
  assert.equal(rental.bookings_count, 3);
  assert.equal(rental.completed_count, 1);
  assert.equal(rental.cancelled_count, 1);
  assert.equal(rental.overdue_count, 1);
  assert.equal(rental.average_duration_minutes, 120);

  const revenue = expectData<Record<string, unknown>>(
    await getStoreRevenueReportEndpoint(
      { ...auth, query: reportQuery },
      dependencies,
    ),
  );
  assert.equal(revenue.gross_revenue_amount, 250000);
  assert.equal(revenue.cash_amount, 50000);
  assert.equal(revenue.online_amount, 200000);
  assert.equal(revenue.penalty_amount, 10000);
  assert.equal(revenue.platform_fee_amount, 25000);
  assert.equal(revenue.payment_fee_amount, 6000);

  const asset = expectData<{
    readonly items: readonly Record<string, unknown>[];
  }>(
    await getAssetReportEndpoint({ ...auth, query: reportQuery }, dependencies),
  );
  assert.equal(asset.items[0]?.bookings_count, 3);
  assert.equal(asset.items[0]?.revenue_amount, 250000);

  const staff = expectData<{
    readonly items: readonly Record<string, unknown>[];
  }>(
    await getStaffReportEndpoint({ ...auth, query: reportQuery }, dependencies),
  );
  const staffRow = staff.items.find((item) => item.user_id === staffUserId);
  assert.equal(staffRow?.bookings_touched_count, 1);
  assert.equal(staffRow?.cash_confirmed_count, 1);
});

test("report endpoints enforce store scope and allow platform support overview", async () => {
  const { dependencies } = await createFixture();

  const denied = await getStoreRevenueReportEndpoint(
    {
      requestId,
      authorizationHeader: "Bearer other_token",
      appCheckHeader: "app_check",
      query: reportQuery,
    },
    dependencies,
  );
  assert.equal(denied.status, 403);
  assert.equal(expectErrorCode(denied), "PERMISSION_DENIED");

  const overview = expectData<Record<string, unknown>>(
    await getPlatformOverviewReportEndpoint(
      {
        requestId,
        authorizationHeader: "Bearer platform_token",
        appCheckHeader: "app_check",
        query: {
          tenant_id: tenantId,
          from: asIsoUtcDateTime("2026-06-20T00:00:00Z"),
          to: asIsoUtcDateTime("2026-06-24T00:00:00Z"),
        },
      },
      dependencies,
    ),
  );
  assert.equal(overview.bookings_count, 3);
  assert.equal(overview.gmv_amount, 250000);
  assert.equal(overview.platform_revenue_amount, 25000);
});

test("settlement calculation excludes cash transfer by policy and audits state changes", async () => {
  const { dependencies, auditLogWriter } = await createFixture();

  const created = expectData<Record<string, unknown>>(
    await createSettlementEndpoint(
      { ...auth, query: reportQuery },
      dependencies,
    ),
  );
  assert.equal(created.status, "DRAFT");
  assert.equal(created.cash_amount, 50000);
  assert.equal(created.transfer_payable_amount, 179000);

  const approved = expectData<Record<string, unknown>>(
    await transitionSettlementEndpoint(
      {
        ...auth,
        settlementId: "settlement_reports" as SettlementId,
        status: "APPROVED",
        target: { tenant_id: tenantId, store_id: storeId },
      },
      dependencies,
    ),
  );
  assert.equal(approved.status, "APPROVED");

  const paid = expectData<Record<string, unknown>>(
    await transitionSettlementEndpoint(
      {
        ...auth,
        settlementId: "settlement_reports" as SettlementId,
        status: "PAYMENT_REQUESTED",
        target: { tenant_id: tenantId, store_id: storeId },
      },
      dependencies,
    ),
  );
  assert.equal(paid.status, "PAYMENT_REQUESTED");
  assert.ok(
    auditLogWriter.entries.some(
      (entry) => entry.action === "settlement.state.changed",
    ),
  );
});

test("CSV and Excel-compatible exports apply filters without sensitive fields", async () => {
  const { dependencies, auditLogWriter } = await createFixture();

  const csv = expectData<Record<string, unknown>>(
    await createReportExportEndpoint(
      {
        ...auth,
        query: reportQuery,
        body: { type: "STORE_REVENUE", format: "CSV" },
      },
      dependencies,
    ),
  );
  assert.equal(csv.mime_type, "text/csv");
  assert.match(String(csv.content), /gross,net,cash,online/);
  assert.doesNotMatch(String(csv.content), /usr_renter/);

  const xlsx = expectData<Record<string, unknown>>(
    await createReportExportEndpoint(
      {
        ...auth,
        query: reportQuery,
        body: { type: "ASSET", format: "XLSX" },
      },
      {
        ...dependencies,
        buildReportExportId: () => "export_reports_xlsx",
      },
    ),
  );
  assert.equal(
    xlsx.mime_type,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );
  assert.ok(
    auditLogWriter.entries.some(
      (entry) => entry.action === "report.export.created",
    ),
  );
});

test("settlement policy is required for settlement calculation", async () => {
  const { dependencies } = await createFixture(false);

  const response = await createSettlementEndpoint(
    { ...auth, query: reportQuery },
    dependencies,
  );
  assert.equal(response.status, 422);
  assert.equal(expectErrorCode(response), "SETTLEMENT_POLICY_REQUIRED");
});
