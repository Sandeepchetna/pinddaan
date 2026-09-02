import Link from 'next/link';
import { MapPin, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata = {
  title: '9 Sacred Places of Gaya Ji | Pind Daan Holy Shrines Guide',
  description: 'Explore Vishnupad Temple, Falgu River, Akshayavat, Pretshila, Ramshila, Brahmayoni, Mangla Gauri, Dharmaranya, and Gayasur Temple.',
};

const SACRED_PLACES = [
  {
    slug: 'vishnupad-temple',
    name: 'Vishnupad Temple',
    hindiName: 'विष्णुपद मंदिर',
    tagline: 'Primary Shrine of Lord Vishnu Footprint',
    description: 'Housing the 40 cm long footprint of Lord Vishnu embedded in solid basalt rock. The essential shrine for Pind Daan.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800',
    category: 'Primary Shrine',
    timings: '5:00 AM - 9:00 PM'
  },
  {
    slug: 'falgu-river',
    name: 'Falgu River',
    hindiName: 'फल्गु नदी',
    tagline: 'Sacred Subterranean River of Sita Mata Blessing',
    description: 'The holy river cursed by Sita Mata to flow underground. Sand Pind offerings made on its banks carry supreme merit.',
    image: 'https://images.unsplash.com/photo-1598322312674-8d48cecb1212?auto=format&fit=crop&q=80&w=800',
    category: 'Holy River',
    timings: 'Open 24 Hours'
  },
  {
    slug: 'akshayavat',
    name: 'Akshayavat Banyan Tree',
    hindiName: 'अक्षयवट',
    tagline: 'Immortal Tree of Eternal Salvation',
    description: 'The undying banyan tree blessed by Sita Mata. Completing the Pind Daan ritual here grants eternal peace to ancestors.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
    category: 'Immortal Tree',
    timings: '6:00 AM - 7:00 PM'
  },
  {
    slug: 'pretshila',
    name: 'Pretshila Hill',
    hindiName: 'प्रेतशिला पहाड़ी',
    tagline: 'Hill of Unfulfilled Souls Relief',
    description: 'Located 8 km from Gaya city, this sacred hill is dedicated to liberating ancestors who died unnatural deaths.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    category: 'Sacred Hill',
    timings: '6:00 AM - 5:00 PM'
  },
  {
    slug: 'ramshila',
    name: 'Ramshila Hill',
    hindiName: 'रामशिला पहाड़ी',
    tagline: 'Shrine Built by Lord Rama',
    description: 'According to tradition, Lord Rama himself offered Pind Daan here for King Dasharatha at the Rameshwaram Mahadev shrine.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800',
    category: 'Sacred Hill',
    timings: '6:00 AM - 6:00 PM'
  },
  {
    slug: 'mangla-gauri',
    name: 'Mangla Gauri Temple',
    hindiName: 'मंगला गौरी मंदिर',
    tagline: '18th Shaktipeeth of Goddess Durga',
    description: 'One of the 18 Mahashaktipeeths where a part of Sati Mata fell. Pilgrims visit here for ancestral and marital blessings.',
    image: 'https://images.unsplash.com/photo-1598322312674-8d48cecb1212?auto=format&fit=crop&q=80&w=800',
    category: 'Shaktipeeth',
    timings: '5:00 AM - 10:00 PM'
  }
];

export default function SacredPlacesPage() {
  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">Sacred Sites Directory</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold">9 Holy Sites of Gaya Ji</h1>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Every sacred spot in Gaya Ji holds unique scriptural merit for ancestral rites, as documented in the Vayu Purana.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SACRED_PLACES.map((place) => (
            <div key={place.slug} className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden flex flex-col justify-between group">
              <div className="h-56 overflow-hidden relative">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-text-primary">
                  {place.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-xl font-bold text-text-primary">{place.name}</h3>
                    <span className="text-xs text-accent-copper font-serif font-semibold">{place.hindiName}</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{place.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                  <span className="text-text-secondary flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent-gold" /> {place.timings}
                  </span>
                  <Link 
                    href={`/sacred-places/${place.slug}`}
                    className="text-accent-gold font-bold flex items-center gap-1 hover:text-accent-copper"
                  >
                    <span>Visitor Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-text-primary text-temple-ivory p-10 rounded-3xl text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">Visiting All Sacred Shrines?</h2>
          <p className="text-gray-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Our Tri-Sthali and 1-Day Packages include private AC transport between Vishnupad, Falgu, Akshayavat, and Pretshila.
          </p>
          <Link href="/packages" className="inline-block bg-accent-gold hover:bg-white text-text-primary px-8 py-3.5 rounded-full font-bold text-sm transition-colors">
            Explore Pilgrimage Packages
          </Link>
        </div>

      </div>
    </div>
  );
}
