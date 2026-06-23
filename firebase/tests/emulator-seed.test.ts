import assert from "node:assert/strict";
import test from "node:test";

import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

import {
  emulatorFixtureCollections,
  emulatorFixtureStorageObjects,
  emulatorFixtureUsers,
} from "../seed/emulator-fixtures.js";

process.env.FIRESTORE_EMULATOR_HOST ??= "127.0.0.1:8080";
process.env.FIREBASE_AUTH_EMULATOR_HOST ??= "127.0.0.1:9099";
process.env.FIREBASE_STORAGE_EMULATOR_HOST ??= "127.0.0.1:9199";

const projectId = process.env.GCLOUD_PROJECT ?? "demo-bike-local";
const app = initializeApp({
  projectId,
  storageBucket: `${projectId}.appspot.com`,
});

test("seed script loads auth fixtures", async () => {
  const auth = getAuth(app);
  const userRecord = await auth.getUser(emulatorFixtureUsers[0].uid);

  assert.equal(userRecord.email, emulatorFixtureUsers[0].email);
});

test("seed script loads representative Firestore documents", async () => {
  const firestore = getFirestore(app);
  const bookingSnapshot = await firestore
    .collection("bookings")
    .doc("booking_1")
    .get();
  const sosSnapshot = await firestore
    .collection("sos_cases")
    .doc("sos_case_1")
    .get();

  assert.equal(bookingSnapshot.exists, true);
  assert.equal(bookingSnapshot.data()?.status, "IN_PROGRESS");
  assert.equal(sosSnapshot.data()?.issue_type, "breakdown");
  assert.equal(Object.keys(emulatorFixtureCollections).length >= 10, true);
});

test("seed script loads placeholder storage fixtures", async () => {
  const bucket = getStorage(app).bucket();
  const [exists] = await bucket
    .file(emulatorFixtureStorageObjects[0].path)
    .exists();

  assert.equal(exists, true);
});
