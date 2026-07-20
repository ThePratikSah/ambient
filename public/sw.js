const CACHE_NAME = "ambient-v1";
const AUDIO_MANIFEST_URL = "/manifest/audio-files.json";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll([
        "/",
        "/index.html",
        "/manifest/manifest.json",
        "/icons/icon-192.png",
        "/icons/icon-512.png",
        "/icons/apple-touch-icon.png",
      ]);
      try {
        const res = await fetch(AUDIO_MANIFEST_URL);
        const audioFiles = await res.json();
        await Promise.allSettled(
          audioFiles.map((url) =>
            fetch(url).then((r) => {
              if (r.ok) cache.put(url, r);
            })
          )
        );
      } catch {
        // audio pre-cache is best-effort; on-demand handles misses
      }
    })()
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })()
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  if (url.pathname.startsWith("/audio/")) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        const net = await fetch(event.request);
        if (net.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, net.clone());
        }
        return net;
      })()
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      try {
        const net = await fetch(event.request);
        if (net.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, net.clone());
        }
        return net;
      } catch {
        return new Response("Offline", { status: 503 });
      }
    })()
  );
});
