import { DomainError } from "../../shared/domain/index.js";
import type {
  Page,
  PageRequest,
  SaveOptions,
} from "../../shared/domain/index.js";
import type {
  SosCase,
  SosCaseSearchFilter,
  SosRepository,
} from "../domain/sos-repository.js";

export class InMemorySosRepository implements SosRepository {
  private readonly cases = new Map<SosCase["id"], SosCase>();

  async findById(id: SosCase["id"]): Promise<SosCase | null> {
    return this.cases.get(id) ?? null;
  }

  async findActiveByBookingId(
    bookingId: SosCase["bookingId"],
  ): Promise<SosCase | null> {
    return (
      [...this.cases.values()].find(
        (sosCase) =>
          sosCase.bookingId === bookingId &&
          ["OPEN", "ACKNOWLEDGED", "ASSIGNED", "IN_PROGRESS"].includes(
            sosCase.status,
          ),
      ) ?? null
    );
  }

  async search(
    filter: SosCaseSearchFilter,
    page: PageRequest,
  ): Promise<Page<SosCase>> {
    const items = [...this.cases.values()]
      .filter(
        (sosCase) =>
          filter.tenantId === undefined || sosCase.tenantId === filter.tenantId,
      )
      .filter(
        (sosCase) =>
          filter.branchId === undefined || sosCase.branchId === filter.branchId,
      )
      .filter(
        (sosCase) =>
          filter.bookingId === undefined ||
          sosCase.bookingId === filter.bookingId,
      )
      .filter(
        (sosCase) =>
          filter.status === undefined || sosCase.status === filter.status,
      )
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .slice(0, page.limit);

    return { items };
  }

  async save(sosCase: SosCase, options?: SaveOptions): Promise<SosCase> {
    const current = this.cases.get(sosCase.id);
    if (
      options?.expectedVersion !== undefined &&
      current?.version !== options.expectedVersion
    ) {
      throw new DomainError("VERSION_CONFLICT", "SOS case version conflict", {
        sosCaseId: sosCase.id,
      });
    }
    this.cases.set(sosCase.id, sosCase);
    return sosCase;
  }
}
