"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProgramDetail {
  id: string;
  name: string;
  age: string;
  duration: string;
  tagline: string;
  icon: string;
  themeColor: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  curriculum: string[];
  activities: string[];
  outcomes: string[];
  preps?: string[];
  image: string;
}

export default function PlayschoolPrograms() {
  const programs: ProgramDetail[] = [
    {
      id: "playgroup",
      name: "Play Group",
      age: "1.5 to 2.5 Years",
      duration: "3 Hours / Day (Mon - Fri)",
      tagline: "Sensory Discovery & Motor Milestones",
      icon: "🎨",
      themeColor: "bg-pink-500",
      bgColor: "bg-pink-50/50",
      borderColor: "border-pink-200",
      textColor: "text-pink-700",
      image: "/school2.jpg",
      curriculum: [
        "Sensory integration exercises",
        "Primary color and basic shape identification",
        "Introduction to animal and bird sounds",
        "Social habits and dispersal adapters",
        "Simple body part awareness games"
      ],
      activities: [
        "Finger painting & vegetable stamping",
        "Playing with non-toxic clay/dough",
        "Soft-gym climbing and ball pit dives",
        "Rhyme singing and actions imitation",
        "Water play & sand building sessions"
      ],
      outcomes: [
        "Development of gross and fine motor skills",
        "Increased word vocabulary (30-50 words)",
        "Confidence in self-dispersing from parents",
        "Basic sharing habits with peers"
      ]
    },
    {
      id: "nursery",
      name: "Nursery",
      age: "2.5 to 3.5 Years",
      duration: "3.5 Hours / Day (Mon - Fri)",
      tagline: "Language Adaptations & Letter Tracings",
      icon: "✏️",
      themeColor: "bg-sky-500",
      bgColor: "bg-sky-50/50",
      borderColor: "border-sky-200",
      textColor: "text-sky-700",
      image: "/school3.jpg",
      curriculum: [
        "Pre-writing motor lines (straight, curved, slanting)",
        "Alphabet recognition (A to Z) & phonetic sounds",
        "Number tracing & counting (1 to 10)",
        "Colors blending & size comparisons (big/small)",
        "Self-introduction and basic hygiene manners"
      ],
      activities: [
        "Tracing on sand boxes & blackboards",
        "Paper folding (origami) & collage tearing",
        "Theme-based story telling & puppet plays",
        "Sensory sorting games (buttons, beads, blocks)",
        "Priced gardening and watering plants"
      ],
      outcomes: [
        "Ability to recognize and sound out alphabets",
        "Pencil grip adaptation and coloring skills",
        "Oral count from 1 to 20",
        "Capacity to follow simple multi-step commands"
      ]
    },
    {
      id: "lkg",
      name: "LKG (Lower Kindergarten)",
      age: "3.5 to 4.5 Years",
      duration: "4.5 Hours / Day (Mon - Fri)",
      tagline: "Phonics Reading & Mathematical Shapes",
      icon: "📚",
      themeColor: "bg-yellow-500",
      bgColor: "bg-yellow-50/50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      image: "/program.jpg",
      curriculum: [
        "English: Writing letters A-Z, basic phonetic blending (2-letter words)",
        "Math: Writing numbers 1 to 50, counting worksheets, shapes",
        "General Awareness: Seasons, transport, parts of a plant, basic hygiene",
        "Hindi/Regional Language: Basic oral sounds & nursery rhymes"
      ],
      activities: [
        "Spelling bees with flashcards",
        "Role-playing as doctors, teachers, or postmen",
        "Basic drawing, water coloring, & pencil sketching",
        "Puzzles (20+ pieces) & memory card matching",
        "Relay races & balancing beams exercises"
      ],
      outcomes: [
        "Ability to write all capital and small alphabets",
        "Reading two-letter words independently",
        "Understand comparisons (more/less, heavy/light)",
        "Expression of complete thoughts in short sentences"
      ]
    },
    {
      id: "ukg",
      name: "UKG (Upper Kindergarten)",
      age: "4.5 to 5.5 Years",
      duration: "4.5 Hours / Day (Mon - Fri)",
      tagline: "Primary School Transition & Logical Mindset",
      icon: "🎒",
      themeColor: "bg-emerald-500",
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
      image: "/about.jpg",
      curriculum: [
        "English: CVC word reading, sight words, writing short sentences",
        "Math: Numbers 1 to 100, single-digit addition & subtraction, concept of time",
        "EVS (Environmental Studies): Living & non-living things, community helpers, solar system basics",
        "Languages: Writing basic regional alphabets"
      ],
      activities: [
        "Show and tell presentations by children",
        "Math puzzles & logic sequence games",
        "Creative writing prompts (writing about their pet/toy)",
        "Team sports, skipping ropes, & elementary yoga",
        "Nursery graduation rehearsals & drama scripts"
      ],
      outcomes: [
        "Fluent reading of short children story books",
        "Solve single digit arithmetic additions and subtractions",
        "Strong understanding of time, calendar dates, & daily EVS",
        "Complete cognitive readiness for Grade 1 CBSE/State programs"
      ],
      preps: [
        "Mock primary school interview adaptations",
        "Writing in double-ruled notebooks",
        "Carrying bags, managing lunch boxes independently",
        "Self-reading workbooks and assignment logs"
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState(programs[0].id);

  const currentProgram = programs.find((p) => p.id === activeTab) || programs[0];

  return (
    <div className="w-full font-['Quicksand'] pb-20">
      
      {/* ========== HERO BANNER ========== */}
      <section className="bg-gradient-to-r from-yellow-100 via-pink-100 to-sky-100 py-16 px-6 text-center border-b-8 border-dashed border-pink-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🎓 CHOOSE EXCELLENCE</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Preschool Programs
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Age-tailored curricula that blend active play-way methods with early academic building blocks.
          </p>
        </div>
      </section>

      {/* ========== PROGRAM TABS ========== */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-3.5 mb-14">
          {programs.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`px-6.5 py-3.5 rounded-full font-['Fredoka'] font-black text-sm transition-all duration-300 ${
                activeTab === p.id
                  ? `${p.themeColor} text-white shadow-md scale-105`
                  : "bg-white border-2 border-slate-100 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="mr-2">{p.icon}</span>
              {p.name}
            </button>
          ))}
        </div>

        {/* Tab Detail Card */}
        <motion.div
          key={currentProgram.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-[3rem] border-4 ${currentProgram.borderColor} ${currentProgram.bgColor} p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start`}
        >
          {/* Left Block: Image & Basic Meta */}
          <div className="lg:col-span-5 space-y-6">
            <div className="h-64 sm:h-80 rounded-3xl overflow-hidden border-4 border-white shadow-md">
              <img src={currentProgram.image} alt={currentProgram.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">Target Age Group</span>
                <span className={`inline-block ${currentProgram.themeColor} text-white px-4 py-1.5 rounded-full font-bold text-xs uppercase`}>
                  👶 {currentProgram.age}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">Program Duration</span>
                <span className="text-sm font-bold text-slate-700 block">
                  ⏰ {currentProgram.duration}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">Key Focus</span>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                  {currentProgram.tagline}
                </p>
              </div>
            </div>

            <Link
              href="/playschool/apply"
              className={`block w-full text-center py-4 rounded-full font-black text-white text-sm uppercase tracking-wider ${currentProgram.themeColor} shadow-md hover:brightness-110 transition`}
            >
              Enroll in {currentProgram.name} Now 🚀
            </Link>
          </div>

          {/* Right Block: Accordion / Structured Info */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <h2 className={`text-3xl font-['Fredoka'] font-black ${currentProgram.textColor} flex items-center gap-2 mb-2`}>
                <span>{currentProgram.icon}</span> {currentProgram.name}
              </h2>
              <p className="text-gray-500 text-sm font-bold">{currentProgram.tagline}</p>
            </div>

            <div className="border-t border-slate-200/60 pt-6 space-y-8">
              {/* Curriculum */}
              <div>
                <h3 className={`text-base font-['Fredoka'] font-black ${currentProgram.textColor} uppercase tracking-wider mb-4 flex items-center gap-2`}>
                  📂 Curriculum Outline
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentProgram.curriculum.map((item, idx) => (
                    <li key={idx} className="bg-white p-3.5 rounded-xl border border-slate-100 text-xs font-semibold text-gray-600 flex items-start gap-2">
                      <span className="text-emerald-500 font-black">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activities */}
              <div>
                <h3 className={`text-base font-['Fredoka'] font-black ${currentProgram.textColor} uppercase tracking-wider mb-4 flex items-center gap-2`}>
                  🧩 Fun Class Activities
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentProgram.activities.map((item, idx) => (
                    <li key={idx} className="bg-white p-3.5 rounded-xl border border-slate-100 text-xs font-semibold text-gray-600 flex items-start gap-2">
                      <span className="text-sky-500 font-bold">🌸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div>
                <h3 className={`text-base font-['Fredoka'] font-black ${currentProgram.textColor} uppercase tracking-wider mb-4 flex items-center gap-2`}>
                  🎯 Key Learning Outcomes
                </h3>
                <ul className="space-y-3">
                  {currentProgram.outcomes.map((item, idx) => (
                    <li key={idx} className="bg-white p-3.5 rounded-xl border border-slate-100 text-xs font-semibold text-gray-600 flex items-start gap-2 shadow-xs">
                      <span className="text-amber-500 font-bold">⭐</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Primary School Prep (If UKG) */}
              {currentProgram.preps && (
                <div>
                  <h3 className="text-base font-['Fredoka'] font-black text-rose-600 uppercase tracking-wider mb-4 flex items-center gap-2 animate-pulse">
                    🏫 Primary School Readiness (Grade 1 Preparation)
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentProgram.preps.map((item, idx) => (
                      <li key={idx} className="bg-rose-50/60 p-3.5 rounded-xl border border-rose-100 text-xs font-semibold text-rose-800 flex items-start gap-2">
                        <span className="text-rose-500">🛡️</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      </section>

      {/* ========== LEARNING AIDS GALLERY ========== */}
      <section className="bg-gradient-to-r from-sky-50 to-pink-50 py-20 px-6 border-t-8 border-dashed border-sky-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-3">🛠️ INFRASTRUCTURE</span>
          <h2 className="text-3xl font-['Fredoka'] font-black text-slate-800 mb-6">Our Creative Learning Aids</h2>
          <p className="text-gray-500 font-semibold max-w-xl mx-auto mb-14 text-sm leading-relaxed">
            We supply classrooms with international standard learning materials and aids designed specifically for preschool children.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-slate-100 rounded-3xl text-left shadow-xs">
              <span className="text-4xl block mb-4">🔠</span>
              <h3 className="font-['Fredoka'] font-black text-slate-800 text-base mb-2">Phonetic Sound Cards</h3>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">Flashcards and sound panels that connect letters with character representations and spoken voices.</p>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-3xl text-left shadow-xs">
              <span className="text-4xl block mb-4">🧮</span>
              <h3 className="font-['Fredoka'] font-black text-slate-800 text-base mb-2">Wooden Abacus & Blocks</h3>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">Tactile wooden blocks that allow visual counting, height ordering, and spatial geometry practice.</p>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-3xl text-left shadow-xs">
              <span className="text-4xl block mb-4">🎨</span>
              <h3 className="font-['Fredoka'] font-black text-slate-800 text-base mb-2">Non-Toxic Sensory Kits</h3>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">Soft modeling sand, organic playdoughs, and safety cutters that teach children texture and motor strength.</p>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-3xl text-left shadow-xs">
              <span className="text-4xl block mb-4">📺</span>
              <h3 className="font-['Fredoka'] font-black text-slate-800 text-base mb-2">Smart Panels</h3>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">Big interactive touchscreen boards displaying digital child animated rhymes and colorful logic games.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
