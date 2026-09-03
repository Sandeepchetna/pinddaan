import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, MapPin, Clock, ArrowLeft, Calendar, Phone, Sparkles, BookOpen } from 'lucide-react';
import prisma from '@/lib/prisma';
import { SACRED_VEDIS_MASTER } from '@/data/sacredVedisData';

const db = prisma as any;

export async function generateStaticParams() {
  try {
    let places: any[] = [];
    if (db.sacredPlace) {
      places = await db.sacredPlace.findMany();
    }
    if (!places || places.length === 0) {
      return SACRED_VEDIS_MASTER.map((p) => ({ slug: p.slug }));
    }
    return places.map((p: any) => ({ slug: p.slug }));
  } catch (err) {
    return SACRED_VEDIS_MASTER.map((p) => ({ slug: p.slug }));
  }
}

export default async function SacredPlaceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let place: any = null;

  try {
    if (db.sacredPlace) {
      place = await db.sacredPlace.findUnique({ where: { slug } });
    }
  } catch (err) {
    // fallback
  }

  // Fallback to master dataset
  if (!place) {
    place = SACRED_VEDIS_MASTER.find((p) => p.slug === slug);
  }

  if (!place) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2118] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-[1100px] mx-auto space-y-8 sm:space-y-10">
        
        {/* Back Navigation */}
        <Link 
          href="/sacred-places" 
          className="inline-flex items-center gap-2 text-xs font-body font-semibold text-[#C6922E] hover:text-[#A97718] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> 
          <span>Back to All 45 Sacred Vedis</span>
        </Link>

        {/* Hero Card */}
        <div className="bg-white rounded-[24px] border border-[#EFE6D9] overflow-hidden shadow-sm space-y-6">
          
          {/* Hero Image Container */}
          <div className="h-80 sm:h-[440px] relative bg-stone-100">
            <img 
              src={place.heroImage || '/images/gaya_vishnupad.jpg'} 
              alt={place.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 space-y-3 text-white">
              <div className="flex items-center gap-2 flex-wrap">
                {place.hindiName && (
                  <span className="bg-[#C6922E] text-white text-xs font-semibold px-3.5 py-1 rounded-full font-hindi shadow-sm">
                    {place.hindiName}
                  </span>
                )}
                <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-body font-medium px-3 py-1 rounded-full border border-white/20">
                  Gaya Ji Sacred Circuit
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight">
                {place.name}
              </h1>

              {place.tagline && (
                <p className="text-stone-200 text-xs sm:text-sm font-body max-w-2xl leading-relaxed">
                  {place.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Details & Guide Body */}
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-[#EFE6D9] text-xs font-body">
              <div className="flex items-center gap-3 p-4 bg-[#FAF7F2] rounded-[16px] border border-[#EFE6D9]">
                <Clock className="w-5 h-5 text-[#C6922E] shrink-0" />
                <div>
                  <p className="font-semibold text-[#7A736A] text-[10.5px] uppercase tracking-wider">VISITING TIMINGS</p>
                  <p className="font-bold text-[#2B2118] mt-0.5">{place.timings || '5:00 AM - 8:00 PM'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#FAF7F2] rounded-[16px] border border-[#EFE6D9]">
                <MapPin className="w-5 h-5 text-[#C6922E] shrink-0" />
                <div>
                  <p className="font-semibold text-[#7A736A] text-[10.5px] uppercase tracking-wider">SACRED SECTOR</p>
                  <p className="font-bold text-[#2B2118] mt-0.5">{place.location || 'Gaya Ji Sacred Kshetra'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#FAF7F2] rounded-[16px] border border-[#EFE6D9]">
                <ShieldCheck className="w-5 h-5 text-[#C6922E] shrink-0" />
                <div>
                  <p className="font-semibold text-[#7A736A] text-[10.5px] uppercase tracking-wider">HEREDITARY GUIDANCE</p>
                  <p className="font-bold text-[#2B2118] mt-0.5">Verified Teerth Panda</p>
                </div>
              </div>
            </div>

            {/* Sacred Significance */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-body font-semibold text-[#C6922E] inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ritual Significance & Vidhi</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#2B2118]">
                Sacred Merits & Oblation Vidhi
              </h2>
              <p className="text-[#5A5148] font-body text-sm sm:text-base leading-relaxed">
                {place.description}
              </p>
            </div>

            {/* Scriptural History */}
            {place.history && (
              <div className="space-y-3 pt-6 border-t border-[#EFE6D9]">
                <span className="text-xs uppercase tracking-[0.2em] font-body font-semibold text-[#C6922E] inline-flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Scriptural Context • Vayu Purana</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#2B2118]">
                  Historical & Puranic Evidence
                </h3>
                <div className="p-5 rounded-[16px] bg-[#FAF7F2] border border-[#EFE6D9] text-[#5A5148] font-body text-sm leading-relaxed italic">
                  "{place.history}"
                </div>
              </div>
            )}

            {/* Visitor Info */}
            {place.visitorInfo && (
              <div className="p-4 rounded-[16px] bg-amber-50/60 border border-amber-200/70 text-xs font-body text-[#7B4E13] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C6922E] shrink-0" />
                <span><strong>Pilgrim Guide:</strong> {place.visitorInfo}</span>
              </div>
            )}

            {/* Bottom Booking Strip */}
            <div className="pt-6 border-t border-[#EFE6D9] flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#FAF7F2] p-6 rounded-[20px] border">
              <div>
                <h4 className="font-display font-bold text-lg text-[#2B2118]">
                  Need Purohit & Samagri Assistance at {place.name}?
                </h4>
                <p className="text-xs font-body text-[#5A5148] mt-0.5">
                  Pre-book authentic Vedic rites with fixed dakshina, AC transit, and lineage registration.
                </p>
              </div>
              <Link 
                href="/pre-booking" 
                className="w-full sm:w-auto shrink-0 bg-[#C6922E] hover:bg-[#A97718] text-white px-7 py-3.5 rounded-[16px] font-body font-semibold text-xs transition-all shadow-sm active:scale-95 text-center"
              >
                Pre-Book Ritual at {place.name} →
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
