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
const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* ───────────────────── FAQ Accordion Component ───────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      className="border border-gray-200 rounded-2xl overflow-hidden hover:border-yellow-400 transition-colors duration-300 bg-white"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="font-semibold text-gray-800 pr-4 group-hover:text-yellow-600 transition-colors">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="shrink-0 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xl font-bold"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-gray-600 leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function AcademicsPage() {
  const [selectedClassGroup, setSelectedClassGroup] = useState<"primary" | "preprimary">("preprimary");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (syllabusName: string) => {
    setDownloadSuccess(syllabusName);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <main className="overflow-hidden bg-slate-50/50">
      {/* ═══════════════════  HERO BANNER  ═══════════════════ */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="/facilities_hero.png"
            alt="Spoorthi's The Duckling Academics Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />
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
            <span className="text-yellow-400 font-semibold">Academics</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs font-bold text-yellow-300 uppercase tracking-widest">Nurturing Minds · Nursery to Grade 7</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-6"
          >
            Academic <span className="text-yellow-400">Excellence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Empowering students with a structured CBSE curriculum, advanced smart learning resources, and practical methodologies for lifelong growth.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════  CURRICULUM OVERVIEW  ═══════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Image/Visual side */}
            <motion.div variants={fadeLeft} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="/program.jpg"
                  alt="Spoorthi's classroom learning"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-yellow-500 text-black rounded-2xl p-6 shadow-xl max-w-xs">
                <p className="text-lg font-black uppercase tracking-wider mb-1">CBSE Standard</p>
                <p className="text-sm text-black/80 font-medium">Integrated with activity-based learning benchmarks.</p>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border-4 border-yellow-400/30" />
            </motion.div>

            {/* Text side */}
            <motion.div variants={fadeRight}>
              <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-6">
                Curriculum Overview
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                A Holistic <span className="text-yellow-500">Learning Framework</span>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  At <strong className="text-gray-900">Spoorthi&apos;s The Duckling</strong>, our academic framework is built around the CBSE curriculum, enriched with international teaching methods. We believe that true learning goes beyond rote memorization; it is about developing thinking skills, creative exploration, and problem-solving capacities.
                </p>
                <p>
                  Our pre-primary and primary educational methodologies stimulate cognitive development, language proficiency, and socio-emotional readiness. Every subject is linked with interactive activities, digital visuals, and laboratory practice to foster deep comprehension.
                </p>
              </div>

              {/* Dynamic highlights */}
              <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-150">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0 font-bold">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Interactive Content</h4>
                    <p className="text-sm text-gray-500">Digitally loaded classrooms.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0 font-bold">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Child-Centric</h4>
                    <p className="text-sm text-gray-500">Focus on individual capability.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  CLASSES OFFERED  ═══════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              Academic Levels
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Classes <span className="text-yellow-500">Offered</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Nurturing educational environments specifically tailored for various age brackets.
            </p>

            {/* Selector buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setSelectedClassGroup("preprimary")}
                className={`px-6 py-3 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 ${
                  selectedClassGroup === "preprimary"
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Pre-Primary (Early Years)
              </button>
              <button
                onClick={() => setSelectedClassGroup("primary")}
                className={`px-6 py-3 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 ${
                  selectedClassGroup === "primary"
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Primary School (Grades 1-7)
              </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {selectedClassGroup === "preprimary" ? (
              <motion.div
                key="preprimary"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-3 gap-8"
              >
                {[
                  {
                    title: "Nursery",
                    age: "2.5 – 3.5 Years",
                    desc: "An introduction to schooling through play, socialization, basic vocabulary, and sensory development in a warm environment.",
                    subjects: ["Motor Skills Development", "Phonetic Play", "Sensory Awareness Activities", "Visual Arts & Music Interaction"],
                    color: "border-t-4 border-t-yellow-500",
                  },
                  {
                    title: "Lower Kindergarten (LKG)",
                    age: "3.5 – 4.5 Years",
                    desc: "Step-by-step introduction to structured learning, basic alphabets, numbers, and creative interactive assignments.",
                    subjects: ["Early Literacy & Alphabets", "Basic Numeracy & Count", "Environmental Play", "Creative Expression & Craft"],
                    color: "border-t-4 border-t-blue-500",
                  },
                  {
                    title: "Upper Kindergarten (UKG)",
                    age: "4.5 – 5.5 Years",
                    desc: "Preparing our young learners for elementary primary classes. Focus on writing skills, sentence structures, and basic math.",
                    subjects: ["English Language Readiness", "Elementary Math concepts", "General EVS", "Fine Arts & Activity Sessions"],
                    color: "border-t-4 border-t-red-500",
                  },
                ].map((c) => (
                  <div key={c.title} className={`bg-white rounded-3xl p-8 shadow-xl border border-gray-100 ${c.color} flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-black text-gray-900">{c.title}</h3>
                        <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">{c.age}</span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">{c.desc}</p>
                      <div className="border-t border-gray-100 pt-6">
                        <p className="text-xs font-black text-gray-800 uppercase tracking-wider mb-3">Key Learning Areas</p>
                        <ul className="space-y-2">
                          {c.subjects.map((sub) => (
                            <li key={sub} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                              {sub}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(`${c.title} Syllabus`)}
                      className="w-full mt-8 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl hover:bg-yellow-500 hover:text-black transition-colors"
                    >
                      Download Syllabus
                    </button>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="primary"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {[
                  { g: "Grade 1 - 2", age: "6 – 8 Years", desc: "Builds a smooth bridge between pre-primary and structured core classroom learning.", syl: "Grade 1-2 Syllabus" },
                  { g: "Grade 3 - 4", age: "8 – 10 Years", desc: "Fosters self-learning habits, analytical thinking, and foundational language concepts.", syl: "Grade 3-4 Syllabus" },
                  { g: "Grade 5", age: "10 – 11 Years", desc: "Introduces advanced scientific principles, history contexts, and complex math formulas.", syl: "Grade 5 Syllabus" },
                  { g: "Grade 6 - 7", age: "11 – 13 Years", desc: "Equips students for middle school through rigorous laboratory sessions and projects.", syl: "Grade 6-7 Syllabus" },
                ].map((gr) => (
                  <div key={gr.g} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="mb-4">
                        <span className="text-[10px] font-black text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{gr.age}</span>
                        <h3 className="text-xl font-black text-gray-900 mt-3">{gr.g}</h3>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-6">{gr.desc}</p>
                    </div>
                    <button
                      onClick={() => handleDownload(gr.syl)}
                      className="w-full bg-gray-900 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl hover:bg-yellow-500 hover:text-black transition-colors"
                    >
                      Download Syllabus
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Syllabus Download confirmation toast */}
          <AnimatePresence>
            {downloadSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="fixed bottom-10 right-10 z-[150] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-yellow-500/20"
              >
                <div className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold">✓</div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Download Initiated</p>
                  <p className="text-sm font-semibold text-white">{downloadSuccess} PDF is loading...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════  SUBJECTS  ═══════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              Academic Core
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Subjects We <span className="text-yellow-500">Teach</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              A comprehensive selection of courses promoting analytical reasoning, linguistic fluency, and aesthetic values.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { sub: "English", icon: "📚", color: "from-blue-500 to-cyan-500", desc: "Grammar structures, composition, poetry, and fluent reading skills to excel in communication." },
              { sub: "Mathematics", icon: "📐", color: "from-yellow-500 to-amber-500", desc: "Logical math operations, arithmetic progressions, algebra foundation, and geometry drills." },
              { sub: "Science", icon: "🔬", color: "from-emerald-500 to-teal-500", desc: "In-depth look at natural processes, biological concepts, mechanics, and laboratory-based experiments." },
              { sub: "Social Studies", icon: "🌍", color: "from-indigo-500 to-violet-500", desc: "Understanding domestic and global history, geographical concepts, and civic rules and responsibilities." },
              { sub: "Computer Science", icon: "💻", color: "from-purple-500 to-fuchsia-500", desc: "Practical hands-on software applications, logic structure, internet ethics, and elementary coding." },
              { sub: "General Knowledge", icon: "🧠", color: "from-rose-500 to-pink-500", desc: "Current affairs, scientific history facts, global cultures, and logic quizzes to keep minds active." },
              { sub: "Arts", icon: "🎨", color: "from-orange-500 to-red-500", desc: "Watercolor painting, sketch styles, papercraft, clay shaping, and general exhibition creation." },
              { sub: "Music", icon: "🎵", color: "from-pink-500 to-rose-500", desc: "Vocal tuning exercises, nursery songs, playing basic keyboards, and general rhythm sessions." },
              { sub: "Physical Education", icon: "⚽", color: "from-green-500 to-emerald-500", desc: "Structured athletic drill guidelines, indoor and outdoor field games, team communication, and general fitness." },
            ].map((item, idx) => (
              <motion.div
                key={item.sub}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex items-start gap-5"
              >
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">{item.sub}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  TEACHING METHODOLOGY  ═══════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,yellow-500/10,transparent_40%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-400 bg-yellow-400/10 px-4 py-2 rounded-full mb-4">
              Pedagogic Focus
            </span>
            <h2 className="text-4xl md:text-5xl font-black">
              Teaching <span className="text-yellow-400">Methodology</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              How we construct educational courses to ensure children learn logically, practically, and collaboratively.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Smart Learning", icon: "🧠", desc: "Interactive display modules simplify complex abstract theorems visually." },
              { title: "Digital Classes", icon: "🖥️", desc: "Rich audio-visual systems help maintain children's absolute focus." },
              { title: "Activity Based", icon: "🎭", desc: "Roleplay, games, and creative construction for early foundation years." },
              { title: "Project Based", icon: "📋", desc: "Team-driven assignments help foster cooperative work patterns." },
              { title: "Practical Learning", icon: "🔧", desc: "Hands-on lab experiments for scientific and computational concepts." },
            ].map((m, idx) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl mb-4 bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center">{m.icon}</div>
                <h3 className="text-lg font-black text-yellow-400 mb-3">{m.title}</h3>
                <p className="text-gray-300 text-xs leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  ACADEMIC CALENDAR  ═══════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              Planner
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Academic <span className="text-yellow-500">Calendar Overview</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Important events, milestones, and break schedules for the current academic session.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { term: "Term 1 (June – September)", bg: "border-l-4 border-l-yellow-500", events: ["School Reopening: First Week of June", "Investiture Ceremony: Late June", "Periodic Test I: Late July", "Independence Day Celebration: August 15", "Term 1 Examination: Mid September"] },
              { term: "Term 2 (October – December)", bg: "border-l-4 border-l-blue-500", events: ["Dussera Vacation: 10 Days in October", "Annual Sports Meet: Mid November", "Periodic Test II: Late November", "Science & Art Exhibition: Early December", "Christmas Holidays: Late December"] },
              { term: "Term 3 (January – April)", bg: "border-l-4 border-l-emerald-500", events: ["School Reopens: Early January", "Republic Day Drill: January 26", "Periodic Test III: Late February", "Annual Examination: Mid March", "Declaration of Results & Summer Vacation: Early April"] },
            ].map((termData, idx) => (
              <motion.div
                key={termData.term}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-slate-50 rounded-3xl p-8 border border-gray-100 ${termData.bg} shadow-sm hover:shadow-md transition-shadow`}
              >
                <h3 className="text-lg font-black text-gray-900 mb-6">{termData.term}</h3>
                <div className="space-y-4">
                  {termData.events.map((ev, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 shrink-0 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-gray-700 shadow-sm">{i + 1}</span>
                      <p className="text-xs text-gray-600 leading-relaxed font-semibold">{ev}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  ASSESSMENT & HOMEWORK & TIMINGS  ═══════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Assessment System */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center mb-6 text-yellow-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Assessment System</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  We implement Continuous and Comprehensive Evaluation (CCE) following CBSE guidelines. Feedback systems measure scholastic achievements alongside practical skill competencies.
                </p>
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-600"><span className="text-gray-400">Periodic Tests:</span> <span>3 Times / Year</span></div>
                  <div className="flex justify-between text-xs font-bold text-gray-600"><span className="text-gray-400">Term Assessments:</span> <span>2 Evaluations</span></div>
                  <div className="flex justify-between text-xs font-bold text-gray-600"><span className="text-gray-400">Socio-Emotional Profile:</span> <span>Grade Cards</span></div>
                </div>
              </div>
            </motion.div>

            {/* Homework Policy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Homework Policy</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Homework is designed as reinforcement, avoiding educational overload. Pre-primary has no mandatory written home tasks. Primary assignments take less than 45 mins.
                </p>
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-600"><span className="text-gray-400">Pre-Primary (LKG/UKG):</span> <span>Fun Reading Only</span></div>
                  <div className="flex justify-between text-xs font-bold text-gray-600"><span className="text-gray-400">Grades 1 to 4:</span> <span>Max 30 Mins Daily</span></div>
                  <div className="flex justify-between text-xs font-bold text-gray-600"><span className="text-gray-400">Grades 5 to 7:</span> <span>Max 45 Mins Daily</span></div>
                </div>
              </div>
            </motion.div>

            {/* School Timings */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 text-emerald-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">School Timings</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Optimal session hours guarantee balanced physical activity, creative instruction, and rigorous classroom attention spans for all age groups.
                </p>
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-600"><span className="text-gray-400">Pre-Primary (Mon-Fri):</span> <span>8:30 AM – 12:30 PM</span></div>
                  <div className="flex justify-between text-xs font-bold text-gray-600"><span className="text-gray-400">Primary (Mon-Fri):</span> <span>8:15 AM – 3:15 PM</span></div>
                  <div className="flex justify-between text-xs font-bold text-gray-600"><span className="text-gray-400">Saturday Schedule:</span> <span>8:15 AM – 12:15 PM</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════  INFRASTRUCTURE (LIBRARY / LABS)  ═══════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              Facilities
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Labs & Learning <span className="text-yellow-500">Spaces</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Our campus boasts modern infrastructure with spacious labs to enhance classroom learning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Library */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={scaleUp}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col group"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src="/facility_library.png"
                  alt="School Library"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-3">School Library</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  A library equipped with age-appropriate storybooks, scientific guides, elementary fiction, reference journals, and research encyclopedia volumes.
                </p>
              </div>
            </motion.div>

            {/* Computer Lab */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={scaleUp}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col group"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src="/facility_computer_lab.png"
                  alt="Computer Lab"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-3">Computer Lab</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Dedicated computer lab featuring modern systems, local educational software, interactive logical applications, and supervised typing programs.
                </p>
              </div>
            </motion.div>

            {/* Science Lab */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={scaleUp}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col group"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src="/facility_science_lab.png"
                  alt="Science Lab"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-3">Science Lab</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Advanced primary lab tools for simple biology showcases, fundamental chemical interactions, and mechanical setups, safely guided by trained instructors.
                </p>
              </div>
            </motion.div>

            {/* Maths Lab */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={scaleUp}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col group"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src="/facility_math_lab.png"
                  alt="Maths Lab"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-3">Maths Lab</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  An interactive math laboratory equipped with geometric models, logical puzzles, abacus tools, and tactile kits designed to make abstract mathematical concepts visual and enjoyable.
                </p>
              </div>
            </motion.div>

            {/* English Lab */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={scaleUp}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col group"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src="/facility_english_lab.png"
                  alt="English Lab"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-3">English Lab</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  A modern language lab offering audio-visual communication software, digital headsets, and speech-interactive tools to build fluent reading, pronunciation, and vocabulary skills.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════  LEARNING RESOURCES  ═══════════════════ */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              Resources
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Learning <span className="text-yellow-500">Resources</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Our comprehensive resources are designed to ensure children receive academic support, parent feedback, and reading access.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Parent-Teacher Portal", icon: "👨‍👩‍👧‍👦", desc: "A dashboard for tracking homework lists, performance profiles, and fee notifications." },
              { title: "Audio Book Library", icon: "🎧", desc: "Digital audio story collections targeting phonetic pronunciations for early LKG/UKG years." },
              { title: "Worksheets Portal", icon: "📝", desc: "Downloadable activity sheets for mathematics, coloring, writing, and logical riddles." },
              { title: "Educational Games", icon: "🎮", desc: "Curated learning apps and computer games to develop coordination and spelling capabilities." },
            ].map((res, idx) => (
              <motion.div
                key={res.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg text-center"
              >
                <div className="text-4xl mb-4 bg-yellow-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto text-yellow-600">{res.icon}</div>
                <h4 className="font-black text-gray-900 text-lg mb-3">{res.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{res.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  FAQS  ═══════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              Academics FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Frequently Asked <span className="text-yellow-500">Questions</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="space-y-4"
          >
            <FAQItem
              q="Does the school follow CBSE curriculum strictly?"
              a="Yes, Spoorthi's The Duckling follows the Central Board of Secondary Education (CBSE) syllabus guidelines, integrated with practical, experiential activities for young learners."
            />
            <FAQItem
              q="Are digital facilities used in daily learning?"
              a="Absolutely! All class blocks are equipped with digital screens and interactive modules. Teachers use pre-installed, animative modules to visualize scientific and geographical concepts."
            />
            <FAQItem
              q="How often are parents informed about educational development?"
              a="We hold Parent-Teacher Meetings (PTM) after every periodic evaluation. Detailed reports detailing homework logs, class participation, and behavioral patterns are shared via our portals."
            />
            <FAQItem
              q="Is there support for slow learners?"
              a="Yes, we conduct dedicated remedial classes and customized worksheet tasks under the teacher's individual guidance to assist students needing extra conceptual support."
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  ADMISSION CTA  ═══════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-400 bg-yellow-400/10 px-4 py-2 rounded-full mb-6">
              Admissions Open
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Nurture Your Child&apos;s <span className="text-yellow-400">Academic Potential</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ensure your child builds a robust educational foundation. Applications for Nursery to Grade 7 admissions are active for the new academic session.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="bg-yellow-500 text-black px-10 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/30 flex items-center gap-2"
            >
              Apply Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-10 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              Contact Academics Coordinator
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
