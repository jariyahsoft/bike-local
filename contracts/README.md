# Contracts

OpenAPI 3.1 contracts live here. Frontend packages should consume generated clients from `packages/api_client` rather than reading or writing business-critical Firestore data directly.

## Commands

- `npm run contract:lint` validates `contracts/openapi.yaml`.
- `npm run mock:api` starts a Prism mock server from the OpenAPI contract.
- `npm run generate:types` writes TypeScript API types to `packages/api_client/generated/typescript/schema.d.ts`.
- `npm run generate:dart` writes a Dart Dio client to `packages/api_client/generated/dart`.
- `npm run test:contract` is the CI contract gate alias for `contract:lint`.
