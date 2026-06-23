# Mobile App

Flutter app shell for renter and shared role workflows. Business-critical data must go through generated API clients, not direct Firestore reads or writes.

## Surface Goal

Mobile-first renter experience with clear transactional steps, persistent ride context, and a safety-first active rental screen.

## Primary Navigation

- Home/Search
- Map
- Bookings/History
- Active Rental
- Profile

## Page Inventory

| Route area | Key pages | Notes |
|---|---|---|
| Onboarding | sign-in, role selection, consent, locale selection | Thai/English available from first launch |
| Discovery | home/search, filters, map, store detail, asset detail | Mobile-first cards, sticky filters, map/list toggle |
| Booking | checkout, payment method, payment status, QR booking | Show policy snapshot, deposit, idempotent retry state |
| Ride | pre-handover wait, active ride, ride ended, return request | Ride ended must not imply rental closed |
| Safety | SOS launcher, issue picker, case timeline | SOS reachable during active ride within one tap |
| Account | profile, settings, reviews, support | Include permission/device guidance for GPS and notifications |

## Navigation Rules

- `RENTER` sees the full renter navigation set.
- Merchant or admin roles on the same account may switch context, but renter tabs remain isolated from operational tabs.
- The Active Rental destination becomes persistent when booking status is `IN_PROGRESS`, `RETURN_PENDING`, or `INSPECTION_PENDING`.
- SOS entry remains visible on the active ride screen and on any full-screen map shown during an active rental.

## UI Density and States

- Prioritize thumb-reachable primary actions and readable outdoor contrast.
- Use skeleton loading for search results, asset detail, booking summary, and ride summary.
- Disable online-required actions while offline: booking confirmation, payment, handover acknowledgment, return confirmation.
- Show dedicated GPS unavailable messaging when permission, device service, or accuracy is insufficient.
