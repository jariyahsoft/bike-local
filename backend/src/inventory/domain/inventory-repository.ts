import type {
  AssetCategoryId,
  AssetId,
  AvailabilityBlockId,
  BranchId,
  EntityTimestamps,
  EquipmentItemId,
  InventoryUnitId,
  IsoUtcDateTime,
  MinorUnitAmount,
  Page,
  PageRequest,
  PricingRuleId,
  RentalPointId,
  SaveOptions,
  StoreId,
  TenantId,
  TenantScopedEntity,
  UserId,
  VersionedEntity,
} from "../../shared/domain/index.js";
import type { Repository } from "../../shared/domain/index.js";

export type AssetStatus =
  | "AVAILABLE"
  | "RESERVED"
  | "PREPARING"
  | "AWAITING_HANDOVER"
  | "RENTED"
  | "RETURN_PENDING"
  | "INSPECTION_PENDING"
  | "MAINTENANCE"
  | "INACTIVE"
  | "LOST";
export type EquipmentRentalMode =
  | "SEPARATE"
  | "BUNDLED"
  | "PACKAGE_INCLUDED"
  | "DEPOSIT_REQUIRED";
export type EquipmentStatus =
  | "AVAILABLE"
  | "RENTED"
  | "MAINTENANCE"
  | "INACTIVE";
export type InventoryUnitStatus =
  | "AVAILABLE"
  | "RESERVED"
  | "RENTED"
  | "MAINTENANCE"
  | "INACTIVE";
export type RentalPointStatus = "ACTIVE" | "INACTIVE";
export type PricingRuleType =
  | "HOURLY_BASE"
  | "FIXED_FEE"
  | "PERCENT_DISCOUNT"
  | "CASH_SURCHARGE";
export type AvailabilityBlockReason = "BOOKING_HOLD" | "CONFIRMED_BOOKING";

export interface AssetStatusTransition {
  readonly fromStatus: AssetStatus;
  readonly toStatus: AssetStatus;
  readonly changedAt: IsoUtcDateTime;
  readonly changedByUserId?: UserId | undefined;
  readonly reason?: string | undefined;
}

export interface AssetCategory
  extends VersionedEntity, EntityTimestamps, TenantScopedEntity {
  readonly id: AssetCategoryId;
  readonly storeId: StoreId;
  readonly name: string;
  readonly type: "BIKE" | "E_BIKE" | "SCOOTER" | "OTHER";
  readonly description?: string | undefined;
  readonly defaultBasePrice: MinorUnitAmount;
  readonly defaultDepositAmount: MinorUnitAmount;
  readonly currency: string;
  readonly active: boolean;
}

export interface Asset
  extends VersionedEntity, EntityTimestamps, TenantScopedEntity {
  readonly id: AssetId;
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
  readonly status: AssetStatus;
  readonly basePrice: MinorUnitAmount;
  readonly depositAmount: MinorUnitAmount;
  readonly currency: string;
  readonly currentPointId?: RentalPointId | undefined;
  readonly images: readonly string[];
  readonly cashAccepted: boolean;
  readonly differentReturnAllowed: boolean;
  readonly equipmentIds: readonly EquipmentItemId[];
  readonly statusHistory: readonly AssetStatusTransition[];
}

export interface EquipmentItem
  extends VersionedEntity, EntityTimestamps, TenantScopedEntity {
  readonly id: EquipmentItemId;
  readonly storeId: StoreId;
  readonly branchId?: BranchId | undefined;
  readonly name: string;
  readonly rentalMode: EquipmentRentalMode;
  readonly status: EquipmentStatus;
  readonly priceAmount?: MinorUnitAmount | undefined;
  readonly depositAmount?: MinorUnitAmount | undefined;
  readonly currency?: string | undefined;
}

export interface InventoryUnit
  extends VersionedEntity, EntityTimestamps, TenantScopedEntity {
  readonly id: InventoryUnitId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly assetId?: AssetId | undefined;
  readonly equipmentItemId?: EquipmentItemId | undefined;
  readonly status: InventoryUnitStatus;
}

export interface RentalPoint
  extends VersionedEntity, EntityTimestamps, TenantScopedEntity {
  readonly id: RentalPointId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly geohash?: string | undefined;
  readonly status: RentalPointStatus;
}

export interface PricingRule
  extends VersionedEntity, EntityTimestamps, TenantScopedEntity {
  readonly id: PricingRuleId;
  readonly storeId: StoreId;
  readonly branchId?: BranchId | undefined;
  readonly categoryId?: AssetCategoryId | undefined;
  readonly type: PricingRuleType;
  readonly amount: MinorUnitAmount;
  readonly currency: string;
  readonly priority: number;
  readonly active: boolean;
}

export interface AvailabilityBlock
  extends VersionedEntity, EntityTimestamps, TenantScopedEntity {
  readonly id: AvailabilityBlockId;
  readonly assetId: AssetId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly startAt: IsoUtcDateTime;
  readonly endAt: IsoUtcDateTime;
  readonly reason: AvailabilityBlockReason;
  readonly referenceId: string;
}

export interface AssetSearchFilter {
  readonly storeId?: StoreId;
  readonly branchId?: BranchId;
  readonly text?: string;
  readonly type?: AssetCategory["type"];
  readonly minPriceAmount?: number;
  readonly maxPriceAmount?: number;
  readonly cashAccepted?: boolean;
  readonly differentReturnAllowed?: boolean;
  readonly equipmentRequired?: boolean;
}

export interface AssetCategoryRepository extends Repository<
  AssetCategory,
  AssetCategoryId
> {
  listByStoreId(storeId: StoreId): Promise<readonly AssetCategory[]>;
  save(category: AssetCategory, options?: SaveOptions): Promise<AssetCategory>;
}

export interface AssetRepository extends Repository<Asset, AssetId> {
  findByStoreCode(storeId: StoreId, code: string): Promise<Asset | null>;
  search(filter: AssetSearchFilter, page: PageRequest): Promise<Page<Asset>>;
  save(asset: Asset, options?: SaveOptions): Promise<Asset>;
}

export interface EquipmentItemRepository extends Repository<
  EquipmentItem,
  EquipmentItemId
> {
  listByStoreId(storeId: StoreId): Promise<readonly EquipmentItem[]>;
  save(item: EquipmentItem, options?: SaveOptions): Promise<EquipmentItem>;
}

export interface InventoryUnitRepository extends Repository<
  InventoryUnit,
  InventoryUnitId
> {
  listByBranchId(branchId: BranchId): Promise<readonly InventoryUnit[]>;
  save(unit: InventoryUnit, options?: SaveOptions): Promise<InventoryUnit>;
}

export interface RentalPointRepository extends Repository<
  RentalPoint,
  RentalPointId
> {
  listByBranchId(branchId: BranchId): Promise<readonly RentalPoint[]>;
  save(point: RentalPoint, options?: SaveOptions): Promise<RentalPoint>;
}

export interface PricingRuleRepository extends Repository<
  PricingRule,
  PricingRuleId
> {
  listActiveForAsset(asset: Asset): Promise<readonly PricingRule[]>;
  save(rule: PricingRule, options?: SaveOptions): Promise<PricingRule>;
}

export interface AvailabilityBlockRepository extends Repository<
  AvailabilityBlock,
  AvailabilityBlockId
> {
  findOverlapping(
    assetId: AssetId,
    startAt: IsoUtcDateTime,
    endAt: IsoUtcDateTime,
  ): Promise<AvailabilityBlock | null>;
  reserve(block: AvailabilityBlock): Promise<AvailabilityBlock>;
}
