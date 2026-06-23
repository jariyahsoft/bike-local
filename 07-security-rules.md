# 07 Security Rules

Source: `docs/Bike-Local-SRS.md` sections 4.2, 6, 7.29, 10, 11, 12.4, 12.5, 14.6

## Threat Model Summary

| Threat | Control |
|---|---|
| Unauthorized API access | Firebase token verification, App Check, backend auth middleware |
| Cross-tenant access | Tenant/store/branch checks on every protected resource |
| Privilege escalation | Server-side RBAC and audit log for permission changes |
| Booking double-spend/double-booking | Transaction, version and availability check |
| Payment spoofing | Webhook/server-to-server verification only |
| Webhook replay | Idempotency and event deduplication |
| File upload abuse | Type, size, extension and MIME validation |
| Sensitive log leakage | Structured logging allowlist and redaction |
| Location privacy abuse | Consent, purpose limitation and retention policy |

## Auth Model

- Firebase Authentication handles login, OTP, Google Sign-In and future Apple Sign-In
- Domain User ID is separate from Firebase UID
- `auth_identities` maps provider identities to users
- Backend verifies Firebase token and resolves user context
- Custom Claims may help platform-level roles, but store/branch permissions must be checked from backend data

## Role Matrix

| Role | Scope | Primary capabilities |
|---|---|---|
| RENTER | user | book, pay, ride, return, review, SOS |
| STORE_OWNER | store | manage store, branches, staff, assets, reports |
| STORE_MANAGER | store/branch | daily operations, bookings, staff tasks |
| STORE_STAFF | branch | handover, return, cash confirmation if permitted, SOS response |
| STORE_ACCOUNTING | store | financial reports, settlement review |
| PLATFORM_ADMIN | platform | approve stores/content, manage users, transactions, audit |
| PLATFORM_MODERATOR | platform | content moderation |
| PLATFORM_SUPPORT | platform | complaints and disputes |

## Resource Access Matrix

| Resource | Renter | Store staff/manager/owner | Platform admin/support |
|---|---|---|---|
| Own profile | read/write | read own | read as needed |
| Store profile | read public | write by permission | approve/suspend |
| Booking | own bookings | store/branch bookings by permission | read/manage by support role |
| Payment | own summary | store payments by permission | full transaction monitoring |
| Cash confirmation | none | `payment.cash.confirm` | audit/review |
| Ride location | own | only active rental/return/SOS necessity | support/admin with purpose |
| SOS case | own | assigned/branch/store by permission | monitor/escalate |
| Audit log | none | limited own store read if allowed | platform audit search |

## Data Classification

| Class | Examples | Handling |
|---|---|---|
| Public | approved store, public route/place | read-only public API/cache allowed |
| Internal | operational reports, staff tasks | role scoped |
| Confidential | phone, email, documents, payment refs | encrypted storage/limited access |
| Sensitive location | ride tracks, SOS location, return location | consent, limited purpose, retention |
| Financial | payments, deposits, settlements | audit, immutable events |

## Privacy Considerations

- Background location requires explicit consent
- Store sees renter location only for active rental, return request, or SOS
- GPS track retention must be defined
- Users can request account deletion while legally/transactionally required data is retained with restricted access
- Statistical reports should separate personal data where possible

## Compliance Requirements

SRS does not name a regulation. Because product handles Thai users and personal/location data, PDPA applicability should be reviewed as an open decision.

## Firebase Policy Pseudocode

Business-critical data should not be directly writable by clients. Firestore rules should default deny except explicitly allowed read-only/public/config or user-owned notification cases.

```text
match /databases/{database}/documents {
  match /system_configs/{id} {
    allow read: if isPublicConfig(id);
    allow write: if false;
  }

  match /notifications/{id} {
    allow read: if request.auth != null && resource.data.user_id == domainUserId(request.auth.uid);
    allow write: if false;
  }

  match /bookings/{id} {
    allow read, write: if false;
  }

  match /payments/{id} {
    allow read, write: if false;
  }
}
```

## Secret Management

- ห้ามเก็บ secret ใน source code
- ใช้ Secret Manager หรือระบบจัดการ secret ที่เหมาะสม
- แยก secret ต่อ environment
- Service account keys ห้าม commit
- Rotate provider/API keys ตาม policy

## Audit Log Requirements

บันทึก:

- Permission changes
- Cash confirmation
- Booking state changes
- Return confirmation
- Damage fee edits
- Refunds
- Account suspension
- Content approval
- Admin action

Fields:

`actor`, `action`, `resource`, `resource_id`, `before`, `after`, `timestamp`, `ip`, `device_information`, `correlation_id`, `reason`

Audit Log ต้อง immutable สำหรับผู้ใช้ทั่วไปและร้านค้า

## Abuse and Rate Limit Controls

- Auth/OTP rate limits
- Search/API throttling by IP/user/device
- Booking/payment idempotency and duplicate detection
- File upload limits
- SOS abuse monitoring without blocking legitimate emergency use
- Admin action reason and audit

## Security Test Checklist

- [ ] Unauthorized access
- [ ] Cross-tenant access
- [ ] Privilege escalation
- [ ] Invalid token
- [ ] Missing App Check
- [ ] File upload abuse
- [ ] Rate limit behavior
- [ ] Injection attempts
- [ ] Broken object-level authorization
- [ ] Payment webhook replay
- [ ] Idempotency duplicate request
