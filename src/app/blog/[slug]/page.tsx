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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let article: any = null;
  try {
    if (db.article) {
      article = await db.article.findUnique({ where: { slug } });
    }
  } catch (e) {}

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
    if (db.article) {
      article = await db.article.findUnique({ where: { slug } });
    }
  } catch (err) {
    console.error('Error fetching article:', err);
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
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300">Official Gaya Ji Teerth Desk</span>
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
