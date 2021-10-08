const timestamp = 1633669891997;
const build = [
  "/_app/start-19d4bd65.js",
  "/_app/assets/start-61d1577b.css",
  "/_app/pages/__layout.svelte-4cdca4a1.js",
  "/_app/assets/pages/__layout.svelte-5347e0db.css",
  "/_app/pages/__error.svelte-1482ca79.js",
  "/_app/pages/index.svelte-9e9e357a.js",
  "/_app/assets/pages/index.svelte-2915abeb.css",
  "/_app/pages/reset_password.svelte-617d0723.js",
  "/_app/assets/pages/reset_password.svelte-0fddace4.css",
  "/_app/pages/how_it_works.svelte-dfe19f08.js",
  "/_app/pages/item_search.svelte-aafe37f3.js",
  "/_app/assets/pages/items/[id].svelte-68186132.css",
  "/_app/pages/edit_room/[id].svelte-bce86f33.js",
  "/_app/pages/add_item.svelte-77731fb4.js",
  "/_app/pages/add_room.svelte-9895c60c.js",
  "/_app/pages/my_rooms.svelte-22a4f7a7.js",
  "/_app/assets/pages/my_rooms.svelte-1f8dd424.css",
  "/_app/pages/event/[id].svelte-8b3d6dad.js",
  "/_app/pages/items/[id].svelte-6691e8a5.js",
  "/_app/pages/login.svelte-f11a2cad.js",
  "/_app/assets/pages/login.svelte-599f309d.css",
  "/_app/pages/rooms/[id].svelte-8db81cd6.js",
  "/_app/pages/rooms.svelte-24776e7f.js",
  "/_app/assets/pages/rooms.svelte-0215511b.css",
  "/_app/pages/beee.svelte-857660c6.js",
  "/_app/pages/edit/[id].svelte-a2b5a698.js",
  "/_app/pages/edit.svelte-b994efa7.js",
  "/_app/pages/item/[id].svelte-e16fd6b7.js",
  "/_app/assets/pages/item/[id].svelte-82848076.css",
  "/_app/pages/room/[id].svelte-2600f19c.js",
  "/_app/assets/pages/room/[id].svelte-0f6b7c1a.css",
  "/_app/pages/[username].svelte-9caf1e7b.js",
  "/_app/chunks/vendor-cce9f310.js",
  "/_app/assets/vendor-30b899a4.css",
  "/_app/chunks/singletons-12a22614.js",
  "/_app/chunks/api-5c0c9630.js",
  "/_app/chunks/post-5b27026c.js",
  "/_app/chunks/navigation-51f4a605.js",
  "/_app/chunks/stores-83bcb05a.js",
  "/_app/chunks/stores-befe408a.js",
  "/_app/chunks/Tag-6147c832.js",
  "/_app/chunks/Input-93bd4be1.js",
  "/_app/chunks/Fields-e6f6d5c0.js",
  "/_app/chunks/initialCaps-68f7c1e1.js",
  "/_app/chunks/Image-3c710c51.js",
  "/_app/chunks/parseMarkdown-e6b8768e.js",
  "/_app/chunks/checkEmail-33bd547c.js",
  "/_app/chunks/abslink-3768d0d8.js"
];
const files = [
  "/apexlinks-144.png",
  "/apexlinks-192.png",
  "/apexlinks-512.png",
  "/apple-touch-icon-1024x1024.png",
  "/apple-touch-icon-120x120.png",
  "/apple-touch-icon-152x152.png",
  "/apple-touch-icon-167x167.png",
  "/apple-touch-icon-180x180.png",
  "/favicon.ico",
  "/junegull.ttf",
  "/manifest.webmanifest",
  "/placeholder.png",
  "/robots.txt"
];
const ASSETS = `cache${timestamp}`;
const to_cache = build.concat(files);
const cached = new Set(to_cache);
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(ASSETS).then((cache) => cache.addAll(to_cache)).then(() => {
    self.skipWaiting();
  }));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== ASSETS)
        await caches.delete(key);
    }
    self.clients.claim();
  }));
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith("http"))
    return;
  if (url.hostname === self.location.hostname && url.port !== self.location.port)
    return;
  if (url.host === self.location.host && cached.has(url.pathname)) {
    event.respondWith(caches.match(event.request));
    return;
  }
  if (event.request.cache === "only-if-cached")
    return;
  event.respondWith(caches.open(`offline${timestamp}`).then(async (cache) => {
    try {
      const response = await fetch(event.request);
      cache.put(event.request, response.clone());
      return response;
    } catch (err) {
      const response = await cache.match(event.request);
      if (response)
        return response;
      throw err;
    }
  }));
});
