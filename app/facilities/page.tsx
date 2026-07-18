"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ── Reusable animation variants ──────────────────────────────────────────────
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
// ─────────────────────────────────────────────────────────────────────────────


interface Facility {
  id: string;
  name: string;
  category: "academics" | "sports" | "creative" | "safety";
  image: string;
  description: string;
  features: string[];
  icon: string;
  accentColor: string;
  detailedInfo: string;
}

const facilitiesData: Facility[] = [
  // ACADEMICS
  {
    id: "smart-classrooms",
    name: "Smart Classrooms",
    category: "academics",
    image: "/facility_smart_class.png",
    description: "Technology-enabled interactive classrooms designed to make learning immersive, visual, and highly engaging.",
    features: ["Interactive Smart Boards", "Audio-Visual Systems", "Ergonomic Seating", "Climate Controlled"],
    icon: "🏫",
    accentColor: "from-amber-500 to-orange-600",
    detailedInfo: "Our Smart Classrooms are equipped with the latest interactive touchscreens and high-definition projectors. By blending traditional teaching with digital resources, we cater to visual, auditory, and kinesthetic learning styles. Every classroom features custom ergonomics to support student health and focus."
  },
  {
    id: "computer-lab",
    name: "Computer Lab",
    category: "academics",
    image: "/facility_computer_lab.png",
    description: "State-of-the-art computing facility with high-speed internet access and individual workstations.",
    features: ["1:1 Student PC Ratio", "High-Speed WiFi", "Educational Software", "Coding & AI Kits"],
    icon: "💻",
    accentColor: "from-blue-500 to-indigo-600",
    detailedInfo: "Our Computer Lab features premium workstations with modern educational software, programming suites, and STEM learning tools. Students learn coding, digital design, and computer applications under the guidance of certified IT instructors, fostering essential 21st-century tech skills."
  },
  {
    id: "science-laboratory",
    name: "Science Laboratory",
    category: "academics",
    image: "/facility_science_lab.png",
    description: "Fully equipped physics, chemistry, and biology labs allowing students to perform practical experiments safely.",
    features: ["Advanced Microscopes", "Safety Equipment", "Hands-on Models", "Dedicated Workbenches"],
    icon: "🔬",
    accentColor: "from-emerald-500 to-teal-600",
    detailedInfo: "The Science Lab provides an environment for hands-on discovery. Designed with international safety standards, it includes emergency showers, eye washes, and high-grade safety gear. Students explore concepts in physics, chemistry, and biology through structured experiments."
  },
  {
    id: "mathematics-lab",
    name: "Mathematics Lab",
    category: "academics",
    image: "/school2.jpg",
    description: "An innovative space where math concepts come to life through models, puzzles, and interactive activities.",
    features: ["Geometric Models", "Abacus & Vedic Math Kits", "Logical Puzzles", "Smart Board Lessons"],
    icon: "📐",
    accentColor: "from-purple-500 to-pink-600",
    detailedInfo: "Our Mathematics Lab is designed to remove the fear of math. Through 3D shapes, fraction kits, and mathematical puzzles, students visualize abstract theories and build strong logical reasoning and quantitative skills."
  },
  {
    id: "library",
    name: "The Library",
    category: "academics",
    image: "/facility_library.png",
    description: "A sanctuary of knowledge housing thousands of books, journals, and digital learning assets.",
    features: ["10,000+ Books", "Digital E-Reader Zone", "Silent Reading Corners", "Storytelling Theatre Area"],
    icon: "📚",
    accentColor: "from-cyan-500 to-blue-600",
    detailedInfo: "Our library is a welcoming space that encourages reading. It boasts a rich collection of academic books, fiction, encyclopedias, and children's magazines. We also feature a digital search catalog and individual e-reader stations for research."
  },
  {
    id: "digital-learning",
    name: "Digital Learning Rooms",
    category: "academics",
    image: "/school3.jpg",
    description: "Dedicated spaces for online research, webinars, and audio-visual educational projects.",
    features: ["VR Headsets", "Podcast Setup", "Webinar Screens", "Collaborative Workstations"],
    icon: "🌐",
    accentColor: "from-rose-500 to-red-600",
    detailedInfo: "Equipped with cutting-edge learning kits including VR headsets for virtual field trips, this room prepares students for the digital future. It is ideal for group projects, research, and interactive online workshops."
  },

  // SPORTS
  {
    id: "sports-complex",
    name: "Sports Complex",
    category: "sports",
    image: "/facility_sports.png",
    description: "Multi-sport outdoor and indoor facility promoting athletic excellence and physical fitness.",
    features: ["Basketball Court", "Athletics Track", "Cricket Practice Nets", "Football Field"],
    icon: "🏆",
    accentColor: "from-orange-500 to-red-600",
    detailedInfo: "Our Sports Complex features professionally designed courts and fields. Regular sports events and physical training sessions are led by national-level coaches to identify and nurture athletic talent."
  },
  {
    id: "indoor-games",
    name: "Indoor Games Zone",
    category: "sports",
    image: "/school1.jpg",
    description: "Climate-controlled indoor space for recreational games, chess, table tennis, and carrom.",
    features: ["Table Tennis Tables", "Professional Chess Boards", "Carrom Boards", "Gymnastics Mats"],
    icon: "♟️",
    accentColor: "from-violet-500 to-purple-600",
    detailedInfo: "The Indoor Games Zone develops concentration and strategy. It offers chess clubs, table tennis tournaments, and recreational indoor sports that keep students active regardless of weather conditions."
  },
  {
    id: "playground",
    name: "Main Playground",
    category: "sports",
    image: "/hero.jpg",
    description: "A spacious, safe, and beautifully maintained grassy playground with modern swings and slides.",
    features: ["Premium Turf", "Safe Playground Equipment", "Shaded Benches", "Supervised Play Area"],
    icon: "🛝",
    accentColor: "from-lime-500 to-emerald-600",
    detailedInfo: "Our expansive playground is designed with safety underlay to prevent injuries. Fully supervised by dedicated physical education staff, it serves as the hub of physical activity and play during breaks."
  },
  {
    id: "yoga-room",
    name: "Yoga & Meditation Studio",
    category: "sports",
    image: "/about.jpg",
    description: "A serene, peaceful space dedicated to mental wellness, flexibility, and mindfulness training.",
    features: ["Premium Mats", "Ambient Sound System", "Certified Instructors", "Air Purified Space"],
    icon: "🧘",
    accentColor: "from-teal-500 to-emerald-600",
    detailedInfo: "Mindfulness and wellness are key to holistic development. In our Yoga Room, kids learn breathing techniques, stress-relief exercises, and basic physical postures from professional yoga instructors."
  },

  // CREATIVE
  {
    id: "auditorium",
    name: "Auditorium & Multipurpose Hall",
    category: "creative",
    image: "/banner.jpg",
    description: "State-of-the-art performance venue equipped with advanced acoustics, professional lighting, and sound systems.",
    features: ["500+ Seating Capacity", "Acoustic Wall Panels", "LED Screen Stage", "Green Rooms"],
    icon: "🎭",
    accentColor: "from-fuchsia-500 to-purple-700",
    detailedInfo: "Our grand auditorium hosts annual plays, assemblies, guest lectures, and cultural events. With theater-style seating, theatrical spotlights, and premium sound systems, it is the perfect stage to boost students' stage confidence."
  },
  {
    id: "music-room",
    name: "Music Room",
    category: "creative",
    image: "/program.jpg",
    description: "A sound-proofed creative studio offering training in vocal music and various instruments.",
    features: ["Keyboards & Guitars", "Drums & Percussion", "Vocal Training Setup", "Recording Facility"],
    icon: "🎵",
    accentColor: "from-blue-500 to-cyan-600",
    detailedInfo: "The Music Studio is equipped with premium instruments. Students receive hands-on training in classical, fusion, and western music, guided by musical experts."
  },
  {
    id: "dance-room",
    name: "Dance Studio",
    category: "creative",
    image: "/school1.jpg",
    description: "Spacious studio with wooden flooring, full-length mirrors, and sound systems for various dance styles.",
    features: ["Full-Wall Mirrors", "Hardwood Shock-Absorbent Floor", "High-Fidelity Audio", "Classical & Modern Styles"],
    icon: "💃",
    accentColor: "from-rose-500 to-pink-600",
    detailedInfo: "Our Dance Studio is designed to train students in classical Indian dance forms like Kathak, as well as modern freestyle and contemporary styles, improving physical expression and grace."
  },
  {
    id: "art-craft",
    name: "Art & Craft Room",
    category: "creative",
    image: "/school2.jpg",
    description: "A bright, messy, and creative workshop where students explore painting, sculpture, and craftwork.",
    features: ["Pottery Wheels", "Easels & Paint Supplies", "Origami & Craft Stations", "Exhibition Display Walls"],
    icon: "🎨",
    accentColor: "from-amber-400 to-red-600",
    detailedInfo: "The Art Room provides absolute creative freedom. Students engage in painting, sculpting with clay, origami, and recycling crafts, with annual exhibitions to showcase their wonderful work."
  },

  // SAFETY & CAMPUS
  {
    id: "transportation",
    name: "GPS-Enabled School Bus Fleet",
    category: "safety",
    image: "/school3.jpg",
    description: "Safe and secure transport system covering all major routes with real-time GPS tracking.",
    features: ["Real-time GPS Tracking", "Speed Limiters", "Trained Female Attendants", "CCTV Inside Buses"],
    icon: "🚌",
    accentColor: "from-yellow-500 to-amber-600",
    detailedInfo: "Student safety during travel is paramount. Every school bus in our fleet is monitored in real-time, features CCTV cameras, and is staffed with experienced drivers and trained female attendants to ensure safety."
  },
  {
    id: "medical-room",
    name: "Medical Room & First Aid",
    category: "safety",
    image: "/school1.jpg",
    description: "Dedicated healthcare station with professional nurse, medicine supply, and direct doctor contact.",
    features: ["Full-time Trained Nurse", "Emergency Beds & Oxygen", "Regular Health Checkups", "Ambulance Tie-up"],
    icon: "🩺",
    accentColor: "from-red-500 to-rose-600",
    detailedInfo: "Our on-campus Medical Room provides immediate medical care and first aid. We maintain student health records and conduct regular vision, dental, and general health checkups."
  },
  {
    id: "cctv-security",
    name: "24/7 CCTV & Security",
    category: "safety",
    image: "/school2.jpg",
    description: "Comprehensive campus security system with professional guard posts and full CCTV coverage.",
    features: ["150+ CCTV Cameras", "Biometric Entry Gates", "24/7 Security Patrols", "Visitor Management System"],
    icon: "🛡️",
    accentColor: "from-slate-700 to-slate-900",
    detailedInfo: "Our campus is heavily fortified. High-definition cameras monitor all entries, exits, hallways, and fields. Only authorized personnel are permitted inside via strict biometric verification."
  },
  {
    id: "ro-water",
    name: "RO Purified Drinking Water",
    category: "safety",
    image: "/school3.jpg",
    description: "Multi-stage RO purification plants supplying pure, clean, and cold drinking water across the campus.",
    features: ["Multi-Stage RO Plants", "Regular Water Quality Audits", "Chilled Water Dispensers", "Stainless Steel Stations"],
    icon: "💧",
    accentColor: "from-sky-500 to-blue-600",
    detailedInfo: "Clean drinking water is vital for student health. Our high-capacity RO plant supplies safe water to multiple dispensers, tested weekly to guarantee maximum purity."
  },
  {
    id: "clean-washrooms",
    name: "Clean Washrooms",
    category: "safety",
    image: "/school1.jpg",
    description: "Hygenic, separately maintained washrooms for boys and girls with continuous water supply.",
    features: ["Dedicated Cleaning Staff", "Touchless Soap Dispensers", "Kid-Friendly Fittings", "Sanitary Stations"],
    icon: "🧼",
    accentColor: "from-teal-500 to-cyan-600",
    detailedInfo: "We maintain international sanitation standards. Washrooms are cleaned after every period, using child-friendly materials, and equipped with separate child-height fittings."
  },
  {
    id: "wifi-campus",
    name: "High-Speed WiFi Campus",
    category: "safety",
    image: "/school2.jpg",
    description: "Secure, firewall-protected high-speed wireless internet access across all school wings.",
    features: ["Fortinet Firewall Security", "100 Mbps Speeds", "Safe Search Enabled", "Faculty & Student Networks"],
    icon: "📶",
    accentColor: "from-blue-600 to-sky-500",
    detailedInfo: "Our entire campus has seamless internet coverage, strictly filtered to block inappropriate content and provide a safe digital research environment."
  },
  {
    id: "power-backup",
    name: "Uninterrupted Power Backup",
    category: "safety",
    image: "/school3.jpg",
    description: "High-capacity eco-generators ensuring zero learning disruption during power cuts.",
    features: ["Silent Eco-Generators", "Instant Switchover UPS", "Powering Labs & Smart Rooms", "24/7 Security System Power"],
    icon: "⚡",
    accentColor: "from-amber-500 to-yellow-600",
    detailedInfo: "No power cut can halt learning at Spoorthi's. Our automated generators power smart boards, computers, water plants, and lighting instantly."
  },
  {
    id: "fire-safety",
    name: "Fire Safety Systems",
    category: "safety",
    image: "/school1.jpg",
    description: "Full fire detection and suppression systems, with regularly trained staff and evacuation protocols.",
    features: ["Smoke Detectors & Alarms", "Fire Hydrants & Sprinklers", "Regular Evacuation Drills", "Certified Extinguishers"],
    icon: "🧯",
    accentColor: "from-red-600 to-orange-700",
    detailedInfo: "We prioritize safety with certified fire systems. Our entire staff undergoes annual fire combat training, and students participate in emergency drills."
  },
  {
    id: "green-campus",
    name: "Green Campus initiative",
    category: "safety",
    image: "/school2.jpg",
    description: "An eco-friendly, plastic-free environment using rainwater harvesting and waste recycling.",
    features: ["Rainwater Harvesting", "Zero-Plastic Policy", "Composting Unit", "Solar Powered Lights"],
    icon: "🌱",
    accentColor: "from-green-500 to-emerald-600",
    detailedInfo: "Our campus instills ecological values in students. We utilize composting, practice solar lighting in public spaces, and actively recycle wastewater for gardening."
  },
  {
    id: "parking",
    name: "Safe Parking Zone",
    category: "safety",
    image: "/school3.jpg",
    description: "Spacious, organized parking for staff vehicles, visitor vehicles, and school transport.",
    features: ["Dedicated Staff Parking", "Visitor Drop-off Bay", "Bicycle Racks", "Security Attendants"],
    icon: "🅿️",
    accentColor: "from-slate-500 to-slate-700",
    detailedInfo: "Organized drop-offs prevent congestion. We feature designated parking slots for staff, visitors, and school buses, managed by security personnel."
  },
  {
    id: "school-garden",
    name: "Botanical School Garden",
    category: "safety",
    image: "/school1.jpg",
    description: "A lush garden with diverse flora where students learn gardening and plant biology hands-on.",
    features: ["Herb & Floral Sections", "Organic Vegetable Patch", "Learning Benches", "Drip Irrigation System"],
    icon: "🏡",
    accentColor: "from-green-600 to-teal-600",
    detailedInfo: "Students connect with nature in our Botanical Garden, planting herbs, studying organic vegetables, and monitoring ecosystem cycles."
  }
];

const categories = [
  { id: "all", label: "All Facilities", icon: "🌐" },
  { id: "academics", label: "Academics & Labs", icon: "📚" },
  { id: "sports", label: "Sports & Wellness", icon: "⚽" },
  { id: "creative", label: "Arts & Culture", icon: "🎨" },
  { id: "safety", label: "Safety & Services", icon: "🛡️" }
];

const stats = [
  { value: "30+", label: "Smart Learning Rooms", icon: "🏫", color: "text-amber-500" },
  { value: "5+", label: "Advanced Laboratories", icon: "🔬", color: "text-blue-500" },
  { value: "10,000+", label: "Library Resources", icon: "📚", color: "text-emerald-500" },
  { value: "100%", label: "CCTV & GPS Secure Coverage", icon: "🛡️", color: "text-red-500" }
];

export default function Facilities() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeModal, setActiveModal] = useState<Facility | null>(null);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);

  // Form states
  const [visitName, setVisitName] = useState("");
  const [visitPhone, setVisitPhone] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [visitSuccess, setVisitSuccess] = useState(false);

  const filteredFacilities = selectedCategory === "all"
    ? facilitiesData
    : facilitiesData.filter(f => f.category === selectedCategory);

  const handleDownloadBrochure = () => {
    setDownloadingBrochure(true);
    setTimeout(() => {
      setDownloadingBrochure(false);
      alert("📚 Your premium campus brochure is ready! Downloading started.");
    }, 2000);
  };

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitSuccess(true);
    setTimeout(() => {
      setVisitSuccess(false);
      setVisitModalOpen(false);
      setVisitName("");
      setVisitPhone("");
      setVisitDate("");
      setVisitTime("");
    }, 2500);
  };

  return (
    <main className="bg-slate-50 text-slate-800 min-h-screen overflow-x-hidden pt-20">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/facilities_hero.png" 
            alt="School Facilities Banner" 
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/50" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-yellow-500 text-black text-[10px] font-black px-5 py-2 uppercase tracking-[0.4em] rounded-full mb-6"
          >
            Campus Infrastructure
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black uppercase leading-[0.95] tracking-tighter mb-6"
          >
            World-Class <span className="text-yellow-400">Environment</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto font-medium mb-8 leading-relaxed"
          >
            State-of-the-art facilities crafted to provide an exceptional learning journey, promising safety, creativity, and absolute academic excellence.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => setVisitModalOpen(true)}
              className="px-8 py-3.5 bg-yellow-400 text-black font-black uppercase text-[11px] tracking-widest rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Book Campus Tour
            </button>
            <button
              onClick={handleDownloadBrochure}
              className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-black uppercase text-[11px] tracking-widest rounded-full hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {downloadingBrochure ? "Preparing Brochure..." : "Download Brochure"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. INFRASTRUCTURE STATISTICS */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                transition={{ delay: i * 0.08 }}
                viewport={{ once: false, amount: 0.15 }}
                className="flex items-center gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div className="text-4xl">{stat.icon}</div>
                <div>
                  <h4 className="text-3xl font-black text-slate-900 leading-none mb-1">{stat.value}</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORY FILTERS */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex flex-wrap justify-center gap-3 bg-white p-2 rounded-2xl border border-slate-200/60 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 text-white shadow-md scale-105"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ANIMATED FACILITIES GRID */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredFacilities.map((fac, idx) => (
                <motion.div
                  key={fac.id}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-400 flex flex-col h-full"
                >
                  {/* Image Container with Zoom effect */}
                  <div className="relative h-60 w-full overflow-hidden group">
                    <img 
                      src={fac.image} 
                      alt={fac.name} 
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl flex items-center justify-center shadow-md border border-slate-100/30">
                      <span className="text-xl mr-1.5">{fac.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">
                        {fac.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-black uppercase text-slate-900 mb-3">{fac.name}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {fac.description}
                      </p>

                      {/* Features mini pills */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {fac.features.slice(0, 3).map((feat, i) => (
                          <span 
                            key={i}
                            className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-200/30"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveModal(fac)}
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 hover:text-yellow-600 transition duration-300"
                    >
                      Read More
                      <span>→</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 5. VIRTUAL SCHOOL TOUR */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.15 }}
              className="lg:col-span-5"
            >
              <span className="inline-block bg-yellow-400/20 text-yellow-800 text-[10px] font-black px-5 py-2 uppercase tracking-[0.4em] rounded-full mb-6">
                Interactive Experience
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-6 leading-tight">
                Virtual School <span className="text-yellow-500">Tour</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-8 font-medium">
                Experience our cutting-edge campus right from your home. Discover classrooms, laboratories, sports grounds, and reading arenas in an interactive 360-degree tour.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center font-black">1</div>
                  <p className="text-sm font-semibold text-slate-700 mt-1">Explore all classrooms and learning wings</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center font-black">2</div>
                  <p className="text-sm font-semibold text-slate-700 mt-1">Check laboratory safety and computer setups</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center font-black">3</div>
                  <p className="text-sm font-semibold text-slate-700 mt-1">Walk through the sports arena and library spaces</p>
                </div>
              </div>

              <button
                onClick={() => setVisitModalOpen(true)}
                className="px-8 py-4 bg-slate-900 text-white font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300"
              >
                Schedule Guided Visit
              </button>
            </motion.div>
            
            <motion.div 
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.15 }}
              className="lg:col-span-7"
            >
              <div className="relative rounded-[2rem] overflow-hidden p-2 bg-slate-100 border border-slate-200 shadow-xl h-[450px]">
                <img 
                  src="/facilities_hero.png" 
                  alt="Virtual Tour Mockup" 
                  className="w-full h-full object-cover rounded-[1.8rem] filter brightness-75"
                />
                
                {/* 360 virtual overlay mock */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 rounded-[1.8rem]">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                  >
                    <span className="text-white text-3xl font-bold">360°</span>
                  </motion.div>
                  <p className="text-white text-xs font-black uppercase tracking-widest mt-4">Start Campus Virtual Tour</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. PHOTO GALLERY SECTION */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/55">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-slate-200 text-slate-800 text-[10px] font-black px-5 py-2 uppercase tracking-[0.4em] rounded-full mb-6">
            Visual Highlights
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-16">
            Campus Gallery
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "/facility_smart_class.png",
              "/facility_computer_lab.png",
              "/facility_science_lab.png",
              "/facility_library.png",
              "/facility_sports.png",
              "/school1.jpg",
              "/school2.jpg",
              "/school3.jpg"
            ].map((img, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                transition={{ delay: i * 0.05 }}
                viewport={{ once: false, amount: 0.1 }}
                className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer shadow-md"
              >
                <img 
                  src={img} 
                  alt="Campus Area" 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-2xl font-black">🔍</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION SECTION */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #fde68a, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Join the <span className="text-yellow-400">Spoorthi's</span> Family
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Take the first step towards offering your child a nurturing, secure, and world-class educational space. Visit us today to experience it yourself.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setVisitModalOpen(true)}
              className="px-9 py-4 bg-yellow-400 text-black font-black uppercase text-[11px] tracking-widest rounded-full shadow-xl hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Book School Visit
            </button>
            <button
              onClick={handleDownloadBrochure}
              className="px-9 py-4 bg-transparent border-2 border-white/50 text-white font-black uppercase text-[11px] tracking-widest rounded-full hover:bg-white hover:text-black hover:border-white hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {downloadingBrochure ? "Downloading..." : "Download Brochure PDF"}
            </button>
          </div>
        </div>
      </section>

      {/* MODAL: DETAIL READ MORE */}
      <AnimatePresence>
        {activeModal && (
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
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white hover:bg-black rounded-full flex items-center justify-center text-lg font-black transition-colors"
              >
                ✕
              </button>
              
              <div className="h-64 w-full relative">
                <img 
                  src={activeModal.image} 
                  alt={activeModal.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-8 flex items-center gap-3">
                  <span className="text-3xl bg-white/20 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center border border-white/25">
                    {activeModal.icon}
                  </span>
                  <div>
                    <h3 className="text-2xl font-black uppercase text-white leading-none">{activeModal.name}</h3>
                    <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">
                      {activeModal.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  {activeModal.detailedInfo}
                </p>
                
                <h4 className="font-black uppercase text-[10px] tracking-wider text-slate-400 mb-4">Key Specifications & Features</h4>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {activeModal.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      setVisitModalOpen(true);
                    }}
                    className="flex-1 px-6 py-3.5 bg-slate-900 text-white hover:bg-yellow-400 hover:text-black font-black uppercase text-[10px] tracking-widest rounded-xl transition-all duration-300"
                  >
                    Tour This Facility
                  </button>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase text-[10px] tracking-widest rounded-xl transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: BOOK CAMPUS TOUR */}
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
              
              <h3 className="text-2xl font-black uppercase text-slate-900 mb-2">Book a Visit</h3>
              <p className="text-slate-500 text-xs mb-6 font-medium leading-relaxed">
                Fill in the details below to schedule your personalized guided tour of Spoorthi's campus.
              </p>
              
              {visitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <span className="text-6xl mb-4 block">🎉</span>
                  <h4 className="text-xl font-black text-slate-900 mb-1">Booking Confirmed!</h4>
                  <p className="text-slate-500 text-xs">Our admissions assistant will call you shortly to verify.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleBookVisit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Parent's Name</label>
                    <input 
                      type="text" 
                      required 
                      value={visitName}
                      onChange={(e) => setVisitName(e.target.value)}
                      placeholder="e.g. Rahul Kumar"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={visitPhone}
                      onChange={(e) => setVisitPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Select Date</label>
                      <input 
                        type="date" 
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-yellow-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Select Time</label>
                      <input 
                        type="time" 
                        required
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-yellow-400 transition"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full mt-4 px-6 py-4 bg-slate-900 text-white font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300"
                  >
                    Submit Booking Request
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
