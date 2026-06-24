# Bike Local

ระบบศูนย์รวมร้านเช่าจักรยานและอุปกรณ์ปั่นจักรยานท้องถิ่น

## Overview

Bike Local เป็น Marketplace และระบบบริหารร้านเช่าจักรยานสำหรับผู้เช่า ร้านค้า พนักงาน และผู้ดูแลแพลตฟอร์ม ระบบรองรับ Android, iOS และ Web โดยใช้ Firebase เป็นโครงสร้างพื้นฐานช่วงเริ่มต้น และออกแบบให้ Business Logic ไม่ผูกกับ Firestore เพื่อรองรับการย้ายไป PostgreSQL หรือ MongoDB ในอนาคต

Source: `docs/Bike-Local-SRS.md` sections 1.2, 1.3, 2, 3, 4, 25

## Features

- แอปสำหรับผู้เช่า: สมัครใช้งาน, ค้นหาร้าน/จักรยาน, จอง, ชำระเงิน, รับจักรยาน, บันทึกการปั่น, SOS, คืนจักรยาน, รีวิว
- Merchant Portal: จัดการร้าน, สาขา, พนักงาน, จักรยาน, อุปกรณ์, ราคา, Booking, การชำระเงินสด, ส่งมอบ, รับคืน, รายงาน
- Admin Portal: อนุมัติร้าน, จัดการผู้ใช้, ตรวจธุรกรรม, อนุมัติเนื้อหา, จัดการข้อร้องเรียน, รายงาน Marketplace, Audit Log
- Backend API: Authentication Integration, Authorization, Booking, Inventory, Payment, Rental, Ride Tracking, Return, SOS, Notification, Reporting, Settlement, Moderation, Audit

## Tech Stack

Source ระบุ stack แนะนำดังนี้:

| Layer                | Stack                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------ |
| Frontend             | Flutter, Dart, Material Design, Generated API Client                                       |
| Backend              | TypeScript, Node.js, Firebase Cloud Functions หรือ Google Cloud Run, REST API, OpenAPI 3.1 |
| Database เริ่มต้น    | Cloud Firestore                                                                            |
| Storage/Notification | Cloud Storage, Firebase Cloud Messaging                                                    |
| Auth                 | Firebase Authentication พร้อม Domain User ID แยกจาก Firebase UID                           |
| Observability        | Firebase Analytics, Crashlytics, Structured Logging, Correlation ID                        |
| Future DB            | PostgreSQL, MongoDB                                                                        |

## Getting Started

Repo นี้เริ่มจากเอกสาร requirement และ initial project files ยังไม่มี source code application จริง

1. อ่าน `00-project-overview.md`
2. ยืนยัน open questions ใน `05-decisions.md`
3. สร้าง monorepo ตามโครงสร้างใน `01-architecture.md`
4. เริ่ม Sprint 0 จาก `11-tasks.md`
5. สร้าง OpenAPI contract ก่อน implement feature

## Environment Variables

ห้าม commit secret ลง repo ใช้ `.env.example` เป็นรายการชื่อ config เท่านั้น และเก็บค่าจริงแยกตาม environment ผ่าน Secret Manager หรือ Firebase Functions secrets ตาม `12-release-readiness.md`

## Scripts

คำสั่ง foundation ปัจจุบัน:

```text
npm run format
npm run format:check
npm run lint
npm run typecheck
npm test
npm run test:unit
npm run test:contract
npm run test:security
npm run test:security-rules
npm run test:emulator
npm run check:secrets
npm run smoke:staging
npm run build
```

คำสั่ง Flutter/Dart ที่ต้องมี SDK ติดตั้งก่อน:

```text
npm run format:flutter
npm run analyze:flutter
npm run test:frontend
```

## Project Structure

โครงสร้างเป้าหมายจาก SRS:

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

## Documentation

- `00-project-overview.md` - ภาพรวมผลิตภัณฑ์, MVP, roadmap
- `01-architecture.md` - สถาปัตยกรรมระบบและ topology
- `02-coding-rules.md` - กติกา coding สำหรับทีมและ AI agents
- `03-database-design.md` - conceptual/Firestore data model
- `04-api-standard.md` - API contract, response, error, idempotency
- `05-decisions.md` - ADR log และ open decisions
- `06-backlog.md` - epics และ user stories
- `07-security-rules.md` - security model, RBAC, privacy
- `08-ui-guide.md` - UX/UI guide, states, flows
- `09-testing-guide.md` - test strategy และ critical flows
- `10-glossary.md` - glossary กลาง
- `11-tasks.md` - Sprint 0 และ task plan

## Development Workflow

- ใช้ Contract-First Development
- Frontend ใช้ Generated API Client จาก OpenAPI
- Backend สร้าง Domain/Application Layer ก่อนผูก Infrastructure
- Business-Critical Write ต้องผ่าน Backend API
- ใช้ Mock Server และ fixtures เพื่อให้ Frontend/Backend ทำงานขนานกันได้
- ทุก feature ต้องมี acceptance criteria, permission matrix, error cases, analytics events และ test scenario ก่อนเริ่ม

## Testing

- Domain Layer coverage เป้าหมายไม่น้อยกว่า 80%
- Backend ต้องมี unit, repository contract, API validation, authorization, idempotency, webhook และ event handler tests
- Frontend ต้องมี widget, state management, form validation, navigation, permission-based UI, localization และ offline tests
- Integration tests ใช้ Firebase Emulator และ sandbox provider
- Frontend และ Backend ต้องผ่าน Contract Test เดียวกัน

## Deployment

Source กำหนด Firebase project อย่างน้อย:

```text
bike-local-dev
bike-local-staging
bike-local-prod
```

Pipeline ควรมี format, static analysis, tests, build, security scan, staging deploy, smoke test, manual approval และ production deploy

Release readiness, Firebase aliases, staging commands, backup/restore, rollback, and production manual gate are documented in `12-release-readiness.md`.

## License

TBD

# bike-local
