import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, initializeFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const databaseId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID || undefined;

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey.trim() !== "" &&
    firebaseConfig.projectId.trim() !== ""
  );
}

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (typeof window !== "undefined" || isFirebaseConfigured()) {
  try {
    if (isFirebaseConfigured()) {
      app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      
      try {
        if (databaseId) {
          db = initializeFirestore(app, { experimentalForceLongPolling: true }, databaseId);
        } else {
          db = initializeFirestore(app, { experimentalForceLongPolling: true });
        }
      } catch {
        db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);
      }
    }
  } catch (error) {
    console.warn("Firebase initialization error:", error);
  }
}

export { app, db, firebaseConfig, databaseId };
