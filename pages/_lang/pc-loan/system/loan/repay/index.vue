<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <div class="sys-loan-header">
            <p class="header-label">Importe a pagar</p>
            <div class="header-amount">
              <el-button
                type="text"
                icon="el-icon-remove-outline"
                :style="{ visibility: !isMin ? '' : 'hidden' }"
                @click="onCut"
              >
              </el-button>
              <span class="amount">
                {{ formatMoney(localAmount ? localAmount : 0) }}
                <span class="header-unit"> €</span>
              </span>
              <el-button
                type="text"
                icon="el-icon-circle-plus-outline"
                :style="{ visibility: !isMax ? '' : 'hidden' }"
                @click="onAdd"
              >
              </el-button>
            </div>
            <!-- <p class="header-date">Vencido a {{ dueDate }}</p> -->
          </div>
          <div class="sys-loan-main">
            <div class="main-item">
              <label class="main-item-label">Importe a pagar</label>
              <!-- web端只有一期 直接这样写 -->
              <div class="main-item-value">
                {{ formatMoney(totalRepayAmount ? totalRepayAmount : 0) }}€
              </div>
            </div>
            <!-- 还款分期费用 -->
            <el-collapse v-model="collapseName" accordion>
              <el-collapse-item name="plan">
                <template slot="title">
                  Plan de pago
                  <span class="collapse-img"></span>
                </template>
                <div
                  v-for="item in loanList"
                  :key="item.loanId"
                  class="margin-top list"
                >
                  <div class="list-item">
                    <div class="label">
                      <div class="title">{{ $t('loan.periods') }}</div>
                      <div class="flag">:</div>
                    </div>
                    <div class="content">
                      {{ $t('loan.periods') }} {{ item.paymentIndex }}
                    </div>
                  </div>
                  <div class="list-item">
                    <div class="label">
                      <div class="title">{{ $t('loan.duedate') }}</div>
                      <div class="flag">:</div>
                    </div>
                    <div class="content">
                      <span v-show="item.status === 4001" class="success">{{
                        $t('loan.paidoff')
                      }}</span>
                      <span
                        v-show="item.status !== 4001"
                        :class="'_' + item.status"
                        >{{ formatPayDays(item) }}</span
                      >
                    </div>
                  </div>
                  <div v-show="item.status === 3002" class="list-item">
                    <div class="label">
                      <div class="title">{{ $t('loan.penaltyFeeTitle') }}</div>
                      <div class="flag">:</div>
                    </div>
                    <div class="content">{{ item.surplusPenaltyAmount }}€</div>
                  </div>
                  <div
                    v-show="
                      item.status === 3002 &&
                      item.hasPenaltyFree &&
                      !formatInterestWaiver(item)
                    "
                    class="list-item"
                  >
                    <div class="label">
                      <div class="title">
                        <el-tooltip
                          class="item"
                          effect="dark"
                          :content="`Si paga en los ${item.noPenaltyDays} primeros días
                    desde la fecha de vencimiento, cancelaremos esta
                    comisión por demora.`"
                          placement="bottom-start"
                        >
                          <span
                            ><img class="help" :src="tipImg" alt="Mib" />{{
                              $t('loan.interestWaiver')
                            }}</span
                          ></el-tooltip
                        >
                      </div>
                      <div class="flag">:</div>
                    </div>
                    <div class="content">
                      {{
                        item.realSurplusPenaltyAmount
                          ? '-' + item.realSurplusPenaltyAmount
                          : 0
                      }}€
                    </div>
                  </div>
                  <div class="list-item">
                    <div class="label">
                      <div class="title">{{ $t('loan.repayAmount') }}</div>
                      <div class="flag">:</div>
                    </div>
                    <div class="content">
                      {{
                        formatMoney(
                          item.currentPeriodTotalSurplusAmount
                            ? item.currentPeriodTotalSurplusAmount
                            : 0
                        )
                      }}€
                    </div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>

            <div class="main-item">
              <label class="main-item-label">Cupón</label>
              <div class="main-item-value">No disponible</div>
            </div>

            <div class="main-item total">
              <label class="main-item-label">Cuota total a pagar</label>
              <div class="main-item-value">
                {{ formatMoney(localAmount ? localAmount : 0) }} €
              </div>
            </div>
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
                  >
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="btn">
              <el-button type="primary" :disabled="!canSubmit" @click="onSubmit"
                >Pagar ya</el-button
              >
              <el-button
                v-show="showExtensionPeriod !== 3"
                type="primary"
                plain
                :disabled="!canSubmit || !(showExtensionPeriod === 1)"
                @click="onShowExtensionPeriod"
                >Pedir una Prórroga</el-button
              >
            </div>

            <div class="desc">
              <p class="footer-desc">
                Si no pagara el préstamo en tiempo, se lo cobraría los intereses
                penalizados según los T&C. También requieren que los clientes se
                encarguen de todos los costs relacionados con el préstamo. Se
                aplicarian el costo de SMS y datos.
              </p>
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

const { apiGetLastUnpayLoan, apiCalExtendRequest } = loan;
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
      reachMin: false,
    };
  },
  computed: {
    ...mapGetters(['loan', 'setting', 'login']),
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    loanList() {
      const o = this.loanData;
      return (o && o.loanInfoVoList) || [];
    },
    totalRepayAmount() {
      return +(this.loanData.totalSurplusAmount ?? 0);
    },
    dueDate() {
      // const l = this.loanList
      // return l.length && dayjs(l[0].dueDate).format('DD-MM-YY') || ''
      const o = this.loanData;
      return (o && dayjs(o.dueDate).format('DD-MM-YYYY')) || '';
    },
    oneAmount() {
      const o = this.setting.appConfig;
      return o.calLoanAmount || 10;
    },
    localAmount() {
      // 当前要还的金额
      const loan = this.totalRepayAmount; // 当前最高金额
      const one = this.oneAmount;
      const local = loan + this.times * one;
      const oneMax = Math.abs(this.times);
      const num = parseInt(loan / one);
      if (local > loan) {
        return loan;
      }
      if (loan < one) {
        return local;
      }
      if (local <= one) {
        return one;
      }

      if (this.reachMin) {
        return one * (num + this.times + 1);
      }

      return local ?? 0;
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
    showExtensionPeriod() {
      const o = this.loanData;
      return o?.extendShowStatus ?? 3;
    },
    customerId() {
      return this.login.loginData.customerId;
    },
    paymentId() {
      return this.loan.lastLoan.paymentId;
    },
  },
  watch: {
    totalRepayAmount: {
      handler(newVal, oldVal) {
        this.cutAdd();
      },
      deep: true,
      immediate: false,
    },
  },
  created() {
    // this.getLastLoan();
  },
  mounted() {
    this.getLastLoan();
  },
  methods: {
    cutAdd() {
      const loan = this.totalRepayAmount; // 当前最高金额
      const one = this.oneAmount;
      const local = loan + this.times * one;
      if (local >= loan) {
        this.isMax = true;
        this.reachMin = false;
      } else {
        this.isMax = false;
      }
      if (local <= one) {
        this.isMin = true;
        this.reachMin = true;
      } else {
        this.isMin = false;
      }
    },
    formatInterestWaiver(item) {
      const dueDays = Number(item.overdueDays ?? 0);
      const noPenaltyDays = Number(item.noPenaltyDays ?? 0);
      return dueDays - noPenaltyDays > 0 ? true : false;
    },
    formatMoney(val) {
      return numFormat(Number(val), '.');
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
    onCut() {
      // 后期需要做个防抖函数
      if (this.localAmount <= this.oneAmount) return;
      this.times--;
      this.cutAdd();
    },
    onAdd() {
      if (this.localAmount >= this.totalRepayAmount) return;
      this.times++;
      this.cutAdd();
    },
    getLastLoan() {
      apiGetLastUnpayLoan().then((res) => {
        this.loanData = res || null;
      });
    },
    formatPayDays(o) {
      if (o?.status === 3002) return `${o?.overdueDays} días de retraso`;

      return o?.dueDate;
    },
    onSubmit() {
      this.$store.commit('loan/setRepayAmount', this.localAmount);
      this.$store.commit('loan/setRepayByExtension', 0);
      this.$store.commit('loan/setExtensionDays', 0);
      this.$router.push({
        name: `SysLoanRepayMethod___${this.$i18n.locale}`,
        params: {
          amount: this.localAmount, // 跳转到选择还款方式
        },
      });
    },
    onShowExtensionPeriod() {
      apiCalExtendRequest({
        customerId: this.customerId,
        paymentId: this.paymentId,
        extendDays: null,
      })
        .then((res) => {
          this.$router.push({
            name: `SysLoanExtensionPeriod___${this.$i18n.locale}`,
          });
        })
        .catch((err) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
