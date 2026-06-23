import { DomainError } from "../../shared/domain/index.js";
import type {
  Booking,
  BookingRepository,
  BookingSearchFilter,
} from "../domain/booking-repository.js";
import type {
  AssetId,
  BookingId,
  IdempotencyKey,
  IsoUtcDateTime,
  Page,
  PageRequest,
  SaveOptions,
} from "../../shared/domain/index.js";

export class InMemoryBookingRepository implements BookingRepository {
  private readonly bookings = new Map<BookingId, Booking>();

  async findById(id: BookingId): Promise<Booking | null> {
    return this.bookings.get(id) ?? null;
  }

  async findByIdempotencyKey(key: IdempotencyKey): Promise<Booking | null> {
    return (
      [...this.bookings.values()].find(
        (booking) => booking.idempotencyKey === key,
      ) ?? null
    );
  }

  async findOverlappingConfirmedBooking(
    assetId: AssetId,
    startAt: IsoUtcDateTime,
    endAt: IsoUtcDateTime,
  ): Promise<Booking | null> {
    return (
      [...this.bookings.values()].find((booking) => {
        const overlaps = booking.startAt < endAt && booking.endAt > startAt;
        return (
          booking.assetIds.includes(assetId) &&
          ["CONFIRMED", "PREPARING", "AWAITING_PICKUP", "IN_PROGRESS"].includes(
            booking.status,
          ) &&
          overlaps
        );
      }) ?? null
    );
  }

  async search(
    filter: BookingSearchFilter,
    page: PageRequest,
  ): Promise<Page<Booking>> {
    const items = [...this.bookings.values()]
      .filter((booking) => booking.tenantId === filter.tenantId)
      .filter(
        (booking) =>
          filter.storeId === undefined || booking.storeId === filter.storeId,
      )
      .filter(
        (booking) =>
          filter.branchId === undefined || booking.branchId === filter.branchId,
      )
      .filter(
        (booking) =>
          filter.userId === undefined || booking.userId === filter.userId,
      )
      .filter(
        (booking) =>
          filter.status === undefined || booking.status === filter.status,
      )
      .slice(0, page.limit);

    return { items };
  }

  async save(booking: Booking, options?: SaveOptions): Promise<Booking> {
    const current = this.bookings.get(booking.id);
    if (
      options?.expectedVersion !== undefined &&
      current?.version !== options.expectedVersion
    ) {
      throw new DomainError("VERSION_CONFLICT", "Booking version conflict", {
        bookingId: booking.id,
      });
    }
    this.bookings.set(booking.id, booking);
    return booking;
  }
}
