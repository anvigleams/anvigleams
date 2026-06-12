/**
 * In-memory rate limiter for Next.js API routes / Server Actions.
 * Keyed by identifier (IP or phone). Resets per window.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    store.forEach((v, k) => {
      if (v.resetAt < now) store.delete(k);
    });
  }, 5 * 60 * 1000);
}

/**
 * @param key       Unique identifier (IP address, phone number, etc.)
 * @param limit     Max allowed requests per window (default: 5)
 * @param windowMs  Window size in milliseconds (default: 60 seconds)
 * @returns         { allowed: boolean, remaining: number }
 */
export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 60 * 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}
