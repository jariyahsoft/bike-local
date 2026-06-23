# Task 04: Security, RBAC, and Audit Foundation

## 🤖 Recommended Model
> Complexity: **Very High** - authorization, tenant isolation, audit immutability, and default-deny rules are security-critical.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| S | Claude | Opus 4.6 | - | Best fit for security-sensitive policy and authorization design. |
| B | Gemini | Pro 3.1 | high | Strong for threat modeling and edge-case review. |
| A | GPT | 5.5 | high | Strong for RBAC middleware, tests, and API security consistency. |
| B | Budget | GLM-5.2 | max | Highest-intelligence budget option for security-sensitive work; requires independent security review. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `02-coding-rules.md`
- `03-database-design.md`
- `04-api-standard.md`
- `06-backlog.md`
- `07-security-rules.md`
- `09-testing-guide.md`
- `10-glossary.md`
- `11-tasks.md`

## Phase
Foundation / Sprint 0

## Prerequisites
- Task 02 backend skeleton completed.
- Task 03 contract baseline started.

## Instructions

1. **Define Permission Matrix**
   - Create a role/resource/action permission matrix for renter, store owner, manager, staff, accounting, platform admin, moderator, and support.
   - Include tenant, store, branch, and platform scope for each permission.
   - Include the permission names already listed in `10-glossary.md`.

2. **Implement Auth Verification Plan**
   - Define backend middleware/service interfaces for Firebase token verification, App Check verification, domain user resolution, role lookup, permission checks, tenant checks, and branch checks.
   - Keep Firebase SDK usage in infrastructure adapters only.
   - Define how unauthorized, unauthenticated, missing App Check, and permission denied errors map to API error responses.

3. **Draft Firebase Security Rules**
   - Create default-deny Firestore rules draft.
   - Allow only explicitly safe client reads/writes such as public config and user-owned notification reads if required.
   - Create storage upload rules draft covering type, size, extension, MIME validation plan, ownership, and document/evidence confidentiality.

4. **Define Audit and Retention**
   - Add audit log schema and immutable write requirements.
   - Cover permission changes, cash confirmation, booking state changes, return confirmation, damage fee edits, refunds, account suspension, content approval, and admin actions.
   - Capture data classification and retention policy open questions, especially GPS track and PII retention.

5. **Add Security Tests**
   - Add test cases for unauthorized access, cross-tenant access, privilege escalation, invalid token, missing App Check, object-level authorization, idempotency duplicate request, and webhook replay.

## Verify
- Business-critical collections cannot be directly written by clients in rules draft.
- Every protected API has a path to auth, App Check when required, permission, tenant/branch validation, and audit logging.
- Sensitive fields and unnecessary coordinates are excluded from logs.
- Security tests can run or are explicitly listed as pending tooling.

## Definition of Done
- [ ] Permission matrix is documented.
- [ ] Auth/App Check/RBAC/tenant verification plan is implemented or scaffolded.
- [ ] Firestore and Storage rules drafts follow default-deny posture.
- [ ] Audit log schema and retention open questions are documented.
- [ ] Security tests are added or queued with clear commands.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
