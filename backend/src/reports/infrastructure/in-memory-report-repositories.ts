import { DomainError } from "../../shared/domain/index.js";
import type {
  Page,
  PageRequest,
  SaveOptions,
} from "../../shared/domain/index.js";
import type {
  ReportExport,
  ReportExportRepository,
  Settlement,
  SettlementRepository,
  SettlementSearchFilter,
} from "../domain/report-repository.js";

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

export class InMemorySettlementRepository implements SettlementRepository {
  private readonly settlements = new Map<Settlement["id"], Settlement>();

  async findById(id: Settlement["id"]): Promise<Settlement | null> {
    return this.settlements.get(id) ?? null;
  }

  async search(
    filter: SettlementSearchFilter,
    page: PageRequest,
  ): Promise<Page<Settlement>> {
    const items = [...this.settlements.values()]
      .filter((settlement) => settlement.tenantId === filter.tenantId)
      .filter(
        (settlement) =>
          filter.storeId === undefined || settlement.storeId === filter.storeId,
      )
      .filter(
        (settlement) =>
          filter.status === undefined || settlement.status === filter.status,
      )
      .slice(0, page.limit);

    return { items };
  }

  async save(
    settlement: Settlement,
    options?: SaveOptions,
  ): Promise<Settlement> {
    assertExpectedVersion(
      this.settlements.get(settlement.id),
      options?.expectedVersion,
      "Settlement version conflict",
      { settlementId: settlement.id },
    );
    this.settlements.set(settlement.id, settlement);
    return settlement;
  }
}

export class InMemoryReportExportRepository implements ReportExportRepository {
  private readonly exports = new Map<ReportExport["id"], ReportExport>();

  async findById(id: ReportExport["id"]): Promise<ReportExport | null> {
    return this.exports.get(id) ?? null;
  }

  async listByUserId(
    userId: ReportExport["requestedByUserId"],
  ): Promise<readonly ReportExport[]> {
    return [...this.exports.values()].filter(
      (reportExport) => reportExport.requestedByUserId === userId,
    );
  }

  async save(
    reportExport: ReportExport,
    options?: SaveOptions,
  ): Promise<ReportExport> {
    assertExpectedVersion(
      this.exports.get(reportExport.id),
      options?.expectedVersion,
      "Report export version conflict",
      { reportExportId: reportExport.id },
    );
    this.exports.set(reportExport.id, reportExport);
    return reportExport;
  }
}
