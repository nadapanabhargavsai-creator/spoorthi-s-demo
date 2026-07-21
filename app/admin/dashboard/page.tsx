"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { isAdminEmail } from "@/lib/authHelpers";
import DashboardNav from "@/components/DashboardNav";

interface AdmissionForm {
  id: string;
  studentName: string;
  dob: string;
  previousSchool: string;
  classAppliedFor: string;
  contactNumber: string;
  address: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  parentUid: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState<AdmissionForm[]>([]);
  const [filteredForms, setFilteredForms] = useState<AdmissionForm[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [selectedForm, setSelectedForm] = useState<AdmissionForm | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        const admin = await isAdminEmail(currentUser.email);
        if (admin) {
          setUser(currentUser);
          await fetchAllForms();
        } else {
          alert("This account is not authorized as an admin.");
          router.push("/auth/login");
        }
      } else {
        router.push("/auth/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    let result = forms;
    if (statusFilter !== "all") result = result.filter((f) => f.status === statusFilter);
    if (classFilter !== "all") result = result.filter((f) => f.classAppliedFor === classFilter);
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (f) =>
          f.studentName.toLowerCase().includes(lower) ||
          f.classAppliedFor.toLowerCase().includes(lower) ||
          f.contactNumber.includes(lower)
      );
    }
    setFilteredForms(result);
  }, [searchTerm, statusFilter, classFilter, forms]);

  const fetchAllForms = async () => {
    try {
      const snapshot = await getDocs(query(collection(db, "admissionForms")));
      const data: AdmissionForm[] = [];
      snapshot.forEach((d) => data.push({ id: d.id, ...d.data() } as AdmissionForm));
      data.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      setForms(data);
      setFilteredForms(data);
    } catch (e) {
      console.error("Error fetching forms:", e);
    }
  };

  const handleStatusChange = async (formId: string, newStatus: string) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "admissionForms", formId), {
        status: newStatus,
        reviewedBy: user.email,
        reviewedAt: new Date().toISOString(),
      });
      setForms((prev) =>
        prev.map((f) => (f.id === formId ? { ...f, status: newStatus as AdmissionForm["status"] } : f))
      );
      if (selectedForm?.id === formId) {
        setSelectedForm((prev) => prev ? { ...prev, status: newStatus as AdmissionForm["status"] } : null);
      }
      await addDoc(collection(db, "auditLogs"), {
        action: `status_changed_to_${newStatus}`,
        performedBy: user.email,
        targetFormId: formId,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      alert("Failed to update status. Please try again.");
    }
  };

  const handleDownloadPDF = async (form: AdmissionForm) => {
    if (!user) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    // Header bar
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

    // Status badge
    const statusColors: Record<string, [number, number, number]> = {
      pending: [251, 191, 36], approved: [34, 197, 94], rejected: [239, 68, 68],
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
    addField("Date of Birth", form.dob ? new Date(form.dob).toLocaleDateString("en-IN") : "—", 60);
    addField("Previous School", form.previousSchool || "N/A (Fresh Admission)", 76);
    addField("Class Applying For", form.classAppliedFor, 92);
    addField("Contact Number", form.contactNumber, 108);

    doc.setFontSize(9); doc.setFont("helvetica", "bold"); doc.setTextColor(107, 114, 128);
    doc.text("RESIDENTIAL ADDRESS", 14, 124);
    doc.setFont("helvetica", "normal"); doc.setFontSize(11); doc.setTextColor(17, 17, 17);
    const addressLines = doc.splitTextToSize(form.address || "—", 182);
    doc.text(addressLines, 14, 130);
    doc.setDrawColor(229, 231, 235);
    doc.line(14, 130 + addressLines.length * 6, 196, 130 + addressLines.length * 6);

    addField("Submitted On", new Date(form.submittedAt).toLocaleString("en-IN"), 148);
    if (form.reviewedBy) addField("Reviewed By", form.reviewedBy, 164);

    doc.setFillColor(245, 245, 245);
    doc.rect(0, 270, 210, 27, "F");
    doc.setFontSize(8); doc.setTextColor(107, 114, 128);
    doc.text("This is a computer-generated document. For queries, contact Spoorthi's The Duckling.", 105, 280, { align: "center" });
    doc.text(`Form ID: ${form.id}`, 105, 288, { align: "center" });

    doc.save(`Admission_${form.studentName.replace(/\s+/g, "_")}.pdf`);

    await addDoc(collection(db, "auditLogs"), {
      action: "pdf_downloaded",
      performedBy: user.email,
      targetFormId: form.id,
      timestamp: new Date().toISOString(),
    });
  };

  const exportCSV = async () => {
    if (!user || filteredForms.length === 0) return;
    const headers = ["Form ID", "Student Name", "DOB", "Class", "Previous School", "Contact", "Address", "Status", "Submitted At", "Reviewed By"];
    const rows = filteredForms.map((f) => [
      f.id, `"${f.studentName}"`, f.dob, `"${f.classAppliedFor}"`,
      `"${f.previousSchool || ""}"`, f.contactNumber, `"${f.address}"`,
      f.status, new Date(f.submittedAt).toLocaleDateString("en-IN"), f.reviewedBy || "",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `admissions_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
    await addDoc(collection(db, "auditLogs"), {
      action: "csv_exported",
      performedBy: user.email,
      targetFormId: "bulk",
      timestamp: new Date().toISOString(),
    });
  };

  const stats = {
    total: forms.length,
    pending: forms.filter((f) => f.status === "pending").length,
    approved: forms.filter((f) => f.status === "approved").length,
    rejected: forms.filter((f) => f.status === "rejected").length,
  };

  const classes = [...new Set(forms.map((f) => f.classAppliedFor))].sort();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav title="Admin Dashboard" userEmail={user?.email} role="admin" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total", value: stats.total, color: "bg-gray-900 text-white" },
            { label: "Pending", value: stats.pending, color: "bg-yellow-400 text-gray-900" },
            { label: "Approved", value: stats.approved, color: "bg-green-500 text-white" },
            { label: "Rejected", value: stats.rejected, color: "bg-red-500 text-white" },
          ].map((s) => (
            <div key={s.label} className={`${s.color} rounded-2xl p-5 shadow-sm`}>
              <p className="text-3xl font-black">{s.value}</p>
              <p className="text-sm font-semibold opacity-80 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters + Export */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex-1 min-w-[200px] relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text" placeholder="Search by name or contact..."
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={classFilter} onChange={(e) => setClassFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Classes</option>
              {classes.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button
              onClick={exportCSV} disabled={filteredForms.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all disabled:opacity-40"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV ({filteredForms.length})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {filteredForms.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="font-medium text-gray-500">No applications match your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Student</th>
                    <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Class</th>
                    <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                    <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Submitted</th>
                    <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredForms.map((form) => (
                    <tr
                      key={form.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedForm(form)}
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900 text-sm">{form.studentName}</p>
                        <p className="text-xs text-gray-400">{form.previousSchool || "Fresh Admission"}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">{form.classAppliedFor}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{form.contactNumber}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{new Date(form.submittedAt).toLocaleDateString("en-IN")}</td>
                      <td className="px-5 py-4">
                        <select
                          value={form.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => { e.stopPropagation(); handleStatusChange(form.id, e.target.value); }}
                          className={`rounded-full px-3 py-1 text-xs font-bold border-0 cursor-pointer focus:ring-2 focus:ring-gray-900 ${STATUS_STYLES[form.status]}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDownloadPDF(form); }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-700 transition-all"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedForm(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gray-900 text-white p-5 rounded-t-2xl flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{selectedForm.studentName}</h3>
                <p className="text-gray-300 text-sm">{selectedForm.classAppliedFor}</p>
              </div>
              <button onClick={() => setSelectedForm(null)} className="text-gray-400 hover:text-white transition p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 space-y-3 text-sm">
              {[
                ["Date of Birth", selectedForm.dob ? new Date(selectedForm.dob).toLocaleDateString("en-IN") : "—"],
                ["Previous School", selectedForm.previousSchool || "Fresh Admission"],
                ["Contact Number", selectedForm.contactNumber],
                ["Address", selectedForm.address],
                ["Submitted On", new Date(selectedForm.submittedAt).toLocaleString("en-IN")],
                selectedForm.reviewedBy ? ["Reviewed By", selectedForm.reviewedBy] : null,
              ].filter(Boolean).map(([label, value]) => (
                <div key={label as string} className="flex gap-3 border-b border-gray-50 pb-3">
                  <span className="font-semibold text-gray-400 w-32 shrink-0">{label}</span>
                  <span className="text-gray-700">{value as string}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-semibold">Status</span>
                  <select
                    value={selectedForm.status}
                    onChange={(e) => handleStatusChange(selectedForm.id, e.target.value)}
                    className={`rounded-full px-3 py-1 text-xs font-bold border-0 cursor-pointer ${STATUS_STYLES[selectedForm.status]}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <button
                  onClick={() => handleDownloadPDF(selectedForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
