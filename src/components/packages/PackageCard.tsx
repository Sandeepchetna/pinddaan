'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Crown, CheckCircle2, ArrowRight, Phone, Sparkles, Scale, Gem } from 'lucide-react';

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
}

export default function PackageCard({ pkg, showCompareLink = true }: PackageCardProps) {
  // Tier state: 'GOLD' (Standard) or 'PLATINUM' (VIP)
  const [tier, setTier] = useState<'GOLD' | 'PLATINUM'>('GOLD');

  const isPlatinum = tier === 'PLATINUM';
  const price = isPlatinum && pkg.goldPriceINR ? pkg.goldPriceINR : pkg.priceINR;
  const inclusionsText = isPlatinum && pkg.goldInclusions ? pkg.goldInclusions : pkg.inclusions;
  const inclusionsList = inclusionsText ? inclusionsText.split('\n') : [];

  return (
    <div
      className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all flex flex-col justify-between space-y-6 relative ${
        isPlatinum 
          ? 'border-2 border-[#C6922E] shadow-xl bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20' 
          : 'border-amber-900/10 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Top Badge */}
      <div className="flex justify-between items-center gap-2">
        <span className={`text-[10px] uppercase font-extrabold px-3 py-1 rounded-full tracking-wider shadow-sm ${
          isPlatinum 
            ? 'bg-gradient-to-r from-[#4A154B] via-[#6f1d14] to-[#C6922E] text-white' 
            : 'bg-amber-100 text-[#F48D08]'
        }`}>
          {isPlatinum ? '💎 PLATINUM VIP TIER' : (pkg.badge || '🌟 GOLD PLAN')}
        </span>

        {showCompareLink && (
          <Link 
            href={`/packages/${pkg.slug}/compare`}
            className="text-[11px] font-bold text-text-secondary hover:text-[#F48D08] inline-flex items-center gap-1"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Compare Tiers</span>
          </Link>
        )}
      </div>

      <div className="space-y-4 pt-1">
        
        {/* Title & Duration */}
        <div className="space-y-1">
          <span className="text-xs font-semibold text-[#F48D08]">{pkg.duration}</span>
          <h3 className="text-2xl font-serif font-bold text-text-primary leading-tight">
            {pkg.title}
          </h3>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed">
          {pkg.shortDesc}
        </p>

        {/* INLINE GOLD VS PLATINUM SWITCHER BUTTON INSIDE CARD */}
        <div className="bg-amber-50/80 p-1 rounded-2xl border border-amber-900/10 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setTier('GOLD')}
            className={`flex-1 py-2 px-3 rounded-xl text-[11px] font-bold transition-all ${
              !isPlatinum 
                ? 'bg-[#F48D08] text-white shadow-sm' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            GOLD (₹{pkg.priceINR.toLocaleString('en-IN')})
          </button>

          <button
            type="button"
            onClick={() => setTier('PLATINUM')}
            className={`flex-1 py-2 px-3 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
              isPlatinum 
                ? 'bg-gradient-to-r from-[#6f1d14] via-[#F48D08] to-[#C6922E] text-white shadow-sm' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Crown className="w-3 h-3 text-amber-300" />
            <span>PLATINUM (₹{(pkg.goldPriceINR || pkg.priceINR * 1.5).toLocaleString('en-IN')})</span>
          </button>
        </div>

        {/* Dynamic Price Calculation Display */}
        <div className="pt-2 flex items-baseline gap-2">
          <div className="text-3xl font-serif font-bold text-[#F48D08]">
            ₹{price.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-400 font-medium">All-Inclusive Fixed Dakshina</span>
        </div>

        {/* Included Services List Difference */}
        <div className="space-y-2.5 pt-4 border-t border-gray-100">
          <span className="text-[11px] uppercase tracking-wider font-bold text-gray-500 flex items-center justify-between">
            <span>{isPlatinum ? '💎 Platinum VIP Services Included:' : '🌟 Gold Services Included:'}</span>
            <span className="text-[10px] font-bold text-[#F48D08]">{inclusionsList.length} Features</span>
          </span>
          <ul className="space-y-2 text-xs text-text-secondary font-medium">
            {inclusionsList.map((inc: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isPlatinum ? 'text-[#C6922E]' : 'text-emerald-600'}`} />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <Link
          href={`/pre-booking?package=${pkg.slug}&tier=${tier}`}
          className={`w-full text-center py-3.5 rounded-full font-bold text-xs transition-all shadow flex items-center justify-center gap-2 ${
            isPlatinum
              ? 'bg-gradient-to-r from-[#6f1d14] via-[#F48D08] to-[#C6922E] hover:opacity-95 text-white'
              : 'bg-[#F48D08] hover:bg-[#D97706] text-white'
          }`}
        >
          <span>Book {tier} Plan Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="flex justify-between items-center text-[11px] text-gray-500 font-medium px-1">
          <a href="tel:+917463055338" className="hover:text-[#F48D08] flex items-center gap-1 font-bold">
            <Phone className="w-3 h-3 text-[#F48D08]" /> Call Panda
          </a>
          <Link href={`/packages/${pkg.slug}/compare`} className="hover:text-[#F48D08] font-bold">
            Full Comparison →
          </Link>
        </div>
      </div>

    </div>
  );
}
