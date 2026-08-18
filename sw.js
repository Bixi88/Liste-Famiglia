const CACHE_NAME = 'lifa-cache-v6';
const APP_SHELL = '/Liste-Famiglia/index.html';

// File dell'app
const APP_ASSETS = [
  '/Liste-Famiglia/',
  '/Liste-Famiglia/index.html',
  '/Liste-Famiglia/manifest.json',
  '/Liste-Famiglia/icon-192.png',
  '/Liste-Famiglia/icon-512.png'
];

// Librerie esterne necessarie per far funzionare l'app anche offline
const CDN_ASSETS = [
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js',
  'https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // no-store: forza il download reale dei file dell'app, ignorando la cache HTTP del telefono
      return Promise.all(
        APP_ASSETS.map(url =>
          fetch(url, { cache: 'no-store' }).then(res => cache.put(url, res)).catch(() => {})
        )
      ).then(() => {
        return Promise.all(
          CDN_ASSETS.map(url =>
            cache.add(new Request(url, { mode: 'no-cors' })).catch(() => {})
          )
        );
      });
    }).then(() => self.skipWaiting())
  );
});

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

self.addEventListener('fetch', e => {
  // Richieste di navigazione (apertura o refresh della pagina):
  // se offline, mostra sempre la app dalla cache, mai la pagina di errore del browser
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(() => caches.match(APP_SHELL))
    );
    return;
  }

  e.respondWith(
    fetch(e.request, { cache: 'no-store' })
      .then(response => {
        // Aggiorna la cache in background con la versione più recente
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});

// Su richiesta della pagina, salta l'attesa e attiva subito la nuova versione
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
