<template>
  <div class="page-home">
    <v-btn color="info"
           v-if="(permission && permission !== 'granted') || haveSubscription === false"
           @click.native="requestPermission">Subscript notifications
    </v-btn>

    <v-btn color="info"
           v-if="permission === 'granted' && haveSubscription === true"
           @click.native="unsubscribe">Unsubscribe notifications
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: {},
    data() {
      return {
        permission: '',
        haveSubscription: null,
      }
    },
    mounted() {
      // document.dispatchEvent(new Event('prerender-event'));
      this.checkPermission();
      this.checkSubscription();
    },
    methods: {
      checkPermission() {
        if ('Notification' in window) {
          this.permission = window.Notification.permission;
        }
      },
      async checkSubscription() {
        if (!('serviceWorker' in navigator)) {
          return;
        }
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        this.haveSubscription = !!subscription;
      },
      async requestPermission() {
        if (!('Notification' in window && 'serviceWorker' in navigator)) {
          return;
        }

        const permission = await window.Notification.requestPermission();
        this.permission = permission;
        console.log(`Permission: ${permission}`); // granted, denied, default

        if (permission !== 'granted') {
          return;
        }

        const registration = await navigator.serviceWorker.ready;

        let subscription = await registration.pushManager.getSubscription();

        if (!subscription || !subscription.endpoint) {
          const response = await fetch('/api/v1/web_push/vapid/');
          const responseJson = await response.json();
          const vapidPublicKey = responseJson.data.publicKey;
          const convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);

          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
          });
        }

        const response = await fetch('/api/v1/web_push/subscription/', {
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
          body: JSON.stringify({subscription})
        });
        const responseJson = await response.json();

        if (responseJson.status !== 'success') {
          console.error('subscribe error.');
        }
      },
      async unsubscribe() {
        if (!('serviceWorker' in navigator)) {
          return;
        }
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (!subscription) {
          return;
        }

        const result = await subscription.unsubscribe();
        if (!result) {
          console.log('Failed');
          return;
        }

        const response = await fetch('/api/v1/web_push/subscription/', {
          headers: {'Content-Type': 'application/json'},
          method: 'DELETE',
          body: JSON.stringify({subscription})
        });

        const responseJson = await response.json();

        if (responseJson.status !== 'success') {
          console.error('unsubscribe error.');
        }
      },
      urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/\-/g, '+')
          .replace(/_/g, '/')
        ;
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
      }
    },
  }
</script>

<style lang="scss">
  @import "../assets/style/util";

  .page-home {
    .welcome-box {
      text-align: center;
      padding: px2rem(100px);
    }
  }
</style>
