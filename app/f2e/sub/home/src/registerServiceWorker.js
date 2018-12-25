/* eslint-disable no-console */

import { register } from 'register-service-worker'


function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

if (process.env.NODE_ENV === 'production') {
  register(`/service-worker.js`, {
    async ready (registration) {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      );
    },
    async registered(registration) {
      console.log('Service-worker registered');

      let subscription = registration.pushManager.getSubscription();

      if (!subscription) {
        const response = await fetch('/api/v1/push/vapid/');
        const responseJson = await response.json();
        const vapidPublicKey = responseJson.data.publicKey;
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        });
      }

      const response = await fetch('/api/v1/push/subscription/', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({ subscription })
      });
      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        console.error('subscript error.');
      }
    },
    cached (registration) {
      console.log('Content has been cached for offline use.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
