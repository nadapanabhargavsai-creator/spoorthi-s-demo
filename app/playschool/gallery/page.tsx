"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  src: string;
  category: string;
  title: string;
}

const galleryData: GalleryItem[] = [
  { src: "/facility_smart_class.png", category: "classroom", title: "Smart Classroom Activities" },
  { src: "/facility_computer_lab.png", category: "activities", title: "Learning Computers" },
  { src: "/facility_science_lab.png", category: "activities", title: "Fun Chemistry Colors" },
  { src: "/facility_library.png", category: "classroom", title: "Preschool Reading Lounge" },
  { src: "/facility_sports.png", category: "sports day", title: "Preschool Sports Track" },
  { src: "/school1.jpg", category: "annual day", title: "Children Stage Play" },
  { src: "/school2.jpg", category: "art activities", title: "Origami Craft Workshop" },
  { src: "/school3.jpg", category: "field trips", title: "Toddlers Farm Visit" },
  { src: "/about.jpg", category: "birthday celebrations", title: "Sid's Birthday Celebration" },
  { src: "/banner.jpg", category: "independence day", title: "Flag Hoisting Assembly" },
  { src: "/hero.jpg", category: "sports day", title: "Fun Sliders and Swings" },
  { src: "/program.jpg", category: "dance", title: "Toddlers Dance Choreography" }
];

const categories = [
  { id: "all", label: "All Photos" },
  { id: "classroom", label: "Classrooms" },
  { id: "activities", label: "Activities" },
  { id: "annual day", label: "Annual Day" },
  { id: "sports day", label: "Sports Day" },
  { id: "art activities", label: "Art & Craft" },
  { id: "dance", label: "Dance & Music" },
  { id: "field trips", label: "Field Trips" },
  { id: "birthday celebrations", label: "Celebrations" }
];

export default function PlaySchoolGallery() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filteredData = selectedFilter === "all"
    ? galleryData
    : galleryData.filter(item => item.category === selectedFilter);

  return (
    <main className="bg-[#F8FBFF] overflow-x-hidden pt-28 pb-20">
      
      {/* HERO BANNER */}
      <section className="relative py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full">
            Our Memories
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Campus <span className="text-pink-500">Gallery</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            Catch visual moments of classes, annual events, festivals, field trips, and celebrations.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                selectedFilter === cat.id
                  ? "bg-pink-500 text-white shadow-md shadow-pink-500/10 scale-105"
                  : "bg-white text-slate-500 hover:text-slate-900 border border-slate-100 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* PHOTOS GRID */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, idx) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  onClick={() => setActiveLightbox(item)}
                  className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer border border-slate-100 shadow-sm"
                >
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-white text-xs font-black uppercase tracking-wider">{item.title}</span>
                    <span className="text-pink-300 text-[9px] font-bold uppercase tracking-widest mt-1">{item.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* VIDEO TOUR SECTION */}
      <section className="py-20 px-6 bg-white border-t">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0f4c81] bg-sky-50 px-3 py-1 rounded-full">Video Log</span>
            <h2 className="text-3xl font-black uppercase text-slate-900 mt-3">Play School Video Tour</h2>
            <p className="text-slate-400 text-xs mt-1.5 font-semibold">Walk through our classrooms and playhouses virtually.</p>
          </div>

          <div className="relative rounded-3xl overflow-hidden p-1.5 bg-[#F8FBFF] border border-slate-200 shadow-lg h-[400px]">
            <img src="/banner.jpg" className="w-full h-full object-cover rounded-2xl filter brightness-50" alt="Video cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 rounded-2xl">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:bg-pink-500 hover:text-white transition-colors duration-300">
                <span className="text-3xl ml-1 select-none">▶</span>
              </div>
              <p className="text-white text-[10px] font-black uppercase tracking-widest mt-4">Play Campus Video Log</p>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activeLightbox.src} 
                alt={activeLightbox.title} 
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border"
              />
              <div className="text-center text-white mt-4 space-y-1">
                <h4 className="text-base font-black uppercase tracking-wide">{activeLightbox.title}</h4>
                <p className="text-pink-400 text-xs font-bold uppercase tracking-widest">{activeLightbox.category}</p>
              </div>
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-white text-lg font-bold"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
