import {
  buildApiErrorResponse,
  type ApiErrorResponse,
} from "../../shared/api/api-error.js";

export type SecurityErrorKind =
  | "unauthenticated"
  | "unauthorized"
  | "app_check_required"
  | "app_check_invalid"
  | "permission_denied";

export type SecurityErrorCode =
  | "AUTH_UNAUTHENTICATED"
  | "AUTH_INVALID_TOKEN"
  | "AUTH_APP_CHECK_REQUIRED"
  | "AUTH_APP_CHECK_INVALID"
  | "PERMISSION_DENIED";

export interface SecurityApiError {
  readonly status: 401 | 403;
  readonly code: SecurityErrorCode;
  readonly message: string;
}

const SECURITY_API_ERRORS: Record<SecurityErrorKind, SecurityApiError> = {
  unauthenticated: {
    status: 401,
    code: "AUTH_UNAUTHENTICATED",
    message: "Authentication is required for this endpoint.",
  },
  unauthorized: {
    status: 401,
    code: "AUTH_INVALID_TOKEN",
    message: "The supplied authentication token is invalid or expired.",
  },
  app_check_required: {
    status: 403,
    code: "AUTH_APP_CHECK_REQUIRED",
    message: "App Check is required for this endpoint.",
  },
  app_check_invalid: {
    status: 403,
    code: "AUTH_APP_CHECK_INVALID",
    message: "The supplied App Check token is invalid.",
  },
  permission_denied: {
    status: 403,
    code: "PERMISSION_DENIED",
    message: "The caller does not have permission to perform this action.",
  },
};

export class SecurityError extends Error {
  public readonly status: 401 | 403;
  public readonly code: SecurityErrorCode;

  constructor(
    public readonly kind: SecurityErrorKind,
    message?: string,
    public readonly details: Readonly<Record<string, unknown>> = {},
  ) {
    super(message ?? SECURITY_API_ERRORS[kind].message);
    this.name = "SecurityError";
    this.status = SECURITY_API_ERRORS[kind].status;
    this.code = SECURITY_API_ERRORS[kind].code;
  }
}

export const mapSecurityErrorToApiResponse = (
  error: SecurityError,
  requestId: string,
): {
  readonly status: 401 | 403;
  readonly body: ApiErrorResponse;
} => ({
  status: error.status,
  body: buildApiErrorResponse(
    error.code,
    error.message,
    { ...error.details },
    requestId,
  ),
});
