importScripts("/sub/home/dist/precache-manifest.914733c8edd4d5561b886a3161d73566.js", "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

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

