"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Facility {
  title: string;
  desc: string;
  icon: string;
  color: string;
  image: string;
  features: string[];
}

export default function PlayschoolFacilities() {
  const facilities: Facility[] = [
    {
      title: "Smart Classrooms",
      desc: "Fully air-conditioned, child-safe rooms equipped with digital smart boards, ergonomic tables, and child-safe chairs.",
      icon: "💡",
      color: "bg-sky-50 border-sky-200 text-sky-700",
      image: "/facility_smart_class.png",
      features: ["Interactive interactive display boards", "Child-safe rounded desk corners", "Pure air filtrations"]
    },
    {
      title: "Indoor Play Area",
      desc: "Soft-padded play zones featuring mini slides, ball pits, sensory tunnels, soft climbers, and foam blocks.",
      icon: "🧸",
      color: "bg-pink-50 border-pink-200 text-pink-700",
      image: "/school2.jpg",
      features: ["Rubberized safety floor pads", "Cleaned daily with child-safe sprays", "Fosters social interactions"]
    },
    {
      title: "Outdoor Playground",
      desc: "A green outdoor lawn playground with safe swings, slides, sand pits, and small cycle tracks under vigilant monitoring.",
      icon: "🎠",
      color: "bg-yellow-50 border-yellow-200 text-yellow-700",
      image: "/facility_sports.png",
      features: ["Anti-skid grass mats", "Fenced play zones", "Sensory plant corridors"]
    },
    {
      title: "Library & Audio Center",
      desc: "A cozy visual library containing board books, texture sheets, audiobooks, and soft floor mats.",
      icon: "📖",
      color: "bg-emerald-50 border-emerald-200 text-emerald-700",
      image: "/facility_library.png",
      features: ["300+ child picture books", "Listening stations", "Circle reading tables"]
    },
    {
      title: "Art & Activity Room",
      desc: "A hands-on activity room where kids paint, mold clay, fold paper, and build blocks.",
      icon: "🎨",
      color: "bg-orange-50 border-orange-200 text-orange-700",
      image: "/school3.jpg",
      features: ["Individual art easels", "Non-toxic finger paints & materials", "Weekly craft display walls"]
    },
    {
      title: "Music & Dance Room",
      desc: "A sound-proofed dance studio with full wall mirrors, small keyboards, tambourines, and drums.",
      icon: "🎵",
      color: "bg-purple-50 border-purple-200 text-purple-700",
      image: "/about.jpg",
      features: ["Wooden shock-absorbing floors", "Child-sized percussion tools", "Weekly rhythmic exercise classes"]
    },
    {
      title: "CCTV Security & Campus Safety",
      desc: "State-of-the-art surveillance in every room and lobby, with encrypted live streams for parents.",
      icon: "📹",
      color: "bg-rose-50 border-rose-200 text-rose-700",
      image: "/facility_computer_lab.png", // Stand-in for camera control room
      features: ["100% CCTV coverage", "Encrypted parent login access", "Strict campus check-in policies"]
    },
    {
      title: "Safe Transport",
      desc: "Air-conditioned school vans equipped with speed governors, GPS tracking, and female caretakers.",
      icon: "🚌",
      color: "bg-blue-50 border-blue-200 text-blue-700",
      image: "/banner.jpg",
      features: ["GPS live coordinates checking", "Trained lady helpers in every trip", "First-aid kits onboard"]
    },
    {
      title: "Sleeping & Resting Room",
      desc: "Quiet sleeping rooms with small, soft baby cots and gentle sleeping lights for kids to nap during long hours.",
      icon: "😴",
      color: "bg-teal-50 border-teal-200 text-teal-700",
      image: "/facility_smart_class.png", // Stand-in for sleeping area
      features: ["Soft baby-friendly cotton cots", "Gentle lullaby sound system", "Always supervised by a nurse"]
    },
    {
      title: "Dining Area & RO Water",
      desc: "A clean dining space where teachers foster self-eating habits. Pure RO filtered drinking water points.",
      icon: "🥛",
      color: "bg-cyan-50 border-cyan-200 text-cyan-700",
      image: "/program.jpg",
      features: ["RO water filter purifiers", "Teachers guide hand-washing rules", "Hygienic child tables"]
    },
    {
      title: "Clean Washrooms & Medical Care",
      desc: "Nursery-sized toilets, automated soap points, and a full-time medical nurse for first-aid needs.",
      icon: "🏥",
      color: "bg-violet-50 border-violet-200 text-violet-700",
      image: "/about.jpg",
      features: ["Child-sized sanitations", "Full-time campus nurse", "Monthly child growth checks"]
    },
    {
      title: "Green & Eco Campus",
      desc: "A green environment with a dedicated student vegetable garden and eco-friendly solar setups.",
      icon: "🌿",
      color: "bg-lime-50 border-lime-200 text-lime-700",
      image: "/school1.jpg",
      features: ["Priced organic vegetable patches", "Eco-friendly recycling stations", "Plenty of fresh air plants"]
    }
  ];

  return (
    <div className="w-full font-['Quicksand'] pb-20">
      
      {/* ========== HERO BANNER ========== */}
      <section className="bg-gradient-to-r from-sky-100 via-pink-100 to-yellow-100 py-16 px-6 text-center border-b-8 border-dashed border-sky-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 OUR CAMPUS</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Campus Facilities
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Explore our state-of-the-art early childhood facilities designed for high security, creative plays, and complete comfort.
          </p>
        </div>
      </section>

      {/* ========== CARDS GRID ========== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((fac, idx) => (
            <motion.div
              key={fac.title}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`rounded-3xl border-4 ${fac.color} overflow-hidden shadow-sm hover:shadow-lg transition bg-white flex flex-col`}
            >
              {/* Image Frame */}
              <div className="h-48 overflow-hidden relative">
                <img src={fac.image} alt={fac.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 text-3xl bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                  {fac.icon}
                </span>
              </div>
              
              {/* Content Body */}
              <div className="p-6.5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-['Fredoka'] font-black text-xl text-slate-800 mb-3">{fac.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold leading-relaxed mb-6">
                    {fac.desc}
                  </p>
                </div>
                
                {/* Features List */}
                <div className="border-t border-slate-100 pt-4.5">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2.5">Key Highlights</h4>
                  <ul className="space-y-1.5">
                    {fac.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <span className="text-emerald-500">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== EXTRA GALLERY SECTION ========== */}
      <section className="bg-gradient-to-r from-pink-50 to-sky-50 py-20 px-6 border-t-8 border-dashed border-pink-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-3">📸 INSIDE LITTLE BLOSSOMS</span>
          <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800 mb-14">Tour Our Virtual Gallery</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-44 rounded-2xl overflow-hidden shadow-xs">
              <img src="/school1.jpg" className="w-full h-full object-cover hover:scale-105 transition duration-300" alt="Activity room" />
            </div>
            <div className="h-44 rounded-2xl overflow-hidden shadow-xs">
              <img src="/school2.jpg" className="w-full h-full object-cover hover:scale-105 transition duration-300" alt="Smart Class" />
            </div>
            <div className="h-44 rounded-2xl overflow-hidden shadow-xs">
              <img src="/school3.jpg" className="w-full h-full object-cover hover:scale-105 transition duration-300" alt="Sensory play" />
            </div>
            <div className="h-44 rounded-2xl overflow-hidden shadow-xs">
              <img src="/about.jpg" className="w-full h-full object-cover hover:scale-105 transition duration-300" alt="Lawn playground" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
