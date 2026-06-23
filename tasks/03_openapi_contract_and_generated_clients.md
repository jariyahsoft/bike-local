# Task 03: OpenAPI Contract and Generated Clients

## 🤖 Recommended Model
> Complexity: **High** - contract-first API work impacts frontend/backend parallel development and error compatibility.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| A | Claude | Opus 4.6 | - | Strong at schema design, consistency, and API edge cases. |
| B | Gemini | Pro 3.1 | high | Good for checking cross-module contract completeness. |
| S | GPT | 5.5 | high | Best fit for OpenAPI structure, examples, and generated type workflows. |
| B | Budget | DeepSeek V4 Pro | max | Strong value for bounded schema, example, and generated-client work with contract-consistency review. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `01-architecture.md`
- `02-coding-rules.md`
- `03-database-design.md`
- `04-api-standard.md`
- `05-decisions.md`
- `09-testing-guide.md`
- `10-glossary.md`
- `11-tasks.md`

## Phase
Foundation / Sprint 0

## Prerequisites
- Task 02 monorepo skeleton completed.

## Instructions

1. **Create Contract Layout**
   - Create `contracts/openapi.yaml`.
   - Use OpenAPI 3.1 and JSON Schema-compatible schemas.
   - Include shared response envelopes, error envelope, pagination metadata, idempotency header, version conflict examples, and request ID/correlation metadata.

2. **Add Core Schemas**
   - Add schemas for user, auth identity, store, branch, asset, equipment, rental point, booking, booking item, payment, deposit, ride session, ride track chunk, return request, return inspection, SOS case, notification, audit log, and error.
   - Use `snake_case` JSON fields and status values from `10-glossary.md`.
   - Use integer minor units for all money fields.

3. **Add Endpoint Stubs and Examples**
   - Add endpoint stubs from `04-api-standard.md` for Identity/Users, Stores, Branches, Staff, Assets, Search, Pricing, Booking, Payment, Cash, Handover, Ride, Return, SOS, Content, Reports, and Audit.
   - Add at least one success and one error example per major module.
   - Include `401`, `403`, `404`, `409`, `422`, and rate-limit examples where relevant.

4. **Set Up Generated Client Workflow**
   - Add commands or scripts for generated Dart API client and TypeScript API types.
   - Add mock server setup.
   - Add contract test command placeholder or implementation depending on available tooling.

## Verify
- OpenAPI validates with the selected linter/generator.
- Generated Dart client can be produced or the command is documented with blockers.
- TypeScript API types can be produced or the command is documented with blockers.
- Error response shape matches `04-api-standard.md`.
- Contract tests or mock server can run in CI once dependencies are installed.

## Definition of Done
- [ ] `contracts/openapi.yaml` exists and validates.
- [ ] Core schemas and status enums are represented.
- [ ] Success/error examples cover major modules.
- [ ] Generated client/type commands are documented or implemented.
- [ ] Mock server and contract test workflow are documented or implemented.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
