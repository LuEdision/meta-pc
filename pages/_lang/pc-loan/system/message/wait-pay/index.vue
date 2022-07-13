<template>
  <!-- h5 等待信审结果返回 -->
  <div class="sys-message">
    <div class="wait-pay message-wait">
      <div class="message-wait-main">
        <img :src="mapResult.img" alt="mib" />
        <h2>{{ mapResult.title }}</h2>
        <p>{{ mapResult.content }}</p>
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
import { loan } from '@/api/index';
import repaying from '@/assets/img/pre-credit/waitting-repay.svg';
import repaySuccess from '@/assets/img/pre-credit/repay-success.svg';
import repayFailure from '@/assets/img/pre-credit/repay-fail.svg';
const { apiGetPayResult, apiGetExtendRequestStatus } = loan;
export default {
  data() {
    return {
      timer: null,
      status: '3',
      countDown: 0,
    };
  },
  computed: {
    ...mapGetters(['loan', 'login']),
    mapResult() {
      const keyValue = {
        3: {
          img: repaying,
          title: 'Aplicando su pago',
          content: 'Tu pago está en fase de proceso.',
        },
        1: {
          img: repaySuccess,
          title: 'Pago exitoso',
          content: '¡Enhorabuena! Tu pago se realizó correctamente.',
        },
        2: {
          img: repayFailure,
          title: 'Reembolso fallido',
          content:
            'Siento informarle que su pago ha fallado, por favor inténtelo de nuevo.',
        },
      };
      return keyValue[this.status];
    },
    extension() {
      return this.$route.query.extension;
    },
    customerId() {
      return this.login.loginData.customerId;
    },
    extendId() {
      return this.$route.query.extendId || this.loan.extendId;
    },
  },
  mounted() {
    if (this.extension) {
      this.getExtendRequestStatus();
    } else {
      // getPaymentResult()
    }
  },
  unmounted() {
    clearTimeout(this.timer);
    this.timer = null;
  },
  destroyed() {
    clearTimeout(this.timer);
    this.timer = null;
  },
  methods: {
    async getExtendRequestStatus() {
      this.countDown++;
      apiGetExtendRequestStatus({
        customerId: this.customerId,
        extendId: this.extendId,
      })
        .then((res) => {
          if (res?.extendStatus === '3') {
            this.status = res.extendStatus;
          } else if (res?.extendStatus === '2') {
            this.status = res.extendStatus;
            clearTimeout(this.timer);
            this.timer = null;
            return;
          } else if (res?.extendStatus === '1') {
            this.status = res.extendStatus;
            clearTimeout(this.timer);
            this.timer = null;
            return;
          }
          const t = setTimeout(async () => {
            if (100 <= this.countDown) {
              clearTimeout(this.timer);
              this.timer = null;
            }
            await this.getExtendRequestStatus();
          }, 2000);
          this.timer = t;
        })
        .catch((err) => {
          this.status = '2';
          clearTimeout(this.timer);
          this.timer = null;
        });
    },
    async getPaymentResult() {
      this.countDown++;
      apiGetPayResult()
        .then((res) => {
          if (res?.status === 0) {
            this.status = res.status;
          } else if (res?.status === 1) {
            this.status = res.status;
            clearTimeout(this.timer);
            this.timer = null;
            return;
          } else if (res?.status === 2) {
            this.status = res.status;
          }
          const t = setTimeout(async () => {
            if (100 <= this.countDown) {
              clearTimeout(this.timer);
              this.timer = null;
            }
            await this.getPaymentResult();
          }, 2000);
          this.timer = t;
        })
        .catch((err) => {
          this.status = 2;
          clearTimeout(this.timer);
          this.timer = null;
        });
    },
    goHome() {
      this.$store.commit('loan/setHomeStatus', 'yes');
      this.$router.push({ name: `SysIndex___${this.$i18n.locale}` });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
