import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeAuditPayload } from "../domain/audit-log.js";

test("sanitizeAuditPayload redacts secrets and removes unnecessary coordinates", () => {
  const sanitized = sanitizeAuditPayload({
    authorization: "Bearer secret",
    password: "super-secret",
    latitude: 13.75,
    longitude: 100.49,
    nested: {
      gps_track: [{ latitude: 1, longitude: 2 }],
      document_number: "1234",
      reason: "cash correction",
    },
  });

  assert.deepEqual(sanitized, {
    authorization: "[REDACTED]",
    password: "[REDACTED]",
    nested: {
      document_number: "[REDACTED]",
      reason: "cash correction",
    },
  });
});
