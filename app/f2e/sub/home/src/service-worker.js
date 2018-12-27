console.log(self.__precacheManifest);


self.addEventListener('push', event => {
  const payload = event.data ? event.data.text() : '';

  if (!payload) {
    return;
  }

  let messageObj = null;

  try {
    messageObj = JSON.parse(payload);
  } catch (e) {
    console.error(e);
  }

  if (!messageObj) {
    return;
  }

  event.waitUntil(
    self.registration.showNotification(messageObj.title || 'www.picoluna.com', {
      body: messageObj.message,
    })
  );
});

self.addEventListener('notificationclick', event => {
  console.log('notificationclick');
  event.notification.close();

  event.waitUntil(clients.matchAll({
    type: 'window'
    })
    .then(windowClients => {
      clients.openWindow('/');
    })
  )
});

self.addEventListener('notificationclose', event => {
  console.log('notificationclose');
});
