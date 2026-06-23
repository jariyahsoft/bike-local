# Merchant Portal

Flutter Web or future web stack shell for merchant operations. Use generated API clients for business workflows.

## Surface Goal

Dense operations workspace for store owners, managers, staff, and accounting users handling repeated booking, handover, return, cash, and reporting tasks.

## Primary Navigation

- Dashboard
- Bookings
- Operations
- Inventory
- Staff
- Payments
- Reports
- Settings

## Page Inventory

| Route area | Key pages | Notes |
|---|---|---|
| Store setup | store profile, branch list, branch editor, hours, documents | Store owner workflow, approval-aware |
| Operations | booking calendar, booking detail, handover queue, return queue, SOS alerts | High-density list + detail layout |
| Inventory | assets, equipment, pricing, rental points, availability blocks | Branch filters and bulk actions |
| People | staff list, invite flow, permission editor, audit-visible suspension states | `staff.manage` gated |
| Money | payment monitor, cash confirmations, refund queue, settlement previews | Accounting and owner scopes differ |
| Reports | rental, revenue, staff, asset reports | Export actions stay secondary to filters |

## Navigation Rules

- `STORE_OWNER` sees all merchant sections for assigned stores.
- `STORE_MANAGER` sees operations, inventory, staff, and selected store settings for assigned store scope.
- `STORE_STAFF` sees bookings, handover, return, cash, and SOS views only for assigned branches.
- `STORE_ACCOUNTING` sees payment, refund, settlement, and financial reports but not asset/staff editing by default.
- Hidden routes must still be server-authorized; UI hiding is convenience only.

## UI Density and States

- Prefer split-view or table-plus-drawer layouts on desktop/tablet.
- Use batch-friendly filters, sticky status chips, and repeatable task cards over marketing-style composition.
- Offline mode may show cached dashboards, but online-required actions stay blocked: confirm booking, confirm cash, handover, confirm return, change permission, refund.
