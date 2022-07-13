<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <div class="sys-loan-header">
            <p class="header-label">Importe a pagar</p>
            <div class="header-amount repay-method">
              <span class="amount">
                {{ formatMoney(localAmount ? localAmount : 0) }}
                <span class="header-unit">€</span>
              </span>
            </div>
            <!-- <p class="header-date">Vencido a {{ dueDate }}</p> -->
          </div>
          <div class="sys-loan-main">
            <div v-if="feeObj.card.hasShow" class="radio-list">
              <div
                :class="{
                  'radio-item-title': true,
                  active: 'transfer' !== repayVal,
                }"
              >
                Pagar con tarjeta bancaria
              </div>
              <div v-if="cardList.length" class="radio-group">
                <div
                  v-for="item in cardList"
                  :key="item.cardId"
                  class="radio-item"
                  :class="{ active: item.cardId === repayVal }"
                  @click="onChoose(item)"
                >
                  <div class="left">
                    <p class="item-name">
                      {{
                        item.cardBank.toLowerCase().indexOf('n/a') > -1
                          ? ''
                          : item.cardBank
                      }}
                      (••••••• {{ item.last4 }})
                    </p>
                    <p class="item-label">
                      Comisión de pago
                      {{
                        formatMoney(
                          feeObj.card.repayFee ? feeObj.card.repayFee : 0
                        )
                      }}€
                    </p>
                  </div>
                  <div class="right">
                    <el-radio v-model="repayVal" :label="item.cardId"
                      ><span></span
                    ></el-radio>
                  </div>
                </div>
              </div>
              <div v-else class="radio-item">
                <div class="left">
                  <p class="item-name">No disponible</p>
                  <p class="item-label">
                    Comisión de pago
                    {{
                      formatMoney(
                        feeObj.card.repayFee ? feeObj.card.repayFee : 0
                      )
                    }}€
                  </p>
                </div>
                <el-radio v-model="repayVal" label="empty"
                  ><span></span>
                </el-radio>
              </div>
            </div>
            <div
              v-if="feeObj.transfer.hasShow && repayType <= 0"
              class="radio-list"
            >
              <div
                :class="{
                  'radio-item-title': true,
                  active: 'transfer' === repayVal,
                }"
              >
                Pagar con transferencia bancaria
              </div>
              <div
                class="radio-item"
                :class="{ active: 'transfer' === repayVal }"
                @click="onChooseTransfer('transfer')"
              >
                <p class="item-label">
                  Comisión de pago
                  {{
                    formatMoney(
                      feeObj.transfer.repayFee ? feeObj.transfer.repayFee : 0
                    )
                  }}€
                </p>
                <el-radio v-model="repayVal" label="transfer"
                  ><span></span
                ></el-radio>
              </div>
            </div>
          </div>
          <div class="footer-add-bankcard">
            <el-button
              type="text"
              icon="el-icon-circle-plus-outline"
              :disabled="disabled"
              :loading="disabled"
              @click="onBindCard"
              >{{ $t('addBankCard') }}</el-button
            >
          </div>
          <div class="sys-loan-footer">
            <div class="btn">
              <el-button
                type="primary"
                :loading="loading"
                :disabled="disabled"
                @click="onSubmit"
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
import { bank, loan } from '@/api/index';
import PcMail from '@/components/pc-loan/mailContainer.vue';
import { numFormat } from '@/utils/index.client';
import dayjs from 'dayjs';
import { mapGetters } from 'vuex';

const {
  apiGetBankList,
  apiGetBankRepay,
  apiGetBankTransfer,
  apiGetPaymentHandlingFee,
  apiBindBank,
} = bank;
const { apiGetLastUnpayLoan, apiSubmitExtendRequest } = loan;

export default {
  components: {
    PcMail,
  },
  data() {
    return {
      loanData: {},
      repayVal: '',
      cardList: [],
      cardAccount: [],
      loading: false,
      disabled: false,
      feeObj: {
        card: {},
        transfer: {},
      },
      routeQuery: this.$route.query,
    };
  },
  computed: {
    ...mapGetters(['loan', 'setting', 'bank', 'login']),
    customerId() {
      return this.login.loginData.customerId;
    },
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    loanList() {
      const o = this.loanData;
      return (o && o.loanInfoVoList) || [];
    },
    dueDate() {
      const o = this.loanData;
      return (o && dayjs(o.dueDate).format('DD-MM-YYYY')) || '';
    },
    teamOfUrl() {
      const o = this.setting.appConfig;
      return o.termUse || '';
    },
    privacyPolicy() {
      const o = this.setting.appConfig;
      return o.privacyPolicy || '';
    },
    totalRepayAmount() {
      return +this.loanData.totalSurplusAmount;
    },
    localAmount() {
      const amount =
        this.$route.params.amount ||
        this.loan.repayAmount ||
        this.totalRepayAmount;
      return amount;
    },
    paymentId() {
      const o = this.loanData;
      return (o && o.paymentId) || '';
    },
    localStatu() {
      const o = this.loanData;
      return (o && o.status) || '';
    },
    payWay() {
      return this.bank.payWay;
    },
    periodDays() {
      const days = this.loan.periodDays;
      return days;
    },
    repayType() {
      const rType = this.loan.repayType;
      return Number(rType);
    },
  },
  created() {
    // if (this.$route.params.amount || this.$route.query.from) {
    //   sessionStorage.setItem('repayMethod', JSON.stringify(this.$route.query));
    // }
    // this.routeQuery = sessionStorage.getItem('repayMethod')
    //   ? JSON.parse(sessionStorage.getItem('repayMethod'))
    //   : {};
  },
  mounted() {
    this.getLastLoan();
    this.getHandlingFee();
    this.getBankList();
    if (this.payWay === 'transfer') {
      this.$router.push({
        path: '/sys/message/wait-pay',
      });
    }
  },

  methods: {
    // jumpToBindCard() {
    //   this.$router.push({
    //     path: '/sys/bank/bind',
    //     query: {
    //       fee:
    //         Number(this.localAmount ?? 0) +
    //         Number(this.feeObj.card.repayFee ?? 0),
    //     },
    //   });
    // },
    formatMoney(val) {
      return numFormat(Number(val), '.');
    },
    getLastLoan() {
      apiGetLastUnpayLoan().then((res) => {
        this.loanData = res || null;
      });
    },
    getBankList() {
      apiGetBankList()
        .then((res) => {
          this.cardList = res.card || [];
          // this.cardAccount = res.account || [];
        })
        .finally(() => {
          const len = this.cardList.length;
          if (len > 0) {
            this.repayVal = this.cardList[0].cardId;
          }

          this.loading = false;
        });
    },
    onChoose(item) {
      this.repayVal = item.cardId;
    },
    onChooseTransfer(str) {
      this.repayVal = str;
    },
    onSubmit() {
      if (!this.repayVal) {
        this.$message({
          type: 'error',
          message: this.$t('selectRepayBank'),
          duration: 2000,
        });
        return;
      }

      if (this.localStatu === 4001) {
        this.$message({
          type: 'success',
          message: this.$t('payOver'),
          duration: 2000,
        });
        setTimeout(() => {
          this.$router.push({ name: `SysIndex___${this.$i18n.locale}` });
        }, 1000);
        return;
      }

      if (this.repayVal === 'transfer') {
        // 转账还款
        this.repayInTransfer();
      } else if (this.repayVal === 'newCard') {
        this.onBindCard();
      } else if (this.repayVal === 'empty') {
        this.$message({
          type: 'error',
          message: this.$t('noBind'),
          duration: 2000,
        });
      } else {
        if (this.repayType && this.repayType > 0) {
          this.repayInCardByExtension();
        } else {
          this.repayInCard();
        }
      }
      sessionStorage.removeItem('fetchNum');
    },
    // addNewCard() {
    //   this.$router.push({
    //     path: '/sys/bank/account',
    //     query: {
    //       fee:
    //         Number(this.localAmount ?? 0) +
    //         Number(this.feeObj.card.repayFee ?? 0),
    //     },
    //   });
    // },
    repayInCard() {
      if (this.loading) return;
      this.loading = true;
      this.disabled = true;

      apiGetBankRepay({
        paymentId: this.paymentId,
        repayAmount: parseFloat(
          (
            Number(this.localAmount ?? 0) +
            Number(this.feeObj.card.repayFee ?? 0)
          ).toFixed(2)
        ),
        cardId: this.repayVal,
      })
        .then((res) => {
          this.$router.push({
            name: `SysMessageWaitPay___${this.$i18n.locale}`,
          });
        })
        .catch((_) => {
          // this.$router.push({
          //   name: `SysMessageWaitPay___${this.$i18n.locale}`,
          // });
        })
        .finally(() => {
          this.loading = false;
          this.disabled = false;
        });
    },
    repayInCardByExtension() {
      if (this.loading) return;
      this.loading = true;
      this.disabled = true;

      apiSubmitExtendRequest({
        paymentId: this.paymentId,
        customerId: this.customerId,
        extendDays: this.periodDays,
        totalExtendAmount:
          Number(this.localAmount ?? 0) +
          Number(this.feeObj.card.repayFee ?? 0),
        cardId: this.repayVal,
        fixedFee: Number(this.feeObj.card.repayFee ?? 0),
      })
        .then((res) => {
          this.$store.commit('loan/setExtensionId', res?.extendId ?? '');
          this.$router.push({
            name: `SysMessageWaitPay___${this.$i18n.locale}`,
            query: {
              extension: '1',
              extendId: res?.extendId ?? '',
            },
          });
        })
        .finally(() => {
          this.loading = false;
          this.disabled = false;
        });
    },
    onBindCard() {
      if (this.disabled) return;
      this.disabled = true;
      this.$store.commit('bank/setOrigin', 'repay');
      apiBindBank({
        scenes: this.routeQuery.from || 'info',
      })
        .then((res) => {
          this.$message({
            type: 'success',
            message: this.$t('soonToBindCard'),
            duration: 2000,
          });
          // if (res.widgetUrl && res.widgetUrl.indexOf('unnax') > -1) {
          // res.widgetUrl &&
          //   this.$router.push({
          //     name: `SysThirdParty___${this.$i18n.locale}`,
          //     query: {
          //       url: window.btoa(res.widgetUrl),
          //     },
          //   });
          window.open(
            `/pc/third-part?url=${window.btoa(res.widgetUrl)}&card=ok`,
            '_blank'
          );
          // } else {
          //   res.widgetUrl && window.open(res.widgetUrl, '_blank');
          // }
        })
        .finally(() => {
          // this.disabled = false;
        });
    },
    repayInTransfer() {
      if (this.loading) return;
      this.loading = true;
      this.disabled = true;
      this.$store.commit('bank/setOrigin', 'repay');
      apiGetBankTransfer({
        paymentId: this.paymentId,
        repayAmount:
          Number(this.localAmount ?? 0) +
          Number(this.feeObj.transfer.repayFee ?? 0),
      })
        .then((res) => {
          this.$message({
            type: 'success',
            message: this.$t('soonToRepayTrans'),
            duration: 2000,
          });
          // if (res.widgetUrl && res.widgetUrl.indexOf('unnax') > -1) {
          // res.widgetUrl &&
          //   this.$router.push({
          //     name: `SysThirdParty___${this.$i18n.locale}`,
          //     query: {
          //       url: window.btoa(res.widgetUrl),
          //     },
          //   });
          window.open(
            `/pc/third-part?url=${window.btoa(res.widgetUrl)}&way=${window.btoa(
              'transfer'
            )}&card=ok`,
            '_blank'
          );
          // } else {
          //   res.widgetUrl && window.open(res.widgetUrl, '_blank');
          // }
        })
        .finally(() => {
          // this.loading = false;
        });
    },
    getHandlingFee() {
      apiGetPaymentHandlingFee()
        .then((_) => {
          _.repayFeeConfigList.forEach((item) => {
            if (item.repayName === 'bank_card') {
              this.feeObj.card = { ...item };
            } else if (item.repayName === 'direct_transfer') {
              this.feeObj.transfer = { ...item };
            }
          });
        })
        .catch((_err) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
