import { DomainError } from "../../shared/domain/index.js";
import type {
  BookingId,
  IdempotencyKey,
  IsoUtcDateTime,
  RideSessionId,
  UserId,
} from "../../shared/domain/index.js";
import type { BookingService } from "../../booking/application/booking-service.js";
import {
  assertTrackUploadAllowed,
  createRideSessionProfile,
  createRideTrackChunkProfile,
  endRideSessionProfile,
  resumeRideSession,
} from "../domain/ride-policies.js";
import type {
  GpsGap,
  GpsPoint,
  RideRepository,
  RideSession,
  RideTrackChunk,
} from "../domain/ride-repository.js";

export interface RideServiceDependencies {
  readonly bookingService: BookingService;
  readonly rideRepository: RideRepository;
}

export interface StartRideSessionInput {
  readonly rideSessionId: RideSessionId;
  readonly bookingId: BookingId;
  readonly userId: UserId;
  readonly now: IsoUtcDateTime;
}

export interface UploadRideTrackChunkInput {
  readonly rideSessionId: RideSessionId;
  readonly actorUserId: UserId;
  readonly sequence: number;
  readonly checksum: string;
  readonly capturedFrom: IsoUtcDateTime;
  readonly capturedTo: IsoUtcDateTime;
  readonly points: readonly GpsPoint[];
  readonly gaps?: readonly GpsGap[] | undefined;
  readonly idempotencyKey?: IdempotencyKey | undefined;
  readonly locationConsentGranted: boolean;
}

export class RideService {
  constructor(private readonly dependencies: RideServiceDependencies) {}

  async startOrResumeRideSession(
    input: StartRideSessionInput,
  ): Promise<RideSession> {
    const booking = await this.dependencies.bookingService.getBooking(
      input.bookingId,
    );
    if (booking.status !== "IN_PROGRESS") {
      throw new DomainError(
        "RIDE_BOOKING_STATE_INVALID",
        "Ride session can start only when rental is in progress.",
        {
          bookingId: booking.id,
          status: booking.status,
        },
      );
    }
    if (booking.userId !== input.userId) {
      throw new DomainError(
        "PERMISSION_DENIED",
        "Ride session can be started only by the booking renter.",
        { bookingId: booking.id, userId: input.userId },
      );
    }

    const existing = await this.dependencies.rideRepository.search(
      {
        tenantId: booking.tenantId,
        bookingId: booking.id,
        userId: booking.userId,
      },
      { limit: 20 },
    );
    const resumable = existing.items.find((session) =>
      ["ACTIVE", "PAUSED", "SYNC_PENDING"].includes(session.status),
    );
    if (resumable !== undefined) {
      const resumed = resumeRideSession(resumable, input.now);
      return this.dependencies.rideRepository.save(resumed, {
        expectedVersion: resumable.version,
      });
    }

    const session = createRideSessionProfile({
      rideSessionId: input.rideSessionId,
      tenantId: booking.tenantId,
      bookingId: booking.id,
      userId: booking.userId,
      now: input.now,
    });

    return this.dependencies.rideRepository.save(session);
  }

  async uploadTrackChunk(
    input: UploadRideTrackChunkInput,
  ): Promise<RideTrackChunk> {
    if (!input.locationConsentGranted) {
      throw new DomainError(
        "RIDE_LOCATION_CONSENT_REQUIRED",
        "Ride tracking upload requires active location consent.",
        { rideSessionId: input.rideSessionId },
      );
    }

    const session = await this.getRideSession(input.rideSessionId);
    if (session.userId !== input.actorUserId) {
      throw new DomainError(
        "PERMISSION_DENIED",
        "Ride track chunks can be uploaded only by the booking renter.",
        { rideSessionId: session.id },
      );
    }
    assertTrackUploadAllowed(session);
    const chunk = createRideTrackChunkProfile(input);

    return this.dependencies.rideRepository.appendTrackChunk({
      ...chunk,
      idempotencyKey: input.idempotencyKey,
    });
  }

  async endRideSession(input: {
    readonly rideSessionId: RideSessionId;
    readonly actorUserId: UserId;
    readonly endedAt: IsoUtcDateTime;
    readonly distanceMeters?: number | undefined;
    readonly gpsGapCount?: number | undefined;
    readonly expectedVersion: RideSession["version"];
  }): Promise<RideSession> {
    const session = await this.getRideSession(input.rideSessionId);
    if (session.userId !== input.actorUserId) {
      throw new DomainError(
        "PERMISSION_DENIED",
        "Ride session can be ended only by the booking renter.",
        { rideSessionId: session.id },
      );
    }
    const updated = endRideSessionProfile(session, input);

    return this.dependencies.rideRepository.save(updated, {
      expectedVersion: input.expectedVersion,
    });
  }

  async getRideSession(rideSessionId: RideSessionId): Promise<RideSession> {
    const session =
      await this.dependencies.rideRepository.findById(rideSessionId);
    if (session === null) {
      throw new DomainError("NOT_FOUND", "Ride session not found.", {
        rideSessionId,
      });
    }

    return session;
  }
}

export interface SerializedRideSession {
  readonly id: RideSessionId;
  readonly tenant_id: RideSession["tenantId"];
  readonly booking_id: BookingId;
  readonly user_id: UserId;
  readonly status: RideSession["status"];
  readonly started_at: IsoUtcDateTime;
  readonly resumed_at?: IsoUtcDateTime | undefined;
  readonly ended_at?: IsoUtcDateTime | undefined;
  readonly distance_meters?: number | undefined;
  readonly gps_gap_count: number;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: RideSession["version"];
}

export interface SerializedRideTrackChunk {
  readonly ride_session_id: RideSessionId;
  readonly sequence: number;
  readonly checksum: string;
  readonly captured_from: IsoUtcDateTime;
  readonly captured_to: IsoUtcDateTime;
  readonly point_count: number;
  readonly points: readonly {
    readonly captured_at: IsoUtcDateTime;
    readonly latitude: number;
    readonly longitude: number;
    readonly accuracy_meters: number;
    readonly speed_mps?: number | undefined;
    readonly altitude_meters?: number | undefined;
  }[];
  readonly gaps: readonly {
    readonly from: IsoUtcDateTime;
    readonly to: IsoUtcDateTime;
    readonly reason: string;
  }[];
  readonly schema_version: number;
}

export const serializeRideSession = (
  session: RideSession,
): SerializedRideSession => ({
  id: session.id,
  tenant_id: session.tenantId,
  booking_id: session.bookingId,
  user_id: session.userId,
  status: session.status,
  started_at: session.startedAt,
  resumed_at: session.resumedAt,
  ended_at: session.endedAt,
  distance_meters: session.distanceMeters,
  gps_gap_count: session.gpsGapCount,
  created_at: session.createdAt,
  updated_at: session.updatedAt,
  version: session.version,
});

export const serializeRideTrackChunk = (
  chunk: RideTrackChunk,
): SerializedRideTrackChunk => ({
  ride_session_id: chunk.rideSessionId,
  sequence: chunk.sequence,
  checksum: chunk.checksum,
  captured_from: chunk.capturedFrom,
  captured_to: chunk.capturedTo,
  point_count: chunk.pointCount,
  points: chunk.points.map((point) => ({
    captured_at: point.capturedAt,
    latitude: point.latitude,
    longitude: point.longitude,
    accuracy_meters: point.accuracyMeters,
    speed_mps: point.speedMps,
    altitude_meters: point.altitudeMeters,
  })),
  gaps: chunk.gaps.map((gap) => ({
    from: gap.from,
    to: gap.to,
    reason: gap.reason,
  })),
  schema_version: chunk.schemaVersion as number,
});
