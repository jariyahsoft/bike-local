# 10 Glossary

Source: `docs/Bike-Local-SRS.md` sections 1.4, 6, 7, 8, 9, 10.3

## Business Terms

| Term | Meaning | Notes |
|---|---|---|
| ผู้เช่า / Renter | ผู้ใช้งานที่ค้นหา จอง และเช่าจักรยานหรืออุปกรณ์ | Role: `RENTER` |
| ร้านค้า / Store | ผู้ให้บริการเช่าจักรยาน | Tenant/business scope |
| สาขา / Branch | สถานที่ดำเนินงานของร้านค้า | Store can have multiple branches |
| พนักงาน / Staff | ผู้ที่ได้รับสิทธิ์ให้จัดการงานของร้าน | Scoped by store/branch/permission |
| Asset | ทรัพย์สินที่นำมาให้เช่า เช่น จักรยาน | Has status and availability |
| Equipment | อุปกรณ์เสริม เช่น หมวกกันน็อก | Can be separate/bundled/package |
| Booking | รายการจอง | Has price/policy snapshot |
| Rental | รายการเช่าที่เริ่มส่งมอบแล้ว | Starts after handover |
| Ride Session | กิจกรรมการปั่นที่บันทึกด้วย GPS | Separate from rental close |
| Return Request | คำขอคืนจักรยาน | Requires evidence/inspection |
| SOS Case | เหตุการณ์ขอความช่วยเหลือ | Bike Local not emergency rescue |
| Marketplace | ระบบกลางที่รวมร้านค้าหลายราย | Platform level |
| Tenant | ร้านค้าหรือองค์กรที่แยกขอบเขตข้อมูลจากร้านอื่น | Cross-tenant access forbidden |
| Settlement | การคำนวณและจ่ายยอดสุทธิให้ร้าน | Cash included in report but not transfer payable |

## Technical Terms

| Term | Meaning | Notes |
|---|---|---|
| API Contract | ข้อกำหนด Request, Response และ Error ของ API | OpenAPI 3.1 |
| Repository | Interface สำหรับเข้าถึงข้อมูลโดยไม่ผูกกับฐานข้อมูล | Domain/application boundary |
| Adapter | Implementation ที่เชื่อม Repository กับฐานข้อมูลหรือ provider จริง | Infrastructure |
| Idempotency Key | Key ป้องกันคำสั่งซ้ำสร้างข้อมูลซ้ำ | Required for critical endpoints |
| Outbox Event | Event สำคัญที่เก็บเพื่อส่งซ้ำได้ | Reliability |
| Correlation ID | ID ใช้ trace request ข้ามระบบ | Logging/audit |
| App Check | Firebase protection for app-origin requests | Required for important endpoints |

## Roles

| Role | Meaning |
|---|---|
| RENTER | ผู้เช่า |
| STORE_OWNER | เจ้าของร้าน |
| STORE_MANAGER | ผู้จัดการร้าน |
| STORE_STAFF | พนักงานร้าน |
| STORE_ACCOUNTING | ฝ่ายบัญชีร้าน |
| PLATFORM_ADMIN | ผู้ดูแลแพลตฟอร์ม |
| PLATFORM_MODERATOR | ผู้ดูแลเนื้อหา |
| PLATFORM_SUPPORT | ฝ่ายสนับสนุน/ข้อพิพาท |

## Status Values

| Domain | Values |
|---|---|
| Store Approval | `DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `REVISION_REQUIRED`, `APPROVED`, `REJECTED`, `SUSPENDED`, `CLOSED` |
| Branch | `ACTIVE`, `TEMPORARILY_CLOSED`, `INACTIVE` |
| Asset | `AVAILABLE`, `RESERVED`, `PREPARING`, `AWAITING_HANDOVER`, `RENTED`, `RETURN_PENDING`, `INSPECTION_PENDING`, `MAINTENANCE`, `INACTIVE`, `LOST` |
| Booking | `PENDING_PAYMENT`, `PENDING_STORE_CONFIRMATION`, `CONFIRMED`, `PREPARING`, `AWAITING_PICKUP`, `IN_PROGRESS`, `RETURN_PENDING`, `INSPECTION_PENDING`, `COMPLETED`, `CANCELLED`, `NO_SHOW`, `DISPUTED` |
| Payment | `PENDING`, `PROCESSING`, `PAID`, `FAILED`, `EXPIRED`, `PARTIALLY_REFUNDED`, `REFUNDED`, `DISPUTED` |
| Deposit | `NOT_REQUIRED`, `PENDING`, `HELD`, `PARTIALLY_DEDUCTED`, `RELEASED`, `FORFEITED` |
| Staff Task | `OPEN`, `ASSIGNED`, `ACCEPTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`, `EXPIRED` |
| Return Request | `REQUESTED`, `VALIDATING_LOCATION`, `WAITING_FOR_STORE`, `STAFF_ASSIGNED`, `PICKUP_IN_PROGRESS`, `INSPECTION_PENDING`, `ACCEPTED`, `REJECTED`, `DISPUTED`, `CANCELLED` |
| SOS | `OPEN`, `ACKNOWLEDGED`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, `CLOSED` |
| Content Approval | `DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `REVISION_REQUIRED`, `APPROVED`, `REJECTED`, `SUSPENDED`, `OUTDATED` |
| Settlement | `DRAFT`, `CALCULATED`, `UNDER_REVIEW`, `APPROVED`, `PROCESSING`, `PAID`, `FAILED`, `HELD` |
| Notification Delivery | `QUEUED`, `SENT`, `DELIVERED`, `FAILED`, `READ` |

## Error Code Groups

| Prefix | Meaning |
|---|---|
| `AUTH_*` | Authentication errors |
| `PERMISSION_*` | Authorization/permission errors |
| `VALIDATION_*` | Input/schema validation |
| `STORE_*` | Store domain errors |
| `ASSET_*` | Asset/inventory errors |
| `BOOKING_*` | Booking errors |
| `PAYMENT_*` | Payment errors |
| `RIDE_*` | Ride tracking errors |
| `RETURN_*` | Return/inspection errors |
| `SOS_*` | SOS errors |
| `CONTENT_*` | Place/route/review moderation errors |
| `RATE_LIMIT_*` | Rate limit errors |
| `INTERNAL_*` | Unexpected internal errors |

## Permission Names

| Permission | Meaning |
|---|---|
| `store.read` | Read store data |
| `store.update` | Update store data |
| `branch.create` | Create branch |
| `asset.create` | Create asset |
| `asset.update` | Update asset |
| `booking.read` | Read booking |
| `booking.confirm` | Confirm booking |
| `booking.cancel` | Cancel booking |
| `payment.cash.confirm` | Confirm cash payment |
| `rental.handover` | Perform handover |
| `return.accept` | Accept return |
| `report.financial.read` | Read financial report |
| `staff.manage` | Manage staff |
| `sos.location.read` | Read SOS location |
| `content.approve` | Approve content |
| `platform.store.suspend` | Suspend store |

## Acronyms

| Acronym | Meaning |
|---|---|
| API | Application Programming Interface |
| ADR | Architecture Decision Record |
| FCM | Firebase Cloud Messaging |
| GPS | Global Positioning System |
| MVP | Minimum Viable Product |
| NFR | Non-Functional Requirement |
| OTP | One-Time Password |
| RBAC | Role-Based Access Control |
| RPO | Recovery Point Objective |
| RTO | Recovery Time Objective |
| UAT | User Acceptance Testing |
