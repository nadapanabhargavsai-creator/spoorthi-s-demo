"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Mock children data
const mockChildren = [
  {
    id: "c1",
    name: "Aanya Sharma",
    class: "Nursery – Section A",
    rollNo: "NUR-A-07",
    photo: "/school1.jpg",
    attendance: { present: 42, total: 48 },
    cameraRoom: "Nursery A",
    cameraEnabled: true,
    cameraWindow: { start: "09:00", end: "13:00" },
    recentNotices: [
      "Fancy Dress materials required by July 28.",
      "PTM scheduled for Aug 5, 9:00 AM.",
    ],
    homework: [
      { subject: "English", task: "Trace letters A to E (worksheet 3)", due: "July 22" },
      { subject: "Math", task: "Count objects 1-10 in the activity book", due: "July 23" },
    ],
    attendanceLog: [
      { date: "July 17", status: "Present" },
      { date: "July 16", status: "Present" },
      { date: "July 15", status: "Absent" },
      { date: "July 14", status: "Present" },
      { date: "July 11", status: "Present" },
    ],
  },
];

const CREDENTIALS = { id: "LBL-839201", pin: "1234" };

export default function PlaySchoolPortal() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [activeChild] = useState(mockChildren[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "attendance" | "homework" | "camera" | "notices">("overview");
  const [cameraActive, setCameraActive] = useState(false);
  const [showCameraWarning, setShowCameraWarning] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    setTimeout(() => {
      if (loginId.trim().toUpperCase() === CREDENTIALS.id && loginPin === CREDENTIALS.pin) {
        setLoggedIn(true);
      } else {
        setLoginError("Invalid Application ID or PIN. Try LBL-839201 / 1234.");
      }
      setLoading(false);
    }, 1500);
  };

  const handleCamera = () => {
    if (!activeChild.cameraEnabled) {
      setShowCameraWarning(true);
      return;
    }
    setCameraActive((prev) => !prev);
  };

  if (!loggedIn) {
    return (
      <main className="bg-[#F8FBFF] min-h-screen flex items-center justify-center px-6 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="bg-white border border-slate-100 rounded-3xl p-10 max-w-sm w-full shadow-lg space-y-8"
        >
          <div className="text-center space-y-2">
            <span className="text-4xl block">🔐</span>
            <h1 className="text-xl font-black uppercase text-slate-900">Parent Login</h1>
            <p className="text-slate-400 text-xs font-semibold">Use your Application ID and 4-digit PIN to access the parent dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Application ID</label>
              <input
                required
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="e.g. LBL-839201"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition"
              />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">4-Digit PIN</label>
              <input
                type="password"
                maxLength={4}
                required
                value={loginPin}
                onChange={(e) => setLoginPin(e.target.value)}
                placeholder="••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition"
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-[10px] font-bold bg-red-50 border border-red-100 p-2.5 rounded-xl">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-900 hover:bg-pink-500 text-white font-black uppercase text-[9px] tracking-widest rounded-xl transition"
            >
              {loading ? "Verifying..." : "Login to Portal"}
            </button>
          </form>

          <p className="text-center text-[9px] text-slate-400 font-semibold">
            Demo credentials: <span className="text-pink-500 font-black">LBL-839201 / 1234</span>
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-[#F8FBFF] min-h-screen pt-24 pb-20 overflow-x-hidden">

      {/* TOP HEADER */}
      <div className="bg-white border-b sticky top-16 z-40 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xl">👩‍👧</span>
          <div>
            <p className="text-xs font-black uppercase text-slate-900">Parent Dashboard</p>
            <p className="text-[9px] text-slate-400 font-semibold">Viewing: {activeChild.name}</p>
          </div>
        </div>
        <button
          onClick={() => setLoggedIn(false)}
          className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-8 space-y-8">

        {/* CHILD CARD */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-pink-200 shrink-0">
            <img src={activeChild.photo} alt={activeChild.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 space-y-1.5 text-center sm:text-left">
            <h2 className="text-xl font-black uppercase text-[#0F4C81]">{activeChild.name}</h2>
            <p className="text-slate-500 text-xs font-semibold">{activeChild.class} · Roll No: {activeChild.rollNo}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
              <span className="text-[9px] font-black bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full">
                ✓ {activeChild.attendance.present}/{activeChild.attendance.total} Days Present
              </span>
              <span className={`text-[9px] font-black px-2.5 py-1 rounded-full border ${activeChild.cameraEnabled ? "bg-sky-50 text-sky-700 border-sky-100" : "bg-slate-50 text-slate-500 border-slate-100"}`}>
                📹 Camera: {activeChild.cameraEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-2">
          {(["overview", "attendance", "homework", "camera", "notices"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition ${
                activeTab === tab ? "bg-slate-900 text-white" : "bg-white border border-slate-100 text-slate-500 hover:border-slate-300"
              }`}
            >
              {tab === "overview" ? "📊 Overview" :
               tab === "attendance" ? "📅 Attendance" :
               tab === "homework" ? "📚 Homework" :
               tab === "camera" ? "📹 Live Camera" :
               "📢 Notices"}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >

            {activeTab === "overview" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: "✅", label: "Attendance", value: `${Math.round((activeChild.attendance.present / activeChild.attendance.total) * 100)}%`, color: "text-emerald-500" },
                  { icon: "📖", label: "Pending Tasks", value: `${activeChild.homework.length}`, color: "text-amber-500" },
                  { icon: "📢", label: "Notices", value: `${activeChild.recentNotices.length}`, color: "text-blue-500" },
                  { icon: "📹", label: "Camera", value: activeChild.cameraEnabled ? "Active" : "Off", color: "text-pink-500" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 text-center space-y-1.5 shadow-sm">
                    <span className="text-2xl block">{stat.icon}</span>
                    <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                    <p className="text-[9px] font-bold uppercase text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black uppercase text-slate-900">Recent Attendance Log</h3>
                <div className="space-y-2">
                  {activeChild.attendanceLog.map((log, i) => (
                    <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0">
                      <span className="text-xs font-semibold text-slate-600">{log.date}</span>
                      <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${
                        log.status === "Present" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                      }`}>{log.status}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-[#F8FBFF] border rounded-xl p-4 text-center">
                  <p className="text-xl font-black text-emerald-600">{activeChild.attendance.present} / {activeChild.attendance.total}</p>
                  <p className="text-[9px] font-bold uppercase text-slate-400 mt-1">Total School Days Attended</p>
                </div>
              </div>
            )}

            {activeTab === "homework" && (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black uppercase text-slate-900">Pending Homework</h3>
                <div className="space-y-4">
                  {activeChild.homework.map((hw, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-[#F8FBFF] border border-slate-100 rounded-2xl">
                      <span className="text-xl">📘</span>
                      <div>
                        <p className="text-[10px] font-black uppercase text-pink-500">{hw.subject}</p>
                        <p className="text-sm font-semibold text-slate-800 mt-1">{hw.task}</p>
                        <p className="text-[9px] text-slate-400 font-bold mt-1">Due: {hw.due}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "camera" && (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black uppercase text-slate-900">Classroom Live View</h3>
                    <p className="text-[9px] text-slate-400 font-semibold mt-0.5">
                      Room: {activeChild.cameraRoom} · Window: {activeChild.cameraWindow.start} – {activeChild.cameraWindow.end}
                    </p>
                  </div>
                  <button
                    onClick={handleCamera}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition ${
                      cameraActive ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-emerald-500 text-white hover:bg-emerald-600"
                    }`}
                  >
                    {cameraActive ? "🔴 Stop Feed" : "▶ Start Feed"}
                  </button>
                </div>

                {showCameraWarning && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-xl p-4">
                    ⚠️ Camera feed for this classroom is currently disabled by the administrator. Please contact the school office for assistance.
                  </div>
                )}

                <div className={`relative rounded-2xl overflow-hidden h-72 border-2 transition-all duration-500 ${
                  cameraActive ? "border-emerald-400" : "border-slate-100"
                }`}>
                  {cameraActive ? (
                    <div className="relative w-full h-full">
                      <img src="/school1.jpg" alt="Classroom feed simulation" className="w-full h-full object-cover filter brightness-75" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-white text-[9px] font-black uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded-full">Live · {activeChild.cameraRoom}</span>
                      </div>
                      <div className="absolute bottom-4 right-4 text-white text-[9px] font-bold bg-black/50 px-2 py-1 rounded-lg">
                        Cam 03 · {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-3">
                      <span className="text-4xl">📹</span>
                      <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Camera Feed Inactive</p>
                      <p className="text-slate-300 text-[9px] font-semibold">Viewing available: {activeChild.cameraWindow.start} – {activeChild.cameraWindow.end}</p>
                    </div>
                  )}
                </div>

                <div className="text-[9px] text-slate-400 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                  🔒 Camera access is restricted to designated viewing windows only. All sessions are logged. Do not share camera access credentials with third parties.
                </div>
              </div>
            )}

            {activeTab === "notices" && (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black uppercase text-slate-900">School Notices</h3>
                <div className="space-y-3">
                  {activeChild.recentNotices.map((notice, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                      <span className="text-lg">📢</span>
                      <p className="text-slate-700 text-xs font-semibold leading-relaxed">{notice}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </div>
    </main>
  );
}
