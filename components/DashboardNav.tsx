"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface DashboardNavProps {
  title: string;
  userEmail?: string | null;
  role: "admin" | "parent";
}

export default function DashboardNav({ title, userEmail, role }: DashboardNavProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative w-10 h-10 shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-yellow-500 to-amber-500 opacity-20 blur-md group-hover:opacity-40 transition-all duration-300" />
                <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center shadow border border-gray-100 overflow-hidden">
                  <img src="/logo.png" alt="Spoorthi's" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[13px] font-black uppercase tracking-[0.06em] text-gray-900">SPOORTHI'S</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-500">THE DUCKLING</span>
              </div>
            </Link>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200 hidden sm:block" />

            {/* Page title */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                role === "admin"
                  ? "bg-gray-900 text-white"
                  : "bg-yellow-400 text-gray-900"
              }`}>
                {role === "admin" ? "Admin" : "Parent"}
              </span>
              <h1 className="text-sm font-bold text-gray-700 hidden md:block">{title}</h1>
            </div>
          </div>

          {/* Right: Home + Sign Out */}
          <div className="flex items-center gap-3">
            {userEmail && (
              <span className="text-xs text-gray-400 hidden lg:block truncate max-w-[200px]">{userEmail}</span>
            )}
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="hidden sm:inline">Home</span>
            </Link>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
