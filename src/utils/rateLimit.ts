/**
 * Rate Limiting Utility
 * 
 * This utility provides rate limiting functionality for API routes.
 * It works alongside the middleware.ts rate limiting implementation.
 */

type RateLimitStore = {
  [key: string]: {
    count: number;
    resetTime: number;
  };
};

interface RateLimitOptions {
  limit: number;
  windowMs: number;
  keyGenerator?: (req: Request) => string;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

// In-memory store for rate limiting
// In production, you would use Redis or another distributed store
const stores: Record<string, RateLimitStore> = {};

/**
 * Creates a rate limiter function
 */
export function createRateLimiter(name: string, options: RateLimitOptions) {
  const {
    limit = 10,
    windowMs = 60 * 60 * 1000, // 1 hour in milliseconds
    keyGenerator = (req: Request) => {
      // Default key generator uses IP or a fallback
      const forwarded = req.headers.get('x-forwarded-for');
      const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
      return ip;
    },
  } = options;

  // Create store if it doesn't exist
  if (!stores[name]) {
    stores[name] = {};
  }
  const store = stores[name];

  // Return the rate limiter function
  return function rateLimit(req: Request): RateLimitResult {
    const key = keyGenerator(req);
    const now = Date.now();

    // Initialize or reset expired entries
    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 0,
        resetTime: now + windowMs,
      };
    }

    // Increment count
    store[key].count++;

    // Check if rate limit exceeded
    const isRateLimited = store[key].count > limit;

    return {
      success: !isRateLimited,
      limit,
      remaining: Math.max(0, limit - store[key].count),
      resetTime: store[key].resetTime,
    };
  };
}

/**
 * Cleans up expired rate limit entries
 * Call this periodically to prevent memory leaks
 */
export function cleanupRateLimits(): void {
  const now = Date.now();
  
  Object.keys(stores).forEach(storeName => {
    const store = stores[storeName];
    
    Object.keys(store).forEach(key => {
      if (store[key].resetTime < now) {
        delete store[key];
      }
    });
  });
}

// Set up automatic cleanup every hour
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimits, 60 * 60 * 1000);
}