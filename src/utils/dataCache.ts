/**
 * Data Caching Utility
 * 
 * This utility provides a stale-while-revalidate caching mechanism for data fetching.
 * It helps reduce unnecessary network requests and improves performance.
 */

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

type CacheOptions = {
  maxAge: number;       // Maximum age in milliseconds before data is considered stale
  staleWhileRevalidate: number; // Time in milliseconds to continue using stale data while revalidating
};

// Default cache options
const DEFAULT_OPTIONS: CacheOptions = {
  maxAge: 60 * 1000,             // 1 minute
  staleWhileRevalidate: 10 * 60 * 1000, // 10 minutes
};

// In-memory cache store
const cacheStore: Record<string, CacheEntry<any>> = {};

/**
 * Fetches data with stale-while-revalidate caching strategy
 * 
 * @param key - Unique key for the data
 * @param fetchFn - Function that fetches the data
 * @param options - Cache options
 * @returns The cached or freshly fetched data
 */
export async function fetchWithCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: Partial<CacheOptions> = {}
): Promise<T> {
  const { maxAge, staleWhileRevalidate } = { ...DEFAULT_OPTIONS, ...options };
  const now = Date.now();
  const cachedEntry = cacheStore[key];
  
  // If we have a cached entry
  if (cachedEntry) {
    const age = now - cachedEntry.timestamp;
    
    // If the data is fresh, return it immediately
    if (age < maxAge) {
      return cachedEntry.data;
    }
    
    // If the data is stale but within the staleWhileRevalidate window
    if (age < maxAge + staleWhileRevalidate) {
      // Revalidate in the background
      revalidateData(key, fetchFn);
      
      // Return stale data immediately
      return cachedEntry.data;
    }
  }
  
  // If no cache entry or it's too old, fetch fresh data
  return fetchFreshData(key, fetchFn);
}

/**
 * Fetches fresh data and updates the cache
 */
async function fetchFreshData<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
  try {
    const data = await fetchFn();
    
    // Update the cache
    cacheStore[key] = {
      data,
      timestamp: Date.now(),
    };
    
    return data;
  } catch (error) {
    // If we have a cached entry, return it as a fallback
    if (cacheStore[key]) {
      console.warn(`Failed to fetch fresh data for ${key}, using cached data as fallback`);
      return cacheStore[key].data;
    }
    
    // Otherwise, rethrow the error
    throw error;
  }
}

/**
 * Revalidates data in the background
 */
async function revalidateData<T>(key: string, fetchFn: () => Promise<T>): Promise<void> {
  try {
    const data = await fetchFn();
    
    // Update the cache
    cacheStore[key] = {
      data,
      timestamp: Date.now(),
    };
  } catch (error) {
    // Log the error but don't update the cache
    console.error(`Failed to revalidate data for ${key}:`, error);
  }
}

/**
 * Invalidates a cache entry
 * 
 * @param key - The key to invalidate
 */
export function invalidateCache(key: string): void {
  delete cacheStore[key];
}

/**
 * Invalidates all cache entries
 */
export function invalidateAllCache(): void {
  Object.keys(cacheStore).forEach(key => {
    delete cacheStore[key];
  });
}

/**
 * Gets a cache entry without triggering a fetch
 * 
 * @param key - The cache key
 * @returns The cached data or null if not found
 */
export function getCacheEntry<T>(key: string): T | null {
  const entry = cacheStore[key];
  return entry ? entry.data : null;
}

/**
 * Prefetches data and stores it in the cache
 * 
 * @param key - The cache key
 * @param fetchFn - Function that fetches the data
 */
export async function prefetchData<T>(key: string, fetchFn: () => Promise<T>): Promise<void> {
  try {
    const data = await fetchFn();
    
    cacheStore[key] = {
      data,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error(`Failed to prefetch data for ${key}:`, error);
  }
}