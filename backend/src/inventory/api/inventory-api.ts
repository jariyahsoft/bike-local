import { buildApiErrorResponse } from "../../shared/api/api-error.js";
import {
  asDomainId,
  type AssetCategoryId,
  type AssetId,
  type AvailabilityBlockId,
  type BranchId,
  type CorrelationId,
  type EquipmentItemId,
  type InventoryUnitId,
  type IsoUtcDateTime,
  type PricingRuleId,
  type RentalPointId,
  type StoreId,
} from "../../shared/domain/index.js";
import { DomainError } from "../../shared/domain/index.js";
import {
  authorizeRequest,
  type SecurityPipelineDependencies,
} from "../../identity/application/security-pipeline.js";
import {
  SecurityError,
  mapSecurityErrorToApiResponse,
} from "../../identity/api/security-error.js";
import type { PermissionName } from "../../identity/domain/rbac.js";
import {
  buildAvailabilityBlockId,
  serializeAsset,
  serializeAssetCategory,
  serializeAvailabilityResult,
  serializeEquipmentItem,
  serializePricingQuote,
  serializeRentalPoint,
  type InventoryService,
} from "../application/inventory-service.js";
import type {
  AssetCategory,
  AssetStatus,
  EquipmentRentalMode,
  PricingRule,
} from "../domain/inventory-repository.js";

export interface InventoryApiDependencies {
  readonly security: SecurityPipelineDependencies;
  readonly inventoryService: InventoryService;
  readonly now: () => IsoUtcDateTime;
  readonly buildAssetCategoryId: () => string;
  readonly buildAssetId: () => string;
  readonly buildEquipmentItemId: () => string;
  readonly buildInventoryUnitId: () => string;
  readonly buildRentalPointId: () => string;
  readonly buildPricingRuleId: () => string;
  readonly buildAvailabilityBlockId: () => string;
}

interface InventoryApiRequestBase {
  readonly requestId: CorrelationId;
  readonly authorizationHeader?: string;
  readonly appCheckHeader?: string;
}

export interface CreateAssetCategoryApiRequest extends InventoryApiRequestBase {
  readonly body: {
    readonly store_id: StoreId;
    readonly name: string;
    readonly type: AssetCategory["type"];
    readonly description?: string;
    readonly default_base_price: number;
    readonly default_deposit_amount: number;
    readonly currency: string;
  };
}

export interface CreateAssetApiRequest extends InventoryApiRequestBase {
  readonly body: {
    readonly store_id: StoreId;
    readonly branch_id: BranchId;
    readonly category_id: AssetCategoryId;
    readonly code: string;
    readonly qr_token_reference?: string;
    readonly brand?: string;
    readonly model?: string;
    readonly color?: string;
    readonly size?: string;
    readonly description?: string;
    readonly base_price: number;
    readonly deposit_amount: number;
    readonly currency: string;
    readonly current_point_id?: RentalPointId;
    readonly images?: readonly string[];
    readonly cash_accepted?: boolean;
    readonly different_return_allowed?: boolean;
    readonly equipment_ids?: readonly EquipmentItemId[];
  };
}

export interface CreateEquipmentItemApiRequest extends InventoryApiRequestBase {
  readonly body: {
    readonly store_id: StoreId;
    readonly branch_id?: BranchId;
    readonly name: string;
    readonly rental_mode: EquipmentRentalMode;
    readonly price_amount?: number;
    readonly deposit_amount?: number;
    readonly currency?: string;
  };
}

export interface CreateInventoryUnitApiRequest extends InventoryApiRequestBase {
  readonly body: {
    readonly store_id: StoreId;
    readonly branch_id: BranchId;
    readonly asset_id?: AssetId;
    readonly equipment_item_id?: EquipmentItemId;
  };
}

export interface CreateRentalPointApiRequest extends InventoryApiRequestBase {
  readonly body: {
    readonly store_id: StoreId;
    readonly branch_id: BranchId;
    readonly name: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly geohash?: string;
  };
}

export interface CreatePricingRuleApiRequest extends InventoryApiRequestBase {
  readonly body: {
    readonly store_id: StoreId;
    readonly branch_id?: BranchId;
    readonly category_id?: AssetCategoryId;
    readonly type: PricingRule["type"];
    readonly amount: number;
    readonly currency: string;
    readonly priority?: number;
  };
}

export interface PricingQuoteApiRequest {
  readonly requestId: CorrelationId;
  readonly body: {
    readonly asset_ids: readonly AssetId[];
    readonly equipment_ids?: readonly EquipmentItemId[];
    readonly start_at: IsoUtcDateTime;
    readonly end_at: IsoUtcDateTime;
    readonly payment_method: "ONLINE" | "CASH";
  };
}

export interface AvailabilityApiRequest {
  readonly requestId: CorrelationId;
  readonly body: {
    readonly asset_ids: readonly AssetId[];
    readonly start_at: IsoUtcDateTime;
    readonly end_at: IsoUtcDateTime;
    readonly reserve?: boolean;
    readonly reference_id?: string;
  };
}

export interface SearchAssetsApiRequest {
  readonly requestId: CorrelationId;
  readonly query: {
    readonly q?: string;
    readonly store_id?: StoreId;
    readonly branch_id?: BranchId;
    readonly start_at?: IsoUtcDateTime;
    readonly end_at?: IsoUtcDateTime;
    readonly min_price_amount?: number;
    readonly max_price_amount?: number;
    readonly cash?: boolean;
    readonly different_return_point?: boolean;
    readonly equipment?: boolean;
    readonly unsupported?: Readonly<Record<string, unknown>>;
    readonly limit?: number;
  };
}

export interface SearchStoresApiRequest {
  readonly requestId: CorrelationId;
  readonly query: {
    readonly q?: string;
    readonly unsupported?: Readonly<Record<string, unknown>>;
    readonly limit?: number;
  };
}

const mapDomainError = (error: DomainError, requestId: string) => {
  const code =
    error.code === "NOT_FOUND"
      ? error.details.assetId !== undefined
        ? "ASSET_NOT_FOUND"
        : error.details.categoryId !== undefined
          ? "ASSET_CATEGORY_NOT_FOUND"
          : error.details.equipmentItemId !== undefined
            ? "EQUIPMENT_NOT_FOUND"
            : "INVENTORY_NOT_FOUND"
      : error.code === "VERSION_CONFLICT"
        ? "INVENTORY_VERSION_CONFLICT"
        : error.code;
  const status =
    error.code === "NOT_FOUND"
      ? 404
      : error.code === "VERSION_CONFLICT" ||
          error.code === "ASSET_CODE_ALREADY_EXISTS" ||
          error.code === "AVAILABILITY_CONFLICT"
        ? 409
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

const authorizeStoreMutation = async (
  request: InventoryApiRequestBase,
  dependencies: InventoryApiDependencies,
  permission: PermissionName,
  target: { readonly storeId: StoreId; readonly branchId?: BranchId },
) =>
  authorizeRequest({
    requestId: request.requestId,
    authorizationHeader: request.authorizationHeader,
    appCheckHeader: request.appCheckHeader,
    requirement: {
      appCheck: "required",
      permissions: [permission],
    },
    target: {
      storeId: target.storeId,
      ...(target.branchId === undefined ? {} : { branchId: target.branchId }),
      tenantId: asDomainId<"Tenant">(target.storeId),
    },
    dependencies: dependencies.security,
  });

export const createAssetCategoryEndpoint = async (
  request: CreateAssetCategoryApiRequest,
  dependencies: InventoryApiDependencies,
) => {
  try {
    await authorizeStoreMutation(request, dependencies, "asset.create", {
      storeId: request.body.store_id,
    });
    const category = await dependencies.inventoryService.createAssetCategory({
      categoryId: asDomainId<"AssetCategory">(
        dependencies.buildAssetCategoryId(),
      ) as AssetCategoryId,
      storeId: request.body.store_id,
      name: request.body.name,
      type: request.body.type,
      description: request.body.description,
      defaultBasePrice: request.body.default_base_price,
      defaultDepositAmount: request.body.default_deposit_amount,
      currency: request.body.currency,
      now: dependencies.now(),
    });

    return {
      status: 201,
      body: {
        data: serializeAssetCategory(category),
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

export const createAssetEndpoint = async (
  request: CreateAssetApiRequest,
  dependencies: InventoryApiDependencies,
) => {
  try {
    await authorizeStoreMutation(request, dependencies, "asset.create", {
      storeId: request.body.store_id,
      ...(request.body.branch_id === undefined
        ? {}
        : { branchId: request.body.branch_id }),
    });
    const asset = await dependencies.inventoryService.createAsset({
      assetId: asDomainId<"Asset">(dependencies.buildAssetId()) as AssetId,
      storeId: request.body.store_id,
      branchId: request.body.branch_id,
      categoryId: request.body.category_id,
      code: request.body.code,
      qrTokenReference: request.body.qr_token_reference,
      brand: request.body.brand,
      model: request.body.model,
      color: request.body.color,
      size: request.body.size,
      description: request.body.description,
      basePrice: request.body.base_price,
      depositAmount: request.body.deposit_amount,
      currency: request.body.currency,
      currentPointId: request.body.current_point_id,
      images: request.body.images,
      cashAccepted: request.body.cash_accepted,
      differentReturnAllowed: request.body.different_return_allowed,
      equipmentIds: request.body.equipment_ids,
      now: dependencies.now(),
    });

    return {
      status: 201,
      body: {
        data: serializeAsset(asset),
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

export const createEquipmentItemEndpoint = async (
  request: CreateEquipmentItemApiRequest,
  dependencies: InventoryApiDependencies,
) => {
  try {
    await authorizeStoreMutation(request, dependencies, "asset.create", {
      storeId: request.body.store_id,
      ...(request.body.branch_id === undefined
        ? {}
        : { branchId: request.body.branch_id }),
    });
    const item = await dependencies.inventoryService.createEquipmentItem({
      equipmentItemId: asDomainId<"EquipmentItem">(
        dependencies.buildEquipmentItemId(),
      ) as EquipmentItemId,
      storeId: request.body.store_id,
      branchId: request.body.branch_id,
      name: request.body.name,
      rentalMode: request.body.rental_mode,
      priceAmount: request.body.price_amount,
      depositAmount: request.body.deposit_amount,
      currency: request.body.currency,
      now: dependencies.now(),
    });

    return {
      status: 201,
      body: {
        data: serializeEquipmentItem(item),
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

export const createInventoryUnitEndpoint = async (
  request: CreateInventoryUnitApiRequest,
  dependencies: InventoryApiDependencies,
) => {
  try {
    await authorizeStoreMutation(request, dependencies, "asset.create", {
      storeId: request.body.store_id,
      branchId: request.body.branch_id,
    });
    const unit = await dependencies.inventoryService.createInventoryUnit({
      inventoryUnitId: asDomainId<"InventoryUnit">(
        dependencies.buildInventoryUnitId(),
      ) as InventoryUnitId,
      storeId: request.body.store_id,
      branchId: request.body.branch_id,
      assetId: request.body.asset_id,
      equipmentItemId: request.body.equipment_item_id,
      now: dependencies.now(),
    });

    return {
      status: 201,
      body: {
        data: unit,
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

export const createRentalPointEndpoint = async (
  request: CreateRentalPointApiRequest,
  dependencies: InventoryApiDependencies,
) => {
  try {
    await authorizeStoreMutation(request, dependencies, "asset.create", {
      storeId: request.body.store_id,
      branchId: request.body.branch_id,
    });
    const point = await dependencies.inventoryService.createRentalPoint({
      rentalPointId: asDomainId<"RentalPoint">(
        dependencies.buildRentalPointId(),
      ) as RentalPointId,
      storeId: request.body.store_id,
      branchId: request.body.branch_id,
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      geohash: request.body.geohash,
      now: dependencies.now(),
    });

    return {
      status: 201,
      body: {
        data: serializeRentalPoint(point),
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

export const createPricingRuleEndpoint = async (
  request: CreatePricingRuleApiRequest,
  dependencies: InventoryApiDependencies,
) => {
  try {
    await authorizeStoreMutation(request, dependencies, "asset.update", {
      storeId: request.body.store_id,
      ...(request.body.branch_id === undefined
        ? {}
        : { branchId: request.body.branch_id }),
    });
    const rule = await dependencies.inventoryService.createPricingRule({
      pricingRuleId: asDomainId<"PricingRule">(
        dependencies.buildPricingRuleId(),
      ) as PricingRuleId,
      storeId: request.body.store_id,
      branchId: request.body.branch_id,
      categoryId: request.body.category_id,
      type: request.body.type,
      amount: request.body.amount,
      currency: request.body.currency,
      priority: request.body.priority,
      now: dependencies.now(),
    });

    return {
      status: 201,
      body: {
        data: rule,
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

export const createPricingQuoteEndpoint = async (
  request: PricingQuoteApiRequest,
  dependencies: InventoryApiDependencies,
) => {
  try {
    const quote = await dependencies.inventoryService.createPricingQuote({
      assetIds: request.body.asset_ids,
      equipmentIds: request.body.equipment_ids,
      startAt: request.body.start_at,
      endAt: request.body.end_at,
      paymentMethod: request.body.payment_method,
    });

    return {
      status: 200,
      body: {
        data: serializePricingQuote(quote),
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

export const checkAvailabilityEndpoint = async (
  request: AvailabilityApiRequest,
  dependencies: InventoryApiDependencies,
) => {
  try {
    if (request.body.reserve === true) {
      await dependencies.inventoryService.reserveAvailability({
        assetIds: request.body.asset_ids,
        startAt: request.body.start_at,
        endAt: request.body.end_at,
        referenceId: request.body.reference_id ?? request.requestId,
        availabilityBlockId: () =>
          buildAvailabilityBlockId(dependencies.buildAvailabilityBlockId()),
        now: dependencies.now(),
      });

      return {
        status: 200,
        body: {
          data: serializeAvailabilityResult({
            available: true,
            conflicts: [],
          }),
          meta: { request_id: request.requestId },
        },
      };
    }

    const result = await dependencies.inventoryService.checkAvailability({
      assetIds: request.body.asset_ids,
      startAt: request.body.start_at,
      endAt: request.body.end_at,
    });

    return {
      status: 200,
      body: {
        data: serializeAvailabilityResult(result),
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

export const searchAssetsEndpoint = async (
  request: SearchAssetsApiRequest,
  dependencies: InventoryApiDependencies,
) => {
  try {
    const rawFilters = {
      ...(request.query.q === undefined ? {} : { text: request.query.q }),
      ...(request.query.start_at === undefined
        ? {}
        : { start_at: request.query.start_at }),
      ...(request.query.end_at === undefined
        ? {}
        : { end_at: request.query.end_at }),
      ...(request.query.min_price_amount === undefined
        ? {}
        : { min_price_amount: request.query.min_price_amount }),
      ...(request.query.max_price_amount === undefined
        ? {}
        : { max_price_amount: request.query.max_price_amount }),
      ...(request.query.cash === undefined ? {} : { cash: request.query.cash }),
      ...(request.query.different_return_point === undefined
        ? {}
        : { different_return_point: request.query.different_return_point }),
      ...(request.query.equipment === undefined
        ? {}
        : { equipment: request.query.equipment }),
      ...(request.query.unsupported ?? {}),
    };
    const results = await dependencies.inventoryService.searchAssets(
      {
        ...(request.query.store_id === undefined
          ? {}
          : { storeId: request.query.store_id }),
        ...(request.query.branch_id === undefined
          ? {}
          : { branchId: request.query.branch_id }),
        ...(request.query.q === undefined ? {} : { text: request.query.q }),
        ...(request.query.start_at === undefined
          ? {}
          : { startAt: request.query.start_at }),
        ...(request.query.end_at === undefined
          ? {}
          : { endAt: request.query.end_at }),
        ...(request.query.min_price_amount === undefined
          ? {}
          : { minPriceAmount: request.query.min_price_amount }),
        ...(request.query.max_price_amount === undefined
          ? {}
          : { maxPriceAmount: request.query.max_price_amount }),
        ...(request.query.cash === undefined
          ? {}
          : { cashAccepted: request.query.cash }),
        ...(request.query.different_return_point === undefined
          ? {}
          : { differentReturnAllowed: request.query.different_return_point }),
        ...(request.query.equipment === undefined
          ? {}
          : { equipmentRequired: request.query.equipment }),
        rawFilters,
      },
      { limit: request.query.limit ?? 20 },
    );

    return {
      status: 200,
      body: {
        data: results.items.map((asset) => serializeAsset(asset)),
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

export const searchStoresEndpoint = async (
  request: SearchStoresApiRequest,
  dependencies: InventoryApiDependencies,
) => {
  try {
    const results = await dependencies.inventoryService.searchStores(
      {
        ...(request.query.q === undefined ? {} : { text: request.query.q }),
        rawFilters: {
          ...(request.query.q === undefined ? {} : { text: request.query.q }),
          ...(request.query.unsupported ?? {}),
        },
      },
      { limit: request.query.limit ?? 20 },
    );

    return {
      status: 200,
      body: {
        data: results.items,
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

export const coerceAssetStatus = (value: string): AssetStatus =>
  value as AssetStatus;
export const coerceAvailabilityBlockId = (value: string): AvailabilityBlockId =>
  asDomainId<"AvailabilityBlock">(value) as AvailabilityBlockId;
