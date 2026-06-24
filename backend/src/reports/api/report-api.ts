import {
  SecurityError,
  mapSecurityErrorToApiResponse,
} from "../../identity/api/security-error.js";
import {
  authorizeRequest,
  type SecurityPipelineDependencies,
} from "../../identity/application/security-pipeline.js";
import { buildApiErrorResponse } from "../../shared/api/api-error.js";
import {
  DomainError,
  asDomainId,
  type BranchId,
  type CorrelationId,
  type IsoUtcDateTime,
  type ReportExportId,
  type SettlementId,
  type StoreId,
  type TenantId,
} from "../../shared/domain/index.js";
import {
  serializeAssetReport,
  serializePlatformOverviewReport,
  serializeReportExport,
  serializeSettlement,
  serializeStaffReport,
  serializeStoreRentalReport,
  serializeStoreRevenueReport,
  type ReportService,
} from "../application/report-service.js";
import type {
  ReportExportFormat,
  ReportExportType,
  StoreReportFilter,
} from "../domain/report-repository.js";
import type { AuthorizationTarget } from "../../identity/domain/rbac.js";

export interface ReportApiDependencies {
  readonly security: SecurityPipelineDependencies;
  readonly reportService: ReportService;
  readonly now: () => IsoUtcDateTime;
  readonly buildSettlementId: () => string;
  readonly buildReportExportId: () => string;
}

interface ReportApiRequestBase {
  readonly requestId: CorrelationId;
  readonly authorizationHeader?: string | undefined;
  readonly appCheckHeader?: string | undefined;
}

interface StoreReportApiRequest extends ReportApiRequestBase {
  readonly query: {
    readonly tenant_id?: string | undefined;
    readonly store_id: string;
    readonly branch_id?: string | undefined;
    readonly from: IsoUtcDateTime;
    readonly to: IsoUtcDateTime;
  };
}

const mapDomainError = (error: DomainError, requestId: string) => ({
  status:
    error.code === "NOT_FOUND"
      ? 404
      : error.code === "PERMISSION_DENIED"
        ? 403
        : error.code === "VERSION_CONFLICT" ||
            error.code === "SETTLEMENT_STATE_TRANSITION_INVALID"
          ? 409
          : 422,
  body: buildApiErrorResponse(
    error.code,
    error.message,
    { ...error.details },
    requestId,
  ),
});

const buildStoreFilter = (
  request: StoreReportApiRequest,
  tenantId: TenantId,
): StoreReportFilter => ({
  tenantId: (request.query.tenant_id ?? tenantId) as TenantId,
  storeId: request.query.store_id as StoreId,
  branchId: request.query.branch_id as BranchId | undefined,
  from: request.query.from,
  to: request.query.to,
});

const buildStoreAuthorizationTarget = (
  request: StoreReportApiRequest,
): AuthorizationTarget => ({
  ...(request.query.tenant_id !== undefined
    ? { tenantId: request.query.tenant_id as TenantId }
    : {}),
  storeId: request.query.store_id as StoreId,
  ...(request.query.branch_id !== undefined
    ? { branchId: request.query.branch_id as BranchId }
    : {}),
});

const authorizeFinancialReport = async (
  request: StoreReportApiRequest,
  dependencies: ReportApiDependencies,
) =>
  authorizeRequest({
    requestId: request.requestId,
    authorizationHeader: request.authorizationHeader,
    appCheckHeader: request.appCheckHeader,
    requirement: {
      appCheck: "required",
      permissions: ["report.financial.read"],
    },
    target: buildStoreAuthorizationTarget(request),
    dependencies: dependencies.security,
  });

const success = <T>(requestId: CorrelationId, data: T) => ({
  status: 200,
  body: { data, meta: { request_id: requestId } },
});

export const getStoreRentalReportEndpoint = async (
  request: StoreReportApiRequest,
  dependencies: ReportApiDependencies,
) => {
  try {
    const context = await authorizeFinancialReport(request, dependencies);
    const report = await dependencies.reportService.getStoreRentalReport({
      filter: buildStoreFilter(
        request,
        context.user.tenantId ?? ("" as TenantId),
      ),
      now: dependencies.now(),
    });
    return success(request.requestId, serializeStoreRentalReport(report));
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

export const getStoreRevenueReportEndpoint = async (
  request: StoreReportApiRequest,
  dependencies: ReportApiDependencies,
) => {
  try {
    const context = await authorizeFinancialReport(request, dependencies);
    const report = await dependencies.reportService.getStoreRevenueReport({
      filter: buildStoreFilter(
        request,
        context.user.tenantId ?? ("" as TenantId),
      ),
    });
    return success(request.requestId, serializeStoreRevenueReport(report));
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

export const getAssetReportEndpoint = async (
  request: StoreReportApiRequest,
  dependencies: ReportApiDependencies,
) => {
  try {
    const context = await authorizeFinancialReport(request, dependencies);
    const report = await dependencies.reportService.getAssetReport({
      filter: buildStoreFilter(
        request,
        context.user.tenantId ?? ("" as TenantId),
      ),
    });
    return success(request.requestId, serializeAssetReport(report));
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

export const getStaffReportEndpoint = async (
  request: StoreReportApiRequest,
  dependencies: ReportApiDependencies,
) => {
  try {
    const context = await authorizeFinancialReport(request, dependencies);
    const report = await dependencies.reportService.getStaffReport({
      filter: buildStoreFilter(
        request,
        context.user.tenantId ?? ("" as TenantId),
      ),
    });
    return success(request.requestId, serializeStaffReport(report));
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

export const getPlatformOverviewReportEndpoint = async (
  request: ReportApiRequestBase & {
    readonly query: {
      readonly tenant_id?: string | undefined;
      readonly from: IsoUtcDateTime;
      readonly to: IsoUtcDateTime;
    };
  },
  dependencies: ReportApiDependencies,
) => {
  try {
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: {
        appCheck: "required",
        permissions: ["report.financial.read"],
      },
      target:
        request.query.tenant_id !== undefined
          ? { tenantId: request.query.tenant_id as TenantId }
          : {},
      dependencies: dependencies.security,
    });
    const report = await dependencies.reportService.getPlatformOverviewReport({
      filter: {
        tenantId: (request.query.tenant_id ?? context.user.tenantId) as
          | TenantId
          | undefined,
        from: request.query.from,
        to: request.query.to,
      },
    });
    return success(request.requestId, serializePlatformOverviewReport(report));
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

export const createSettlementEndpoint = async (
  request: StoreReportApiRequest,
  dependencies: ReportApiDependencies,
) => {
  try {
    const context = await authorizeFinancialReport(request, dependencies);
    const settlement = await dependencies.reportService.createSettlement({
      settlementId: asDomainId<"Settlement">(
        dependencies.buildSettlementId(),
      ) as SettlementId,
      filter: buildStoreFilter(
        request,
        context.user.tenantId ?? ("" as TenantId),
      ),
      now: dependencies.now(),
    });
    return {
      status: 201,
      body: {
        data: serializeSettlement(settlement),
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

export const transitionSettlementEndpoint = async (
  request: ReportApiRequestBase & {
    readonly settlementId: SettlementId;
    readonly status: "APPROVED" | "PAYMENT_REQUESTED" | "PAID";
    readonly target: {
      readonly tenant_id?: string | undefined;
      readonly store_id?: string | undefined;
    };
  },
  dependencies: ReportApiDependencies,
) => {
  try {
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: {
        appCheck: "required",
        permissions: ["report.financial.read"],
      },
      target: {
        ...(request.target.tenant_id !== undefined
          ? { tenantId: request.target.tenant_id as TenantId }
          : {}),
        ...(request.target.store_id !== undefined
          ? { storeId: request.target.store_id as StoreId }
          : {}),
      },
      dependencies: dependencies.security,
    });
    const settlement = await dependencies.reportService.transitionSettlement({
      settlementId: request.settlementId,
      actorUserId: context.user.userId,
      status: request.status,
      now: dependencies.now(),
    });
    return success(request.requestId, serializeSettlement(settlement));
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

export const createReportExportEndpoint = async (
  request: StoreReportApiRequest & {
    readonly body: {
      readonly type: ReportExportType;
      readonly format: ReportExportFormat;
    };
  },
  dependencies: ReportApiDependencies,
) => {
  try {
    const context = await authorizeFinancialReport(request, dependencies);
    const reportExport = await dependencies.reportService.createExport({
      reportExportId: asDomainId<"ReportExport">(
        dependencies.buildReportExportId(),
      ) as ReportExportId,
      requestedByUserId: context.user.userId,
      filter: buildStoreFilter(
        request,
        context.user.tenantId ?? ("" as TenantId),
      ),
      type: request.body.type,
      format: request.body.format,
      now: dependencies.now(),
    });
    return {
      status: 201,
      body: {
        data: serializeReportExport(reportExport),
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
