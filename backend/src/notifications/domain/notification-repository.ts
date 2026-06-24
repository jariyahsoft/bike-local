import type {
  EntityTimestamps,
  IdempotencyKey,
  IsoUtcDateTime,
  NotificationDeliveryLogId,
  NotificationDeviceId,
  NotificationId,
  Page,
  PageRequest,
  SaveOptions,
  TenantId,
  TenantScopedEntity,
  UserId,
  VersionedEntity,
} from "../../shared/domain/index.js";
import type { Repository } from "../../shared/domain/index.js";

export type NotificationEventType =
  | "BOOKING_CREATED"
  | "BOOKING_CONFIRMED"
  | "PAYMENT_COMPLETED"
  | "CASH_PAYMENT_SELECTED"
  | "STAFF_TASK_ASSIGNED"
  | "RENTAL_STARTED"
  | "RENTAL_NEAR_EXPIRY"
  | "RENTAL_OVERDUE"
  | "RETURN_REQUESTED"
  | "RETURN_ACCEPTED"
  | "SOS_OPENED"
  | "SOS_ASSIGNED"
  | "REFUND_COMPLETED";
export type NotificationDeliveryStatus =
  | "QUEUED"
  | "SENT"
  | "DELIVERED"
  | "FAILED"
  | "READ";
export type NotificationChannel = "PUSH" | "INBOX";
export type NotificationDevicePlatform = "IOS" | "ANDROID" | "WEB";
export type NotificationDeviceStatus = "ACTIVE" | "REVOKED";

export interface NotificationDevice
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: NotificationDeviceId;
  readonly userId: UserId;
  readonly platform: NotificationDevicePlatform;
  readonly deviceId: string;
  readonly tokenReference: string;
  readonly tokenFingerprint: string;
  readonly status: NotificationDeviceStatus;
  readonly lastSeenAt: IsoUtcDateTime;
}

export interface NotificationMessage
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: NotificationId;
  readonly recipientUserId: UserId;
  readonly type: NotificationEventType;
  readonly channel: NotificationChannel;
  readonly deliveryStatus: NotificationDeliveryStatus;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly idempotencyKey?: IdempotencyKey | undefined;
  readonly readAt?: IsoUtcDateTime | undefined;
  readonly lastDeliveryAttemptAt?: IsoUtcDateTime | undefined;
}

export interface NotificationDeliveryLog
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: NotificationDeliveryLogId;
  readonly notificationId: NotificationId;
  readonly recipientUserId: UserId;
  readonly deviceId?: NotificationDeviceId | undefined;
  readonly attempt: number;
  readonly status: NotificationDeliveryStatus;
  readonly provider: string;
  readonly providerMessageId?: string | undefined;
  readonly failureReason?: string | undefined;
}

export interface NotificationSearchFilter {
  readonly tenantId?: TenantId | undefined;
  readonly recipientUserId?: UserId | undefined;
  readonly status?: NotificationDeliveryStatus | undefined;
}

export interface NotificationDeviceRepository extends Repository<
  NotificationDevice,
  NotificationDeviceId
> {
  findByFingerprint(
    userId: UserId,
    tokenFingerprint: string,
  ): Promise<NotificationDevice | null>;
  listActiveByUserId(userId: UserId): Promise<readonly NotificationDevice[]>;
  save(
    device: NotificationDevice,
    options?: SaveOptions,
  ): Promise<NotificationDevice>;
}

export interface NotificationRepository extends Repository<
  NotificationMessage,
  NotificationId
> {
  search(
    filter: NotificationSearchFilter,
    page: PageRequest,
  ): Promise<Page<NotificationMessage>>;
  save(
    notification: NotificationMessage,
    options?: SaveOptions,
  ): Promise<NotificationMessage>;
}

export interface NotificationDeliveryLogRepository extends Repository<
  NotificationDeliveryLog,
  NotificationDeliveryLogId
> {
  listByNotificationId(
    notificationId: NotificationId,
  ): Promise<readonly NotificationDeliveryLog[]>;
  save(
    log: NotificationDeliveryLog,
    options?: SaveOptions,
  ): Promise<NotificationDeliveryLog>;
}
