import Metadata from 'next';
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
  CheckCircle2, 
  Calendar,
  Compass
} from 'lucide-react';

// City Data Registry for Programmatic SEO
interface CityInfo {
  slug: string;
  name: string;
  stateOrCountry: string;
  flightRoute: string;
  trainRoute: string;
  travelTime: string;
  popularRitual: string;
  nriSupport: boolean;
}

const CITY_DATABASE: Record<string, CityInfo> = {
  'from-bengaluru': {
    slug: 'from-bengaluru',
    name: 'Bengaluru (Bangalore)',
    stateOrCountry: 'Karnataka',
    flightRoute: 'Direct flights available from BLR (Kempegowda Int. Airport) to PAT (Patna Airport - 2.5 hrs) or GAY (Gaya Airport).',
    trainRoute: 'Sanghamitra Express / Anga Express directly connects SBC/YPR to Gaya Junction (GAYA).',
    travelTime: 'Flight: 2.5 hrs | Train: 34 hrs',
    popularRitual: '3-Day Tri-Sthali Pind Daan Package',
    nriSupport: false,
  },
  'from-mumbai': {
    slug: 'from-mumbai',
    name: 'Mumbai',
    stateOrCountry: 'Maharashtra',
    flightRoute: 'Non-stop flights from BOM (Chhatrapati Shivaji Maharaj Airport) to PAT (Patna Airport) & seasonal flights to GAY.',
    trainRoute: 'Mumbai CSMT - Gaya Express & LTT Patna Superfast.',
    travelTime: 'Flight: 2.5 hrs | Train: 28 hrs',
    popularRitual: '1-Day Vishnupad & Falgu Sacred Pind Daan',
    nriSupport: false,
  },
  'from-delhi': {
    slug: 'from-delhi',
    name: 'Delhi NCR',
    stateOrCountry: 'Delhi',
    flightRoute: 'Multiple direct daily flights from DEL (Indira Gandhi Int. Airport) to PAT and seasonal direct flights to GAY.',
    trainRoute: 'Vande Bharat Express / Mahabodhi Express / Rajdhani Express directly to Gaya Junction.',
    travelTime: 'Flight: 1.5 hrs | Train: 12 hrs (Vande Bharat / Rajdhani)',
    popularRitual: '1-Day & 3-Day Complete Pitru Paksha Package',
    nriSupport: false,
  },
  'from-kolkata': {
    slug: 'from-kolkata',
    name: 'Kolkata',
    stateOrCountry: 'West Bengal',
    flightRoute: '1 hr direct flight from CCU (Netaji Subhash Chandra Bose Airport) to Patna/Gaya.',
    trainRoute: 'Howrah-Gaya Express / Doon Express / Vande Bharat Express (approx 6-7 hrs directly to Gaya).',
    travelTime: 'Flight: 1 hr | Train: 6.5 hrs',
    popularRitual: 'Annual Shradh & 1-Day Pind Daan',
    nriSupport: false,
  },
  'from-hyderabad': {
    slug: 'from-hyderabad',
    name: 'Hyderabad',
    stateOrCountry: 'Telangana',
    flightRoute: 'Direct and 1-stop flights from HYD (Rajiv Gandhi Int. Airport) to PAT / GAY.',
    trainRoute: 'Secunderabad - Patna Express to Gaya Junction.',
    travelTime: 'Flight: 2.5 hrs | Train: 26 hrs',
    popularRitual: 'Tri-Sthali Pind Daan Package',
    nriSupport: false,
  },
  'from-chennai': {
    slug: 'from-chennai',
    name: 'Chennai',
    stateOrCountry: 'Tamil Nadu',
    flightRoute: 'Daily connecting flights from MAA (Chennai Airport) to Patna (PAT) / Gaya (GAY).',
    trainRoute: 'Ganga Kaveri Express / Sanghamitra Express to Gaya Junction.',
    travelTime: 'Flight: 2.5 hrs | Train: 36 hrs',
    popularRitual: '3-Day Complete Tri-Sthali Pilgrimage',
    nriSupport: false,
  },
  'from-pune': {
    slug: 'from-pune',
    name: 'Pune',
    stateOrCountry: 'Maharashtra',
    flightRoute: 'Connecting flights from PNQ (Pune Airport) to Patna / Gaya via Delhi or Mumbai.',
    trainRoute: 'Pune-Danapur Express & Azad Hind Express to Gaya Junction.',
    travelTime: 'Flight: 3 hrs | Train: 30 hrs',
    popularRitual: '1-Day & 3-Day Complete Pitru Paksha Package',
    nriSupport: false,
  },
  'from-ahmedabad': {
    slug: 'from-ahmedabad',
    name: 'Ahmedabad & Gujarat',
    stateOrCountry: 'Gujarat',
    flightRoute: 'Direct & connecting flights from AMD (Sardar Vallabhbhai Patel Airport) to Patna (PAT) / Gaya (GAY).',
    trainRoute: 'Paraswanath Express & Ahmedabad-Patna Express to Gaya Junction.',
    travelTime: 'Flight: 2 hrs | Train: 28 hrs',
    popularRitual: '3-Day Tri-Sthali & Sita Kund Snan Package',
    nriSupport: false,
  },
  'from-surat': {
    slug: 'from-surat',
    name: 'Surat',
    stateOrCountry: 'Gujarat',
    flightRoute: 'Flights from Surat (STV) via Delhi/Mumbai to Patna & Gaya.',
    trainRoute: 'Tapti Ganga Express / Udhna-Danapur Express to Gaya Junction.',
    travelTime: 'Flight: 3.5 hrs | Train: 26 hrs',
    popularRitual: '1-Day Essential & 3-Day Pilgrimage Package',
    nriSupport: false,
  },
  'from-jaipur': {
    slug: 'from-jaipur',
    name: 'Jaipur & Rajasthan',
    stateOrCountry: 'Rajasthan',
    flightRoute: 'Flights from JAI (Jaipur Airport) connecting to Patna/Gaya.',
    trainRoute: 'Bikaner-Howrah Express / Pratap Express directly through Gaya Junction.',
    travelTime: 'Flight: 2 hrs | Train: 16 hrs',
    popularRitual: 'Vedic Pind Daan & Akshayavat Vidhi',
    nriSupport: false,
  },
  'from-lucknow': {
    slug: 'from-lucknow',
    name: 'Lucknow & Kanpur',
    stateOrCountry: 'Uttar Pradesh',
    flightRoute: 'Quick 1 hr flight from LKO (Chaudhary Charan Singh Airport) or direct expressway cab.',
    trainRoute: 'Vande Bharat / Doon Express / Neelachal Express directly to Gaya Junction.',
    travelTime: 'Expressway: 6 hrs | Train: 7 hrs',
    popularRitual: '1-Day Essential & Annual Shradh Package',
    nriSupport: false,
  },
  'from-patna': {
    slug: 'from-patna',
    name: 'Patna Airport Hub',
    stateOrCountry: 'Bihar',
    flightRoute: 'Patna Jay Prakash Narayan Airport (PAT) is the major connecting airport for Gaya Ji.',
    trainRoute: 'Patna-Gaya Vande Bharat Express (1.5 hrs) & private AC cab via NH-83 Expressway (1.5-2 hrs).',
    travelTime: 'Expressway Cab: 1.5 hrs | Train: 1.5 hrs',
    popularRitual: 'Same-Day Return Essential Pind Daan',
    nriSupport: false,
  },
  'from-ranchi': {
    slug: 'from-ranchi',
    name: 'Ranchi & Jamshedpur',
    stateOrCountry: 'Jharkhand',
    flightRoute: 'Birsa Munda Airport (IXR) connection or direct 3-hr road drive via NH-20.',
    trainRoute: 'Vande Bharat Express / Ranchi-Patna Jan Shatabdi via Gaya.',
    travelTime: 'Road: 3.5 hrs | Train: 3 hrs',
    popularRitual: '1-Day & 2-Day Pind Daan Pilgrimage',
    nriSupport: false,
  },
  'from-bhubaneswar': {
    slug: 'from-bhubaneswar',
    name: 'Bhubaneswar & Odisha',
    stateOrCountry: 'Odisha',
    flightRoute: 'Connecting flights from BBI (Biju Patnaik Airport) to Patna/Gaya.',
    trainRoute: 'Puri-New Delhi Purushottam Express directly connects Bhubaneswar & Cuttack to Gaya.',
    travelTime: 'Flight: 2.5 hrs | Train: 14 hrs',
    popularRitual: 'Tri-Sthali (Gaya-Puri Lineage) Pind Daan',
    nriSupport: false,
  },
  'from-usa-nri': {
    slug: 'from-usa-nri',
    name: 'USA & North America NRIs',
    stateOrCountry: 'United States & Canada',
    flightRoute: 'Fly into DEL / BOM / CCU international hubs, followed by a quick connecting flight to Patna (PAT) or Gaya (GAY).',
    trainRoute: 'Private luxury chauffeur pickup from Patna Airport (PAT) directly to Gaya hotel (2 hrs via NH-83 expressway).',
    travelTime: 'Dedicated 24/7 NRI Concierge Assistance',
    popularRitual: 'Remote Live Stream Pind Daan or 3-Day VIP Concierge Package',
    nriSupport: true,
  },
  'from-uk-london': {
    slug: 'from-uk-london',
    name: 'London & UK NRIs',
    stateOrCountry: 'United Kingdom',
    flightRoute: 'Direct London Heathrow (LHR) to Delhi (DEL), connecting directly to Patna (PAT) or Gaya (GAY).',
    trainRoute: 'Chauffeur airport transfer with dedicated English/Hindi speaking escort.',
    travelTime: 'Full International Support Team',
    popularRitual: 'Remote Live Stream Pind Daan & VIP In-Person Package',
    nriSupport: true,
  },
  'from-canada-nri': {
    slug: 'from-canada-nri',
    name: 'Canada (Toronto / Vancouver) NRIs',
    stateOrCountry: 'Canada',
    flightRoute: 'Flights from Toronto Pearson (YYZ) & Vancouver (YVR) via Delhi connecting to Gaya / Patna.',
    trainRoute: 'Dedicated VIP airport pickup & hotel escort for Canadian Hindu diaspora.',
    travelTime: '24/7 Canada Timezone NRI Support',
    popularRitual: '4K Remote Live Sankalp & Sanctified Prasad Courier',
    nriSupport: true,
  },
  'from-australia-nri': {
    slug: 'from-australia-nri',
    name: 'Australia (Sydney / Melbourne) NRIs',
    stateOrCountry: 'Australia',
    flightRoute: 'Flights from Sydney (SYD) & Melbourne (MEL) connecting to India with Patna/Gaya transit.',
    trainRoute: 'VIP concierge escort and ancestral lineage registration with Vishnupad pandas.',
    travelTime: 'Australia-Friendly Scheduling',
    popularRitual: 'Remote Two-Way Interactive Pind Daan & VIP In-Person Package',
    nriSupport: true,
  },
  'from-dubai-uae-nri': {
    slug: 'from-dubai-uae-nri',
    name: 'Dubai & UAE Gulf NRIs',
    stateOrCountry: 'United Arab Emirates & GCC',
    flightRoute: 'Direct 3.5 hr international flights from Dubai (DXB) / Sharjah (SHJ) to Delhi/Patna.',
    trainRoute: 'Express AC sedan pickup from airport directly to Vishnupad Temple.',
    travelTime: 'Same-Day Quick Access',
    popularRitual: 'Weekend Express 1-Day & 2-Day Pind Daan',
    nriSupport: true,
  },
  'from-singapore-nri': {
    slug: 'from-singapore-nri',
    name: 'Singapore & SE Asia NRIs',
    stateOrCountry: 'Singapore & Malaysia',
    flightRoute: 'Direct flights from Singapore Changi (SIN) to Kolkata/Delhi connecting directly to Gaya.',
    trainRoute: 'Full VIP ground protocol with senior lineage Panda assignment.',
    travelTime: 'Fast SE Asia Regional Transit',
    popularRitual: 'Remote 4K Live Stream & Annual Shradh Package',
    nriSupport: true,
  }
};

export async function generateStaticParams() {
  return Object.keys(CITY_DATABASE).map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const cityData = CITY_DATABASE[resolvedParams.city];
  
  if (!cityData) {
    return {
      title: 'City Guide Not Found | PindDaanWale',
    };
  }

  return {
    title: `Pind Daan in Gaya Ji for Devotees from ${cityData.name} | Travel Guide & Verified Pandas`,
    description: `Complete travel guide and Pind Daan arrangements for devotees traveling from ${cityData.name} to Gaya Ji. Includes airport pickup, verified Vishnupad Temple pandas, hotel stay, and transparent rituals.`,
    keywords: `Pind Daan from ${cityData.name}, Gaya Ji Pind Daan ${cityData.name}, Vishnupad temple Pind Daan ${cityData.stateOrCountry}, Pitru Paksha Gaya ${cityData.name}`,
    alternates: {
      canonical: `https://pinddaanwale.com/pind-daan/${cityData.slug}`,
    },
  };
}

export default async function CityPindDaanPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const cityData = CITY_DATABASE[resolvedParams.city];

  if (!cityData) {
    // Return standard template for dynamically generated cities
    const cityName = resolvedParams.city.replace('from-', '').replace(/-/g, ' ').toUpperCase();
    return (
      <div className="min-h-screen bg-temple-ivory py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">Programmatic Travel Guide</span>
          <h1 className="text-4xl font-serif font-bold text-text-primary">Pind Daan in Gaya Ji for Devotees from {cityName}</h1>
          <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto">
            We provide seamless travel guidance, airport/station pickups, verified Vishnupad Temple pandas, and complete Vedic ritual arrangements for families coming from {cityName}.
          </p>
          <div className="pt-6">
            <Link href="/pre-booking" className="bg-accent-gold text-white px-8 py-3.5 rounded-full font-bold hover:bg-accent-copper transition-colors">
              Plan Your Sacred Journey from {cityName}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': `Pind Daan Rites for Devotees from ${cityData.name}`,
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'PindDaanWale Gaya Ji Desk',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Gaya',
        'addressRegion': 'Bihar',
        'addressCountry': 'IN'
      }
    },
    'areaServed': cityData.name,
    'description': `Customized Pind Daan ritual arrangements, travel assistance, and verified panda booking for families traveling from ${cityData.name} to Gaya Ji.`
  };

  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="bg-text-primary text-temple-ivory py-20 border-b border-amber-900/20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-amber-500/10 border border-amber-500/30 text-accent-gold text-xs font-semibold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            <span>Dedicated Guide for {cityData.name} Devotees</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">
            Pind Daan at Gaya Ji for Devotees from {cityData.name}
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Complete, hassle-free pilgrimage guidance from {cityData.name} to Vishnupad Temple & Falgu River. Verified Pandas, guaranteed transparent rites, and personalized travel care.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link 
              href="/pre-booking" 
              className="bg-accent-gold text-text-primary hover:bg-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors shadow-md"
            >
              Book Journey from {cityData.name}
            </Link>
            <a 
              href="tel:+917463055338" 
              className="w-full sm:w-auto bg-[#F48D08] hover:bg-[#D97706] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline: +91 7463055338</span>
            </a>
          </div>
        </div>
      </section>

      {/* Travel & Route Logistics Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-accent-copper">Travel Logistics</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">How to Reach Gaya Ji from {cityData.name}</h2>
          <p className="text-text-secondary text-sm">We provide full airport/station pickup and hotel coordination upon your arrival.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Flight Option */}
          <div className="bg-white p-8 rounded-2xl border border-amber-900/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100/60 flex items-center justify-center text-accent-gold">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-text-primary">Flight Travel Route</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{cityData.flightRoute}</p>
            <div className="pt-2 text-xs font-semibold text-accent-copper flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Estimated Duration: {cityData.travelTime}</span>
            </div>
          </div>

          {/* Train Option */}
          <div className="bg-white p-8 rounded-2xl border border-amber-900/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100/60 flex items-center justify-center text-accent-gold">
              <Train className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-text-primary">Train Travel Route</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{cityData.trainRoute}</p>
            <div className="pt-2 text-xs font-semibold text-accent-copper flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>Station Pickup at Gaya Junction (GAYA)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Rituals for This Region */}
      <section className="bg-temple-alt/60 py-16 border-y border-amber-900/10">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-accent-gold">Recommended Packages</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">Popular Rites Chosen by Devotees from {cityData.name}</h2>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-amber-900/10 shadow-sm max-w-2xl mx-auto space-y-6 text-left">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-accent-copper">Most Popular</span>
                <h3 className="text-xl font-serif font-bold text-text-primary mt-1">{cityData.popularRitual}</h3>
              </div>
              <span className="bg-amber-100 text-accent-gold text-xs font-bold px-3 py-1 rounded-full">Recommended</span>
            </div>
            
            <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" /> Verified Teerth Panda from Vishnupad Temple</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" /> All Samagri (Pind, Barley, Sesame, Milk, Honey) Provided</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" /> Private AC Cab Transfer from Airport/Station</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" /> Complete Ancestral Certificate & Lineage Registration</li>
            </ul>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link 
                href="/pre-booking" 
                className="w-full sm:w-auto bg-accent-gold hover:bg-accent-copper text-white px-8 py-3 rounded-full font-bold text-sm text-center transition-colors"
              >
                Reserve This Package
              </Link>
              <Link href="/packages" className="text-xs font-semibold text-text-secondary hover:text-accent-gold">
                Explore All Packages →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold">Planning Your Visit from {cityData.name}?</h2>
        <p className="text-text-secondary text-sm max-w-xl mx-auto">
          Contact our dedicated Gaya Ji Pilgrimage Helpdesk to calculate the exact Muhurat, select Tithi, and book your verified priest.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link href="/pre-booking" className="bg-text-primary text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-black transition-colors">
            Start Pre-Booking Now
          </Link>
        </div>
      </section>
    </div>
  );
}
