import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  MapPin, 
  Award, 
  HelpCircle,
  FileCheck,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import prisma from '@/lib/prisma';
import ZeroExtortionPledge from '@/components/common/ZeroExtortionPledge';

const db = prisma as any;

const FALLBACK_PACKAGES: Record<string, any> = {
  'shradh-pind-daan': {
    slug: 'shradh-pind-daan',
    title: 'Shradh Pind Daan',
    hindiTitle: 'श्राद्ध पिंडदान (मूल वैदिक विधि)',
    duration: '1–1.5 Hours',
    priceINR: 3100,
    badge: 'CORE SHRADDHA VIDHI',
    shortDesc: 'Focused Vedic Pind Daan Vidhi only at holy Falgu River and Vishnupad with authentic gotra sankalp.',
    inclusions: [
      'Pind Daan Vidhi Only',
      'Required Puja Samagri Included (Jau, Tila, Ghee, Kusha)',
      "Pandit Ji's Charges (Dakshina) Included",
      'Vedic Gotra & Ancestral Lineage Sankalp',
      'Pure Falgu Jal Tarpan'
    ],
    exclusions: [
      'Brahmin Bhojan (Charged Separately)',
      'Additional Brahmin Dakshina (Charged Separately)',
      'Any additional rituals not mentioned (Charged Separately)',
      'Hotel Accommodation & Cab Transfers (Pure Ritual Only)'
    ],
    vedisCovered: ['Falgu Devghat (फल्गु देवघाट)', 'Vishnupad Footprint (श्री विष्णुपद)'],
    scripturalSignificance: 'According to Dharma Sindhu, performing basic Pind Daan at Falgu bank satisfies departed souls and relieves spiritual debt.',
    faq: [
      {
        q: 'What is included in the ₹3,100 Shradh Pind Daan package?',
        a: 'The package covers the core Vedic Pind Daan vidhi performed by a verified Gayawal Panda, complete puja samagri (barley flour, black sesame, kusha, honey), and all priest dakshina. There are zero hidden costs at the ghat.'
      },
      {
        q: 'How long does this ritual take?',
        a: 'The Shradh Pind Daan takes approximately 1 to 1.5 hours to complete at Falgu River Devghat and Vishnupad.'
      }
    ]
  },
  'kanishtha-pind-daan': {
    slug: 'kanishtha-pind-daan',
    title: 'Kanishtha Pind Daan',
    hindiTitle: 'कनिष्ठ पिंडदान (सरल विधि)',
    duration: '2 Hours',
    priceINR: 4500,
    badge: 'SARAL VEDIC VIDHI',
    shortDesc: 'Essential Vedic Pind Daan Vidhi with 2 Thali Daan performed under authentic Gaya Panda guidance at Vishnupad & Falgu.',
    inclusions: [
      'Pind Daan Vidhi',
      '2 Thali Daan (पात्र दान)',
      'Required Puja Samagri Included',
      "Pandit Ji's Charges (Dakshina) Included",
      'Ancestral Gotra Sankalp',
      'Vishnupad Charan Arpan'
    ],
    exclusions: [
      'Brahmin Bhojan (Charged Separately)',
      'Additional Brahmin Dakshina (Charged Separately)',
      'Any additional rituals not mentioned (Charged Separately)',
      'Hotel Accommodation & Cab Transfers (Pure Ritual Only)'
    ],
    vedisCovered: ['Falgu Devghat', 'Sri Vishnupad Temple'],
    scripturalSignificance: 'Offering Pinda with 2 Thali Daan fulfills scriptural requirements for standard ancestor tarpana at Gaya Ji.',
    faq: [
      {
        q: 'What is 2 Thali Daan in Kanishtha Pind Daan?',
        a: '2 Thali Daan consists of traditional brass/copper vessel offerings sanctified by mantras and presented during the ritual to invoke ancestral blessings.'
      },
      {
        q: 'Can this be performed on any day?',
        a: 'Yes, Gaya Ji is considered a Moksha Tirtha active 365 days a year. While Pitru Paksha is most auspicious, Pind Daan can be performed on Amavasya, Purnima, or any day.'
      }
    ]
  },
  'madhyam-pind-daan': {
    slug: 'madhyam-pind-daan',
    title: 'Madhyam Pind Daan',
    hindiTitle: 'मध्यम पिंडदान (वैदिक विधि)',
    duration: '2–2.5 Hours',
    priceINR: 7500,
    badge: 'MOST POPULAR VIDHI',
    shortDesc: 'Traditional Vedic Gaya Ji Pind Daan with Kalash Puja, complete Pind Daan Vidhi, and 3 Vastra & Patra Daan for ancestral peace.',
    inclusions: [
      'Kalash Puja (कलश स्थापना एवं पूजन)',
      'Complete Pind Daan Vidhi',
      '3 Vastra and Patra Daan (वस्त्र एवं पात्र दान)',
      'Required Puja Samagri Included',
      "Pandit Ji's Charges (Dakshina) Included",
      'Tarpan with Gangotri Jal & Falgu Stream'
    ],
    exclusions: [
      'Brahmin Bhojan (Charged Separately)',
      'Additional Brahmin Dakshina (Charged Separately)',
      'Any additional rituals not mentioned (Charged Separately)',
      'Hotel Accommodation & Cab Transfers (Pure Ritual Only)'
    ],
    vedisCovered: ['Falgu Devghat', 'Sri Vishnupad Temple', 'Akshayavat (Blessings)'],
    scripturalSignificance: 'Garuda Purana: Authentic Kalash Puja and Pind Daan with Vastra & Patra Daan relieves ancestors from Yamamarga and bestows eternal peace.',
    faq: [
      {
        q: 'Why is Kalash Puja performed in Madhyam Pind Daan?',
        a: 'Kalash Puja invokes Varuna, Brahma, Vishnu, and Shiva along with sacred teerthas into the holy vessel to sanctify the offerings before offering Pindas.'
      },
      {
        q: 'Who performs the ritual?',
        a: 'A certified, hereditary Gayawal Panda with deep knowledge of Garuda Purana and Dharma Shastras conducts the entire vidhi.'
      }
    ]
  },
  'uttam-pind-daan': {
    slug: 'uttam-pind-daan',
    title: 'Uttam Pind Daan',
    hindiTitle: 'उत्तम पिंडदान (7 कुल उद्धार महाविधि)',
    duration: '3–3.5 Hours',
    priceINR: 11000,
    badge: 'SARVA SHRESTHA VIDHI',
    shortDesc: 'The most comprehensive Vedic ritual featuring Kalash Puja, 7 Kul Ka Pind Daan, and 5 Vastra & Patra Daan at Vishnupad & Falgu River.',
    inclusions: [
      'Kalash Puja (कलश स्थापना एवं विशेष संकल्प)',
      '7 Kul Ka Pind Daan (Pitru, Matru, Shwasur & Extended Lineages)',
      '5 Vastra and Patra Daan (पंच वस्त्र एवं पात्र दान)',
      'Required Puja Samagri Included (Desi Ghee, Til, Jau, Kusha, Honey)',
      "Pandit Ji's Charges (Dakshina) Included",
      'Vishnupad Footprint Arpan & Akshayavat Suphal'
    ],
    exclusions: [
      'Brahmin Bhojan (Charged Separately)',
      'Additional Brahmin Dakshina (Charged Separately)',
      'Any additional rituals not mentioned (Charged Separately)',
      'Hotel Accommodation & Cab Transfers (Pure Ritual Only)'
    ],
    vedisCovered: ['Falgu Devghat', 'Vishnupad Garbhagriha Footprint', 'Akshayavat (Immortal Banyan)'],
    scripturalSignificance: 'Vayu Purana & Agni Purana: Performing 7 Kul Pind Daan at Vishnupad liberates seven ancestral lineages on both paternal and maternal sides into Vishnu Lok.',
    faq: [
      {
        q: 'What is 7 Kul Ka Pind Daan in Uttam Pind Daan?',
        a: 'It offers dedicated Pindas for seven distinct ancestral lineages: Father’s lineage, Mother’s lineage, Grandmother’s, In-laws (Shwasur), maternal uncles, and teacher/spiritual guides, ensuring comprehensive liberation.'
      },
      {
        q: 'What is 5 Vastra and Patra Daan?',
        a: 'It includes five consecrated garments (vastras) and sacred metal vessels (patras) donated to invoke blessings of Vishnu, Brahma, and the ancestors.'
      }
    ]
  },
  'gaya-ji-1-day-pind-daan': {
    slug: 'gaya-ji-1-day-pind-daan',
    title: 'Gaya Ji 1-Day Pind Daan (With Stay & Cab)',
    hindiTitle: 'गया जी 1-दिवसीय पिंडदान (होटल एवं वाहन सहित)',
    duration: '1 Day (4–6 Hours Rituals)',
    priceINR: 7499,
    badge: 'NEW REDUCED RATE',
    shortDesc: 'Single-day layover rites at Falgu River & Vishnupad. Non-AC Room ₹7,499 / AC Room ₹8,499 / Platinum VIP Deluxe ₹12,499.',
    inclusions: [
      'Certified Gaya Teerth Purohit (Gayawal Panda)',
      'Ritual at Falgu Ghat & Vishnupad Temple',
      'Complete Organic Samagri Kit (Jau, Tila, Ghee, Gangotri Jal)',
      '2-Person Private Room Stay (Non-AC ₹7,499 / AC Room ₹8,499)',
      'Pure Satvik Prasad / Food',
      'Gaya Ji Railway Station / Airport Pickup & Drop (Auto/Cab)',
      'All Puja Samagri and Pandit Dakshina Included'
    ],
    exclusions: ['Extended 45-Vedi tour'],
    vedisCovered: ['Falgu Devghat', 'Sri Vishnupad Temple', 'Akshayavat'],
    scripturalSignificance: 'Ideal for pilgrims arriving by train in the morning, completing rituals in the afternoon, and departing by evening.',
    faq: [
      {
        q: 'What is the price difference between AC and Non-AC room in 1-Day package?',
        a: 'The Gold Plan with 2-person private Non-AC room is ₹7,499. With an AC room, it is ₹8,499. The Platinum VIP Plan with deluxe hotel and private AC Cab is ₹12,499.'
      },
      {
        q: 'Is station pickup included?',
        a: 'Yes, our representative will receive you at Gaya Junction railway station or Gaya Airport and escort you directly to your room and the holy ghats.'
      }
    ]
  },
  'gaya-ji-complete-3-day-pind-daan-3-days-': {
    slug: 'gaya-ji-complete-3-day-pind-daan-3-days-',
    title: 'Gaya Ji Complete 3-Day Pind Daan',
    hindiTitle: 'गया जी संपूर्ण त्रि-स्थली महापिंड दान (3 दिवसीय)',
    duration: '3 Days / 3 Nights',
    priceINR: 21449,
    badge: 'SHASTRA PRESCRIBED COMPLETE VIDHI',
    shortDesc: 'The complete Vedic ritual covering all 3 primary sacred points in Gaya Ji: Falgu River, Lord Vishnupad Footprint, and Akshayavat (Immortal Tree) with 3 nights stay.',
    inclusions: [
      'Dedicated 4th-Gen Vedic Teerth Purohit (Gayawal Panda)',
      'All 3 Primary Sacred Sites (Falgu River, Vishnupad Mandir, Akshayavat)',
      '100% Pure Organic Samagri (Barley, Black Sesame, Desi Ghee, Gangotri Jal)',
      '3-Night AC 2-Person Private Room Stay & Pure Satvik Meals',
      'Gaya Ji Railway Station / Airport Pickup & Drop',
      'Complete Puja Samagri, Brahmin Bhojan, and Dakshina Included'
    ],
    exclusions: ['Personal shopping & discretionary donations'],
    vedisCovered: ['Falgu Devghat', 'Vishnupad Footprint', 'Akshayavat', 'Sita Kund', 'Ramshila'],
    scripturalSignificance: 'Garuda Purana (Pretakalpa Ch. 11): Performing Pind Daan at all 3 Sthalis across three days ensures permanent liberation from Pitru Yoni and attains Moksha.',
    faq: [
      {
        q: 'Why does complete Pind Daan take 3 days?',
        a: 'Day 1 focuses on Snana & Tarpan at Falgu River; Day 2 is dedicated to Vishnupad Temple footprint Pinda Arpan; Day 3 concludes under the immortal Akshayavat tree with Suphal blessings from Gayawal Pandas.'
      }
    ]
  },
  'pitra-dosh-puja-tripindi-shradh-': {
    slug: 'pitra-dosh-puja-tripindi-shradh-',
    title: 'Pitra Dosh Puja (Tripindi Shradh)',
    hindiTitle: 'त्रिपिंडी श्राद्ध (पितृ दोष निवारण)',
    duration: '3–4 Hours',
    priceINR: 10449,
    badge: 'SPECIAL DOSHA NIVARANA',
    shortDesc: 'Specialized Vedic rite to pacify three categories of ancestors (Satvik, Rajasik, Tamasik) and eradicate severe Pitru Dosh from family horoscope.',
    inclusions: [
      'Tripindi Shradh Vidhi by Rigvedic & Yajurvedic Scholars',
      '3 Consecrated Pindas (Wheat, Rice, Barley Flour)',
      'Brahma, Vishnu, Maheshwara Kalash Sthapana',
      'Complete Samagri & Havanam',
      'Purohit Dakshina Included'
    ],
    exclusions: ['Hotel Stay & Transfers (Pure Ritual Only)'],
    vedisCovered: ['Pretshila Hill / Falgu River Bank'],
    scripturalSignificance: 'Brihat Parashara Hora Shastra prescribes Tripindi Shradh for relief from recurring financial hurdles, health issues, and delay in childbirth caused by Pitru Dosh.',
    faq: [
      {
        q: 'When should Tripindi Shradh be performed?',
        a: 'Tripindi Shradh is performed when an astrologer identifies Pitru Dosh in the Kundali, or when there are persistent unresolved obstacles in the family.'
      }
    ]
  },
  'gaya-ji-narayan-bali-': {
    slug: 'gaya-ji-narayan-bali-',
    title: 'Gaya Ji Narayan Bali Puja',
    hindiTitle: 'नारायण बलि पूजा (अकाल मृत्यु शांति)',
    duration: '4–5 Hours',
    priceINR: 12499,
    badge: 'UNNATURAL DEATH MOKSHA RITE',
    shortDesc: 'Sacred ritual performed for souls who passed away through unnatural or untimely circumstances (accident, illness, drowning) to ensure peaceful transmigration.',
    inclusions: [
      'Full Narayan Bali Vidhi with Lord Vishnu Golden/Silver Pratima Arpan',
      'Specialised Gayawal Purohit Guidance',
      'Complete Vedic Samagri & Dashagatra Shanti',
      'All Dakshina and Samagri Included'
    ],
    exclusions: ['Hotel Stay & Personal Cab'],
    vedisCovered: ['Pretshila Hill Altar & Falgu River'],
    scripturalSignificance: 'Garuda Purana explicitly mandates Narayan Bali to release souls trapped in the Preta Yoni after unnatural or untimely passing.',
    faq: [
      {
        q: 'What is the purpose of Narayan Bali Puja?',
        a: 'It releases souls that experienced sudden or accidental death from wandering in the astral plane, guiding them toward peace and spiritual liberation.'
      }
    ]
  }
};

export async function generateStaticParams() {
  const slugs = Object.keys(FALLBACK_PACKAGES);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolved = await params;
  const pkg = FALLBACK_PACKAGES[resolved.slug];

  if (!pkg) {
    return {
      title: 'Pind Daan Package | PindDaanWale',
      description: 'Authentic Vedic Pind Daan rituals in Gaya Ji with verified Gayawal Pandas.'
    };
  }

  const title = `${pkg.title} in Gaya Ji | ₹${pkg.priceINR.toLocaleString('en-IN')} Fixed Dakshina`;
  const description = `${pkg.shortDesc} Duration: ${pkg.duration}. 100% fixed dakshina, zero extortion guarantee, verified Gayawal Pandas at Vishnupad Temple & Falgu River.`;

  return {
    title,
    description,
    keywords: [
      pkg.title,
      `${pkg.title} Gaya Ji`,
      `${pkg.title} cost`,
      `${pkg.title} booking`,
      'Gaya Ji Pind Daan package',
      'Pind Daan cost in Gaya',
      'Vishnupad temple panda dakshina',
      'Zero extortion Pind Daan Gaya'
    ],
    alternates: {
      canonical: `https://www.pinddaanwale.com/packages/${pkg.slug}`
    },
    openGraph: {
      title,
      description,
      url: `https://www.pinddaanwale.com/packages/${pkg.slug}`,
      siteName: 'PindDaanWale',
      type: 'website'
    }
  };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  let pkg = FALLBACK_PACKAGES[resolved.slug];

  // Try DB if available
  if (!pkg && db?.ritualPackage) {
    try {
      const dbPkg = await db.ritualPackage.findUnique({ where: { slug: resolved.slug } });
      if (dbPkg) {
        pkg = {
          ...dbPkg,
          inclusions: typeof dbPkg.inclusions === 'string' ? dbPkg.inclusions.split('\n') : (dbPkg.inclusions || []),
          exclusions: typeof dbPkg.exclusions === 'string' ? dbPkg.exclusions.split('\n') : (dbPkg.exclusions || []),
          vedisCovered: ['Falgu Devghat', 'Sri Vishnupad Temple'],
          faq: []
        };
      }
    } catch (e) {}
  }

  if (!pkg) {
    notFound();
  }

  // Schema.org Product & Service structured data
  const packageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': `${pkg.title} in Gaya Ji`,
    'description': pkg.shortDesc,
    'offers': {
      '@type': 'Offer',
      'url': `https://www.pinddaanwale.com/packages/${pkg.slug}`,
      'price': String(pkg.priceINR),
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock',
      'priceValidUntil': '2026-12-31'
    },
    'brand': {
      '@type': 'Brand',
      'name': 'PindDaanWale'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.95',
      'reviewCount': '320'
    }
  };

  const faqSchema = pkg.faq && pkg.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': pkg.faq.map((item: any) => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a
      }
    }))
  } : null;

  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Structured Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packageSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-5xl mx-auto space-y-10">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/packages" className="hover:text-amber-400 transition-colors">Packages</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-300 font-medium">{pkg.title}</span>
        </nav>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C160C] via-[#101728] to-[#0A0E1A] border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{pkg.badge || 'VERIFIED VEDIC VIDHI'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                {pkg.title}
              </h1>

              {pkg.hindiTitle && (
                <p className="text-lg text-amber-200/90 font-serif">
                  {pkg.hindiTitle}
                </p>
              )}

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {pkg.shortDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Duration: <strong className="text-white">{pkg.duration}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Fixed Dakshina Guarantee</span>
                </div>
              </div>
            </div>

            {/* Price & Booking Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#18233C] to-[#0E1626] border border-amber-500/40 shrink-0 text-center space-y-4 shadow-xl md:w-72">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-mono">
                  Fixed Dakshina
                </span>
                <div className="text-4xl font-serif font-bold text-amber-400 pt-1">
                  ₹{pkg.priceINR.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-emerald-400 block pt-1 font-medium">
                  Zero Hidden Costs • All Dakshina Included
                </span>
              </div>

              <Link
                href={`/pre-booking?package=${pkg.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
              >
                <span>Book This Package</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-4 text-xs text-slate-400">
                <a
                  href="tel:+917463055338"
                  className="hover:text-amber-300 flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Helpdesk</span>
                </a>
                <span>•</span>
                <a
                  href="https://wa.me/917463055338?text=I%20want%20to%20book%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Zero Extortion Guarantee */}
        <ZeroExtortionPledge />

        {/* Inclusions & Exclusions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inclusions */}
          <div className="p-6 rounded-2xl bg-[#0E1626] border border-emerald-500/20 space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                What is Included
              </h2>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {Array.isArray(pkg.inclusions) && pkg.inclusions.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="p-6 rounded-2xl bg-[#0E1626] border border-rose-500/20 space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                Exclusions (Transparent Clarity)
              </h2>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {Array.isArray(pkg.exclusions) && pkg.exclusions.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sacred Vedis Covered */}
        {pkg.vedisCovered && pkg.vedisCovered.length > 0 && (
          <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Sacred Vedis Covered in this Vidhi</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {pkg.vedisCovered.map((place: string, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center gap-2 text-slate-300">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-medium text-white">{place}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scriptural Significance */}
        {pkg.scripturalSignificance && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/20 via-slate-900 to-amber-950/20 border border-amber-500/20 space-y-2">
            <h3 className="text-xs uppercase font-mono font-bold text-amber-400 flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              <span>Scriptural Authority (Shastra Praman)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{pkg.scripturalSignificance}"
            </p>
          </div>
        )}

        {/* FAQs */}
        {pkg.faq && pkg.faq.length > 0 && (
          <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-3">
              {pkg.faq.map((item: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300">{item.q}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-serif">
              Ready to Perform {pkg.title} at Gaya Ji?
            </h3>
            <p className="text-xs text-slate-900 font-medium">
              Advance booking ensures prioritized muhurat slots, dedicated senior Gayawal Panda, and 100% peace of mind.
            </p>
          </div>
          <Link
            href={`/pre-booking?package=${pkg.slug}`}
            className="px-6 py-3 rounded-full bg-slate-950 text-amber-400 hover:text-amber-300 hover:bg-slate-900 font-bold text-xs shadow-xl shrink-0 inline-flex items-center gap-2 transition-all"
          >
            <span>Confirm Booking Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
