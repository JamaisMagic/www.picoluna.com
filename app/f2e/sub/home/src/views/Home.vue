<template>
  <div class="page-home">
    <div class="welcome-box">
      Welcome.
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
  mounted() {
      // document.dispatchEvent(new Event('prerender-event'));
  }
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