import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { addServerPushHeaders } from './utils/serverPush';

// In-memory store for rate limiting
// In a production environment, you would use Redis or another distributed store
type RateLimitStore = {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
};

const downloadRateLimits: RateLimitStore = {};

// Rate limit configuration
const DOWNLOAD_RATE_LIMIT = 10; // Max downloads per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds

// CSRF token configuration
const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

// Generate a random token for CSRF protection
function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Check if a request is a download request
function isDownloadRequest(request: NextRequest): boolean {
  const url = request.nextUrl.pathname;
  // Add your download paths here
  return url.includes('/downloads/') || 
         url.includes('/products/') && url.includes('/download');
}

// Apply rate limiting for downloads
function applyRateLimit(request: NextRequest): NextResponse | null {
  const ip = request.ip || 'unknown';
  const now = Date.now();
  
  // Initialize or reset expired entries
  if (!downloadRateLimits[ip] || downloadRateLimits[ip].resetTime < now) {
    downloadRateLimits[ip] = {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    };
  }
  
  // Increment count
  downloadRateLimits[ip].count++;
  
  // Check if rate limit exceeded
  if (downloadRateLimits[ip].count > DOWNLOAD_RATE_LIMIT) {
    const response = NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    );
    
    // Add headers to inform about rate limiting
    response.headers.set('Retry-After', Math.ceil((downloadRateLimits[ip].resetTime - now) / 1000).toString());
    return response;
  }
  
  return null;
}

// Apply CSRF protection
function applyCSRFProtection(request: NextRequest): NextResponse | null {
  // Skip CSRF check for GET, HEAD, OPTIONS requests as they should be idempotent
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return null;
  }
  
  // Get the CSRF token from the cookie and header
  const csrfCookie = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const csrfHeader = request.headers.get(CSRF_HEADER_NAME);
  
  // If tokens don't match, reject the request
  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return NextResponse.json(
      { error: 'CSRF token validation failed' },
      { status: 403 }
    );
  }
  
  return null;
}

// Apply password protection for specific routes
function applyPasswordProtection(request: NextRequest): NextResponse | null {
  const MASTER_PASSWORD = process.env.PLUGINS_MASTER_PASSWORD || 'masterpassword'; // Use environment variable in production
  const requestedPassword = request.nextUrl.searchParams.get('password');

  if (request.nextUrl.pathname === '/plugins' && requestedPassword !== MASTER_PASSWORD) {
    // Redirect to a login page or return unauthorized
    // For simplicity, returning unauthorized here. You might want to redirect to a custom login page.
    return NextResponse.json(
      { error: 'Unauthorized access to plugins. Please provide the correct password.' },
      { status: 401 }
    );
  }
  return null;
}

// Add caching headers based on content type
function addCachingHeaders(request: NextRequest, response: NextResponse): NextResponse {
  const url = request.nextUrl.pathname;
  
  // Static assets - long cache
  if (url.match(/\.(css|js|woff2?|ttf|otf|eot|svg|png|jpe?g|gif|ico|webp)$/i)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }
  // HTML pages - shorter cache with revalidation
  else if (!url.includes('/api/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
    );
  }
  
  return response;
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();
  
  // Apply rate limiting for download requests
  if (isDownloadRequest(request)) {
    const rateLimitResponse = applyRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;
  }
  
  // Apply CSRF protection for state-changing requests
  const csrfResponse = applyCSRFProtection(request);
  if (csrfResponse) return csrfResponse;

  // Apply password protection for the /plugins route
  const passwordProtectionResponse = applyPasswordProtection(request);
  if (passwordProtectionResponse) return passwordProtectionResponse;
  
  // For GET requests, set a CSRF token if one doesn't exist
  if (request.method === 'GET' && !request.cookies.has(CSRF_COOKIE_NAME)) {
    const csrfToken = generateCSRFToken();
    response.cookies.set(CSRF_COOKIE_NAME, csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }
  
  // Add caching headers based on content type
  response = addCachingHeaders(request, response);
  
  // Add HTTP/2 Server Push hints for HTML requests
  if (!request.nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json)$/i)) {
    response = addServerPushHeaders(response);
  }
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};