# Task 08: Store, Branch, and Staff Management

## 🤖 Recommended Model
> Complexity: **High** - combines tenant setup, document metadata, approval workflow, branches, staff permissions, and audit logs.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| S | Claude | Opus 4.6 | - | Best fit for workflow/state design and tenant boundaries. |
| B | Gemini | Pro 3.1 | high | Good for approval and staff-permission edge cases. |
| A | GPT | 5.5 | high | Strong for API implementation and authorization tests. |
| B | Budget | DeepSeek V4 Pro | max | Strong value for bounded CRUD and approval workflows with tenant-isolation review. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
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
Core Marketplace / Store and Branch

## Prerequisites
- Task 04 RBAC/security foundation completed.
- Task 07 identity and role selection completed.

## Instructions

1. **Implement Store Registration**
   - Define store domain model with owner, legal/display names, contact fields, timezone, default currency, approval status, version, and timestamps.
   - Implement store draft creation and submission for approval.
   - Add document upload metadata only; actual upload handling must follow storage rules and validation plan.

2. **Implement Store Approval Workflow**
   - Support statuses `DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `REVISION_REQUIRED`, `APPROVED`, `REJECTED`, `SUSPENDED`, and `CLOSED`.
   - Ensure booking/search availability only allows approved/operational stores.
   - Add admin decision reason and audit log.

3. **Implement Branch CRUD**
   - Define branch fields: address, province, district, country, coordinates, geohash, phone, opening hours, status, timezone, version.
   - Support temporary closure with reopen date or reason where needed.
   - Enforce store/branch tenant checks.

4. **Implement Staff Management**
   - Define store member model, invitations by phone/email/link/QR, role assignment, branch access, permission overrides, and suspension.
   - Permission changes must write audit logs.
   - Ensure least privilege and immediate revocation behavior.

5. **Add UI/Contract/Test Coverage**
   - Update OpenAPI schemas and endpoint examples.
   - Add merchant/admin UI states or page scaffolds if frontend is in scope.
   - Add unit, API, authorization, tenant isolation, and audit tests.

## Verify
- Store owner can create draft and submit store.
- Platform admin can approve, reject, require revision, suspend, and audit decisions.
- Approved store can manage branches.
- Temporarily closed branch does not appear as available for booking.
- Staff permissions are scoped by store/branch and changes are audited.
- Cross-tenant access tests fail safely.

## Definition of Done
- [ ] Store registration and approval workflow are implemented.
- [ ] Branch CRUD and temporary closure behavior are implemented.
- [ ] Staff invitations, role assignment, branch access, overrides, and suspension are implemented.
- [ ] API contract and examples are updated.
- [ ] Authorization, tenant, audit, and workflow tests pass.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
