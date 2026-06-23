# Task 10: Booking, Payment, Cash, and Deposit

## 🤖 Recommended Model
> Complexity: **Very High** - booking/payment/deposit workflows require idempotency, concurrency, state machines, audit, and provider-safe behavior.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| S | Claude | Opus 4.6 | - | Best fit for payment lifecycle and state-machine risk. |
| B | Gemini | Pro 3.1 | high | Strong for webhook/idempotency edge cases. |
| A | GPT | 5.5 | high | Strong for implementation, tests, and API consistency. |
| B | Budget | GLM-5.2 | max | Highest-intelligence budget option for payment and state-machine risk; requires security/idempotency review. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `02-coding-rules.md`
- `03-database-design.md`
- `04-api-standard.md`
- `05-decisions.md`
- `06-backlog.md`
- `07-security-rules.md`
- `09-testing-guide.md`
- `10-glossary.md`
- `11-tasks.md`

## Phase
Transaction / Booking and Payment

## Prerequisites
- Task 09 inventory, pricing, search, and availability completed.
- Payment Gateway decision may remain open; use adapter interface until selected.

## Instructions

1. **Implement Booking Creation**
   - Implement `POST /api/v1/bookings` with idempotency key support.
   - Include store, branch, asset/equipment, start/end time, pickup/return point, payment method, price snapshot, policy snapshot, deposit amount, total amount, and version.
   - Prevent double booking through transaction/version availability checks.
   - Generate one-time or time-limited QR booking token reference.

2. **Implement Booking State Machine**
   - Define allowed booking transitions from `PENDING_PAYMENT`, `PENDING_STORE_CONFIRMATION`, `CONFIRMED`, `PREPARING`, `AWAITING_PICKUP`, `IN_PROGRESS`, `RETURN_PENDING`, `INSPECTION_PENDING`, `COMPLETED`, `CANCELLED`, `NO_SHOW`, and `DISPUTED`.
   - Add domain tests for valid/invalid transitions.

3. **Implement Payment Adapter Interface**
   - Create provider-neutral payment intent interface.
   - Do not implement provider-specific logic until ADR-006 is accepted.
   - Ensure frontend callback is never treated as final proof of payment.

4. **Implement Payment Webhook Idempotency**
   - Implement webhook endpoint shape and provider proof/signature verification interface.
   - Record `payment_events`.
   - Deduplicate replayed webhook events.
   - Publish outbox event after successful state transition.

5. **Implement Cash Confirmation Workflow**
   - Implement cash selection and staff confirmation.
   - Require `payment.cash.confirm`.
   - Record receiver, time, amount, branch, notes, optional evidence, correction/cancel reason, and audit log.

6. **Implement Deposit Lifecycle**
   - Track deposit states and ensure deposit is not released before return inspection.
   - Keep unknown refund/deposit policy details as open questions.

## Verify
- Duplicate booking create with same idempotency key does not create duplicate booking.
- Concurrent booking for same asset/time is prevented.
- Payment webhook replay is idempotent.
- Cash confirmation requires permission and writes audit log.
- Deposit cannot release before inspection.
- Payment provider specifics are isolated behind adapter interfaces.

## Definition of Done
- [ ] Booking creation and idempotency are implemented.
- [ ] Booking state machine tests pass.
- [ ] Payment adapter interface and webhook idempotency are implemented.
- [ ] Cash confirmation workflow is implemented.
- [ ] Deposit lifecycle is implemented or policy blockers are documented.
- [ ] Contract, authorization, tenant, audit, and concurrency tests pass.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
