# SOFTWARE REQUIREMENTS SPECIFICATION

# Bike Local

**ระบบศูนย์รวมร้านเช่าจักรยานและอุปกรณ์ปั่นจักรยานท้องถิ่น**

เวอร์ชันเอกสาร: 1.0
ประเภทเอกสาร: Software Requirements Specification
เอกสารต้นทาง: Bike Local PRD Version 1.0
สถานะ: Draft for Development and Technical Review
สถาปัตยกรรมหลัก: Cross-platform + Firebase
ฐานข้อมูลเริ่มต้น: Cloud Firestore
ฐานข้อมูลเป้าหมายที่รองรับการย้าย: PostgreSQL และ MongoDB

---

# 1. บทนำ

## 1.1 วัตถุประสงค์ของเอกสาร

เอกสารฉบับนี้กำหนดรายละเอียดความต้องการเชิงระบบและเชิงเทคนิคของ Bike Local เพื่อใช้เป็นมาตรฐานร่วมกันระหว่าง

* เจ้าของผลิตภัณฑ์
* ลูกค้า
* นักลงทุน
* Business Analyst
* UX/UI Designer
* Frontend Developer
* Backend Developer
* Mobile Developer
* QA Engineer
* DevOps Engineer
* Security Engineer
* Data Engineer
* ผู้ดูแลระบบ

เอกสารนี้ใช้สำหรับ

* ประเมินขอบเขตการพัฒนา
* ออกแบบระบบ
* วางแผนโครงการ
* แบ่งงานระหว่าง Frontend และ Backend
* สร้าง API Contract
* ออกแบบฐานข้อมูล
* สร้าง Test Case
* ตรวจรับระบบ
* วางแผนขยายระบบในอนาคต

---

## 1.2 ขอบเขตระบบ

Bike Local เป็น Marketplace และระบบบริหารร้านเช่าจักรยานและอุปกรณ์ปั่นจักรยานท้องถิ่น

ระบบประกอบด้วย

1. แอปสำหรับผู้เช่า
2. ฟังก์ชันสำหรับเจ้าของร้าน ผู้จัดการ และพนักงาน
3. Web Portal สำหรับร้านค้า
4. Web Portal สำหรับผู้ดูแลแพลตฟอร์ม
5. Backend API
6. ระบบจัดการข้อมูล
7. ระบบชำระเงิน
8. ระบบแจ้งเตือน
9. ระบบติดตามกิจกรรมการปั่น
10. ระบบจัดการจุดรับและจุดคืน
11. ระบบ SOS
12. ระบบรายงาน
13. ระบบอนุมัติเนื้อหาและร้านค้า

---

## 1.3 เป้าหมายทางเทคนิค

ระบบต้องมีคุณสมบัติสำคัญดังนี้

* พัฒนาบนสถาปัตยกรรม Cross-platform
* รองรับ Android, iOS และ Web
* ใช้ Firebase เป็นโครงสร้างพื้นฐานช่วงเริ่มต้น
* รองรับการทำงานแบบ Serverless
* รองรับการขยายจำนวนผู้ใช้และร้านค้า
* แยก Business Logic ออกจาก Firebase
* ออกแบบฐานข้อมูลให้ย้ายไป PostgreSQL หรือ MongoDB ได้
* ให้ Frontend และ Backend พัฒนาควบคู่กันได้
* ใช้ API Contract เป็นข้อตกลงกลาง
* มีระบบรักษาความปลอดภัยตามบทบาท
* รองรับหลายร้าน หลายสาขา และหลายพนักงาน
* มีระบบ Audit Log
* รองรับภาษาไทยและภาษาอังกฤษ

---

## 1.4 คำศัพท์สำคัญ

| คำศัพท์        | ความหมาย                                             |
| -------------- | ---------------------------------------------------- |
| ผู้เช่า        | ผู้ใช้งานที่ค้นหา จอง และเช่าจักรยานหรืออุปกรณ์      |
| ร้านค้า        | ผู้ให้บริการเช่าจักรยาน                              |
| สาขา           | สถานที่ดำเนินงานของร้านค้า                           |
| พนักงาน        | ผู้ที่ได้รับสิทธิ์ให้จัดการงานของร้าน                |
| Asset          | ทรัพย์สินที่นำมาให้เช่า เช่น จักรยาน                 |
| Equipment      | อุปกรณ์เสริม เช่น หมวกกันน็อก                        |
| Booking        | รายการจอง                                            |
| Rental         | รายการเช่าที่เริ่มส่งมอบแล้ว                         |
| Ride Session   | กิจกรรมการปั่นที่บันทึกด้วย GPS                      |
| Return Request | คำขอคืนจักรยาน                                       |
| Smart Lock     | อุปกรณ์ล็อกจักรยานที่สั่งงานผ่านระบบ                 |
| Smart Dock     | จุดจอดที่ตรวจสอบการคืนอัตโนมัติ                      |
| SOS Case       | เหตุการณ์ขอความช่วยเหลือ                             |
| Marketplace    | ระบบกลางที่รวมร้านค้าหลายราย                         |
| Tenant         | ร้านค้าหรือองค์กรที่แยกขอบเขตข้อมูลจากร้านอื่น       |
| API Contract   | ข้อกำหนด Request, Response และ Error ของ API         |
| Repository     | Interface สำหรับเข้าถึงข้อมูลโดยไม่ผูกกับฐานข้อมูล   |
| Adapter        | Implementation ที่เชื่อม Repository กับฐานข้อมูลจริง |

---

# 2. ภาพรวมผลิตภัณฑ์

## 2.1 ระบบย่อย

Bike Local ประกอบด้วยระบบย่อยดังนี้

### 2.1.1 Bike Local Application

แอป Cross-platform สำหรับ

* ผู้เช่า
* เจ้าของร้าน
* ผู้จัดการ
* พนักงาน
* ฝ่ายบัญชี

ระบบใช้ Role-Based Navigation เพื่อแสดงเมนูตามบทบาทของบัญชี

### 2.1.2 Merchant Web Portal

ระบบสำหรับร้านค้าที่ต้องการใช้งานบนหน้าจอขนาดใหญ่ เช่น

* จัดการสาขา
* จัดการจักรยาน
* จัดการพนักงาน
* ดูปฏิทินการจอง
* ดูรายงาน
* ตรวจสอบธุรกรรม

### 2.1.3 Admin Web Portal

ระบบสำหรับผู้ดูแลแพลตฟอร์ม เช่น

* อนุมัติร้านค้า
* ตรวจสอบผู้ใช้งาน
* ตรวจสอบธุรกรรม
* จัดการข้อพิพาท
* อนุมัติสถานที่และเส้นทาง
* ดูรายงานภาพรวม

### 2.1.4 Backend Services

รับผิดชอบ

* Authentication Integration
* Authorization
* Booking
* Inventory
* Payment
* Rental
* Ride Tracking
* Return
* SOS
* Notification
* Reporting
* Content Moderation
* Settlement
* Audit Log

---

## 2.2 ผู้มีส่วนเกี่ยวข้อง

| Stakeholder      | ความรับผิดชอบ                      |
| ---------------- | ---------------------------------- |
| Product Owner    | กำหนดลำดับความสำคัญและขอบเขต       |
| Platform Admin   | ดูแลระบบและอนุมัติข้อมูล           |
| Store Owner      | จัดการร้าน สาขา รถ และพนักงาน      |
| Store Manager    | บริหารงานประจำวัน                  |
| Staff            | ส่งมอบ รับคืน และช่วยเหลือลูกค้า   |
| Accounting       | ตรวจสอบรายรับและการชำระเงิน        |
| Renter           | จอง ชำระเงิน ปั่น และคืนจักรยาน    |
| Support          | รับข้อร้องเรียนและข้อพิพาท         |
| Development Team | พัฒนาและดูแลระบบ                   |
| Investor/Client  | ตรวจสอบเป้าหมายและผลลัพธ์ทางธุรกิจ |

---

# 3. สถาปัตยกรรมระบบ

## 3.1 Technology Stack ที่แนะนำ

### Frontend

* Flutter
* Dart
* Responsive UI
* Material Design
* State Management แบบแยกจาก UI
* Generated API Client จาก OpenAPI
* Local encrypted storage สำหรับข้อมูลสำคัญ
* Local database สำหรับ Ride Tracking และ Offline Queue

### Backend

* TypeScript
* Node.js Runtime
* Firebase Cloud Functions หรือ Google Cloud Run
* REST API
* OpenAPI 3.1
* JSON Schema
* Firebase Admin SDK
* Domain-Driven Modular Architecture
* Repository Pattern
* Ports and Adapters Architecture

### Firebase Services

* Firebase Authentication
* Cloud Firestore
* Cloud Storage
* Firebase Cloud Messaging
* Firebase App Check
* Firebase Analytics
* Firebase Crashlytics
* Firebase Remote Config
* Firebase Hosting
* Firebase Local Emulator Suite

### External Services

* Payment Gateway
* Maps and Geocoding Provider
* SMS/OTP Provider
* Email Provider
* Emergency Call Integration
* Smart Lock/GPS Provider ใน Phase 2

---

## 3.2 Client Applications

โครงการควรแบ่ง Frontend เป็นส่วนต่อไปนี้

```text
apps/
├── bike_local_app/
│   ├── Android
│   ├── iOS
│   └── Web/PWA
├── merchant_portal/
│   └── Web
└── admin_portal/
    └── Web
```

โค้ดส่วนกลางจัดเก็บใน Shared Packages

```text
packages/
├── design_system/
├── api_client/
├── domain_models/
├── localization/
├── authentication/
├── maps/
├── notifications/
├── ride_tracking/
├── validation/
└── common_widgets/
```

---

## 3.3 Backend Modules

```text
backend/
├── identity/
├── users/
├── stores/
├── branches/
├── staff/
├── catalog/
├── inventory/
├── pricing/
├── booking/
├── payment/
├── rental/
├── ride/
├── return/
├── sos/
├── routes/
├── places/
├── reviews/
├── notification/
├── reporting/
├── settlement/
├── moderation/
├── audit/
└── shared/
```

แต่ละ Module ต้องประกอบด้วย

```text
module/
├── domain/
├── application/
├── infrastructure/
├── api/
└── tests/
```

---

## 3.4 Architectural Layers

### Presentation Layer

รับผิดชอบ

* หน้าจอ
* การแสดงข้อมูล
* Form Validation เบื้องต้น
* Navigation
* State Management
* การเรียก API

Presentation Layer ต้องไม่มี Business Rule สำคัญ

### Application Layer

รับผิดชอบ

* Use Case
* Workflow
* Application Service
* Permission Check
* Transaction Coordination
* Event Publishing

### Domain Layer

รับผิดชอบ

* Entity
* Value Object
* Business Rule
* State Transition
* Domain Event
* Repository Interface

Domain Layer ต้องไม่อ้างอิง Firebase, Firestore หรือ Framework ภายนอก

### Infrastructure Layer

รับผิดชอบ

* Firestore Adapter
* PostgreSQL Adapter ในอนาคต
* MongoDB Adapter ในอนาคต
* Payment Gateway Adapter
* Notification Adapter
* Storage Adapter
* Map Adapter
* Smart Lock Adapter

---

# 4. แนวทางรองรับการย้ายฐานข้อมูล

## 4.1 หลักการสำคัญ

ระบบต้องออกแบบตามหลักต่อไปนี้

1. Frontend ห้ามเข้าถึงข้อมูลธุรกิจสำคัญใน Firestore โดยตรง
2. Frontend ติดต่อข้อมูลผ่าน Backend API
3. Business Logic ต้องอยู่ใน Domain/Application Layer
4. Domain Model ต้องไม่ใช้ชนิดข้อมูลเฉพาะของ Firebase
5. Repository Interface ต้องไม่ขึ้นกับฐานข้อมูล
6. Firestore เป็นเพียง Infrastructure Adapter
7. API Response ต้องไม่เปิดเผยโครงสร้าง Firestore
8. ID ของ Domain ต้องไม่ผูกกับ Document Path
9. ใช้ Schema Version สำหรับทุก Entity สำคัญ
10. มีระบบ Export, Import และ Data Validation

---

## 4.2 ข้อยกเว้นสำหรับ Direct Firebase Access

อนุญาตให้ Frontend เข้าถึง Firebase โดยตรงเฉพาะ

* Authentication
* FCM Token Registration
* Analytics
* Crashlytics
* Remote Config
* Read-only Public Configuration ที่ไม่มีข้อมูลสำคัญ

ข้อมูลต่อไปนี้ต้องผ่าน Backend เท่านั้น

* Booking
* Payment
* Deposit
* Cash Confirmation
* Asset Availability
* Rental State
* Return Confirmation
* Settlement
* SOS
* Permission
* Staff Management
* Financial Report

---

## 4.3 Repository Interfaces

ตัวอย่าง Interface เชิงแนวคิด

```typescript
interface BookingRepository {
  findById(id: string): Promise<Booking | null>;
  findActiveByAsset(
    assetId: string,
    startAt: Date,
    endAt: Date
  ): Promise<Booking[]>;
  save(booking: Booking): Promise<void>;
  updateWithVersion(
    booking: Booking,
    expectedVersion: number
  ): Promise<void>;
}
```

Infrastructure สามารถมี Implementation เช่น

```text
FirestoreBookingRepository
PostgreSQLBookingRepository
MongoBookingRepository
InMemoryBookingRepository
```

---

## 4.4 Canonical Data Model

ทุก Entity หลักควรมี Field มาตรฐาน

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

ข้อกำหนด

* `id` ใช้ UUID หรือ Identifier ที่ไม่ขึ้นกับฐานข้อมูล
* เวลาใช้ UTC
* จำนวนเงินเก็บเป็นหน่วยย่อย เช่น สตางค์
* ห้ามใช้ Floating Point สำหรับยอดเงิน
* Enum เก็บเป็น String Code ที่มีเอกสารกำกับ
* การลบข้อมูลธุรกิจใช้ Soft Delete เมื่อเหมาะสม
* ข้อมูลการเงินและ Audit Log ห้ามแก้ย้อนหลังโดยไม่มี Event ใหม่

---

## 4.5 แนวทางออกแบบ Firestore

เพื่อให้ง่ายต่อการย้ายฐานข้อมูล ให้ใช้ Top-Level Collections เป็นหลัก

```text
users
auth_identities
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
notifications
settlements
audit_logs
outbox_events
system_configs
```

ไม่ควรเก็บข้อมูลสำคัญเป็น Nested Array ขนาดใหญ่ภายใน Document เดียว

ควรแยกข้อมูลที่มีการเพิ่มจำนวนต่อเนื่อง เช่น

* Payment Events
* GPS Points
* Audit Logs
* Notifications
* Booking Items
* Staff Tasks

---

## 4.6 การรองรับ PostgreSQL

เมื่อต้องย้ายไป PostgreSQL

* Top-Level Collection จะแปลงเป็น Table
* Reference ID จะแปลงเป็น Foreign Key
* Booking Item จะแปลงเป็น Child Table
* Store Member จะแปลงเป็น Join Table
* Route และ Place ใช้ PostGIS ได้
* GPS Track สามารถเก็บเป็น Geometry หรือ Time-Series Table
* Transaction การจองใช้ Database Transaction และ Row Lock
* Reporting ใช้ SQL Aggregation หรือ Data Warehouse

Firebase Data Connect สามารถเป็นหนึ่งในทางเลือกสำหรับการเชื่อมระบบ Firebase กับ PostgreSQL แต่ Domain และ API ต้องไม่ขึ้นกับ Data Connect โดยตรง

---

## 4.7 การรองรับ MongoDB

เมื่อต้องย้ายไป MongoDB

* Top-Level Collection สามารถคงรูปแบบใกล้เคียง Firestore
* ใช้ Object ID หรือ UUID ตามนโยบายระบบ
* Reference สำคัญต้องเก็บเป็น ID ชัดเจน
* หลีกเลี่ยง Document ขนาดใหญ่
* Ride Track ต้องแยกเป็น Chunk
* Payment Event และ Audit Log แยก Collection
* ใช้ Transaction สำหรับขั้นตอนที่ต้องเปลี่ยนหลาย Document

---

## 4.8 Data Migration Strategy

กระบวนการย้ายฐานข้อมูลควรประกอบด้วย

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

---

# 5. API-First และการพัฒนาขนานกัน

## 5.1 Contract-First Development

Frontend และ Backend ต้องเริ่มงานจาก API Contract ก่อน Implementation

API Contract ต้องระบุ

* Endpoint
* HTTP Method
* Authentication
* Permission
* Request Schema
* Response Schema
* Error Code
* Example Request
* Example Response
* Pagination
* Sorting
* Filtering
* Idempotency
* API Version

---

## 5.2 API Specification

ใช้ OpenAPI 3.1 เป็นเอกสารกลาง

โครงสร้างไฟล์ตัวอย่าง

```text
contracts/
├── openapi.yaml
├── schemas/
│   ├── user.yaml
│   ├── store.yaml
│   ├── asset.yaml
│   ├── booking.yaml
│   ├── payment.yaml
│   ├── ride.yaml
│   ├── return.yaml
│   └── error.yaml
└── examples/
```

---

## 5.3 Generated Clients

จาก OpenAPI ต้องสามารถสร้าง

* Dart API Client สำหรับ Flutter
* TypeScript Types สำหรับ Backend
* Mock Server
* API Documentation
* Contract Test

Frontend ห้ามสร้าง Data Model ซ้ำด้วยมือ หาก Model นั้นมีอยู่ใน API Contract

---

## 5.4 Mock-First Workflow

ก่อน Backend เสร็จ Frontend ต้องสามารถ

* ใช้ Mock API Server
* ใช้ Static Fixture
* จำลอง Success Response
* จำลอง Validation Error
* จำลอง Permission Error
* จำลอง Payment Pending
* จำลอง GPS Error
* จำลอง Network Error

Backend ต้องสามารถพัฒนาโดยไม่รอ UI ผ่าน

* API Unit Test
* Contract Test
* Postman/Bruno Collection
* Emulator
* Seed Data

---

## 5.5 Definition of Ready สำหรับแต่ละ Feature

Feature จะเริ่มพัฒนาได้เมื่อมี

* User Story
* Acceptance Criteria
* Screen Flow
* API Contract
* Data Model
* Permission Matrix
* Error Cases
* Analytics Events
* Test Scenario

---

## 5.6 Definition of Done

Feature ถือว่าเสร็จเมื่อ

* Frontend เชื่อม API จริง
* Backend ผ่าน Unit Test
* Contract Test ผ่าน
* Integration Test ผ่าน
* Permission Test ผ่าน
* Error Handling ครบ
* Logging ครบ
* Analytics Event ครบ
* Documentation อัปเดต
* QA ตรวจรับ
* Product Owner ยอมรับ

---

# 6. Authentication และ Authorization

## 6.1 Authentication Methods

ระบบต้องรองรับ

* เบอร์โทรศัพท์และ OTP
* อีเมลและรหัสผ่าน
* Google Sign-In
* Apple Sign-In ในระยะถัดไป

Firebase Authentication ใช้สำหรับยืนยันตัวตน แต่ระบบต้องมี Domain User ID แยกจาก Firebase UID

---

## 6.2 Auth Identity Model

```text
users
- id
- display_name
- phone
- email
- locale
- status

auth_identities
- id
- user_id
- provider
- provider_subject
- verified_at
```

ข้อดีของการแยก Auth Identity

* เปลี่ยนผู้ให้บริการ Authentication ได้
* ผู้ใช้หนึ่งคนผูกหลายวิธีเข้าสู่ระบบได้
* ไม่ใช้ Firebase UID เป็น Primary Key ทางธุรกิจ
* รองรับการรวมบัญชี

---

## 6.3 Role-Based Access Control

บทบาทเริ่มต้น

* RENTER
* STORE_OWNER
* STORE_MANAGER
* STORE_STAFF
* STORE_ACCOUNTING
* PLATFORM_ADMIN
* PLATFORM_MODERATOR
* PLATFORM_SUPPORT

สิทธิ์ต้องผูกกับทั้ง

* User
* Store
* Branch
* Role
* Permission

ผู้ใช้เดียวสามารถมีหลายบทบาทและอยู่ในหลายร้านได้

---

## 6.4 Permission Examples

```text
store.read
store.update
branch.create
asset.create
asset.update
booking.read
booking.confirm
booking.cancel
payment.cash.confirm
rental.handover
return.accept
report.financial.read
staff.manage
sos.location.read
content.approve
platform.store.suspend
```

---

## 6.5 Security Requirements

* ทุก API ที่ไม่ใช่ Public API ต้องตรวจ Token
* ทุกคำสั่งต้องตรวจ Permission ฝั่ง Backend
* ห้ามพึ่งการซ่อนปุ่มใน Frontend เป็นการรักษาความปลอดภัย
* Endpoint สำคัญต้องตรวจ App Check
* การเปลี่ยนสิทธิ์ต้องบันทึก Audit Log
* Admin Action ต้องระบุเหตุผล
* Session ที่มีความเสี่ยงต้องบังคับยืนยันตัวตนซ้ำ

---

# 7. Functional Requirements

# 7.1 การเริ่มใช้งานครั้งแรก

### FR-ONB-001 เลือกประเภทผู้ใช้

เมื่อเปิดแอปครั้งแรก ระบบต้องให้ผู้ใช้เลือก

* ต้องการเช่าจักรยาน
* เป็นเจ้าของร้านเช่าจักรยาน

### FR-ONB-002 เปลี่ยนบทบาท

ผู้ใช้ต้องสามารถเพิ่มหรือเปลี่ยนบทบาทภายหลังได้

### FR-ONB-003 หลายบทบาท

หนึ่งบัญชีสามารถเป็นทั้งผู้เช่า เจ้าของร้าน หรือพนักงานได้

### FR-ONB-004 ภาษา

ผู้ใช้ต้องสามารถเลือกภาษาไทยหรืออังกฤษได้

---

# 7.2 การลงทะเบียนผู้ใช้

### FR-USR-001 สมัครสมาชิก

ผู้ใช้ต้องสามารถสมัครด้วยช่องทางที่ระบบรองรับ

### FR-USR-002 โปรไฟล์

ผู้ใช้ต้องสามารถจัดการ

* ชื่อ
* รูปโปรไฟล์
* เบอร์โทรศัพท์
* อีเมล
* ภาษา
* น้ำหนักโดยสมัครใจ
* ผู้ติดต่อฉุกเฉินโดยสมัครใจ

### FR-USR-003 การยินยอม

ระบบต้องเก็บ

* เวอร์ชันเงื่อนไขการใช้บริการ
* เวอร์ชันนโยบายความเป็นส่วนตัว
* วันเวลาให้ความยินยอม
* การยินยอมใช้ GPS
* การยินยอมรับการตลาด

### FR-USR-004 ลบบัญชี

ผู้ใช้ต้องสามารถยื่นคำขอลบบัญชีได้ โดยข้อมูลที่ต้องเก็บตามกฎหมายหรือธุรกรรมจะถูกแยกและจำกัดการเข้าถึง

---

# 7.3 การลงทะเบียนร้าน

### FR-STR-001 สร้างร้าน

ผู้ใช้ที่เลือกบทบาทร้านค้าต้องสามารถส่งข้อมูลสมัครร้านได้

### FR-STR-002 เอกสารร้าน

ร้านสามารถอัปโหลด

* เอกสารยืนยันตัวตน
* เอกสารธุรกิจ
* บัญชีรับเงิน
* รูปภาพร้าน

### FR-STR-003 สถานะการอนุมัติ

สถานะร้านประกอบด้วย

* DRAFT
* SUBMITTED
* UNDER_REVIEW
* REVISION_REQUIRED
* APPROVED
* REJECTED
* SUSPENDED
* CLOSED

### FR-STR-004 เปิดรับการจอง

ร้านจะเปิดรับการจองได้เฉพาะเมื่อสถานะเป็น APPROVED

### FR-STR-005 แก้ไขข้อมูลสำคัญ

การแก้ไขชื่อผู้ประกอบการ บัญชีรับเงิน หรือเอกสารสำคัญอาจต้องผ่านการตรวจสอบใหม่

---

# 7.4 การจัดการสาขา

### FR-BRN-001 หลายสาขา

ร้านหนึ่งร้านสามารถมีหลายสาขา

### FR-BRN-002 ข้อมูลสาขา

แต่ละสาขาต้องมี

* ชื่อ
* ที่อยู่
* พิกัด
* เบอร์ติดต่อ
* เวลาทำการ
* สถานะ
* Time Zone

### FR-BRN-003 สถานะสาขา

สถานะสาขา

* ACTIVE
* TEMPORARILY_CLOSED
* INACTIVE

### FR-BRN-004 ปิดสาขาชั่วคราว

ร้านสามารถปิดสาขาชั่วคราวและกำหนดวันเปิดใหม่ได้

---

# 7.5 การจัดการพนักงาน

### FR-STF-001 เชิญพนักงาน

เจ้าของร้านสามารถเชิญพนักงานผ่าน

* เบอร์โทรศัพท์
* อีเมล
* ลิงก์
* QR Code

### FR-STF-002 กำหนดบทบาท

เจ้าของร้านกำหนดบทบาทและสาขาที่พนักงานเข้าถึงได้

### FR-STF-003 กำหนดสิทธิ์เฉพาะ

เจ้าของร้านสามารถเพิ่มหรือลดสิทธิ์เฉพาะได้

### FR-STF-004 ระงับพนักงาน

เจ้าของร้านสามารถระงับสิทธิ์พนักงานได้ทันที

### FR-STF-005 Audit Log

การเพิ่ม ลบ หรือแก้ไขสิทธิ์ต้องบันทึก Audit Log

---

# 7.6 การจัดการจักรยาน

### FR-AST-001 เพิ่มจักรยาน

ร้านสามารถเพิ่มจักรยานพร้อมข้อมูล

* รหัส
* QR Code
* ประเภท
* ยี่ห้อ
* รุ่น
* สี
* ขนาด
* รูปภาพ
* สาขา
* ราคา
* เงินมัดจำ

### FR-AST-002 รหัสไม่ซ้ำ

รหัสจักรยานต้องไม่ซ้ำภายในร้าน

### FR-AST-003 สถานะจักรยาน

สถานะที่รองรับ

* AVAILABLE
* RESERVED
* PREPARING
* AWAITING_HANDOVER
* RENTED
* RETURN_PENDING
* INSPECTION_PENDING
* MAINTENANCE
* INACTIVE
* LOST

### FR-AST-004 ประวัติสถานะ

ทุกการเปลี่ยนสถานะต้องมีประวัติ

### FR-AST-005 ป้องกันการจองซ้ำ

จักรยานเดียวกันต้องไม่ถูกยืนยันให้หลาย Booking ในช่วงเวลาที่ทับซ้อนกัน

---

# 7.7 การจัดการอุปกรณ์

### FR-EQP-001 เพิ่มอุปกรณ์

ร้านสามารถเพิ่มประเภทและจำนวนอุปกรณ์

### FR-EQP-002 รูปแบบการเช่า

อุปกรณ์สามารถกำหนดว่า

* เช่าแยกได้
* ต้องเช่าพร้อมจักรยาน
* รวมอยู่ในแพ็กเกจ
* ต้องวางเงินมัดจำ

### FR-EQP-003 Inventory

ระบบต้องตรวจสอบจำนวนอุปกรณ์คงเหลือในช่วงเวลาจอง

### FR-EQP-004 การคืนอุปกรณ์

อุปกรณ์ต้องถูกตรวจรับพร้อมจักรยานก่อนปิดรายการเช่า

---

# 7.8 จุดรับและจุดคืน

### FR-PNT-001 หลายจุด

ร้านสามารถกำหนดจุดรับและจุดคืนได้หลายจุด

### FR-PNT-002 ประเภทจุด

* STORE
* BRANCH
* PARTNER
* HOTEL
* TOURIST_LOCATION
* MANUAL_PICKUP
* SMART_DOCK

### FR-PNT-003 เงื่อนไขจุด

แต่ละจุดสามารถกำหนด

* เวลาทำการ
* ประเภทจักรยานที่รองรับ
* ค่าธรรมเนียม
* จำนวนที่รองรับ
* ต้องมีพนักงานหรือไม่
* รับอย่างเดียว
* คืนอย่างเดียว
* รับและคืน

### FR-PNT-004 คืนต่างจุด

ร้านสามารถอนุญาตหรือปฏิเสธการคืนต่างจุดได้

### FR-PNT-005 ตรวจสอบระยะทาง

เมื่อคืนด้วย GPS ระบบต้องตรวจสอบว่าผู้ใช้อยู่ภายในรัศมีที่กำหนด

---

# 7.9 การค้นหาร้านและจักรยาน

### FR-SRH-001 ค้นหาจากตำแหน่ง

ผู้ใช้สามารถค้นหาร้านใกล้ตำแหน่งปัจจุบัน

### FR-SRH-002 ค้นหาจากข้อความ

ผู้ใช้สามารถค้นหาจาก

* ชื่อร้าน
* จังหวัด
* อำเภอ
* สถานที่
* จุดเช็กอิน

### FR-SRH-003 ตัวกรอง

รองรับตัวกรอง

* ประเภทจักรยาน
* ราคา
* ระยะทาง
* คะแนน
* วันและเวลา
* จักรยานว่าง
* รับเงินสด
* คืนต่างจุด
* จักรยานไฟฟ้า
* อุปกรณ์เสริม

### FR-SRH-004 Map View

ผู้ใช้สามารถดูผลการค้นหาบนแผนที่

### FR-SRH-005 Availability

ผลการค้นหาต้องแสดง Availability ตามช่วงเวลาที่ผู้ใช้เลือก

---

# 7.10 ระบบราคา

### FR-PRC-001 รูปแบบราคา

รองรับ

* รายชั่วโมง
* ครึ่งวัน
* รายวัน
* หลายวัน
* แพ็กเกจ
* วันหยุด
* ช่วงเวลาเฉพาะ

### FR-PRC-002 ค่าใช้จ่ายเพิ่มเติม

รองรับ

* ค่าคืนต่างจุด
* ค่าพนักงานไปรับ
* ค่าอุปกรณ์
* เงินมัดจำ
* ค่าปรับเกินเวลา
* ค่าความเสียหาย

### FR-PRC-003 Price Snapshot

เมื่อสร้าง Booking ระบบต้องเก็บ Price Snapshot เพื่อไม่ให้ราคาย้อนหลังเปลี่ยนตามการแก้ไขราคาใหม่

### FR-PRC-004 จำนวนเงิน

จำนวนเงินต้องคำนวณด้วย Integer Minor Unit

---

# 7.11 ระบบจอง

### FR-BKG-001 สร้าง Booking

ผู้ใช้เลือก

* ร้าน
* สาขา
* จักรยาน
* วันเวลา
* จุดรับ
* จุดคืน
* อุปกรณ์
* วิธีชำระเงิน

### FR-BKG-002 Booking Hold

ระหว่างชำระเงิน ระบบสามารถ Hold จักรยานในเวลาจำกัด

### FR-BKG-003 Idempotency

การสร้าง Booking ต้องรองรับ Idempotency Key เพื่อป้องกันรายการซ้ำ

### FR-BKG-004 Booking State

สถานะ Booking

* PENDING_PAYMENT
* PENDING_STORE_CONFIRMATION
* CONFIRMED
* PREPARING
* AWAITING_PICKUP
* IN_PROGRESS
* RETURN_PENDING
* INSPECTION_PENDING
* COMPLETED
* CANCELLED
* NO_SHOW
* DISPUTED

### FR-BKG-005 การยกเลิก

ระบบต้องคำนวณสิทธิ์คืนเงินตามนโยบายของร้านและเวลาที่ยกเลิก

### FR-BKG-006 QR Booking

หลังยืนยัน Booking ระบบสร้าง QR Code ที่มี Token แบบใช้ครั้งเดียวหรือมีอายุจำกัด

---

# 7.12 ระบบชำระเงินออนไลน์

### FR-PAY-001 Payment Intent

Backend ต้องสร้าง Payment Intent ผ่าน Payment Gateway Adapter

### FR-PAY-002 Webhook

สถานะชำระเงินต้องยืนยันจาก Webhook หรือ Server-to-Server Verification

### FR-PAY-003 ห้ามเชื่อ Client

Frontend Response เพียงอย่างเดียวไม่ถือเป็นหลักฐานการชำระเงินสำเร็จ

### FR-PAY-004 Payment State

* PENDING
* PROCESSING
* PAID
* FAILED
* EXPIRED
* PARTIALLY_REFUNDED
* REFUNDED
* DISPUTED

### FR-PAY-005 Webhook Idempotency

Webhook เดิมต้องไม่สร้างการชำระเงินซ้ำ

### FR-PAY-006 แจ้งเตือนพนักงาน

เมื่อชำระเงินสำเร็จ ระบบต้อง

* อัปเดต Booking
* สร้าง Staff Task
* ส่ง Notification
* บันทึก Payment Event

---

# 7.13 การชำระเงินสด

### FR-CSH-001 เลือกเงินสด

ผู้ใช้สามารถเลือก

* เงินสดที่ร้าน
* เงินสดกับพนักงาน

### FR-CSH-002 Cash Pending

Booking ต้องอยู่ในสถานะรอยืนยันเงินสดจนกว่าพนักงานกดยืนยัน

### FR-CSH-003 Permission

เฉพาะพนักงานที่มี `payment.cash.confirm` จึงยืนยันเงินสดได้

### FR-CSH-004 หลักฐาน

ระบบบันทึก

* ผู้รับเงิน
* เวลา
* จำนวนเงิน
* สาขา
* หมายเหตุ
* รูปหลักฐาน ถ้ามี

### FR-CSH-005 แก้ไขรายการ

การยกเลิกหรือแก้ไขเงินสดต้องระบุเหตุผลและบันทึก Audit Log

---

# 7.14 เงินมัดจำ

### FR-DEP-001 กำหนดเงินมัดจำ

ร้านสามารถกำหนดตาม

* จักรยาน
* ประเภท
* แพ็กเกจ
* ระยะเวลา

### FR-DEP-002 Deposit State

* NOT_REQUIRED
* PENDING
* HELD
* PARTIALLY_DEDUCTED
* RELEASED
* FORFEITED

### FR-DEP-003 คืนเงินมัดจำ

ห้ามคืนเงินมัดจำก่อนยืนยันรับคืนและตรวจสภาพ

---

# 7.15 การส่งมอบจักรยาน

### FR-HND-001 ส่งมอบที่ร้าน

พนักงานสแกน QR และตรวจสอบ Booking

### FR-HND-002 Checklist

พนักงานต้องสามารถบันทึก

* ภาพก่อนส่งมอบ
* สภาพจักรยาน
* อุปกรณ์
* จุดเสียหายเดิม
* ผู้ส่งมอบ
* เวลา

### FR-HND-003 ยืนยันผู้เช่า

ระบบต้องยืนยันว่าผู้รับจักรยานตรงกับ Booking

### FR-HND-004 เริ่ม Rental

เมื่อส่งมอบสำเร็จ

* Booking เป็น IN_PROGRESS
* Asset เป็น RENTED
* สร้าง Rental Session
* อนุญาตให้เริ่ม Ride Session

---

# 7.16 การแจ้งเตือนให้พนักงานปลดล็อก

### FR-ULK-001 แจ้งเตือนหลังชำระเงิน

เมื่อชำระเงินหรือยืนยันเงินสด ระบบสร้างงานปลดล็อกหรือส่งมอบ

### FR-ULK-002 มอบหมายงาน

ร้านสามารถ

* มอบหมายพนักงาน
* ให้พนักงานกดรับงาน
* กำหนดสาขารับผิดชอบ

### FR-ULK-003 สถานะงาน

* OPEN
* ASSIGNED
* ACCEPTED
* IN_PROGRESS
* COMPLETED
* CANCELLED
* EXPIRED

### FR-ULK-004 Smart Lock

Phase 2 ต้องรองรับการปลดล็อกอัตโนมัติผ่าน Smart Lock Adapter

---

# 7.17 Ride Tracking

### FR-RID-001 เริ่มปั่น

ผู้ใช้กดเริ่มปั่นได้เมื่อ Rental อยู่ในสถานะ IN_PROGRESS

### FR-RID-002 ใช้ GPS โทรศัพท์

MVP ต้องใช้ GPS จากโทรศัพท์ของผู้เช่า

### FR-RID-003 ข้อมูลกิจกรรม

ระบบบันทึก

* เวลา
* พิกัด
* ระยะทาง
* ความเร็ว
* ความสูงโดยประมาณ
* จุดหยุด
* ความแม่นยำ GPS
* สถานะแบตเตอรี่เท่าที่ระบบอนุญาต

### FR-RID-004 Background Tracking

ระบบต้องรองรับการเก็บตำแหน่งขณะหน้าจอดับตามข้อจำกัดของระบบปฏิบัติการ

### FR-RID-005 Local Buffer

ข้อมูล GPS ต้องบันทึกลง Local Storage ก่อนส่งขึ้น Server เพื่อป้องกันข้อมูลสูญหาย

### FR-RID-006 Batch Upload

ข้อมูลตำแหน่งต้องส่งเป็น Batch หรือ Chunk ไม่ส่งทุกจุดเป็นธุรกรรมแยกโดยไม่จำเป็น

### FR-RID-007 GPS Gap

เมื่อ GPS ขาดหาย ระบบต้องบันทึกช่วงที่ไม่มีข้อมูลและห้ามสร้างพิกัดสมมติ

### FR-RID-008 Resume

หากแอปปิดโดยไม่ตั้งใจ ผู้ใช้ต้องกลับมาดำเนิน Ride Session เดิมได้

### FR-RID-009 แคลอรี

การคำนวณแคลอรีต้องแสดงว่าเป็นค่าประมาณ

---

# 7.18 การแสดงแผนที่

### FR-MAP-001 เส้นทางจริง

แผนที่ต้องแสดงเส้นทางจาก GPS ที่บันทึกได้

### FR-MAP-002 ข้อมูลบนแผนที่

แสดง

* จุดเริ่ม
* จุดสิ้นสุด
* เส้นทาง
* จุดพัก
* จุดคืน
* สถานที่แนะนำ
* จุดช่วยเหลือ

### FR-MAP-003 ประวัติ

ผู้ใช้สามารถดู Ride Session ย้อนหลัง

### FR-MAP-004 ความเป็นส่วนตัว

เส้นทางเป็นข้อมูลส่วนตัวโดยค่าเริ่มต้น

### FR-MAP-005 แชร์

การแชร์ต้องสร้างข้อมูลหรือรูปสรุปที่ไม่เปิดเผยข้อมูลส่วนตัวเกินจำเป็น

---

# 7.19 การจบการปั่น

### FR-END-001 หยุดกิจกรรม

การกดจบการปั่นต้องหยุด Ride Tracking และสร้าง Ride Summary

### FR-END-002 ไม่ปิด Rental

การจบการปั่นต้องไม่ปิดรายการเช่าโดยอัตโนมัติ

### FR-END-003 สถานะรอคืน

Booking ต้องเปลี่ยนเป็น RETURN_PENDING

### FR-END-004 ความรับผิดชอบ

ระบบต้องแจ้งผู้ใช้ว่าจักรยานยังอยู่ในความรับผิดชอบจนกว่าร้านยืนยันรับคืน

---

# 7.20 การคืนจักรยาน

### FR-RET-001 เลือกรูปแบบคืน

รองรับ

* คืนที่ร้าน
* คืนที่จุดที่กำหนด
* ให้พนักงานไปรับ
* Smart Dock ใน Phase 2

### FR-RET-002 หลักฐานการคืน

MVP ต้องรองรับ

* ภาพจักรยาน
* ภาพจุดจอด
* พิกัด
* เวลา
* หมายเหตุ

### FR-RET-003 Return State

* REQUESTED
* VALIDATING_LOCATION
* WAITING_FOR_STORE
* STAFF_ASSIGNED
* PICKUP_IN_PROGRESS
* INSPECTION_PENDING
* ACCEPTED
* REJECTED
* DISPUTED
* CANCELLED

### FR-RET-004 การแจ้งเตือนร้าน

เมื่อผู้ใช้ส่งคำขอคืน ร้านและพนักงานต้องได้รับแจ้งเตือน

### FR-RET-005 ยืนยันรับคืน

เฉพาะผู้มีสิทธิ์หรือ Smart Dock จึงยืนยันรับคืนได้

### FR-RET-006 ตรวจสภาพ

ก่อนยืนยันรับคืน ต้องสามารถบันทึก

* สภาพ
* รูปภาพ
* อุปกรณ์
* ความเสียหาย
* ค่าใช้จ่าย
* ผู้ตรวจ

### FR-RET-007 ปิดรายการ

ระบบปิด Rental หลัง

* ยืนยันรับคืน
* คำนวณยอดสุดท้าย
* จัดการเงินมัดจำ
* บันทึก Inspection

### FR-RET-008 Asset Availability

จักรยานจะกลับเป็น AVAILABLE หลังผ่านการตรวจสภาพเท่านั้น

---

# 7.21 บริการพนักงานไปรับจักรยาน

### FR-PKU-001 ตรวจพื้นที่

ระบบต้องตรวจว่าตำแหน่งอยู่ในพื้นที่บริการ

### FR-PKU-002 ค่าบริการ

ระบบแสดงค่าบริการก่อนยืนยัน

### FR-PKU-003 มอบหมายพนักงาน

ร้านสามารถมอบหมายหรือเปิดให้พนักงานรับงาน

### FR-PKU-004 ติดตามสถานะ

ผู้ใช้เห็นสถานะงาน แต่ไม่จำเป็นต้องเห็นตำแหน่งแบบเรียลไทม์ของพนักงานใน MVP

### FR-PKU-005 รับคืน

รายการจะปิดเมื่อพนักงานตรวจและยืนยันรับคืน

---

# 7.22 SOS

### FR-SOS-001 ปุ่ม SOS

ปุ่ม SOS ต้องเข้าถึงได้จากหน้าระหว่างปั่น

### FR-SOS-002 ประเภทเหตุ

* รถเสีย
* ยางแตก
* อุบัติเหตุ
* หลงทาง
* ปัญหาสุขภาพ
* ไม่ปลอดภัย
* อื่น ๆ

### FR-SOS-003 พิกัด

ระบบส่งตำแหน่งล่าสุดและความแม่นยำของ GPS

### FR-SOS-004 ข้อมูลประกอบ

ส่ง

* User ID
* Booking ID
* Rental ID
* Asset ID
* เบอร์ติดต่อ
* ตำแหน่ง
* ประเภทเหตุ

### FR-SOS-005 การตอบรับ

พนักงานต้องสามารถกดรับเคส

### FR-SOS-006 Escalation

หากไม่มีผู้รับเคสภายในเวลาที่กำหนด ระบบต้องแจ้ง

1. พนักงานสาขา
2. ผู้จัดการ
3. เจ้าของร้าน

### FR-SOS-007 Emergency Call

ระบบต้องแสดงช่องทางโทรหาหน่วยฉุกเฉิน โดยระบุว่า Bike Local ไม่ใช่บริการกู้ภัยโดยตรง

### FR-SOS-008 Audit

ทุกการดำเนินการใน SOS ต้องมี Timeline

---

# 7.23 สถานที่และเส้นทางแนะนำ

### FR-CNT-001 เพิ่มข้อมูล

ร้าน สมาชิก และ Admin สามารถเสนอข้อมูลได้

### FR-CNT-002 ประเภทเนื้อหา

* Route
* Check-in
* Viewpoint
* Cafe
* Restaurant
* Repair Point
* Water Point
* Toilet
* Hazard
* Tourist Attraction

### FR-CNT-003 ข้อมูลเส้นทาง

เส้นทางต้องมี

* ชื่อ
* รายละเอียด
* จุดเริ่ม
* จุดสิ้นสุด
* ระยะทาง
* ระดับความยาก
* พื้นผิว
* ความชันโดยประมาณ
* คำเตือน
* ประเภทจักรยานที่เหมาะสม

### FR-CNT-004 Approval State

* DRAFT
* SUBMITTED
* UNDER_REVIEW
* REVISION_REQUIRED
* APPROVED
* REJECTED
* SUSPENDED
* OUTDATED

### FR-CNT-005 การเผยแพร่

เนื้อหาจากร้านหรือสมาชิกห้ามเผยแพร่ก่อน Admin อนุมัติ

### FR-CNT-006 รายงานข้อมูล

ผู้ใช้สามารถรายงานข้อมูลผิด ไม่ปลอดภัย หรือล้าสมัยได้

---

# 7.24 รีวิว

### FR-REV-001 สิทธิ์รีวิว

ผู้ใช้รีวิวได้หลัง Booking เป็น COMPLETED

### FR-REV-002 หนึ่งรายการต่อหนึ่งรีวิว

Booking หนึ่งรายการสร้างรีวิวหลักได้หนึ่งครั้ง

### FR-REV-003 ร้านตอบรีวิว

ร้านสามารถตอบรีวิวได้

### FR-REV-004 Moderation

Admin สามารถซ่อนรีวิวที่ละเมิดนโยบายได้

### FR-REV-005 Rating

ระบบต้องคำนวณคะแนนเฉลี่ยโดยไม่แก้คะแนนย้อนหลังของรีวิวเดิม

---

# 7.25 ระบบแจ้งเตือน

### FR-NTF-001 ช่องทาง

รองรับ

* Push Notification
* In-App Notification
* Email
* SMS สำหรับกรณีสำคัญ

### FR-NTF-002 Event Types

อย่างน้อยต้องมี

* Booking Created
* Booking Confirmed
* Payment Completed
* Cash Payment Selected
* Staff Task Assigned
* Rental Started
* Rental Near Expiry
* Rental Overdue
* Return Requested
* Return Accepted
* SOS Opened
* SOS Assigned
* Refund Completed

### FR-NTF-003 Preferences

ผู้ใช้สามารถปิดการแจ้งเตือนการตลาด แต่ปิดการแจ้งเตือนธุรกรรมสำคัญไม่ได้ทั้งหมด

### FR-NTF-004 Delivery Log

ระบบต้องเก็บสถานะการส่ง

* QUEUED
* SENT
* DELIVERED เท่าที่ Provider รองรับ
* FAILED
* READ สำหรับ In-App

---

# 7.26 รายงานร้านค้า

### FR-RPT-001 ช่วงเวลา

ร้านเลือกช่วงเวลาและสาขาได้

### FR-RPT-002 รายงานการเช่า

แสดง

* จำนวน Booking
* รายการสำเร็จ
* ยกเลิก
* No-show
* เกินเวลา
* ระยะเวลาเฉลี่ย

### FR-RPT-003 รายงานรายได้

แสดง

* Gross Revenue
* Net Revenue
* Cash
* Online
* Deposit
* Refund
* Penalty
* Platform Fee

### FR-RPT-004 รายงานจักรยาน

แสดง

* Utilization
* Revenue per Asset
* Rental Count
* Maintenance
* Distance

### FR-RPT-005 รายงานพนักงาน

แสดง

* งานส่งมอบ
* งานรับคืน
* เงินสดที่รับ
* เวลาเฉลี่ยตอบรับ
* SOS

### FR-RPT-006 Export

MVP รองรับ CSV และ Excel

---

# 7.27 รายงานผู้ดูแลระบบ

### FR-ADM-001 Marketplace Overview

แสดง

* Users
* Stores
* Branches
* Assets
* Bookings
* GMV
* Platform Revenue

### FR-ADM-002 Area Report

แสดงข้อมูลตาม

* จังหวัด
* เมือง
* พื้นที่
* จุดรับ
* จุดคืน

### FR-ADM-003 Payment Report

แสดง

* Online
* Cash
* Failed
* Refund
* Commission
* Settlement

### FR-ADM-004 Safety Report

แสดง

* SOS
* Complaint
* Lost Asset
* Response Time

### FR-ADM-005 Content Report

แสดง

* Pending Approval
* Approved
* Rejected
* Reported
* Outdated

---

# 7.28 Settlement

### FR-SET-001 คำนวณยอดร้าน

ระบบคำนวณ

```text
ยอดขายรวม
- คืนเงิน
- ส่วนลดที่ร้านรับผิดชอบ
- ค่าธรรมเนียมแพลตฟอร์ม
- ค่าธรรมเนียมการชำระเงิน
- รายการหักอื่น
= ยอดสุทธิ
```

### FR-SET-002 รอบจ่าย

ระบบรองรับรอบจ่ายที่กำหนดได้

### FR-SET-003 Settlement State

* DRAFT
* CALCULATED
* UNDER_REVIEW
* APPROVED
* PROCESSING
* PAID
* FAILED
* HELD

### FR-SET-004 เงินสด

เงินสดที่ร้านรับต้องรวมในรายงาน แต่ไม่ถือเป็นยอดที่แพลตฟอร์มต้องโอนให้ร้าน

---

# 7.29 Audit Log

### FR-AUD-001 เหตุการณ์ที่ต้องบันทึก

* การเปลี่ยนสิทธิ์
* การยืนยันเงินสด
* การเปลี่ยนสถานะ Booking
* การยืนยันรับคืน
* การแก้ไขค่าเสียหาย
* การคืนเงิน
* การระงับบัญชี
* การอนุมัติเนื้อหา
* Admin Action

### FR-AUD-002 ข้อมูล Audit

* Actor
* Action
* Resource
* Resource ID
* Before
* After
* Timestamp
* IP เท่าที่เหมาะสม
* Device Information
* Correlation ID
* Reason

### FR-AUD-003 Immutable

ผู้ใช้ทั่วไปและร้านค้าห้ามแก้ไข Audit Log

---

# 8. State Machines

## 8.1 Booking State Machine

```text
PENDING_PAYMENT
  ├── PAID → PENDING_STORE_CONFIRMATION
  ├── CASH_SELECTED → PENDING_STORE_CONFIRMATION
  ├── EXPIRED → CANCELLED
  └── USER_CANCELLED → CANCELLED

PENDING_STORE_CONFIRMATION
  ├── APPROVED → CONFIRMED
  └── REJECTED → CANCELLED

CONFIRMED
  ├── PREPARING
  ├── CANCELLED
  └── NO_SHOW

PREPARING
  └── AWAITING_PICKUP

AWAITING_PICKUP
  └── IN_PROGRESS

IN_PROGRESS
  └── RETURN_PENDING

RETURN_PENDING
  └── INSPECTION_PENDING

INSPECTION_PENDING
  ├── COMPLETED
  └── DISPUTED
```

---

## 8.2 Asset State Machine

```text
AVAILABLE
  → RESERVED
  → PREPARING
  → AWAITING_HANDOVER
  → RENTED
  → RETURN_PENDING
  → INSPECTION_PENDING
  → AVAILABLE
```

ทางเลือก

```text
INSPECTION_PENDING → MAINTENANCE
ANY_STATE → LOST
AVAILABLE → INACTIVE
```

---

## 8.3 SOS State Machine

```text
OPEN
→ ACKNOWLEDGED
→ ASSIGNED
→ IN_PROGRESS
→ RESOLVED
→ CLOSED
```

---

# 9. Data Model

## 9.1 User

```text
id
schema_version
display_name
phone
email
photo_url
locale
country_code
weight_kg
emergency_contact
status
created_at
updated_at
version
```

---

## 9.2 Store

```text
id
owner_user_id
legal_name
display_name
description
status
phone
email
default_currency
timezone
approval_status
commission_plan_id
created_at
updated_at
version
```

---

## 9.3 Branch

```text
id
store_id
name
address
province
district
country
latitude
longitude
geohash
phone
opening_hours
status
created_at
updated_at
version
```

---

## 9.4 Store Member

```text
id
store_id
branch_ids
user_id
role_id
permission_overrides
status
invited_at
accepted_at
created_at
updated_at
version
```

---

## 9.5 Asset

```text
id
store_id
branch_id
category_id
code
qr_token_reference
brand
model
color
size
description
status
base_price
deposit_amount
currency
current_point_id
gps_device_id
smart_lock_id
created_at
updated_at
version
```

---

## 9.6 Booking

```text
id
booking_number
user_id
store_id
branch_id
status
start_at
end_at
pickup_point_id
return_point_id
payment_method
currency
subtotal_amount
fee_amount
deposit_amount
discount_amount
total_amount
price_snapshot
policy_snapshot
created_at
updated_at
version
```

---

## 9.7 Booking Item

```text
id
booking_id
item_type
asset_id
equipment_item_id
quantity
unit_price
total_price
created_at
updated_at
```

---

## 9.8 Payment

```text
id
booking_id
user_id
store_id
provider
provider_reference
method
status
amount
currency
idempotency_key
paid_at
confirmed_by
created_at
updated_at
version
```

---

## 9.9 Ride Session

```text
id
booking_id
rental_session_id
user_id
asset_id
status
started_at
ended_at
start_location
end_location
distance_meters
duration_seconds
average_speed
maximum_speed
elevation_gain
estimated_calories
gps_gap_count
track_storage_type
track_reference
created_at
updated_at
version
```

---

## 9.10 Ride Track Chunk

```text
id
ride_session_id
sequence
started_at
ended_at
point_count
encoded_polyline
points
checksum
created_at
```

สำหรับกิจกรรมขนาดใหญ่ ระบบสามารถย้าย Track Payload ไปยัง Cloud Storage และเก็บ Reference ในฐานข้อมูล

---

## 9.11 Return Request

```text
id
booking_id
rental_session_id
user_id
store_id
return_type
return_point_id
requested_location
status
pickup_fee
evidence
assigned_staff_id
requested_at
accepted_at
created_at
updated_at
version
```

---

## 9.12 SOS Case

```text
id
booking_id
rental_session_id
user_id
store_id
branch_id
asset_id
type
description
location
location_accuracy
status
assigned_staff_id
opened_at
acknowledged_at
resolved_at
resolution_note
created_at
updated_at
version
```

---

# 10. API Requirements

## 10.1 API Versioning

Endpoint ต้องใช้ Version เช่น

```text
/api/v1/users
/api/v1/stores
/api/v1/bookings
```

Breaking Change ต้องเพิ่ม Version ใหม่

---

## 10.2 Response Format

Success

```json
{
  "data": {},
  "meta": {
    "requestId": "string"
  }
}
```

Error

```json
{
  "error": {
    "code": "BOOKING_ASSET_NOT_AVAILABLE",
    "message": "จักรยานไม่พร้อมให้เช่าในช่วงเวลาที่เลือก",
    "details": {},
    "requestId": "string"
  }
}
```

---

## 10.3 Error Codes

กลุ่ม Error

```text
AUTH_*
PERMISSION_*
VALIDATION_*
STORE_*
ASSET_*
BOOKING_*
PAYMENT_*
RIDE_*
RETURN_*
SOS_*
CONTENT_*
RATE_LIMIT_*
INTERNAL_*
```

Frontend ต้องใช้ Error Code ไม่ใช้ข้อความ Error เป็นเงื่อนไขทางโปรแกรม

---

## 10.4 Pagination

Collection Endpoint ต้องรองรับ Cursor Pagination

```text
limit
cursor
sort
filter
```

ห้ามพึ่ง Page Number ในข้อมูลที่มีการเปลี่ยนแปลงบ่อย

---

## 10.5 Idempotency

Endpoint สำคัญต้องรองรับ Idempotency Key

* Create Booking
* Create Payment
* Confirm Cash
* Process Webhook
* Request Return
* Confirm Return
* Refund
* Settlement Payment

---

## 10.6 Concurrency Control

Entity สำคัญต้องมี `version`

Client ส่ง Version เดิมเมื่อ Update

หาก Version ไม่ตรง ระบบตอบ

```text
409 CONFLICT
```

ใช้ Transaction สำหรับ

* จองจักรยาน
* ยืนยันชำระเงิน
* ส่งมอบ
* ยืนยันรับคืน
* เปลี่ยน Inventory
* Settlement

---

# 11. Firebase Implementation

## 11.1 Firebase Authentication

ใช้สำหรับ

* Login
* OTP
* Google Sign-In
* Token Verification

Custom Claims สามารถใช้เพื่อช่วยตรวจบทบาทระดับแพลตฟอร์ม แต่สิทธิ์ระดับร้านและสาขาต้องตรวจจาก Backend

---

## 11.2 Cloud Firestore

ใช้สำหรับ

* Domain Data ช่วง MVP
* Realtime Status บางส่วน
* Notification Inbox
* Staff Task
* Configuration

Business-Critical Write ต้องดำเนินการผ่าน Backend

---

## 11.3 Cloud Storage

ใช้เก็บ

* รูปโปรไฟล์
* รูปร้าน
* รูปจักรยาน
* เอกสารร้าน
* หลักฐานส่งมอบ
* หลักฐานคืน
* รูปความเสียหาย
* Route Images
* Ride Track Archive

ไฟล์ต้องมี Metadata เชื่อมกับ Domain Entity

---

## 11.4 Firebase Cloud Messaging

ใช้ส่ง

* Booking Notification
* Payment Notification
* Staff Task
* Return Request
* SOS
* Reminder

FCM Token ต้องผูกกับ

* User
* Device
* Platform
* App Version
* Last Active
* Status

---

## 11.5 App Check

ต้องใช้กับ

* Mobile App
* Web App
* Backend Endpoint ที่รองรับ

Endpoint สำคัญต้องตรวจทั้ง Authentication และ App Check

---

## 11.6 Firebase Emulator Suite

ทีมต้องใช้ Emulator สำหรับ

* Authentication
* Firestore
* Functions
* Storage ตามความพร้อม
* Security Rules Test
* Integration Test
* Seed Data

---

# 12. Non-Functional Requirements

## 12.1 Performance

### NFR-PERF-001

API Read ทั่วไปควรตอบสนองภายใน 2 วินาทีที่ค่า P95 โดยไม่รวม External Provider

### NFR-PERF-002

API Write ทั่วไปควรตอบสนองภายใน 3 วินาทีที่ค่า P95

### NFR-PERF-003

หน้ารายการหลักต้องแสดง Skeleton หรือ Loading State ทันที

### NFR-PERF-004

Ride Tracking ต้องไม่ Upload ทุก GPS Point แยกทันที แต่ใช้ Batch

### NFR-PERF-005

รูปภาพต้องมี Thumbnail และ Compression

---

## 12.2 Availability

### NFR-AVL-001

เป้าหมาย Availability ของ MVP ไม่น้อยกว่า 99.5% ต่อเดือน ไม่รวม Maintenance ที่ประกาศล่วงหน้า

### NFR-AVL-002

Payment Webhook ต้อง Retry ได้

### NFR-AVL-003

Event สำคัญต้องเก็บใน Outbox เพื่อส่งซ้ำได้

---

## 12.3 Scalability

เป้าหมายเริ่มต้น

* 10,000 ผู้ใช้ลงทะเบียน
* 1,000 Concurrent Users
* 500 ร้าน
* 2,000 สาขา
* 10,000 จักรยานและอุปกรณ์
* 50,000 Booking ต่อเดือน

ระบบต้องออกแบบให้ขยายได้โดยไม่เปลี่ยน Domain Model หลัก

---

## 12.4 Security

### NFR-SEC-001

ใช้ HTTPS/TLS สำหรับการรับส่งข้อมูล

### NFR-SEC-002

ห้ามเก็บ Secret ใน Source Code

### NFR-SEC-003

ใช้ Secret Manager หรือระบบจัดการ Secret ที่เหมาะสม

### NFR-SEC-004

ใช้ Principle of Least Privilege

### NFR-SEC-005

ตรวจ Input ฝั่ง Backend ทุกครั้ง

### NFR-SEC-006

ไฟล์อัปโหลดต้องตรวจ

* ประเภท
* ขนาด
* Extension
* MIME Type

### NFR-SEC-007

Endpoint ต้องมี Rate Limit ตามความเสี่ยง

### NFR-SEC-008

Payment และ Admin Action ต้องมี Audit Log

---

## 12.5 Privacy

### NFR-PRV-001

การใช้ Background Location ต้องขอความยินยอมอย่างชัดเจน

### NFR-PRV-002

ตำแหน่งผู้เช่าให้ร้านเห็นเฉพาะกรณีจำเป็น เช่น

* Rental ที่กำลังใช้งาน
* Return Request
* SOS

### NFR-PRV-003

ต้องกำหนดระยะเวลาเก็บ GPS Track

### NFR-PRV-004

ผู้ใช้ต้องสามารถลบประวัติกิจกรรมตามนโยบายและข้อจำกัดทางกฎหมาย

### NFR-PRV-005

ข้อมูลส่วนบุคคลต้องแยกจากข้อมูลรายงานเชิงสถิติเท่าที่ทำได้

---

## 12.6 Reliability

### NFR-REL-001

คำสั่งสำคัญต้องรองรับ Retry โดยไม่สร้างข้อมูลซ้ำ

### NFR-REL-002

เมื่อ Network ขาดระหว่าง Ride Tracking ต้องเก็บข้อมูลในเครื่องและส่งภายหลัง

### NFR-REL-003

ระบบต้องตรวจ Checksum ของ Ride Track Chunk

### NFR-REL-004

ระบบต้องมี Dead Letter หรือ Failure Queue สำหรับ Event ที่ประมวลผลไม่สำเร็จ

---

## 12.7 Backup and Recovery

### NFR-BCK-001

ต้องมีการสำรองข้อมูลตามรอบเวลา

### NFR-BCK-002

MVP กำหนดเป้าหมาย

* RPO ไม่เกิน 24 ชั่วโมงสำหรับข้อมูลทั่วไป
* ข้อมูลธุรกรรมสำคัญต้องมี Event/Audit แยก
* RTO ไม่เกิน 8 ชั่วโมง

### NFR-BCK-003

ต้องทดสอบกระบวนการ Restore อย่างน้อยตามรอบที่กำหนด

---

## 12.8 Accessibility

* รองรับขนาดตัวอักษรของระบบ
* ปุ่มสำคัญมีพื้นที่กดเพียงพอ
* รองรับ Screen Reader ในหน้าหลัก
* ไม่ใช้สีเพียงอย่างเดียวเพื่อสื่อสถานะ
* SOS ต้องเห็นชัด
* Contrast ต้องเหมาะสม

---

## 12.9 Localization

ระบบต้องรองรับ

* ภาษาไทย
* ภาษาอังกฤษ
* Time Zone
* Currency
* รูปแบบวันที่
* รูปแบบตัวเลข

ข้อความต้องไม่เขียนฝังใน Source Code โดยตรง

---

## 12.10 Observability

ระบบต้องมี

* Structured Logging
* Correlation ID
* Error Tracking
* Crash Reporting
* Performance Monitoring
* Business Metrics
* Alert
* Dashboard

ข้อมูล Log ห้ามบันทึก

* Password
* OTP
* Payment Secret
* Token เต็ม
* เอกสารส่วนบุคคลเต็ม
* พิกัดที่ไม่จำเป็น

---

# 13. Offline and Network Handling

## 13.1 Offline Capabilities

ผู้ใช้สามารถ

* ดูข้อมูลล่าสุดที่ Cache ไว้
* บันทึก GPS ระหว่างไม่มีอินเทอร์เน็ต
* ดู Ride Session ที่กำลังทำงาน
* ส่งข้อมูลเมื่อกลับมาออนไลน์

## 13.2 Online-Required Operations

รายการต่อไปนี้ต้องออนไลน์

* ยืนยัน Booking
* ชำระเงิน
* ยืนยันเงินสด
* ส่งมอบ
* ยืนยันรับคืน
* เปลี่ยนสิทธิ์
* อนุมัติร้าน
* คืนเงิน

## 13.3 Conflict Handling

หากข้อมูล Local ขัดกับ Server

* Server เป็นแหล่งข้อมูลหลักของธุรกรรม
* Ride Track ใช้การรวม Chunk ตาม Sequence
* UI ต้องแจ้งผู้ใช้เมื่อ Synchronization ล้มเหลว

---

# 14. Testing Requirements

## 14.1 Unit Test

ต้องครอบคลุม

* Pricing
* Availability
* Booking State
* Payment State
* Return State
* Deposit
* Permission
* Settlement

เป้าหมาย Coverage ของ Domain Layer ไม่น้อยกว่า 80%

---

## 14.2 Frontend Test

* Widget Test
* State Management Test
* Form Validation
* Navigation
* Permission-Based UI
* Localization
* Offline Behavior

---

## 14.3 Backend Test

* Application Service
* Repository Contract
* API Validation
* Authorization
* Idempotency
* Transaction
* Webhook
* Event Handler

---

## 14.4 Contract Test

Frontend Client และ Backend ต้องผ่าน Contract เดียวกัน

ตรวจสอบ

* Required Field
* Enum
* Error Format
* Nullable Field
* Pagination
* Version Compatibility

---

## 14.5 Integration Test

ใช้ Firebase Emulator และ Sandbox ของ Provider

Test Flow สำคัญ

1. สมัคร → จอง → จ่าย → รับ → ปั่น → คืน
2. จอง → เงินสด → พนักงานยืนยัน → คืน
3. Payment Webhook ซ้ำ
4. จองจักรยานคันเดียวพร้อมกัน
5. GPS ขาด
6. จบการปั่นแต่ยังไม่คืน
7. SOS
8. คืนต่างจุด
9. ความเสียหายและหักมัดจำ

---

## 14.6 Security Test

* Unauthorized Access
* Cross-Tenant Access
* Privilege Escalation
* Invalid Token
* Missing App Check
* File Upload Abuse
* Rate Limit
* Injection
* Broken Object-Level Authorization

---

## 14.7 UAT

ผู้ตรวจรับประกอบด้วย

* Product Owner
* ตัวแทนร้านค้า
* ตัวแทนพนักงาน
* ตัวแทนผู้เช่า
* Platform Admin

---

# 15. Development Environment

ต้องแยก Firebase Project อย่างน้อย

```text
bike-local-dev
bike-local-staging
bike-local-prod
```

ห้ามใช้ Production Data ใน Development

แต่ละ Environment ต้องมี

* Authentication Configuration
* Firestore
* Storage
* Functions
* FCM
* App Check
* Remote Config
* Secrets

---

# 16. CI/CD

## 16.1 Frontend Pipeline

1. Format
2. Static Analysis
3. Unit Test
4. Widget Test
5. Build Android
6. Build iOS
7. Build Web
8. Security Scan
9. Deploy Staging
10. Manual Approval
11. Deploy Production

## 16.2 Backend Pipeline

1. Lint
2. Type Check
3. Unit Test
4. Contract Test
5. Emulator Integration Test
6. Security Rules Test
7. Build
8. Deploy Staging
9. Smoke Test
10. Manual Approval
11. Deploy Production

## 16.3 Database Change

การเปลี่ยน Schema ต้องมี

* Schema Version
* Migration Script
* Rollback Plan
* Index Definition
* Seed Update
* Contract Compatibility Review

---

# 17. Repository Structure

ตัวอย่าง Monorepo

```text
bike-local/
├── apps/
│   ├── mobile_app/
│   ├── merchant_portal/
│   └── admin_portal/
├── packages/
│   ├── api_client/
│   ├── design_system/
│   ├── domain_models/
│   ├── localization/
│   └── testing/
├── backend/
│   ├── src/
│   ├── tests/
│   └── migrations/
├── contracts/
│   ├── openapi.yaml
│   └── schemas/
├── firebase/
│   ├── firestore.rules
│   ├── storage.rules
│   ├── indexes.json
│   └── firebase.json
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── decisions/
│   └── runbooks/
└── scripts/
```

---

# 18. การแบ่งงาน Frontend และ Backend

## 18.1 Sprint 0

ทีมร่วมกันจัดทำ

* Domain Glossary
* User Flow
* API Contract
* Error Catalog
* Permission Matrix
* Design Tokens
* Mock Data
* Architecture Decision Records

## 18.2 Frontend สามารถเริ่มได้ทันทีจาก

* Figma
* OpenAPI
* Mock Server
* Generated Dart Client
* Fixture
* Fake Repository

## 18.3 Backend สามารถเริ่มได้ทันทีจาก

* Domain Model
* OpenAPI
* Repository Interface
* In-Memory Adapter
* Emulator
* Contract Test

## 18.4 Integration Point

Frontend และ Backend รวมงานเมื่อ

* Endpoint ผ่าน Contract Test
* Staging พร้อม
* Generated Client อัปเดต
* Fixture ตรงกับ Response จริง

---

# 19. MVP Delivery Scope

## 19.1 Mobile/Web Application

* Authentication
* Role Selection
* Store Search
* Map
* Asset Search
* Booking
* QR Payment
* Cash Payment
* QR Booking
* Rental Handover
* GPS Ride Tracking
* Ride Summary
* SOS
* Return Request
* Return Evidence
* History
* Review

## 19.2 Merchant Functions

* Store Registration
* Branch Management
* Staff Management
* Asset Management
* Equipment Management
* Pricing
* Rental Points
* Booking Management
* Payment Verification
* Cash Confirmation
* Staff Task
* Handover
* Return Inspection
* Basic Reports

## 19.3 Admin Portal

* Store Approval
* User Management
* Transaction Monitoring
* Content Approval
* Complaint Management
* Basic Marketplace Reports
* Audit Log Search

---

# 20. Phase 2 Technical Scope

* Smart Lock Adapter
* Smart Dock Adapter
* GPS/IoT Device Integration
* Geofence
* Device Telemetry
* Asset Theft Detection
* AI Damage Detection
* Insurance Integration
* Digital Rental Agreement
* Smart Watch Integration
* Loyalty
* Advanced Coupon
* Advanced Analytics
* Data Warehouse
* PostgreSQL Migration Option
* Vehicle Rental Platform Core

---

# 21. Assumptions

* Payment Gateway จะถูกเลือกภายหลัง
* Map Provider จะถูกเลือกตามราคาและพื้นที่ให้บริการ
* MVP ใช้ GPS โทรศัพท์ ไม่ใช้ GPS ติดจักรยาน
* Smart Lock และ Smart Dock อยู่ใน Phase 2
* Community Feed ไม่อยู่ในระบบ
* Facebook Group หรือ Social Media ใช้สำหรับ Community
* ร้านรับผิดชอบการให้ความช่วยเหลือหน้างาน
* Bike Local ไม่ใช่หน่วยกู้ภัย
* กฎการยกเลิกและเงินมัดจำกำหนดได้ตามร้านภายใต้นโยบายแพลตฟอร์ม

---

# 22. Constraints

* Background GPS แตกต่างกันตาม Android และ iOS
* ผู้ใช้อาจปิด GPS หรืออินเทอร์เน็ต
* Push Notification ไม่รับประกันการแสดงทันทีทุกอุปกรณ์
* การคืนเงินขึ้นอยู่กับ Payment Gateway
* ความแม่นยำตำแหน่งขึ้นอยู่กับอุปกรณ์และสภาพแวดล้อม
* Firestore Query ต้องวางแผน Index ล่วงหน้า
* รายงานซับซ้อนอาจต้องใช้ Data Pipeline หรือ Data Warehouse ในระยะถัดไป

---

# 23. Risks and Mitigation

| ความเสี่ยง                    | แนวทางลดความเสี่ยง                            |
| ----------------------------- | --------------------------------------------- |
| ผูกระบบกับ Firebase มากเกินไป | ใช้ API, Repository และ Adapter               |
| ย้ายฐานข้อมูลยาก              | ใช้ Canonical Model และ Top-Level Collection  |
| Frontend รอ Backend           | ใช้ OpenAPI, Mock Server และ Generated Client |
| จองจักรยานซ้ำ                 | Transaction, Version และ Booking Hold         |
| Webhook ซ้ำ                   | Idempotency และ Payment Event                 |
| GPS ขาดหาย                    | Local Buffer และ Track Chunk                  |
| ผู้ใช้กดจบแต่ไม่คืน           | แยก Ride End กับ Rental Close                 |
| เงินสดไม่ตรง                  | Permission, Audit และ Cash Report             |
| ข้อมูลข้ามร้าน                | Tenant Check ฝั่ง Backend                     |
| SOS ไม่มีคนรับ                | Escalation และ SLA                            |
| Firestore Cost สูง            | Batch, Pagination, Aggregation และ Monitoring |

---

# 24. Acceptance Criteria ระดับระบบ

ระบบ MVP ถือว่าผ่านการตรวจรับเมื่อ

1. ผู้ใช้สมัครและเลือกบทบาทได้
2. ร้านสมัครและผ่านกระบวนการอนุมัติได้
3. ร้านเพิ่มสาขา พนักงาน จักรยาน และอุปกรณ์ได้
4. ผู้ใช้ค้นหาและจองจักรยานได้
5. ระบบป้องกันการจองจักรยานซ้ำได้
6. รองรับ QR Payment และเงินสด
7. ชำระสำเร็จแล้วแจ้งพนักงานได้
8. พนักงานส่งมอบจักรยานได้
9. ผู้ใช้บันทึกการปั่นด้วย GPS โทรศัพท์ได้
10. ข้อมูล GPS เก็บต่อได้เมื่ออินเทอร์เน็ตขาดชั่วคราว
11. ผู้ใช้ดูแผนที่และสรุปการปั่นได้
12. ผู้ใช้กด SOS พร้อมส่งพิกัดได้
13. ผู้ใช้กดจบการปั่นโดยไม่ปิดรายการเช่าทันที
14. ร้านได้รับแจ้งคำขอคืน
15. ร้านหรือพนักงานยืนยันรับคืนได้
16. เงินมัดจำไม่ถูกคืนก่อนยืนยันรับคืน
17. ร้านดูรายงานพื้นฐานได้
18. Admin อนุมัติร้านและเนื้อหาได้
19. ทุกการดำเนินการสำคัญมี Audit Log
20. Frontend และ Backend ผ่าน Contract Test
21. ระบบทำงานบน Android, iOS และ Web ตามขอบเขตที่กำหนด
22. Business Logic ไม่ผูกกับ Firestore SDK
23. Repository สามารถสลับเป็น In-Memory Adapter ในการทดสอบได้
24. มีเอกสาร Mapping สำหรับ PostgreSQL และ MongoDB
25. มีขั้นตอน Backup, Restore และ Rollback

---

# 25. สรุปสถาปัตยกรรม

Bike Local ใช้ Flutter เป็น Cross-platform Frontend และใช้ Firebase เป็นโครงสร้างพื้นฐานช่วงเริ่มต้น โดยกำหนดให้ Business Logic และการเข้าถึงข้อมูลสำคัญอยู่หลัง Backend API

ระบบใช้แนวทาง

* Contract-First
* API-First
* Modular Architecture
* Repository Pattern
* Ports and Adapters
* Domain Model ที่ไม่ผูกกับ Firebase
* Canonical Data Schema
* Generated API Client
* Mock-First Development
* Automated Contract Testing

แนวทางนี้ทำให้

* Frontend และ Backend ทำงานขนานกันได้
* ลดปัญหา API ไม่ตรงกัน
* ลด Vendor Lock-in
* ย้ายจาก Firestore ไป PostgreSQL หรือ MongoDB ได้ง่ายขึ้น
* รองรับแอปเช่ายานพาหนะในอนาคต
* รองรับการขยายทีมและจำนวนผู้ใช้งานในระยะยาว

---

# 26. ภาคผนวก: ลำดับการพัฒนาที่แนะนำ

## Foundation

* Monorepo
* Environment
* Authentication
* OpenAPI
* Error Standard
* Logging
* Design System
* CI/CD
* Emulator

## Core Marketplace

* Store
* Branch
* Staff
* Asset
* Equipment
* Search
* Availability
* Pricing

## Transaction

* Booking
* Payment
* Cash
* Deposit
* Handover

## Ride and Safety

* GPS
* Ride Session
* Map
* SOS
* Notification

## Return

* Return Point
* Return Request
* Staff Pickup
* Inspection
* Rental Closing

## Content and Reports

* Route
* Place
* Review
* Store Report
* Admin Report
* Settlement

## Hardening

* Security
* Performance
* Backup
* Monitoring
* UAT
* Production Launch
