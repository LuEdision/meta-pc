<template>
  <!-- h5 等待信审结果返回 -->
  <div class="sys-message">
    <div class="wait-apply message-wait">
      <div class="message-wait-main">
        <img :src="bindSuccessImg" alt="mib" />
        <h2>{{ $t('bindSuccessTitle') }}</h2>
        <p v-html="$t('bindSuccessContent')"></p>
      </div>

      <div class="message-wait-footer">
        <div class="btn">
          <el-button type="primary" @click="goHome">Siguiente</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Cookies from 'js-cookie';
import bindSuccessImg from '@/assets/img/pre-credit/bindSuccess.png';

export default {
  data() {
    return {
      timer: null,
      result: this.$route.query.result,
      bindSuccessImg: bindSuccessImg,
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
    this.$nextTick(() => {
      this.init();
    });
    if (
      this.fromOrigin === 'repay' &&
      window.location.href.indexOf('/repay') < 0
    ) {
      window.location.href = `${window.location.href}/repay`;
    }
    window.addEventListener('unload', () => {
      that.$store.commit('bank/setOpenBank', 0);
      that.$store.commit('bank/setBankCard', 0);
      window.opener.location.reload();
    });
  },
  unmounted() {
    clearTimeout(this.timer);
    this.timer = null;
    this.$store.commit('bank/setOpenBank', 0);
    this.$store.commit('bank/setBankCard', 0);
  },
  destroyed() {
    this.$store.commit('bank/setOpenBank', 0);
    this.$store.commit('bank/setBankCard', 0);
  },
  methods: {
    goHome() {
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
    init() {
      if (window.android) {
        const info = window.android.getRequestHeaders();
        const parseInfo = info ? JSON.parse(info) : {};
        Cookies.set(
          'loan_app_token',
          parseInfo.authorization ? parseInfo.authorization : ''
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
