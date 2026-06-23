# 04 API Standard

Source: `docs/Bike-Local-SRS.md` sections 4.2, 5, 6, 10, 12.4, 12.6, 13

## API Design Principles

- REST API เป็น boundary สำหรับข้อมูลธุรกิจสำคัญ
- OpenAPI 3.1 เป็น contract กลาง
- Request/response/error/schema ต้องมีตัวอย่าง
- Frontend ใช้ Generated Client จาก OpenAPI
- Backend ตรวจ auth, app check, permission, tenant และ input ทุกครั้ง
- Endpoint สำคัญต้องรองรับ idempotency

## Base URL and Versioning

```text
/api/v1/users
/api/v1/stores
/api/v1/bookings
```

Breaking change ต้องเพิ่ม version ใหม่

## Auth Mechanism

- `Authorization: Bearer <firebase_id_token>`
- App Check header สำหรับ mobile/web endpoint ที่รองรับ
- Backend map Firebase UID ไป Domain User ID ผ่าน `auth_identities`
- Permissions ตรวจ server-side เสมอ

## Request Format

- JSON request body
- `Content-Type: application/json`
- ใช้ snake_case fields ตาม domain schema
- Mutating request สำคัญส่ง `Idempotency-Key`
- Update entity สำคัญส่ง `version` เดิมเพื่อ concurrency control

## Success Response

```json
{
  "data": {},
  "meta": {
    "request_id": "req_..."
  }
}
```

## Error Response

```json
{
  "error": {
    "code": "BOOKING_ASSET_NOT_AVAILABLE",
    "message": "จักรยานไม่พร้อมให้เช่าในช่วงเวลาที่เลือก",
    "details": {},
    "request_id": "req_..."
  }
}
```

## Error Code Groups

```text
AUTH_*
PERMISSION_*
VALIDATION_*
STORE_*
ASSET_*
INVENTORY_*
PRICING_*
SEARCH_*
AVAILABILITY_*
BOOKING_*
PAYMENT_*
RIDE_*
RETURN_*
SOS_*
CONTENT_*
RATE_LIMIT_*
INTERNAL_*
```

Frontend ต้องใช้ `error.code` เป็นเงื่อนไขทางโปรแกรม ไม่ใช้ข้อความ

## Pagination

Collection endpoint ใช้ cursor pagination:

```text
limit
cursor
sort
filter
```

ห้ามพึ่ง page number สำหรับข้อมูลที่เปลี่ยนบ่อย

## Filtering and Sorting

- Filter fields ต้องอยู่ใน OpenAPI
- Sort fields ต้องระบุ direction
- Backend ต้อง validate filter/sort เพื่อป้องกัน query ที่แพงหรือไม่ indexed

## Idempotency

Endpoint ต่อไปนี้ต้องรองรับ idempotency:

- Create Asset Category
- Create Asset
- Create Equipment Item
- Create Inventory Unit
- Create Rental Point
- Create Pricing Rule
- Create Booking
- Create Payment
- Confirm Cash
- Process Webhook
- Request Return
- Confirm Return
- Refund
- Settlement Payment

## Concurrency

- Entity สำคัญมี `version`
- Client ส่ง version เดิมเมื่อ update
- หาก version ไม่ตรง ตอบ `409 CONFLICT`
- Transaction ใช้กับ booking, payment confirmation, handover, return confirmation, inventory change, settlement

## Rate Limiting

กำหนดตามความเสี่ยง:

- Auth/OTP
- Booking create/update
- Payment and webhook
- SOS
- File upload
- Search/map endpoints
- Admin actions

## Webhook and Event Format

Payment webhook:

- ต้อง verify signature/provider proof
- ต้อง idempotent
- ห้ามเชื่อ frontend callback เป็นหลักฐานการชำระเงิน
- บันทึก `payment_events`
- Publish outbox event หลัง state transition สำเร็จ

Outbox event ควรมี:

```json
{
  "id": "evt_...",
  "type": "payment.completed",
  "aggregateType": "payment",
  "aggregateId": "pay_...",
  "occurredAt": "2026-01-01T00:00:00Z",
  "payload": {},
  "correlationId": "req_..."
}
```

## Notification Templates

Event types ขั้นต่ำ:

- Booking Created
- Booking Confirmed
- Payment Completed
- Cash Payment Selected
- Staff Task Assigned
- Rental Started
- Rental Near Expiry
- Rental Overdue
- Return Requested
- Return Accepted
- SOS Opened
- SOS Assigned
- Refund Completed

## Endpoint Catalog

| Module | Example endpoints |
|---|---|
| Identity/Users | `POST /api/v1/users`, `GET /api/v1/me`, `PATCH /api/v1/me`, `POST /api/v1/me/deletion-request` |
| Stores | `POST /api/v1/stores`, `GET /api/v1/stores`, `PATCH /api/v1/stores/{id}`, `POST /api/v1/stores/{id}/submit`, `POST /api/v1/stores/{id}/approval-decisions` |
| Branches | `POST /api/v1/stores/{storeId}/branches`, `GET /api/v1/branches/{id}`, `PATCH /api/v1/branches/{id}` |
| Staff | `POST /api/v1/stores/{storeId}/staff-invitations`, `PATCH /api/v1/store-members/{id}` |
| Assets/Inventory | `POST /api/v1/asset-categories`, `POST /api/v1/assets`, `GET /api/v1/assets`, `PATCH /api/v1/assets/{id}`, `POST /api/v1/equipment-items`, `POST /api/v1/inventory-units`, `POST /api/v1/rental-points`, `POST /api/v1/availability/check` |
| Search | `GET /api/v1/search/stores`, `GET /api/v1/search/assets` |
| Pricing | `POST /api/v1/pricing/rules`, `POST /api/v1/pricing/quote` |
| Booking | `POST /api/v1/bookings`, `GET /api/v1/bookings/{id}`, `POST /api/v1/bookings/{id}/cancel` |
| Payment | `POST /api/v1/payments`, `POST /api/v1/payment-webhooks/{provider}` |
| Cash | `POST /api/v1/bookings/{id}/cash-confirmations` |
| Handover | `POST /api/v1/bookings/{id}/handover` |
| Ride | `POST /api/v1/ride-sessions`, `POST /api/v1/ride-sessions/{id}/chunks`, `POST /api/v1/ride-sessions/{id}/end` |
| Return | `POST /api/v1/return-requests`, `POST /api/v1/return-requests/{id}/accept` |
| SOS | `POST /api/v1/sos-cases`, `POST /api/v1/sos-cases/{id}/acknowledge` |
| Content | `POST /api/v1/routes`, `POST /api/v1/places`, `POST /api/v1/content-submissions/{id}/approve` |
| Reports | `GET /api/v1/reports/store`, `GET /api/v1/reports/platform` |
| Audit | `GET /api/v1/audit-logs` |

## API Security Checklist

- [ ] Token verified
- [ ] App Check verified where required
- [ ] Permission checked
- [ ] Tenant/store/branch boundary checked
- [ ] Input validated with schema
- [ ] Idempotency and version handled
- [ ] Audit log written
- [ ] No sensitive fields returned
- [ ] Rate limit applied
- [ ] Error response does not leak secrets
