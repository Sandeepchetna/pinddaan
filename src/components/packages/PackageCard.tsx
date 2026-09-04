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
  };
  showCompareLink?: boolean;
  defaultTier?: 'GOLD' | 'PLATINUM';
}

export default function PackageCard({ pkg, showCompareLink = true, defaultTier = 'PLATINUM' }: PackageCardProps) {
  // Tier state: 'GOLD' (Standard) or 'PLATINUM' (VIP) - Defaults to PLATINUM as requested
  const [tier, setTier] = useState<'GOLD' | 'PLATINUM'>(defaultTier);

  React.useEffect(() => {
    if (defaultTier) {
      setTier(defaultTier);
    }
  }, [defaultTier]);

  const isPlatinum = tier === 'PLATINUM';
  const price = isPlatinum && pkg.goldPriceINR ? pkg.goldPriceINR : pkg.priceINR;
  const inclusionsText = isPlatinum && pkg.goldInclusions ? pkg.goldInclusions : pkg.inclusions;
  const inclusionsList = inclusionsText ? inclusionsText.split('\n').filter(Boolean) : [];

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

  const badgeLabel = isPlatinum ? 'Platinum VIP Plan' : getCleanBadge(pkg.badge);

  return (
    <div
      className={`group bg-white rounded-[24px] p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between relative ${
        isPlatinum 
          ? 'border-2 border-[#C6922E] shadow-[0_12px_36px_rgba(198,146,46,0.14)] bg-gradient-to-b from-[#FAF7F2]/80 via-white to-[#FAF7F2]/40' 
          : 'border-[#EFE6D9] shadow-[0_4px_24px_rgba(43,33,24,0.05)] hover:shadow-[0_12px_32px_rgba(43,33,24,0.10)] hover:border-[#C6922E]/50 hover:-translate-y-1'
      }`}
    >
      
      {/* 1. Top Bar: Balanced Badge & Duration */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#EFE6D9]/70">
        <span 
          title={pkg.badge || badgeLabel}
          className={`text-[10.5px] uppercase font-body font-bold px-3 py-1 rounded-full tracking-wider truncate max-w-[180px] sm:max-w-[200px] select-none ${
            isPlatinum 
              ? 'bg-[#2B2118] text-amber-300 border border-amber-500/30 shadow-sm' 
              : 'bg-[#FAF7F2] text-[#C6922E] border border-[#EFE6D9]'
          }`}
        >
          {badgeLabel}
        </span>

        <span className="text-[11px] font-body font-semibold text-[#7A736A] flex items-center gap-1 shrink-0">
          <Clock className="w-3.5 h-3.5 text-[#C6922E]" />
          <span className="truncate max-w-[120px]">{pkg.duration}</span>
        </span>
      </div>

      {/* 2. Structured Content Body */}
      <div className="space-y-4 pt-3 flex-1 flex flex-col justify-between">
        
        {/* Title (Consistent 2-line min-height) */}
        <div className="min-h-[58px] sm:min-h-[64px] flex items-center">
          <h3 className="text-xl sm:text-[23px] font-display font-bold text-[#2B2118] group-hover:text-[#C6922E] transition-colors leading-[1.25] line-clamp-2">
            {pkg.title}
          </h3>
        </div>

        {/* Short Description (Consistent 3-line min-height) */}
        <div className="min-h-[60px] sm:min-h-[66px] flex items-start">
          <p className="text-[13px] sm:text-[13.5px] font-body text-[#5A5148] leading-relaxed line-clamp-3">
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
            <span>Gold Plan</span>
          </button>

          <button
            type="button"
            onClick={() => setTier('PLATINUM')}
            className={`py-2 px-2.5 rounded-[12px] text-xs font-body font-semibold transition-all flex items-center justify-center text-center leading-tight gap-1 select-none ${
              isPlatinum 
                ? 'bg-[#2B2118] text-amber-300 shadow-sm' 
                : 'text-[#7A736A] hover:text-[#2B2118] hover:bg-white/60'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Platinum VIP</span>
          </button>
        </div>

        {/* 4. Price Section (Aligned Baseline) */}
        <div className="py-3 px-3.5 rounded-[16px] bg-[#FAF7F2]/60 border border-[#EFE6D9]/80 flex items-center justify-between">
          <div>
            <div className="text-2xl sm:text-3xl font-body font-extrabold text-[#2B2118] tracking-tight">
              ₹{price.toLocaleString('en-IN')}
            </div>
            <span className="text-[10.5px] font-body text-[#7A736A] font-medium block">
              All-Inclusive Fixed Dakshina
            </span>
          </div>
          <span className="text-[10.5px] font-body font-semibold text-[#C6922E] bg-white border border-[#EFE6D9] px-2.5 py-1 rounded-full shadow-sm text-right">
            {isPlatinum ? 'VIP Cab + Stay' : 'Essential Rites'}
          </span>
        </div>

        {/* 5. Inclusions List (Even Height & Clear Checkmarks) */}
        <div className="space-y-2.5 pt-3 border-t border-[#EFE6D9]">
          <div className="flex items-center justify-between text-[11px] font-body font-bold text-[#7A736A] uppercase tracking-wider">
            <span>{isPlatinum ? '💎 Platinum Inclusions:' : '🌟 Key Inclusions:'}</span>
            <span className="text-[#C6922E]">{inclusionsList.length} Rites</span>
          </div>

          <ul className="space-y-2 text-[12.5px] font-body text-[#5A5148] min-h-[140px]">
            {inclusionsList.slice(0, 4).map((inc: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isPlatinum ? 'text-[#C6922E]' : 'text-emerald-700'}`} />
                <span className="leading-snug line-clamp-2">{inc}</span>
              </li>
            ))}
          </ul>
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

        <div className="flex justify-between items-center text-xs font-body text-[#7A736A] font-medium px-1">
          <a 
            href="tel:+917463055338" 
            className="hover:text-[#C6922E] flex items-center gap-1.5 font-semibold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>Call <span translate="no" className="notranslate">PindDaanWale</span></span>
          </a>
          
          {showCompareLink && (
            <Link 
              href={`/packages/${pkg.slug}/compare`} 
              className="hover:text-[#C6922E] font-semibold transition-colors text-[11px] flex items-center gap-1"
            >
              <span>Full Comparison →</span>
            </Link>
          )}
        </div>
      </div>

    </div>
  );
}
