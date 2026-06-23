# Admin Portal

Admin portal shell for platform workflows. Admin and moderation actions must be routed through backend APIs with audit logging.

## Surface Goal

Platform control plane for approval, moderation, support, transaction monitoring, reporting, and audit search with strong reason capture on sensitive actions.

## Primary Navigation

- Overview
- Store Approval
- Users
- Transactions
- Content
- Disputes
- Reports
- Audit

## Page Inventory

| Route area | Key pages | Notes |
|---|---|---|
| Overview | KPI dashboard, escalations, approval backlog, incident feed | Dense cards with drill-down links |
| Approval | store queue, store detail, document review, decision modal | Reason required for reject/suspend |
| Users | user search, user detail, role/suspension timeline | Admin-only suspend/reactivate |
| Transactions | payment monitor, refund queue, dispute detail | Filterable by tenant, branch, status |
| Content | route/place/review moderation queue | Shared with moderator role |
| Audit | audit search, audit detail, correlation drill-down | Read-only, immutable |

## Navigation Rules

- `PLATFORM_ADMIN` sees all routes.
- `PLATFORM_MODERATOR` sees overview slices relevant to moderation plus content and audit reads required for moderation traceability.
- `PLATFORM_SUPPORT` sees overview incident slices, booking/payment/search context, disputes, SOS support context, and scoped audit reads.
- Actions requiring `platform.store.suspend`, refund authority, or user suspension must remain disabled until permission is confirmed from backend context.

## UI Density and States

- Optimize for desktop productivity first, with tablet fallback for incident handling.
- Display before/after state, reason fields, and audit consequences inline for risky actions.
- Offline mode may preserve last-loaded queues but must block approval, permission change, suspension, and refund actions.
