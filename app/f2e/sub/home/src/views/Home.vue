<template>
  <div class="page-home">
    <v-btn color="info"
           v-if="permission && permission !== 'granted'"
           @click.native="requestPermission">Subscript notifications
    </v-btn>

    <v-btn color="info"
           v-if="permission === 'granted'"
           @click.native="unsubscription">Unsubscript notifications
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: {},
    data() {
      return {
        permission: ''
      }
    },
    mounted() {
      // document.dispatchEvent(new Event('prerender-event'));
      this.checkPermission();
    },
    methods: {
      checkPermission() {
        if ('Notification' in window) {
          this.permission = window.Notification.permission;
        }
      },
      async requestPermission() {
        if (!('Notification' in window)) {
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
          const response = await fetch('/api/v1/push/vapid/');
          const responseJson = await response.json();
          const vapidPublicKey = responseJson.data.publicKey;
          const convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);

          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
          });
        }

        const response = await fetch('/api/v1/push/subscription/', {
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
          body: JSON.stringify({subscription})
        });
        const responseJson = await response.json();

        if (responseJson.status !== 'success') {
          console.error('subscript error.');
        }
      },
      async unsubscription() {

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
