<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <div class="sys-loan-header">
            <p class="header-label">Monto a recibir</p>
            <div class="header-amount">
              <!-- <el-button
                type="text"
                @click="onCut"
                icon="el-icon-remove-outline"
                v-if="!sureLoan"
                :style="{ visibility: !isMin ? '' : 'hidden' }"
              >
              </el-button> -->
              <span class="amount">
                {{ formatMoney(applyAmount ? applyAmount : 0) }}
                <span class="header-unit">€</span>
              </span>
              <!-- <el-button
                type="text"
                icon="el-icon-circle-plus-outline"
                @click="onAdd"
                v-if="!sureLoan"
                :style="{ visibility: !isMax ? '' : 'hidden' }"
              >
              </el-button> -->
            </div>
            <p class="header-date">Vencido a {{ dueDate }}</p>
          </div>
          <!-- <div class="sys-loan-tip">{{ tipText }}</div> -->
          <div class="sys-loan-main">
            <div class="main-item">
              <label class="main-item-label">Solicitante</label>
              <!-- web端只有一期 直接这样写 -->
              <div class="main-item-value">
                <p>{{ userName }}</p>
              </div>
            </div>

            <div class="main-item">
              <label class="main-item-label">Duración del préstamo</label>
              <!-- web端只有一期 直接这样写 -->
              <div class="main-item-value">
                <p>{{ totalDays }} Dias</p>
              </div>
            </div>

            <div class="main-item">
              <label class="main-item-label">Periodo de préstamo</label>
              <!-- web端只有一期 直接这样写 -->
              <div class="main-item-value">
                <p>{{ periods }} Cuota</p>
              </div>
            </div>

            <div class="main-item">
              <label class="main-item-label">Cupón</label>
              <!-- web端只有一期 直接这样写 -->
              <div class="main-item-value">No disponible</div>
            </div>
            <el-collapse v-model="collapseName" accordion>
              <el-collapse-item title="" name="bank">
                <template slot="title">
                  <span class="name">Su cuenta bancaria</span>
                  <span class="title-value">
                    {{ bankNo }}
                  </span>
                  <span class="collapse-single-img" />
                </template>
                <el-radio-group v-model="bankVal">
                  <el-radio
                    v-for="item in accountList"
                    :key="item.accountId"
                    :label="item.accountId"
                  >
                    {{ item.accountNumber }}
                  </el-radio>
                </el-radio-group>
              </el-collapse-item>
              <el-collapse-item title="" name="pay">
                <template slot="title">
                  <span class="name">Importe total a pagar</span>
                  <div class="content">
                    <div class="title-value">
                      <p>{{ formatMoney(listAmount ? listAmount : 0) }} €</p>
                    </div>
                    <span class="collapse-img" />
                  </div>
                  <!-- <span class="title-value">
                    {{ formatMoney(listAmount ? listAmount : 0) }} €
                  </span>
                  <span class="collapse-img" /> -->
                </template>
                <el-descriptions
                  v-for="item in loanComputeData"
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
                  <el-descriptions-item label="Cargo por servicios"
                    >{{
                      formatMoney(item.postLoanFee ? item.postLoanFee : 0)
                    }}
                    €</el-descriptions-item
                  >
                  <el-descriptions-item label="Vencimiento próxima cuota">{{
                    formatDate(item.dueDate)
                  }}</el-descriptions-item>
                </el-descriptions>
              </el-collapse-item>
            </el-collapse>
            <!-- 还款分期费用 -->
          </div>
          <div class="sys-loan-footer">
            <div class="footer-wrapper">
              <!-- <el-checkbox-group v-model="agree" @change="onAgreeChange"> -->
              <!-- 使用条款&隐私协议 必选 -->
              <el-checkbox
                v-model="agree"
                class="footer-chk"
                :true-label="1"
                :false-label="0"
                size="medium"
                >He leído, entiendo y acepto (debe consentir el este apartado)
                el Aviso Legal, los
                <a :href="teamOfUrl" target="_blank">Términos</a> la
                <a :href="privacyPolicy" target="_blank"
                  >Política de Privacidad</a
                ></el-checkbox
              >
              <!-- </el-checkbox-group> -->
            </div>
            <div class="btn">
              <el-button
                id="ioBlackBox"
                type="primary"
                :disabled="canSubmit"
                data-option="web_submit2"
                @click="onSubmit"
                ><span data-option="web_submit2">Siguiente</span></el-button
              >
            </div>
            <div class="desc">
              <p class="footer-desc">
                Si no pagara en el plazo estipulado, se le cobrarán intereses de
                demora conforme a lo establecido en las Condiciones Generales
                del contrato, así como los gastos por gestion de impagado
              </p>
            </div>
          </div>
        </div>
        <div class="pc-sys-right">
          <mati-button
            id="MatiHome"
            class="m-mati"
            :clientId="matiClientKey"
            :flowId="matiFlowKey"
            color="#438CFF"
            :metadata="matiMeta"
            data-option="web_start_mati"
          />
          <pc-mail :mail-info="facebookUrl"></pc-mail>
        </div>
      </div>
    </div>
    <!-- <el-dialog
      :visible.sync="showLoanAgree"
      width="60%"
      top="10vh"
      :append-to-body="false"
      custom-class="setting-dialog"
      :show-close="false"
      lock-scroll
      :before-close="handleClose"
    >
      <div slot="title" class="setting-dialog-title">Acuerdo de préstamo</div>
      <loan-agree
        ref="LoanRef"
        :bank-name="bankName"
        :account-list="accountList"
        :bank-val="bankVal"
      ></loan-agree>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="sureApply"
          :disabled="!canGoClick"
          :loading="uploadLoading"
          >He leido y confirmado ({{ timeout }}S)</el-button
        >
      </span>
    </el-dialog> -->
    <div
      id="complete_mati"
      style="display: none"
      data-option="web_complete_mati"
    ></div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import { bank, loan, utils } from '@/api/index';
// import { get } from 'js-cookie';
import {
  debounce,
  initCredoAppSDK,
  numFormat,
  sendTransunion,
} from '@/utils/index.client';
import { v4 as uuidv4 } from 'uuid';
import PcMail from '@/components/pc-loan/mailContainer.vue';
import arrowDown from '@/assets/img/arrow-down.png';
import arrowUp from '@/assets/img/arrow-up.png';
import singleArrow from '@/assets/img/singleArrow.png';

const { apiGetBankList } = bank;
const { apiApplyLoan, apiGetHasMati } = loan;
// const { apiUploadSignature } = user;
const { apiPushDeviceInfo } = utils;

export default {
  components: {
    PcMail,
  },
  data() {
    return {
      showLoanAgree: false,
      formData: {},
      collapseName: [],
      bankMap: {},
      bankVal: '',
      agree: 0,
      timeout: 5,
      uploadLoading: false,
      debounceTimer: null,
      arrowDown: arrowDown,
      arrowUp: arrowUp,
      singleArrow: singleArrow,
      preCreditData: {},
      credoAppService: null,
      subscribeKey: '',
      refNumber: '',
      initObj: null,
    };
  },
  computed: {
    ...mapGetters(['loan', 'setting', 'login']),
    custId() {
      const o = this.login.loginData;
      return (o && o.customerId) || '';
    },
    matiReqId() {
      const o = this.preCreditData;
      return o.reqId || '';
    },
    matiMeta() {
      return JSON.stringify({
        fixedLanguage: 'es',
        custId: this.custId,
        reqId: this.matiReqId,
      });
    },

    matiClientKey() {
      const o = this.preCreditData;
      return (o && o.matiClientId) || '';
    },
    matiFlowKey() {
      const o = this.preCreditData;
      return (o && o.matiFlowId) || '';
    },
    preData() {
      return this.loan.preLoan;
    },
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    applyAmount() {
      return this.preData.applyAmount || 100;
    },
    infoList() {
      return this.preData.loanInfoVoList || [];
    },
    productId() {
      const l = this.infoList;
      return (l.length && l[0].productId) || '';
    },
    dueDate() {
      const l = this.infoList;
      return (l.length && dayjs(l[0].dueDate).format('DD-MM-YYYY')) || '';
    },
    userName() {
      return this.preData.customerName || '';
    },
    periods() {
      return this.preData.periods || '';
    },
    listAmount() {
      return this.infoList
        .map((_) => _.totalRepayAmount)
        .reduce((prev, cur) => {
          return prev + cur;
        }, 0);
    },
    accountList() {
      return this.bankMap.account || [];
    },
    bankNo() {
      if (!this.bankVal) return;

      return this.accountList.find((_) => _.accountId === this.bankVal)
        .accountNumber;
    },
    teamOfUrl() {
      const o = this.setting.appConfig;
      return o.termUse || '';
    },
    privacyPolicy() {
      const o = this.setting.appConfig;
      return o.privacyPolicy || '';
    },
    mobile() {
      const o = this.login.loginData;
      return o.mobile || '';
    },
    canGoClick() {
      return this.timeout < 1;
    },
    bankName() {
      if (!this.bankVal) return '-';

      const o = this.accountList.find((_) => _.accountId === this.bankVal);
      return (o && o.bankName) || '-';
    },
    canSubmit() {
      return !this.agree;
    },
    loanComputeData() {
      return this.preData.loanInfoVoList ?? [];
    },
    totalDays() {
      return this.preData.totalLimitDays ?? 0;
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
  created() {
    // https://www.npmjs.com/package/html-to-pdfmake
    // this.addJs('/dll-lib/pdfmake.min.js');
    // this.addJs('/dll-lib/vfs_fonts.js');
    // this.addJs('/dll-lib/html-to-pdfmake-2.3.6.js');
  },
  mounted() {
    this.getBank();
  },
  methods: {
    initMati() {
      let that = this;
      const matiBtn = document.getElementById('MatiHome');

      // 可以手动调用mati 生成一个iframe
      matiBtn.click();
      // 验证成功 跳到首页
      // setup callbacks
      matiBtn.addEventListener('mati:loaded', ({ detail }) => {});
      matiBtn.addEventListener('mati:userFinishedSdk', () => {
        // that.getMatiReuslt();
        // this.$router.push({ name: 'SysLoanPresale' });
        const ev_normal = new Event('click', {
          bubbles: true,
          cancelable: true,
          composed: true,
        });

        const ele_normal = document.querySelector('#complete_mati');
        ele_normal && ele_normal.dispatchEvent(ev_normal);

        if (this.transunionAuth) {
          this.subscribeKey =
            (this.transunionData && this.transunionData.subscribeKey) ??
            '1073402';
          const bb = sendTransunion(this.subscribeKey);
          if (bb.blackbox) {
            apiPushDeviceInfo({ blackbox: bb.blackbox })
              .then((_) => {})
              .catch((_err) => {});
          }
        }
        if (this.credoLabAuth) {
          this.initObj = this.initCollection(this.credoLabData);
          this.refNumber =
            (this.credoLabData && this.credoLabData.credoLabReferenceNumber) ??
            uuidv4();

          this.initObj &&
            this.initObj.then((_) => {
              this.credoAppService &&
                this.collectData(this.credoAppService, this.refNumber);
            });
        }
        // this.$router.push({
        //   name: `SysContract___${this.$i18n.locale}`,
        // });
      });
      matiBtn.addEventListener('mati:exitedSdk', ({ detail }) => {});
    },
    getMatiReuslt() {
      apiGetHasMati({
        custId: this.custId,
      }).then((_) => {
        this.preCreditData = _ ? _ : {};
        if (_.needed) {
          this.$nextTick(() => {
            this.initMati();
          });
          return;
        } else {
          if (this.transunionAuth) {
            this.subscribeKey =
              (this.transunionData && this.transunionData.subscribeKey) ??
              '1073402';
            const bb = sendTransunion(this.subscribeKey);
            if (bb.blackbox) {
              apiPushDeviceInfo({ blackbox: bb.blackbox })
                .then((_) => {})
                .catch((_err) => {});
            }
          }
          if (this.credoLabAuth) {
            this.initObj = this.initCollection(this.credoLabData);
            this.refNumber =
              (this.credoLabData &&
                this.credoLabData.credoLabReferenceNumber) ??
              uuidv4();

            this.initObj &&
              this.initObj.then((_) => {
                this.credoAppService &&
                  this.collectData(this.credoAppService, this.refNumber);
              });
          }
          this.sureApply();
        }
        // else {
        //   this.$router.push({
        //     name: `SysContract___${this.$i18n.locale}`,
        //   });
        // }
      });
    },
    formatMoney(val) {
      return numFormat(Number(val), '.');
    },
    handleClose(done) {
      done && done();
    },
    formatDate: (d) => {
      return dayjs(d).format('DD-MM-YYYY');
    },
    addJs(url) {
      var script = document.createElement('script');
      script.type = 'application/javascript';
      script.src = url;
      document.head.appendChild(script);
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
    onSubmit() {
      if (!this.bankVal) {
        this.$message({
          type: 'error',
          message: this.$t('selectBank'),
          duration: 2000,
        });
        return;
      }

      if (!this.agree) {
        this.$message({
          type: 'error',
          message: this.$t('requiredPolicy'),
          duration: 2000,
        });
        return;
      }
      this.$store.commit('loan/setAccountId', this.bankVal);
      // this.commit('loan/setApplyData', {}); // 当前需要显示在合同的参数
      // this.showLoanAgree = true;
      // this.onDown();
      this.getMatiReuslt();
    },
    onDown() {
      this.timeout = 5;
      const T = setInterval(() => {
        this.timeout--;
        if (this.timeout <= 0) {
          clearInterval(T);
          // this.sureApply();
        }
      }, 1000);
    },
    applyProxy() {
      apiApplyLoan({
        productId: this.productId,
        applyAmount: this.applyAmount,
        bankAccountNo: this.bankNo,
        accountId: this.bankVal,
        mobile: this.mobile,
        atGd: this.at_gd,
      })
        .then((res) => {
          // eslint-disable-next-line no-undef
          fbq('track', 'SubmitApplication');
          this.$router.push({
            name: `SysMessageWaitApply___${this.$i18n.locale}`,
          });
        })
        .catch((err) => {
          if (err.code == 5002) {
            this.$router.push({
              name: `SysMessageWaitApply___${this.$i18n.locale}`,
            });
          } else {
            this.showLoanAgree = false;
          }
        })
        .finally(() => {});
    },
    sureApply() {
      debounce(this, this.applyProxy);
    },
    initCollection(res) {
      return new Promise((resolve, reject) => {
        try {
          const credoAppService = initCredoAppSDK(
            (this.credoLabData && this.credoLabData.credoLabReferenceNumber) ??
              uuidv4(),
            (this.credoLabData && this.credoLabData.credoLabUrl) ??
              'https://scoring-demo.credolab.com',
            (this.credoLabData && this.credoLabData.credoLabAuthKey) ??
              'f3be55af-65ab-4d4e-ae55-1b7e6774e823'
          );
          this.credoAppService = credoAppService;
          resolve(true);
        } catch (e) {
          reject(false);
        }
      });
    },
    collectData(credoAppService, referenceNumber) {
      credoAppService.stopTrackingAndCompleteAsync(referenceNumber).then(
        () => {
          console.log('Dataset has been completed');
        },
        (e) => console.log('Dataset state: ', e)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
