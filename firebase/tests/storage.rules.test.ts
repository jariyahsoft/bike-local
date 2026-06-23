import test from "node:test";
import { readFileSync } from "node:fs";

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";

let testEnvironment: RulesTestEnvironment;
const bucketUrl = "gs://demo-bike-local.appspot.com";

test.before(async () => {
  testEnvironment = await initializeTestEnvironment({
    projectId: "demo-bike-local",
    storage: {
      host: "127.0.0.1",
      port: 9199,
      rules: readFileSync("firebase/storage.rules", "utf8"),
    },
  });

  await testEnvironment.withSecurityRulesDisabled(async (context) => {
    const storage = context.storage(bucketUrl);
    await storage.ref("public/config/welcome.txt").putString("BL");
  });
});

test.after(async () => {
  await testEnvironment.cleanup();
});

test("public objects are readable without authentication", async () => {
  const storage = testEnvironment.unauthenticatedContext().storage(bucketUrl);

  await assertSucceeds(storage.ref("public/config/welcome.txt").getMetadata());
});

test("owner can upload to allowed user path with valid MIME type", async () => {
  const storage = testEnvironment
    .authenticatedContext("firebase_renter_1")
    .storage(bucketUrl);

  await assertSucceeds(
    storage
      .ref("uploads/firebase_renter_1/avatar/profile.png")
      .put(new Uint8Array([1, 2, 3]), {
        contentType: "image/png",
      }),
  );
});

test("cross-user uploads are denied", async () => {
  const storage = testEnvironment
    .authenticatedContext("firebase_other")
    .storage(bucketUrl);

  await assertFails(
    storage
      .ref("uploads/firebase_renter_1/avatar/profile.png")
      .put(new Uint8Array([1, 2, 3]), {
        contentType: "image/png",
      }),
  );
});

test("confidential audit evidence path remains backend-only", async () => {
  const storage = testEnvironment
    .authenticatedContext("firebase_platform_admin_1")
    .storage(bucketUrl);

  await assertFails(
    storage
      .ref("audit-evidence/tenant_store_1/payment_1.txt")
      .put(new Uint8Array([7, 8]), {
        contentType: "text/plain",
      }),
  );
});
