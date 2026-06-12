import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimiter';

export async function GET(request: NextRequest) {
  // Rate limit: 30 requests/min per IP to prevent scraping
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = checkRateLimit(`reviews:${ip}`, 30, 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.error('[reviews] GOOGLE_PLACES_API_KEY is not set');
    // Return static fallback so the UI doesn't break
    return NextResponse.json({ rating: 4.9, reviewCount: 31 });
  }

  const placeId = 'ChIJ44wGVwsB3TsRhD2-Bo1CWzU';
  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount`;

  try {
    const res = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'Referer': 'https://anvigleams.in',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour — only one upstream call per hour
    });

    if (!res.ok) {
      console.error('[reviews] Google Places API returned', res.status);
      return NextResponse.json({ rating: 4.9, reviewCount: 31 });
    }

    const data = await res.json();
    return NextResponse.json({
      rating: data.rating ?? 4.9,
      reviewCount: data.userRatingCount ?? 31,
    });
  } catch (error) {
    console.error('[reviews] Fetch error:', error);
    return NextResponse.json({ rating: 4.9, reviewCount: 31 });
  }
}
