'use client';

import React, { useState } from 'react';
import { Crown, Sparkles, Building2 } from 'lucide-react';
import PackageCard from '@/components/packages/PackageCard';

export default function PackageTierToggle({ initialPackages }: { initialPackages: any[] }) {
  const [globalTier, setGlobalTier] = useState<'GOLD' | 'PLATINUM'>('GOLD');
  const [activeCategory, setActiveCategory] = useState<'ONLY_PIND_DAAN' | 'WITH_STAY'>('ONLY_PIND_DAAN');

  // Categorize packages
  const isOnlyPindDaan = (pkg: any) => {
    const s = ((pkg.slug || '') + ' ' + (pkg.title || '')).toLowerCase();
    return s.includes('uttam') || s.includes('madhyam') || s.includes('kanishtha') || (s.includes('shradh') && !s.includes('tripindi'));
  };

  const getRank = (pkg: any) => {
    const s = ((pkg.slug || '') + ' ' + (pkg.title || '')).toLowerCase();
    // Only Pind Daan rank
    if (s.includes('uttam')) return 1;
    if (s.includes('madhyam')) return 2;
    if (s.includes('kanishtha')) return 3;
    if (s.includes('shradh') && !s.includes('tripindi')) return 4;
    // With Stay / Dosha rank
    if (s.includes('1-day') || s.includes('1 day')) return 10;
    if (s.includes('3-day') || s.includes('3 day')) return 11;
    if (s.includes('tripindi') || s.includes('pitidosh')) return 12;
    if (s.includes('narayan')) return 13;
    return 20;
  };

  const onlyPindDaanPkgs = initialPackages
    .filter(isOnlyPindDaan)
    .sort((a, b) => getRank(a) - getRank(b));

  const stayAndSpecialPkgs = initialPackages
    .filter(p => !isOnlyPindDaan(p))
    .sort((a, b) => getRank(a) - getRank(b));

  const currentDisplayPkgs = activeCategory === 'ONLY_PIND_DAAN' ? onlyPindDaanPkgs : stayAndSpecialPkgs;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Category Tabs & Global Tier Selector Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-3.5 sm:p-4 rounded-3xl border border-amber-900/10 shadow-sm">
        
        {/* Category Switcher Tabs */}
        <div className="bg-amber-50/80 p-1 rounded-2xl border border-amber-900/10 flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
          <button
            onClick={() => setActiveCategory('ONLY_PIND_DAAN')}
            className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
              activeCategory === 'ONLY_PIND_DAAN'
                ? 'bg-[#F48D08] text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-amber-100/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ONLY PIND DAAN (PUJA ONLY)</span>
            <span className="text-[10px] bg-black/15 px-1.5 py-0.5 rounded-full">{onlyPindDaanPkgs.length}</span>
          </button>

          <button
            onClick={() => setActiveCategory('WITH_STAY')}
            className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
              activeCategory === 'WITH_STAY'
                ? 'bg-[#F48D08] text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-amber-100/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>PACKAGES WITH STAY & SPECIAL PUJAS</span>
            <span className="text-[10px] bg-black/15 px-1.5 py-0.5 rounded-full">{stayAndSpecialPkgs.length}</span>
          </button>
        </div>

        {/* Global Tier Switcher (Only relevant for Packages with Stay) */}
        {activeCategory === 'WITH_STAY' && (
          <div className="bg-amber-50/80 p-1 rounded-2xl border border-amber-900/10 inline-flex items-center gap-1.5 animate-fadeIn">
            <button
              onClick={() => setGlobalTier('GOLD')}
              className={`px-4 sm:px-5 py-2 rounded-xl font-bold text-xs transition-all ${
                globalTier === 'GOLD'
                  ? 'bg-[#C6922E] text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              GOLD PLANS
            </button>

            <button
              onClick={() => setGlobalTier('PLATINUM')}
              className={`px-4 sm:px-5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                globalTier === 'PLATINUM'
                  ? 'bg-[#C6922E] text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-white" />
              <span>PLATINUM VIP</span>
            </button>
          </div>
        )}

      </div>

      {/* Package Category Description Notice */}
      <div className="text-center">
        {activeCategory === 'ONLY_PIND_DAAN' ? (
          <p className="text-xs sm:text-sm text-[#7A736A] font-medium bg-amber-50/60 inline-block px-5 py-2 rounded-full border border-amber-900/10">
            🙏 <strong>Only Pind Daan Rituals:</strong> Transparent Puja Dakshina & Samagri. Hotel room, cab, Brahmin Bhojan, and extra dakshina are not included and charged separately.
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-[#7A736A] font-medium bg-amber-50/60 inline-block px-5 py-2 rounded-full border border-amber-900/10">
            🏨 <strong>Stay & Vehicle Inclusive Packages:</strong> Station pickup, 2-person room stay, satvik meals, and specialized ancestral dosha remedies.
          </p>
        )}
      </div>

      {/* Package Cards Grid - 4 packages in 1 single row on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentDisplayPkgs.map((pkg) => (
          <PackageCard key={pkg.id || pkg.slug} pkg={pkg} defaultTier={globalTier} />
        ))}
      </div>

    </div>
  );
}
