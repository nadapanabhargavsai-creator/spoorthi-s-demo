import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* MAIN GRID */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* BRAND */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white overflow-hidden shadow-sm border border-gray-800">
                <img src="/logo.png" alt="Spoorthi's Academy Telangana Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">
                  Spoorthi's <span className="text-red-500">Academy</span>
                </h3>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  స్పూర్తిస్ అకాడమీ
                </p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Hyderabad's premier educational institution, nurturing young minds from Nursery to 7th Grade with excellence in education and entertainment since 2020.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-black transition font-bold">f</a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-black transition font-bold text-xs">ig</a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-black transition font-bold text-xs">yt</a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-yellow-500">Quick Links</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <Link href="/about" className="block hover:text-white transition">About Us</Link>
              <Link href="/programs" className="block hover:text-white transition">Academics</Link>
              <Link href="/admissions" className="block hover:text-white transition">Admissions</Link>
              <Link href="/gallery" className="block hover:text-white transition">Gallery</Link>
              <Link href="/facilities" className="block hover:text-white transition">Facilities</Link>
              <Link href="/careers" className="block hover:text-white transition">Careers</Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-yellow-500">Contact</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div>
                <p className="text-white font-bold text-xs uppercase mb-1">Address</p>
                <p>Road No. 14, Papi Reddy Nagar, Hyderabad 500037</p>
              </div>
              <div>
                <p className="text-white font-bold text-xs uppercase mb-1">Phone</p>
                <a href="tel:+919381377301" className="hover:text-yellow-500">+91 93813 77301</a>
              </div>
              <div>
                <p className="text-white font-bold text-xs uppercase mb-1">Hours</p>
                <p>Mon – Sat: 8:00 AM – 4:00 PM</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Spoorthi's Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
