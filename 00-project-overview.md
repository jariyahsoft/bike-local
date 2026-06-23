# 00 Project Overview

Source: `docs/Bike-Local-SRS.md` sections 1, 2, 7, 19, 20, 21, 22, 23, 24

## Project Name

Bike Local

## Vision

สร้างระบบ Marketplace และระบบบริหารร้านเช่าจักรยานท้องถิ่นที่รองรับผู้เช่า ร้านค้า พนักงาน และผู้ดูแลแพลตฟอร์ม บน Android, iOS และ Web

## Problem Statement

ผู้เช่าต้องการค้นหา จอง ชำระเงิน รับจักรยาน ปั่น และคืนจักรยานจากร้านท้องถิ่นได้สะดวก ขณะที่ร้านค้าต้องการระบบกลางสำหรับจัดการสาขา จักรยาน อุปกรณ์ พนักงาน การชำระเงิน งานส่งมอบ งานรับคืน รายงาน และความปลอดภัย

## Goals

- รองรับ Cross-platform app และ web portals
- ใช้ Firebase เป็น infrastructure ช่วงเริ่มต้น
- แยก Business Logic ออกจาก Firebase
- ใช้ API Contract เป็นข้อตกลงกลาง
- รองรับหลายร้าน หลายสาขา และหลายพนักงาน
- รองรับ Audit Log, RBAC, Localization ไทย/อังกฤษ
- ออกแบบข้อมูลให้ย้ายไป PostgreSQL หรือ MongoDB ได้

## Non-Goals

- Community Feed ไม่อยู่ในระบบ
- Smart Lock, Smart Dock, GPS/IoT Device, Geofence และ AI Damage Detection อยู่ Phase 2
- Bike Local ไม่ใช่บริการกู้ภัยโดยตรง
- Payment Gateway และ Map Provider ยังไม่ถูกเลือกใน SRS

## Target Users and Personas

| Role | Need |
|---|---|
| Renter | ค้นหา จอง ชำระเงิน ปั่น คืน และดูประวัติ |
| Store Owner | จัดการร้าน สาขา รถ พนักงาน ราคา รายงาน และการจ่ายเงิน |
| Store Manager | บริหารงานประจำวันและมอบหมายพนักงาน |
| Store Staff | ส่งมอบ รับคืน ยืนยันเงินสด ตอบรับ SOS |
| Store Accounting | ตรวจรายรับ เงินสด Settlement และรายงานการเงิน |
| Platform Admin | อนุมัติร้าน ผู้ใช้ ธุรกรรม เนื้อหา และดูภาพรวม |
| Platform Support | จัดการข้อร้องเรียนและข้อพิพาท |

## Roles and Permissions Summary

บทบาทเริ่มต้น: `RENTER`, `STORE_OWNER`, `STORE_MANAGER`, `STORE_STAFF`, `STORE_ACCOUNTING`, `PLATFORM_ADMIN`, `PLATFORM_MODERATOR`, `PLATFORM_SUPPORT`

สิทธิ์ตัวอย่าง: `store.read`, `store.update`, `branch.create`, `asset.create`, `booking.confirm`, `payment.cash.confirm`, `rental.handover`, `return.accept`, `report.financial.read`, `staff.manage`, `sos.location.read`, `content.approve`, `platform.store.suspend`

## Core Modules

- Identity, Users, Stores, Branches, Staff
- Catalog, Inventory, Pricing
- Booking, Payment, Cash, Deposit
- Rental, Ride Tracking, Return
- SOS, Notification
- Routes, Places, Reviews, Moderation
- Reporting, Settlement, Audit

## MVP Scope

### Mobile/Web Application

- Authentication, Role Selection
- Store Search, Map, Asset Search
- Booking, QR Payment, Cash Payment, QR Booking
- Rental Handover, GPS Ride Tracking, Ride Summary
- SOS, Return Request, Return Evidence, History, Review

### Merchant Functions

- Store Registration, Branch Management, Staff Management
- Asset Management, Equipment Management, Pricing, Rental Points
- Booking Management, Payment Verification, Cash Confirmation
- Staff Task, Handover, Return Inspection, Basic Reports

### Admin Portal

- Store Approval, User Management, Transaction Monitoring
- Content Approval, Complaint Management
- Basic Marketplace Reports, Audit Log Search

## Roadmap

1. Foundation: Monorepo, Environment, Authentication, OpenAPI, Error Standard, Logging, Design System, CI/CD, Emulator
2. Core Marketplace: Store, Branch, Staff, Asset, Equipment, Search, Availability, Pricing
3. Transaction: Booking, Payment, Cash, Deposit, Handover
4. Ride and Safety: GPS, Ride Session, Map, SOS, Notification
5. Return: Return Point, Return Request, Staff Pickup, Inspection, Rental Closing
6. Content and Reports: Route, Place, Review, Store Report, Admin Report, Settlement
7. Hardening: Security, Performance, Backup, Monitoring, UAT, Production Launch

## Success Metrics

Source ระบุ acceptance criteria ระดับระบบแทน metric เชิงธุรกิจ:

- ผู้ใช้สมัครและเลือกบทบาทได้
- ร้านสมัครและผ่านการอนุมัติได้
- ผู้ใช้ค้นหาและจองจักรยานได้
- ป้องกันการจองจักรยานซ้ำได้
- รองรับ QR Payment และเงินสด
- บันทึก GPS แบบ offline buffer ได้
- SOS พร้อมพิกัดใช้งานได้
- เงินมัดจำไม่คืนก่อนร้านยืนยันรับคืน
- ทุก action สำคัญมี Audit Log
- Frontend และ Backend ผ่าน Contract Test
- Business Logic ไม่ผูกกับ Firestore SDK

## Risks

| Risk | Mitigation |
|---|---|
| ผูกระบบกับ Firebase มากเกินไป | ใช้ API, Repository และ Adapter |
| ย้ายฐานข้อมูลยาก | ใช้ Canonical Model และ Top-Level Collection |
| Frontend รอ Backend | ใช้ OpenAPI, Mock Server และ Generated Client |
| จองจักรยานซ้ำ | Transaction, Version และ Booking Hold |
| Webhook ซ้ำ | Idempotency และ Payment Event |
| GPS ขาดหาย | Local Buffer และ Track Chunk |
| ข้อมูลข้ามร้าน | Tenant Check ฝั่ง Backend |

## Assumptions

- Payment Gateway จะถูกเลือกภายหลัง
- Map Provider จะถูกเลือกตามราคาและพื้นที่ให้บริการ
- MVP ใช้ GPS โทรศัพท์ ไม่ใช้ GPS ติดจักรยาน
- ร้านรับผิดชอบการให้ความช่วยเหลือหน้างาน
- กฎการยกเลิกและเงินมัดจำกำหนดได้ตามร้านภายใต้นโยบายแพลตฟอร์ม

## Open Questions

- Payment Gateway ที่ต้องใช้คืออะไร
- Map/Geocoding Provider ที่ต้องใช้คืออะไร
- ประเทศ/พื้นที่เปิดให้บริการแรกคือที่ใด
- ต้องรองรับ PDPA/GDPR ในระดับใดและมี retention policy รายละเอียดอย่างไร
- Commission plan และ settlement cycle เริ่มต้นเป็นแบบใด
- UX visual direction และ brand guidelines มีอยู่แล้วหรือไม่
