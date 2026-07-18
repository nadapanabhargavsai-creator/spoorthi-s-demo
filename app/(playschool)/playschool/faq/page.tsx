"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  category: string;
  icon: string;
  color: string;
  borderColor: string;
  textColor: string;
  items: FaqItem[];
}

export default function PlayschoolFaq() {
  const faqData: FaqCategory[] = [
    {
      category: "Admissions",
      icon: "🔑",
      color: "bg-pink-50/50",
      borderColor: "border-pink-200",
      textColor: "text-pink-700",
      items: [
        { q: "What is the minimum age for Play Group admissions?", a: "The minimum age eligibility is 1.5 years as of June 1st of the academic term." },
        { q: "Can we submit the application form offline?", a: "Yes, you can visit any of our three campus locations to collect, fill, and submit the physical application form, or apply online directly through our Apply Now portal." },
        { q: "What documents are required during admission registration?", a: "You need to upload/submit the child's Birth Certificate, Aadhaar Card, Passport Size Photo, and Parent Aadhaar cards." }
      ]
    },
    {
      category: "Fees & Payments",
      icon: "💵",
      color: "bg-sky-50/50",
      borderColor: "border-sky-200",
      textColor: "text-sky-700",
      items: [
        { q: "What is the fee payment schedule?", a: "Preschool fees are paid in three terms: Term 1 (June), Term 2 (October), and Term 3 (January)." },
        { q: "Are there any refunds if my child disperses mid-term?", a: "Registration fees are non-refundable. Term fees may be reviewed on a case-by-case basis depending on the duration spent." }
      ]
    },
    {
      category: "Safety & Security",
      icon: "🛡️",
      color: "bg-emerald-50/50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
      items: [
        { q: "How can parents view the live classroom CCTV cameras?", a: "Authenticated parents are given secure portal accounts. Once logged in, you can stream the live feed of your child's mapped classroom during permitted viewing hours." },
        { q: "Are classroom toys and equipment sanitarily safe?", a: "Absolutely! We wash and sterilize all toys, learning aids, cushions, and slides daily using child-safe, non-toxic sanitizing sprays." }
      ]
    },
    {
      category: "Transport",
      icon: "🚌",
      color: "bg-yellow-50/50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      items: [
        { q: "Do the school vans have GPS tracking?", a: "Yes, all school vans are GPS-enabled. Parents receive live location coordinates during pick-up and dispersal runs." },
        { q: "Will there be someone to attend to the children inside the van?", a: "Every school van operates with a driver and a trained female caretaker who handles buckle safety and helps kids climb onboard." }
      ]
    },
    {
      category: "Meals & Nutrition",
      icon: "🥛",
      color: "bg-orange-50/50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
      items: [
        { q: "Do you serve snacks at school?", a: "We provide healthy snack menus (fruits, organic milk, basic healthy bites) prepared cleanly in-house, or parents can send food inside labeled lunch boxes." },
        { q: "Do teachers help children eat their food?", a: "Yes, our teachers guide toddlers on clean hand-washing habits and help feed them while fostering independent self-eating manners." }
      ]
    },
    {
      category: "Curriculum & Activities",
      icon: "🧩",
      color: "bg-purple-50/50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      items: [
        { q: "What is your early childhood pedagogy?", a: "We use the international Play-Way and Montessori methods. We translate standard phonetic and numeric curricula into sensory puzzles, coloring games, and storytelling." },
        { q: "Do you assign homework to preschoolers?", a: "We only assign light, fun tasks (coloring shapes, drawing patterns, showing objects) to Nursery/LKG/UKG, ensuring zero stress for the child." }
      ]
    }
  ];

  const [activeIdx, setActiveIdx] = useState<string | null>(null);

  const toggleFaq = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setActiveIdx(activeIdx === key ? null : key);
  };

  return (
    <div className="w-full font-['Quicksand'] pb-20">
      
      {/* ========== HERO BANNER ========== */}
      <section className="bg-gradient-to-r from-sky-100 via-pink-100 to-yellow-100 py-16 px-6 text-center border-b-8 border-dashed border-sky-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 HELP DESK</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Find answers to commonly asked questions about admissions, fees, transport, meals, and safety.
          </p>
        </div>
      </section>

      {/* ========== FAQS CONTAINER ========== */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-12">
        {faqData.map((cat, catIdx) => (
          <div key={cat.category} className={`rounded-3xl border-4 ${cat.borderColor} ${cat.color} p-6 sm:p-8 shadow-sm bg-white`}>
            
            {/* Category Title */}
            <h2 className={`font-['Fredoka'] font-black text-xl ${cat.textColor} mb-6 flex items-center gap-2 text-left`}>
              <span>{cat.icon}</span> {cat.category}
            </h2>

            {/* Questions List */}
            <div className="space-y-4">
              {cat.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = activeIdx === key;
                return (
                  <div key={itemIdx} className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
                    <button
                      onClick={() => toggleFaq(catIdx, itemIdx)}
                      className="w-full flex justify-between items-center p-4.5 text-left font-bold text-sm sm:text-base text-slate-800 hover:text-sky-600 transition"
                    >
                      <span>{item.q}</span>
                      <span className="text-sky-500 font-extrabold text-xl ml-2">{isOpen ? "−" : "+"}</span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="p-4.5 pt-0 border-t border-slate-50 text-xs sm:text-sm font-semibold text-gray-500 leading-relaxed text-left">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </section>

      {/* ========== STILL HAVE QUESTIONS? ========== */}
      <section className="bg-gradient-to-r from-pink-400 to-orange-400 text-white rounded-[2.5rem] p-10 sm:p-14 max-w-4xl mx-auto mx-6 text-center shadow-lg relative overflow-hidden">
        <h2 className="text-2xl sm:text-3xl font-['Fredoka'] font-black mb-3">Still Have Unanswered Queries?</h2>
        <p className="max-w-md mx-auto font-semibold mb-8 text-sm text-pink-50 leading-relaxed">
          Drop us a direct message, chat via WhatsApp, or call our admission desks directly. We'd love to assist you.
        </p>
        <div className="flex flex-wrap justify-center gap-4.5">
          <Link
            href="/playschool/contact"
            className="bg-white text-pink-600 hover:bg-pink-50 px-6.5 py-3 rounded-full font-black text-xs uppercase tracking-wide transition shadow-sm"
          >
            Contact Help Desk 📧
          </Link>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            className="bg-pink-600 text-white border border-pink-300 hover:bg-pink-700 px-6.5 py-3 rounded-full font-black text-xs uppercase tracking-wide transition shadow-sm"
          >
            💬 WhatsApp Live Chat
          </a>
        </div>
      </section>

    </div>
  );
}
