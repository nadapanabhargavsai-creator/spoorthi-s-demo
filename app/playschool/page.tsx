"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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

const scaleUp = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.3, ease }
  }
};

const whyUsCards = [
  { title: "Safe Environment", desc: "Childproof rooms, soft carpets, rounded edges and certified non-toxic play gear.", icon: "🛡️", bg: "bg-pink-50 border-pink-100", accent: "text-pink-500" },
  { title: "Qualified Teachers", desc: "Montessori-trained pre-primary educators offering warmth, care, and attention.", icon: "👩‍🏫", bg: "bg-sky-50 border-sky-100", accent: "text-sky-500" },
  { title: "Activity Based Learning", desc: "Curated kits, sensory sand tables, building blocks, and hands-on experiments.", icon: "🧩", bg: "bg-amber-50 border-amber-100", accent: "text-amber-500" },
  { title: "CCTV Security", desc: "24/7 camera monitoring with strictly controlled access protocols across campus.", icon: "📹", bg: "bg-emerald-50 border-emerald-100", accent: "text-emerald-500" },
  { title: "Indoor & Outdoor Play", desc: "Colorful ball pools, soft sliders, mini swing clusters and safe turf lawns.", icon: "🎈", bg: "bg-purple-50 border-purple-100", accent: "text-purple-500" },
  { title: "Smart Learning", desc: "Visual storytelling monitors, soundboards, and kids-friendly learning panels.", icon: "📺", bg: "bg-rose-50 border-rose-100", accent: "text-rose-500" }
];

const programs = [
  { id: "pg", name: "Play Group", age: "1.5 – 2.5 Years", desc: "Exploring sensory elements, basic verbal milestones, social habits, and cooperative play.", icon: "👶", bg: "from-pink-400 to-rose-400" },
  { id: "ns", name: "Nursery", age: "2.5 – 3.5 Years", desc: "Early literacy, fine-motor coordination, basic numbers, tracing shapes, and theme-drawing.", icon: "🌱", bg: "from-amber-400 to-orange-400" },
  { id: "lkg", name: "LKG", age: "3.5 – 4.5 Years", desc: "Phonics, cursive patterns, numerical logic, environmental stories, art, and music basics.", icon: "📚", bg: "from-sky-400 to-blue-400" },
  { id: "ukg", name: "UKG", age: "4.5 – 5.5 Years", desc: "Pre-primary maths, vocabulary enhancement, reading sentences, and full readiness for primary school.", icon: "🚀", bg: "from-emerald-400 to-teal-400" }
];

const stats = [
  { label: "Happy Students", value: "250+", icon: "🧒", color: "text-pink-500 bg-pink-50" },
  { label: "Certified Teachers", value: "15+", icon: "👩‍🏫", color: "text-sky-500 bg-sky-50" },
  { label: "Active Branches", value: "3", icon: "🏫", color: "text-amber-500 bg-amber-50" },
  { label: "Years of Excellence", value: "6+", icon: "⭐", color: "text-emerald-500 bg-emerald-50" }
];

const testimonials = [
  { name: "Meera Nair", role: "Mother of Arav (Nursery)", quote: "The amount of care teachers show at Little Blossoms is heartwarming. Arav's vocabulary and sharing habits have improved tremendously." },
  { name: "Ramesh Rao", role: "Father of Diya (LKG)", quote: "Very safe, colorful, and joyful environment. The activity-based syllabus makes kids actually love going to school every day." },
  { name: "Pranati Reddy", role: "Mother of Sid (Play Group)", quote: "Perfect preschool for sensory and social development. Highly recommend their clean playrooms and smart classrooms." }
];

export default function PlaySchoolHome() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [visitName, setVisitName] = useState("");
  const [visitPhone, setVisitPhone] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [visitConfirmed, setVisitConfirmed] = useState(false);
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const handleBookVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitConfirmed(true);
    setTimeout(() => {
      setVisitConfirmed(false);
      setVisitModalOpen(false);
      setVisitName("");
      setVisitPhone("");
      setVisitDate("");
    }, 2500);
  };

  return (
    <main className="bg-[#F8FBFF] overflow-x-hidden pt-20">
      
      {/* 1. LARGE HERO BANNER */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/school1.jpg" 
            alt="Happy children playing in preschool" 
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FBFF] via-transparent to-black/30" />
        </div>
        
        {/* Floating Shapes */}
        <div className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-pink-400/20 blur-sm animate-bounce" />
        <div className="absolute bottom-1/4 right-10 w-20 h-20 rounded-full bg-yellow-400/20 blur-sm animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-sky-400/20 blur-sm" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-slate-800">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-xs font-black px-5 py-2 uppercase tracking-widest rounded-full mb-6"
          >
            Welcome to Little Blossoms
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black uppercase text-white leading-tight tracking-tight mb-6"
          >
            Learning Through <span className="text-yellow-300">Fun</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-xl text-slate-200 max-w-2xl mx-auto font-medium mb-10 leading-relaxed"
          >
            A premium, safe, and warm preschool space where your child's curiosity blossoms into brilliant foundations. estd. under Spoorthi's Academy.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/playschool/apply"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black uppercase text-xs tracking-widest rounded-full shadow-lg hover:shadow-pink-500/30 hover:scale-105 transition-all duration-300"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setVisitModalOpen(true)}
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black uppercase text-xs tracking-widest rounded-full shadow-lg hover:scale-105 transition-all duration-300"
            >
              Book School Visit
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT PREVIEW */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="relative rounded-3xl overflow-hidden shadow-xl h-[420px]"
          >
            <img src="/about.jpg" className="w-full h-full object-cover" alt="Kids learning activities" />
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent" />
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl flex items-center gap-3 border shadow-md">
              <span className="text-3xl">🌸</span>
              <div>
                <p className="font-black text-sm text-slate-900 leading-none">Nurturing Hearts</p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Est. under Spoorthi's Academy</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="space-y-6"
          >
            <span className="inline-block bg-sky-50 border border-sky-100 text-sky-600 text-[10px] font-black px-4 py-1.5 uppercase tracking-widest rounded-full">
              About Little Blossoms
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-slate-900 tracking-tight leading-[1.05]">
              Nurturing Playful <span className="text-pink-500">Minds</span> Early
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              Little Blossoms Play School is a premier child development space providing values-driven, activity-based Montessori training. Built around a kids-centric environment, we guide students through sensory, motor, and intellectual milestones.
            </p>
            <p className="text-slate-500 text-xs leading-relaxed font-medium">
              Led by veteran pre-primary educators, we ensure your child experiences absolute care, building logical logic, speech confidence, and sharing behavior naturally.
            </p>
            
            <div className="pt-4">
              <Link
                href="/playschool/about"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-pink-500 hover:text-pink-600 transition"
              >
                Read More About Us <span>→</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. WHY CHOOSE LITTLE BLOSSOMS */}
      <section className="py-24 px-6 bg-[#F8FBFF] relative overflow-hidden">
        {/* Colorful soft circle assets */}
        <div className="absolute top-10 right-[-10%] w-[350px] h-[350px] rounded-full opacity-20 blur-3xl bg-pink-300 pointer-events-none" />
        <div className="absolute bottom-10 left-[-10%] w-[300px] h-[300px] rounded-full opacity-25 blur-3xl bg-sky-200 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-100 border border-amber-300 text-amber-700 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full mb-6">
              Our Key Highlights
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-slate-900 tracking-tight">
              Why Choose <span className="text-sky-500">Little Blossoms</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-xs mt-3 leading-relaxed">
              Discover six pillars of our pre-primary school that ensure a safe, fun, and progressive learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUsCards.map((card, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`p-8 rounded-3xl border shadow-sm hover:shadow-md bg-white transition-all duration-300 ${card.bg}`}
              >
                <span className="text-4xl block mb-4 filter drop-shadow-sm select-none">{card.icon}</span>
                <h3 className="text-lg font-black uppercase text-slate-900 mb-2">{card.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROGRAMS PREVIEW */}
      <section className="py-24 px-6 bg-white border-t border-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Preschool Programs</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-slate-900 tracking-tight mt-2">Classroom Programs</h2>
            </div>
            <Link 
              href="/playschool/programs" 
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-pink-500 transition"
            >
              View Full Syllabus <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {programs.map((prog, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group cursor-pointer rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between bg-white h-full"
              >
                <div className={`p-6 bg-gradient-to-br ${prog.bg} text-white relative overflow-hidden`}>
                  <span className="absolute -right-4 -top-4 text-7xl opacity-20 select-none">{prog.icon}</span>
                  <span className="text-3xl block mb-2">{prog.icon}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full">{prog.age}</span>
                  <h3 className="text-xl font-black uppercase mt-3">{prog.name}</h3>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">{prog.desc}</p>
                  <Link 
                    href="/playschool/programs" 
                    className="text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-pink-500 transition block pt-2"
                  >
                    Learn Outcomes <span>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ANIMATED STATISTICS */}
      <section className="py-16 bg-slate-900 text-white border-y border-sky-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              transition={{ delay: i * 0.08 }}
              className="text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-2xl bg-white/10 shadow-inner">
                {stat.icon}
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-yellow-400">{stat.value}</p>
                <p className="text-[9px] font-bold tracking-wider uppercase text-slate-400 mt-1">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS CAROUSEL */}
      <section className="py-24 px-6 bg-[#F8FBFF]">
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full mb-6">
            Parent Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 mb-12">
            Why Parents Love Us
          </h2>

          <div className="bg-white border rounded-3xl p-8 md:p-12 shadow-sm min-h-[220px] flex flex-col justify-between relative overflow-hidden">
            <span className="absolute left-6 top-6 text-7xl text-slate-100/70 select-none">“</span>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <p className="text-slate-600 text-sm md:text-base leading-relaxed italic font-semibold">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <h4 className="font-black text-slate-900 mt-6 text-sm uppercase leading-none">{testimonials[activeTestimonial].name}</h4>
                <p className="text-slate-400 text-[10px] uppercase font-bold mt-1.5">{testimonials[activeTestimonial].role}</p>
              </motion.div>
            </AnimatePresence>

            {/* Selector dots */}
            <div className="flex justify-center gap-2.5 mt-8 relative z-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeTestimonial === i ? "bg-pink-500 scale-125" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. EVENTS PREVIEW */}
      <section className="py-24 px-6 bg-white border-t border-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Calendar Highlights</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-slate-900 tracking-tight mt-2">Upcoming Events</h2>
            </div>
            <Link 
              href="/playschool/events" 
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-pink-500 transition"
            >
              See All Events <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Drawing Competition", date: "July 28, 2026", desc: "Creative coloring and sketch event for nursery and play group kids.", icon: "🎨" },
              { title: "Fancy Dress Show", date: "August 14, 2026", desc: "Independence day special fancy dress and patriotic recitation program.", icon: "👗" },
              { title: "Parents Teacher Meeting", date: "September 05, 2026", desc: "PTM discussion session regarding child progress updates.", icon: "🤝" }
            ].map((ev, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#F8FBFF] border border-slate-100 rounded-3xl p-6 flex items-start gap-4 hover:shadow-sm transition"
              >
                <span className="text-3xl select-none">{ev.icon}</span>
                <div>
                  <span className="text-[9px] font-black uppercase text-sky-500 tracking-wider block">{ev.date}</span>
                  <h3 className="text-base font-black text-slate-900 mt-1 uppercase leading-tight">{ev.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mt-2 font-semibold">{ev.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER */}
      <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl bg-pink-400" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl bg-sky-400" />
        
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white">Subscribe to Newsletter</h2>
          <p className="text-slate-400 text-xs max-w-sm mx-auto font-medium">
            Stay updated with curriculum changes, activities, events and admission slots directly in your inbox.
          </p>
          
          {emailSubscribed ? (
            <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl py-3.5 px-6 font-bold text-xs uppercase tracking-wider">
              🎉 Thank you for subscribing!
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setEmailSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-3 mt-4"
            >
              <input
                type="email"
                required
                placeholder="Parent's email address..."
                className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black uppercase text-[10px] tracking-widest px-6 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* MODAL: BOOK SCHOOL VISIT */}
      <AnimatePresence>
        {visitModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl p-8 relative"
            >
              <button
                onClick={() => setVisitModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-lg font-black transition-colors"
              >
                ✕
              </button>
              
              <h3 className="text-2xl font-black uppercase text-slate-900 mb-2">Preschool Tour</h3>
              <p className="text-slate-500 text-xs mb-6 font-semibold leading-relaxed">
                Schedule a guided visit of Little Blossoms Play School. Fill the details below.
              </p>
              
              {visitConfirmed ? (
                <div className="py-10 text-center">
                  <span className="text-5xl block mb-3">🎉</span>
                  <h4 className="text-lg font-black text-slate-900 uppercase">Visit Booked!</h4>
                  <p className="text-slate-500 text-xs mt-1">Our coordinator will call you to confirm timings.</p>
                </div>
              ) : (
                <form onSubmit={handleBookVisitSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Parent's Name</label>
                    <input 
                      type="text" 
                      required 
                      value={visitName}
                      onChange={(e) => setVisitName(e.target.value)}
                      placeholder="e.g. Meera Nair"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={visitPhone}
                      onChange={(e) => setVisitPhone(e.target.value)}
                      placeholder="e.g. +91 9381377301"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Preferred Date</label>
                    <input 
                      type="date" 
                      required 
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-pink-500 transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 px-6 py-4 bg-slate-900 text-white font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-pink-500 transition duration-300"
                  >
                    Submit Visit Request
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
