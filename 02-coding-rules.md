# 02 Coding Rules

Source: `docs/Bike-Local-SRS.md` sections 3, 4, 5, 6, 10, 12, 13, 14, 16, 17

## Core Principles

- Business Logic อยู่ใน Domain/Application Layer เท่านั้น
- ห้าม Domain Layer import Firebase, Firestore, HTTP framework หรือ external provider SDK
- Frontend ห้ามอ่าน/เขียนข้อมูลธุรกิจสำคัญจาก Firestore โดยตรง
- API Contract คือ source of truth สำหรับ request, response, error และ generated clients
- ทุก command สำคัญต้อง idempotent หรือรองรับ retry โดยไม่สร้างข้อมูลซ้ำ

## Language and Framework Conventions

### Dart/Flutter

- UI แยกจาก State Management และ API Client
- ใช้ Generated API Client สำหรับ model ที่อยู่ใน OpenAPI
- ข้อความ UI ต้องผ่าน localization ไม่ hard-code
- Ride Tracking ต้องเขียนผ่าน local buffer ก่อน upload

### TypeScript/Node.js

- เปิด strict type checking
- แยก `domain`, `application`, `infrastructure`, `api`, `tests`
- Repository Interface อยู่ใน domain/application boundary
- Firestore adapter อยู่ใน infrastructure เท่านั้น
- ใช้ DTO/schema validation ที่ API boundary

## Naming Conventions

| Type | Convention |
|---|---|
| Domain entity | PascalCase เช่น `Booking`, `RideSession` |
| Collection/table | snake_case plural เช่น `ride_sessions` |
| JSON field | snake_case ตาม SRS เช่น `created_at`, `tenant_id` |
| Permission | dot notation เช่น `payment.cash.confirm` |
| Error code | UPPER_SNAKE_CASE พร้อม prefix เช่น `BOOKING_ASSET_NOT_AVAILABLE` |
| Event name | past-tense domain event เช่น `booking.confirmed` |

## Type Safety Rules

- จำนวนเงินใช้ Integer Minor Unit เท่านั้น ห้ามใช้ floating point
- เวลาเก็บเป็น UTC
- Enum เก็บเป็น string code ที่มีเอกสารกำกับ
- Entity สำคัญต้องมี `version` สำหรับ optimistic concurrency
- Domain ID ไม่ผูกกับ Firestore document path

## Error Handling Rules

- Frontend ใช้ error code ไม่ parse human message
- Backend response error ต้องมี `code`, `message`, `details`, `requestId`
- Validation error ต้องระบุ field errors เมื่อเหมาะสม
- 409 ใช้เมื่อ version conflict
- Payment/client callback ไม่ถือว่าสำเร็จจนกว่าจะ verify server-to-server หรือ webhook

## Logging Rules

- ทุก request มี correlation/request ID
- Log สำคัญต้อง structured
- ห้าม log password, OTP, payment secret, full token, full personal documents, unnecessary coordinates
- Admin/payment/security action ต้องบันทึก audit log พร้อม actor, action, resource, before/after, timestamp, reason

## Configuration and Environment

- ห้าม commit secret
- ใช้ Secret Manager หรือระบบจัดการ secret ที่เหมาะสม
- แยก dev/staging/prod
- Production data ห้ามใช้ใน development

## i18n Rules

- รองรับไทยและอังกฤษ
- รองรับ timezone, currency, date format และ number format
- ห้าม hard-code UI text ใน source code

## Accessibility Rules

- รองรับ system font size
- ปุ่มสำคัญมี touch target เพียงพอ
- หน้าหลักรองรับ screen reader
- ห้ามใช้สีเพียงอย่างเดียวเพื่อสื่อสถานะ
- SOS ต้องเห็นชัดและเข้าถึงได้จากหน้าระหว่างปั่น
- Contrast ต้องเหมาะสม

## API/Client-Server Boundary

Frontend เข้าถึง Firebase โดยตรงได้เฉพาะ:

- Authentication
- FCM token registration
- Analytics
- Crashlytics
- Remote Config
- Read-only public configuration ที่ไม่มีข้อมูลสำคัญ

ต้องผ่าน Backend:

- Booking, Payment, Deposit, Cash Confirmation
- Asset Availability, Rental State, Return Confirmation
- Settlement, SOS, Permission, Staff Management, Financial Report

## Data Validation Rules

- Backend validate input ทุกครั้ง
- File upload ต้องตรวจ type, size, extension และ MIME type
- Location sharing ต้องตรวจ consent และ purpose
- Booking availability ต้องตรวจด้วย transaction/version ไม่พึ่ง client state

## Security Coding Checklist

- [ ] Auth token verified
- [ ] App Check verified สำหรับ endpoint สำคัญ
- [ ] Permission checked server-side
- [ ] Tenant/store/branch boundary checked
- [ ] Input schema validated
- [ ] Idempotency key handled
- [ ] Audit log written for sensitive action
- [ ] No secret/PII leakage in logs
- [ ] Rate limit applied by risk

## Code Review Checklist

- [ ] Contract updated before implementation
- [ ] Generated client/types updated
- [ ] Domain rules tested
- [ ] Authorization tests added
- [ ] Error cases covered
- [ ] Migration/index impact reviewed
- [ ] Observability included
- [ ] Docs updated

## Definition of Done for Code

- [ ] Frontend connects to real API or documented mock where backend is pending
- [ ] Backend unit tests pass
- [ ] Contract tests pass
- [ ] Integration tests pass where applicable
- [ ] Permission tests pass
- [ ] Error handling complete
- [ ] Logging/analytics/audit complete
- [ ] Documentation updated
- [ ] QA and Product Owner acceptance complete
