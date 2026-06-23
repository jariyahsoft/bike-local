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
const storageBucket = `${projectId}.appspot.com`;

const app = initializeApp({
  projectId,
  storageBucket,
});

const auth = getAuth(app);
const firestore = getFirestore(app);
const bucket = getStorage(app).bucket();

const main = async (): Promise<void> => {
  for (const user of emulatorFixtureUsers) {
    try {
      await auth.createUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
      });
    } catch (error) {
      if (
        !(error instanceof Error) ||
        !error.message.includes("already exists")
      ) {
        throw error;
      }
    }
  }

  for (const [collectionName, documents] of Object.entries(
    emulatorFixtureCollections,
  )) {
    for (const document of documents) {
      await firestore
        .collection(collectionName)
        .doc(document.id)
        .set(document.data, {
          merge: true,
        });
    }
  }

  for (const object of emulatorFixtureStorageObjects) {
    await bucket.file(object.path).save(object.body, {
      contentType: object.contentType,
      resumable: false,
    });
  }

  console.log(
    `Seeded emulator project ${projectId} with ${emulatorFixtureUsers.length} auth users and ${Object.keys(emulatorFixtureCollections).length} collections.`,
  );
};

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
