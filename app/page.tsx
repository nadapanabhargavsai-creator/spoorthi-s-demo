"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-white text-black">
      
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/hero.jpg" className="w-full h-full object-cover" alt="Spoorthi's School" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <span className="inline-block bg-yellow-500 text-black text-[10px] font-black px-4 py-1.5 uppercase tracking-[0.3em] mb-6 rounded-full">
              ⭐ 4.8 Rating · Since 2020
            </span>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.95] tracking-tighter mb-8">
              Where Young <br />
              Minds <span className="text-yellow-500">Bloom</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed font-medium">
              Hyderabad's trusted institution nurturing children from Nursery to 7th Grade through ethical, social, and activity-based learning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              {/* PRIMARY — Apply for Admission */}
              <Link
                href="/admissions"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-black uppercase text-[11px] tracking-widest bg-yellow-400 text-black shadow-[0_0_30px_rgba(234,179,8,0.45)] hover:shadow-[0_0_45px_rgba(234,179,8,0.7)] hover:scale-[1.04] active:scale-95 transition-all duration-300"
              >
                {/* shimmer sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                {/* pencil icon */}
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
                Apply for Admission
                {/* animated arrow */}
                <span className="inline-block translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </Link>

              {/* SECONDARY — Discover Our Story */}
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-black uppercase text-[11px] tracking-widest border-2 border-white/70 text-white backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black hover:border-white hover:scale-[1.04] active:scale-95 transition-all duration-300"
              >
                {/* book icon */}
                <svg className="w-4 h-4 shrink-0 opacity-80" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Discover Our Story
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs font-bold tracking-widest animate-bounce">
          SCROLL ↓
        </div>
      </section>

      {/* ========== KEY STATS BAR ========== */}
      <section className="bg-black text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "500+", label: "Happy Students" },
            { num: "25+", label: "Expert Teachers" },
            { num: "9", label: "Grade Levels" },
            { num: "4.8★", label: "Google Rating" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl md:text-5xl font-black text-yellow-500 mb-2">{stat.num}</p>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== WELCOME / ABOUT INTRO ========== */}
      <section className="py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-yellow-400" />
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-yellow-600">
                Welcome to Spoorthi's
              </p>
            </div>

            {/* headline */}
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-[1.05]">
              Building Tomorrow's <br />
              <span className="text-yellow-500">Leaders</span> Today.
            </h2>

            {/* body copy — Hyderabad specific, no LGBTQ */}
            <p className="text-gray-600 leading-relaxed text-[15px] mb-4">
              Rooted in the heart of <span className="font-bold text-gray-900">Papi Reddy Nagar, Hyderabad</span>, Spoorthi's The Duckling has been shaping bright young minds since 2020. We offer a nurturing, values-driven environment for children from <span className="font-bold text-gray-900">Nursery through 7th Grade</span> — aligned with the <span className="font-bold text-gray-900">Telangana State Board</span> and enriched with activity-based, modern pedagogy.
            </p>
            <p className="text-gray-600 leading-relaxed text-[15px] mb-8">
              Led by passionate women educators, our school blends ethical upbringing, strong academics, and joyful learning — because we believe a child who loves school grows into a leader who loves life.
            </p>

            {/* info pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: "📍", text: "Papi Reddy Nagar, Hyderabad" },
                { icon: "📅", text: "Est. 2020" },
                { icon: "🏫", text: "Telangana State Board" },
                { icon: "👩‍🏫", text: "Women-Led School" },
              ].map((pill) => (
                <span
                  key={pill.text}
                  className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-gray-800 text-[11px] font-semibold px-3.5 py-1.5 rounded-full"
                >
                  <span>{pill.icon}</span> {pill.text}
                </span>
              ))}
            </div>

            {/* CTA button — same style as hero */}
            <Link
              href="/about"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-black uppercase text-[11px] tracking-widest bg-black text-white shadow-lg hover:shadow-[0_0_30px_rgba(0,0,0,0.25)] hover:scale-[1.04] active:scale-95 transition-all duration-300"
            >
              {/* shimmer sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              {/* book icon */}
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Read Our Full Story
              <span className="inline-block translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </Link>
          </motion.div>

          {/* RIGHT — Quick-stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-5"
          >
            {[
              { icon: "⭐", value: "4.8", label: "Google Rating", bg: "bg-yellow-400", text: "text-black" },
              { icon: "🎓", value: "500+", label: "Happy Graduates", bg: "bg-black", text: "text-white" },
              { icon: "👩‍🏫", value: "20+", label: "Expert Teachers", bg: "bg-black", text: "text-white" },
              { icon: "🏆", value: "5+", label: "Awards Won", bg: "bg-yellow-400", text: "text-black" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                viewport={{ once: true }}
                className={`${card.bg} ${card.text} rounded-3xl p-8 flex flex-col justify-between min-h-[160px] shadow-xl hover:-translate-y-1 transition-transform duration-300`}
              >
                <span className="text-3xl">{card.icon}</span>
                <div>
                  <p className="text-4xl font-black leading-none">{card.value}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${card.bg === "bg-yellow-400" ? "text-black/60" : "text-white/60"}`}>
                    {card.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>


      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fefce8 0%, #fff7ed 40%, #fef3c7 70%, #fffbeb 100%)" }}>
        {/* Soft decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-40 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #fde68a, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #c7d2fe, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #fbcfe8, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block bg-yellow-500/20 border border-yellow-500/50 text-yellow-700 text-[10px] font-black px-5 py-2 uppercase tracking-[0.4em] rounded-full mb-6">
              Why Us
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 mb-6">
              The Spoorthi's <span className="text-yellow-500">Difference</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
              Six pillars that set us apart — where every child is seen, heard, and celebrated.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Holistic Curriculum",
                desc: "A perfect balance of academics, arts, sports and ethics designed for every stage of learning.",
                detail: "Our curriculum integrates Telugu & English literacy, STEM exploration, music, drawing, yoga, and moral science — ensuring no child's talent goes undiscovered.",
                badge: "Academics + Arts + Sports",
                accent: "#f59e0b"
              },
              {
                icon: "👩‍🏫",
                title: "Expert Faculty",
                desc: "Passionate, qualified teachers dedicated to nurturing each child's unique potential.",
                detail: "Our 20+ educators hold B.Ed & specialised certifications. Low student-to-teacher ratios ensure every child gets focused, personalised attention every day.",
                badge: "20+ Certified Teachers",
                accent: "#6366f1"
              },
              {
                icon: "🏆",
                title: "Proven Excellence",
                desc: "4.8 star Google rating with glowing testimonials from hundreds of trust-filled parents.",
                detail: "Since 2020, we've celebrated 500+ happy graduates. Our consistent 4.8★ Google rating reflects real parent satisfaction and measurable child development.",
                badge: "4.8★ · 500+ Graduates",
                accent: "#10b981"
              },
              {
                icon: "🤝",
                title: "Parent Engagement",
                desc: "We believe parents are partners — open communication and involvement are at our core.",
                detail: "Regular PTMs, WhatsApp updates, monthly progress reports, and open-door visits ensure parents are always in the loop and part of their child's growth journey.",
                badge: "PTMs · Daily Updates",
                accent: "#ec4899"
              },
              {
                icon: "🎨",
                title: "Activity-Based Learning",
                desc: "Engaging, hands-on activities that make learning fun, memorable and effective.",
                detail: "From science experiments and storytelling theatres to art fairs and sports days — learning at Spoorthi's is never confined to textbooks alone.",
                badge: "Learn by Doing",
                accent: "#f97316"
              },
              {
                icon: "🛡️",
                title: "Safe & Secure Campus",
                desc: "CCTV monitored, trained staff, and strict safety protocols to protect what matters most.",
                detail: "24/7 CCTV surveillance, verified staff background checks, secure entry gates, and a fully trained medical first-aid team — your child's safety is our top priority.",
                badge: "CCTV · Verified Staff · 24/7",
                accent: "#3b82f6"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative rounded-3xl p-8 cursor-default overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500"
                style={{
                  border: `1px solid ${item.accent}25`,
                }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{ background: `radial-gradient(circle at top left, ${item.accent}12, transparent 60%)` }}
                />
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl" style={{ background: `linear-gradient(to right, ${item.accent}, transparent)` }} />

                <div className="relative z-10">
                  {/* Icon bubble */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                    style={{ background: `${item.accent}18` }}
                  >
                    {item.icon}
                  </div>

                  {/* Badge */}
                  <span
                    className="inline-block text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4"
                    style={{ background: `${item.accent}15`, color: item.accent, border: `1px solid ${item.accent}35` }}
                  >
                    {item.badge}
                  </span>

                  <h3 className="text-xl font-black uppercase text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{item.desc}</p>

                  {/* Divider */}
                  <div className="h-px mb-5" style={{ background: `${item.accent}25` }} />

                  {/* Detail */}
                  <p className="text-gray-500 text-xs leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ACADEMICS OVERVIEW ========== */}
      <section className="py-28 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
          >
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-yellow-600 mb-4">Academics</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Our Learning Journey</h2>
            </div>
            <Link href="/programs" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-500 hover:text-yellow-600 transition group">
              View All Programs
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                level: "Foundation",
                stages: "Nursery · LKG · UKG · 1st Grade",
                grades: "Nursery – 1st Grade",
                desc: "Building strong foundations through play-based learning, phonics, and social development.",
                highlights: ["Phonics & Early Reading", "Number Sense & Counting", "Art & Creative Play", "Social Skills & Sharing", "Hindi & Telugu Basics"],
                color: "#f59e0b",
                bg: "#fff9eb",
                emoji: "🌱",
                students: "Age 3–6"
              },
              {
                level: "Primary",
                stages: "2nd · 3rd · 4th Grade",
                grades: "2nd – 4th Grade",
                desc: "Structured academics with focus on literacy, numeracy, science, and creative expression.",
                highlights: ["English & Telugu Grammar", "Maths Problem Solving", "Environmental Science", "Drawing & Crafts", "Sports & Yoga"],
                color: "#6366f1",
                bg: "#f0f0ff",
                emoji: "📚",
                students: "Age 7–9"
              },
              {
                level: "Middle",
                stages: "5th · 6th · 7th Grade",
                grades: "5th – 7th Grade",
                desc: "Advanced curriculum preparing students for higher education with critical thinking skills.",
                highlights: ["Advanced Mathematics", "Science & Experiments", "Social Studies & Geography", "Critical Thinking Projects", "Leadership & Public Speaking"],
                color: "#10b981",
                bg: "#ebfaf3",
                emoji: "🚀",
                students: "Age 10–13"
              },
            ].map((prog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Card top — coloured banner */}
                <div className="relative p-8 pb-10" style={{ background: prog.bg }}>
                  {/* Big emoji watermark */}
                  <span className="absolute -right-4 -top-4 text-9xl opacity-10 select-none pointer-events-none">{prog.emoji}</span>

                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="text-3xl"
                    >{prog.emoji}</span>
                    <span
                      className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
                      style={{ background: `${prog.color}20`, color: prog.color }}
                    >
                      {prog.students}
                    </span>
                  </div>

                  <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: prog.color }}>{prog.stages}</p>
                  <h3 className="text-3xl font-black uppercase mb-3" style={{ color: "#111" }}>{prog.level}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{prog.desc}</p>
                </div>

                {/* Card bottom — highlights + CTA */}
                <div className="bg-white px-8 py-7 border-t" style={{ borderColor: `${prog.color}30` }}>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-4">What We Cover</p>
                  <ul className="space-y-2 mb-7">
                    {prog.highlights.map((h, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${prog.color}20` }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1 4l2 2 4-4" stroke={prog.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all duration-300"
                    style={{ color: prog.color }}
                  >
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-28 px-6" style={{ background: "linear-gradient(180deg, #fffbeb 0%, #ffffff 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-yellow-100 border border-yellow-300 text-yellow-700 text-[10px] font-black px-5 py-2 uppercase tracking-[0.4em] rounded-full mb-6">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Parents Love Spoorthi's</h2>
            <div className="flex items-center justify-center gap-1.5">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
              <span className="ml-2 text-gray-600 text-sm font-bold">4.8 · 100+ Reviews on Google</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Marampelly Mounika",
                initials: "MM",
                avatar: "/avatar_mounika.png",
                timeAgo: "2 months ago",
                text: "Children become very curious to learn with all the activities. My child developed such good speaking skills. The teachers are so patient and caring — I couldn't be happier!",
                rating: 5
              },
              {
                name: "Yaseen MD",
                initials: "YM",
                avatar: "/avatar_yaseen.png",
                timeAgo: "4 months ago",
                text: "Great place for children to learn ethical, social, and entertainment skills. Highly recommended. The holistic approach to education here is truly commendable.",
                rating: 5
              },
              {
                name: "Saritha Match",
                initials: "SM",
                avatar: "/avatar_saritha.png",
                timeAgo: "6 months ago",
                text: "Great place for children. Perfect balance of good education and entertainment for young minds. My daughter loves going to school every single day!",
                rating: 5
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-400 overflow-hidden border border-gray-100"
              >
                {/* Google card header */}
                <div className="px-6 pt-6 pb-4">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      {/* Profile picture */}
                      <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-gray-100 shrink-0">
                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-gray-400 text-[11px]">{t.timeAgo}</p>
                      </div>
                    </div>
                    {/* Google G logo */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>

                  {/* Star rating */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <svg key={s} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 text-sm leading-relaxed">"{t.text}"</p>
                </div>

                {/* Bottom verified strip */}
                <div className="px-6 py-3 border-t border-gray-100 flex items-center gap-2 bg-gray-50/70">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Verified Google Review</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Read More on Google — styled CTA box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-14 relative overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            }}
          >
            {/* Background orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 blur-2xl" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-10 py-10">
              <div className="flex items-center gap-5">
                {/* Big Google logo */}
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-black text-lg md:text-xl leading-tight">We're rated 4.8★ on Google</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                    <span className="ml-1 text-gray-400 text-xs">Based on 100+ parent reviews</span>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/Spoorthi's+The+Duckling+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-[1.04] active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.35)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] shrink-0"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                Read All Reviews on Google
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== ADMISSIONS CTA ========== */}
      <section
        className="py-32 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fefce8 0%, #fff7ed 40%, #fef3c7 70%, #fffbeb 100%)" }}
      >
        {/* Soft decorative blobs */}
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full opacity-40 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #fde68a, transparent 70%)" }} />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #c7d2fe, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #fbcfe8, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-yellow-400/25 border border-yellow-500/50 text-yellow-700 text-[10px] font-black px-5 py-2 uppercase tracking-[0.4em] rounded-full">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              Admissions Open · 2025–26
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95] text-gray-900">
              Give Your Child <br />
              The <span className="text-yellow-500">Best Start</span>.
            </h2>
          </motion.div>

          {/* Subtext + seat counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-5 leading-relaxed">
              Limited seats available for the 2025–2026 academic year. Book your campus visit today and see why families choose Spoorthi's.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/80 border border-gray-200 rounded-full px-5 py-2 shadow-sm">
              <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span className="text-gray-600 text-[11px] font-bold uppercase tracking-wider">Seats filling fast — enrol before they're gone</span>
            </div>
          </motion.div>

          {/* Action cards row */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {/* — Apply Online card — */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
            >
              {/* Yellow glow bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-yellow-300 to-amber-400" />
              {/* Shimmer */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

              <Link href="/admissions" className="relative z-10 flex flex-col p-10 h-full min-h-[220px]">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-black/15 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-black/60 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Step 1 · Online</p>
                  <h3 className="text-2xl font-black uppercase text-black mb-3 leading-tight">Apply for<br />Admission</h3>
                  <p className="text-black/70 text-sm leading-relaxed">Fill out our quick online form. Takes less than 5 minutes — we'll confirm your spot within 24 hours.</p>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <span className="text-black font-black text-xs uppercase tracking-widest">Apply Now</span>
                  <span className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                    <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* — Call Us card — */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 60%, #0f1f40 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Inner orbs */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-30 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }} />
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" style={{ background: "radial-gradient(circle at top left, rgba(99,102,241,0.2), transparent 60%)" }} />
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl" style={{ background: "linear-gradient(to right, #6366f1, #ec4899, transparent)" }} />

              <a href="tel:+919381377301" className="relative z-10 flex flex-col p-10 h-full min-h-[220px]">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)" }}>
                  <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Step 2 · Direct</p>
                  <h3 className="text-2xl font-black uppercase text-white mb-3 leading-tight">Talk to<br />Our Team</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Have questions? Our admissions team is ready Mon–Sat, 8 AM–4 PM. Call us and we'll guide you through.</p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <p className="text-indigo-400 font-black text-lg leading-none">+91 93813 77301</p>
                    <p className="text-gray-600 text-[10px] mt-0.5 uppercase tracking-wider">Mon–Sat · 8 AM–4 PM</p>
                  </div>
                  <span className="w-9 h-9 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300" style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)" }}>
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========== QUICK CONTACT ========== */}
      <section className="py-28 px-6 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        {/* Subtle Background Decorative Shapes */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-yellow-200/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-6 bg-yellow-500" />
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-yellow-600">Visit Us</p>
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 leading-tight">
                  Come Say <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-900 to-yellow-600">Hello</span>
                </h2>
              </motion.div>
              
              <div className="space-y-6">
                {/* Card 1: Address */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                  className="group flex gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-yellow-200 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0 group-hover:bg-yellow-500 group-hover:text-white text-yellow-600 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-1">Our Location</h4>
                    <p className="font-bold text-gray-800 text-sm mb-1">Address</p>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">
                      Road No. 14, Papi Reddy Nagar, Papi Reddy Colony, Kamalaprasad Nagar, Hyderabad, Telangana 500037
                    </p>
                  </div>
                </motion.div>

                {/* Card 2: Phone */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                  className="group flex gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-yellow-200 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0 group-hover:bg-yellow-500 group-hover:text-white text-yellow-600 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-1">Let's Talk</h4>
                    <p className="font-bold text-gray-800 text-sm mb-1">Phone Number</p>
                    <a 
                      href="tel:+919381377301" 
                      className="text-lg font-black text-black hover:text-yellow-600 transition-colors"
                    >
                      +91 93813 77301
                    </a>
                  </div>
                </motion.div>

                {/* Card 3: Hours */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                  className="group flex gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-yellow-200 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0 group-hover:bg-yellow-500 group-hover:text-white text-yellow-600 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-1">Timing</h4>
                    <p className="font-bold text-gray-800 text-sm mb-1">Working Hours</p>
                    <p className="text-gray-600 text-sm leading-relaxed font-semibold">
                      Monday – Saturday <span className="text-gray-400">·</span> 8:00 AM to 4:00 PM
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link 
                  href="/contact" 
                  className="group relative inline-flex items-center gap-3 mt-10 bg-black text-white px-8 py-4 font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-yellow-500 hover:text-black transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                  Get In Touch 
                  <span className="inline-block translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Interactive Map Wrapper */}
            <div className="lg:col-span-7 h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative rounded-[2rem] overflow-hidden p-2.5 bg-white border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] transition-shadow duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-xl pointer-events-none" style={{ background: "radial-gradient(circle, #eab308, transparent 70%)" }} />
                
                <div className="relative rounded-[1.5rem] overflow-hidden h-[450px]">
                  <iframe
                    src="https://www.google.com/maps?q=Road+No.+14,+Papi+Reddy+Nagar,+Hyderabad&output=embed"
                    width="100%"
                    height="100%"
                    className="border-0 grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                    title="Spoorthi's Location Map"
                  />
                  <div className="absolute bottom-5 left-5 bg-black/85 backdrop-blur-md text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 border border-white/10 shadow-lg pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
                    <span>Spoorthi's school campus</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== FLOATING WHATSAPP ========== */}
      <a 
        href="https://wa.me/919381377301" 
        target="_blank"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </main>
  );
}
