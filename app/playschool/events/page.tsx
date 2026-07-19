"use client";

import { useState } from "react";
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

const upcomingEvents = [
  { title: "Drawing Competition", date: "July 28, 2026", time: "10:00 AM", desc: "Creative coloring and sketch event for Nursery & Play Group kids.", icon: "🎨" },
  { title: "Fancy Dress Show", date: "August 14, 2026", time: "09:30 AM", desc: "Independence day special fancy dress and patriotic recitation program.", icon: "👗" },
  { title: "Parents Teacher Meeting", date: "September 05, 2026", time: "09:00 AM", desc: "First term progress update and interaction with pre-primary teachers.", icon: "🤝" }
];

const pastEvents = [
  { title: "Graduation Day 2026", date: "April 08, 2026", desc: "Celebrating our UKG students moving on to primary school standard 1.", icon: "🎓", image: "/school1.jpg" },
  { title: "Preschool Sports Meet", date: "February 20, 2026", desc: "A day filled with fun races, musical chairs, and toddler athletics.", icon: "⚽", image: "/school2.jpg" },
  { title: "Christmas Day Carnival", date: "December 22, 2025", desc: "Santa visit, carols singing, gift sharing, and play stalls.", icon: "🎄", image: "/school3.jpg" }
];

export default function PlaySchoolEvents() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCalendar = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("📅 School Academic Calendar 2025-26 PDF downloaded successfully!");
    }, 2000);
  };

  return (
    <main className="bg-[#F8FBFF] overflow-x-hidden pt-28 pb-20">
      
      {/* HERO BANNER */}
      <section className="relative py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full">
            Our Timeline
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Events & <span className="text-pink-500">Calendar</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            Track festivals, drawing contests, fancy dress shows, and upcoming parent-teacher interactions.
          </p>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0f4c81] bg-sky-50 px-3 py-1 rounded-full">Join In</span>
            <h2 className="text-3xl font-black uppercase text-slate-900 mt-3">Upcoming Events</h2>
          </div>

          <div className="space-y-6">
            {upcomingEvents.map((ev, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
              >
                <div className="flex gap-4">
                  <span className="text-4xl filter drop-shadow-sm select-none">{ev.icon}</span>
                  <div>
                    <span className="text-[9px] font-black text-pink-500 tracking-wider block">{ev.date} · {ev.time}</span>
                    <h3 className="text-lg font-black uppercase text-[#0F4C81] mt-1">{ev.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed mt-2 font-medium max-w-md">{ev.desc}</p>
                  </div>
                </div>
                <Link
                  href="/playschool/contact"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-pink-500 text-white font-black uppercase text-[9px] tracking-widest rounded-xl transition shrink-0"
                >
                  Join Details
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC CALENDAR DOWNLOAD */}
      <section className="py-16 px-6 bg-white border-y">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-3xl">📅</span>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900">Academic Calendar 2025-26</h2>
          <p className="text-slate-500 text-xs font-semibold leading-relaxed max-w-md mx-auto">
            Stay aligned with preschool holidays, weekly competitions, parent meets, assessment schedules, and holiday announcements.
          </p>
          <button
            onClick={handleDownloadCalendar}
            className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black uppercase text-xs tracking-widest rounded-xl transition shadow-md"
          >
            {downloading ? "Preparing File..." : "Download School Calendar"}
          </button>
        </div>
      </section>

      {/* PAST EVENTS ALBUM */}
      <section className="py-20 px-6 bg-[#F8FBFF]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0f4c81]">Past Highlights</span>
            <h2 className="text-3xl font-black uppercase text-slate-900 mt-3">Event Photo Albums</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((ev, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between h-full hover:shadow-md transition"
              >
                <div className="relative h-48">
                  <img src={ev.image} className="w-full h-full object-cover" alt={ev.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-1 rounded-xl shadow text-xs font-black uppercase">
                    {ev.icon} Album
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">{ev.date}</span>
                  <h3 className="text-base font-black uppercase text-[#0F4C81]">{ev.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">{ev.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
