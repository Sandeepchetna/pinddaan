'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, Clock, ArrowRight, Sparkles, Filter, Landmark } from 'lucide-react';

interface Place {
  id?: string;
  slug: string;
  name: string;
  hindiName?: string | null;
  tagline?: string | null;
  description: string;
  history?: string | null;
  timings?: string | null;
  visitorInfo?: string | null;
  heroImage: string;
  category?: string;
}

const CATEGORIES = [
  'All 45+ Sacred Vedis',
  'Falgu & Sacred Kunds',
  'Vishnupad 16 Charan Pads',
  'Akshayavat & Shakti',
  'Sacred Hills of Gaya',
  'Outer Circuit & Bodhgaya'
];

export default function SacredPlacesClient({ initialPlaces }: { initialPlaces: Place[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All 45+ Sacred Vedis');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract category from visitorInfo if not directly present
  const getCategory = (place: Place): string => {
    if (place.category) return place.category;
    const info = place.visitorInfo || '';
    if (info.includes('Falgu') || info.includes('Kunds') || info.includes('Sita Kund')) return 'Falgu & Sacred Kunds';
    if (info.includes('Charan Pads') || info.includes('Vishnupad') || place.name.includes('Pad')) return 'Vishnupad 16 Charan Pads';
    if (info.includes('Akshayavat') || info.includes('Shakti') || info.includes('Mangla')) return 'Akshayavat & Shakti';
    if (info.includes('Hills') || info.includes('Pretshila') || info.includes('Ramshila') || info.includes('Brahmayoni')) return 'Sacred Hills of Gaya';
    if (info.includes('Outer') || info.includes('Bodhgaya') || info.includes('Dharmaranya')) return 'Outer Circuit & Bodhgaya';
    return 'Falgu & Sacred Kunds';
  };

  const filteredPlaces = useMemo(() => {
    return initialPlaces.filter((place) => {
      const cat = getCategory(place);
      const matchesCategory =
        selectedCategory === 'All 45+ Sacred Vedis' || cat === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        place.name.toLowerCase().includes(q) ||
        (place.hindiName && place.hindiName.includes(q)) ||
        (place.tagline && place.tagline.toLowerCase().includes(q)) ||
        place.description.toLowerCase().includes(q) ||
        (place.visitorInfo && place.visitorInfo.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialPlaces, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-[24px] p-4 sm:p-6 border border-[#EFE6D9] shadow-sm space-y-5">
        
        {/* Search Input Box */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A736A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sacred vedi by name (e.g. Falgu, विष्णुपद, Sita Kund, Pretshila, Rudra Pad)..."
            className="w-full pl-12 pr-4 py-3.5 bg-[#FAF7F2] border border-[#EFE6D9] rounded-[16px] text-base font-body text-[#2B2118] placeholder:text-[#7A736A] focus:outline-none focus:border-[#C6922E] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#7A736A] hover:text-[#2B2118] font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-body font-semibold whitespace-nowrap transition-all select-none ${
                  isSelected
                    ? 'bg-[#C6922E] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#5A5148] hover:bg-[#EFE6D9]/70 border border-[#EFE6D9]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Active Count Indicator */}
        <div className="flex items-center justify-between text-xs font-body text-[#7A736A] pt-2 border-t border-[#EFE6D9]">
          <span>
            Showing <strong className="text-[#2B2118] font-bold">{filteredPlaces.length}</strong> of{' '}
            {initialPlaces.length} Sacred Shrines & Vedis
          </span>
          <span className="text-[11px] text-[#C6922E] font-medium hidden sm:inline">
            Verified with Vayu Purana & Bihar State Government Records
          </span>
        </div>

      </div>

      {/* Sacred Places Grid */}
      {filteredPlaces.length === 0 ? (
        <div className="bg-white rounded-[24px] p-12 text-center border border-[#EFE6D9] space-y-3">
          <p className="font-display text-2xl text-[#2B2118]">No sacred vedis found</p>
          <p className="text-sm text-[#5A5148]">Try adjusting your search query or select another category above.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All 45+ Sacred Vedis');
            }}
            className="mt-2 text-xs font-semibold text-[#C6922E] underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPlaces.map((place) => {
            const category = getCategory(place);
            return (
              <div
                key={place.slug}
                className="group bg-white rounded-[20px] border border-[#EFE6D9] hover:border-[#C6922E]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
              >
                {/* Shrine Image with Overlay Badges */}
                <div className="h-56 relative overflow-hidden bg-stone-100">
                  <img
                    src={place.heroImage || '/images/gaya_vishnupad.jpg'}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Category Pill Top Left */}
                  <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10.5px] font-body font-semibold text-[#2B2118] border border-[#EFE6D9] shadow-sm">
                    {category}
                  </span>

                  {/* Hindi Name Bottom Left */}
                  {place.hindiName && (
                    <span className="absolute bottom-3 left-3.5 text-amber-200 text-xs font-semibold drop-shadow font-hindi">
                      {place.hindiName}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-[#2B2118] group-hover:text-[#C6922E] transition-colors leading-snug">
                      {place.name}
                    </h3>
                    
                    {place.tagline && (
                      <p className="text-xs font-body font-medium text-[#C6922E] line-clamp-1">
                        {place.tagline}
                      </p>
                    )}

                    <p className="text-[13px] font-body text-[#5A5148] leading-relaxed line-clamp-3">
                      {place.description}
                    </p>
                  </div>

                  {/* Timings & Action Footer */}
                  <div className="pt-4 border-t border-[#EFE6D9] flex items-center justify-between text-xs font-body">
                    <span className="text-[#7A736A] flex items-center gap-1.5 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-[#C6922E] shrink-0" />
                      <span>{place.timings || '5:00 AM - 8:00 PM'}</span>
                    </span>

                    <Link
                      href={`/sacred-places/${place.slug}`}
                      className="inline-flex items-center gap-1 font-body font-semibold text-[#C6922E] hover:text-[#A97718] transition-colors group/link"
                    >
                      <span>Vidhi Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
