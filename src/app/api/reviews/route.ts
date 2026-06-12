import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyDOQ9AVHLs7nvJlPiqGRYir1XvEEs1mpCc';
  const placeId = 'ChIJ44wGVwsB3TsRhD2-Bo1CWzU';
  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount`;

  try {
    const res = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'Referer': 'https://anvigleams.in',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch from Google');
    }
    
    const data = await res.json();
    return NextResponse.json({
      rating: data.rating || 4.9,
      reviewCount: data.userRatingCount || 31
    });
  } catch (error) {
    console.error('Google Reviews API Error:', error);
    // Fallback data
    return NextResponse.json({ rating: 4.9, reviewCount: 31 });
  }
}
