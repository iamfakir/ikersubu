import { NextRequest, NextResponse } from 'next/server';
import { createRateLimiter } from '@/utils/rateLimit';

// Create a rate limiter for downloads
const downloadRateLimiter = createRateLimiter('downloads', {
  limit: 10, // 10 downloads per hour
  windowMs: 60 * 60 * 1000, // 1 hour
});

/**
 * Handle download requests
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = downloadRateLimiter(request);
  
  // If rate limit exceeded, return 429 Too Many Requests
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': Math.ceil(rateLimitResult.resetTime / 1000).toString(),
        }
      }
    );
  }
  
  // Get the file parameter
  const fileParam = request.nextUrl.searchParams.get('file');
  if (!fileParam) {
    return NextResponse.json(
      { error: 'Missing file parameter' },
      { status: 400 }
    );
  }
  
  // In a real implementation, you would:
  // 1. Validate the file parameter to prevent path traversal attacks
  // 2. Check if the user has permission to access the file
  // 3. Stream the file as a response
  
  // For this example, we'll just return a success message
  return NextResponse.json(
    { 
      success: true, 
      message: 'Download initiated',
      file: fileParam,
      rateLimitRemaining: rateLimitResult.remaining
    },
    {
      headers: {
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': Math.ceil(rateLimitResult.resetTime / 1000).toString(),
      }
    }
  );
}

/**
 * Handle POST requests (e.g., for download tokens)
 */
export async function POST(request: NextRequest) {
  // Verify CSRF token (middleware handles this)
  
  // Apply rate limiting
  const rateLimitResult = downloadRateLimiter(request);
  
  // If rate limit exceeded, return 429 Too Many Requests
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
        }
      }
    );
  }
  
  try {
    // Parse the request body
    const body = await request.json();
    
    // Process the download request
    // In a real implementation, you might generate a download token
    
    return NextResponse.json({
      success: true,
      message: 'Download token generated',
      token: 'example-token-' + Date.now(),
      rateLimitRemaining: rateLimitResult.remaining
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}