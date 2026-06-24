# Firebase Emulator Foundation

This folder contains the Sprint 0 Firebase emulator and rules-test scaffold.

## Config

- `firebase.json` defines Auth, Firestore, Storage, Functions, and Emulator UI ports
- `firestore.rules` and `storage.rules` hold the current default-deny rules drafts
- `firestore.indexes.json` contains the deploy-ready composite index draft
- `.firebaserc` maps `dev`, `staging`, and `prod` to the Firebase project IDs

## Commands

From the repository root:

```text
npm run test:security-rules
npm run test:emulator
npm run deploy:rules:staging
npm run deploy:staging
npm run smoke:staging
```

`test:security-rules` runs Firestore and Storage rules tests inside `firebase emulators:exec`.

`test:emulator` seeds the emulators with representative users, stores, branches, assets, bookings, payments, ride/return/SOS data, and audit records, then runs a smoke test that verifies the seed set loaded.

## Fixture Strategy

Fixtures live in `seed/emulator-fixtures.ts`.

Coverage includes:

- Auth identities for renter, store owner, manager, staff, accounting, and platform admin
- Public config and user-owned notifications for rules exceptions
- Approved and unapproved stores
- Multiple branches and assets in mixed operational states
- Pricing rules, bookings, payments, deposits, ride sessions, return requests, SOS cases, and audit logs

Storage seeding is intentionally lightweight. It only creates placeholder public and confidential objects required for emulator smoke coverage; business-critical uploads remain backend-controlled in feature work.

## Release Notes

Deployment setup, environment separation, Secret Manager usage, backup/restore, rollback, and production approval gates are maintained in `12-release-readiness.md`. Do not commit service account keys or local `.env` files.
