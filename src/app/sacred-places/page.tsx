import Link from 'next/link';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';
import prisma from '@/lib/prisma';
import { SACRED_VEDIS_MASTER } from '@/data/sacredVedisData';
import SacredPlacesClient from './SacredPlacesClient';

export const metadata = {
  title: '45 Sacred Vedis of Gaya Ji | The Complete Pind Daan Holy Shrines Guide',
  description: 'Explore all 45 sacred Vedis of Gaya Ji across Falgu River, Vishnupad 16 Charan Pads, Akshayavat, Pretshila, and Bodhgaya as documented in Vayu Purana.',
};

const db = prisma as any;

export default async function SacredPlacesPage() {
  let places: any[] = [];

  try {
    if (db.sacredPlace) {
      places = await db.sacredPlace.findMany({
        orderBy: { name: 'asc' }
      });
    }
  } catch (err) {
    console.error('Error fetching sacred places from DB:', err);
  }

  // Fallback to master dataset if database is empty
  if (!places || places.length === 0) {
    places = SACRED_VEDIS_MASTER;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2118] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-[1400px] mx-auto space-y-12 sm:space-y-16">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-[800px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EFE6D9] text-[#C6922E] text-xs font-body font-semibold tracking-wider shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>Panchakroshi Gaya Kshetra • 45 पावन वेदी महातीर्थ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-[50px] font-display font-bold tracking-[-0.02em] leading-[1.12]">
            <span className="block text-[#2B2118]">Canonical Pilgrimage Shrines &</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6f1d14] via-[#C6922E] to-[#F48D08]">
              The 45 Sacred Vedis of Gaya Ji
            </span>
          </h1>

          <p className="text-base sm:text-lg font-body text-[#5A5148] leading-relaxed max-w-[700px] mx-auto">
            Every sacred vedi across Falgu River, Vishnupad’s 16 Charan Pads, the eternal Akshayavat, and holy hills holds immutable scriptural merit for ancestral salvation as revealed in the <em>Vayu Purana</em> and <em>Gaya Mahatmya</em>.
          </p>
        </div>

        {/* Dynamic Client Directory with Search & Category Filters */}
        <SacredPlacesClient initialPlaces={places} />

        {/* Bottom CTA Banner */}
        <div className="bg-[#2B2118] text-[#FAF7F2] p-8 sm:p-12 rounded-[24px] text-center max-w-4xl mx-auto space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6922E]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 relative z-10">
            <span className="text-xs uppercase font-body font-semibold tracking-[0.2em] text-[#C6922E]">
              Hassle-Free Pilgrimage Circuit
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white">
              Visiting the Complete 45-Vedi Circuit?
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto font-body leading-relaxed">
              Our verified Teerth Pandas and private AC chauffeurs guide your family smoothly through every sacred altar with authentic Vedic rituals, samagri, and lineage records.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 relative z-10">
            <Link
              href="/packages"
              className="w-full sm:w-auto bg-[#C6922E] hover:bg-[#A97718] text-white px-8 py-4 rounded-[16px] font-body font-semibold text-sm transition-all shadow-sm active:scale-95"
            >
              Explore Tri-Sthali & Full Parikrama Plans
            </Link>
            <Link
              href="/pre-booking"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-[16px] font-body font-semibold text-sm transition-all active:scale-95"
            >
              Pre-Book Consultation
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
