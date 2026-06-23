# Task 07: Identity, Onboarding, Consent, and Account Deletion

## 🤖 Recommended Model
> Complexity: **High** - identity touches auth mapping, roles, consent, privacy, account deletion, and permission-sensitive onboarding.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| S | Claude | Opus 4.6 | - | Best fit for privacy-sensitive identity and RBAC workflows. |
| B | Gemini | Pro 3.1 | high | Good for consent/account deletion edge cases. |
| A | GPT | 5.5 | high | Strong for backend API, contract, and tests across auth boundaries. |
| B | Budget | GLM-5.2 | max | Highest-intelligence budget option for identity, consent, and authorization; requires privacy/security review. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `00-project-overview.md`
- `02-coding-rules.md`
- `03-database-design.md`
- `04-api-standard.md`
- `06-backlog.md`
- `07-security-rules.md`
- `09-testing-guide.md`
- `10-glossary.md`
- `11-tasks.md`

## Phase
Core Marketplace / Identity and RBAC

## Prerequisites
- Task 03 OpenAPI baseline completed for users/auth identities/errors.
- Task 04 RBAC/auth verification foundation completed.
- Task 06 test commands available.

## Instructions

1. **Implement Domain Models**
   - Define `User`, `AuthIdentity`, `Role`, `Permission`, and `ConsentRecord` domain models.
   - Keep Firebase UID separate from Domain User ID.
   - Include locale, status, version, timestamps, and consent versions.

2. **Implement Onboarding API**
   - Add or update OpenAPI paths for `POST /api/v1/users`, `GET /api/v1/me`, and `PATCH /api/v1/me`.
   - Implement user creation, auth identity mapping, role selection for renter/store owner, and profile update.
   - Support one account holding multiple roles.

3. **Implement Consent Records**
   - Capture terms, privacy, GPS/location, and marketing consent versions.
   - Ensure GPS/background location consent is explicit and purpose-limited.
   - Avoid exposing unnecessary personal data in responses/logs.

4. **Implement Account Deletion Request Flow**
   - Add account deletion request state and API behavior.
   - Preserve legally/transactionally required data with restricted access.
   - Add audit logs for sensitive account status changes.

5. **Add Tests**
   - Unit test domain validation and role assignment.
   - API test onboarding happy path and validation failures.
   - Security test unauthorized access, invalid token, duplicate auth identity, and permission boundaries.

## Verify
- User can sign up and select renter or store owner role.
- One account can hold multiple roles.
- Thai/English locale is stored.
- Consent records store required versions.
- Account deletion request does not erase required transactional records.
- Auth identity mapping never leaks full tokens.

## Definition of Done
- [ ] Identity domain models are implemented.
- [ ] Onboarding APIs and contract entries exist.
- [ ] Consent record flow is implemented.
- [ ] Account deletion request flow is implemented or explicitly documented if blocked by policy.
- [ ] Unit/API/security tests pass or blockers are documented.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
