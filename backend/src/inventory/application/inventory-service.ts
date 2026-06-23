import type { BookingRepository } from "../../booking/domain/booking-repository.js";
import { DomainError, asDomainId } from "../../shared/domain/index.js";
import type {
  AssetCategoryId,
  AssetId,
  AvailabilityBlockId,
  BranchId,
  EquipmentItemId,
  InventoryUnitId,
  IsoUtcDateTime,
  Page,
  PageRequest,
  PricingRuleId,
  RentalPointId,
  StoreId,
  TenantId,
  UserId,
} from "../../shared/domain/index.js";
import type {
  BranchRepository,
  StoreRepository,
} from "../../stores/domain/store-repository.js";
import { isBranchAvailableForBooking } from "../../stores/domain/store-policies.js";
import {
  assertSupportedSearchFilters,
  assertValidTimeRange,
  calculatePricingTotals,
  createAssetCategoryProfile,
  createAssetProfile,
  createEquipmentItemProfile,
  createInventoryUnitProfile,
  createPricingRuleProfile,
  createRentalPointProfile,
  applyAssetStatusTransition,
} from "../domain/inventory-policies.js";
import type {
  Asset,
  AssetStatus,
  AssetCategory,
  AssetCategoryRepository,
  AssetRepository,
  AssetSearchFilter,
  AvailabilityBlock,
  AvailabilityBlockRepository,
  EquipmentItem,
  EquipmentItemRepository,
  EquipmentRentalMode,
  InventoryUnit,
  InventoryUnitRepository,
  PricingRule,
  PricingRuleRepository,
  RentalPoint,
  RentalPointRepository,
} from "../domain/inventory-repository.js";

export interface InventoryServiceDependencies {
  readonly storeRepository: StoreRepository;
  readonly branchRepository: BranchRepository;
  readonly bookingRepository: BookingRepository;
  readonly assetCategoryRepository: AssetCategoryRepository;
  readonly assetRepository: AssetRepository;
  readonly equipmentItemRepository: EquipmentItemRepository;
  readonly inventoryUnitRepository: InventoryUnitRepository;
  readonly rentalPointRepository: RentalPointRepository;
  readonly pricingRuleRepository: PricingRuleRepository;
  readonly availabilityBlockRepository: AvailabilityBlockRepository;
}

export interface CreateAssetCategoryInput {
  readonly categoryId: AssetCategoryId;
  readonly storeId: StoreId;
  readonly name: string;
  readonly type: AssetCategory["type"];
  readonly description?: string | undefined;
  readonly defaultBasePrice: number;
  readonly defaultDepositAmount: number;
  readonly currency: string;
  readonly now: IsoUtcDateTime;
}

export interface CreateAssetInput {
  readonly assetId: AssetId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly categoryId: AssetCategoryId;
  readonly code: string;
  readonly qrTokenReference?: string | undefined;
  readonly brand?: string | undefined;
  readonly model?: string | undefined;
  readonly color?: string | undefined;
  readonly size?: string | undefined;
  readonly description?: string | undefined;
  readonly basePrice: number;
  readonly depositAmount: number;
  readonly currency: string;
  readonly currentPointId?: RentalPointId | undefined;
  readonly images?: readonly string[] | undefined;
  readonly cashAccepted?: boolean | undefined;
  readonly differentReturnAllowed?: boolean | undefined;
  readonly equipmentIds?: readonly EquipmentItemId[] | undefined;
  readonly now: IsoUtcDateTime;
}

export interface CreateEquipmentItemInput {
  readonly equipmentItemId: EquipmentItemId;
  readonly storeId: StoreId;
  readonly branchId?: BranchId | undefined;
  readonly name: string;
  readonly rentalMode: EquipmentRentalMode;
  readonly priceAmount?: number | undefined;
  readonly depositAmount?: number | undefined;
  readonly currency?: string | undefined;
  readonly now: IsoUtcDateTime;
}

export interface CreateInventoryUnitInput {
  readonly inventoryUnitId: InventoryUnitId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly assetId?: AssetId | undefined;
  readonly equipmentItemId?: EquipmentItemId | undefined;
  readonly now: IsoUtcDateTime;
}

export interface CreateRentalPointInput {
  readonly rentalPointId: RentalPointId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly geohash?: string | undefined;
  readonly now: IsoUtcDateTime;
}

export interface CreatePricingRuleInput {
  readonly pricingRuleId: PricingRuleId;
  readonly storeId: StoreId;
  readonly branchId?: BranchId | undefined;
  readonly categoryId?: AssetCategoryId | undefined;
  readonly type: PricingRule["type"];
  readonly amount: number;
  readonly currency: string;
  readonly priority?: number | undefined;
  readonly now: IsoUtcDateTime;
}

export interface PricingQuoteInput {
  readonly assetIds: readonly AssetId[];
  readonly equipmentIds?: readonly EquipmentItemId[] | undefined;
  readonly startAt: IsoUtcDateTime;
  readonly endAt: IsoUtcDateTime;
  readonly paymentMethod: "ONLINE" | "CASH";
}

export interface AvailabilityCheckInput {
  readonly assetIds: readonly AssetId[];
  readonly startAt: IsoUtcDateTime;
  readonly endAt: IsoUtcDateTime;
}

export interface ReserveAvailabilityInput extends AvailabilityCheckInput {
  readonly availabilityBlockId: () => AvailabilityBlockId;
  readonly referenceId: string;
  readonly now: IsoUtcDateTime;
}

export interface SearchAssetsInput extends AssetSearchFilter {
  readonly startAt?: IsoUtcDateTime | undefined;
  readonly endAt?: IsoUtcDateTime | undefined;
  readonly rawFilters?: Readonly<Record<string, unknown>> | undefined;
}

export interface PricingQuote {
  readonly subtotalAmount: number;
  readonly feeAmount: number;
  readonly depositAmount: number;
  readonly discountAmount: number;
  readonly totalAmount: number;
  readonly currency: string;
  readonly priceSnapshot: Readonly<Record<string, unknown>>;
  readonly policySnapshot: Readonly<Record<string, unknown>>;
}

export interface AvailabilityResult {
  readonly available: boolean;
  readonly conflicts: readonly {
    readonly assetId: AssetId;
    readonly reason: "BOOKING_OVERLAP" | "AVAILABILITY_BLOCK";
    readonly referenceId: string;
  }[];
}

const getOrThrow = async <T, Id>(
  id: Id,
  finder: (id: Id) => Promise<T | null>,
  resourceName: string,
  detailKey: string,
): Promise<T> => {
  const entity = await finder(id);
  if (entity === null) {
    throw new DomainError("NOT_FOUND", `${resourceName} not found`, {
      [detailKey]: id,
    });
  }

  return entity;
};

export class InventoryService {
  constructor(private readonly dependencies: InventoryServiceDependencies) {}

  async createAssetCategory(
    input: CreateAssetCategoryInput,
  ): Promise<AssetCategory> {
    const store = await this.getStore(input.storeId);
    const category = createAssetCategoryProfile({
      ...input,
      id: input.categoryId,
      tenantId: store.tenantId,
    });

    return this.dependencies.assetCategoryRepository.save(category);
  }

  async createAsset(input: CreateAssetInput): Promise<Asset> {
    const [store, branch, category, existingCode] = await Promise.all([
      this.getStore(input.storeId),
      this.getBranch(input.branchId),
      this.getAssetCategory(input.categoryId),
      this.dependencies.assetRepository.findByStoreCode(
        input.storeId,
        input.code,
      ),
    ]);

    if (branch.storeId !== store.id || category.storeId !== store.id) {
      throw new DomainError(
        "PERMISSION_DENIED",
        "Asset target is outside store scope.",
        {
          storeId: store.id,
          branchId: branch.id,
          categoryId: category.id,
        },
      );
    }

    if (existingCode !== null) {
      throw new DomainError(
        "ASSET_CODE_ALREADY_EXISTS",
        "Asset code already exists within this store.",
        {
          storeId: input.storeId,
          code: input.code,
        },
      );
    }

    if (!isBranchAvailableForBooking(store, branch)) {
      throw new DomainError(
        "INVENTORY_RENTAL_POINT_UNAVAILABLE",
        "Assets can be activated only for approved active stores and active branches.",
        {
          storeId: store.id,
          branchId: branch.id,
        },
      );
    }

    const asset = createAssetProfile({
      ...input,
      id: input.assetId,
      tenantId: store.tenantId,
    });

    return this.dependencies.assetRepository.save(asset);
  }

  async createEquipmentItem(
    input: CreateEquipmentItemInput,
  ): Promise<EquipmentItem> {
    const store = await this.getStore(input.storeId);
    if (input.branchId !== undefined) {
      const branch = await this.getBranch(input.branchId);
      if (branch.storeId !== store.id) {
        throw new DomainError(
          "PERMISSION_DENIED",
          "Equipment branch is outside store scope.",
          {
            storeId: store.id,
            branchId: branch.id,
          },
        );
      }
    }

    const item = createEquipmentItemProfile({
      ...input,
      id: input.equipmentItemId,
      tenantId: store.tenantId,
    });

    return this.dependencies.equipmentItemRepository.save(item);
  }

  async createInventoryUnit(
    input: CreateInventoryUnitInput,
  ): Promise<InventoryUnit> {
    const [store, branch] = await Promise.all([
      this.getStore(input.storeId),
      this.getBranch(input.branchId),
    ]);
    if (branch.storeId !== store.id) {
      throw new DomainError(
        "PERMISSION_DENIED",
        "Inventory unit branch is outside store scope.",
        {
          storeId: store.id,
          branchId: branch.id,
        },
      );
    }

    const unit = createInventoryUnitProfile({
      ...input,
      id: input.inventoryUnitId,
      tenantId: store.tenantId,
    });

    return this.dependencies.inventoryUnitRepository.save(unit);
  }

  async createRentalPoint(input: CreateRentalPointInput): Promise<RentalPoint> {
    const [store, branch] = await Promise.all([
      this.getStore(input.storeId),
      this.getBranch(input.branchId),
    ]);
    const point = createRentalPointProfile({
      ...input,
      store,
      branch,
      id: input.rentalPointId,
    });

    return this.dependencies.rentalPointRepository.save(point);
  }

  async createPricingRule(input: CreatePricingRuleInput): Promise<PricingRule> {
    const store = await this.getStore(input.storeId);
    const rule = createPricingRuleProfile({
      ...input,
      tenantId: store.tenantId,
      id: input.pricingRuleId,
    });

    return this.dependencies.pricingRuleRepository.save(rule);
  }

  async createPricingQuote(input: PricingQuoteInput): Promise<PricingQuote> {
    assertValidTimeRange(input.startAt, input.endAt);
    const assets = await Promise.all(
      input.assetIds.map((assetId) => this.getAsset(assetId)),
    );
    const equipment = await Promise.all(
      (input.equipmentIds ?? []).map((equipmentId) =>
        this.getEquipmentItem(equipmentId),
      ),
    );
    const ruleGroups = await Promise.all(
      assets.map((asset) =>
        this.dependencies.pricingRuleRepository.listActiveForAsset(asset),
      ),
    );
    const rules = ruleGroups.flat();
    const totals = calculatePricingTotals({
      assets,
      equipment,
      rules,
      startAt: input.startAt,
      endAt: input.endAt,
      paymentMethod: input.paymentMethod,
    });

    return {
      subtotalAmount: totals.subtotalAmount as number,
      feeAmount: totals.feeAmount as number,
      depositAmount: totals.depositAmount as number,
      discountAmount: totals.discountAmount as number,
      totalAmount: totals.totalAmount as number,
      currency: totals.currency,
      priceSnapshot: {
        asset_ids: input.assetIds,
        equipment_ids: input.equipmentIds ?? [],
        duration_hours: totals.hours,
        base_prices: assets.map((asset) => ({
          asset_id: asset.id,
          amount: asset.basePrice,
        })),
        pricing_rule_ids: rules.map((rule) => rule.id),
      },
      policySnapshot: {
        payment_method: input.paymentMethod,
        deposit_required: totals.depositAmount > 0,
        cancellation_policy_ref: "policy_open_question",
      },
    };
  }

  async checkAvailability(
    input: AvailabilityCheckInput,
  ): Promise<AvailabilityResult> {
    assertValidTimeRange(input.startAt, input.endAt);
    const conflicts: {
      readonly assetId: AssetId;
      readonly reason: "BOOKING_OVERLAP" | "AVAILABILITY_BLOCK";
      readonly referenceId: string;
    }[] = [];

    for (const assetId of input.assetIds) {
      const asset = await this.getAsset(assetId);
      const [store, branch, booking, block] = await Promise.all([
        this.getStore(asset.storeId),
        this.getBranch(asset.branchId),
        this.dependencies.bookingRepository.findOverlappingConfirmedBooking(
          assetId,
          input.startAt,
          input.endAt,
        ),
        this.dependencies.availabilityBlockRepository.findOverlapping(
          assetId,
          input.startAt,
          input.endAt,
        ),
      ]);

      if (
        asset.status !== "AVAILABLE" ||
        !isBranchAvailableForBooking(store, branch)
      ) {
        conflicts.push({
          assetId,
          reason: "AVAILABILITY_BLOCK",
          referenceId: "asset_or_branch_unavailable",
        });
      }

      if (booking !== null) {
        conflicts.push({
          assetId,
          reason: "BOOKING_OVERLAP",
          referenceId: booking.id,
        });
      }

      if (block !== null) {
        conflicts.push({
          assetId,
          reason: "AVAILABILITY_BLOCK",
          referenceId: block.referenceId,
        });
      }
    }

    return {
      available: conflicts.length === 0,
      conflicts,
    };
  }

  async reserveAvailability(
    input: ReserveAvailabilityInput,
  ): Promise<readonly AvailabilityBlock[]> {
    const result = await this.checkAvailability(input);
    if (!result.available) {
      throw new DomainError(
        "AVAILABILITY_CONFLICT",
        "Availability conflicts with an existing booking or hold.",
        {
          conflicts: result.conflicts,
        },
      );
    }

    const blocks: AvailabilityBlock[] = [];
    for (const assetId of input.assetIds) {
      const asset = await this.getAsset(assetId);
      const block: AvailabilityBlock = {
        id: input.availabilityBlockId(),
        tenantId: asset.tenantId,
        assetId,
        storeId: asset.storeId,
        branchId: asset.branchId,
        startAt: input.startAt,
        endAt: input.endAt,
        reason: "BOOKING_HOLD",
        referenceId: input.referenceId,
        createdAt: input.now,
        updatedAt: input.now,
        version: 1 as never,
      };
      blocks.push(
        await this.dependencies.availabilityBlockRepository.reserve(block),
      );
    }

    return blocks;
  }

  async searchAssets(
    input: SearchAssetsInput,
    page: PageRequest,
  ): Promise<Page<Asset>> {
    assertSupportedSearchFilters(input.rawFilters ?? {});
    const results = await this.dependencies.assetRepository.search(input, page);

    if (input.startAt === undefined || input.endAt === undefined) {
      return results;
    }

    const availableItems: Asset[] = [];
    for (const asset of results.items) {
      const availability = await this.checkAvailability({
        assetIds: [asset.id],
        startAt: input.startAt,
        endAt: input.endAt,
      });
      if (availability.available) {
        availableItems.push(asset);
      }
    }

    return {
      items: availableItems,
      ...(results.nextCursor === undefined
        ? {}
        : { nextCursor: results.nextCursor }),
    };
  }

  async searchStores(
    filter: {
      readonly text?: string;
      readonly rawFilters?: Readonly<Record<string, unknown>>;
    },
    page: PageRequest,
  ) {
    assertSupportedSearchFilters(filter.rawFilters ?? {});
    const visibleStores =
      await this.dependencies.storeRepository.listVisible(page);
    if (filter.text === undefined || filter.text.trim() === "") {
      return visibleStores;
    }

    const query = filter.text.toLowerCase();
    return {
      items: visibleStores.items.filter((store) =>
        `${store.displayName} ${store.legalName}`.toLowerCase().includes(query),
      ),
      nextCursor: visibleStores.nextCursor,
    };
  }

  async getAsset(assetId: AssetId): Promise<Asset> {
    return getOrThrow(
      assetId,
      (id) => this.dependencies.assetRepository.findById(id),
      "Asset",
      "assetId",
    );
  }

  async transitionAssetStatus(input: {
    readonly assetId: AssetId;
    readonly toStatus: AssetStatus;
    readonly actorUserId?: UserId | undefined;
    readonly reason?: string | undefined;
    readonly now: IsoUtcDateTime;
  }): Promise<Asset> {
    const asset = await this.getAsset(input.assetId);
    const updated = applyAssetStatusTransition(asset, input.toStatus, {
      changedByUserId: input.actorUserId,
      reason: input.reason,
      now: input.now,
    });

    return this.dependencies.assetRepository.save(updated, {
      expectedVersion: asset.version,
    });
  }

  async getAssetCategory(categoryId: AssetCategoryId): Promise<AssetCategory> {
    return getOrThrow(
      categoryId,
      (id) => this.dependencies.assetCategoryRepository.findById(id),
      "Asset category",
      "categoryId",
    );
  }

  async getEquipmentItem(
    equipmentItemId: EquipmentItemId,
  ): Promise<EquipmentItem> {
    return getOrThrow(
      equipmentItemId,
      (id) => this.dependencies.equipmentItemRepository.findById(id),
      "Equipment item",
      "equipmentItemId",
    );
  }

  private async getStore(storeId: StoreId) {
    return getOrThrow(
      storeId,
      (id) => this.dependencies.storeRepository.findById(id),
      "Store",
      "storeId",
    );
  }

  private async getBranch(branchId: BranchId) {
    return getOrThrow(
      branchId,
      (id) => this.dependencies.branchRepository.findById(id),
      "Branch",
      "branchId",
    );
  }
}

export interface SerializedAssetCategory {
  readonly id: AssetCategoryId;
  readonly tenant_id: TenantId;
  readonly store_id: StoreId;
  readonly name: string;
  readonly type: AssetCategory["type"];
  readonly description?: string | undefined;
  readonly default_base_price: number;
  readonly default_deposit_amount: number;
  readonly currency: string;
  readonly active: boolean;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: AssetCategory["version"];
}

export interface SerializedAsset {
  readonly id: AssetId;
  readonly tenant_id: TenantId;
  readonly store_id: StoreId;
  readonly branch_id: BranchId;
  readonly category_id: AssetCategoryId;
  readonly code: string;
  readonly qr_token_reference?: string | undefined;
  readonly brand?: string | undefined;
  readonly model?: string | undefined;
  readonly color?: string | undefined;
  readonly size?: string | undefined;
  readonly description?: string | undefined;
  readonly status: Asset["status"];
  readonly base_price: number;
  readonly deposit_amount: number;
  readonly currency: string;
  readonly current_point_id?: RentalPointId | undefined;
  readonly images: readonly string[];
  readonly cash_accepted: boolean;
  readonly different_return_allowed: boolean;
  readonly equipment_ids: readonly EquipmentItemId[];
  readonly status_history: readonly {
    readonly from_status: Asset["status"];
    readonly to_status: Asset["status"];
    readonly changed_at: IsoUtcDateTime;
    readonly changed_by_user_id?: UserId | undefined;
    readonly reason?: string | undefined;
  }[];
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: Asset["version"];
}

export interface SerializedEquipmentItem {
  readonly id: EquipmentItemId;
  readonly tenant_id: TenantId;
  readonly store_id: StoreId;
  readonly branch_id?: BranchId | undefined;
  readonly name: string;
  readonly rental_mode: EquipmentItem["rentalMode"];
  readonly status: EquipmentItem["status"];
  readonly price_amount?: number | undefined;
  readonly deposit_amount?: number | undefined;
  readonly currency?: string | undefined;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: EquipmentItem["version"];
}

export interface SerializedRentalPoint {
  readonly id: RentalPointId;
  readonly tenant_id: TenantId;
  readonly store_id: StoreId;
  readonly branch_id: BranchId;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly geohash?: string | undefined;
  readonly status: RentalPoint["status"];
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: RentalPoint["version"];
}

export interface SerializedPricingQuote {
  readonly subtotal_amount: number;
  readonly fee_amount: number;
  readonly deposit_amount: number;
  readonly discount_amount: number;
  readonly total_amount: number;
  readonly currency: string;
  readonly price_snapshot: Readonly<Record<string, unknown>>;
  readonly policy_snapshot: Readonly<Record<string, unknown>>;
}

export interface SerializedAvailabilityResult {
  readonly available: boolean;
  readonly conflicts: readonly {
    readonly asset_id: AssetId;
    readonly reason: "BOOKING_OVERLAP" | "AVAILABILITY_BLOCK";
    readonly reference_id: string;
  }[];
}

export const serializeAssetCategory = (
  category: AssetCategory,
): SerializedAssetCategory => ({
  id: category.id,
  tenant_id: category.tenantId,
  store_id: category.storeId,
  name: category.name,
  type: category.type,
  description: category.description,
  default_base_price: category.defaultBasePrice as number,
  default_deposit_amount: category.defaultDepositAmount as number,
  currency: category.currency,
  active: category.active,
  created_at: category.createdAt,
  updated_at: category.updatedAt,
  version: category.version,
});

export const serializeAsset = (asset: Asset): SerializedAsset => ({
  id: asset.id,
  tenant_id: asset.tenantId,
  store_id: asset.storeId,
  branch_id: asset.branchId,
  category_id: asset.categoryId,
  code: asset.code,
  qr_token_reference: asset.qrTokenReference,
  brand: asset.brand,
  model: asset.model,
  color: asset.color,
  size: asset.size,
  description: asset.description,
  status: asset.status,
  base_price: asset.basePrice as number,
  deposit_amount: asset.depositAmount as number,
  currency: asset.currency,
  current_point_id: asset.currentPointId,
  images: asset.images,
  cash_accepted: asset.cashAccepted,
  different_return_allowed: asset.differentReturnAllowed,
  equipment_ids: asset.equipmentIds,
  status_history: asset.statusHistory.map((transition) => ({
    from_status: transition.fromStatus,
    to_status: transition.toStatus,
    changed_at: transition.changedAt,
    changed_by_user_id: transition.changedByUserId,
    reason: transition.reason,
  })),
  created_at: asset.createdAt,
  updated_at: asset.updatedAt,
  version: asset.version,
});

export const serializeEquipmentItem = (
  item: EquipmentItem,
): SerializedEquipmentItem => ({
  id: item.id,
  tenant_id: item.tenantId,
  store_id: item.storeId,
  branch_id: item.branchId,
  name: item.name,
  rental_mode: item.rentalMode,
  status: item.status,
  price_amount: item.priceAmount as number | undefined,
  deposit_amount: item.depositAmount as number | undefined,
  currency: item.currency,
  created_at: item.createdAt,
  updated_at: item.updatedAt,
  version: item.version,
});

export const serializeRentalPoint = (
  point: RentalPoint,
): SerializedRentalPoint => ({
  id: point.id,
  tenant_id: point.tenantId,
  store_id: point.storeId,
  branch_id: point.branchId,
  name: point.name,
  latitude: point.latitude,
  longitude: point.longitude,
  geohash: point.geohash,
  status: point.status,
  created_at: point.createdAt,
  updated_at: point.updatedAt,
  version: point.version,
});

export const serializePricingQuote = (
  quote: PricingQuote,
): SerializedPricingQuote => ({
  subtotal_amount: quote.subtotalAmount,
  fee_amount: quote.feeAmount,
  deposit_amount: quote.depositAmount,
  discount_amount: quote.discountAmount,
  total_amount: quote.totalAmount,
  currency: quote.currency,
  price_snapshot: quote.priceSnapshot,
  policy_snapshot: quote.policySnapshot,
});

export const serializeAvailabilityResult = (
  result: AvailabilityResult,
): SerializedAvailabilityResult => ({
  available: result.available,
  conflicts: result.conflicts.map((conflict) => ({
    asset_id: conflict.assetId,
    reason: conflict.reason,
    reference_id: conflict.referenceId,
  })),
});

export const buildAvailabilityBlockId = (value: string): AvailabilityBlockId =>
  asDomainId<"AvailabilityBlock">(value) as AvailabilityBlockId;
