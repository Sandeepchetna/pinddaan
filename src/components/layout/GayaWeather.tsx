'use client';

import React, { useEffect, useState } from 'react';
import { CloudSun, Sun, Cloud, CloudRain, CloudLightning, CloudFog } from 'lucide-react';
import { useAppLanguage } from '@/lib/useAppLanguage';

interface WeatherData {
  temp: number;
  code: number;
}

function getWeatherInfo(code: number, isHindi: boolean) {
  // WMO Weather interpretation codes (http://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
  if (code === 0) {
    return {
      label: isHindi ? 'साफ़' : 'Clear',
      Icon: Sun,
    };
  }
  if (code === 1 || code === 2) {
    return {
      label: isHindi ? 'धूप/हल्के बादल' : 'Partly Clear',
      Icon: CloudSun,
    };
  }
  if (code === 3) {
    return {
      label: isHindi ? 'बादल' : 'Cloudy',
      Icon: Cloud,
    };
  }
  if (code === 45 || code === 48) {
    return {
      label: isHindi ? 'कोहरा' : 'Foggy',
      Icon: CloudFog,
    };
  }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return {
      label: isHindi ? 'बारिश' : 'Rain',
      Icon: CloudRain,
    };
  }
  if (code >= 95) {
    return {
      label: isHindi ? 'तूफान' : 'Storm',
      Icon: CloudLightning,
    };
  }

  return {
    label: isHindi ? 'साफ़' : 'Clear',
    Icon: CloudSun,
  };
}

interface GayaWeatherProps {
  className?: string;
  showDot?: boolean;
}

export default function GayaWeather({ 
  className = "hidden lg:flex items-center gap-1.5 text-gray-300 border-r border-white/20 pr-4 select-none",
  showDot = true
}: GayaWeatherProps) {
  const { isHindi } = useAppLanguage();
  const [weather, setWeather] = useState<WeatherData>({ temp: 32, code: 0 });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchGayaWeather() {
      try {
        const res = await fetch('/api/weather');
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && typeof data.temp === 'number') {
          setWeather({
            temp: data.temp,
            code: typeof data.code === 'number' ? data.code : 0,
          });
          setIsLive(true);
        }
      } catch (err) {
        // Keep fallback without erroring UI
      }
    }

    fetchGayaWeather();
    return () => {
      isMounted = false;
    };
  }, []);

  const info = getWeatherInfo(weather.code, isHindi);
  const IconComponent = info.Icon;
  const cityName = isHindi ? 'गया जी' : 'Gaya Ji';

  return (
    <div 
      className={className}
      title={isHindi ? 'गया जी लाइव मौसम (सटीक उपग्रह डेटा)' : 'Gaya Ji Live Weather (Real-time satellite data)'}
    >
      <IconComponent className="w-3.5 h-3.5 text-[#F48D08] shrink-0 animate-pulse" />
      <span className="tabular-nums">
        {cityName} · {weather.temp}°C {info.label}
      </span>
      {isLive && showDot && (
        <span 
          className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" 
          title="Live" 
        />
      )}
    </div>
  );
}
