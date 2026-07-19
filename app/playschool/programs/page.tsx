"use client";

import { motion } from "framer-motion";
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

const programsData = [
  {
    name: "Play Group",
    age: "1.5 – 2.5 Years",
    duration: "9:00 AM – 11:30 AM (Daily)",
    image: "/school1.jpg",
    icon: "👶",
    color: "from-pink-400 to-rose-500",
    shadow: "shadow-pink-500/10",
    bg: "bg-pink-50/50",
    border: "border-pink-100",
    textAccent: "text-pink-500",
    activities: [
      "Sensory sand and clay play",
      "Scribbling & basic coloring tasks",
      "Storytelling and vocabulary audio",
      "Soft blocks stacking & sorting"
    ],
    outcomes: [
      "Fine motor finger coordination",
      "Cooperative behavior & sharing habits",
      "Identification of common animals & fruits",
      "Willingness to attend preschool independently"
    ]
  },
  {
    name: "Nursery",
    age: "2.5 – 3.5 Years",
    duration: "9:00 AM – 12:00 PM (Daily)",
    image: "/school2.jpg",
    icon: "🌱",
    color: "from-amber-400 to-orange-500",
    shadow: "shadow-orange-500/10",
    bg: "bg-amber-50/50",
    border: "border-amber-100",
    textAccent: "text-amber-500",
    activities: [
      "Alphabets & numbers identification",
      "Tracing patterns & basic shapes",
      "Speech exercises & rhyme recitations",
      "Guided outdoor games & running tasks"
    ],
    outcomes: [
      "Early writing and pencil grasp",
      "Reciting nursery rhymes confidently",
      "Counting numbers up to 20",
      "Basic hygiene habits (washing hands, etc.)"
    ]
  },
  {
    name: "LKG (Lower KG)",
    age: "3.5 – 4.5 Years",
    duration: "9:00 AM – 12:30 PM (Daily)",
    image: "/school3.jpg",
    icon: "📚",
    color: "from-sky-400 to-blue-500",
    shadow: "shadow-blue-500/10",
    bg: "bg-sky-50/50",
    border: "border-sky-100",
    textAccent: "text-sky-500",
    activities: [
      "Cursive stroke writing patterns",
      "Vowel phonics and simple words",
      "Introduction to Hindi & Telugu",
      "Drawing, craft cutting & origami sheets"
    ],
    outcomes: [
      "Writing three-letter words",
      "Addition and subtraction of single digits",
      "Logical categorization & sorting concepts",
      "Listening & executing complex verbal commands"
    ]
  },
  {
    name: "UKG (Upper KG)",
    age: "4.5 – 5.5 Years",
    duration: "9:00 AM – 12:30 PM (Daily)",
    image: "/program.jpg",
    icon: "🚀",
    color: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/10",
    bg: "bg-emerald-50/50",
    border: "border-emerald-100",
    textAccent: "text-emerald-500",
    activities: [
      "Full sentence reading exercises",
      "Primary mathematics, values, carrying",
      "Environmental science concepts (plants, weather)",
      "Role-plays & child leadership assemblies"
    ],
    outcomes: [
      "Reading simple paragraphs",
      "Writing full sentences correctly",
      "Full readiness for standard 1 primary school",
      "Enhanced moral and environmental habits"
    ]
  }
];

export default function PlaySchoolPrograms() {
  return (
    <main className="bg-[#F8FBFF] overflow-x-hidden pt-28 pb-20">
      
      {/* HERO BANNER */}
      <section className="relative py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full">
            Our Curriculum
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Learning <span className="text-pink-500">Programs</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            Explore our pre-primary grade structures curated to align with early childhood development methodologies.
          </p>
        </div>
      </section>

      {/* PROGRAMS DETAILS */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          {programsData.map((prog, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm shadow-[#0f4c81]/5 hover:shadow-md transition-shadow duration-500"
            >
              <div className="grid md:grid-cols-12 gap-8 items-stretch">
                
                {/* Visual Area (5 Cols) */}
                <div className="md:col-span-5 relative min-h-[300px]">
                  <img src={prog.image} className="w-full h-full object-cover" alt={prog.name} />
                  <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent`} />
                  
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4.5 py-2 rounded-2xl flex items-center shadow-md">
                    <span className="text-2xl mr-2 filter drop-shadow-sm select-none">{prog.icon}</span>
                    <span className={`text-[10px] font-black uppercase tracking-wider text-slate-800`}>{prog.name}</span>
                  </div>
                </div>

                {/* Details Content Area (7 Cols) */}
                <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between space-y-6">
                  
                  {/* Title & Info */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${prog.bg} ${prog.border} ${prog.textAccent} px-3 py-1.5 rounded-full border`}>
                        👶 Age: {prog.age}
                      </span>
                      <span className={`text-[9px] font-black uppercase tracking-widest bg-slate-50 border border-slate-100 text-slate-500 px-3 py-1.5 rounded-full`}>
                        ⏰ Timing: {prog.duration}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black uppercase text-[#0F4C81]">{prog.name} Program</h2>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Activities */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Daily Activities</h3>
                      <ul className="space-y-2 text-xs font-semibold text-slate-600">
                        {prog.activities.map((act, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#FFC857]`} />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcomes */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Learning Outcomes</h3>
                      <ul className="space-y-2 text-xs font-semibold text-slate-600">
                        {prog.outcomes.map((out, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-emerald-500" />
                            <span>{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Apply Action Link */}
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <Link
                      href="/playschool/apply"
                      className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0F4C81] hover:text-[#1E88E5] transition-all`}
                    >
                      Apply For {prog.name} <span>→</span>
                    </Link>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}
