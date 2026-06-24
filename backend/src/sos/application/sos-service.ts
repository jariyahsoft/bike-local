import type { AuditLogWriter } from "../../identity/application/security-pipeline.js";
import type {
  OutboxEvent,
  OutboxEventRepository,
} from "../../payment/domain/payment-repository.js";
import {
  DomainError,
  asEntityVersion,
  type IsoUtcDateTime,
  type OutboxEventId,
  type RideSessionId,
  type SosCaseId,
  type TenantId,
  type UserId,
} from "../../shared/domain/index.js";
import type { BookingService } from "../../booking/application/booking-service.js";
import type { RideRepository } from "../../ride/domain/ride-repository.js";
import type { StoreMemberRepository } from "../../stores/domain/store-repository.js";
import type { NotificationService } from "../../notifications/application/notification-service.js";
import {
  BIKE_LOCAL_SOS_DISCLAIMER,
  createSosCaseProfile,
  escalateSosCase,
  transitionSosCase,
} from "../domain/sos-policies.js";
import type { SosCase, SosRepository } from "../domain/sos-repository.js";

export interface SosEscalationPolicy {
  readonly managerEscalationMinutes: number;
  readonly ownerEscalationMinutes: number;
}

export interface SosServiceDependencies {
  readonly bookingService: BookingService;
  readonly rideRepository: RideRepository;
  readonly sosRepository: SosRepository;
  readonly storeMemberRepository: StoreMemberRepository;
  readonly notificationService: NotificationService;
  readonly outboxEventRepository: OutboxEventRepository;
  readonly auditLogWriter: AuditLogWriter;
  readonly escalationPolicy: SosEscalationPolicy;
}

export class SosService {
  constructor(private readonly dependencies: SosServiceDependencies) {}

  async createSosCase(input: {
    readonly sosCaseId: SosCaseId;
    readonly outboxEventIds: readonly OutboxEventId[];
    readonly bookingId: SosCase["bookingId"];
    readonly rideSessionId?: RideSessionId | undefined;
    readonly actorUserId: UserId;
    readonly phone: string;
    readonly latestLocation: SosCase["latestLocation"];
    readonly issueType: SosCase["issueType"];
    readonly now: IsoUtcDateTime;
  }): Promise<SosCase> {
    const booking = await this.dependencies.bookingService.getBooking(
      input.bookingId,
    );
    if (booking.userId !== input.actorUserId) {
      throw new DomainError(
        "PERMISSION_DENIED",
        "SOS can be opened only by the booking renter.",
        { bookingId: booking.id },
      );
    }
    const existing =
      await this.dependencies.sosRepository.findActiveByBookingId(booking.id);
    if (existing !== null) {
      return existing;
    }

    const rideSession = await this.resolveActiveRideSession(
      booking.tenantId,
      booking.id,
      input.rideSessionId,
    );
    const sosCase = createSosCaseProfile({
      sosCaseId: input.sosCaseId,
      booking,
      rideSession,
      phone: input.phone,
      latestLocation: input.latestLocation,
      issueType: input.issueType,
      now: input.now,
    });
    const saved = await this.dependencies.sosRepository.save(sosCase);
    await this.notifyBranchStaff(saved, input.outboxEventIds, input.now);
    await this.appendAudit(saved, input.actorUserId, input.now, "opened");

    return saved;
  }

  async acknowledge(input: {
    readonly sosCaseId: SosCaseId;
    readonly actorUserId: UserId;
    readonly notes?: string | undefined;
    readonly now: IsoUtcDateTime;
  }) {
    const sosCase = await this.getSosCase(input.sosCaseId);
    const updated = transitionSosCase(sosCase, "ACKNOWLEDGED", {
      eventType: "ACKNOWLEDGED",
      occurredAt: input.now,
      actorUserId: input.actorUserId,
      notes: input.notes,
    });
    const saved = await this.dependencies.sosRepository.save(updated, {
      expectedVersion: sosCase.version,
    });
    await this.appendAudit(saved, input.actorUserId, input.now, "acknowledged");
    return saved;
  }

  async assign(input: {
    readonly sosCaseId: SosCaseId;
    readonly actorUserId: UserId;
    readonly assignedStaffUserId: UserId;
    readonly outboxEventIds: readonly OutboxEventId[];
    readonly notes?: string | undefined;
    readonly now: IsoUtcDateTime;
  }) {
    const sosCase = await this.getSosCase(input.sosCaseId);
    const updated = transitionSosCase(sosCase, "ASSIGNED", {
      eventType: "ASSIGNED",
      occurredAt: input.now,
      actorUserId: input.actorUserId,
      assignedStaffUserId: input.assignedStaffUserId,
      notes: input.notes,
    });
    const saved = await this.dependencies.sosRepository.save(updated, {
      expectedVersion: sosCase.version,
    });
    await this.dependencies.notificationService.queueNotifications({
      notificationIds: input.outboxEventIds.map((id) => `${id}_notif` as never),
      outboxEventIds: input.outboxEventIds,
      tenantId: saved.tenantId,
      recipientUserIds: [input.assignedStaffUserId],
      type: "SOS_ASSIGNED",
      payload: {
        sos_case_id: saved.id,
        booking_id: saved.bookingId,
        disclaimer_text: BIKE_LOCAL_SOS_DISCLAIMER,
      },
      now: input.now,
    });
    await this.appendAudit(saved, input.actorUserId, input.now, "assigned");
    return saved;
  }

  async startHandling(input: {
    readonly sosCaseId: SosCaseId;
    readonly actorUserId: UserId;
    readonly notes?: string | undefined;
    readonly now: IsoUtcDateTime;
  }) {
    const sosCase = await this.getSosCase(input.sosCaseId);
    if (sosCase.assignedStaffUserId === undefined) {
      throw new DomainError(
        "SOS_ASSIGNMENT_REQUIRED",
        "SOS case must be assigned before handling starts.",
        { sosCaseId: sosCase.id },
      );
    }
    const updated = transitionSosCase(sosCase, "IN_PROGRESS", {
      eventType: "STARTED",
      occurredAt: input.now,
      actorUserId: input.actorUserId,
      notes: input.notes,
    });
    const saved = await this.dependencies.sosRepository.save(updated, {
      expectedVersion: sosCase.version,
    });
    await this.appendAudit(saved, input.actorUserId, input.now, "started");
    return saved;
  }

  async resolve(input: {
    readonly sosCaseId: SosCaseId;
    readonly actorUserId: UserId;
    readonly notes: string;
    readonly now: IsoUtcDateTime;
  }) {
    const sosCase = await this.getSosCase(input.sosCaseId);
    const updated = transitionSosCase(sosCase, "RESOLVED", {
      eventType: "RESOLVED",
      occurredAt: input.now,
      actorUserId: input.actorUserId,
      notes: input.notes,
    });
    const saved = await this.dependencies.sosRepository.save(updated, {
      expectedVersion: sosCase.version,
    });
    await this.appendAudit(saved, input.actorUserId, input.now, "resolved");
    return saved;
  }

  async close(input: {
    readonly sosCaseId: SosCaseId;
    readonly actorUserId: UserId;
    readonly notes: string;
    readonly now: IsoUtcDateTime;
  }) {
    const sosCase = await this.getSosCase(input.sosCaseId);
    const updated = transitionSosCase(sosCase, "CLOSED", {
      eventType: "CLOSED",
      occurredAt: input.now,
      actorUserId: input.actorUserId,
      notes: input.notes,
    });
    const saved = await this.dependencies.sosRepository.save(updated, {
      expectedVersion: sosCase.version,
    });
    await this.appendAudit(saved, input.actorUserId, input.now, "closed");
    return saved;
  }

  async runEscalations(input: {
    readonly notificationIds: readonly string[];
    readonly outboxEventIds: readonly OutboxEventId[];
    readonly now: IsoUtcDateTime;
  }) {
    const activeCases = await this.dependencies.sosRepository.search(
      {},
      { limit: 500 },
    );
    const escalated: SosCase[] = [];
    let notificationCursor = 0;
    for (const sosCase of activeCases.items) {
      if (!["OPEN", "ACKNOWLEDGED"].includes(sosCase.status)) {
        continue;
      }
      const minutesOpen =
        (Date.parse(input.now) - Date.parse(sosCase.createdAt)) / 60000;
      if (
        sosCase.escalationLevel === 0 &&
        minutesOpen >=
          this.dependencies.escalationPolicy.managerEscalationMinutes
      ) {
        const recipients = await this.getEscalationRecipients(
          sosCase,
          "manager",
        );
        if (recipients.length > 0) {
          const notificationIds = recipients.map(
            (_, index) =>
              input.notificationIds[notificationCursor + index] as never,
          );
          const outboxEventIds = recipients.map(
            (_, index) =>
              input.outboxEventIds[notificationCursor + index] as OutboxEventId,
          );
          const updated = await this.dependencies.sosRepository.save(
            escalateSosCase(sosCase, {
              occurredAt: input.now,
              escalationLevel: 1,
              notes: "manager escalation",
            }),
            { expectedVersion: sosCase.version },
          );
          await this.dependencies.notificationService.queueNotifications({
            notificationIds,
            outboxEventIds,
            tenantId: updated.tenantId,
            recipientUserIds: recipients,
            type: "SOS_ASSIGNED",
            payload: {
              sos_case_id: updated.id,
              escalation_level: 1,
            },
            now: input.now,
          });
          notificationCursor += recipients.length;
          escalated.push(updated);
        }
        continue;
      }
      if (
        sosCase.escalationLevel === 1 &&
        minutesOpen >= this.dependencies.escalationPolicy.ownerEscalationMinutes
      ) {
        const recipients = await this.getEscalationRecipients(sosCase, "owner");
        if (recipients.length > 0) {
          const notificationIds = recipients.map(
            (_, index) =>
              input.notificationIds[notificationCursor + index] as never,
          );
          const outboxEventIds = recipients.map(
            (_, index) =>
              input.outboxEventIds[notificationCursor + index] as OutboxEventId,
          );
          const updated = await this.dependencies.sosRepository.save(
            escalateSosCase(sosCase, {
              occurredAt: input.now,
              escalationLevel: 2,
              notes: "owner escalation",
            }),
            { expectedVersion: sosCase.version },
          );
          await this.dependencies.notificationService.queueNotifications({
            notificationIds,
            outboxEventIds,
            tenantId: updated.tenantId,
            recipientUserIds: recipients,
            type: "SOS_ASSIGNED",
            payload: {
              sos_case_id: updated.id,
              escalation_level: 2,
            },
            now: input.now,
          });
          notificationCursor += recipients.length;
          escalated.push(updated);
        }
      }
    }
    return escalated;
  }

  async getSosCase(sosCaseId: SosCaseId): Promise<SosCase> {
    const sosCase = await this.dependencies.sosRepository.findById(sosCaseId);
    if (sosCase === null) {
      throw new DomainError("NOT_FOUND", "SOS case not found.", { sosCaseId });
    }
    return sosCase;
  }

  private async resolveActiveRideSession(
    tenantId: TenantId,
    bookingId: SosCase["bookingId"],
    rideSessionId?: RideSessionId | undefined,
  ) {
    if (rideSessionId !== undefined) {
      const session =
        await this.dependencies.rideRepository.findById(rideSessionId);
      if (session !== null && session.status === "ACTIVE") {
        return session;
      }
    }
    const sessions = await this.dependencies.rideRepository.search(
      {
        tenantId,
        bookingId,
        status: "ACTIVE",
      },
      { limit: 10 },
    );
    const active = sessions.items[0];
    if (active === undefined) {
      throw new DomainError(
        "SOS_ACTIVE_RIDE_REQUIRED",
        "SOS requires an active ride session.",
        { bookingId },
      );
    }
    return active;
  }

  private async notifyBranchStaff(
    sosCase: SosCase,
    outboxEventIds: readonly OutboxEventId[],
    now: IsoUtcDateTime,
  ) {
    const recipients = await this.getEscalationRecipients(sosCase, "staff");
    if (recipients.length === 0) {
      return;
    }
    await this.dependencies.notificationService.queueNotifications({
      notificationIds: recipients.map(
        (_, index) => `${outboxEventIds[index]}_notif` as never,
      ),
      outboxEventIds: outboxEventIds.slice(0, recipients.length),
      tenantId: sosCase.tenantId,
      recipientUserIds: recipients,
      type: "SOS_OPENED",
      payload: {
        sos_case_id: sosCase.id,
        booking_id: sosCase.bookingId,
        issue_type: sosCase.issueType,
        disclaimer_text: sosCase.disclaimerText,
      },
      now,
    });
    await this.dependencies.outboxEventRepository.save(
      this.buildOutboxEvent({
        id: outboxEventIds[0] as OutboxEventId,
        tenantId: sosCase.tenantId,
        type: "sos.opened",
        aggregateType: "sos_case",
        aggregateId: sosCase.id,
        payload: {
          sos_case_id: sosCase.id,
          branch_id: sosCase.branchId,
          store_id: sosCase.storeId,
        },
        now,
      }),
    );
  }

  private async getEscalationRecipients(
    sosCase: SosCase,
    level: "staff" | "manager" | "owner",
  ): Promise<readonly UserId[]> {
    const members = await this.dependencies.storeMemberRepository.listByStoreId(
      sosCase.storeId,
    );
    return members
      .filter((member) => member.status === "ACTIVE")
      .filter((member) =>
        level === "owner"
          ? member.role === "STORE_OWNER"
          : level === "manager"
            ? member.role === "STORE_MANAGER" &&
              member.branchIds.includes(sosCase.branchId)
            : member.role === "STORE_STAFF" &&
              member.branchIds.includes(sosCase.branchId),
      )
      .map((member) => member.userId);
  }

  private async appendAudit(
    sosCase: SosCase,
    actorUserId: UserId,
    now: IsoUtcDateTime,
    actionState: string,
  ) {
    await this.dependencies.auditLogWriter.append({
      tenantId: sosCase.tenantId,
      action: "sos.case.updated",
      resourceType: "sos_case",
      resourceId: sosCase.id,
      actor: {
        actorType: "USER",
        actorUserId,
        roleNames: [],
      },
      after: {
        status: sosCase.status,
        issue_type: sosCase.issueType,
        action_state: actionState,
      },
      metadata: {
        correlationId: "sos-update" as never,
        occurredAt: now,
        immutable: true,
        classification: "SENSITIVE_LOCATION",
      },
    });
  }

  private buildOutboxEvent(input: {
    readonly id: OutboxEventId;
    readonly tenantId: TenantId;
    readonly type: string;
    readonly aggregateType: string;
    readonly aggregateId: string;
    readonly payload: Readonly<Record<string, unknown>>;
    readonly now: IsoUtcDateTime;
  }): OutboxEvent {
    return {
      id: input.id,
      tenantId: input.tenantId,
      type: input.type,
      aggregateType: input.aggregateType,
      aggregateId: input.aggregateId,
      payload: input.payload,
      occurredAt: input.now,
      createdAt: input.now,
      updatedAt: input.now,
      version: asEntityVersion(1),
    };
  }
}

export interface SerializedSosCase {
  readonly id: SosCaseId;
  readonly tenant_id: TenantId;
  readonly user_id: UserId;
  readonly booking_id: SosCase["bookingId"];
  readonly ride_session_id: RideSessionId;
  readonly asset_id: SosCase["assetId"];
  readonly store_id: SosCase["storeId"];
  readonly branch_id: SosCase["branchId"];
  readonly phone: string;
  readonly latest_location: {
    readonly latitude: number;
    readonly longitude: number;
    readonly accuracy_meters: number;
  };
  readonly issue_type: SosCase["issueType"];
  readonly status: SosCase["status"];
  readonly disclaimer_text: string;
  readonly escalation_level: number;
  readonly assigned_staff_user_id?: UserId | undefined;
  readonly timeline: readonly {
    readonly event_type: string;
    readonly occurred_at: IsoUtcDateTime;
    readonly actor_user_id?: UserId | undefined;
    readonly notes?: string | undefined;
    readonly escalation_level?: number | undefined;
  }[];
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: number;
}

export const serializeSosCase = (sosCase: SosCase): SerializedSosCase => ({
  id: sosCase.id,
  tenant_id: sosCase.tenantId,
  user_id: sosCase.userId,
  booking_id: sosCase.bookingId,
  ride_session_id: sosCase.rideSessionId,
  asset_id: sosCase.assetId,
  store_id: sosCase.storeId,
  branch_id: sosCase.branchId,
  phone: sosCase.phone,
  latest_location: {
    latitude: sosCase.latestLocation.latitude,
    longitude: sosCase.latestLocation.longitude,
    accuracy_meters: sosCase.latestLocation.accuracyMeters,
  },
  issue_type: sosCase.issueType,
  status: sosCase.status,
  disclaimer_text: sosCase.disclaimerText,
  escalation_level: sosCase.escalationLevel,
  assigned_staff_user_id: sosCase.assignedStaffUserId,
  timeline: sosCase.timeline.map((event) => ({
    event_type: event.eventType,
    occurred_at: event.occurredAt,
    actor_user_id: event.actorUserId,
    notes: event.notes,
    escalation_level: event.escalationLevel,
  })),
  created_at: sosCase.createdAt,
  updated_at: sosCase.updatedAt,
  version: sosCase.version as number,
});
