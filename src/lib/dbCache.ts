/**
 * In-memory query cache for Prisma
 * Solves Hostinger MySQL ERROR 42000 (1226): max_connections_per_hour (limit 500).
 * Caches frequently read static data (SiteSettings, Packages, SacredPlaces, Articles, Slides)
 * across Next.js static page generations and server requests.
 */

const memoryCache = new Map<string, { data: any; expiry: number }>();

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 300 // 5 minutes cache
): Promise<T> {
  const now = Date.now();
  const cached = memoryCache.get(key);

  if (cached && cached.expiry > now) {
    return cached.data as T;
  }

  try {
    const data = await fetcher();
    memoryCache.set(key, { data, expiry: now + ttlSeconds * 1000 });
    return data;
  } catch (err: any) {
    // If DB is temporarily rate-limited, fallback to expired cache if available
    if (cached) {
      console.warn(`[dbCache] Using fallback cached data for key "${key}" due to DB error:`, err?.message || err);
      return cached.data as T;
    }
    throw err;
  }
}

export function invalidateCache(key?: string) {
  if (key) {
    memoryCache.delete(key);
  } else {
    memoryCache.clear();
  }
}
