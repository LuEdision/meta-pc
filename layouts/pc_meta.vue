<template>
  <div id="app" class="pc-meta-layout">
    <!-- <span v-if="loading" class="m-loading" style="font-size: 24px"
      >Cargando <span class="animate">...</span></span
    > -->
    <nuxt class="pc-content-area" />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    isHome() {
      return false;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.loading = false;
    });
    window.gtag('config', this.$GAID);
  },
};
</script>
