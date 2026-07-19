"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease }
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.4, ease }
  }
};

const values = [
  { title: "Empathetic Care", desc: "Every child is handled with gentle patience, understanding their early emotional and physical needs.", icon: "💖" },
  { title: "Ethical Roots", desc: "Instilling primary moral values, cleanliness, sharing behavior, and truthfulness naturally.", icon: "🤝" },
  { title: "Active Play", desc: "Believing that learning should never be static. Play is the primary vehicle for early development.", icon: "🎈" },
  { title: "Continuous Watch", desc: "Total child monitoring, verified staff, and absolute security focus at all times.", icon: "🛡️" }
];

export default function PlaySchoolAbout() {
  return (
    <main className="bg-[#F8FBFF] overflow-x-hidden pt-28 pb-20">
      
      {/* HERO BANNER */}
      <section className="relative py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full">
            Our Identity
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            About Little <span className="text-pink-500">Blossoms</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            Nurturing young minds through holistic Montessori activities, clean spaces, and values-driven pedagogy since 2020.
          </p>
        </div>
      </section>

      {/* HISTORY & METHODOLOGY */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">
              Our School History & Mission
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              Established in 2020 as a premier pre-primary unit of Spoorthi's Academy, Little Blossoms Play School has grown to nurture over 500+ toddlers. Our primary mission is to lay stable academic and cognitive foundations while preserving the joy of childhood.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 bg-[#F8FBFF] rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-sm font-black uppercase text-[#0F4C81] mb-2">🎯 Our Mission</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">To offer child-centered, sensory-driven preschooling that ensures social, physical, and speech confidence milestones.</p>
              </div>
              <div className="p-5 bg-[#F8FBFF] rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-sm font-black uppercase text-pink-500 mb-2">👁️ Our Vision</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">To become the gold standard of early childhood education in Hyderabad by merging Montessori tools with ethical habits.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="relative rounded-3xl overflow-hidden shadow-md h-[400px]"
          >
            <img src="/about.jpg" className="w-full h-full object-cover" alt="School Activities" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          </motion.div>

        </div>
      </section>

      {/* PRINCIPAL MESSAGE */}
      <section className="py-20 px-6 bg-[#F8FBFF]">
        <div className="max-w-5xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-4 text-center space-y-3">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-100 mx-auto shadow-md">
                <img src="/avatar_saritha.png" className="w-full h-full object-cover" alt="Dr. Saritha Match" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 uppercase text-sm leading-tight">Dr. Saritha Match</h3>
                <p className="text-[10px] text-pink-500 uppercase font-black tracking-widest mt-1">Founder & Principal</p>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <span className="text-[9px] font-black uppercase text-sky-500 tracking-widest bg-sky-50 px-3 py-1 rounded-full">Principal's Address</span>
              <h2 className="text-2xl font-black uppercase text-slate-900 tracking-tight">Welcome to Little Blossoms</h2>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-semibold italic">
                "Early childhood is a brief, magical window of intense absorption. At Little Blossoms, we don't force learning; instead, we design environments that entice learning. By surrounding your children with colors, toys, music, and experienced motherly care, we trigger organic learning milestones."
              </p>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                We believe parents are active partners. Together, we can shape kids who love school, leading to a lifelong hunger for knowledge.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES & METHODOLOGY */}
      <section className="py-24 px-6 bg-white border-t border-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full mb-6">
              Our Core Pillars
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 tracking-tight">
              Values & Teaching Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                transition={{ delay: i * 0.08 }}
                className="p-6 bg-[#F8FBFF] rounded-2xl border border-slate-100 shadow-sm space-y-4"
              >
                <span className="text-3xl block filter drop-shadow-sm select-none">{v.icon}</span>
                <h3 className="text-sm font-black uppercase text-slate-900">{v.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DAILY ROUTINE OUTLINE */}
      <section className="py-20 px-6 bg-[#F8FBFF] border-t border-sky-50">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">
              A Day at Little Blossoms
            </h2>
            <p className="text-slate-500 text-xs mt-2 font-semibold">Structured routines maintaining proper balance between education, rest, and active play.</p>
          </div>

          <div className="space-y-6">
            {[
              { time: "09:00 AM – 09:30 AM", act: "Morning Prayer & Nursery Rhymes Session", desc: "Kids assemble for moral prayers and rhythmic warmups.", icon: "☀️" },
              { time: "09:30 AM – 10:30 AM", act: "Montessori Sensory & Concept Learning", desc: "Sensory boxes, writing board sessions, tracing shapes, and number logic.", icon: "🧩" },
              { time: "10:30 AM – 11:00 AM", act: "Nutritious Snack & Hydration Break", desc: "Teacher-guided eating habits, clean hands, and fruit sharing.", icon: "🍎" },
              { time: "11:00 AM – 12:00 PM", act: "Indoor Playroom & Art Activities", desc: "Pottery clay modelling, drawing sheets, paper folding, and ball pools.", icon: "🎨" },
              { time: "12:00 PM – 12:30 PM", act: "Evacuation Prep & Happy Goodbye Pack", desc: "Evacuation routing, shoe checks, bag audits, and safety bus boarding.", icon: "🚌" }
            ].map((rt, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <span className="text-2xl self-start filter drop-shadow-sm select-none">{rt.icon}</span>
                <div>
                  <span className="text-[10px] font-black text-pink-500 tracking-wider block">{rt.time}</span>
                  <h4 className="text-sm font-black uppercase text-slate-800 mt-1">{rt.act}</h4>
                  <p className="text-slate-500 text-xs mt-1.5 font-medium leading-relaxed">{rt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Give Your Child The Best Start</h2>
          <p className="text-slate-400 text-xs md:text-sm font-semibold max-w-md mx-auto leading-relaxed">
            Admissions for the 2025-26 pre-primary session are filling fast. Book your direct campus tour or submit an online request now.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/playschool/apply"
              className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black uppercase text-xs tracking-widest rounded-full hover:scale-105 transition"
            >
              Apply Online
            </Link>
            <Link
              href="/playschool/contact"
              className="px-8 py-3.5 bg-white text-slate-900 font-black uppercase text-xs tracking-widest rounded-full hover:scale-105 transition"
            >
              Visit Campus
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
