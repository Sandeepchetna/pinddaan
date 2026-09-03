import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Share2, Phone, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';

const db = prisma as any;

export async function generateStaticParams() {
  try {
    if (db.article) {
      const articles = await db.article.findMany({ select: { slug: true } });
      return articles.map((a: any) => ({ slug: a.slug }));
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

import { getCachedData } from '@/lib/dbCache';

const FALLBACK_ARTICLES: Record<string, any> = {
  'why-pind-daan-is-performed-only-at-gaya-ji': {
    slug: 'why-pind-daan-is-performed-only-at-gaya-ji',
    title: 'Why Pind Daan is Performed Only at Holy Gaya Ji: Scriptural Proofs from Vayu Purana',
    category: 'Scriptural Knowledge',
    summary: 'Explore why Lord Vishnu bestowed the supreme boon of eternal salvation upon Gayasura and how offering pinds at Vishnupad grants instant Moksha to departed ancestors.',
    content: 'Holy Gaya Ji is revered across Vedic literature as the ultimate Moksha Dham for ancestral salvation...',
    readTime: '6 min read',
    publishedAt: '2026-08-15'
  },
  'complete-pitru-paksha-guidelines-for-nris': {
    slug: 'complete-pitru-paksha-guidelines-for-nris',
    title: 'Complete Pitru Paksha 2026 Guidelines for NRI Devotees Across USA, UK & Canada',
    category: 'NRI Pilgrimage Guide',
    summary: 'A step-by-step handbook on performing remote live stream Pind Daan, proxy Sankalp, and international delivery of sanctified prasadam.',
    content: 'For NRIs living across North America, Europe, and the Gulf, performing ancestor rites in Gaya Ji is now seamlessly enabled through 4K live video streams...',
    readTime: '8 min read',
    publishedAt: '2026-08-20'
  },
  'tri-sthali-pind-daan-gaya-kashi-prayag': {
    slug: 'tri-sthali-pind-daan-gaya-kashi-prayag',
    title: 'Tri-Sthali Pilgrimage: The Holy Trinity of Gaya, Kashi & Prayagraj for Ancestral Peace',
    category: 'Pilgrimage Circuit',
    summary: 'The spiritual sequence and eternal rewards of performing ancestral oblations across the sacred triangle of Bharat.',
    content: 'Sanatan Dharma mandates the sacred Tri-Sthali pilgrimage comprising Prayagraj (Mundan & Veni Daan), Kashi (Tarpan & Manikarnika Rites), and Gaya Ji (Final Pind Daan at Vishnupad)...',
    readTime: '7 min read',
    publishedAt: '2026-08-25'
  },
  'akshayavat-and-falgu-river-significance': {
    slug: 'akshayavat-and-falgu-river-significance',
    title: 'Akshayavat and Falgu River: The Mystical Secrets of Undying Blessings and Sita Kund',
    category: 'Sacred Shrines',
    summary: 'The timeless story of Mata Sita offering sand pind to King Dasharatha and the eternal blessing of Akshayavat Banyan.',
    content: 'During their exile, Lord Rama, Lakshmana, and Mata Sita arrived in Gaya to perform Shradh for King Dasharatha...',
    readTime: '5 min read',
    publishedAt: '2026-08-28'
  }
};

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
  } catch (err) {
    // handled below
  }

  if (!article) {
    article = FALLBACK_ARTICLES[slug];
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-[#F48D08] hover:text-[#D97706] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Knowledge Centre & Blog
          </Link>
          <span className="text-xs text-slate-400 font-medium">Gaya Ji Shradh Authority</span>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-amber-900/10 shadow-xl overflow-hidden space-y-8">
          
          {/* Hero Banner Image */}
          {article.image && (
            <div className="h-72 sm:h-96 w-full relative overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-10">
                <span className="bg-[#F48D08] text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                  {article.category || 'Vedic Guidance'}
                </span>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-12 space-y-8 pt-2">
            
            {/* Title & Metadata */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#6f1d14] leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-xs text-text-secondary border-y border-gray-100 py-3 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F48D08]" /> {article.readTime || '6 min read'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#F48D08]" /> Verified Scripture Guide
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <ShieldCheck className="w-4 h-4" /> Vishnupad Temple Certified
                </span>
              </div>
            </div>

            {/* Summary Callout Box */}
            {article.summary && (
              <div className="bg-amber-50/80 border-l-4 border-[#F48D08] p-5 rounded-r-2xl text-xs sm:text-sm text-amber-950 font-medium leading-relaxed italic">
                {article.summary}
              </div>
            )}

            {/* Main Content Body */}
            <div className="prose prose-amber max-w-none text-text-secondary text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-sans">
              {article.content}
            </div>

            {/* Ritual Guidance Box */}
            <div className="bg-[#2A1208] text-amber-100 p-8 rounded-3xl space-y-4 border border-[#F48D08]/30 shadow-lg">
              <div className="flex items-center gap-2 text-[#F48D08]">
                <Sparkles className="w-5 h-5 fill-current" />
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300">Sacred Gaya Ji Devotee Desk</span>
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                Planning Ancestral Rites at Gaya Ji?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
                Ensure authentic gotra recitation, verified lineage Pandas, and transparent Vedic arrangements. Whether attending in-person at Vishnupad Temple or booking remote live rites from abroad.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link 
                  href="/pre-booking" 
                  className="bg-[#F48D08] hover:bg-[#D97706] text-white px-8 py-3 rounded-full font-bold text-xs transition-all shadow-md flex items-center gap-2"
                >
                  <span>Pre-Book Pind Daan Package</span>
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                </Link>
                <a 
                  href="tel:+917463055338" 
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F48D08]" />
                  <span>Helpline: +91 7463055338</span>
                </a>
              </div>
            </div>

          </div>
        </article>

      </div>
    </div>
  );
}
