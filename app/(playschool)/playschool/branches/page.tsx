"use client";

import { motion } from "framer-motion";

interface Branch {
  name: string;
  photo: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  principal: string;
  admContact: string;
  mapIframe: string;
  directionsUrl: string;
  themeColor: string;
  textColor: string;
}

export default function PlayschoolBranches() {
  const branches: Branch[] = [
    {
      name: "Gachibowli Campus (Main)",
      photo: "/school1.jpg",
      address: "Plot 42, Telecom Nagar Colony, Gachibowli, Hyderabad, TS - 500032",
      phone: "+91 98765 43210",
      email: "gachibowli.lb@spoorthiacademy.in",
      hours: "08:30 AM - 02:00 PM (Mon - Sat)",
      principal: "Mrs. Mounika Reddy",
      admContact: "+91 98765 43211",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.744158498968!2d78.36195231487771!3d17.42407288805903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f5ff24ee7f%3A0xb6c7dcfdf06b0060!2sGachibowli%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1626659020921!5m2!1sen!2sin",
      directionsUrl: "https://maps.google.com/?q=Gachibowli+Hyderabad+Telangana",
      themeColor: "border-pink-300 bg-pink-50/50",
      textColor: "text-pink-700"
    },
    {
      name: "Kukatpally Campus",
      photo: "/school2.jpg",
      address: "Road No 4, KPHB Phase 6, Kukatpally, Hyderabad, TS - 500072",
      phone: "+91 91234 56780",
      email: "kukatpally.lb@spoorthiacademy.in",
      hours: "08:30 AM - 02:00 PM (Mon - Sat)",
      principal: "Mrs. Saritha Rao",
      admContact: "+91 91234 56781",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.2922119154483!2d78.39659351487869!3d17.4936087880174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c1f5446059%3A0xedc76f629ca889cd!2sKukatpally%20Housing%20Board%20Colony%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1626659050921!5m2!1sen!2sin",
      directionsUrl: "https://maps.google.com/?q=Kukatpally+Hyderabad+Telangana",
      themeColor: "border-sky-300 bg-sky-50/50",
      textColor: "text-sky-700"
    },
    {
      name: "Madhapur Campus",
      photo: "/school3.jpg",
      address: "Building 12, Kavuri Hills Phase 2, Madhapur, Hyderabad, TS - 500081",
      phone: "+91 95500 12345",
      email: "madhapur.lb@spoorthiacademy.in",
      hours: "08:30 AM - 02:00 PM (Mon - Sat)",
      principal: "Mrs. Yaseen Begum",
      admContact: "+91 95500 12346",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4172421295246!2d78.39005951487796!3d17.439735688049187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f24ee7fb%3A0xc3f8e5f7a2ba50a0!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1626659080921!5m2!1sen!2sin",
      directionsUrl: "https://maps.google.com/?q=Madhapur+Hyderabad+Telangana",
      themeColor: "border-yellow-300 bg-yellow-50/50",
      textColor: "text-yellow-700"
    }
  ];

  return (
    <div className="w-full font-['Quicksand'] pb-20">
      
      {/* ========== HERO BANNER ========== */}
      <section className="bg-gradient-to-r from-sky-100 via-pink-100 to-yellow-100 py-16 px-6 text-center border-b-8 border-dashed border-sky-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 text-xs font-black uppercase tracking-widest block mb-2">🌸 LOCATIONS</span>
          <h1 className="text-4xl sm:text-5xl font-['Fredoka'] font-black text-slate-800 mb-4">
            Our Campus Branches
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-500 max-w-xl mx-auto">
            Find a Little Blossoms Play School near you. Visit any of our campuses to witness our nurturing environment firsthand.
          </p>
        </div>
      </section>

      {/* ========== BRANCHES LIST ========== */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        {branches.map((branch, idx) => (
          <motion.div
            key={branch.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-[3rem] border-4 ${branch.themeColor} overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 bg-white`}
          >
            {/* Image Block */}
            <div className="lg:col-span-4 h-64 lg:h-auto overflow-hidden relative">
              <img src={branch.photo} alt={branch.name} className="w-full h-full object-cover" />
            </div>

            {/* Details Block */}
            <div className="p-8 sm:p-12 lg:col-span-5 flex flex-col justify-between text-left">
              <div>
                <h2 className={`font-['Fredoka'] font-black text-2xl ${branch.textColor} mb-6`}>
                  🌸 {branch.name}
                </h2>
                
                <div className="space-y-4 text-xs sm:text-sm font-bold text-gray-600">
                  <p className="flex items-start gap-2.5">
                    <span className="text-lg">📍</span>
                    <span>{branch.address}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <span className="text-lg">📞</span>
                    <span>Phone: {branch.phone}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <span className="text-lg">✉️</span>
                    <span>Email: {branch.email}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <span className="text-lg">⏰</span>
                    <span>Working Hours: {branch.hours}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <span className="text-lg">👩‍🏫</span>
                    <span>Principal: <strong className="text-slate-800">{branch.principal}</strong></span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <span className="text-lg">🔑</span>
                    <span>Admission Helpdesk: <strong className="text-emerald-600">{branch.admContact}</strong></span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                  className="bg-slate-900 text-white font-black text-xs uppercase px-6 py-3 rounded-full hover:bg-slate-800 transition flex items-center gap-1.5"
                >
                  📞 Call Now
                </a>
                <a
                  href={branch.directionsUrl}
                  target="_blank"
                  className="bg-white border-2 border-slate-900 text-slate-900 font-black text-xs uppercase px-6 py-3 rounded-full hover:bg-slate-50 transition flex items-center gap-1.5"
                >
                  🗺️ Get Directions
                </a>
              </div>
            </div>

            {/* Google Map Embedding */}
            <div className="lg:col-span-3 h-64 lg:h-auto border-t lg:border-t-0 lg:border-l border-slate-100">
              <iframe
                src={branch.mapIframe}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "260px" }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

          </motion.div>
        ))}
      </section>

    </div>
  );
}
