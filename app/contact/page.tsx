"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Department {
  name: string;
  role: string;
  email: string;
  phone: string;
  timing: string;
  contactPerson: string;
  icon: string;
  color: string;
}

const departments: Department[] = [
  {
    name: "Principal's Office",
    role: "Academic Leadership & Escalations",
    email: "principal@spoorthis.edu.in",
    phone: "+91 93813 77301 (Ext 101)",
    timing: "Mon & Thu: 2:00 PM – 3:30 PM (Prior Appointment)",
    contactPerson: "Dr. Saritha Match, Principal",
    icon: "🎓",
    color: "from-amber-500 to-orange-600"
  },
  {
    name: "Admissions Desk",
    role: "Enquiries, Registration & Campus Tours",
    email: "admissions@spoorthis.edu.in",
    phone: "+91 93813 77301 (Ext 102)",
    timing: "Mon – Sat: 8:30 AM – 3:30 PM",
    contactPerson: "Mrs. Mounika Marampelly",
    icon: "📝",
    color: "from-blue-500 to-indigo-600"
  },
  {
    name: "General Office",
    role: "Certificates, Documentation & General Help",
    email: "office@spoorthis.edu.in",
    phone: "+91 93813 77301 (Ext 100)",
    timing: "Mon – Sat: 8:00 AM – 4:00 PM",
    contactPerson: "Administration Head",
    icon: "🏢",
    color: "from-emerald-500 to-teal-600"
  },
  {
    name: "Accounts & Fees",
    role: "Fee payment, receipts & billing queries",
    email: "accounts@spoorthis.edu.in",
    phone: "+91 93813 77301 (Ext 104)",
    timing: "Mon – Sat: 9:00 AM – 1:30 PM",
    contactPerson: "Finance Manager",
    icon: "💳",
    color: "from-purple-500 to-pink-600"
  },
  {
    name: "Transport Division",
    role: "Bus routes, GPS tracking & pickup details",
    email: "transport@spoorthis.edu.in",
    phone: "+91 93813 77301 (Ext 108)",
    timing: "Mon – Sat: 7:00 AM – 5:00 PM",
    contactPerson: "Transport Coordinator",
    icon: "🚌",
    color: "from-rose-500 to-red-600"
  }
];

const faqs = [
  {
    q: "How do I schedule a prior appointment with the Principal?",
    a: "You can request an appointment by emailing principal@spoorthis.edu.in or calling Ext 101. Appointments are usually scheduled on Mondays and Thursdays between 2:00 PM and 3:30 PM."
  },
  {
    q: "What is the procedure for fee payment enquiries?",
    a: "All fee structures, due dates, and receipts are handled by the Accounts department. You can visit the counter during working hours (9:00 AM – 1:30 PM) or write to accounts@spoorthis.edu.in."
  },
  {
    q: "How can parents track school bus locations in real-time?",
    a: "Our Transport Division registers your phone number to our GPS tracking application upon enrollment. You will receive live routes and expected times of arrival for your child's route."
  },
  {
    q: "Are admissions open mid-term?",
    a: "Mid-term admissions depend entirely on seat availability per grade level. Please reach out to the Admissions Desk at admissions@spoorthis.edu.in to check current availability."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Contact() {
  const [activeDept, setActiveDept] = useState<number>(0);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setFormName("");
      setFormEmail("");
      setFormPhone("");
      setFormSubject("");
      setFormMessage("");
    }, 3000);
  };

  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen overflow-x-hidden pt-20">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/banner.jpg" 
            alt="Contact Campus Banner" 
            className="w-full h-full object-cover filter brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/50" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-yellow-500 text-black text-[10px] font-black px-5 py-2 uppercase tracking-[0.4em] rounded-full mb-6"
          >
            Connect With Us
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black uppercase leading-[0.95] tracking-tighter mb-6"
          >
            Get In <span className="text-yellow-400">Touch</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            We are always here to help you. Reach out to our dedicated departments, send a direct query, or visit our Hyderabad campus.
          </motion.p>
        </div>
      </section>

      {/* 2. SPATIAL UI INTERACTIVE CONTACT DESK & FORM */}
      <section className="py-24 px-6 relative">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl bg-blue-500 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl bg-purple-500 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* SPATIAL DEPARTMENT PANEL (Left 7 Columns) */}
            <motion.div 
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.15 }}
              className="lg:col-span-7 space-y-8"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500">Interactive Hub</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase text-white mt-2">Department Contact Desk</h2>
                <p className="text-slate-400 text-sm mt-3 max-w-lg leading-relaxed">
                  Select a department to view detailed spatial contact points, direct support personnel, and response timings.
                </p>
              </div>

              {/* Spatial Selector Panel */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-slate-900/60 p-2 rounded-2xl border border-slate-800 backdrop-blur-md">
                {departments.map((dept, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDept(idx)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                      activeDept === idx 
                        ? "bg-gradient-to-br text-white shadow-lg shadow-black/40 scale-105 border border-slate-700/50" 
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40"
                    }`}
                  >
                    {activeDept === idx && (
                      <motion.div 
                        layoutId="activeGlow" 
                        className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-20 -z-10`}
                      />
                    )}
                    <span className="text-2xl mb-2 transform group-hover:scale-110 transition-transform">{dept.icon}</span>
                    <span className="text-[9px] font-black uppercase text-center tracking-wider leading-tight">
                      {dept.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Spatial Detail Screen Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDept}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-900/45 border border-slate-800 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden"
                >
                  {/* Decorative glowing sphere inside the active card */}
                  <div className={`absolute -right-16 -bottom-16 w-48 h-48 rounded-full opacity-10 blur-2xl bg-gradient-to-br ${departments[activeDept].color}`} />
                  
                  <div className="flex items-start gap-5">
                    <span className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${departments[activeDept].color} flex items-center justify-center text-3xl shadow-lg`}>
                      {departments[activeDept].icon}
                    </span>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-yellow-500">Active Department</span>
                      <h3 className="text-2xl font-black uppercase text-white mt-1">{departments[activeDept].name}</h3>
                      <p className="text-slate-400 text-xs mt-1 font-semibold">{departments[activeDept].role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-slate-800/60">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Contact Officer</h4>
                        <p className="text-sm font-bold text-white mt-1">{departments[activeDept].contactPerson}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Office Hour Timings</h4>
                        <p className="text-sm font-semibold text-slate-300 mt-1">{departments[activeDept].timing}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Direct Email</h4>
                        <a 
                          href={`mailto:${departments[activeDept].email}`}
                          className="text-sm font-black text-yellow-400 hover:underline mt-1 block"
                        >
                          {departments[activeDept].email}
                        </a>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Helpline / Extension</h4>
                        <a 
                          href="tel:+919381377301"
                          className="text-sm font-black text-white hover:text-yellow-400 transition mt-1 block"
                        >
                          {departments[activeDept].phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* EMERGENCY CONTACTS BAY */}
              <div className="bg-red-950/20 border border-red-900/30 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3.5 mb-4">
                  <span className="text-2xl">🚨</span>
                  <h3 className="text-lg font-black uppercase text-red-400 tracking-wider">Emergency Hotlines (24/7)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="p-4 bg-slate-950/40 rounded-2xl border border-red-900/10">
                    <p className="text-xs text-slate-400 font-bold uppercase">Campus Security Desk</p>
                    <p className="text-base font-black text-white mt-1">+91 93813 77301 (Ext 911)</p>
                  </div>
                  <div className="p-4 bg-slate-950/40 rounded-2xl border border-red-900/10">
                    <p className="text-xs text-slate-400 font-bold uppercase">On-Campus Health Nurse</p>
                    <p className="text-base font-black text-white mt-1">+91 93813 77301 (Ext 103)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* HIGH-TECH CONTACT FORM (Right 5 Columns) */}
            <motion.div 
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.15 }}
              className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              
              <h3 className="text-2xl font-black uppercase text-white mb-2">Direct Message</h3>
              <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                Fill the secure console below to transmit your message instantly to our administration desk.
              </p>

              {formSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-24 text-center"
                >
                  <span className="text-6xl mb-4 block">✉️</span>
                  <h4 className="text-xl font-black text-white mb-1">Message Transmitted!</h4>
                  <p className="text-slate-400 text-xs">We will respond back via email within 24 operational hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Anand Sharma"
                      className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="anand@example.com"
                        className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+91 90000 12345"
                        className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">Subject</label>
                    <input 
                      type="text" 
                      required 
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      placeholder="e.g. Admission Query for Grade 5"
                      className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">Detailed Message</label>
                    <textarea 
                      rows={4}
                      required 
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Type your queries or messages..."
                      className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 transition resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full mt-4 px-6 py-4 bg-yellow-400 text-black font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-yellow-300 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  >
                    Submit Encrypted Message
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. ADRESS, MAP & CONTACT NUMBERS PANEL */}
      <section className="py-20 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Interactive maps & Address (7 columns) */}
            <motion.div 
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.15 }}
              className="lg:col-span-7 relative"
            >
              <div className="relative rounded-[2rem] overflow-hidden p-2 bg-slate-900 border border-slate-800 shadow-2xl h-[450px]">
                <iframe
                  src="https://www.google.com/maps?q=Road+No.+14,+Papi+Reddy+Nagar,+Hyderabad&output=embed"
                  width="100%"
                  height="100%"
                  className="border-0 opacity-80 hover:opacity-100 transition-all duration-700 rounded-[1.8rem]"
                  loading="lazy"
                  title="Spoorthi's Location Map"
                />
                <div className="absolute bottom-5 left-5 bg-slate-950/90 backdrop-blur-md text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-800 shadow-lg pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
                  <span>Spoorthi's school campus</span>
                </div>
              </div>
            </motion.div>

            {/* Direct Channels (5 columns) */}
            <motion.div 
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.15 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-2xl">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Physical Address</span>
                <p className="font-bold text-white text-base mt-1">School Campus</p>
                <p className="text-slate-400 text-sm leading-relaxed mt-2 font-semibold">
                  Road No. 14, Papi Reddy Nagar, Papi Reddy Colony, Kamalaprasad Nagar, Hyderabad, Telangana 500037
                </p>
              </div>

              <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Direct Telephone Desk</span>
                  <p className="font-bold text-white text-base mt-1">Helpline Desk</p>
                  <a href="tel:+919381377301" className="text-yellow-400 text-lg font-black mt-1 block">+91 93813 77301</a>
                </div>
                <span className="text-3xl">📞</span>
              </div>

              <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Social Connections</span>
                  <p className="font-bold text-white text-base mt-1">Join the community</p>
                  <div className="flex gap-4 mt-3">
                    <a href="#" className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-yellow-400 hover:text-black transition font-bold text-sm">f</a>
                    <a href="#" className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-yellow-400 hover:text-black transition font-bold text-xs">ig</a>
                    <a href="#" className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-yellow-400 hover:text-black transition font-bold text-xs">yt</a>
                    <a href="https://wa.me/919381377301" target="_blank" className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-yellow-400 hover:text-black transition font-bold text-xs">wa</a>
                  </div>
                </div>
                <span className="text-3xl">🌐</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. FAQs ACCORDION ACCENT */}
      <section className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-black px-5 py-2 uppercase tracking-[0.4em] rounded-full mb-6">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              General Queries
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: false, amount: 0.15 }}
                className="bg-slate-900/20 border border-slate-900 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center font-bold text-sm md:text-base text-white hover:bg-slate-900/40 transition"
                >
                  <span>{faq.q}</span>
                  <span className="text-yellow-400 text-xl font-bold ml-4">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-400 text-xs md:text-sm leading-relaxed border-t border-slate-900/60 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
