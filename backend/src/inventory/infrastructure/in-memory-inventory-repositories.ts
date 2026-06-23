import { DomainError } from "../../shared/domain/index.js";
import type {
  Page,
  PageRequest,
  SaveOptions,
} from "../../shared/domain/index.js";
import { timeRangesOverlap } from "../domain/inventory-policies.js";
import type {
  Asset,
  AssetCategory,
  AssetCategoryRepository,
  AssetRepository,
  AssetSearchFilter,
  AvailabilityBlock,
  AvailabilityBlockRepository,
  EquipmentItem,
  EquipmentItemRepository,
  InventoryUnit,
  InventoryUnitRepository,
  PricingRule,
  PricingRuleRepository,
  RentalPoint,
  RentalPointRepository,
} from "../domain/inventory-repository.js";

const assertExpectedVersion = <T extends { readonly version: unknown }>(
  current: T | undefined,
  expectedVersion: SaveOptions["expectedVersion"],
  message: string,
  details: Readonly<Record<string, unknown>>,
): void => {
  if (expectedVersion !== undefined && current?.version !== expectedVersion) {
    throw new DomainError("VERSION_CONFLICT", message, details);
  }
};

export class InMemoryAssetCategoryRepository implements AssetCategoryRepository {
  private readonly categories = new Map<AssetCategory["id"], AssetCategory>();

  async findById(id: AssetCategory["id"]): Promise<AssetCategory | null> {
    return this.categories.get(id) ?? null;
  }

  async listByStoreId(
    storeId: AssetCategory["storeId"],
  ): Promise<readonly AssetCategory[]> {
    return [...this.categories.values()].filter(
      (category) => category.storeId === storeId,
    );
  }

  async save(
    category: AssetCategory,
    options?: SaveOptions,
  ): Promise<AssetCategory> {
    assertExpectedVersion(
      this.categories.get(category.id),
      options?.expectedVersion,
      "Asset category version conflict",
      { categoryId: category.id },
    );
    this.categories.set(category.id, category);
    return category;
  }
}

export class InMemoryAssetRepository implements AssetRepository {
  private readonly assets = new Map<Asset["id"], Asset>();

  async findById(id: Asset["id"]): Promise<Asset | null> {
    return this.assets.get(id) ?? null;
  }

  async findByStoreCode(
    storeId: Asset["storeId"],
    code: string,
  ): Promise<Asset | null> {
    return (
      [...this.assets.values()].find(
        (asset) => asset.storeId === storeId && asset.code === code,
      ) ?? null
    );
  }

  async search(
    filter: AssetSearchFilter,
    page: PageRequest,
  ): Promise<Page<Asset>> {
    const query = filter.text?.toLowerCase();
    const items = [...this.assets.values()]
      .filter(
        (asset) =>
          filter.storeId === undefined || asset.storeId === filter.storeId,
      )
      .filter(
        (asset) =>
          filter.branchId === undefined || asset.branchId === filter.branchId,
      )
      .filter(
        (asset) =>
          query === undefined ||
          `${asset.code} ${asset.brand ?? ""} ${asset.model ?? ""} ${asset.description ?? ""}`
            .toLowerCase()
            .includes(query),
      )
      .filter(
        (asset) =>
          filter.minPriceAmount === undefined ||
          (asset.basePrice as number) >= filter.minPriceAmount,
      )
      .filter(
        (asset) =>
          filter.maxPriceAmount === undefined ||
          (asset.basePrice as number) <= filter.maxPriceAmount,
      )
      .filter(
        (asset) =>
          filter.cashAccepted === undefined ||
          asset.cashAccepted === filter.cashAccepted,
      )
      .filter(
        (asset) =>
          filter.differentReturnAllowed === undefined ||
          asset.differentReturnAllowed === filter.differentReturnAllowed,
      )
      .filter(
        (asset) =>
          filter.equipmentRequired === undefined ||
          (filter.equipmentRequired ? asset.equipmentIds.length > 0 : true),
      )
      .slice(0, page.limit);

    return { items };
  }

  async save(asset: Asset, options?: SaveOptions): Promise<Asset> {
    assertExpectedVersion(
      this.assets.get(asset.id),
      options?.expectedVersion,
      "Asset version conflict",
      { assetId: asset.id },
    );
    this.assets.set(asset.id, asset);
    return asset;
  }
}

export class InMemoryEquipmentItemRepository implements EquipmentItemRepository {
  private readonly items = new Map<EquipmentItem["id"], EquipmentItem>();

  async findById(id: EquipmentItem["id"]): Promise<EquipmentItem | null> {
    return this.items.get(id) ?? null;
  }

  async listByStoreId(
    storeId: EquipmentItem["storeId"],
  ): Promise<readonly EquipmentItem[]> {
    return [...this.items.values()].filter((item) => item.storeId === storeId);
  }

  async save(
    item: EquipmentItem,
    options?: SaveOptions,
  ): Promise<EquipmentItem> {
    assertExpectedVersion(
      this.items.get(item.id),
      options?.expectedVersion,
      "Equipment item version conflict",
      { equipmentItemId: item.id },
    );
    this.items.set(item.id, item);
    return item;
  }
}

export class InMemoryInventoryUnitRepository implements InventoryUnitRepository {
  private readonly units = new Map<InventoryUnit["id"], InventoryUnit>();

  async findById(id: InventoryUnit["id"]): Promise<InventoryUnit | null> {
    return this.units.get(id) ?? null;
  }

  async listByBranchId(
    branchId: InventoryUnit["branchId"],
  ): Promise<readonly InventoryUnit[]> {
    return [...this.units.values()].filter(
      (unit) => unit.branchId === branchId,
    );
  }

  async save(
    unit: InventoryUnit,
    options?: SaveOptions,
  ): Promise<InventoryUnit> {
    assertExpectedVersion(
      this.units.get(unit.id),
      options?.expectedVersion,
      "Inventory unit version conflict",
      { inventoryUnitId: unit.id },
    );
    this.units.set(unit.id, unit);
    return unit;
  }
}

export class InMemoryRentalPointRepository implements RentalPointRepository {
  private readonly points = new Map<RentalPoint["id"], RentalPoint>();

  async findById(id: RentalPoint["id"]): Promise<RentalPoint | null> {
    return this.points.get(id) ?? null;
  }

  async listByBranchId(
    branchId: RentalPoint["branchId"],
  ): Promise<readonly RentalPoint[]> {
    return [...this.points.values()].filter(
      (point) => point.branchId === branchId,
    );
  }

  async save(point: RentalPoint, options?: SaveOptions): Promise<RentalPoint> {
    assertExpectedVersion(
      this.points.get(point.id),
      options?.expectedVersion,
      "Rental point version conflict",
      { rentalPointId: point.id },
    );
    this.points.set(point.id, point);
    return point;
  }
}

export class InMemoryPricingRuleRepository implements PricingRuleRepository {
  private readonly rules = new Map<PricingRule["id"], PricingRule>();

  async findById(id: PricingRule["id"]): Promise<PricingRule | null> {
    return this.rules.get(id) ?? null;
  }

  async listActiveForAsset(asset: Asset): Promise<readonly PricingRule[]> {
    return [...this.rules.values()]
      .filter((rule) => rule.active)
      .filter((rule) => rule.storeId === asset.storeId)
      .filter(
        (rule) =>
          rule.branchId === undefined || rule.branchId === asset.branchId,
      )
      .filter(
        (rule) =>
          rule.categoryId === undefined || rule.categoryId === asset.categoryId,
      )
      .sort((left, right) => left.priority - right.priority);
  }

  async save(rule: PricingRule, options?: SaveOptions): Promise<PricingRule> {
    assertExpectedVersion(
      this.rules.get(rule.id),
      options?.expectedVersion,
      "Pricing rule version conflict",
      { pricingRuleId: rule.id },
    );
    this.rules.set(rule.id, rule);
    return rule;
  }
}

export class InMemoryAvailabilityBlockRepository implements AvailabilityBlockRepository {
  private readonly blocks = new Map<
    AvailabilityBlock["id"],
    AvailabilityBlock
  >();

  async findById(
    id: AvailabilityBlock["id"],
  ): Promise<AvailabilityBlock | null> {
    return this.blocks.get(id) ?? null;
  }

  async findOverlapping(
    assetId: AvailabilityBlock["assetId"],
    startAt: AvailabilityBlock["startAt"],
    endAt: AvailabilityBlock["endAt"],
  ): Promise<AvailabilityBlock | null> {
    return (
      [...this.blocks.values()].find(
        (block) =>
          block.assetId === assetId &&
          timeRangesOverlap(block.startAt, block.endAt, startAt, endAt),
      ) ?? null
    );
  }

  async save(
    block: AvailabilityBlock,
    options?: SaveOptions,
  ): Promise<AvailabilityBlock> {
    assertExpectedVersion(
      this.blocks.get(block.id),
      options?.expectedVersion,
      "Availability block version conflict",
      { availabilityBlockId: block.id },
    );
    this.blocks.set(block.id, block);
    return block;
  }

  async reserve(block: AvailabilityBlock): Promise<AvailabilityBlock> {
    const existing = await this.findOverlapping(
      block.assetId,
      block.startAt,
      block.endAt,
    );
    if (existing !== null) {
      throw new DomainError(
        "AVAILABILITY_CONFLICT",
        "Availability block overlaps an existing hold.",
        {
          assetId: block.assetId,
          existingReferenceId: existing.referenceId,
        },
      );
    }

    this.blocks.set(block.id, block);
    return block;
  }
}
