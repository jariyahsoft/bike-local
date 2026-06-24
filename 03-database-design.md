# 03 Database Design

Source: `docs/Bike-Local-SRS.md` sections 4, 6.2, 7, 8, 9, 10.6, 11, 12.5, 12.7, 13, 16.3

## Data Model Overview

MVP ใช้ Cloud Firestore แต่ data model ต้องเป็น canonical domain model ที่ไม่ผูกกับ Firestore document path และต้องรองรับการย้ายไป PostgreSQL หรือ MongoDB

ทุก Entity สำคัญควรมี:

```text
id
schema_version
created_at
created_by
updated_at
updated_by
deleted_at
version
tenant_id
```

## Top-Level Collections

```text
users
auth_identities
consent_records
stores
branches
store_members
roles
permissions
assets
asset_categories
equipment_items
inventory_units
rental_points
pricing_rules
availability_blocks
bookings
booking_items
payments
payment_events
deposits
rental_sessions
ride_sessions
ride_track_chunks
return_requests
return_inspections
staff_tasks
sos_cases
places
routes
content_submissions
reviews
content_reports
notification_devices
notifications
notification_delivery_logs
settlements
audit_logs
outbox_events
system_configs
```

## Entity Relationship Overview

```mermaid
erDiagram
  USERS ||--o{ AUTH_IDENTITIES : has
  USERS ||--o{ CONSENT_RECORDS : grants
  USERS ||--o{ STORE_MEMBERS : joins
  STORES ||--o{ BRANCHES : owns
  STORES ||--o{ STORE_MEMBERS : has
  BRANCHES ||--o{ ASSETS : contains
  USERS ||--o{ BOOKINGS : creates
  STORES ||--o{ BOOKINGS : receives
  BOOKINGS ||--o{ BOOKING_ITEMS : includes
  BOOKINGS ||--o{ PAYMENTS : paid_by
  BOOKINGS ||--o{ RIDE_SESSIONS : tracks
  RIDE_SESSIONS ||--o{ RIDE_TRACK_CHUNKS : chunks
  BOOKINGS ||--o{ RETURN_REQUESTS : returns
  BOOKINGS ||--o{ SOS_CASES : may_open
  BOOKINGS ||--o{ REVIEWS : may_receive
  USERS ||--o{ NOTIFICATION_DEVICES : registers
  USERS ||--o{ NOTIFICATIONS : receives
  NOTIFICATIONS ||--o{ NOTIFICATION_DELIVERY_LOGS : records
  USERS ||--o{ CONTENT_REPORTS : files
  BOOKINGS ||--o{ AUDIT_LOGS : audited
```

## Core Schemas

### User

| Field | Type | Notes |
|---|---|---|
| id | string | Domain User ID |
| display_name | string | required |
| phone | string | optional/verified by auth provider |
| email | string | optional |
| photo_url | string | optional |
| locale | string | `th` or `en` |
| country_code | string | optional |
| weight_kg | number | voluntary, used for estimated calories |
| emergency_contact | object | voluntary |
| status | enum | active/suspended/deletion_requested TBD |
| created_at, updated_at | timestamp | UTC |
| version | integer | optimistic concurrency |

Notes:

- Domain User ID remains separate from Firebase UID.
- One user can hold multiple marketplace roles over time.
- Account deletion is a status transition to `DELETION_REQUESTED`; legally required transactional, audit, tax, and dispute records remain under restricted access.

### Auth Identity

| Field | Type | Notes |
|---|---|---|
| id | string | Domain auth identity ID |
| user_id | string | ref users |
| provider | enum | `PHONE`, `EMAIL_PASSWORD`, `GOOGLE`, `APPLE` |
| provider_subject | string | backend-only; never expose raw value in API responses |
| firebase_uid | string | Firebase Authentication subject, unique |
| verified | boolean | provider-level verification snapshot |
| last_authenticated_at | timestamp | UTC |
| created_at, updated_at | timestamp | UTC |
| version | integer | optimistic concurrency |

### Consent Record

| Field | Type | Notes |
|---|---|---|
| id | string | Domain consent record ID |
| user_id | string | ref users |
| type | enum | `TERMS`, `PRIVACY`, `GPS`, `MARKETING` |
| status | enum | `GRANTED`, `DENIED`, `REVOKED` |
| version_code | string | accepted/rejected policy version |
| purpose | string | explicit purpose limitation for the consent |
| locale | string | `th` or `en` snapshot shown to user |
| granted_at | timestamp | UTC |
| revoked_at | timestamp | optional |
| gps_scope | enum | `FOREGROUND_ONLY` or `BACKGROUND_ALLOWED` for GPS consent only |
| created_at, updated_at | timestamp | UTC |
| version | integer | optimistic concurrency |

### Store

| Field | Type | Notes |
|---|---|---|
| id | string | UUID/domain ID |
| owner_user_id | string | ref users |
| legal_name | string | business/legal name |
| display_name | string | marketplace display |
| description | string | optional |
| status | enum | operational status |
| phone, email | string | contact |
| default_currency | string | e.g. THB |
| timezone | string | required |
| approval_status | enum | see Store Status |
| operational_status | enum | DRAFT, ACTIVE, INACTIVE, SUSPENDED, CLOSED |
| commission_plan_id | string | TBD |
| document_metadata | array | metadata only; actual files live in restricted storage paths |
| submitted_at, reviewed_at | timestamp | optional UTC workflow timestamps |
| reviewed_by | string | platform admin user id |
| decision_reason | string | required for platform decisions |
| created_at, updated_at | timestamp | UTC |
| version | integer | optimistic concurrency |

Document metadata must contain only storage object references, type, file name, MIME type, size, status, and upload timestamp. Raw document bytes and unrestricted document URLs are not part of the domain model.

### Branch

| Field | Type | Notes |
|---|---|---|
| id | string | UUID/domain ID |
| store_id | string | ref stores |
| name | string | required |
| address | string | required |
| province, district, country | string | search/filter |
| latitude, longitude, geohash | location | map/search |
| phone | string | contact |
| opening_hours | object | structured hours |
| status | enum | ACTIVE, TEMPORARILY_CLOSED, INACTIVE |
| timezone | string | branch local timezone, defaults from store when omitted |
| temporary_closure | object | reason and optional reopen_at when status is TEMPORARILY_CLOSED |
| created_at, updated_at | timestamp | UTC |
| version | integer | optimistic concurrency |

Branches are available for booking/search only when the parent store is `APPROVED` and `ACTIVE`, and the branch status is `ACTIVE`.

### Store Member and Staff Invitation

| Field | Type | Notes |
|---|---|---|
| id | string | Domain store member or invitation ID |
| tenant_id | string | store tenant id |
| store_id | string | ref stores |
| user_id | string | optional until invitation is accepted |
| role | enum | `STORE_OWNER`, `STORE_MANAGER`, `STORE_STAFF`, `STORE_ACCOUNTING` for members; invitations exclude owner |
| channel | enum | invitation channel: `EMAIL`, `PHONE`, `LINK`, `QR` |
| email, phone | string | channel-specific contact when used |
| branch_ids | array | scoped branch access |
| granted_permissions, denied_permissions | array | explicit permission overrides |
| status | enum | member: ACTIVE/SUSPENDED; invitation: PENDING/ACCEPTED/EXPIRED/CANCELLED |
| expires_at | timestamp | optional invitation expiry |
| created_at, updated_at | timestamp | UTC |
| version | integer | optimistic concurrency |

Suspended store members must be removed from effective role assignment lookup immediately.

### Asset

| Field | Type | Notes |
|---|---|---|
| id | string | UUID/domain ID |
| store_id, branch_id | string | refs |
| category_id | string | ref asset_categories |
| code | string | unique within store |
| qr_token_reference | string | no raw long-lived token |
| brand, model, color, size | string | catalog |
| description | string | optional |
| status | enum | see Asset State |
| base_price | integer | minor unit |
| deposit_amount | integer | minor unit |
| currency | string | required |
| current_point_id | string | ref rental_points |
| images | array | public asset image refs |
| cash_accepted | boolean | search/filter snapshot |
| different_return_allowed | boolean | search/filter snapshot |
| equipment_ids | array | included/required equipment refs |
| status_history | array | status transitions with time, actor, reason |
| gps_device_id, smart_lock_id | string | Phase 2 |
| created_at, updated_at | timestamp | UTC |
| version | integer | optimistic concurrency |

Asset code is unique within a store. `qr_token_reference` is an opaque backend-managed reference only; raw long-lived QR token values are not stored in the asset document or returned to clients.

### Asset Category, Equipment, Inventory Unit, Rental Point

| Entity | Key fields | Notes |
|---|---|---|
| asset_categories | store_id, name, type, default_base_price, default_deposit_amount, currency, active | Category defaults use integer minor units and are store scoped. |
| equipment_items | store_id, optional branch_id, name, rental_mode, status, price_amount, deposit_amount, currency | `rental_mode` supports separate rental, bundled rental, package included, and deposit required. |
| inventory_units | store_id, branch_id, optional asset_id, optional equipment_item_id, status | Tracks branch-level stock/serialized units without coupling to Firestore paths. |
| rental_points | store_id, branch_id, name, latitude, longitude, geohash, status | Pickup/return points are available only when parent store is approved/active and branch is active. |

### Pricing Rule and Availability Block

| Entity | Key fields | Notes |
|---|---|---|
| pricing_rules | store_id, optional branch_id, optional category_id, type, amount, currency, priority, active | Quote calculation snapshots applied rule IDs and policy refs into bookings. |
| availability_blocks | asset_id, store_id, branch_id, start_at, end_at, reason, reference_id | Transaction-created hold/confirmed booking blocks prevent overlapping reservations. |

Money fields remain integer minor units. Current open pricing-policy questions, such as final cancellation/deposit policy references, are kept in immutable `policy_snapshot` fields until product/legal decisions are finalized.

### Booking

| Field | Type | Notes |
|---|---|---|
| id | string | UUID/domain ID |
| booking_number | string | human/reference number |
| user_id, store_id, branch_id | string | refs |
| asset_ids, equipment_ids | array | booked inventory snapshot |
| status | enum | see Booking State |
| start_at, end_at | timestamp | UTC |
| pickup_point_id, return_point_id | string | refs |
| payment_method | enum | online/cash TBD |
| currency | string | required |
| subtotal_amount, fee_amount, deposit_amount, discount_amount, total_amount | integer | minor unit |
| price_snapshot, policy_snapshot | object | immutable snapshot |
| qr_booking_token_reference | string | one-time/time-limited token reference only |
| idempotency_key | string | duplicate create protection |
| status_history | array | state transitions with time, actor, reason |
| created_at, updated_at | timestamp | UTC |
| version | integer | optimistic concurrency |

Booking creation reserves availability blocks in the same command flow and returns the existing booking for duplicate idempotency keys. Raw QR booking tokens are never stored; only token references are persisted.

## Firestore Index Draft

Expected composite indexes for Task 09 marketplace queries:

| Collection | Fields | Query |
|---|---|---|
| assets | store_id, code | Unique store asset-code lookup enforced by backend transaction/check. |
| assets | store_id, branch_id, status, base_price | Merchant list and renter price filtering. |
| assets | cash_accepted, different_return_allowed, status, base_price | Search filters for cash, different return point, and price. |
| asset_categories | store_id, type, active | Category management and type-filtered discovery. |
| equipment_items | store_id, branch_id, status, rental_mode | Equipment management and package/deposit filtering. |
| rental_points | store_id, branch_id, status | Pickup/return point lookup. |
| pricing_rules | store_id, branch_id, category_id, active, priority | Quote rule selection. |
| availability_blocks | asset_id, start_at, end_at | Overlap checks and booking holds. |
| branches | store_id, status, geohash | Active branch search by location. |

### Payment

| Field | Type | Notes |
|---|---|---|
| id | string | UUID/domain ID |
| booking_id, user_id, store_id, branch_id | string | refs |
| provider | string | TBD |
| provider_reference | string | external ref |
| method | enum | gateway/cash/etc TBD |
| status | enum | PENDING, PROCESSING, PAID, FAILED, EXPIRED, PARTIALLY_REFUNDED, REFUNDED, DISPUTED |
| amount | integer | minor unit |
| currency | string | required |
| idempotency_key | string | required for important commands |
| paid_at | timestamp | optional |
| confirmed_by | string | staff/admin/system |
| cash_received_at, cash_notes, cash_evidence_image_ref | mixed | cash receipt audit context |
| created_at, updated_at | timestamp | UTC |
| version | integer | optimistic concurrency |

Payment provider specifics remain behind adapter interfaces until ADR-006 is accepted. Webhooks require provider proof verification, write `payment_events`, deduplicate by `(provider, provider_event_id)`, and publish `outbox_events` after successful payment state transitions.

### Deposit

| Field | Type | Notes |
|---|---|---|
| id | string | UUID/domain ID |
| booking_id, user_id, store_id, branch_id | string | refs |
| status | enum | NOT_REQUIRED, PENDING, HELD, PARTIALLY_DEDUCTED, RELEASED, FORFEITED |
| amount, deducted_amount | integer | minor unit |
| currency | string | required |
| held_at, released_at | timestamp | optional |
| created_at, updated_at | timestamp | UTC |
| version | integer | optimistic concurrency |

Deposits cannot transition to `RELEASED` before return inspection reaches `INSPECTION_PENDING`, `COMPLETED`, or `DISPUTED`. Final refund, damage deduction, and forfeiture rules remain policy open questions.

### Ride Session and Track Chunk

Ride Session เก็บ summary และ reference ส่วน Track Chunk เก็บ GPS chunks พร้อม checksum เพื่อรองรับ offline/batch upload และการย้าย payload ขนาดใหญ่ไป Cloud Storage. MVP contract ใช้ local encrypted buffer interface ฝั่งแอป โดย upload เป็น chunk ที่มี `sequence`, `checksum`, `captured_from`, `captured_to`, `point_count`, `points`, และ `gaps`; ห้ามเติมจุด GPS ที่ขาดเอง และ duplicate `(ride_session_id, sequence)` จะรับซ้ำได้เฉพาะ checksum เดิมเท่านั้น.

### Handover and Return Inspection

Handover ตรวจ QR booking token แบบ one-time/time-limited ผ่าน token reference เท่านั้น ไม่เก็บ raw long-lived secret ใน booking record. เมื่อ handover สำเร็จ booking เปลี่ยนเป็น `IN_PROGRESS`, asset เปลี่ยนเป็น `RENTED`, deposit เปลี่ยนเป็น `HELD` เมื่อมี deposit, สร้าง ride session เริ่มต้น, audit log, และ outbox event ใน service boundary เดียว.

Return request เก็บ `return_type`, evidence photos, return location, notes, และ notify store/staff ผ่าน outbox. Smart Dock ยังเป็น Phase 2 placeholder และไม่รับใน MVP. Staff inspection เป็นจุดเดียวที่ close rental ได้: booking ไป `INSPECTION_PENDING` แล้ว `COMPLETED` หรือ `DISPUTED`, asset ไป `AVAILABLE` หรือ `MAINTENANCE`, และ deposit release/deduction เกิดหลัง inspection เท่านั้น.

### Notifications and Content Moderation

Notification device registration stores only protected token material: an opaque provider reference plus token fingerprint for dedupe. Inbox notifications keep delivery state on the message, while `notification_delivery_logs` append provider attempts, failures, and retries per notification.

Route, place, and review entities are public-content records; `content_submissions` track approval state and moderator reason separately from the published entity, and `content_reports` capture renter/staff reports for unsafe, wrong, outdated, or abusive content. Reviews remain limited to completed bookings and can later be suspended with an explicit hidden reason.

### Audit Log

| Field | Type | Notes |
|---|---|---|
| id | string | UUID/domain ID |
| tenant_id | string | optional for platform/system actions |
| actor | object | actor type, domain user id, firebase uid reference, role snapshot, hashed IP, user agent |
| action | string | e.g. `payment.cash.confirmed`, `permission.changed` |
| resource_type | string | aggregate or bounded-context resource name |
| resource_id | string | target entity id |
| before, after | object | sanitized snapshots only; no raw token, OTP, full document, or unnecessary coordinates |
| reason | string | required for staff/admin corrections, suspension, refund, and overrides |
| classification | enum | `INTERNAL`, `CONFIDENTIAL`, `SENSITIVE_LOCATION`, `FINANCIAL` |
| correlation_id | string | request trace id |
| occurred_at | timestamp | UTC |
| immutable | boolean | always `true`; append-only storage |

## Status and Enums

### Store Approval

`DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `REVISION_REQUIRED`, `APPROVED`, `REJECTED`, `SUSPENDED`, `CLOSED`

### Asset

`AVAILABLE`, `RESERVED`, `PREPARING`, `AWAITING_HANDOVER`, `RENTED`, `RETURN_PENDING`, `INSPECTION_PENDING`, `MAINTENANCE`, `INACTIVE`, `LOST`

### Booking

`PENDING_PAYMENT`, `PENDING_STORE_CONFIRMATION`, `CONFIRMED`, `PREPARING`, `AWAITING_PICKUP`, `IN_PROGRESS`, `RETURN_PENDING`, `INSPECTION_PENDING`, `COMPLETED`, `CANCELLED`, `NO_SHOW`, `DISPUTED`

### Return Request

`REQUESTED`, `VALIDATING_LOCATION`, `WAITING_FOR_STORE`, `STAFF_ASSIGNED`, `PICKUP_IN_PROGRESS`, `INSPECTION_PENDING`, `ACCEPTED`, `REJECTED`, `DISPUTED`, `CANCELLED`

### SOS

`OPEN`, `ACKNOWLEDGED`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`

## Indexes and Constraints

- `assets`: unique `(store_id, code)`
- `auth_identities`: unique `firebase_uid`
- `auth_identities`: unique `(provider, provider_subject)`
- `bookings`: query by `store_id`, `branch_id`, `user_id`, `status`, `start_at`, `end_at`
- `consent_records`: query by `user_id`, `type`, `granted_at`
- `stores`: query by `owner_user_id`, `approval_status`, `operational_status`
- `branches`: query by `store_id`, `status`
- `store_members`: unique `(store_id, user_id)` and query by `user_id`, `store_id`, `status`
- `staff_invitations`: query by `store_id`, `status`, `expires_at`
- Availability checks must prevent overlapping confirmed bookings for same asset/time range
- `ride_track_chunks`: unique `(ride_session_id, sequence)`
- `reviews`: unique `(booking_id, user_id)`
- `content_submissions`: unique `(content_type, content_id)` and query by `tenant_id`, `status`
- `content_reports`: query by `content_type`, `content_id`, `reported_by_user_id`
- `notification_devices`: unique `(user_id, token_fingerprint)` and query active devices by `user_id`
- `notifications`: query by `tenant_id`, `recipient_user_id`, `delivery_status`
- `notification_delivery_logs`: query by `notification_id`, `recipient_user_id`, `attempt`
- `payments`: unique idempotency key per command context
- `payment_events`: unique `(provider, provider_event_id)` for webhook replay protection
- `deposits`: query by `booking_id`, `store_id`, `status`
- `outbox_events`: query by `type`, `aggregate_type`, `aggregate_id`, `occurred_at`
- `audit_logs`: append-only by `resource`, `resource_id`, `actor`, `timestamp`
- Geospatial search requires geohash or provider-specific index

## Migration Strategy

1. Schema Mapping
2. Full Data Export
3. Data Transformation
4. Referential Integrity Validation
5. Historical Data Import
6. Incremental Change Capture
7. Dual Write ชั่วคราวหากจำเป็น
8. Read Comparison
9. Cutover
10. Rollback Plan
11. Post-Migration Audit

## PostgreSQL Notes

- Top-Level Collection แปลงเป็น table
- Reference ID แปลงเป็น foreign key
- Booking Item เป็น child table
- Store Member เป็น join table
- Route/Place ใช้ PostGIS ได้
- GPS Track ใช้ Geometry หรือ time-series table ได้
- Booking concurrency ใช้ transaction และ row lock

## MongoDB Notes

- Top-Level Collection คงรูปแบบใกล้ Firestore
- Reference สำคัญเก็บ ID ชัดเจน
- หลีกเลี่ยง document ขนาดใหญ่
- Ride Track แยก chunk
- Payment Event และ Audit Log แยก collection

## Backup and Restore

- ต้องมี backup ตามรอบเวลา
- MVP RPO ไม่เกิน 24 ชั่วโมงสำหรับข้อมูลทั่วไป
- ข้อมูลธุรกรรมสำคัญต้องมี event/audit แยก
- MVP RTO ไม่เกิน 8 ชั่วโมง
- ต้องทดสอบ restore ตามรอบที่กำหนด

## Data Privacy Notes

- Background Location ต้องขอ consent ชัดเจน
- ร้านเห็นตำแหน่งผู้เช่าเฉพาะกรณีจำเป็น: rental active, return request, SOS
- ต้องกำหนด retention ของ GPS track
- ข้อมูลส่วนบุคคลต้องแยกจากรายงานเชิงสถิติเท่าที่ทำได้
