import { NextResponse } from 'next/server';

export const revalidate = 900; // Cache on server for 15 minutes (900 seconds)

export async function GET() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=24.7955&longitude=85.0002&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,shortwave_radiation,direct_normal_irradiance,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata',
      { next: { revalidate: 900 } }
    );

    if (!res.ok) {
      throw new Error(`Open-Meteo API returned status ${res.status}`);
    }

    const data = await res.json();
    const current = data.current || {};
    const daily = data.daily || {};

    const temp = Math.round(current.temperature_2m ?? 24);
    const rawApparent = Number(current.apparent_temperature ?? temp);
    const isDay = Number(current.is_day ?? 1) === 1;
    const solarRadiation = Number(current.shortwave_radiation ?? (isDay ? 400 : 0));
    const humidity = Math.round(current.relative_humidity_2m ?? 65);
    const windSpeed = Math.round(current.wind_speed_10m ?? 10);
    const pressure = Math.round(current.surface_pressure ?? 1005);
    const code = Number(current.weather_code ?? 0);

    const minTemp = Math.round(daily.temperature_2m_min?.[0] ?? (temp - 4));
    const maxTemp = Math.round(daily.temperature_2m_max?.[0] ?? (temp + 4));

    // Dynamic physically-scaled "Feels Like" calculation against solar radiation & nocturnal cooling:
    // When local timestamp is at night (isDay === false or solarRadiation <= 10):
    // Solar radiation is 0 and heat index from solar loading does not apply.
    // If temp is close to the minimum range boundary (e.g. 23°C in 27°C/22°C window),
    // do NOT output daytime heat feel indexes (such as 27°C).
    let feelsLike = temp;
    if (!isDay || solarRadiation <= 10) {
      const nocturnalWindCooling = windSpeed > 5 ? Math.min(2, Math.round(windSpeed / 10)) : 0;
      if (temp <= 25) {
        // Night chill / ambient tracking: never exceed ambient temp at cool night hours
        feelsLike = Math.max(minTemp, temp - nocturnalWindCooling);
      } else {
        // Warm summer night (>25°C): clamp heat index tightly to ambient + 1
        feelsLike = Math.min(temp + 1, Math.round(rawApparent));
      }
    } else {
      // Daytime: scales dynamically against solar radiation parameters (0 - 1000 W/m²)
      const solarScale = Math.min(1, Math.max(0.15, solarRadiation / 750));
      const delta = (rawApparent - temp) * solarScale;
      feelsLike = Math.round(temp + delta);
    }

    // Build 3-day forecast with data cohesion guarantee
    const forecastDays = (daily.time || []).slice(0, 3).map((dateStr: string, idx: number) => {
      const date = new Date(dateStr);
      const dayName = idx === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNameHi = idx === 0 ? 'आज' : date.toLocaleDateString('hi-IN', { weekday: 'short' });

      // Cohesion fix: For "Today" (idx === 0), weather condition code MUST strictly match
      // the live condition `code` so the main header string and Today's forecast card never contradict each other.
      let dayCode = Number(daily.weather_code?.[idx] ?? code);
      if (idx === 0) {
        dayCode = code;
      }

      return {
        date: dateStr,
        day: dayName,
        dayHi: dayNameHi,
        maxTemp: Math.round(daily.temperature_2m_max?.[idx] ?? maxTemp),
        minTemp: Math.round(daily.temperature_2m_min?.[idx] ?? minTemp),
        code: dayCode,
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
        isDay,
        solarRadiation,
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
    // Graceful, cohesive fallback for Gaya Ji
    return NextResponse.json({
      success: false,
      city: 'Gaya Ji',
      temp: 24,
      feelsLike: 24,
      humidity: 68,
      windSpeed: 8,
      pressure: 1006,
      code: 0,
      isDay: false,
      solarRadiation: 0,
      forecast: [
        { date: '2026-10-08', day: 'Today', dayHi: 'आज', maxTemp: 28, minTemp: 22, code: 0 },
        { date: '2026-10-09', day: 'Fri', dayHi: 'शुक्र', maxTemp: 28, minTemp: 22, code: 1 },
        { date: '2026-10-10', day: 'Sat', dayHi: 'शनि', maxTemp: 29, minTemp: 23, code: 2 },
      ],
      fallback: true,
    });
  }
}
