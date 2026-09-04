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
  ChevronRight
} from 'lucide-react';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { getCachedData } from '@/lib/dbCache';
import { ArticleShareBar, ArticleFaqAccordion } from '@/components/blog/ArticleInteractiveExtras';

const db = prisma as any;

export async function generateStaticParams() {
  try {
    if (db.article) {
      const articles = await db.article.findMany({ select: { slug: true } });
      if (articles && articles.length > 0) {
        return articles.map((a: any) => ({ slug: a.slug }));
      }
    }
  } catch (err) {
    // fallback
  }
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
    tagline: 'Antahsalila Holy River of Mata Sita\'s Sand Pind',
    image: '/images/falgu_river.png',
    description: 'The holy riverbank where Mata Sita offered sand pinda to King Dasharatha, renowned for its subterranean pure water.'
  },
  {
    slug: 'akshayavat',
    name: 'Akshayavat Immortal Banyan',
    tagline: 'The Eternal Tree of Everlasting Ancestral Peace',
    image: '/images/akshayavat.png',
    description: 'Blessed by Mata Sita to withstand cosmic deluge. Rites concluded here grant permanent release from the cycle of birth.'
  }
];

const DEFAULT_PACKAGES = [
  {
    slug: '1-day-essential-pind-daan',
    title: '1-Day Essential Pind Daan',
    priceINR: 4500,
    shortDesc: 'Complete single-day rites at Falgu River, Vishnupad Temple, and Akshayavat with dedicated Gaya Panda.',
    features: ['3 Sacred Vedis', 'Complete Puja Samagri', 'Hereditary Panda', 'Brahman Bhoj']
  },
  {
    slug: '3-day-complete-tri-sthali',
    title: '3-Day Tri-Sthali Pilgrimage',
    priceINR: 12500,
    shortDesc: 'Vedic sequence covering Prayagraj Sangam, Kashi Manikarnika, and all Gaya 45-Vedis with AC transfers.',
    features: ['Prayag + Kashi + Gaya', 'AC Private Cab', 'Comfort Hotel Stay', 'All 45 Vedis Covered']
  },
  {
    slug: 'nri-remote-live-stream',
    title: 'NRI Remote Live Stream Rites',
    priceINR: 8500,
    shortDesc: 'Interactive two-way 4K Zoom live Shradh ceremony from Vishnupad with international prasadam courier.',
    features: ['4K Zoom Live Stream', 'Gotra Sankalp by Panda', 'Video Recording', 'Global DHL Prasadam']
  }
];

const DEFAULT_FAQS = [
  {
    q: 'Can Pind Daan be performed in Falgu river even when it appears dry?',
    a: 'Yes, absolutely. Because of Mata Sita\'s sacred curse, the Falgu river flows as Antahsalila (underground stream). Pilgrims dig just 6 to 12 inches into the clean white sand to reveal crystal-clear holy water for performing Tarpan and sand pinda offerings, following the exact tradition started by Mata Sita.'
  },
  {
    q: 'Why is Akshayavat Banyan tree mandatory for concluding Pind Daan?',
    a: 'Scriptures state that while rites at Falgu river and Vishnupad fulfill the soul\'s immediate hunger, offering the final pinda and receiving Panda Aashirwad under the Akshayavat Banyan tree seals the liberation permanently (Akshay Tripti). Mata Sita blessed this tree so that oblations here never decay.'
  },
  {
    q: 'Can women perform Pind Daan according to Vedic scriptures?',
    a: 'Yes. The Valmiki Ramayana and Garuda Purana establish that Mata Sita performed Pind Daan for King Dasharatha in the absence of Lord Rama and Lakshmana. Daughters and wives are fully authorized to offer pinda and perform Tarpan if there are no male descendants.'
  },
  {
    q: 'How does PindDaanWale protect devotees from middleman exploitation in Gaya?',
    a: 'PindDaanWale provides transparent, pre-booked arrangements directly with hereditary Vishnupad Pandas with 0% middleman fees. Every package has fixed dakshina, all-inclusive samagri, guaranteed Brahman Bhoj, and no on-spot demands or haggling.'
  },
  {
    q: 'What if I do not know the exact tithi of my ancestor\'s passing?',
    a: 'According to the Garuda Purana, if the exact lunar tithi of death is unknown, Sarva Pitru Amavasya (the new moon day of Pitru Paksha) is universally auspicious for performing ancestral rites for all departed souls.'
  }
];

// Lightweight, resilient Markdown Renderer for rich article bodies
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
        <ol key={`ol-${key}`} className="my-6 space-y-3 pl-1">
          {currentList.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3.5 text-sm sm:text-base text-slate-700 leading-relaxed bg-amber-50/30 p-3 rounded-xl border border-amber-900/5">
              <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#8B2516] to-[#F48D08] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                {i + 1}
              </span>
              <span className="pt-0.5 flex-1">{parseInlineMarkdown(item)}</span>
            </li>
          ))}
        </ol>
      );
    } else {
      blocks.push(
        <ul key={`ul-${key}`} className="my-5 space-y-2.5 pl-2">
          {currentList.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 leading-relaxed">
              <span className="w-2 h-2 rounded-full bg-[#F48D08] shrink-0 mt-2.5" />
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
        className="my-7 pl-6 py-5 pr-6 bg-gradient-to-r from-amber-50 via-orange-50/60 to-transparent border-l-4 border-amber-600 rounded-r-2xl text-amber-950 font-serif italic text-base sm:text-lg leading-relaxed shadow-xs"
      >
        <div className="flex items-start gap-3">
          <span className="text-4xl text-amber-500 font-serif select-none leading-none">“</span>
          <div>
            {currentQuote.map((q, i) => (
              <p key={i} className="mb-1.5 last:mb-0">
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
        <h3 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-[#6f1d14] mt-9 mb-3.5 flex items-center gap-2.5">
          <span className="w-1.5 h-6 rounded-full bg-[#F48D08]" />
          <span>{parseInlineMarkdown(headingText)}</span>
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
      flushList(idx);
      const headingText = trimmed.replace(/^#+\s+/, '');
      blocks.push(
        <h2 key={idx} className="text-2xl sm:text-3xl font-serif font-bold text-[#2B2118] mt-11 mb-4 pb-2.5 border-b border-amber-900/10">
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
      <p key={idx} className="text-slate-700 text-sm sm:text-base leading-relaxed my-3.5 font-sans">
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

  // Load Related Articles from DB or Fallbacks
  let relatedArticles: any[] = [];
  try {
    if (db.article) {
      relatedArticles = await db.article.findMany({
        where: { slug: { not: slug } },
        take: 3,
        orderBy: { createdAt: 'desc' }
      });
    }
  } catch (_) {}

  if (!relatedArticles || relatedArticles.length === 0) {
    relatedArticles = Object.values(FALLBACK_ARTICLES)
      .filter((a: any) => a.slug !== slug)
      .slice(0, 3);
  }

  // Load Sacred Vedis
  let sacredPlaces: any[] = [];
  try {
    if (db.sacredPlace) {
      sacredPlaces = await db.sacredPlace.findMany({ take: 3 });
    }
  } catch (_) {}
  if (!sacredPlaces || sacredPlaces.length === 0) {
    sacredPlaces = DEFAULT_SACRED_PLACES;
  }

  // Load Packages
  let packages: any[] = [];
  try {
    if (db.ritualPackage) {
      packages = await db.ritualPackage.findMany({ take: 3 });
    }
  } catch (_) {}
  if (!packages || packages.length === 0) {
    packages = DEFAULT_PACKAGES;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2118] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* TOP BREADCRUMBS & SOCIAL SHARE */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-amber-900/10">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#F48D08] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/blog" className="hover:text-[#F48D08] transition-colors">Knowledge Centre</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-amber-800 font-semibold truncate max-w-[200px] sm:max-w-xs">{article.category || 'Scriptural Guide'}</span>
          </nav>
          
          <ArticleShareBar title={article.title} />
        </div>

        {/* MAIN ARTICLE HERO & BODY CONTAINER */}
        <article className="bg-white rounded-3xl border border-amber-900/10 shadow-xl overflow-hidden">
          
          {/* Hero Banner Image */}
          {article.image && (
            <div className="h-72 sm:h-96 w-full relative overflow-hidden bg-slate-900">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-10">
                <div className="space-y-2">
                  <span className="inline-block bg-[#F48D08] text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                    {article.category || 'Vedic Guidance'}
                  </span>
                  <p className="text-white/80 text-xs font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Garuda & Vayu Purana Verified Sanctity</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-10 md:p-12 space-y-8">
            
            {/* Title & Editorial Bar */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#6f1d14] leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 border-y border-amber-900/10 py-3 font-medium">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-[#F48D08]" /> {article.readTime || '6 min read'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-[#F48D08]" /> Updated for Pitru Paksha 2026
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Vishnupad Certified Rites
                </span>
              </div>
            </div>

            {/* Executive Summary / Lead Blurb */}
            {article.summary && (
              <div className="bg-gradient-to-r from-amber-500/10 via-orange-50/60 to-transparent border-l-4 border-[#F48D08] p-5 sm:p-6 rounded-r-2xl text-xs sm:text-sm text-amber-950 font-medium leading-relaxed shadow-xs">
                <div className="flex items-center gap-2 text-amber-800 font-bold uppercase text-[11px] tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-current" />
                  <span>Scriptural Core Essence</span>
                </div>
                {article.summary}
              </div>
            )}

            {/* Main Content Body (Rich Markdown Parsed) */}
            <div className="prose prose-amber max-w-none">
              <ArticleMarkdownContent content={article.content} />
            </div>

            {/* Hereditary Pandit Ji Lineage Signature Box */}
            <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8B2516] to-[#F48D08] flex items-center justify-center text-white font-serif font-bold text-lg shrink-0 shadow-md">
                प
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#2B2118]">Reviewed by Hereditary Gayawal Panda Council</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Authorized</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Verified by Acharyas with over 30 years of hereditary service at Vishnupad Temple and Falgu River. Every ritual step adheres strictly to the Garuda Purana, Vayu Purana, and Vedic Shradh Paddhati.
                </p>
              </div>
            </div>

          </div>
        </article>

        {/* SECTION 1: RELATED ARTICLES & SCRIPTURAL GUIDES */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
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
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedArticles.map((rel: any) => (
              <Link 
                key={rel.slug} 
                href={`/blog/${rel.slug}`}
                className="group bg-white rounded-2xl border border-amber-900/10 hover:border-amber-400 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 w-full relative overflow-hidden bg-slate-100">
                    <img 
                      src={rel.image || '/images/gaya_vishnupad.jpg'} 
                      alt={rel.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#F48D08] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      {rel.category || 'Vedic Rites'}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                      <Clock className="w-3 h-3 text-[#F48D08]" />
                      <span>{rel.readTime || '5 min read'}</span>
                    </div>
                    <h3 className="font-serif font-bold text-sm text-[#2B2118] group-hover:text-[#F48D08] transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {rel.summary}
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0 text-xs font-bold text-[#F48D08] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Scripture Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 2: TOP SACRED VEDIS CONNECTED TO THIS RITUAL */}
        <section className="space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Sacred Pilgrimage Shrines</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2118]">
              Primary Vedis Connected to Gaya Ji Pind Daan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {sacredPlaces.map((place: any) => (
              <div 
                key={place.slug}
                className="bg-white rounded-2xl border border-amber-900/10 p-4 space-y-3 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-32 w-full rounded-xl overflow-hidden relative">
                    <img 
                      src={place.heroImage || place.image || '/images/gaya_vishnupad.jpg'} 
                      alt={place.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#2B2118] leading-tight">
                      {place.name}
                    </h3>
                    <p className="text-[11px] font-medium text-amber-800 line-clamp-1 mt-0.5">
                      {place.tagline || 'Sacred Ancestral Spot'}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {place.description}
                    </p>
                  </div>
                </div>
                <Link 
                  href={`/sacred-places/${place.slug}`}
                  className="text-xs font-bold text-[#F48D08] hover:text-[#D97706] inline-flex items-center gap-1 pt-2 border-t border-gray-100"
                >
                  <span>Explore Pilgrimage History</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: RECOMMENDED RITUAL PACKAGES */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 fill-current" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packages.map((pkg: any) => (
              <div 
                key={pkg.slug} 
                className="bg-white rounded-2xl border border-amber-900/10 p-5 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-base text-[#2B2118] leading-snug">
                      {pkg.title}
                    </h3>
                    <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap">
                      ₹{pkg.priceINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {pkg.shortDesc}
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-gray-100">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Verified Hereditary Gaya Panda</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Complete Vedic Puja Samagri Included</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Brahman Bhoj & Dakshina Fixed</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 mt-2">
                  <Link
                    href={`/pre-booking?package=${pkg.slug}`}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Pre-Book This Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE SCRIPTURAL FAQS */}
        <section className="space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Devotee Clarifications</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2118]">
              Frequently Asked Scriptural Questions
            </h2>
          </div>

          <ArticleFaqAccordion faqs={DEFAULT_FAQS} />
        </section>

        {/* SECTION 5: DEVOTEE DESK & IMMEDIATE ASSISTANCE CALLOUT */}
        <div className="bg-gradient-to-br from-[#2A1208] via-[#1B0B04] to-[#3B170A] text-amber-100 p-8 sm:p-10 rounded-3xl space-y-5 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-2 text-[#F48D08]">
            <Sparkles className="w-5 h-5 fill-current" />
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
              Official Gaya Ji Devotee Helpdesk
            </span>
          </div>

          <div className="space-y-2 max-w-2xl">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Planning Ancestral Rites at Holy Gaya Ji?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Ensure authentic gotra recitation, verified hereditary Gaya Pandas, and 100% transparent arrangements without bargaining or middleman harassment. Whether attending in-person at Vishnupad Temple or booking remote live rites from abroad.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link 
              href="/pre-booking" 
              className="bg-gradient-to-r from-[#F48D08] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white px-7 py-3 rounded-full font-bold text-xs transition-all shadow-lg flex items-center gap-2"
            >
              <span>Pre-Book Pind Daan Package</span>
              <Sparkles className="w-3.5 h-3.5 fill-current" />
            </Link>
            
            <a 
              href="tel:+917463055338" 
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-full font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#F48D08]" />
              <span>Call Helpline: +91 7463055338</span>
            </a>

            <a 
              href="https://wa.me/917463055338?text=Pranam%20Pandit%20Ji%2C%20I%20want%20guidance%20regarding%20Pind%20Daan%20at%20Gaya%20Ji." 
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 px-5 py-3 rounded-full font-bold text-xs border border-emerald-500/30 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Gotra Help</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
