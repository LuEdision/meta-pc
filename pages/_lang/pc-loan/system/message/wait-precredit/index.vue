<template>
  <!-- h5 等待信审结果返回 -->
  <div class="sys-message">
    <div class="wait-precredit message-wait">
      <div class="message-wait-main">
        <img
          class="wait-img"
          src="@/assets/img/pre-credit/wait-credit.gif"
          alt="mib"
        />
        <h2 class="wait-title">Tiempo restante</h2>
        <div class="wait-down">
          <custom-countdown
            v-model="resetTime"
            :end-time="downTime"
            @on-end="onEnd"
          >
            <div class="countdown-part-box">
              <div class="part-item h">{{ resetTime.h }}</div>
              <span class="part-item-symbol">:</span>
              <div class="part-item m">{{ resetTime.m }}</div>
              <span class="part-item-symbol">:</span>
              <div class="part-item s">{{ resetTime.s }}</div>
              <span v-if="millisecond" class="part-item-symbol">:</span>
              <div v-if="millisecond" class="part-item s">
                {{ resetTime.ms }}
              </div>
              <span class="part-item-symbol">s</span>
            </div>
          </custom-countdown>
        </div>
        <p class="wait-label">
          Se está calculando su línea de crédíto Espere por favor unos segundos
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { loan } from '@/api/index';
import CustomCountdown from '@/components/pc-loan/CustomCountdown.vue';
const { apiGetPreCredit } = loan;
export default {
  components: {
    CustomCountdown,
  },
  data() {
    return {
      millisecond: true,
      countdownFlag: false,
      timer: null,
      resetTime: {
        h: '00',
        m: '00',
        s: '00',
        ms: '00',
      },
      resData: {},
      countDown: 0,
    };
  },
  computed: {
    ...mapGetters(['loan']),
    preData() {
      return this.loan.preCredit;
    },
    downTime() {
      const o = this.preData;
      const c = o.countdown || 30;

      return Date.now() + c * 1000; // 毫秒
    },
    reqId() {
      const o = this.preData;
      return o.reqId || '';
    },
  },
  mounted() {
    this.getStatus();
  },
  unmounted() {
    clearTimeout(this.timer);
    this.timer = null;
  },
  methods: {
    onEnd() {
      this.countdownFlag = true;
    },
    async getStatus() {
      let bagType = 1;
      if (
        location.origin.indexOf('website.es') > -1 ||
        location.origin.indexOf('website.xcreditech.com') > -1
      ) {
        bagType = 1;
      } else if (
        location.origin.indexOf('websitepro.com') > -1 ||
        location.origin.indexOf('www-test.websitepro.com') > -1
      ) {
        bagType = 2;
      }
      this.countDown += 1;
      try {
        // 默认3s超时 超过超时时候直接timeout 然后重新调用当前接口
        // 直到接口返回正常数据
        // 或者倒计时结束(此时后端会直接返回值)
        const res = await apiGetPreCredit({
          countdownFlag: this.countdownFlag,
          reqId: this.reqId,
          h5Apply: bagType,
        });
        this.resData = res || null;
        this.$store.commit('loan/setPreResult', this.resData);
        if (res && (res.creditAmount || res.productId)) {
          this.$router.push({
            name: `SysLoanPresale___${this.$i18n.locale}`,
          });
        } else if (!res.creditAmount || !res.productId) {
          // clearTimeout(this.timer);
          // this.timer = null;

          const t = setTimeout(() => {
            if (29 === this.countDown) {
              this.countdownFlag = true;
              clearTimeout(this.timer);
              this.timer = null;
            }
            this.getStatus();
          }, 1000);
          this.timer = t;
        } else {
          this.$router.push({
            name: `SysMessagePrecredit___${this.$i18n.locale}`,
          });
        }
      } catch (_err) {
        this.timer = setTimeout(() => {
          if (29 === this.countDown) {
            this.countdownFlag = true;
            clearTimeout(this.timer);
            this.timer = null;
          }
          this.getStatus();
        }, 1000);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
