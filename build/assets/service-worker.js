const s=["/_app/start-bd930f80.js","/_app/assets/start-a8cd1609.css","/_app/pages/__layout.svelte-1d2ca06e.js","/_app/assets/pages/__layout.svelte-2a4f3834.css","/_app/pages/__error.svelte-51dc1224.js","/_app/pages/index.svelte-7d40f515.js","/_app/assets/pages/index.svelte-bb513ade.css","/_app/pages/reset_password.svelte-ef68909d.js","/_app/assets/pages/reset_password.svelte-97730e8d.css","/_app/pages/how_it_works.svelte-74ad7564.js","/_app/pages/item_search.svelte-178e8286.js","/_app/assets/pages/item_search.svelte-51613b35.css","/_app/pages/edit_room/[id].svelte-da8cbeed.js","/_app/pages/add_item.svelte-3d2f1f40.js","/_app/pages/add_room.svelte-8bbd4a0a.js","/_app/pages/my_rooms.svelte-71a7677d.js","/_app/assets/pages/my_rooms.svelte-1d96f927.css","/_app/pages/event/[id].svelte-3b4499fe.js","/_app/pages/items/[id].svelte-b9f081d2.js","/_app/pages/login.svelte-ab909725.js","/_app/assets/pages/login.svelte-a31fa76a.css","/_app/pages/rooms/[id].svelte-5450f0ea.js","/_app/pages/rooms.svelte-41fe6b11.js","/_app/assets/pages/rooms.svelte-d551c727.css","/_app/pages/beee.svelte-e800e70a.js","/_app/pages/edit/[id].svelte-b655d108.js","/_app/pages/edit.svelte-2d261070.js","/_app/pages/item/[id].svelte-ef7ea59e.js","/_app/assets/pages/item/[id].svelte-b5a45775.css","/_app/pages/room/[id].svelte-5f91a3e5.js","/_app/assets/pages/room/[id].svelte-a26af528.css","/_app/pages/[username].svelte-7127594a.js","/_app/chunks/vendor-c4839857.js","/_app/assets/vendor-1405fc18.css","/_app/chunks/singletons-bb9012b7.js","/_app/chunks/api-5c0c9630.js","/_app/chunks/post-5b27026c.js","/_app/chunks/navigation-20968cc5.js","/_app/chunks/stores-d34fad73.js","/_app/chunks/stores-7d091ba3.js","/_app/chunks/Tag-87cdacdd.js","/_app/chunks/Input-7298b594.js","/_app/chunks/ResetSuccess-1316c623.js","/_app/chunks/Fields-899c614d.js","/_app/chunks/initialCaps-68f7c1e1.js","/_app/chunks/Image-b1d9aafa.js","/_app/chunks/parseMarkdown-5e4b929c.js","/_app/chunks/checkEmail-33bd547c.js","/_app/chunks/abslink-3768d0d8.js"].concat(["/apexlinks-144.png","/apexlinks-192.png","/apexlinks-512.png","/apple-touch-icon-1024x1024.png","/apple-touch-icon-120x120.png","/apple-touch-icon-152x152.png","/apple-touch-icon-167x167.png","/apple-touch-icon-180x180.png","/favicon.ico","/junegull.ttf","/manifest.webmanifest","/placeholder.png","/robots.txt"]),e=new Set(s);self.addEventListener("install",(e=>{e.waitUntil(caches.open("cache1633538352001").then((e=>e.addAll(s))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(s=>{s.waitUntil(caches.keys().then((async s=>{for(const e of s)"cache1633538352001"!==e&&await caches.delete(e);self.clients.claim()})))})),self.addEventListener("fetch",(s=>{if("GET"!==s.request.method||s.request.headers.has("range"))return;const a=new URL(s.request.url);a.protocol.startsWith("http")&&(a.hostname===self.location.hostname&&a.port!==self.location.port||(a.host===self.location.host&&e.has(a.pathname)?s.respondWith(caches.match(s.request)):"only-if-cached"!==s.request.cache&&s.respondWith(caches.open("offline1633538352001").then((async e=>{try{const a=await fetch(s.request);return e.put(s.request,a.clone()),a}catch(a){const p=await e.match(s.request);if(p)return p;throw a}})))))}));
