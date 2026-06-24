import type {
  BranchId,
  EntityTimestamps,
  IsoUtcDateTime,
  Page,
  PageRequest,
  ReportExportId,
  SaveOptions,
  SettlementId,
  StoreId,
  TenantId,
  TenantScopedEntity,
  UserId,
  VersionedEntity,
} from "../../shared/domain/index.js";
import type { Repository } from "../../shared/domain/index.js";

export type ReportExportFormat = "CSV" | "XLSX";
export type ReportExportType =
  | "STORE_RENTAL"
  | "STORE_REVENUE"
  | "ASSET"
  | "STAFF"
  | "PLATFORM_OVERVIEW"
  | "SETTLEMENT";
export type SettlementStatus =
  | "DRAFT"
  | "APPROVED"
  | "PAYMENT_REQUESTED"
  | "PAID";

export interface ReportDateRange {
  readonly from: IsoUtcDateTime;
  readonly to: IsoUtcDateTime;
}

export interface StoreReportFilter extends ReportDateRange {
  readonly tenantId: TenantId;
  readonly storeId: StoreId;
  readonly branchId?: BranchId | undefined;
}

export interface PlatformReportFilter extends ReportDateRange {
  readonly tenantId?: TenantId | undefined;
}

export interface Settlement
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: SettlementId;
  readonly storeId: StoreId;
  readonly branchId?: BranchId | undefined;
  readonly periodFrom: IsoUtcDateTime;
  readonly periodTo: IsoUtcDateTime;
  readonly currency: string;
  readonly grossAmount: number;
  readonly onlineAmount: number;
  readonly cashAmount: number;
  readonly refundAmount: number;
  readonly penaltyAmount: number;
  readonly platformFeeAmount: number;
  readonly paymentFeeAmount: number;
  readonly transferPayableAmount: number;
  readonly status: SettlementStatus;
  readonly approvedByUserId?: UserId | undefined;
  readonly approvedAt?: IsoUtcDateTime | undefined;
  readonly paidByUserId?: UserId | undefined;
  readonly paidAt?: IsoUtcDateTime | undefined;
}

export interface ReportExport
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: ReportExportId;
  readonly requestedByUserId: UserId;
  readonly type: ReportExportType;
  readonly format: ReportExportFormat;
  readonly storeId?: StoreId | undefined;
  readonly branchId?: BranchId | undefined;
  readonly from: IsoUtcDateTime;
  readonly to: IsoUtcDateTime;
  readonly fileName: string;
  readonly mimeType: string;
  readonly content: string;
  readonly rowCount: number;
}

export interface SettlementSearchFilter {
  readonly tenantId: TenantId;
  readonly storeId?: StoreId | undefined;
  readonly status?: SettlementStatus | undefined;
}

export interface SettlementRepository extends Repository<
  Settlement,
  SettlementId
> {
  search(
    filter: SettlementSearchFilter,
    page: PageRequest,
  ): Promise<Page<Settlement>>;
  save(settlement: Settlement, options?: SaveOptions): Promise<Settlement>;
}

export interface ReportExportRepository extends Repository<
  ReportExport,
  ReportExportId
> {
  listByUserId(userId: UserId): Promise<readonly ReportExport[]>;
  save(
    reportExport: ReportExport,
    options?: SaveOptions,
  ): Promise<ReportExport>;
}
