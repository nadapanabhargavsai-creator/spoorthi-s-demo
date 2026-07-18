"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SchoolEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  desc: string;
  icon: string;
  tag: "Upcoming" | "Past";
  photosCount?: number;
}

export default function PlayschoolEvents() {
  const eventsList: SchoolEvent[] = [
    {
      title: "Monsoon Splash & Water Fun Day",
      date: "2026-07-24",
      time: "09:30 AM - 12:00 PM",
      location: "Gachibowli Playground",
      desc: "Water play pools, sprinklers, and bubble-blowing outdoor zones. Send spare clothes, a towel, and plastic sandals.",
      icon: "💧",
      tag: "Upcoming"
    },
    {
      title: "Independence Day Festivities",
      date: "2026-08-14",
      time: "09:00 AM - 11:30 AM",
      location: "All Campus Branches",
      desc: "Rhyme choir sings, national flag hosting, and tri-color costume dress parades. Sweets distribution at dispersal.",
      icon: "🇮🇳",
      tag: "Upcoming"
    },
    {
      title: "Clay Modeling Competition",
      date: "2026-09-05",
      time: "10:00 AM - 12:00 PM",
      location: "Classroom Activity Rooms",
      desc: "Children design clay models of animals and fruits. Medals for the most creative, color blended designs.",
      icon: "🧸",
      tag: "Upcoming"
    },
    {
      title: "Grandparents Day Celebration",
      date: "2026-06-20",
      time: "10:00 AM - 01:00 PM",
      location: "Campus Assembly Halls",
      desc: "Grandparents joined kids to play sensory games, trace portraits, and enjoy tea snacks.",
      icon: "👵👴",
      tag: "Past",
      photosCount: 24
    },
    {
      title: "Summer Creative Art Exhibition",
      date: "2026-04-18",
      time: "09:00 AM - 02:00 PM",
      location: "School Exhibition Halls",
      desc: "Showcasing finger paintings, paper origami, and clay creations designed by our little learners.",
      icon: "🎨",
      tag: "Past",
      photosCount: 42
    }
  ];

  const academicCalendar = [
    { date: "15th August 2026", occasion: "Independence Day (National Holiday / Celebration)", type: "Celebration" },
    { date: "24th August 2026", occasion: "Krishna Janmashtami (Festival Activity)", type: "Activity" },
    { date: "5th September 2026", occasion: "Teachers Day & Clay Modeling (Competition)", type: "Activity" },
    { date: "17th September 2026", occasion: "Milad-un-Nabi (School Holiday)", type: "Holiday" },
    { date: "10th-18th October 2026", occasion: "Dussera Term Break (Autumn Holidays)", type: "Holiday" },
    { date: "14th November 2026", occasion: "Children's Day Carnival (Sensory Play Fun)", type: "Celebration" }
  ];

  const [filter, setFilter] = useState<"Upcoming" | "Past">("Upcoming");

  const filteredEvents = eventsList.filter((e) => e.tag === filter);

  return (
    <div className="w-full font-['Quicksand'] pb-20">
      
      {/* ========== HERO BANNER ========== */}
      <section className="bg-gradient-to-r from-sky-100 via-pink-100 to-yellow-100 py-16 px-6 text-center border-b-8 border-dashed border-sky-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 HAPPENINGS</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Events & Calendar
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Stay updated with our festival celebrations, parent meetings, student competitions, and holiday lists.
          </p>
        </div>
      </section>

      {/* ========== SWITCH TABS ========== */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-center bg-white p-2 rounded-full border-2 border-slate-100 shadow-sm max-w-xs mx-auto mb-14">
          <button
            onClick={() => setFilter("Upcoming")}
            className={`flex-1 py-2.5 rounded-full text-xs font-black uppercase tracking-wide transition-all ${
              filter === "Upcoming" ? "bg-sky-500 text-white shadow-sm" : "text-slate-500 hover:text-sky-500"
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setFilter("Past")}
            className={`flex-1 py-2.5 rounded-full text-xs font-black uppercase tracking-wide transition-all ${
              filter === "Past" ? "bg-pink-500 text-white shadow-sm" : "text-slate-500 hover:text-pink-500"
            }`}
          >
            Past Albums
          </button>
        </div>

        {/* Events Grid */}
        <div className="space-y-6">
          {filteredEvents.map((evt, idx) => (
            <motion.div
              key={evt.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`p-6.5 rounded-3xl border-4 ${
                filter === "Upcoming" ? "border-sky-200 bg-sky-50/20" : "border-pink-200 bg-pink-50/20"
              } text-left bg-white shadow-sm flex flex-col sm:flex-row gap-6 items-start`}
            >
              {/* Giant Icon */}
              <div className="w-16 h-16 rounded-full bg-white shadow-md border-2 border-slate-100 flex items-center justify-center text-3xl shrink-0">
                {evt.icon}
              </div>

              {/* Body */}
              <div className="flex-grow space-y-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider ${
                    filter === "Upcoming" ? "bg-sky-100 text-sky-700" : "bg-pink-100 text-pink-700"
                  }`}>
                    {evt.date}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">⏱️ {evt.time}</span>
                </div>
                <h3 className="font-['Fredoka'] font-black text-slate-800 text-lg">{evt.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold leading-relaxed">{evt.desc}</p>
                <p className="text-xs text-gray-400 font-bold">📍 Location: {evt.location}</p>
                
                {evt.photosCount && (
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-pink-500 bg-pink-50 border border-pink-100 px-3.5 py-1 rounded-full cursor-pointer hover:bg-pink-100 transition">
                      🖼️ View Album ({evt.photosCount} Photos)
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== HOLIDAYS & ACADEMIC CALENDAR ========== */}
      <section className="bg-gradient-to-r from-sky-50 to-pink-50 py-20 px-6 border-t-8 border-dashed border-sky-100 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-emerald-600 text-xs font-black uppercase tracking-widest block mb-3">📅 PLANNER</span>
          <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800 mb-14">Academic Calendar Highlights</h2>
          
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border-2 border-slate-100 shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-bold text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-100 text-slate-400 text-[10px] uppercase font-black tracking-wider pb-3.5">
                    <th className="pb-4">Scheduled Date</th>
                    <th className="pb-4">Occasion / Activity</th>
                    <th className="pb-4 text-right">Event Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-700">
                  {academicCalendar.map((cal, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="py-4.5 font-bold text-slate-900">{cal.date}</td>
                      <td className="py-4.5 font-semibold text-gray-600">{cal.occasion}</td>
                      <td className="py-4.5 text-right">
                        <span className={`inline-block text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          cal.type === "Holiday" ? "bg-red-50 text-red-700" :
                          cal.type === "Celebration" ? "bg-pink-50 text-pink-700" : "bg-sky-50 text-sky-700"
                        }`}>
                          {cal.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
