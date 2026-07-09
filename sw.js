const CACHE_NAME = 'rkb-kpu-v2';
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'sw.js',
  'icon-rkh.png'
];

// 1. Proses Install & Menyimpan Cache File Utama
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Proses Aktivasi & Otomatis Menghapus Cache Lama yang Rusak
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 3. Proses Mengambil Data (Bisa Terbuka Saat Offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
