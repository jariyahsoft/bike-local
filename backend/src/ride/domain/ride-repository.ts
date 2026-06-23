import type {
  BookingId,
  EntityTimestamps,
  EntityVersion,
  IdempotencyKey,
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
export type GpsGapReason =
  | "APP_INTERRUPTED"
  | "PERMISSION_REVOKED"
  | "SIGNAL_LOST"
  | "DEVICE_OFFLINE";

export interface GpsPoint {
  readonly capturedAt: IsoUtcDateTime;
  readonly latitude: number;
  readonly longitude: number;
  readonly accuracyMeters: number;
  readonly speedMps?: number | undefined;
  readonly altitudeMeters?: number | undefined;
}

export interface GpsGap {
  readonly from: IsoUtcDateTime;
  readonly to: IsoUtcDateTime;
  readonly reason: GpsGapReason;
}

export interface RideSession
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: RideSessionId;
  readonly bookingId: BookingId;
  readonly userId: UserId;
  readonly status: RideSessionStatus;
  readonly startedAt: IsoUtcDateTime;
  readonly resumedAt?: IsoUtcDateTime | undefined;
  readonly endedAt?: IsoUtcDateTime | undefined;
  readonly distanceMeters?: number | undefined;
  readonly gpsGapCount: number;
}

export interface RideTrackChunk {
  readonly rideSessionId: RideSessionId;
  readonly sequence: number;
  readonly checksum: string;
  readonly capturedFrom: IsoUtcDateTime;
  readonly capturedTo: IsoUtcDateTime;
  readonly pointCount: number;
  readonly points: readonly GpsPoint[];
  readonly gaps: readonly GpsGap[];
  readonly idempotencyKey?: IdempotencyKey | undefined;
  readonly schemaVersion: EntityVersion;
}

export interface EncryptedRideTrackBuffer {
  readonly encryptionKeyReference: string;
  appendPoint(point: GpsPoint): Promise<void>;
  appendGap(gap: GpsGap): Promise<void>;
  flushChunk(input: {
    readonly rideSessionId: RideSessionId;
    readonly maxPoints: number;
  }): Promise<RideTrackChunk | null>;
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
