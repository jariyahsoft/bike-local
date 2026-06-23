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
| ADR-012 | Data retention for GPS track and PII | Proposed | Foundation draft exists in `07-security-rules.md`; legal approval and exact retention windows remain open |
| ADR-013 | First Launch Area | Proposed | SRS does not define first country/city |
| ADR-014 | Commission Plan and Settlement Cycle | Proposed | Settlement model exists, commercial terms are open |
| ADR-015 | Brand Direction | Proposed | SRS/UI guide do not define approved visual direction |

## Decision Backlog and Next Actions

These items are intentionally not accepted yet. They organize the product questions that block provider selection, compliance scope, settlement, and design work.

| Topic | Owner | Impact | Current Source Position | Proposed Next Action |
|---|---|---|---|---|
| Payment Gateway | Product Owner + Engineering | Blocks payment adapter, refund behavior, webhook contract details, settlement fee modeling | `docs/Bike-Local-SRS.md` sections 3.1, 7.12, 22; `00-project-overview.md` Open Questions | Compare 2-3 gateway options against QR support, webhook reliability, refund APIs, payout model, Thailand support, and fee structure; record recommendation in ADR-006 without marking accepted until confirmed |
| Map/Geocoding Provider | Product Owner + Engineering | Blocks map SDK choice, geocoding limits, area search accuracy, and cost planning | `docs/Bike-Local-SRS.md` sections 3.1, 7.18; `00-project-overview.md` Open Questions | Run a short provider evaluation for search/geocoding coverage, route rendering needs, offline behavior assumptions, and Thai location quality; update ADR-007 with tradeoffs |
| First Launch Area | Product Owner + Operations | Affects language defaults, legal scope, provider shortlist, branch onboarding, and support workflows | `00-project-overview.md` Open Questions; `06-backlog.md` Dependencies | Confirm initial launch country/city or province set before locking payment, map, and compliance assumptions; document result in ADR-013 |
| PDPA/GDPR Level and Retention Policy | Product Owner + Legal/Compliance + Security | Blocks final consent copy, GPS retention, account deletion boundaries, support tooling, and analytics data handling | `docs/Bike-Local-SRS.md` sections 12.5, 21; `07-security-rules.md`; `11-tasks.md` Security checklist | Define whether MVP targets Thailand PDPA only or PDPA plus GDPR-ready controls; convert the current foundation draft into an approved policy with exact GPS, merchant document, audit, and deletion exception windows |
| Commission Plan | Product Owner + Finance | Blocks store net revenue calculations, admin revenue reports, and merchant expectations | `docs/Bike-Local-SRS.md` sections 7.26, 7.27, 7.28; `00-project-overview.md` Open Questions | Decide whether MVP uses flat percentage, tiered percentage, or fixed fee; keep formulas configurable and record only the proposal until commercial approval |
| Settlement Cycle | Product Owner + Finance + Operations | Blocks payout scheduling, report cutoffs, dispute windows, and held-settlement behavior | `docs/Bike-Local-SRS.md` section 7.28; `11-tasks.md` Dependencies | Choose a provisional cycle such as weekly or twice-monthly for prototype/report design, but mark it as pending approval in ADR-014 |
| Brand Direction | Product Owner + Design | Blocks final design tokens, marketing pages, and portal visual system | `08-ui-guide.md` Design Tokens/Open Questions; `11-tasks.md` Design checklist | Produce a lightweight brand brief with logo usage, typography direction, color palette, and tone; current Task 05 tokens are provisional operational defaults only and must not be treated as approved brand output |

## Architecture Runtime Follow-ups

| Topic | Owner | Impact | Current Position | Proposed Next Action |
|---|---|---|---|---|
| Cloud Functions vs Cloud Run per workload | Engineering + DevOps | Affects deployment topology, cold starts, webhook handling, long-running jobs, and local emulator setup | ADR-008 remains `Proposed`; SRS allows both | Keep backend domain/application modules runtime-neutral; decide per workload once API, webhook, background event, and reporting requirements are concrete |
| Outbox and Dead Letter implementation | Engineering + DevOps | Affects payment webhook reliability, notification retries, SOS escalation, and settlement events | ADR-011 remains `Proposed`; architecture requires outbox/dead-letter behavior | Start with repository ports and event records independent of Firebase; choose Cloud Tasks, Pub/Sub, Firestore polling, or Cloud Run worker strategy in a later implementation task |

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
