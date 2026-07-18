"use client";

import Link from "next/link";
import { useState } from "react";
import { usePlayschoolDb } from "../context/PlayschoolDb";

export default function PlayschoolFooter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);
  const { subscribeNewsletter } = usePlayschoolDb();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const res = subscribeNewsletter(email);
    setSuccess(res.success);
    setMessage(res.message);
    if (res.success) {
      setEmail("");
    }
    setTimeout(() => {
      setMessage("");
      setSuccess(null);
    }, 4000);
  };

  return (
    <footer className="relative bg-gradient-to-b from-sky-100 to-sky-200 pt-16 pb-8 border-t-8 border-dashed border-sky-300 font-['Quicksand'] text-gray-700">
      {/* Decorative Wave Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] fill-current text-sky-100">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,55.05,18.47,84,26.09,144.13,42,206.14,64.21,321.39,56.44Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-['Fredoka'] font-black bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
            🌸 Little Blossoms
          </h3>
          <p className="text-sm font-medium leading-relaxed mb-4">
            A premium nurturing space where tiny tots discover the joy of learning. Through play, exploration, and creative expression, we lay a strong foundation for lifelong curiosity.
          </p>
          <div className="flex gap-3 text-lg">
            <span className="cursor-pointer hover:scale-125 transition">Facebook</span>
            <span className="cursor-pointer hover:scale-125 transition">Instagram</span>
            <span className="cursor-pointer hover:scale-125 transition">Twitter</span>
            <span className="cursor-pointer hover:scale-125 transition">YouTube</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-['Fredoka'] font-black text-pink-600 mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm font-bold">
            <li><Link href="/playschool" className="hover:text-pink-500 transition">Home</Link></li>
            <li><Link href="/playschool/about" className="hover:text-pink-500 transition">About Us</Link></li>
            <li><Link href="/playschool/programs" className="hover:text-pink-500 transition">Programs</Link></li>
            <li><Link href="/playschool/admissions" className="hover:text-pink-500 transition">Admissions</Link></li>
            <li><Link href="/playschool/gallery" className="hover:text-pink-500 transition">Gallery</Link></li>
            <li><Link href="/playschool/facilities" className="hover:text-pink-500 transition">Campus Facilities</Link></li>
          </ul>
        </div>

        {/* Contact Info / Branches */}
        <div>
          <h4 className="text-lg font-['Fredoka'] font-black text-emerald-600 mb-4">Our Branches</h4>
          <ul className="space-y-3.5 text-sm font-medium">
            <li>
              <span className="font-bold text-emerald-700 block">🌸 Gachibowli Campus</span>
              <span className="text-xs text-gray-500">Telecom Nagar, Hyderabad, TS - 500032</span>
            </li>
            <li>
              <span className="font-bold text-emerald-700 block">🌸 Kukatpally Campus</span>
              <span className="text-xs text-gray-500">KPHB Colony, Hyderabad, TS - 500072</span>
            </li>
            <li>
              <span className="font-bold text-emerald-700 block">🌸 Madhapur Campus</span>
              <span className="text-xs text-gray-500">Kavuri Hills, Hyderabad, TS - 500081</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="text-lg font-['Fredoka'] font-black text-orange-600 mb-4">Newsletter</h4>
          <p className="text-xs font-semibold leading-relaxed mb-4">
            Subscribe to get fun children activities tips, event updates, and admission notices.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address..."
              required
              className="w-full px-4 py-2.5 rounded-full border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/70 text-sm font-medium"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-orange-400 hover:from-pink-500 hover:to-orange-500 text-white font-black text-xs uppercase tracking-wider py-2.5 rounded-full shadow-md transition"
            >
              Subscribe
            </button>
          </form>

          {message && (
            <p className={`text-[11px] font-bold mt-2.5 p-1 px-3.5 rounded-lg inline-block ${success ? "bg-emerald-500/10 text-emerald-700" : "bg-pink-500/10 text-pink-700"}`}>
              {message}
            </p>
          )}
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 border-t-2 border-dashed border-sky-300 mt-10 pt-6 text-center text-xs font-bold text-gray-500">
        <p>© {new Date().getFullYear()} Little Blossoms Play School. All rights reserved.</p>
        <p className="mt-1 text-[10px] text-sky-600">Part of the Spoorthi's Academy Educational Franchise.</p>
      </div>
    </footer>
  );
}
