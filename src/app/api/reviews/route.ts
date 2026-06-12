import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimiter';

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = checkRateLimit(`reviews:${ip}`, 30, 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.error('[reviews] GOOGLE_PLACES_API_KEY is not set');
    return NextResponse.json({ rating: 4.9, reviewCount: 31, reviews: [] });
  }

  const placeId = 'ChIJ44wGVwsB3TsRhD2-Bo1CWzU';
  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,reviews`;

  try {
    const res = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'Referer': 'https://anvigleams.in',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error('[reviews] Google Places API returned', res.status);
      return NextResponse.json({ rating: 4.9, reviewCount: 31, reviews: [] });
    }

    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reviews = (data.reviews ?? []).map((r: any) => ({
      author: r.authorAttribution?.displayName ?? 'Anonymous',
      avatar: r.authorAttribution?.photoUri ?? null,
      rating: r.rating ?? 5,
      text: r.text?.text ?? '',
      time: r.publishTime ?? null,
    }));

    return NextResponse.json({
      rating: data.rating ?? 4.9,
      reviewCount: data.userRatingCount ?? 31,
      reviews,
    });
  } catch (error) {
    console.error('[reviews] Fetch error:', error);
    return NextResponse.json({ rating: 4.9, reviewCount: 31, reviews: [] });
  }
}
