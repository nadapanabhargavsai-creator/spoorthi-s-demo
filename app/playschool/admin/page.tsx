"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initialApplications, initialPositions, PlaySchoolPosition, PlaySchoolApplication, AppStatus } from "../state";

const ADMIN_CREDENTIALS = { user: "admin", pass: "admin123" };

type AdminTab = "dashboard" | "applications" | "positions" | "notices" | "cameras";

export default function PlaySchoolAdmin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState<AdminTab>("dashboard");

  // Application management state
  const [applications, setApplications] = useState(initialApplications);
  const [notices, setNotices] = useState<{ id: number; text: string; date: string }[]>([
    { id: 1, text: "Fancy Dress items required by July 28 for all Nursery students.", date: "July 19, 2026" },
    { id: 2, text: "PTM for all classes scheduled on August 5, 9:00 AM onwards.", date: "July 19, 2026" },
  ]);
  const [newNotice, setNewNotice] = useState("");

  // Camera permissions state
  const [cameraPerms, setCameraPerms] = useState<{ [room: string]: boolean }>({
    "Nursery A": true,
    "Nursery B": false,
    "LKG A": true,
    "UKG A": false,
    "Play Group": false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (user === ADMIN_CREDENTIALS.user && pass === ADMIN_CREDENTIALS.pass) {
        setLoggedIn(true);
      } else {
        setLoginError("Invalid credentials. Try admin / admin123.");
      }
      setLoading(false);
    }, 1200);
  };

  const updateStatus = (id: string, status: AppStatus) => {
    setApplications((prev) => prev.map((a): PlaySchoolApplication => (a.id === id ? { ...a, status } : a)));
  };

  const addNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.trim()) return;
    setNotices((prev) => [
      { id: Date.now(), text: newNotice, date: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) },
      ...prev,
    ]);
    setNewNotice("");
  };

  const deleteNotice = (id: number) => setNotices((prev) => prev.filter((n) => n.id !== id));

  const toggleCamera = (room: string) => {
    setCameraPerms((prev) => ({ ...prev, [room]: !prev[room] }));
  };

  // Login Screen
  if (!loggedIn) {
    return (
      <main className="bg-[#F8FBFF] min-h-screen flex items-center justify-center px-6 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-100 rounded-3xl p-10 max-w-sm w-full shadow-lg space-y-8"
        >
          <div className="text-center space-y-2">
            <span className="text-4xl block">🛡️</span>
            <h1 className="text-xl font-black uppercase text-slate-900">Admin Login</h1>
            <p className="text-slate-400 text-xs font-semibold">Restricted access. Authorized personnel only.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Username</label>
              <input required value={user} onChange={(e) => setUser(e.target.value)} placeholder="admin" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Password</label>
              <input type="password" required value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition" />
            </div>
            {loginError && <p className="text-red-500 text-[10px] font-bold bg-red-50 border border-red-100 p-2.5 rounded-xl">{loginError}</p>}
            <button type="submit" disabled={loading} className="w-full py-3.5 bg-slate-900 hover:bg-pink-500 text-white font-black uppercase text-[9px] tracking-widest rounded-xl transition">
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>

          <p className="text-center text-[9px] text-slate-400 font-semibold">Demo: <span className="text-pink-500 font-black">admin / admin123</span></p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-[#F8FBFF] min-h-screen pt-20 pb-20 overflow-x-hidden">

      {/* ADMIN TOPBAR */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between sticky top-16 z-40">
        <div className="flex items-center gap-3">
          <span className="text-lg">🛡️</span>
          <div>
            <p className="text-xs font-black uppercase">Admin Dashboard</p>
            <p className="text-[9px] text-slate-400 font-semibold">Little Blossoms Play School</p>
          </div>
        </div>
        <button onClick={() => setLoggedIn(false)} className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-red-400 transition">
          Sign Out
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8 space-y-6">

        {/* TABS */}
        <div className="flex flex-wrap gap-2">
          {([
            ["dashboard", "📊 Dashboard"],
            ["applications", "📝 Applications"],
            ["positions", "💼 Positions"],
            ["notices", "📢 Notices"],
            ["cameras", "📹 Camera Mgmt"],
          ] as [AdminTab, string][]).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition ${
                tab === t ? "bg-slate-900 text-white" : "bg-white border border-slate-100 text-slate-500 hover:border-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >

            {/* DASHBOARD STATS */}
            {tab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: "📝", label: "Total Applications", value: applications.length, color: "text-blue-500" },
                    { icon: "✅", label: "Confirmed", value: applications.filter(a => a.status === "Admission Confirmed").length, color: "text-emerald-500" },
                    { icon: "⏳", label: "Pending Verification", value: applications.filter(a => a.status === "Submitted").length, color: "text-amber-500" },
                    { icon: "💼", label: "Open Positions", value: initialPositions.length, color: "text-pink-500" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm space-y-1.5">
                      <span className="text-2xl block">{stat.icon}</span>
                      <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                      <p className="text-[9px] font-bold uppercase text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-black uppercase text-slate-900 mb-4">Recent Applications</h3>
                  <div className="space-y-2">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0 text-xs">
                        <span className="font-bold text-slate-700">{app.studentName}</span>
                        <span className="text-slate-400 font-semibold">{app.program}</span>
                        <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full ${
                          app.status === "Admission Confirmed" ? "bg-emerald-100 text-emerald-700" :
                          app.status === "Submitted" ? "bg-sky-100 text-sky-700" :
                          "bg-amber-100 text-amber-700"
                        }`}>{app.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* APPLICATIONS MANAGER */}
            {tab === "applications" && (
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-sm font-black uppercase text-slate-900">All Admission Applications</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        {["App ID", "Student", "Program", "Branch", "Status", "Actions"].map(h => (
                          <th key={h} className="px-4 py-3 text-left font-black uppercase text-slate-400 text-[9px] tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                          <td className="px-4 py-3.5 font-black text-pink-500">{app.id}</td>
                          <td className="px-4 py-3.5 font-semibold text-slate-800">{app.studentName}</td>
                          <td className="px-4 py-3.5 text-slate-500">{app.program}</td>
                          <td className="px-4 py-3.5 text-slate-400">{app.branch}</td>
                          <td className="px-4 py-3.5">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                              app.status === "Admission Confirmed" ? "bg-emerald-100 text-emerald-700" :
                              app.status === "Submitted" ? "bg-sky-100 text-sky-700" :
                              app.status === "Completed" ? "bg-purple-100 text-purple-700" :
                              "bg-amber-100 text-amber-700"
                            }`}>{app.status}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <select
                              value={app.status}
                              onChange={(e) => updateStatus(app.id, e.target.value as import("../state").AppStatus)}
                              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[9px] font-bold focus:outline-none"
                            >
                              <option>Submitted</option>
                              <option>Verified</option>
                              <option>Test Scheduled</option>
                              <option>Admission Confirmed</option>
                              <option>Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* POSITIONS MANAGER */}
            {tab === "positions" && (
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-sm font-black uppercase text-slate-900">Open Job Positions</h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {initialPositions.map((pos: PlaySchoolPosition, i: number) => (
                    <div key={i} className="flex justify-between items-center px-6 py-4">
                      <div>
                        <p className="text-sm font-black text-[#0F4C81]">{pos.title}</p>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{pos.department} · {pos.type} · {pos.location}</p>
                      </div>
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded-full ${pos.type === "Full Time" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {pos.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NOTICES MANAGER */}
            {tab === "notices" && (
              <div className="space-y-6">
                <form onSubmit={addNotice} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-black uppercase text-slate-900">Post New Notice</h3>
                  <textarea
                    rows={3}
                    value={newNotice}
                    onChange={(e) => setNewNotice(e.target.value)}
                    placeholder="Type notice content here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition resize-none"
                  />
                  <button type="submit" className="px-6 py-2.5 bg-slate-900 hover:bg-pink-500 text-white font-black uppercase text-[9px] tracking-widest rounded-xl transition">
                    Broadcast Notice
                  </button>
                </form>

                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5 border-b">
                    <h3 className="text-sm font-black uppercase text-slate-900">Active Notices</h3>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {notices.map((n) => (
                      <div key={n.id} className="px-6 py-4 flex justify-between items-start gap-4">
                        <div>
                          <p className="text-xs text-slate-700 font-semibold leading-relaxed">{n.text}</p>
                          <p className="text-[9px] text-slate-400 font-bold mt-1">{n.date}</p>
                        </div>
                        <button onClick={() => deleteNotice(n.id)} className="shrink-0 text-red-400 hover:text-red-600 text-xs font-black transition">
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CAMERA MANAGER */}
            {tab === "cameras" && (
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-sm font-black uppercase text-slate-900">Classroom Camera Permissions</h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Toggle parent camera viewing access per classroom. Changes apply immediately.</p>
                </div>
                <div className="divide-y divide-slate-50">
                  {Object.entries(cameraPerms).map(([room, enabled]) => (
                    <div key={room} className="flex justify-between items-center px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📹</span>
                        <div>
                          <p className="text-sm font-black text-slate-800">{room}</p>
                          <p className="text-[9px] text-slate-400 font-semibold">{enabled ? "Parents can view live feed" : "Camera feed is hidden from parents"}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleCamera(room)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${enabled ? "bg-emerald-500" : "bg-slate-200"}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"}`} />
                      </button>
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
