# Task 11: Handover, Rental, Ride Tracking, and Return

## 🤖 Recommended Model
> Complexity: **Very High** - state transitions, offline GPS buffering, evidence upload, inspection, and deposit gating create high correctness risk.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| S | Claude | Opus 4.6 | - | Best fit for lifecycle/state design and privacy-sensitive GPS behavior. |
| A | Gemini | Pro 3.1 | high | Strong for offline and mobile edge-case analysis. |
| B | GPT | 5.5 | high | Strong for API, local-buffer contracts, and tests. |
| B | Budget | GLM-5.2 | max | Highest-intelligence budget option for lifecycle, offline buffering, and privacy-sensitive behavior; requires review. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `01-architecture.md`
- `02-coding-rules.md`
- `03-database-design.md`
- `04-api-standard.md`
- `05-decisions.md`
- `06-backlog.md`
- `07-security-rules.md`
- `08-ui-guide.md`
- `09-testing-guide.md`
- `10-glossary.md`
- `11-tasks.md`

## Phase
Ride and Safety / Return

## Prerequisites
- Task 10 booking, payment, cash, and deposit completed.
- Local database decision for ride tracking may remain open; implement an interface if engine is not selected.

## Instructions

1. **Implement QR Booking Token Validation**
   - Validate QR booking token during handover.
   - Token must be one-time or time-limited and must not expose raw long-lived secrets.
   - Verify booking, user, store/branch, staff permission, and booking state.

2. **Implement Handover Checklist**
   - Capture pre-handover photos, bike condition, equipment, existing damage, staff, branch, and timestamp.
   - Transition booking to `IN_PROGRESS`, asset to `RENTED`, and create rental session atomically.
   - Write audit log and outbox event.

3. **Implement Ride Session and Local Buffer Contract**
   - Define ride session start/resume/end behavior.
   - Track ride only when rental is `IN_PROGRESS`.
   - Define local encrypted buffer interface for GPS points.
   - Record GPS gaps without fabricating points.
   - Support app interruption/resume behavior.

4. **Implement Ride Track Chunk Upload**
   - Implement chunk upload endpoint with sequence, checksum, timestamps, accuracy, and idempotency/deduplication.
   - Do not upload every GPS point as a separate transaction.
   - Respect consent and location privacy rules.

5. **Implement Return Request Evidence**
   - Support return at store, defined point, or staff pickup; keep Smart Dock as Phase 2 placeholder only.
   - Capture bike photo, parking photo, GPS, time, notes, and return type.
   - Notify store/staff after return request.

6. **Implement Inspection and Rental Close**
   - Authorized staff accepts return and performs inspection.
   - Capture condition, photos, equipment, damage, charges, inspector, and decision.
   - Close rental and update booking/asset/deposit states only after inspection.

## Verify
- Invalid/expired/used QR token is rejected.
- Handover starts rental and sets booking/asset state atomically.
- Ending ride does not close rental.
- GPS buffers offline and uploads chunks.
- Return request notifies store/staff.
- Asset becomes available only after inspection passes.
- Deposit is not released before inspection.

## Definition of Done
- [ ] QR validation and handover checklist are implemented.
- [ ] Rental session creation and state transitions are atomic.
- [ ] Ride local buffer contract and chunk upload are implemented.
- [ ] Return request evidence flow is implemented.
- [ ] Inspection and rental close flow is implemented.
- [ ] Tests cover state transitions, offline GPS, privacy, permissions, and audit.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
