# Task 12: SOS, Notifications, and Content Moderation

## 🤖 Recommended Model
> Complexity: **High** - SOS is safety-sensitive, notifications need reliable delivery logs, and moderation affects public marketplace content.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| S | Claude | Opus 4.6 | - | Best fit for safety-sensitive SOS and moderation policy. |
| A | Gemini | Pro 3.1 | high | Strong for escalation, notification, and content-state edge cases. |
| B | GPT | 5.5 | medium | Good for API implementation and event-driven tests. |
| B | Budget | GLM-5.2 | max | Highest-intelligence budget option for safety-sensitive SOS and moderation; requires safety/privacy review. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `00-project-overview.md`
- `02-coding-rules.md`
- `03-database-design.md`
- `04-api-standard.md`
- `06-backlog.md`
- `07-security-rules.md`
- `08-ui-guide.md`
- `09-testing-guide.md`
- `10-glossary.md`
- `11-tasks.md`

## Phase
Ride and Safety / Content

## Prerequisites
- Task 11 ride tracking and rental lifecycle completed for active ride context.
- Task 04 audit/security foundation completed.

## Instructions

1. **Implement SOS Case Model and State Machine**
   - Define SOS case fields: user, booking, rental, asset, phone, latest location, accuracy, issue type, status, timeline, assigned staff, and audit metadata.
   - Support statuses `OPEN`, `ACKNOWLEDGED`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, and `CLOSED`.
   - Make Bike Local disclaimer clear: not an emergency rescue service.

2. **Implement SOS Escalation Rules**
   - Notify branch staff first, then manager and owner if no response within configured thresholds.
   - Capture acknowledgement, assignment, resolution, closure, and timeline audit.
   - Avoid blocking legitimate SOS due to abuse controls.

3. **Implement Notification Event Catalog**
   - Define event types from `04-api-standard.md`.
   - Implement FCM token registration, notification preferences if in scope, notification inbox, and delivery log.
   - Use outbox/retry where notification delivery must be reliable.

4. **Implement Content Submission and Moderation**
   - Support route/place submission by store/member/admin.
   - Require approval before non-admin content is published.
   - Support reports for unsafe, wrong, or outdated content.
   - Allow reviews only after completed booking.
   - Allow admins/moderators to hide policy-violating reviews with reason and audit log.

5. **Add Tests**
   - Test SOS creation during active ride, missing active ride, missing location, acknowledgement, assignment, escalation, and closure.
   - Test notification delivery log and retry behavior.
   - Test content approval, rejection, report, review eligibility, and audit.

## Verify
- SOS button is available during ride and sends latest location with accuracy.
- Store staff can acknowledge/accept cases by permission.
- Escalation notifies correct roles without leaking location beyond purpose.
- FCM token registration works without exposing tokens in logs.
- Non-admin content is unpublished until approval.
- Review creation requires completed booking.

## Definition of Done
- [ ] SOS case model/state machine is implemented.
- [ ] SOS escalation and audit timeline are implemented.
- [ ] Notification catalog, FCM token registration, and delivery log are implemented.
- [ ] Route/place/review moderation workflow is implemented.
- [ ] Tests cover SOS, notification, moderation, privacy, and permissions.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
