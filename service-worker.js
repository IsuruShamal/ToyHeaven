const CACHE_NAME = "toy-haven-v1";

self.addEventListener("install", function(event) {
    console.log("Toy Haven service worker installed");
});

self.addEventListener("activate", function(event) {
    console.log("Toy Haven service worker activated");
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
    );
});