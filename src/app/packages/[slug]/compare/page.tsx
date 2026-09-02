import React from 'react';
import Link from 'next/link';
import { 
  Check, 
  Crown, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  ArrowLeft
} from 'lucide-react';
import prisma from '@/lib/prisma';

const db = prisma as any;

export async function generateStaticParams() {
  try {
    if (db.ritualPackage) {
      const pkgs = await db.ritualPackage.findMany({ select: { slug: true } });
      return pkgs.map((p: any) => ({ slug: p.slug }));
    }
  } catch (err) {}
  return [
    { slug: '1-day-essential-pind-daan' },
    { slug: '3-day-complete-tri-sthali' },
    { slug: 'nri-remote-live-stream' }
  ];
}

export default async function DynamicPackageComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let pkg: any = null;
  try {
    if (db.ritualPackage) {
      pkg = await db.ritualPackage.findUnique({ where: { slug } });
    }
  } catch (err) {}

  // Fallback data if DB offline or empty
  if (!pkg) {
    if (slug === '1-day-essential-pind-daan') {
      pkg = {
        slug: '1-day-essential-pind-daan',
        title: '1-Day Essential Pind Daan',
        duration: '1 Day (Approx 4-5 Hours)',
        priceINR: 4500,
        goldPriceINR: 7500,
        badge: 'MOST POPULAR',
        shortDesc: 'Ideal for devotees visiting Gaya Ji for a single day to perform essential rites at Vishnupad Temple & Falgu River.',
        inclusions: 'Verified Vishnupad Temple Teerth Panda\nComplete Vedic Samagri (Pind, Barley, Sesame, Milk, Honey)\nFalgu River & Vishnupad Temple Rites\nAkshayavat Thread Ceremony\nAncestral Lineage Registration',
        goldInclusions: 'VIP Senior Lineage Teerth Panda Assignment\nPrivate AC Cab Station/Hotel Pickup & Drop\nComplete Vedic Samagri & Special Bhog Offerings\nFalgu River, Vishnupad Temple & Sita Kund Rites\nAkshayavat Thread Ceremony & Lineage Certificate\nPriority Temple Darshan Access'
      };
    } else if (slug === '3-day-complete-tri-sthali') {
      pkg = {
        slug: '3-day-complete-tri-sthali',
        title: '3-Day Complete 45-Vedi Pilgrimage',
        duration: '3 Days / 2 Nights',
        priceINR: 12500,
        goldPriceINR: 18500,
        badge: 'RECOMMENDED',
        shortDesc: 'Comprehensive pilgrimage covering Vishnupad, Falgu River, Akshayavat Banyan, Pretshila Hill, Ramshila, and Mangla Gauri Temple.',
        inclusions: 'Dedicated Vishnupad Teerth Panda Escort\n2 Nights Comfortable Hotel Accommodation\nPrivate AC Station Pickup from Gaya Station / Airport\nAll 45-Vedi Sacred Site Visits\nFull Ritual Samagri & Dakshina Included',
        goldInclusions: 'VIP Senior Lineage Teerth Panda Escort\n2 Nights 3-Star AC Deluxe Hotel Stay with Pure Veg Meals\nPrivate Chauffeur AC SUV Transport for Entire Trip\nVIP Escort across All 45 Sacred Vedis & Pretshila Hill\nSpecial Vishnupad Temple Aarti Access & Bhog Prasadam\nOfficial Teerth Lineage Certificate & Gold Blessing Kit'
      };
    } else {
      pkg = {
        slug: 'nri-remote-live-stream',
        title: 'NRI Remote Live Stream Pind Daan',
        duration: 'Remote Live Stream (2 Hours)',
        priceINR: 8500,
        goldPriceINR: 14500,
        badge: 'NRI SPECIAL',
        shortDesc: 'For devotees abroad unable to travel. Live 4K video stream from Falgu River with sacred prasadam shipped globally.',
        inclusions: 'Dedicated 4K HD Live Stream on Zoom / YouTube Live\nName & Gotra Recitation during Sankalp\nPandit Ji Interactive Family Participation\nHigh-Definition Recording Provided\nSacred Pind Prasadam Shipped to USA/UK/Canada',
        goldInclusions: 'Exclusive 1-on-1 Private 4K Live Stream from Falgu & Vishnupad\nFull Ancestral Recitation of 3 Generations (Paternal & Maternal)\nPersonalized Sankalp Video Recording & Digital Certificate\nVIP Prasadam Box Shipped via Express Courier to Overseas Address\nSpecial Mahaprasad offering made in devotee name at Vishnupad'
      };
    }
  }

  const basicInclusions = pkg.inclusions ? pkg.inclusions.split('\n') : [];
  const goldInclusions = pkg.goldInclusions ? pkg.goldInclusions.split('\n') : [];
  const goldPrice = pkg.goldPriceINR || Math.round(pkg.priceINR * 1.5);

  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary py-12 px-4 sm:px-6 space-y-12">
      
      {/* Back Button & Navigation */}
      <div className="max-w-5xl mx-auto">
        <Link 
          href="/packages"
          className="inline-flex items-center gap-2 text-xs font-bold text-text-secondary hover:text-[#F48D08] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Packages</span>
        </Link>
      </div>

      {/* Header for Specific Package */}
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-[#F48D08]">
          Package Tier Comparison · {pkg.duration}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-text-primary">
          {pkg.title}
        </h1>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Compare <strong>Gold Plan</strong> vs. <strong>Platinum VIP Plan</strong> features, inclusions, and fixed dakshina managed dynamically via Admin CMS.
        </p>

        {/* Quick Contact Buttons */}
        <div className="flex justify-center gap-4 pt-2">
          <a
            href={`https://wa.me/917463055338?text=Pranam%20Pandit%20Ji,%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(pkg.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 shadow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Pandit Ji on WhatsApp</span>
          </a>

          <a
            href="tel:+917463055338"
            className="bg-white border border-amber-900/20 hover:border-[#F48D08] text-text-primary px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-sm"
          >
            <Phone className="w-4 h-4 text-[#F48D08]" />
            <span>Helpline: +91 7463055338</span>
          </a>
        </div>
      </div>

      {/* Dynamic Comparison Matrix Table for THIS Specific Package */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-amber-900/10 shadow-xl overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-amber-50/80 p-6 border-b border-amber-900/10 items-center">
          <div className="col-span-4 font-serif font-bold text-base text-text-primary">
            Ritual Services & Features
          </div>

          <div className="col-span-4 text-center space-y-1">
            <span className="text-[10px] uppercase font-extrabold px-3 py-1 rounded-full bg-amber-100 text-[#F48D08]">
              🌟 GOLD PLAN TIER
            </span>
            <div className="text-3xl font-serif font-bold text-[#F48D08]">
              ₹{pkg.priceINR.toLocaleString('en-IN')}
            </div>
            <span className="block text-[11px] text-text-secondary">Essential Rites</span>
          </div>

          <div className="col-span-4 text-center space-y-1">
            <span className="text-[10px] uppercase font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-[#4A154B] via-[#6f1d14] to-[#C6922E] text-white">
              💎 PLATINUM VIP TIER
            </span>
            <div className="text-3xl font-serif font-bold text-[#6f1d14]">
              ₹{goldPrice.toLocaleString('en-IN')}
            </div>
            <span className="block text-[11px] text-text-secondary">VIP Chauffeur & Hotel</span>
          </div>
        </div>

        {/* Feature Comparison Section: Gold Inclusions List */}
        <div className="p-6 space-y-4 border-b border-gray-100">
          <h3 className="font-serif font-bold text-sm text-text-primary flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Gold Tier Included Rites:</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
            {basicInclusions.map((inc: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium text-text-primary">{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Comparison Section: Platinum VIP Inclusions List */}
        <div className="p-6 space-y-4 bg-amber-50/40">
          <h3 className="font-serif font-bold text-sm text-[#6f1d14] flex items-center gap-2">
            <Crown className="w-4 h-4 text-[#C6922E]" />
            <span>Platinum VIP Tier Additional Exclusive Rites:</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-secondary">
            {goldInclusions.map((inc: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-100/50 border border-amber-300/40">
                <Crown className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                <span className="font-bold text-[#6f1d14]">{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="grid grid-cols-12 bg-gray-50 p-6 border-t border-amber-900/10 items-center gap-4">
          <div className="col-span-12 sm:col-span-4 text-xs font-bold text-text-secondary text-center sm:text-left">
            Select your preferred plan for {pkg.title}:
          </div>

          <div className="col-span-6 sm:col-span-4 text-center">
            <Link
              href={`/pre-booking?package=${pkg.slug}&tier=GOLD`}
              className="w-full inline-block bg-[#F48D08] hover:bg-[#D97706] text-white py-3.5 px-4 rounded-full font-bold text-xs shadow transition-all"
            >
              Book Gold Plan (₹{pkg.priceINR.toLocaleString('en-IN')})
            </Link>
          </div>

          <div className="col-span-6 sm:col-span-4 text-center">
            <Link
              href={`/pre-booking?package=${pkg.slug}&tier=PLATINUM`}
              className="w-full inline-block bg-gradient-to-r from-[#6f1d14] via-[#F48D08] to-[#C6922E] hover:opacity-95 text-white py-3.5 px-4 rounded-full font-bold text-xs shadow transition-all"
            >
              Book Platinum VIP Plan (₹{goldPrice.toLocaleString('en-IN')})
            </Link>
          </div>
        </div>

      </div>

      {/* Trust Guarantee Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto font-bold text-sm">✓</div>
          <h4 className="font-serif font-bold text-sm">Fixed Dakshina Guarantee</h4>
          <p className="text-xs text-text-secondary">No mid-puja demands or extra hidden fees.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-[#F48D08] flex items-center justify-center mx-auto font-bold text-sm">🏛️</div>
          <h4 className="font-serif font-bold text-sm">Verified Lineage Pandas</h4>
          <p className="text-xs text-text-secondary">Registered with Vishnupad Temple Management.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-[#F48D08] flex items-center justify-center mx-auto font-bold text-sm">📱</div>
          <h4 className="font-serif font-bold text-sm">Instant Booking Confirmation</h4>
          <p className="text-xs text-text-secondary">Assigned panda details delivered to your WhatsApp.</p>
        </div>
      </div>

    </div>
  );
}
