import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Users, 
  Award, 
  Star, 
  MessageCircle, 
  ExternalLink, 
  ChevronRight,
  Flame,
  Check,
  Compass
} from 'lucide-react';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { getCachedData } from '@/lib/dbCache';
import { 
  ArticleShareBar, 
  ArticleFaqAccordion, 
  SlidingCarousel 
} from '@/components/blog/ArticleInteractiveExtras';

const db = prisma as any;

export async function generateStaticParams() {
  try {
    if (db.article) {
      const articles = await db.article.findMany({ select: { slug: true } });
      if (articles && articles.length > 0) {
        return articles.map((a: any) => ({ slug: a.slug }));
      }
    }
  } catch (err) {}
  return [
    { slug: 'why-pind-daan-is-performed-only-at-gaya-ji' },
    { slug: 'complete-pitru-paksha-guidelines-for-nris' },
    { slug: 'tri-sthali-pind-daan-gaya-kashi-prayag' },
    { slug: 'akshayavat-and-falgu-river-significance' }
  ];
}

const FALLBACK_ARTICLES: Record<string, any> = {
  'why-pind-daan-is-performed-only-at-gaya-ji': {
    slug: 'why-pind-daan-is-performed-only-at-gaya-ji',
    title: 'Why Pind Daan is Performed Only at Holy Gaya Ji: Scriptural Proofs from Vayu Purana',
    category: 'Scriptural Knowledge',
    summary: 'Explore why Lord Vishnu bestowed the supreme boon of eternal salvation upon Gayasura and how offering pinds at Vishnupad grants instant Moksha to departed ancestors.',
    content: `Holy Gaya Ji is revered across Vedic literature as the ultimate Moksha Dham for ancestral salvation. According to the ancient Vayu Purana, this sacred soil possesses divine vibrations unlike anywhere else on Earth.

### The Divine Penance of Gayasura
Centuries ago, a demon named Gayasura performed thousands of years of rigorous asceticism. Lord Vishnu, pleased by his devotion, granted him a boon: anyone who touched his body would immediately be liberated from the cycle of rebirth and attain Vaikuntha.

### The Sacred Footprint (Vishnupad)
To balance cosmic order, the Devas requested Gayasura to lay his body on the earth so a grand yajna could be performed. When Gayasura complied, Lord Vishnu placed his lotus footprint directly upon his chest. Touched by the Lord's lotus feet, the entire land of Gaya became eternally sanctified.

> "A single grain of sesame offered at Gaya Ji with devotion delivers twenty-one generations of ancestors straight to the highest heavenly abode." — Vayu Purana

### Key Benefits of Performing Rites at Gaya:
1. Complete release from Pitru Dosha and ancestral curses
2. Liberation of unfulfilled departed souls (Preta Yoni Mukti)
3. Lasting prosperity, peace, and spiritual harmony for future generations`,
    readTime: '6 min read',
    publishedAt: '2026-08-15',
    image: '/images/gaya_vishnupad.jpg'
  },
  'complete-pitru-paksha-guidelines-for-nris': {
    slug: 'complete-pitru-paksha-guidelines-for-nris',
    title: 'Complete Pitru Paksha 2026 Guidelines for NRI Devotees Across USA, UK & Canada',
    category: 'NRI Pilgrimage Guide',
    summary: 'A step-by-step handbook on performing remote live stream Pind Daan, proxy Sankalp, and international delivery of sanctified prasadam.',
    content: `For non-resident Indians living across North America, Europe, Australia, and the Gulf, fulfilling sacred filial obligations to departed ancestors during Pitru Paksha can seem challenging due to distance and visa constraints.

### The Vedic Sanction for Proxy Sankalp
Vedic scriptures explicitly permit a designated descendant to perform Shradh via representation when physical travel is hindered by health, ocean travel, or duty. Under the guidance of hereditary Gaya Pandas, your family Gotra and ancestral names are invoked through sacred Vedic Sankalp.

### How Remote 4K Live Stream Rites Work:
1. **Gotra & Ancestor Documentation**: You provide the names of three generations of paternal and maternal ancestors.
2. **Scheduled Live Video Link**: Connect via two-way interactive Zoom or WhatsApp video on the exact auspicious tithi.
3. **Real-Time Sankalp**: You chant sacred mantras together with the purohit while the offerings are placed at Vishnupad.
4. **International Delivery**: Sanctified Falgu sand, Tulsi leaves, and Mahaprasadam are air-shipped with tracking.

> "Distance does not diminish the sincerity of devotion. The Lord of Gaya hears the prayer of a son offered from any corner of the globe."`,
    readTime: '8 min read',
    publishedAt: '2026-08-20',
    image: '/images/hero_cinematic.jpg'
  },
  'tri-sthali-pind-daan-gaya-kashi-prayag': {
    slug: 'tri-sthali-pind-daan-gaya-kashi-prayag',
    title: 'Tri-Sthali Pilgrimage: The Holy Trinity of Gaya, Kashi & Prayagraj for Ancestral Peace',
    category: 'Pilgrimage Circuit',
    summary: 'The spiritual sequence and eternal rewards of performing ancestral oblations across the sacred triangle of Bharat.',
    content: `Sanatan Dharma mandates the sacred Tri-Sthali pilgrimage comprising Prayagraj, Kashi, and Gaya Ji as the supreme pathway for complete ancestral liberation.

### 1. Prayagraj: The Holy Confluence (Triveni Sangam)
The journey begins at Triveni Sangam with ancestral tonsure (Mundan) and Veni Daan, casting away karmic impurities into the holy waters of Ganga, Yamuna, and Saraswati.

### 2. Kashi: Manikarnika and Lord Shiva's Grace
The second phase takes pilgrims to holy Varanasi. Near the Manikarnika Ghat and Brahma Ghat, Tarpan rites are performed under the supreme witness of Lord Vishwanath, ensuring spiritual elevation for souls who departed prematurely.

### 3. Gaya Ji: The Ultimate Conclusion at Vishnupad
The sacred culmination occurs at Gaya Ji. Only when pinds are placed upon the divine footprint of Lord Vishnu and under the immortal Akshayavat tree is the pilgrimage declared complete (Purna Ahuti).

> "Without visiting Gaya Ji, the rites performed at other pilgrimage centers remain incomplete." — Garuda Purana`,
    readTime: '7 min read',
    publishedAt: '2026-08-25',
    image: '/images/pind_daan_vidhi.jpg'
  },
  'akshayavat-and-falgu-river-significance': {
    slug: 'akshayavat-and-falgu-river-significance',
    title: 'The Mystery of Falgu River & The Immortal Akshayavat: Mata Sita\'s Sacred Blessing',
    category: 'Temple Sanctity',
    summary: 'Explore why Falgu river flows underground as Antahsalila and how the immortal Akshayavat tree stood as the sole truthful witness to Mata Sita\'s sand pinda offering to King Dasharatha.',
    content: `During their fourteen years of exile, Lord Rama, Mata Sita, and Lakshmana visited holy Gaya Ji to perform the ancestral Shradh for their deceased father, Maharaja Dasharatha. The events that unfolded on the banks of the Falgu river remain one of the most revered narratives in Vedic tradition.

### Mata Sita's Sand Pind Daan at Sita Kund
While Lord Rama and Lakshmana were away gathering ritual samagri (barley, fruits, and holy flowers), the auspicious Shradh muhurta arrived. Suddenly, the spirit of King Dasharatha appeared from the earth before Mata Sita with outstretched hands, pleading for an immediate offering of pinda.

Recognizing the spiritual urgency and having no food grains at hand, Mata Sita made five balls of sand from the banks of the Falgu river and offered them with pure devotion. Maharaja Dasharatha's soul accepted the sand pinda with immense joy, proclaimed his liberation, and vanished.

### The Five Witnesses and the False Testimony
When Lord Rama returned, Mata Sita explained what had happened. To confirm the miraculous event, she called upon five witnesses who were present:
1. The Falgu River
2. A Brahmin priest
3. A sacred cow
4. A Ketaki flower
5. The ancient Banyan Tree (Akshayavat)

Fearing that Lord Rama would not believe a sand offering or hoping for additional gifts, four of the witnesses denied seeing the event. Only the **Akshayavat tree** spoke the absolute truth, testifying that Mata Sita had indeed performed the sand Pind Daan and King Dasharatha had accepted it.

### The Curse and the Eternal Blessing
Deeply grieved by the untruthfulness, Mata Sita cursed the Falgu river to flow underground (Antahsalila), dry on the surface with water hidden beneath the sand. She cursed the cow to lose its front sanctity and the Ketaki flowers to never be used in Shiva worship.

Turning to the truthful Akshayavat, Mata Sita blessed it with eternal life:
> "You shall never wither, never shed your leaves, and never perish during cosmic dissolution. Anyone who performs Pind Daan under your holy boughs shall grant their ancestors indestructible (Akshay) liberation."

To this day, pilgrims conclude their sacred Gaya journey by offering the final pinda under the shade of the immortal Akshayavat, fulfilling the eternal promise granted by Mata Sita.`,
    readTime: '5 min read',
    publishedAt: '2026-08-28',
    image: '/images/akshayavat.png'
  }
};

const DEFAULT_SACRED_PLACES = [
  {
    slug: 'vishnupad-temple',
    name: 'Vishnupad Temple',
    tagline: 'Divine Lotus Footprint of Lord Vishnu',
    image: '/images/gaya_vishnupad.jpg',
    description: 'The epicenter of all Gaya rites, featuring the 40 cm footprint of Bhagwan Vishnu embossed in solid basalt rock.'
  },
  {
    slug: 'falgu-river',
    name: 'Falgu River & Sita Kund',
    tagline: 'Antahsalila River of Mata Sita\'s Sand Pind',
    image: '/images/falgu_river.png',
    description: 'The holy riverbank where Mata Sita offered sand pinda to King Dasharatha, renowned for subterranean pure water.'
  },
  {
    slug: 'akshayavat',
    name: 'Akshayavat Banyan Tree',
    tagline: 'The Eternal Tree of Everlasting Ancestral Peace',
    image: '/images/akshayavat.png',
    description: 'Blessed by Mata Sita to withstand cosmic deluge. Rites concluded here grant permanent release from the cycle of birth.'
  },
  {
    slug: 'pretshila',
    name: 'Pretshila Hill Shrine',
    tagline: 'Sacred Hill for Unfulfilled Ancestral Souls',
    image: '/images/pind_daan_vidhi.jpg',
    description: 'High vantage sacred shrine dedicated to pacifying spirits that passed untimely or with unfulfilled longings.'
  }
];

const DEFAULT_PACKAGES = [
  {
    slug: '1-day-essential-pind-daan',
    title: '1-Day Essential Pind Daan',
    priceINR: 4500,
    shortDesc: 'Falgu River, Vishnupad & Akshayavat with verified hereditary panda.',
    features: ['3 Sacred Vedis', 'Puja Samagri', 'Brahman Bhoj']
  },
  {
    slug: '3-day-complete-tri-sthali',
    title: '3-Day Tri-Sthali Pilgrimage',
    priceINR: 12500,
    shortDesc: 'Prayagraj Sangam, Kashi Manikarnika & all Gaya 45-Vedis with AC cab.',
    features: ['Prayag + Kashi + Gaya', 'AC Cab & Hotel', 'All 45 Vedis']
  },
  {
    slug: 'nri-remote-live-stream',
    title: 'NRI Remote Live Stream Rites',
    priceINR: 8500,
    shortDesc: 'Interactive 4K Zoom live Shradh with international DHL prasadam.',
    features: ['4K Zoom Live Stream', 'Gotra Sankalp', 'Global DHL Courier']
  },
  {
    slug: '1-day-express-pind-daan',
    title: 'Express Same-Day Rites',
    priceINR: 6500,
    shortDesc: 'Same-day priority puja at Vishnupad with station pickup and return.',
    features: ['Priority Darshan', 'Station Transfer', 'Full Samagri']
  }
];

const DEFAULT_FAQS = [
  {
    q: 'Can Pind Daan be performed in Falgu river even when it appears dry?',
    a: 'Yes, absolutely. Because of Mata Sita\'s sacred curse, the Falgu river flows as Antahsalila (underground stream). Pilgrims dig 6 to 12 inches into clean sand to reveal pure water for performing Tarpan and sand pinda offerings, following the exact tradition started by Mata Sita.'
  },
  {
    q: 'Why is Akshayavat Banyan tree mandatory for concluding Pind Daan?',
    a: 'Scriptures state that while rites at Falgu and Vishnupad fulfill the soul\'s immediate needs, offering the final pinda and receiving Panda Aashirwad under the Akshayavat Banyan tree seals eternal liberation (Akshay Tripti).'
  },
  {
    q: 'Can women perform Pind Daan according to Vedic scriptures?',
    a: 'Yes. Valmiki Ramayana and Garuda Purana establish that Mata Sita performed Pind Daan for King Dasharatha. Daughters and wives are fully authorized to offer pinda if there are no male descendants.'
  },
  {
    q: 'How does PindDaanWale protect devotees from middleman exploitation in Gaya?',
    a: 'PindDaanWale provides transparent, pre-booked arrangements directly with hereditary Vishnupad Pandas with 0% middleman fees, fixed dakshina, all-inclusive samagri, and no on-spot demands.'
  }
];

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-[#2B2118]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={match.index} className="italic text-amber-900">
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }
  return parts.length > 0 ? parts : [text];
}

function ArticleMarkdownContent({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let currentList: { type: 'ol' | 'ul'; items: string[] } | null = null;
  let currentQuote: string[] = [];

  const flushList = (key: number) => {
    if (!currentList) return;
    if (currentList.type === 'ol') {
      blocks.push(
        <ol key={`ol-${key}`} className="my-5 space-y-2.5 pl-1">
          {currentList.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/30 p-2.5 rounded-xl border border-amber-900/5">
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#8B2516] to-[#F48D08] text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                {i + 1}
              </span>
              <span className="pt-0.5 flex-1">{parseInlineMarkdown(item)}</span>
            </li>
          ))}
        </ol>
      );
    } else {
      blocks.push(
        <ul key={`ul-${key}`} className="my-4 space-y-2 pl-2">
          {currentList.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="w-2 h-2 rounded-full bg-[#F48D08] shrink-0 mt-2" />
              <span>{parseInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );
    }
    currentList = null;
  };

  const flushQuote = (key: number) => {
    if (currentQuote.length === 0) return;
    blocks.push(
      <blockquote
        key={`quote-${key}`}
        className="my-5 pl-5 py-3.5 pr-4 bg-gradient-to-r from-amber-50 via-orange-50/50 to-transparent border-l-4 border-amber-600 rounded-r-xl text-amber-950 font-serif italic text-sm sm:text-base leading-relaxed shadow-2xs"
      >
        <div className="flex items-start gap-2.5">
          <span className="text-3xl text-amber-500 font-serif select-none leading-none">“</span>
          <div>
            {currentQuote.map((q, i) => (
              <p key={i} className="mb-1 last:mb-0">
                {parseInlineMarkdown(q)}
              </p>
            ))}
          </div>
        </div>
      </blockquote>
    );
    currentQuote = [];
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(idx);
      flushQuote(idx);
      return;
    }

    if (trimmed.startsWith('>')) {
      flushList(idx);
      currentQuote.push(trimmed.replace(/^>\s*/, ''));
      return;
    } else {
      flushQuote(idx);
    }

    if (trimmed.startsWith('### ')) {
      flushList(idx);
      const headingText = trimmed.replace(/^###\s+/, '');
      blocks.push(
        <h3 key={idx} className="text-lg sm:text-xl font-serif font-bold text-[#6f1d14] mt-7 mb-2.5 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full bg-[#F48D08]" />
          <span>{parseInlineMarkdown(headingText)}</span>
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
      flushList(idx);
      const headingText = trimmed.replace(/^#+\s+/, '');
      blocks.push(
        <h2 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-[#2B2118] mt-8 mb-3 pb-2 border-b border-amber-900/10">
          {parseInlineMarkdown(headingText)}
        </h2>
      );
      return;
    }

    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList(idx);
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(olMatch[2]);
      return;
    }

    const ulMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList(idx);
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(ulMatch[1]);
      return;
    }

    flushList(idx);
    blocks.push(
      <p key={idx} className="text-slate-700 text-xs sm:text-sm md:text-[15px] leading-relaxed my-2.5 font-sans">
        {parseInlineMarkdown(trimmed)}
      </p>
    );
  });

  flushList(lines.length);
  flushQuote(lines.length);

  return <div className="space-y-1">{blocks}</div>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let article: any = null;
  try {
    article = await getCachedData(`article_${slug}`, async () => {
      return db.article ? await db.article.findUnique({ where: { slug } }) : null;
    });
  } catch (e) {}

  if (!article) {
    article = FALLBACK_ARTICLES[slug];
  }

  if (!article) return { title: 'Gaya Ji Vedic Knowledge | PindDaanWale' };

  return {
    title: `${article.metaTitle || article.title} | PindDaanWale`,
    description: article.metaDesc || article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [article.image || '/images/gaya_vishnupad.jpg']
    }
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article: any = null;

  try {
    article = await getCachedData(`article_${slug}`, async () => {
      return db.article ? await db.article.findUnique({ where: { slug } }) : null;
    });
  } catch (err) {}

  if (!article) {
    article = FALLBACK_ARTICLES[slug];
  }

  if (!article) {
    notFound();
  }

  // Related Articles
  let relatedArticles: any[] = [];
  try {
    if (db.article) {
      relatedArticles = await db.article.findMany({
        where: { slug: { not: slug } },
        take: 6,
        orderBy: { createdAt: 'desc' }
      });
    }
  } catch (_) {}

  if (!relatedArticles || relatedArticles.length === 0) {
    relatedArticles = Object.values(FALLBACK_ARTICLES)
      .filter((a: any) => a.slug !== slug);
  }

  // Sacred Vedis
  let sacredPlaces: any[] = [];
  try {
    if (db.sacredPlace) {
      sacredPlaces = await db.sacredPlace.findMany({ take: 6 });
    }
  } catch (_) {}
  if (!sacredPlaces || sacredPlaces.length === 0) {
    sacredPlaces = DEFAULT_SACRED_PLACES;
  }

  // Packages
  let packages: any[] = [];
  try {
    if (db.ritualPackage) {
      packages = await db.ritualPackage.findMany({ take: 6 });
    }
  } catch (_) {}
  if (!packages || packages.length === 0) {
    packages = DEFAULT_PACKAGES;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2118] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      {/* WIDE LUXURY CONTAINER (MAX-W-7XL) UTILIZING BROWSER HORIZONTAL REAL ESTATE */}
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP BREADCRUMB & SOCIAL SHARE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-900/10">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#F48D08] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/blog" className="hover:text-[#F48D08] transition-colors">Knowledge Centre</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-amber-800 font-semibold truncate max-w-[240px] sm:max-w-sm">
              {article.category || 'Scripture Guide'}
            </span>
          </nav>
          
          <ArticleShareBar title={article.title} />
        </div>

        {/* 2-COLUMN MODERN MAGAZINE EDITORIAL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT / MAIN ARTICLE CANVAS (8 COLS) */}
          <main className="lg:col-span-8 space-y-6">
            <article className="bg-white rounded-3xl border border-amber-900/10 shadow-md overflow-hidden">
              
              {/* Hero Banner Image */}
              {article.image && (
                <div className="h-64 sm:h-80 md:h-96 w-full relative overflow-hidden bg-slate-900">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-5 sm:p-8">
                    <div className="space-y-1.5">
                      <span className="inline-block bg-[#F48D08] text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                        {article.category || 'Vedic Sanctity'}
                      </span>
                      <p className="text-white/80 text-[11px] font-medium flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Garuda Purana & Vishnupad Temple Certified Guide</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-5 sm:p-8 md:p-10 space-y-6">
                {/* Title & Meta */}
                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#6f1d14] leading-tight">
                    {article.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-slate-500 border-y border-amber-900/10 py-2.5 font-medium">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-[#F48D08]" /> {article.readTime || '5 min read'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-[#F48D08]" /> Pitru Paksha 2026 Edition
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Rites
                    </span>
                  </div>
                </div>

                {/* Lead Summary */}
                {article.summary && (
                  <div className="bg-gradient-to-r from-amber-500/10 via-orange-50/50 to-transparent border-l-4 border-[#F48D08] p-4 sm:p-5 rounded-r-2xl text-xs sm:text-sm text-amber-950 font-medium leading-relaxed shadow-2xs">
                    <div className="flex items-center gap-2 text-amber-800 font-bold uppercase text-[10px] tracking-wider mb-1">
                      <Sparkles className="w-3 h-3 text-amber-600 fill-current" />
                      <span>Key Scriptural Essence</span>
                    </div>
                    {article.summary}
                  </div>
                )}

                {/* Body Content */}
                <div className="prose prose-amber max-w-none">
                  <ArticleMarkdownContent content={article.content} />
                </div>

                {/* Hereditary Pandit Ji Lineage Signature Card */}
                <div className="bg-amber-50/50 rounded-2xl p-4 sm:p-5 border border-amber-200/80 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#8B2516] to-[#F48D08] flex items-center justify-center text-white font-serif font-bold text-base shrink-0 shadow-sm">
                    प
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-[#2B2118]">
                        Reviewed by Hereditary Gayawal Panda Council
                      </h4>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">Verified</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                      Authored in compliance with Vayu Purana & Garuda Purana by Acharyas with 30+ years hereditary service at Vishnupad Temple.
                    </p>
                  </div>
                </div>

              </div>
            </article>
          </main>

          {/* RIGHT / STICKY EDITORIAL SIDEBAR (4 COLS) - UTILIZES PREVIOUSLY EMPTY WHITESPACE */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* WIDGET 1: DIRECT PRIEST & PRE-BOOKING CARD */}
            <div className="bg-gradient-to-br from-[#241006] via-[#1B0B04] to-[#2E1208] text-amber-100 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono font-extrabold tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md">
                  Vedic Booking Desk
                </span>
                <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Zero Middleman
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-white leading-snug">
                  Plan Sacred Gaya Rites
                </h3>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  Fixed dakshina, hereditary Vishnupad Panda, and complete samagri arrangements without bargaining.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <Link
                  href="/pre-booking"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Pre-Book Pind Daan (Pitru Paksha 2026)</span>
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+917463055338"
                    className="py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center justify-center gap-1 border border-white/15 transition-all text-center"
                  >
                    <Phone className="w-3 h-3 text-[#F48D08]" />
                    <span>Call Helpline</span>
                  </a>

                  <a
                    href="https://wa.me/917463055338?text=Pranam%20Pandit%20Ji%2C%20I%20need%20Gotra%20and%20Pind%20Daan%20guidance%20for%20Gaya%20Ji."
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-2.5 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/35 text-emerald-300 font-bold text-[11px] flex items-center justify-center gap-1 border border-emerald-500/30 transition-all text-center"
                  >
                    <MessageCircle className="w-3 h-3 text-emerald-400" />
                    <span>WhatsApp Help</span>
                  </a>
                </div>
              </div>
            </div>

            {/* WIDGET 2: SACRED VEDIS COMPACT HIGHLIGHTS */}
            <div className="bg-white rounded-2xl border border-amber-900/10 p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2B2118]">
                  <MapPin className="w-3.5 h-3.5 text-[#F48D08]" />
                  <span>Key Vedis Mentioned</span>
                </div>
                <Link href="/sacred-places" className="text-[11px] font-semibold text-[#F48D08] hover:underline">
                  All 45+ Vedis →
                </Link>
              </div>

              <div className="space-y-2.5">
                {sacredPlaces.slice(0, 3).map((place: any) => (
                  <Link
                    key={place.slug}
                    href={`/sacred-places/${place.slug}`}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50/60 transition-colors border border-transparent hover:border-amber-200 group"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <img 
                        src={place.heroImage || place.image || '/images/gaya_vishnupad.jpg'} 
                        alt={place.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs text-[#2B2118] group-hover:text-[#F48D08] transition-colors truncate">
                        {place.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        {place.tagline || 'Sacred ancestral shrine'}
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F48D08] shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* WIDGET 3: PITRU PAKSHA 2026 CALENDAR BADGE */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 rounded-2xl border border-amber-200 p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>Pitru Paksha Mela 2026 Schedule</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                <strong>26 Sept – 10 Oct 2026</strong>. Thousands of devotees arrive daily. Advance booking secures verified panda lineage and private Ghat space.
              </p>
              <Link
                href="/pre-booking"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 pt-1 underline"
              >
                <span>Check Auspicious Tithi & Book</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </aside>

        </div>

        {/* BOTTOM SECTION 1: RELATED ARTICLES (HORIZONTAL SLIDING CAROUSEL) */}
        <section className="space-y-4 pt-4 border-t border-amber-900/10">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Knowledge Expansion</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2118]">
                Related Articles & Shradh Guides
              </h2>
            </div>
            <Link 
              href="/blog" 
              className="text-xs font-bold text-[#F48D08] hover:text-[#D97706] flex items-center gap-1 transition-colors"
            >
              <span>View All ({relatedArticles.length + 1})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <SlidingCarousel>
            {relatedArticles.map((rel: any) => (
              <Link 
                key={rel.slug} 
                href={`/blog/${rel.slug}`}
                className="group bg-white rounded-2xl border border-amber-900/10 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-[280px] sm:min-w-[320px] max-w-[340px] shrink-0 snap-start"
              >
                <div>
                  <div className="h-36 w-full relative overflow-hidden bg-slate-100">
                    <img 
                      src={rel.image || '/images/gaya_vishnupad.jpg'} 
                      alt={rel.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#F48D08] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      {rel.category || 'Vedic Rites'}
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                      <Clock className="w-3 h-3 text-[#F48D08]" />
                      <span>{rel.readTime || '5 min read'}</span>
                    </div>
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-[#2B2118] group-hover:text-[#F48D08] transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {rel.summary}
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0 text-xs font-bold text-[#F48D08] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </SlidingCarousel>
        </section>

        {/* BOTTOM SECTION 2: RECOMMENDED RITUAL PACKAGES (HORIZONTAL SLIDING CAROUSEL) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Zero Middleman • Fixed Dakshina</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2118]">
                Recommended Pitru Paksha 2026 Packages
              </h2>
            </div>
            <Link 
              href="/packages" 
              className="text-xs font-bold text-[#F48D08] hover:text-[#D97706] flex items-center gap-1 transition-colors"
            >
              <span>All Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <SlidingCarousel>
            {packages.map((pkg: any) => (
              <div 
                key={pkg.slug} 
                className="bg-white rounded-2xl border border-amber-900/10 p-4 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between min-w-[280px] sm:min-w-[310px] max-w-[330px] shrink-0 snap-start"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#2B2118] leading-snug">
                      {pkg.title}
                    </h3>
                    <span className="bg-amber-100 text-amber-900 text-[11px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap">
                      ₹{pkg.priceINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                    {pkg.shortDesc}
                  </p>
                  <ul className="space-y-1 text-[11px] text-slate-700 pt-1.5 border-t border-gray-100">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Hereditary Vishnupad Panda</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Complete Puja Samagri</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Brahman Bhoj Included</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3">
                  <Link
                    href={`/pre-booking?package=${pkg.slug}`}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-all"
                  >
                    <span>Pre-Book This Package</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </SlidingCarousel>
        </section>

        {/* BOTTOM SECTION 3: SCRIPTURAL FAQS (COMPACT 2-COLUMN GRID) */}
        <section className="space-y-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Devotee Clarifications</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2118]">
              Frequently Asked Scriptural Questions
            </h2>
          </div>

          <ArticleFaqAccordion faqs={DEFAULT_FAQS} />
        </section>

        {/* BOTTOM SECTION 4: COMPACT LUXURY DEVOTEE HELP DESK */}
        <div className="bg-gradient-to-r from-[#2A1208] via-[#1B0B04] to-[#2A1208] text-amber-100 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#F48D08]">
              <Sparkles className="w-4 h-4 fill-current" />
              <span className="text-[11px] uppercase font-mono font-extrabold tracking-wider text-amber-300">
                Gaya Ji Sacred Devotee Desk
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
              Need Gotra Guidance or Custom Tithi Arrangements?
            </h3>
            <p className="text-xs text-gray-300 max-w-xl leading-relaxed">
              Connect directly with hereditary Gaya Purohits. In-person or remote 4K Zoom live stream with worldwide prasadam delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link 
              href="/pre-booking" 
              className="bg-gradient-to-r from-[#F48D08] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white px-6 py-2.5 rounded-full font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Pre-Book Rites</span>
              <Sparkles className="w-3.5 h-3.5 fill-current" />
            </Link>
            
            <a 
              href="tel:+917463055338" 
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#F48D08]" />
              <span>+91 7463055338</span>
            </a>

            <a 
              href="https://wa.me/917463055338?text=Pranam%20Pandit%20Ji%2C%20I%20need%20assistance%20regarding%20Gaya%20Pind%20Daan." 
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600/25 hover:bg-emerald-600/35 text-emerald-300 px-5 py-2.5 rounded-full font-bold text-xs border border-emerald-500/30 transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
