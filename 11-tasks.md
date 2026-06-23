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
- [ ] Define Firestore indexes draft

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

- [ ] Define permission matrix by role/resource/action
- [ ] Implement auth token verification plan
- [ ] Implement App Check verification plan
- [ ] Draft Firestore security rules default-deny posture
- [ ] Draft storage upload rules
- [ ] Define audit log schema
- [ ] Define data classification and retention policy

### Design

- [ ] Confirm brand/design direction
- [ ] Create design tokens
- [ ] Create page inventory for renter, merchant and admin
- [ ] Create UI states for loading, empty, error, success, permission denied and offline
- [ ] Define SOS component behavior
- [ ] Define i18n content workflow

### Testing and CI/CD

- [ ] Define test commands
- [ ] Set up formatting/static analysis
- [ ] Set up unit test project
- [ ] Set up Firebase Emulator Suite
- [ ] Set up security rules tests
- [ ] Set up CI pipeline for lint, type check, tests and build
- [ ] Define seed/fixture data

## Module Task Plan

### Identity and RBAC

- [ ] Domain User and Auth Identity model
- [ ] Role and permission model
- [ ] User onboarding and role selection API
- [ ] Consent records
- [ ] Account deletion request flow

### Store and Branch

- [ ] Store registration API
- [ ] Document upload metadata
- [ ] Store approval workflow
- [ ] Branch CRUD
- [ ] Temporary closure support

### Inventory and Pricing

- [ ] Asset category and asset model
- [ ] Equipment and inventory units
- [ ] Rental points
- [ ] Pricing rules and price quote service
- [ ] Availability check with transaction/version

### Booking and Payment

- [ ] Booking create with idempotency
- [ ] Booking state machine tests
- [ ] Payment intent adapter interface
- [ ] Payment webhook idempotency
- [ ] Cash confirmation workflow
- [ ] Deposit lifecycle

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

- [ ] User signup and role selection works
- [ ] Store approval flow works
- [ ] Store can manage branch, staff, assets and equipment
- [ ] Search and booking work with availability
- [ ] Double booking is prevented
- [ ] QR payment and cash confirmation work
- [ ] Handover starts rental
- [ ] GPS buffers offline and uploads chunks
- [ ] Ending ride does not close rental
- [ ] Return request and inspection close rental
- [ ] Deposit is not released before inspection
- [ ] SOS opens with latest location and escalates
- [ ] Reports load
- [ ] Admin approval and audit search work
- [ ] Contract tests pass

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
