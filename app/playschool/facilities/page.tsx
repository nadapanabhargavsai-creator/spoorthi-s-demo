"use client";

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

const facilities = [
  { name: "Smart Classrooms", desc: "Colorful pre-primary classrooms with interactive audio-visual panels.", icon: "🏫", img: "/facility_smart_class.png", feats: ["Interactive Whiteboards", "Ergonomic Chairs", "Soft Lighting"] },
  { name: "Indoor Play Area", desc: "Equipped with safe ball pits, soft slides, blocks, and crawling tunnels.", icon: "🧸", img: "/school1.jpg", feats: ["Soft Padded Floors", "Sterilized Toys Daily", "Activity Zones"] },
  { name: "Outdoor Playground", desc: "Expansive green turf playground with age-appropriate swings and climbing logs.", icon: "🛝", img: "/hero.jpg", feats: ["Anti-Injury Safety Mats", "Secured Bound fences", "Full P.E. Supervision"] },
  { name: "Preschool Library", desc: "Curated collection of colorful picture books, touch-and-feel catalogs and stories.", icon: "📚", img: "/facility_library.png", feats: ["1,000+ Kids Books", "Comfy Floor Cushions", "Puppet Theatre Corner"] },
  { name: "Creative Activity Room", desc: "Designed for sensory development activities, building blocks, and puzzles.", icon: "🧩", img: "/school2.jpg", feats: ["Sensory Tables", "Constructive Kits", "Group Play Space"] },
  { name: "Art & Craft Studio", desc: " messy zone for water-painting, finger printing, clay pottery and origami crafts.", icon: "🎨", img: "/school3.jpg", feats: ["Kid-safe Non-toxic Paints", "Origami Boards", "Kids Art Display Wall"] },
  { name: "Sleeping & Resting Room", desc: "Cozily lit silent room with individual clean cribs for toddler afternoon naps.", icon: "🛌", img: "/about.jpg", feats: ["Quiet Ambient Music", "Individual Clean Linens", "Regular Staff Patrols"] },
  { name: "Dining & Feeding Area", desc: "Hygienic seating counters where children learn dining etiquettes and healthy eating.", icon: "🍎", img: "/school1.jpg", feats: ["Sterilized Cutleries", "Teacher Assistance", "Clean Washing Sinks"] },
  { name: "CCTV & Security", desc: "Total round-the-clock camera watch over corridors, classrooms and playfields.", icon: "📹", img: "/school2.jpg", feats: ["100+ HD Security Cameras", "Biometric Guard Gate", "Fire Escape Plans"] },
  { name: "GPS School Vans", desc: "Safety-tested student transport fleet covering city locations with tracking app.", icon: "🚌", img: "/school3.jpg", feats: ["Live GPS Location Sync", "Female Bus Attendant", "Speed Limiters Control"] },
  { name: "First Aid & Medical Room", desc: "On-campus basic healthcare station with a certified nurse and emergency beds.", icon: "🩺", img: "/school1.jpg", feats: ["Full-time Nurse Staff", "Height & Weight Records", "Direct Ambulance Tie-up"] },
  { name: "RO Pure Drinking Water", desc: "Hygienic drinking points supplied by standard multi-stage RO filtration plants.", icon: "💧", img: "/school2.jpg", feats: ["Tested Drinking Water", "Chilled & Normal Taps", "Regular Filter Changes"] }
];

export default function PlaySchoolFacilities() {
  return (
    <main className="bg-[#F8FBFF] overflow-x-hidden pt-28 pb-20">
      
      {/* HERO BANNER */}
      <section className="relative py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full">
            Our Campus
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Preschool <span className="text-pink-500">Facilities</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            Explore our state-of-the-art infrastructure designed to offer maximum safety, play, and interactive learning.
          </p>
        </div>
      </section>

      {/* FACILITIES CARDS GRID */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facilities.map((fac, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: (idx % 3) * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full"
              >
                {/* Visual Area */}
                <div className="h-52 overflow-hidden relative">
                  <img src={fac.img} alt={fac.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-xl shadow text-xs font-black uppercase flex items-center gap-1.5">
                    <span>{fac.icon}</span> {fac.name}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-base font-black uppercase text-[#0F4C81]">{fac.name}</h3>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed font-semibold">{fac.desc}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Features</p>
                    <div className="flex flex-wrap gap-1.5">
                      {fac.feats.map((f, j) => (
                        <span key={j} className="text-[9px] font-bold bg-[#F8FBFF] border border-slate-200/40 text-slate-600 px-2 py-1 rounded-full">
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
