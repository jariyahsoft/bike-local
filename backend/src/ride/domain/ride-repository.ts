import type {
  BookingId,
  EntityTimestamps,
  EntityVersion,
  Page,
  PageRequest,
  RideSessionId,
  TenantId,
  TenantScopedEntity,
  UserId,
  VersionedEntity,
  IsoUtcDateTime,
} from "../../shared/domain/index.js";
import type { Repository, SaveOptions } from "../../shared/domain/index.js";

export type RideSessionStatus = "ACTIVE" | "PAUSED" | "ENDED" | "SYNC_PENDING";

export interface RideSession
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: RideSessionId;
  readonly bookingId: BookingId;
  readonly userId: UserId;
  readonly status: RideSessionStatus;
  readonly startedAt: IsoUtcDateTime;
  readonly endedAt?: IsoUtcDateTime;
  readonly distanceMeters?: number;
}

export interface RideTrackChunk {
  readonly rideSessionId: RideSessionId;
  readonly sequence: number;
  readonly checksum: string;
  readonly capturedFrom: IsoUtcDateTime;
  readonly capturedTo: IsoUtcDateTime;
  readonly schemaVersion: EntityVersion;
}

export interface RideSessionSearchFilter {
  readonly tenantId: TenantId;
  readonly bookingId?: BookingId;
  readonly userId?: UserId;
  readonly status?: RideSessionStatus;
}

export interface RideRepository extends Repository<RideSession, RideSessionId> {
  appendTrackChunk(chunk: RideTrackChunk): Promise<RideTrackChunk>;
  findTrackChunks(
    rideSessionId: RideSessionId,
    page: PageRequest,
  ): Promise<Page<RideTrackChunk>>;
  search(
    filter: RideSessionSearchFilter,
    page: PageRequest,
  ): Promise<Page<RideSession>>;
  save(session: RideSession, options?: SaveOptions): Promise<RideSession>;
}
