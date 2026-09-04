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
import { getCachedData } from '@/lib/dbCache';
import HeroSlider from '@/components/home/HeroSlider';
import VishnupadShowcase from '@/components/home/VishnupadShowcase';
import PackageCard from '@/components/packages/PackageCard';
import DevoteeVideoShowcase from '@/components/home/DevoteeVideoShowcase';
import VedicDiagnosticBanner from '@/components/home/VedicDiagnosticBanner';

const db = prisma as any;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // Fetch Dynamic Hero Slides, Sacred Places & Packages live from Database
  let heroSlides: any[] = [];
  let sacredPlaces: any[] = [];
  let packages: any[] = [];
  let testimonials: any[] = [];

  try {
    heroSlides = db.heroSlide 
      ? await db.heroSlide.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }) 
      : [];
    
    let rawPlaces = db.sacredPlace 
      ? await db.sacredPlace.findMany({ take: 8 }) 
      : [];
    if (rawPlaces && rawPlaces.length > 0) {
      const priorityOrder = ['falgu-river', 'vishnupad-temple', 'akshayavat', 'pretshila'];
      sacredPlaces = [...rawPlaces].sort((a: any, b: any) => {
        const aIdx = priorityOrder.findIndex(s => a.slug === s || a.slug?.includes(s));
        const bIdx = priorityOrder.findIndex(s => b.slug === s || b.slug?.includes(s));
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        return 0;
      }).slice(0, 4);
    }

    packages = db.ritualPackage 
      ? await db.ritualPackage.findMany() 
      : [];

    // Explicit custom sort: 1-Day, 3-Day, Tripindi, then Narayan Bali
    const getPkgRank = (pkg: any) => {
      const s = ((pkg.slug || '') + ' ' + (pkg.title || '')).toLowerCase();
      if (s.includes('1-day') || s.includes('1 day')) return 1;
      if (s.includes('3-day') || s.includes('3 day')) return 2;
      if (s.includes('tripindi') || s.includes('pitidosh')) return 3;
      if (s.includes('narayan')) return 4;
      return 5;
    };
    packages = [...packages].sort((a, b) => getPkgRank(a) - getPkgRank(b));
    
    testimonials = db.testimonial 
      ? await db.testimonial.findMany({ where: { status: 'APPROVED' }, take: 3 }) 
      : [];
  } catch (err) {
    // fallback handled below
  }

  // Ensure both authentic holy temple hero slides are always present
  if (heroSlides.length < 2) {
    heroSlides = [
      {
        id: 'slide-1',
        badge: 'GAYA JI SACRED PILGRIMAGE • VISHNUPAD TEERTH',
        title: 'Sacred Pind Daan At Vishnupad Temple & Falgu River',
        subtitle: 'Authentic gotra recitation, verified lineage pandas, and transparent fixed dakshina. Dedicated care for senior citizens and NRI families.',
        mediaType: 'IMAGE',
        mediaUrl: '/images/hero_cinematic.jpg',
        ctaLabel: 'View Ritual Packages',
        ctaLink: '/packages',
        secondaryCtaLabel: 'Learn 45-Vedi Trail',
        secondaryCtaLink: '/gaya-ji'
      },
      {
        id: 'slide-2',
        badge: 'PITRUPAKSHA MELA 2026 • HOLY GAYA JI',
        title: 'Fulfill Your Eternal Duty To Your Ancestors',
        subtitle: 'Experience complete peace of mind at holy Gaya Ji. Guided by authentic, verified Teerth Pandas with transparent Vedic rites at Vishnupad Temple & Falgu River.',
        mediaType: 'IMAGE',
        mediaUrl: '/images/gaya_vishnupad.jpg',
        ctaLabel: 'Begin Your Sacred Journey',
        ctaLink: '/pre-booking',
        secondaryCtaLabel: 'Explore Gaya Ji Heritage',
        secondaryCtaLink: '/gaya-ji'
      }
    ];
  }

  // Fallback for sacred places if DB empty (Falgu River placed first as sacred starting point of rites)
  if (!sacredPlaces || sacredPlaces.length === 0) {
    sacredPlaces = [
      {
        id: 'sp-1',
        slug: 'falgu-river',
        name: 'Falgu River (Devghat)',
        hindiName: 'फल्गु नदी (मुख्य देवघाट)',
        description: 'The sacred river where ancestral pilgrimage begins. Due to Mata Sita’s ancient blessing and curse, the river flows beneath the sand.',
        heroImage: '/images/pind_daan_vidhi.jpg'
      },
      {
        id: 'sp-2',
        slug: 'vishnupad-temple',
        name: 'Sri Vishnupad Mandir (Main Footprint)',
        hindiName: 'श्री विष्णुपद मंदिर (मुख्य चरण कमल)',
        description: 'The supreme sanctum sanctorum of world Sanatana Dharma. The 40cm footprint of Lord Vishnu is embedded in solid basalt rock.',
        heroImage: '/images/gaya_vishnupad.jpg'
      },
      {
        id: 'sp-3',
        slug: 'akshayavat',
        name: 'Akshayavat (The Immortal Banyan Tree)',
        hindiName: 'अक्षयवट (अमर अक्षय वटवृक्ष)',
        description: 'The celebrated undying banyan tree that stood as the truthful witness when Mata Sita offered sand pinds for King Dasharatha.',
        heroImage: '/images/akshay_vat.jpg'
      },
      {
        id: 'sp-4',
        slug: 'pretshila',
        name: 'Pretshila Hill Shrine',
        hindiName: 'प्रेतशिला पहाड़ी',
        description: 'Located 8 km from Gaya city, this sacred hill is dedicated to liberating ancestors who suffered untimely or unnatural deaths.',
        heroImage: '/images/gaya_drone.jpg'
      }
    ];
  } else {
    // Strictly ensure Falgu River is always in the 1st position
    const priorityOrder = ['falgu-river', 'vishnupad-temple', 'akshayavat', 'pretshila'];
    sacredPlaces = [...sacredPlaces].sort((a: any, b: any) => {
      const aIdx = priorityOrder.findIndex(s => a.slug === s || a.slug?.includes(s));
      const bIdx = priorityOrder.findIndex(s => b.slug === s || b.slug?.includes(s));
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return 0;
    });
  }

  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary space-y-16 sm:space-y-24 pb-16">
      
      {/* Dynamic Hero Slider (Image & Video Support) */}
      <HeroSlider slides={heroSlides} />

      {/* About Vishnupad Temple Showcase Section (Matching bihar.gov.in Screenshot) */}
      <VishnupadShowcase />

      {/* AI Vedic Moksha & Pitru Dosha Diagnostic Showcase Banner */}
      <VedicDiagnosticBanner packages={packages} />

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

      {/* 5-Step Devotee Journey (Exact Pilgrimage Flow - Luxury Redesign) */}
      <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-y border-[#EFE6D9] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto space-y-16 sm:space-y-20">
          
          {/* Section Header */}
          <div className="text-center max-w-[720px] mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-body font-semibold text-[#C6922E] inline-flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Doorstep Sacred Assistance • चरणबद्ध यात्रा व्यवस्था</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-display font-bold tracking-[-0.02em] text-[#2B2118] leading-[1.15]">
              How Your Sacred Journey Works
            </h2>
            <p className="text-[#5A5148] text-base sm:text-lg font-body leading-relaxed max-w-[680px] mx-auto">
              From station/airport reception to hotel transfer, sacred shrines escort, and safe departure drop.
            </p>
          </div>

          {/* Stepper Grid with Desktop Connector Line */}
          <div className="relative">
            {/* Desktop Golden Milestone Track Line */}
            <div className="hidden lg:block absolute top-12 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-[#C6922E]/30 to-transparent z-0 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              
              {/* Step 01 */}
              <div className="group bg-white hover:bg-[#FAF7F2]/60 rounded-[20px] p-6 sm:p-7 border border-[#EFE6D9] hover:border-[#C6922E]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[16px] bg-[#FAF7F2] border border-[#EFE6D9] text-[#C6922E] group-hover:bg-[#C6922E] group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F2] border-2 border-[#EFE6D9] group-hover:border-[#C6922E] group-hover:bg-[#C6922E] group-hover:text-white text-[#C6922E] font-display font-bold text-xl sm:text-2xl flex items-center justify-center shadow-sm transition-all duration-300 select-none">
                      01
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-semibold text-xl text-[#2B2118] group-hover:text-[#C6922E] transition-colors leading-snug">
                      Online Pre-Booking
                    </h3>
                    <p className="text-xs sm:text-[13px] font-body text-[#5A5148] leading-relaxed">
                      Select your pilgrimage date, gotra, family members, and package tier with transparent dakshina.
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#EFE6D9]/80 text-[11px] font-body font-semibold text-[#7A736A] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant Confirmation Slip</span>
                </div>
              </div>

              {/* Step 02 */}
              <div className="group bg-white hover:bg-[#FAF7F2]/60 rounded-[20px] p-6 sm:p-7 border border-[#EFE6D9] hover:border-[#C6922E]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[16px] bg-[#FAF7F2] border border-[#EFE6D9] text-[#C6922E] group-hover:bg-[#C6922E] group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm">
                      <Car className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F2] border-2 border-[#EFE6D9] group-hover:border-[#C6922E] group-hover:bg-[#C6922E] group-hover:text-white text-[#C6922E] font-display font-bold text-xl sm:text-2xl flex items-center justify-center shadow-sm transition-all duration-300 select-none">
                      02
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-semibold text-xl text-[#2B2118] group-hover:text-[#C6922E] transition-colors leading-snug">
                      Station / Airport Pickup
                    </h3>
                    <p className="text-xs sm:text-[13px] font-body text-[#5A5148] leading-relaxed">
                      Dedicated AC cab receives your family at Gaya Junction (GAYA) Railway Station or Patna Airport.
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#EFE6D9]/80 text-[11px] font-body font-semibold text-[#7A736A] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Private Chauffeur Escort</span>
                </div>
              </div>

              {/* Step 03 */}
              <div className="group bg-white hover:bg-[#FAF7F2]/60 rounded-[20px] p-6 sm:p-7 border border-[#EFE6D9] hover:border-[#C6922E]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[16px] bg-[#FAF7F2] border border-[#EFE6D9] text-[#C6922E] group-hover:bg-[#C6922E] group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm">
                      <Hotel className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F2] border-2 border-[#EFE6D9] group-hover:border-[#C6922E] group-hover:bg-[#C6922E] group-hover:text-white text-[#C6922E] font-display font-bold text-xl sm:text-2xl flex items-center justify-center shadow-sm transition-all duration-300 select-none">
                      03
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-semibold text-xl text-[#2B2118] group-hover:text-[#C6922E] transition-colors leading-snug">
                      Hotel Check-In & Rest
                    </h3>
                    <p className="text-xs sm:text-[13px] font-body text-[#5A5148] leading-relaxed">
                      Assisted check-in to pre-reserved hygienic AC hotel room for refreshment, bath, and ritual readiness.
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#EFE6D9]/80 text-[11px] font-body font-semibold text-[#7A736A] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Pre-Arranged Clean Stay</span>
                </div>
              </div>

              {/* Step 04 */}
              <div className="group bg-white hover:bg-[#FAF7F2]/60 rounded-[20px] p-6 sm:p-7 border border-[#EFE6D9] hover:border-[#C6922E]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[16px] bg-[#FAF7F2] border border-[#EFE6D9] text-[#C6922E] group-hover:bg-[#C6922E] group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm">
                      <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F2] border-2 border-[#EFE6D9] group-hover:border-[#C6922E] group-hover:bg-[#C6922E] group-hover:text-white text-[#C6922E] font-display font-bold text-xl sm:text-2xl flex items-center justify-center shadow-sm transition-all duration-300 select-none">
                      04
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-semibold text-xl text-[#2B2118] group-hover:text-[#C6922E] transition-colors leading-snug">
                      Ritual Sites & Pind Daan
                    </h3>
                    <p className="text-xs sm:text-[13px] font-body text-[#5A5148] leading-relaxed">
                      Escorted to Vishnupad Temple, Falgu River & Akshayavat with verified hereditary Teerth Panda.
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#EFE6D9]/80 text-[11px] font-body font-semibold text-[#7A736A] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Verified Purohit Guidance</span>
                </div>
              </div>

              {/* Step 05 */}
              <div className="group bg-white hover:bg-[#FAF7F2]/60 rounded-[20px] p-6 sm:p-7 border border-[#EFE6D9] hover:border-[#C6922E]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[16px] bg-[#FAF7F2] border border-[#EFE6D9] text-[#C6922E] group-hover:bg-[#C6922E] group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm">
                      <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F2] border-2 border-[#EFE6D9] group-hover:border-[#C6922E] group-hover:bg-[#C6922E] group-hover:text-white text-[#C6922E] font-display font-bold text-xl sm:text-2xl flex items-center justify-center shadow-sm transition-all duration-300 select-none">
                      05
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-semibold text-xl text-[#2B2118] group-hover:text-[#C6922E] transition-colors leading-snug">
                      Safe Departure Drop
                    </h3>
                    <p className="text-xs sm:text-[13px] font-body text-[#5A5148] leading-relaxed">
                      Ancestral bahi-khata record registered, sanctified prasad handed over, and cab drops you safely.
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#EFE6D9]/80 text-[11px] font-body font-semibold text-[#7A736A] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Prasad & Safe Return Drop</span>
                </div>
              </div>

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
            className="inline-flex items-center gap-2 bg-[#C6922E] hover:bg-[#A97718] text-white px-8 py-4 rounded-[16px] font-body font-semibold text-sm transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Explore All 45 Sacred Shrines of Gaya Ji</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* Curated Ritual Packages Showcase with Inline GOLD & PLATINUM Switchers */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto space-y-12 sm:space-y-16">
        <div className="text-center max-w-[720px] mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] font-body font-semibold text-[#C6922E]">Transparent Sacred Dakshina • पारदर्शी दक्षिणा</span>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-display font-bold tracking-[-0.02em] text-[#2B2118] leading-[1.15]">
            Curated Pind Daan Packages
          </h2>
          <p className="text-[#5A5148] text-base sm:text-lg font-body leading-relaxed max-w-[680px] mx-auto">
            Choose between <strong className="text-[#2B2118]">GOLD PLAN</strong> for essential Vedic rites or <strong className="text-[#2B2118]">PLATINUM VIP PLAN</strong> for complete VIP chauffeur pickup, AC Deluxe to 4-Star Hotel & Resort stay & senior Teerth Panda care.
          </p>
        </div>

        {/* Dynamic Package Cards (Live from Database) - All 4 in 1 single row on desktop! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(packages.length > 0 ? packages : [
            {
              slug: '1-day-essential-pind-daan',
              title: '1-Day Essential Pind Daan',
              duration: '1 Day (Approx 4-5 Hours)',
              priceINR: 4500,
              goldPriceINR: 7500,
              badge: 'MOST POPULAR',
              shortDesc: 'Ideal for devotees visiting Gaya Ji for a single day to perform essential rites at Vishnupad Temple & Falgu River.',
              inclusions: 'Verified Vishnupad Temple Teerth Panda\nComplete Vedic Samagri\nFalgu River & Vishnupad Temple Rites\nAncestral Lineage Registration',
              goldInclusions: 'VIP Senior Lineage Teerth Panda\nPrivate AC Cab Station/Hotel Pickup & Drop\nAC Deluxe to 4-Star Hotel & Resort Accommodations\nVIP Priority Temple Darshan Access'
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
              goldInclusions: 'VIP Senior Lineage Teerth Panda Escort\n2 Nights AC Deluxe to 4-Star Hotel & Resort Stay + Meals\nPrivate Chauffeur AC SUV Transport\nOfficial Gold Lineage Certificate'
            },
            {
              slug: 'pitidosh-puja-tripindi-shradh-',
              title: 'PitiDosh Puja ( Tripindi Shradh)',
              duration: '1 Day (4–5 Hours)',
              priceINR: 10449,
              goldPriceINR: 10433,
              badge: 'MOST POPULAR',
              shortDesc: 'Phalgu River are used to perform the early cleansing rites, tarpan, and the final immersion rituals required during the Tripindi Shradh process',
              inclusions: 'Senior Jyotish & Vedic Karma-Kand Acharya in Gaya Ji\nAltar Rites with Wheat Sattu\nTripindi Homa with Ghee Ahutis on the Bank of Falgu River',
              goldInclusions: 'Senior Jyotish & Vedic Karma-Kand Acharya in Gaya Ji\nAltar Rites with Wheat Sattu\nTripindi Homa with Ghee Ahutis on the Bank of Falgu River'
            },
            {
              slug: 'gaya-ji-narayan-bali-',
              title: 'Gaya Ji Narayan Bali',
              duration: '1 Day (5–6 Hours)',
              priceINR: 12499,
              goldPriceINR: 12499,
              badge: 'SPECIALIZED REMEDY',
              shortDesc: 'Specialized Vedic karma-kand performed at bank of falgu river near Vishnupad for souls who passed away unnaturally.',
              inclusions: 'Senior Jyotish & Vedic Karma-Kand Acharya in Gaya Ji\nAltar Rites & Pind Daan with Wheat Sattu\nNarayan Bali Homa with Ghee Ahutis',
              goldInclusions: 'Senior Jyotish & Vedic Karma-Kand Acharya in Gaya Ji\nAltar Rites & Pind Daan with Wheat Sattu\nNarayan Bali Homa with Ghee Ahutis'
            }
          ]).map((pkg) => (
            <PackageCard key={pkg.id || pkg.slug} pkg={pkg} defaultTier="GOLD" />
          ))}
        </div>

        {/* PROMINENT BUTTON BELOW PACKAGES TO SEE ALL PACKAGES */}
        <div className="pt-4 text-center">
          <Link 
            href="/packages"
            className="inline-flex items-center gap-2 bg-[#F48D08] hover:bg-[#D97706] text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Explore All Pind Daan Packages ({packages.length > 0 ? packages.length : 4})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Devotee Video Testimonials & Pooja Showcase */}
      <DevoteeVideoShowcase testimonials={testimonials} />

      {/* District Helplines Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white p-8 rounded-3xl border border-amber-900/10 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs uppercase font-bold text-[#C6922E] tracking-wider">Direct Devotee Helpline • Gaya Ji</span>
            <h3 className="text-2xl font-serif font-bold text-text-primary">Need Assistance Planning Your Visit?</h3>
            <p className="text-xs text-text-secondary">Speak directly with our Gaya Ji pilgrimage coordination team for transparent, fixed-dakshina guidance.</p>
          </div>
          <a href="tel:+917463055338" className="bg-[#C6922E] hover:bg-[#A97718] text-white px-8 py-3.5 rounded-[16px] font-bold text-xs transition-colors flex items-center gap-2 shrink-0">
            <Phone className="w-4 h-4" /> Call +91 7463055338
          </a>
        </div>
      </section>

    </div>
  );
}
