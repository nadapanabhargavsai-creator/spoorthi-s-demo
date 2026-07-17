"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="bg-white text-black font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* ========== TOP HEADER (BRANDING) ========== */}
      <nav className="fixed w-full z-[100] bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-black text-white p-2 font-black text-xl rounded-lg">S</div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter leading-none">
                Spoorthis <span className="text-yellow-500">The Duckling</span>
              </h1>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                స్పూర్తిస్ ద దుక్లింగ్ ప్రీ-స్కూల్
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest text-gray-600">
            <a href="#about" className="hover:text-yellow-600">Our Story</a>
            <a href="#curriculum" className="hover:text-yellow-600">Curriculum</a>
            <a href="#campus" className="hover:text-black">Campus</a>
            <a href="#contact" className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-yellow-500 transition-all">Enquire Now</a>
          </div>

          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </nav>

      {/* ========== HERO: THE VISION ========== */}
      <section className="h-[90vh] relative flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img src="/hero.jpg" className="w-full h-full object-cover" alt="Spoorthis School Hyderabad" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span className="bg-yellow-500 text-black text-[10px] font-black px-4 py-1 uppercase tracking-[0.3em] mb-6 inline-block rounded-full">
              4.8 ★ Highly Rated Preschool
            </span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Excellence in <br /> <span className="text-yellow-500">Education</span> & <br /> Entertainment.
            </h1>
            <p className="text-lg md:text-xl font-medium text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Hyderabad's premier early learning destination where children become curious learners through ethical, social, and activity-based programs.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a href="tel:+919381377301" className="bg-white text-black px-10 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-yellow-500 transition-all">
                Call Admissions
              </a>
              <a href="#contact" className="border-2 border-white text-white px-10 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-white hover:text-black transition-all">
                Visit Campus
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== KEY SCHOOL INFO (THE STATS) ========== */}
      <section className="py-20 bg-black text-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <h3 className="text-4xl font-black text-yellow-500">2020</h3>
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mt-2">Established Year</p>
          </div>
          <div>
            <h3 className="text-4xl font-black text-yellow-500">4.8</h3>
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mt-2">Google Rating</p>
          </div>
          <div>
            <h3 className="text-4xl font-black text-yellow-500">08:00 AM</h3>
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mt-2">Opens Daily</p>
          </div>
          <div>
            <h3 className="text-4xl font-black text-yellow-500">100%</h3>
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mt-2">Women Owned</p>
          </div>
        </div>
      </section>

      {/* ========== ABOUT: REAL SCHOOL DETAILS ========== */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
              A Warm, Ethical <br /> & Social Start.
            </h2>
            <div className="space-y-6 text-gray-700 text-lg font-medium">
              <p>
                Located in the heart of <span className="text-black font-bold">Papi Reddy Nagar</span>, Spoorthis The Duckling Pre-school is dedicated to creating curious minds. 
              </p>
              <p>
                We stand out as a <span className="bg-yellow-100 px-1">Women-owned</span> and <span className="bg-yellow-100 px-1">LGBTQ+ friendly</span> institution, ensuring a safe, diverse, and inclusive environment for every family in Hyderabad.
              </p>
              <p>
                Our philosophy balances <span className="italic">Entertainment</span> and <span className="italic">Ethics</span>, so children don't just learn subjects—they learn how to be good citizens.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h4 className="font-black uppercase text-xs">Curiosity Driven</h4>
                <p className="text-gray-500 text-[11px] mt-1">Activity-based learning styles.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h4 className="font-black uppercase text-xs">Speaking Skills</h4>
                <p className="text-gray-500 text-[11px] mt-1">Focused on verbal confidence.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -right-10 bg-yellow-400 w-64 h-64 -z-10 rounded-full blur-3xl opacity-30"></div>
            <img src="/about.jpg" className="w-full h-[550px] object-cover rounded-3xl shadow-2xl" alt="Spoorthis Classroom" />
          </div>
        </div>
      </section>

      {/* ========== CURRICULUM ========== */}
      <section id="curriculum" className="py-32 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-black uppercase text-center mb-20 tracking-tighter">Academic Path</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-xl hover:-translate-y-4 transition-all duration-500">
              <span className="text-4xl mb-6 block">🐣</span>
              <h3 className="text-2xl font-black uppercase mb-4">Nursery</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Early tactile development, sensory play, and basic social introduction through fun activities.</p>
            </div>
            <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border-t-8 border-yellow-500 hover:-translate-y-4 transition-all duration-500">
              <span className="text-4xl mb-6 block">🐥</span>
              <h3 className="text-2xl font-black uppercase mb-4">LKG</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Introduction to mathematical logic, phonetic sounds, and development of fine motor skills.</p>
            </div>
            <div className="bg-white p-12 rounded-[2.5rem] shadow-xl hover:-translate-y-4 transition-all duration-500">
              <span className="text-4xl mb-6 block">🦆</span>
              <h3 className="text-2xl font-black uppercase mb-4">UKG</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Preparation for primary school with advanced speaking skills, ethics, and academic confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== REAL REVIEWS (FROM YOUR LISTING) ========== */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[11px] font-black uppercase tracking-[0.4em] text-yellow-600 mb-4">Parent Feedback</p>
          <h2 className="text-5xl font-black text-center uppercase tracking-tighter mb-20">Voice of Spoorthis Parents</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 shadow-lg border border-gray-100 italic rounded-2xl relative">
              <span className="text-6xl text-gray-100 absolute top-4 left-4 font-serif">“</span>
              <p className="text-gray-800 font-medium relative z-10">"Children become very curious to learn with all this activities... And develop good speaking skills."</p>
              <p className="mt-8 font-black uppercase text-xs not-italic">— Marampelly Mounika</p>
            </div>
            <div className="bg-white p-10 shadow-lg border border-gray-100 italic rounded-2xl relative">
              <span className="text-6xl text-gray-100 absolute top-4 left-4 font-serif">“</span>
              <p className="text-gray-800 font-medium relative z-10">"Great place for ur children to learn ethical, social, learning and entertainment skills."</p>
              <p className="mt-8 font-black uppercase text-xs not-italic">— Yaseen MD</p>
            </div>
            <div className="bg-white p-10 shadow-lg border border-gray-100 italic rounded-2xl relative">
              <span className="text-6xl text-gray-100 absolute top-4 left-4 font-serif">“</span>
              <p className="text-gray-800 font-medium relative z-10">"Great place for children good education and entertainment."</p>
              <p className="mt-8 font-black uppercase text-xs not-italic">— Saritha Match</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CAMPUS BANNER ========== */}
      <section id="campus" className="h-[60vh] relative overflow-hidden flex items-center justify-center">
        <img src="/banner.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Spoorthis Campus" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic">Fun learning space</h2>
        </div>
      </section>

      {/* ========== CONTACT: OFFICIAL DETAILS ========== */}
      <section id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-6xl font-black uppercase tracking-tighter mb-10">Contact <br /> <span className="text-yellow-500">Official</span></h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="text-yellow-500 text-2xl font-black">01.</div>
                <div>
                  <h4 className="font-black uppercase text-xs mb-2">Location</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">Road No. 14, Papi Reddy Nagar, Papi Reddy Colony, Kamalaprasad Nagar, Hyderabad, Telangana 500037</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-yellow-500 text-2xl font-black">02.</div>
                <div>
                  <h4 className="font-black uppercase text-xs mb-2">Direct Phone</h4>
                  <a href="tel:+919381377301" className="text-3xl font-black hover:text-yellow-500 transition-all">+91 93813 77301</a>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-yellow-500 text-2xl font-black">03.</div>
                <div>
                  <h4 className="font-black uppercase text-xs mb-2">Hours</h4>
                  <p className="text-gray-600 font-medium">Monday — Saturday: 8:00 AM to 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black p-10 rounded-[2.5rem] shadow-2xl text-white">
            <h3 className="text-2xl font-black uppercase mb-8">Schedule a Visit</h3>
            <p className="text-gray-400 text-sm mb-10">Enter your details and our admission officer will call you back within 24 hours.</p>
            <div className="space-y-6">
              <input type="text" placeholder="Parent Name" className="w-full bg-transparent border-b border-gray-700 py-3 outline-none focus:border-yellow-500 transition" />
              <input type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-gray-700 py-3 outline-none focus:border-yellow-500 transition" />
              <select className="w-full bg-transparent border-b border-gray-700 py-3 outline-none text-gray-400">
                <option>Select Class</option>
                <option>Nursery</option>
                <option>LKG</option>
                <option>UKG</option>
              </select>
              <button className="w-full bg-yellow-500 text-black py-4 font-black uppercase tracking-widest text-xs mt-6">Request Call Back</button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-12 px-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center bg-gray-50">
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-black uppercase tracking-tighter">Spoorthis <span className="text-yellow-500">Duckling</span></h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Nurturing curiosity since 2020</p>
        </div>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <a href="#" className="hover:text-black">Terms</a>
          <a href="#" className="hover:text-black">Privacy</a>
          <a href="#" className="hover:text-black">Google Maps</a>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a href="https://wa.me/919381377301" target="_blank" className="fixed bottom-8 right-8 bg-[#25D366] text-white p-5 rounded-full shadow-2xl z-[100] hover:scale-110 transition active:scale-95">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" className="w-6 h-6 invert" alt="WhatsApp" />
      </a>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { background-color: #ffffff; }
      `}</style>
    </main>
  );
}
