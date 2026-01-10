self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("shooting-pro").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./app.js",
        "./errors.json"
      ]);
    })
  );
});
