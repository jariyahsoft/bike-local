import assert from "node:assert/strict";
import test from "node:test";

import { InMemoryBookingRepository } from "../../booking/infrastructure/in-memory-booking-repository.js";
import type {
  AppCheckTokenVerifier,
  DomainUserResolver,
  FirebaseIdTokenVerifier,
  RoleAssignmentLookup,
} from "../../identity/application/security-pipeline.js";
import type { RoleAssignment } from "../../identity/domain/rbac.js";
import {
  asDomainId,
  asIsoUtcDateTime,
  type AssetCategoryId,
  type AssetId,
  type BranchId,
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
  InMemoryStoreMemberRepository,
  InMemoryStoreRepository,
} from "../../stores/infrastructure/in-memory-store-management-repositories.js";
import {
  checkAvailabilityEndpoint,
  createAssetCategoryEndpoint,
  createAssetEndpoint,
  createEquipmentItemEndpoint,
  createPricingRuleEndpoint,
  createPricingQuoteEndpoint,
  createRentalPointEndpoint,
  searchAssetsEndpoint,
} from "../api/inventory-api.js";
import { InventoryService } from "../application/inventory-service.js";
import {
  InMemoryAssetCategoryRepository,
  InMemoryAssetRepository,
  InMemoryAvailabilityBlockRepository,
  InMemoryEquipmentItemRepository,
  InMemoryInventoryUnitRepository,
  InMemoryPricingRuleRepository,
  InMemoryRentalPointRepository,
} from "../infrastructure/in-memory-inventory-repositories.js";

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
  const now = asIsoUtcDateTime("2026-06-23T15:00:00Z");
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
  const approved = applyApprovalDecision(
    submitStoreForApproval(draft, now),
    "APPROVED",
    asDomainId<"User">("usr_admin"),
    "documents_verified",
    now,
  );
  const branch = createBranchProfile({
    branchId: asDomainId<"Branch">("brn_1"),
    store: approved,
    name: "Old Town",
    address: "1 Demo Road",
    country: "TH",
    latitude: 13.7563,
    longitude: 100.5018,
    now,
  });

  await storeRepository.save(approved);
  await branchRepository.save(branch);

  return { store: approved, branch };
};

const createTestContext = async () => {
  const storeRepository = new InMemoryStoreRepository();
  const branchRepository = new InMemoryBranchRepository();
  const storeMemberRepository = new InMemoryStoreMemberRepository();
  const bookingRepository = new InMemoryBookingRepository();
  const assetCategoryRepository = new InMemoryAssetCategoryRepository();
  const assetRepository = new InMemoryAssetRepository();
  const equipmentItemRepository = new InMemoryEquipmentItemRepository();
  const inventoryUnitRepository = new InMemoryInventoryUnitRepository();
  const rentalPointRepository = new InMemoryRentalPointRepository();
  const pricingRuleRepository = new InMemoryPricingRuleRepository();
  const availabilityBlockRepository = new InMemoryAvailabilityBlockRepository();
  let categoryCounter = 0;
  let assetCounter = 0;
  let equipmentCounter = 0;
  let unitCounter = 0;
  let pointCounter = 0;
  let ruleCounter = 0;
  let blockCounter = 0;

  const { store, branch } = await createApprovedStore(
    storeRepository,
    branchRepository,
  );
  const tokenVerifier: FirebaseIdTokenVerifier = {
    verifyIdToken: async (token) => {
      if (token !== "owner-token" && token !== "other-token") {
        throw new Error("invalid token");
      }

      return {
        uid: token === "owner-token" ? "owner_uid" : "other_uid",
        claims: {},
        issuedAt: asIsoUtcDateTime("2026-06-23T15:00:00Z"),
        expiresAt: asIsoUtcDateTime("2026-06-23T16:00:00Z"),
      };
    },
  };
  const appCheckVerifier: AppCheckTokenVerifier = {
    verifyToken: async (token) => {
      if (token !== "valid-app-check") {
        throw new Error("invalid app check");
      }

      return {
        appId: "bike-local-merchant",
        tokenId: "app-check-1",
        issuedAt: asIsoUtcDateTime("2026-06-23T15:00:00Z"),
        expiresAt: asIsoUtcDateTime("2026-06-23T16:00:00Z"),
      };
    },
  };
  const userResolver: DomainUserResolver = {
    resolveByFirebaseUid: async (firebaseUid) => ({
      userId:
        firebaseUid === "owner_uid"
          ? asDomainId<"User">("usr_owner")
          : asDomainId<"User">("usr_other"),
      status: "ACTIVE",
    }),
  };
  const assignments = new Map<string, readonly RoleAssignment[]>([
    [
      "usr_owner",
      [
        {
          role: "STORE_OWNER",
          tenantId: store.tenantId,
          storeId: store.id,
        },
      ],
    ],
    [
      "usr_other",
      [
        {
          role: "STORE_OWNER",
          tenantId: asDomainId<"Tenant">("store_other"),
          storeId: asDomainId<"Store">("store_other"),
        },
      ],
    ],
  ]);
  const roleLookup: RoleAssignmentLookup = {
    listRoleAssignments: async (userId) => [
      ...(assignments.get(userId as string) ?? []),
      ...(await storeMemberRepository.listByUserId(userId)).map((member) => ({
        role: member.role,
        tenantId: member.tenantId,
        storeId: member.storeId,
        branchIds: member.branchIds,
        grantedPermissions: member.grantedPermissions,
        deniedPermissions: member.deniedPermissions,
      })),
    ],
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

  return {
    store,
    branch,
    branchRepository,
    bookingRepository,
    inventoryService,
    apiDependencies: {
      security: {
        tokenVerifier,
        appCheckVerifier,
        userResolver,
        roleLookup,
      },
      inventoryService,
      now: () => asIsoUtcDateTime("2026-06-23T15:10:00Z"),
      buildAssetCategoryId: () => `cat_${++categoryCounter}`,
      buildAssetId: () => `asset_${++assetCounter}`,
      buildEquipmentItemId: () => `eq_${++equipmentCounter}`,
      buildInventoryUnitId: () => `unit_${++unitCounter}`,
      buildRentalPointId: () => `point_${++pointCounter}`,
      buildPricingRuleId: () => `rule_${++ruleCounter}`,
      buildAvailabilityBlockId: () => `block_${++blockCounter}`,
    },
  };
};

const seedInventory = async (
  context: Awaited<ReturnType<typeof createTestContext>>,
) => {
  const categoryResponse = await createAssetCategoryEndpoint(
    {
      requestId: "req_category" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      body: {
        store_id: context.store.id,
        name: "City bike",
        type: "BIKE",
        default_base_price: 10000,
        default_deposit_amount: 50000,
        currency: "THB",
      },
    },
    context.apiDependencies,
  );
  const category = expectData<{ readonly id: AssetCategoryId }>(
    categoryResponse,
  );
  const pointResponse = await createRentalPointEndpoint(
    {
      requestId: "req_point" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      body: {
        store_id: context.store.id,
        branch_id: context.branch.id,
        name: "Front desk",
        latitude: 13.7563,
        longitude: 100.5018,
      },
    },
    context.apiDependencies,
  );
  const point = expectData<{ readonly id: string }>(pointResponse);
  const equipmentResponse = await createEquipmentItemEndpoint(
    {
      requestId: "req_equipment" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      body: {
        store_id: context.store.id,
        branch_id: context.branch.id,
        name: "Helmet",
        rental_mode: "DEPOSIT_REQUIRED",
        price_amount: 1000,
        deposit_amount: 5000,
        currency: "THB",
      },
    },
    context.apiDependencies,
  );
  const equipment = expectData<{ readonly id: string }>(equipmentResponse);
  const assetResponse = await createAssetEndpoint(
    {
      requestId: "req_asset" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      body: {
        store_id: context.store.id,
        branch_id: context.branch.id,
        category_id: category.id,
        code: "BIKE-001",
        qr_token_reference: "qr_ref_001",
        brand: "Demo",
        model: "City",
        base_price: 10000,
        deposit_amount: 50000,
        currency: "THB",
        current_point_id: point.id as never,
        cash_accepted: true,
        different_return_allowed: true,
        equipment_ids: [equipment.id as never],
      },
    },
    context.apiDependencies,
  );
  const asset = expectData<{ readonly id: AssetId; readonly code: string }>(
    assetResponse,
  );

  return { category, point, equipment, asset };
};

test("inventory API creates assets, rejects duplicate store code, and enforces tenant scope", async () => {
  const context = await createTestContext();
  const { category } = await seedInventory(context);

  const duplicate = await createAssetEndpoint(
    {
      requestId: "req_asset_duplicate" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      body: {
        store_id: context.store.id,
        branch_id: context.branch.id,
        category_id: category.id,
        code: "BIKE-001",
        base_price: 10000,
        deposit_amount: 50000,
        currency: "THB",
      },
    },
    context.apiDependencies,
  );
  assert.equal(duplicate.status, 409);
  assert.equal(expectErrorCode(duplicate), "ASSET_CODE_ALREADY_EXISTS");

  const rejected = await createAssetCategoryEndpoint(
    {
      requestId: "req_cross_tenant" as never,
      authorizationHeader: "Bearer other-token",
      appCheckHeader: "valid-app-check",
      body: {
        store_id: context.store.id,
        name: "Other",
        type: "BIKE",
        default_base_price: 10000,
        default_deposit_amount: 50000,
        currency: "THB",
      },
    },
    context.apiDependencies,
  );
  assert.equal(rejected.status, 403);
  assert.equal(expectErrorCode(rejected), "PERMISSION_DENIED");
});

test("pricing quote uses integer minor units and immutable snapshots", async () => {
  const context = await createTestContext();
  const { asset, equipment, category } = await seedInventory(context);
  await createPricingRuleEndpoint(
    {
      requestId: "req_rule" as never,
      authorizationHeader: "Bearer owner-token",
      appCheckHeader: "valid-app-check",
      body: {
        store_id: context.store.id,
        category_id: category.id,
        type: "FIXED_FEE",
        amount: 2500,
        currency: "THB",
      },
    },
    context.apiDependencies,
  );

  const quote = await createPricingQuoteEndpoint(
    {
      requestId: "req_quote" as never,
      body: {
        asset_ids: [asset.id],
        equipment_ids: [equipment.id as never],
        start_at: asIsoUtcDateTime("2026-06-24T01:00:00Z"),
        end_at: asIsoUtcDateTime("2026-06-24T04:00:00Z"),
        payment_method: "ONLINE",
      },
    },
    context.apiDependencies,
  );

  assert.equal(quote.status, 200);
  const data = expectData<{
    readonly subtotal_amount: number;
    readonly fee_amount: number;
    readonly deposit_amount: number;
    readonly total_amount: number;
    readonly price_snapshot: { readonly duration_hours: number };
  }>(quote);
  assert.equal(data.subtotal_amount, 33000);
  assert.equal(data.fee_amount, 2500);
  assert.equal(data.deposit_amount, 55000);
  assert.equal(data.total_amount, 90500);
  assert.equal(data.price_snapshot.duration_hours, 3);
});

test("availability reservation prevents overlapping holds and closed branches are unavailable", async () => {
  const context = await createTestContext();
  const { asset } = await seedInventory(context);

  const first = await checkAvailabilityEndpoint(
    {
      requestId: "req_hold_1" as never,
      body: {
        asset_ids: [asset.id],
        start_at: asIsoUtcDateTime("2026-06-24T01:00:00Z"),
        end_at: asIsoUtcDateTime("2026-06-24T04:00:00Z"),
        reserve: true,
        reference_id: "booking_hold_1",
      },
    },
    context.apiDependencies,
  );
  assert.equal(first.status, 200);
  assert.equal(
    expectData<{ readonly available: boolean }>(first).available,
    true,
  );

  const second = await checkAvailabilityEndpoint(
    {
      requestId: "req_hold_2" as never,
      body: {
        asset_ids: [asset.id],
        start_at: asIsoUtcDateTime("2026-06-24T02:00:00Z"),
        end_at: asIsoUtcDateTime("2026-06-24T03:00:00Z"),
        reserve: true,
        reference_id: "booking_hold_2",
      },
    },
    context.apiDependencies,
  );
  assert.equal(second.status, 409);
  assert.equal(expectErrorCode(second), "AVAILABILITY_CONFLICT");

  await context.branchRepository.save({
    ...context.branch,
    status: "TEMPORARILY_CLOSED",
    temporaryClosure: { reason: "storm_warning" },
    version: 2 as never,
  });
  const closed = await checkAvailabilityEndpoint(
    {
      requestId: "req_closed_branch" as never,
      body: {
        asset_ids: [asset.id],
        start_at: asIsoUtcDateTime("2026-06-25T01:00:00Z"),
        end_at: asIsoUtcDateTime("2026-06-25T04:00:00Z"),
      },
    },
    context.apiDependencies,
  );
  assert.equal(closed.status, 200);
  assert.equal(
    expectData<{ readonly available: boolean }>(closed).available,
    false,
  );
});

test("asset search validates unsupported filters and filters by availability", async () => {
  const context = await createTestContext();
  const { asset } = await seedInventory(context);
  await checkAvailabilityEndpoint(
    {
      requestId: "req_hold_search" as never,
      body: {
        asset_ids: [asset.id],
        start_at: asIsoUtcDateTime("2026-06-24T01:00:00Z"),
        end_at: asIsoUtcDateTime("2026-06-24T04:00:00Z"),
        reserve: true,
        reference_id: "booking_hold_search",
      },
    },
    context.apiDependencies,
  );

  const results = await searchAssetsEndpoint(
    {
      requestId: "req_search" as never,
      query: {
        q: "city",
        store_id: context.store.id,
        start_at: asIsoUtcDateTime("2026-06-24T01:00:00Z"),
        end_at: asIsoUtcDateTime("2026-06-24T04:00:00Z"),
      },
    },
    context.apiDependencies,
  );
  assert.equal(results.status, 200);
  assert.equal(expectData<readonly unknown[]>(results).length, 0);

  const unsupported = await searchAssetsEndpoint(
    {
      requestId: "req_search_unsupported" as never,
      query: {
        unsupported: {
          unindexed_sort: "expensive",
        },
      },
    },
    context.apiDependencies,
  );
  assert.equal(unsupported.status, 422);
  assert.equal(expectErrorCode(unsupported), "SEARCH_FILTER_UNSUPPORTED");
});
