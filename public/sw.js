/**
 * Service Worker for Mixed by Iker
 * Provides offline capabilities and advanced caching strategies
 */

// Cache names
const STATIC_CACHE = 'static-cache-v1';
const IMAGES_CACHE = 'images-cache-v1';
const FONTS_CACHE = 'fonts-cache-v1';
const API_CACHE = 'api-cache-v1';

// Resources to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/offline',  // You'll need to create an offline page
  '/favicon.ico'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, IMAGES_CACHE, FONTS_CACHE, API_CACHE];
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Helper function to determine if a request is for an image
function isImageRequest(request) {
  return request.destination === 'image' || 
         request.url.match(/\.(jpe?g|png|gif|svg|webp)$/i);
}

// Helper function to determine if a request is for a font
function isFontRequest(request) {
  return request.destination === 'font' || 
         request.url.match(/\.(woff2?|ttf|otf|eot)$/i);
}

// Helper function to determine if a request is for an API
function isApiRequest(request) {
  return request.url.includes('/api/');
}

// Fetch event - handle different caching strategies based on request type
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Images: Cache first, then network, then cache response
  if (isImageRequest(request)) {
    event.respondWith(cacheFirstThenNetwork(request, IMAGES_CACHE));
    return;
  }
  
  // Fonts: Cache first, then network, then cache response
  if (isFontRequest(request)) {
    event.respondWith(cacheFirstThenNetwork(request, FONTS_CACHE));
    return;
  }
  
  // API requests: Network first with stale-while-revalidate fallback
  if (isApiRequest(request)) {
    event.respondWith(networkFirstWithStaleWhileRevalidate(request));
    return;
  }
  
  // Default: Network first, falling back to cache
  event.respondWith(
    fetch(request)
      .catch(() => {
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // If the request is for a page, return the offline page
            if (request.mode === 'navigate') {
              return caches.match('/offline');
            }
            
            return null;
          });
      })
  );
});

// Cache first, then network strategy
async function cacheFirstThenNetwork(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // If both cache and network fail, return a fallback if available
    return null;
  }
}

// Network first with stale-while-revalidate fallback for API requests
async function networkFirstWithStaleWhileRevalidate(request) {
  const cache = await caches.open(API_CACHE);
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache the response for future use
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // If network fails, try cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      // Asynchronously update the cache in the background
      // This is the "revalidate" part of stale-while-revalidate
      const updateCache = async () => {
        try {
          const freshResponse = await fetch(request);
          if (freshResponse && freshResponse.status === 200) {
            await cache.put(request, freshResponse);
          }
        } catch (updateError) {
          // Ignore update errors, we already have a cached response
        }
      };
      
      // Don't wait for the update to complete
      updateCache();
      
      // Return the cached response immediately
      return cachedResponse;
    }
    
    // If both network and cache fail, return a fallback or null
    return null;
  }
}