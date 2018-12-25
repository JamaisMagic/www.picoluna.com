console.log(self.__precacheManifest);


self.addEventListener('push', function (event) {
  event.waitUntil(
    self.registration.showNotification('ServiceWorker received push', {
      body: 'Yes, you do.',
    })
  );
});
