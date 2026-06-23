# 05 Decisions

Source: `docs/Bike-Local-SRS.md` sections 3, 4, 5, 6, 11, 12, 21, 22, 25

## Open Decisions

| ID | Decision | Status | Notes |
|---|---|---|---|
| ADR-006 | Payment Gateway | Proposed | SRS says selected later |
| ADR-007 | Map/Geocoding Provider | Proposed | Select by cost and service area |
| ADR-008 | Cloud Functions vs Cloud Run per workload | Proposed | Both allowed |
| ADR-009 | Flutter state management library | Proposed | SRS only says separated from UI |
| ADR-010 | Local database for ride tracking/offline queue | Proposed | Required, specific engine TBD |
| ADR-011 | Event/outbox processing implementation | Proposed | Required, exact service TBD |
| ADR-012 | Data retention for GPS track and PII | Proposed | Policy required |

## Accepted Decisions

## ADR-001: Cross-Platform Frontend

Status: Accepted
Date: 2026-06-23

### Context

Bike Local must support Android, iOS and Web.

### Decision

Use Flutter/Dart for cross-platform frontend, responsive UI and Material Design.

### Alternatives Considered

Not specified in source.

### Consequences

Shared UI/application packages can reduce duplication. Platform-specific GPS/background behavior still requires OS-specific handling.

### Follow-up

Choose state management and local database.

## ADR-002: Firebase MVP Infrastructure

Status: Accepted
Date: 2026-06-23

### Context

SRS defines Firebase as initial infrastructure.

### Decision

Use Firebase Authentication, Cloud Firestore, Cloud Storage, Firebase Cloud Messaging, App Check, Analytics, Crashlytics, Remote Config, Hosting and Emulator Suite.

### Alternatives Considered

PostgreSQL and MongoDB are future migration targets, not initial MVP database.

### Consequences

Fast MVP setup with serverless services. Must keep domain and API independent from Firebase-specific models.

### Follow-up

Create emulator setup, security rules and migration mapping.

## ADR-003: Backend API Boundary

Status: Accepted
Date: 2026-06-23

### Context

Business-critical data must not be accessed directly by frontend.

### Decision

All booking, payment, rental, return, settlement, SOS, staff, permission and financial report operations go through Backend API.

### Alternatives Considered

Direct Firestore access is only allowed for authentication-adjacent and public configuration cases.

### Consequences

Improves security, testability and database migration path.

### Follow-up

Define OpenAPI contract and backend authorization middleware.

## ADR-004: Contract-First REST API

Status: Accepted
Date: 2026-06-23

### Context

Frontend and Backend must develop in parallel.

### Decision

Use REST API, OpenAPI 3.1, JSON Schema, generated Dart client, backend TypeScript types, mock server, API docs and contract tests.

### Alternatives Considered

Not specified in source.

### Consequences

Requires contract discipline before feature implementation.

### Follow-up

Create `contracts/openapi.yaml` and schema files.

## ADR-005: Repository Pattern and Ports/Adapters

Status: Accepted
Date: 2026-06-23

### Context

System must support migration from Firestore to PostgreSQL or MongoDB.

### Decision

Domain/Application layers use repository interfaces. Infrastructure provides Firestore, PostgreSQL, MongoDB and In-Memory adapters as needed.

### Alternatives Considered

Direct Firestore model in domain rejected by SRS principles.

### Consequences

More up-front architecture, but lower vendor lock-in and easier testing.

### Follow-up

Define repository contracts for core modules.

## Rejected Alternatives

| Alternative | Reason |
|---|---|
| Frontend directly writes business-critical Firestore documents | Violates SRS sections 4.1 and 4.2 |
| Domain IDs based on Firestore document paths | Violates migration principles |
| Floating point money calculations | SRS requires integer minor units |
| Upload every GPS point as separate transaction | SRS requires batch/chunk upload |

## Decision Template

```md
## ADR-000: {Title}

Status: Proposed | Accepted | Superseded | Rejected
Date: YYYY-MM-DD

### Context
### Decision
### Alternatives Considered
### Consequences
### Follow-up
```
