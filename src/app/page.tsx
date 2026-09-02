import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  HeartHandshake, 
  Clock,
  ChevronRight,
  Phone,
  HelpCircle,
  Star,
  Compass,
  FileText,
  Video,
  Car,
  Hotel,
  Flame,
  PlaneTakeoff,
  Sparkles
} from 'lucide-react';
import prisma from '@/lib/prisma';
import HeroSlider from '@/components/home/HeroSlider';
import VishnupadShowcase from '@/components/home/VishnupadShowcase';
import PackageCard from '@/components/packages/PackageCard';

const db = prisma as any;

export default async function HomePage() {
  // Fetch Dynamic Hero Slides, Sacred Places & Packages from Live Hostinger MySQL Database
  let heroSlides: any[] = [];
  let sacredPlaces: any[] = [];
  let packages: any[] = [];
  let testimonials: any[] = [];

  try {
    if (db.heroSlide) {
      heroSlides = await db.heroSlide.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' }
      });
    }
    if (db.sacredPlace) {
      sacredPlaces = await db.sacredPlace.findMany({ take: 4 });
    }
    if (db.ritualPackage) {
      packages = await db.ritualPackage.findMany({ orderBy: { createdAt: 'desc' } });
    }
    if (db.testimonial) {
      testimonials = await db.testimonial.findMany({ where: { status: 'APPROVED' }, take: 3 });
    }
  } catch (err) {
    // fallback
  }

  // Default fallback if no slides created yet
  if (heroSlides.length === 0) {
    heroSlides = [
      {
        id: 'default-1',
        title: 'Fulfill Your Eternal Duty to Your Ancestors',
        subtitle: 'Experience complete peace of mind at holy Gaya Ji. Guided by authentic, verified Teerth Pandas with transparent Vedic rites at Vishnupad Temple & Falgu River.',
        mediaType: 'IMAGE',
        mediaUrl: '/images/hero_cinematic.jpg',
        ctaLabel: 'Begin Your Sacred Journey',
        ctaLink: '/pre-booking',
        secondaryCtaLabel: 'Explore Gaya Ji Heritage',
        secondaryCtaLink: '/gaya-ji'
      }
    ];
  }

  // Fallback for sacred places if DB empty
  if (sacredPlaces.length === 0) {
    sacredPlaces = [
      {
        id: 'sp-1',
        slug: 'vishnupad-temple',
        name: 'Vishnupad Temple',
        hindiName: 'विष्णुपद मंदिर',
        description: 'Housing the 40 cm long footprint of Lord Vishnu embedded in solid basalt rock. The essential sanctuary for ancestral oblations.',
        heroImage: '/images/gaya_vishnupad.jpg'
      },
      {
        id: 'sp-2',
        slug: 'falgu-river',
        name: 'Falgu River & Sita Kund',
        hindiName: 'फल्गु नदी',
        description: 'The holy river cursed by Sita Mata to flow underground. Sand Pind offerings made on its banks carry supreme ancestral merit.',
        heroImage: '/images/pind_daan_vidhi.jpg'
      },
      {
        id: 'sp-3',
        slug: 'akshayavat',
        name: 'Akshayavat Banyan Tree',
        hindiName: 'अक्षयवट',
        description: 'The undying banyan tree blessed by Sita Mata. Completing the Pind Daan ritual here grants eternal peace to ancestors.',
        heroImage: '/images/akshay_vat.jpg'
      },
      {
        id: 'sp-4',
        slug: 'pretshila',
        name: 'Pretshila Hill',
        hindiName: 'प्रेतशिला पहाड़ी',
        description: 'Located 8 km from Gaya city, this sacred hill is dedicated to liberating ancestors who died unnatural deaths.',
        heroImage: '/images/gaya_drone.jpg'
      }
    ];
  }

  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary space-y-16 sm:space-y-24 pb-16">
      
      {/* Dynamic Hero Slider (Image & Video Support) */}
      <HeroSlider slides={heroSlides} />

      {/* About Vishnupad Temple Showcase Section (Matching bihar.gov.in Screenshot) */}
      <VishnupadShowcase />

      {/* Trust & Reassurance Ribbon */}
      <section className="bg-white border-y border-amber-900/10 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-temple-alt/40 border border-amber-900/10">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-[#F48D08] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-text-primary">Verified Teerth Pandas</h4>
              <p className="text-xs text-text-secondary">Authentic gotra lineage records at Vishnupad Temple.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-temple-alt/40 border border-amber-900/10">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-[#F48D08] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-text-primary">No Mid-Ritual Bargaining</h4>
              <p className="text-xs text-text-secondary">100% transparent pricing confirmed before arrival.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-temple-alt/40 border border-amber-900/10">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-[#F48D08] shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-text-primary">Senior Citizen Care</h4>
              <p className="text-xs text-text-secondary">E-rickshaw & wheelchair assistance at Falgu Ghats.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Devotee Journey (Exact Pilgrimage Flow) */}
      <section className="bg-white py-20 px-4 border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F48D08]">Complete Doorstep Assistance</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-text-primary">
              How Your Sacred Journey Works
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              From station/airport pickup to hotel transfer, ritual sites, and safe departure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            
            <div className="space-y-4 text-center p-6 bg-temple-ivory/60 rounded-3xl border border-amber-900/10 relative">
              <div className="w-12 h-12 rounded-2xl bg-[#F48D08] text-white font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-md">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-text-primary">Online Pre-Booking</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Select your pilgrimage date, gotra, and travel details via our online booking engine.
              </p>
            </div>

            <div className="space-y-4 text-center p-6 bg-temple-ivory/60 rounded-3xl border border-amber-900/10 relative">
              <div className="w-12 h-12 rounded-2xl bg-[#F48D08] text-white font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-md">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-text-primary">Station / Airport Pickup</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Private AC cab receives you at Gaya Junction (GAYA) Railway Station or Gaya/Patna Airport.
              </p>
            </div>

            <div className="space-y-4 text-center p-6 bg-temple-ivory/60 rounded-3xl border border-amber-900/10 relative">
              <div className="w-12 h-12 rounded-2xl bg-[#F48D08] text-white font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-md">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-text-primary">Hotel Check-In & Rest</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Escorted to your pre-booked comfortable hotel for check-in, refreshment, and sacred preparation.
              </p>
            </div>

            <div className="space-y-4 text-center p-6 bg-temple-ivory/60 rounded-3xl border border-amber-900/10 relative">
              <div className="w-12 h-12 rounded-2xl bg-[#F48D08] text-white font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-md">
                4
              </div>
              <h3 className="font-serif font-bold text-base text-text-primary">Ritual Sites Escort</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Cab takes you to Vishnupad Temple, Falgu River & Akshayavat where your Teerth Panda conducts Pind Daan.
              </p>
            </div>

            <div className="space-y-4 text-center p-6 bg-temple-ivory/60 rounded-3xl border border-amber-900/10 relative">
              <div className="w-12 h-12 rounded-2xl bg-[#F48D08] text-white font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-md">
                5
              </div>
              <h3 className="font-serif font-bold text-base text-text-primary">Safe Departure Drop</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                After lineage registration and prasadam, cab drops you back safely to hotel, station, or airport.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 45-Vedi Sacred Shrines Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-amber-900/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F48D08]">Scriptural Destinations</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
              Sacred Shrines & 45-Vedi Circuit of Gaya Ji
            </h2>
          </div>
          <Link href="/sacred-places" className="text-[#F48D08] hover:text-[#D97706] font-bold text-sm flex items-center gap-1">
            View All 45 Shrines <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sacredPlaces.map((place) => (
            <div key={place.id || place.slug} className="bg-white rounded-3xl overflow-hidden border border-amber-900/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img src={place.heroImage} alt={place.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {place.hindiName || 'गया जी'}
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-lg text-text-primary">{place.name}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">{place.description}</p>
                </div>
                <Link href={`/sacred-places/${place.slug}`} className="inline-flex items-center gap-1 text-[#F48D08] font-bold text-xs pt-2">
                  <span>Explore Shrine Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Prominent Button to go to Sacred Places Page */}
        <div className="pt-4 text-center">
          <Link 
            href="/sacred-places"
            className="inline-flex items-center gap-2 bg-[#F48D08] hover:bg-[#D97706] text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Explore All 45 Sacred Shrines of Gaya Ji</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* Curated Ritual Packages Showcase with Inline BASIC & GOLD Switchers */}
      <section className="py-12 px-4 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#F48D08]">Transparent Pricing</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-text-primary">
            Curated Pind Daan Packages
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Choose between <strong>BASIC PLAN</strong> for essential rites or <strong>GOLD VIP PLAN</strong> for complete VIP chauffeur pickup, 3-star hotel stay & senior Teerth Panda care.
          </p>
        </div>

        {/* Dynamic Package Cards (Top 3 Featured) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(packages.length > 0 ? packages.slice(0, 3) : [
            {
              slug: '1-day-essential-pind-daan',
              title: '1-Day Essential Pind Daan',
              duration: '1 Day (Approx 4-5 Hours)',
              priceINR: 4500,
              goldPriceINR: 7500,
              badge: 'MOST POPULAR',
              shortDesc: 'Ideal for devotees visiting Gaya Ji for a single day to perform essential rites at Vishnupad Temple & Falgu River.',
              inclusions: 'Verified Vishnupad Temple Teerth Panda\nComplete Vedic Samagri\nFalgu River & Vishnupad Temple Rites\nAncestral Lineage Registration',
              goldInclusions: 'VIP Senior Lineage Teerth Panda\nPrivate AC Cab Station/Hotel Pickup & Drop\n3-Star Deluxe Hotel Accommodations\nVIP Priority Temple Darshan Access'
            },
            {
              slug: '3-day-complete-tri-sthali',
              title: '3-Day Complete 45-Vedi Trail',
              duration: '3 Days / 2 Nights',
              priceINR: 12500,
              goldPriceINR: 18500,
              badge: 'RECOMMENDED',
              shortDesc: 'Comprehensive pilgrimage covering Vishnupad, Falgu River, Akshayavat Banyan, Pretshila, and Ramshila.',
              inclusions: 'Dedicated Vishnupad Teerth Panda Escort\n2 Nights Hotel Accommodation\nPrivate AC Station Pickup & Drop\nAll 45-Vedi Sacred Site Visits',
              goldInclusions: 'VIP Senior Lineage Teerth Panda Escort\n2 Nights 3-Star AC Deluxe Hotel Stay + Meals\nPrivate Chauffeur AC SUV Transport\nOfficial Gold Lineage Certificate'
            },
            {
              slug: 'nri-remote-live-stream',
              title: 'NRI Remote Live Stream Pind Daan',
              duration: 'Remote Live Stream (2 Hours)',
              priceINR: 8500,
              goldPriceINR: 14500,
              badge: 'NRI SPECIAL',
              shortDesc: 'For devotees abroad. Live 4K Zoom stream from Falgu River with sacred prasadam shipped globally to USA/UK.',
              inclusions: 'Dedicated 4K HD Live Stream on Zoom\nName & Gotra Recitation during Sankalp\nHigh-Definition Recording Provided\nSacred Prasadam Shipped Overseas',
              goldInclusions: 'Exclusive 1-on-1 Private 4K Live Stream\nFull Ancestral Recitation of 3 Generations\nPersonalized Sankalp Video Recording\nVIP Prasadam Box Express Shipped Overseas'
            }
          ]).map((pkg) => (
            <PackageCard key={pkg.id || pkg.slug} pkg={pkg} />
          ))}
        </div>

        {/* PROMINENT BUTTON BELOW 3 FEATURED PACKAGES TO SEE ALL PACKAGES */}
        <div className="pt-4 text-center">
          <Link 
            href="/packages"
            className="inline-flex items-center gap-2 bg-[#F48D08] hover:bg-[#D97706] text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Explore All Pind Daan Packages ({packages.length > 0 ? packages.length : 3})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Devotee Reviews Section */}
      <section className="bg-temple-alt/60 py-20 px-4 border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F48D08]">Devotee Testimonials</span>
            <h2 className="text-3xl font-serif font-bold text-text-primary">What Pilgrims Say About PindDaanWale</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-4">
                <div className="flex text-[#F48D08] gap-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-text-secondary leading-relaxed italic">&quot;{t.content}&quot;</p>
                <div className="pt-2 border-t border-gray-100">
                  <h4 className="font-bold text-sm text-text-primary">{t.author}</h4>
                  <p className="text-[11px] text-gray-400">{t.city} • {t.ritual}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* District Helplines Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white p-8 rounded-3xl border border-amber-900/10 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs uppercase font-bold text-[#F48D08]">Official Gaya Ji Helpdesk</span>
            <h3 className="text-2xl font-serif font-bold text-text-primary">Need Assistance Planning Your Visit?</h3>
            <p className="text-xs text-text-secondary">Speak directly with our Gaya Ji Temple coordination team.</p>
          </div>
          <a href="tel:+917463055338" className="bg-[#F48D08] hover:bg-[#D97706] text-white px-8 py-3.5 rounded-full font-bold text-xs transition-colors flex items-center gap-2 shrink-0">
            <Phone className="w-4 h-4" /> Call +91 7463055338
          </a>
        </div>
      </section>

    </div>
  );
}
