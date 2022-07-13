<template>
  <section
    v-loading="loading"
    :class="['sys-contract', completed ? 'sys-completed' : '']"
  >
    <iframe ref="iframe" src="" frameborder="0"></iframe>
    <!-- <div v-show="completed" class="completed">
      <i class="el-icon-success"></i>
      <p>Ha completado la firma electrónica</p>
    </div> -->
    <div v-show="completed" class="sys-message">
      <div class="wait-apply message-wait">
        <div class="message-wait-main">
          <img :src="SuccessSvg" alt="mib" />
          <h2>{{ $t('loanStatu.successTitle') }}</h2>
          <p v-html="$t('loanStatu.successNote')"></p>
        </div>

        <div class="message-wait-footer">
          <div v-show="isShowBtn" class="btn">
            <el-button
              type="primary"
              :class="{ 'is-disabled': canSubmit }"
              @click="sureApply"
              ><span>He leido y confirmado</span></el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div
      id="start_mati"
      style="display: none"
      data-option="web_start_sign"
    ></div>
    <div
      id="complete_sign"
      style="display: none"
      data-option="web_complete_sign"
    ></div>
  </section>
</template>

<script>
import { loan } from '@/api/index';
import { debounce } from '@/utils/index.client';
import { mapGetters } from 'vuex';
import SuccessSvg from '@/assets/img/pre-credit/apply-success.svg';
const { apiApplyLoan, apiGetESignature, apiSubmitESignature } = loan;

export default {
  data() {
    return {
      frameHeight: '100%',
      frameWidth: '100%',
      eSignatureData: {},
      canSubmit: true,
      completed: false,
      loading: true,
      signatureId: '',
      documentId: '',
      isShowBtn: true,
      SuccessSvg: SuccessSvg,
    };
  },
  computed: {
    ...mapGetters(['loan', 'login']),
    preData() {
      return this.loan.preLoan;
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
    groupId() {
      const l = this.infoList;
      return (l.length > 0 && l[0].groupId) || null;
    },
    bankMap() {
      return this.loan.bankList;
    },
    accountList() {
      return this.bankMap.account || [];
    },
    bankVal() {
      return this.loan.accountId;
    },
    bankNo() {
      if (!this.bankVal) return;

      return this.accountList.find((_) => _.accountId === this.bankVal)
        .accountNumber;
    },
    bankName() {
      if (!this.bankVal) return '-';

      const o = this.accountList.find((_) => _.accountId === this.bankVal);
      return (o && o.bankName) || '-';
    },
    mobile() {
      const o = this.login.loginData;
      return o.mobile || '';
    },
  },
  created() {
    if (process.client || process.browser) {
      this.$store.commit('bank/setHistoryRecord', history.length);
    }
  },
  async mounted() {
    window.addEventListener('message', this.postMsg, false);
    await this.handleESignature();
  },
  unmounted() {
    window.removeEventListener('message', this.postMsg, false);
  },
  destroyed() {
    window.removeEventListener('message', this.postMsg, false);
  },
  methods: {
    async handleESignature() {
      try {
        const res = await apiGetESignature();
        this.eSignatureData = res || null;

        this.$refs.iframe.contentWindow.location.replace(
          this.eSignatureData.url
        );
        const ev_normal = new Event('click', {
          bubbles: true,
          cancelable: true,
          composed: true,
        });

        const ele_normal = document.querySelector('#start_mati');
        ele_normal && ele_normal.dispatchEvent(ev_normal);
      } finally {
        this.loading = false;
      }
    },
    // applyProxy() {
    //   apiApplyLoan({
    //     productId: this.productId,
    //     applyAmount: this.applyAmount,
    //     bankAccountNo: this.bankNo,
    //     accountId: this.bankVal,
    //     mobile: this.mobile,
    //     signatureId: this.signatureId,
    //     documentId: this.documentId,
    //   })
    //     .then((res) => {
    //       // this.collectData();
    //       this.$router.push({
    //         name: `SysMessageWaitApply___${this.$i18n.locale}`,
    //       });
    //     })
    //     .catch((err) => {
    //       if (err.code == 5002) {
    //         this.$router.push({
    //           name: `SysMessageWaitApply___${this.$i18n.locale}`,
    //         });
    //       }
    //     })
    //     .finally(() => {
    //       // this.stopTracking();
    //     });
    // },
    postMsg(e) {
      // e.data.event       = EVENT_TYPE
      // e.data.documentId  = DOCUMENT_ID
      // e.data.signatureId = SIGNATURE_ID

      if (e.data.event === 'completed') {
        this.signatureId = e.data.signatureId;
        this.documentId = e.data.documentId;
        this.$refs.iframe.remove();
        this.canSubmit = false;
        this.completed = true;
        setTimeout(() => {
          apiSubmitESignature({
            signatureId: this.signatureId,
            documentId: this.documentId,
          })
            .then((_) => {
              const ev_normal = new Event('click', {
                bubbles: true,
                cancelable: true,
                composed: true,
              });

              const ele_normal = document.querySelector('#complete_sign');
              ele_normal && ele_normal.dispatchEvent(ev_normal);
            })
            .catch((_err) => {
              if (_err.code === '5004') {
                this.completed = true;
                this.loading = false;
                this.isShowBtn = false;
              }
            });
        }, 3000);
      }
    },
    sureApply() {
      if (!this.canSubmit) {
        // debounce(this, this.applyProxy);
        this.$router.push({
          path: '/sys/index',
        });
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('inComplete'),
          duration: 2000,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
