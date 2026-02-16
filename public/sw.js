const CACHE_NAME = 'sneakout-v1';
const OFFLINE_PAGE = '/offline';

const STATIC_ASSETS = [
  '/',
  '/offline',
  '/styles/globals.css',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network first for API, Cache first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // API calls - Network first, fallback to cache
  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response.ok) throw new Error('Network error');
          // Clone and cache successful responses
          const cache = caches.open(CACHE_NAME);
          cache.then((c) => c.put(request, response.clone()));
          return response;
        })
        .catch(() => {
          return caches.match(request) || new Response('Offline', { status: 503 });
        })
    );
    return;
  }

  // Images - Cache first, fallback to network
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request).then((res) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, res.clone());
              return res;
            });
          })
        );
      })
    );
    return;
  }

  // Default - Cache first, fallback to network
  event.respondWith(
    caches
      .match(request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      })
      .catch(() => {
        return caches.match(OFFLINE_PAGE);
      })
  );
});
