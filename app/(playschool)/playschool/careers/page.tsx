"use client";

import { useState } from "react";
import { usePlayschoolDb } from "../context/PlayschoolDb";
import { motion } from "framer-motion";

export default function PlayschoolCareers() {
  const { submitCareerForm } = usePlayschoolDb();

  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "Nursery Teacher", experience: "2-4 Years", message: "" });
  const [resumeName, setResumeName] = useState("");
  const [success, setSuccess] = useState(false);

  const jobs = [
    { title: "Nursery Teacher", dept: "Early Childhood Education", exp: "2+ Years", type: "Full-Time", desc: "Require warm, affectionate female educators with B.Ed/PPTC and sound phonetic knowledge to teach alphabet tracing and vocabulary." },
    { title: "Play Group Coordinator", dept: "Toddler Care", exp: "4+ Years", type: "Full-Time", desc: "Overseeing daily motor sensory modules, diapering staff guidance, parent communications, and admissions coordination." },
    { title: "Music & Rhythm Teacher", dept: "Creative Arts", exp: "1+ Years", type: "Part-Time", desc: "Conducting action rhyme sessions, basic percussion training, and dance routines for playgroup kids twice weekly." },
    { title: "Full-Time School Nurse", dept: "Medical Care", exp: "2+ Years (Nurs)", type: "Full-Time", desc: "Licensed nurse to manage first-aid rooms, conduct monthly growth metric measurements, and record emergency details." }
  ];

  const benefits = [
    { title: "Competitive Salary", desc: "Provident Fund, annual performance increments, and festival bonuses.", icon: "💰" },
    { title: "Health Cover", desc: "Medical insurance covers for staff members and dependents.", icon: "🏥" },
    { title: "Training Programs", desc: "Quarterly workshops on modern Montessori and child psychology.", icon: "📖" },
    { title: "Warm Work Environment", desc: "Air-conditioned staff rooms, tea/snacks, and supportive management.", icon: "🌸" }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !resumeName) return;
    submitCareerForm(form.name, form.email, form.phone, form.position, form.experience, resumeName, form.message);
    setSuccess(true);
    setForm({ name: "", email: "", phone: "", position: "Nursery Teacher", experience: "2-4 Years", message: "" });
    setResumeName("");
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="w-full font-['Quicksand'] pb-20">
      
      {/* ========== HERO BANNER ========== */}
      <section className="bg-gradient-to-r from-sky-100 via-pink-100 to-yellow-100 py-16 px-6 text-center border-b-8 border-dashed border-sky-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 JOIN OUR TEAM</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Careers at Little Blossoms
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Become a part of our warm early childhood educator family. Shape the young minds of tomorrow in a supportive workspace.
          </p>
        </div>
      </section>

      {/* ========== BENEFITS SECTION ========== */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-3">💎 BENEFITS & PERKS</span>
        <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800 mb-14">Why Work With Us?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6.5">
          {benefits.map((ben) => (
            <div key={ben.title} className="p-7 bg-white border border-slate-100 rounded-3xl shadow-xs text-left">
              <span className="text-4xl block mb-4.5">{ben.icon}</span>
              <h3 className="font-['Fredoka'] font-black text-slate-800 text-base mb-2">{ben.title}</h3>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">{ben.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== AVAILABLE POSITIONS & FORM ========== */}
      <section className="bg-gradient-to-r from-sky-50 to-pink-50 py-20 px-6 border-y-8 border-dashed border-sky-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Vacancies List */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h2 className="font-['Fredoka'] font-black text-2xl text-slate-800 mb-2">Current Openings</h2>
            <p className="text-xs text-gray-500 font-semibold mb-8">Click on the application form on the right to apply for any of these open slots.</p>

            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.title} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-3">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <h3 className="font-['Fredoka'] font-black text-slate-800 text-base">{job.title}</h3>
                    <div className="flex gap-2">
                      <span className="bg-sky-50 text-sky-700 font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">{job.type}</span>
                      <span className="bg-pink-50 text-pink-700 font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">Exp: {job.exp}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 font-semibold leading-relaxed">{job.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Form */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-md text-left">
            <h2 className="font-['Fredoka'] font-black text-2xl text-slate-800 mb-2">Apply Now</h2>
            <p className="text-xs text-gray-400 font-semibold mb-8">Submit your academic details and resume to our HR desk.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Candidate name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Mobile number..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email address..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Target Position</label>
                  <select
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-bold text-gray-600 bg-white"
                  >
                    <option value="Nursery Teacher">Nursery Teacher</option>
                    <option value="Play Group Coordinator">Play Group Coordinator</option>
                    <option value="Music & Rhythm Teacher">Music & Rhythm Teacher</option>
                    <option value="School Nurse">School Nurse</option>
                    <option value="Attendant / Maid">Attendant / Maid</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Experience Level</label>
                  <select
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-bold text-gray-600 bg-white"
                  >
                    <option value="Freshers / 0-1 Yr">Freshers / 0-1 Yr</option>
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="2-4 Years">2-4 Years</option>
                    <option value="4+ Years">4+ Years</option>
                  </select>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Upload Resume (PDF/DOC)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition relative">
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-1">
                    <span className="text-2xl block">📄</span>
                    <p className="text-xs font-bold text-slate-700">
                      {resumeName ? `Selected: ${resumeName}` : "Drag & drop or click to upload resume"}
                    </p>
                    <p className="text-[10px] text-gray-400">Max size 2MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Cover Message / Remarks</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share a short note about your child teaching passions..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-full shadow-md transition"
              >
                Submit Job Application 🚀
              </button>
            </form>

            {success && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold text-center"
              >
                🎉 Success! Your application was saved. Our hiring coordinator will contact you.
              </motion.p>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
