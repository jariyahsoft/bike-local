# 07 Security Rules

Source: `docs/Bike-Local-SRS.md` sections 4.2, 6, 7.29, 10, 11, 12.4, 12.5, 14.6

## Threat Model Summary

| Threat                                       | Primary control                                                      |
| -------------------------------------------- | -------------------------------------------------------------------- |
| Unauthenticated API access                   | Firebase ID token verification in backend middleware                 |
| App-origin spoofing                          | App Check verification on protected mobile/web endpoints             |
| Cross-tenant or cross-branch access          | Default-deny RBAC plus tenant/store/branch scope checks              |
| Privilege escalation                         | Backend-only permission evaluation and immutable audit log           |
| Booking double-booking or duplicate commands | Idempotency keys, version checks, and transactions                   |
| Payment spoofing                             | Webhook or server-to-server verification only                        |
| Webhook replay                               | Event deduplication and idempotent processing                        |
| File upload abuse                            | Extension, size, MIME, ownership, and confidential-path deny rules   |
| Sensitive log leakage                        | Structured audit sanitization and redaction                          |
| Location privacy abuse                       | Consent, purpose limitation, scoped visibility, and retention policy |

## Auth and Isolation Principles

- Firebase Authentication handles sign-in, OTP, Google Sign-In, and future Apple Sign-In.
- Domain User ID remains separate from Firebase UID.
- `auth_identities` maps provider identities to domain users.
- Onboarding role selection is limited to `RENTER` and `STORE_OWNER`; broader role grants remain backend-managed.
- Backend resolves the active domain user and role assignments on every protected request.
- Active store memberships extend effective role assignments with store/branch scope; suspended memberships are excluded immediately.
- Firebase custom claims may help cache platform roles, but store and branch authorization must come from backend data.
- Business-critical Firestore and Storage writes are server-owned by default; client rules allow only explicitly safe cases.
- GPS consent must capture version, purpose, and explicit foreground/background scope before location data is processed beyond basic app operation.
- Asset categories, assets, equipment items, inventory units, rental points, pricing rules, and availability blocks are tenant/store scoped backend writes.
- Availability reservations must be created through backend transaction/version-safe logic so overlapping holds for the same asset/time range fail atomically.
- Booking create, payment intent creation, webhook processing, cash confirmation, and deposit updates are backend-owned; frontend callbacks are never final payment proof.
- Cash confirmation requires `payment.cash.confirm`, branch scope, financial audit logging, and cash receipt context.

## Permission Catalog

| Permission               | Resource           | Action   | Allowed scope                 | Notes                                               |
| ------------------------ | ------------------ | -------- | ----------------------------- | --------------------------------------------------- |
| `store.read`             | store              | read     | store, branch, platform       | Read operational store data within assigned scope   |
| `store.update`           | store              | update   | store, platform               | Sensitive edits may trigger approval review         |
| `branch.create`          | branch             | create   | store, platform               | Branch creation remains store-scoped                |
| `asset.create`           | asset              | create   | store, branch, platform       | Used for bikes and equipment                        |
| `asset.update`           | asset              | update   | store, branch, platform       | Includes status, metadata, and pricing edits        |
| `booking.read`           | booking            | read     | user, store, branch, platform | Renter scope is own bookings only                   |
| `booking.confirm`        | booking            | confirm  | store, branch, platform       | Store-side confirmation flow                        |
| `booking.cancel`         | booking            | cancel   | store, branch, platform       | Admin/support may override via platform workflows   |
| `payment.cash.confirm`   | payment            | confirm  | store, branch, platform       | Sensitive, always audited                           |
| `rental.handover`        | rental             | handover | store, branch, platform       | Starts rental session                               |
| `return.accept`          | return_request     | accept   | store, branch, platform       | Covers return acceptance and inspection close       |
| `report.financial.read`  | report             | read     | store, platform               | Store accounting and admin reporting                |
| `staff.manage`           | staff              | manage   | store, platform               | Invite, role edit, branch assignment, suspension    |
| `sos.location.read`      | sos_case           | read     | store, branch, platform       | Allowed only for active incident handling           |
| `content.approve`        | content_submission | approve  | platform                      | Moderator/admin review queue                        |
| `platform.store.suspend` | platform           | suspend  | platform                      | Store suspension or closure                         |
| `audit.read`             | audit_log          | read     | store, platform               | Store scope only for store-owned records if enabled |
| `payment.refund`         | payment            | refund   | store, platform               | Refund or deposit correction flow                   |
| `user.suspend`           | user               | suspend  | platform                      | Admin-only account action                           |
| `dispute.manage`         | dispute            | manage   | platform                      | Support escalation and dispute resolution           |

## Role and Scope Matrix

Legend: `own` = actor-owned only, `branch` = assigned branches only, `store` = assigned store only, `platform` = marketplace-wide, `-` = not granted by default

| Permission               | RENTER | STORE_OWNER | STORE_MANAGER | STORE_STAFF | STORE_ACCOUNTING | PLATFORM_ADMIN | PLATFORM_MODERATOR | PLATFORM_SUPPORT |
| ------------------------ | ------ | ----------- | ------------- | ----------- | ---------------- | -------------- | ------------------ | ---------------- |
| `store.read`             | -      | store       | store         | branch      | store            | platform       | -                  | platform         |
| `store.update`           | -      | store       | -             | -           | -                | platform       | -                  | -                |
| `branch.create`          | -      | store       | -             | -           | -                | platform       | -                  | -                |
| `asset.create`           | -      | store       | branch        | -           | -                | platform       | -                  | -                |
| `asset.update`           | -      | store       | branch        | branch      | -                | platform       | -                  | -                |
| `booking.read`           | own    | store       | branch        | branch      | store            | platform       | -                  | platform         |
| `booking.confirm`        | -      | store       | branch        | -           | -                | platform       | -                  | -                |
| `booking.cancel`         | -      | store       | branch        | -           | -                | platform       | -                  | -                |
| `payment.cash.confirm`   | -      | store       | branch        | branch      | -                | platform       | -                  | -                |
| `rental.handover`        | -      | store       | branch        | branch      | -                | platform       | -                  | -                |
| `return.accept`          | -      | store       | branch        | branch      | -                | platform       | -                  | -                |
| `report.financial.read`  | -      | store       | -             | -           | store            | platform       | -                  | -                |
| `staff.manage`           | -      | store       | store         | -           | -                | platform       | -                  | -                |
| `sos.location.read`      | -      | store       | branch        | branch      | -                | platform       | -                  | platform         |
| `content.approve`        | -      | -           | -             | -           | -                | platform       | platform           | -                |
| `platform.store.suspend` | -      | -           | -             | -           | -                | platform       | -                  | -                |
| `audit.read`             | -      | store       | store         | -           | store            | platform       | platform           | platform         |
| `payment.refund`         | -      | store       | -             | -           | store            | platform       | -                  | -                |
| `user.suspend`           | -      | -           | -             | -           | -                | platform       | -                  | -                |
| `dispute.manage`         | -      | -           | -             | -           | -                | platform       | -                  | platform         |

## Backend Verification Plan

Security flow is scaffolded in `backend/src/identity/application/security-pipeline.ts`, `backend/src/identity/domain/rbac.ts`, and `backend/src/identity/api/security-error.ts`.

| Component                 | Responsibility                                              | Boundary                            |
| ------------------------- | ----------------------------------------------------------- | ----------------------------------- |
| `FirebaseIdTokenVerifier` | Verify bearer token and return verified UID/claims metadata | Infrastructure adapter only         |
| `AppCheckTokenVerifier`   | Verify App Check token for protected endpoints              | Infrastructure adapter only         |
| `DomainUserResolver`      | Map Firebase UID to active domain user                      | Application/infrastructure boundary |
| `RoleAssignmentLookup`    | Load role assignments with tenant, store, and branch scope  | Application/infrastructure boundary |
| `PermissionChecker`       | Enforce role/resource/action permission matrix              | Domain/application                  |
| `TenantAccessGuard`       | Reject cross-tenant and cross-branch access                 | Domain/application                  |
| `AuditLogWriter`          | Append immutable audit records for sensitive actions        | Application/infrastructure boundary |

### Request Pipeline

1. Parse `Authorization: Bearer <firebase_id_token>`.
2. Verify Firebase ID token.
3. If endpoint requires App Check, verify App Check header before business logic.
4. Resolve active domain user from `auth_identities`.
5. Load role assignments and scoped grants.
6. Evaluate permission plus tenant/store/branch target scope.
7. Validate input, idempotency key, and entity version as required.
8. Write audit log for sensitive actions after state transition and before response completes where feasible.

### Error Mapping

| Failure case                                  | HTTP  | API code                  | Response detail                             |
| --------------------------------------------- | ----- | ------------------------- | ------------------------------------------- |
| Missing bearer token                          | `401` | `AUTH_UNAUTHENTICATED`    | Request requires authentication             |
| Invalid or expired token                      | `401` | `AUTH_INVALID_TOKEN`      | Token cannot be trusted                     |
| Missing App Check on required endpoint        | `403` | `AUTH_APP_CHECK_REQUIRED` | Client must send App Check                  |
| Invalid App Check token                       | `403` | `AUTH_APP_CHECK_INVALID`  | App origin proof failed                     |
| Authenticated but outside permission or scope | `403` | `PERMISSION_DENIED`       | Include permission and decision reason only |

## Firestore Rules Draft

Draft rules live in `firebase/firestore.rules`.

Policy:

- Default deny for all collections.
- Allow public read only for approved public config documents in `system_configs`.
- Allow notification read only for the owning authenticated user.
- Deny direct client reads and writes for `users`, `auth_identities`, `bookings`, `payments`, `stores`, `branches`, `assets`, `ride_track_chunks`, `return_requests`, `sos_cases`, `settlements`, and `audit_logs`.
- Deny direct client writes for `asset_categories`, `equipment_items`, `inventory_units`, `rental_points`, `pricing_rules`, and `availability_blocks`; server APIs enforce permissions, branch scope, and overlap checks.
- All business-critical writes must go through backend services.

This satisfies the Sprint 0 requirement that business-critical collections cannot be directly written by clients.

## Storage Rules Draft

Draft rules live in `firebase/storage.rules`.

Policy:

- Default deny for all paths.
- Public read allowed only under `/public/**`.
- Client upload allowed only to `/uploads/{userId}/{category}/{fileName}` for tightly limited categories such as avatar and return evidence.
- Upload rules validate extension, MIME type, size, and path ownership by Firebase UID.
- Confidential paths such as `/merchant-documents/**`, `/ride-tracks/**`, and `/audit-evidence/**` are backend-only.
- Backend must still re-validate MIME, file signature, malware policy, and document classification before promoting any staged upload.

## Audit Log Foundation

Audit types and sanitization helpers are scaffolded in `backend/src/audit/domain/audit-log.ts`.

### Required audited actions

- Permission changes
- Cash confirmation
- Booking state changes
- Return confirmation
- Damage fee edits
- Refunds
- Account suspension
- Account deletion requests
- Store submission and approval decisions
- Branch temporary closure changes
- Content approval
- Admin and support override actions

### Audit schema

| Field                           | Description                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| `tenant_id`                     | Optional for platform/system actions                                                     |
| `action`                        | Domain event-style audit action                                                          |
| `resource_type` / `resource_id` | Target resource identifier                                                               |
| `actor`                         | Actor type, domain user id, firebase uid reference, role snapshot, hashed IP, user agent |
| `reason`                        | Required for overrides, corrections, suspensions, refunds, and moderation                |
| `before` / `after`              | Sanitized snapshots only                                                                 |
| `classification`                | `INTERNAL`, `CONFIDENTIAL`, `SENSITIVE_LOCATION`, `FINANCIAL`                            |
| `correlation_id`                | Request trace linkage                                                                    |
| `occurred_at`                   | UTC timestamp                                                                            |
| `immutable`                     | Always `true`; append-only record                                                        |

### Sanitization rules

- Never log password, OTP, bearer token, App Check token, refresh token, full personal document reference, or raw ride-track coordinates.
- Remove unnecessary latitude, longitude, coordinates, polyline, and raw GPS arrays from audit snapshots.
- Keep only the minimum incident location detail needed for SOS, return disputes, or fraud investigation.

## Data Classification and Retention Baseline

| Class              | Examples                                                     | Access expectation             | Proposed retention baseline                                     |
| ------------------ | ------------------------------------------------------------ | ------------------------------ | --------------------------------------------------------------- |
| Public             | Approved store profile, public route/place                   | Public read                    | Product-driven                                                  |
| Internal           | Staff tasks, operational status                              | Role scoped                    | 1 year proposed                                                 |
| Confidential       | Phone, email, merchant documents, moderation notes           | Restricted role and purpose    | 3 years after case closure proposed unless legal hold applies   |
| Sensitive location | Ride tracks, SOS location, return evidence location          | Purpose-limited, incident-only | 30 days proposed for raw coordinates before delete or aggregate |
| Financial          | Payments, refunds, deposits, settlements, cash confirmations | Restricted and audited         | 7 years or statutory minimum                                    |

### Open retention questions

- Exact raw GPS retention window needs legal/compliance approval under ADR-012.
- Account deletion preserves payment, audit, dispute, and tax records while the user profile moves to `DELETION_REQUESTED`; later pseudonymization policy still needs legal/compliance approval.
- Merchant identity document retention needs a statutory tail period decision.

## Abuse and Rate Limit Controls

- Rate limit auth and OTP attempts by phone, IP, and device.
- Require idempotency keys for booking creation, payment creation, cash confirmation, return acceptance, refund, and webhook processing.
- Reject duplicate webhook event ids and duplicate idempotency keys in the same command context.
- Apply stricter rate limits to file upload, SOS, and admin endpoints.
- Require a reason and audit record for all sensitive manual overrides.
- Store notification tokens only as protected provider references plus fingerprints; never return or log raw device tokens.
- Restrict SOS incident visibility to the scoped store/branch responders needed for the case, and classify SOS timeline/location data as `SENSITIVE_LOCATION`.
- Require `report.financial.read` for store/platform reports, settlements, and exports; export content must preserve the caller's store/branch filters and omit renter PII/location fields.

## Security Tests

Current runnable commands:

```text
npm run typecheck
npm test
npm run test:security
npm run test:security-rules
npm run test:emulator
npm run check:secrets
```

Current coverage from runnable tests:

- Invalid token
- Missing App Check
- Permission denied
- Cross-tenant / cross-branch access
- Object-level own-booking authorization
- API error response mapping
- Audit payload redaction for secrets and coordinates
- Onboarding role validation, consent capture, duplicate auth identity rejection, and self-service account deletion request audit logging
- Store owner registration, platform approval decisions, branch temporary closure audit, staff permission audit, and cross-tenant rejection
- Inventory asset/category/equipment creation, duplicate store asset-code rejection, cross-tenant inventory denial, integer minor-unit pricing quote snapshots, availability hold conflicts, closed branch availability exclusion, and unsupported search-filter rejection
- Booking create idempotency, availability reservation conflict rejection, booking state-machine invalid transition rejection, payment webhook proof/replay handling, cash confirmation permission/audit logging, and deposit release-before-inspection rejection
- Handover QR token invalid/expired/used rejection, branch-scoped staff handover, rental start audit/outbox, ride GPS consent enforcement, chunk sequence/checksum dedupe, return request notification, staff-only inspection close, and post-inspection deposit release
- SOS active-ride enforcement, missing-location rejection, scoped staff acknowledgement/assignment lifecycle, escalation notification routing, protected notification token registration, delivery retry behavior, content approval/rejection/report flows, completed-booking review eligibility, and review-hide audit logging
- Report date range and branch filters, store-scope financial access denial, platform support overview access, CSV/XLSX export redaction, settlement policy requirement, integer minor-unit settlement calculation, and settlement/export audit logging
- Firestore rules default-deny with public config exception
- Firestore user-owned notification read exception
- Storage public-read and owner-upload exceptions
- Emulator seed loading for auth, Firestore, and storage placeholders

Still pending beyond Task 06:

- Webhook replay integration test
- Idempotency duplicate request integration test
