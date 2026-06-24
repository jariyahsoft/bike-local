import { DomainError, asEntityVersion } from "../../shared/domain/index.js";
import type {
  IsoUtcDateTime,
  ReportExportId,
  SettlementId,
  UserId,
} from "../../shared/domain/index.js";
import type {
  ReportExport,
  ReportExportFormat,
  Settlement,
  SettlementStatus,
  StoreReportFilter,
} from "./report-repository.js";

export interface SettlementPolicy {
  readonly platformCommissionBps: number;
  readonly paymentFeeBps: number;
  readonly includeCashInTransferPayable: boolean;
}

export interface SettlementCalculationInput {
  readonly grossAmount: number;
  readonly onlineAmount: number;
  readonly cashAmount: number;
  readonly refundAmount: number;
  readonly penaltyAmount: number;
  readonly currency: string;
  readonly policy?: SettlementPolicy | undefined;
}

export const assertValidReportDateRange = (input: {
  readonly from: IsoUtcDateTime;
  readonly to: IsoUtcDateTime;
}): void => {
  if (Date.parse(input.from) >= Date.parse(input.to)) {
    throw new DomainError(
      "REPORT_DATE_RANGE_INVALID",
      "Report date range requires from before to.",
      { from: input.from, to: input.to },
    );
  }
};

export const calculateSettlementAmounts = (
  input: SettlementCalculationInput,
) => {
  if (input.policy === undefined) {
    throw new DomainError(
      "SETTLEMENT_POLICY_REQUIRED",
      "Settlement calculation requires accepted commission and payment fee policy inputs.",
      {},
    );
  }
  const platformFeeAmount = Math.round(
    (input.grossAmount * input.policy.platformCommissionBps) / 10000,
  );
  const paymentFeeAmount = Math.round(
    (input.onlineAmount * input.policy.paymentFeeBps) / 10000,
  );
  const transferBase = input.policy.includeCashInTransferPayable
    ? input.grossAmount
    : input.onlineAmount;
  const transferPayableAmount =
    transferBase -
    input.refundAmount +
    input.penaltyAmount -
    platformFeeAmount -
    paymentFeeAmount;

  return {
    platformFeeAmount,
    paymentFeeAmount,
    transferPayableAmount,
  };
};

export const createSettlementProfile = (input: {
  readonly settlementId: SettlementId;
  readonly filter: StoreReportFilter;
  readonly currency: string;
  readonly grossAmount: number;
  readonly onlineAmount: number;
  readonly cashAmount: number;
  readonly refundAmount: number;
  readonly penaltyAmount: number;
  readonly policy?: SettlementPolicy | undefined;
  readonly now: IsoUtcDateTime;
}): Settlement => {
  const amounts = calculateSettlementAmounts({
    grossAmount: input.grossAmount,
    onlineAmount: input.onlineAmount,
    cashAmount: input.cashAmount,
    refundAmount: input.refundAmount,
    penaltyAmount: input.penaltyAmount,
    currency: input.currency,
    policy: input.policy,
  });

  return {
    id: input.settlementId,
    tenantId: input.filter.tenantId,
    storeId: input.filter.storeId,
    branchId: input.filter.branchId,
    periodFrom: input.filter.from,
    periodTo: input.filter.to,
    currency: input.currency,
    grossAmount: input.grossAmount,
    onlineAmount: input.onlineAmount,
    cashAmount: input.cashAmount,
    refundAmount: input.refundAmount,
    penaltyAmount: input.penaltyAmount,
    platformFeeAmount: amounts.platformFeeAmount,
    paymentFeeAmount: amounts.paymentFeeAmount,
    transferPayableAmount: amounts.transferPayableAmount,
    status: "DRAFT",
    createdAt: input.now,
    updatedAt: input.now,
    version: asEntityVersion(1),
  };
};

const ALLOWED_SETTLEMENT_TRANSITIONS: Record<
  SettlementStatus,
  readonly SettlementStatus[]
> = {
  DRAFT: ["APPROVED"],
  APPROVED: ["PAYMENT_REQUESTED"],
  PAYMENT_REQUESTED: ["PAID"],
  PAID: [],
};

export const transitionSettlement = (
  settlement: Settlement,
  status: SettlementStatus,
  input: {
    readonly actorUserId: UserId;
    readonly now: IsoUtcDateTime;
  },
): Settlement => {
  if (!ALLOWED_SETTLEMENT_TRANSITIONS[settlement.status].includes(status)) {
    throw new DomainError(
      "SETTLEMENT_STATE_TRANSITION_INVALID",
      "Settlement state transition is not allowed.",
      { settlementId: settlement.id, from: settlement.status, to: status },
    );
  }

  return {
    ...settlement,
    status,
    approvedByUserId:
      status === "APPROVED" ? input.actorUserId : settlement.approvedByUserId,
    approvedAt: status === "APPROVED" ? input.now : settlement.approvedAt,
    paidByUserId:
      status === "PAID" ? input.actorUserId : settlement.paidByUserId,
    paidAt: status === "PAID" ? input.now : settlement.paidAt,
    updatedAt: input.now,
    version: asEntityVersion((settlement.version as number) + 1),
  };
};

export const createReportExportProfile = (input: {
  readonly reportExportId: ReportExportId;
  readonly requestedByUserId: UserId;
  readonly filter: StoreReportFilter;
  readonly type: ReportExport["type"];
  readonly format: ReportExportFormat;
  readonly content: string;
  readonly rowCount: number;
  readonly now: IsoUtcDateTime;
}): ReportExport => {
  const extension =
    input.format === "CSV"
      ? "csv"
      : input.format === "XLSX"
        ? "xlsx.csv"
        : undefined;
  if (extension === undefined) {
    throw new DomainError(
      "REPORT_EXPORT_FORMAT_UNSUPPORTED",
      "Report export format is unsupported.",
      { format: input.format },
    );
  }

  return {
    id: input.reportExportId,
    tenantId: input.filter.tenantId,
    requestedByUserId: input.requestedByUserId,
    type: input.type,
    format: input.format,
    storeId: input.filter.storeId,
    branchId: input.filter.branchId,
    from: input.filter.from,
    to: input.filter.to,
    fileName: `${input.type.toLowerCase()}_${input.filter.storeId}.${extension}`,
    mimeType:
      input.format === "CSV"
        ? "text/csv"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    content: input.content,
    rowCount: input.rowCount,
    createdAt: input.now,
    updatedAt: input.now,
    version: asEntityVersion(1),
  };
};
