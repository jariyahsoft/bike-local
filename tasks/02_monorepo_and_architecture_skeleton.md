# Task 02: Monorepo and Architecture Skeleton

## 🤖 Recommended Model
> Complexity: **High** - establishes repo layout, package boundaries, backend module shape, and adapter seams used by all later tasks.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| S | Claude | Opus 4.6 | - | Best fit for architectural consistency and dependency boundaries. |
| B | Gemini | Pro 3.1 | high | Useful for reasoning across Flutter, TypeScript, Firebase, and future migration constraints. |
| A | GPT | 5.5 | medium | Strong for scaffolding and enforcing separation between domain/application/infrastructure. |
| B | Budget | GLM-5.2 | max | Highest-intelligence budget option for architecture and dependency-boundary decisions; still requires review. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `01-architecture.md`
- `02-coding-rules.md`
- `03-database-design.md`
- `05-decisions.md`
- `09-testing-guide.md`
- `11-tasks.md`

## Phase
Foundation / Sprint 0

## Prerequisites
- Task 01 product/domain assumptions reviewed enough to avoid naming churn.

## Instructions

1. **Create Monorepo Structure**
   - Create the top-level folders from `01-architecture.md`: `apps/`, `packages/`, `backend/`, `contracts/`, and tooling/config folders as needed.
   - Add placeholders or package manifests for `apps/mobile_app`, `apps/merchant_portal`, `apps/admin_portal`, `packages/api_client`, `packages/design_system`, `packages/domain_models`, `packages/localization`, `packages/authentication`, `packages/maps`, `packages/notifications`, `packages/ride_tracking`, `packages/validation`, and `packages/common_widgets`.
   - Keep frontend code ready to consume generated API clients rather than direct Firestore business data access.

2. **Create Backend Module Skeleton**
   - Create `backend/src` modules listed in `01-architecture.md`.
   - Each module should have `domain`, `application`, `infrastructure`, `api`, and `tests` folders where applicable.
   - Add shared primitives for IDs, timestamps, money minor units, pagination, versioning, correlation/request ID, domain errors, and audit metadata.

3. **Create Repository Interface Examples**
   - Add example interfaces for booking, payment, ride, and return repositories.
   - Keep repository interfaces free of Firebase/Firestore SDK imports.
   - Add in-memory adapter stubs for unit tests where useful.

4. **Document Runtime Decision Points**
   - Capture Cloud Functions vs Cloud Run as an open ADR follow-up unless already decided.
   - Capture outbox/dead-letter implementation as an open ADR follow-up.

## Verify
- Domain/application files do not import Firebase, Firestore, HTTP framework, or provider SDKs.
- Folder structure matches the architecture document closely enough for later tasks.
- Repository examples use canonical IDs and integer minor units for money.
- No secrets or environment-specific values are committed.

## Definition of Done
- [ ] Monorepo skeleton exists.
- [ ] Backend module skeleton exists.
- [ ] Core shared primitives are stubbed or documented.
- [ ] Repository examples exist for booking, payment, ride, and return.
- [ ] Open architecture decisions are recorded without pretending they are final.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
