<template>
  <div id="thirdParty" class="third-party">
    <div class="third-wrapper" style="background-color: #fff">
      <iframe
        ref="iframe"
        frameborder="0"
        :style="{ width: frameWidth, height: frameHeight }"
        @load="loading = false"
      ></iframe>
    </div>
    <div class="btn">
      <el-button type="primary" :disabled="disabled" @click="goHome"
        >Siguiente</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      frameHeight: '100%',
      frameWidth: '100%',
      thirdUrl: '',
      disabled: true,
      way: this.$route.query.way,
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['bank']),
    fromOrigin() {
      return this.bank.fromOrigin;
    },
  },
  created() {},
  mounted() {
    let that = this;
    const { url } = this.$route.query;
    // if (this.$route.query.url) {
    //   sessionStorage.setItem('thirdUrl', url);
    // }
    const card = this.$route.query.card;
    if (card) {
      this.disabled = false;
    }
    const third = sessionStorage.getItem('thirdUrl');
    this.thirdUrl = window.atob((third || url) ?? '');
    sessionStorage.setItem('hisLen', history.length);
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener(
        'popstate',
        (e) => this.historyCallback(e),
        false
      );
    }
    this.$refs.iframe.contentWindow.location.replace(this.thirdUrl);

    window.addEventListener('message', this.postMsg, false);
    window.addEventListener('beforeunload', this.beforeunloadHandler);
    // window.onbeforeunload = this.beforeunloadHandler;
    window.addEventListener('unload', this.unloadHandler);
  },
  unmounted() {
    window.removeEventListener('message', this.postMsg, false);
    window.removeEventListener('beforeunload', this.beforeunloadHandler);
    window.removeEventListener('unload', this.unloadHandler);
    window.removeEventListener(
      'popstate',
      (e) => this.historyCallback(e),
      false
    );
    this.$store.commit('bank/setOpenBank', 0);
    this.$store.commit('bank/setBankCard', 0);
  },
  beforeDestroy() {
    this.$store.commit('bank/setOpenBank', 0);
    this.$store.commit('bank/setBankCard', 0);
  },
  destroyed() {
    window.removeEventListener('message', this.postMsg, false);
    window.removeEventListener('beforeunload', this.beforeunloadHandler);
    window.removeEventListener('unload', this.unloadHandler);
    window.removeEventListener(
      'popstate',
      (e) => this.historyCallback(e),
      false
    );
    this.$store.commit('bank/setOpenBank', 0);
    this.$store.commit('bank/setBankCard', 0);
  },
  methods: {
    beforeunloadHandler(e) {
      e = e || window.event;
      this.$store.commit('bank/setOpenBank', 0);
      this.$store.commit('bank/setBankCard', 0);
      if (e) {
        e.returnValue = 'Quieres cerrar';
      }
      return 'Quieres cerrar';
    },
    unloadHandler(e) {
      this.goHome();
    },
    postMsg(e) {
      if (
        typeof e.data === 'string' &&
        (e.data === 'unnax:payment:done' || e.data === 'unnax:aggregation:done')
      ) {
        this.disabled = false;
        const way = this.way;
        if (way) {
          this.$store.commit('bank/setPayWay', 'transfer');
        }
      }
    },
    goHome() {
      this.$store.commit('bank/setOpenBank', 0);
      this.$store.commit('bank/setBankCard', 0);
      if (this.fromOrigin === 'account') {
        // this.$router.push({ name: `SysBankAccount___${this.$i18n.locale}` });
        window.opener.location.reload();
        window.close();
      } else {
        window.opener.location.reload();
        // this.$router.push({
        //   name: `SysLoanRepayMethod___${this.$i18n.locale}`,
        // });
        window.close();
      }
    },
    historyCallback(event) {
      const cacheHisLen = sessionStorage.getItem('hisLen');
      const hisLength = history.length;
      this.$router.go(Number(cacheHisLen ?? 0) - (hisLength ?? 0));
    },
  },
};
</script>
<style lang="scss" scoped>
.third-party {
  height: 100%;
  overflow: auto;
  .third-wrapper {
    height: 90%;
  }
  .btn {
    text-align: center;
    padding-bottom: 25px;
    .el-button {
      height: 68px;
      width: 650px;
      font-size: 24px;
      &.is-disabled {
        background: #c9c9c9;
        color: #ffffff;
        border: 1px solid #c9c9c9;
      }
    }
  }
}
</style>
