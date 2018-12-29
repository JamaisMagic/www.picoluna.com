<template>
  <div class="page-home">
    <v-btn color="info"
           v-if="permission !== 'granted'"
           @click.native="requestPermission">Allow notification</v-btn>
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
        if ('Notification' in window) {
          const permission = await window.Notification.requestPermission();
          this.permission = permission;
          console.log(`Permission: ${permission}`); // granted, denied, default
        }
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
