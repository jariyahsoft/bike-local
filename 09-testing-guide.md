# 09 Testing Guide

Source: `docs/Bike-Local-SRS.md` sections 5.6, 10, 11.6, 12, 13, 14, 16, 24

## Test Pyramid

1. Unit tests: domain rules and application services
2. Contract tests: OpenAPI request/response/error compatibility
3. Integration tests: Firebase Emulator and provider sandboxes
4. E2E tests: critical user journeys across client/backend
5. Manual/UAT: Product Owner, store, staff, renter, platform admin

## Unit Test Scope

Domain Layer coverage target: at least 80%

Must cover:

- Identity onboarding and consent validation
- Pricing
- Availability
- Booking state
- Payment state
- Return state
- Deposit
- Permission
- Settlement

## Frontend Tests

- Widget tests
- State management tests
- Form validation
- Navigation
- Permission-based UI
- Localization
- Offline behavior
- GPS permission and unavailable states
- Loading/empty/error/success states

Current scaffold:

- `apps/mobile_app/test/renter_shell_foundation_test.dart`
- `apps/merchant_portal/test/merchant_portal_foundation_test.dart`
- `apps/admin_portal/test/admin_portal_foundation_test.dart`
- `packages/design_system/test/design_theme_test.dart`
- `packages/localization/test/localization_keys_test.dart`
- `packages/common_widgets/test/state_panel_test.dart`

## Backend Tests

- Application services
- Repository contracts
- API validation
- Identity onboarding, profile update, and account deletion request flows
- Store registration, approval, branch management, and staff permission workflows
- Authorization and tenant isolation
- Idempotency
- Transactions/concurrency
- Webhook processing
- Event handlers/outbox

## Contract Tests

Frontend client and backend must pass the same OpenAPI contract.

Check:

- Required fields
- Enum values
- Error format
- Nullable fields
- Pagination
- Version compatibility

## Integration Test Flows

Use Firebase Emulator and sandbox providers.

Critical flows:

1. สมัคร -> จอง -> จ่าย -> รับ -> ปั่น -> คืน
2. จอง -> เงินสด -> พนักงานยืนยัน -> คืน
3. Payment webhook ซ้ำ
4. จองจักรยานคันเดียวพร้อมกัน
5. GPS ขาด
6. จบการปั่นแต่ยังไม่คืน
7. SOS
8. คืนต่างจุด
9. ความเสียหายและหักมัดจำ

## Security Tests

- Unauthorized access
- Cross-tenant access
- Privilege escalation
- Invalid token
- Missing App Check
- Duplicate auth identity linking
- Consent validation and self-service access boundaries
- Store/branch tenant isolation and staff permission revocation
- File upload abuse
- Rate limit
- Injection
- Broken object-level authorization
- Payment webhook replay
- Audit immutability

## Current Backend Coverage

- Identity role selection validation for renter/store owner onboarding
- Required terms/privacy consent capture plus explicit GPS background scope validation
- Onboarding happy path with masked auth identity output and account deletion request audit
- Duplicate auth identity rejection and unauthenticated self-service access rejection
- Store approval workflow, approved-branch availability, temporary branch closure, staff invitation validation, permission audit, and cross-tenant denial
- Inventory asset/category/equipment creation, duplicate asset-code rejection within a store, cross-tenant inventory denial, integer minor-unit pricing quotes with immutable snapshots, transaction-style availability hold conflict rejection, closed branch exclusion, and unsupported search-filter rejection
- Booking creation idempotency, same-asset booking conflict rejection, booking state machine valid/invalid transitions, provider-verified payment webhook replay safety, cash confirmation permission/audit flow, and deposit release-before-inspection guard
- Handover rejects invalid/expired/used QR booking tokens, starts rental state across booking/asset/deposit/ride/audit/outbox, ride tracking enforces GPS consent and chunk dedupe, ending a ride does not close rental, and return inspection closes booking/asset/deposit only after authorized staff acceptance

## Accessibility Tests

- System font scaling
- Screen reader labels on main screens
- Touch target sizes
- Status not conveyed by color only
- SOS action discoverable and accessible
- Contrast checks for outdoor-use screens

## Performance Tests

- Read API P95 <= 2s excluding external providers
- Write API P95 <= 3s excluding external providers
- Main lists show skeleton/loading immediately
- Ride tracking uploads chunks, not one transaction per GPS point
- Image uploads create thumbnails/compression

## Test Data and Fixtures

Seed data should include:

- Renter, store owner, manager, staff, accounting, platform admin
- Approved and unapproved stores
- Multiple branches with different statuses
- Assets across all important states
- Pricing rules and deposits
- Booking/payment/cash/deposit examples
- Ride sessions with GPS gaps, buffered chunk uploads, and duplicate sequence/checksum examples
- Return requests, inspection decisions, deposit release/deduction examples, and SOS cases
- Notifications with device registration, delivery failure/retry, and moderation cases for route/place/review content
- Reports with date/branch filters, exports, settlement policy scenarios, and platform overview aggregates

## CI Test Commands

Available now:

```text
npm run format
npm run format:check
npm run lint
npm run typecheck
npm test
npm run test:contract
npm run test:security
npm run test:security-rules
npm run test:emulator
npm run build
```

Requires Flutter/Dart SDK installation:

```text
npm run format:flutter
npm run analyze:flutter
npm run test:frontend
```

## Manual QA Checklist

- [ ] User can register and select roles
- [ ] Store can register and be approved
- [x] Store can add branches, staff, assets and equipment
- [x] Renter can search and book available asset
- [x] Double booking is prevented at availability-hold level
- [x] Payment adapter stub and cash confirmation workflow work
- [ ] Staff receives task after payment/cash confirmation
- [x] Handover starts rental
- [x] Ride tracking buffers offline GPS
- [x] Ride ending does not close rental
- [x] Return request notifies store
- [x] Inspection closes rental and handles deposit
- [x] SOS sends latest location and escalates
- [x] Basic reports load
- [x] Admin can approve content/store
- [x] Audit logs exist for sensitive actions
