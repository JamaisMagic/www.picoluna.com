console.log(self.__precacheManifest);


self.addEventListener('push', function (event) {
  console.log(event);
  event.waitUntil(
    self.registration.showNotification('ServiceWorker received push', {
      body: 'Yes, you do.',
    })
  );
});
