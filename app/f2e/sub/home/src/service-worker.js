console.log(self.__precacheManifest);


self.addEventListener('push', function (event) {
  console.log(event.data);
  const payload = event.data ? event.data.text() : '';
  if (!payload) {
    return;
  }
  event.waitUntil(
    self.registration.showNotification('ServiceWorker received push', {
      actions: {
        action: 'action',
        title: 'actions title',
        // icon: ''
      },
      // badge: '',
      body: payload,
      // icon: '',
      // image: '',
      renotify: false,
      requireInteraction: false,
    })
      .then(event => {
        console.log(event.type);
      })
  );
});
