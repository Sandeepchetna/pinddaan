'use client';

import React, { useState } from 'react';
import { 
  Navigation, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Train, 
  Bus, 
  Car, 
  Sparkles, 
  Phone, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  LifeBuoy
} from 'lucide-react';
import { useAppLanguage } from '@/lib/useAppLanguage';
import { getPilgrimTranslation } from '@/data/multilingualPilgrimHub';
import GayaPilgrimCircuitModal from '@/components/common/GayaPilgrimCircuitModal';
import PilgrimEmergencyModal from '@/components/common/PilgrimEmergencyModal';
import GayaWeatherModal, { WeatherDetails } from '@/components/layout/GayaWeatherModal';

export default function PilgrimAssistanceHub() {
  const { lang, isHindi } = useAppLanguage();
  const t = getPilgrimTranslation(lang);
  const [isCircuitOpen, setIsCircuitOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);

  const fallbackWeather: WeatherDetails = {
    city: t.cityName,
    temp: 32,
    feelsLike: 36,
    humidity: 68,
    windSpeed: 16,
    pressure: 994,
    code: 1,
    forecast: [
      { date: '2026-09-12', day: 'Today', dayHi: 'आज', maxTemp: 32, minTemp: 26, code: 53 },
      { date: '2026-09-13', day: 'Sun', dayHi: 'रवि', maxTemp: 33, minTemp: 25, code: 51 },
      { date: '2026-09-14', day: 'Mon', dayHi: 'सोम', maxTemp: 32, minTemp: 26, code: 96 },
    ],
  };

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-stone-900 via-[#181412] to-stone-900 text-white relative overflow-hidden border-y border-amber-900/30">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#F48D08] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{t.hubBadge}</span>
          </div>
          <h2 className="font-serif font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
            {t.hubTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2.5 leading-relaxed">
            {t.hubSubtitle}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: Sacred Circuit & Fare Guide */}
          <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-amber-500/30 rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:border-amber-500/60 transition-all group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[#F48D08] group-hover:scale-110 transition-transform">
                  <Navigation className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                  {t.hubCard1Badge}
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg text-white mb-2 group-hover:text-[#F48D08] transition-colors">
                {t.hubCard1Title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                {t.hubCard1Desc}
              </p>

              {/* Quick Fare Snapshot */}
              <div className="bg-black/40 rounded-2xl p-3 border border-white/10 space-y-1.5 text-xs mb-4">
                <div className="text-gray-300 text-[11px] leading-relaxed">
                  <strong className="text-emerald-400">{t.hubCard1Snapshot1}</strong>
                </div>
                <div className="text-gray-300 text-[11px] leading-relaxed">
                  <strong className="text-emerald-400">{t.hubCard1Snapshot2}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsCircuitOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <span>{t.hubCard1Btn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Today's Vedic Pind Daan Muhurat */}
          <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-amber-500/30 rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:border-amber-500/60 transition-all group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 fill-current" />
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t.hubCard2Badge}
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">
                {t.hubCard2Title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                {t.hubCard2Desc}
              </p>

              {/* Muhurat Badges */}
              <div className="bg-black/40 rounded-2xl p-3 border border-white/10 space-y-2 text-xs mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-[11px]">{t.kutapMuhurat}:</span>
                  <strong className="text-amber-300 font-bold">11:36 AM – 12:24 PM</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-[11px]">{t.aparahnaKaal}:</span>
                  <strong className="text-emerald-400 font-extrabold">01:12 PM – 03:36 PM</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsWeatherOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-transform active:scale-95 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{t.hubCard2Btn}</span>
            </button>
          </div>

          {/* Card 3: Emergency & Pilgrim Safety Hub */}
          <div className="bg-gradient-to-b from-red-950/20 to-white/[0.02] border border-red-500/30 rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:border-red-500/60 transition-all group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/30">
                  {t.hubCard3Badge}
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg text-white mb-2 group-hover:text-red-400 transition-colors">
                {t.hubCard3Title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                {t.hubCard3Desc}
              </p>

              {/* Quick Contacts */}
              <div className="bg-black/40 rounded-2xl p-3 border border-white/10 space-y-1.5 text-xs mb-4">
                <div className="flex items-center justify-between text-gray-300 text-[11px]">
                  <span>{t.districtControlRoom}:</span>
                  <strong className="text-amber-400">0631-2222500</strong>
                </div>
                <div className="flex items-center justify-between text-gray-300 text-[11px]">
                  <span>{t.freeAmbulanceHospital} / {t.policeAndSecurity}:</span>
                  <strong className="text-red-400">108 / 112</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>{t.hubCard3Btn}</span>
            </button>
          </div>

        </div>

        {/* Comprehensive Public Disclaimer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center max-w-4xl mx-auto text-[10.5px] sm:text-[11px] text-gray-400 leading-relaxed px-2">
          <p>
            <strong className="text-amber-400 font-semibold">{t.publicNoticeTitle}</strong>
            {t.publicNoticeBody}
          </p>
        </div>

      </div>

      {/* Modals */}
      <GayaPilgrimCircuitModal
        isOpen={isCircuitOpen}
        onClose={() => setIsCircuitOpen(false)}
        isHindi={isHindi}
        lang={lang}
      />

      <PilgrimEmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        isHindi={isHindi}
        lang={lang}
      />

      <GayaWeatherModal
        isOpen={isWeatherOpen}
        onClose={() => setIsWeatherOpen(false)}
        weather={fallbackWeather}
        isHindi={isHindi}
        lang={lang}
      />
    </section>
  );
}
