<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-home">
      <vue-scroll
        ref="vs"
        :ops="ops"
        @refresh-start="onRefresh"
        @load-before-deactivate="onRefresh"
        @refresh-before-deactivate="onRefresh"
        @load-start="onRefresh"
      >
        <div class="pc-sys-container home">
          <div class="pc-sys-left">
            <div class="invite-now" @click="openUrl"></div>
            <div class="pc-sys-left_noticebar">
              <client-only>
                <notice-bar
                  :text="
                    loanStatu === 3001 || loanStatu === 2002
                      ? 'Pagar a tiempo incrementará la probabilidad de solicitar más'
                      : loanStatu === 3002
                      ? 'La tarifa de penalización es 2.5% día.'
                      : 'El pago a tiempo aumentará tu límite de crédito.'
                  "
                  :bg-color="'#DBE9FF'"
                  :color="'#3F629A'"
                  left-icon=""
                  outview
                  :speed="30"
                />
              </client-only>
            </div>
            <div class="pc-sys-left_status">{{ loanTitle }}</div>
            <div class="pc-sys-left_money">
              <span class="money">{{ homeAmount }}</span
              ><span class="money-symbol">€</span>
            </div>
            <div class="pc-sys-left_btn">
              <div class="btn">
                <el-button
                  :class="[
                    '_' + loanStatu,
                    loanStatu === 4001 ||
                    loanStatu === -2 ||
                    (!loanStatu &&
                      loanStatu !== 0 &&
                      homeData.canApplyNow === 1)
                      ? 'animation'
                      : '',
                  ]"
                  type="primary"
                  :loading="applyLoading"
                  :data-option="
                    'web_clickapplynow_' + btnText.replace(' ', '_')
                  "
                  @click="onSubmit('formData')"
                  ><span
                    :data-option="
                      'web_clickapplynow_' + btnText.replace(' ', '_')
                    "
                    >{{ btnText }}</span
                  ></el-button
                >
              </div>
              <div
                class="loan-label"
                :class="'_' + loanStatu"
                v-html="loanLabel"
              ></div>
            </div>
          </div>
          <div class="pc-sys-right">
            <div class="pc-sys-right_title">Con solo 3 pasos</div>
            <div class="pc-sys-right_steps">
              <el-steps :active="3">
                <el-step title="Verificación de identidad">
                  <span slot="icon" class="step"
                    ><img :src="step1" alt="Mib"
                  /></span>
                </el-step>
                <el-step title="Análisis crediticio">
                  <span slot="icon" class="step"
                    ><img :src="step2" alt="Mib"
                  /></span>
                </el-step>
                <el-step title="Obtener dinero">
                  <span slot="icon" class="step"
                    ><img :src="step3" alt="Mib"
                  /></span>
                </el-step>
              </el-steps>
            </div>
            <div class="pc-sys-right_footer">
              <p>
                <a :href="secci" target="_blank" rel="noopener  noreferrer"
                  >Información Europea Normalizada del Contrato (INE)</a
                >
              </p>
              <p>
                <a :href="agreement" target="_blank" rel="noopener noreferrer"
                  >Información Sobre El Préstamo</a
                >
              </p>
            </div>
          </div>
        </div>
      </vue-scroll>
    </div>
    <pc-footer></pc-footer>
    <el-dialog
      title=""
      :visible.sync="acceptShow"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
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
                millisecond
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
              Se está calculando su línea de crédíto Espere por favor unos
              segundos
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
    <div
      id="openPreCredit"
      style="display: none"
      data-option="web_credit_dialog_open"
    ></div>
    <div
      id="closePreCredit"
      style="display: none"
      data-option="web_credit_dialog_close"
    ></div>
    <div
      id="timeoutPreCredit"
      style="display: none"
      data-option="web_credit_time_out"
    ></div>
    <div
      id="timeoutPreCreditResult"
      style="display: none"
      data-option="web_credit_get_time_out_result"
    ></div>
    <div
      id="normalPreCreditResult"
      style="display: none"
      data-option="web_credit_get_result"
    ></div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { utils, loan, user } from '@/api/index';
import { numFormat } from '@/utils/index.client';
import PcFooter from '@/components/pc-loan/footer.vue';
import step1 from '@/assets/img/pc/step1@2x.png';
import step2 from '@/assets/img/pc/step2@2x.png';
import step3 from '@/assets/img/pc/step3@2x.png';
import refuzedImg from '@/assets/img/pre-credit/apply-failed.svg';
import CustomCountdown from '@/components/pc-loan/CustomCountdown.vue';
import VueScroll from 'vuescroll';

const { apiGetAppBanner } = utils;
const {
  apiGetAppInfo,
  apiGetLastUnpayLoan,
  apiGetPreCredit,
  apiApplyPreCredit,
  apiGetESignature,
} = loan;
const { apiGetUserinfo, apiFinishUserinfo } = user;

export default {
  name: 'SysHome',
  components: {
    PcFooter,
    CustomCountdown,
    VueScroll,
  },
  data() {
    const config = {};
    const ops = {
      vuescroll: {
        mode: 'slide',
        pullRefresh: {
          enable: true,
        },
        pushLoad: {
          enable: true,
          auto: true,
          autoLoadDistance: 10,
        },
      },
    };
    ops.vuescroll.pullRefresh.tips = {
      deactive: 'Actualizar desplegable',
      active: 'Release Refresh',
      start: 'Actualización...',
      beforeDeactive: 'Actualización exitosa!',
    };
    ops.vuescroll.pushLoad.tips = {
      deactive: '上拉加载',
      active: '释放加载',
      start: '加载中...',
      beforeDeactive: '加载成功!',
    };

    return {
      millisecond: true,
      loopTimer: null,
      num: 0,
      applyLoading: false,
      acceptShow: false,
      step1: step1,
      step2: step2,
      step3: step3,
      formData: {},
      bannerList: [],
      homeData: {},
      loanData: {},
      preCreditData: {}, // 发起预授信后返回的mat及相关数据
      noticeTip: 'El pago a tiempo aumentará tu límite de crédito',
      resData: null,
      firstName: '',
      loginData: null,
      routeQuery: this.$route.query,
      secci: 'https://website.es/secci',
      agreement: 'https://website.es/agreement',
      countdownFlag: false,
      timer: null,
      resetTime: {
        h: '00',
        m: '00',
        s: '00',
        ms: '00',
      },
      downTime: 30,
      countDown: 0,
      ops,
    };
  },
  computed: {
    ...mapGetters(['login', 'setting', 'loan']),
    need() {
      return this.$route.params.need;
    },
    homeStatus() {
      return this.loan.homeStatus;
    },
    preData() {
      return this.loan.preCredit;
    },
    // downTime() {
    //   const o = this.preData;
    //   const c = o.countdown || 30;

    //   return Date.now() + c * 1000; // 毫秒
    // },
    swiperWidth() {
      return (window.innerWidth || 360) - 16 * 2;
    },
    // loginData() {
    //   const o = toRaw(this.login);
    //   return o.loginData || null;
    // },
    username() {
      const o = this.loginData || this.login.loginData;
      return o.firstName || '';
    },
    headImg() {
      const o = this.loginData || this.login.loginData;
      return o.headImg;
    },
    homeAmount() {
      const o = this.loanData;
      let amount = '1.000';
      if (o) {
        // 如果已经发起借款操作 则显示对应借款金额
        switch (this.loanStatu) {
          case -1:
          case -2:
          case 4001: {
            amount =
              numFormat(Number(this.homeData.homeAmount ?? 0), '.') || '1.000';
            break;
          }
          case 0:
          case 1001:
          case 1002:
          case 1004:
          case 2001:
          case 2003:
          case 2004: {
            amount = numFormat(Number(o.applyAmount ?? 0), '.') || '1.000';
            break;
          }
          case 2002:
          case 3001:
          case 3002:
          case 3003: {
            amount =
              numFormat(Number(o.totalSurplusAmount ?? 0), '.') || '1.000';
            break;
          }
          default: {
            amount =
              numFormat(Number(this.homeData.homeAmount ?? 0), '.') || '1.000';
          }
        }
        return amount;
      }

      return numFormat(Number(this.homeData.homeAmount ?? 0), '.') || '1.000';
    },
    loanStatu() {
      const o = this.loanData;
      return o && o.status;
    },
    loanTitle() {
      let headText = '';
      switch (this.loanStatu) {
        case 2001: {
          headText = this.$t('inLending');
          break;
        }
        case -1: {
          if (this.homeData.canApplyNow === 0) {
            headText = this.$t('refuzed');
          } else {
            headText = this.$t('applyAmount');
          }
          break;
        }
        case 0: {
          if (this.homeData.canApplyNow === 0) {
            headText = this.$t('refuzed');
          } else {
            headText = this.$t('applyAmount');
          }
          break;
        }
        case 1001:
        case 1002:
        case 1004:
        case 4001: {
          headText = this.$t('applyAmount');
          break;
        }
        case 2002:
        case 3001:
        case 3002:
        case 3003: {
          headText = this.$t('apply.interest1');
          break;
        }
        default: {
          if (this.homeData.canApplyNow === 0) {
            headText = this.$t('refuzed');
          } else {
            headText = this.$t('loanAmount');
          }
        }
      }
      return headText;
    },
    btnText() {
      const _Map = {
        0: this.$t('homeButton.approval'),
        4001: this.$t('homeButton.noApply'),
        '-2': this.$t('homeButton.noApply'),
        1001: this.$t('homeButton.approval'),
        1002: this.$t('homeButton.approval'),
        1004: this.$t('homeButton.approval'),
        '-1': this.$t('homeButton.approvalDenied'),
        2001: this.$t('homeButton.loaning'),
        2002: this.$t('homeButton.pendingPay'),
        2003: this.$t('homeButton.loaning'), // 放款失败 显示
        2004: this.$t('homeButton.loaning'),
        3001: this.$t('homeButton.pendingPay'),
        3002: this.$t('homeButton.overdue'),
        3003: this.$t('homeButton.pendingPay'),
        1007: this.$t('homeButton.toBeSigned'),
      };
      if (this.loanData || this.loanStatu) {
        return _Map[this.loanStatu] || this.$t('homeButton.noApply');
      } else {
        return _Map[this.homeData.canApplyNow === 0 ? '-1' : 4001];
      }
    },
    showDate() {
      return [2002, 3001, 3002].includes(this.loanStatu);
    },
    localPay() {
      // 当前这一期的
      const o = this.loanData;
      const l = (o && o.loanInfoVoList) || [];
      return (l.length > 0 && l[0]) || null;
    },
    remainingDays() {
      const o = this.loanData;
      return (o && dayjs(o.dueDate).format('DD-MM-YYYY')) || '';
    },
    overDueDays() {
      const o = this.localPay;
      return (o && o.overdueDays) || 31;
    },
    canApplyNow() {
      const o = this.homeData;
      return (o && o.canApplyNow) || 0;
    },
    nextApplyDate() {
      const o = this.homeData;
      return (o && dayjs(o.nextApplyDate).format('DD-MM-YYYY')) || 0;
    },
    nextApplyDateForRefused() {
      const o = this.homeData;
      return (o && dayjs(o.nextApplyDate).format('DD-MM-YYYY HH:mm:ss')) || 0;
    },
    loanLabel() {
      // 即将到期 | 逾期提醒
      const s = this.loanStatu;
      // const o = this.loanData
      if (this.loanData) {
        if (s === 0 || s === 1001 || s === 1002 || s === 1004 || s === 2001) {
          return 'El importe final de su préstamo está condicionado a su perfil crediticio';
        } else if (s === 3001 || s === 2002) {
          // 已借款
          return `Vencimiento próxima cuota:  <span style='font-weight: 600;color: #000;'>${this.remainingDays}</span>`;
        } else if (s === 3002) {
          // 已逾期
          return `Días vencidos: ${this.overDueDays}`;
        } else if (s === -1 || s === -2 || s === 4001) {
          return `El siguiente se aplica en ${this.nextApplyDateForRefused}`;
        } else {
          return 'El importe final de su préstamo está condicionado a su perfil crediticio';
        }
      } else {
        if (this.canApplyNow === 0) {
          return `El siguiente se aplica en ${this.nextApplyDateForRefused}`;
        } else {
          return 'El importe final de su préstamo está condicionado a su perfil crediticio';
        }
      }
    },
    vuexBanner() {
      return this.setting.bannerList || [];
    },
    at_gd() {
      return this.login.at_gd;
    },
  },
  created() {
    this.$store.commit('login/reSendCount');
    this.$store.commit('login/setPhoneNumber', {
      phoneNumberObj: {
        [this.phoneNumber]: null,
      },
    });

    // this.finishProxy();
    // apiApplyPreCredit().then((res) => {
    //   this.initCollection(res);
    // });
  },
  mounted() {
    const token = Cookies.get('loan_app_token');
    if (token) {
      if (this.homeStatus === 'yes') {
        this.loopTimer = setInterval(() => {
          Promise.all([
            this.getUserData(),
            this.getHomeData(),
            this.getLastLoan(),
          ]);
          this.num++;
          if (this.num === 3) {
            clearInterval(this.loopTimer);
            this.loopTimer = null;
            this.$store.commit('loan/setHomeStatus', '');
          }
        }, 3000);
      } else {
        this.getUserData();
        this.getHomeData();
        this.getLastLoan();
      }
    }
    this.getBanner();
    this.firstName =
      (this.loginData &&
        (this.loginData.firstName || this.login.loginData.firstName)) ??
      '';
    this.secci = `${process.env.BASE_URL || location.origin}/secci`;
    this.agreement = `${process.env.BASE_URL || location.origin}/agreement`;
    if (this.need) {
      this.checkOpenBank();
    }
  },
  unmounted() {
    clearTimeout(this.timer);
    this.timer = null;
    clearInterval(this.loopTimer);
    this.loopTimer = null;
    this.$store.commit('loan/setHomeStatus', '');
    this.$store.commit('bank/setPayWay', '');
  },
  destroyed() {
    clearTimeout(this.timer);
    this.timer = null;
    clearInterval(this.loopTimer);
    this.loopTimer = null;
    this.$store.commit('loan/setHomeStatus', '');
    this.$store.commit('bank/setPayWay', '');
  },
  methods: {
    async handleESignature() {
      try {
        const res = await apiGetESignature();
      } catch (e) {
        throw new Error(e.message);
      }
    },
    onEnd() {
      this.countdownFlag = true;
    },
    openUrl(url) {
      this.$router.push({
        name: `OutsideInvite___${this.$i18n.locale}`,
      });
    },
    async onRefresh(vsInstance, refreshDom, done) {
      try {
        await this.getLastLoan();
        await this.getHomeData();
        done && done();
      } catch (error) {
        done && done();
      }
    },
    getUserData() {
      apiGetUserinfo().then((res) => {
        this.$store.commit('login/setLoginData', res);
        this.loginData = res;
      });
    },

    getBanner() {
      this.bannerList = this.vuexBanner;
      const time = Date.now();
      const max = 3 * 60 * 60 * 1000;
      const prev = +localStorage.getItem('app_banner_time');
      if (this.bannerList.length && time - prev < max) {
        return;
      }

      localStorage.setItem('app_banner_time', time.toString());
      apiGetAppBanner({
        requestType: 1,
      }).then((res) => {
        this.bannerList = res || [];
        this.$store.commit('setting/setBanner', this.bannerList);
      });
    },
    async getHomeData() {
      await apiGetAppInfo().then((res) => {
        if (res) {
          this.homeData = res[0] || null; // 目前至少会有一个产品数据返回
        }
        this.$store.commit('loan/setProductInfo', res || []);
      });
    },
    // 最后一个loan 根据该状态变化对应值
    getLastLoan() {
      this.loanData = null;
      return apiGetLastUnpayLoan()
        .then((res) => {
          this.loanData = res || null;
          // const fetchNum = sessionStorage.getItem('fetchNum');
          // if (!fetchNum) {
          //   onTriggerTranction(res?.applyAmount, res?.paymentId, this.at_gd);
          // }
          if (res && (res.status === 3001 || res.status === 2002)) {
            this.noticeTip =
              'Pagar a tiempo incrementará la probabilidad de solicitar más importe';
          } else if (res && res.status === 3002) {
            this.noticeTip = 'La tarifa de penalización es 2.5% día';
          }
          this.$store.commit('loan/setLastLoan', res || null);
        })
        .catch(() => {
          this.$store.commit('loan/setLastLoan', null);
        });
    },
    initMati() {
      let that = this;
      const matiBtn = document.getElementById('MatiHome');

      // 可以手动调用mati 生成一个iframe
      matiBtn.click();
      // 验证成功 跳到首页
      matiBtn.addEventListener('mati:userFinishedSdk', () => {
        that.getPreResult();
        // this.$router.push({ name: 'SysLoanPresale' });
      });
    },
    async getPreResult() {
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
        // 获取预授信结果
        const res = await apiGetPreCredit({
          countdownFlag: this.countdownFlag,
          reqId: this.preCreditData.reqId,
          h5Apply: bagType,
        });
        this.resData = res || null;
        this.$store.commit('loan/setPreResult', this.resData);
        if (res && (res.creditAmount || res.productId)) {
          this.acceptShow = false;
          const ev = new Event('click', {
            bubbles: true,
            cancelable: true,
            composed: true,
          });

          const ele = document.querySelector('#closePreCredit');
          ele && ele.dispatchEvent(ev);
          if (this.countdownFlag) {
            const ev_timeout = new Event('click', {
              bubbles: true,
              cancelable: true,
              composed: true,
            });

            const ele_timeout = document.querySelector(
              '#timeoutPreCreditResult'
            );
            ele_timeout && ele_timeout.dispatchEvent(ev_timeout);
          } else {
            const ev_normal = new Event('click', {
              bubbles: true,
              cancelable: true,
              composed: true,
            });

            const ele_normal = document.querySelector('#normalPreCreditResult');
            ele_normal && ele_normal.dispatchEvent(ev_normal);
          }
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

            this.getPreResult();
          }, 2000);
          this.timer = t;
        } else {
          this.$router.push({
            name: `SysMessagePrecredit___${this.$i18n.locale}`,
          });
        }
      } catch (_err) {
        if (_err && _err.code !== '0000') {
          this.$router.push({
            name: `SysMessagePrecredit___${this.$i18n.locale}`,
          });
          this.timer = setTimeout(() => {
            if (29 === this.countDown) {
              this.countdownFlag = true;
              const ev = new Event('click', {
                bubbles: true,
                cancelable: true,
                composed: true,
              });

              const ele = document.querySelector('#timeoutPreCredit');
              ele && ele.dispatchEvent(ev);
              clearTimeout(this.timer);
              this.timer = null;
            }
            this.getPreResult();
          }, 2000);
        }
      }
    },
    async checkOpenBank() {
      await apiApplyPreCredit()
        .then((res) => {
          this.$store.commit('loan/setPreCredit', res || {});
          this.preCreditData = res;
          const o = this.preCreditData;
          const c = o.countdown || 30;

          this.downTime = Date.now() + c * 1000; // 毫秒
          this.acceptShow = true;
          const ev = new Event('click', {
            bubbles: true,
            cancelable: true,
            composed: true,
          });

          const ele = document.querySelector('#openPreCredit');
          ele && ele.dispatchEvent(ev);
          this.applyLoading = false;
          if (res.hasOpenBankCheckAgain) {
            this.$router.push({
              path: '/sys/bank/preview',
              query: {
                pt: '/sys',
                ext: 'flag',
              },
            });
            return;
          }
          // 是否需要走mati校验
          // if (res.matiAuth) {
          //   this.$nextTick(() => {
          //     this.initMati();
          //   });
          //   return;
          // }

          this.goStatus();
        })
        .catch(() => {
          this.acceptShow = false;
          this.applyLoading = false;
        });
    },
    goStatus() {
      const status = this.loanStatu;
      this.transRouter(status);
    },
    transRouter(statu) {
      if (this.loanData) {
        // 没有最后一笔订单 直接跳到借款h5
        // 0/1/1001/1004 跳转到信审结果h5
        // 1002 跳到放款处理中h5
        // 2001/2003/2004 放款失败 跳转到等待付款结果h5
        // 2002/3001/3002/3003 跳转到还款页面 用户手动还款
        if ([-1].includes(statu)) {
          this.$confirm(
            `
            <div class="refuzed-img">
            <img src="${refuzedImg}" >
            </div>
            <div class="refuzed-title">Error en el análisis de crédito. Inténtalo de nuevo</div>
            <div class="refuzed-content">${this.$t('refused')}</div>
            `,
            this.btnText,
            {
              dangerouslyUseHTMLString: true,
              confirmButtonText: this.$t('yes'),
              customClass: 'home-refuze',
            }
          )
            .then((_) => {})
            .catch((_) => {});
        } else if ([2002, 3001, 3002, 3003].includes(statu)) {
          this.$router.push({ name: `SysLoanRepay___${this.$i18n.locale}` });
        } else {
          this.getPreResult();
          // this.$router.push({ name: `SysLoanPresale___${this.$i18n.locale}` });
        }
      } else {
        if (this.canApplyNow === 0) {
          this.$confirm(
            `
            <div class="refuzed-img">
            <img src="${refuzedImg}" >
            </div>
            <div class="refuzed-title">Error en el análisis de crédito. Inténtalo de nuevo</div>
            <div class="refuzed-content">${this.$t('refused')}</div>
            `,
            this.btnText,
            {
              dangerouslyUseHTMLString: true,
              confirmButtonText: this.$t('yes'),
              customClass: 'home-refuze',
            }
          )
            .then((_) => {})
            .catch((_) => {});
        } else {
          // this.$router.push({ name: `SysLoanPresale___${this.$i18n.locale}` });
          this.getPreResult();
        }
      }
    },
    async onSubmit(formName) {
      // 仅当未进行借款操作时才需要判断以下操作
      if ([0, 1, 1001, 1004].includes(this.loanStatu)) {
        // this.$toast.text(this.$t('refused'));
        if (this.canApplyNow === 0) {
          this.$confirm(
            `
            <div class="refuzed-img">
            <img src="${refuzedImg}" >
            </div>
            <div class="refuzed-title">Error en el análisis de crédito. Inténtalo de nuevo</div>
            <div class="refuzed-content">${this.$t('refused')}</div>
            `,
            this.btnText,
            {
              dangerouslyUseHTMLString: true,
              confirmButtonText: this.$t('yes'),
              customClass: 'home-refuze',
            }
          )
            .then((_) => {})
            .catch((_) => {});
        } else {
          this.$confirm(
            `
            <div class="refuzed-content">${this.$t('applying')}</div>
            `,
            this.btnText,
            {
              dangerouslyUseHTMLString: true,
              confirmButtonText: this.$t('okay'),
              customClass: 'home-refuze',
            }
          );
        }
      } else if ([1002, 2001, 2003, 2004].includes(this.loanStatu)) {
        // this.$toast.text(this.$t('handlingMoney'));
        this.$confirm(
          `
            <div class="refuzed-content">${this.$t('handlingMoney')}</div>
            `,
          this.$t('sendMoneyTitle'),
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: this.$t('okay'),
            customClass: 'home-refuze',
          }
        );
      } else if ([1007].includes(this.loanStatu)) {
        this.handleESignature().then((res) => {
          this.$router.push({
            name: `SysContract___${this.$i18n.locale}`,
          });
        });
      } else {
        if (!this.loanData) {
          const user = this.loginData;
          // 此处需判断是否登录
          if (user && user.rewrite === 'Y') {
            this.$router.push({ name: `UserModify___${this.$i18n.locale}` });
            return;
          }
          if (this.canApplyNow === 0) {
            this.$confirm(
              `
            <div class="refuzed-img">
            <img src="${refuzedImg}" >
            </div>
            <div class="refuzed-title">Error en el análisis de crédito. Inténtalo de nuevo</div>
            <div class="refuzed-content">${this.$t('refused')}</div>
            `,
              this.btnText,
              {
                dangerouslyUseHTMLString: true,
                confirmButtonText: this.$t('yes'),
                customClass: 'home-refuze',
              }
            );
          } else {
            this.applyLoading = true;
            // 判断open bank是否过期
            await this.checkOpenBank();
          }
        } else {
          this.goStatus();
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
