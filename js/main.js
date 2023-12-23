//Working on Service workers
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw_cached_pages.js")
      .then((reg) => console.log("Service worker: Registered"))
      .catch((err) => console.log(`Service worker : Error: ${err}`));
  });
}
