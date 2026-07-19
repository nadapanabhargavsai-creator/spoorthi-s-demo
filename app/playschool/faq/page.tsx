"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqsList = [
  {
    category: "Admissions",
    q: "What is the age criteria for Play Group & Nursery admissions?",
    a: "For Play Group, the child should be 1.5 to 2.5 years of age. For Nursery, the age range is 2.5 to 3.5 years by the start of the academic term."
  },
  {
    category: "Fees",
    q: "Are tuition fees paid term-wise or monthly?",
    a: "Fees are collected term-wise (three terms per academic year). Registration fees are one-time and collected during admission confirmation."
  },
  {
    category: "Transport",
    q: "Do you offer door-to-door transport services for all branches?",
    a: "Yes, our GPS-enabled school vans cover major pre-designated residential areas around Papi Reddy Nagar, Gachibowli, and Kukatpally. Every route is staffed with a female attendant."
  },
  {
    category: "Meals",
    q: "Does the school supply meals or snacks during the day?",
    a: "No, parents pack mid-morning healthy snacks (fruits, light biscuits) for the child's snack break. We promote healthy eating habits, and teachers assist children in dining etiquettes."
  },
  {
    category: "School Timings",
    q: "What are the timings for Play Group and Nursery?",
    a: "Play Group runs from 9:00 AM to 11:30 AM. Nursery runs from 9:00 AM to 12:00 PM. Office counters remain open until 4:00 PM (Monday-Saturday)."
  },
  {
    category: "Curriculum",
    q: "What syllabus structure do you follow in LKG/UKG?",
    a: "We follow a child-centric pre-primary curriculum blending Montessori motor-sensory activities with phonetic language and basic arithmetic skills, easing transition to standard 1."
  },
  {
    category: "Safety",
    q: "How secure is the campus for pre-primary toddlers?",
    a: "Our campus is fully CCTV-monitored. We have strict guard gates where visitors are checked, certified fire combative equipment, soft padded play floors, and trained staff."
  },
  {
    category: "Activities",
    q: "What extracurricular activities are included in daily schedules?",
    a: "Activities include water painting, paper origami, clay modeling, rhythmic rhymes, soft-gym runs, storytelling sessions, and festival celebrations."
  }
];

export default function PlaySchoolFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <main className="bg-[#F8FBFF] overflow-x-hidden pt-28 pb-20">
      
      {/* HERO BANNER */}
      <section className="relative py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full">
            Help Center
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Frequently Asked <span className="text-pink-500">Questions</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            Find quick answers regarding admissions, transport routes, timings, and preschool safety.
          </p>
        </div>
      </section>

      {/* ACCORDION CONTENT */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqsList.map((faq, idx) => (
            <div
              key={idx}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIdx === idx ? "border-pink-500 shadow-sm" : "border-slate-100"
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left px-6 py-5 flex justify-between items-center font-bold text-slate-800 hover:bg-slate-50/40 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#0f4c81] bg-sky-50 px-2.5 py-1 rounded-full">
                    {faq.category}
                  </span>
                  <span className="text-sm md:text-base leading-tight">{faq.q}</span>
                </div>
                <span className="text-pink-500 text-xl font-bold ml-4">
                  {openIdx === idx ? "−" : "+"}
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-500 text-xs md:text-sm leading-relaxed border-t pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
