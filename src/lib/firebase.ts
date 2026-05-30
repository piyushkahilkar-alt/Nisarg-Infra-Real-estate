import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseConfig from "@/firebase-applet-config.json";

// If firebase-applet-config.json doesn't exist yet, we will map it temporarily
// But the AI Studio setup creates it at the root of the project.
// We must parse it correctly.

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  // Mock config fallback if importing JSON fails in some setups
  app = initializeApp({
    apiKey: "dummy",
    authDomain: "dummy",
    projectId: "dummy",
    storageBucket: "dummy",
  });
}

export const db = getFirestore(app, firebaseConfig?.firestoreDatabaseId || "");
export const auth = getAuth(app);
export const storage = getStorage(app);
