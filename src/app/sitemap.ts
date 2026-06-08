import { MetadataRoute } from 'next';
import { TREATMENTS } from '@/lib/data';
import { BLOG_POSTS } from '@/lib/blog';

const BASE_URL = 'https://anvigleams.com';
const TARGET_CITIES = ['sangamner', 'ahmednagar', 'nashik'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/treatments',
    '/gallery',
    '/expert',
    '/contact',
    '/book',
    '/track',
    '/blog',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Standard Treatments
  const treatments = TREATMENTS.map((t) => ({
    url: `${BASE_URL}/treatments/${t.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Dynamic Location SEO Pages
  const locations: any[] = [];
  TARGET_CITIES.forEach((city) => {
    TREATMENTS.forEach((t) => {
      locations.push({
        url: `${BASE_URL}/locations/${city}/${t.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      });
    });
  });

  // Blog Posts
  const blogs = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...treatments, ...locations, ...blogs];
}
