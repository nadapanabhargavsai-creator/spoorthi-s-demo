"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: string;
  category: "Classroom" | "Activities" | "Annual Day" | "Sports Day" | "Festivals" | "Arts & Dance";
  subCategory: string;
  src: string;
  title: string;
}

export default function PlayschoolGallery() {
  const categories = ["All", "Classroom", "Activities", "Annual Day", "Sports Day", "Festivals", "Arts & Dance"];
  
  const galleryItems: GalleryItem[] = [
    { id: "g1", category: "Classroom", subCategory: "Smart Class", src: "/school1.jpg", title: "Smart Classroom Learning Session" },
    { id: "g2", category: "Activities", subCategory: "Sensory blocks", src: "/school2.jpg", title: "Indoor Sensory Block Building" },
    { id: "g3", category: "Activities", subCategory: "Art Class", src: "/school3.jpg", title: "Finger Painting & Paper Folding" },
    { id: "g4", category: "Annual Day", subCategory: "Graduation", src: "/about.jpg", title: "Preschool Graduation Celebrations" },
    { id: "g5", category: "Festivals", subCategory: "Independence Day", src: "/program.jpg", title: "Independence Day Tri-color Dress Parade" },
    { id: "g6", category: "Sports Day", subCategory: "Outdoor play", src: "/banner.jpg", title: "Outdoor Relay Race Balancing Beams" },
    { id: "g7", category: "Classroom", subCategory: "Visual Library", src: "/facility_library.png", title: "Quiet Visual Reading Corner" },
    { id: "g8", category: "Arts & Dance", subCategory: "Music room", src: "/facility_smart_class.png", title: "Rhythmic Rhyme Choir rehearsals" }
  ];

  const [activeCat, setActiveCat] = useState("All");
  const [lightboxSrc, setLightboxSrc] = useState<GalleryItem | null>(null);

  const filteredItems = activeCat === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCat);

  return (
    <div className="w-full font-['Quicksand'] pb-20">
      
      {/* ========== HERO BANNER ========== */}
      <section className="bg-gradient-to-r from-sky-100 via-pink-100 to-yellow-100 py-16 px-6 text-center border-b-8 border-dashed border-sky-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 MEDIA GALLERIES</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Interactive Photo & Video Gallery
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Browse snapshots of daily classroom learning, sports, festivals, and child accomplishments.
          </p>
        </div>
      </section>

      {/* ========== FILTERS ========== */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all ${
                activeCat === cat 
                  ? "bg-pink-500 text-white shadow-md scale-105" 
                  : "bg-white border border-slate-100 text-slate-500 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
                onClick={() => setLightboxSrc(item)}
                className="bg-white border-2 border-slate-100 rounded-3xl overflow-hidden shadow-xs cursor-pointer hover:shadow-md hover:border-pink-300 transition-all flex flex-col justify-between"
              >
                {/* Photo container */}
                <div className="h-48 overflow-hidden relative group">
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-3xl text-white">🔍</span>
                  </div>
                </div>

                {/* Caption description */}
                <div className="p-4.5 text-left">
                  <span className="bg-sky-50 text-sky-700 text-[8.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider block self-start mb-1.5 w-max">
                    {item.category} · {item.subCategory}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-tight">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ========== VIDEO TOURS ========== */}
      <section className="bg-gradient-to-r from-sky-50 to-pink-50 py-20 px-6 border-t-8 border-dashed border-sky-100 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-emerald-600 text-xs font-black uppercase tracking-widest block mb-3">📹 VIDEO TOURS</span>
          <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800 mb-6">Take a Virtual Campus Tour</h2>
          <p className="text-gray-500 font-semibold mb-14 text-sm leading-relaxed">
            Watch a walkthrough of our child play spaces, clean rest spaces, and smart rooms.
          </p>

          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-900">
            {/* Embed dummy container with visual overlays */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }}>
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 space-y-4">
                <button className="w-20 h-20 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-3xl font-bold flex items-center justify-center shadow-lg transition-transform hover:scale-110 pl-1.5 focus:outline-none">
                  ▶
                </button>
                <p className="font-['Fredoka'] font-black text-xl uppercase tracking-wider">Virtual Campus Walkthrough Tour</p>
                <p className="text-xs text-gray-300 font-bold">Duration: 3 minutes 24 seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== LIGHTBOX MODAL ========== */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxSrc(null)}
            className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-6"
          >
            <button className="absolute top-6 right-6 text-white text-3xl font-bold" onClick={() => setLightboxSrc(null)}>
              ✕
            </button>
            
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <div className="max-h-[70vh] overflow-hidden">
                <img src={lightboxSrc.src} alt={lightboxSrc.title} className="w-full h-full object-contain" />
              </div>
              <div className="p-6 text-left border-t border-slate-100">
                <span className="bg-pink-50 text-pink-700 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider block mb-2 w-max">
                  {lightboxSrc.category} · {lightboxSrc.subCategory}
                </span>
                <h3 className="font-['Fredoka'] font-black text-slate-800 text-lg">{lightboxSrc.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
