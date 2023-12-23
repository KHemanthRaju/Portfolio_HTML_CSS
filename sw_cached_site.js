const cacheName = "v2";

//call Install Event
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
});

//Call Activate Event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  //Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Call Fetch Event
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        //Return response if we can
        // Make copy/clone of response
        const resClone = res.clone();
        //Open Cache
        caches.open(cacheName).then((cache) => {
          //Store resource in Cache
          console.log(e.request + " Request");
          console.log(resClone + " Cloning object");
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
