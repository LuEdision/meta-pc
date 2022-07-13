<template>
  <section class="sys-user">
    <router-view></router-view>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      formData: {},
      routeQuery: this.$route.query,
    };
  },

  computed: {
    ...mapGetters(['setting']),
    appData() {
      return this.setting.appConfig || null;
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
