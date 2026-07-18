"use client";

import { useState, useEffect } from "react";
import { usePlayschoolDb } from "../context/PlayschoolDb";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PlayschoolAdmin() {
  const {
    session, logout,
    applications, updateApplicationStatus, toggleApplicationFee, deleteApplication,
    notices, addNotice, deleteNotice,
    homeworks, addHomework, deleteHomework,
    contacts, markContactRead,
    careers,
    subscribers,
    cameraSettings, updateCameraSettings
  } = usePlayschoolDb();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"admissions" | "camera" | "notices" | "inbox" | "careers" | "subscribers">("admissions");

  // Notice form states
  const [nTitle, setNTitle] = useState("");
  const [nContent, setNContent] = useState("");
  const [nCategory, setNCategory] = useState<"General" | "Activity" | "Holiday" | "Urgent">("General");
  const [nSuccess, setNSuccess] = useState(false);

  // Homework form states
  const [hwClass, setHwClass] = useState<"Play Group" | "Nursery" | "LKG" | "UKG">("Play Group");
  const [hwSubject, setHwSubject] = useState("");
  const [hwContent, setHwContent] = useState("");
  const [hwDate, setHwDate] = useState("");
  const [hwSuccess, setHwSuccess] = useState(false);

  // Auth Guard
  useEffect(() => {
    if (!session || session.role !== "admin") {
      router.push("/playschool/login");
    }
  }, [session, router]);

  if (!session || session.role !== "admin") {
    return (
      <main className="bg-slate-50 min-h-screen pt-28 pb-20 flex items-center justify-center font-['Quicksand']">
        <div className="text-center space-y-4">
          <span className="text-5xl block animate-bounce">🔒</span>
          <p className="font-bold text-gray-500">Redirecting to admin login...</p>
        </div>
      </main>
    );
  }

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nTitle || !nContent) return;
    addNotice(nTitle, nContent, nCategory);
    setNTitle("");
    setNContent("");
    setNSuccess(true);
    setTimeout(() => setNSuccess(false), 3000);
  };

  const handlePostHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwSubject || !hwContent || !hwDate) return;
    addHomework(hwClass, hwSubject, hwContent, hwDate);
    setHwSubject("");
    setHwContent("");
    setHwDate("");
    setHwSuccess(true);
    setTimeout(() => setHwSuccess(false), 3000);
  };

  return (
    <main className="bg-slate-50 min-h-screen pt-28 pb-20 px-4 sm:px-6 font-['Quicksand'] text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white rounded-[2.5rem] p-8 shadow-md flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4.5">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl shadow-inner">
              ⚙️
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-yellow-500 text-slate-950 px-3.5 py-1 rounded-full">
                System Administrator
              </span>
              <h1 className="text-xl sm:text-2xl font-['Fredoka'] font-black mt-2">Little Blossoms Control Panel</h1>
              <p className="text-xs text-slate-400 mt-1 font-bold">Manage admissions, parents diaries, CCTV configurations and inboxes.</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push("/playschool"); }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-full text-xs font-black transition-all shadow-sm"
          >
            Logout / Exit
          </button>
        </div>

        {/* Dashboard Tabs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Menu Sidebar */}
          <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-2 flex flex-col font-bold text-sm text-slate-600">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 mb-2">Modules</h3>
            <button
              onClick={() => setActiveTab("admissions")}
              className={`text-left px-4 py-3 rounded-xl transition ${
                activeTab === "admissions" ? "bg-sky-500 text-white shadow-sm" : "hover:bg-slate-50"
              }`}
            >
              🎓 Admissions ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab("camera")}
              className={`text-left px-4 py-3 rounded-xl transition ${
                activeTab === "camera" ? "bg-sky-500 text-white shadow-sm" : "hover:bg-slate-50"
              }`}
            >
              📹 CCTV Settings
            </button>
            <button
              onClick={() => setActiveTab("notices")}
              className={`text-left px-4 py-3 rounded-xl transition ${
                activeTab === "notices" ? "bg-sky-500 text-white shadow-sm" : "hover:bg-slate-50"
              }`}
            >
              📢 Notice & Homework
            </button>
            <button
              onClick={() => setActiveTab("inbox")}
              className={`text-left px-4 py-3 rounded-xl transition ${
                activeTab === "inbox" ? "bg-sky-500 text-white shadow-sm" : "hover:bg-slate-50"
              }`}
            >
              📨 Inquiries Inbox ({contacts.filter(c => c.status === "Unread").length})
            </button>
            <button
              onClick={() => setActiveTab("careers")}
              className={`text-left px-4 py-3 rounded-xl transition ${
                activeTab === "careers" ? "bg-sky-500 text-white shadow-sm" : "hover:bg-slate-50"
              }`}
            >
              💼 Job Resumes ({careers.length})
            </button>
            <button
              onClick={() => setActiveTab("subscribers")}
              className={`text-left px-4 py-3 rounded-xl transition ${
                activeTab === "subscribers" ? "bg-sky-500 text-white shadow-sm" : "hover:bg-slate-50"
              }`}
            >
              ✉️ Subscribers ({subscribers.length})
            </button>
          </div>

          {/* Right Main Content Block */}
          <div className="lg:col-span-9 bg-white p-7 sm:p-9 rounded-[2.5rem] border border-slate-100 shadow-md min-h-[500px]">
            
            {/* TABS 1: ADMISSIONS */}
            {activeTab === "admissions" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-['Fredoka'] font-black text-xl text-slate-800">Manage Admissions Applications</h2>
                  <p className="text-xs text-gray-400 font-bold mt-1">Review student applications, approve candidates, and track fee payment states.</p>
                </div>

                <div className="space-y-4">
                  {applications.length > 0 ? (
                    applications.map((app) => (
                      <div key={app.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1 text-xs font-bold text-gray-500">
                          <div className="flex items-center gap-2">
                            <span className="font-['Fredoka'] font-black text-slate-800 text-sm">{app.student.fullName}</span>
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              app.status === "Approved" ? "bg-emerald-100 text-emerald-800" :
                              app.status === "Pending" ? "bg-amber-100 text-amber-800" : "bg-pink-100 text-pink-800"
                            }`}>
                              {app.status}
                            </span>
                          </div>
                          <p>ID: <strong className="text-slate-800">{app.id}</strong> | Program: {app.academic.program}</p>
                          <p>Parent: {app.parent.fatherName} (Father) | Phone: {app.parent.phone}</p>
                          <p>Emergency: {app.emergencyContact} | Fee Paid: 
                            <button
                              onClick={() => toggleApplicationFee(app.id)}
                              className={`ml-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                                app.feePaid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                              }`}
                            >
                              {app.feePaid ? "Paid" : "Due"}
                            </button>
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 text-[10px] font-black">
                          {app.status !== "Approved" && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, "Approved")}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl shadow-xs transition"
                            >
                              Approve
                            </button>
                          )}
                          {app.status !== "Rejected" && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, "Rejected")}
                              className="bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-2 rounded-xl shadow-xs transition"
                            >
                              Reject
                            </button>
                          )}
                          <button
                            onClick={() => deleteApplication(app.id)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 px-3.5 py-2 rounded-xl transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 font-bold">No admission registrations found in database.</p>
                  )}
                </div>
              </div>
            )}

            {/* TABS 2: CCTV SETTINGS */}
            {activeTab === "camera" && (
              <div className="space-y-8 text-xs font-bold text-gray-500">
                <div>
                  <h2 className="font-['Fredoka'] font-black text-xl text-slate-800">CCTV Camera Configuration</h2>
                  <p className="text-xs text-gray-400 font-bold mt-1">Govern the secure live feeds access limits and restrictions parameters.</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-800 text-sm">Global Cameras Switch</p>
                      <p className="text-[10px] text-gray-400 font-bold">Toggle access on or off for all parents instantly.</p>
                    </div>
                    <button
                      onClick={() => updateCameraSettings({ enabled: !cameraSettings.enabled })}
                      className={`px-5 py-2.5 rounded-full font-black text-xs transition ${
                        cameraSettings.enabled ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {cameraSettings.enabled ? "ENABLED / ONLINE" : "DISABLED / OFFLINE"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div>
                      <p className="text-slate-800 text-sm">School Hours Time Restrict</p>
                      <p className="text-[10px] text-gray-400 font-bold">Restrict camera streaming strictly to hours defined below.</p>
                    </div>
                    <button
                      onClick={() => updateCameraSettings({ restrictHours: !cameraSettings.restrictHours })}
                      className={`px-5 py-2.5 rounded-full font-black text-xs transition ${
                        cameraSettings.restrictHours ? "bg-sky-500 text-white" : "bg-slate-400 text-white"
                      }`}
                    >
                      {cameraSettings.restrictHours ? "RESTRICT ACTIVE" : "OPEN 24/7"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Permitted Start Hour</label>
                      <input
                        type="text"
                        value={cameraSettings.startTime}
                        onChange={(e) => updateCameraSettings({ startTime: e.target.value })}
                        placeholder="e.g. 09:00"
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none text-slate-800 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Permitted End Hour</label>
                      <input
                        type="text"
                        value={cameraSettings.endTime}
                        onChange={(e) => updateCameraSettings({ endTime: e.target.value })}
                        placeholder="e.g. 13:00"
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none text-slate-800 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-100 p-4.5 rounded-xl text-yellow-800">
                  ⚠️ <strong>Security Audit Note:</strong> The CCTV camera feed relies on parent credentials matching their child's classroom. Changing settings takes effect immediately on all clients.
                </div>
              </div>
            )}

            {/* TABS 3: NOTICES & HOMEWORK */}
            {activeTab === "notices" && (
              <div className="space-y-10 text-xs font-bold text-gray-500 text-left">
                {/* Notice Form */}
                <div className="space-y-5">
                  <h3 className="font-['Fredoka'] font-black text-slate-800 text-lg">📢 Post a Notice Alert</h3>
                  <form onSubmit={handlePostNotice} className="grid grid-cols-1 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Notice Title</label>
                        <input
                          type="text"
                          required
                          value={nTitle}
                          onChange={(e) => setNTitle(e.target.value)}
                          placeholder="Notice title..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Category</label>
                        <select
                          value={nCategory}
                          onChange={(e) => setNCategory(e.target.value as any)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white"
                        >
                          <option value="General">General</option>
                          <option value="Activity">Activity Day</option>
                          <option value="Holiday">Holiday List</option>
                          <option value="Urgent">Urgent / Warning</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Notice Details</label>
                      <textarea
                        required
                        value={nContent}
                        onChange={(e) => setNContent(e.target.value)}
                        placeholder="Notice text details here..."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800"
                      />
                    </div>
                    <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-black py-2.5 rounded-xl self-end px-6 shadow-sm">
                      Post Notice Alert
                    </button>
                  </form>
                  {nSuccess && <p className="text-emerald-600 font-bold text-center">Notice alert posted to live dashboard!</p>}

                  {/* Active Notices List */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h4 className="font-['Fredoka'] font-black text-slate-800 text-base mb-2">Active Notices</h4>
                    {notices.map((n) => (
                      <div key={n.id} className="p-4 bg-white border border-slate-100 rounded-xl flex justify-between items-center">
                        <div>
                          <h5 className="font-bold text-slate-800">{n.title} <span className="text-[9px] uppercase px-2 py-0.5 bg-slate-100 rounded text-slate-400 font-black ml-1">{n.category}</span></h5>
                          <p className="text-[10px] text-gray-400 mt-0.5">{n.content}</p>
                        </div>
                        <button onClick={() => deleteNotice(n.id)} className="text-red-500 hover:text-red-600 font-bold text-xs uppercase px-2 py-1">Delete</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Homework Form */}
                <div className="space-y-5 pt-8 border-t-2 border-dashed border-slate-200">
                  <h3 className="font-['Fredoka'] font-black text-slate-800 text-lg">✏️ Assign Daily Homework</h3>
                  <form onSubmit={handlePostHomework} className="grid grid-cols-1 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Classroom Mapped</label>
                        <select
                          value={hwClass}
                          onChange={(e) => setHwClass(e.target.value as any)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white"
                        >
                          <option value="Play Group">Play Group</option>
                          <option value="Nursery">Nursery</option>
                          <option value="LKG">LKG</option>
                          <option value="UKG">UKG</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Subject</label>
                        <input
                          type="text"
                          required
                          value={hwSubject}
                          onChange={(e) => setHwSubject(e.target.value)}
                          placeholder="e.g. English, Math"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Due Date</label>
                        <input
                          type="date"
                          required
                          value={hwDate}
                          onChange={(e) => setHwDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-gray-500 font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Homework Instructions</label>
                      <textarea
                        required
                        value={hwContent}
                        onChange={(e) => setHwContent(e.target.value)}
                        placeholder="Homework details..."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800"
                      />
                    </div>
                    <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-black py-2.5 rounded-xl self-end px-6 shadow-sm">
                      Assign Homework
                    </button>
                  </form>
                  {hwSuccess && <p className="text-emerald-600 font-bold text-center">Homework assigned to parent dashboards!</p>}

                  {/* Active Homeworks List */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h4 className="font-['Fredoka'] font-black text-slate-800 text-base mb-2">Active Assignments</h4>
                    {homeworks.map((hw) => (
                      <div key={hw.id} className="p-4 bg-white border border-slate-100 rounded-xl flex justify-between items-center">
                        <div>
                          <h5 className="font-bold text-slate-800">{hw.class} · {hw.subject} <span className="text-[9px] text-pink-600 font-bold ml-1.5">Due: {hw.dueDate}</span></h5>
                          <p className="text-[10px] text-gray-400 mt-0.5">{hw.content}</p>
                        </div>
                        <button onClick={() => deleteHomework(hw.id)} className="text-red-500 hover:text-red-600 font-bold text-xs uppercase px-2 py-1">Delete</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TABS 4: INQUIRIES INBOX */}
            {activeTab === "inbox" && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-['Fredoka'] font-black text-xl text-slate-800">Inquiry Messages Inbox</h2>
                  <p className="text-xs text-gray-400 font-bold mt-1">Review contact forms and help desk tickets sent by visitors.</p>
                </div>

                <div className="space-y-4">
                  {contacts.length > 0 ? (
                    contacts.map((c) => (
                      <div key={c.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-xs space-y-3">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <span className="font-bold text-slate-800 text-sm block">{c.name}</span>
                            <span className="text-[10px] text-gray-400">Phone: {c.phone} | Email: {c.email}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="bg-sky-50 text-sky-700 font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">{c.subject}</span>
                            <span className="text-[9px] text-gray-400 mt-0.5 font-bold">{c.date}</span>
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-gray-500 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">{c.message}</p>
                        
                        {c.status === "Unread" && (
                          <button
                            onClick={() => markContactRead(c.id)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[9px] uppercase px-3 py-1 rounded-lg shadow-xs transition"
                          >
                            Mark as Read ✓
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 font-bold">No inquiry messages in database inbox.</p>
                  )}
                </div>
              </div>
            )}

            {/* TABS 5: CAREER APPLICATIONS */}
            {activeTab === "careers" && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-['Fredoka'] font-black text-xl text-slate-800">Job Applications & Resumes</h2>
                  <p className="text-xs text-gray-400 font-bold mt-1">Check teaching positions applications submitted by candidates.</p>
                </div>

                <div className="space-y-4">
                  {careers.length > 0 ? (
                    careers.map((car) => (
                      <div key={car.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-xs space-y-3">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <div>
                            <span className="font-bold text-slate-800 text-sm block">{car.fullName}</span>
                            <span className="text-[10px] text-gray-400">Exp: {car.experience} | Phone: {car.phone} | Email: {car.email}</span>
                          </div>
                          <span className="bg-pink-50 text-pink-700 font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">{car.position}</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-500 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">{car.message}</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-sky-600 bg-sky-50 p-2 px-3.5 rounded-xl border border-sky-100 w-max">
                          <span>📄</span>
                          <span>Resume uploaded: <strong className="text-sky-800">{car.resumeName}</strong></span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 font-bold">No candidate job applications found.</p>
                  )}
                </div>
              </div>
            )}

            {/* TABS 6: NEWSLETTER SUBSCRIBERS */}
            {activeTab === "subscribers" && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-['Fredoka'] font-black text-xl text-slate-800">Newsletter Subscribers</h2>
                  <p className="text-xs text-gray-400 font-bold mt-1">Active mailing list subscribers interested in notices and tips.</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  {subscribers.length > 0 ? (
                    <ul className="divide-y divide-slate-100 space-y-3 text-xs font-bold text-slate-700">
                      {subscribers.map((sub, sidx) => (
                        <li key={sidx} className="flex justify-between items-center py-2.5">
                          <span>📧 {sub}</span>
                          <span className="text-[9.5px] text-gray-400 font-bold">Active Subscriber</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-400 font-bold">No email subscribers found in the list.</p>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}
