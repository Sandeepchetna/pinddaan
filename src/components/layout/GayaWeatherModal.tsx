'use client';

import React from 'react';
import { 
  X, 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudFog, 
  Wind, 
  Droplets, 
  Thermometer, 
  Gauge, 
  Compass, 
  Clock, 
  Info,
  Sparkles,
  MapPin
} from 'lucide-react';

export interface WeatherDetails {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  code: number;
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
  isHindi: boolean;
}

function getWeatherIconAndLabel(code: number, isHindi: boolean) {
  if (code === 0) {
    return {
      label: isHindi ? 'साफ़ आसमान' : 'Clear Sky',
      Icon: Sun,
      color: 'text-amber-500'
    };
  }
  if (code === 1 || code === 2) {
    return {
      label: isHindi ? 'धूप व हल्के बादल' : 'Partly Cloudy',
      Icon: CloudSun,
      color: 'text-amber-500'
    };
  }
  if (code === 3) {
    return {
      label: isHindi ? 'घने बादल' : 'Overcast',
      Icon: Cloud,
      color: 'text-gray-400'
    };
  }
  if (code === 45 || code === 48) {
    return {
      label: isHindi ? 'कोहरा' : 'Foggy',
      Icon: CloudFog,
      color: 'text-blue-300'
    };
  }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return {
      label: isHindi ? 'हल्की बारिश' : 'Rain Showers',
      Icon: CloudRain,
      color: 'text-sky-400'
    };
  }
  if (code >= 95) {
    return {
      label: isHindi ? 'आंधी व मेघगर्जन' : 'Thunderstorm',
      Icon: CloudLightning,
      color: 'text-yellow-400'
    };
  }

  return {
    label: isHindi ? 'साफ़' : 'Clear',
    Icon: CloudSun,
    color: 'text-amber-500'
  };
}

export default function GayaWeatherModal({ isOpen, onClose, weather, isHindi }: GayaWeatherModalProps) {
  if (!isOpen) return null;

  const currentInfo = getWeatherIconAndLabel(weather.code, isHindi);
  const CurrentIcon = currentInfo.Icon;

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
            <span>{isHindi ? 'गया जी, बिहार (लाइव उपग्रह मौसम)' : 'Gaya Ji, Bihar (Live Satellite Feed)'}</span>
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
                {isHindi ? 'अहसास (Feels like):' : 'Feels like:'} <strong className="text-white">{weather.feelsLike}°C</strong>
              </p>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
              <CurrentIcon className={`w-12 h-12 ${currentInfo.color}`} />
            </div>
          </div>

          {/* Metrics Grid (4 items) */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <Droplets className="w-4 h-4 text-sky-400 mx-auto mb-1" />
              <div className="text-[11px] text-gray-400">{isHindi ? 'नमी' : 'Humidity'}</div>
              <div className="text-xs font-bold text-white mt-0.5">{weather.humidity}%</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <Wind className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <div className="text-[11px] text-gray-400">{isHindi ? 'हवा' : 'Wind'}</div>
              <div className="text-xs font-bold text-white mt-0.5">{weather.windSpeed} km/h</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <Gauge className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <div className="text-[11px] text-gray-400">{isHindi ? 'दबाव' : 'Pressure'}</div>
              <div className="text-xs font-bold text-white mt-0.5">{weather.pressure} hPa</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <Thermometer className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <div className="text-[11px] text-gray-400">{isHindi ? 'अहसास' : 'Feels'}</div>
              <div className="text-xs font-bold text-white mt-0.5">{weather.feelsLike}°C</div>
            </div>
          </div>

          {/* 3-Day Forecast Strip */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>{isHindi ? 'अगले 3 दिनों का मौसम पूर्वानुमान' : '3-Day Weather Forecast'}</span>
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {weather.forecast.map((fc, i) => {
                const fcInfo = getWeatherIconAndLabel(fc.code, isHindi);
                const FcIcon = fcInfo.Icon;
                return (
                  <div key={i} className="bg-white/[0.03] rounded-xl p-2.5 text-center border border-white/5 hover:border-amber-500/30 transition-colors">
                    <span className="text-xs font-bold text-amber-300 block mb-1">
                      {isHindi ? fc.dayHi : fc.day}
                    </span>
                    <FcIcon className={`w-5 h-5 mx-auto my-1 ${fcInfo.color}`} />
                    <div className="text-xs font-semibold text-white">
                      {fc.maxTemp}° / <span className="text-gray-400 font-normal">{fc.minTemp}°</span>
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5 truncate">
                      {fcInfo.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* VEDIC PIND DAAN MUHURAT (Unique High-Value Section) */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-900/15 to-amber-950/20 border border-amber-500/30 rounded-2xl p-3.5 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-400 fill-current" />
              <span>{isHindi ? 'शास्त्रसम्मत आज का पिंडदान काल (Vedic Muhurat)' : 'Today\'s Sacred Vedic Pind Daan Muhurat'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-black/30 p-2.5 rounded-xl border border-amber-500/20">
                <span className="text-[10px] text-amber-300/80 font-bold uppercase tracking-wider block">
                  {isHindi ? 'कुतुप व रौहिण मुहूर्त' : 'Kutap & Rohin Muhurat'}
                </span>
                <span className="text-sm font-extrabold text-white">11:36 AM – 01:12 PM</span>
                <p className="text-[10px] text-gray-300 mt-0.5">
                  {isHindi ? 'संकल्प व फल्गु नदी तर्पण हेतु अति-उत्तम।' : 'Ideal for Gotra Sankalp & Falgu Tarpan.'}
                </p>
              </div>

              <div className="bg-black/30 p-2.5 rounded-xl border border-amber-500/20">
                <span className="text-[10px] text-amber-300/80 font-bold uppercase tracking-wider block">
                  {isHindi ? 'अपराह्न काल (सर्वश्रेष्ठ)' : 'Aparahna Kaal (Best Period)'}
                </span>
                <span className="text-sm font-extrabold text-emerald-400">01:12 PM – 03:36 PM</span>
                <p className="text-[10px] text-gray-300 mt-0.5">
                  {isHindi ? 'विष्णुपद व अक्षयवट पर मुख्य पिंडदान काल।' : 'Prime time for Vishnupad & Akshayavat pind daan.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-1.5 text-[11px] text-amber-200/80 bg-amber-950/40 p-2 rounded-xl border border-amber-500/20">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {isHindi 
                  ? 'गरुड़ पुराण निर्देश: सूर्यास्त के बाद पिंडदान वर्जित है। कृपया दोपहर 3:30 बजे से पूर्व अपना अनुष्ठान संपन्न करें।'
                  : 'Garuda Purana Advisory: Pind Daan after sunset is prohibited. Please conclude rituals before 03:30 PM.'}
              </span>
            </div>
          </div>

          {/* Devotee Health Advice */}
          <div className="text-[11px] text-gray-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
            <span>
              {isHindi ? '💧 वरिष्ठ तीर्थयात्री धूप से बचाव हेतु छाता व जल अवश्य साथ रखें।' : '💧 Elderly pilgrims are advised to carry water & umbrella.'}
            </span>
            <button
              onClick={onClose}
              className="text-amber-400 font-bold hover:underline shrink-0 ml-2"
            >
              {isHindi ? 'समझ गया ✓' : 'Understood ✓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
