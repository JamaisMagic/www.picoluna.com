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
