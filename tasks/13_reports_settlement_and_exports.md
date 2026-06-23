# Task 13: Reports, Settlement, and Exports

## 🤖 Recommended Model
> Complexity: **High** - financial reports and settlement require permission checks, auditability, export correctness, and open commission decisions.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| S | Claude | Opus 4.6 | - | Best fit for financial workflow and policy-sensitive reporting. |
| B | Gemini | Pro 3.1 | high | Good for report filters, aggregation, and settlement edge cases. |
| A | GPT | 5.5 | medium | Strong for API implementation, exports, and test coverage. |
| B | Budget | GLM-5.2 | max | Highest-intelligence budget option for financial and settlement correctness; constrain rules and review outputs. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `00-project-overview.md`
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
Content and Reports

## Prerequisites
- Task 10 booking/payment/deposit completed.
- Task 11 return/inspection completed.
- Commission plan and settlement cycle may remain open; implement calculator interfaces and document blockers if not accepted.

## Instructions

1. **Implement Merchant Reports**
   - Add store rental report with bookings, completed, cancelled, no-show, overdue, and average duration.
   - Add store revenue report with gross, net, cash, online, deposit, refund, penalty, and platform fee where policy permits.
   - Add asset report and staff report.
   - Support date range and branch filters.

2. **Implement Platform Reports**
   - Add platform overview report for admin/support needs.
   - Include marketplace-level counts and operational indicators without exposing unnecessary personal data.
   - Enforce platform role permissions.

3. **Implement Settlement Calculation**
   - Define settlement model and states.
   - Implement calculator interface using commission/payment fee policy inputs.
   - Keep cash included in reports but do not treat it as transfer payable unless product policy says so.
   - Add audit logs for settlement approval/payment state changes.

4. **Implement CSV/Excel Export**
   - Add export endpoints or jobs for CSV and Excel.
   - Apply permission checks and report filters.
   - Avoid exporting sensitive personal/location data unless explicitly required and authorized.

5. **Add Tests**
   - Test report filters, tenant isolation, financial permission, export format, empty states, and settlement calculator scenarios.
   - Add regression tests for integer minor unit money calculations.

## Verify
- Store owner/accounting can view only their store reports.
- Branch filter scopes results correctly.
- Platform admin/support access is permission-scoped.
- Reports separate personal data from aggregated statistics where possible.
- Export files match filters and do not leak unauthorized fields.
- Settlement blockers are documented if commission plan/cycle is not accepted.

## Definition of Done
- [ ] Store rental/revenue/asset/staff reports are implemented.
- [ ] Platform overview report is implemented.
- [ ] Settlement calculator interface and workflow are implemented or documented as blocked by policy.
- [ ] CSV/Excel export works with permissions and filters.
- [ ] Tests cover report correctness, money calculations, tenant isolation, and exports.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
