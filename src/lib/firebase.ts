import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChUf2Wb1IeVNti3Tyz3ICBkG6riKdV32E",
  authDomain: "sneakout-d2c3c.firebaseapp.com",
  projectId: "sneakout-d2c3c",
  storageBucket: "sneakout-d2c3c.firebasestorage.app",
  messagingSenderId: "311329092425",
  appId: "1:311329092425:web:a414d8cc44fdedb0e5a098",
  measurementId: "G-JWGMG5C7FN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
