import {
  DomainError,
  asMinorUnitAmount,
  type IsoUtcDateTime,
  type MinorUnitAmount,
  type UserId,
} from "../../shared/domain/index.js";
import type { Branch, Store } from "../../stores/domain/store-repository.js";
import { isBranchAvailableForBooking } from "../../stores/domain/store-policies.js";
import type {
  Asset,
  AssetCategory,
  AssetStatus,
  AssetStatusTransition,
  EquipmentItem,
  InventoryUnit,
  PricingRule,
  RentalPoint,
} from "./inventory-repository.js";

const allowedAssetTransitions: Readonly<
  Record<AssetStatus, readonly AssetStatus[]>
> = {
  AVAILABLE: ["RESERVED", "PREPARING", "MAINTENANCE", "INACTIVE", "LOST"],
  RESERVED: ["AVAILABLE", "PREPARING", "AWAITING_HANDOVER"],
  PREPARING: ["AWAITING_HANDOVER", "AVAILABLE", "MAINTENANCE"],
  AWAITING_HANDOVER: ["RENTED", "AVAILABLE"],
  RENTED: ["RETURN_PENDING", "MAINTENANCE", "LOST"],
  RETURN_PENDING: ["INSPECTION_PENDING", "RENTED"],
  INSPECTION_PENDING: ["AVAILABLE", "MAINTENANCE", "LOST"],
  MAINTENANCE: ["AVAILABLE", "INACTIVE", "LOST"],
  INACTIVE: ["AVAILABLE", "MAINTENANCE"],
  LOST: [],
};

const allowedSearchFilters = new Set([
  "text",
  "type",
  "min_price_amount",
  "max_price_amount",
  "distance_km",
  "rating_min",
  "start_at",
  "end_at",
  "available",
  "cash",
  "different_return_point",
  "e_bike",
  "equipment",
]);

const ensureNonEmpty = (value: string | undefined, field: string): string => {
  if (value === undefined || value.trim() === "") {
    throw new DomainError("VALIDATION_INVALID", `${field} is required`, {
      field,
    });
  }

  return value.trim();
};

const assertIntegerMinorUnit = (
  value: number,
  field: string,
): MinorUnitAmount => {
  try {
    return asMinorUnitAmount(value);
  } catch {
    throw new DomainError(
      "VALIDATION_INVALID",
      `${field} must be integer minor units`,
      {
        field,
      },
    );
  }
};

export const assertSafeQrTokenReference = (
  qrTokenReference: string | undefined,
): void => {
  if (qrTokenReference === undefined) {
    return;
  }

  if (
    qrTokenReference.length > 80 ||
    /bearer|token=|secret|password|eyJ/i.test(qrTokenReference)
  ) {
    throw new DomainError(
      "ASSET_QR_TOKEN_REFERENCE_INVALID",
      "Asset QR token reference must not contain raw long-lived secrets.",
      {
        field: "qr_token_reference",
      },
    );
  }
};

export const createAssetCategoryProfile = (input: {
  readonly id: AssetCategory["id"];
  readonly tenantId: AssetCategory["tenantId"];
  readonly storeId: AssetCategory["storeId"];
  readonly name: string;
  readonly type: AssetCategory["type"];
  readonly description?: string | undefined;
  readonly defaultBasePrice: number;
  readonly defaultDepositAmount: number;
  readonly currency: string;
  readonly now: IsoUtcDateTime;
}): AssetCategory => ({
  id: input.id,
  tenantId: input.tenantId,
  storeId: input.storeId,
  name: ensureNonEmpty(input.name, "name"),
  type: input.type,
  description: input.description,
  defaultBasePrice: assertIntegerMinorUnit(
    input.defaultBasePrice,
    "default_base_price",
  ),
  defaultDepositAmount: assertIntegerMinorUnit(
    input.defaultDepositAmount,
    "default_deposit_amount",
  ),
  currency: ensureNonEmpty(input.currency, "currency"),
  active: true,
  createdAt: input.now,
  updatedAt: input.now,
  version: 1 as never,
});

export const createAssetProfile = (input: {
  readonly id: Asset["id"];
  readonly tenantId: Asset["tenantId"];
  readonly storeId: Asset["storeId"];
  readonly branchId: Asset["branchId"];
  readonly categoryId: Asset["categoryId"];
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
  readonly currentPointId?: Asset["currentPointId"];
  readonly images?: readonly string[] | undefined;
  readonly cashAccepted?: boolean | undefined;
  readonly differentReturnAllowed?: boolean | undefined;
  readonly equipmentIds?: readonly Asset["equipmentIds"][number][] | undefined;
  readonly now: IsoUtcDateTime;
}): Asset => {
  assertSafeQrTokenReference(input.qrTokenReference);

  return {
    id: input.id,
    tenantId: input.tenantId,
    storeId: input.storeId,
    branchId: input.branchId,
    categoryId: input.categoryId,
    code: ensureNonEmpty(input.code, "code"),
    qrTokenReference: input.qrTokenReference,
    brand: input.brand,
    model: input.model,
    color: input.color,
    size: input.size,
    description: input.description,
    status: "AVAILABLE",
    basePrice: assertIntegerMinorUnit(input.basePrice, "base_price"),
    depositAmount: assertIntegerMinorUnit(
      input.depositAmount,
      "deposit_amount",
    ),
    currency: ensureNonEmpty(input.currency, "currency"),
    currentPointId: input.currentPointId,
    images: input.images ?? [],
    cashAccepted: input.cashAccepted ?? true,
    differentReturnAllowed: input.differentReturnAllowed ?? false,
    equipmentIds: input.equipmentIds ?? [],
    statusHistory: [],
    createdAt: input.now,
    updatedAt: input.now,
    version: 1 as never,
  };
};

export const applyAssetStatusTransition = (
  asset: Asset,
  toStatus: AssetStatus,
  input: {
    readonly changedByUserId?: UserId | undefined;
    readonly reason?: string | undefined;
    readonly now: IsoUtcDateTime;
  },
): Asset => {
  if (!allowedAssetTransitions[asset.status].includes(toStatus)) {
    throw new DomainError(
      "ASSET_STATUS_TRANSITION_INVALID",
      "Asset status transition is not allowed.",
      {
        fromStatus: asset.status,
        toStatus,
      },
    );
  }

  const transition: AssetStatusTransition = {
    fromStatus: asset.status,
    toStatus,
    changedAt: input.now,
    changedByUserId: input.changedByUserId,
    reason: input.reason,
  };

  return {
    ...asset,
    status: toStatus,
    statusHistory: [...asset.statusHistory, transition],
    updatedAt: input.now,
    version: ((asset.version as number) + 1) as Asset["version"],
  };
};

export const createEquipmentItemProfile = (input: {
  readonly id: EquipmentItem["id"];
  readonly tenantId: EquipmentItem["tenantId"];
  readonly storeId: EquipmentItem["storeId"];
  readonly branchId?: EquipmentItem["branchId"];
  readonly name: string;
  readonly rentalMode: EquipmentItem["rentalMode"];
  readonly priceAmount?: number | undefined;
  readonly depositAmount?: number | undefined;
  readonly currency?: string | undefined;
  readonly now: IsoUtcDateTime;
}): EquipmentItem => ({
  id: input.id,
  tenantId: input.tenantId,
  storeId: input.storeId,
  branchId: input.branchId,
  name: ensureNonEmpty(input.name, "name"),
  rentalMode: input.rentalMode,
  status: "AVAILABLE",
  priceAmount:
    input.priceAmount === undefined
      ? undefined
      : assertIntegerMinorUnit(input.priceAmount, "price_amount"),
  depositAmount:
    input.depositAmount === undefined
      ? undefined
      : assertIntegerMinorUnit(input.depositAmount, "deposit_amount"),
  currency: input.currency,
  createdAt: input.now,
  updatedAt: input.now,
  version: 1 as never,
});

export const createInventoryUnitProfile = (input: {
  readonly id: InventoryUnit["id"];
  readonly tenantId: InventoryUnit["tenantId"];
  readonly storeId: InventoryUnit["storeId"];
  readonly branchId: InventoryUnit["branchId"];
  readonly assetId?: InventoryUnit["assetId"];
  readonly equipmentItemId?: InventoryUnit["equipmentItemId"];
  readonly now: IsoUtcDateTime;
}): InventoryUnit => ({
  id: input.id,
  tenantId: input.tenantId,
  storeId: input.storeId,
  branchId: input.branchId,
  assetId: input.assetId,
  equipmentItemId: input.equipmentItemId,
  status: "AVAILABLE",
  createdAt: input.now,
  updatedAt: input.now,
  version: 1 as never,
});

export const createRentalPointProfile = (input: {
  readonly id: RentalPoint["id"];
  readonly store: Store;
  readonly branch: Branch;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly geohash?: string | undefined;
  readonly now: IsoUtcDateTime;
}): RentalPoint => {
  if (!isBranchAvailableForBooking(input.store, input.branch)) {
    throw new DomainError(
      "INVENTORY_RENTAL_POINT_UNAVAILABLE",
      "Rental points can be created only for approved active stores and active branches.",
      {
        storeId: input.store.id,
        branchId: input.branch.id,
        branchStatus: input.branch.status,
      },
    );
  }

  return {
    id: input.id,
    tenantId: input.store.tenantId,
    storeId: input.store.id,
    branchId: input.branch.id,
    name: ensureNonEmpty(input.name, "name"),
    latitude: input.latitude,
    longitude: input.longitude,
    geohash: input.geohash,
    status: "ACTIVE",
    createdAt: input.now,
    updatedAt: input.now,
    version: 1 as never,
  };
};

export const createPricingRuleProfile = (input: {
  readonly id: PricingRule["id"];
  readonly tenantId: PricingRule["tenantId"];
  readonly storeId: PricingRule["storeId"];
  readonly branchId?: PricingRule["branchId"];
  readonly categoryId?: PricingRule["categoryId"];
  readonly type: PricingRule["type"];
  readonly amount: number;
  readonly currency: string;
  readonly priority?: number | undefined;
  readonly now: IsoUtcDateTime;
}): PricingRule => ({
  id: input.id,
  tenantId: input.tenantId,
  storeId: input.storeId,
  branchId: input.branchId,
  categoryId: input.categoryId,
  type: input.type,
  amount: assertIntegerMinorUnit(input.amount, "amount"),
  currency: ensureNonEmpty(input.currency, "currency"),
  priority: input.priority ?? 100,
  active: true,
  createdAt: input.now,
  updatedAt: input.now,
  version: 1 as never,
});

export const assertValidTimeRange = (
  startAt: IsoUtcDateTime,
  endAt: IsoUtcDateTime,
): void => {
  if (startAt >= endAt) {
    throw new DomainError(
      "PRICING_QUOTE_INVALID_TIME_RANGE",
      "Quote and availability checks require end_at after start_at.",
      {
        startAt,
        endAt,
      },
    );
  }
};

export const calculateDurationHours = (
  startAt: IsoUtcDateTime,
  endAt: IsoUtcDateTime,
): number => {
  assertValidTimeRange(startAt, endAt);
  const start = Date.parse(startAt);
  const end = Date.parse(endAt);

  return Math.max(1, Math.ceil((end - start) / 3_600_000));
};

export const calculatePricingTotals = (input: {
  readonly assets: readonly Asset[];
  readonly equipment: readonly EquipmentItem[];
  readonly rules: readonly PricingRule[];
  readonly startAt: IsoUtcDateTime;
  readonly endAt: IsoUtcDateTime;
  readonly paymentMethod: "ONLINE" | "CASH";
}) => {
  const hours = calculateDurationHours(input.startAt, input.endAt);
  const currency =
    input.assets[0]?.currency ?? input.equipment[0]?.currency ?? "THB";
  const assetSubtotal = input.assets.reduce(
    (sum, asset) => sum + (asset.basePrice as number) * hours,
    0,
  );
  const equipmentSubtotal = input.equipment.reduce((sum, item) => {
    if (item.rentalMode === "PACKAGE_INCLUDED") {
      return sum;
    }

    return sum + ((item.priceAmount ?? 0) as number) * hours;
  }, 0);
  const fixedFees = input.rules
    .filter((rule) => rule.type === "FIXED_FEE")
    .reduce((sum, rule) => sum + (rule.amount as number), 0);
  const cashFees =
    input.paymentMethod === "CASH"
      ? input.rules
          .filter((rule) => rule.type === "CASH_SURCHARGE")
          .reduce((sum, rule) => sum + (rule.amount as number), 0)
      : 0;
  const discountPercent = input.rules
    .filter((rule) => rule.type === "PERCENT_DISCOUNT")
    .reduce((sum, rule) => sum + (rule.amount as number), 0);
  const subtotalAmount = assetSubtotal + equipmentSubtotal;
  const feeAmount = fixedFees + cashFees;
  const discountAmount = Math.trunc(
    (subtotalAmount * discountPercent) / 10_000,
  );
  const depositAmount =
    input.assets.reduce(
      (sum, asset) => sum + (asset.depositAmount as number),
      0,
    ) +
    input.equipment.reduce((sum, item) => {
      if (
        item.rentalMode !== "DEPOSIT_REQUIRED" &&
        item.rentalMode !== "SEPARATE"
      ) {
        return sum;
      }

      return sum + ((item.depositAmount ?? 0) as number);
    }, 0);
  const totalAmount =
    subtotalAmount + feeAmount + depositAmount - discountAmount;

  return {
    hours,
    currency,
    subtotalAmount: asMinorUnitAmount(subtotalAmount),
    feeAmount: asMinorUnitAmount(feeAmount),
    depositAmount: asMinorUnitAmount(depositAmount),
    discountAmount: asMinorUnitAmount(discountAmount),
    totalAmount: asMinorUnitAmount(totalAmount),
  };
};

export const assertSupportedSearchFilters = (
  filters: Readonly<Record<string, unknown>>,
): void => {
  const unsupported = Object.keys(filters).filter(
    (key) => !allowedSearchFilters.has(key),
  );
  if (unsupported.length > 0) {
    throw new DomainError(
      "SEARCH_FILTER_UNSUPPORTED",
      "Search filter is unsupported or requires an index that is not available.",
      {
        unsupported,
      },
    );
  }
};

export const timeRangesOverlap = (
  leftStart: IsoUtcDateTime,
  leftEnd: IsoUtcDateTime,
  rightStart: IsoUtcDateTime,
  rightEnd: IsoUtcDateTime,
): boolean => leftStart < rightEnd && leftEnd > rightStart;
