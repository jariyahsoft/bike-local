# Task 06: Testing, CI, and Emulator Foundation

## 🤖 Recommended Model
> Complexity: **High** - establishes verification commands, emulator behavior, seed data, and CI gates for all later work.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| B | Claude | Sonnet 4.6 | - | Good for practical test planning and CI structure. |
| A | Gemini | Pro 3.1 | high | Strong for integration and emulator edge-case planning. |
| S | GPT | 5.5 | medium | Best fit for test command scaffolding, fixtures, and CI implementation. |
| B | Budget | DeepSeek V4 Pro | max | Strong value for CI configuration, fixtures, and test scaffolding with targeted edge-case review. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `01-architecture.md`
- `02-coding-rules.md`
- `04-api-standard.md`
- `05-decisions.md`
- `07-security-rules.md`
- `09-testing-guide.md`
- `11-tasks.md`

## Phase
Foundation / Sprint 0

## Prerequisites
- Task 02 monorepo skeleton completed.
- Task 03 contract workflow started.
- Task 04 security rules draft started.

## Instructions

1. **Define Test Commands**
   - Add or document commands for format, lint, test, unit tests, contract tests, emulator tests, security rules tests, and build.
   - Keep commands stack-appropriate and do not assume a package manager that the repo has not selected.

2. **Set Up Static Analysis**
   - Configure formatting and strict analysis for TypeScript/Node and Dart/Flutter where tooling exists.
   - Add fail-fast CI behavior for lint/type/analysis.

3. **Create Unit Test Projects**
   - Create backend unit test structure for domain rules and application services.
   - Create frontend test structure for widgets, state management, forms, navigation, localization, offline behavior, and GPS unavailable states.

4. **Set Up Firebase Emulator Suite**
   - Add emulator configuration for Firestore, Auth, Storage, Functions, and rules testing where applicable.
   - Add seed/fixture strategy for renter, store owner, manager, staff, accounting, platform admin, stores, branches, assets, pricing, bookings, payments, rides, returns, SOS, and audit logs.

5. **Set Up CI Pipeline**
   - Create CI workflow for lint, type check, tests, contract validation, emulator/security rules tests, and build.
   - Include dependency caching if appropriate.
   - Do not include deployment to production in this task.

## Verify
- Local verification commands are documented and runnable or clearly marked pending dependency installation.
- CI covers formatting/static analysis, tests, contract validation, and build categories.
- Emulator seed data covers critical user journeys from `09-testing-guide.md`.
- Security rules tests include default-deny and user-owned notification/public config exceptions if present.

## Definition of Done
- [ ] Test command catalog exists.
- [ ] Static analysis setup exists or is documented.
- [ ] Unit test structure exists for backend/frontend.
- [ ] Firebase Emulator Suite config and seed strategy exist.
- [ ] CI pipeline runs or has documented blockers.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
