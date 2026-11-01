import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Globe, 
  Video, 
  Package, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Truck, 
  BookOpen, 
  Award,
  ChevronRight,
  FileCheck
} from 'lucide-react';
import ZeroExtortionPledge from '@/components/common/ZeroExtortionPledge';

export const metadata: Metadata = {
  title: 'NRI Live Online Pind Daan in Gaya Ji | 4K Zoom Streaming & Prasad Courier',
  description: 'Authentic remote Pind Daan in Gaya Ji for NRIs in USA, UK, Canada, Australia & UAE. Live Zoom gotra sankalp at Vishnupad Temple with verified Pandas, fixed USD/INR rates, and international prasad courier.',
  keywords: [
    'NRI Pind Daan Gaya',
    'Online Pind Daan Gaya Ji',
    'Live stream Pind Daan',
    'Pind Daan for NRIs USA UK Canada',
    'Remote Pind Daan Vishnupad Temple',
    'Gaya Panda online booking NRI',
    'Prasad delivery international'
  ],
  alternates: {
    canonical: 'https://www.pinddaanwale.com/nri-live-seva'
  },
  openGraph: {
    title: 'NRI Live Online Pind Daan in Gaya Ji | PindDaanWale',
    description: '4K Live interactive video sankalp by hereditary Gayawal Pandas at Vishnupad Temple with worldwide prasad courier.',
    url: 'https://www.pinddaanwale.com/nri-live-seva',
    siteName: 'PindDaanWale',
    type: 'website'
  }
};

export default function NriLiveSevaPage() {
  const steps = [
    {
      step: '01',
      title: 'Online Gotra & Ancestral Registration',
      desc: 'Submit your Gotra, parents’ and grandparents’ names, and preferred ritual date. Our Vedic scholars verify the appropriate muhurat based on your local country timezone.'
    },
    {
      step: '02',
      title: 'Private 4K Live Stream Link',
      desc: 'Receive a secure Zoom meeting or private YouTube 4K stream link. Join with your entire family from anywhere in the world on phone, tablet, or smart TV.'
    },
    {
      step: '03',
      title: 'Live Interactive Sankalp at Falgu & Vishnupad',
      desc: 'Our 4th-generation Gayawal Panda chants your exact family Gotra and names live on camera. You recite the Vedic Sankalp simultaneously from home holding sacred Kusha and water.'
    },
    {
      step: '04',
      title: 'Sacred Prasad Dispatch & Tracking',
      desc: 'Concluded with Brahmin Bhojan and Akshayavat Suphal. A consecrated Prasad kit is packed and dispatched to your international or Indian address via DHL / Speed Post with tracking.'
    }
  ];

  const prasadItems = [
    'Consecrated Vishnupad Tulsi Dal (चरण तुलसी)',
    'Holy Falgu River Sacred Water (पवित्र फल्गु जल)',
    'Blessed Leaf from the Immortal Akshayavat Tree (अक्षयवट पत्र)',
    'Sanctified Raksha Sutra (रक्षा सूत्र)',
    'Vedic Rudraksha / Silver Consecrated Token of Moksha',
    'Complete Video Recording & Certificate of Completion'
  ];

  const packages = [
    {
      slug: 'uttam-pind-daan',
      title: 'NRI Uttam Pind Daan (7-Kul Moksha)',
      priceUSD: 140,
      priceINR: 11000,
      duration: '3–3.5 Hours',
      badge: 'RECOMMENDED FOR OVERSEAS DEVOTEES',
      desc: 'Comprehensive 7-Kul ancestral liberation at Vishnupad Footprint, Falgu River, and Akshayavat with Kalash Puja and 5 Vastra Daan.'
    },
    {
      slug: 'madhyam-pind-daan',
      title: 'NRI Madhyam Pind Daan (Vedic Vidhi)',
      priceUSD: 95,
      priceINR: 7500,
      duration: '2–2.5 Hours',
      badge: 'STANDARD VEDIC VIDHI',
      desc: 'Traditional Vedic ceremony with Kalash Puja, Pinda offering, and 3 Vastra & Patra Daan conducted live.'
    },
    {
      slug: 'kanishtha-pind-daan',
      title: 'NRI Kanishtha Pind Daan (Essential)',
      priceUSD: 60,
      priceINR: 4500,
      duration: '2 Hours',
      badge: 'ESSENTIAL RITE',
      desc: 'Focused Vedic Pind Daan with 2 Thali Daan performed by verified Gayawal Panda on live camera.'
    }
  ];

  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-300 font-medium">NRI & Remote Live Pind Daan</span>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C160C] via-[#101728] to-[#0A0E1A] border border-amber-500/30 p-6 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
              <Globe className="w-3.5 h-3.5" />
              <span>GLOBAL PILGRIM CONCIERGE (USA, UK, CANADA, AUSTRALIA, UAE, SINGAPORE)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              NRI Live Online Pind Daan in Gaya Ji:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400">
                Live 4K Stream & Worldwide Prasad
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Living abroad and unable to travel to Bihar in person? Sanatana Dharma Shastras specifically provide for <em>Pratinidhi Sankalp</em>. Experience a real-time, interactive Vedic Pind Daan broadcast live from the sanctum sanctorum of <strong>Vishnupad Temple and Falgu River</strong>, with complete international prasad courier.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1.5">
                <Video className="w-4 h-4 text-emerald-400" />
                <span>Private 4K Zoom Live Stream</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 font-bold flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Worldwide DHL Express Courier</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>100% Fixed Dakshina Guarantee</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scriptural Authority on Remote Sankalp */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E1626] border border-amber-500/20 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <BookOpen className="w-5 h-5" />
            <h2 className="text-xl font-serif font-bold text-white">
              Shastra Praman: Is Remote / Online Pind Daan Valid?
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
            <p>
              In the <em>Garuda Purana (Pretakalpa)</em> and <em>Dharma Sindhu</em>, when an individual resides in distant lands (Deshantara), across oceans (Samudrottar), or is physically unable to undertake the arduous journey, they are prescribed to appoint a virtuous Brahmin as their <strong>Pratinidhi (authorized spiritual proxy)</strong>.
            </p>
            <p>
              With modern high-definition streaming, the descendant participates simultaneously by taking the Gotra Sankalp with water in their hands while watching the Gayawal Panda chant their exact names and lineage at the lotus feet of Lord Vishnu. The spiritual intent (Bhavana) and Vedic Mantras achieve the exact same fruit (Phalam) of ancestral Moksha.
            </p>
          </div>
        </div>

        {/* 4-Step Process Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono uppercase font-bold text-amber-400">Seamless International Process</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              How Remote Pind Daan Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((st, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-3xl font-serif font-bold text-amber-400/40 block">
                    {st.step}
                  </span>
                  <h3 className="font-bold text-sm text-white">{st.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NRI Packages Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono uppercase font-bold text-amber-400">Transparent Pricing</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Select Your Remote Ritual Package
            </h2>
            <p className="text-xs text-slate-400">Pay securely in USD ($) or INR (₹) via Credit Card, PayPal, or UPI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-[#0E1626] border border-amber-500/30 hover:border-amber-500 transition-all flex flex-col justify-between space-y-6 shadow-xl">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 inline-block">
                    {pkg.badge}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white">{pkg.title}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold text-amber-400">${pkg.priceUSD}</span>
                    <span className="text-xs text-slate-400">(₹{pkg.priceINR.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Duration: {pkg.duration}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">{pkg.desc}</p>
                </div>

                <Link
                  href={`/pre-booking?package=${pkg.slug}&tier=GOLD`}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs text-center transition-all shadow-lg shadow-amber-500/20 inline-flex items-center justify-center gap-2"
                >
                  <span>Book Remote Seva</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Prasad Kit Breakdown */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#10192A] via-[#0E1626] to-[#121B30] border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-amber-400">
            <Package className="w-5 h-5" />
            <h2 className="text-xl font-serif font-bold text-white">
              What is Included in Your International Prasad Kit
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {prasadItems.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Zero Extortion Pledge */}
        <ZeroExtortionPledge />

        {/* Dedicated NRI Concierge CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-serif">
              Need Assistance with Auspicious Timezone Scheduling?
            </h3>
            <p className="text-xs text-slate-900 font-medium">
              Our 24x7 NRI WhatsApp Concierge team assists with Gotra verification, date selection, and international payment support.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/917463055338?text=Namaste%2C%20I%20am%20an%20NRI%20and%20want%20to%20book%20remote%20Pind%20Daan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-slate-950 text-emerald-400 hover:text-emerald-300 font-bold text-xs shadow-xl inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
            <a
              href="tel:+917463055338"
              className="px-6 py-3 rounded-full bg-slate-900 text-amber-300 hover:text-white font-bold text-xs shadow-xl inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
