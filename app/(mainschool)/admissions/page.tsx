"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
const m = motion;
import { useState } from "react";
import { auth } from "@/lib/firebase";

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
    <m.div
      variants={fadeUp}
      className="border border-gray-200 rounded-2xl overflow-hidden hover:border-yellow-450 transition-colors duration-300 bg-white"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="font-semibold text-gray-800 pr-4 group-hover:text-yellow-600 transition-colors">{q}</span>
        <m.span
          animate={{ rotate: open ? 45 : 0 }}
          className="shrink-0 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xl font-bold"
        >
          +
        </m.span>
      </button>
      <m.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-gray-600 leading-relaxed">{a}</p>
      </m.div>
    </m.div>
  );
}



export default function AdmissionsPage() {
  const router = useRouter();
  const [activeForm, setActiveForm] = useState<"visit" | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleApplyClick = () => {
    if (auth.currentUser) {
      router.push("/parent/dashboard?tab=apply");
    } else {
      router.push("/auth/login?redirect=/parent/dashboard?tab=apply");
    }
  };

  const handleDownloadForm = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setActiveForm(null);
    }, 2500);
  };

  return (
    <main className="overflow-hidden bg-slate-50/50">
      {/* ═══════════════════  HERO BANNER  ═══════════════════ */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt="Spoorthi's Admissions Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90" />
        </div>

        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-red-500/10 blur-3xl" />

        <div className="relative z-10 text-center px-6 py-24 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <m.nav
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
            <span className="text-yellow-400 font-semibold">Admissions</span>
          </m.nav>

          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs font-bold text-yellow-300 uppercase tracking-widest">Enroll Today for Academic Session 2026-27</span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-6"
          >
            Admissions <span className="text-yellow-400">Open</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Join our school family. Experience a simplified enrollment process, transparent fee systems, and comprehensive academic guidelines.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={handleApplyClick}
              className="bg-yellow-500 text-black px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-yellow-400 hover:scale-105 transition-all shadow-lg shadow-yellow-500/20"
            >
              Apply Online Now
            </button>
            <button
              onClick={() => setActiveForm("visit")}
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all"
            >
              Book Campus Visit
            </button>
          </m.div>
        </div>
      </section>

      {/* ═══════════════════  ADMISSION PROCESS TIMELINE  ═══════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              Step-by-step
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Admission <span className="text-yellow-500">Process</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Follow these simple steps to enroll your child into Spoorthi&apos;s The Duckling.
            </p>
          </m.div>

          {/* Timeline grid */}
          <div className="relative">
            {/* Connection line for desktop */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-yellow-100 -translate-y-1/2 hidden lg:block z-0" />

            <div className="grid lg:grid-cols-6 gap-8 relative z-10">
              {[
                { step: "01", name: "Inquiry", desc: "Submit an online inquiry form or visit our campus front office desk directly." },
                { step: "02", name: "Campus Visit", desc: "Interact with our Academic Coordinators, review labs, and tour class blocks." },
                { step: "03", name: "Registration", desc: "Fill out the registration credentials and purchase the admission brochure." },
                { step: "04", name: "Verification", desc: "Provide necessary child documents and academic report cards for evaluation." },
                { step: "05", name: "Fee Payment", desc: "Deposit the school entry fees structure to lock in seat allocations." },
                { step: "06", name: "Confirmation", desc: "Receive the welcome calendar docket, uniform sizes, and classroom codes." },
              ].map((t, idx) => (
                <m.div
                  key={t.step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={scaleUp}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg text-center flex flex-col items-center hover:border-yellow-400 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-yellow-500 text-black flex items-center justify-center text-xl font-black shadow-md shadow-yellow-500/10 mb-6">
                    {t.step}
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-3">{t.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{t.desc}</p>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════  ELIGIBILITY & REQUIRED DOCUMENTS  ═══════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Eligibility section */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeLeft}
              className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100"
            >
              <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-6">
                Requirements
              </span>
              <h2 className="text-3xl font-black text-gray-900 mb-6">
                Age <span className="text-yellow-500">Eligibility</span> Criteria
              </h2>
              <div className="space-y-4">
                {[
                  { class: "Nursery", age: "2.5 – 3.5 Years by June 1st of the entry year" },
                  { class: "Lower Kindergarten (LKG)", age: "3.5 – 4.5 Years by June 1st of the entry year" },
                  { class: "Upper Kindergarten (UKG)", age: "4.5 – 5.5 Years by June 1st of the entry year" },
                  { class: "Grade 1", age: "5.5 – 6.5 Years by June 1st of the entry year" },
                  { class: "Grades 2 to 7", age: "Based on previous year's transfer certificate (TC) age logs" },
                ].map((item, idx) => (
                  <div key={item.class} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
                    <span className="font-bold text-gray-900">{item.class}</span>
                    <span className="text-xs font-semibold text-gray-600 bg-slate-50 px-4 py-2 rounded-full">{item.age}</span>
                  </div>
                ))}
              </div>
            </m.div>

            {/* Required Documents */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeRight}
              className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100"
            >
              <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full mb-6">
                Checklist
              </span>
              <h2 className="text-3xl font-black text-gray-900 mb-6">
                Required <span className="text-blue-500">Documents</span>
              </h2>
              <div className="space-y-4 text-gray-650">
                {[
                  "Birth Certificate issued by municipal authority (Copy & Original)",
                  "Aadhar Card of the Child & Parents (Copies)",
                  "Previous class report cards or study certificates (Grades 2-7)",
                  "Original Transfer Certificate (TC) signed by Board authorities",
                  "4 passport size photographs of the Child",
                  "Passport size photographs of Parents/Guardians (2 each)",
                  "Immunization record card copies (Nursery & Kindergartens only)",
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-3 py-1">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                    <p className="text-sm font-medium text-gray-600">{doc}</p>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </div>
      </section>



      {/* ═══════════════════  SCHOLARSHIP INFORMATION  ═══════════════════ */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              Support
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Scholarship <span className="text-yellow-500">Information</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              We offer scholarships to support students with outstanding achievements or special support contexts.
            </p>
          </m.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { type: "Merit Scholarship", reward: "Up to 50% Tuition Fee Waiver", desc: "Provided to students displaying exceptional performance in periodic entrance tests or previous grade scorecards." },
              { type: "Sibling Discount", reward: "10% Tuition Fee Waiver", desc: "Applicable on the younger sibling's annual tuition fees when two or more children of the same parent study together." },
              { type: "Special Category Support", reward: "Up to 30% Tuition Fee Waiver", desc: "Granted to children of defense personnel, single parents, or economically challenged families after verification." },
            ].map((s, idx) => (
              <m.div
                key={s.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-gray-150 shadow-md text-center flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-black text-gray-900 text-lg mb-2">{s.type}</h4>
                  <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-4 py-1.5 rounded-full inline-block mb-4">{s.reward}</span>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  IMPORTANT DATES  ═══════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              Deadlines
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Important <span className="text-yellow-500">Dates</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Please track these timelines to ensure seamless admission registration procedures.
            </p>
          </m.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { date: "January 15, 2026", label: "Admission inquiries & brochures distribution start" },
              { date: "February 28, 2026", label: "Priority registration deadline for new academic session" },
              { date: "March 15, 2026", label: "Entrance interactions & interactive evaluation rounds" },
              { date: "April 05, 2026", label: "Declaration of selected candidate rosters" },
              { date: "April 20, 2026", label: "Verification of documents & final fee deposit deadlines" },
            ].map((d, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-slate-50 rounded-2xl border border-gray-100 gap-4"
              >
                <span className="text-yellow-600 font-black text-sm uppercase tracking-wider sm:w-1/3">{d.date}</span>
                <span className="text-gray-800 text-xs font-semibold sm:w-2/3">{d.label}</span>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  ADMISSION FAQS  ═══════════════════ */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full mb-4">
              FAQs
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Admission <span className="text-yellow-500">FAQs</span>
            </h2>
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="space-y-4"
          >
            <FAQItem
              q="Is there an admission entrance exam for early primary classes?"
              a="We do not conduct formal examinations for Nursery, LKG, UKG, and Grade 1. Admissions are finalized through pleasant interactive sessions with children and parents. Formal interactions start from Grade 2 onwards."
            />
            <FAQItem
              q="When does the session classes officially start?"
              a="The academic session begins in the first week of June. We host a details orientation week for new parent connections in the final week of May."
            />
            <FAQItem
              q="Can I purchase uniforms and textbooks directly from the school campus?"
              a="Yes, details regarding certified textbook sets, custom uniform sizes, and local vendor shops are shared during confirmation. They are available on specific dates at school counters."
            />
            <FAQItem
              q="Are transport services included in the annual fee structure?"
              a="No, transportation charges are separate from standard fees. They are calculated based on the route zone structure and kilometers to ensure fair allocation."
            />
          </m.div>
        </div>
      </section>

      {/* ═══════════════════  DOWNLOAD ADMISSION FORM  ═══════════════════ */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-500 rounded-3xl p-12 text-black shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl font-black mb-3">Offline Application Forms</h3>
            <p className="text-black/75 text-sm font-medium leading-relaxed max-w-xl">
              Prefer filling out hardcopy documents? Download our official Admission Application Form PDF, fill it out, and submit it at the campus reception desk.
            </p>
          </div>
          <button
            onClick={handleDownloadForm}
            className="bg-black text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-white hover:text-black transition-colors shrink-0"
          >
            Download Application Form PDF
          </button>
        </div>
      </section>

      {/* ═══════════════════  MODAL FORM (VISIT ONLY — Apply goes to Parent Portal)  ═══════════════════ */}
      <AnimatePresence>
        {activeForm && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <m.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  setActiveForm(null);
                  setFormSubmitted(false);
                }}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 font-bold text-lg"
              >
                ✕
              </button>

              {formSubmitted ? (
                <div className="text-center py-12 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-6">✓</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Request Submitted!</h3>
                  <p className="text-gray-500 text-xs">Our Admissions Coordinator will reach out to you shortly.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Book Campus Visit</h3>
                  <p className="text-xs text-gray-500 mb-6">
                    Schedule a details campus walkthrough with our counselors.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-black tracking-wider mb-2">Parent Name</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-yellow-500 text-black font-medium" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-black tracking-wider mb-2">Mobile Number</label>
                      <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-yellow-500 text-black font-medium" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-black tracking-wider mb-2">Target Grade Class</label>
                      <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-yellow-500 text-black font-medium bg-white">
                        <option>Nursery</option>
                        <option>LKG</option>
                        <option>UKG</option>
                        <option>Grade 1</option>
                        <option>Grade 2</option>
                        <option>Grade 3</option>
                        <option>Grade 4</option>
                        <option>Grade 5</option>
                        <option>Grade 6</option>
                        <option>Grade 7</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-black tracking-wider mb-2">Target Visit Date</label>
                      <input required type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-yellow-500 text-black font-medium" />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-4 bg-yellow-500 text-black text-xs font-black uppercase tracking-wider py-4 rounded-xl hover:bg-yellow-400 transition-colors"
                    >
                      Confirm Appointment
                    </button>
                  </form>
                </>
              )}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Syllabus/Form Download toast */}
      <AnimatePresence>
        {downloadSuccess && (
          <m.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 right-10 z-[250] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-yellow-500/20"
          >
            <div className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold">✓</div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Download Started</p>
              <p className="text-sm font-semibold text-white">Application Form PDF is loading...</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </main>
  );
}
