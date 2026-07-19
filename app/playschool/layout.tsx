"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function PlaySchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#F8FBFF] min-h-screen flex flex-col antialiased selection:bg-pink-200 selection:text-pink-900">
      
      {/* TOP ANNOUNCEMENT BAR — Back to Main School */}
      <div className="fixed top-0 left-0 w-full z-[110] bg-gradient-to-r from-[#0F4C81] via-[#1565C0] to-[#0F4C81] text-white py-2 px-4 flex items-center justify-center gap-3">
        <span className="text-[10px] font-bold text-sky-200 hidden sm:block">You are browsing Little Blossoms Play School</span>
        <span className="text-sky-300 hidden sm:block">·</span>
        <Link
          href="/"
          className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
        >
          <span>🏫</span> Back to Spoorthi's The Duckling
        </Link>
      </div>

      {/* PLAY SCHOOL CUSTOM NAVIGATION BAR */}
      <nav className="fixed top-9 w-full z-[100] bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/playschool" className="flex items-center gap-3 group">
            {/* Playful Flower Icon Emblem */}
            <div className="relative w-12 h-12 shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-yellow-400 to-sky-400 opacity-40 blur-md group-hover:opacity-80 group-hover:scale-110 transition-all duration-300" />
              <div className="relative w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md border border-sky-100 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-2xl select-none">🌸</span>
              </div>
            </div>
            
            <div className="flex flex-col leading-none">
              <span className="text-base font-black uppercase tracking-tight text-slate-800">
                Little Blossoms
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-500 mt-1">
                Play School
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION MENU (11 links + Apply button) */}
          <div className="hidden xl:flex items-center gap-6 text-[10px] font-black uppercase tracking-wider text-slate-600">
            <Link href="/playschool" className="hover:text-pink-500 transition">Home</Link>
            <Link href="/playschool/about" className="hover:text-amber-500 transition">About Us</Link>
            <Link href="/playschool/programs" className="hover:text-sky-500 transition">Programs</Link>
            <Link href="/playschool/admissions" className="hover:text-emerald-500 transition">Admissions</Link>
            <Link href="/playschool/gallery" className="hover:text-purple-500 transition">Gallery</Link>
            <Link href="/playschool/events" className="hover:text-pink-500 transition">Events</Link>
            <Link href="/playschool/facilities" className="hover:text-sky-500 transition">Facilities</Link>
            <Link href="/playschool/branches" className="hover:text-amber-500 transition">Branches</Link>
            <Link href="/playschool/contact" className="hover:text-emerald-500 transition">Contact</Link>
            <Link href="/playschool/faq" className="hover:text-purple-500 transition">FAQ</Link>
            <Link href="/playschool/careers" className="hover:text-pink-500 transition">Careers</Link>
            
            {/* PORTAL LOGIN */}
            <Link 
              href="/playschool/portal" 
              className="px-4 py-2 border-2 border-sky-100 hover:border-sky-400 rounded-xl text-slate-700 hover:bg-sky-50 transition"
            >
              Portal Login
            </Link>

            {/* BACK TO MAIN SCHOOL */}
            <Link
              href="/"
              className="flex items-center gap-1.5 px-4 py-2 border-2 border-[#0F4C81]/20 hover:border-[#0F4C81] rounded-xl text-[#0F4C81] hover:bg-[#0F4C81]/5 transition font-black text-[10px] uppercase tracking-widest"
            >
              🏫 Main School
            </Link>

            <Link 
              href="/playschool/apply" 
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white px-5 py-2.5 rounded-full shadow-md shadow-pink-500/10 hover:shadow-lg hover:shadow-pink-500/20 hover:scale-105 transition-all"
            >
              Apply Now
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 transition"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU PANEL */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-white border-t border-sky-50 overflow-hidden shadow-inner"
            >
              <div className="px-6 py-6 space-y-3.5 text-xs font-black uppercase tracking-widest text-slate-600">
                <Link href="/playschool" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-pink-500">Home</Link>
                <Link href="/playschool/about" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-amber-500">About Us</Link>
                <Link href="/playschool/programs" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-sky-500">Programs</Link>
                <Link href="/playschool/admissions" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-emerald-500">Admissions</Link>
                <Link href="/playschool/gallery" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-purple-500">Gallery</Link>
                <Link href="/playschool/events" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-pink-500">Events</Link>
                <Link href="/playschool/facilities" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-sky-500">Facilities</Link>
                <Link href="/playschool/branches" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-amber-500">Branches</Link>
                <Link href="/playschool/contact" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-emerald-500">Contact</Link>
                <Link href="/playschool/faq" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-purple-500">FAQ</Link>
                <Link href="/playschool/careers" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-pink-500">Careers</Link>
                <Link href="/playschool/portal" onClick={() => setMenuOpen(false)} className="block py-2 text-sky-600 hover:text-sky-800">Portal Login</Link>
                <Link 
                  href="/playschool/apply" 
                  onClick={() => setMenuOpen(false)}
                  className="block bg-gradient-to-r from-pink-500 to-amber-500 text-white px-5 py-3 rounded-full text-center mt-4 shadow-md"
                >
                  Apply Now
                </Link>
                {/* BACK TO MAIN SCHOOL */}
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#0F4C81] text-white px-5 py-3 rounded-full text-center mt-2 shadow-md"
                >
                  🏫 Back to Spoorthi&apos;s The Duckling
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* RENDER PAGES */}
      <div className="flex-grow">
        {children}
      </div>

      {/* PLAY SCHOOL CUSTOM FOOTER */}
      <footer className="bg-slate-900 text-white pt-20 pb-8 px-6 border-t-8 border-sky-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* BRAND */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center text-2xl shadow-md">
                  🌸
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight">
                    Little Blossoms <span className="text-pink-400">Play School</span>
                  </h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    A Unit of Spoorthi's Academy
                  </p>
                </div>
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
                Nurturing curiosity, fostering creativity, and building lifelong learning foundations in a colorful, secure, and loving preschool space.
              </p>
              
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-pink-500 transition font-bold text-sm">f</a>
                <a href="#" className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-amber-500 transition font-bold text-xs">ig</a>
                <a href="#" className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-sky-500 transition font-bold text-xs">yt</a>
                <a href="https://wa.me/919381377301" target="_blank" className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-emerald-500 transition font-bold text-xs">wa</a>
              </div>
            </div>

            {/* QUICK LINK GROUPS */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-pink-400">Preschool Wings</h4>
              <div className="space-y-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Link href="/playschool/about" className="block hover:text-white transition">About Us</Link>
                <Link href="/playschool/programs" className="block hover:text-white transition">Learning Programs</Link>
                <Link href="/playschool/admissions" className="block hover:text-white transition">Admission Guides</Link>
                <Link href="/playschool/facilities" className="block hover:text-white transition">Infrastructure</Link>
                <Link href="/playschool/branches" className="block hover:text-white transition">Our Branches</Link>
              </div>
            </div>

            {/* QUICK CONTACTS */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-amber-400">Connect Directly</h4>
              <div className="space-y-4 text-xs font-semibold text-slate-400">
                <div>
                  <p className="text-white font-black uppercase text-[9px] tracking-wider mb-1">Administrative Center</p>
                  <p>Road No. 14, Papi Reddy Nagar, Hyderabad, TS 500037</p>
                </div>
                <div>
                  <p className="text-white font-black uppercase text-[9px] tracking-wider mb-1">Phone Line</p>
                  <a href="tel:+919381377301" className="hover:text-yellow-400 font-bold text-sm">+91 93813 77301</a>
                </div>
                <div>
                  <p className="text-white font-black uppercase text-[9px] tracking-wider mb-1">Office Hours</p>
                  <p>Mon – Sat: 8:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM LINE */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-semibold">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p>© {new Date().getFullYear()} Little Blossoms Play School. All rights reserved.</p>
              <span className="hidden sm:block text-white/20">·</span>
              <Link href="/" className="flex items-center gap-1.5 text-sky-400 hover:text-white transition font-black uppercase tracking-wider text-[9px]">
                🏫 Spoorthi&apos;s The Duckling Main School
              </Link>
            </div>
            <div className="flex gap-6">
              <Link href="/playschool/faq" className="hover:text-white">FAQs</Link>
              <Link href="/playschool/careers" className="hover:text-white">Careers</Link>
              <Link href="/playschool/portal" className="hover:text-white">Portal</Link>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
