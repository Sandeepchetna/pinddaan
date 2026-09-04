'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Search, 
  ArrowRight, 
  Plane, 
  Train, 
  Clock, 
  ShieldCheck, 
  Globe, 
  CheckCircle2
} from 'lucide-react';
import { CITY_DATABASE, CityInfo } from '@/data/cityDatabase';
import ZeroExtortionPledge from '@/components/common/ZeroExtortionPledge';

import { useAppLanguage } from '@/lib/useAppLanguage';

export default function PindDaanCityHubPage() {
  const { isHindi } = useAppLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');

  const allCities = useMemo(() => Object.values(CITY_DATABASE), []);

  const filteredCities = useMemo(() => {
    return allCities.filter((city) => {
      const matchesSearch = 
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.stateOrCountry.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesZone = 
        selectedZone === 'All' || city.zone === selectedZone;

      return matchesSearch && matchesZone;
    });
  }, [allCities, searchQuery, selectedZone]);

  const zones = ['All', 'North', 'West', 'South', 'East', 'Central', 'NRI'];

  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C160C] via-[#101728] to-[#0A0E1A] border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
              <Globe className="w-3.5 h-3.5" />
              <span>ALL-INDIA & GLOBAL DEPARTURE DIRECTORY (50+ CITIES)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              {isHindi ? (
                <>
                  अपने शहर से गया जी पिंडदान यात्रा:{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400">
                    सीधा मार्गदर्शन व निश्चित दक्षिणा
                  </span>
                </>
              ) : (
                <>
                  Pind Daan in Gaya Ji from Your City:{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400">
                    Direct Routes & Fixed Dakshina
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {isHindi 
                ? 'भारत के 50+ प्रमुख नगरों एवं विश्वभर के NRI श्रद्धालुओं हेतु गया जी तीर्थ की प्रामाणिक यात्रा गाइड। सीधी ट्रेनें, फ्लाइट कनेक्टिविटी, स्टेशन पिकअप, और 100% निश्चित दक्षिणा गारंटी (कोई अतिरिक्त छुपा खर्च नहीं)।'
                : 'Comprehensive travel and ritual logistics for pilgrims traveling from 50+ Indian cities and global NRI hubs to Gaya Ji. Includes direct trains (Vande Bharat / Rajdhani), flight routes, station pickup, and 100% fixed transparent dakshina.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Middlemen & No Bargaining</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>54+ Cities & Global Hubs Covered</span>
              </span>
            </div>
          </div>
        </div>

        {/* Sacred Zero-Extortion Pledge & Middleman Advisory */}
        <ZeroExtortionPledge />

        {/* City Filter & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={isHindi ? 'शहर खोजें (उदा. मुंबई, दिल्ली, बेंगलुरु)...' : 'Search your city (e.g. Mumbai, Bengaluru, London)...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0E1626] border border-slate-800 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Zone Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
              {zones.map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    selectedZone === zone
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {zone === 'All' ? 'All (54+)' : zone}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Showing <span className="font-bold text-amber-300">{filteredCities.length}</span> pilgrim destination hubs
          </div>
        </div>

        {/* 54+ City Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCities.map((city) => (
            <Link
              key={city.slug}
              href={`/pind-daan/${city.slug}`}
              className="group p-5 rounded-2xl bg-[#0E1626] border border-slate-800/90 hover:border-amber-500/50 hover:bg-[#121B30] transition-all flex flex-col justify-between space-y-4 shadow-lg hover:-translate-y-0.5"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                    {city.zone}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{city.travelTime.split('|')[0]?.trim()}</span>
                  </span>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                  {city.name}
                </h3>
                <span className="text-xs text-slate-400 block -mt-1 font-medium">
                  {city.stateOrCountry}
                </span>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
                  {city.customNotes}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-bold group-hover:text-amber-300">
                <span>View Complete Route & Pandas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredCities.length === 0 && (
          <div className="text-center py-16 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <p className="text-base text-slate-300">No cities matched "{searchQuery}".</p>
            <p className="text-xs text-slate-400">
              Don't worry! We arrange pickups and verified Pind Daan rituals for devotees from any location worldwide.
            </p>
            <a
              href="tel:+917463055338"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs shadow-lg"
            >
              <span>Call Helpline: +91 7463055338</span>
            </a>
          </div>
        )}

      </div>
    </main>
  );
}
