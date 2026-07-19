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
    color: "from-blue-600 to-indigo-700"
  },
  {
    name: "Admissions Desk",
    role: "Enquiries, Registration & Campus Tours",
    email: "admissions@spoorthis.edu.in",
    phone: "+91 93813 77301 (Ext 102)",
    timing: "Mon – Sat: 8:30 AM – 3:30 PM",
    contactPerson: "Mrs. Mounika Marampelly",
    icon: "📝",
    color: "from-sky-500 to-blue-600"
  },
  {
    name: "General Office",
    role: "Certificates, Documentation & General Help",
    email: "office@spoorthis.edu.in",
    phone: "+91 93813 77301 (Ext 100)",
    timing: "Mon – Sat: 8:00 AM – 4:00 PM",
    contactPerson: "Administration Head",
    icon: "🏢",
    color: "from-teal-500 to-emerald-600"
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

// Reusable animation variants configured for bidirectional scroll triggering
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

export default function Contact() {
  const [activeDept, setActiveDept] = useState<number>(0);
  
  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
        setFormName("");
        setFormEmail("");
        setFormPhone("");
        setFormSubject("");
        setFormMessage("");
      }, 3000);
    }, 1500);
  };

  return (
    <main className="bg-[#F8FBFF] text-slate-700 min-h-screen overflow-x-hidden pt-24 font-sans relative">
      
      {/* BACKGROUND DECORATIVE BLOBS */}
      <div className="absolute top-10 right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[120px] bg-gradient-to-tr from-[#1E88E5] to-[#FFC857] pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-[-15%] w-[500px] h-[500px] rounded-full opacity-[0.08] blur-[100px] bg-gradient-to-tr from-[#0F4C81] to-purple-400 pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full opacity-[0.08] blur-[100px] bg-gradient-to-tr from-[#1E88E5] to-teal-300 pointer-events-none -z-10" />

      {/* 1. HERO SECTION */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/banner.jpg" 
            alt="School Exterior Banner" 
            className="w-full h-full object-cover filter brightness-[0.22] scale-105 transition-transform duration-[10s]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#F8FBFF]" />
        </div>

        {/* Curved Divider at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[#F8FBFF]"></path>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 mb-6 text-slate-300 text-xs font-semibold uppercase tracking-wider print:hidden">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>·</span>
            <span className="text-[#FFC857] font-bold">Contact</span>
          </div>

          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-[#FFC857] text-[#0F4C81] text-[10px] font-black px-5 py-2 uppercase tracking-[0.4em] rounded-full mb-6 shadow-sm shadow-[#FFC857]/20"
          >
            Connect With Us
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black uppercase leading-[0.95] tracking-tighter mb-6 font-sans text-white"
          >
            Get In <span className="text-[#FFC857] drop-shadow-sm">Touch</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-xl text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            We are always here to help you. Reach out to our dedicated departments, send a direct query, or visit our Hyderabad campus.
          </motion.p>

          <div className="mt-8 flex justify-center gap-4 print:hidden">
            <a 
              href="#contact-desk" 
              className="px-7 py-3 bg-[#0F4C81] hover:bg-[#1E88E5] text-white font-bold uppercase text-[10px] tracking-widest rounded-full transition duration-300 shadow-md hover:scale-105"
            >
              Departments
            </a>
            <a 
              href="#contact-form" 
              className="px-7 py-3 bg-white text-[#0F4C81] hover:bg-slate-100 font-bold uppercase text-[10px] tracking-widest rounded-full transition duration-300 shadow-md hover:scale-105"
            >
              Send Message
            </a>
          </div>
        </div>
      </section>

      {/* 2. SPATIAL UI INTERACTIVE DEPARTMENTS DESK & FORM */}
      <section id="contact-desk" className="py-16 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
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
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1E88E5]">Interactive Hub</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase text-[#0F4C81] mt-2">Department Contact Desk</h2>
                <p className="text-slate-500 text-sm mt-3 max-w-lg leading-relaxed">
                  Select a department to view detailed spatial contact points, direct support personnel, and response timings.
                </p>
              </div>

              {/* Spatial Selector Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 bg-white p-2.5 rounded-3xl border border-slate-100 shadow-sm shadow-[#0f4c81]/5">
                {departments.map((dept, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDept(idx)}
                    className={`flex flex-col items-center justify-center p-5 rounded-2xl transition-all duration-500 relative overflow-hidden group ${
                      activeDept === idx 
                        ? "text-white shadow-md shadow-[#0f4c81]/15 scale-[1.04]" 
                        : "text-slate-400 hover:text-slate-800 hover:bg-slate-50/50"
                    }`}
                  >
                    {activeDept === idx ? (
                      <motion.div 
                        layoutId="activeGlow" 
                        className="absolute inset-0 bg-gradient-to-br from-[#0F4C81] to-[#1E88E5] -z-10"
                      />
                    ) : (
                      <div className="absolute inset-0 border border-transparent group-hover:border-slate-100 rounded-2xl transition-all duration-300" />
                    )}
                    <span className="text-3xl mb-2.5 transform group-hover:scale-110 transition-transform duration-300">{dept.icon}</span>
                    <span className="text-[9px] font-black uppercase text-center tracking-widest leading-tight">
                      {dept.name.split(" ")[0]}
                    </span>
                    {activeDept === idx && (
                      <span className="absolute bottom-1 w-5 h-1 bg-[#FFC857] rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Spatial Detail Screen Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDept}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-md shadow-[#0f4c81]/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-[#0F4C81] to-[#1E88E5]" />
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <span className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${departments[activeDept].color} flex items-center justify-center text-3xl shadow-md text-white`}>
                        {departments[activeDept].icon}
                      </span>
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#1E88E5]">Active Department</span>
                        <h3 className="text-2xl font-black uppercase text-[#0F4C81] mt-1">{departments[activeDept].name}</h3>
                        <p className="text-slate-400 text-xs mt-0.5 font-semibold">{departments[activeDept].role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="space-y-5">
                      <div className="bg-[#F8FBFF] p-4 rounded-xl border border-slate-100/50 hover:shadow-sm transition">
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Contact Officer</h4>
                        <p className="text-sm font-bold text-slate-800 mt-1">{departments[activeDept].contactPerson}</p>
                      </div>
                      <div className="bg-[#F8FBFF] p-4 rounded-xl border border-slate-100/50 hover:shadow-sm transition">
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Office Hour Timings</h4>
                        <p className="text-sm font-semibold text-slate-600 mt-1">{departments[activeDept].timing}</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="bg-[#F8FBFF] p-4 rounded-xl border border-slate-100/50 hover:shadow-sm transition">
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Direct Email</h4>
                        <a 
                          href={`mailto:${departments[activeDept].email}`}
                          className="text-sm font-black text-[#1E88E5] hover:text-[#0F4C81] hover:underline mt-1 block"
                        >
                          {departments[activeDept].email}
                        </a>
                      </div>
                      <div className="bg-[#F8FBFF] p-4 rounded-xl border border-slate-100/50 hover:shadow-sm transition">
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Helpline / Extension</h4>
                        <a 
                          href="tel:+919381377301"
                          className="text-sm font-black text-slate-800 hover:text-[#1E88E5] transition mt-1 block"
                        >
                          {departments[activeDept].phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* EMERGENCY CONTACTS BAY */}
              <div className="bg-red-50/50 border border-red-100 rounded-[2rem] p-8 shadow-sm">
                <div className="flex items-center gap-3.5 mb-6">
                  <span className="text-3xl filter drop-shadow-sm">🚨</span>
                  <div>
                    <h3 className="text-lg font-black uppercase text-[#0F4C81] tracking-wider">Emergency Hotlines (24/7)</h3>
                    <p className="text-[10px] font-semibold text-red-500 uppercase tracking-widest mt-0.5">Immediate Assistance Contacts</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                  <div className="p-5 bg-white rounded-2xl border border-red-100/60 shadow-sm hover:shadow-md transition">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Campus Security Desk</p>
                    <p className="text-base font-black text-slate-800 mt-1.5">+91 93813 77301 (Ext 911)</p>
                  </div>
                  <div className="p-5 bg-white rounded-2xl border border-red-100/60 shadow-sm hover:shadow-md transition">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">On-Campus Health Nurse</p>
                    <p className="text-base font-black text-slate-800 mt-1.5">+91 93813 77301 (Ext 103)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* HIGH-TECH CONTACT FORM (Right 5 Columns) */}
            <motion.div 
              id="contact-form"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.15 }}
              className="lg:col-span-5 bg-white border border-slate-100 rounded-[2.2rem] p-8 shadow-lg shadow-[#0f4c81]/5 relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[4px] bg-gradient-to-r from-transparent via-[#FFC857] to-transparent rounded-full" />
              
              <h3 className="text-2xl font-black uppercase text-[#0F4C81] mb-2 font-sans">Direct Message</h3>
              <p className="text-slate-400 text-xs mb-8 leading-relaxed font-semibold">
                Fill the secure console below to transmit your message instantly to our administration desk.
              </p>

              {formSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-24 text-center"
                >
                  <span className="text-6xl mb-4 block">✉️</span>
                  <h4 className="text-xl font-black text-[#0F4C81] mb-1">Message Transmitted!</h4>
                  <p className="text-slate-400 text-xs font-semibold">We will respond back via email within 24 operational hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative group">
                    <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5 group-focus-within:text-[#1E88E5] transition">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Anand Sharma"
                      className="w-full bg-[#F8FBFF] border border-slate-200/60 rounded-xl px-4.5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1E88E5] focus:bg-white focus:ring-4 focus:ring-[#1E88E5]/5 transition duration-300"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="anand@example.com"
                        className="w-full bg-[#F8FBFF] border border-slate-200/60 rounded-xl px-4.5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1E88E5] focus:bg-white focus:ring-4 focus:ring-[#1E88E5]/5 transition duration-300"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+91 90000 12345"
                        className="w-full bg-[#F8FBFF] border border-slate-200/60 rounded-xl px-4.5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1E88E5] focus:bg-white focus:ring-4 focus:ring-[#1E88E5]/5 transition duration-300"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Subject</label>
                    <input 
                      type="text" 
                      required 
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      placeholder="e.g. Admission Query for Grade 5"
                      className="w-full bg-[#F8FBFF] border border-slate-200/60 rounded-xl px-4.5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1E88E5] focus:bg-white focus:ring-4 focus:ring-[#1E88E5]/5 transition duration-300"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Detailed Message</label>
                    <textarea 
                      rows={4}
                      required 
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Type your queries or messages..."
                      className="w-full bg-[#F8FBFF] border border-slate-200/60 rounded-xl px-4.5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1E88E5] focus:bg-white focus:ring-4 focus:ring-[#1E88E5]/5 transition duration-300 resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full mt-4 px-6 py-4 bg-[#0F4C81] hover:bg-[#1E88E5] text-white font-black uppercase text-[11px] tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md shadow-[#0f4c81]/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {formLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Encrypted Message</span>
                        <span className="font-bold">→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. CAMPUS SECTION & SOCIAL CONNECTIONS */}
      <section className="py-20 border-t border-slate-100/80 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Google Map (7 columns) */}
            <motion.div 
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.15 }}
              className="lg:col-span-7 relative"
            >
              <div className="relative rounded-[2rem] overflow-hidden p-2 bg-[#F8FBFF] border border-slate-200/60 shadow-md h-[450px]">
                <iframe
                  src="https://www.google.com/maps?q=Road+No.+14,+Papi+Reddy+Nagar,+Hyderabad&output=embed"
                  width="100%"
                  height="100%"
                  className="border-0 opacity-90 hover:opacity-100 transition-all duration-700 rounded-[1.8rem]"
                  loading="lazy"
                  title="Spoorthi's Location Map"
                />
                <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-100 shadow-md pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-[#1E88E5] animate-ping" />
                  <span className="font-bold">Spoorthi's school campus</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Campus Information Cards (5 columns) */}
            <motion.div 
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.15 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="p-6 bg-[#F8FBFF] border border-slate-100 rounded-2xl hover:shadow-sm transition">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Physical Address</span>
                <p className="font-bold text-[#0F4C81] text-base mt-1.5">School Campus</p>
                <p className="text-slate-500 text-sm leading-relaxed mt-2 font-semibold">
                  Road No. 14, Papi Reddy Nagar, Papi Reddy Colony, Kamalaprasad Nagar, Hyderabad, Telangana 500037
                </p>
              </div>

              <div className="p-6 bg-[#F8FBFF] border border-slate-100 rounded-2xl flex items-center justify-between hover:shadow-sm transition">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Direct Telephone Desk</span>
                  <p className="font-bold text-[#0F4C81] text-base mt-1.5">Helpline Desk</p>
                  <a href="tel:+919381377301" className="text-[#1E88E5] hover:text-[#0F4C81] text-lg font-black mt-1 block">+91 93813 77301</a>
                </div>
                <span className="text-3xl select-none filter drop-shadow-sm">📞</span>
              </div>

              {/* SOCIAL CONNECTIONS */}
              <div className="p-6 bg-[#F8FBFF] border border-slate-100 rounded-2xl flex items-center justify-between hover:shadow-sm transition">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Social Connections</span>
                  <p className="font-bold text-[#0F4C81] text-base mt-1.5">Join the community</p>
                  <div className="flex gap-4 mt-4">
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-[#0F4C81]/5 text-[#0F4C81] rounded-full flex items-center justify-center hover:bg-[#0F4C81] hover:text-white transition-all duration-300 font-black text-sm hover:scale-110"
                    >
                      f
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-[#0F4C81]/5 text-[#0F4C81] rounded-full flex items-center justify-center hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300 font-bold text-xs hover:scale-110"
                    >
                      ig
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-[#0F4C81]/5 text-[#0F4C81] rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 font-bold text-xs hover:scale-110"
                    >
                      yt
                    </a>
                    <a 
                      href="https://wa.me/919381377301" 
                      target="_blank" 
                      className="w-10 h-10 bg-[#0F4C81]/5 text-[#0F4C81] rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 font-bold text-xs hover:scale-110"
                    >
                      wa
                    </a>
                  </div>
                </div>
                <span className="text-3xl select-none filter drop-shadow-sm">🌐</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. FAQs ACCORDION ACCENT */}
      <section className="py-24 border-t border-slate-100/80 bg-[#F8FBFF]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#0F4C81]/5 border border-[#0F4C81]/10 text-[#0F4C81] text-[10px] font-black px-5 py-2 uppercase tracking-[0.4em] rounded-full mb-6">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#0F4C81] font-sans">
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
                className={`bg-white border rounded-2xl overflow-hidden transition-colors duration-300 ${
                  openFaq === idx ? "border-[#1E88E5]" : "border-slate-200/50"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center font-bold text-sm md:text-base text-slate-800 hover:bg-slate-50/50 transition"
                >
                  <span className={openFaq === idx ? "text-[#0F4C81]" : "text-slate-800"}>{faq.q}</span>
                  <span className="text-[#1E88E5] text-xl font-bold ml-4">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-500 text-xs md:text-sm leading-relaxed border-t border-slate-100 pt-4">
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
