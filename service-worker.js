self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("ssp-v1").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./app.js",
        "./license.js"
      ]);
    })
  );
});
