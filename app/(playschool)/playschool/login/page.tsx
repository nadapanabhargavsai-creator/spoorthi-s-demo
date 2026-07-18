"use client";

import { useState } from "react";
import { usePlayschoolDb } from "../context/PlayschoolDb";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PlayschoolLogin() {
  const { login, session, logout, homeworks, notices } = usePlayschoolDb();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    const res = login(username, password);
    if (res.success) {
      setErrorMsg("");
      if (res.session?.role === "admin") {
        router.push("/playschool/admin");
      }
    } else {
      setErrorMsg(res.error || "Login failed");
    }
  };

  // If parent logged in, render Dashboard
  if (session && session.role === "parent" && session.childProfile) {
    const profile = session.childProfile;
    
    // Filter homework by child's grade
    const childHw = homeworks.filter(hw => hw.class === profile.grade);

    return (
      <main className="bg-slate-50 min-h-screen pt-28 pb-20 px-6 font-['Quicksand'] text-left">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header Portal Profile */}
          <div className="bg-gradient-to-r from-sky-400 to-emerald-400 text-white rounded-[2.5rem] p-8 sm:p-10 shadow-md flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4.5">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl shadow-md border-2 border-sky-100">
                👶
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                  Parent Portal Active
                </span>
                <h1 className="text-2xl font-['Fredoka'] font-black mt-2">{profile.name}</h1>
                <p className="text-xs text-sky-50 mt-1 font-bold">Class: {profile.grade} | Roll No: {profile.rollNo}</p>
              </div>
            </div>
            
            <div className="flex gap-3.5">
              <Link
                href="/playschool/camera"
                className="bg-white text-emerald-600 hover:bg-emerald-50 px-6.5 py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-sm transition flex items-center gap-1.5 animate-pulse"
              >
                📹 Live Camera Feed
              </Link>
              <button
                onClick={() => { logout(); router.push("/playschool"); }}
                className="bg-sky-600 text-sky-100 border border-sky-300 hover:bg-sky-700 px-5 py-3 rounded-full font-black text-xs uppercase"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Dashboard Blocks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Col: Attendance, Homework & Notices */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Profile Details & Attendance */}
              <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-600 font-bold text-sm">
                <div className="p-4 bg-sky-50 rounded-2xl text-center space-y-1">
                  <p className="text-[10px] font-black uppercase text-sky-600">Daily Attendance</p>
                  <strong className="text-3xl font-['Fredoka'] font-black text-sky-700 block">{profile.attendance}</strong>
                  <p className="text-[10px] text-gray-400">Term 1 Record</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-2xl text-center space-y-1">
                  <p className="text-[10px] font-black uppercase text-pink-600">Pending Homework</p>
                  <strong className="text-3xl font-['Fredoka'] font-black text-pink-700 block">{childHw.length}</strong>
                  <p className="text-[10px] text-gray-400">Due this week</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-2xl text-center space-y-1">
                  <p className="text-[10px] font-black uppercase text-yellow-600">Fee Status</p>
                  <strong className={`text-xl font-['Fredoka'] font-black block mt-2 ${
                    profile.feeStatus === "Paid" ? "text-emerald-700" : "text-amber-700"
                  }`}>{profile.feeStatus}</strong>
                  <p className="text-[10px] text-gray-400">
                    {profile.feeStatus === "Paid" ? "All terms settled" : `Due: ₹${profile.dueAmount}`}
                  </p>
                </div>
              </div>

              {/* Homework Card */}
              <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm text-slate-800">
                <h3 className="font-['Fredoka'] font-black text-lg mb-6 flex items-center gap-2">
                  <span>✏️</span> Home Assignments
                </h3>
                
                {childHw.length > 0 ? (
                  <div className="space-y-4">
                    {childHw.map((hw) => (
                      <div key={hw.id} className="p-4.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs sm:text-sm font-semibold space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase">
                          <span>Subject: {hw.subject}</span>
                          <span className="text-pink-600">Due: {hw.dueDate}</span>
                        </div>
                        <p className="text-slate-700 font-bold leading-relaxed">{hw.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 font-bold">🎉 Hooray! No homework pending for today.</p>
                )}
              </div>

              {/* General Notices */}
              <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm text-slate-800">
                <h3 className="font-['Fredoka'] font-black text-lg mb-6 flex items-center gap-2">
                  <span>📢</span> Notice Board Updates
                </h3>
                <div className="space-y-4">
                  {notices.map((n) => (
                    <div key={n.id} className="p-4.5 rounded-2xl bg-white border border-slate-100 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-[8.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          n.category === "Urgent" ? "bg-pink-100 text-pink-700" : "bg-sky-100 text-sky-700"
                        }`}>
                          {n.category}
                        </span>
                        <span className="text-[9.5px] text-gray-400 font-bold">{n.date}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-800 mb-1">{n.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-semibold">{n.content}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Col: Documents checklist & Contacts */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* CCTV Camera Info Panel */}
              <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-['Fredoka'] font-black text-slate-800 text-base">📹 CCTV Camera Room</h3>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  Your child is mapped to the <strong className="text-slate-700">{profile.cameraName}</strong> feed. You are authorized to stream the secure feed during permitted school hours.
                </p>
                <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl text-[11px] text-emerald-800 font-bold">
                  🔐 Security Policy: Never share credentials. Streams are monitored for IP abuse.
                </div>
                <Link
                  href="/playschool/camera"
                  className="block w-full text-center bg-sky-500 hover:bg-sky-600 text-white py-3.5 rounded-full font-black text-xs uppercase tracking-wider shadow-sm transition"
                >
                  Stream Live Classroom Camera
                </Link>
              </div>

              {/* Submitted Docs Checklist */}
              <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-['Fredoka'] font-black text-slate-800 text-base">📁 Verification Documents</h3>
                
                <div className="space-y-3 font-bold text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-500 text-base">✓</span>
                    <span className="text-slate-600">Birth Certificate (Verified)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-500 text-base">✓</span>
                    <span className="text-slate-600">Parent Aadhaar copies (Verified)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-amber-500 text-base">⏳</span>
                    <span className="text-slate-500">Child immunization certificate (Due)</span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Simulated: Uploading verification files...")}
                  className="w-full text-center border-2 border-dashed border-slate-200 hover:bg-slate-50 py-2.5 rounded-xl text-xs font-bold text-slate-500 mt-2 transition"
                >
                  Upload Remaining Files
                </button>
              </div>

              {/* Homework Diary notice */}
              <div className="bg-pink-50 p-6 rounded-3xl border-2 border-pink-200 text-pink-900 space-y-2">
                <h4 className="font-['Fredoka'] font-black text-sm">💡 Teacher's Personal Diary Note</h4>
                <p className="text-xs font-semibold leading-relaxed">
                  "{profile.notice}"
                </p>
                <p className="text-[9.5px] font-black uppercase text-pink-600 tracking-wider pt-2">— Class Teacher, Little Blossoms</p>
              </div>

            </div>

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
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 LOG IN</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Parent & Staff Portal Login
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Access child attendance diary, classroom CCTV streams, homework files, and admin systems.
          </p>
        </div>
      </section>

      {/* ========== LOGIN FORM ========== */}
      <section className="max-w-lg mx-auto px-6 py-20">
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-md text-left">
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Username / Parent ID</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (e.g. srinivas)..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. parent123)..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-pink-600 font-bold">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-full shadow-md transition"
            >
              Sign In 🔑
            </button>
          </form>

        </div>

        {/* Demo Credentials Drawer */}
        <div className="mt-8 bg-sky-50 border border-sky-200 p-6 rounded-2xl text-left">
          <h4 className="font-['Fredoka'] font-black text-slate-800 text-xs uppercase tracking-wider mb-3">🔑 Testing Demo Accounts:</h4>
          <div className="space-y-2 text-xs font-semibold text-sky-800">
            <p>👨‍👩- <strong>Parent (Play Group):</strong> user `srinivas` / pass `parent123`</p>
            <p>👨‍👩- <strong>Parent (Nursery):</strong> user `anitha` / pass `parent123`</p>
            <p>👨‍👩- <strong>Parent (LKG):</strong> user `rahul` / pass `parent123`</p>
            <p>👨‍👩- <strong>Parent (UKG):</strong> user `priya` / pass `parent123`</p>
            <p>👩‍💼 - <strong>Admin:</strong> user `admin` / pass `admin123`</p>
          </div>
        </div>

      </section>

    </div>
  );
}
