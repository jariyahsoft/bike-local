# Task 09: Inventory, Pricing, Search, and Availability

## 🤖 Recommended Model
> Complexity: **High** - inventory availability and pricing affect booking correctness, concurrency, and marketplace search.

| Tier | Group | Model | Thinking | เหตุผล |
|---|---|---|---|---|
| S | Claude | Opus 4.6 | - | Best fit for domain rules and concurrency reasoning. |
| B | Gemini | Pro 3.1 | high | Good for availability/search edge cases and index planning. |
| A | GPT | 5.5 | high | Strong for service/API/test implementation. |
| B | Budget | GLM-5.2 | max | Highest-intelligence budget option for pricing and concurrency rules; requires transaction review. |

> Budget comparison source: [Artificial Analysis model comparison](https://artificialanalysis.ai/models), checked 2026-06-23.

## Context Files
Read these before starting:
- `01-architecture.md`
- `02-coding-rules.md`
- `03-database-design.md`
- `04-api-standard.md`
- `06-backlog.md`
- `07-security-rules.md`
- `08-ui-guide.md`
- `09-testing-guide.md`
- `10-glossary.md`
- `11-tasks.md`

## Phase
Core Marketplace / Inventory and Pricing

## Prerequisites
- Task 08 store and branch management completed.
- Task 03 OpenAPI schemas available for asset/equipment/pricing/search.

## Instructions

1. **Implement Asset and Category Models**
   - Define asset category and asset models with store/branch IDs, unique store asset code, QR token reference, brand/model/color/size, images, status, base price, deposit amount, currency, current rental point, version, and timestamps.
   - Do not store raw long-lived QR tokens.
   - Record asset status transition history if required by source model.

2. **Implement Equipment and Inventory Units**
   - Define equipment items and inventory units.
   - Support separate rental, bundled rental, package-included, and deposit-required equipment.
   - Enforce tenant/store/branch permissions.

3. **Implement Rental Points**
   - Create rental point model/API for pickup/return locations.
   - Validate branch operating hours and status.

4. **Implement Pricing Quote Service**
   - Implement pricing rules and `POST /api/v1/pricing/quote`.
   - Return immutable price snapshot fields needed for booking.
   - Use integer minor units only.
   - Include deposit, fees, discounts if present in source; keep unknown policy values as open questions.

5. **Implement Availability and Search**
   - Implement availability check with transaction/version strategy.
   - Prevent overlapping confirmed bookings for the same asset/time range.
   - Implement search endpoints for stores/assets with filters from backlog: location, text, type, price, distance, rating, date/time, availability, cash, different return point, e-bike, equipment.
   - Draft Firestore indexes for search/availability queries.

## Verify
- Asset code is unique within store.
- Availability prevents double booking under concurrent requests.
- Pricing quote uses integer minor units and returns a snapshot.
- Search filters validate unsupported or expensive fields.
- Closed/unapproved stores and temporarily closed branches are excluded from availability.
- Index draft covers expected query patterns.

## Definition of Done
- [ ] Asset/category/equipment/inventory/rental point models and APIs are implemented.
- [ ] Pricing quote service is implemented.
- [ ] Availability check is transaction/version safe.
- [ ] Search endpoints and filter validation are implemented.
- [ ] Tests cover pricing, availability, search, permissions, and tenant isolation.

---
*Note: You can start a new conversation for the next task to save Context window limits.*
