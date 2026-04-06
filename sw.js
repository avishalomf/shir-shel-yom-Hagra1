// VERSION: 1.0.0 | PROJECT: Shir Shel Yom PWA | SW
const CACHE_NAME = 'shir-shel-yom-v1';

// רשימת הקבצים לשמירה במטמון
const ASSETS = [
  './',
  './index.html',
  './psalms.json',
  './app.webmanifest',
  './favicon.png',
  './icon-192.png'
];

// התקנה - שמירת הקבצים בזיכרון
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching Assets');
      return cache.addAll(ASSETS);
    })
  );
});

// הפעלה - ניקוי זיכרון ישן אם קיים
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// שליפת נתונים - עדיפות למטמון (Offline First)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
