import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  Phone, 
  Crown, 
  Gem 
} from 'lucide-react';
import prisma from '@/lib/prisma';
import PackageTierToggle from '@/components/packages/PackageTierToggle';

const db = prisma as any;

export default async function PackagesPage() {
  let packages: any[] = [];

  try {
    if (db.ritualPackage) {
      packages = await db.ritualPackage.findMany({
        orderBy: { createdAt: 'desc' }
      });
    }
  } catch (err) {
    // fallback
  }

  // Fallback if empty DB
  if (packages.length === 0) {
    packages = [
      {
        id: 'p-1',
        slug: '1-day-essential-pind-daan',
        title: '1-Day Essential Pind Daan',
        duration: '1 Day (Approx 4-5 Hours)',
        priceINR: 4500,
        goldPriceINR: 7500,
        badge: 'MOST POPULAR',
        shortDesc: 'Ideal for devotees visiting Gaya Ji for a single day to perform essential rites at Vishnupad Temple & Falgu River.',
        inclusions: 'Verified Vishnupad Temple Teerth Panda\nComplete Vedic Samagri (Pind, Barley, Sesame, Milk, Honey)\nFalgu River & Vishnupad Temple Rites\nAkshayavat Thread Ceremony\nAncestral Dam Register & Lineage Registration',
        goldInclusions: 'VIP Senior Lineage Teerth Panda Assignment\nPrivate AC Cab Station/Hotel Pickup & Drop\nComplete Vedic Samagri & Special Bhog Offerings\nFalgu River, Vishnupad Temple & Sita Kund Rites\nAkshayavat Thread Ceremony & Lineage Certificate\nPriority Temple Darshan Access'
      },
      {
        id: 'p-2',
        slug: '3-day-complete-tri-sthali',
        title: '3-Day Complete 45-Vedi Pilgrimage',
        duration: '3 Days / 2 Nights',
        priceINR: 12500,
        goldPriceINR: 18500,
        badge: 'RECOMMENDED',
        shortDesc: 'Comprehensive pilgrimage covering Vishnupad, Falgu River, Akshayavat Banyan, Pretshila Hill, Ramshila, and Mangla Gauri Temple.',
        inclusions: 'Dedicated Vishnupad Teerth Panda Escort\n2 Nights Comfortable Hotel Accommodation\nPrivate AC Station Pickup from Gaya Station / Airport\nAll 45-Vedi Sacred Site Visits\nFull Ritual Samagri & Dakshina Included',
        goldInclusions: 'VIP Senior Lineage Teerth Panda Escort\n2 Nights 3-Star AC Deluxe Hotel Stay with Pure Veg Meals\nPrivate Chauffeur AC SUV Transport for Entire Trip\nVIP Escort across All 45 Sacred Vedis & Pretshila Hill\nSpecial Vishnupad Temple Aarti Access & Bhog Prasadam\nOfficial Teerth Lineage Certificate & Gold Blessing Kit'
      },
      {
        id: 'p-3',
        slug: 'nri-remote-live-stream',
        title: 'NRI Remote Live Stream Pind Daan',
        duration: 'Remote Live Stream (2 Hours)',
        priceINR: 8500,
        goldPriceINR: 14500,
        badge: 'NRI SPECIAL',
        shortDesc: 'For devotees abroad unable to travel. Live 4K video stream from Falgu River with sacred prasadam shipped globally.',
        inclusions: 'Dedicated 4K HD Live Stream on Zoom / YouTube Live\nName & Gotra Recitation during Sankalp\nPandit Ji Interactive Family Participation\nHigh-Definition Recording Provided\nSacred Pind Prasadam Shipped to USA/UK/Canada',
        goldInclusions: 'Exclusive 1-on-1 Private 4K Live Stream from Falgu & Vishnupad\nFull Ancestral Recitation of 3 Generations (Paternal & Maternal)\nPersonalized Sankalp Video Recording & Digital Certificate\nVIP Prasadam Box Shipped via Express Courier to Overseas Address\nSpecial Mahaprasad offering made in devotee name at Vishnupad'
      }
    ];
  }

  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary py-12 px-4 sm:px-6 space-y-16">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-[#F48D08]">
          Transparent & Fixed Dakshina Packages
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-text-primary">
          Curated Pind Daan Packages
        </h1>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Choose between our <strong>GOLD PLAN</strong> for essential rites or <strong>PLATINUM VIP PLAN</strong> for complete VIP chauffeur pickup, 3-star hotel stay & senior Teerth Panda care.
        </p>
      </div>

      {/* Tier Comparison Badge Ribbon */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-amber-900/10 shadow-sm">
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-900/10">
          <div className="w-10 h-10 rounded-full bg-[#F48D08] text-white flex items-center justify-center font-bold text-sm shrink-0">
            🌟
          </div>
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-text-primary">GOLD PLAN TIER</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Essential Pind Daan rites, verified Vishnupad panda, full puja samagri, and gotra sankalp.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/20 border border-amber-400/40">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6f1d14] via-[#F48D08] to-[#C6922E] text-white flex items-center justify-center font-bold shrink-0 shadow">
            <Crown className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-[#6f1d14]">PLATINUM VIP PLAN TIER</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Includes Senior Panda, Private AC SUV Pickup/Drop, 3-Star Hotel Stay, VIP Temple Access & Prasadam Box.
            </p>
          </div>
        </div>
      </div>

      {/* Client Component: Interactive GOLD vs PLATINUM Package Toggle Grid */}
      <PackageTierToggle initialPackages={packages} />

      {/* Guarantees Ribbon */}
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-3xl border border-amber-900/10 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-2 p-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-[#F48D08] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-serif font-bold text-sm">Verified Lineage Pandas</h4>
          <p className="text-xs text-text-secondary">Direct lineage pandas registered with Vishnupad Temple management.</p>
        </div>

        <div className="space-y-2 p-4 border-y sm:border-y-0 sm:border-x border-gray-100">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-[#F48D08] flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="font-serif font-bold text-sm">No Mid-Ritual Bargaining</h4>
          <p className="text-xs text-text-secondary">100% transparent pricing confirmed before your arrival in Gaya Ji.</p>
        </div>

        <div className="space-y-2 p-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-[#F48D08] flex items-center justify-center mx-auto">
            <Phone className="w-6 h-6" />
          </div>
          <h4 className="font-serif font-bold text-sm">24/7 Pilgrim Assistance</h4>
          <p className="text-xs text-text-secondary">Dedicated coordination desk for senior citizens and NRI families.</p>
        </div>
      </div>

    </div>
  );
}
