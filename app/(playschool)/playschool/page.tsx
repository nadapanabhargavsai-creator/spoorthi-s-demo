"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePlayschoolDb } from "./context/PlayschoolDb";

// Decorator shapes for backgrounds
const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      animate={{ y: [0, -20, 0], rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-12 left-10 w-16 h-16 rounded-full bg-pink-200/50"
    />
    <motion.div
      animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/3 right-12 w-24 h-24 rounded-full bg-yellow-200/50"
    />
    <motion.div
      animate={{ x: [0, -25, 0], rotate: -360 }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-20 left-1/4 w-20 h-20 bg-sky-200/50 rounded-lg"
    />
    <motion.div
      animate={{ y: [0, -15, 0], scale: [1, 0.9, 1] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-2/3 left-8 w-12 h-12 bg-emerald-200/50 rounded-full"
    />
  </div>
);

export default function PlayschoolHome() {
  const { notices, addNotice } = usePlayschoolDb();
  
  // Statistics States
  const [stats, setStats] = useState({ kids: 0, staff: 0, branches: 0, years: 0 });

  useEffect(() => {
    // Run simple increment stats animation on mount
    const duration = 1200;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setStats({
        kids: Math.min(Math.floor((350 / steps) * currentStep), 350),
        staff: Math.min(Math.floor((45 / steps) * currentStep), 45),
        branches: Math.min(Math.floor((3 / steps) * currentStep), 3),
        years: Math.min(Math.floor((6 / steps) * currentStep), 6),
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  // Testimonials state
  const testimonials = [
    { name: "Meghana K.", role: "Mother of Saanvi (Nursery)", quote: "The warm atmosphere and caring teachers at Little Blossoms made Saanvi's transition so smooth. She looks forward to going to school every single day!", avatar: "🌸" },
    { name: "Ramesh Kumar", role: "Father of Aarav (Play Group)", quote: "I love that they focus on activity-based sensory learning. Aarav has developed amazing social skills and loves singing the rhymes he learns here.", avatar: "🦁" },
    { name: "Dr. Shalini Reddy", role: "Mother of Riya (UKG)", quote: "The secure campus and CCTV camera access give us complete peace of mind. The curriculum is perfectly structured to prepare kids for primary school.", avatar: "🦄" },
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ state
  const faqs = [
    { q: "What are the school timings?", a: "For Play Group and Nursery, timings are 9:00 AM to 12:30 PM. For LKG and UKG, timings are 9:00 AM to 1:30 PM, Monday to Friday." },
    { q: "Do you offer safe school transportation?", a: "Yes! We operate secure, GPS-enabled school vans with trained female attendants to transport children safely across Hyderabad neighborhoods." },
    { q: "How secure is the campus?", a: "We maintain 100% security with card-tap entry, compound walls, vigilant guards, and CCTV cameras in every classroom that parents can stream securely." },
  ];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const chooseUs = [
    { title: "Safe Environment", desc: "Child-proof classes, secure check-in, and alert staff ensure total safety.", color: "bg-pink-100 text-pink-700 border-pink-200", icon: "🛡️" },
    { title: "Qualified Teachers", desc: "Trained, affectionate nursery educators who specialize in early learning development.", color: "bg-sky-100 text-sky-700 border-sky-200", icon: "👩‍🏫" },
    { title: "Activity Learning", desc: "Montessori tools, sensory kits, sand pits, and craft activities to stimulate brains.", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: "🧩" },
    { title: "CCTV Security", desc: "Secure live feeds of classrooms for authenticated parent monitoring.", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: "📹" },
    { title: "Indoor & Outdoor Play", desc: "Safe play gyms, soft tunnels, slides, and sensory garden pathways.", color: "bg-orange-100 text-orange-700 border-orange-200", icon: "🎠" },
    { title: "Smart Learning", desc: "Digital audio-visual interactive panels to explain colors, phonics, and shapes.", color: "bg-purple-100 text-purple-700 border-purple-200", icon: "💡" },
  ];

  const programs = [
    { name: "Play Group", age: "1.5 - 2.5 Years", color: "border-pink-300 hover:bg-pink-50/30 bg-white", desc: "Focuses on sensory motor skills, primary color recognition, rhyme recitation, and social adaptation.", btnColor: "bg-pink-500", link: "/playschool/programs#playgroup", icon: "🎨" },
    { name: "Nursery", age: "2.5 - 3.5 Years", color: "border-sky-300 hover:bg-sky-50/30 bg-white", desc: "Introduces alphabet tracing, basic vocabulary, phonetics, sorting shapes, and independence training.", btnColor: "bg-sky-500", link: "/playschool/programs#nursery", icon: "✏️" },
    { name: "LKG", age: "3.5 - 4.5 Years", color: "border-yellow-300 hover:bg-yellow-50/30 bg-white", desc: "Encompasses reading basic letters, double-digit counting, drawing shapes, story-telling and group games.", btnColor: "bg-yellow-500", link: "/playschool/programs#lkg", icon: "📚" },
    { name: "UKG", age: "4.5 - 5.5 Years", color: "border-emerald-300 hover:bg-emerald-50/30 bg-white", desc: "Extends into sight words, writing sentences, addition/subtraction, environmental studies, and primary school readiness.", btnColor: "bg-emerald-500", link: "/playschool/programs#ukg", icon: "🎒" },
  ];

  return (
    <div className="relative overflow-hidden w-full font-['Quicksand'] pb-12">
      
      {/* ========== HERO BANNER ========== */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-sky-100 via-pink-50 to-yellow-50 overflow-hidden py-16 px-6 border-b-8 border-dashed border-pink-200">
        <FloatingShapes />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <span className="inline-block bg-pink-500 text-white text-xs font-black px-4.5 py-2 uppercase tracking-widest mb-6 rounded-full shadow-md animate-bounce">
              ⭐ Best Preschool Telangana
            </span>
            
            <h1 className="text-4xl sm:text-6xl font-['Fredoka'] font-black leading-tight mb-6 bg-gradient-to-r from-sky-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Learning <br />
              Through <span className="underline decoration-yellow-400 decoration-8 font-extrabold text-pink-500">Fun!</span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-lg leading-relaxed font-bold">
              Welcome to <span className="text-sky-600">Little Blossoms Play School</span>, where every child blooms at their own pace in a loving, warm, and highly secure environment!
            </p>
            
            <div className="flex flex-wrap gap-4.5">
              <Link
                href="/playschool/apply"
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Apply Now 🌸
              </Link>
              <Link
                href="/playschool/contact"
                className="bg-white border-4 border-sky-400 hover:bg-sky-50 text-sky-600 px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide shadow-md hover:shadow-lg transition-all"
              >
                Book Visit 🏫
              </Link>
            </div>
          </motion.div>

          {/* Hero Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Playful circular frames */}
            <div className="absolute inset-0 bg-yellow-300 rounded-[50%_40%_60%_50%] scale-105 animate-pulse opacity-20 rotate-45" />
            <div className="absolute inset-0 bg-pink-300 rounded-[60%_40%_50%_70%] scale-[1.02] opacity-20 -rotate-12" />
            <div className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-[40%_60%_50%_50%] overflow-hidden border-8 border-white shadow-2xl bg-white">
              <img
                src="/program.jpg"
                alt="Happy children learning through play at Little Blossoms"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Float badge */}
            <div className="absolute bottom-4 left-4 bg-yellow-400 text-yellow-950 p-4.5 rounded-3xl font-black text-center shadow-lg border-2 border-white -rotate-6">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-[10px] uppercase font-black tracking-widest mt-0.5">Play-Way Method</p>
            </div>
            <div className="absolute top-4 right-4 bg-sky-400 text-white p-4.5 rounded-full font-black text-center shadow-lg border-2 border-white rotate-12">
              <p className="text-xl">🎨🧸🧩</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========== ABOUT PREVIEW ========== */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-3xl overflow-hidden border-8 border-emerald-300 shadow-xl rotate-3">
            <img src="/school1.jpg" alt="About Little Blossoms" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-4 -left-4 bg-pink-100 border-4 border-dashed border-pink-300 p-4.5 rounded-2xl text-pink-700 text-3xl shadow-md rotate-12">
            🧸
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-emerald-600 text-xs font-black uppercase tracking-widest block mb-3">
            🌸 WHO WE ARE
          </span>
          <h2 className="text-3xl sm:text-4xl font-['Fredoka'] font-black text-slate-800 leading-tight mb-6">
            Nurturing Hearts, <br />
            Inspiring Tiny Minds!
          </h2>
          <p className="text-gray-600 font-semibold mb-6 leading-relaxed">
            Little Blossoms Play School is a specialized early education wing of Spoorthi's Academy. We treat every child as an individual bloom with unique potentials. Our classrooms are colorful laboratories of imagination, designed to foster communication, social skills, and self-confidence.
          </p>
          <div className="grid grid-cols-2 gap-4.5 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">✓</span>
              <span className="font-bold text-sm text-slate-700">Sensory playrooms</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold">✓</span>
              <span className="font-bold text-sm text-slate-700">Social habits training</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold">✓</span>
              <span className="font-bold text-sm text-slate-700">Secure parent cams</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">✓</span>
              <span className="font-bold text-sm text-slate-700">Healthy meals & snacks</span>
            </div>
          </div>
          <Link
            href="/playschool/about"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-black text-xs uppercase tracking-wider px-6.5 py-3 rounded-full shadow-md transition"
          >
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="bg-gradient-to-r from-sky-50 to-pink-50 py-20 px-6 border-y-8 border-dashed border-sky-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-3">
            🌈 WHY CHOOSE US
          </span>
          <h2 className="text-3xl sm:text-4xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Safe, Happy & Creative Spaces
          </h2>
          <p className="text-gray-500 font-semibold max-w-lg mx-auto mb-14 text-sm leading-relaxed">
            We provide high-standard infrastructure, well-researched toddler pedagogy, and a warm team of qualified early educators.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6.5">
            {chooseUs.map((item, idx) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.04, y: -5 }}
                className={`p-8 rounded-3xl border-4 ${item.color} shadow-sm text-left bg-white transition-all`}
              >
                <div className="text-4xl mb-4.5">{item.icon}</div>
                <h3 className="text-lg font-['Fredoka'] font-black mb-3">{item.title}</h3>
                <p className="text-sm font-semibold text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROGRAMS PREVIEW ========== */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <span className="text-yellow-600 text-xs font-black uppercase tracking-widest block mb-3">
          🎓 EARLY YEARS PROGRAM
        </span>
        <h2 className="text-3xl sm:text-4xl font-['Fredoka'] font-black text-slate-800 mb-4">
          Programs Designed for Tiny Learners
        </h2>
        <p className="text-gray-500 font-semibold max-w-lg mx-auto mb-14 text-sm leading-relaxed">
          Curated ages and curriculums that balance active playing with primary academic preparedness.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => (
            <div
              key={prog.name}
              className={`p-7 rounded-[2.5rem] border-4 ${prog.color} flex flex-col text-left shadow-sm transition-all duration-300 hover:shadow-lg`}
            >
              <div className="text-5xl mb-4">{prog.icon}</div>
              <h3 className="text-xl font-['Fredoka'] font-black text-slate-800 mb-1">{prog.name}</h3>
              <span className="inline-block bg-slate-100 text-slate-600 font-black text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 self-start">
                Age: {prog.age}
              </span>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed mb-6 flex-grow">
                {prog.desc}
              </p>
              <Link
                href={prog.link}
                className={`w-full ${prog.btnColor} hover:brightness-110 text-white text-center py-2.5 rounded-2xl text-xs font-black transition`}
              >
                Curriculum Details →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ========== STATISTICS SECTION ========== */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-950 py-16 px-6 font-['Fredoka']">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-black">
          <div className="p-4">
            <p className="text-4xl sm:text-5xl">{stats.kids}+</p>
            <p className="text-xs uppercase tracking-wider mt-2.5 font-['Quicksand'] font-black opacity-80">Students Enrolled</p>
          </div>
          <div className="p-4">
            <p className="text-4xl sm:text-5xl">{stats.staff}+</p>
            <p className="text-xs uppercase tracking-wider mt-2.5 font-['Quicksand'] font-black opacity-80">Qualified Staff</p>
          </div>
          <div className="p-4">
            <p className="text-4xl sm:text-5xl">{stats.branches}</p>
            <p className="text-xs uppercase tracking-wider mt-2.5 font-['Quicksand'] font-black opacity-80">Active Branches</p>
          </div>
          <div className="p-4">
            <p className="text-4xl sm:text-5xl">{stats.years}+</p>
            <p className="text-xs uppercase tracking-wider mt-2.5 font-['Quicksand'] font-black opacity-80">Years of Excellence</p>
          </div>
        </div>
      </section>

      {/* ========== GALLERY PREVIEW & EVENTS ========== */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Gallery Preview */}
        <div>
          <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-3">
            📸 CAMPUS LIFE
          </span>
          <h3 className="text-2xl sm:text-3xl font-['Fredoka'] font-black text-slate-800 mb-6">
            Joyful Moments Captured
          </h3>
          <div className="grid grid-cols-2 gap-3.5 mb-6">
            <div className="h-40 rounded-2xl overflow-hidden shadow-sm hover:scale-[1.02] transition">
              <img src="/school2.jpg" className="w-full h-full object-cover" alt="Kids playing" />
            </div>
            <div className="h-40 rounded-2xl overflow-hidden shadow-sm hover:scale-[1.02] transition">
              <img src="/school3.jpg" className="w-full h-full object-cover" alt="Art activity" />
            </div>
            <div className="h-40 rounded-2xl overflow-hidden shadow-sm hover:scale-[1.02] transition col-span-2">
              <img src="/about.jpg" className="w-full h-full object-cover animate-pulse" alt="Outdoor playground" />
            </div>
          </div>
          <Link
            href="/playschool/gallery"
            className="bg-sky-500 hover:bg-sky-600 text-white font-black text-xs px-6 py-3 rounded-full shadow-sm transition"
          >
            Visit Our Gallery
          </Link>
        </div>

        {/* Right: Notices & Upcoming Events */}
        <div className="bg-emerald-50/50 border-4 border-dashed border-emerald-200 p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <span className="text-emerald-600 text-xs font-black uppercase tracking-widest block mb-3">
              📅 NOTICE BOARD & EVENTS
            </span>
            <h3 className="text-2xl font-['Fredoka'] font-black text-slate-800 mb-6">
              What's Happening?
            </h3>
            
            <div className="space-y-4 mb-8">
              {notices.slice(0, 3).map((notice) => (
                <div key={notice.id} className="bg-white p-4.5 rounded-2xl border border-emerald-100 shadow-xs">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className={`text-[8.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      notice.category === "Urgent" ? "bg-pink-100 text-pink-700" : "bg-sky-100 text-sky-700"
                    }`}>
                      {notice.category}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400">{notice.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 mb-1">{notice.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/playschool/events"
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-center font-black text-xs py-3 rounded-2xl shadow-sm transition w-full block"
          >
            View Event Calendar & Holiday Lists
          </Link>
        </div>
      </section>

      {/* ========== PARENT TESTIMONIALS ========== */}
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-20 px-6 border-y-8 border-dashed border-pink-100">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-3">
            💬 PARENT DIARIES
          </span>
          <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800 mb-10">
            Why Parents Love Little Blossoms
          </h2>

          <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border-4 border-pink-200 shadow-md relative min-h-[260px] flex flex-col justify-between">
            <span className="absolute top-4 left-6 text-6xl text-pink-200 opacity-60 pointer-events-none">“</span>
            
            <p className="text-base sm:text-lg text-gray-600 font-bold italic leading-relaxed mb-8 relative z-10">
              {testimonials[activeTestimonial].quote}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-6 gap-4">
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-11 h-11 bg-pink-100 rounded-full flex items-center justify-center text-2xl border border-pink-200">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800">{testimonials[activeTestimonial].name}</p>
                  <p className="text-xs font-semibold text-gray-400">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>

              {/* Slider Buttons */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3.5 h-3.5 rounded-full transition-all ${
                      idx === activeTestimonial ? "bg-pink-500 w-8" : "bg-pink-200 hover:bg-pink-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ PREVIEW ========== */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-yellow-600 text-xs font-black uppercase tracking-widest block mb-3">
            ❓ QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border-2 border-slate-100 shadow-xs overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-800 hover:text-sky-600 transition"
              >
                <span>{faq.q}</span>
                <span className="text-sky-500 text-xl">{activeFaq === idx ? "−" : "+"}</span>
              </button>
              
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="p-5 pt-0 border-t border-slate-50 text-xs sm:text-sm font-semibold text-gray-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/playschool/faq"
            className="text-sky-500 hover:text-sky-600 font-black text-sm"
          >
            View all preschool FAQs →
          </Link>
        </div>
      </section>

      {/* ========== CONTACT PREVIEW (CTA) ========== */}
      <section className="bg-gradient-to-r from-sky-400 to-emerald-400 text-white rounded-[2.5rem] p-10 sm:p-14 max-w-5xl mx-auto mx-6 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-md" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-lg" />
        
        <h2 className="text-3xl sm:text-4xl font-['Fredoka'] font-black mb-4.5">
          Want to Experience Little Blossoms?
        </h2>
        <p className="max-w-xl mx-auto font-semibold leading-relaxed mb-10 text-sky-50">
          Schedule a personalized campus tour to check out our play equipment, classrooms, secure CCTV system, and interact directly with our teachers.
        </p>

        <div className="flex flex-wrap justify-center gap-4.5">
          <Link
            href="/playschool/contact"
            className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4.5 rounded-full font-black text-sm uppercase tracking-wide shadow-md transition"
          >
            Contact & Schedule Visit 📅
          </Link>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4.5 rounded-full font-black text-sm uppercase tracking-wide border-2 border-emerald-300 flex items-center gap-2 shadow-md transition"
          >
            <span>💬</span> WhatsApp Us
          </a>
        </div>
      </section>

    </div>
  );
}
