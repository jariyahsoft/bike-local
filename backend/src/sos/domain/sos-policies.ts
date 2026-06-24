import { DomainError } from "../../shared/domain/domain-error.js";
import {
  asEntityVersion,
  type IsoUtcDateTime,
  type SosCaseId,
  type UserId,
} from "../../shared/domain/index.js";
import type { Booking } from "../../booking/domain/booking-repository.js";
import type { RideSession } from "../../ride/domain/ride-repository.js";
import type {
  SosCase,
  SosCaseStatus,
  SosLocation,
  SosTimelineEvent,
  SosTimelineEventType,
} from "./sos-repository.js";

const ALLOWED_SOS_TRANSITIONS: Readonly<
  Record<SosCaseStatus, readonly SosCaseStatus[]>
> = {
  OPEN: ["ACKNOWLEDGED", "ASSIGNED", "CLOSED"],
  ACKNOWLEDGED: ["ASSIGNED", "CLOSED"],
  ASSIGNED: ["IN_PROGRESS", "RESOLVED", "CLOSED"],
  IN_PROGRESS: ["RESOLVED", "CLOSED"],
  RESOLVED: ["CLOSED"],
  CLOSED: [],
};

export const BIKE_LOCAL_SOS_DISCLAIMER =
  "Bike Local SOS helps coordinate store support. It is not an emergency rescue or medical response service.";

const appendTimelineEvent = (
  timeline: readonly SosTimelineEvent[],
  input: {
    readonly eventType: SosTimelineEventType;
    readonly occurredAt: IsoUtcDateTime;
    readonly actorUserId?: UserId | undefined;
    readonly notes?: string | undefined;
    readonly escalationLevel?: number | undefined;
  },
): readonly SosTimelineEvent[] => [
  ...timeline,
  {
    eventType: input.eventType,
    occurredAt: input.occurredAt,
    actorUserId: input.actorUserId,
    notes: input.notes,
    escalationLevel: input.escalationLevel,
  },
];

export const createSosCaseProfile = (input: {
  readonly sosCaseId: SosCaseId;
  readonly booking: Booking;
  readonly rideSession: RideSession;
  readonly phone: string;
  readonly latestLocation: SosLocation;
  readonly issueType: SosCase["issueType"];
  readonly now: IsoUtcDateTime;
}): SosCase => {
  if (input.booking.status !== "IN_PROGRESS") {
    throw new DomainError(
      "SOS_ACTIVE_RIDE_REQUIRED",
      "SOS can be opened only during an active rental.",
      {
        bookingId: input.booking.id,
        status: input.booking.status,
      },
    );
  }
  if (input.latestLocation.accuracyMeters <= 0) {
    throw new DomainError(
      "SOS_LOCATION_REQUIRED",
      "SOS requires the latest location with accuracy.",
      {},
    );
  }

  return {
    id: input.sosCaseId,
    tenantId: input.booking.tenantId,
    userId: input.booking.userId,
    bookingId: input.booking.id,
    rideSessionId: input.rideSession.id,
    assetId: input.booking.assetIds[0] as SosCase["assetId"],
    storeId: input.booking.storeId,
    branchId: input.booking.branchId,
    phone: input.phone,
    latestLocation: input.latestLocation,
    issueType: input.issueType,
    status: "OPEN",
    disclaimerText: BIKE_LOCAL_SOS_DISCLAIMER,
    escalationLevel: 0,
    timeline: appendTimelineEvent([], {
      eventType: "OPENED",
      occurredAt: input.now,
      actorUserId: input.booking.userId,
    }),
    createdAt: input.now,
    updatedAt: input.now,
    version: asEntityVersion(1),
  };
};

export const transitionSosCase = (
  sosCase: SosCase,
  toStatus: SosCaseStatus,
  input: {
    readonly eventType: SosTimelineEventType;
    readonly occurredAt: IsoUtcDateTime;
    readonly actorUserId?: UserId | undefined;
    readonly notes?: string | undefined;
    readonly assignedStaffUserId?: UserId | undefined;
  },
): SosCase => {
  if (!ALLOWED_SOS_TRANSITIONS[sosCase.status].includes(toStatus)) {
    throw new DomainError(
      "SOS_STATE_TRANSITION_INVALID",
      "SOS case state transition is not allowed.",
      {
        sosCaseId: sosCase.id,
        fromStatus: sosCase.status,
        toStatus,
      },
    );
  }

  return {
    ...sosCase,
    status: toStatus,
    assignedStaffUserId:
      input.assignedStaffUserId === undefined
        ? sosCase.assignedStaffUserId
        : input.assignedStaffUserId,
    timeline: appendTimelineEvent(sosCase.timeline, input),
    updatedAt: input.occurredAt,
    version: asEntityVersion((sosCase.version as number) + 1),
  };
};

export const escalateSosCase = (
  sosCase: SosCase,
  input: {
    readonly occurredAt: IsoUtcDateTime;
    readonly escalationLevel: number;
    readonly notes: string;
  },
): SosCase => ({
  ...sosCase,
  escalationLevel: input.escalationLevel,
  timeline: appendTimelineEvent(sosCase.timeline, {
    eventType: "ESCALATED",
    occurredAt: input.occurredAt,
    notes: input.notes,
    escalationLevel: input.escalationLevel,
  }),
  updatedAt: input.occurredAt,
  version: asEntityVersion((sosCase.version as number) + 1),
});
