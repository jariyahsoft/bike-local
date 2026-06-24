import { DomainError } from "../../shared/domain/domain-error.js";
import {
  asEntityVersion,
  type IdempotencyKey,
  type IsoUtcDateTime,
  type NotificationDeliveryLogId,
  type NotificationDeviceId,
  type NotificationId,
  type TenantId,
  type UserId,
} from "../../shared/domain/index.js";
import type {
  NotificationChannel,
  NotificationDeliveryLog,
  NotificationDeliveryStatus,
  NotificationDevice,
  NotificationEventType,
  NotificationMessage,
} from "./notification-repository.js";

export const createNotificationDeviceProfile = (input: {
  readonly notificationDeviceId: NotificationDeviceId;
  readonly tenantId: TenantId;
  readonly userId: UserId;
  readonly platform: NotificationDevice["platform"];
  readonly deviceId: string;
  readonly tokenReference: string;
  readonly tokenFingerprint: string;
  readonly now: IsoUtcDateTime;
}): NotificationDevice => {
  if (
    input.tokenReference.trim() === "" ||
    input.tokenFingerprint.trim() === "" ||
    input.deviceId.trim() === ""
  ) {
    throw new DomainError(
      "NOTIFICATION_DEVICE_TOKEN_INVALID",
      "Notification device registration requires a protected token reference and fingerprint.",
      {},
    );
  }

  return {
    id: input.notificationDeviceId,
    tenantId: input.tenantId,
    userId: input.userId,
    platform: input.platform,
    deviceId: input.deviceId,
    tokenReference: input.tokenReference,
    tokenFingerprint: input.tokenFingerprint,
    status: "ACTIVE",
    lastSeenAt: input.now,
    createdAt: input.now,
    updatedAt: input.now,
    version: asEntityVersion(1),
  };
};

export const refreshNotificationDevice = (
  device: NotificationDevice,
  now: IsoUtcDateTime,
): NotificationDevice => ({
  ...device,
  status: "ACTIVE",
  lastSeenAt: now,
  updatedAt: now,
  version: asEntityVersion((device.version as number) + 1),
});

export const createNotificationMessageProfile = (input: {
  readonly notificationId: NotificationId;
  readonly tenantId: TenantId;
  readonly recipientUserId: UserId;
  readonly type: NotificationEventType;
  readonly channel: NotificationChannel;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly idempotencyKey?: IdempotencyKey | undefined;
  readonly now: IsoUtcDateTime;
}): NotificationMessage => ({
  id: input.notificationId,
  tenantId: input.tenantId,
  recipientUserId: input.recipientUserId,
  type: input.type,
  channel: input.channel,
  deliveryStatus: "QUEUED",
  payload: input.payload,
  idempotencyKey: input.idempotencyKey,
  createdAt: input.now,
  updatedAt: input.now,
  version: asEntityVersion(1),
});

export const transitionNotificationDeliveryStatus = (
  notification: NotificationMessage,
  status: NotificationDeliveryStatus,
  now: IsoUtcDateTime,
): NotificationMessage => ({
  ...notification,
  deliveryStatus: status,
  ...(status === "READ" ? { readAt: now } : {}),
  lastDeliveryAttemptAt: now,
  updatedAt: now,
  version: asEntityVersion((notification.version as number) + 1),
});

export const createNotificationDeliveryLogProfile = (input: {
  readonly notificationDeliveryLogId: NotificationDeliveryLogId;
  readonly tenantId: TenantId;
  readonly notificationId: NotificationId;
  readonly recipientUserId: UserId;
  readonly deviceId?: NotificationDeviceId | undefined;
  readonly attempt: number;
  readonly status: NotificationDeliveryStatus;
  readonly provider: string;
  readonly providerMessageId?: string | undefined;
  readonly failureReason?: string | undefined;
  readonly now: IsoUtcDateTime;
}): NotificationDeliveryLog => ({
  id: input.notificationDeliveryLogId,
  tenantId: input.tenantId,
  notificationId: input.notificationId,
  recipientUserId: input.recipientUserId,
  deviceId: input.deviceId,
  attempt: input.attempt,
  status: input.status,
  provider: input.provider,
  providerMessageId: input.providerMessageId,
  failureReason: input.failureReason,
  createdAt: input.now,
  updatedAt: input.now,
  version: asEntityVersion(1),
});
