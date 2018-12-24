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
