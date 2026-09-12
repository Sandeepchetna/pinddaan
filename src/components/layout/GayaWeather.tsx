'use client';

import React, { useEffect, useState } from 'react';
import { CloudSun, Sun, Cloud, CloudRain, CloudLightning, CloudFog } from 'lucide-react';
import { useAppLanguage } from '@/lib/useAppLanguage';
import GayaWeatherModal, { WeatherDetails } from '@/components/layout/GayaWeatherModal';

function getWeatherInfo(code: number, isHindi: boolean) {
  if (code === 0) {
    return { label: isHindi ? 'साफ़' : 'Clear', Icon: Sun };
  }
  if (code === 1 || code === 2) {
    return { label: isHindi ? 'धूप/हल्के बादल' : 'Partly Clear', Icon: CloudSun };
  }
  if (code === 3) {
    return { label: isHindi ? 'बादल' : 'Cloudy', Icon: Cloud };
  }
  if (code === 45 || code === 48) {
    return { label: isHindi ? 'कोहरा' : 'Foggy', Icon: CloudFog };
  }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return { label: isHindi ? 'बारिश' : 'Rain', Icon: CloudRain };
  }
  if (code >= 95) {
    return { label: isHindi ? 'तूफान' : 'Storm', Icon: CloudLightning };
  }

  return { label: isHindi ? 'साफ़' : 'Clear', Icon: CloudSun };
}

interface GayaWeatherProps {
  className?: string;
  showDot?: boolean;
}

export default function GayaWeather({ 
  className = "hidden lg:flex items-center gap-1.5 text-gray-300 border-r border-white/20 pr-4 select-none cursor-pointer hover:text-white transition-colors",
  showDot = true
}: GayaWeatherProps) {
  const { isHindi } = useAppLanguage();
  const [weatherData, setWeatherData] = useState<WeatherDetails>({
    city: 'Gaya Ji',
    temp: 32,
    feelsLike: 36,
    humidity: 65,
    windSpeed: 15,
    pressure: 1004,
    code: 0,
    forecast: [
      { date: '2026-09-12', day: 'Today', dayHi: 'आज', maxTemp: 33, minTemp: 25, code: 0 },
      { date: '2026-09-13', day: 'Sun', dayHi: 'रवि', maxTemp: 32, minTemp: 25, code: 1 },
      { date: '2026-09-14', day: 'Mon', dayHi: 'सोम', maxTemp: 31, minTemp: 24, code: 51 },
    ],
  });
  const [isLive, setIsLive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchGayaWeather() {
      try {
        const res = await fetch('/api/weather');
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && typeof data.temp === 'number') {
          setWeatherData({
            city: data.city || 'Gaya Ji',
            temp: data.temp,
            feelsLike: data.feelsLike ?? (data.temp + 4),
            humidity: data.humidity ?? 65,
            windSpeed: data.windSpeed ?? 15,
            pressure: data.pressure ?? 1004,
            code: typeof data.code === 'number' ? data.code : 0,
            forecast: Array.isArray(data.forecast) ? data.forecast : weatherData.forecast,
            timestamp: data.timestamp,
          });
          setIsLive(true);
        }
      } catch (err) {
        // Fallback without erroring
      }
    }

    fetchGayaWeather();
    return () => {
      isMounted = false;
    };
  }, []);

  const info = getWeatherInfo(weatherData.code, isHindi);
  const IconComponent = info.Icon;
  const cityName = isHindi ? 'गया जी' : 'Gaya Ji';

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className={`${className} cursor-pointer group`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
        title={isHindi ? 'विस्तृत मौसम व आज का पिंडदान मुहूर्त देखने के लिए क्लिक करें' : 'Click to view detailed weather & Vedic Pind Daan Muhurat'}
      >
        <IconComponent className="w-3.5 h-3.5 text-[#F48D08] shrink-0 group-hover:scale-110 transition-transform" />
        <span className="tabular-nums group-hover:underline underline-offset-2">
          {cityName} · {weatherData.temp}°C {info.label}
        </span>
        {isLive && showDot && (
          <span 
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" 
            title="Live" 
          />
        )}
      </div>

      <GayaWeatherModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        weather={weatherData}
        isHindi={isHindi}
      />
    </>
  );
}
