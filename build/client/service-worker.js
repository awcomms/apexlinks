const timestamp = {
  toString: () => {
    throw new Error("`timestamp` has been removed from $service-worker. Use `version` instead");
  }
};
const build = [
  "/_app/immutable/start-daa80883.js",
  "/_app/immutable/pages/__layout.svelte-404f06bd.js",
  "/_app/immutable/assets/pages/__layout.svelte-e6639c00.css",
  "/_app/immutable/pages/__error.svelte-c507533b.js",
  "/_app/immutable/pages/edit.svelte-b5fa62f7.js",
  "/_app/immutable/assets/pages/edit.svelte-5904f07e.css",
  "/_app/immutable/assets/Tags.svelte_svelte_type_style_lang-45c60080.css",
  "/_app/immutable/pages/event/_id_.svelte-ead9ce9c.js",
  "/_app/immutable/pages/index.svelte-934f3f87.js",
  "/_app/immutable/assets/pages/index.svelte-656e7d85.css",
  "/_app/immutable/pages/login.svelte-e0ce7440.js",
  "/_app/immutable/assets/pages/login.svelte-47af32f6.css",
  "/_app/immutable/pages/t/Txt.svelte-2c5e0469.js",
  "/_app/immutable/assets/Txt-de8fff00.css",
  "/_app/immutable/pages/t/_id_/about.svelte-925499cf.js",
  "/_app/immutable/pages/t/_id_/edit.svelte-f52939d6.js",
  "/_app/immutable/pages/t/_id_/index.svelte-8f965039.js",
  "/_app/immutable/pages/t/index.svelte-c097b41d.js",
  "/_app/immutable/pages/u/_id_/about.svelte-17a2e005.js",
  "/_app/immutable/pages/u/_id_/index.svelte-1d80192b.js",
  "/_app/immutable/chunks/index-e47b4649.js",
  "/_app/immutable/chunks/singletons-d1fb5791.js",
  "/_app/immutable/chunks/HeaderSearch.svelte_svelte_type_style_lang-dee62dc9.js",
  "/_app/immutable/assets/HeaderSearch.svelte_svelte_type_style_lang-56ec7d53.css",
  "/_app/immutable/chunks/index-8107d937.js",
  "/_app/immutable/chunks/socket-359f452a.js",
  "/_app/immutable/chunks/routes-fb6e9fa0.js",
  "/_app/immutable/chunks/stores-4f4e660a.js",
  "/_app/immutable/chunks/navigation-0e6511d1.js",
  "/_app/immutable/chunks/InlineLoading-d1ee122e.js",
  "/_app/immutable/chunks/Loading-1a7be6da.js",
  "/_app/immutable/chunks/Close-b8ee64fe.js",
  "/_app/immutable/chunks/Row-c4df0ce6.js",
  "/_app/immutable/chunks/Column-5e525297.js",
  "/_app/immutable/chunks/Button-bbcf2e94.js",
  "/_app/immutable/chunks/Tags-072a8ed0.js",
  "/_app/immutable/chunks/Input-53fbfba2.js",
  "/_app/immutable/chunks/TextInput-439d1c85.js",
  "/_app/immutable/chunks/Tag-473639f3.js",
  "/_app/immutable/chunks/Link-3fffe52b.js",
  "/_app/immutable/chunks/TxtInput-08c527ea.js",
  "/_app/immutable/chunks/Txt-ea619938.js"
];
const files = [
  "/BingSiteAuth.xml",
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
  "/placeholder.png"
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
