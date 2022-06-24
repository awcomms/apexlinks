const timestamp = {
  toString: () => {
    throw new Error("`timestamp` has been removed from $service-worker. Use `version` instead");
  }
};
const build = [
  "/_app/immutable/start-e4ba7f1a.js",
  "/_app/immutable/pages/__layout.svelte-66ce5e02.js",
  "/_app/immutable/assets/pages/__layout.svelte-e6639c00.css",
  "/_app/immutable/pages/__error.svelte-702d4a45.js",
  "/_app/immutable/pages/audio.svelte-a84eb9a3.js",
  "/_app/immutable/pages/edit.svelte-55b9355e.js",
  "/_app/immutable/assets/pages/edit.svelte-5904f07e.css",
  "/_app/immutable/assets/Tags.svelte_svelte_type_style_lang-45c60080.css",
  "/_app/immutable/pages/event/_id_.svelte-5e0390fa.js",
  "/_app/immutable/pages/index.svelte-3c3cb2bf.js",
  "/_app/immutable/assets/pages/index.svelte-656e7d85.css",
  "/_app/immutable/pages/login.svelte-560b89d1.js",
  "/_app/immutable/assets/pages/login.svelte-47af32f6.css",
  "/_app/immutable/pages/t/_id_/about.svelte-2c296064.js",
  "/_app/immutable/pages/t/_id_/edit.svelte-401ff77d.js",
  "/_app/immutable/pages/t/_id_/index.svelte-5c0744b0.js",
  "/_app/immutable/pages/t/index.svelte-fa33eaef.js",
  "/_app/immutable/pages/u/_id_/about.svelte-9d65ed30.js",
  "/_app/immutable/pages/u/_id_/index.svelte-3b6eb22a.js",
  "/_app/immutable/chunks/index-3c306420.js",
  "/_app/immutable/chunks/index-b8508cdc.js",
  "/_app/immutable/chunks/singletons-d1fb5791.js",
  "/_app/immutable/chunks/HeaderSearch.svelte_svelte_type_style_lang-47ee749e.js",
  "/_app/immutable/assets/HeaderSearch.svelte_svelte_type_style_lang-56ec7d53.css",
  "/_app/immutable/chunks/index-7392e856.js",
  "/_app/immutable/chunks/socket-359f452a.js",
  "/_app/immutable/chunks/routes-fb6e9fa0.js",
  "/_app/immutable/chunks/stores-60fbd2b2.js",
  "/_app/immutable/chunks/navigation-0e6511d1.js",
  "/_app/immutable/chunks/InlineLoading-b83e13ec.js",
  "/_app/immutable/chunks/Loading-b4bca80f.js",
  "/_app/immutable/chunks/Close-7302402c.js",
  "/_app/immutable/chunks/Row-ee11b4a3.js",
  "/_app/immutable/chunks/Column-0c866349.js",
  "/_app/immutable/chunks/Button-c662ee71.js",
  "/_app/immutable/chunks/Tags-ad6072fd.js",
  "/_app/immutable/chunks/Input-4178a5d7.js",
  "/_app/immutable/chunks/TextInput-78434c7c.js",
  "/_app/immutable/chunks/Tag-136bef5b.js",
  "/_app/immutable/chunks/Link-ebc57634.js",
  "/_app/immutable/chunks/Txt-584d1737.js",
  "/_app/immutable/assets/Txt-0ab02f0f.css"
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
