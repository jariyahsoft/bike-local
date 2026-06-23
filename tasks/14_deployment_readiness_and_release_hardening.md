# Task 14: Deployment Readiness and Release Hardening

## 🤖 Recommended Model
> Complexity: **Very High** - deployment, secrets, rules, indexes, backup/restore, smoke tests, and rollback affect production safety.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| A | Claude | Opus 4.6 | - | Strong for release safety, rollback planning, and checklist discipline. |
| B | Gemini | Pro 3.1 | high | Good for infrastructure readiness and operational edge cases. |
| S | GPT | 5.5 | high | Best fit for CI/CD, deployment config, and smoke-test implementation. |
| B | Budget | GLM-5.2 | max | Highest-intelligence budget option for release and rollback risk; not sufficient as the sole production reviewer. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `01-architecture.md`
- `02-coding-rules.md`
- `03-database-design.md`
- `04-api-standard.md`
- `05-decisions.md`
- `07-security-rules.md`
- `09-testing-guide.md`
- `11-tasks.md`

## Phase
Hardening / Deployment

## Prerequisites
- Task 06 CI and emulator foundation completed.
- Core MVP flows implemented through Tasks 07-13.
- Cloud Functions vs Cloud Run workload decision accepted or documented with a deployment fallback.

## Instructions

1. **Prepare Firebase Environments**
   - Document or create setup for `bike-local-dev`, `bike-local-staging`, and `bike-local-prod`.
   - Include Authentication, Firestore, Storage, Functions or Cloud Run, FCM, App Check, Remote Config, Secrets, Analytics/Crashlytics where applicable.

2. **Configure Secrets and Environment Separation**
   - Use Secret Manager or equivalent.
   - Never commit secrets or service account keys.
   - Ensure dev/staging/prod config is separated.

3. **Deploy Rules and Indexes**
   - Prepare Firestore rules, Storage rules, and Firestore indexes.
   - Validate default-deny behavior and expected public/user-owned exceptions.
   - Add deployment commands and rollback notes.

4. **Deploy Backend and Frontend to Staging**
   - Deploy Functions or Cloud Run based on accepted ADR or documented fallback.
   - Deploy hosting/frontend artifacts if present.
   - Run contract tests and smoke tests against staging.

5. **Create Backup, Restore, and Rollback Plan**
   - Define backup cadence, RPO <= 24h for general data, RTO <= 8h.
   - Test restore process for staging data.
   - Document rollback plan for API, rules, indexes, and frontend releases.

6. **Finalize Production Gate**
   - Require manual approval before production.
   - Include smoke tests, security checks, audit log checks, monitoring dashboards, alerting, and known open risks.

## Verify
- Staging deployment succeeds.
- Smoke tests cover signup, store approval, booking, payment/cash, handover, ride chunk upload, return/inspection, SOS, report load, and audit search.
- Firestore/Storage rules tests pass.
- Secrets are not present in repo or logs.
- Backup/restore plan is tested on staging.
- Rollback plan is documented and actionable.

## Definition of Done
- [ ] Dev/staging/prod environment setup is documented or created.
- [ ] Secrets and configs are separated by environment.
- [ ] Rules and indexes are deployed or ready.
- [ ] Staging deployment and smoke tests pass.
- [ ] Backup/restore and rollback plans are documented and tested where possible.
- [ ] Production release gate is documented with manual approval.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
