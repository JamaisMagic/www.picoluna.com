importScripts("/sub/home/dist/precache-manifest.8aff0ae89861092da8806684b0348c43.js", "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

console.log(self.__precacheManifest);


self.addEventListener('push', function (event) {
  console.log(event.data);
  const payload = event.data ? event.data.text() : '';
  if (!payload) {
    return;
  }
  event.waitUntil(
    self.registration.showNotification('ServiceWorker received push', {
      body: payload,
    })
      .then(event => {
        console.log(event.type);
      })
  );
});

