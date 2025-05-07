const CACHE_NAME = 'portfolio-cache-v2';
const STATIC_CACHE = 'static-cache-v2';
const DYNAMIC_CACHE = 'dynamic-cache-v2';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/images-videos/favicon.ico',
  '/images-videos/mistral.webp',
  '/images-videos/sid.webp',
  '/images-videos/mjkironworkspic.webp',
  '/images-videos/vending.webp',
  '/images-videos/project2-thumbnail.webp',
  '/images-videos/hypercars.mp4',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Poppins:wght@300;400&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Return cached response
        }

        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the response
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If both cache and network fail, return a fallback
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
              return caches.match('/images-videos/fallback.webp');
            }
            return new Response('Network error occurred', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
}); 