import { NextResponse } from 'next/server';

export const revalidate = 900; // Cache on server for 15 minutes (900 seconds)

export async function GET() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=24.7955&longitude=85.0002&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata',
      { next: { revalidate: 900 } }
    );

    if (!res.ok) {
      throw new Error(`Open-Meteo API returned status ${res.status}`);
    }

    const data = await res.json();
    const current = data.current || {};
    const daily = data.daily || {};

    const temp = Math.round(current.temperature_2m ?? 32);
    const feelsLike = Math.round(current.apparent_temperature ?? (temp + 3));
    const humidity = Math.round(current.relative_humidity_2m ?? 60);
    const windSpeed = Math.round(current.wind_speed_10m ?? 14);
    const pressure = Math.round(current.surface_pressure ?? 1005);
    const code = Number(current.weather_code ?? 0);

    // Build 3-day forecast
    const forecastDays = (daily.time || []).slice(0, 3).map((dateStr: string, idx: number) => {
      const date = new Date(dateStr);
      const dayName = idx === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNameHi = idx === 0 ? 'आज' : date.toLocaleDateString('hi-IN', { weekday: 'short' });
      return {
        date: dateStr,
        day: dayName,
        dayHi: dayNameHi,
        maxTemp: Math.round(daily.temperature_2m_max?.[idx] ?? temp),
        minTemp: Math.round(daily.temperature_2m_min?.[idx] ?? (temp - 7)),
        code: Number(daily.weather_code?.[idx] ?? code),
      };
    });

    return NextResponse.json(
      {
        success: true,
        city: 'Gaya Ji',
        temp,
        feelsLike,
        humidity,
        windSpeed,
        pressure,
        code,
        forecast: forecastDays,
        timestamp: current.time,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
        },
      }
    );
  } catch (error) {
    console.error('Weather fetch error:', error);
    // Graceful fallback with realistic autumn/monsoon transition data for Gaya Ji
    return NextResponse.json({
      success: false,
      city: 'Gaya Ji',
      temp: 32,
      feelsLike: 36,
      humidity: 62,
      windSpeed: 15,
      pressure: 1004,
      code: 1,
      forecast: [
        { date: '2026-09-12', day: 'Today', dayHi: 'आज', maxTemp: 33, minTemp: 25, code: 1 },
        { date: '2026-09-13', day: 'Sun', dayHi: 'रवि', maxTemp: 32, minTemp: 25, code: 2 },
        { date: '2026-09-14', day: 'Mon', dayHi: 'सोम', maxTemp: 31, minTemp: 24, code: 80 },
      ],
      fallback: true,
    });
  }
}
