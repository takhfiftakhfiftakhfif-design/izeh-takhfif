// نام حافظه کش برای ذخیره فایل‌ها
const CACHE_NAME = 'izeh-takhfif-v1';

// لیست فایل‌هایی که می‌خواهیم برای سرعت بیشتر ذخیره شوند
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
];

// نصب سرویس ورکر
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// مدیریت درخواست‌ها (برای کارکرد سریع‌تر و آفلاین)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // اگر فایل در کش بود آن را برگردان، در غیر از شبکه بگیر
        return response || fetch(event.request);
      })
  );
});

// فعال‌سازی و پاکسازی کش‌های قدیمی
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
