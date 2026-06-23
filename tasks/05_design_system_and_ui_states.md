# Task 05: Design System and UI States

## 🤖 Recommended Model
> Complexity: **Medium** - UI foundation spans three app surfaces, localization, accessibility, and state behavior.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| B | Claude | Sonnet 4.6 | - | Good for UI system structure and concise product copy boundaries. |
| A | Gemini | Flash 3.5 | high | Strong for generating state inventories and responsive patterns. |
| S | GPT | 5.4 | medium | Best fit for Flutter component scaffolding and accessibility checks. |
| B | Budget | DeepSeek V4 Flash | max | Best low-cost fit for Flutter UI scaffolding, design tokens, and repetitive state coverage. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `00-project-overview.md`
- `02-coding-rules.md`
- `06-backlog.md`
- `08-ui-guide.md`
- `09-testing-guide.md`
- `10-glossary.md`
- `11-tasks.md`

## Phase
Foundation / Sprint 0

## Prerequisites
- Task 01 brand/design direction open question captured.
- Task 02 frontend package skeleton completed.

## Instructions

1. **Create Design Tokens**
   - Create initial design tokens for color, typography, spacing, radius, elevation, motion, and status colors.
   - Use a safety/status-first palette with distinct success, warning, danger, info, neutral, and focus states.
   - Do not claim final brand colors unless brand guidelines are supplied.

2. **Create Page Inventory**
   - Document or scaffold page inventories for renter app, merchant portal, and admin portal.
   - Include navigation rules by role and permission.
   - Include mobile-first renter flows and dense operational merchant/admin views.

3. **Create UI State Patterns**
   - Define loading, empty, error, success, permission denied, offline, sync failed, GPS unavailable, and validation states.
   - Map backend `error.code` values to localized UI behavior without parsing human messages.
   - Mark online-required operations: confirm booking, pay, confirm cash, handover, confirm return, change permission, approve store, refund.

4. **Define SOS Component Behavior**
   - Create requirements for a visually distinct, accessible SOS action during active ride.
   - Include issue type, latest location, disclaimer, escalation visibility, and abuse handling constraints.

5. **Define i18n Workflow**
   - Set up Thai/English localization structure or document it if tooling is not present.
   - Avoid hard-coded UI text in source code.

## Verify
- UI states cover loading/empty/error/success/permission/offline/sync/GPS cases.
- SOS is reachable during active ride and accessible with screen readers.
- Merchant/admin screens prioritize dense, repeatable operations rather than marketing layout.
- Text is localizable and supports Thai/English.
- Accessibility requirements from `08-ui-guide.md` and `09-testing-guide.md` are represented.

## Definition of Done
- [ ] Initial design tokens exist or are documented.
- [ ] Renter, merchant, and admin page inventories exist.
- [ ] UI state patterns are documented or scaffolded.
- [ ] SOS behavior requirements are documented.
- [ ] Thai/English localization workflow is ready.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
