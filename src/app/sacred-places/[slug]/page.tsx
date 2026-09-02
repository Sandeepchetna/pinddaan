import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, MapPin, Clock, ArrowLeft, Calendar, Phone } from 'lucide-react';
import prisma from '@/lib/prisma';

const db = prisma as any;

export async function generateStaticParams() {
  try {
    const places = await db.sacredPlace.findMany();
    return places.map((p: any) => ({ slug: p.slug }));
  } catch (err) {
    return [];
  }
}

export default async function SacredPlaceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let place: any = null;

  try {
    place = await db.sacredPlace.findUnique({ where: { slug } });
  } catch (err) {
    // fallback
  }

  if (!place) {
    // Fallback data if DB query fails
    if (slug === 'vishnupad-temple') {
      place = {
        name: 'Vishnupad Temple',
        hindiName: 'विष्णुपद मंदिर',
        tagline: 'Primary Sanctuary of Lord Vishnu Footprint',
        description: 'Housing the 40 cm long footprint of Lord Vishnu embedded in solid basalt rock. The essential sanctuary for ancestral oblations.',
        history: 'Rebuilt by Maharani Ahilyabai Holkar of Indore in 1787, this magnificent stone temple stands on the banks of Falgu River.',
        timings: '5:00 AM - 9:00 PM',
        heroImage: '/images/gaya_vishnupad.jpg'
      };
    } else {
      notFound();
    }
  }

  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        
        <Link href="/sacred-places" className="inline-flex items-center gap-2 text-xs font-bold text-[#F48D08] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to All Sacred Places
        </Link>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-amber-900/10 overflow-hidden shadow-sm space-y-6">
          <div className="h-80 sm:h-96 relative bg-gray-200">
            <img src={place.heroImage} alt={place.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
              <span className="bg-[#F48D08] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {place.hindiName || 'गया तीर्थ'}
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold">{place.name}</h1>
              {place.tagline && <p className="text-gray-200 text-xs sm:text-sm">{place.tagline}</p>}
            </div>
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-gray-100 text-xs">
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                <Clock className="w-5 h-5 text-[#F48D08]" />
                <div>
                  <p className="font-bold text-gray-500 text-[10px]">VISITING TIMINGS</p>
                  <p className="font-bold text-text-primary">{place.timings || '5:00 AM - 9:00 PM'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                <MapPin className="w-5 h-5 text-[#F48D08]" />
                <div>
                  <p className="font-bold text-gray-500 text-[10px]">LOCATION</p>
                  <p className="font-bold text-text-primary">Gaya Ji City Center</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-[#F48D08]" />
                <div>
                  <p className="font-bold text-gray-500 text-[10px]">PANDA ASSISTANCE</p>
                  <p className="font-bold text-text-primary">Verified Lineage Pandas</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-text-primary">Sacred Significance & Ritual Rites</h2>
              <p className="text-text-secondary text-sm leading-relaxed">{place.description}</p>
            </div>

            {place.history && (
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-xl font-serif font-bold text-text-primary">Historical & Scriptural Heritage</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{place.history}</p>
              </div>
            )}

            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h4 className="font-serif font-bold text-sm">Need Panda Guidance at {place.name}?</h4>
                <p className="text-xs text-text-secondary">Pre-book your sacred rites with complete peace of mind.</p>
              </div>
              <Link href="/pre-booking" className="bg-[#F48D08] hover:bg-[#D97706] text-white px-8 py-3 rounded-full font-bold text-xs transition-colors shadow">
                Pre-Book Ritual Rites
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
