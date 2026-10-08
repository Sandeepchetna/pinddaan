'use client';

import React, { useEffect, useState } from 'react';
import { 
  CloudSun, 
  Sun, 
  Moon, 
  CloudMoon, 
  Cloud, 
  CloudRain, 
  CloudDrizzle, 
  CloudLightning, 
  CloudFog 
} from 'lucide-react';
import { useAppLanguage } from '@/lib/useAppLanguage';
import { getPilgrimTranslation } from '@/data/multilingualPilgrimHub';
import GayaWeatherModal, { WeatherDetails } from '@/components/layout/GayaWeatherModal';

function getWeatherInfo(code: number, isDay: boolean = true, t: ReturnType<typeof getPilgrimTranslation>) {
  if (code === 0) {
    return { 
      label: !isDay ? (t.weatherClearNight || t.weatherClear) : t.weatherClear, 
      Icon: isDay ? Sun : Moon 
    };
  }
  if (code === 1 || code === 2) {
    return { 
      label: t.weatherPartlyCloudy, 
      Icon: isDay ? CloudSun : CloudMoon 
    };
  }
  if (code === 3) {
    return { label: t.weatherOvercast, Icon: Cloud };
  }
  if (code === 45 || code === 48) {
    return { label: t.weatherFog, Icon: CloudFog };
  }
  if (code === 51 || code === 53 || code === 55) {
    return { label: t.weatherDrizzle || 'Light Drizzle', Icon: CloudDrizzle };
  }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return { label: t.weatherRain, Icon: CloudRain };
  }
  if (code >= 95) {
    return { label: t.weatherStorm, Icon: CloudLightning };
  }

  return { label: t.weatherClear, Icon: isDay ? Sun : Moon };
}

interface GayaWeatherProps {
  className?: string;
  showDot?: boolean;
}

export default function GayaWeather({ 
  className = "hidden lg:flex items-center gap-1.5 text-gray-300 border-r border-white/20 pr-4 select-none cursor-pointer hover:text-white transition-colors",
  showDot = true
}: GayaWeatherProps) {
  const { lang, isHindi } = useAppLanguage();
  const t = getPilgrimTranslation(lang);
  const [weatherData, setWeatherData] = useState<WeatherDetails>({
    city: 'Gaya Ji',
    temp: 23,
    feelsLike: 23,
    humidity: 70,
    windSpeed: 10,
    pressure: 1005,
    code: 0,
    isDay: true,
    forecast: [
      { date: '2026-10-08', day: 'Today', dayHi: 'आज', maxTemp: 28, minTemp: 22, code: 0 },
      { date: '2026-10-09', day: 'Fri', dayHi: 'शुक्र', maxTemp: 28, minTemp: 22, code: 1 },
      { date: '2026-10-10', day: 'Sat', dayHi: 'शनि', maxTemp: 29, minTemp: 23, code: 2 },
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
            feelsLike: typeof data.feelsLike === 'number' ? data.feelsLike : data.temp,
            humidity: data.humidity ?? 65,
            windSpeed: data.windSpeed ?? 10,
            pressure: data.pressure ?? 1005,
            code: typeof data.code === 'number' ? data.code : 0,
            isDay: typeof data.isDay === 'boolean' ? data.isDay : true,
            solarRadiation: data.solarRadiation,
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

  const isDay = weatherData.isDay ?? true;
  const info = getWeatherInfo(weatherData.code, isDay, t);
  const IconComponent = info.Icon;
  const cityName = t.cityName;

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className={`${className} cursor-pointer group`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
        title={t.vedicMuhuratTitle}
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
        lang={lang}
      />
    </>
  );
}
