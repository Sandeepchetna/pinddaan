'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Crown, CheckCircle2, ArrowRight, Phone, Scale, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface PackageCardProps {
  pkg: {
    id?: string;
    slug: string;
    title: string;
    duration: string;
    priceINR: number;
    goldPriceINR?: number;
    badge?: string;
    shortDesc: string;
    inclusions: string;
    goldInclusions?: string;
    image?: string | null;
  };
  defaultTier?: 'GOLD' | 'PLATINUM';
}

export default function PackageCard({ pkg, defaultTier = 'GOLD' }: PackageCardProps) {
  // Tier state: 'GOLD' (Standard) or 'PLATINUM' (VIP) - Defaults to GOLD as requested
  const [tier, setTier] = useState<'GOLD' | 'PLATINUM'>(defaultTier);

  React.useEffect(() => {
    if (defaultTier) {
      setTier(defaultTier);
    }
  }, [defaultTier]);

  const isPlatinum = tier === 'PLATINUM';
  const isNarayanOrTripindi = (() => {
    const s = ((pkg.slug || '') + ' ' + (pkg.title || '')).toLowerCase();
    return s.includes('narayan') || s.includes('tripindi') || s.includes('pitidosh') || s.includes('pitri');
  })();
  const price = isPlatinum && pkg.goldPriceINR ? pkg.goldPriceINR : pkg.priceINR;
  const inclusionsText = isPlatinum && pkg.goldInclusions ? pkg.goldInclusions : pkg.inclusions;
  const inclusionsList = inclusionsText ? inclusionsText.split('\n').filter(Boolean) : [];

  // Accurate, concise badge beside price
  const getPriceBadge = () => {
    if (isNarayanOrTripindi) return 'Pure Puja (No Stay/Vehicle)';
    const s = ((pkg.slug || '') + ' ' + (pkg.title || '')).toLowerCase();
    const is3Day = s.includes('3-day') || s.includes('3 day');
    const is1Day = s.includes('1-day') || s.includes('1 day');

    if (isPlatinum) {
      if (is3Day || is1Day) return 'VIP Cab + Hotel';
      return 'VIP Vidhi';
    } else {
      if (is3Day || is1Day) return 'Auto/Tempo + Hotel';
      return 'Essential Vidhi';
    }
  };

  // Shorten lengthy badges for a sleek single-line header
  const getCleanBadge = (b?: string) => {
    if (!b) return 'Sacred Pilgrimage Plan';
    if (b.includes('NRI')) return 'NRI Live Video Plan';
    if (b.includes('UNTIMELY')) return 'Narayan Bali Shanti';
    if (b.includes('48-VEDI') || b.includes('45-VEDI') || b.includes('PARIKRAMA')) return 'Complete 45-Vedi Parikrama';
    if (b.includes('POPULAR')) return 'Most Popular Plan';
    if (b.includes('RECOMMENDED')) return 'Recommended Plan';
    return b;
  };

  const badgeLabel = getCleanBadge(pkg.badge);

  return (
    <div
      className={`group bg-white rounded-[24px] p-5 sm:p-6 lg:p-5 xl:p-6.5 border transition-all duration-300 flex flex-col justify-between relative ${
        isPlatinum 
          ? 'border-2 border-[#C6922E] shadow-[0_12px_36px_rgba(198,146,46,0.14)] bg-gradient-to-b from-[#FAF7F2]/80 via-white to-[#FAF7F2]/40' 
          : 'border-[#EFE6D9] shadow-[0_4px_24px_rgba(43,33,24,0.05)] hover:shadow-[0_12px_32px_rgba(43,33,24,0.10)] hover:border-[#C6922E]/50 hover:-translate-y-1'
      }`}
    >
      
      {/* 1. Top Bar: Balanced Badge & Duration */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#EFE6D9]/70">
        <span 
          title={pkg.badge || badgeLabel}
          className="text-[10.5px] uppercase font-body font-bold px-3 py-1 rounded-full tracking-wider select-none bg-[#FAF7F2] text-[#C6922E] border border-[#EFE6D9]"
        >
          {badgeLabel}
        </span>

        <span className="text-[11px] font-body font-semibold text-[#7A736A] flex items-center gap-1 shrink-0">
          <Clock className="w-3.5 h-3.5 text-[#C6922E]" />
          <span>{pkg.duration}</span>
        </span>
      </div>

      {/* 2. Package Feature Poster Image */}
      <div className="relative w-full h-36 sm:h-40 rounded-[18px] overflow-hidden border border-[#EFE6D9] bg-[#FAF7F2] shrink-0 my-3 shadow-inner group-hover:border-[#C6922E]/50 transition-all">
        <img 
          src={pkg.image || '/images/gaya_vishnupad.jpg'} 
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.includes('/images/gaya_vishnupad.jpg')) {
              img.src = '/images/gaya_vishnupad.jpg';
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {/* 3. Structured Content Body */}
      <div className="space-y-4 flex-1 flex flex-col justify-between">
        
        {/* Title (Full Text, No Clamping) */}
        <div className="flex items-center">
          <h3 className="text-xl sm:text-[22px] font-display font-bold text-[#2B2118] group-hover:text-[#C6922E] transition-colors leading-[1.28]">
            {pkg.title}
          </h3>
        </div>

        {/* Short Description (Full Text, No Clamping) */}
        <div className="flex items-start">
          <p className="text-[13px] sm:text-[13.5px] font-body text-[#5A5148] leading-relaxed">
            {pkg.shortDesc}
          </p>
        </div>

        {/* 3. Luxury Segmented Tier Switcher */}
        <div className="bg-[#FAF7F2] p-1.5 rounded-[16px] border border-[#EFE6D9] grid grid-cols-2 gap-1.5 shadow-inner">
          <button
            type="button"
            onClick={() => setTier('GOLD')}
            className={`py-2 px-2.5 rounded-[12px] text-xs font-body font-semibold transition-all flex items-center justify-center text-center leading-tight select-none ${
              !isPlatinum 
                ? 'bg-[#C6922E] text-white shadow-sm' 
                : 'text-[#7A736A] hover:text-[#2B2118] hover:bg-white/60'
            }`}
          >
            <span>{isNarayanOrTripindi ? 'Vedic Vidhi' : 'Gold Plan'}</span>
          </button>

          <button
            type="button"
            onClick={() => setTier('PLATINUM')}
            className={`py-2 px-2.5 rounded-[12px] text-xs font-body font-semibold transition-all flex items-center justify-center text-center leading-tight gap-1 select-none ${
              isPlatinum 
                ? 'bg-[#C6922E] text-white shadow-sm' 
                : 'text-[#7A736A] hover:text-[#2B2118] hover:bg-white/60'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-white shrink-0" />
            <span>{isNarayanOrTripindi ? 'Complete Vidhi' : 'Platinum VIP'}</span>
          </button>
        </div>

        {/* 4. Price Section - Zero-Overlap Multi-Row Luxury Layout */}
        <div className="py-3 px-3.5 rounded-[18px] bg-[#FAF7F2]/90 border border-[#EFE6D9] space-y-1.5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-body text-[#7A736A] font-semibold tracking-wide">
              Fixed Vedic Dakshina
            </span>
            <span className="text-[10.5px] font-body font-semibold text-[#C6922E] bg-white border border-[#EFE6D9] px-2.5 py-0.5 rounded-full shadow-sm whitespace-nowrap shrink-0">
              {getPriceBadge()}
            </span>
          </div>
          <div className="text-2xl sm:text-[28px] font-body font-extrabold text-[#2B2118] tracking-tight leading-none whitespace-nowrap">
            ₹{price.toLocaleString('en-IN')}
          </div>
        </div>

        {/* 5. Inclusions List (Full Text, No Clamping) */}
        <div className="space-y-2.5 pt-3 border-t border-[#EFE6D9]">
          <div className="flex items-center justify-between text-[11px] font-body font-bold text-[#7A736A] uppercase tracking-wider">
            <span>{isPlatinum ? '💎 Platinum Inclusions:' : '🌟 Key Inclusions:'}</span>
            <span className="text-[#C6922E]">{inclusionsList.length} Rites</span>
          </div>

          <ul className="space-y-2.5 text-[12.5px] font-body text-[#5A5148]">
            {inclusionsList.map((inc: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isPlatinum ? 'text-[#C6922E]' : 'text-emerald-700'}`} />
                <span className="leading-snug">{inc}</span>
              </li>
            ))}
          </ul>

          {/* Explicit Notice for Narayan Bali & Tripindi (No Pickup/Drop, No Food, No Stay) */}
          {isNarayanOrTripindi && (
            <div className="text-xs text-amber-900 bg-amber-50/90 border border-amber-300/80 rounded-xl p-2.5 font-medium flex items-start gap-2 mt-3 shadow-xs">
              <span className="text-[#C6922E] font-bold text-sm shrink-0">ℹ️</span>
              <div className="space-y-0.5">
                <div className="font-bold text-amber-950">विशुद्ध वैदिक पूजा (Pure Ritual Only)</div>
                <div className="text-[11px] text-amber-900/90 leading-tight">
                  इस अनुष्ठान में पिकअप/ड्रॉप, भोजन और होटल स्टे शामिल नहीं है (No Pickup/Drop • No Food • No Hotel Stay)।
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 6. Action Footer (16px Radius Button & Call Link) */}
      <div className="space-y-3.5 pt-4 border-t border-[#EFE6D9] mt-3">
        <Link
          href={`/pre-booking?package=${pkg.slug}&tier=${tier}`}
          className="w-full text-center py-3.5 rounded-[16px] font-body font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 bg-[#C6922E] hover:bg-[#A97718] text-white active:scale-95"
        >
          <span>Book {tier === 'PLATINUM' ? 'Platinum VIP' : 'Gold'} Plan Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="flex justify-center items-center text-xs font-body text-[#7A736A] font-medium px-1">
          <a 
            href="tel:+917463055338" 
            className="hover:text-[#C6922E] flex items-center gap-1.5 font-semibold transition-colors py-1"
          >
            <Phone className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>Call Helpline: +91 7463055338</span>
          </a>
        </div>
      </div>

    </div>
  );
}
