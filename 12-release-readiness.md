# 12 Release Readiness

Source: Task 14 deployment readiness and release hardening.

## Firebase Environments

Project aliases live in `.firebaserc`:

| Alias   | Firebase project     | Purpose                                     |
| ------- | -------------------- | ------------------------------------------- |
| dev     | `bike-local-dev`     | Developer integration and emulator parity   |
| staging | `bike-local-staging` | Release candidate deploys and smoke testing |
| prod    | `bike-local-prod`    | Production traffic after manual approval    |

Each project must enable Firebase Authentication, Cloud Firestore, Cloud Storage, Cloud Functions, FCM, App Check, Remote Config, Analytics, Crashlytics, Secret Manager, Cloud Logging, Error Reporting, and Cloud Monitoring. ADR-008 remains proposed, so staging uses Firebase Cloud Functions as the deployment fallback until Cloud Run is explicitly accepted for a workload.

## Secrets and Config

Use Secret Manager or Firebase Functions secrets. Never commit `.env` files, service account keys, refresh tokens, or provider API keys. `.env.example` lists expected names only.

Recommended setup:

```text
firebase functions:secrets:set PAYMENT_WEBHOOK_SECRET --project bike-local-staging
firebase functions:secrets:set QR_TOKEN_SIGNING_SECRET --project bike-local-staging
firebase functions:secrets:set FCM_CREDENTIALS --project bike-local-staging
firebase functions:secrets:set SENTRY_DSN --project bike-local-staging
```

Repeat with environment-specific values for dev, staging, and prod. Production secrets require two-person review and must not be copied from staging unless the provider explicitly issues shared sandbox credentials.

Run before release:

```text
npm run check:secrets
```

## Rules and Indexes

Deploy rules and indexes from the `firebase/` directory config:

```text
npm run deploy:rules:staging
npm run deploy:rules:prod
```

Rollback rules by checking out the previous known-good `firebase/firestore.rules`, `firebase/storage.rules`, and `firebase/firestore.indexes.json` from git, then redeploying the same target. Index removals can take time to propagate; avoid destructive index changes during peak booking windows.

Rules verification:

```text
npm run test:security-rules
npm run test:emulator
```

## Staging Deploy and Smoke

Staging deploy:

```text
npm run deploy:staging
STAGING_API_BASE_URL=https://staging-api.example.com npm run smoke:staging
```

The smoke checklist covers signup, store approval, booking, online payment or cash confirmation, handover, ride chunk upload, return and inspection, SOS, report load, and audit search. Without `STAGING_API_BASE_URL`, the smoke command validates the release checklist only and exits successfully for local dry runs.

## Backup and Restore

Firestore backup cadence is daily for each environment, with RPO <= 24 hours and RTO <= 8 hours. Use environment-specific buckets and lifecycle policies:

```text
gcloud firestore export gs://bike-local-staging-backups/firestore/$(date -u +%Y%m%dT%H%M%SZ) --project bike-local-staging
gcloud firestore import gs://bike-local-staging-backups/firestore/EXPORT_ID --project bike-local-staging
```

Cloud Storage buckets must enable object versioning for production evidence, merchant documents, and generated exports. Run a staging restore drill at least monthly by exporting staging, importing into an isolated restore project or namespace, and validating representative booking, payment, ride, return, SOS, report, and audit records.

## Rollback

- Backend: redeploy the previous git tag or Cloud Functions release artifact.
- Rules/indexes: redeploy previous git versions with `deploy:rules:*`.
- Frontend/hosting: roll back to the previous hosting release or redeploy the previous artifact.
- Data: restore only after incident commander approval; prefer compensating commands for isolated business-state mistakes.
- Providers: disable failing payment, notification, or analytics integrations with environment config or Remote Config when available.

## Production Gate

Production deploy requires a manual GitHub Environment approval through `.github/workflows/release-readiness.yml`. The gate requires:

- CI green for lint, typecheck, build, unit, contract, emulator, and security-rules tests.
- `npm run check:secrets` passes.
- Staging deploy completed and `npm run smoke:staging` passed against staging.
- Firestore export exists within the last 24 hours.
- Monitoring dashboards and alerts checked for API 5xx, latency, payment webhook failures, cash confirmation audit failures, notification delivery failures, SOS escalation failures, settlement state errors, and Crashlytics regressions.
- Known open risks recorded in the release notes.

Known current risks: real Firebase project credentials are not stored in the repo, ADR-008 is still proposed, payment gateway selection remains open, and commission/settlement cadence remains a policy input.
