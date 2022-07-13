<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <div
            v-for="(item, index) in previewList"
            :key="index"
            class="bank-preview-cell"
          >
            <div class="cell-title">{{ item.title }}</div>
            <p class="cell-content">{{ item.contend }}</p>

            <div class="cell-footer">
              <el-button
                plain
                :class="{ status_2: item.st }"
                type="primary"
                :disabled="item.disabled"
                size="small"
                :loading="loading[item.key]"
                @click="certificationItem(item.key)"
                >{{ item.btn }}</el-button
              >

              <div class="icon">
                <img :src="item.icon" alt="mib" />
              </div>
            </div>
          </div>

          <!-- 绑卡结束后 点击下一步操作 会发起Mati验证 验证通过直接到 -->
          <div class="bank-preview-footer">
            <mati-button
              v-if="false"
              id="MatiButton"
              class="m-mati"
              :client-id="matiClientKey"
              :flow-id="matiFlowKey"
              color="#438CFF"
              :metadata="matiMeta"
            />
            <el-button
              v-if="!isComponent"
              type="primary"
              :disabled="!canToNext"
              :loading="loading.next"
              @click="onNext"
              >Siguiente</el-button
            >
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
import { mapGetters } from 'vuex';
import { user, bank, loan } from '@/api/index';
import BankDebit from '@/assets/img/bank/debit.png';
import BankIban from '@/assets/img/bank/iban.png';
import BankIban2 from '@/assets/img/bank/iban2.png';
import PcMail from '@/components/pc-loan/mailContainer.vue';

const { apiGetUserConfig, apiFinishUserinfo } = user;
const { apiBindOpenBank, apiBindBank, apiGetOpenBankAccountList } = bank;
const { apiApplyPreCredit } = loan;
export default {
  components: {
    PcMail,
  },
  props: {
    isComponent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: {
        open: false,
        card: false,
        next: false,
      },
      config: {
        openBankStatus: 0, // 是否绑定开放银行 0(未绑定) 1(已绑定) 2(绑定中)
        bankAccountStatus: 0, // 是否绑定账户
        bankCardStatus: 0, // 是否绑卡
      },
      preCreditData: {}, // 发起预授信后返回的mat及相关数据
      routeQuery: this.$route.query,
      timer: null,
      countTimer: null,
      countTime: 0,
    };
  },
  computed: {
    ...mapGetters(['setting', 'login', 'bank']),
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    BASE_URL() {
      return `${process.env.BASE_URL}/pc/` || '/pc/';
    },
    previewList() {
      const open = this.config.openBankStatus;
      const account = this.config.bankAccountStatus;
      const card = this.config.bankCardStatus;
      return [
        {
          // 开放银行认证（外部h5）
          icon: BankDebit,
          title: 'Verificación bancaria',
          contend:
            'Es un servicio para la identificacián rápida de los clientes. Es necesario para verificar su identidad y le ayudará a aumentar la probabilidad de aprobación del préstamo.',
          btn: this.openBank === 2 ? 'Verificando' : this.getBtnText(open),
          disabled: open === 1 || open === 2,
          st: open === 2,
          url: this.BASE_URL + 'sys/bank/bind',
          key: 'open',
        },
        {
          // 绑定收款账户
          icon: BankIban,
          title: 'Cuenta bancaria (IBAN)',
          contend:
            'Seleccione la cuenta bancaria en la que quiere que le ingresemos su préstamo. Le recomendamos que elija el banco donde tenga sus ingresos y/o su nómina para obtener las mejores condiciones de préstamo.',
          btn: this.getBtnText(account),
          disabled: account === 1 || account === 2,
          st: account === 2,
          url: this.BASE_URL + 'sys/bank/bind',
          key: 'account',
        },
        {
          // 绑定还款储蓄卡（外部h5）
          icon: BankIban2,
          title: 'Verificación bancaria',
          contend:
            'Sólo tarjetas de débito, NO de crédito. La utilizaremos para activar el pago automático y así realizar tus pagos mensuales cómodamente. No haremos ningún cargo en tu tarjeta hasta la fecha de pago de la cuota del préstamo.',
          btn: this.bankCard === 2 ? 'Verificando' : this.getBtnText(card),
          disabled: card === 1 || card === 2,
          st: card === 2,
          url: this.BASE_URL + 'sys/bank/bind',
          key: 'card',
        },
      ];
    },
    canToNext() {
      // 全都已绑定才能点击进行到下一页 (预授信)
      const open = this.config.openBankStatus;
      const account = this.config.bankAccountStatus;
      const card = this.config.bankCardStatus;

      return open === 1 && account === 1 && card === 1;
    },
    custId() {
      const o = this.login.loginData;
      return (o && o.customerId) || '';
    },
    matiMeta() {
      return JSON.stringify({
        fixedLanguage: 'es',
        custId: this.custId,
      });
    },
    matiClientKey() {
      const o = this.preCreditData;
      return o.matiClientId || '';
    },
    matiFlowKey() {
      const o = this.preCreditData;
      return o.matiFlowId || '';
    },
    openBank() {
      return this.bank.openBank;
    },
    bankCard() {
      return this.bank.bankCard;
    },
    fromOrigin() {
      return this.bank.fromOrigin;
    },
  },
  mounted() {
    this.getConfig();
    if (this.openBank === 2) {
      this.loading.open = true;
    }
    if (this.bankCard === 2) {
      this.loading.card = true;
    }
    this.$nextTick(() => {
      this.countTimer = setInterval(() => {
        this.getConfig();
        if (this.fromOrigin === 'userInfo' && this.openBank === 2) {
          this.loading.open = true;
        }
        if (this.fromOrigin === 'userInfo' && this.bankCard === 2) {
          this.loading.card = true;
        }
        if (this.config.openBankStatuss) {
          this.$store.commit('bank/setOpenBank', 1);
          this.loading.open = false;
        }
        if (this.config.bankCardStatus) {
          this.$store.commit('bank/setBankCard', 1);
          this.loading.card = false;
        }
        if (this.countTime === 5) {
          // if (!this.config.openBankStatuss) {
          //   this.$store.commit('bank/setOpenBank', 1);
          //   this.loading.open = false;
          // }
          // if (!this.config.bankCardStatus) {
          //   this.$store.commit('bank/setBankCard', 1);
          //   this.loading.card = false;
          // }
          clearInterval(this.countTimer);
          this.countTimer = null;
        }
        this.countTime += 1;
      }, 3000);
    });
  },
  unmounted() {
    clearInterval(this.timer);
    this.timer = null;
    clearInterval(this.countTimer);
    this.countTimer = null;
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
    clearInterval(this.countTimer);
    this.countTimer = null;
  },
  methods: {
    goTo(url) {
      this.$router.push(url);
    },
    getBtnText(v) {
      return this.$t('bindStatus.' + v);
    },
    // 此处需有序校验
    async certificationItem(key) {
      await this.getConfig(); // 确保请求的结果是已经返回 且已经存于数据库

      const open = this.config.openBankStatus;
      const account = this.config.bankAccountStatus;
      const card = this.config.bankCardStatus;
      if (key === 'account') {
        if (open === 1) {
          this.$router.push({
            name: `SysBankBind___${this.$i18n.locale}`,
            query: {
              ...this.routeQuery,
              back: 'SysBankPre',
            },
          });
        } else {
          this.$message({
            type: 'warning',
            message: this.$t('plzSelect'),
            duration: 2000,
          }); // '请先绑定上一个'
        }
      } else if (key === 'card') {
        if (open === 1 && account === 1) {
          this.onBindCard();
        } else {
          // 需校验 上一个是否已经绑定 未绑定toast提示
          this.$message({
            type: 'warning',
            message: this.$t('plzSelect'),
            duration: 2000,
          });
        }
      } else if (key === 'open') {
        if (open === 2) {
          this.$message({
            type: 'warning',
            message: this.$t('bindingToResult'),
            duration: 2000,
          }); //当前状态正在绑定中,请等待结果返回
          return;
        }

        this.onBindOpen();
      }
      if (
        !this.config.openBankStatus ||
        !this.config.bankAccountStatus ||
        !this.config.bankCardStatus
      ) {
        this.timer = setInterval(async () => {
          await this.getConfig();
          if (this.config.openBankStatus) {
            this.$store.commit('bank/setOpenBank', 1);
          }
          if (this.config.bankCardStatus) {
            this.$store.commit('bank/setBankCard', 1);
          }
          if (
            this.config.openBankStatus &&
            this.config.bankAccountStatus &&
            this.config.bankCardStatus
          ) {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 3000);
      }
    },
    async getConfig() {
      await apiGetUserConfig().then((res) => {
        this.config = res || {};
        this.$store.commit('login/setUserConfig', res || null);
      });
    },
    onBindCard() {
      if (this.loading.card) return;
      this.loading.card = true;
      this.$store.commit('bank/setOrigin', 'userInfo');
      this.$store.commit('bank/setBankCard', 2);
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
          // this.loading.card = false;
        });
    },
    onBindOpen() {
      if (this.loading.open) return;
      this.loading.open = true;
      this.$store.commit('bank/setOrigin', 'userInfo');
      this.$store.commit('bank/setOpenBank', 2);
      apiBindOpenBank()
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
            `/pc/third-part?url=${window.btoa(res.widgetUrl)}`,
            '_blank'
          );
          // } else {
          //   res.widgetUrl && window.open(res.widgetUrl, '_blank');
          // }
        })
        .finally(() => {
          // this.loading.open = false;
        });
    },
    initMati() {
      const button = document.getElementById('MatiButton');

      // 可以手动调用mati 生成一个iframe
      button.click();
      // mati持续中
      button.addEventListener('mati:loaded', () => {
        this.loading.next = false;
      });

      // 验证成功 跳到首页
      button.addEventListener('mati:userFinishedSdk', () => {
        this.$router.push({
          name: `SysIndex___${this.$i18n.locale}`,
        });
      });

      // 退出验证 点击按钮需重新进入
      button.addEventListener('mati:exitedSdk', () => {});
    },
    finishProxy() {
      if (this.loading.next) return;
      this.loading.next = true;
      apiFinishUserinfo()
        .then(() => {
          this.$router.push({
            name: `SysIndex___${this.$i18n.locale}`,
            params: { need: 'ok' },
          });
        })
        .catch(() => {
          this.loading.next = false;
        });
    },
    applyCredit() {
      if (this.loading.next) return;
      this.loading.next = true;

      apiApplyPreCredit()
        .then((res) => {
          this.preCreditData = res;
          this.$store.commit('loan/setPreCredit', res || {});

          if (res.hasOpenBankCheckAgain) {
            this.onBindOpen();
            return;
          }
          this.finishProxy();
          // 是否需要走mati校验
          // if (res.matiAuth) {
          //   this.$nextTick(() => {
          //     this.initMati();
          //   })
          // } else {
          //   this.$router.push({ name: 'SysIndex' });
          // }
        })
        .catch(() => {
          this.loading.next = false;
        });
    },
    async onNext() {
      try {
        await this.getConfig(); // 确保请求的结果是已经返回 且已经存于数据库

        // 发去mati请求 后端返回对应key 根据key发起mati验证
        // 每次点击都发起该预授信 然后确定是否过mati
        if (this.canToNext) {
          this.finishProxy();
        }
      } catch (error) {
        this.loading.next = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
