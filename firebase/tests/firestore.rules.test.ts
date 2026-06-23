import test from "node:test";
import { readFileSync } from "node:fs";

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc } from "firebase/firestore";

let testEnvironment: RulesTestEnvironment;

test.before(async () => {
  testEnvironment = await initializeTestEnvironment({
    projectId: "demo-bike-local",
    firestore: {
      host: "127.0.0.1",
      port: 8080,
      rules: readFileSync("firebase/firestore.rules", "utf8"),
    },
  });

  await testEnvironment.withSecurityRulesDisabled(async (context) => {
    const firestore = context.firestore();

    await setDoc(doc(firestore, "system_configs", "marketplace_public"), {
      title: "Public config",
    });
    await setDoc(doc(firestore, "notifications", "notif_1"), {
      user_firebase_uid: "firebase_renter_1",
      title: "Owned notification",
    });
    await setDoc(doc(firestore, "bookings", "booking_1"), {
      status: "CONFIRMED",
    });
  });
});

test.after(async () => {
  await testEnvironment.cleanup();
});

test("public config is readable without authentication", async () => {
  const anonymousDb = testEnvironment.unauthenticatedContext().firestore();

  await assertSucceeds(
    getDoc(doc(anonymousDb, "system_configs", "marketplace_public")),
  );
});

test("notification is readable only by its owner", async () => {
  const ownerDb = testEnvironment
    .authenticatedContext("firebase_renter_1")
    .firestore();
  const strangerDb = testEnvironment
    .authenticatedContext("firebase_other")
    .firestore();

  await assertSucceeds(getDoc(doc(ownerDb, "notifications", "notif_1")));
  await assertFails(getDoc(doc(strangerDb, "notifications", "notif_1")));
});

test("business-critical booking writes are denied to clients", async () => {
  const renterDb = testEnvironment
    .authenticatedContext("firebase_renter_1")
    .firestore();

  await assertFails(
    setDoc(doc(renterDb, "bookings", "booking_2"), {
      status: "PENDING_PAYMENT",
    }),
  );
});

test("non-public config writes remain denied", async () => {
  const anonymousDb = testEnvironment.unauthenticatedContext().firestore();

  await assertFails(
    setDoc(doc(anonymousDb, "system_configs", "mobile_public"), {
      published: false,
    }),
  );
});
