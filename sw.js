const CACHE_NAME = 'homehub-v1';
const ASSETS = [
  '/Liste-Famiglia/',
  '/Liste-Famiglia/index.html',
  '/Liste-Famiglia/manifest.json',
  '/Liste-Famiglia/icon-192.png',
  '/Liste-Famiglia/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
