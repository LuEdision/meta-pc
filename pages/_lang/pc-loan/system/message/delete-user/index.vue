<template>
  <!-- 删除 or 注销用户 -->
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <div class="delete-user auto-100">
            <div class="box">
              <div class="box-title">Paso 1: Verificación facial</div>
              <p class="box-contend">
                Por su seguridad, necesitamos que suba una copia de su DNI por
                ambos lados. Además, le solicitaremos un selfie para confirmar
                que es usted quien nos hace el requerimiento de cancelación.
              </p>
              <div class="box-footer">
                <el-button
                  plain
                  type="primary"
                  :loading="loading"
                  :disabled="matiFinished !== 0"
                  @click="getMatis"
                  >{{ matiBtnText }}</el-button
                >

                <img src="@/assets/img/user-safe.png" alt="mib" />
              </div>
            </div>

            <div class="box box_bottom">
              <div class="box-title">Paso 2: Verificación SMS</div>
              <div class="box-contend">
                <el-form
                  ref="numberValidateForm"
                  :model="numberValidateForm"
                  class="ruleForm"
                >
                  <el-form-item
                    label=""
                    prop="smsCode"
                    :rules="[
                      { required: true, message: 'SMS no puede estar vacío' },
                    ]"
                  >
                    <el-input
                      v-model="numberValidateForm.smsCode"
                      class="input-text"
                      type="text"
                      placeholder="4 dígitos"
                      maxlength="4"
                      @input="verifyNum"
                    ></el-input>
                  </el-form-item>
                </el-form>

                <p class="connect">
                  <span>¿No llegó el código?</span>
                  <el-button
                    class="send-text"
                    type="text"
                    :disabled="matiFinished !== 1 || sent"
                    @click="onSend(2)"
                    >Pruebe mediante llamada.</el-button
                  >
                </p>
              </div>

              <div class="box-footer">
                <el-button
                  plain
                  type="primary"
                  :disabled="matiFinished !== 1 || sent"
                  :loading="sendLoading"
                  @click="onSend(1)"
                  >{{ sentMsg }}</el-button
                >

                <img src="@/assets/img/phone-safe.png" alt="mib" />
              </div>

              <div class="box-submit">
                <el-button
                  type="primary"
                  :disabled="!matiFinished"
                  @click="onDel"
                  >Siguiente</el-button
                >
              </div>
            </div>

            <mati-button
              v-show="false"
              id="DelMatiButton"
              class="m-mati"
              :clientId="matiClientKey"
              :flowId="matiFlowKey"
              color="#438CFF"
              :metadata="matiMeta"
            />
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
/* eslint-disable no-empty */
import { mapGetters } from 'vuex';
import Cookies from 'js-cookie';
import { loan, user, login } from '@/api/index';
import PcMail from '@/components/pc-loan/mailContainer.vue';

const { apiGetMatiConfig, apiSendMatiSubmit, apiGetMatiResult } = loan;
const { apiGetSmsCode, apiVerifySms } = login;
const { apiDelUserInfo } = user;
export default {
  components: {
    PcMail,
  },
  data() {
    return {
      numberValidateForm: {
        smsCode: '',
      },
      sent: false,
      sendLoading: false,
      loading: false,
      matiData: {},
      countDown: 60,
      matiFinished: 0,
      timer: null,
      routeQuery: this.$route.query,
      smsType: 1,
    };
  },
  computed: {
    ...mapGetters(['login', 'setting']),
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    userData() {
      const o = this.login;
      return (o && o.loginData) || null;
    },
    custId() {
      const o = this.login.loginData;
      return (o && o.customerId) || '';
    },
    matiMeta() {
      return JSON.stringify({
        fixedLanguage: 'es',
        custId: this.custId,
        reqId: this.matiReqId,
      });
    },
    userMobile() {
      const o = this.userData;
      return (o && o.mobile) || '';
    },
    sentMsg() {
      return this.sent ? `${this.countDown}S` : 'Enviar';
    },
    maxTimeout() {
      return 59;
    },
    countryCode() {
      return this.$config.areaCode;
    },
    matiReqId() {
      const o = this.matiData;
      return (o && o.reqId) || '';
    },
    matiClientKey() {
      const o = this.matiData;
      return (o && o.clientId) || '';
    },
    matiFlowKey() {
      const o = this.matiData;
      return (o && o.flowId) || '';
    },
    delType() {
      return this.routeQuery.type || '1';
    },
    matiBtnText() {
      const ret =
        this.matiFinished === 1
          ? 'Verficado'
          : this.matiFinished === 0
          ? 'Sin verificar'
          : 'Verificando';
      return ret;
    },
  },
  created() {
    // this.getMatis();
    // this.getMatiStatus();
  },
  mounted() {
    this.getMatiStatus();
  },
  unmounted() {
    clearTimeout(this.timer);
    this.timer = null;
  },
  destroyed() {
    clearTimeout(this.timer);
    this.timer = null;
  },
  methods: {
    verifyNum(e) {
      const reg = /[^\d]/g;
      const matchRet = this.numberValidateForm.smsCode
        .toString()
        .replace(reg, '');
      this.numberValidateForm.smsCode = matchRet;
    },
    onDownCount() {
      this.countDown = this.maxTimeout;
      const timer = setInterval(() => {
        this.countDown--;
        if (this.countDown <= 0) {
          clearInterval(timer);
          this.sent = false;
        }
      }, 1000);
    },
    // @smsType 1-短信 2-语音
    onSend(smsType) {
      if (this.sent) return;
      this.sent = true;
      this.smsType = smsType;
      this.sendLoading = true;
      apiGetSmsCode({
        country: this.countryCode,
        mobile: this.userMobile,
        time: parseInt((Date.now() / 1000).toString()),
        smsType,
        notify: false,
      })
        .then((res) => {
          this.$message({
            type: 'success',
            message: smsType == 1 ? this.$t('smsCode') : this.$t('smsVoice'),
            duration: 2000,
          });
          this.onDownCount();
        })
        .catch(() => {
          this.sent = false;
          this.$message({
            type: 'error',
            message: this.$t('codeErr'),
            duration: 2000,
          });
        })
        .finally(() => {
          this.sendLoading = false;
        });
    },
    getMatis() {
      if (this.loading) return;
      this.loading = true;

      apiGetMatiConfig().then((res) => {
        this.matiData = res || null;

        this.$nextTick(() => {
          this.setMati();
        });
      });
    },
    setMati() {
      const button = document.getElementById('DelMatiButton');

      // 可以手动调用mati 生成一个iframe
      button.click();
      // mati持续中
      button.addEventListener('mati:loaded', () => {
        this.loading = false;
      });

      // 验证成功 发送请求
      button.addEventListener('mati:userFinishedSdk', () => {
        this.loading = true;
        // this.matiFinished = 1;
        apiSendMatiSubmit()
          .then(() => {})
          .finally(() => {
            this.loading = false;
          });
      });
      button.addEventListener('mati:exitedSdk', ({ detail }) => {
        this.loading = false;
      });
    },
    delProxy() {
      apiDelUserInfo({
        type: this.delType,
      }).then((res) => {
        // 删除成功 退出登录
        this.$message({
          type: 'success',
          message: this.$t('delSuccess'),
          duration: 2000,
        });
        const cookies = Cookies.get();
        const keys = Object.keys(cookies);
        for (const key of keys) {
          Cookies.remove(key);
        }
        sessionStorage.clear();
        localStorage.clear();
        this.$router.push({ name: `OutsideNext___${this.$i18n.locale}` });
      });
    },
    async getMatiStatus() {
      await apiGetMatiResult()
        .then((res) => {
          this.matiFinished = res.status;
        })
        .finally(() => {
          if (this.matiFinished !== 1) {
            this.timer = setTimeout(() => {
              this.getMatiStatus();
              clearTimeout(this.timer);
              this.timer = null;
            }, 5000);
          }
        });
    },
    async onDel() {
      if (this.numberValidateForm.smsCode.trim().length <= 0) {
        this.$message({
          type: 'error',
          message: this.$t('plzInput'),
          duration: 2000,
        });
        return;
      }

      try {
        await apiGetMatiResult();
        await this.verifySmsCode()
          .then((_) => {
            this.delProxy();
          })
          .catch((_) => {
            // this.$message({
            //   type: 'error',
            //   message:
            //     this.smsType == 1 ? this.$t('smsError') : this.$t('voiceErr'),
            //   duration: 2000,
            // });
          });

        if (this.matiFinished !== 1) {
          this.$message({
            type: 'error',
            message: this.$t('noCertification'),
            duration: 2000,
          });
        }
      } catch (err) {}
    },
    verifySmsCode() {
      // 验证短信验证码成功 就返回data
      return apiVerifySms({
        country: this.countryCode,
        mobile: this.userMobile,
        smsCode: this.numberValidateForm.smsCode,
        appId: this.$config.appId,
        scenes: 'userClear',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
