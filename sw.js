const CACHE_NAME = 'lifa-cache-v2'; // Incrementato a v2 per forzare il refresh delle modifiche
const ASSETS = [
  '/Liste-Famiglia/',
  '/Liste-Famiglia/index.html',
  '/Liste-Famiglia/manifest.json',
  '/Liste-Famiglia/icon-192.png',
  '/Liste-Famiglia/icon-512.png'
];

// Installazione e caching degli asset stabili
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Attivazione e pulizia automatica delle vecchie cache obsolete
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Strategia Network-First con Fallback su Cache per gli asset dinamici
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});