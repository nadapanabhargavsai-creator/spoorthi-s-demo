"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initialPositions, PlaySchoolPosition } from "../state";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const perks = [
  { icon: "🎓", title: "Training Programs", desc: "Monthly skill-enhancement workshops for all pre-primary educators." },
  { icon: "💰", title: "Competitive Pay", desc: "Industry-standard salaries with timely increments and appraisals." },
  { icon: "🏥", title: "Health Cover", desc: "Group medical insurance for permanent teaching & admin staff." },
  { icon: "🌿", title: "Work Life Balance", desc: "Well-defined school timings, summer vacations, and leave policies." },
  { icon: "🤝", title: "Collaborative Culture", desc: "Warm, supportive team of educators focused on child welfare." },
  { icon: "📈", title: "Career Growth", desc: "Clear promotion tracks from Educator → Senior → Center Head." },
];

export default function PlaySchoolCareers() {
  const [selectedJob, setSelectedJob] = useState<(typeof initialPositions)[0] | null>(null);
  const [applied, setApplied] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplyLoading(true);
    setTimeout(() => {
      setApplyLoading(false);
      setApplied(true);
      setTimeout(() => {
        setApplied(false);
        setSelectedJob(null);
      }, 3000);
    }, 1800);
  };

  return (
    <main className="bg-[#F8FBFF] overflow-x-hidden pt-28 pb-20">

      {/* HERO */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full">
            Join Our Team
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Shape Young <span className="text-pink-500">Futures</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            We are always looking for passionate early childhood educators, helpers, and admin professionals to join our growing family.
          </p>
        </div>
      </section>

      {/* PERKS */}
      <section className="py-12 px-6 bg-white border-y">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0f4c81] bg-sky-50 px-3 py-1 rounded-full">Why Work Here</span>
            <h2 className="text-3xl font-black uppercase text-slate-900 mt-3">Employee Benefits</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {perks.map((p, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                transition={{ delay: idx * 0.07 }}
                className="bg-[#F8FBFF] border border-slate-100 p-6 rounded-2xl space-y-2 text-center"
              >
                <span className="text-3xl block">{p.icon}</span>
                <h3 className="text-sm font-black uppercase text-slate-900">{p.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-pink-500">Openings</span>
            <h2 className="text-3xl font-black uppercase text-slate-900 mt-2">Current Vacancies</h2>
          </div>

          <div className="space-y-4">
            {initialPositions.map((job: PlaySchoolPosition, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 hover:shadow-sm transition"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap gap-2 items-center">
                    <h3 className="text-base font-black uppercase text-[#0F4C81]">{job.title}</h3>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      job.type === "Full Time"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>{job.type}</span>
                  </div>
                  <p className="text-slate-500 text-xs font-semibold">{job.location} · {job.department}</p>
                  <p className="text-slate-400 text-xs">{job.description}</p>
                </div>
                <button
                  onClick={() => { setSelectedJob(job); setApplied(false); }}
                  className="shrink-0 px-5 py-2.5 bg-slate-900 hover:bg-pink-500 text-white font-black uppercase text-[9px] tracking-widest rounded-xl transition"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedJob(null)}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6"
            >
              {applied ? (
                <div className="text-center py-12 space-y-3">
                  <span className="text-5xl block">🎉</span>
                  <h3 className="text-lg font-black uppercase text-slate-900">Application Sent!</h3>
                  <p className="text-slate-400 text-xs font-semibold">Our HR team will contact you within 3 working days.</p>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl font-black uppercase text-[#0F4C81]">Apply: {selectedJob.title}</h3>
                    <p className="text-slate-400 text-xs mt-1 font-semibold">{selectedJob.location} · {selectedJob.type}</p>
                  </div>
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Full Name</label>
                      <input required placeholder="Your full name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Email</label>
                        <input type="email" required placeholder="you@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
                      </div>
                      <div>
                        <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Phone</label>
                        <input type="tel" required placeholder="+91 ..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Experience</label>
                      <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition">
                        <option value="">Select years of experience</option>
                        <option>0–1 Years (Fresher)</option>
                        <option>1–3 Years</option>
                        <option>3–5 Years</option>
                        <option>5+ Years</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Cover Note</label>
                      <textarea rows={3} placeholder="Why are you a great fit?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition resize-none" />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="submit" disabled={applyLoading} className="flex-1 py-3.5 bg-slate-900 hover:bg-pink-500 text-white font-black uppercase text-[9px] tracking-widest rounded-xl transition">
                        {applyLoading ? "Submitting..." : "Submit Application"}
                      </button>
                      <button type="button" onClick={() => setSelectedJob(null)} className="px-4 py-3.5 border border-slate-200 text-slate-500 hover:text-slate-900 rounded-xl text-xs font-bold transition">
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
