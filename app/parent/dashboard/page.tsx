"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";

interface AdmissionForm {
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
}

const EMPTY_FORM = {
  studentName: "",
  dob: "",
  previousSchool: "",
  classAppliedFor: "",
  contactNumber: "",
  address: "",
};

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

export default function ParentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<AdmissionForm[]>([]);
  const [activeTab, setActiveTab] = useState<"submissions" | "apply">("submissions");
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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

  const fetchSubmissions = async (uid: string) => {
    try {
      const q = query(collection(db, "admissionForms"), where("parentUid", "==", uid));
      const snapshot = await getDocs(q);
      const forms: AdmissionForm[] = [];
      snapshot.forEach((doc) => forms.push({ id: doc.id, ...doc.data() } as AdmissionForm));
      forms.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      setSubmissions(forms);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // Basic sanitization — strip HTML tags
    const clean = e.target.value.replace(/<[^>]*>/g, "");
    setFormData({ ...formData, [e.target.name]: clean });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      const newForm = {
        ...formData,
        parentUid: user.uid,
        status: "pending",
        submittedAt: new Date().toISOString(),
        reviewedBy: null,
        reviewedAt: null,
      };
      const docRef = await addDoc(collection(db, "admissionForms"), newForm);
      setSubmissions((prev) => [{ id: docRef.id, ...newForm } as AdmissionForm, ...prev]);
      setSubmitMessage("Application submitted successfully! We'll notify you once it's reviewed.");
      setFormData(EMPTY_FORM);
      // Switch to submissions tab to show the new entry
      setTimeout(() => setActiveTab("submissions"), 1500);

      // TODO (Future): When Firebase Storage is enabled, add file upload here:
      // const storageRef = ref(storage, `admissions/${docRef.id}/documents`);
      // await uploadBytes(storageRef, file);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPDF = async (form: AdmissionForm) => {
    // Dynamic import to avoid SSR issues
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    // Header
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

    // Status Badge
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

    // Body
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
    addField("Date of Birth", form.dob ? new Date(form.dob).toLocaleDateString("en-IN") : "—", 60);
    addField("Previous School", form.previousSchool || "N/A (Fresh Admission)", 76);
    addField("Class Applying For", form.classAppliedFor, 92);
    addField("Contact Number", form.contactNumber, 108);

    // Address (multiline)
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

    // Submission info
    const infoY = 148;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(107, 114, 128);
    doc.text("SUBMITTED ON", 14, infoY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(17, 17, 17);
    doc.text(new Date(form.submittedAt).toLocaleString("en-IN"), 14, infoY + 6);

    // Footer
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 270, 210, 27, "F");
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text("This is a computer-generated document. For queries, contact Spoorthi's The Duckling.", 105, 280, { align: "center" });
    doc.text(`Form ID: ${form.id}`, 105, 288, { align: "center" });

    doc.save(`Admission_${form.studentName.replace(/\s+/g, "_")}.pdf`);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav title="Parent Dashboard" userEmail={user?.email} role="parent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl" />
          <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl" />
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">Parent Portal</p>
          <h2 className="text-xl font-bold mb-1">Welcome, {user?.displayName || user?.email?.split("@")[0]}!</h2>
          <p className="text-gray-300 text-sm">Manage your child's admission application from here.</p>
          <div className="mt-4 flex gap-4">
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-black">{submissions.length}</p>
              <p className="text-xs text-gray-300">Application{submissions.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-black">{submissions.filter(s => s.status === "approved").length}</p>
              <p className="text-xs text-gray-300">Approved</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-black">{submissions.filter(s => s.status === "pending").length}</p>
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
            onClick={() => setActiveTab("apply")}
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

        {/* Tab: Submissions */}
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

        {/* Tab: Apply */}
        {activeTab === "apply" && (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-400 px-6 py-4">
              <h2 className="font-bold text-gray-900 text-lg">New Admission Application</h2>
              <p className="text-gray-700 text-sm">Fill all required fields and submit the form below.</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Student Name *</label>
                  <input
                    required type="text" name="studentName" value={formData.studentName}
                    onChange={handleInputChange} placeholder="Full name of the student"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Date of Birth *</label>
                  <input
                    required type="date" name="dob" value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Class Applying For *</label>
                  <select
                    required name="classAppliedFor" value={formData.classAppliedFor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  >
                    <option value="">Select a class</option>
                    {["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Previous School</label>
                  <input
                    type="text" name="previousSchool" value={formData.previousSchool}
                    onChange={handleInputChange} placeholder="Leave blank if fresh admission"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Contact Number *</label>
                  <input
                    required type="tel" name="contactNumber" value={formData.contactNumber}
                    onChange={handleInputChange} placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Residential Address *</label>
                <textarea
                  required name="address" rows={3} value={formData.address}
                  onChange={handleInputChange} placeholder="House No., Street, Area, City, PIN"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
                />
              </div>

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

              <div className="flex gap-3 pt-2">
                <button
                  type="button" onClick={() => setActiveTab("submissions")}
                  className="px-5 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all text-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
