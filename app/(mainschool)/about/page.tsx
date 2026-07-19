"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

/* ───────────────────── animated counter hook ───────────────────── */
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return { count, ref };
}

/* ───────────────────── FAQ accordion item ───────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      className="border border-gray-200 rounded-2xl overflow-hidden hover:border-yellow-400 transition-colors duration-300"
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

/* ═══════════════════════════════════════════════════════════════ */
/*                        ABOUT PAGE                             */
/* ═══════════════════════════════════════════════════════════════ */
export default function AboutPage() {

  /* ─── counter data ─── */
  const yearsCounter   = useCounter(5);
  const studentsCounter = useCounter(1200);
  const teachersCounter = useCounter(75);
  const classroomsCounter = useCounter(40);
  const awardsCounter  = useCounter(25);

  return (
    <main className="overflow-hidden">

      {/* ═══════════════════  HERO BANNER  ═══════════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/about.jpg"
            alt="Spoorthi's The Duckling School Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-red-500/10 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-32 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-sm text-white/70 mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Home
            </Link>
            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-yellow-400 font-semibold">About</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs font-bold text-yellow-300 uppercase tracking-widest">Est. 2020 · Hyderabad</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-6"
          >
            About <span className="text-yellow-400">Our School</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            At Spoorthi&apos;s The Duckling, we believe every child is a unique learner. Our school provides a nurturing
            environment where young minds blossom with knowledge, creativity, and confidence.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mx-auto w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
            >
              <div className="w-1.5 h-3 rounded-full bg-yellow-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  SCHOOL INTRODUCTION  ═══════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Image side */}
            <motion.div variants={fadeLeft} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/school1.jpg"
                  alt="Spoorthi's The Duckling campus"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-yellow-500 text-black rounded-2xl p-6 shadow-xl"
              >
                <p className="text-4xl font-black">5+</p>
                <p className="text-sm font-bold uppercase tracking-wider">Years of Excellence</p>
              </motion.div>
              {/* Decorative circle */}
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-4 border-yellow-400/30" />
            </motion.div>

            {/* Text side */}
            <motion.div variants={fadeRight}>
              <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-6">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                A Legacy of <span className="text-yellow-500">Educational Excellence</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, <strong className="text-gray-900">Spoorthi&apos;s The Duckling</strong> has grown from a humble beginning
                  in Papi Reddy Nagar, Hyderabad, into one of the most sought-after schools in the region.
                  Our journey has been marked by a relentless pursuit of excellence and an unwavering commitment
                  to nurturing every child&apos;s potential.
                </p>
                <p>
                  Our educational philosophy centres around the belief that every child learns differently.
                  We blend the rigor of the CBSE curriculum with activity-based learning, ensuring students
                  develop not just academically, but also emotionally and socially.
                </p>
                <p>
                  From state-of-the-art smart classrooms to expansive play areas, from experienced faculty
                  to personalized attention — we have built an ecosystem where curiosity is celebrated
                  and confidence is cultivated.
                </p>
              </div>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-100">
                {[
                  { label: "Students", value: "1200+" },
                  { label: "Faculty Members", value: "75+" },
                  { label: "Programs", value: "10+" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-black text-yellow-500">{s.value}</p>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════  PRINCIPAL'S MESSAGE  ═══════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid lg:grid-cols-5 gap-16 items-center"
          >
            {/* Image */}
            <motion.div variants={fadeLeft} className="lg:col-span-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl transform rotate-3 scale-105" />
                <div className="relative w-72 h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-amber-50 flex flex-col items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-yellow-200 flex items-center justify-center mb-4">
                      <svg className="w-16 h-16 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <p className="text-sm font-bold text-yellow-700">Principal</p>
                    <p className="text-xs text-yellow-600/60 mt-1">Spoorthi&apos;s The Duckling</p>
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black rounded-full px-5 py-2 shadow-lg">
                  <p className="text-xs font-black uppercase tracking-wider">Principal</p>
                </div>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeRight} className="lg:col-span-3">
              <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-6">
                Principal&apos;s Desk
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                A Warm <span className="text-yellow-500">Welcome</span>
              </h2>
              <div className="relative pl-6 border-l-4 border-yellow-400">
                <svg className="absolute -left-4 -top-2 w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                <p className="text-gray-600 leading-relaxed text-lg mb-4">
                  Welcome to Spoorthi&apos;s The Duckling, where every child&apos;s journey begins with a spark of curiosity
                  and grows into a flame of knowledge. As the Principal of this esteemed institution, I take
                  immense pride in our dedicated team of educators who go above and beyond to ensure that
                  each student receives the attention and guidance they deserve.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  Our curriculum is designed to challenge minds, inspire creativity, and build character.
                  We believe in education that goes beyond textbooks — education that prepares our students
                  for life&apos;s challenges while keeping alive their innate sense of wonder and joy.
                </p>
              </div>
              {/* Signature */}
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </div>
                <div>
                  <p className="font-black text-gray-900">The Principal</p>
                  <p className="text-sm text-gray-500">Spoorthi&apos;s The Duckling, Hyderabad</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  CHAIRMAN / FOUNDER MESSAGE  ═══════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid lg:grid-cols-5 gap-16 items-center"
          >
            {/* Message */}
            <motion.div variants={fadeLeft} className="lg:col-span-3 order-2 lg:order-1">
              <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-400 bg-yellow-400/10 px-4 py-2 rounded-full mb-6">
                Founder&apos;s Vision
              </span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                Building <span className="text-yellow-400">Tomorrow&apos;s</span> Leaders
              </h2>
              <div className="relative pl-6 border-l-4 border-yellow-400/50">
                <p className="text-gray-300 leading-relaxed text-lg mb-4">
                  When I envisioned Spoorthi&apos;s The Duckling, I dreamt of a school that would be more
                  than just a place of learning. I wanted to create a sanctuary where children feel safe,
                  inspired, and empowered to dream big.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg mb-4">
                  Today, seeing our students excel not only in academics but also in sports, arts, and
                  community service fills my heart with immense pride. Our goal has always been to
                  provide world-class education at affordable costs, ensuring that quality education
                  is accessible to every family.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Together, let us continue to shape a future where our children stand tall as leaders,
                  innovators, and compassionate human beings.
                </p>
              </div>
              {/* Signature */}
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                </div>
                <div>
                  <p className="font-black text-white">The Founder & Chairman</p>
                  <p className="text-sm text-gray-400">Spoorthi&apos;s The Duckling, Hyderabad</p>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div variants={fadeRight} className="lg:col-span-2 flex justify-center order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-red-500 rounded-3xl transform -rotate-3 scale-105 opacity-80" />
                <div className="relative w-72 h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-gray-600 flex items-center justify-center mb-4">
                      <svg className="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <p className="text-sm font-bold text-yellow-400">Founder & Chairman</p>
                    <p className="text-xs text-gray-400 mt-1">Spoorthi&apos;s The Duckling</p>
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-full px-5 py-2 shadow-lg">
                  <p className="text-xs font-black uppercase tracking-wider">Chairman</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  WHY CHOOSE US  ═══════════════════ */}
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
              Our Strengths
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Why Choose <span className="text-yellow-500">Our School</span>?
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              We provide a holistic educational experience that nurtures every aspect of your child&apos;s development.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: "👨‍🏫", title: "Experienced Teachers", desc: "Highly qualified and passionate educators with years of teaching excellence", color: "from-blue-500 to-indigo-600" },
              { icon: "🖥️", title: "Smart Classrooms", desc: "Interactive digital boards and modern technology-driven learning spaces", color: "from-purple-500 to-violet-600" },
              { icon: "🛡️", title: "Safe Campus", desc: "24/7 CCTV surveillance, secure entry points, and trained safety personnel", color: "from-emerald-500 to-green-600" },
              { icon: "🎨", title: "Activity Based Learning", desc: "Hands-on projects, experiments, and creative workshops for deeper understanding", color: "from-orange-500 to-red-500" },
              { icon: "🎯", title: "Individual Attention", desc: "Optimal student-teacher ratio ensuring personalized guidance for every child", color: "from-pink-500 to-rose-600" },
              { icon: "💻", title: "Digital Education", desc: "Computer labs, coding classes, and digital literacy from an early age", color: "from-cyan-500 to-blue-600" },
              { icon: "💰", title: "Affordable Education", desc: "World-class education accessible to all families at competitive fee structures", color: "from-yellow-500 to-amber-600" },
              { icon: "🏆", title: "Excellent Results", desc: "Consistently outstanding academic results and all-round achievements", color: "from-red-500 to-pink-600" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={scaleUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
              >
                {/* Gradient hover background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                <div className="relative z-10">
                  <div className="text-5xl mb-5">{item.icon}</div>
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-white transition-colors duration-500 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  SCHOOL HIGHLIGHTS (COUNTERS)  ═══════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: "radial-gradient(circle, black 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-black">
              School Highlights
            </h2>
            <p className="text-black/60 mt-4 font-medium">Numbers that speak for our commitment to excellence</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { ref: yearsCounter.ref, count: yearsCounter.count, suffix: "+", label: "Years of Excellence", icon: "🏫" },
              { ref: studentsCounter.ref, count: studentsCounter.count, suffix: "+", label: "Happy Students", icon: "🎓" },
              { ref: teachersCounter.ref, count: teachersCounter.count, suffix: "+", label: "Expert Teachers", icon: "👨‍🏫" },
              { ref: classroomsCounter.ref, count: classroomsCounter.count, suffix: "+", label: "Smart Classrooms", icon: "🖥️" },
              { ref: awardsCounter.ref, count: awardsCounter.count, suffix: "+", label: "Awards Won", icon: "🏆" },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                ref={item.ref}
                className="text-center bg-white/20 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/40 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-4xl md:text-5xl font-black text-black">
                  {item.count.toLocaleString()}{item.suffix}
                </p>
                <p className="text-sm font-bold text-black/70 mt-2 uppercase tracking-wider">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  CORE VALUES  ═══════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              What We Stand For
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Our Core <span className="text-yellow-500">Values</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, title: "Discipline", desc: "Building self-discipline and responsibility that extends beyond the classroom into everyday life.", color: "text-blue-500", bg: "bg-blue-50" },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>, title: "Integrity", desc: "Fostering honesty, transparency, and strong moral principles in every student.", color: "text-red-500", bg: "bg-red-50" },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: "Respect", desc: "Encouraging mutual respect, empathy, and understanding among students, teachers, and community.", color: "text-green-500", bg: "bg-green-50" },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>, title: "Leadership", desc: "Developing confident leaders who inspire change and make a positive impact on the world.", color: "text-purple-500", bg: "bg-purple-50" },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: "Creativity", desc: "Nurturing imagination and creative expression through arts, music, drama, and innovative thinking.", color: "text-orange-500", bg: "bg-orange-50" },
              { icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, title: "Innovation", desc: "Embracing new ideas, technology, and forward-thinking approaches to education and problem-solving.", color: "text-yellow-500", bg: "bg-yellow-50" },
            ].map((val) => (
              <motion.div
                key={val.title}
                variants={scaleUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className={`w-16 h-16 rounded-2xl ${val.bg} flex items-center justify-center mb-6 ${val.color} group-hover:scale-110 transition-transform duration-300`}>
                  {val.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{val.title}</h3>
                <p className="text-gray-500 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  SCHOOL INFRASTRUCTURE PREVIEW  ═══════════════════ */}
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
              World-Class Facilities
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              School <span className="text-yellow-500">Infrastructure</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { img: "/school1.jpg", title: "Main Academic Block", desc: "Spacious classrooms with modern amenities" },
              { img: "/school2.jpg", title: "Activity Center", desc: "Dedicated spaces for arts, music, and dance" },
              { img: "/school3.jpg", title: "Sports Facilities", desc: "Outdoor and indoor sports infrastructure" },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={scaleUp}
                className="group relative rounded-3xl overflow-hidden shadow-xl cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-xl font-black text-white mb-1">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/10 transition-colors duration-500" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-12"
          >
            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-yellow-500 hover:text-black transition-all duration-300"
            >
              Explore All Facilities
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  AWARDS & RECOGNITION  ═══════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-400 bg-yellow-400/10 px-4 py-2 rounded-full mb-4">
              Our Achievements
            </span>
            <h2 className="text-4xl md:text-5xl font-black">
              Awards & <span className="text-yellow-400">Recognition</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { year: "2024", title: "Best Emerging School", org: "Education Excellence Awards", icon: "🏆" },
              { year: "2023", title: "Outstanding Academic Results", org: "Telangana Education Board", icon: "📜" },
              { year: "2023", title: "Best Learning Environment", org: "School Ratings India", icon: "🌟" },
              { year: "2022", title: "Innovation in Teaching", org: "EdTech Summit", icon: "💡" },
              { year: "2022", title: "Community Impact Award", org: "Hyderabad Municipal Corp.", icon: "🤝" },
              { year: "2021", title: "Rising Star in Education", org: "National Education Forum", icon: "⭐" },
            ].map((award) => (
              <motion.div
                key={award.title}
                variants={scaleUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{award.icon}</span>
                  <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">{award.year}</span>
                </div>
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">{award.title}</h3>
                <p className="text-sm text-gray-400">{award.org}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  TESTIMONIALS  ═══════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-yellow-50 via-white to-amber-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              Parent Voices
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              What Parents <span className="text-yellow-500">Say</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Mounika R.",
                role: "Parent of Grade 3 Student",
                img: "/avatar_mounika.png",
                text: "Spoorthi's The Duckling has been a wonderful experience for our child. The teachers are caring and the curriculum is well-balanced between academics and extracurriculars.",
                rating: 5,
              },
              {
                name: "Saritha K.",
                role: "Parent of Grade 5 Student",
                img: "/avatar_saritha.png",
                text: "We are impressed with how the school focuses on individual attention. Our daughter's confidence has grown tremendously since joining. The smart classrooms are amazing!",
                rating: 5,
              },
              {
                name: "Mohammed Yaseen",
                role: "Parent of Grade 1 Student",
                img: "/avatar_yaseen.png",
                text: "The safe and nurturing environment gives us peace of mind. The activity-based learning approach has made our son love going to school every day. Highly recommended!",
                rating: 5,
              },
            ].map((t) => (
              <motion.div
                key={t.name}
                variants={scaleUp}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-500 relative"
              >
                {/* Quote mark */}
                <div className="absolute top-6 right-8 text-6xl font-black text-yellow-100">&ldquo;</div>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 relative z-10">{t.text}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-black text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  FAQ  ═══════════════════ */}
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
              Got Questions?
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
              q="What grades does Spoorthi's The Duckling offer?"
              a="We offer education from Nursery through 7th Grade, following the CBSE curriculum. Our Play School division separately caters to Play Group, Nursery, LKG, and UKG."
            />
            <FAQItem
              q="What is the student-to-teacher ratio?"
              a="We maintain an optimal student-to-teacher ratio of approximately 20:1 to ensure every student receives personalized attention and guidance from our experienced faculty."
            />
            <FAQItem
              q="Does the school provide transportation facilities?"
              a="Yes, we offer a safe and reliable school transportation service covering major areas of Hyderabad. All buses are GPS-tracked and staffed with trained attendants."
            />
            <FAQItem
              q="What extracurricular activities are available?"
              a="We offer a wide range of activities including sports (cricket, basketball, football), performing arts (dance, music, drama), visual arts, yoga, karate, robotics, and coding classes."
            />
            <FAQItem
              q="How can I apply for admission?"
              a="You can apply online through our Admissions page or visit our campus for a guided tour. Admissions are open throughout the year, subject to seat availability. Contact us at +91 93813 77301 for more information."
            />
            <FAQItem
              q="What safety measures are in place?"
              a="Our campus is equipped with 24/7 CCTV surveillance, secure entry/exit points with ID verification, trained security personnel, fire safety equipment, and first-aid facilities. All staff members undergo thorough background verification."
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  CALL TO ACTION  ═══════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-red-500/10 blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-400 bg-yellow-400/10 px-4 py-2 rounded-full mb-6">
              Join Our Family
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Ready to Give Your Child the{" "}
            <span className="text-yellow-400">Best Education</span>?
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join the growing family of 1200+ students at Spoorthi&apos;s The Duckling. Admissions are now open
            for the upcoming academic year. Take the first step towards your child&apos;s bright future.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="bg-yellow-500 text-black px-10 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/30 flex items-center gap-2"
            >
              Apply Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-10 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              Contact Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeUp} className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              CBSE Affiliated
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Safe Campus
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Experienced Faculty
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Affordable Fees
            </div>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}
