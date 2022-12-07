import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADMjxTWlVI4ZG2hnSIACqpdMzbRhGwi64",
  authDomain: "free-space-2ba29.firebaseapp.com",
  projectId: "free-space-2ba29",
  storageBucket: "free-space-2ba29.appspot.com",
  messagingSenderId: "91604490594",
  appId: "1:91604490594:web:1b22e1e9317ac9a059743b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
