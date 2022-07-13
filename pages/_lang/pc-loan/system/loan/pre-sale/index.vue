<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <div class="sys-loan-header">
            <p class="header-label">{{ title }}</p>
            <div class="header-amount">
              <el-button
                v-if="!sureLoan"
                type="text"
                icon="el-icon-remove-outline"
                :style="{
                  visibility:
                    localLoanAmount <= productMinApplyAmount
                      ? 'hidden'
                      : 'visible',
                }"
                @click="onCut"
              >
              </el-button>
              <span class="amount">
                {{ formatMoney(localLoanAmount ? localLoanAmount : 0) }}
                <span class="header-unit"> €</span>
              </span>
              <el-button
                v-if="!sureLoan"
                type="text"
                icon="el-icon-circle-plus-outline"
                :style="{
                  visibility:
                    localLoanAmount >= maxAmount ? 'hidden' : 'visible',
                }"
                @click="onAdd"
              >
              </el-button>
            </div>
            <p class="header-date">{{ subTitle }}</p>
          </div>
          <div class="sys-loan-tip">{{ tipText }}</div>
          <div class="sys-loan-main">
            <!-- <div class="main-item-pre">
              <label class="main-item-label">Solicitante</label>
              <div class="main-item-value">
                <p>{{ customer }}</p>
              </div>
            </div> -->

            <div class="main-item-pre">
              <label class="main-item-label">{{ limitDayText }}</label>
              <!-- web端只有一期 直接这样写 -->
              <div class="main-item-value days">
                <p
                  v-for="(item, index) in infoList"
                  :key="item.limitDays"
                  :class="{ active: curIndex === index }"
                  @click="onSelectDay(item, index)"
                >
                  {{ item.totalLimitDays }} Dias
                  <!-- {{ formatLimitDays(index) }} Dias -->
                </p>
              </div>
            </div>

            <div class="main-item-pre">
              <label class="main-item-label">Periodo de préstamo</label>
              <!-- web端只有一期 直接这样写 -->
              <div class="main-item-value">
                <p>{{ totalPeriods }} Cuota</p>
              </div>
            </div>

            <div class="main-item-pre">
              <label class="main-item-label">Cupón</label>
              <!-- web端只有一期 直接这样写 -->
              <div class="main-item-value">
                <p>No disponible</p>
              </div>
            </div>
            <div v-if="false" class="main-item-pre">
              <label class="main-item-label">Importe mensual a pagar</label>
              <div class="main-item-value">
                <p>{{ formatMoney('370.00') }} €</p>
                <nut-icon name="down-arrow"></nut-icon>
              </div>
            </div>
            <!-- 还款分期费用 -->
            <el-collapse v-model="collapseName" accordion class="collapse">
              <el-collapse-item title="" name="plan">
                <template slot="title">
                  <div class="name">{{ planText }}</div>
                  <div class="content">
                    <div class="title-value">
                      <p>
                        {{
                          formatMoney(localRepayAmount ? localRepayAmount : 0)
                        }}
                        €
                      </p>
                    </div>
                    <span class="collapse-img" />
                  </div>
                </template>
                <el-descriptions
                  v-for="item in loanList"
                  :key="item.loanId"
                  class="margin-top"
                  title=""
                  :column="1"
                  size="medium"
                >
                  <el-descriptions-item label="Numero de periodos">
                    Cuota {{ item.paymentIndex }}</el-descriptions-item
                  >
                  <el-descriptions-item label="Importe a pagar"
                    >{{
                      formatMoney(
                        item.totalRepayAmount ? item.totalRepayAmount : 0
                      )
                    }}
                    €</el-descriptions-item
                  >
                  <el-descriptions-item label="Principal"
                    >{{
                      formatMoney(item.applyAmount ? item.applyAmount : 0)
                    }}
                    €</el-descriptions-item
                  >
                  <el-descriptions-item label="Intereses"
                    >{{
                      formatMoney(item.interestAmount ? item.interestAmount : 0)
                    }}
                    €</el-descriptions-item
                  >
                  <!-- 技术服务费 -->
                  <el-descriptions-item label="Cargo por servicios"
                    >{{
                      formatMoney(item.postLoanFee ? item.postLoanFee : 0)
                    }}
                    €</el-descriptions-item
                  >
                  <el-descriptions-item label="Fecha de devolución">{{
                    formatDate(item.dueDate)
                  }}</el-descriptions-item>
                </el-descriptions>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="sys-loan-footer">
            <div class="btn">
              <el-button
                type="primary"
                data-option="web_submit1"
                @click="onSubmit"
                ><span data-option="web_submit1">Siguiente</span></el-button
              >
            </div>
          </div>
        </div>
        <div class="pc-sys-right">
          <pc-mail :mail-info="facebookUrl"></pc-mail>
        </div>
      </div>
    </div>
    <el-dialog
      title="Proceso sencillo para tu préstamo"
      :visible.sync="dialogVisible"
      top="20vh"
      width="25%"
      center
      :show-close="false"
      :before-close="handleClose"
    >
      <div class="user-modify">
        <img :src="yesImg" />Hasta <span>1.000 €</span>
      </div>
      <div class="user-modify">
        <img :src="yesImg" />Solicitud de <span>3 minutos</span>
      </div>
      <div class="user-modify">
        <img :src="yesImg" />Depósito en <span>3 minutos</span>
      </div>
      <div class="user-modify">
        <img :src="yesImg" /><span>Tasa de</span> interés baja
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button data-option="web_credit_result_back" @click="onLeave"
          ><span data-option="web_credit_result_back">{{
            $t('leave')
          }}</span></el-button
        >
        <el-button
          type="primary"
          data-option="web_credit_result_back"
          @click="onStop"
          ><span data-option="web_credit_result_back">{{
            $t('continues')
          }}</span></el-button
        >
      </span>
    </el-dialog>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import { loan, bank } from '@/api/index';
import dayjs from 'dayjs';
import { numFormat } from '@/utils/index.client';
import PcMail from '@/components/pc-loan/mailContainer.vue';
import arrowDown from '@/assets/img/arrow-down.png';
import arrowUp from '@/assets/img/arrow-up.png';
import yesImg from '@/assets/img/gou@2x.png';
const { apiGetPreCredit, apiApplyPreLoan, apiApplyLoan } = loan;
const { apiGetBankList } = bank;
export default {
  components: {
    PcMail,
  },
  data() {
    return {
      collapseName: [], // ['plan'],
      agree: true,
      // resData: {}, // 预授信结果相关数据
      preLoanRes: {}, // 试算结果
      times: 0, // 操作次数
      sureLoan: false, // 先预试算 试算完确认隐藏对应操作按钮
      isMax: false,
      isMin: false,
      arrowDown: arrowDown,
      arrowUp: arrowUp,
      isBack: false,
      yesImg: yesImg,
      isStop: false,
      timer: null,
      dialogVisible: false,
      bankMap: {},
      bankVal: '',
      isCut: false,
      curIndex: 0,
    };
  },
  computed: {
    ...mapGetters(['loan', 'setting', 'login']),
    resData() {
      return this.loan.preResult;
    },
    preData() {
      return this.loan.preCredit;
    },
    localPassed() {
      const o = this.resData;
      const p = this.preData;
      return p.localPassed || o.localPassed;
    },
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    reqId() {
      const o = this.preData;
      return o.reqId || '';
    },
    oneAmount() {
      const o = this.setting.appConfig;
      return o.calLoanAmount || 10;
    },
    localLoanAmount() {
      const o = this.resData;
      const loan = o.creditAmount || 100;
      const local = loan + this.times * this.oneAmount;
      if (local > loan) return loan;
      return local;
    },
    productMinApplyAmount() {
      const o = this.loan.productInfo;
      return o.length && o[0].minApplyAmount;
    },
    maxAmount() {
      const o = this.resData;
      const maxNum = o.creditAmount || 100;
      return maxNum;
    },
    minAmount() {
      return this.oneAmount;
    },
    infoList() {
      const o = this.resData;
      return o.productInfoList || [];
    },
    loanList() {
      const o = this.preLoanRes;
      return o.loanInfoVoList || [];
    },
    customer() {
      const o = this.preLoanRes;
      return o && (o.customerName || '');
    },
    productId() {
      const l = this.infoList;
      return (l.length > 0 && l[0].productId) || this.resData.groupId || null;
    },
    groupId() {
      const l = this.infoList;
      return (l.length > 0 && l[0].groupId) || null;
    },
    limitDays() {
      const l = this.infoList;
      return (l.length > 0 && l[0].limitDays) || '';
    },
    totalPeriods() {
      return this.preLoanRes.periods || 1;
    },
    localRepayAmount() {
      // return this.preLoanRes.everyPeriodRepayAmount || 100;
      return this.loanList
        .map((_) => {
          return {
            totalPaidAmount: _.totalPaidAmount,
            totalRepayAmount: _.totalRepayAmount,
          };
        })
        .reduce((prev, cur) => {
          return (
            Number(cur.totalRepayAmount ?? 0) -
            Number(cur.totalPaidAmount) +
            prev
          );
        }, 0);
    },
    totalInterest() {
      return this.loanList
        .map((_) => _.surplusInterestAmount)
        .reduce((prev, cur) => {
          return prev + cur;
        }, 0);
    },
    title() {
      // return (
      //   (this.sureLoan && this.$t('apply.title1')) || this.$t('apply.title2')
      // );
      return this.$t('apply.title2');
    },
    subTitle() {
      // return (
      //   (this.sureLoan && this.$t('apply.subTitle1')) ||
      //   this.$t('apply.subTitle2')
      // );
      return this.$t('apply.subTitle2');
    },
    tipText() {
      // return (this.sureLoan && this.$t('apply.tip1')) || this.$t('apply.tip2');
      return this.$t('apply.tip2');
    },
    planText() {
      // return (
      //   (this.sureLoan && this.$t('apply.interest1')) || this.$t('apply.plan')
      // );
      return this.$t('apply.plan');
    },
    limitDayText() {
      return this.$t('apply.limitDay2');
      // return (
      //   (this.sureLoan && this.$t('apply.limitDay1')) ||
      //   this.$t('apply.limitDay2')
      // );
    },
    applyAmount() {
      return this.resData.creditAmount || 100;
    },
    accountList() {
      return this.bankMap.account || [];
    },
    bankNo() {
      if (!this.bankVal) return;

      return this.accountList.find((_) => _.accountId === this.bankVal)
        .accountNumber;
    },
    mobile() {
      const o = this.login.loginData;
      return o.mobile || '';
    },
  },
  watch: {
    resData: {
      handler(newVal, oldVal) {
        this.cutAdd();
      },
      deep: true,
      immediate: false,
    },
  },
  created() {
    // this.getPreResult();
    this.dialogVisible = false;
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener(
        'popstate',
        (e) => this.historyCallback(e),
        false
      );
    }
  },
  mounted() {
    this.preApply();
    this.getBank();
    if (this.localLoanAmount >= this.maxAmount) {
      this.isMax = true;
    }
  },
  unmounted() {
    window.removeEventListener(
      'popstate',
      (e) => this.historyCallback(e),
      false
    );
  },
  methods: {
    cutAdd() {
      const o = this.resData;
      const loan = o?.creditAmount || 100;
      const local = loan + this.times * this.oneAmount;
      if (local <= this.minAmount) {
        this.isMin = true;
        return this.oneAmount;
      } else {
        this.isMin = false;
      }
      if (local < this.maxAmount) {
        this.isMax = false;
      } else {
        this.isMax = true;
      }
    },
    onSelectDay(item, index) {
      this.curIndex = index;
    },
    formatLimitDays(ind) {
      const arr = this.infoList.slice(0, ind + 1);
      let sigma = 0;
      for (let item of arr) {
        sigma += item.limitDays;
      }
      return sigma;
    },
    getBank() {
      // 西班牙仅需要传账号 故筛选的是账号列表
      // 以后其他国家需要兼容
      apiGetBankList()
        .then((res) => {
          this.bankMap = res || null;
          this.$store.commit('loan/setBankList', res);
        })
        .finally(() => {
          if (this.accountList.length > 0) {
            this.bankVal = this.accountList[0].accountId;
          }
        });
    },
    applyProxy() {
      apiApplyLoan({
        productId: this.productId,
        applyAmount: this.applyAmount,
        bankAccountNo: this.bankNo,
        accountId: this.bankVal,
        mobile: this.mobile,
      })
        .then((res) => {
          this.$message({
            type: 'error',
            message: this.$t('refuzedApply'),
            duration: 2000,
          });
          this.$router.push({
            name: `SysMessageWaitApply___${this.$i18n.locale}`,
          });
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: this.$t('refuzedApply'),
            duration: 2000,
          });
          if (err.code == 5002) {
            this.$router.push({
              name: `SysMessageWaitApply___${this.$i18n.locale}`,
            });
          }
        })
        .finally(() => {});
    },
    handleClose() {},
    onLeave() {
      this.dialogVisible = false;
      this.isStop = true;
      this.$router.push({
        path: '/sys',
      });
    },
    onStop() {
      this.dialogVisible = false;
      this.isStop = true;
      clearTimeout(this.timer);
      this.timer = null;
      this.$router.go(1);
    },
    historyCallback(event) {
      if (this.$route.path.indexOf('/sys/loan/presale') > -1) {
        this.isBack = true;
        if (this.isStop) {
          this.dialogVisible = false;
          this.isStop = false;
        } else {
          this.dialogVisible = true;
        }
        // this.$confirm(
        //   `<div class="user-modify"><img src="${this.yesImg}" />Hasta <span>1.000 €</span></div>
        //               <div class="user-modify"><img src="${this.yesImg}" />Solicitud de <span>3 minutos</span></div>
        //               <div class="user-modify"><img src="${this.yesImg}" />Depósito en <span>3 minutos</span></div>
        //               <div class="user-modify"><img src="${this.yesImg}" /><span>Tasa de</span> interés baja</div>`,
        //   'Proceso sencillo para tu préstamo',
        //   {
        //     confirmButtonText: this.$t('continues'),
        //     cancelButtonText: this.$t('leave'),
        //     dangerouslyUseHTMLString: true,
        //     showClose: false,
        //   }
        // )
        //   .then((_) => {
        //     this.$router.go(1);
        //     return true;
        //   })
        //   .catch((_) => {
        //     if (_ === 'cancel') {
        //       this.$router.go(-1);
        //     }
        //   });
      }
    },
    formatMoney(val) {
      return numFormat(Number(val), '.');
    },
    formatDate(d) {
      return dayjs(d).format('DD-MM-YYYY');
    },
    // getPreResult() {
    //   // 获取预授信结果
    //   apiGetPreCredit({
    //     countdownFlag: true,
    //     reqId: this.reqId,
    //     h5Apply: '1',
    //   }).then((res) => {
    //     this.resData = res || null;
    //     this.preApply();
    //   });
    // },
    onCut() {
      if (this.localLoanAmount <= this.minAmount) {
        return;
      }
      this.times--;
      this.cutAdd();
      this.preApply();
    },
    onAdd() {
      if (this.localLoanAmount >= this.maxAmount) {
        return;
      }
      this.cutAdd();
      this.times++;
      this.preApply();
    },
    preApply() {
      apiApplyPreLoan({
        productId: this.productId,
        groupId: this.groupId,
        applyAmount: this.localLoanAmount,
      }).then((res) => {
        this.preLoanRes = res || null;
        const amount = res && res.applyAmount ? res.applyAmount : 100;
        if (amount <= this.maxAmount) {
          this.isCut = true;
        } else {
          this.isCut = false;
        }
      });
    },
    onSubmit() {
      // if (this.sureLoan) {
      //   this.router.push({
      //     name: 'SysLoanSure',
      //   });
      //   return;
      // }
      if (this.localPassed) {
        this.$router.push({
          name: `SysLoanSure___${this.$i18n.locale}`,
        });
        this.$store.commit('loan/setPreLoan', this.preLoanRes);
      } else {
        this.applyProxy();
      }
      // this.sureLoan = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
