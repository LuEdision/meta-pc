<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <div class="sys-loan-header">
            <p class="header-label">Importe a pagar</p>
            <div class="header-amount">
              <span class="amount">
                {{ formatMoney(localAmount) }}
                <span class="header-unit"> €</span>
              </span>
            </div>
            <!-- <p class="header-date">Vencido a {{ dueDate }}</p> -->
          </div>
          <div class="sys-loan-main">
            <div class="main-item-pre">
              <label class="main-item-label">{{ extensionPeriodText }}</label>
              <!-- web端只有一期 直接这样写 -->
              <div class="main-item-value days">
                <p
                  v-for="(item, index) in periodList"
                  :key="item"
                  :class="{ active: curIndex === index }"
                  @click="onSelectDay(item, index)"
                >
                  {{ item }} Dias
                  <!-- {{ formatLimitDays(index) }} Dias -->
                </p>
              </div>
            </div>
            <div class="main-item">
              <label class="main-item-label">Comisión por demora</label>
              <!-- web端只有一期 直接这样写 -->
              <div class="main-item-value">
                {{ formatMoney(extendPenaltyAmount) }}€
              </div>
            </div>
            <div class="main-item">
              <label class="main-item-label">Interés</label>
              <!-- web端只有一期 直接这样写 -->
              <div class="main-item-value">
                {{ formatMoney(extendInterestAmount) }}€
              </div>
            </div>
            <div class="main-item">
              <label class="main-item-label">Cargo por servicios</label>
              <!-- web端只有一期 直接这样写 -->
              <div class="main-item-value">
                {{
                  formatMoney(
                    parseFloat(extendFeeAmount) +
                      parseFloat(extendTechnicalFeeAmount)
                  )
                }}€
              </div>
            </div>
            <!-- 还款分期费用 -->
            <el-collapse v-model="collapseName" accordion>
              <el-collapse-item name="plan">
                <template slot="title">
                  Plan de pago
                  <span class="collapse-img"></span>
                </template>
                <el-descriptions
                  v-for="item in loanList"
                  :key="item.loanId"
                  class="margin-top"
                  :column="1"
                  size="medium"
                >
                  <el-descriptions-item :label="$t('loan.periods')"
                    >{{ $t('loan.periods') }}
                    {{ item.paymentIndex }}</el-descriptions-item
                  >
                  <el-descriptions-item :label="$t('loan.duedate')">
                    <div class="content">
                      <span>{{ formatPayDays(item) }}</span>
                      <span class="extra">{{ formatPayDays(item, true) }}</span>
                    </div>
                  </el-descriptions-item>
                  <!-- <el-descriptions-item :label="$t('loan.penaltyInterest')"
                    >{{ initPenaltyFree(item) }}€</el-descriptions-item
                  > -->
                  <el-descriptions-item :label="$t('loan.repayAmount')"
                    >{{
                      formatMoney(
                        item.currentPeriodTotalSurplusAmount
                          ? item.currentPeriodTotalSurplusAmount
                          : 0
                      )
                    }}€</el-descriptions-item
                  >
                </el-descriptions>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="sys-loan-footer">
            <div class="footer-wrapper">
              <el-checkbox-group v-model="agree" @change="onAgreeChange">
                <!-- 使用条款&隐私协议 必选 -->
                <el-checkbox
                  class="footer-chk"
                  label="Policy"
                  size="medium"
                  @change="onCheckChange('Policy')"
                  >He leído, entiendo y acepto (debe consentir el este apartado)
                  el Aviso Legal, los
                  <a :href="teamOfUrl" target="_blank">Términos</a> la
                  <a :href="privacyPolicy" target="_blank"
                    >Política de Privacidad</a
                  ></el-checkbox
                >
              </el-checkbox-group>
            </div>
            <div class="btn">
              <el-button type="primary" :disabled="!canSubmit" @click="onSubmit"
                >Pagar ya</el-button
              >
            </div>
          </div>
        </div>
        <div class="pc-sys-right">
          <pc-mail :mail-info="facebookUrl"></pc-mail>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { loan } from '@/api/index';
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import { numFormat } from '@/utils/index.client';
import PcMail from '@/components/pc-loan/mailContainer.vue';
import arrowDown from '@/assets/img/arrow-down.png';
import arrowUp from '@/assets/img/arrow-up.png';
import tipImg from '@/assets/img/icon/tip.png';

const { apiCalExtendRequest } = loan;
export default {
  components: {
    PcMail,
  },
  data() {
    return {
      isTooltip: false,
      isActive: false,
      arrowDown: arrowDown,
      arrowUp: arrowUp,
      loanData: {},
      collapseName: [],
      times: 0,
      canOpr: true,
      agree: [],
      localAgree: '',
      isMax: false,
      isMin: false,
      tipImg: tipImg,
      curIndex: 0,
      curDays: 7,
    };
  },
  computed: {
    ...mapGetters(['loan', 'setting', 'login']),
    extensionPeriodText() {
      return this.$t('apply.extensionPeriod');
    },
    customerId() {
      return this.login.loginData.customerId;
    },
    paymentId() {
      return this.loan.lastLoan.paymentId;
    },
    periodList() {
      const o = this.loanData;
      const dayList = o?.availableExtendDays ?? [];
      return dayList;
    },
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    loanList() {
      const o = this.loanData;
      return (o && o.loanInfoVoList) || [];
    },
    extendInterestAmount() {
      const o = this.loanData;
      return o?.extendInterestAmount ?? 0;
    },
    extendPenaltyAmount() {
      const o = this.loanData;
      return o?.extendPenaltyAmount ?? 0;
    },
    extendFeeAmount() {
      const o = this.loanData;
      return o?.extendFeeAmount ?? 0;
    },
    extendTechnicalFeeAmount() {
      const o = this.loanData;
      return o?.extendTechnicalFeeAmount ?? 0;
    },
    localAmount() {
      // 当前要还的金额
      const o = this.loanData;
      const totalAmount = o?.totalAmount ?? 0;
      return parseFloat(totalAmount);
    },
    teamOfUrl() {
      const o = this.setting.appConfig;
      return o.termUse || '';
    },
    privacyPolicy() {
      const o = this.setting.appConfig;
      return o.privacyPolicy || '';
    },
    canSubmit() {
      const l = this.agree;
      return l.includes('Policy');
    },
  },
  created() {},
  mounted() {
    this.getLastLoan();
  },
  methods: {
    initPenaltyFree(item, hasFee = false) {
      let penaltyFree;
      if (!hasFee) {
        const surplusPenaltyAmount = item.surplusPenaltyAmount
          ? Number(item.surplusPenaltyAmount)
          : 0;
        penaltyFree =
          item.hasPenaltyFree && !this.formatInterestWaiver(item)
            ? this.formatMoney(surplusPenaltyAmount - surplusPenaltyAmount)
            : this.formatMoney(surplusPenaltyAmount);
      } else {
        const hasFeeList = this.loanList.filter((it) => {
          return it.hasPenaltyFree === 1 && !this.formatInterestWaiver(it);
        });
        const totalFee = hasFeeList.reduce((pre, cur) => {
          const surplusPenaltyAmount = cur.surplusPenaltyAmount
            ? Number(cur.surplusPenaltyAmount)
            : 0;
          return pre + surplusPenaltyAmount;
        }, 0);
        penaltyFree = this.formatMoney(Math.abs(totalFee - Number(item ?? 0)));
      }
      return penaltyFree;
    },
    formatInterestWaiver(item) {
      const dueDays = Number(item.overdueDays ?? 0);
      const noPenaltyDays = Number(item.noPenaltyDays ?? 0);
      return dueDays - noPenaltyDays > 0 ? true : false;
    },
    onSelectDay(item, index) {
      this.curIndex = index;
      this.curDays = Number(item ?? 7);
      this.getLastLoan(this.curDays);
    },
    formatMoney(val) {
      return numFormat(val ? Number(val).toFixed(2) : 0, '.');
    },
    onAgreeChange() {
      // 不同意INE协议 不能注册
    },
    onCheckChange(v) {
      this.$nextTick(() => {
        this.localAgree = v;
        if (!this.agree.includes(v)) {
          this.acceptShow = true;
        }
      });
    },
    getLastLoan(day = null) {
      apiCalExtendRequest({
        customerId: this.customerId,
        paymentId: this.paymentId,
        extendDays: day,
      }).then((res) => {
        this.loanData = res || null;
      });
    },
    formatUmdDate(d) {
      if (!d) return '';

      const o = (d + '').slice(0, 10).split(/[-/]/g);
      if (o.length >= 3) {
        let date = '';
        if (o[0].length > 2) {
          date = o[0] + o[1] + o[2];
        } else {
          date = o[2] + o[1] + o[0];
        }
        return date;
      }
      return '-';
    },
    formatPayDays(o, isExtension = false) {
      const retDate = this.formatUmdDate(o?.dueDate);
      const afterDate = this.formatUmdDate(o?.afterExtendDueDate);
      if (!retDate) return '-';
      if (retDate === '-') return '-';
      if (isExtension) {
        return dayjs(afterDate).format('DD-MM-YYYY');
      }
      return dayjs(retDate).format('DD-MM-YYYY');
    },
    onSubmit() {
      this.$store.commit('loan/setRepayAmount', this.localAmount);
      this.$store.commit('loan/setExtensionDays', this.curDays);
      this.$store.commit('loan/setRepayByExtension', 1);
      this.$router.push({
        name: `SysLoanRepayMethod___${this.$i18n.locale}`,
        params: {
          amount: this.localAmount, // 跳转到选择还款方式
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
