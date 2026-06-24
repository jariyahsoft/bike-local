import type {
  CorrelationId,
  IsoUtcDateTime,
  TenantId,
  UserId,
} from "../../shared/domain/index.js";

export type AuditClassification =
  | "PUBLIC"
  | "INTERNAL"
  | "CONFIDENTIAL"
  | "SENSITIVE_LOCATION"
  | "FINANCIAL";
export type AuditActorType = "USER" | "SERVICE" | "SYSTEM";

export interface AuditActor {
  readonly actorType: AuditActorType;
  readonly actorUserId?: UserId;
  readonly firebaseUid?: string;
  readonly roleNames: readonly string[];
  readonly ipHash?: string;
  readonly userAgent?: string;
}

export interface AuditLogEntry {
  readonly tenantId?: TenantId;
  readonly action:
    | "permission.changed"
    | "payment.cash.confirmed"
    | "booking.state.changed"
    | "return.confirmed"
    | "damage_fee.edited"
    | "payment.refunded"
    | "account.suspended"
    | "account.deletion.requested"
    | "store.submitted"
    | "store.approval.decided"
    | "branch.temporarily_closed"
    | "content.approved"
    | "content.rejected"
    | "content.reported"
    | "review.hidden"
    | "sos.case.updated"
    | "notification.delivery.updated"
    | "settlement.state.changed"
    | "report.export.created"
    | "admin.action";
  readonly resourceType: string;
  readonly resourceId: string;
  readonly actor: AuditActor;
  readonly reason?: string;
  readonly before?: Record<string, unknown>;
  readonly after?: Record<string, unknown>;
  readonly metadata: {
    readonly correlationId: CorrelationId;
    readonly occurredAt: IsoUtcDateTime;
    readonly immutable: true;
    readonly classification: AuditClassification;
  };
}

export interface AuditRetentionRule {
  readonly className: AuditClassification;
  readonly minimumRetention: string;
  readonly purpose: string;
}

export interface RetentionOpenQuestion {
  readonly id: string;
  readonly topic: string;
  readonly currentProposal: string;
}

export const AUDIT_RETENTION_RULES: readonly AuditRetentionRule[] = [
  {
    className: "FINANCIAL",
    minimumRetention: "7 years or local statutory minimum, whichever is longer",
    purpose: "Payment, refund, cash confirmation, and settlement traceability.",
  },
  {
    className: "CONFIDENTIAL",
    minimumRetention: "3 years after case closure unless legal hold applies",
    purpose:
      "Permission changes, suspensions, content moderation, and support actions.",
  },
  {
    className: "SENSITIVE_LOCATION",
    minimumRetention:
      "30 days proposed for raw coordinates in incident workflows",
    purpose:
      "SOS and active incident investigation with strict access controls.",
  },
  {
    className: "INTERNAL",
    minimumRetention: "1 year proposed",
    purpose: "Operational traceability without unnecessary PII retention.",
  },
  {
    className: "PUBLIC",
    minimumRetention: "Not applicable for audit-only use",
    purpose: "Rare for audit logs; included for completeness.",
  },
];

export const RETENTION_OPEN_QUESTIONS: readonly RetentionOpenQuestion[] = [
  {
    id: "RET-001",
    topic: "Raw GPS ride-track retention",
    currentProposal:
      "Keep chunk-level coordinates for 30 days, then delete or aggregate unless a dispute, SOS, or fraud/legal hold remains open.",
  },
  {
    id: "RET-002",
    topic: "PII deletion after account deletion request",
    currentProposal:
      "Pseudonymize user-facing profile data quickly, but retain legally required payment, refund, audit, and dispute records behind restricted access.",
  },
  {
    id: "RET-003",
    topic: "Merchant identity and evidence document retention",
    currentProposal:
      "Retain approval and compliance evidence through the merchant relationship plus statutory tail period, with no direct client reads.",
  },
];

const REDACTED_KEYS = new Set([
  "authorization",
  "token",
  "id_token",
  "refresh_token",
  "app_check_token",
  "otp",
  "password",
  "document_image_url",
  "document_number",
]);

const REMOVED_KEYS = new Set([
  "latitude",
  "longitude",
  "coordinates",
  "gps_points",
  "gps_track",
  "polyline",
  "raw_location",
]);

export const sanitizeAuditPayload = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeAuditPayload(item));
  }

  if (value === null || typeof value !== "object") {
    return value;
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, nestedValue] of Object.entries(
    value as Record<string, unknown>,
  )) {
    const normalizedKey = key.toLowerCase();
    if (REMOVED_KEYS.has(normalizedKey)) {
      continue;
    }

    if (REDACTED_KEYS.has(normalizedKey)) {
      sanitized[key] = "[REDACTED]";
      continue;
    }

    sanitized[key] = sanitizeAuditPayload(nestedValue);
  }

  return sanitized;
};
