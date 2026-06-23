import assert from "node:assert/strict";
import test from "node:test";

import { asDomainId, asIsoUtcDateTime } from "../../shared/domain/index.js";
import {
  buildConsentRecords,
  requestAccountDeletion,
  validateSelectedRoles,
} from "../domain/identity-policies.js";

test("validateSelectedRoles accepts renter and store owner only", () => {
  assert.deepEqual(validateSelectedRoles(["RENTER", "STORE_OWNER"]), [
    "RENTER",
    "STORE_OWNER",
  ]);

  assert.throws(
    () => validateSelectedRoles(["PLATFORM_ADMIN"]),
    /selectable during onboarding/,
  );
});

test("buildConsentRecords requires terms and privacy during onboarding", () => {
  assert.throws(
    () =>
      buildConsentRecords({
        userId: asDomainId<"User">("usr_1"),
        locale: "en",
        consents: [
          {
            type: "TERMS",
            status: "GRANTED",
            versionCode: "terms-1",
            purpose: "terms_acceptance",
          },
        ],
        now: asIsoUtcDateTime("2026-06-23T10:00:00Z"),
        buildId: (type) => `consent_${type}`,
        requireTermsAndPrivacy: true,
      }),
    /PRIVACY consent must be granted/,
  );
});

test("buildConsentRecords requires explicit GPS scope when GPS consent exists", () => {
  assert.throws(
    () =>
      buildConsentRecords({
        userId: asDomainId<"User">("usr_1"),
        locale: "th",
        consents: [
          {
            type: "TERMS",
            status: "GRANTED",
            versionCode: "terms-1",
            purpose: "terms_acceptance",
          },
          {
            type: "PRIVACY",
            status: "GRANTED",
            versionCode: "privacy-1",
            purpose: "privacy_notice_acceptance",
          },
          {
            type: "GPS",
            status: "GRANTED",
            versionCode: "gps-1",
            purpose: "ride_tracking_and_sos",
          },
        ],
        now: asIsoUtcDateTime("2026-06-23T10:00:00Z"),
        buildId: (type) => `consent_${type}`,
      }),
    /GPS consent must state whether background location is allowed/,
  );
});

test("requestAccountDeletion rejects duplicate deletion requests", () => {
  const deletionRequestedUser = {
    id: asDomainId<"User">("usr_1"),
    tenantId: asDomainId<"Tenant">("tenant_1"),
    displayName: "Demo User",
    locale: "en" as const,
    status: "DELETION_REQUESTED" as const,
    roles: [],
    consentVersionSummary: {
      TERMS: "terms-1",
      PRIVACY: "privacy-1",
      GPS: undefined,
      MARKETING: undefined,
    },
    deletionRequestedAt: asIsoUtcDateTime("2026-06-23T10:00:00Z"),
    createdAt: asIsoUtcDateTime("2026-06-23T09:00:00Z"),
    updatedAt: asIsoUtcDateTime("2026-06-23T10:00:00Z"),
    version: 2 as never,
  };

  assert.throws(
    () =>
      requestAccountDeletion(
        deletionRequestedUser,
        asIsoUtcDateTime("2026-06-23T11:00:00Z"),
      ),
    /already been requested/,
  );
});
