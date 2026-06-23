# Localization

Thai and English localization assets and helpers belong here.

## Current Foundation

- `localization.dart` exports localization key and workflow helpers
- `src/localization_keys.dart` contains stable keys and supported locales
- `l10n/app_en.arb` and `l10n/app_th.arb` provide starter strings for state, error, online-required, and SOS messaging

## Workflow Rules

- Add strings in both `app_en.arb` and `app_th.arb` in the same change
- Use backend `error.code` values as lookup keys; do not parse human-readable messages
- Keep safety, payment, and legal copy reviewable by product/compliance before release
- Avoid hard-coded UI text in widget source
