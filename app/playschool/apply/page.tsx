"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Step = 1 | 2 | 3 | 4;

const STEPS = [
  { id: 1, label: "Student Info" },
  { id: 2, label: "Parent Info" },
  { id: 3, label: "Program" },
  { id: 4, label: "Documents" },
];

const initialForm = {
  // Student
  studentName: "", dob: "", gender: "", bloodGroup: "",
  // Parent
  fatherName: "", motherName: "", fatherPhone: "", motherPhone: "",
  email: "", address: "", city: "Hyderabad", pincode: "",
  // Program
  program: "", branch: "", academicYear: "2025-26",
  prevSchool: "", prevClass: "",
  // Docs
  photoUploaded: false, birthCertUploaded: false, aadhaarUploaded: false,
  declaration: false,
};

export default function PlaySchoolApply() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [loading, setLoading] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) setStep((s) => (s + 1) as Step);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.declaration) {
      alert("Please accept the declaration to proceed.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const id = "LBL-" + Math.floor(100000 + Math.random() * 900000);
      setAppId(id);
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const saveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  const handlePrint = () => window.print();

  if (submitted) {
    return (
      <main className="bg-[#F8FBFF] min-h-screen pt-28 pb-20 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-100 rounded-3xl p-12 max-w-lg w-full text-center shadow-lg space-y-6"
        >
          <span className="text-6xl block">🎉</span>
          <h2 className="text-2xl font-black uppercase text-slate-900">Application Submitted!</h2>
          <p className="text-slate-500 text-xs leading-relaxed font-semibold">
            Congratulations! Your application has been successfully recorded. Please save your Application ID below.
          </p>
          <div className="bg-[#F8FBFF] border-2 border-dashed border-pink-200 rounded-2xl py-6 px-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Your Application ID</p>
            <p className="text-3xl font-black text-pink-500 mt-2">{appId}</p>
          </div>
          <p className="text-[9px] text-slate-400 font-semibold">
            Track your application status at <span className="text-[#0f4c81] font-black">/playschool/admissions</span>. Our team will contact you within 48 hours.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={handlePrint} className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-black uppercase text-[9px] tracking-widest rounded-xl transition">
              Print Receipt
            </button>
            <button onClick={() => { setSubmitted(false); setForm(initialForm); setStep(1); }} className="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-black uppercase text-[9px] tracking-widest rounded-xl transition">
              New Application
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-[#F8FBFF] overflow-x-hidden pt-28 pb-20">

      {/* HERO */}
      <section className="py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full">
            Online Enrolment
          </span>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-slate-900 tracking-tight">
            Apply <span className="text-pink-500">Online</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed font-semibold">
            Fill in the four-step admission form. You can save a draft and return later.
          </p>
        </div>
      </section>

      {/* STEP PROGRESS BAR */}
      <section className="px-6 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-100 z-0" />
            <div
              className="absolute top-4 left-0 h-0.5 bg-pink-500 z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
            {STEPS.map((s) => (
              <div key={s.id} className="z-10 flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all duration-300 ${
                  step >= s.id ? "bg-pink-500 border-pink-500 text-white" : "bg-white border-slate-200 text-slate-400"
                }`}>
                  {step > s.id ? "✓" : s.id}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider hidden sm:block ${step >= s.id ? "text-pink-500" : "text-slate-400"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM STEPS */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">

          {/* STEP 1 — STUDENT */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-5">
              <h2 className="text-lg font-black uppercase text-slate-900 pb-2 border-b">Step 1: Student Details</h2>
              <div>
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Child's Full Name *</label>
                <input required value={form.studentName} onChange={e => update("studentName", e.target.value)} placeholder="Enter full name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Date of Birth *</label>
                  <input type="date" required value={form.dob} onChange={e => update("dob", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Gender *</label>
                  <select required value={form.gender} onChange={e => update("gender", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition">
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Blood Group</label>
                <select value={form.bloodGroup} onChange={e => update("bloodGroup", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition">
                  <option value="">Select (optional)</option>
                  {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => <option key={bg}>{bg}</option>)}
                </select>
              </div>
              <Buttons step={step} saveDraft={saveDraft} draftSaved={draftSaved} loading={loading} />
            </form>
          )}

          {/* STEP 2 — PARENT */}
          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-5">
              <h2 className="text-lg font-black uppercase text-slate-900 pb-2 border-b">Step 2: Parent / Guardian Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Father's Name *</label>
                  <input required value={form.fatherName} onChange={e => update("fatherName", e.target.value)} placeholder="Father's full name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Mother's Name *</label>
                  <input required value={form.motherName} onChange={e => update("motherName", e.target.value)} placeholder="Mother's full name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Father's Phone *</label>
                  <input type="tel" required value={form.fatherPhone} onChange={e => update("fatherPhone", e.target.value)} placeholder="+91 ..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Mother's Phone</label>
                  <input type="tel" value={form.motherPhone} onChange={e => update("motherPhone", e.target.value)} placeholder="+91 ..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Parent Email *</label>
                <input type="email" required value={form.email} onChange={e => update("email", e.target.value)} placeholder="parent@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Residential Address *</label>
                <textarea rows={2} required value={form.address} onChange={e => update("address", e.target.value)} placeholder="Flat, Road, Area, Hyderabad" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">City</label>
                  <input value={form.city} readOnly className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Pincode *</label>
                  <input required value={form.pincode} onChange={e => update("pincode", e.target.value)} placeholder="e.g. 500037" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
                </div>
              </div>
              <Buttons step={step} setStep={setStep} saveDraft={saveDraft} draftSaved={draftSaved} loading={loading} />
            </form>
          )}

          {/* STEP 3 — PROGRAM */}
          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-5">
              <h2 className="text-lg font-black uppercase text-slate-900 pb-2 border-b">Step 3: Program Selection</h2>
              <div>
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Program Applying For *</label>
                <select required value={form.program} onChange={e => update("program", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition">
                  <option value="">Select program</option>
                  <option>Play Group (Age 1.5–2.5)</option>
                  <option>Nursery (Age 2.5–3.5)</option>
                  <option>LKG (Age 3.5–4.5)</option>
                  <option>UKG (Age 4.5–5.5)</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Preferred Branch *</label>
                <select required value={form.branch} onChange={e => update("branch", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition">
                  <option value="">Select branch</option>
                  <option>Papi Reddy Nagar (Head Branch)</option>
                  <option>Gachibowli Branch</option>
                  <option>Kukatpally Branch</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Academic Year</label>
                <input value={form.academicYear} readOnly className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Previous School (if any)</label>
                  <input value={form.prevSchool} onChange={e => update("prevSchool", e.target.value)} placeholder="School name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">Previous Class</label>
                  <input value={form.prevClass} onChange={e => update("prevClass", e.target.value)} placeholder="e.g. Play Group" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
                </div>
              </div>
              <Buttons step={step} setStep={setStep} saveDraft={saveDraft} draftSaved={draftSaved} loading={loading} />
            </form>
          )}

          {/* STEP 4 — DOCUMENTS */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-lg font-black uppercase text-slate-900 pb-2 border-b">Step 4: Upload Documents</h2>
              <p className="text-xs text-slate-400 font-semibold">Upload the following scanned copies (PDF or JPG, max 2MB each).</p>

              {[
                { label: "Child's Photo (Passport Size) *", field: "photoUploaded" },
                { label: "Birth Certificate *", field: "birthCertUploaded" },
                { label: "Child's Aadhaar Card *", field: "aadhaarUploaded" },
              ].map((doc) => (
                <div key={doc.field} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                  <span className="text-xs font-semibold text-slate-700">{doc.label}</span>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={() => update(doc.field, true)}
                    />
                    <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-lg transition ${
                      (form as any)[doc.field] ? "bg-emerald-100 text-emerald-700" : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                    }`}>
                      {(form as any)[doc.field] ? "✓ Uploaded" : "Upload File"}
                    </span>
                  </label>
                </div>
              ))}

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.declaration}
                    onChange={e => update("declaration", e.target.checked)}
                    className="mt-1 accent-pink-500"
                  />
                  <span className="text-xs text-slate-600 font-semibold leading-relaxed">
                    I hereby declare that all the information provided in this application is true and correct to the best of my knowledge. I agree to abide by the school's rules and policies.
                  </span>
                </label>
              </div>

              <Buttons step={step} setStep={setStep} saveDraft={saveDraft} draftSaved={draftSaved} loading={loading} isLastStep />
            </form>
          )}

        </div>
      </section>

    </main>
  );
}

// Reusable nav buttons component
function Buttons({
  step, setStep, saveDraft, draftSaved, loading, isLastStep = false
}: {
  step: Step;
  setStep?: (s: Step) => void;
  saveDraft: () => void;
  draftSaved: boolean;
  loading: boolean;
  isLastStep?: boolean;
}) {
  return (
    <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-slate-100">
      <div className="flex gap-2">
        {step > 1 && setStep && (
          <button type="button" onClick={() => setStep((step - 1) as Step)} className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-black uppercase text-[9px] tracking-widest rounded-xl transition">
            ← Back
          </button>
        )}
        <button type="button" onClick={saveDraft} className="px-5 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 font-black uppercase text-[9px] tracking-widest rounded-xl transition">
          {draftSaved ? "✓ Saved!" : "Save Draft"}
        </button>
      </div>
      <button type="submit" disabled={loading} className="px-8 py-2.5 bg-slate-900 hover:bg-pink-500 text-white font-black uppercase text-[9px] tracking-widest rounded-xl transition">
        {loading ? "Processing..." : isLastStep ? "Submit Application" : "Next Step →"}
      </button>
    </div>
  );
}
