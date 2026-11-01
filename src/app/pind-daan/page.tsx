import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Flame, 
  FileCheck,
  ChevronRight,
  Phone
} from 'lucide-react';
import ZeroExtortionPledge from '@/components/common/ZeroExtortionPledge';
import PindDaanCitySearch from '@/components/pind-daan/PindDaanCitySearch';

export const metadata: Metadata = {
  title: 'What is Pind Daan? Meaning, Vidhi, Significance, Cost & Procedure in Gaya Ji',
  description: 'Complete guide to Pind Daan in Gaya Ji. Learn Vedic significance, Garuda Purana rules, dates for 2026, who can perform it, step-by-step vidhi, and verified Gayawal Pandas with 100% fixed dakshina.',
  keywords: [
    'Pind Daan',
    'What is Pind Daan',
    'Pind Daan meaning',
    'Pind Daan procedure in Gaya',
    'Pind Daan cost in Gaya',
    'Who can perform Pind Daan',
    'What happens if Pind Daan is not done',
    'Pind Daan dates 2026',
    'Gaya Ji Pind Daan packages',
    'Vishnupad temple Pind Daan',
    'Falgu river tarpan',
    'Akshayavat Gaya',
    'Pitru Dosh nivaran Gaya'
  ],
  alternates: {
    canonical: 'https://www.pinddaanwale.com/pind-daan'
  },
  openGraph: {
    title: 'What is Pind Daan? Meaning, Vidhi, Significance & Procedure in Gaya Ji',
    description: 'The definitive Vedic guide to ancestral liberation (Moksha) at Vishnupad Temple and Falgu River in Gaya Ji. Transparent packages and certified Gayawal Pandas.',
    url: 'https://www.pinddaanwale.com/pind-daan',
    siteName: 'PindDaanWale',
    type: 'article'
  }
};

export default function PindDaanMasterPillarPage() {
  // 1. FAQPage Schema directly answering Google's People Also Ask (PAA)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What happens if Pind Daan is not done? (पिंडदान न करने से क्या होता है?)',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'According to the Garuda Purana and Dharma Shastras, if Pind Daan and Shradh are not performed for departed ancestors, their astral bodies (linga sharira) remain trapped in the restless Preta Yoni (wandering astral plane). This manifests as severe Pitru Dosh in the family lineage, causing recurring financial stagnation, unexplained physical illnesses, relationship discord, and hurdles in childbirth. Performing Pind Daan at Gaya Ji permanently releases the soul and ascends them into Pitru Loka and Vishnu Loka.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What are the dates for Pind Daan in 2026? (गया जी पिंडदान तिथियां 2026)',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Pitru Paksha Mahasangam 2026 in Gaya Ji will commence on 26th September 2026 (Bhadrapada Purnima) and conclude on 10th October 2026 (Sarva Pitru Amavasya / Mahalaya). While Pitru Paksha is the peak 16-day congregational festival, sacred scriptures confirm that Gaya Ji is an eternal Moksha Tirtha where Pind Daan can be performed on ANY day of the year, particularly on Amavasya, Purnima, and solar/lunar transits.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Who can give Pind Daan? (पिंडदान कौन कर सकता है?)',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Per Sanatana Dharma Shastras, the primary authority to perform Pind Daan belongs to the eldest son. In his absence, younger sons, grandsons, great-grandsons, or a brother can perform it. If a family has no male offspring, the Dharma Sindhu explicitly permits daughters, sons-in-law, or the surviving widow to perform the ancestral rites at Gaya Ji, ensuring no soul is left without liberation.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How to do Pind Daan in Gaya Ji? (गया जी में पिंडदान कैसे किया जाता है?)',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Pind Daan in Gaya Ji follows a sacred 3-step sequence: Step 1: Sacred Snana, purification, and barley-sesame Tarpan at Falgu River Devghat. Step 2: Consecration of 16 or 64 Pindas prepared with barley flour, milk, honey, and sesame offered directly onto the basalt 40cm footprint of Lord Vishnu at Vishnupad Temple. Step 3: Concluding rites under the immortal Akshayavat tree, where Brahmins and Gayawal Pandas grant the sacred "Suphal" declaration, signifying irreversible liberation of 21 generations.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is the cost of Pind Daan in Gaya Ji? (गया जी पिंडदान का खर्च कितना है?)',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'On PindDaanWale, authentic Vedic Pind Daan packages start at ₹3,100 (Shradh Pind Daan), ₹4,500 (Kanishtha Pind Daan), ₹7,500 (Madhyam Pind Daan), and ₹11,000 (Uttam Pind Daan with 7-Kul liberation). For pilgrims needing hotel stay and station transfers, the 1-Day layover package starts at ₹7,499. All packages feature 100% fixed dakshina, complete samagri, and zero middleman extortion.'
        }
      }
    ]
  };

  // 2. HowTo Schema for Step-by-Step Vidhi
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'Step-by-Step Procedure of Pind Daan in Gaya Ji',
    'description': 'The authentic Shastra-prescribed sequence of performing ancestral Pind Daan at Gaya Ji.',
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Falgu River Snana & Tarpan',
        'text': 'Pilgrims take a purifying bath at Devghat, wear clean unstitched dhoti, and offer water mixed with black sesame and kusha grass reciting Gotra Sankalp.'
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Pinda Pradaan at Vishnupad Temple',
        'text': 'Vedic Pandas consecrate round balls of barley and rice (Pinda) and offer them onto the sacred 40cm footstep of Lord Vishnu with Vedic mantras.'
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Akshayavat Suphal & Brahmin Bhojan',
        'text': 'The pilgrim visits the immortal Akshayavat tree, completes the ritual with Vastra and Patra daan, and receives the Gayawal Panda Suphal benediction.'
      }
    ]
  };

  // 3. Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'What is Pind Daan? Meaning, Vidhi, Significance & Procedure in Gaya Ji',
    'description': 'The definitive Vedic guide to ancestral liberation (Moksha) at Vishnupad Temple and Falgu River in Gaya Ji.',
    'author': {
      '@type': 'Organization',
      'name': 'PindDaanWale Gayawal Tirth Council',
      'url': 'https://www.pinddaanwale.com'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'PindDaanWale',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.pinddaanwale.com/Pind-Daan-Wale.svg'
      }
    },
    'datePublished': '2025-01-15T00:00:00+05:30',
    'dateModified': '2026-11-01T08:00:00+05:30',
    'mainEntityOfPage': 'https://www.pinddaanwale.com/pind-daan'
  };

  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-5xl mx-auto space-y-12">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-300 font-medium">Pind Daan Ultimate Guide</span>
        </nav>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C160C] via-[#101728] to-[#0A0E1A] border border-amber-500/30 p-6 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>THE DEFINITIVE VEDIC SHASTRA GUIDE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              What is Pind Daan?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400">
                Meaning, Vidhi, Significance & Cost in Gaya Ji
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              In Sanatana Dharma, <strong>Pind Daan</strong> (पिंडदान) is the supreme spiritual rite of ancestral offering. Rooted in the ancient <em>Garuda Purana</em> and <em>Vayu Purana</em>, it is the sacred bridge through which living descendants liberate departed ancestors from the cycle of rebirth and elevate them to <strong>Vishnu Loka (Moksha)</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Fixed Dakshina Guarantee</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Vedic Shastra & Garuda Purana Praman</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Open 365 Days in Gaya Ji</span>
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Meaning and Spiritual Science */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-serif font-bold text-white">
              1. What is Pind Daan? Meaning & The Spiritual Science
            </h2>
          </div>
          <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800/90 text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              The word <strong>"Pinda"</strong> (पिंड) originates from Sanskrit, signifying the physical body, aggregate matter, or nourishment. <strong>"Daan"</strong> (दान) signifies selfless offering. When an individual passes away, the gross physical body (Sthula Sharira) dissolves, but the subtle astral body (Sukshma/Linga Sharira) continues its journey carrying unfulfilled worldly desires (Vasanas) and karmic imprints.
            </p>
            <p>
              Until specific Vedic rites are performed, the soul remains in an intermediate state known as the <em>Preta Awastha</em>. Through Pind Daan, consecrated circular balls made of cooked rice, barley flour (Jau), black sesame seeds (Kala Til), honey, and desi ghee are offered with sacred Vedic mantras. This acts as spiritual nourishment, dissolving the Preta body and enabling the soul to ascend into the peaceful realm of the ancestors (Pitru Loka) and ultimately achieve <strong>Moksha (eternal liberation)</strong>.
            </p>
          </div>
        </section>

        {/* Section 2: Why Gaya Ji is the Supreme Moksha Tirtha */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-serif font-bold text-white">
              2. Why Gaya Ji is the Supreme Pilgrimage for Pind Daan
            </h2>
          </div>
          <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800/90 text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              While Pind Daan can be performed at Varanasi, Prayagraj, Haridwar, and Badrinath (Brahma Kapal), <strong>Gaya Ji is revered in Sanatana Dharma as the Mahateerth (supreme destination)</strong>. According to the <em>Gaya Mahatmya</em> in the Vayu Purana:
            </p>
            <blockquote className="p-4 rounded-xl bg-amber-950/20 border-l-4 border-amber-500 text-amber-200 text-xs sm:text-sm font-mono italic">
              "एकोऽपि यदि पुत्रः स्याद् गयां गत्वा समाहितः। पिण्डं दद्यात् पितॄणां तु स तेषां मुक्तिमाप्नुयात्॥"<br />
              <span className="text-slate-300 not-italic font-sans text-xs pt-1 block">
                (Even if a person has just one son who visits Gaya Ji with devotion and offers a single Pinda, all his ancestors achieve supreme liberation.)
              </span>
            </blockquote>
            <p>
              <strong>The Legend of Gayasura:</strong> In the Satya Yuga, a pious demon king named Gayasura performed rigorous penance. Pleased by his devotion, Lord Vishnu granted him the boon that anyone who saw him or touched him would attain Moksha. To stabilize the universe, the gods placed a sacred rock (Dharma Shila) upon Gayasura, and Lord Vishnu permanently pressed His divine footstep upon the rock. Lord Vishnu declared that Gaya would forever remain the supreme center for ancestor liberation.
            </p>
            <p>
              <strong>Lord Rama & Mother Sita at Falgu River:</strong> In the Treta Yuga, Lord Rama, Lakshmana, and Mother Sita visited Gaya Ji to perform Shradh for their father, King Dasharatha. When Rama and Lakshmana were gathering samagri, King Dasharatha’s spirit appeared before Mother Sita. Sita Mata offered balls of Falgu sand (*Balu Pind*) with the Falgu River, a cow, a tulsi plant, and an Akshayavat tree as witnesses, granting instant Moksha to the Emperor.
            </p>
          </div>
        </section>

        {/* Section 3: The 4 Core PAA Questions (Google Ranking Snippets) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-serif font-bold text-white">
              3. Crucial Questions Answered (People Also Ask)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PAA 1 */}
            <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                Question 1
              </span>
              <h3 className="font-bold text-base text-white">
                What happens if Pind Daan is not done?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If Pind Daan is neglected, the deceased remains trapped in the Preta Yoni (unsettled spirit state). Scriptural texts describe that the soul hungers and thirsts for ancestral remembrance. This unresolved spiritual debt leads to <strong>Pitru Dosh</strong> in the family chart, manifesting as chronic financial distress, recurrent medical ailments, family disharmony, and impediments in marriage or childbirth. Performing Pind Daan at Gaya Ji dissolves this condition across 7 ancestral generations.
              </p>
            </div>

            {/* PAA 2 */}
            <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                Question 2
              </span>
              <h3 className="font-bold text-base text-white">
                What are the dates for Pind Daan in 2026?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Pitru Paksha 2026</strong> in Gaya Ji starts on <strong>26th September 2026</strong> (Bhadrapada Purnima) and ends on <strong>10th October 2026</strong> (Sarva Pitru Amavasya). However, Gaya Ji is a <strong>365-day Moksha Dham</strong>. Unlike domestic home shraddhas that require specific tithi match, Pind Daan can be performed at Vishnupad Temple on any day of the year, especially on Amavasya, Somvati Amavasya, and Sankranti.
              </p>
            </div>

            {/* PAA 3 */}
            <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                Question 3
              </span>
              <h3 className="font-bold text-base text-white">
                Who can give Pind Daan? (Can daughters do it?)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                By primary tradition, the eldest son carries the duty of performing Pind Daan. In his absence, younger sons, grandsons, brothers, or a nephew can perform the rites. <strong>Importantly, if a family has no male children, the Dharma Sindhu and Garuda Purana expressly permit daughters or wives to perform Pind Daan</strong>. Mother Sita herself performed Pind Daan for King Dasharatha, establishing absolute scriptural validity for women devotees.
              </p>
            </div>

            {/* PAA 4 */}
            <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                Question 4
              </span>
              <h3 className="font-bold text-base text-white">
                How to do Pind Daan in Gaya Ji? (Step-by-Step)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The ritual is executed across the 3 primary Sacred Vedis:
                <br /><strong className="text-white">1. Falgu River Devghat:</strong> Snana, Kusha ring purification, and Gotra Tarpan with black sesame seeds.
                <br /><strong className="text-white">2. Vishnupad Temple:</strong> Offering consecrated Pindas directly onto Lord Vishnu’s 40cm basalt charan paduka.
                <br /><strong className="text-white">3. Akshayavat:</strong> Offering final Pinda under the immortal banyan tree and receiving the Gayawal Panda "Suphal" blessing.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Transparent Ritual Packages */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h2 className="text-2xl font-serif font-bold text-white">
                  4. Official Gaya Ji Pind Daan Packages (100% Fixed Dakshina)
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                Zero middleman extortion. Every package includes verified Gayawal Pandas, organic samagri, and complete gotra sankalp.
              </p>
            </div>
            <Link
              href="/packages"
              className="text-xs text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1 shrink-0"
            >
              <span>View All Packages & Tiers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Package 1 */}
            <div className="p-5 rounded-2xl bg-[#0E1626] border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300">
                  1–1.5 Hours
                </span>
                <h3 className="font-bold text-base text-white">Shradh Pind Daan</h3>
                <div className="text-2xl font-serif font-bold text-amber-400">₹3,100</div>
                <p className="text-xs text-slate-300">
                  Core Vedic Pind Daan at Falgu River & Vishnupad with authentic gotra sankalp.
                </p>
              </div>
              <Link
                href="/packages/shradh-pind-daan"
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-bold text-xs text-center transition-all"
              >
                View Details & Book
              </Link>
            </div>

            {/* Package 2 */}
            <div className="p-5 rounded-2xl bg-[#0E1626] border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300">
                  2 Hours
                </span>
                <h3 className="font-bold text-base text-white">Kanishtha Pind Daan</h3>
                <div className="text-2xl font-serif font-bold text-amber-400">₹4,500</div>
                <p className="text-xs text-slate-300">
                  Essential Vedic Pind Daan Vidhi with 2 Thali Daan under senior Panda guidance.
                </p>
              </div>
              <Link
                href="/packages/kanishtha-pind-daan"
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-bold text-xs text-center transition-all"
              >
                View Details & Book
              </Link>
            </div>

            {/* Package 3 */}
            <div className="p-5 rounded-2xl bg-[#0E1626] border border-amber-500/40 hover:border-amber-500 transition-all flex flex-col justify-between space-y-4 shadow-lg">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  MOST POPULAR
                </span>
                <h3 className="font-bold text-base text-white">Madhyam Pind Daan</h3>
                <div className="text-2xl font-serif font-bold text-amber-400">₹7,500</div>
                <p className="text-xs text-slate-300">
                  Traditional ritual with Kalash Puja, Pind Daan, and 3 Vastra & Patra Daan.
                </p>
              </div>
              <Link
                href="/packages/madhyam-pind-daan"
                className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs text-center transition-all shadow-md shadow-amber-500/20"
              >
                View Details & Book
              </Link>
            </div>

            {/* Package 4 */}
            <div className="p-5 rounded-2xl bg-[#0E1626] border border-amber-500/40 hover:border-amber-500 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300">
                  SARVA SHRESTHA
                </span>
                <h3 className="font-bold text-base text-white">Uttam Pind Daan</h3>
                <div className="text-2xl font-serif font-bold text-amber-400">₹11,000</div>
                <p className="text-xs text-slate-300">
                  Comprehensive 7-Kul liberation with Kalash Puja, and 5 Vastra & Patra Daan.
                </p>
              </div>
              <Link
                href="/packages/uttam-pind-daan"
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-bold text-xs text-center transition-all"
              >
                View Details & Book
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
            Need hotel stay and station transfers? Explore our <Link href="/packages/gaya-ji-1-day-pind-daan" className="text-amber-400 font-bold hover:underline">1-Day Gaya Ji Layover Package (from ₹7,499)</Link> or special <Link href="/packages/pitra-dosh-puja-tripindi-shradh-" className="text-amber-400 font-bold hover:underline">Tripindi Shradh (₹10,449)</Link> & <Link href="/packages/gaya-ji-narayan-bali-" className="text-amber-400 font-bold hover:underline">Narayan Bali (₹12,499)</Link>.
          </div>
        </section>

        {/* Section 5: Zero Extortion Pledge */}
        <ZeroExtortionPledge />

        {/* Section 6: Interactive 54+ City Departure Directory */}
        <section className="space-y-6 pt-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl font-serif font-bold text-white">
                5. Gaya Ji Pilgrimage Directory from Your City (54+ Hubs)
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Detailed train routes (Vande Bharat, Rajdhani), flight logistics, and verified Gayawal Panda assistance from all major Indian cities and global NRI destinations.
            </p>
          </div>

          <PindDaanCitySearch />
        </section>

      </div>
    </main>
  );
}
