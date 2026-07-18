"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface StudentDetails {
  fullName: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  aadhaarNum: string;
}

interface ParentDetails {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  phone: string;
  email: string;
}

interface AddressDetails {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface AcademicDetails {
  classApplying: string;
  prevSchool: string;
  prevGrade: string;
  prevYear: string;
  tcNum: string;
}

export default function Apply() {
  const [step, setStep] = useState(1);
  const [draftSaved, setDraftSaved] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [appId, setAppId] = useState("");

  // Form Fields
  const [student, setStudent] = useState<StudentDetails>({
    fullName: "", dob: "", gender: "", bloodGroup: "", aadhaarNum: ""
  });
  const [parent, setParent] = useState<ParentDetails>({
    fatherName: "", fatherOccupation: "", motherName: "", motherOccupation: "", phone: "", email: ""
  });
  const [address, setAddress] = useState<AddressDetails>({
    street: "", city: "Hyderabad", state: "Telangana", pincode: ""
  });
  const [academic, setAcademic] = useState<AcademicDetails>({
    classApplying: "", prevSchool: "", prevGrade: "", prevYear: "", tcNum: ""
  });

  // Upload previews/states
  const [photo, setPhoto] = useState<string | null>(null);
  const [birthCert, setBirthCert] = useState<string | null>(null);
  const [aadhaarDoc, setAadhaarDoc] = useState<string | null>(null);
  const [otherDoc, setOtherDoc] = useState<string | null>(null);
  
  const [declaration, setDeclaration] = useState(false);
  const [signature, setSignature] = useState("");

  // Load draft if available
  useEffect(() => {
    const draft = localStorage.getItem("spoorthis_admission_draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.student) setStudent(parsed.student);
        if (parsed.parent) setParent(parsed.parent);
        if (parsed.address) setAddress(parsed.address);
        if (parsed.academic) setAcademic(parsed.academic);
        if (parsed.signature) setSignature(parsed.signature);
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  const handleSaveDraft = () => {
    const data = { student, parent, address, academic, signature };
    localStorage.setItem("spoorthis_admission_draft", JSON.stringify(data));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declaration) {
      alert("Please accept the declaration before submitting.");
      return;
    }
    // Generate mock Application ID
    const randomId = "SPO-" + Math.floor(100000 + Math.random() * 900000);
    setAppId(randomId);
    setFormSubmitted(true);
    localStorage.removeItem("spoorthis_admission_draft"); // Clear draft on successful submit
  };

  const handlePrint = () => {
    window.print();
  };

  const handleGeneratePDF = () => {
    // Open print dialog styled as PDF
    window.print();
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SUCCESS COMPONENT
  if (formSubmitted) {
    return (
      <main className="bg-slate-50 min-h-screen pt-28 pb-20 px-6 print:bg-white print:pt-0">
        <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-3xl shadow-xl p-10 print:shadow-none print:border-none">
          <div className="text-center mb-8 print:hidden">
            <span className="text-6xl">🎉</span>
            <h1 className="text-3xl font-black uppercase text-slate-900 mt-4">Application Submitted!</h1>
            <p className="text-slate-500 text-xs mt-1 font-bold">Your online admission application has been registered successfully.</p>
          </div>

          {/* Admission Invoice / Receipt layout */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50/50 print:bg-white print:border-solid">
            <div className="flex justify-between items-start pb-6 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-black text-slate-900 uppercase">SPOORTHI'S THE DUCKLING</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Papi Reddy Nagar, Hyderabad, TS</p>
              </div>
              <div className="text-right">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase print:border">
                  Received
                </span>
                <p className="text-xs font-black text-slate-900 mt-3">ID: {appId}</p>
                <p className="text-[9px] text-slate-400 font-semibold uppercase">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 border-b border-slate-200 text-sm">
              <div>
                <h3 className="text-[10px] font-black uppercase text-slate-400">Student Details</h3>
                <p className="font-bold text-slate-800 mt-1">{student.fullName}</p>
                <p className="text-xs text-slate-500 mt-0.5">DOB: {student.dob} | {student.gender}</p>
                <p className="text-xs text-slate-500">Aadhaar: {student.aadhaarNum}</p>
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase text-slate-400">Admission Details</h3>
                <p className="font-bold text-slate-800 mt-1">Class: {academic.classApplying}</p>
                <p className="text-xs text-slate-500 mt-0.5">Prev. School: {academic.prevSchool || "None"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 text-sm">
              <div>
                <h3 className="text-[10px] font-black uppercase text-slate-400">Parent Contacts</h3>
                <p className="font-bold text-slate-800 mt-1">{parent.fatherName} (Father)</p>
                <p className="text-xs text-slate-500 mt-0.5">Phone: {parent.phone}</p>
                <p className="text-xs text-slate-500">Email: {parent.email}</p>
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase text-slate-400">Address Registered</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {address.street}, {address.city}, {address.state} - {address.pincode}
                </p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
              <p className="font-bold uppercase text-[9px] text-slate-400 mb-1">Declaration Signature</p>
              <p className="font-[Brush_Script_MT] text-2xl text-slate-800 select-none italic">{signature}</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl text-xs text-slate-700 leading-relaxed print:hidden">
            <h4 className="font-black text-slate-900 uppercase mb-2">⚠️ Next Verification Steps</h4>
            <ul className="list-disc pl-5 space-y-1.5 font-medium">
              <li>Print or Save this receipt for verification during the campus visit.</li>
              <li>Bring physical copies of Student's birth certificate, Aadhaar card, and 3 passport photos.</li>
              <li>Our verification team will schedule an interactive session/interview with the child within 48 hours.</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 px-6 py-4 bg-slate-900 text-white font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-black transition duration-300"
            >
              Print Admission Form
            </button>
            <button
              onClick={handleGeneratePDF}
              className="px-6 py-4 bg-transparent border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-black uppercase text-[11px] tracking-widest rounded-xl transition duration-300"
            >
              Download PDF Receipt
            </button>
            <Link
              href="/"
              className="px-6 py-4 bg-yellow-400 text-black font-black uppercase text-[11px] tracking-widest rounded-xl text-center hover:bg-yellow-300 transition duration-300"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // MAIN FORM LAYOUT
  return (
    <main className="bg-slate-50 text-slate-800 min-h-screen pt-28 pb-20 px-6 print:bg-white print:pt-0">
      <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-3xl shadow-xl p-8 md:p-10 print:shadow-none print:border-none">
        
        {/* HEADER BAR */}
        <div className="flex justify-between items-center pb-6 border-b border-slate-100 mb-8 print:hidden">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
              Admission Form 2025-26
            </span>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mt-3">Online Admission</h1>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              {draftSaved ? "✓ Draft Saved" : "Save Draft"}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Print
            </button>
          </div>
        </div>

        {/* PROGRESS STEP BAR */}
        <div className="grid grid-cols-5 gap-3 mb-10 text-center font-black text-[9px] uppercase tracking-wider print:hidden">
          {[
            { step: 1, label: "Student" },
            { step: 2, label: "Parents" },
            { step: 3, label: "Academic" },
            { step: 4, label: "Uploads" },
            { step: 5, label: "Declaration" }
          ].map((s) => (
            <div key={s.step} className="space-y-2">
              <div className={`h-1.5 rounded-full transition-all duration-300 ${
                step >= s.step ? "bg-yellow-400" : "bg-slate-100"
              }`} />
              <span className={step === s.step ? "text-slate-900 font-black" : "text-slate-400"}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* FORM CONTAINER */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* STEP 1: STUDENT DETAILS */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-black uppercase text-slate-900 border-b pb-2">Student Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Full Name (As in birth certificate)</label>
                  <input
                    type="text"
                    required
                    value={student.fullName}
                    onChange={(e) => setStudent({ ...student, fullName: e.target.value })}
                    placeholder="e.g. Aarav Reddy"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={student.dob}
                    onChange={(e) => setStudent({ ...student, dob: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Gender</label>
                  <select
                    required
                    value={student.gender}
                    onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Blood Group</label>
                  <input
                    type="text"
                    required
                    value={student.bloodGroup}
                    onChange={(e) => setStudent({ ...student, bloodGroup: e.target.value })}
                    placeholder="e.g. O+ve"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Student's Aadhaar Number</label>
                  <input
                    type="text"
                    required
                    value={student.aadhaarNum}
                    onChange={(e) => setStudent({ ...student, aadhaarNum: e.target.value })}
                    placeholder="12-digit Aadhaar Number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PARENT DETAILS & ADDRESS */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-lg font-black uppercase text-slate-900 border-b pb-2">Parent / Guardian Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Father's Full Name</label>
                    <input
                      type="text"
                      required
                      value={parent.fatherName}
                      onChange={(e) => setParent({ ...parent, fatherName: e.target.value })}
                      placeholder="Father's Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Father's Occupation</label>
                    <input
                      type="text"
                      required
                      value={parent.fatherOccupation}
                      onChange={(e) => setParent({ ...parent, fatherOccupation: e.target.value })}
                      placeholder="e.g. software engineer"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Mother's Full Name</label>
                    <input
                      type="text"
                      required
                      value={parent.motherName}
                      onChange={(e) => setParent({ ...parent, motherName: e.target.value })}
                      placeholder="Mother's Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Mother's Occupation</label>
                    <input
                      type="text"
                      required
                      value={parent.motherOccupation}
                      onChange={(e) => setParent({ ...parent, motherOccupation: e.target.value })}
                      placeholder="e.g. Teacher"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Primary Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={parent.phone}
                      onChange={(e) => setParent({ ...parent, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={parent.email}
                      onChange={(e) => setParent({ ...parent, email: e.target.value })}
                      placeholder="parent@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-lg font-black uppercase text-slate-900 border-b pb-2">Residential Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Street Address</label>
                    <input
                      type="text"
                      required
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      placeholder="House No, Road No, Area"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">City</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Pin Code</label>
                    <input
                      type="text"
                      required
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="6-digit pincode"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CLASS & PREVIOUS SCHOOL DETAILS */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-black uppercase text-slate-900 border-b pb-2">Academic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Class Applying For</label>
                  <select
                    required
                    value={academic.classApplying}
                    onChange={(e) => setAcademic({ ...academic, classApplying: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                  >
                    <option value="">Select Grade</option>
                    <option value="Play Group">Play Group</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Previous School Attended (If any)</label>
                  <input
                    type="text"
                    value={academic.prevSchool}
                    onChange={(e) => setAcademic({ ...academic, prevSchool: e.target.value })}
                    placeholder="Previous School Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Previous Grade Completed</label>
                  <input
                    type="text"
                    value={academic.prevGrade}
                    onChange={(e) => setAcademic({ ...academic, prevGrade: e.target.value })}
                    placeholder="e.g. LKG"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Year of Passing / Leaving</label>
                  <input
                    type="text"
                    value={academic.prevYear}
                    onChange={(e) => setAcademic({ ...academic, prevYear: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Transfer Certificate (TC) Number</label>
                  <input
                    type="text"
                    value={academic.tcNum}
                    onChange={(e) => setAcademic({ ...academic, tcNum: e.target.value })}
                    placeholder="TC Registration Number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: DOCUMENT UPLOADS */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-black uppercase text-slate-900 border-b pb-2">Upload Required Documents</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. PHOTO */}
                <div className="border border-dashed border-slate-200 p-5 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-2">📸</span>
                  <h3 className="text-xs font-black uppercase text-slate-800">Student Passport Photo</h3>
                  <p className="text-[10px] text-slate-400 mt-1 mb-4">Format: JPG, PNG (Max 2MB)</p>
                  
                  {photo ? (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                      <img src={photo} className="w-full h-full object-cover" alt="Student preview" />
                      <button 
                        type="button" 
                        onClick={() => setPhoto(null)} 
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <input 
                      type="file" 
                      required 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setPhoto)}
                      className="text-xs w-full text-center file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-black cursor-pointer"
                    />
                  )}
                </div>

                {/* 2. BIRTH CERTIFICATE */}
                <div className="border border-dashed border-slate-200 p-5 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-2">👶</span>
                  <h3 className="text-xs font-black uppercase text-slate-800">Birth Certificate</h3>
                  <p className="text-[10px] text-slate-400 mt-1 mb-4">Format: PDF, JPG (Max 5MB)</p>
                  
                  {birthCert ? (
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-xl">
                      <span>✓ Uploaded</span>
                      <button type="button" onClick={() => setBirthCert(null)} className="text-red-500 font-bold ml-2">Remove</button>
                    </div>
                  ) : (
                    <input 
                      type="file" 
                      required
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, setBirthCert)}
                      className="text-xs w-full text-center file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-black cursor-pointer"
                    />
                  )}
                </div>

                {/* 3. AADHAAR CARD */}
                <div className="border border-dashed border-slate-200 p-5 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-2">💳</span>
                  <h3 className="text-xs font-black uppercase text-slate-800">Student Aadhaar Card</h3>
                  <p className="text-[10px] text-slate-400 mt-1 mb-4">Format: PDF, JPG (Max 5MB)</p>
                  
                  {aadhaarDoc ? (
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-xl">
                      <span>✓ Uploaded</span>
                      <button type="button" onClick={() => setAadhaarDoc(null)} className="text-red-500 font-bold ml-2">Remove</button>
                    </div>
                  ) : (
                    <input 
                      type="file" 
                      required
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, setAadhaarDoc)}
                      className="text-xs w-full text-center file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-black cursor-pointer"
                    />
                  )}
                </div>

                {/* 4. OTHER DOCUMENTS (TC, Report Card) */}
                <div className="border border-dashed border-slate-200 p-5 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-2">📄</span>
                  <h3 className="text-xs font-black uppercase text-slate-800">TC / Previous Report Card</h3>
                  <p className="text-[10px] text-slate-400 mt-1 mb-4">Format: PDF, JPG (Max 5MB)</p>
                  
                  {otherDoc ? (
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-xl">
                      <span>✓ Uploaded</span>
                      <button type="button" onClick={() => setOtherDoc(null)} className="text-red-500 font-bold ml-2">Remove</button>
                    </div>
                  ) : (
                    <input 
                      type="file" 
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, setOtherDoc)}
                      className="text-xs w-full text-center file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-black cursor-pointer"
                    />
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {/* STEP 5: DECLARATION & SUBMIT */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-black uppercase text-slate-900 border-b pb-2">Declaration</h2>
              
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed">
                <p>
                  1. I/We hereby declare that all information supplied in this online registration form is correct and true to the best of my/our knowledge.
                </p>
                <p>
                  2. I/We understand that submission of this form does not guarantee admission. The final decision rests with the School Management based on seat availability and evaluation.
                </p>
                <p>
                  3. I/We agree to abide by all the rules and regulations of Spoorthi's The Duckling regarding fees, attendance, discipline, and code of conduct.
                </p>
              </div>

              <div className="flex items-start gap-3 mt-6">
                <input
                  type="checkbox"
                  id="declare-check"
                  required
                  checked={declaration}
                  onChange={(e) => setDeclaration(e.target.checked)}
                  className="mt-1 w-4 h-4 text-yellow-400 focus:ring-yellow-400 rounded cursor-pointer"
                />
                <label htmlFor="declare-check" className="text-xs md:text-sm text-slate-700 font-bold select-none cursor-pointer">
                  I hereby declare that all information provided is accurate and I accept the terms listed above.
                </label>
              </div>

              <div className="mt-6">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Electronic Signature (Type Parent's Full Name)</label>
                <input
                  type="text"
                  required
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="e.g. Anand Reddy"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                />
              </div>

              {/* Action Submit Buttons */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={!declaration}
                  className="w-full px-6 py-4 bg-yellow-400 text-black disabled:bg-slate-100 disabled:text-slate-400 font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-yellow-300 transition duration-300 shadow-md"
                >
                  Submit Application
                </button>
              </div>
            </motion.div>
          )}

          {/* PROGRESS BUTTONS PANEL */}
          <div className="flex justify-between items-center pt-8 border-t border-slate-100 mt-8 print:hidden">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 rounded-xl font-bold text-xs uppercase tracking-wider transition"
            >
              ← Back
            </button>

            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs uppercase tracking-wider transition"
              >
                Continue →
              </button>
            ) : null}
          </div>

        </form>
      </div>
    </main>
  );
}
