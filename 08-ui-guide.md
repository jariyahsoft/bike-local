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
- Merchant store setup: draft details, document metadata status, submit-for-review state, revision-required state
- Merchant branch management: branch list, temporary closure reason/reopen date, booking-availability indicator
- Merchant staff management: invite channel, role selection, branch scope, permission override review, suspension state

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
- Submit store for approval
- Update staff permissions
- Refund

## Design Tokens

SRS does not define brand tokens. Task 05 provides provisional operational tokens only; they are implementation starters, not approved brand output.

### Token Principles

- Distinguish safety and transaction states even without color.
- Keep renter screens calm and breathable; keep merchant/admin screens compact and scannable.
- Use one shared state palette across all surfaces so status meanings stay consistent.
- Support Thai and English with readable line-height and no fixed-height text containers.

### Provisional Token Direction

| Token | Direction |
|---|---|
| Canvas/Surface | Warm neutral background with high-contrast text for outdoor readability |
| Primary | Deep teal for primary interactive controls |
| Accent | Burnt orange for supporting emphasis, not destructive use |
| Success | Clear green, paired with icon/text |
| Warning | Amber, paired with icon/text |
| Danger | Red, reserved for destructive actions and SOS-adjacent alerts |
| Info | Strong blue for informational system state |
| Neutral | Slate for paused/offline/passive state |
| Focus | High-visibility blue focus ring |
| SOS | Dedicated crimson distinct from standard danger |
| Typography | `Noto Sans Thai`-first readable body with condensed accent display style for headers only |
| Spacing | 4/8-based scale with `12`, `16`, `20`, `24`, `32` as common layout steps |
| Radius | Moderate rounded cards/inputs; pill buttons for renter-primary actions |
| Elevation | Minimal for cards, moderate for sticky task panels and modals |
| Motion | 120-320ms transitions with restrained emphasis; no decorative motion on transactional confirmation |

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

## Surface Inventories and Navigation

### Renter App

#### Page Inventory

| Area | Screens | Key emphasis |
|---|---|---|
| Onboarding | sign in, role selection, consent, locale | Fast completion and legal clarity |
| Search | home feed, filters, map, results | Mobile-first cards and sticky search/filter controls |
| Detail | store detail, asset detail, policy sheet | Availability, deposit, pickup/return options |
| Booking | checkout, payment method, verification, QR booking | Price snapshot and online-required messaging |
| Ride | waiting for handover, active ride, ride ended, return request | GPS state, elapsed time, clear rental-vs-ride distinction |
| Safety | SOS trigger, issue type, case timeline | One-tap access during active ride |
| Account | history, profile, settings, support | Device permission and language controls |

#### Navigation Rules

- Base tabs: `Home/Search`, `Map`, `Bookings`, `Active Rental`, `Profile`.
- `Active Rental` persists when booking status is `IN_PROGRESS`, `RETURN_PENDING`, or `INSPECTION_PENDING`.
- Renter flows are mobile-first and avoid dense tables.
- If an account has merchant or admin roles, context switching must be explicit and not mix operational routes into renter tabs.

### Merchant Portal

#### Page Inventory

| Area | Screens | Key emphasis |
|---|---|---|
| Dashboard | today overview, pending tasks, branch status | High-density summary and alert triage |
| Bookings | calendar, list, booking detail | Filters, quick status recognition, task drill-down |
| Operations | handover queue, return queue, SOS alerts | Staff execution speed |
| Inventory | assets, equipment, pricing, rental points | Bulk-friendly management |
| Staff | staff list, invite, permission editor | Role and branch scope clarity |
| Money | payments, cash confirmations, refunds, settlement preview | Financial traceability |
| Reports | rental, revenue, staff, asset | Dense table layout and export |
| Settings | store, branches, documents, operating hours | Approval-aware edits |

#### Navigation Rules

- `STORE_OWNER`: all merchant routes for assigned stores.
- `STORE_MANAGER`: operations, bookings, inventory, staff, limited store settings.
- `STORE_STAFF`: branch-scoped bookings, handover, returns, cash confirmation if allowed, SOS.
- `STORE_ACCOUNTING`: payment/refund/settlement/report routes without default access to inventory or staff editing.
- UI route visibility follows permissions, but backend remains the source of truth.

### Admin Portal

#### Page Inventory

| Area | Screens | Key emphasis |
|---|---|---|
| Overview | KPI dashboard, incident feed, approval backlog | Rapid triage |
| Store Approval | queue, store detail, document review, decision modal | Reason capture and evidence review |
| Users | search, detail, suspension history | Sensitive actions with audit consequences |
| Transactions | payment monitor, refund queue, dispute detail | Cross-tenant filtering |
| Content | routes/places/reviews moderation queue | Queue throughput and policy clarity |
| Disputes | case list, case detail, actions | Support workflow |
| Reports | platform overview, operational exports | Dense filtering and auditability |
| Audit | audit search, correlation detail | Immutable read-only workflow |

#### Navigation Rules

- `PLATFORM_ADMIN`: all admin routes.
- `PLATFORM_MODERATOR`: moderation queue plus audit read support for moderation traceability.
- `PLATFORM_SUPPORT`: disputes, incident context, booking/payment context, scoped audit reads.
- Sensitive actions remain disabled until permission and target scope are loaded from backend context.

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

Additional UI-state requirements:

- Every non-decorative state uses icon, label, and explanatory copy; never color alone.
- Focus rings must remain visible on keyboard/web navigation and high-contrast themes.
- SOS action uses a distinct label and screen-reader hint, not icon-only presentation.

## i18n and Content Tone

- Thai and English supported
- Text uses clear transactional language
- Safety and liability copy must be direct, especially: ride ended does not mean rental closed
- Bike Local must not imply it is an emergency rescue service

### Localization Workflow

Shared localization assets live in `packages/localization/l10n`.

Rules:

1. Add English and Thai entries in the same change.
2. Use stable keys such as `error.PERMISSION_DENIED` and `state.offline.title`.
3. Map UI behavior from `error.code` groups, not from human-readable API messages.
4. Route safety, payment, legal, and support copy through product/compliance review.
5. Avoid hard-coded widget text outside temporary prototypes.

## Open Questions

- Brand identity, logo, colors and typography
- Whether merchant/admin portals use Flutter Web or separate web frontend
- Exact map provider UX limitations
- Required document upload preview/redaction behavior

## UI State Patterns

### Core State Catalog

| State | Required behavior | Typical UI treatment |
|---|---|---|
| Loading | Block duplicate action, preserve layout stability | Skeletons for lists/details; spinner only for small inline actions |
| Empty | Explain why there is no data and what to do next | Illustration optional; primary next action when appropriate |
| Error | Use `error.code` and localized copy | State panel with retry/support action; never parse backend message |
| Success | Confirm transition and next step | Banner, sheet, or timeline checkpoint |
| Permission denied | Explain missing access without revealing policy internals | Read-only state with contact owner/support CTA |
| Offline | Show cached data if safe; block online-required writes | Banner + disabled CTA + reason |
| Sync failed | Surface queued change failure and retry path | Inline item state plus retry/resume action |
| GPS unavailable | Distinguish denied permission, disabled service, weak signal | Guidance card with settings/system action |
| Validation | Highlight field-level issue and preserve user input | Inline field error and summary for long forms |

### Backend Error Mapping

| Error code/group | UI behavior |
|---|---|
| `AUTH_*` | Force session refresh or sign-in flow; discard stale privileged action |
| `PERMISSION_*` | Show permission-denied state, remove optimistic local success, suggest contacting owner/support if relevant |
| `VALIDATION_*` | Map to field-level errors and keep form values |
| `BOOKING_ASSET_NOT_AVAILABLE` | Refresh availability, keep selected filters/time, suggest alternatives |
| `PAYMENT_*` | Show payment status panel, retry/support path, never mark payment complete until verified |
| `RETURN_*` | Keep return evidence draft if safe, explain required next step |
| `SOS_*` | Keep SOS timeline visible, show escalation status, avoid dismissing active incident context |
| `RATE_LIMIT_*` | Cooldown state with explicit wait/retry messaging |
| `INTERNAL_*` | Generic localized failure state with request/support reference |

### Online-Required Operations

The following actions must be visibly disabled while offline and explain why:

- Confirm booking
- Pay
- Confirm cash
- Handover
- Confirm return
- Change permission
- Approve store
- Refund

## SOS Component Behavior

### Placement and Visibility

- SOS must be reachable during active ride within one tap from the main ride screen.
- The button must remain visible above map chrome and reachable on small screens.
- Merchant and admin incident views must show open SOS alerts with clear severity and age.

### Required Inputs and Outputs

- Issue type selector with constrained categories such as accident, breakdown, safety concern, cannot continue, other.
- Latest known location, timestamp, and accuracy shown before submit.
- Direct disclaimer that Bike Local is not an emergency rescue service.
- Escalation visibility: awaiting response, acknowledged, assigned, escalated.
- Abuse handling must not block legitimate emergency use; suspicious repeat use is reviewed after the case, not before submit.

### Accessibility and Safety

- Large touch target with icon and text label.
- Screen-reader hint must describe that SOS shares the latest location with the store for help.
- Destructive confirmation copy must avoid accidental taps, but the flow cannot bury SOS behind multiple menus.
- If GPS is unavailable, allow SOS submission with last known location state and clear warning.
