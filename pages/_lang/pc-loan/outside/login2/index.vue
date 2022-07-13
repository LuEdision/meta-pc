<template>
  <section class="pc-login">
    <!-- <client-only> -->
    <div class="pc-login_left">
      <div class="pc-login_left__wrapper">
        <pc-header-adds></pc-header-adds>
        <div class="pc-login_form">
          <!-- <client-only> -->
          <el-form ref="formData" :model="formData">
            <el-form-item
              class="pc-login_form__sms"
              prop="smsCode"
              label=""
              :rules="[
                {
                  required: true,
                  message: $t('smsError'),
                },
              ]"
            >
              <el-input
                v-model="formData.smsCode"
                type="text"
                maxlength="4"
                @input="verifyNum"
              >
                <div
                  slot="append"
                  :class="[
                    'pc-login_form__append',
                    { active: sent ? true : false },
                  ]"
                  :disabled="sent"
                  @click="onSend(1)"
                >
                  <span>{{ sentMsg }}</span>
                </div>
              </el-input>
            </el-form-item>
            <el-form-item class="pc-login_form__notice">
              <div class="pc-login_form__voice">
                Ingresa Código de verificación que te hemos enviado a
                <span class="pc-login_form__mobile"> {{ phoneNumber }} </span
                ><br /><span class="pc-login_form__qa"
                  >¿No llegó el código? </span
                ><span
                  :class="[
                    'pc-login_form__voicesms',
                    { active: sent ? true : false },
                  ]"
                  :disabled="sent"
                  data-option="web_register_voiceotp"
                  @click="onSend(2)"
                  >Pruebe mediante llamada.</span
                >
              </div>
            </el-form-item>
            <el-form-item class="pc-login_form__btn">
              <el-button
                type="primary"
                :loading="loading"
                :data-option="
                  loginType === 'sms'
                    ? 'web_smsotp_login'
                    : 'web_voiceotp_login'
                "
                @click="onSubmit('formData')"
                ><span data-option="web_voiceotp_login">{{
                  $t('next')
                }}</span></el-button
              >
            </el-form-item>
          </el-form>
          <!-- </client-only> -->
        </div>
      </div>
    </div>
    <div class="pc-login_right">
      <pc-mail :mail-info="facebookUrl"></pc-mail>
    </div>
    <!-- </client-only> -->
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import Cookies from 'js-cookie';
import { login } from '@/api/index';
import PcHeaderAdds from '@/components/pc-loan/headerAdds.vue';
import PcMail from '@/components/pc-loan/mailContainer.vue';
const { apiGetSmsCode, apiSmsLogin, apiGetEncryptoKeyIv, apiGetCaptcha } =
  login;

let rsa = { rsaEncrypt: null },
  aes = { aesEncrypt: null },
  rsa_ext = { JSEncrypt: null };
if (process.client || process.browser) {
  rsa = require('@/utils/rsa.client');
  aes = require('@/utils/crypto.client');
  rsa_ext = require('@/utils/jsencrypt');
}

const { rsaEncrypt } = rsa;
const { aesEncrypt } = aes;
const { JSEncrypt } = rsa_ext;
export default {
  components: {
    PcHeaderAdds,
    PcMail,
  },
  data() {
    return {
      canSend: false,
      sent: false,
      reSend: false,
      errMsg: '',
      countDown: 0,
      sendLoading: false,
      loading: false,
      formData: {
        smsCode: '',
        captcha: '',
      },
      key: '',
      iv: '',
      jsEncrypt: null,
      routeQuery: this.$route.query,
      imgLoading: false,
      loginType: 'sms',
    };
  },
  computed: {
    ...mapGetters(['setting', 'login']),
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    showImgCode() {
      return false; // 仅密码登录需要
    },
    sentMsg() {
      return this.sent
        ? `${this.countDown}S`
        : this.reSend
        ? 'Enviar de nuevo'
        : 'Sned';
    },
    maxTimeout() {
      return 59;
    },
    phoneNumber() {
      return this.routeQuery.phone || '';
    },
    countryCode() {
      return this.$config.areaCode;
    },
  },
  created() {
    // if (this.$route.query.phone || this.routeQuery.scenes) {
    //   sessionStorage.setItem('log2Info', JSON.stringify(this.$route.query));
    // }
    // const regInfo = sessionStorage.getItem('log2Info');
    // this.routeQuery = regInfo ? JSON.parse(regInfo) : {};
  },
  mounted() {
    // 需判断是否从上一页面登录进来 如果是上一页面则直接发送短信验证码
    // this.onSend(1); // 默认发送验证码
    const ev = new Event('click', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    const ele = document.querySelector('.pc-login_form__append');
    ele && ele.dispatchEvent(ev);
    this.jsEncrypt = new JSEncrypt();
    this.jsEncrypt.setPublicKey(this.$publicKey);
  },
  methods: {
    verifyNum(e) {
      const reg = /[^\d]/g;
      const matchRet = this.formData.smsCode.toString().replace(reg, '');
      this.formData.smsCode = matchRet;
    },
    onDownCount() {
      this.countDown = this.maxTimeout;
      const timer = setInterval(() => {
        this.countDown--;
        if (this.countDown <= 0) {
          clearInterval(timer);
          this.sent = false;
          this.reSend = true;
        }
      }, 1000);
    },
    // @smsType 1-短信 2-语音
    onSend(smsType) {
      if (this.sent) return;
      this.sent = true;

      this.sendLoading = true;
      if (smsType === 1) {
        this.loginType = 'sms';
      } else {
        this.loginType = 'voice';
      }
      const send = {
        country: this.countryCode,
        mobile: this.phoneNumber,
        scenes: 'login',
        time: parseInt((Date.now() / 1000).toString()),
        smsType,
      };
      apiGetSmsCode(send)
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
          this.reSend = true;
        })
        .finally(() => {
          this.sendLoading = false;
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onProxy();
        } else {
          this.$message({
            message: this.$t('smsError'),
            type: 'error',
            duration: 2000,
          });
          return false;
        }
      });
    },
    proxySuccess(res) {
      const data = {};
      // token不存到vuex
      for (let i in res) i !== 'token' && (data[i] = res[i]);
      this.$store.commit('login/setLoginData', {
        mobile: this.phoneNumber,
        ...data,
      });
      sessionStorage.setItem('openPage', '1');
      if (res.rePassword) {
        this.$confirm(
          'Su contraseña de inicio de sesión ha expirado durante más de 90 días.',
          'Consejos',
          {
            confirmButtonText: this.$t('reset'),
            cancelButtonText: this.$t('cancel'),
            type: 'info',
          }
        )
          .then(() => {
            this.$router.push({
              name: `OutsideSms___${this.$i18n.locale}`,
              query: {
                phone: this.phoneNumber,
                scenes: 'resetPassword',
              },
            });
          })
          .catch(() => {
            // 只是提示 非强制性修改密码
            Cookies.set('loan_app_token', `Bearer ${res.token || ''}`);
            this.$nextTick(() => {
              // 填写资料后置 登录无需判断是否填写资料 在首页点击时判断
              this.$router.push({ path: 'pc/sys' });
            });
          });
        return;
      }

      Cookies.set('loan_app_token', `Bearer ${res.token || ''}`);
      this.$nextTick(() => {
        // 填写资料后置 登录无需判断是否填写资料 在首页点击时判断
        // const name = res.rewrite === 'Y' && 'UserModify' || 'SysIndex';
        this.$router.push({ path: 'pc/sys' });
      });
    },
    async getKeyIv() {
      await apiGetEncryptoKeyIv()
        .then((_) => {
          const keyIv = this.jsEncrypt.decrypt(_);
          if (keyIv) {
            const parseJson = JSON.parse(keyIv);
            this.key = parseJson.secretKey;
            this.iv = parseJson.iv;
          }
        })
        .catch((_err) => {});
    },
    async onProxy() {
      if (this.loading) return;
      this.loading = true;

      const { smsCode, captcha } = this.formData;
      await this.getKeyIv();
      const data = aesEncrypt(
        JSON.stringify({
          country: this.countryCode,
          mobile: this.phoneNumber,
          smsCode: smsCode,
          captcha: captcha,
          latitude: this.$config.latitude,
          longitude: this.$config.longitude,
        }),
        this.key,
        this.iv
      );
      const encrypted = {
        token: rsaEncrypt(this.key),
        data: data,
      };
      apiSmsLogin(encrypted)
        .then((res) => {
          this.proxySuccess(res);
          this.$store.commit('login/reSendCount');
          this.$store.commit('login/setPhoneNumber', {
            phoneNumberObj: {
              [this.phoneNumber]: null,
            },
          });
        })
        .catch(() => {
          if (this.showImgCode) {
            this.getImg();
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getImg() {
      if (this.imgLoading) return;
      this.imgLoading = true;

      apiGetCaptcha({
        mobile: this.phoneNumber,
        scenes: this.scenes,
      })
        .then((res) => {
          const blob = new Blob([res], { type: 'image/png' });
          this.imgUrl = (window.URL || window.webkitURL).createObjectURL(blob);
        })
        .finally(() => {
          this.imgLoading = false;
        });
    },
  },
};
</script>
<style lang="scss">
.login-layout.login2-layout {
  .send-text {
    // padding: 0;
    // margin-left: 6px;
    // background-color: transparent;
    // border: none;
    // font-size: 12px;
    // font-weight: 400;
    // color: #0095ff;
    // height: 13px;
    // line-height: 13px;
    // text-decoration: underline;
    // &::before {
    //   background-color: transparent;
    //   border: none;
    // }
  }
  .body-item {
    display: flex;
    flex-flow: row;
    overflow: hidden;
  }
}
</style>
