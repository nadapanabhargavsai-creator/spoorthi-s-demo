"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [franchiseOpen, setFranchiseOpen] = useState(false);

  return (
    <nav className="fixed w-full z-[100] bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3.5 group">

          {/* Emblem badge */}
          <div className="relative w-14 h-14 shrink-0">
            {/* pulsing glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-yellow-500 to-amber-500 opacity-30 blur-lg group-hover:opacity-75 group-hover:scale-110 transition-all duration-400" />
            {/* badge */}
            <div className="relative w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md border border-gray-100 group-hover:scale-[1.08] transition-transform duration-300 overflow-hidden">
              <img src="/logo.png" alt="Spoorthi's Academy Telangana" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Wordmark — stacked two-line */}
          <div className="flex flex-col leading-none">
            {/* Line 1: SPOORTHI'S */}
            <span className="text-[17px] font-black uppercase tracking-[0.06em] text-gray-900 group-hover:text-black transition-colors duration-200">
              SPOORTHI'S
            </span>
            {/* Line 2: "THE DUCKLING" */}
            <span className="text-[12px] font-black uppercase tracking-[0.25em] text-yellow-500 mt-[1px]">
              THE DUCKLING
            </span>
            {/* Line 3: tagline */}
            <div className="flex items-center gap-1.5 mt-[5px]">
              <span className="h-px w-5 bg-red-500/70 rounded-full" />
              <span className="text-[7.5px] font-semibold text-gray-400 uppercase tracking-[0.22em]">
                Nursery · 7th Grade · Hyderabad
              </span>
            </div>
          </div>

        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-gray-700">
          <Link href="/" className="hover:text-yellow-600 transition">Home</Link>
          <Link href="/about" className="hover:text-yellow-600 transition">About</Link>
          <Link href="/academics" className="hover:text-yellow-600 transition">Academics</Link>
          <Link href="/admissions" className="hover:text-yellow-600 transition">Admissions</Link>
          <Link href="/gallery" className="hover:text-yellow-600 transition">Gallery</Link>
          <Link href="/facilities" className="hover:text-yellow-600 transition">Facilities</Link>
          
          {/* FRANCHISE DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setFranchiseOpen(true)}
            onMouseLeave={() => setFranchiseOpen(false)}
          >
            <button className="hover:text-yellow-600 transition flex items-center gap-1">
              Franchise
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <AnimatePresence>
              {franchiseOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-3 bg-white shadow-2xl border border-gray-100 rounded-xl overflow-hidden w-64"
                >
                  <Link 
                    href="/"
                    className="block px-6 py-4 hover:bg-yellow-50 border-b border-gray-100 transition"
                  >
                    <p className="font-black text-sm text-black">Main School</p>
                    <p className="text-[10px] text-gray-500 mt-1">Nursery to 7th Grade</p>
                  </Link>
                  <a 
                    href="/playschool"
                    target="_blank"
                    className="block px-6 py-4 hover:bg-yellow-50 transition"
                  >
                    <p className="font-black text-sm text-black flex items-center gap-2">
                      Play School
                      <svg className="w-3 h-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">Play Group, Nursery, LKG, UKG</p>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/contact" className="hover:text-yellow-600 transition">Contact</Link>
          <Link 
            href="/apply" 
            className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-yellow-500 hover:text-black transition-all"
          >
            Apply Now
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button className="lg:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 text-sm font-bold uppercase tracking-widest text-gray-700">
              <Link href="/" onClick={() => setMenuOpen(false)} className="block py-2">Home</Link>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="block py-2">About</Link>
              <Link href="/academics" onClick={() => setMenuOpen(false)} className="block py-2">Academics</Link>
              <Link href="/admissions" onClick={() => setMenuOpen(false)} className="block py-2">Admissions</Link>
              <Link href="/gallery" onClick={() => setMenuOpen(false)} className="block py-2">Gallery</Link>
              <Link href="/facilities" onClick={() => setMenuOpen(false)} className="block py-2">Facilities</Link>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 mb-3">Our Franchise</p>
                <Link href="/" onClick={() => setMenuOpen(false)} className="block py-2">Main School</Link>
                <a href="/playschool" target="_blank" className="block py-2 flex items-center gap-2">
                  Play School →
                </a>
              </div>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2">Contact</Link>
              <Link 
                href="/apply" 
                onClick={() => setMenuOpen(false)}
                className="block bg-black text-white px-6 py-3 rounded-full text-center mt-4"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
