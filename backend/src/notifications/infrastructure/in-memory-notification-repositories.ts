import { DomainError } from "../../shared/domain/index.js";
import type {
  Page,
  PageRequest,
  SaveOptions,
} from "../../shared/domain/index.js";
import type {
  NotificationDeliveryLog,
  NotificationDeliveryLogRepository,
  NotificationDevice,
  NotificationDeviceRepository,
  NotificationMessage,
  NotificationRepository,
  NotificationSearchFilter,
} from "../domain/notification-repository.js";

const assertExpectedVersion = <T extends { readonly version: unknown }>(
  current: T | undefined,
  expectedVersion: SaveOptions["expectedVersion"],
  message: string,
  details: Readonly<Record<string, unknown>>,
): void => {
  if (expectedVersion !== undefined && current?.version !== expectedVersion) {
    throw new DomainError("VERSION_CONFLICT", message, details);
  }
};

export class InMemoryNotificationDeviceRepository implements NotificationDeviceRepository {
  private readonly devices = new Map<
    NotificationDevice["id"],
    NotificationDevice
  >();

  async findById(
    id: NotificationDevice["id"],
  ): Promise<NotificationDevice | null> {
    return this.devices.get(id) ?? null;
  }

  async findByFingerprint(
    userId: NotificationDevice["userId"],
    tokenFingerprint: string,
  ): Promise<NotificationDevice | null> {
    return (
      [...this.devices.values()].find(
        (device) =>
          device.userId === userId &&
          device.tokenFingerprint === tokenFingerprint,
      ) ?? null
    );
  }

  async listActiveByUserId(
    userId: NotificationDevice["userId"],
  ): Promise<readonly NotificationDevice[]> {
    return [...this.devices.values()].filter(
      (device) => device.userId === userId && device.status === "ACTIVE",
    );
  }

  async save(
    device: NotificationDevice,
    options?: SaveOptions,
  ): Promise<NotificationDevice> {
    assertExpectedVersion(
      this.devices.get(device.id),
      options?.expectedVersion,
      "Notification device version conflict",
      { notificationDeviceId: device.id },
    );
    this.devices.set(device.id, device);
    return device;
  }
}

export class InMemoryNotificationRepository implements NotificationRepository {
  private readonly notifications = new Map<
    NotificationMessage["id"],
    NotificationMessage
  >();

  async findById(
    id: NotificationMessage["id"],
  ): Promise<NotificationMessage | null> {
    return this.notifications.get(id) ?? null;
  }

  async search(
    filter: NotificationSearchFilter,
    page: PageRequest,
  ): Promise<Page<NotificationMessage>> {
    const items = [...this.notifications.values()]
      .filter(
        (notification) =>
          filter.tenantId === undefined ||
          notification.tenantId === filter.tenantId,
      )
      .filter(
        (notification) =>
          filter.recipientUserId === undefined ||
          notification.recipientUserId === filter.recipientUserId,
      )
      .filter(
        (notification) =>
          filter.status === undefined ||
          notification.deliveryStatus === filter.status,
      )
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .slice(0, page.limit);

    return { items };
  }

  async save(
    notification: NotificationMessage,
    options?: SaveOptions,
  ): Promise<NotificationMessage> {
    assertExpectedVersion(
      this.notifications.get(notification.id),
      options?.expectedVersion,
      "Notification version conflict",
      { notificationId: notification.id },
    );
    this.notifications.set(notification.id, notification);
    return notification;
  }
}

export class InMemoryNotificationDeliveryLogRepository implements NotificationDeliveryLogRepository {
  private readonly logs = new Map<
    NotificationDeliveryLog["id"],
    NotificationDeliveryLog
  >();

  async findById(
    id: NotificationDeliveryLog["id"],
  ): Promise<NotificationDeliveryLog | null> {
    return this.logs.get(id) ?? null;
  }

  async listByNotificationId(
    notificationId: NotificationDeliveryLog["notificationId"],
  ): Promise<readonly NotificationDeliveryLog[]> {
    return [...this.logs.values()]
      .filter((log) => log.notificationId === notificationId)
      .sort((left, right) => left.attempt - right.attempt);
  }

  async save(
    log: NotificationDeliveryLog,
    options?: SaveOptions,
  ): Promise<NotificationDeliveryLog> {
    assertExpectedVersion(
      this.logs.get(log.id),
      options?.expectedVersion,
      "Notification delivery log version conflict",
      { notificationDeliveryLogId: log.id },
    );
    this.logs.set(log.id, log);
    return log;
  }
}
