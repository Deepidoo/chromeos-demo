const CACHE_NAME = "dj-cache-1.1.0";
const BASE = location.protocol + "//" + location.host;
const CACHED_RESOURCES = [
  "/main.js",
  // Add other critical resources
];

// Service Worker Install Event
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(
        [...CACHED_RESOURCES].map((path) => {
          return cache.add(new Request(path));
        })
      );
    })()
  );
  console.log(`${CACHE_NAME} Install`);
});

self.addEventListener("activate", (event) => {
  clients.claim();
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })()
  );
  console.log(`${CACHE_NAME} Active`);
});

self.addEventListener("fetch", (event) => {
  console.log(`${CACHE_NAME} Fetching : ${event.request.url}, Mode : ${event.request.mode}`);

  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          return await fetch(event.request);
        } catch (e) {
          console.log(e);
          const cache = await caches.open(CACHE_NAME);
          return (await cache.match("/")) || (await cache.match("index.html"));
        }
      })()
    );
  } else if (CACHED_RESOURCES.includes(event.request.url)) {
    console.log(`${event.request.url} from cache`);
    try {
      event.respondWith(caches.match(event.request));
    } catch (err) {
      console.log(`ERROR : ${event.request.url} from cache`);
    }
  }
});
