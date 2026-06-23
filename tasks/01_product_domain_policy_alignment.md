# Task 01: Product Domain and Policy Alignment

## 🤖 Recommended Model
> Complexity: **Medium** - planning task that affects downstream flows, terminology, policy boundaries, and acceptance criteria.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| S | Claude | Sonnet 4.6 | - | Best fit for structured product/technical synthesis without over-expanding scope. |
| A | Gemini | Flash 3.5 | high | Strong for user flows, policy gaps, and glossary consistency. |
| B | GPT | 5.4 | medium | Balanced for converting SRS-derived planning notes into actionable docs. |
| B | Budget | DeepSeek V4 Flash | max | Best low-cost fit for documentation-heavy glossary, policy-matrix, and acceptance-criteria work. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `00-project-overview.md`
- `06-backlog.md`
- `08-ui-guide.md`
- `10-glossary.md`
- `11-tasks.md`
- `docs/Bike-Local-SRS.md`

## Phase
Foundation / Sprint 0

## Prerequisites
- None.

## Instructions

1. **Resolve Product Open Questions**
   - Review open questions in `00-project-overview.md` and `11-tasks.md`.
   - Create a short decision log section or update `05-decisions.md` with proposed next actions for payment gateway, map provider, first launch area, PDPA/GDPR level, commission plan, settlement cycle, and brand direction.
   - Do not mark a decision as accepted unless the source or product owner confirms it.

2. **Define MVP User Flow Diagrams**
   - Add Mermaid diagrams for renter, store/merchant, staff, and platform admin MVP flows.
   - Cover signup, role selection, store approval, search, booking, payment/cash, handover, ride, return, inspection, SOS, review, reporting, and audit.
   - Keep wording aligned with `10-glossary.md`.

3. **Draft Policy Boundaries**
   - Define initial policy boundaries for route/place/review moderation.
   - Define cancellation, refund, deposit, return, and damage-charge policy assumptions.
   - Capture any unresolved legal/compliance questions as open questions, not implementation requirements.

4. **Trace Requirements**
   - Reference SRS sections or backlog user stories where possible.
   - Add assumptions only when the source is silent and the assumption is needed for later implementation.

## Verify
- Product flows include renter, store owner/manager/staff, accounting, platform admin, moderator, and support where relevant.
- Policy notes do not invent gateway, map provider, commission, or retention details.
- Terms match `10-glossary.md`.
- Open questions remain visible for product review.

## Definition of Done
- [ ] Open questions are reviewed and organized by owner/impact.
- [ ] MVP user flow diagrams are documented.
- [ ] Moderation, cancellation, refund, deposit, and return policy boundaries are drafted.
- [ ] Assumptions are clearly separated from accepted decisions.
- [ ] Requirement references are traceable to SRS/backlog/ADR where available.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
