"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease }
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.4, ease }
  }
};

export default function PlaySchoolContact() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormName("");
        setFormEmail("");
        setFormPhone("");
        setFormMessage("");
      }, 3000);
    }, 1500);
  };

  return (
    <main className="bg-[#F8FBFF] overflow-x-hidden pt-28 pb-20">
      
      {/* HERO BANNER */}
      <section className="relative py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Contact <span className="text-pink-500">Us</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            Have questions about registrations or admissions? Reach out to us through the direct channels below.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-start">
          
          {/* Direct channels (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            
            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <span className="text-[9px] font-black uppercase text-slate-400">School Address</span>
              <p className="font-bold text-[#0F4C81] text-base mt-1.5">Administrative Center</p>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-semibold">
                Road No. 14, Papi Reddy Nagar, Papi Reddy Colony, Hyderabad, TS 500037
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-3">
              <div>
                <span className="text-[9px] font-black uppercase text-slate-400">Direct Telephone</span>
                <a href="tel:+919381377301" className="text-[#0F4C81] text-base font-black mt-1 block">+91 93813 77301</a>
              </div>
              <div>
                <span className="text-[9px] font-black uppercase text-slate-400">Email Desk</span>
                <a href="mailto:admissions@spoorthis.edu.in" className="text-pink-500 text-xs font-black mt-1 block">admissions@spoorthis.edu.in</a>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <span className="text-[9px] font-black uppercase text-slate-400">Office Timings</span>
              <p className="text-slate-700 text-xs mt-1.5 font-bold">Mon – Sat: 8:00 AM – 4:00 PM</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Closed on Sundays & public holidays.</p>
            </div>

            <div className="p-6 bg-red-50/50 border border-red-100 rounded-3xl">
              <span className="text-[9px] font-black uppercase text-red-500 tracking-wider block">🚨 Emergency Hotline</span>
              <p className="text-base font-black text-slate-800 mt-1.5">+91 93813 77301 (Ext 911)</p>
            </div>

            {/* WHATSAPP CTA */}
            <a
              href="https://wa.me/919381377301"
              target="_blank"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-xs tracking-widest rounded-3xl shadow-md transition"
            >
              <span>💬</span> Chat On WhatsApp
            </a>

          </div>

          {/* Form console (7 cols) */}
          <div className="md:col-span-7 bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
            <h3 className="text-lg font-black uppercase text-slate-900 mb-6">Direct Message</h3>
            
            {submitted ? (
              <div className="py-24 text-center">
                <span className="text-5xl block mb-3">✉️</span>
                <h4 className="text-lg font-black text-slate-900 uppercase">Message Transmitted!</h4>
                <p className="text-slate-400 text-xs mt-1 font-semibold">Our admissions coordinator will respond back within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Meera Nair"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-pink-500 transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-pink-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="e.g. +91 9381377301"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-pink-500 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Your Message</label>
                  <textarea 
                    rows={4}
                    required 
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Enter your queries..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-pink-500 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 px-6 py-4 bg-slate-900 hover:bg-pink-500 text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? "Transmitting..." : "Submit Message"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* MAP */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto rounded-[2rem] overflow-hidden h-[400px] border shadow-sm">
          <iframe
            src="https://www.google.com/maps?q=Road+No.+14,+Papi+Reddy+Nagar,+Hyderabad&output=embed"
            width="100%"
            height="100%"
            className="border-0 opacity-90 rounded-2xl"
            loading="lazy"
            title="Location Map"
          />
        </div>
      </section>

    </main>
  );
}
