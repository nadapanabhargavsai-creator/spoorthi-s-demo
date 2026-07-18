"use client";

import { useState } from "react";
import { usePlayschoolDb } from "../context/PlayschoolDb";
import { motion } from "framer-motion";

export default function PlayschoolContact() {
  const { submitContactForm } = usePlayschoolDb();

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "Admissions", message: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) return;
    submitContactForm(form.name, form.email, form.phone, form.subject, form.message);
    setSuccess(true);
    setForm({ name: "", email: "", phone: "", subject: "Admissions", message: "" });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="w-full font-['Quicksand'] pb-20">
      
      {/* ========== HERO BANNER ========== */}
      <section className="bg-gradient-to-r from-sky-100 via-pink-100 to-yellow-100 py-16 px-6 text-center border-b-8 border-dashed border-sky-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 GET IN TOUCH</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Contact Our Help Desks
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Have a question? Fill out our inquiry form or reach out to our branch managers directly.
          </p>
        </div>
      </section>

      {/* ========== CONTACT LAYOUT ========== */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Info Cards */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="bg-white p-7 rounded-3xl border-2 border-slate-100 shadow-sm space-y-5">
            <h3 className="font-['Fredoka'] font-black text-slate-800 text-lg">📞 Contact Information</h3>
            
            <div className="space-y-3.5 text-sm font-bold text-gray-600">
              <div className="flex items-start gap-2.5">
                <span className="text-lg">📞</span>
                <div>
                  <p className="text-slate-800">Phone Numbers</p>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">+91 98765 43210 (Gachibowli)</p>
                  <p className="text-xs text-gray-400 font-semibold">+91 91234 56780 (Kukatpally)</p>
                  <p className="text-xs text-gray-400 font-semibold">+91 95500 12345 (Madhapur)</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-lg">✉️</span>
                <div>
                  <p className="text-slate-800">Email Address</p>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">admissions.lb@spoorthiacademy.in</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-lg">⏰</span>
                <div>
                  <p className="text-slate-800">Office Working Hours</p>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">Monday to Saturday: 08:30 AM - 02:00 PM</p>
                  <p className="text-xs text-gray-400 font-semibold">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-pink-50 p-7 rounded-3xl border-2 border-pink-200 shadow-sm space-y-3 text-pink-900">
            <h3 className="font-['Fredoka'] font-black text-lg flex items-center gap-1.5">
              <span>🚨</span> Emergency Contacts
            </h3>
            <p className="text-xs font-semibold leading-relaxed">
              For urgent matters regarding ongoing child dispersion, van routing delays, or medical details, dial our student hotline:
            </p>
            <p className="text-lg font-black text-pink-700 mt-2">+91 98765 99999</p>
          </div>

          <div className="bg-emerald-50 p-7 rounded-3xl border-2 border-emerald-200 shadow-sm space-y-4">
            <h3 className="font-['Fredoka'] font-black text-emerald-800 text-lg">💬 Message Us on WhatsApp</h3>
            <p className="text-xs font-semibold text-emerald-600 leading-relaxed">
              Get immediate admission replies or directions queries on WhatsApp.
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase px-6.5 py-3 rounded-full shadow-sm transition"
            >
              <span>💬</span> Chat With Help Desk
            </a>
          </div>
        </div>

        {/* Right Side: Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-md text-left">
          <h2 className="font-['Fredoka'] font-black text-2xl text-slate-800 mb-2">Send an Inquiry</h2>
          <p className="text-xs text-gray-400 font-semibold mb-8">Our admission consultants will reply via phone call or email within 24 working hours.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name..."
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
                  placeholder="Your mobile number..."
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
                placeholder="Your email address..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Subject / Category</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-bold text-gray-600 bg-white"
              >
                <option value="Admissions">Admissions Inquiry</option>
                <option value="Fees">Fee Structures & Installments</option>
                <option value="Transport">School Van Routes</option>
                <option value="CCTV">CCTV Camera Access</option>
                <option value="Other">General / Partnership</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-gray-500 uppercase block mb-1.5">Your Message</label>
              <textarea
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Type your question or query here..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-full shadow-md transition"
            >
              Submit Inquiry Form 🚀
            </button>
          </form>

          {success && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold text-center"
            >
              🎉 Success! Your contact form inquiry was saved. Our team will reach out shortly.
            </motion.p>
          )}
        </div>

      </section>

      {/* ========== THREE MAPS IFRAMES ========== */}
      <section className="bg-slate-50 py-20 px-6 border-t-2 border-slate-100 text-center">
        <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-3">🗺️ CAMPUS MAPS</span>
        <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800 mb-14">Find Us on Google Maps</h2>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-left">
            <h3 className="font-['Fredoka'] font-black text-slate-800 text-base mb-2">🌸 Gachibowli Campus</h3>
            <div className="h-64 rounded-2xl overflow-hidden mb-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.744158498968!2d78.36195231487771!3d17.42407288805903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f5ff24ee7f%3A0xb6c7dcfdf06b0060!2sGachibowli%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1626659020921!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Gachibowli+Hyderabad+Telangana"
              target="_blank"
              className="text-xs text-sky-500 hover:text-sky-600 font-bold block"
            >
              Get directions on mobile →
            </a>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-left">
            <h3 className="font-['Fredoka'] font-black text-slate-800 text-base mb-2">🌸 Kukatpally Campus</h3>
            <div className="h-64 rounded-2xl overflow-hidden mb-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.2922119154483!2d78.39659351487869!3d17.4936087880174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c1f5446059%3A0xedc76f629ca889cd!2sKukatpally%20Housing%20Board%20Colony%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1626659050921!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Kukatpally+Hyderabad+Telangana"
              target="_blank"
              className="text-xs text-sky-500 hover:text-sky-600 font-bold block"
            >
              Get directions on mobile →
            </a>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-left">
            <h3 className="font-['Fredoka'] font-black text-slate-800 text-base mb-2">🌸 Madhapur Campus</h3>
            <div className="h-64 rounded-2xl overflow-hidden mb-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4172421295246!2d78.39005951487796!3d17.439735688049187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f24ee7fb%3A0xc3f8e5f7a2ba50a0!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1626659080921!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Madhapur+Hyderabad+Telangana"
              target="_blank"
              className="text-xs text-sky-500 hover:text-sky-600 font-bold block"
            >
              Get directions on mobile →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
