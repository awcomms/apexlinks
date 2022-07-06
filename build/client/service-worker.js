const build = [
  "/_app/immutable/start-5cb1499b.js",
  "/_app/immutable/pages/__layout.svelte-83e2515e.js",
  "/_app/immutable/assets/pages/__layout.svelte-e6639c00.css",
  "/_app/immutable/pages/__error.svelte-936864a6.js",
  "/_app/immutable/pages/edit.svelte-fac520b3.js",
  "/_app/immutable/assets/pages/edit.svelte-5904f07e.css",
  "/_app/immutable/pages/index.svelte-6800380d.js",
  "/_app/immutable/assets/pages/index.svelte-656e7d85.css",
  "/_app/immutable/pages/login.svelte-85557c0f.js",
  "/_app/immutable/assets/pages/login.svelte-47af32f6.css",
  "/_app/immutable/pages/t/_id_/edit.svelte-ffa6f9ad.js",
  "/_app/immutable/pages/t/_id_/index.svelte-e110a28e.js",
  "/_app/immutable/pages/t/index.svelte-f11c8e64.js",
  "/_app/immutable/pages/u/_id_/index.svelte-ee143a8f.js",
  "/_app/immutable/pages/u/_id_/txt.svelte-a8a8ef1c.js",
  "/_app/immutable/chunks/index-b9b9b215.js",
  "/_app/immutable/chunks/singletons-d1fb5791.js",
  "/_app/immutable/chunks/HeaderSearch.svelte_svelte_type_style_lang-82fabd9a.js",
  "/_app/immutable/assets/HeaderSearch.svelte_svelte_type_style_lang-56ec7d53.css",
  "/_app/immutable/chunks/navigation-13fd7038.js",
  "/_app/immutable/chunks/routes-0c4bb859.js",
  "/_app/immutable/chunks/index-c3dc478b.js",
  "/_app/immutable/chunks/InlineLoading-02b70c83.js",
  "/_app/immutable/chunks/Loading-7ca0c792.js",
  "/_app/immutable/chunks/Link-240d34e2.js",
  "/_app/immutable/chunks/Column-07265bfb.js",
  "/_app/immutable/chunks/Button-0d5a8952.js",
  "/_app/immutable/chunks/Tags-e6ea5e5b.js",
  "/_app/immutable/assets/Tags-3883add5.css",
  "/_app/immutable/chunks/Input-05856e6e.js",
  "/_app/immutable/chunks/TextInput-29d93107.js",
  "/_app/immutable/chunks/ButtonSet-106e358c.js",
  "/_app/immutable/chunks/Modal-66ba6b09.js",
  "/_app/immutable/chunks/Delete-9f1b3a6b.js",
  "/_app/immutable/assets/Delete-91691a67.css",
  "/_app/immutable/chunks/Txt-1882e7e9.js"
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
const version = "1657125732657";
const ASSETS = `cache${version}`;
const to_cache = build.concat(files);
const cached = new Set(to_cache);
let notifications = 0;
let ids = [];
self.addEventListener("notificationclick", (ev) => {
  ev.notification.close();
  ev.waitUntil(self.clients.matchAll({ type: "window" })).then((clients) => {
    for (let client of clients) {
      if (client.url == "/" && "focus" in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow("/rooms");
    }
    notifications = 0;
    ids = [];
  });
});
self.addEventListener("push", (ev) => {
  ev.waitUntil(self.clients.matchAll({ type: "window" }).then(async (clients) => {
    let id = ev.data.json().id;
    if (!ids.includes(id))
      ids.push(id);
    for (let client of clients) {
      if (client.focused) {
        return;
      }
    }
    let image = `${self.origin}/x369-144.png`;
    let options = {
      badge: image,
      icon: image
    };
    notifications++;
    let title = `${notifications} ${notifications > 1 ? "New messages" : "New message"}`;
    self.registration.showNotification(title, options);
  }));
});
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
  event.respondWith(caches.open(`offline${version}`).then(async (cache) => {
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
