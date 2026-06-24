import type { AuditLogWriter } from "../../identity/application/security-pipeline.js";
import type { UserRepository } from "../../identity/domain/identity-repository.js";
import type { AssetRepository } from "../../inventory/domain/inventory-repository.js";
import type { BookingRepository } from "../../booking/domain/booking-repository.js";
import type {
  DepositRepository,
  PaymentRepository,
} from "../../payment/domain/payment-repository.js";
import { DomainError, type IsoUtcDateTime } from "../../shared/domain/index.js";
import type {
  BranchId,
  ReportExportId,
  SettlementId,
  StoreId,
  TenantId,
  UserId,
} from "../../shared/domain/index.js";
import type {
  BranchRepository,
  StoreMemberRepository,
  StoreRepository,
} from "../../stores/domain/store-repository.js";
import {
  assertValidReportDateRange,
  createReportExportProfile,
  createSettlementProfile,
  transitionSettlement,
  type SettlementPolicy,
} from "../domain/report-policies.js";
import type {
  PlatformReportFilter,
  ReportExport,
  ReportExportFormat,
  ReportExportType,
  Settlement,
  SettlementRepository,
  StoreReportFilter,
  ReportExportRepository,
} from "../domain/report-repository.js";

const PAGE_ALL = { limit: 1000 };

export interface ReportServiceDependencies {
  readonly userRepository: UserRepository;
  readonly storeRepository: StoreRepository;
  readonly branchRepository: BranchRepository;
  readonly storeMemberRepository: StoreMemberRepository;
  readonly assetRepository: AssetRepository;
  readonly bookingRepository: BookingRepository;
  readonly paymentRepository: PaymentRepository;
  readonly depositRepository: DepositRepository;
  readonly settlementRepository: SettlementRepository;
  readonly reportExportRepository: ReportExportRepository;
  readonly auditLogWriter: AuditLogWriter;
  readonly settlementPolicy?: SettlementPolicy | undefined;
}

export interface StoreRentalReport {
  readonly storeId: StoreId;
  readonly branchId?: BranchId | undefined;
  readonly from: IsoUtcDateTime;
  readonly to: IsoUtcDateTime;
  readonly bookingsCount: number;
  readonly completedCount: number;
  readonly cancelledCount: number;
  readonly noShowCount: number;
  readonly overdueCount: number;
  readonly averageDurationMinutes: number;
}

export interface StoreRevenueReport {
  readonly storeId: StoreId;
  readonly branchId?: BranchId | undefined;
  readonly from: IsoUtcDateTime;
  readonly to: IsoUtcDateTime;
  readonly grossRevenueAmount: number;
  readonly netRevenueAmount: number;
  readonly cashAmount: number;
  readonly onlineAmount: number;
  readonly depositAmount: number;
  readonly refundAmount: number;
  readonly penaltyAmount: number;
  readonly platformFeeAmount: number;
  readonly paymentFeeAmount: number;
  readonly currency: string;
}

export interface AssetReportItem {
  readonly assetId: string;
  readonly code: string;
  readonly branchId: BranchId;
  readonly status: string;
  readonly bookingsCount: number;
  readonly completedCount: number;
  readonly revenueAmount: number;
}

export interface AssetReport {
  readonly storeId: StoreId;
  readonly branchId?: BranchId | undefined;
  readonly from: IsoUtcDateTime;
  readonly to: IsoUtcDateTime;
  readonly currency: string;
  readonly items: readonly AssetReportItem[];
}

export interface StaffReportItem {
  readonly userId: UserId;
  readonly role: string;
  readonly branchIds: readonly BranchId[];
  readonly bookingsTouchedCount: number;
  readonly cashConfirmedCount: number;
}

export interface StaffReport {
  readonly storeId: StoreId;
  readonly branchId?: BranchId | undefined;
  readonly from: IsoUtcDateTime;
  readonly to: IsoUtcDateTime;
  readonly items: readonly StaffReportItem[];
}

export interface PlatformOverviewReport {
  readonly from: IsoUtcDateTime;
  readonly to: IsoUtcDateTime;
  readonly usersCount: number;
  readonly storesCount: number;
  readonly branchesCount: number;
  readonly assetsCount: number;
  readonly bookingsCount: number;
  readonly completedBookingsCount: number;
  readonly activeBookingsCount: number;
  readonly gmvAmount: number;
  readonly platformRevenueAmount: number;
  readonly currency: string;
}

const inRange = (
  value: IsoUtcDateTime | undefined,
  filter: { readonly from: IsoUtcDateTime; readonly to: IsoUtcDateTime },
) => value !== undefined && value >= filter.from && value < filter.to;

const durationMinutes = (from: IsoUtcDateTime, to: IsoUtcDateTime): number =>
  Math.max(0, Math.round((Date.parse(to) - Date.parse(from)) / 60000));

const csvEscape = (value: unknown): string => {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const toCsv = (
  headers: readonly string[],
  rows: readonly (readonly unknown[])[],
): string =>
  [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");

export class ReportService {
  constructor(private readonly dependencies: ReportServiceDependencies) {}

  async getStoreRentalReport(input: {
    readonly filter: StoreReportFilter;
    readonly now: IsoUtcDateTime;
  }): Promise<StoreRentalReport> {
    assertValidReportDateRange(input.filter);
    await this.assertStoreExists(input.filter.storeId);
    await this.assertBranchScope(input.filter.storeId, input.filter.branchId);
    const bookings = await this.listStoreBookings(input.filter);
    const completed = bookings.filter(
      (booking) => booking.status === "COMPLETED",
    );
    const activeOverdueStatuses = new Set([
      "CONFIRMED",
      "PREPARING",
      "AWAITING_PICKUP",
      "IN_PROGRESS",
      "RETURN_PENDING",
    ]);
    const totalDuration = completed.reduce(
      (sum, booking) => sum + durationMinutes(booking.startAt, booking.endAt),
      0,
    );

    return {
      storeId: input.filter.storeId,
      branchId: input.filter.branchId,
      from: input.filter.from,
      to: input.filter.to,
      bookingsCount: bookings.length,
      completedCount: completed.length,
      cancelledCount: bookings.filter(
        (booking) => booking.status === "CANCELLED",
      ).length,
      noShowCount: bookings.filter((booking) => booking.status === "NO_SHOW")
        .length,
      overdueCount: bookings.filter(
        (booking) =>
          activeOverdueStatuses.has(booking.status) &&
          booking.endAt < input.now,
      ).length,
      averageDurationMinutes:
        completed.length === 0
          ? 0
          : Math.round(totalDuration / completed.length),
    };
  }

  async getStoreRevenueReport(input: {
    readonly filter: StoreReportFilter;
  }): Promise<StoreRevenueReport> {
    assertValidReportDateRange(input.filter);
    await this.assertStoreExists(input.filter.storeId);
    await this.assertBranchScope(input.filter.storeId, input.filter.branchId);
    const payments = await this.listStorePayments(input.filter);
    const deposits = await this.listStoreDeposits(input.filter);
    const currency =
      payments[0]?.amount.currency ?? deposits[0]?.amount.currency ?? "THB";
    const paidPayments = payments.filter((payment) =>
      ["PAID", "PARTIALLY_REFUNDED", "REFUNDED"].includes(payment.status),
    );
    const grossRevenueAmount = paidPayments.reduce(
      (sum, payment) => sum + (payment.amount.amount as number),
      0,
    );
    const cashAmount = paidPayments
      .filter((payment) => payment.method === "CASH")
      .reduce((sum, payment) => sum + (payment.amount.amount as number), 0);
    const onlineAmount = paidPayments
      .filter((payment) => payment.method === "GATEWAY")
      .reduce((sum, payment) => sum + (payment.amount.amount as number), 0);
    const refundAmount = payments
      .filter((payment) =>
        ["REFUNDED", "PARTIALLY_REFUNDED"].includes(payment.status),
      )
      .reduce((sum, payment) => sum + (payment.amount.amount as number), 0);
    const depositAmount = deposits.reduce(
      (sum, deposit) => sum + (deposit.amount.amount as number),
      0,
    );
    const penaltyAmount = deposits.reduce(
      (sum, deposit) => sum + (deposit.deductedAmount.amount as number),
      0,
    );
    const policy = this.dependencies.settlementPolicy;
    const platformFeeAmount =
      policy === undefined
        ? 0
        : Math.round(
            (grossRevenueAmount * policy.platformCommissionBps) / 10000,
          );
    const paymentFeeAmount =
      policy === undefined
        ? 0
        : Math.round((onlineAmount * policy.paymentFeeBps) / 10000);

    return {
      storeId: input.filter.storeId,
      branchId: input.filter.branchId,
      from: input.filter.from,
      to: input.filter.to,
      grossRevenueAmount,
      netRevenueAmount:
        grossRevenueAmount -
        refundAmount +
        penaltyAmount -
        platformFeeAmount -
        paymentFeeAmount,
      cashAmount,
      onlineAmount,
      depositAmount,
      refundAmount,
      penaltyAmount,
      platformFeeAmount,
      paymentFeeAmount,
      currency,
    };
  }

  async getAssetReport(input: {
    readonly filter: StoreReportFilter;
  }): Promise<AssetReport> {
    assertValidReportDateRange(input.filter);
    await this.assertStoreExists(input.filter.storeId);
    await this.assertBranchScope(input.filter.storeId, input.filter.branchId);
    const [assets, bookings, revenue] = await Promise.all([
      this.dependencies.assetRepository.search(
        {
          storeId: input.filter.storeId,
          ...(input.filter.branchId !== undefined
            ? { branchId: input.filter.branchId }
            : {}),
        },
        PAGE_ALL,
      ),
      this.listStoreBookings(input.filter),
      this.getStoreRevenueReport({ filter: input.filter }),
    ]);
    const payments = await this.listStorePayments(input.filter);
    const rows = assets.items.map((asset) => {
      const assetBookings = bookings.filter((booking) =>
        booking.assetIds.includes(asset.id),
      );
      const bookingIds = new Set(assetBookings.map((booking) => booking.id));
      return {
        assetId: asset.id,
        code: asset.code,
        branchId: asset.branchId,
        status: asset.status,
        bookingsCount: assetBookings.length,
        completedCount: assetBookings.filter(
          (booking) => booking.status === "COMPLETED",
        ).length,
        revenueAmount: payments
          .filter((payment) => bookingIds.has(payment.bookingId))
          .filter((payment) => payment.status === "PAID")
          .reduce((sum, payment) => sum + (payment.amount.amount as number), 0),
      };
    });

    return {
      storeId: input.filter.storeId,
      branchId: input.filter.branchId,
      from: input.filter.from,
      to: input.filter.to,
      currency: revenue.currency,
      items: rows,
    };
  }

  async getStaffReport(input: {
    readonly filter: StoreReportFilter;
  }): Promise<StaffReport> {
    assertValidReportDateRange(input.filter);
    await this.assertStoreExists(input.filter.storeId);
    await this.assertBranchScope(input.filter.storeId, input.filter.branchId);
    const [members, bookings, payments] = await Promise.all([
      this.dependencies.storeMemberRepository.listByStoreId(
        input.filter.storeId,
      ),
      this.listStoreBookings(input.filter),
      this.listStorePayments(input.filter),
    ]);

    return {
      storeId: input.filter.storeId,
      branchId: input.filter.branchId,
      from: input.filter.from,
      to: input.filter.to,
      items: members
        .filter((member) => member.status === "ACTIVE")
        .filter(
          (member) =>
            input.filter.branchId === undefined ||
            member.branchIds.includes(input.filter.branchId) ||
            member.role === "STORE_OWNER",
        )
        .map((member) => ({
          userId: member.userId,
          role: member.role,
          branchIds: member.branchIds,
          bookingsTouchedCount: bookings.filter((booking) =>
            booking.statusHistory.some(
              (transition) => transition.changedByUserId === member.userId,
            ),
          ).length,
          cashConfirmedCount: payments.filter(
            (payment) =>
              payment.method === "CASH" &&
              payment.confirmedByUserId === member.userId &&
              payment.status === "PAID",
          ).length,
        })),
    };
  }

  async getPlatformOverviewReport(input: {
    readonly filter: PlatformReportFilter;
  }): Promise<PlatformOverviewReport> {
    assertValidReportDateRange(input.filter);
    const [users, stores, assets, branches] = await Promise.all([
      this.dependencies.userRepository.findByStatus("ACTIVE", PAGE_ALL),
      this.dependencies.storeRepository.listVisible(PAGE_ALL),
      this.dependencies.assetRepository.search({}, PAGE_ALL),
      this.listVisibleBranches(),
    ]);
    const tenantId =
      input.filter.tenantId ?? stores.items[0]?.tenantId ?? ("" as TenantId);
    const bookings = (
      await this.dependencies.bookingRepository.search({ tenantId }, PAGE_ALL)
    ).items.filter((booking) => inRange(booking.startAt, input.filter));
    const payments = (
      await this.dependencies.paymentRepository.search({ tenantId }, PAGE_ALL)
    ).items.filter((payment) =>
      inRange(payment.paidAt ?? payment.createdAt, input.filter),
    );
    const paidPayments = payments.filter(
      (payment) => payment.status === "PAID",
    );
    const gmvAmount = paidPayments.reduce(
      (sum, payment) => sum + (payment.amount.amount as number),
      0,
    );
    const currency = paidPayments[0]?.amount.currency ?? "THB";
    const platformRevenueAmount =
      this.dependencies.settlementPolicy === undefined
        ? 0
        : Math.round(
            (gmvAmount *
              this.dependencies.settlementPolicy.platformCommissionBps) /
              10000,
          );

    return {
      from: input.filter.from,
      to: input.filter.to,
      usersCount: users.items.length,
      storesCount: stores.items.length,
      branchesCount: branches.length,
      assetsCount: assets.items.length,
      bookingsCount: bookings.length,
      completedBookingsCount: bookings.filter(
        (booking) => booking.status === "COMPLETED",
      ).length,
      activeBookingsCount: bookings.filter((booking) =>
        ["CONFIRMED", "PREPARING", "AWAITING_PICKUP", "IN_PROGRESS"].includes(
          booking.status,
        ),
      ).length,
      gmvAmount,
      platformRevenueAmount,
      currency,
    };
  }

  async createSettlement(input: {
    readonly settlementId: SettlementId;
    readonly filter: StoreReportFilter;
    readonly now: IsoUtcDateTime;
  }): Promise<Settlement> {
    const revenue = await this.getStoreRevenueReport({ filter: input.filter });
    const settlement = createSettlementProfile({
      settlementId: input.settlementId,
      filter: input.filter,
      currency: revenue.currency,
      grossAmount: revenue.grossRevenueAmount,
      onlineAmount: revenue.onlineAmount,
      cashAmount: revenue.cashAmount,
      refundAmount: revenue.refundAmount,
      penaltyAmount: revenue.penaltyAmount,
      policy: this.dependencies.settlementPolicy,
      now: input.now,
    });
    return this.dependencies.settlementRepository.save(settlement);
  }

  async transitionSettlement(input: {
    readonly settlementId: SettlementId;
    readonly actorUserId: UserId;
    readonly status: "APPROVED" | "PAYMENT_REQUESTED" | "PAID";
    readonly now: IsoUtcDateTime;
  }): Promise<Settlement> {
    const settlement = await this.dependencies.settlementRepository.findById(
      input.settlementId,
    );
    if (settlement === null) {
      throw new DomainError("NOT_FOUND", "Settlement not found.", {
        settlementId: input.settlementId,
      });
    }
    const updated = transitionSettlement(settlement, input.status, {
      actorUserId: input.actorUserId,
      now: input.now,
    });
    const saved = await this.dependencies.settlementRepository.save(updated, {
      expectedVersion: settlement.version,
    });
    await this.dependencies.auditLogWriter.append({
      tenantId: saved.tenantId,
      action: "settlement.state.changed",
      resourceType: "settlement",
      resourceId: saved.id,
      actor: {
        actorType: "USER",
        actorUserId: input.actorUserId,
        roleNames: [],
      },
      after: {
        status: saved.status,
        transfer_payable_amount: saved.transferPayableAmount,
      },
      metadata: {
        correlationId: "settlement-transition" as never,
        occurredAt: input.now,
        immutable: true,
        classification: "FINANCIAL",
      },
    });
    return saved;
  }

  async createExport(input: {
    readonly reportExportId: ReportExportId;
    readonly requestedByUserId: UserId;
    readonly filter: StoreReportFilter;
    readonly type: ReportExportType;
    readonly format: ReportExportFormat;
    readonly now: IsoUtcDateTime;
  }): Promise<ReportExport> {
    const { content, rowCount } = await this.buildExportContent(
      input.type,
      input.filter,
    );
    const reportExport = createReportExportProfile({
      reportExportId: input.reportExportId,
      requestedByUserId: input.requestedByUserId,
      filter: input.filter,
      type: input.type,
      format: input.format,
      content,
      rowCount,
      now: input.now,
    });
    const saved =
      await this.dependencies.reportExportRepository.save(reportExport);
    await this.dependencies.auditLogWriter.append({
      tenantId: saved.tenantId,
      action: "report.export.created",
      resourceType: "report_export",
      resourceId: saved.id,
      actor: {
        actorType: "USER",
        actorUserId: input.requestedByUserId,
        roleNames: [],
      },
      after: {
        type: saved.type,
        format: saved.format,
        row_count: saved.rowCount,
      },
      metadata: {
        correlationId: "report-export" as never,
        occurredAt: input.now,
        immutable: true,
        classification: "FINANCIAL",
      },
    });
    return saved;
  }

  async getSettlement(settlementId: SettlementId): Promise<Settlement> {
    const settlement =
      await this.dependencies.settlementRepository.findById(settlementId);
    if (settlement === null) {
      throw new DomainError("NOT_FOUND", "Settlement not found.", {
        settlementId,
      });
    }
    return settlement;
  }

  private async buildExportContent(
    type: ReportExportType,
    filter: StoreReportFilter,
  ): Promise<{ readonly content: string; readonly rowCount: number }> {
    if (type === "STORE_RENTAL") {
      const report = await this.getStoreRentalReport({
        filter,
        now: filter.to,
      });
      return {
        content: toCsv(
          [
            "store_id",
            "branch_id",
            "bookings",
            "completed",
            "cancelled",
            "no_show",
            "overdue",
            "average_duration_minutes",
          ],
          [
            [
              report.storeId,
              report.branchId ?? "",
              report.bookingsCount,
              report.completedCount,
              report.cancelledCount,
              report.noShowCount,
              report.overdueCount,
              report.averageDurationMinutes,
            ],
          ],
        ),
        rowCount: 1,
      };
    }
    if (type === "STORE_REVENUE") {
      const report = await this.getStoreRevenueReport({ filter });
      return {
        content: toCsv(
          [
            "store_id",
            "branch_id",
            "gross",
            "net",
            "cash",
            "online",
            "deposit",
            "refund",
            "penalty",
            "platform_fee",
            "payment_fee",
            "currency",
          ],
          [
            [
              report.storeId,
              report.branchId ?? "",
              report.grossRevenueAmount,
              report.netRevenueAmount,
              report.cashAmount,
              report.onlineAmount,
              report.depositAmount,
              report.refundAmount,
              report.penaltyAmount,
              report.platformFeeAmount,
              report.paymentFeeAmount,
              report.currency,
            ],
          ],
        ),
        rowCount: 1,
      };
    }
    if (type === "ASSET") {
      const report = await this.getAssetReport({ filter });
      return {
        content: toCsv(
          [
            "asset_id",
            "code",
            "branch_id",
            "status",
            "bookings",
            "completed",
            "revenue",
          ],
          report.items.map((item) => [
            item.assetId,
            item.code,
            item.branchId,
            item.status,
            item.bookingsCount,
            item.completedCount,
            item.revenueAmount,
          ]),
        ),
        rowCount: report.items.length,
      };
    }
    if (type === "STAFF") {
      const report = await this.getStaffReport({ filter });
      return {
        content: toCsv(
          [
            "user_id",
            "role",
            "branch_ids",
            "bookings_touched",
            "cash_confirmed",
          ],
          report.items.map((item) => [
            item.userId,
            item.role,
            item.branchIds.join("|"),
            item.bookingsTouchedCount,
            item.cashConfirmedCount,
          ]),
        ),
        rowCount: report.items.length,
      };
    }
    const settlement = await this.createSettlement({
      settlementId: `${filter.storeId}_export_settlement` as never,
      filter,
      now: filter.to,
    });
    return {
      content: toCsv(
        [
          "settlement_id",
          "store_id",
          "branch_id",
          "gross",
          "online",
          "cash",
          "platform_fee",
          "payment_fee",
          "transfer_payable",
          "currency",
          "status",
        ],
        [
          [
            settlement.id,
            settlement.storeId,
            settlement.branchId ?? "",
            settlement.grossAmount,
            settlement.onlineAmount,
            settlement.cashAmount,
            settlement.platformFeeAmount,
            settlement.paymentFeeAmount,
            settlement.transferPayableAmount,
            settlement.currency,
            settlement.status,
          ],
        ],
      ),
      rowCount: 1,
    };
  }

  private async listStoreBookings(filter: StoreReportFilter) {
    const bookings = (
      await this.dependencies.bookingRepository.search(
        {
          tenantId: filter.tenantId,
          storeId: filter.storeId,
          ...(filter.branchId !== undefined
            ? { branchId: filter.branchId }
            : {}),
        },
        PAGE_ALL,
      )
    ).items;
    return bookings.filter((booking) => inRange(booking.startAt, filter));
  }

  private async listStorePayments(filter: StoreReportFilter) {
    const payments = (
      await this.dependencies.paymentRepository.search(
        { tenantId: filter.tenantId, storeId: filter.storeId },
        PAGE_ALL,
      )
    ).items;
    return payments
      .filter(
        (payment) =>
          filter.branchId === undefined || payment.branchId === filter.branchId,
      )
      .filter((payment) =>
        inRange(payment.paidAt ?? payment.createdAt, filter),
      );
  }

  private async listStoreDeposits(filter: StoreReportFilter) {
    const deposits = (
      await this.dependencies.depositRepository.search(
        { tenantId: filter.tenantId, storeId: filter.storeId },
        PAGE_ALL,
      )
    ).items;
    return deposits
      .filter(
        (deposit) =>
          filter.branchId === undefined || deposit.branchId === filter.branchId,
      )
      .filter((deposit) =>
        inRange(deposit.releasedAt ?? deposit.updatedAt, filter),
      );
  }

  private async listVisibleBranches() {
    const stores =
      await this.dependencies.storeRepository.listVisible(PAGE_ALL);
    const nested = await Promise.all(
      stores.items.map((store) =>
        this.dependencies.branchRepository.listByStoreId(store.id),
      ),
    );
    return nested.flat();
  }

  private async assertStoreExists(storeId: StoreId): Promise<void> {
    const store = await this.dependencies.storeRepository.findById(storeId);
    if (store === null) {
      throw new DomainError("NOT_FOUND", "Store not found.", { storeId });
    }
  }

  private async assertBranchScope(
    storeId: StoreId,
    branchId?: BranchId | undefined,
  ): Promise<void> {
    if (branchId === undefined) {
      return;
    }
    const branch = await this.dependencies.branchRepository.findById(branchId);
    if (branch === null || branch.storeId !== storeId) {
      throw new DomainError(
        "PERMISSION_DENIED",
        "Branch is outside store scope.",
        {
          storeId,
          branchId,
        },
      );
    }
  }
}

export const serializeStoreRentalReport = (report: StoreRentalReport) => ({
  store_id: report.storeId,
  branch_id: report.branchId,
  from: report.from,
  to: report.to,
  bookings_count: report.bookingsCount,
  completed_count: report.completedCount,
  cancelled_count: report.cancelledCount,
  no_show_count: report.noShowCount,
  overdue_count: report.overdueCount,
  average_duration_minutes: report.averageDurationMinutes,
});

export const serializeStoreRevenueReport = (report: StoreRevenueReport) => ({
  store_id: report.storeId,
  branch_id: report.branchId,
  from: report.from,
  to: report.to,
  gross_revenue_amount: report.grossRevenueAmount,
  net_revenue_amount: report.netRevenueAmount,
  cash_amount: report.cashAmount,
  online_amount: report.onlineAmount,
  deposit_amount: report.depositAmount,
  refund_amount: report.refundAmount,
  penalty_amount: report.penaltyAmount,
  platform_fee_amount: report.platformFeeAmount,
  payment_fee_amount: report.paymentFeeAmount,
  currency: report.currency,
});

export const serializeAssetReport = (report: AssetReport) => ({
  store_id: report.storeId,
  branch_id: report.branchId,
  from: report.from,
  to: report.to,
  currency: report.currency,
  items: report.items.map((item) => ({
    asset_id: item.assetId,
    code: item.code,
    branch_id: item.branchId,
    status: item.status,
    bookings_count: item.bookingsCount,
    completed_count: item.completedCount,
    revenue_amount: item.revenueAmount,
  })),
});

export const serializeStaffReport = (report: StaffReport) => ({
  store_id: report.storeId,
  branch_id: report.branchId,
  from: report.from,
  to: report.to,
  items: report.items.map((item) => ({
    user_id: item.userId,
    role: item.role,
    branch_ids: item.branchIds,
    bookings_touched_count: item.bookingsTouchedCount,
    cash_confirmed_count: item.cashConfirmedCount,
  })),
});

export const serializePlatformOverviewReport = (
  report: PlatformOverviewReport,
) => ({
  from: report.from,
  to: report.to,
  users_count: report.usersCount,
  stores_count: report.storesCount,
  branches_count: report.branchesCount,
  assets_count: report.assetsCount,
  bookings_count: report.bookingsCount,
  completed_bookings_count: report.completedBookingsCount,
  active_bookings_count: report.activeBookingsCount,
  gmv_amount: report.gmvAmount,
  platform_revenue_amount: report.platformRevenueAmount,
  currency: report.currency,
});

export const serializeSettlement = (settlement: Settlement) => ({
  id: settlement.id,
  tenant_id: settlement.tenantId,
  store_id: settlement.storeId,
  branch_id: settlement.branchId,
  period_from: settlement.periodFrom,
  period_to: settlement.periodTo,
  currency: settlement.currency,
  gross_amount: settlement.grossAmount,
  online_amount: settlement.onlineAmount,
  cash_amount: settlement.cashAmount,
  refund_amount: settlement.refundAmount,
  penalty_amount: settlement.penaltyAmount,
  platform_fee_amount: settlement.platformFeeAmount,
  payment_fee_amount: settlement.paymentFeeAmount,
  transfer_payable_amount: settlement.transferPayableAmount,
  status: settlement.status,
  approved_by_user_id: settlement.approvedByUserId,
  approved_at: settlement.approvedAt,
  paid_by_user_id: settlement.paidByUserId,
  paid_at: settlement.paidAt,
  created_at: settlement.createdAt,
  updated_at: settlement.updatedAt,
  version: settlement.version as number,
});

export const serializeReportExport = (reportExport: ReportExport) => ({
  id: reportExport.id,
  tenant_id: reportExport.tenantId,
  requested_by_user_id: reportExport.requestedByUserId,
  type: reportExport.type,
  format: reportExport.format,
  store_id: reportExport.storeId,
  branch_id: reportExport.branchId,
  from: reportExport.from,
  to: reportExport.to,
  file_name: reportExport.fileName,
  mime_type: reportExport.mimeType,
  content: reportExport.content,
  row_count: reportExport.rowCount,
  created_at: reportExport.createdAt,
  updated_at: reportExport.updatedAt,
  version: reportExport.version as number,
});
