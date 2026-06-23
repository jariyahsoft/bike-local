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

## Backend Tests

- Application services
- Repository contracts
- API validation
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
- File upload abuse
- Rate limit
- Injection
- Broken object-level authorization
- Payment webhook replay
- Audit immutability

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
- Ride sessions with GPS gaps
- Return requests and SOS cases

## CI Test Commands

Available now:

```text
npm run typecheck
npm test
npm run test:contract
npm run test:security
```

Pending for Task 06:

```text
test:emulator
test:security-rules
build
```

## Manual QA Checklist

- [ ] User can register and select roles
- [ ] Store can register and be approved
- [ ] Store can add branches, staff, assets and equipment
- [ ] Renter can search and book available asset
- [ ] Double booking is prevented
- [ ] QR payment and cash payment work
- [ ] Staff receives task after payment/cash confirmation
- [ ] Handover starts rental
- [ ] Ride tracking buffers offline GPS
- [ ] Ride ending does not close rental
- [ ] Return request notifies store
- [ ] Inspection closes rental and handles deposit
- [ ] SOS sends latest location and escalates
- [ ] Basic reports load
- [ ] Admin can approve content/store
- [ ] Audit logs exist for sensitive actions
