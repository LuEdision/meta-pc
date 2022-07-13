<template>
  <!-- h5 等待信审结果返回 -->
  <div class="sys-message">
    <div class="wait-apply message-wait">
      <div class="message-wait-main">
        <img :src="showMap.icon" alt="mib" />
        <h2>{{ showMap.title }}</h2>
        <p>{{ showMap.note }}</p>
      </div>

      <div class="message-wait-footer">
        <div class="btn">
          <el-button id="ioBlackBox" type="primary" @click="goHome"
            >OK</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { loan, utils } from '@/api/index';
import FailedSvg from '@/assets/img/pre-credit/apply-failed.svg';
import SuccessSvg from '@/assets/img/pre-credit/apply-success.svg';
import WaitSvg from '@/assets/img/pre-credit/apply-waiting.svg';
import { initCredoAppSDK, onTriggerTranction } from '@/utils/index.client';
import { v4 as uuidv4 } from 'uuid';
import { mapGetters } from 'vuex';
const { apiGetLastUnpayLoan, apiGetAppInfo } = loan;
const { apiPushDeviceInfo } = utils;
export default {
  data() {
    return {
      status: '1001',
      proxyCount: 0,
      homeData: {},
      timer: null,
      credoAppService: null,
      subscribeKey: '',
      refNumber: '',
      initObj: null,
    };
  },
  computed: {
    ...mapGetters(['loan', 'login']),
    showMap() {
      return this.getLocalStatus(this.status);
    },
    canApplyNow() {
      const o = this.homeData;
      return (o && o.canApplyNow) || 0;
    },
    credoLabData() {
      const o = this.loan.preResult;
      return (o && o.credoLabData) || {};
    },
    transunionData() {
      const o = this.loan.preResult;
      return (o && o.transunionData) || {};
    },
    credoLabAuth() {
      const o = this.loan.preResult;
      return (o && o.credoLabAuth) || false;
    },
    transunionAuth() {
      const o = this.loan.preResult;
      return (o && o.transunionAuth) || false;
    },
    at_gd() {
      return this.login.at_gd;
    },
  },
  created() {},
  mounted() {
    this.getStatus();
    this.getHomeData();
  },
  unmounted() {
    clearTimeout(this.timer);
    this.timer = null;
  },
  methods: {
    getHomeData() {
      apiGetAppInfo().then((res) => {
        this.homeData = res[0] || null; // 目前至少会有一个产品数据返回
      });
    },
    getLocalStatus(statu) {
      const StatusMap = {
        1001: {
          title: this.$t('loanStatu.waitTitle'),
          note: this.$t('loanStatu.waitNote'),
          icon: WaitSvg,
        },
        1002: {
          title: this.$t('loanStatu.successTitle'),
          note: this.$t('loanStatu.successNote'),
          icon: SuccessSvg,
        },
        1004: {
          title: this.$t('loanStatu.failedTitle'),
          note: this.$t('loanStatu.failedNote'),
          icon: FailedSvg,
        },
        1007: {
          title: this.$t('loanStatu.roBeSignedTitle'),
          note: this.$t('loanStatu.toBeSigned'),
          icon: WaitSvg,
        },
      };

      if (this.canApplyNow === 0) {
        return StatusMap['1004'];
      } else {
        return StatusMap[statu] || StatusMap['1001'];
      }
    },
    getResultCode(code) {
      const ResultMap = {
        '-2': '1004', // 多次放款失败
        '-1': '1004', // 信审失败
        0: '1001', // 新建申请
        1001: '1001', // 信审中
        1002: '1002', // 信审通过
        1004: '1004', // 信审异常
      };

      if (code >= 2000) {
        return '1002';
      }
      return ResultMap[code] || '1001';
    },
    goHome() {
      clearTimeout(this.timer);
      this.timer = null;
      this.$store.commit('loan/setHomeStatus', 'yes');
      this.$router.push({ name: `SysIndex___${this.$i18n.locale}` });
    },
    getStatus() {
      this.status = 1001;
      this.proxyCount++;
      apiGetLastUnpayLoan()
        .then((res) => {
          this.status = this.getResultCode(res.status);
          this.$store.commit('loan/setLastLoan', res || {});
          // if (this.proxyCount < 2) {
          //   sessionStorage.setItem('fetchNum', '1');
          //   onTriggerTranction(res?.applyAmount, res?.paymentId, this.at_gd);
          // }
          if (res.status === 1007) {
            clearTimeout(this.timer);
            this.timer = null;
            setTimeout(() => {
              this.$router.push({
                name: `SysContract___${this.$i18n.locale}`,
              });
            }, 3000);
          } else {
            // 默认请求20次 超过最大次数直接返回app首页
            // 间隔3s请求一次
            // 为返回信审结果才需要重复请求
            // if (this.status === 1001) {
            if (this.proxyCount > 100) {
              this.$message({
                type: 'success',
                message: this.$t('soonJumpHome'),
                duration: 2000,
              });
              clearTimeout(this.timer);
              this.timer = null;
              this.goHome();
            } else {
              this.timer = setTimeout(() => {
                this.getStatus();
              }, 5000);
            }
          }
          // }
        })
        .catch(() => {
          this.$store.commit('loan/setLastLoan', null);
          clearTimeout(this.timer);
          this.timer = null;
          // this.getHomeData();
          this.status = this.getResultCode('-1');
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
