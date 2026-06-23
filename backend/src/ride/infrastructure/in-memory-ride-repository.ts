import { DomainError } from "../../shared/domain/index.js";
import type {
  Page,
  PageRequest,
  RideSessionId,
  SaveOptions,
} from "../../shared/domain/index.js";
import type {
  RideRepository,
  RideSession,
  RideSessionSearchFilter,
  RideTrackChunk,
} from "../domain/ride-repository.js";

export class InMemoryRideRepository implements RideRepository {
  private readonly sessions = new Map<RideSessionId, RideSession>();
  private readonly chunks = new Map<RideSessionId, RideTrackChunk[]>();

  async findById(id: RideSessionId): Promise<RideSession | null> {
    return this.sessions.get(id) ?? null;
  }

  async appendTrackChunk(chunk: RideTrackChunk): Promise<RideTrackChunk> {
    const existing = this.chunks.get(chunk.rideSessionId) ?? [];
    if (existing.some((item) => item.sequence === chunk.sequence)) {
      throw new DomainError(
        "VALIDATION_INVALID",
        "Ride track chunk sequence already exists",
        {
          rideSessionId: chunk.rideSessionId,
          sequence: chunk.sequence,
        },
      );
    }
    this.chunks.set(chunk.rideSessionId, [...existing, chunk]);
    return chunk;
  }

  async findTrackChunks(
    rideSessionId: RideSessionId,
    page: PageRequest,
  ): Promise<Page<RideTrackChunk>> {
    return {
      items: (this.chunks.get(rideSessionId) ?? []).slice(0, page.limit),
    };
  }

  async search(
    filter: RideSessionSearchFilter,
    page: PageRequest,
  ): Promise<Page<RideSession>> {
    const items = [...this.sessions.values()]
      .filter((session) => session.tenantId === filter.tenantId)
      .filter(
        (session) =>
          filter.bookingId === undefined ||
          session.bookingId === filter.bookingId,
      )
      .filter(
        (session) =>
          filter.userId === undefined || session.userId === filter.userId,
      )
      .filter(
        (session) =>
          filter.status === undefined || session.status === filter.status,
      )
      .slice(0, page.limit);

    return { items };
  }

  async save(
    session: RideSession,
    options?: SaveOptions,
  ): Promise<RideSession> {
    const current = this.sessions.get(session.id);
    if (
      options?.expectedVersion !== undefined &&
      current?.version !== options.expectedVersion
    ) {
      throw new DomainError(
        "VERSION_CONFLICT",
        "Ride session version conflict",
        { rideSessionId: session.id },
      );
    }
    this.sessions.set(session.id, session);
    return session;
  }
}
