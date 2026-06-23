# 11 Tasks

Source: `docs/Bike-Local-SRS.md` sections 18, 19, 24, 26

Status legend:

```text
[ ] todo
[/] in progress
[x] done
[!] blocked
```

## Current Phase

Foundation / Sprint 0

## Sprint 0 Checklist

### Product and Domain

- [x] Confirm open questions in `00-project-overview.md`
- [ ] Review glossary with product, engineering, QA and support
- [x] Define user flow diagrams for renter, merchant and admin
- [x] Define MVP route/place/review moderation policy
- [x] Define cancellation, refund and deposit policy boundaries

### Architecture

- [ ] Confirm Cloud Functions vs Cloud Run decision
- [x] Create monorepo structure
- [x] Create backend module skeleton
- [x] Create frontend apps/packages skeleton
- [x] Create repository interface examples for booking, payment, ride and return
- [ ] Define outbox/dead-letter strategy
- [x] Define Firestore indexes draft

### Contracts

- [x] Create `contracts/openapi.yaml`
- [x] Add schemas for user, store, branch, asset, booking, payment, ride, return, sos and error
- [x] Add success/error examples
- [x] Add pagination, idempotency and version conflict examples
- [x] Set up generated Dart API client
- [x] Set up TypeScript API types
- [x] Set up mock server
- [x] Set up contract test command

### Security

- [x] Define permission matrix by role/resource/action
- [x] Implement auth token verification plan
- [x] Implement App Check verification plan
- [x] Draft Firestore security rules default-deny posture
- [x] Draft storage upload rules
- [x] Define audit log schema
- [x] Define data classification and retention policy

### Design

- [ ] Confirm brand/design direction
- [x] Create design tokens
- [x] Create page inventory for renter, merchant and admin
- [x] Create UI states for loading, empty, error, success, permission denied and offline
- [x] Define SOS component behavior
- [x] Define i18n content workflow

### Testing and CI/CD

- [x] Define test commands
- [x] Set up formatting/static analysis
- [x] Set up unit test project
- [x] Set up Firebase Emulator Suite
- [x] Set up security rules tests
- [x] Set up CI pipeline for lint, type check, tests and build
- [x] Define seed/fixture data

## Module Task Plan

### Identity and RBAC

- [x] Domain User and Auth Identity model
- [x] Role and permission model
- [x] User onboarding and role selection API
- [x] Consent records
- [x] Account deletion request flow

### Store and Branch

- [x] Store registration API
- [x] Document upload metadata
- [x] Store approval workflow
- [x] Branch CRUD
- [x] Temporary closure support

### Inventory and Pricing

- [x] Asset category and asset model
- [x] Equipment and inventory units
- [x] Rental points
- [x] Pricing rules and price quote service
- [x] Availability check with transaction/version

### Booking and Payment

- [x] Booking create with idempotency
- [x] Booking state machine tests
- [x] Payment intent adapter interface
- [x] Payment webhook idempotency
- [x] Cash confirmation workflow
- [x] Deposit lifecycle

### Rental, Ride and Return

- [ ] QR booking token validation
- [ ] Handover checklist
- [ ] Rental session creation
- [ ] Ride session local buffer contract
- [ ] Ride track chunk upload
- [ ] Return request evidence
- [ ] Inspection and rental close

### SOS and Notification

- [ ] SOS case model and state machine
- [ ] SOS escalation rules
- [ ] Notification event catalog
- [ ] FCM token registration
- [ ] Delivery log

### Reports and Settlement

- [ ] Store rental report
- [ ] Store revenue report
- [ ] Asset report
- [ ] Staff report
- [ ] Platform overview report
- [ ] Settlement calculation
- [ ] CSV/Excel export

## Dependencies

- Payment Gateway selection blocks final payment adapter
- Map Provider selection blocks geocoding/map-specific implementation
- Design tokens require brand direction
- Store commission plan affects settlement
- Privacy/retention policy affects ride track and account deletion

## Definition of Done

- [ ] Requirement traced to SRS section or ADR
- [ ] API contract updated and reviewed
- [ ] Domain/application tests added
- [ ] Authorization and tenant tests added
- [ ] Frontend state and error handling covered
- [ ] Audit/observability implemented where required
- [ ] Docs updated
- [ ] QA scenario passes

## Verification Checklist

- [x] User signup and role selection works
- [x] Store approval flow works
- [x] Store can manage branch and staff
- [x] Store can manage assets and equipment
- [x] Search and booking work with availability
- [x] Double booking is prevented at availability-hold level
- [x] Payment adapter stub and cash confirmation work
- [ ] Handover starts rental
- [ ] GPS buffers offline and uploads chunks
- [ ] Ending ride does not close rental
- [ ] Return request and inspection close rental
- [x] Deposit is not released before inspection
- [ ] SOS opens with latest location and escalates
- [ ] Reports load
- [x] Admin approval works with audit logging
- [ ] Audit search works
- [x] Contract tests pass

## Deployment Checklist

- [ ] Firebase dev/staging/prod projects created
- [ ] Secrets configured per environment
- [ ] Firestore rules deployed
- [ ] Storage rules deployed
- [ ] Indexes deployed
- [ ] Functions/Cloud Run deployed to staging
- [ ] Smoke tests pass
- [ ] Manual approval completed
- [ ] Production backup/restore plan tested
- [ ] Rollback plan documented

## Backlog / Future Tasks

- [ ] Smart Lock Adapter
- [ ] Smart Dock Adapter
- [ ] GPS/IoT Device Integration
- [ ] Geofence
- [ ] Device Telemetry
- [ ] Asset Theft Detection
- [ ] AI Damage Detection
- [ ] Insurance Integration
- [ ] Digital Rental Agreement
- [ ] Smart Watch Integration
- [ ] Loyalty and advanced coupon
- [ ] Advanced Analytics and Data Warehouse
- [ ] PostgreSQL migration option

## Notes for AI Agents

- Do not invent requirements beyond SRS or accepted ADRs
- Put assumptions in the relevant document before implementing
- Preserve API-first workflow
- Keep Firebase out of domain models
- Use integer minor units for money
- Never expose full tokens, secrets, personal documents or unnecessary coordinates in logs
