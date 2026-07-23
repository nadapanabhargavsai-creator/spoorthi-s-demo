"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";
import { motion } from "framer-motion";

// ─── interfaces ────────────────────────────────────────────────────────────────

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
  street: string;
  city: string;
  pincode: string;
}

interface AcademicDetails {
  classApplying: string;
  prevSchool: string;
  prevGrade: string;
  prevYear: string;
  tcNum: string;
}

interface AdmissionFormRecord {
  id?: string;
  studentName: string;
  dob: string;
  previousSchool: string;
  classAppliedFor: string;
  contactNumber: string;
  address: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  parentUid: string;
  // enriched fields
  gender?: string;
  bloodGroup?: string;
  aadhaarNum?: string;
  fatherName?: string;
  motherName?: string;
  fatherOccupation?: string;
  motherOccupation?: string;
  email?: string;
  prevGrade?: string;
  prevYear?: string;
  tcNum?: string;
  declarationSignature?: string;
}

// ─── constants ─────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const STATUS_ICONS: Record<string, string> = {
  pending: "⏳",
  approved: "✅",
  rejected: "❌",
};

const EMPTY_STUDENT: StudentDetails = {
  fullName: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  aadhaarNum: "",
};
const EMPTY_PARENT: ParentDetails = {
  fatherName: "",
  fatherOccupation: "",
  motherName: "",
  motherOccupation: "",
  phone: "",
  email: "",
  street: "",
  city: "Hyderabad",
  pincode: "",
};
const EMPTY_ACADEMIC: AcademicDetails = {
  classApplying: "",
  prevSchool: "",
  prevGrade: "",
  prevYear: "",
  tcNum: "",
};

// Sanitize input — strip HTML tags and trim whitespace
const sanitize = (val: string) => val.replace(/<[^>]*>/g, "").trim();

// ─── component ─────────────────────────────────────────────────────────────────

export default function ParentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<AdmissionFormRecord[]>([]);
  const [activeTab, setActiveTab] = useState<"submissions" | "apply">(
    "submissions"
  );
  const router = useRouter();

  // ── multi-step form state ──────────────────────────────────────────────────
  const [step, setStep] = useState(1);
  const [student, setStudent] = useState<StudentDetails>(EMPTY_STUDENT);
  const [parent, setParent] = useState<ParentDetails>(EMPTY_PARENT);
  const [academic, setAcademic] = useState<AcademicDetails>(EMPTY_ACADEMIC);
  const [declaration, setDeclaration] = useState(false);
  const [signature, setSignature] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);

  // ── auth guard ────────────────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchSubmissions(currentUser.uid);
      } else {
        router.push("/auth/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // ── load draft ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const draft = localStorage.getItem("spoorthis_parent_admission_draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.student) setStudent(parsed.student);
        if (parsed.parent) setParent(parsed.parent);
        if (parsed.academic) setAcademic(parsed.academic);
        if (parsed.signature) setSignature(parsed.signature);
      } catch {
        // corrupt draft — ignore
      }
    }
  }, []);

  // ── fetch submissions ──────────────────────────────────────────────────────
  const fetchSubmissions = async (uid: string) => {
    try {
      const q = query(
        collection(db, "admissionForms"),
        where("parentUid", "==", uid)
      );
      const snapshot = await getDocs(q);
      const forms: AdmissionFormRecord[] = [];
      snapshot.forEach((doc) =>
        forms.push({ id: doc.id, ...doc.data() } as AdmissionFormRecord)
      );
      forms.sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      setSubmissions(forms);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  // ── save draft ────────────────────────────────────────────────────────────
  const handleSaveDraft = () => {
    localStorage.setItem(
      "spoorthis_parent_admission_draft",
      JSON.stringify({ student, parent, academic, signature })
    );
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  // ── navigation ─────────────────────────────────────────────────────────────
  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── form submit ────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!declaration) {
      alert("Please accept the declaration before submitting.");
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      const newForm = {
        // Fields stored for compatibility with admin dashboard
        studentName: sanitize(student.fullName),
        dob: student.dob,
        previousSchool: sanitize(academic.prevSchool),
        classAppliedFor: sanitize(academic.classApplying),
        contactNumber: sanitize(parent.phone),
        address: sanitize(`${parent.street}, ${parent.city} - ${parent.pincode}`),
        // Extended fields
        gender: student.gender,
        bloodGroup: sanitize(student.bloodGroup),
        aadhaarNum: sanitize(student.aadhaarNum),
        fatherName: sanitize(parent.fatherName),
        motherName: sanitize(parent.motherName),
        fatherOccupation: sanitize(parent.fatherOccupation),
        motherOccupation: sanitize(parent.motherOccupation),
        email: sanitize(parent.email),
        prevGrade: sanitize(academic.prevGrade),
        prevYear: sanitize(academic.prevYear),
        tcNum: sanitize(academic.tcNum),
        declarationSignature: sanitize(signature),
        // Metadata
        parentUid: user.uid,
        status: "pending",
        submittedAt: new Date().toISOString(),
        reviewedBy: null,
        reviewedAt: null,
      };

      const docRef = await addDoc(collection(db, "admissionForms"), newForm);
      setSubmissions((prev) => [
        { id: docRef.id, ...newForm } as AdmissionFormRecord,
        ...prev,
      ]);
      setSubmitMessage(
        "Application submitted successfully! We'll notify you once it's reviewed."
      );
      // Clear draft
      localStorage.removeItem("spoorthis_parent_admission_draft");
      // Reset form
      setStudent(EMPTY_STUDENT);
      setParent(EMPTY_PARENT);
      setAcademic(EMPTY_ACADEMIC);
      setDeclaration(false);
      setSignature("");
      setStep(1);
      // Switch to submissions tab
      setTimeout(() => {
        setActiveTab("submissions");
        setSubmitMessage("");
      }, 1800);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── PDF download ────────────────────────────────────────────────────────────
  const handleDownloadPDF = async (form: AdmissionFormRecord) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    doc.setFillColor(17, 17, 17);
    doc.rect(0, 0, 210, 32, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("SPOORTHI'S THE DUCKLING", 14, 14);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Nursery · 7th Grade · Papi Reddy Nagar, Hyderabad", 14, 22);
    doc.setTextColor(253, 224, 71);
    doc.text("Admission Application Form", 14, 29);

    const statusColors: Record<string, [number, number, number]> = {
      pending: [251, 191, 36],
      approved: [34, 197, 94],
      rejected: [239, 68, 68],
    };
    const [r, g, b] = statusColors[form.status] || [156, 163, 175];
    doc.setFillColor(r, g, b);
    doc.roundedRect(148, 6, 50, 12, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(form.status.toUpperCase(), 173, 14, { align: "center" });

    doc.setTextColor(17, 17, 17);
    const addField = (label: string, value: string, y: number) => {
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(107, 114, 128);
      doc.text(label.toUpperCase(), 14, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(17, 17, 17);
      doc.text(value || "—", 14, y + 6);
      doc.setDrawColor(229, 231, 235);
      doc.line(14, y + 9, 196, y + 9);
    };

    addField("Student Name", form.studentName, 44);
    addField(
      "Date of Birth",
      form.dob ? new Date(form.dob).toLocaleDateString("en-IN") : "—",
      60
    );
    addField(
      "Previous School",
      form.previousSchool || "N/A (Fresh Admission)",
      76
    );
    addField("Class Applying For", form.classAppliedFor, 92);
    addField("Contact Number", form.contactNumber, 108);

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(107, 114, 128);
    doc.text("RESIDENTIAL ADDRESS", 14, 124);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(17, 17, 17);
    const addressLines = doc.splitTextToSize(form.address || "—", 182);
    doc.text(addressLines, 14, 130);
    doc.setDrawColor(229, 231, 235);
    doc.line(14, 130 + addressLines.length * 6, 196, 130 + addressLines.length * 6);

    doc.setFillColor(245, 245, 245);
    doc.rect(0, 270, 210, 27, "F");
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(
      "This is a computer-generated document. For queries, contact Spoorthi's The Duckling.",
      105,
      280,
      { align: "center" }
    );
    doc.text(`Form ID: ${form.id}`, 105, 288, { align: "center" });

    doc.save(`Admission_${form.studentName.replace(/\s+/g, "_")}.pdf`);
  };

  // ── loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // ── step labels ────────────────────────────────────────────────────────────
  const STEPS = [
    { step: 1, label: "Student" },
    { step: 2, label: "Parents" },
    { step: 3, label: "Academic" },
    { step: 4, label: "Declaration" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav title="Parent Dashboard" userEmail={user?.email} role="parent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl" />
          <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl" />
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">Parent Portal</p>
          <h2 className="text-xl font-bold mb-1">
            Welcome, {user?.displayName || user?.email?.split("@")[0]}!
          </h2>
          <p className="text-gray-300 text-sm">Manage your child's admission application from here.</p>
          <div className="mt-4 flex gap-4">
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-black">{submissions.length}</p>
              <p className="text-xs text-gray-300">Application{submissions.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-black">
                {submissions.filter((s) => s.status === "approved").length}
              </p>
              <p className="text-xs text-gray-300">Approved</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-black">
                {submissions.filter((s) => s.status === "pending").length}
              </p>
              <p className="text-xs text-gray-300">Pending</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab("submissions")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "submissions"
                ? "bg-gray-900 text-white shadow"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            My Submissions ({submissions.length})
          </button>
          <button
            onClick={() => { setActiveTab("apply"); setStep(1); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "apply"
                ? "bg-yellow-400 text-gray-900 shadow"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Application
          </button>
        </div>

        {/* ── Tab: Submissions ─────────────────────────────────────────────────── */}
        {activeTab === "submissions" && (
          <div className="space-y-4">
            {submissions.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-gray-700 font-semibold mb-1">No applications yet</h3>
                <p className="text-gray-400 text-sm mb-4">Submit your child's admission application to get started.</p>
                <button
                  onClick={() => setActiveTab("apply")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-500 transition-all text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Apply Now
                </button>
              </div>
            ) : (
              submissions.map((sub) => (
                <div key={sub.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start flex-wrap gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">{sub.studentName}</h3>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${STATUS_STYLES[sub.status]}`}>
                          {STATUS_ICONS[sub.status]} {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-500">
                        <span>📚 {sub.classAppliedFor}</span>
                        <span>📅 DOB: {new Date(sub.dob).toLocaleDateString("en-IN")}</span>
                        <span>📞 {sub.contactNumber}</span>
                        {sub.previousSchool && <span>🏫 {sub.previousSchool}</span>}
                        <span className="col-span-2 sm:col-span-1">🕐 {new Date(sub.submittedAt).toLocaleDateString("en-IN")}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadPDF(sub)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-all shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      PDF
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Tab: New Application (full multi-step form) ───────────────────────── */}
        {activeTab === "apply" && (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                  Admission Form 2025-26
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 mt-2">
                  Online Admission
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveDraft}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  {draftSaved ? "✓ Draft Saved" : "Save Draft"}
                </button>
              </div>
            </div>

            {/* Progress step bar */}
            <div className="grid grid-cols-4 gap-3 px-6 pt-5 pb-2 text-center font-black text-[9px] uppercase tracking-wider">
              {STEPS.map((s) => (
                <div key={s.step} className="space-y-2">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step >= s.step ? "bg-yellow-400" : "bg-slate-100"
                    }`}
                  />
                  <span className={step === s.step ? "text-slate-900 font-black" : "text-slate-400"}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="px-6 pb-8 pt-4 space-y-8">

              {/* STEP 1: STUDENT DETAILS */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <h3 className="text-lg font-black uppercase text-slate-900 border-b pb-2">
                    Student Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-black mb-1.5">
                        Full Name (As in Birth Certificate)
                      </label>
                      <input
                        type="text"
                        required
                        value={student.fullName}
                        onChange={(e) => setStudent({ ...student, fullName: e.target.value })}
                        placeholder="e.g. Aarav Reddy"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-black mb-1.5">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        required
                        value={student.dob}
                        onChange={(e) => setStudent({ ...student, dob: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-black mb-1.5">
                        Gender
                      </label>
                      <select
                        required
                        value={student.gender}
                        onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-black mb-1.5">
                        Blood Group
                      </label>
                      <input
                        type="text"
                        required
                        value={student.bloodGroup}
                        onChange={(e) => setStudent({ ...student, bloodGroup: e.target.value })}
                        placeholder="e.g. O+ve"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black uppercase text-black mb-1.5">
                        Student's Aadhaar Number
                      </label>
                      <input
                        type="text"
                        required
                        value={student.aadhaarNum}
                        onChange={(e) => setStudent({ ...student, aadhaarNum: e.target.value })}
                        placeholder="12-digit Aadhaar Number"
                        maxLength={12}
                        pattern="\d{12}"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: PARENT & ADDRESS */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  {/* Parent info */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-black uppercase text-slate-900 border-b pb-2">
                      Parent / Guardian Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-black mb-1.5">Father's Full Name</label>
                        <input
                          type="text"
                          required
                          value={parent.fatherName}
                          onChange={(e) => setParent({ ...parent, fatherName: e.target.value })}
                          placeholder="Father's Name"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-black mb-1.5">Father's Occupation</label>
                        <input
                          type="text"
                          required
                          value={parent.fatherOccupation}
                          onChange={(e) => setParent({ ...parent, fatherOccupation: e.target.value })}
                          placeholder="e.g. Software Engineer"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-black mb-1.5">Mother's Full Name</label>
                        <input
                          type="text"
                          required
                          value={parent.motherName}
                          onChange={(e) => setParent({ ...parent, motherName: e.target.value })}
                          placeholder="Mother's Name"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-black mb-1.5">Mother's Occupation</label>
                        <input
                          type="text"
                          required
                          value={parent.motherOccupation}
                          onChange={(e) => setParent({ ...parent, motherOccupation: e.target.value })}
                          placeholder="e.g. Teacher"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-black mb-1.5">Primary Mobile Number</label>
                        <input
                          type="tel"
                          required
                          value={parent.phone}
                          onChange={(e) => setParent({ ...parent, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          pattern="[0-9]{10}"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-black mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={parent.email}
                          onChange={(e) => setParent({ ...parent, email: e.target.value })}
                          placeholder="parent@example.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Residential address */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-black uppercase text-slate-900 border-b pb-2">
                      Residential Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-black mb-1.5">Street Address</label>
                        <input
                          type="text"
                          required
                          value={parent.street}
                          onChange={(e) => setParent({ ...parent, street: e.target.value })}
                          placeholder="House No, Road No, Area"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-black mb-1.5">City</label>
                        <input
                          type="text"
                          required
                          value={parent.city}
                          onChange={(e) => setParent({ ...parent, city: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-black mb-1.5">Pin Code</label>
                        <input
                          type="text"
                          required
                          value={parent.pincode}
                          onChange={(e) => setParent({ ...parent, pincode: e.target.value })}
                          placeholder="6-digit pincode"
                          pattern="\d{6}"
                          maxLength={6}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: ACADEMIC */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <h3 className="text-lg font-black uppercase text-slate-900 border-b pb-2">
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black uppercase text-black mb-1.5">Class Applying For</label>
                      <select
                        required
                        value={academic.classApplying}
                        onChange={(e) => setAcademic({ ...academic, classApplying: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
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
                      <label className="block text-[10px] font-black uppercase text-black mb-1.5">
                        Previous School Attended (If any)
                      </label>
                      <input
                        type="text"
                        value={academic.prevSchool}
                        onChange={(e) => setAcademic({ ...academic, prevSchool: e.target.value })}
                        placeholder="Previous School Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-black mb-1.5">
                        Previous Grade Completed
                      </label>
                      <input
                        type="text"
                        value={academic.prevGrade}
                        onChange={(e) => setAcademic({ ...academic, prevGrade: e.target.value })}
                        placeholder="e.g. LKG"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-black mb-1.5">
                        Year of Passing / Leaving
                      </label>
                      <input
                        type="text"
                        value={academic.prevYear}
                        onChange={(e) => setAcademic({ ...academic, prevYear: e.target.value })}
                        placeholder="e.g. 2024"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black uppercase text-black mb-1.5">
                        Transfer Certificate (TC) Number
                      </label>
                      <input
                        type="text"
                        value={academic.tcNum}
                        onChange={(e) => setAcademic({ ...academic, tcNum: e.target.value })}
                        placeholder="TC Registration Number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: DECLARATION */}
              {step === 4 && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <h3 className="text-lg font-black uppercase text-slate-900 border-b pb-2">Declaration</h3>

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

                  <div className="flex items-start gap-3">
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

                  <div>
                    <label className="block text-[10px] font-black uppercase text-black mb-1.5">
                      Electronic Signature (Type Parent's Full Name)
                    </label>
                    <input
                      type="text"
                      required
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="e.g. Anand Reddy"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition text-black"
                    />
                  </div>

                  {/* Feedback */}
                  {submitMessage && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-sm text-green-700 font-medium">{submitMessage}</p>
                    </div>
                  )}
                  {submitError && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-red-700 font-medium">{submitError}</p>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={!declaration || isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-yellow-400 disabled:bg-slate-100 disabled:text-slate-400 text-black font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-yellow-300 transition duration-300 shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </motion.div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 rounded-xl font-bold text-xs uppercase tracking-wider transition"
                >
                  ← Back
                </button>
                {step < 4 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs uppercase tracking-wider transition"
                  >
                    Continue →
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
