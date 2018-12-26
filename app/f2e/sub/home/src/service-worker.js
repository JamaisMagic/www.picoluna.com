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
        console.log(event);
        if (event) {
          console.log(event.type);
        }
      })
  );
});
