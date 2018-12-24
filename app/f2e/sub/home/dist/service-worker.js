importScripts("/sub/home/dist/precache-manifest.1b31e35a12d8d1ac72ad0622e774e93f.js", "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

console.log(self.__precacheManifest);

function getEndpoint() {
  return self.registration.pushManager.getSubscription()
    .then(function (subscription) {
      if (subscription) {
        return subscription.endpoint;
      }

      return null;
    });
}

self.addEventListener('push', function (event) {
  event.waitUntil(
    getEndpoint()
      .then(function (payload) {
        return self.registration.showNotification('ServiceWorker received push', {
          body: payload,
        });
      })
  );
});

