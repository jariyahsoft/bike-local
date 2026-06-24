import {
  SecurityError,
  mapSecurityErrorToApiResponse,
} from "../../identity/api/security-error.js";
import {
  authorizeRequest,
  type SecurityPipelineDependencies,
} from "../../identity/application/security-pipeline.js";
import { buildApiErrorResponse } from "../../shared/api/api-error.js";
import {
  DomainError,
  asDomainId,
  type CorrelationId,
  type IsoUtcDateTime,
  type NotificationDeviceId,
  type NotificationId,
} from "../../shared/domain/index.js";
import {
  serializeNotificationDevice,
  serializeNotificationMessage,
  type NotificationService,
} from "../application/notification-service.js";

export interface NotificationApiDependencies {
  readonly security: SecurityPipelineDependencies;
  readonly notificationService: NotificationService;
  readonly now: () => IsoUtcDateTime;
  readonly buildNotificationDeviceId: () => string;
}

const mapDomainError = (error: DomainError, requestId: string) => ({
  status:
    error.code === "NOT_FOUND"
      ? 404
      : error.code === "PERMISSION_DENIED" ||
          error.code === "NOTIFICATION_READ_FORBIDDEN"
        ? 403
        : 422,
  body: buildApiErrorResponse(
    error.code,
    error.message,
    { ...error.details },
    requestId,
  ),
});

export const registerNotificationDeviceEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly body: {
      readonly platform: "IOS" | "ANDROID" | "WEB";
      readonly device_id: string;
      readonly fcm_token: string;
    };
  },
  dependencies: NotificationApiDependencies,
) => {
  try {
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: { appCheck: "required", permissions: [] },
      target: {},
      dependencies: dependencies.security,
    });
    const device = await dependencies.notificationService.registerDeviceToken({
      notificationDeviceId: asDomainId<"NotificationDevice">(
        dependencies.buildNotificationDeviceId(),
      ) as NotificationDeviceId,
      userId: context.user.userId,
      tenantId: context.user.tenantId ?? ("" as never),
      platform: request.body.platform,
      deviceId: request.body.device_id,
      rawToken: request.body.fcm_token,
      now: dependencies.now(),
    });
    return {
      status: 201,
      body: {
        data: serializeNotificationDevice(device),
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const listNotificationsEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
  },
  dependencies: NotificationApiDependencies,
) => {
  try {
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: { appCheck: "required", permissions: [] },
      target: {},
      dependencies: dependencies.security,
    });
    const notifications = await dependencies.notificationService.listInbox({
      tenantId: context.user.tenantId ?? ("" as never),
      userId: context.user.userId,
    });
    return {
      status: 200,
      body: {
        data: notifications.items.map(serializeNotificationMessage),
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const markNotificationReadEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly notificationId: NotificationId;
  },
  dependencies: NotificationApiDependencies,
) => {
  try {
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: { appCheck: "required", permissions: [] },
      target: {},
      dependencies: dependencies.security,
    });
    const notification = await dependencies.notificationService.markRead({
      notificationId: request.notificationId,
      userId: context.user.userId,
      now: dependencies.now(),
    });
    return {
      status: 200,
      body: {
        data: serializeNotificationMessage(notification),
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};
