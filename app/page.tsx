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

      {/* ========== WELCOME MESSAGE ========== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-yellow-600 mb-6">
            Welcome to Spoorthi's
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
            Building Tomorrow's <br />
            <span className="text-yellow-500">Leaders</span> Today.
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-medium mb-10 max-w-3xl mx-auto">
            At Spoorthi's The Duckling, we believe every child holds infinite potential. Through our thoughtfully designed curriculum from Nursery to 7th Grade, we nurture curiosity, character, and confidence in a warm, women-led, LGBTQ+ friendly environment.
          </p>
          <Link 
            href="/about" 
            className="inline-block bg-black text-white px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-yellow-500 hover:text-black transition-all"
          >
            Read Our Full Story →
          </Link>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-yellow-600 mb-4">Why Us</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">The Spoorthi's Difference</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🎯", title: "Holistic Curriculum", desc: "A perfect balance of academics, arts, sports and ethics designed for every stage of learning." },
              { icon: "👩‍🏫", title: "Expert Faculty", desc: "Passionate, qualified teachers dedicated to nurturing each child's unique potential." },
              { icon: "🏆", title: "Proven Excellence", desc: "4.8 star Google rating with glowing testimonials from parents who trust us with their children." },
              { icon: "🌈", title: "Inclusive Environment", desc: "Women-owned and LGBTQ+ friendly space where every family feels welcomed and respected." },
              { icon: "🎨", title: "Activity-Based Learning", desc: "Engaging, hands-on activities that make learning fun, memorable and effective." },
              { icon: "🛡️", title: "Safe & Secure Campus", desc: "CCTV monitored, trained staff, and strict safety protocols to protect what matters most." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-black uppercase mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ACADEMICS OVERVIEW ========== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-yellow-600 mb-4">Academics</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Our Learning Journey</h2>
            </div>
            <Link href="/programs" className="text-sm font-black uppercase tracking-widest hover:text-yellow-600 transition">
              View All Programs →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { level: "Foundation", grades: "Nursery – 1st Grade", desc: "Building strong foundations through play-based learning, phonics, and social development." },
              { level: "Primary", grades: "2nd – 4th Grade", desc: "Structured academics with focus on literacy, numeracy, science, and creative expression." },
              { level: "Middle", grades: "5th – 7th Grade", desc: "Advanced curriculum preparing students for higher education with critical thinking skills." },
            ].map((prog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="bg-black text-white p-10 rounded-3xl hover:bg-yellow-500 hover:text-black transition-all duration-500 h-full">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">{prog.grades}</p>
                  <h3 className="text-3xl font-black uppercase mb-6">{prog.level}</h3>
                  <p className="opacity-80 leading-relaxed mb-8">{prog.desc}</p>
                  <span className="text-xs font-black uppercase tracking-widest border-b-2 border-current pb-1">Learn More →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-24 px-6 bg-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-yellow-600 mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Parents Love Spoorthi's</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Marampelly Mounika", text: "Children become very curious to learn with all the activities. My child developed such good speaking skills." },
              { name: "Yaseen MD", text: "Great place for children to learn ethical, social, and entertainment skills. Highly recommended." },
              { name: "Saritha Match", text: "Great place for children. Perfect balance of good education and entertainment for young minds." },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="text-yellow-500 text-xl mb-4">★★★★★</div>
                <p className="text-gray-700 italic leading-relaxed mb-6">"{t.text}"</p>
                <p className="font-black uppercase text-xs tracking-widest">— {t.name}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://www.google.com/maps" 
              target="_blank" 
              className="inline-block text-sm font-black uppercase tracking-widest text-yellow-600 hover:text-black transition"
            >
              Read More Reviews on Google →
            </a>
          </div>
        </div>
      </section>

      {/* ========== ADMISSIONS CTA ========== */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-yellow-500 mb-6">Admissions Open 2025-26</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
            Give Your Child <br />
            The <span className="text-yellow-500">Best Start</span>.
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Limited seats available for the 2025-2026 academic year. Book your campus visit today and see why families choose Spoorthi's.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admissions" 
              className="bg-yellow-500 text-black px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-white transition-all"
            >
              Apply Online →
            </Link>
            <a 
              href="tel:+919381377301" 
              className="border-2 border-white text-white px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all"
            >
              📞 Call Us
            </a>
          </div>
        </div>
      </section>

      {/* ========== QUICK CONTACT ========== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-yellow-600 mb-4">Visit Us</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">Come Say Hello</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-yellow-500 text-2xl font-black">📍</div>
                <div>
                  <p className="font-black uppercase text-xs mb-1">Address</p>
                  <p className="text-gray-600">Road No. 14, Papi Reddy Nagar, Papi Reddy Colony, Kamalaprasad Nagar, Hyderabad, Telangana 500037</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-yellow-500 text-2xl font-black">📞</div>
                <div>
                  <p className="font-black uppercase text-xs mb-1">Phone</p>
                  <a href="tel:+919381377301" className="text-xl font-black hover:text-yellow-600">+91 93813 77301</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-yellow-500 text-2xl font-black">🕐</div>
                <div>
                  <p className="font-black uppercase text-xs mb-1">Hours</p>
                  <p className="text-gray-600">Monday – Saturday · 8:00 AM to 4:00 PM</p>
                </div>
              </div>
            </div>

            <Link 
              href="/contact" 
              className="inline-block mt-10 bg-black text-white px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-yellow-500 hover:text-black transition-all"
            >
              Get In Touch →
            </Link>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps?q=Road+No.+14,+Papi+Reddy+Nagar,+Hyderabad&output=embed"
              width="100%"
              height="450"
              className="border-0"
            />
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
