import { DomainError } from "../../shared/domain/index.js";
import type {
  BookingId,
  Page,
  PageRequest,
  ReturnRequestId,
  SaveOptions,
} from "../../shared/domain/index.js";
import type {
  ReturnRepository,
  ReturnInspection,
  ReturnRequest,
  ReturnRequestSearchFilter,
} from "../domain/return-repository.js";

export class InMemoryReturnRepository implements ReturnRepository {
  private readonly requests = new Map<ReturnRequestId, ReturnRequest>();
  private readonly inspections = new Map<string, ReturnInspection>();

  async findById(id: ReturnRequestId): Promise<ReturnRequest | null> {
    return this.requests.get(id) ?? null;
  }

  async findByBookingId(bookingId: BookingId): Promise<ReturnRequest | null> {
    return (
      [...this.requests.values()].find(
        (request) => request.bookingId === bookingId,
      ) ?? null
    );
  }

  async findInspectionByReturnRequestId(
    returnRequestId: ReturnRequestId,
  ): Promise<ReturnInspection | null> {
    return (
      [...this.inspections.values()].find(
        (inspection) => inspection.returnRequestId === returnRequestId,
      ) ?? null
    );
  }

  async search(
    filter: ReturnRequestSearchFilter,
    page: PageRequest,
  ): Promise<Page<ReturnRequest>> {
    const items = [...this.requests.values()]
      .filter((request) => request.tenantId === filter.tenantId)
      .filter(
        (request) =>
          filter.bookingId === undefined ||
          request.bookingId === filter.bookingId,
      )
      .filter(
        (request) =>
          filter.storeId === undefined || request.storeId === filter.storeId,
      )
      .filter(
        (request) =>
          filter.status === undefined || request.status === filter.status,
      )
      .slice(0, page.limit);

    return { items };
  }

  async save(
    request: ReturnRequest,
    options?: SaveOptions,
  ): Promise<ReturnRequest> {
    const current = this.requests.get(request.id);
    if (
      options?.expectedVersion !== undefined &&
      current?.version !== options.expectedVersion
    ) {
      throw new DomainError(
        "VERSION_CONFLICT",
        "Return request version conflict",
        { returnRequestId: request.id },
      );
    }
    this.requests.set(request.id, request);
    return request;
  }

  async saveInspection(
    inspection: ReturnInspection,
    options?: SaveOptions,
  ): Promise<ReturnInspection> {
    const current = this.inspections.get(inspection.id);
    if (
      options?.expectedVersion !== undefined &&
      current?.version !== options.expectedVersion
    ) {
      throw new DomainError(
        "VERSION_CONFLICT",
        "Return inspection version conflict",
        { returnInspectionId: inspection.id },
      );
    }
    this.inspections.set(inspection.id, inspection);
    return inspection;
  }
}
