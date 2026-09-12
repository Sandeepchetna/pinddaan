import { NextResponse } from 'next/server';

export const revalidate = 900; // Cache on server for 15 minutes

export async function GET() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=24.7955&longitude=85.0002&current=temperature_2m,weather_code&timezone=Asia%2FKolkata',
      { next: { revalidate: 900 } }
    );

    if (!res.ok) {
      throw new Error(`Open-Meteo API returned status ${res.status}`);
    }

    const data = await res.json();
    const temp = Math.round(data.current?.temperature_2m ?? 30);
    const code = Number(data.current?.weather_code ?? 0);

    return NextResponse.json(
      {
        success: true,
        temp,
        code,
        city: 'Gaya Ji',
        timestamp: data.current?.time,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
        },
      }
    );
  } catch (error) {
    console.error('Weather fetch error:', error);
    // Graceful fallback to avoid breaking UI
    return NextResponse.json({
      success: false,
      temp: 31,
      code: 0,
      city: 'Gaya Ji',
      fallback: true,
    });
  }
}
