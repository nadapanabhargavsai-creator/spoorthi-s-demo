import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCAwNHz0pzL3C7NOzfQNcfKkT8zwqU5FlY",
  authDomain: "spoorthi-s-school.firebaseapp.com",
  projectId: "spoorthi-s-school",
  storageBucket: "spoorthi-s-school.firebasestorage.app",
  messagingSenderId: "971583195160",
  appId: "1:971583195160:web:80aab304757117d190db6d"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { app, auth, db, functions };
