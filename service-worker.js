const CACHE_NAME = "runjs-cache-v1";
const FILES_TO_CACHE = [
    "index.html",
    "manifest.json",
    "service-worker.js",
    "icons/icon-192x192.png",
    "icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
