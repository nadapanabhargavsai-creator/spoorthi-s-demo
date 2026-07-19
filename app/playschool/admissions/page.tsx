"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { initialApplications } from "../state";

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

const timelineSteps = [
  { label: "1. Inquiry", desc: "Submit an online request or call our helpline to register interest.", icon: "💬" },
  { label: "2. Visit School", desc: "Schedule a physical campus tour to inspect playrooms and facilities.", icon: "🏫" },
  { label: "3. Registration", desc: "Fill out the formal pre-primary application form with correct details.", icon: "📝" },
  { label: "4. Document Upload", desc: "Provide scans of child birth certificate, Aadhaar, and parent photos.", icon: "📁" },
  { label: "5. Fee Payment", desc: "Deposit the primary registration and term tuition fee.", icon: "💳" },
  { label: "6. Admission Confirmed", desc: "Receive welcome package, syllabus guides, and bus slots.", icon: "🎉" }
];

export default function PlaySchoolAdmissions() {
  const [appSearchId, setAppSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    // Find in mock database
    const found = initialApplications.find(app => app.id.toUpperCase() === appSearchId.trim().toUpperCase());
    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult(null);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("📚 Little Blossoms Play School Brochure downloaded successfully!");
    }, 2000);
  };

  return (
    <main className="bg-[#F8FBFF] overflow-x-hidden pt-28 pb-20">
      
      {/* HERO BANNER */}
      <section className="relative py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full">
            Enroll Today
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Admissions <span className="text-pink-500">2025-26</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            Simple, structured, and fast pre-primary admission guides to help secure your child's seat.
          </p>
        </div>
      </section>

      {/* ADMISSION STATUS TRACKER */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-500 bg-sky-50 px-3 py-1 rounded-full">Application Radar</span>
            <h2 className="text-2xl font-black uppercase text-slate-900 mt-2">Track Admission Status</h2>
            <p className="text-slate-400 text-xs mt-1.5 font-semibold">Input your Application ID to track real-time verification progress.</p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              required
              value={appSearchId}
              onChange={(e) => setAppSearchId(e.target.value)}
              placeholder="e.g. LBL-839201"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-pink-500 text-white font-black uppercase text-[10px] tracking-widest px-6 py-3 rounded-xl transition"
            >
              Verify Status
            </button>
          </form>

          {/* Search Result */}
          <AnimatePresence mode="wait">
            {searched && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 pt-8 border-t"
              >
                {searchResult ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-[#F8FBFF] p-4 rounded-xl border">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Applicant</p>
                        <p className="text-base font-black text-slate-900">{searchResult.studentName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                        <span className="inline-block bg-sky-100 text-sky-800 text-[10px] font-black px-3 py-1 rounded-full uppercase mt-1">
                          {searchResult.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Timeline Graphic */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-4">Milestone Tracker</h4>
                      <div className="grid grid-cols-4 gap-2 text-center text-[9px] font-black uppercase">
                        {[
                          { label: "Submitted", active: true },
                          { label: "Verified", active: ["Verified", "Test Scheduled", "Admission Confirmed", "Completed"].includes(searchResult.status) },
                          { label: "Scheduled", active: ["Test Scheduled", "Admission Confirmed", "Completed"].includes(searchResult.status) },
                          { label: "Confirmed", active: ["Admission Confirmed", "Completed"].includes(searchResult.status) }
                        ].map((m, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <div className={`h-1.5 rounded-full ${m.active ? "bg-emerald-500" : "bg-slate-100"}`} />
                            <span className={m.active ? "text-emerald-700 font-bold" : "text-slate-400"}>{m.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-red-500 text-xs font-black bg-red-50 border border-red-100 rounded-xl">
                    ⚠️ Application ID not found. Please try LBL-839201 or LBL-102938.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0f4c81]">Easy Flow</span>
            <h2 className="text-3xl font-black uppercase text-slate-900 mt-2">Admission Timeline</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {timelineSteps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-center space-y-3"
              >
                <span className="text-3xl block filter drop-shadow-sm select-none">{step.icon}</span>
                <h3 className="text-sm font-black uppercase text-slate-900">{step.label}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIRED DOCUMENTS, FEES & TIMINGS */}
      <section className="py-16 px-6 bg-white border-y">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          
          {/* Docs */}
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase text-slate-900 border-b pb-2">📂 Required Scans</h3>
            <ul className="space-y-3 text-xs font-semibold text-slate-600">
              <li className="flex items-center gap-2">✓ Child's Birth Certificate</li>
              <li className="flex items-center gap-2">✓ Child's Aadhaar Card scan</li>
              <li className="flex items-center gap-2">✓ 3 passport-sized child photos</li>
              <li className="flex items-center gap-2">✓ Parents' Aadhaar Cards</li>
              <li className="flex items-center gap-2">✓ Previous school TC & Report card (LKG/UKG only)</li>
            </ul>
          </div>

          {/* Fees */}
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase text-slate-900 border-b pb-2">💳 Preschool Fees</h3>
            <div className="space-y-2 text-xs font-semibold text-slate-600">
              <p className="flex justify-between border-b py-1"><span>Play Group (Term)</span> <span className="font-bold">₹15,000</span></p>
              <p className="flex justify-between border-b py-1"><span>Nursery (Term)</span> <span className="font-bold">₹18,000</span></p>
              <p className="flex justify-between border-b py-1"><span>LKG / UKG (Term)</span> <span className="font-bold">₹22,000</span></p>
              <p className="text-[10px] text-slate-400 font-bold uppercase pt-1">Note: Fees excludes bus routes & activity uniforms.</p>
            </div>
          </div>

          {/* Timings */}
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase text-slate-900 border-b pb-2">⏰ School Timings</h3>
            <div className="space-y-2 text-xs font-semibold text-slate-600">
              <p className="flex justify-between border-b py-1"><span>Play Group</span> <span className="font-bold">9:00 AM – 11:30 AM</span></p>
              <p className="flex justify-between border-b py-1"><span>Nursery</span> <span className="font-bold">9:00 AM – 12:00 PM</span></p>
              <p className="flex justify-between border-b py-1"><span>LKG / UKG</span> <span className="font-bold">9:00 AM – 12:30 PM</span></p>
              <p className="text-[10px] text-slate-400 font-bold uppercase pt-1">Office remains open till 4:00 PM (Mon-Sat).</p>
            </div>
          </div>

        </div>
      </section>

      {/* DOWNLOAD BROCHURE CTA */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6 px-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900">Want to Know More?</h2>
          <p className="text-slate-500 text-xs font-semibold">Download our comprehensive pre-primary booklet detailing syllabus, transport rules, food menus and more.</p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={handleDownload}
              className="px-8 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-black uppercase text-xs tracking-widest rounded-xl transition shadow-md"
            >
              {downloading ? "Preparing PDF..." : "Download Brochure"}
            </button>
            <Link
              href="/playschool/apply"
              className="px-8 py-3.5 bg-slate-900 hover:bg-black text-white font-black uppercase text-xs tracking-widest rounded-xl transition"
            >
              Apply Online
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
