<template>
  <nut-row class="g-header" :class="headClass">
    <nut-icon v-if="!hideBack" name="down-arrow" @click="onBack"></nut-icon>

    <p>{{ title }}</p>
  </nut-row>
</template>
<script>
export default {
  data() {
    return {
      rlen: 0,
    };
  },
  computed: {
    hideBack() {
      const o = this.$route.meta;
      return (o && o.hideBack) || false;
    },
    title() {
      return this.$route.meta.title || ' ';
    },
    headClass() {
      return this.$route.name || '';
    },
  },
  mounted() {
    this.rlen = history.length;
  },
  methods: {
    onBack() {
      const hisLen = this.$store.getters.bank.historyRecord ?? history.length;
      if (
        this.route.meta.customEvent &&
        typeof this.$route.meta.customEvent === 'function'
      ) {
        const customEvent = this.$route.meta.customEvent;
        customEvent()
          .then((_) => {})
          .catch((_err) => {
            this.router.push({
              path: '/sys',
            });
          });
      } else {
        if (
          this.$route.meta.customEvent &&
          typeof this.route.meta.customEvent === 'string'
        ) {
          let len = hisLen - history.length - 1;
          this.$router.go(len);
          return;
        }
        if (this.$route.meta.redirect) {
          this.$router.push({
            path: this.$route.meta.redirect,
          });
        } else {
          this.$router.back();
        }
      }
    },
  },
};
</script>
<style lang="scss" scope>
.g-header {
  padding: 16px;
  box-sizing: border-box;
  position: relative;
  color: #111;
  overflow: hidden;
  box-shadow: 0px 1px 0px 0px rgba(102, 102, 102, 0.12);

  .nut-icon-down-arrow {
    transform: rotate(90deg);
    position: absolute;
    left: 16px;
    top: 20px;
  }
  &.UserMy {
    box-shadow: none;
    color: #fff;
    background-image: url(@/assets/img/main-header.png);
    background-repeat: no-repeat;
    background-size: 100%;
  }
  &.SysIndex {
    display: none;
  }
  p {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
  }
}
</style>
