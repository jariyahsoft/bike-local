# Design System

Shared tokens, themes, and reusable Flutter UI primitives for app and portals.

## Current Foundation

- `design_system.dart` exports the provisional token and theme scaffold
- `src/design_tokens.dart` defines non-brand starter tokens for color, spacing, radius, elevation, motion, and typography
- `src/design_theme.dart` creates renter and operations theme variants with the same state palette but different density

## Token Rules

- Treat current colors as operational starter tokens, not final brand colors
- Preserve distinct success, warning, danger, info, neutral, focus, GPS, offline, and SOS states
- Support Thai and English text sizing without fixed-height text containers
- Keep renter surfaces comfortable and merchant/admin surfaces denser
