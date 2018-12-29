importScripts("/sub/home/dist/precache-manifest.7db2f7d3196fba7fd96c3f8f2bf320f2.js", "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

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
      icon: '/logo-icon-200x200.png',
      vibrate: [200, 200, 200],
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

