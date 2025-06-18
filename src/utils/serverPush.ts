/**
 * HTTP/2 Server Push Utilities
 * 
 * This utility helps implement HTTP/2 Server Push hints for critical assets.
 * It works by adding Link headers to responses, which can be used by CDNs and servers
 * that support HTTP/2 Server Push.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type AssetType = 'style' | 'script' | 'font' | 'image';

interface PushAsset {
  path: string;
  type: AssetType;
  crossorigin?: boolean;
}

/**
 * Critical assets that should be pushed for fast initial rendering
 */
const CRITICAL_ASSETS: PushAsset[] = [
  { path: '/js/sw-register.js', type: 'script' },
  // Add other critical assets here
];

/**
 * Generates the as value for a given asset type
 */
function getAsValue(type: AssetType): string {
  switch (type) {
    case 'style': return 'style';
    case 'script': return 'script';
    case 'font': return 'font';
    case 'image': return 'image';
    default: return 'script';
  }
}

/**
 * Adds HTTP/2 Server Push hints to a response
 * 
 * @param response - The NextResponse object
 * @param assets - Array of assets to push
 * @returns The modified response
 */
export function addServerPushHeaders(
  response: NextResponse,
  assets: PushAsset[] = CRITICAL_ASSETS
): NextResponse {
  // Generate Link header value
  const linkValues = assets.map(asset => {
    const { path, type, crossorigin } = asset;
    const as = getAsValue(type);
    const crossOriginValue = crossorigin ? '; crossorigin' : '';
    return `<${path}>; rel=preload; as=${as}${crossOriginValue}`;
  });
  
  // Add Link header if we have assets to push
  if (linkValues.length > 0) {
    response.headers.set('Link', linkValues.join(', '));
  }
  
  return response;
}

/**
 * Middleware function to add Server Push hints
 * 
 * @param request - The incoming request
 * @returns A response with Server Push headers
 */
export function serverPushMiddleware(request: NextRequest): NextResponse {
  // Only add Server Push hints for HTML requests
  const isHtmlRequest = !request.nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json)$/i);
  
  // Skip for non-HTML requests
  if (!isHtmlRequest) {
    return NextResponse.next();
  }
  
  // Create response and add Server Push headers
  const response = NextResponse.next();
  return addServerPushHeaders(response);
}