importScripts("/sub/home/dist/precache-manifest.4cd50645602decb9f1dd41161df3e82f.js", "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

console.log(self.__precacheManifest);


self.addEventListener('push', function (event) {
  event.waitUntil(
    self.registration.showNotification('ServiceWorker received push', {
      body: 'Yes, you do.',
    })
  );
});

