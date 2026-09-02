import Link from 'next/link';
import { ChevronRight, Flower2, Landmark, Calendar, MapPin } from 'lucide-react';

export default function VishnupadShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-[#FAF5ED] border border-amber-900/10 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Vishnupad Temple Photo with Badge */}
          <div className="lg:col-span-7 h-[360px] sm:h-[420px] rounded-2xl overflow-hidden relative shadow-md">
            <img 
              src="/images/gaya_vishnupad.jpg" 
              alt="Vishnupad Temple Sacred Architecture" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/20">
              Sacred Heritage of Gaya Ji
            </div>
          </div>

          {/* Right Column: About Vishnupad Temple Title & 4 Quick Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Description */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#6f1d14] tracking-tight">
                About Vishnupad Temple
              </h2>
              <div className="flex items-center gap-2 text-[#C6922E]">
                <div className="h-[2px] w-12 bg-[#C6922E]" />
                <span className="text-xs font-serif font-bold">◇</span>
                <div className="h-[2px] w-12 bg-[#C6922E]" />
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-1">
                Discover the sacred history of Vishnupad Temple, the spiritual traditions of Pinddaan and the timeless pilgrimage heritage of Gaya Ji.
              </p>
            </div>

            {/* 4 Interactive Quick Cards matching bihar.gov.in */}
            <div className="space-y-3">
              
              {/* Card 1 */}
              <Link 
                href="/gaya-ji"
                className="group flex items-center justify-between p-4 bg-white hover:bg-amber-50 rounded-2xl border border-amber-900/10 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#6f1d14] text-white flex items-center justify-center shrink-0">
                    <Flower2 className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-sm text-text-primary group-hover:text-[#6f1d14] transition-colors">
                    About Pinddaan Gaya Ji
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#6f1d14] group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Card 2 */}
              <Link 
                href="/sacred-places/vishnupad-temple"
                className="group flex items-center justify-between p-4 bg-white hover:bg-amber-50 rounded-2xl border border-amber-900/10 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#C6922E] text-white flex items-center justify-center shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-sm text-text-primary group-hover:text-[#C6922E] transition-colors">
                    About Vishnupad
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#C6922E] group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Card 3 */}
              <Link 
                href="/blog/why-pind-daan-is-performed-only-at-gaya-ji"
                className="group flex items-center justify-between p-4 bg-white hover:bg-amber-50 rounded-2xl border border-amber-900/10 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#A65F2A] text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-sm text-text-primary group-hover:text-[#A65F2A] transition-colors">
                    Importance of Pitripaksh
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#A65F2A] group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Card 4 */}
              <Link 
                href="/gaya-ji"
                className="group flex items-center justify-between p-4 bg-white hover:bg-amber-50 rounded-2xl border border-amber-900/10 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#8C2318] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-sm text-text-primary group-hover:text-[#8C2318] transition-colors">
                    Gaya Ji Pilgrimage
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#8C2318] group-hover:translate-x-1 transition-all" />
              </Link>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
