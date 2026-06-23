# Firebase Emulator Foundation

This folder contains the Sprint 0 Firebase emulator and rules-test scaffold.

## Config

- `firebase.json` defines Auth, Firestore, Storage, Functions, and Emulator UI ports
- `firestore.rules` and `storage.rules` hold the current default-deny rules drafts

## Commands

From the repository root:

```text
npm run test:security-rules
npm run test:emulator
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
