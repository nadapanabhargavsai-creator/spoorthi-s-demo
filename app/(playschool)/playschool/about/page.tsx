"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PlayschoolAbout() {
  const values = [
    { title: "Child Centricity", desc: "Every child is unique and learns at their own pace.", icon: "🌱", color: "bg-pink-50 border-pink-200" },
    { title: "Safe & Secure", desc: "Highest guard guidelines, child-proofing, and CCTV access.", icon: "🛡️", color: "bg-sky-50 border-sky-200" },
    { title: "Integrity", desc: "Teaching moral habits, sharing, gratitude, and ethics early.", icon: "🤝", color: "bg-yellow-50 border-yellow-200" },
    { title: "Fun & Play", desc: "Fostering learning by playing, coloring, and crafting.", icon: "🎨", color: "bg-emerald-50 border-emerald-200" },
  ];

  const dailySchedule = [
    { time: "09:00 - 09:30 AM", activity: "Circle Time & Morning Prayers", icon: "☀️", desc: "Singing nursery rhymes, checking attendance with smiles, and morning exercises." },
    { time: "09:30 - 10:15 AM", activity: "Sensory & Motor Learning", icon: "🧩", desc: "Montessori sorting kits, clay modeling, block-building to develop fine motor coordination." },
    { time: "10:15 - 10:45 AM", activity: "Snack Break (Healthy Habits)", icon: "🥛", desc: "Fostering independent eating habits, washing hands, and sharing manners." },
    { time: "10:45 - 11:30 AM", activity: "Academic Fun (Alphabets & Phonics)", icon: "✏️", desc: "Story-telling, tracing shapes, singing phonetic sounds, and counting games." },
    { time: "11:30 - 12:15 PM", activity: "Indoor & Outdoor Play Time", icon: "🎠", desc: "Soft gym play, tunnel crawlers, sliding, swing sets, and sandpit exploration." },
    { time: "12:15 - 12:30 PM", activity: "Goodbye Circle & Reflection", icon: "👋", desc: "Recap of the day's achievements, collecting craft worksheets, and orderly dispersal." },
  ];

  return (
    <div className="w-full font-['Quicksand'] pb-20">
      
      {/* ========== HERO BANNER ========== */}
      <section className="bg-gradient-to-r from-pink-100 via-sky-100 to-yellow-100 py-16 px-6 text-center border-b-8 border-dashed border-sky-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 DISCOVER US</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            About Little Blossoms
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Building happy foundations for tomorrow's leaders since 2020.
          </p>
        </div>
      </section>

      {/* ========== SCHOOL HISTORY, MISSION, VISION ========== */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800 mb-6">Our Journey & Roots</h2>
          <p className="text-gray-600 leading-relaxed font-semibold mb-4">
            Little Blossoms Play School was founded in 2020 under the Spoorthi's Academy franchise. Seeing a critical need for an early education space that prioritizes both premium creative development and high-end security, we established our first branch in Gachibowli.
          </p>
          <p className="text-gray-600 leading-relaxed font-semibold mb-8">
            Today, across three beautiful campuses in Hyderabad, we nurture over 350+ children daily, combining the international Play-Way method with traditional values of moral care.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-sky-50 rounded-3xl border-2 border-sky-100">
              <h3 className="font-['Fredoka'] font-black text-sky-700 text-lg mb-2">🚀 Our Mission</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                To create a safe, vibrant, and loving space that sparks children's curiosities, encouraging early discovery, social habits, and phonetic skills.
              </p>
            </div>
            <div className="p-6 bg-pink-50 rounded-3xl border-2 border-pink-100">
              <h3 className="font-['Fredoka'] font-black text-pink-700 text-lg mb-2">👁️ Our Vision</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                To be Hyderabad's benchmark preschool, where early learning is a joyful adventure, paving smooth entries into premium primary educations.
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-[3rem] overflow-hidden border-8 border-yellow-300 shadow-xl rotate-3">
            <img src="/about.jpg" alt="Children playing with building blocks" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-4 left-4 bg-white border-2 border-dashed border-sky-400 p-4.5 rounded-full text-3xl shadow-md rotate-12">
            🎨🧩
          </div>
        </div>
      </section>

      {/* ========== PRINCIPAL'S MESSAGE ========== */}
      <section className="bg-gradient-to-r from-yellow-50 via-sky-50 to-pink-50 py-20 px-6 border-y-8 border-dashed border-sky-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Photo */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-[2.5rem] border-4 border-yellow-300 shadow-md lg:col-span-1">
            <div className="w-40 h-40 rounded-full bg-pink-100 border-4 border-pink-200 overflow-hidden mb-4 flex items-center justify-center text-6xl">
              👩‍🏫
            </div>
            <h3 className="font-['Fredoka'] font-black text-slate-800 text-lg">Mrs. Mounika Reddy</h3>
            <p className="text-xs font-black text-pink-500 uppercase tracking-widest mt-1">Founder Principal</p>
            <p className="text-[10px] text-gray-400 font-bold mt-2">M.Ed. in Child Psychology, 12+ Yrs Experience</p>
          </div>

          {/* Message */}
          <div className="lg:col-span-2 text-left">
            <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 WELCOME NOTE</span>
            <h2 className="text-2xl sm:text-3xl font-['Fredoka'] font-black text-slate-800 mb-6">
              From the Principal's Desk
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              <p>
                "Dear Parents, I welcome you and your precious child to the Little Blossoms family. The early childhood years (ages 1.5 to 5.5) are the most critical developmental phase in a person's life. During this period, the brain forms connections faster than at any other time."
              </p>
              <p>
                "At Little Blossoms, we do not believe in rote memorization or early stress. Instead, we structure learning inside games, colors, and sensory plays. Our curriculum fosters curiosity. More importantly, we treat safety and emotional well-being as our highest command guidelines."
              </p>
              <p>
                "We look forward to partnering with you during this beautiful adventure of discovery and bloom!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TEACHING PHILOSOPHY & METHODOLOGY ========== */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <span className="text-sky-600 text-xs font-black uppercase tracking-widest block mb-3">🧠 METHODOLOGY</span>
        <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800 mb-6">How We Teach</h2>
        <p className="text-gray-500 font-semibold max-w-2xl mx-auto mb-14 text-sm sm:text-base leading-relaxed">
          Our pedagogy integrates the best of <strong>Montessori</strong> (independent choice and sensory tools) and the <strong>Play-Way method</strong> (learning themes wrapped in play-like projects).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border-2 border-slate-100 rounded-3xl shadow-xs text-left hover:shadow-md transition">
            <div className="text-4xl mb-4">🧩</div>
            <h3 className="font-['Fredoka'] font-black text-slate-800 text-lg mb-3">Montessori Material</h3>
            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
              Wooden puzzles, shape sorting blocks, counting beads, and sensory trays to let children learn through touch, weight, and visual comparisons.
            </p>
          </div>
          <div className="p-8 bg-white border-2 border-slate-100 rounded-3xl shadow-xs text-left hover:shadow-md transition">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="font-['Fredoka'] font-black text-slate-800 text-lg mb-3">Phonetics & Language</h3>
            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
              Singing letter sounds, storytelling, and puppet shows that build early language adaptation, verbal expressions, and pronunciation.
            </p>
          </div>
          <div className="p-8 bg-white border-2 border-slate-100 rounded-3xl shadow-xs text-left hover:shadow-md transition">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="font-['Fredoka'] font-black text-slate-800 text-lg mb-3">Creative Expression</h3>
            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
              Finger painting, clay models, paper folding, and basic drawing that unleash creative expression and build strong fine-motor skills.
            </p>
          </div>
        </div>
      </section>

      {/* ========== VALUES AND DIALS ========== */}
      <section className="bg-gradient-to-r from-sky-50 to-pink-50 py-20 px-6 border-t-8 border-dashed border-sky-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-3">❤️ CORE VALUES</span>
          <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800 mb-14">Our Guiding Values</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6.5">
            {values.map((val) => (
              <div key={val.title} className={`p-8 bg-white border-4 ${val.color} rounded-3xl text-left shadow-xs hover:shadow-md transition`}>
                <div className="text-4xl mb-4">{val.icon}</div>
                <h3 className="font-['Fredoka'] font-black text-slate-800 text-lg mb-2">{val.title}</h3>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DAILY ACTIVITY TIMELINE ========== */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-yellow-600 text-xs font-black uppercase tracking-widest block mb-3">🕒 TIME TABLE</span>
          <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800">A Day in Little Blossoms</h2>
          <p className="text-gray-500 font-semibold mt-3 text-sm">Our daily routine balances academic curiosity with healthy rest and dynamic plays.</p>
        </div>

        <div className="relative border-l-4 border-dashed border-sky-300 pl-6 space-y-10 py-2">
          {dailySchedule.map((sched, idx) => (
            <div key={idx} className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
              {/* Timeline marker */}
              <div className="absolute top-6 -left-[38px] w-6 h-6 rounded-full bg-sky-400 border-4 border-white flex items-center justify-center shadow-xs" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                <span className="inline-block bg-sky-100 text-sky-700 font-black text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  {sched.time}
                </span>
                <span className="text-2xl hidden sm:inline">{sched.icon}</span>
              </div>
              <h3 className="font-['Fredoka'] font-black text-slate-800 text-lg mb-1.5 flex items-center gap-2">
                <span className="sm:hidden">{sched.icon}</span>
                {sched.activity}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold leading-relaxed">{sched.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CALL TO ACTION ========== */}
      <section className="bg-gradient-to-r from-pink-400 to-orange-400 text-white rounded-[2.5rem] p-10 sm:p-14 max-w-5xl mx-auto mx-6 text-center shadow-lg relative overflow-hidden">
        <h2 className="text-3xl font-['Fredoka'] font-black mb-4">Ready to Bloom with Us?</h2>
        <p className="max-w-xl mx-auto font-semibold mb-8 leading-relaxed text-pink-50">
          Admissions are now open for the academic term. Secure your child's seat in Hyderabad's premier play school.
        </p>
        <div className="flex flex-wrap justify-center gap-4.5">
          <Link
            href="/playschool/apply"
            className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide shadow-md transition"
          >
            Online Admission Form
          </Link>
          <Link
            href="/playschool/admissions"
            className="bg-pink-600 hover:bg-pink-700 text-white border-2 border-pink-300 px-8 py-4 rounded-full font-black text-sm uppercase tracking-wide shadow-md transition"
          >
            Admission Procedures & Fees
          </Link>
        </div>
      </section>

    </div>
  );
}
