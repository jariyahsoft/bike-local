import type { AuditLogWriter } from "../../identity/application/security-pipeline.js";
import type {
  OutboxEvent,
  OutboxEventRepository,
} from "../../payment/domain/payment-repository.js";
import {
  DomainError,
  asEntityVersion,
  type IsoUtcDateTime,
  type NotificationDeliveryLogId,
  type NotificationDeviceId,
  type NotificationId,
  type OutboxEventId,
  type TenantId,
  type UserId,
} from "../../shared/domain/index.js";
import {
  createNotificationDeliveryLogProfile,
  createNotificationDeviceProfile,
  createNotificationMessageProfile,
  refreshNotificationDevice,
  transitionNotificationDeliveryStatus,
} from "../domain/notification-policies.js";
import type {
  NotificationDeliveryLogRepository,
  NotificationDeviceRepository,
  NotificationEventType,
  NotificationMessage,
  NotificationRepository,
} from "../domain/notification-repository.js";

export interface ProtectedFcmToken {
  readonly tokenReference: string;
  readonly tokenFingerprint: string;
}

export interface FcmTokenProtector {
  protect(token: string): Promise<ProtectedFcmToken>;
}

export interface NotificationProvider {
  readonly providerName: string;
  send(input: {
    readonly tokenReference: string;
    readonly type: NotificationEventType;
    readonly payload: Readonly<Record<string, unknown>>;
  }): Promise<{ readonly providerMessageId: string }>;
}

export interface NotificationServiceDependencies {
  readonly notificationRepository: NotificationRepository;
  readonly notificationDeviceRepository: NotificationDeviceRepository;
  readonly notificationDeliveryLogRepository: NotificationDeliveryLogRepository;
  readonly outboxEventRepository: OutboxEventRepository;
  readonly auditLogWriter: AuditLogWriter;
  readonly fcmTokenProtector: FcmTokenProtector;
}

export class NotificationService {
  constructor(private readonly dependencies: NotificationServiceDependencies) {}

  async registerDeviceToken(input: {
    readonly notificationDeviceId: NotificationDeviceId;
    readonly userId: UserId;
    readonly tenantId: TenantId;
    readonly platform: "IOS" | "ANDROID" | "WEB";
    readonly deviceId: string;
    readonly rawToken: string;
    readonly now: IsoUtcDateTime;
  }) {
    const protectedToken = await this.dependencies.fcmTokenProtector.protect(
      input.rawToken,
    );
    const existing =
      await this.dependencies.notificationDeviceRepository.findByFingerprint(
        input.userId,
        protectedToken.tokenFingerprint,
      );
    if (existing !== null) {
      const refreshed = refreshNotificationDevice(existing, input.now);
      return this.dependencies.notificationDeviceRepository.save(refreshed, {
        expectedVersion: existing.version,
      });
    }

    const device = createNotificationDeviceProfile({
      notificationDeviceId: input.notificationDeviceId,
      tenantId: input.tenantId,
      userId: input.userId,
      platform: input.platform,
      deviceId: input.deviceId,
      tokenReference: protectedToken.tokenReference,
      tokenFingerprint: protectedToken.tokenFingerprint,
      now: input.now,
    });

    return this.dependencies.notificationDeviceRepository.save(device);
  }

  async queueNotifications(input: {
    readonly notificationIds: readonly NotificationId[];
    readonly outboxEventIds: readonly OutboxEventId[];
    readonly tenantId: TenantId;
    readonly recipientUserIds: readonly UserId[];
    readonly type: NotificationEventType;
    readonly payload: Readonly<Record<string, unknown>>;
    readonly channel?: "PUSH" | "INBOX" | undefined;
    readonly now: IsoUtcDateTime;
  }): Promise<readonly NotificationMessage[]> {
    const notifications: NotificationMessage[] = [];
    for (const [index, recipientUserId] of input.recipientUserIds.entries()) {
      const notification = createNotificationMessageProfile({
        notificationId: input.notificationIds[index] as NotificationId,
        tenantId: input.tenantId,
        recipientUserId,
        type: input.type,
        channel: input.channel ?? "PUSH",
        payload: input.payload,
        now: input.now,
      });
      notifications.push(
        await this.dependencies.notificationRepository.save(notification),
      );
      await this.dependencies.outboxEventRepository.save(
        this.buildOutboxEvent({
          id: input.outboxEventIds[index] as OutboxEventId,
          tenantId: input.tenantId,
          type: "notification.dispatch.requested",
          aggregateType: "notification",
          aggregateId: notification.id,
          payload: {
            notification_id: notification.id,
            recipient_user_id: notification.recipientUserId,
            event_type: notification.type,
          },
          now: input.now,
        }),
      );
    }

    return notifications;
  }

  async deliverQueuedNotifications(input: {
    readonly provider: NotificationProvider;
    readonly buildNotificationDeliveryLogId: () => NotificationDeliveryLogId;
    readonly now: IsoUtcDateTime;
  }): Promise<readonly NotificationMessage[]> {
    const queued = await this.dependencies.notificationRepository.search(
      { status: "QUEUED" },
      { limit: 500 },
    );
    const delivered: NotificationMessage[] = [];
    for (const notification of queued.items) {
      const next = await this.deliverNotification(notification, input);
      delivered.push(next);
    }
    return delivered;
  }

  async retryFailedNotifications(input: {
    readonly provider: NotificationProvider;
    readonly buildNotificationDeliveryLogId: () => NotificationDeliveryLogId;
    readonly now: IsoUtcDateTime;
  }): Promise<readonly NotificationMessage[]> {
    const failed = await this.dependencies.notificationRepository.search(
      { status: "FAILED" },
      { limit: 500 },
    );
    const retried: NotificationMessage[] = [];
    for (const notification of failed.items) {
      const requeued = transitionNotificationDeliveryStatus(
        notification,
        "QUEUED",
        input.now,
      );
      await this.dependencies.notificationRepository.save(requeued, {
        expectedVersion: notification.version,
      });
      retried.push(await this.deliverNotification(requeued, input));
    }
    return retried;
  }

  async listInbox(input: {
    readonly tenantId?: TenantId | undefined;
    readonly userId: UserId;
  }) {
    return this.dependencies.notificationRepository.search(
      {
        tenantId: input.tenantId,
        recipientUserId: input.userId,
      },
      { limit: 100 },
    );
  }

  async markRead(input: {
    readonly notificationId: NotificationId;
    readonly userId: UserId;
    readonly now: IsoUtcDateTime;
  }) {
    const notification = await this.getNotification(input.notificationId);
    if (notification.recipientUserId !== input.userId) {
      throw new DomainError(
        "NOTIFICATION_READ_FORBIDDEN",
        "Notification can be read only by its recipient.",
        { notificationId: notification.id },
      );
    }
    if (notification.deliveryStatus === "READ") {
      return notification;
    }
    const updated = transitionNotificationDeliveryStatus(
      notification,
      "READ",
      input.now,
    );
    return this.dependencies.notificationRepository.save(updated, {
      expectedVersion: notification.version,
    });
  }

  async getNotification(notificationId: NotificationId) {
    const notification =
      await this.dependencies.notificationRepository.findById(notificationId);
    if (notification === null) {
      throw new DomainError("NOT_FOUND", "Notification not found.", {
        notificationId,
      });
    }
    return notification;
  }

  async listDeliveryLogs(notificationId: NotificationId) {
    return this.dependencies.notificationDeliveryLogRepository.listByNotificationId(
      notificationId,
    );
  }

  private async deliverNotification(
    notification: NotificationMessage,
    input: {
      readonly provider: NotificationProvider;
      readonly buildNotificationDeliveryLogId: () => NotificationDeliveryLogId;
      readonly now: IsoUtcDateTime;
    },
  ): Promise<NotificationMessage> {
    const devices =
      await this.dependencies.notificationDeviceRepository.listActiveByUserId(
        notification.recipientUserId,
      );
    const previousLogs =
      await this.dependencies.notificationDeliveryLogRepository.listByNotificationId(
        notification.id,
      );
    const attempt = previousLogs.length + 1;
    if (devices.length === 0) {
      await this.dependencies.notificationDeliveryLogRepository.save(
        createNotificationDeliveryLogProfile({
          notificationDeliveryLogId: input.buildNotificationDeliveryLogId(),
          tenantId: notification.tenantId,
          notificationId: notification.id,
          recipientUserId: notification.recipientUserId,
          attempt,
          status: "FAILED",
          provider: input.provider.providerName,
          failureReason: "no_active_device",
          now: input.now,
        }),
      );
      const failed = transitionNotificationDeliveryStatus(
        notification,
        "FAILED",
        input.now,
      );
      return this.dependencies.notificationRepository.save(failed, {
        expectedVersion: notification.version,
      });
    }

    for (const device of devices) {
      try {
        const providerResponse = await input.provider.send({
          tokenReference: device.tokenReference,
          type: notification.type,
          payload: notification.payload,
        });
        await this.dependencies.notificationDeliveryLogRepository.save(
          createNotificationDeliveryLogProfile({
            notificationDeliveryLogId: input.buildNotificationDeliveryLogId(),
            tenantId: notification.tenantId,
            notificationId: notification.id,
            recipientUserId: notification.recipientUserId,
            deviceId: device.id,
            attempt,
            status: "SENT",
            provider: input.provider.providerName,
            providerMessageId: providerResponse.providerMessageId,
            now: input.now,
          }),
        );
        const sent = transitionNotificationDeliveryStatus(
          notification,
          "SENT",
          input.now,
        );
        await this.dependencies.auditLogWriter.append({
          tenantId: notification.tenantId,
          action: "notification.delivery.updated",
          resourceType: "notification",
          resourceId: notification.id,
          actor: {
            actorType: "SERVICE",
            roleNames: [],
          },
          after: {
            delivery_status: "SENT",
            provider: input.provider.providerName,
          },
          metadata: {
            correlationId: "notification-delivery" as never,
            occurredAt: input.now,
            immutable: true,
            classification: "INTERNAL",
          },
        });

        return this.dependencies.notificationRepository.save(sent, {
          expectedVersion: notification.version,
        });
      } catch (error) {
        await this.dependencies.notificationDeliveryLogRepository.save(
          createNotificationDeliveryLogProfile({
            notificationDeliveryLogId: input.buildNotificationDeliveryLogId(),
            tenantId: notification.tenantId,
            notificationId: notification.id,
            recipientUserId: notification.recipientUserId,
            deviceId: device.id,
            attempt,
            status: "FAILED",
            provider: input.provider.providerName,
            failureReason: error instanceof Error ? error.message : "unknown",
            now: input.now,
          }),
        );
      }
    }

    const failed = transitionNotificationDeliveryStatus(
      notification,
      "FAILED",
      input.now,
    );
    return this.dependencies.notificationRepository.save(failed, {
      expectedVersion: notification.version,
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

export interface SerializedNotificationDevice {
  readonly id: NotificationDeviceId;
  readonly tenant_id: TenantId;
  readonly user_id: UserId;
  readonly platform: "IOS" | "ANDROID" | "WEB";
  readonly device_id: string;
  readonly token_fingerprint: string;
  readonly status: "ACTIVE" | "REVOKED";
  readonly last_seen_at: IsoUtcDateTime;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: number;
}

export interface SerializedNotificationMessage {
  readonly id: NotificationId;
  readonly tenant_id: TenantId;
  readonly recipient_user_id: UserId;
  readonly type: NotificationEventType;
  readonly channel: "PUSH" | "INBOX";
  readonly delivery_status: "QUEUED" | "SENT" | "DELIVERED" | "FAILED" | "READ";
  readonly payload: Readonly<Record<string, unknown>>;
  readonly read_at?: IsoUtcDateTime | undefined;
  readonly last_delivery_attempt_at?: IsoUtcDateTime | undefined;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: number;
}

export const serializeNotificationDevice = (
  device: Awaited<ReturnType<NotificationService["registerDeviceToken"]>>,
): SerializedNotificationDevice => ({
  id: device.id,
  tenant_id: device.tenantId,
  user_id: device.userId,
  platform: device.platform,
  device_id: device.deviceId,
  token_fingerprint: device.tokenFingerprint,
  status: device.status,
  last_seen_at: device.lastSeenAt,
  created_at: device.createdAt,
  updated_at: device.updatedAt,
  version: device.version as number,
});

export const serializeNotificationMessage = (
  notification: NotificationMessage,
): SerializedNotificationMessage => ({
  id: notification.id,
  tenant_id: notification.tenantId,
  recipient_user_id: notification.recipientUserId,
  type: notification.type,
  channel: notification.channel,
  delivery_status: notification.deliveryStatus,
  payload: notification.payload,
  read_at: notification.readAt,
  last_delivery_attempt_at: notification.lastDeliveryAttemptAt,
  created_at: notification.createdAt,
  updated_at: notification.updatedAt,
  version: notification.version as number,
});
