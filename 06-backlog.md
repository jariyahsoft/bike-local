# 06 Backlog

Source: `docs/Bike-Local-SRS.md` sections 7, 12, 14, 18, 19, 24, 26

## Epics

| Epic | Priority | Source |
|---|---|---|
| Foundation and Contracts | P0 | sections 5, 15, 16, 18, 26 |
| Identity and RBAC | P0 | sections 6, 7.1, 7.2 |
| Store and Branch Management | P0 | sections 7.3, 7.4 |
| Staff and Permissions | P0 | section 7.5 |
| Asset, Equipment and Inventory | P0 | sections 7.6, 7.7, 7.8 |
| Search and Pricing | P0 | sections 7.9, 7.10 |
| Booking and Payment | P0 | sections 7.11, 7.12, 7.13, 7.14 |
| Handover and Rental | P0 | sections 7.15, 7.16 |
| Ride Tracking and Map | P0 | sections 7.17, 7.18, 7.19 |
| Return and Inspection | P0 | sections 7.20, 7.21 |
| SOS and Notifications | P0 | sections 7.22, 7.25 |
| Content, Review and Moderation | P1 | sections 7.23, 7.24 |
| Reports and Settlement | P1 | sections 7.26, 7.27, 7.28 |
| Audit, Security and Hardening | P0 | sections 7.29, 12, 14 |

## User Stories

### US-001: Register and Select Role

As a user, I want to sign up and choose whether I rent bikes or manage a rental store, so that I can access the right workflow.

Priority: P0  
Source: FR-ONB-001 to FR-ONB-004, FR-USR-001 to FR-USR-003

Acceptance Criteria:
- [ ] User can sign up using supported auth methods
- [ ] User can select renter or store owner role
- [ ] One account can hold multiple roles
- [ ] User can choose Thai or English
- [ ] Consent records store terms, privacy, GPS and marketing versions

### US-002: Submit Store for Approval

As a store owner, I want to submit store information and documents, so that platform admins can approve my store.

Priority: P0  
Source: FR-STR-001 to FR-STR-005

Acceptance Criteria:
- [ ] Owner can create store draft
- [ ] Owner can upload identity/business/payment documents and store images
- [ ] Store moves through approval states
- [ ] Booking is allowed only when store is `APPROVED`
- [ ] Sensitive store edits can trigger review

### US-003: Manage Branches

As a store owner or manager, I want to manage branches with location and operating hours, so that renters can pick valid pickup/return locations.

Priority: P0  
Source: FR-BRN-001 to FR-BRN-004

Acceptance Criteria:
- [ ] Store can have multiple branches
- [ ] Branch stores address, coordinates, phone, opening hours, status and time zone
- [ ] Branch can be temporarily closed with reopen date

### US-004: Manage Staff and Permissions

As a store owner, I want to invite staff and assign roles/branches, so that operations are controlled by least privilege.

Priority: P0  
Source: FR-STF-001 to FR-STF-005

Acceptance Criteria:
- [ ] Invite by phone, email, link or QR code
- [ ] Assign role and branch access
- [ ] Apply permission overrides
- [ ] Suspend staff immediately
- [ ] Permission changes write audit logs

### US-005: Manage Assets and Equipment

As a store staff member, I want to add bikes and equipment, so that inventory can be booked accurately.

Priority: P0  
Source: FR-AST-001 to FR-AST-005, FR-EQP-001 to FR-EQP-004

Acceptance Criteria:
- [ ] Asset code is unique within store
- [ ] Asset supports QR, category, brand, model, color, size, images, branch, price and deposit
- [ ] Asset status transition history is recorded
- [ ] Equipment can be rented separately, bundled, package-included, or deposit-required
- [ ] Availability prevents overlapping confirmed bookings

### US-006: Search Stores and Assets

As a renter, I want to search nearby stores and available bikes by filters, so that I can find a suitable rental.

Priority: P0  
Source: FR-SRH-001 to FR-SRH-005

Acceptance Criteria:
- [ ] Search by current location and text
- [ ] Filter by type, price, distance, rating, date/time, availability, cash, different return point, e-bike, equipment
- [ ] Map view shows results
- [ ] Availability reflects selected date/time

### US-007: Create Booking

As a renter, I want to book bike/equipment with pickup/return points and payment method, so that I can reserve inventory.

Priority: P0  
Source: FR-BKG-001 to FR-BKG-006, FR-PRC-001 to FR-PRC-004

Acceptance Criteria:
- [ ] Booking includes store, branch, asset, time, pickup, return, equipment and payment method
- [ ] Price snapshot is stored
- [ ] Booking hold supports payment window
- [ ] Create booking supports idempotency key
- [ ] QR booking token is one-time or time-limited

### US-008: Process Online Payment

As a renter, I want to pay online, so that my booking can be confirmed without cash.

Priority: P0  
Source: FR-PAY-001 to FR-PAY-006

Acceptance Criteria:
- [ ] Backend creates payment intent through adapter
- [ ] Success is verified by webhook or server-to-server verification
- [ ] Webhook is idempotent
- [ ] Payment event is recorded
- [ ] Staff task and notification are created after successful payment

### US-009: Confirm Cash Payment

As staff with permission, I want to confirm cash payment, so that cash bookings can proceed.

Priority: P0  
Source: FR-CSH-001 to FR-CSH-005

Acceptance Criteria:
- [ ] Renter can choose cash at store or with staff
- [ ] Booking remains pending until confirmation
- [ ] Only `payment.cash.confirm` can confirm
- [ ] Confirmation records receiver, time, amount, branch, notes and optional evidence
- [ ] Corrections/cancellation require reason and audit log

### US-010: Handover Bike

As staff, I want to scan QR and record handover checklist, so that rental starts only after verification.

Priority: P0  
Source: FR-HND-001 to FR-HND-004

Acceptance Criteria:
- [ ] Staff scans QR and verifies booking/user
- [ ] Checklist captures pre-handover photos, bike condition, equipment, existing damage, staff and time
- [ ] Booking becomes `IN_PROGRESS`
- [ ] Asset becomes `RENTED`
- [ ] Rental Session is created

### US-011: Track Ride Offline

As a renter, I want GPS tracking to continue through network gaps, so that ride history is not lost.

Priority: P0  
Source: FR-RID-001 to FR-RID-009, section 13

Acceptance Criteria:
- [ ] Ride starts only when rental is `IN_PROGRESS`
- [ ] GPS uses phone in MVP
- [ ] GPS points are stored locally before upload
- [ ] Upload uses batch/chunk format
- [ ] GPS gaps are recorded without fake points
- [ ] User can resume active ride session after app interruption

### US-012: Request Return and Inspection

As a renter, I want to request return with evidence, so that the store can verify and close the rental.

Priority: P0  
Source: FR-RET-001 to FR-RET-008, FR-PKU-001 to FR-PKU-005

Acceptance Criteria:
- [ ] Return supports store, defined point, staff pickup, and Phase 2 Smart Dock
- [ ] Evidence captures bike photo, parking photo, GPS, time and notes
- [ ] Store/staff receive notification
- [ ] Only authorized actor or Smart Dock can accept return
- [ ] Inspection captures condition, photos, equipment, damage, charges and inspector
- [ ] Deposit is not released before return and inspection
- [ ] Asset becomes available only after inspection passes

### US-013: Open SOS Case

As a renter during a ride, I want to trigger SOS with my latest location, so that store staff can respond.

Priority: P0  
Source: FR-SOS-001 to FR-SOS-008

Acceptance Criteria:
- [ ] SOS button is available during ride
- [ ] Case includes user, booking, rental, asset, phone, location, accuracy and issue type
- [ ] Staff can acknowledge and accept case
- [ ] Escalation notifies staff, manager and owner if no response
- [ ] Emergency call information is visible with disclaimer
- [ ] SOS timeline/audit is recorded

### US-014: Generate Merchant Reports

As a store owner/accounting user, I want basic reports, so that I can monitor rental and revenue operations.

Priority: P1  
Source: FR-RPT-001 to FR-RPT-006

Acceptance Criteria:
- [ ] Filter by date range and branch
- [ ] Rental report shows bookings, completed, cancelled, no-show, overdue and average duration
- [ ] Revenue report shows gross, net, cash, online, deposit, refund, penalty and platform fee
- [ ] Export supports CSV and Excel in MVP

### US-015: Moderate Marketplace Content

As a platform admin, I want to approve places/routes/reviews, so that public content is safe and current.

Priority: P1  
Source: FR-CNT-001 to FR-CNT-006, FR-REV-001 to FR-REV-005

Acceptance Criteria:
- [ ] Store/member/admin can submit route/place content
- [ ] Non-admin content is not published before approval
- [ ] Users can report unsafe/wrong/outdated content
- [ ] Review is allowed after completed booking only
- [ ] Admin can hide policy-violating reviews

## Non-Functional Requirements

- P95 read API <= 2s excluding external providers
- P95 write API <= 3s excluding external providers
- MVP availability target >= 99.5%/month excluding announced maintenance
- Domain layer coverage >= 80%
- Payment webhook retry and outbox required
- HTTPS/TLS, least privilege, backend validation, rate limits
- Backup RPO <= 24h for general data, RTO <= 8h

## Dependencies

- Payment Gateway selection
- Map Provider selection
- Firebase project setup
- OpenAPI contract and generated client tooling
- Local storage/database choice
- Brand/design direction

## Risks and Blockers

- Provider selection can block payment/map implementation
- Background GPS behavior varies by OS
- Firestore query/index design can affect performance and cost
- Settlement requires commission/payment fee decisions
