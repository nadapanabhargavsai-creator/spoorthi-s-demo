"use client";

import Link from "next/link";
import { useState } from "react";
import { usePlayschoolDb } from "../context/PlayschoolDb";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayschoolAdmissions() {
  const { applications } = usePlayschoolDb();

  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const steps = [
    { num: "1", title: "Inquiry", desc: "Submit an online inquiry form, request details on WhatsApp, or phone our front desks." },
    { num: "2", title: "Visit School", desc: "Book a school tour, check out classrooms, security cameras, playground, and meet teachers." },
    { num: "3", title: "Registration", desc: "Fill the online Admission Form, save drafts, and submit details." },
    { num: "4", title: "Document Upload", desc: "Submit copies of Child Birth Certificate, Aadhaar cards, and parent photos." },
    { num: "5", title: "Fee Payment", desc: "Pay the school Term 1 admission fees via cash, check, or online transfers." },
    { num: "6", title: "Admission Confirmed", desc: "Receive welcome package, child diary, and parent portal login session credentials." }
  ];

  const docs = [
    { title: "Child Birth Certificate", desc: "Issued by Municipal Corporation (original copy verification during visit)." },
    { title: "Child Aadhaar Card", desc: "If available (otherwise, submit passport copy or parent declaration)." },
    { title: "Parent Aadhaar Cards", desc: "Both father and mother identity card copies required." },
    { title: "Passport Size Photos", desc: "4 copies of the child and 2 copies of each parent." }
  ];

  const handleTrackStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId) return;
    const cleanId = trackId.trim().toUpperCase();
    const app = applications.find(a => a.id === cleanId);
    
    if (app) {
      setTrackResult(app);
      setErrorMsg("");
    } else {
      setTrackResult(null);
      setErrorMsg("Application ID not found. Try 'LB-ADM-581903' or 'LB-ADM-927318' (pre-seeded) or check your receipt ID.");
    }
  };

  return (
    <div className="w-full font-['Quicksand'] pb-20">
      
      {/* ========== HERO BANNER ========== */}
      <section className="bg-gradient-to-r from-sky-100 via-pink-100 to-yellow-100 py-16 px-6 text-center border-b-8 border-dashed border-sky-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 ENROLLMENTS</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Admission Procedures & Status
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Review our clear admissions path, required files, term fees, and track your ongoing application.
          </p>
        </div>
      </section>

      {/* ========== TIMELINE PATH ========== */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-3">📋 STEP-BY-STEP</span>
        <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800 mb-14">Admission Process Timeline</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {steps.map((st) => (
            <div key={st.num} className="bg-white p-7 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-4 hover:border-sky-300 transition duration-300">
              <span className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-['Fredoka'] font-black flex items-center justify-center text-lg">
                {st.num}
              </span>
              <h3 className="font-['Fredoka'] font-black text-lg text-slate-800">{st.title}</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== ADMISSION STATUS TRACKER ========== */}
      <section className="bg-gradient-to-r from-sky-50 to-pink-50 py-20 px-6 border-y-8 border-dashed border-sky-100 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-3">🔍 STATUS CHECK</span>
          <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800 mb-6">Track Admission Status</h2>
          <p className="text-gray-500 font-semibold mb-10 text-sm">
            Enter your registration application ID (format: <code className="bg-white px-2 py-0.5 border rounded text-pink-600">LB-ADM-XXXXXX</code>) below.
          </p>

          <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-md text-left">
            <form onSubmit={handleTrackStatus} className="flex flex-col sm:flex-row gap-4.5">
              <input
                type="text"
                required
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder="Enter Application ID (e.g. LB-ADM-927318)..."
                className="flex-grow px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 font-bold text-sm"
              />
              <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 text-white font-black text-xs uppercase px-8 py-3 rounded-xl shadow-sm transition"
              >
                Track Now 🔍
              </button>
            </form>

            {errorMsg && (
              <p className="text-xs text-pink-600 font-bold mt-4">{errorMsg}</p>
            )}

            <AnimatePresence>
              {trackResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 border-t border-slate-100 pt-6 space-y-4"
                >
                  <h3 className="font-['Fredoka'] font-black text-slate-800 text-base">Admission Track Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs font-bold text-gray-500">
                    <div>
                      <p>Student Name</p>
                      <strong className="text-slate-800 text-sm block mt-0.5">{trackResult.student.fullName}</strong>
                    </div>
                    <div>
                      <p>Program Applied</p>
                      <strong className="text-slate-800 text-sm block mt-0.5">{trackResult.academic.program}</strong>
                    </div>
                    <div>
                      <p>Submission Date</p>
                      <strong className="text-slate-800 text-sm block mt-0.5">{new Date(trackResult.submittedAt).toLocaleDateString()}</strong>
                    </div>
                    <div>
                      <p>Admission Status</p>
                      <span className={`inline-block text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider mt-1 ${
                        trackResult.status === "Approved" ? "bg-emerald-100 text-emerald-800" :
                        trackResult.status === "Pending" ? "bg-amber-100 text-amber-800" : "bg-pink-100 text-pink-800"
                      }`}>
                        {trackResult.status}
                      </span>
                    </div>
                  </div>

                  {trackResult.status === "Approved" && (
                    <div className="bg-emerald-50 border border-emerald-100 p-4.5 rounded-2xl text-xs text-emerald-800 font-bold leading-relaxed">
                      🎉 Congratulations! Your admission application is approved. Please proceed to download the brochure and complete the fee payment at our campus office to secure the seat.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========== DOCUMENTS & FEES ========== */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
        {/* Required Docs */}
        <div className="space-y-6">
          <h2 className="font-['Fredoka'] font-black text-2xl text-slate-800">Required Document Checklist</h2>
          <p className="text-xs text-gray-400 font-semibold">Make sure to submit/upload scanned copies of these documents. Bring originals for verified check during campus visits.</p>
          
          <div className="space-y-4">
            {docs.map((doc, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex gap-4">
                <span className="text-2xl text-pink-500 font-bold shrink-0">🌸</span>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{doc.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold mt-1">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fees and Timings */}
        <div className="space-y-6">
          <h2 className="font-['Fredoka'] font-black text-2xl text-slate-800">Tuition Fees & Timings</h2>
          <p className="text-xs text-gray-400 font-semibold">Preschool term structures (excl. uniforms/books). Term payments due on Term 1 (June), Term 2 (Oct), and Term 3 (Jan).</p>

          <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm space-y-6 font-bold text-sm text-gray-600">
            <div className="grid grid-cols-3 text-[10px] font-black uppercase text-gray-400 pb-2 border-b border-slate-100">
              <div>Course Program</div>
              <div>School Timings</div>
              <div className="text-right">Term Fee (INR)</div>
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <div className="text-slate-800">Play Group</div>
              <div className="text-xs font-semibold">09:00 AM - 12:00 PM</div>
              <div className="text-right text-emerald-600">₹ 10,000 / Term</div>
            </div>
            <div className="grid grid-cols-3 items-center">
              <div className="text-slate-800">Nursery</div>
              <div className="text-xs font-semibold">09:00 AM - 12:30 PM</div>
              <div className="text-right text-emerald-600">₹ 12,000 / Term</div>
            </div>
            <div className="grid grid-cols-3 items-center">
              <div className="text-slate-800">LKG</div>
              <div className="text-xs font-semibold">09:00 AM - 01:30 PM</div>
              <div className="text-right text-emerald-600">₹ 15,500 / Term</div>
            </div>
            <div className="grid grid-cols-3 items-center">
              <div className="text-slate-800">UKG</div>
              <div className="text-xs font-semibold">09:00 AM - 01:30 PM</div>
              <div className="text-right text-emerald-600">₹ 15,500 / Term</div>
            </div>

            <div className="border-t border-slate-100 pt-5 text-xs text-gray-400 leading-relaxed font-semibold">
              🎁 <strong>Franchise concession:</strong> 10% discount on upfront full year payments. Siblings get ₹ 2,000 discount per term.
            </div>
          </div>
        </div>
      </section>

      {/* ========== CALL TO ACTION ========== */}
      <section className="bg-gradient-to-r from-emerald-400 to-sky-400 text-white rounded-[2.5rem] p-10 sm:p-14 max-w-5xl mx-auto mx-6 text-center shadow-lg relative overflow-hidden">
        <h2 className="text-3xl font-['Fredoka'] font-black mb-4">Brochures & Online Admissions</h2>
        <p className="max-w-xl mx-auto font-semibold mb-8 text-sky-50 leading-relaxed">
          Download our prospectus brochure detailing early childhood curriculums, guidelines, code of conduct, and transport route schedules.
        </p>
        <div className="flex flex-wrap justify-center gap-4.5">
          <Link
            href="/playschool/apply"
            className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide transition shadow-md"
          >
            Apply Online Form 🌸
          </Link>
          {/* Simulated brochure download */}
          <button
            onClick={() => alert("Simulated: Downloading Little Blossoms Play School brochure PDF...")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-emerald-300 px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide transition shadow-md"
          >
            Download Brochure 📥
          </button>
        </div>
      </section>

    </div>
  );
}
