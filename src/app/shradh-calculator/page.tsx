import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight,
  ArrowRight,
  Sun,
  Flame
} from 'lucide-react';
import ShradhTithiCalculator from '@/components/calculator/ShradhTithiCalculator';
import ZeroExtortionPledge from '@/components/common/ZeroExtortionPledge';

export const metadata: Metadata = {
  title: 'Vedic Shradh Tithi & Kutup Muhurat Calculator 2026 | Gaya Ji Pind Daan',
  description: 'Calculate your ancestor’s exact Vedic Shradh Tithi from English death date. Find auspicious Kutup (11:36 AM) & Rohin Muhurat timings in Gaya Ji and book verified Gayawal Pandas.',
  keywords: [
    'Shradh Tithi Calculator',
    'Death anniversary to Hindu tithi converter',
    'Kutup Muhurat Gaya Ji',
    'Pitru Paksha 2026 dates tithi',
    'Sarva Pitru Amavasya date 2026',
    'Matri Navami shradh date',
    'Pind Daan muhurat today Gaya',
    'Gaya Shradh timing'
  ],
  alternates: {
    canonical: 'https://www.pinddaanwale.com/shradh-calculator'
  },
  openGraph: {
    title: 'Vedic Shradh Tithi & Kutup Muhurat Calculator | PindDaanWale',
    description: 'Calculate ancestral tithi and daily Kutup & Rohin Muhurat in Gaya Ji with 100% Shastra accuracy.',
    url: 'https://www.pinddaanwale.com/shradh-calculator',
    siteName: 'PindDaanWale',
    type: 'website'
  }
};

export default function ShradhCalculatorPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is Kutup Muhurat and why is it important for Shradh?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Kutup Muhurat is the 8th muhurat of the day (approximately 11:36 AM to 12:24 PM in Gaya Ji). In the Matsya Purana and Garuda Purana, Lord Vishnu states that offerings given during Kutup Muhurat never diminish and provide inexhaustible nourishment to departed ancestors.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I perform Shradh if I do not know my father or mother’s death tithi?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'If the death tithi or date of passing is unknown or forgotten, scriptures prescribe performing Pind Daan on Sarva Pitru Amavasya (the final day of Pitru Paksha) or under the immortal Akshayavat tree in Gaya Ji. This satisfies all known and unknown ancestors across 7 generations.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can Pind Daan be done after sunset in Gaya Ji?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'No. Strict Vedic rules prohibit performing Pind Daan and Tarpan after sunset (Ratri Shradh is strictly forbidden). All rituals must be completed between sunrise and late afternoon (Aparahna Kaal, before 03:36 PM).'
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto space-y-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-300 font-medium">Shradh Tithi & Muhurat Calculator</span>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C160C] via-[#101728] to-[#0A0E1A] border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>OFFICIAL VEDIC PANCHANG ENGINE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Vedic Shradh Tithi &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400">
                Kutup Muhurat Calculator
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Find the exact Hindu lunar tithi for your departed parents or ancestors, determine the scriptural <strong>Kutup & Rohin Muhurat</strong> timings in Gaya Ji, and discover the shastra-prescribed Pind Daan vidhi.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Shastra Compliant</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Gaya Ji Real-Time Muhurat</span>
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Calculator */}
        <ShradhTithiCalculator />

        {/* Zero Extortion Guarantee */}
        <ZeroExtortionPledge />

        {/* Scriptural Authority on Muhurat */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E1626] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <BookOpen className="w-5 h-5" />
            <h2 className="text-xl font-serif font-bold text-white">
              Why Timing (Muhurat) Matters for Pind Daan
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
            <p>
              According to the <em>Garuda Purana (Pretakalpa Ch. 12)</em>, the ancestors approach the earth realm during the midday period seeking nourishment from their living descendants. Performing tarpan or offering Pindas too early in the morning or after sunset is strictly prohibited.
            </p>
            <p>
              The day is divided into 15 Muhurats of 48 minutes each. The 8th Muhurat is <strong>Kutup</strong>, ruled by Lord Brahma, and the 9th is <strong>Rohin</strong>, ruled by the Sun. Ancestors eagerly receive Pindas placed during these two holy periods, granting immediate peace to troubled souls.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
