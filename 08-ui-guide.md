# 08 UI Guide

Source: `docs/Bike-Local-SRS.md` sections 2, 7, 12.1, 12.8, 12.9, 13, 19

## Product Design Principles

- Mobile-first สำหรับ renter workflows
- Operation-focused สำหรับ merchant/admin workflows
- Role-Based Navigation แสดงเมนูตามบทบาท
- SOS และ safety actions ต้องเข้าถึงเร็ว เห็นชัด และไม่ปะปนกับ action ปกติ
- Offline/network states ต้องอธิบายผลกระทบของข้อมูลธุรกรรมชัดเจน
- ภาษาไทยและอังกฤษต้องรองรับตั้งแต่แรก

## Information Architecture

### Renter App

- Home/Search
- Map
- Store/Asset detail
- Booking
- Payment
- Active Rental/Ride
- SOS
- Return Request
- History
- Reviews
- Profile/Settings

### Merchant Portal

- Dashboard
- Calendar/Bookings
- Branches
- Assets
- Equipment
- Pricing
- Rental Points
- Staff
- Payments/Cash
- Handover/Return Tasks
- Reports
- Settings

### Admin Portal

- Marketplace Overview
- Store Approval
- User Management
- Transaction Monitoring
- Content Approval
- Complaints/Disputes
- Reports
- Audit Log

## User Flows

### Renter MVP Flow

```text
Sign up -> Select role -> Search -> Select asset/time -> Booking -> Payment/Cash -> QR booking -> Handover -> Start ride -> End ride -> Return request -> Inspection -> Completed -> Review
```

### Store MVP Flow

```text
Register store -> Submit documents -> Admin approval -> Create branch -> Add staff -> Add assets/equipment -> Configure pricing/points -> Manage booking -> Confirm payment/cash -> Handover -> Inspect return -> Reports
```

### SOS Flow

```text
Active ride -> SOS -> Select issue -> Send latest location -> Staff acknowledge -> Assign/respond -> Resolve -> Close timeline
```

## Wireframe Outline

- Search screen: location/search input, date/time selector, filters, list/map toggle
- Asset detail: photos, availability, price/deposit, pickup/return options, policies
- Booking checkout: item summary, price snapshot, deposit, payment method, cancellation policy
- Active ride: map, elapsed time, distance, GPS status, stop/end action, SOS
- Return request: return type, evidence photos, GPS confirmation, notes, submit
- Merchant dashboard: today bookings, pending handovers, pending returns, cash confirmations, SOS alerts
- Admin approval: queue, document preview, decision reason, audit trail

## UI States

- Loading: skeleton for main lists
- Empty: show next action where appropriate
- Error: use error code mapping, human text localized
- Success: confirm state transition and next step
- Permission denied: explain missing permission without exposing internal policy
- Offline: show cached data, disable online-required operations
- Sync failed: show retry and status for offline queues
- GPS unavailable: show permission/device/network guidance

Online-required operations:

- Confirm booking
- Pay
- Confirm cash
- Handover
- Confirm return
- Change permission
- Approve store
- Refund

## Design Tokens

SRS does not define brand tokens. Initial assumptions for implementation:

| Token | Direction |
|---|---|
| Color | Safety/status-first palette with distinct success, warning, danger, info |
| Typography | System font, readable Thai/English, no hard-coded text sizes that break accessibility |
| Spacing | 4/8pt scale |
| Radius | Moderate radius; avoid overly decorative UI for operations screens |
| Shadow | Minimal, focused on elevation and modals |

## Component Inventory

- Role switcher
- Search bar and filters
- Map/list toggle
- Asset card
- Availability badge
- Price/deposit summary
- Booking status timeline
- QR booking display/scanner
- Payment status panel
- Handover checklist
- GPS status chip
- Ride stats panel
- SOS action button
- Return evidence uploader
- Inspection checklist
- Staff task list
- Audit timeline
- Report table/export action

## Responsive Rules

- Renter app prioritizes mobile layouts
- Merchant/Admin portals require dense desktop/tablet views
- Forms must work on narrow screens without horizontal scroll
- Tables on mobile should collapse into scannable cards only when necessary
- Map views must keep controls reachable and not cover critical content

## Accessibility Requirements

- Support system font size
- Touch targets large enough for primary actions
- Main screens support screen readers
- Do not use color alone for status
- SOS visually distinct and accessible during ride
- Contrast suitable for outdoor mobile use

## i18n and Content Tone

- Thai and English supported
- Text uses clear transactional language
- Safety and liability copy must be direct, especially: ride ended does not mean rental closed
- Bike Local must not imply it is an emergency rescue service

## Open Questions

- Brand identity, logo, colors and typography
- Whether merchant/admin portals use Flutter Web or separate web frontend
- Exact map provider UX limitations
- Required document upload preview/redaction behavior
