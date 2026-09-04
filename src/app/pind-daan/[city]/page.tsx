import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Plane, 
  Train, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Phone, 
  ArrowRight, 
  Calendar,
  Compass,
  AlertTriangle,
  HelpCircle,
  Award,
  Sparkles,
  Check,
  ChevronRight
} from 'lucide-react';
import ZeroExtortionPledge from '@/components/common/ZeroExtortionPledge';
import { CITY_DATABASE } from '@/data/cityDatabase';

export async function generateStaticParams() {
  return Object.keys(CITY_DATABASE).map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const cityData = CITY_DATABASE[resolvedParams.city];
  
  if (!cityData) {
    return {
      title: 'City Pilgrimage Guide Not Found | PindDaanWale',
    };
  }

  const title = `Pind Daan in Gaya Ji from ${cityData.name} | Verified Pandas & Fixed Rates`;
  const description = `Planning Pind Daan in Gaya Ji from ${cityData.name}? Complete travel route (${cityData.travelTime}), flight & train guide, verified Vishnupad Pandas, 100% fixed dakshina, and zero middlemen.`;

  return {
    title,
    description,
    keywords: [
      `Pind Daan from ${cityData.name}`,
      `Pind Daan cost in Gaya from ${cityData.name}`,
      `Gaya Ji Pind Daan train from ${cityData.name}`,
      `Pind Daan packages for ${cityData.name} devotees`,
      `Vishnupad temple panda booking ${cityData.name}`,
      `Pitru Paksha Gaya travel from ${cityData.name}`,
      `Pind Daan booking official Gaya`
    ],
    alternates: {
      canonical: `https://www.pinddaanwale.com/pind-daan/${cityData.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.pinddaanwale.com/pind-daan/${cityData.slug}`,
      siteName: 'PindDaanWale.com',
      locale: 'en_IN',
      type: 'website',
    },
  };
}

export default async function CityPindDaanPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const cityData = CITY_DATABASE[resolvedParams.city];

  if (!cityData) {
    notFound();
  }

  // Schema.org JSON-LD Structured Data
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.pinddaanwale.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pind Daan City Guides',
        item: 'https://www.pinddaanwale.com/pind-daan'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `From ${cityData.name}`,
        item: `https://www.pinddaanwale.com/pind-daan/${cityData.slug}`
      }
    ]
  };

  const jsonLdSpiritualService = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentPermit',
    name: `Authentic Pind Daan in Gaya Ji for Devotees from ${cityData.name}`,
    description: `Official Shastric Pind Daan and Shradh arrangements at Vishnupad Temple, Falgu River, and Akshayavat for pilgrims traveling from ${cityData.name}. 100% fixed transparent dakshina with zero middleman exploitation.`,
    provider: {
      '@type': 'TravelAgency',
      name: 'PindDaanWale.com',
      telephone: '+917463055338',
      url: 'https://www.pinddaanwale.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Near Vishnupad Temple, Chand Chaura',
        addressLocality: 'Gaya',
        addressRegion: 'Bihar',
        postalCode: '823001',
        addressCountry: 'IN'
      },
      priceRange: '₹4,500 - ₹14,500'
    },
    areaServed: cityData.name,
    serviceType: 'Vedic Pind Daan & Ancestral Liberation Rites'
  };

  const jsonLdHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Perform Pind Daan in Gaya Ji from ${cityData.name}`,
    description: `Step-by-step verified guide for devotees traveling from ${cityData.name} to complete sacred ancestral rites in Gaya Ji without middlemen.`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Choose Sacred Date & Pre-Book Verified Purohit',
        text: 'Select your auspicious tithi (Pitru Paksha, Somvati Amavasya, or monthly Amavasya) and lock in 100% fixed dakshina on PindDaanWale to prevent on-arrival extortion.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: `Travel from ${cityData.name} to Gaya / Patna`,
        text: cityData.flightRoute || cityData.trainRoute
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Station Pickup & Bahi-Khata Lineage Verification',
        text: 'Meet our authorized representative at Gaya Junction or Patna Airport and verify your family Gotra and ancestral records in authentic Vishnupad bahi-khatas.'
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Perform Sacred Rites across the 3 Mandatory Vedis',
        text: 'Complete Falgu River achaman, offer pinda on Lord Vishnu 40cm sacred footprint, and receive the eternal Sufal blessing under the holy Akshayavat tree.'
      }
    ]
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do devotees travel from ${cityData.name} to Gaya Ji for Pind Daan?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Devotees from ${cityData.name} can travel via ${cityData.flightRoute} or by train via ${cityData.trainRoute}. PindDaanWale provides doorstep station pickup from Gaya Junction or Patna Airport directly to your hotel.`
        }
      },
      {
        '@type': 'Question',
        name: 'Are there hidden charges or extra demands at the ghats in Gaya Ji?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. With PindDaanWale, your dakshina is 100% fixed at booking (₹4,500 for 1-Day Essential, ₹12,500 for 3-Day Complete). All Vedic samagri, purohit honorarium, temple access, and boat seva are included. Not a single extra rupee will ever be demanded at the holy riverbank.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can devotees avoid aggressive touts and middlemen at Gaya railway station?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Never engage with auto drivers or unsolicited agents at Gaya Junction claiming to represent temple pandas. Pre-booking on PindDaanWale ensures an authorized private driver meets you inside the station with a personalized name board and escorts you directly to verified Vishnupad pandas.'
        }
      },
      {
        '@type': 'Question',
        name: 'What items and documents should a devotee bring from home?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Devotees only need to bring their family Gotra, names of departed ancestors (father, mother, grandparents), and comfortable traditional cotton clothes (dhoti/kurta). All sacred Vedic samagri (kusha ring, barley flour, black sesame, holy Gangajal, vastram) is completely provided by PindDaanWale.'
        }
      }
    ]
  };

  return (
    <>
      {/* Inject Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSpiritualService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <main className="min-h-screen bg-[#070B14] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/pind-daan" className="hover:text-amber-400 transition-colors">City Guides</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-300 font-bold truncate">From {cityData.name}</span>
          </nav>

          {/* Hero Banner Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C160C] via-[#101728] to-[#0A0E1A] border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>PILGRIM ROUTE: {cityData.name.toUpperCase()} TO GAYA JI</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                Pind Daan in Gaya Ji for Devotees from{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400">
                  {cityData.name}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Complete, authentic Shastric arrangements with verified Vishnupad Temple Teerth Purohits. Experience 100% transparent fixed dakshina, door-to-door station pickup, complete Vedic samagri, and zero middleman extortion.
              </p>

              {/* Fast Facts Tags */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Transit: {cityData.travelTime}</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Popular: {cityData.popularRitual}</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Fixed Dakshina Guarantee</span>
                </span>
              </div>

              {/* Quick Action CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/pre-booking?city=${encodeURIComponent(cityData.name)}`}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-105 transition-all"
                >
                  <span>Pre-Book Sacred Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/917463055338?text=${encodeURIComponent(`Pranam! I am traveling from ${cityData.name} to Gaya Ji for Pind Daan. Please share package details and Pandit Ji availability.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Consult Verified Pandit Ji on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Middlemen Warning & Sacred Zero-Extortion Pledge */}
          <ZeroExtortionPledge cityName={cityData.name} />

          {/* Travel Vectors (Flights, Trains, Road) */}
          <div className="rounded-3xl bg-[#0E1626] border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                <Compass className="w-4 h-4" />
                <span>TRANSIT LOGISTICS & CONNECTIVITY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                How to Travel from {cityData.name} to Gaya Ji
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Optimized travel routes for families, elderly pilgrims, and international NRI visitors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Flight Vector */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-sky-400">
                  <Plane className="w-4 h-4" />
                  <span>Flight Route & Airport Transfer:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cityData.flightRoute}
                </p>
                <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Patna Airport (PAT) transfer via NH-83 Expressway takes approx 1.5 - 2 hrs.</span>
                </div>
              </div>

              {/* Train Vector */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                  <Train className="w-4 h-4" />
                  <span>Direct Trains to Gaya Junction (GAYA):</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cityData.trainRoute}
                </p>
                <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Gaya Junction is situated on the Grand Chord line with 24/7 express connectivity.</span>
                </div>
              </div>
            </div>

            {/* Station Warning Banner */}
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-xs text-amber-300 block">
                  Important Arrival Tip for {cityData.name} Pilgrims:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cityData.stationTips}
                </p>
              </div>
            </div>
          </div>

          {/* Local Devotee Traditions & Shastric Significance */}
          <div className="rounded-3xl bg-gradient-to-r from-[#172033] via-[#0F172A] to-[#172033] border border-slate-800 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>VEDIC TRADITION & LINEAGE RECORDS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Vedic Ritual Customs for Devotees from {cityData.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {cityData.customNotes}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] font-bold text-amber-300 block mb-1">1. Falgu River Snan</span>
                <p className="text-[11px] text-slate-400">Achaman, sand pind daan, and soul cleansing purification.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] font-bold text-amber-300 block mb-1">2. Vishnupad Charan</span>
                <p className="text-[11px] text-slate-400">Pinda offering directly on Lord Vishnu 40cm divine footprint.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] font-bold text-amber-300 block mb-1">3. Akshayavat Sufal</span>
                <p className="text-[11px] text-slate-400">Eternal blessing and peace for 101 generations under undying banyan.</p>
              </div>
            </div>
          </div>

          {/* High-Intent Frequently Asked Questions */}
          <div className="rounded-3xl bg-[#0E1626] border border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-sky-400 text-xs font-bold mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Frequently Asked Questions: Pind Daan from {cityData.name}
              </h3>
            </div>

            <div className="space-y-4">
              {jsonLdFaq.mainEntity.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-2">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span>{item.name}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">
                    {item.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Conversion CTA Strip */}
          <div className="rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-6 sm:p-8 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl sm:text-2xl font-extrabold">
                Reserve Your Sacred Date from {cityData.name}
              </h4>
              <p className="text-xs sm:text-sm font-medium text-slate-900">
                Guaranteed verified Teerth Purohits, 100% fixed dakshina, and zero unexpected charges.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href={`/pre-booking?city=${encodeURIComponent(cityData.name)}`}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs text-center shadow-lg transition-all"
              >
                Pre-Book Ritual Slot
              </Link>
              <a
                href="tel:+917463055338"
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-amber-100 hover:bg-white text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call Helpline: +91 7463055338</span>
              </a>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
