import { DomainError } from "../../shared/domain/domain-error.js";
import {
  asEntityVersion,
  type IsoUtcDateTime,
  type RideSessionId,
  type TenantId,
  type UserId,
} from "../../shared/domain/index.js";
import type {
  GpsGap,
  GpsPoint,
  RideSession,
  RideSessionStatus,
  RideTrackChunk,
} from "./ride-repository.js";

const ACTIVE_UPLOAD_STATUSES: readonly RideSessionStatus[] = [
  "ACTIVE",
  "PAUSED",
  "SYNC_PENDING",
];

export const createRideSessionProfile = (input: {
  readonly rideSessionId: RideSessionId;
  readonly tenantId: TenantId;
  readonly bookingId: RideSession["bookingId"];
  readonly userId: UserId;
  readonly now: IsoUtcDateTime;
}): RideSession => ({
  id: input.rideSessionId,
  tenantId: input.tenantId,
  bookingId: input.bookingId,
  userId: input.userId,
  status: "ACTIVE",
  startedAt: input.now,
  gpsGapCount: 0,
  createdAt: input.now,
  updatedAt: input.now,
  version: asEntityVersion(1),
});

export const resumeRideSession = (
  session: RideSession,
  now: IsoUtcDateTime,
): RideSession => {
  if (session.status === "ACTIVE") {
    return session;
  }
  if (session.status !== "PAUSED" && session.status !== "SYNC_PENDING") {
    throw new DomainError(
      "RIDE_SESSION_STATE_INVALID",
      "Ride session cannot be resumed from its current state.",
      {
        rideSessionId: session.id,
        status: session.status,
      },
    );
  }

  return {
    ...session,
    status: "ACTIVE",
    resumedAt: now,
    updatedAt: now,
    version: asEntityVersion((session.version as number) + 1),
  };
};

export const endRideSessionProfile = (
  session: RideSession,
  input: {
    readonly endedAt: IsoUtcDateTime;
    readonly distanceMeters?: number | undefined;
    readonly gpsGapCount?: number | undefined;
  },
): RideSession => {
  if (session.status === "ENDED") {
    return session;
  }
  if (!ACTIVE_UPLOAD_STATUSES.includes(session.status)) {
    throw new DomainError(
      "RIDE_SESSION_STATE_INVALID",
      "Ride session cannot be ended from its current state.",
      {
        rideSessionId: session.id,
        status: session.status,
      },
    );
  }

  return {
    ...session,
    status: "ENDED",
    endedAt: input.endedAt,
    distanceMeters: input.distanceMeters ?? session.distanceMeters,
    gpsGapCount: session.gpsGapCount + (input.gpsGapCount ?? 0),
    updatedAt: input.endedAt,
    version: asEntityVersion((session.version as number) + 1),
  };
};

export const createRideTrackChunkProfile = (input: {
  readonly rideSessionId: RideSessionId;
  readonly sequence: number;
  readonly checksum: string;
  readonly capturedFrom: IsoUtcDateTime;
  readonly capturedTo: IsoUtcDateTime;
  readonly points: readonly GpsPoint[];
  readonly gaps?: readonly GpsGap[] | undefined;
  readonly schemaVersion?: number | undefined;
}): RideTrackChunk => {
  if (!Number.isInteger(input.sequence) || input.sequence < 0) {
    throw new DomainError(
      "RIDE_TRACK_SEQUENCE_INVALID",
      "Ride track chunk sequence must be a non-negative integer.",
      { sequence: input.sequence },
    );
  }
  if (input.checksum.trim() === "") {
    throw new DomainError(
      "RIDE_TRACK_CHECKSUM_INVALID",
      "Ride track chunk checksum is required.",
      {},
    );
  }
  if (input.points.length === 1 && (input.gaps ?? []).length === 0) {
    throw new DomainError(
      "RIDE_TRACK_CHUNK_TOO_SMALL",
      "Ride tracking must upload buffered chunks, not individual GPS points.",
      {
        pointCount: input.points.length,
      },
    );
  }

  return {
    rideSessionId: input.rideSessionId,
    sequence: input.sequence,
    checksum: input.checksum,
    capturedFrom: input.capturedFrom,
    capturedTo: input.capturedTo,
    pointCount: input.points.length,
    points: input.points,
    gaps: input.gaps ?? [],
    schemaVersion: asEntityVersion(input.schemaVersion ?? 1),
  };
};

export const assertTrackUploadAllowed = (session: RideSession): void => {
  if (!ACTIVE_UPLOAD_STATUSES.includes(session.status)) {
    throw new DomainError(
      "RIDE_SESSION_STATE_INVALID",
      "Ride track chunks can be uploaded only for active or sync-pending sessions.",
      {
        rideSessionId: session.id,
        status: session.status,
      },
    );
  }
};
