'use client';

import React, { useEffect, useState } from 'react';
import { 
  X, 
  Sun, 
  Moon,
  CloudSun, 
  CloudMoon,
  Cloud, 
  CloudRain, 
  CloudDrizzle,
  CloudLightning, 
  CloudFog, 
  Wind, 
  Droplets, 
  Thermometer, 
  Gauge, 
  Clock, 
  Info,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';

import { getPilgrimTranslation } from '@/data/multilingualPilgrimHub';
import { useAppLanguage, AppLangCode } from '@/lib/useAppLanguage';
import { evaluateMuhuratTiming, EvaluatedMuhuratState } from '@/lib/vedicMuhurat';

export interface WeatherDetails {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  code: number;
  isDay?: boolean;
  solarRadiation?: number;
  forecast: Array<{
    date: string;
    day: string;
    dayHi: string;
    maxTemp: number;
    minTemp: number;
    code: number;
  }>;
  timestamp?: string;
}

interface GayaWeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  weather: WeatherDetails;
  isHindi?: boolean;
  lang?: AppLangCode;
}

function getWeatherIconAndLabel(
  code: number, 
  isDay: boolean = true, 
  t: ReturnType<typeof getPilgrimTranslation>
) {
  if (code === 0) {
    if (!isDay) {
      return {
        label: t.weatherClearNight || t.weatherClear,
        Icon: Moon,
        color: 'text-amber-200'
      };
    }
    return {
      label: t.weatherClear,
      Icon: Sun,
      color: 'text-amber-500'
    };
  }
  if (code === 1 || code === 2) {
    if (!isDay) {
      return {
        label: t.weatherPartlyCloudy,
        Icon: CloudMoon,
        color: 'text-amber-200'
      };
    }
    return {
      label: t.weatherPartlyCloudy,
      Icon: CloudSun,
      color: 'text-amber-500'
    };
  }
  if (code === 3) {
    return {
      label: t.weatherOvercast,
      Icon: Cloud,
      color: 'text-gray-400'
    };
  }
  if (code === 45 || code === 48) {
    return {
      label: t.weatherFog,
      Icon: CloudFog,
      color: 'text-blue-300'
    };
  }
  if (code === 51 || code === 53 || code === 55) {
    return {
      label: t.weatherDrizzle || 'Light Drizzle',
      Icon: CloudDrizzle,
      color: 'text-sky-300'
    };
  }
  if (code >= 61 && code <= 67) {
    return {
      label: t.weatherRain,
      Icon: CloudRain,
      color: 'text-sky-400'
    };
  }
  if (code >= 80 && code <= 82) {
    return {
      label: t.weatherRain,
      Icon: CloudRain,
      color: 'text-sky-400'
    };
  }
  if (code >= 95) {
    return {
      label: t.weatherStorm,
      Icon: CloudLightning,
      color: 'text-yellow-400'
    };
  }

  return !isDay
    ? { label: t.weatherClear, Icon: Moon, color: 'text-amber-200' }
    : { label: t.weatherClear, Icon: Sun, color: 'text-amber-500' };
}

export default function GayaWeatherModal({ isOpen, onClose, weather, isHindi, lang }: GayaWeatherModalProps) {
  const { lang: appLang } = useAppLanguage();
  const currentLang: AppLangCode = lang || appLang || (isHindi ? 'hi' : 'en');
  const t = getPilgrimTranslation(currentLang);

  // Real-time Muhurat state evaluation
  const [muhuratState, setMuhuratState] = useState<EvaluatedMuhuratState>(() => evaluateMuhuratTiming());

  useEffect(() => {
    // Re-evaluate on open and every 60 seconds
    const updateTiming = () => {
      setMuhuratState(evaluateMuhuratTiming());
    };
    updateTiming();
    const timer = setInterval(updateTiming, 60000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const isDay = weather.isDay ?? true;
  const currentInfo = getWeatherIconAndLabel(weather.code, isDay, t);
  const CurrentIcon = currentInfo.Icon;

  const isConcluded = muhuratState.isConcludedForToday;
  const kutapSlot = muhuratState.slots[0];
  const aparahnaSlot = muhuratState.slots[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-gradient-to-b from-[#1c1815] to-[#120f0d] text-white rounded-3xl shadow-2xl border border-amber-900/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{t.weatherModalTitle}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {/* Main Weather Hero Card */}
          <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent p-4 rounded-2xl border border-amber-500/20 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-serif">
                  {weather.temp}°C
                </span>
                <span className="text-sm text-gray-300 font-medium">
                  {currentInfo.label}
                </span>
              </div>
              <p className="text-xs text-amber-300/80 mt-1 font-medium">
                {t.feelsLike} <strong className="text-white">{weather.feelsLike}°C</strong>
              </p>
            </div>
            <div className={`p-3 rounded-2xl border ${
              isDay 
                ? 'bg-amber-500/10 border-amber-500/20' 
                : 'bg-indigo-950/40 border-indigo-500/30'
            }`}>
              <CurrentIcon className={`w-12 h-12 ${currentInfo.color}`} />
            </div>
          </div>

          {/* Metrics Grid (4 items) */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <Droplets className="w-4 h-4 text-sky-400 mx-auto mb-1" />
              <div className="text-[11px] text-gray-400">{t.humidity}</div>
              <div className="text-xs font-bold text-white mt-0.5">{weather.humidity}%</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <Wind className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <div className="text-[11px] text-gray-400">{t.wind}</div>
              <div className="text-xs font-bold text-white mt-0.5">{weather.windSpeed} km/h</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <Gauge className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <div className="text-[11px] text-gray-400">{t.pressure}</div>
              <div className="text-xs font-bold text-white mt-0.5">{weather.pressure} hPa</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <Thermometer className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <div className="text-[11px] text-gray-400">{t.feelsLike.replace(/[:(].*$/, '')}</div>
              <div className="text-xs font-bold text-white mt-0.5">{weather.feelsLike}°C</div>
            </div>
          </div>

          {/* 3-Day Forecast Strip */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>{t.threeDayForecast}</span>
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {weather.forecast.map((fc, i) => {
                // Ensure Today (i === 0) icon matches day/night appropriately while preserving condition cohesion
                const fcInfo = getWeatherIconAndLabel(fc.code, i === 0 ? isDay : true, t);
                const FcIcon = fcInfo.Icon;
                const displayDay = i === 0 ? t.today : (currentLang === 'hi' ? fc.dayHi : fc.day);
                return (
                  <div key={i} className="bg-white/[0.03] rounded-xl p-2.5 text-center border border-white/5 hover:border-amber-500/30 transition-colors">
                    <span className="text-xs font-bold text-amber-300 block mb-1">
                      {displayDay}
                    </span>
                    <FcIcon className={`w-5 h-5 mx-auto my-1 ${fcInfo.color}`} />
                    <div className="text-xs font-semibold text-white">
                      {fc.maxTemp}° / <span className="text-gray-400 font-normal">{fc.minTemp}°</span>
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5 truncate" title={fcInfo.label}>
                      {fcInfo.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* VEDIC PIND DAAN MUHURAT (Scriptural Timing & Dynamic State) */}
          <div className={`transition-all duration-300 rounded-2xl p-3.5 space-y-2.5 border ${
            isConcluded
              ? 'bg-stone-900/60 border-stone-800/80 opacity-70 grayscale-[25%]'
              : 'bg-gradient-to-br from-amber-500/10 via-amber-900/15 to-amber-950/20 border-amber-500/30'
          }`}>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <Sparkles className="w-4 h-4 text-amber-400 fill-current" />
                <span>{t.vedicMuhuratTitle}</span>
              </div>
              {isConcluded ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-800 text-stone-300 border border-stone-700">
                  <Clock className="w-3 h-3 text-stone-400" />
                  <span>{t.muhuratStatusConcluded}</span>
                </span>
              ) : muhuratState.activeSlot ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{t.muhuratStatusActive}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <span>{t.muhuratStatusUpcoming}</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {/* Kutap & Rohin Slot */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                isConcluded || kutapSlot?.status === 'CONCLUDED'
                  ? 'bg-black/20 border-white/5 opacity-60'
                  : kutapSlot?.status === 'ACTIVE'
                  ? 'bg-amber-950/40 border-amber-500/50 ring-1 ring-amber-500/30'
                  : 'bg-black/30 border-amber-500/20'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-300/80 font-bold uppercase tracking-wider block">
                    {t.kutapMuhurat}
                  </span>
                  {kutapSlot?.status === 'CONCLUDED' && (
                    <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">
                      {t.muhuratStatusConcluded?.replace(/ for Today| समाप्त/, '') || 'Concluded'}
                    </span>
                  )}
                  {kutapSlot?.status === 'ACTIVE' && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 animate-pulse">
                      Active
                    </span>
                  )}
                </div>
                <span className={`text-sm font-extrabold block mt-0.5 ${
                  kutapSlot?.status === 'CONCLUDED' ? 'text-stone-400' : 'text-white'
                }`}>
                  11:36 AM – 01:12 PM
                </span>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {t.kutapMuhuratDesc}
                </p>
              </div>

              {/* Aparahna Kaal Slot */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                isConcluded || aparahnaSlot?.status === 'CONCLUDED'
                  ? 'bg-black/20 border-white/5 opacity-60'
                  : aparahnaSlot?.status === 'ACTIVE'
                  ? 'bg-emerald-950/40 border-emerald-500/50 ring-1 ring-emerald-500/40'
                  : 'bg-black/30 border-amber-500/20'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-300/80 font-bold uppercase tracking-wider block">
                    {t.aparahnaKaal}
                  </span>
                  {aparahnaSlot?.status === 'CONCLUDED' && (
                    <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">
                      {t.muhuratStatusConcluded?.replace(/ for Today| समाप्त/, '') || 'Concluded'}
                    </span>
                  )}
                  {aparahnaSlot?.status === 'ACTIVE' && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 animate-pulse">
                      Active (Prime)
                    </span>
                  )}
                </div>
                <span className={`text-sm font-extrabold block mt-0.5 ${
                  aparahnaSlot?.status === 'CONCLUDED' ? 'text-stone-400' : 'text-emerald-400'
                }`}>
                  01:12 PM – 03:36 PM
                </span>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {t.aparahnaKaalDesc}
                </p>
              </div>
            </div>

            {/* Scriptural Advisory & Cutoff Notice */}
            <div className={`flex items-start gap-1.5 text-[11px] p-2.5 rounded-xl border transition-colors ${
              isConcluded
                ? 'bg-stone-900/80 border-stone-700/60 text-stone-300'
                : 'bg-amber-950/40 border-amber-500/20 text-amber-200/90'
            }`}>
              <Info className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isConcluded ? 'text-stone-400' : 'text-amber-400'}`} />
              <div>
                <span>
                  {t.garudaPuranaRule}
                </span>
                {isConcluded && (
                  <span className="block mt-1 font-semibold text-amber-400/90 text-[10.5px]">
                    {t.muhuratResumesTomorrow}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Devotee Health Advice */}
          <div className="text-[11px] text-gray-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
            <span>
              {t.seniorHealthAdvice}
            </span>
            <button
              onClick={onClose}
              className="text-amber-400 font-bold hover:underline shrink-0 ml-2"
            >
              {t.understands}
            </button>
          </div>

          {/* Weather & Muhurat Disclaimer */}
          <div className="text-[10px] text-gray-400 bg-black/40 p-2.5 rounded-xl border border-white/5 leading-relaxed">
            <strong className="text-amber-400 font-semibold block mb-0.5">
              {t.disclaimerTitle}:
            </strong>
            {t.weatherDisclaimer}
          </div>
        </div>
      </div>
    </div>
  );
}
