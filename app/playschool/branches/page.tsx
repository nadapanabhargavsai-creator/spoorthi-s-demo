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

const branches = [
  {
    name: "Papi Reddy Nagar (Head Branch)",
    image: "/school1.jpg",
    address: "Road No. 14, Papi Reddy Nagar, Papi Reddy Colony, Hyderabad, TS 500037",
    phone: "+91 93813 77301",
    email: "admissions@spoorthis.edu.in",
    hours: "Mon – Sat: 8:00 AM – 4:00 PM",
    principal: "Dr. Saritha Match, Principal",
    admissions: "Mrs. Mounika Marampelly",
    mapQuery: "Road+No.+14,+Papi+Reddy+Nagar,+Hyderabad"
  },
  {
    name: "Gachibowli Branch",
    image: "/school2.jpg",
    address: "Plot 42, Telecom Nagar, Gachibowli, Hyderabad, TS 500032",
    phone: "+91 90000 12345",
    email: "gachibowli@spoorthis.edu.in",
    hours: "Mon – Sat: 8:00 AM – 4:00 PM",
    principal: "Mrs. Aruna Devi, Vice Principal",
    admissions: "Accounts Team",
    mapQuery: "Telecom+Nagar,+Gachibowli,+Hyderabad"
  },
  {
    name: "Kukatpally Branch",
    image: "/school3.jpg",
    address: "Phase 3, KPHB Colony, Kukatpally, Hyderabad, TS 500072",
    phone: "+91 98765 43210",
    email: "kphb@spoorthis.edu.in",
    hours: "Mon – Sat: 8:30 AM – 4:30 PM",
    principal: "Mrs. Radhika Murthy, Center Head",
    admissions: "General Office Admin",
    mapQuery: "KPHB+Colony,+Kukatpally,+Hyderabad"
  }
];

export default function PlaySchoolBranches() {
  return (
    <main className="bg-[#F8FBFF] overflow-x-hidden pt-28 pb-20">
      
      {/* HERO BANNER */}
      <section className="relative py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-pink-100 border border-pink-200 text-pink-600 text-[10px] font-black px-5 py-2 uppercase tracking-widest rounded-full">
            Our Presence
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Our Preschool <span className="text-pink-500">Branches</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            Visit our beautifully structured play schools located across major centers in Hyderabad.
          </p>
        </div>
      </section>

      {/* BRANCH DETAILS */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {branches.map((br, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm shadow-[#0f4c81]/5 flex flex-col lg:flex-row h-full"
            >
              
              {/* Photo Area (5 Cols equivalent) */}
              <div className="lg:w-[40%] relative min-h-[300px]">
                <img src={br.image} className="w-full h-full object-cover" alt={br.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute top-6 left-6 bg-white/95 px-3 py-1.5 rounded-xl shadow text-xs font-black uppercase">
                  🌸 {br.name.split(" ")[0]}
                </div>
              </div>

              {/* Info Details (60%) */}
              <div className="lg:w-[60%] p-8 md:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-black uppercase text-[#0F4C81]">{br.name}</h3>
                  <p className="text-slate-500 text-xs mt-2 font-semibold leading-relaxed">{br.address}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600 font-semibold border-y py-6 border-slate-100">
                  <div className="space-y-3">
                    <p>📞 Phone: <span className="font-bold text-slate-800">{br.phone}</span></p>
                    <p>✉️ Email: <a href={`mailto:${br.email}`} className="text-pink-500 hover:underline">{br.email}</a></p>
                    <p>⏰ Hours: <span>{br.hours}</span></p>
                  </div>
                  <div className="space-y-3">
                    <p>👩‍🏫 Principal: <span className="font-bold text-slate-800">{br.principal}</span></p>
                    <p>📝 Admissions: <span className="font-bold text-slate-800">{br.admissions}</span></p>
                  </div>
                </div>

                {/* Map & Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${br.mapQuery}`}
                    target="_blank"
                    className="px-6 py-3 bg-slate-900 hover:bg-pink-500 text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition shadow"
                  >
                    Directions Map
                  </a>
                  <a
                    href={`tel:${br.phone}`}
                    className="px-6 py-3 bg-[#F8FBFF] border border-slate-200 text-slate-700 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-slate-100 transition"
                  >
                    Call Branch
                  </a>
                </div>

              </div>

            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}
