"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ───────────────────── animation variants ───────────────────── */
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* ═══════════════════  DATA DEFINITIONS  ═══════════════════ */
const CATEGORIES = [
  "All",
  "Campus",
  "Classrooms",
  "Sports",
  "Annual Day",
  "Science Exhibition",
  "Cultural Events",
  "Field Trips",
  "Celebrations",
  "Independence Day",
  "Republic Day",
  "Children's Day",
  "Teachers Day",
  "Graduation Day"
] as const;

type Category = typeof CATEGORIES[number];

interface MediaItem {
  id: number;
  src: string;
  category: Exclude<Category, "All">;
  title: string;
  desc: string;
}

const GALLERY_ITEMS: MediaItem[] = [
  { id: 1, src: "/school1.jpg", category: "Campus", title: "Main Academic Block", desc: "Spacious multi-floor academic building surrounded by greenery." },
  { id: 2, src: "/school2.jpg", category: "Campus", title: "Play Area & Courtyard", desc: "Equipped with child-friendly outdoor play structures." },
  { id: 3, src: "/facility_smart_class.png", category: "Classrooms", title: "Interactive Smart Classroom", desc: "Digital screens simplifying complex syllabus worksheets." },
  { id: 4, src: "/facility_sports.png", category: "Sports", title: "Sports Field Practice", desc: "Students engaged in cricket and fitness sessions." },
  { id: 5, src: "/school3.jpg", category: "Annual Day", title: "Annual Day Performances", desc: "Vibrant traditional dance performances on stage." },
  { id: 6, src: "/facility_science_lab.png", category: "Science Exhibition", title: "Physics Lab Project", desc: "Working models demonstrating basic electricity principles." },
  { id: 7, src: "/about.jpg", category: "Cultural Events", title: "Cultural Music Showcase", desc: "Student choir performance during special assemblies." },
  { id: 8, src: "/program.jpg", category: "Field Trips", title: "Educational Zoo Visit", desc: "Learning about local wildlife species and biodiversity." },
  { id: 9, src: "/hero.jpg", category: "Celebrations", title: "Festival Gatherings", desc: "Celebrating traditional harvest festivals on campus." },
  { id: 10, src: "/banner.jpg", category: "Independence Day", title: "Flag Hoisting Ceremony", desc: "Independence Day patriotic songs and drills." },
  { id: 11, src: "/hero.jpg", category: "Republic Day", title: "Republic Day Parades", desc: "Outdoor physical education drills and speech sessions." },
  { id: 12, src: "/school2.jpg", category: "Children's Day", title: "Children's Day Fun Games", desc: "Special races and magic shows organised for students." },
  { id: 13, src: "/school1.jpg", category: "Teachers Day", title: "Teachers Day Assembly", desc: "Students presenting cards and gifts to educators." },
  { id: 14, src: "/about.jpg", category: "Graduation Day", title: "Kindergarten Graduation", desc: "Preschoolers receiving their certificates in caps." },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const filteredItems = selectedCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prevIndex => {
      const idx = prevIndex === 0 ? filteredItems.length - 1 : (prevIndex ?? 0) - 1;
      return idx;
    });
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prevIndex => {
      const idx = prevIndex === filteredItems.length - 1 ? 0 : (prevIndex ?? 0) + 1;
      return idx;
    });
  };

  return (
    <main className="overflow-hidden bg-slate-50/50">
      {/* ═══════════════════  HERO BANNER  ═══════════════════ */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="/school1.jpg"
            alt="Spoorthi's School Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90" />
        </div>

        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 text-center px-6 py-24 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-sm text-white/70 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-yellow-400 font-semibold">Gallery</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs font-bold text-yellow-300 uppercase tracking-widest">Campus Life in Frames</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-6"
          >
            Our Media <span className="text-yellow-400">Gallery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Explore snapshots of classroom studies, sporting drills, annual days, and various cultural event celebrations.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════  IMAGE GALLERY & FILTERING  ═══════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-105"
                    : "bg-slate-50 text-gray-500 hover:bg-slate-100 border border-gray-200/60"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Layout Grid */}
          <motion.div
            layout
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={scaleUp}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="relative group rounded-3xl overflow-hidden shadow-md cursor-pointer border border-slate-100 hover:shadow-2xl transition-all duration-300 break-inside-avoid"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8" />
                  
                  {/* Text details overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest bg-yellow-450/10 border border-yellow-400/25 px-2.5 py-1 rounded-full self-start mb-3">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-black leading-tight mb-1">{item.title}</h3>
                    <p className="text-white/70 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  VIDEO GALLERY  ═══════════════════ */}
      <section className="py-24 px-6 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              Watch
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Video <span className="text-yellow-500">Gallery</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Enjoy virtual video walkthroughs and event highlights directly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Video Card 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleUp}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-150 relative group cursor-pointer"
              onClick={() => setVideoOpen(true)}
            >
              <div className="h-64 relative overflow-hidden bg-black">
                <img
                  src="/school1.jpg"
                  alt="Campus Tour Play Banner"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-black/30" />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-500 text-black flex items-center justify-center text-xl font-bold shadow-lg shadow-yellow-500/25 group-hover:scale-110 transition-transform">
                    ▶
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-gray-900 mb-2">Official Campus Tour</h3>
                <p className="text-xs text-gray-500">A virtual walkthrough of our digital classrooms, play area, and laboratories.</p>
              </div>
            </motion.div>

            {/* Video Card 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleUp}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-150 relative group cursor-pointer"
              onClick={() => setVideoOpen(true)}
            >
              <div className="h-64 relative overflow-hidden bg-black">
                <img
                  src="/school3.jpg"
                  alt="Annual Day Highlights"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-black/30" />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-500 text-black flex items-center justify-center text-xl font-bold shadow-lg shadow-yellow-500/25 group-hover:scale-110 transition-transform">
                    ▶
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-gray-900 mb-2">Annual Day Highlights</h3>
                <p className="text-xs text-gray-500">Watch our elementary students present their creative dances, choirs, and plays.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════  ADMISSION CALL TO ACTION  ═══════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-400 bg-yellow-400/10 px-4 py-2 rounded-full mb-6">
            Admissions Active
          </span>
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Give Your Child the <span className="text-yellow-400">Spoorthi Advantage</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ensure your child builds comprehensive logical thinking patterns in LKG, UKG, Nursery, or Primary school.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="bg-yellow-500 text-black px-10 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/30 flex items-center gap-2"
            >
              Apply Online Now
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-10 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════  LIGHTBOX MODAL  ═══════════════════ */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/95 flex flex-col items-center justify-center p-4 select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-8 text-white/70 hover:text-white font-black text-3xl transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Left Prev Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-6 text-white/50 hover:text-white text-4xl font-bold cursor-pointer transition-colors p-4 hidden sm:block"
            >
              ‹
            </button>

            {/* Right Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-6 text-white/50 hover:text-white text-4xl font-bold cursor-pointer transition-colors p-4 hidden sm:block"
            >
              ›
            </button>

            {/* Image card wrapper */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[75vh] flex flex-col items-center justify-center p-2 relative"
            >
              <img
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/5"
              />
            </motion.div>

            {/* Image details footer overlay */}
            <div className="text-center mt-6 max-w-lg">
              <span className="text-[10px] font-black text-yellow-450 bg-yellow-400/10 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                {filteredItems[lightboxIndex].category}
              </span>
              <h4 className="text-white text-lg font-black leading-tight mb-1">
                {filteredItems[lightboxIndex].title}
              </h4>
              <p className="text-white/60 text-xs leading-relaxed">
                {filteredItems[lightboxIndex].desc}
              </p>
            </div>

            {/* Mobile swipe indicator controls */}
            <div className="flex gap-4 mt-6 sm:hidden">
              <button onClick={handlePrev} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm">‹ Prev</button>
              <button onClick={handleNext} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm">Next ›</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════  VIDEO MODAL PLAYER  ═══════════════════ */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/95 flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-6 right-8 text-white/70 hover:text-white font-black text-3xl cursor-pointer"
            >
              ✕
            </button>

            {/* Simulated player content since there are no actual dynamic video streams */}
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="max-w-3xl w-full rounded-3xl overflow-hidden aspect-video bg-black flex flex-col justify-center items-center p-8 border border-white/10 text-center relative"
            >
              {/* Spinner/Play Loader */}
              <div className="w-16 h-16 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin mb-6" />
              <h3 className="text-white text-xl font-black mb-2">Connecting to Video Stream...</h3>
              <p className="text-white/60 text-xs leading-relaxed max-w-sm">
                The school campus walkthrough video player is initializing local resources. Please check back in a moment.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
