const CACHE_NAME = "graph-app-v2";

const FILES_TO_CACHE = [
  // --------------------
  // PÁGINAS
  // --------------------
  "/",
  "/public/home.html",
  "/public/app.html",
  "/public/dashboard.html",
  "/public/about.html",
  "/public/manifest.json",

  // --------------------
  // CSS
  // --------------------
  "/assets/css/form.css",
  "/assets/css/dashboard.css",

  // --------------------
  // JS
  // --------------------
  "/assets/js/form.js",
  "/assets/js/dashboard.js",
  "/assets/js/dataParser.js",
  "/assets/js/chartRules.js",

  // --------------------
  // ICONS (PWA)
  // --------------------
  "/assets/icons/licon.png",
  "/assets/icons/icon-72.png",
  "/assets/icons/icon-96.png",
  "/assets/icons/icon-128.png",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-256.png",
  "/assets/icons/icon-384.png",
  "/assets/icons/icon-512.png",

  // --------------------
  // EXTERNAL LIBS
  // --------------------
  "https://cdn.jsdelivr.net/npm/chart.js",
  "https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"
];

// =======================
// INSTALL
// =======================
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// =======================
// ACTIVATE
// =======================
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// =======================
// FETCH
// =======================
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
