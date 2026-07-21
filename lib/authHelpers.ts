import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

/**
 * Checks if a given email exists in the "admins" collection.
 * The admins collection stores documents with an `email` field.
 */
export async function isAdminEmail(email: string): Promise<boolean> {
  try {
    const q = query(collection(db, "admins"), where("email", "==", email));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error("Admin check failed:", error);
    return false;
  }
}

/**
 * Returns a human-readable error message from Firebase Auth error codes.
 */
export function getAuthErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    "auth/user-not-found": "No account found with this email address.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Invalid email or password. Please check and try again.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/too-many-requests": "Too many failed attempts. Please wait a few minutes and try again.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/cancelled-popup-request": "Sign-in cancelled.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password must be at least 6 characters.",
  };
  return messages[code] || "Something went wrong. Please try again.";
}
