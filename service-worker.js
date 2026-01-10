self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("sc-cache").then(cache =>
      cache.addAll(["./","index.html","style.css","app.js","lang.json"])
    )
  );
});
