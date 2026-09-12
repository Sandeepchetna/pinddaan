'use client';

import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import PackageCard from '@/components/packages/PackageCard';

export default function PackageTierToggle({ initialPackages }: { initialPackages: any[] }) {
  const [globalTier, setGlobalTier] = useState<'GOLD' | 'PLATINUM'>('GOLD');

  // Custom sort order: 1-Day, 3-Day, Tripindi, then Narayan Bali
  const getRank = (pkg: any) => {
    const s = ((pkg.slug || '') + ' ' + (pkg.title || '')).toLowerCase();
    if (s.includes('1-day') || s.includes('1 day')) return 1;
    if (s.includes('3-day') || s.includes('3 day')) return 2;
    if (s.includes('tripindi') || s.includes('pitidosh')) return 3;
    if (s.includes('narayan')) return 4;
    return 5;
  };

  const sortedPackages = [...initialPackages].sort((a, b) => getRank(a) - getRank(b));

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      
      {/* Top Global Tier & Comparison Ribbon */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-3xl border border-amber-900/10 shadow-sm">
        
        {/* Global Tier Switcher */}
        <div className="bg-amber-50/80 p-1.5 rounded-full border border-amber-900/10 inline-flex items-center gap-2">
          <button
            onClick={() => setGlobalTier('GOLD')}
            className={`px-5 py-2 rounded-full font-bold text-xs transition-all ${
              globalTier === 'GOLD'
                ? 'bg-[#F48D08] text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            SHOW ALL GOLD PLANS
          </button>

          <button
            onClick={() => setGlobalTier('PLATINUM')}
            className={`px-5 py-2 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 ${
              globalTier === 'PLATINUM'
                ? 'bg-[#F48D08] text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-white" />
            <span>SHOW ALL PLATINUM VIP PLANS</span>
          </button>
        </div>
      </div>

      {/* Package Cards Grid - All 4 packages in 1 single row on desktop! */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedPackages.map((pkg) => (
          <PackageCard key={pkg.id || pkg.slug} pkg={pkg} defaultTier={globalTier} />
        ))}
      </div>

    </div>
  );
}
