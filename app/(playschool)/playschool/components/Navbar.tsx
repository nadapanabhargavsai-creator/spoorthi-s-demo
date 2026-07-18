"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayschoolDb } from "../context/PlayschoolDb";
import { useRouter } from "next/navigation";

export default function PlayschoolNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { session, logout } = usePlayschoolDb();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/playschool");
    setMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/playschool" },
    { name: "About Us", path: "/playschool/about" },
    { name: "Programs", path: "/playschool/programs" },
    { name: "Admissions", path: "/playschool/admissions" },
    { name: "Gallery", path: "/playschool/gallery" },
    { name: "Events", path: "/playschool/events" },
    { name: "Facilities", path: "/playschool/facilities" },
    { name: "Branches", path: "/playschool/branches" },
    { name: "Careers", path: "/playschool/careers" },
    { name: "FAQ", path: "/playschool/faq" },
    { name: "Contact", path: "/playschool/contact" },
  ];

  const colors = [
    "hover:text-sky-500",
    "hover:text-pink-500",
    "hover:text-yellow-500",
    "hover:text-emerald-500",
    "hover:text-orange-500",
  ];

  return (
    <nav className="fixed w-full z-[100] bg-white/90 backdrop-blur-lg border-b-4 border-dashed border-sky-100 shadow-sm font-['Quicksand'] font-bold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/playschool" className="flex items-center gap-2.5 group">
          <div className="relative w-12 h-12 shrink-0">
            {/* Playful background blob */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400 via-yellow-300 to-sky-400 opacity-80 blur-xs group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <div className="relative w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-pink-400 group-hover:scale-[1.05] transition-transform duration-200 overflow-hidden">
              <span className="text-2xl">🌸</span>
            </div>
          </div>
          
          <div className="flex flex-col leading-none">
            <span className="text-xl font-['Fredoka'] font-black tracking-tight bg-gradient-to-r from-sky-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              LITTLE BLOSSOMS
            </span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-500 mt-1 font-black">
              · Play School ·
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-5 text-sm">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.path}
              className={`${colors[idx % colors.length]} transition-colors duration-200 py-1.5`}
            >
              {link.name}
            </Link>
          ))}
          
          <span className="h-6 w-px bg-gray-200" />

          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href={session.role === "admin" ? "/playschool/admin" : "/playschool/login"}
                className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5"
              >
                <span>👤</span> {session.role === "admin" ? "Admin" : "Portal"}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-pink-100 text-pink-700 hover:bg-pink-200 px-4 py-2 rounded-full text-xs font-black transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/playschool/login"
              className="bg-sky-100 text-sky-700 hover:bg-sky-200 px-4 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1"
            >
              🔑 Parent Login
            </Link>
          )}

          <Link
            href="/playschool/apply"
            className="bg-gradient-to-r from-pink-400 to-orange-400 hover:from-pink-500 hover:to-orange-500 text-white px-5 py-2.5 rounded-full text-xs font-black shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Apply Now
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center text-xl font-bold border-2 border-sky-200 focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t-2 border-sky-100 overflow-hidden shadow-inner"
          >
            <div className="px-5 py-5 space-y-3.5 text-base">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-3.5 rounded-xl hover:bg-sky-50 text-gray-700 hover:text-sky-600 transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t-2 border-dashed border-gray-100 flex flex-col gap-3">
                {session ? (
                  <>
                    <Link
                      href={session.role === "admin" ? "/playschool/admin" : "/playschool/login"}
                      onClick={() => setMenuOpen(false)}
                      className="w-full bg-emerald-500 text-white text-center py-2.5 rounded-2xl font-black shadow-sm"
                    >
                      👤 {session.role === "admin" ? "Admin Dashboard" : "Parent Dashboard"}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-pink-100 text-pink-700 py-2.5 rounded-2xl font-black"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/playschool/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full bg-sky-500 text-white text-center py-2.5 rounded-2xl font-black shadow-sm"
                  >
                    🔑 Parent Login
                  </Link>
                )}
                <Link
                  href="/playschool/apply"
                  onClick={() => setMenuOpen(false)}
                  className="w-full bg-gradient-to-r from-pink-400 to-orange-400 text-white text-center py-3 rounded-2xl font-black shadow-md"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
