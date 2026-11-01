import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Plane, 
  Train, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Phone, 
  CheckCircle2, 
  Compass, 
  ChevronRight,
  Car,
  Hotel,
  ArrowRight
} from 'lucide-react';
import { GOVT_HELPLINES } from '@/data/mockData';

export const metadata: Metadata = {
  title: 'Gaya Ji Pilgrim Travel Guide | Trains, Flights, Hotels & Temple Timings | PindDaanWale',
  description: 'Complete pilgrimage travel guide to Gaya Ji. Train routes to Gaya Junction (GAYA), Patna airport flights, official auto/e-rickshaw fares, hotel recommendations, and Vishnupad Temple timings.',
  keywords: [
    'Gaya Ji travel guide',
    'How to reach Gaya for Pind Daan',
    'Gaya Junction railway station trains',
    'Patna to Gaya distance cab',
    'Vishnupad temple timings',
    'Hotels near Vishnupad Gaya',
    'Gaya auto fare rate list'
  ],
  alternates: {
    canonical: 'https://www.pinddaanwale.com/travel-guide'
  }
};

export default function TravelGuidePage() {
  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-300 font-medium">Travel Guide</span>
        </nav>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C160C] via-[#101728] to-[#0A0E1A] border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>OFFICIAL PILGRIM LOGISTICS HANDBOOK</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Gaya Ji Sacred Pilgrimage{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400">
                Travel Guide
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Everything you need to know before traveling to Gaya Ji: How to reach via high-speed trains or flights, official auto rates, safety advisories, and temple timings for a peaceful Pind Daan yatra.
            </p>
          </div>
        </div>

        {/* Connectivity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Train */}
          <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Train className="w-5 h-5" />
              <h2 className="text-lg font-bold text-white">How to Reach by Train</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Gaya Junction (Station Code: GAYA)</strong> is a major Grand Chord railway junction connecting all metros with direct superfast, Rajdhani, and Vande Bharat trains.
            </p>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>From Delhi / NCR:</strong> Mahabodhi Express (12398), Vande Bharat Express (22448), Howrah Rajdhani (12302) (~11 to 14 hrs).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>From Kolkata / Howrah:</strong> Vande Bharat Express (22303), Shaktipunj Express, Doon Express (~5.5 to 7 hrs).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>From Mumbai / Pune:</strong> Mumbai CSMT-Howrah Mail, Pune-Danapur Superfast (~26 to 28 hrs).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>From Bengaluru / South India:</strong> Sanghamitra Express, Bagmati Express (to Patna/Gaya).</span>
              </li>
            </ul>
          </div>

          {/* Flights */}
          <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Plane className="w-5 h-5" />
              <h2 className="text-lg font-bold text-white">How to Reach by Air</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pilgrims have two airport options for reaching Gaya Ji:
            </p>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Patna Airport (PAT - Jay Prakash Narayan International):</strong> Located 105 km from Gaya. Has 60+ daily flights from Delhi, Mumbai, Bengaluru, Hyderabad, and Chennai. Travel from Patna to Gaya takes ~2.5 hours via the new 4-lane NH-22 or Vande Bharat train.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Gaya International Airport (GAY):</strong> Located just 9 km from Vishnupad Temple. Operates domestic flights during peak seasons and international chartered flights from Thailand, Myanmar, and Sri Lanka.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Local Transport & Govt Fares */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <Car className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">Local Auto & E-Rickshaw Rates (Govt Approved)</h2>
          </div>
          <p className="text-xs text-slate-300">
            To prevent overcharging, the Gaya District Administration has fixed standard conveyance rates:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Gaya Station ➔ Vishnupad</span>
              <strong className="text-amber-300 text-sm">₹25 / person</strong> (Shared E-Rickshaw)
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Gaya Station ➔ Vishnupad</span>
              <strong className="text-amber-300 text-sm">₹150</strong> (Private Reserved Auto)
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 block">Vishnupad ➔ Bodh Gaya</span>
              <strong className="text-amber-300 text-sm">₹250 - ₹300</strong> (Reserved Auto)
            </div>
          </div>
        </div>

        {/* Temple Timings */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Clock className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">Sacred Temple Timings & Muhurat</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
              <strong className="text-white block font-serif">Sri Vishnupad Temple</strong>
              <span className="text-slate-400 block">Open: 05:00 AM – 09:00 PM</span>
              <span className="text-amber-300 text-[11px] block">Aarti: 06:00 AM & 07:30 PM</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
              <strong className="text-white block font-serif">Falgu River Devghat</strong>
              <span className="text-slate-400 block">Accessible: 24 Hours</span>
              <span className="text-amber-300 text-[11px] block">Best for Snana: 05:30 AM – 11:00 AM</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
              <strong className="text-white block font-serif">Akshayavat (Immortal Tree)</strong>
              <span className="text-slate-400 block">Open: 06:00 AM – 06:00 PM</span>
              <span className="text-amber-300 text-[11px] block">Suphal Benediction: Daytime</span>
            </div>
          </div>
        </div>

        {/* Emergency Helplines */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Phone className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">Gaya District Emergency Helplines</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {GOVT_HELPLINES.slice(0, 4).map((hl, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <span className="text-slate-400 text-[11px] block line-clamp-1">{hl.designation}</span>
                <a href={`tel:${hl.contact}`} className="text-amber-300 font-mono font-bold hover:underline block">
                  {hl.contact}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Booking CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-serif">
              Want a Worry-Free Pilgrimage with Pickup & Hotel?
            </h3>
            <p className="text-xs text-slate-900 font-medium">
              Our 1-Day and 3-Day packages include railway station pickup, AC/Non-AC hotel rooms, satvik meals, and senior Gayawal Panda guidance.
            </p>
          </div>
          <Link
            href="/packages/gaya-ji-1-day-pind-daan"
            className="px-6 py-3 rounded-full bg-slate-950 text-amber-400 hover:text-amber-300 font-bold text-xs shadow-xl shrink-0 inline-flex items-center gap-2"
          >
            <span>View 1-Day Package (from ₹7,499)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
