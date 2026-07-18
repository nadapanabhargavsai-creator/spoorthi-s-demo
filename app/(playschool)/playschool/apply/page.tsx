"use client";

import { useState, useEffect } from "react";
import { usePlayschoolDb } from "../context/PlayschoolDb";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function PlayschoolApply() {
  const { submitApplication } = usePlayschoolDb();

  const [step, setStep] = useState(1);
  const [draftSaved, setDraftSaved] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [appId, setAppId] = useState("");

  // Form Fields State
  const [student, setStudent] = useState({ fullName: "", dob: "", gender: "Male", bloodGroup: "A+", aadhaarNum: "" });
  const [parent, setParent] = useState({ fatherName: "", fatherOccupation: "", motherName: "", motherOccupation: "", phone: "", email: "" });
  const [address, setAddress] = useState({ street: "", city: "Hyderabad", state: "Telangana", pincode: "" });
  const [academic, setAcademic] = useState({ program: "Play Group", prevSchool: "" });
  const [medicalInfo, setMedicalInfo] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [declaration, setDeclaration] = useState(false);
  const [signature, setSignature] = useState("");

  // Upload placeholder states
  const [photo, setPhoto] = useState<string | null>(null);
  const [birthCert, setBirthCert] = useState<string | null>(null);
  const [aadhaarDoc, setAadhaarDoc] = useState<string | null>(null);
  const [otherDoc, setOtherDoc] = useState<string | null>(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    const draft = localStorage.getItem("lb_admission_draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.student) setStudent(parsed.student);
        if (parsed.parent) setParent(parsed.parent);
        if (parsed.address) setAddress(parsed.address);
        if (parsed.academic) setAcademic(parsed.academic);
        if (parsed.medicalInfo) setMedicalInfo(parsed.medicalInfo);
        if (parsed.emergencyContact) setEmergencyContact(parsed.emergencyContact);
        if (parsed.signature) setSignature(parsed.signature);
      } catch (e) {
        console.error("Failed to parse playschool draft", e);
      }
    }
  }, []);

  const handleSaveDraft = () => {
    const data = { student, parent, address, academic, medicalInfo, emergencyContact, signature };
    localStorage.setItem("lb_admission_draft", JSON.stringify(data));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
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
      alert("Please check the declaration checkbox before submitting.");
      return;
    }

    const payload = {
      student: { ...student, photo: photo || undefined, birthCert: birthCert || undefined, aadhaarDoc: aadhaarDoc || undefined, otherDoc: otherDoc || undefined },
      parent,
      address,
      academic,
      medicalInfo,
      emergencyContact
    };

    const newId = submitApplication(payload);
    setAppId(newId);
    setFormSubmitted(true);
    localStorage.removeItem("lb_admission_draft"); // Clear draft
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SUCCESS / RECEIPT SCREEN
  if (formSubmitted) {
    return (
      <main className="bg-slate-50 min-h-screen pt-28 pb-20 px-6 print:bg-white print:pt-0 font-['Quicksand']">
        <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-3xl shadow-xl p-10 print:shadow-none print:border-none text-left">
          <div className="text-center mb-8 print:hidden">
            <span className="text-6xl">🎉</span>
            <h1 className="text-3xl font-['Fredoka'] font-black text-slate-900 mt-4">Registration Completed!</h1>
            <p className="text-slate-500 text-xs mt-1 font-bold">Your online admission form has been received and stored in our system database.</p>
          </div>

          {/* Printable Receipt Card */}
          <div className="border-4 border-dashed border-sky-200 rounded-3xl p-8 bg-sky-50/20 print:bg-white print:border-solid">
            <div className="flex justify-between items-start pb-6 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-['Fredoka'] font-black text-sky-600 uppercase">🌸 Little Blossoms</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Telecom Nagar, Gachibowli, Hyderabad</p>
              </div>
              <div className="text-right">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase print:border">
                  Submitted
                </span>
                <p className="text-xs font-black text-slate-900 mt-3">ID: {appId}</p>
                <p className="text-[9.5px] text-slate-400 font-semibold uppercase">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 border-b border-slate-200 text-sm">
              <div>
                <h3 className="text-[10px] font-black uppercase text-slate-400">Child Details</h3>
                <p className="font-bold text-slate-800 mt-1">{student.fullName}</p>
                <p className="text-xs text-gray-500 mt-0.5">DOB: {student.dob} | {student.gender}</p>
                <p className="text-xs text-gray-500">Aadhaar ID: {student.aadhaarNum || "None"}</p>
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase text-slate-400">Class Program</h3>
                <p className="font-bold text-slate-800 mt-1">{academic.program}</p>
                <p className="text-xs text-gray-500 mt-0.5">Prev. School: {academic.prevSchool || "None"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 border-b border-slate-200 text-sm">
              <div>
                <h3 className="text-[10px] font-black uppercase text-slate-400">Parent Details</h3>
                <p className="font-bold text-slate-800 mt-1">{parent.fatherName} (Father)</p>
                <p className="text-xs text-gray-500 mt-0.5">Mother: {parent.motherName}</p>
                <p className="text-xs text-gray-500">Phone: {parent.phone}</p>
                <p className="text-xs text-gray-500">Email: {parent.email}</p>
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase text-slate-400">Registered Address</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {address.street}, {address.city}, {address.state} - {address.pincode}
                </p>
              </div>
            </div>

            <div className="pt-6 text-center text-xs text-slate-500 flex justify-between items-center">
              <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase text-left">Emergency Contact</p>
                <p className="font-bold text-slate-700">{emergencyContact}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Parent Signature</p>
                <p className="font-[Brush_Script_MT] text-2xl text-slate-800 italic select-none">{signature}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl text-xs text-slate-700 leading-relaxed print:hidden">
            <h4 className="font-black text-slate-900 uppercase mb-2">⚠️ What is Next?</h4>
            <ul className="list-disc pl-5 space-y-1.5 font-bold">
              <li>Print this receipt out or save it as a PDF.</li>
              <li>Visit your selected campus with your child for a basic interactive interview.</li>
              <li>Bring physical copies of the uploaded documents for verification checks.</li>
              <li>You can check status updates on the admissions portal using ID: <strong className="text-pink-600 font-black">{appId}</strong>.</li>
            </ul>
          </div>

          <div className="mt-8 flex gap-4 print:hidden">
            <button
              onClick={() => window.print()}
              className="bg-slate-900 text-white font-black text-xs uppercase px-8 py-3.5 rounded-full hover:bg-slate-800 transition shadow-sm"
            >
              🖨️ Print Receipt / Save PDF
            </button>
            <Link
              href="/playschool"
              className="border-2 border-slate-200 hover:bg-slate-50 text-slate-600 font-black text-xs uppercase px-8 py-3.5 rounded-full transition text-center"
            >
              Go to Home Page
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="w-full font-['Quicksand'] pb-20">
      
      {/* ========== HERO BANNER ========== */}
      <section className="bg-gradient-to-r from-sky-100 via-pink-100 to-yellow-100 py-16 px-6 text-center border-b-8 border-dashed border-sky-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 ONLINE REGISTRATION</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Preschool Admission Form
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Fill the multi-step form to register your child. Save drafts to pick up later if needed.
          </p>
        </div>
      </section>

      {/* ========== FORM CONTENT ========== */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-10 text-[10px] sm:text-xs font-black text-gray-400">
          {[
            { s: 1, label: "Child Details" },
            { s: 2, label: "Parent Details" },
            { s: 3, label: "Academic / Address" },
            { s: 4, label: "Documents" },
            { s: 5, label: "Declaration" }
          ].map((item) => (
            <div key={item.s} className="flex flex-col items-center gap-1.5">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition ${
                step === item.s ? "bg-sky-500 border-sky-500 text-white font-['Fredoka'] font-black" : 
                step > item.s ? "bg-emerald-500 border-emerald-500 text-white font-black" : "bg-white border-slate-200"
              }`}>
                {step > item.s ? "✓" : item.s}
              </span>
              <span className={step === item.s ? "text-sky-600 font-bold" : ""}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-md p-8 sm:p-10 text-left">
          
          {/* STEP 1: STUDENT DETAILS */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-['Fredoka'] font-black text-xl text-slate-800">Child General Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Child Full Name *</label>
                  <input
                    type="text"
                    required
                    value={student.fullName}
                    onChange={(e) => setStudent({ ...student, fullName: e.target.value })}
                    placeholder="Enter child's full name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={student.dob}
                    onChange={(e) => setStudent({ ...student, dob: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Gender *</label>
                  <select
                    value={student.gender}
                    onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-bold text-gray-600 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Blood Group *</label>
                  <input
                    type="text"
                    value={student.bloodGroup}
                    onChange={(e) => setStudent({ ...student, bloodGroup: e.target.value })}
                    placeholder="e.g. O+, A+"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Aadhaar Number</label>
                  <input
                    type="text"
                    value={student.aadhaarNum}
                    onChange={(e) => setStudent({ ...student, aadhaarNum: e.target.value })}
                    placeholder="12-digit number..."
                    maxLength={12}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Child Passport Size Photograph *</label>
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-3xl overflow-hidden shrink-0">
                    {photo ? <img src={photo} className="w-full h-full object-cover" /> : "👶"}
                  </div>
                  <div className="flex-grow">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setPhoto)}
                      className="text-xs"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">PNG, JPG, JPEG formats only. Max 1MB.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PARENT DETAILS */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-['Fredoka'] font-black text-xl text-slate-800">Parents Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Father's Name *</label>
                  <input
                    type="text"
                    required
                    value={parent.fatherName}
                    onChange={(e) => setParent({ ...parent, fatherName: e.target.value })}
                    placeholder="Father's full name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Father's Occupation</label>
                  <input
                    type="text"
                    value={parent.fatherOccupation}
                    onChange={(e) => setParent({ ...parent, fatherOccupation: e.target.value })}
                    placeholder="Father's occupation..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Mother's Name *</label>
                  <input
                    type="text"
                    required
                    value={parent.motherName}
                    onChange={(e) => setParent({ ...parent, motherName: e.target.value })}
                    placeholder="Mother's full name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Mother's Occupation</label>
                  <input
                    type="text"
                    value={parent.motherOccupation}
                    onChange={(e) => setParent({ ...parent, motherOccupation: e.target.value })}
                    placeholder="Mother's occupation..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Contact Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={parent.phone}
                    onChange={(e) => setParent({ ...parent, phone: e.target.value })}
                    placeholder="Active mobile number..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Contact Email Address *</label>
                  <input
                    type="email"
                    required
                    value={parent.email}
                    onChange={(e) => setParent({ ...parent, email: e.target.value })}
                    placeholder="Active email address..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ACADEMIC & ADDRESS */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-['Fredoka'] font-black text-xl text-slate-800">Academic & Address Coordinates</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Program Applying For *</label>
                  <select
                    value={academic.program}
                    onChange={(e) => setAcademic({ ...academic, program: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-bold text-gray-600 bg-white"
                  >
                    <option value="Play Group">Play Group (Ages 1.5 - 2.5)</option>
                    <option value="Nursery">Nursery (Ages 2.5 - 3.5)</option>
                    <option value="LKG">LKG (Lower Kindergarten, Ages 3.5 - 4.5)</option>
                    <option value="UKG">UKG (Upper Kindergarten, Ages 4.5 - 5.5)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Previous School Attended (If Any)</label>
                  <input
                    type="text"
                    value={academic.prevSchool}
                    onChange={(e) => setAcademic({ ...academic, prevSchool: e.target.value })}
                    placeholder="Previous play school name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="font-[Quicksand] font-bold text-slate-700 text-sm">Residential Address</h4>
                
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="House number, colony, street name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">City *</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">State *</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="6-digit pincode..."
                      maxLength={6}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DOCUMENTS UPLOAD */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-['Fredoka'] font-black text-xl text-slate-800">Upload Required Documents</h3>
              <p className="text-xs text-gray-400 font-semibold mb-2">Upload clean JPG/PNG image files or PDF documents. Maximum size 2MB each.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Birth Cert */}
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center hover:bg-slate-50 transition relative">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => handleFileChange(e, setBirthCert)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-1">
                    <span className="text-2xl block">📜</span>
                    <strong className="text-xs text-slate-800 block">Birth Certificate *</strong>
                    <p className="text-[10px] text-gray-400">
                      {birthCert ? "File selected ✓" : "Upload child's birth certificate"}
                    </p>
                  </div>
                </div>

                {/* Aadhaar Doc */}
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center hover:bg-slate-50 transition relative">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => handleFileChange(e, setAadhaarDoc)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-1">
                    <span className="text-2xl block">💳</span>
                    <strong className="text-xs text-slate-800 block">Child Aadhaar Card</strong>
                    <p className="text-[10px] text-gray-400">
                      {aadhaarDoc ? "File selected ✓" : "Upload child's Aadhaar card"}
                    </p>
                  </div>
                </div>

                {/* Other Docs */}
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center hover:bg-slate-50 transition relative col-span-1 sm:col-span-2">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => handleFileChange(e, setOtherDoc)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-1">
                    <span className="text-2xl block">📂</span>
                    <strong className="text-xs text-slate-800 block">Vaccination Card / Other Files</strong>
                    <p className="text-[10px] text-gray-400">
                      {otherDoc ? "File selected ✓" : "Upload medical records or immunization cards"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: DECLARATION */}
          {step === 5 && (
            <div className="space-y-6">
              <h3 className="font-['Fredoka'] font-black text-xl text-slate-800">Medical Details & Declaration</h3>

              <div>
                <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Special Medical Information / Allergies</label>
                <textarea
                  rows={3}
                  value={medicalInfo}
                  onChange={(e) => setMedicalInfo(e.target.value)}
                  placeholder="Share details if your child has food/drug allergies, asthma, or needs medication..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Emergency Contact Details *</label>
                <input
                  type="text"
                  required
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="e.g. 9876543210 (Alok - Father)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                />
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs text-gray-500 leading-relaxed font-bold space-y-4">
                <p>
                  🔒 <strong>Admissions Policy Declaration:</strong> I hereby declare that all information furnished above is accurate to the best of my knowledge. I understand that seat allotment is subject to school verification checks and fee deposits.
                </p>
                <label className="flex items-center gap-2.5 cursor-pointer text-slate-800 font-extrabold select-none">
                  <input
                    type="checkbox"
                    checked={declaration}
                    onChange={(e) => setDeclaration(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  I accept the admissions policies and conditions. *
                </label>
              </div>

              <div>
                <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Signature Name (Type name for E-sign) *</label>
                <input
                  type="text"
                  required
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Type your full name to e-sign..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-bold text-slate-700 italic font-[Brush_Script_MT] text-lg"
                />
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-between items-center mt-10 border-t border-slate-100 pt-6">
            <button
              type="button"
              disabled={step === 1}
              onClick={prevStep}
              className="px-6 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold text-xs uppercase tracking-wider text-slate-500 disabled:opacity-50"
            >
              ← Back
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 py-2.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-bold text-xs uppercase tracking-wider rounded-xl transition"
              >
                💾 Save Draft
              </button>
              
              {step < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-2.5 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition"
                >
                  Submit Form 🚀
                </button>
              )}
            </div>
          </div>

          {draftSaved && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-xs text-yellow-600 font-bold mt-4"
            >
              Draft details saved to your local browser storage!
            </motion.p>
          )}

        </div>
      </section>

    </div>
  );
}
