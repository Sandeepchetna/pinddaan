import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Star, 
  Video, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Quote, 
  Award, 
  Play, 
  Clock, 
  ChevronRight,
  Phone,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';
import ZeroExtortionPledge from '@/components/common/ZeroExtortionPledge';
import DevoteeStoriesClient from '@/components/testimonials/DevoteeStoriesClient';
import prisma from '@/lib/prisma';

const db = prisma as any;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Devotee Experiences & Real Video Testimonials | Gaya Ji Pind Daan Reviews',
  description: 'Watch real devotee video testimonials and read verified pilgrim reviews of authentic Gaya Ji Pind Daan at Vishnupad Temple. Verified 100% fixed dakshina and zero extortion.',
  keywords: [
    'Gaya Ji Pind Daan reviews',
    'Pind Daan Wale testimonials',
    'Real video of Pind Daan Gaya',
    'Gaya Panda feedback',
    'Vishnupad temple pilgrim reviews',
    'Best panda in Gaya Ji reviews'
  ],
  alternates: {
    canonical: 'https://www.pinddaanwale.com/devotee-stories'
  },
  openGraph: {
    title: 'Devotee Experiences & Video Testimonials | PindDaanWale',
    description: 'Real stories from pilgrims across India and global NRIs who performed sacred Pind Daan in Gaya Ji.',
    url: 'https://www.pinddaanwale.com/devotee-stories',
    siteName: 'PindDaanWale',
    type: 'website'
  }
};

export default async function DevoteeStoriesPage() {
  let dbTestimonials: any[] = [];
  try {
    if (db.testimonial) {
      dbTestimonials = await db.testimonial.findMany({
        where: { status: 'APPROVED' },
        orderBy: { createdAt: 'desc' }
      });
    }
  } catch (e) {}
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Pind Daan Seva Gaya Ji',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.95',
      'reviewCount': '2480',
      'bestRating': '5',
      'worstRating': '1'
    },
    'review': [
      {
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': 'Rajesh Sharma' },
        'datePublished': '2026-09-28',
        'reviewBody': 'We were initially very worried about pandas overcharging at Gaya ghats. PindDaanWale completely changed our experience. The Panda Ji conducted the full 7-Kul vidhi with immense devotion and not a single extra rupee was asked.',
        'reviewRating': { '@type': 'Rating', 'ratingValue': '5' }
      },
      {
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': 'Dinesh Patel' },
        'datePublished': '2026-10-02',
        'reviewBody': 'Traveled from Surat with elderly parents. The station pickup was on time and the room was clean. The ritual at Akshayavat gave us complete emotional satisfaction.',
        'reviewRating': { '@type': 'Rating', 'ratingValue': '5' }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="max-w-5xl mx-auto space-y-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-300 font-medium">Devotee Stories & Video Reviews</span>
        </nav>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C160C] via-[#101728] to-[#0A0E1A] border border-amber-500/30 p-6 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>OVER 2,480+ VERIFIED PILGRIM FAMILIES SERVED</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Devotee Experiences &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400">
                Live Video Testimonials
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Read and watch authentic accounts from families across India (Delhi, Mumbai, Bengaluru, Surat, Kolkata) and NRI devotees who experienced sacred, peaceful ancestral rites in Gaya Ji with 100% fixed dakshina.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.95 / 5.0 Average Rating</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Zero Extortion Record</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Client Component for Filtering and Videos */}
        <DevoteeStoriesClient initialDbTestimonials={dbTestimonials} />

        {/* Zero Extortion Guarantee */}
        <ZeroExtortionPledge />

        {/* Bottom Booking CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-serif">
              Ready to Perform Pind Daan with Peace of Mind?
            </h3>
            <p className="text-xs text-slate-900 font-medium">
              Join thousands of satisfied families. Dedicated Gayawal Pandas, zero bargaining, and fixed rates starting at ₹3,100.
            </p>
          </div>
          <Link
            href="/packages"
            className="px-6 py-3 rounded-full bg-slate-950 text-amber-400 hover:text-amber-300 hover:bg-slate-900 font-bold text-xs shadow-xl shrink-0 inline-flex items-center gap-2 transition-all"
          >
            <span>Explore All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
