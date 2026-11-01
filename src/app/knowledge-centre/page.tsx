import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  BookOpen, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  Flame, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vedic Knowledge Centre | Garuda Purana & Pind Daan Shastras | PindDaanWale',
  description: 'Explore the definitive Vedic knowledge base on Pind Daan, Shradh, Tarpan, Pitru Paksha Muhurat, and Garuda Purana Pretakalpa scriptural guidelines.',
  keywords: [
    'Garuda Purana Pind Daan',
    'Vedic Shradh Vidhi',
    'Pitru Dosh symptoms',
    'Tarpan Vidhi Mantras',
    'Difference between Shradh and Pind Daan',
    'Pitru Paksha guidelines',
    'Gaya Mahatmya Vayu Purana'
  ],
  alternates: {
    canonical: 'https://www.pinddaanwale.com/knowledge-centre'
  }
};

export default function KnowledgeCentrePage() {
  const articles = [
    {
      title: 'Garuda Purana Pretakalpa: What Happens to the Soul After Death?',
      excerpt: 'Detailed analysis of chapters 1 to 14 of the Garuda Purana explaining the journey of the Sukshma Sharira (astral body), the 16 stages of Yamamarga, and why Pind Daan dissolves spiritual debts.',
      category: 'Scriptural Authority',
      readTime: '8 min read',
      href: '/blog/why-pind-daan-is-performed-only-at-gaya-ji'
    },
    {
      title: 'Difference Between Shradh, Tarpan, and Pind Daan Explained',
      excerpt: 'Many devotees use these terms interchangeably. Understand the exact Vedic distinction between daily Tarpan (water offering), annual Shradh (food offering on tithi), and Pind Daan (rice ball offering at holy tirthas).',
      category: 'Vedic Rituals',
      readTime: '6 min read',
      href: '/pind-daan'
    },
    {
      title: 'Signs of Pitru Dosh in Kundali & Prescribed Shastra Remedies',
      excerpt: 'Learn how classical texts like Brihat Parashara Hora Shastra identify Pitru Rin, along with authentic temple rituals including Tripindi Shradh and Narayan Bali performed at Pretshila Hill.',
      category: 'Astrology & Remedies',
      readTime: '10 min read',
      href: '/packages/pitra-dosh-puja-tripindi-shradh-'
    },
    {
      title: 'Akshayavat & Falgu River: The Story of Mother Sita’s Balu Pind Daan',
      excerpt: 'Read the ancient Valmiki Ramayana account of how Sita Mata offered sand Pindas for King Dasharatha, why Falgu was cursed to flow underground, and why Akshayavat tree was blessed with immortality.',
      category: 'Pilgrimage Legends',
      readTime: '7 min read',
      href: '/blog/akshayavat-and-falgu-river-significance'
    },
    {
      title: 'The Sacred 45 Vedis of Gaya Ji: The Ancient Pilgrimage Trail',
      excerpt: 'From Pretshila and Ramshila to Brahmakund, Vishnupad Garbhagriha, and Akshayavat. Discover the map and spiritual significance of all sacred altars in Gaya Ji.',
      category: 'Sacred Geography',
      readTime: '12 min read',
      href: '/sacred-places'
    },
    {
      title: 'NRI Guide to Remote Pind Daan & Digital Live Sankalp',
      excerpt: 'For global devotees living in the US, UK, Canada, Australia, and UAE unable to travel to Gaya Ji in person. Step-by-step protocol for live video stream gotra sankalp per Vedic Shastras.',
      category: 'NRI Services',
      readTime: '5 min read',
      href: '/blog/complete-pitru-paksha-guidelines-for-nris'
    }
  ];

  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-300 font-medium">Knowledge Centre</span>
        </nav>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C160C] via-[#101728] to-[#0A0E1A] border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>VEDIC SCRIPTURAL ENCYCLOPEDIA</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Gaya Ji & Vedic Ancestral{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400">
                Knowledge Centre
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Curated, authentic knowledge on Pind Daan, Shradh rites, Garuda Purana scriptural citations, and the timeless spiritual science behind ancestral liberation.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art, idx) => (
            <Link
              key={idx}
              href={art.href}
              className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800/90 hover:border-amber-500/50 hover:bg-[#121B30] transition-all flex flex-col justify-between space-y-4 shadow-lg group hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold">
                    {art.category}
                  </span>
                  <span className="text-slate-400">{art.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-bold group-hover:text-amber-300">
                <span>Read Full Scriptural Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Ask a Pandit CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-serif">
              Have Specific Questions About Your Ancestral Gotra or Vidhi?
            </h3>
            <p className="text-xs text-slate-900 font-medium">
              Consult with our certified 4th-generation Gayawal Tirth Purohits for shastra-compliant guidance.
            </p>
          </div>
          <a
            href="tel:+917463055338"
            className="px-6 py-3 rounded-full bg-slate-950 text-amber-400 hover:text-amber-300 font-bold text-xs shadow-xl shrink-0 inline-flex items-center gap-2"
          >
            <span>Talk to Gayawal Panda</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </main>
  );
}
