"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isAdminEmail } from "@/lib/authHelpers";

export default function AuthButton({ isMobile = false, onClick }: { isMobile?: boolean; onClick?: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const admin = await isAdminEmail(currentUser.email);
        setIsAdmin(admin);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setShowDropdown(false);
    if (onClick) onClick();
  };

  if (loading) {
    return <span className={isMobile ? "block py-2 text-gray-400" : "text-gray-400 text-xs"}>...</span>;
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        onClick={onClick}
        className={
          isMobile
            ? "block py-2 font-bold uppercase tracking-widest text-gray-700"
            : "text-[11px] font-black uppercase tracking-widest text-gray-700 hover:text-yellow-600 transition"
        }
      >
        Login
      </Link>
    );
  }

  // Logged in — show Dashboard link + sign out
  const dashboardHref = isAdmin ? "/admin/dashboard" : "/parent/dashboard";

  if (isMobile) {
    return (
      <>
        <Link href={dashboardHref} onClick={onClick} className="block py-2 font-bold uppercase tracking-widest text-gray-700">
          {isAdmin ? "Admin Portal" : "My Portal"}
        </Link>
        <button onClick={handleSignOut} className="block py-2 font-bold uppercase tracking-widest text-red-500 text-left w-full">
          Sign Out
        </button>
      </>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-[11px] font-black uppercase tracking-widest text-gray-700 hover:text-yellow-600 transition flex items-center gap-1"
      >
        {isAdmin ? "Admin Portal" : "My Portal"}
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
          <Link
            href={dashboardHref}
            onClick={() => setShowDropdown(false)}
            className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-yellow-600"
          >
            Dashboard
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
