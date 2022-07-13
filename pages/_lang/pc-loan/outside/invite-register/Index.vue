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
              prop="mobile"
              label=""
              :rules="[
                {
                  required: true,
                  message: $t('mobilePlaceholder'),
                  trigger: 'blur',
                },
                { validator: checkMobile, trigger: ['change', 'blur'] },
              ]"
            >
              <el-input
                v-model="formData.mobile"
                maxlength="9"
                @input="onChange"
              >
                <img :src="nationalImg" alt="Mib" />
                <span slot="prefix" class="">+34</span>
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="
                formData.mobile &&
                formData.mobile.length === phoneCount &&
                isRight
              "
              prop="captcha"
              label=""
              :rules="[
                {
                  required: true,
                  message: $t('imgCode'),
                  trigger: 'blur',
                },
              ]"
            >
              <el-input v-model="formData.captcha" :placeholder="$t('imgCode')">
                <div slot="append">
                  <img :src="imgUrl" alt="" />
                  <span class="el-icon-refresh" @click="getImg"></span>
                </div>
              </el-input>
            </el-form-item>
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
            <el-form-item
              class="pc-login_form__sms pwd"
              prop="password"
              label=""
              :rules="[
                {
                  required: true,
                  message: $t('plzInput'),
                  trigger: 'blur',
                },
                { validator: validatePass, trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="formData.password"
                :type="isPwd ? 'text' : 'password'"
                :placeholder="$t('pwdPlaceholder')"
                autocomplete="off"
              >
                <div
                  slot="append"
                  class="pc-login_form__pwd"
                  @click="isPwd = !isPwd"
                >
                  <img :src="!isPwd ? closeImg : openImg" alt="" />
                </div>
              </el-input>
            </el-form-item>
            <el-form-item
              class="pc-login_form__sms pwd"
              prop="rePassword"
              label=""
              :rules="[
                {
                  required: true,
                  message: $t('plzInput'),
                  trigger: 'blur',
                },
                { validator: validatePass2, trigger: 'blur' },
              ]"
            >
              <el-input
                v-model="formData.rePassword"
                :type="isRePwd ? 'text' : 'password'"
                :placeholder="$t('pwdPlaceholder')"
                autocomplete="off"
              >
                <div
                  slot="append"
                  class="pc-login_form__pwd"
                  @click="isRePwd = !isRePwd"
                >
                  <img :src="!isRePwd ? closeImg : openImg" alt="" />
                </div>
              </el-input>
            </el-form-item>
            <el-form-item
              prop="inviteCode"
              label=""
              class="pc-login_form__sms invite"
            >
              <el-input
                v-model="formData.inviteCode"
                :placeholder="$t('inviteCodePlaceholder')"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="" label="" class="pc-login_form__sms">
              <ul class="pc-register_tips">
                <li class="pc-register_tips__item">
                  <span class="tip">*</span
                  ><span
                    >Su contraseña de inicio de sesión es válida durante 90
                    días</span
                  >
                </li>
                <li class="pc-register_tips__item">
                  <span class="tip">*</span
                  ><span>Su contraseña debe tener al menos 8 caracteres</span>
                </li>
                <li class="pc-register_tips__item">
                  <span class="tip">*</span
                  ><span
                    >Además debe contener MAYÚSCULAS y minúsculas, y algún
                    símbolo como alguno de estos !@#$%^&*()</span
                  >
                </li>
              </ul>
            </el-form-item>
            <el-form-item
              label=""
              prop="agree"
              :rules="[
                {
                  required: true,
                  type: 'array',
                  validator: validateAgree,
                  trigger: ['change', 'blur'],
                },
              ]"
              class="pc-login_form__sms chk"
            >
              <el-checkbox-group v-model="localAgree" @change="onAgreeChange">
                <el-checkbox
                  v-model="formData.agree"
                  label="Policy"
                  name="agree"
                  @change="onCheckChange"
                >
                  <span
                    >Acepto esto
                    <a :href="teamOfUrl" target="_blank">Términos de Uso</a> Y
                    <a :href="privacyPolicy" target="_blank"
                      >Política de Privacidad</a
                    ></span
                  >
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="pc-login_form__btn btn">
              <el-button
                type="primary"
                :loading="loading"
                :disabled="!canSubmit"
                @click="onSubmit('formData')"
                >{{ $t('next') }}</el-button
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
import { login, user } from '@/api/index';
import {
  sensorsMonitor,
  asyncLoadJs,
  getWhiteScreenBaseTime,
} from '@/utils/index.client';
import PcHeaderAdds from '@/components/pc-loan/headerAdds.vue';
import PcMail from '@/components/pc-loan/mailContainer.vue';
import bannerImg from '@/assets/img/invite/banner.png';
import nationalImg from '@/assets/img/invite/national.webp';
import closeImg from '@/assets/img/pc/icon_close@2x.png';
import openImg from '@/assets/img/pc/icon_open@2x.png';
const {
  apiRegister,
  apiVerifySms,
  apiGetSmsCode,
  apiGetEncryptoKeyIv,
  apiGetCaptcha,
} = login;
const { apiGetUserConfig, apiUpdateUserConfig } = user;

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
      isPwd: false,
      isRePwd: false,
      closeImg: closeImg,
      openImg: openImg,
      saSdk: null,
      branchJs: null,
      visible: false,
      customKey: ['.', 'Sure'],
      bannerImg: bannerImg,
      nationalImg: nationalImg,
      errMsg: '',
      sent: false,
      reSend: false,
      loading: false,
      isRight: false,
      formData: {
        agree: false,
        appId: this.$config.appId,
        appName: this.$config.appName,
        appVersion: this.$config.appVersion,
        captcha: '',
        channel: this.$config.registerChannel,
        country: this.$config.areaCode,
        inviteCode: this.$route.query.inviteCode,
        latitude: this.$config.latitude,
        longitude: this.$config.longitude,
        mobile: '',
        password: '',
        rePassword: '',
        registerChannel: this.$config.registerChannel,
        smsCode: '',
      },
      mobile: '',
      jsEncrypt: null,
      key: '',
      iv: '',
      localAgree: [],
      sendLoading: false,
      sendScenes: 'register',
      countDown: 0,
      deviceId: '',
      errNumber: 0,
      isAgree: true,
      isPassword: true,
      isRePassword: true,
      isMobile: true,
      isInviteCode: true,
      isCaptcha: true,
      isSmsCode: true,
      numberList: [],
      imgUrl: '',
      imgLoading: false,
    };
  },
  computed: {
    ...mapGetters(['setting', 'login']),
    appConfig() {
      return this.setting.appConfig;
    },
    facebookUrl() {
      const o = this.appConfig ?? null;
      return (o && o.facebookUrl) || '';
    },
    phoneCount() {
      return this.$config.phoneLength;
    },
    appRegexp() {
      return this.$config.regexp;
    },
    sentMsg() {
      return this.sent
        ? `${this.countDown}S`
        : this.reSend
        ? 'Enviar de nuevo'
        : 'Mandar';
    },
    maxTimeout() {
      return 59;
    },
    countryCode() {
      return this.$config.areaCode;
    },
    teamOfUrl() {
      return (this.appConfig && this.appConfig.termUse) || '';
    },
    privacyPolicy() {
      return (this.appConfig && this.appConfig.privacyPolicy) || '';
    },
    canSubmit() {
      const l = this.formData.agree;
      return l;
    },
    customerId() {
      const o = (this.login && this.login.loginData) ?? '';
      return o.customerId || '';
    },
  },
  created() {},
  mounted() {
    this.jsEncrypt = new JSEncrypt();
    this.jsEncrypt.setPublicKey(this.$publicKey);
    sensorsMonitor().then((_) => {
      this.saSdk = _;
      this.deviceId = _.store.getDistinctId();

      this.sensorsInit(_);
      this.initBranch();
    });
  },
  methods: {
    validateAgree(rule, value, callback) {
      if (value.length < 1) {
        return callback(new Error(this.$t('policyItem')));
      }
      if (!value.includes('Policy')) {
        return callback(new Error(this.$t('requiredPolicy')));
      }
      return callback();
    },
    validatePass(rule, value, callback) {
      const p1 = value.trim();
      if (!p1) {
        return callback(new Error(this.$t('plzInput')));
      }
      if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[\da-zA-Z!@#$%^&*()]{8,16}$/.test(
          p1
        )
      ) {
        return callback(new Error(this.$t('inputError')));
      } else {
        if (this.formData.rePassword !== '') {
          this.$refs.formData.validateField('rePassword');
        }
        callback();
      }

      return callback();
    },
    validatePass2(rule, value, callback) {
      const p2 = value.trim();
      if (!value) {
        return callback(new Error(this.$t('secondPwd')));
      } else if (value !== this.formData.password) {
        return callback(new Error(this.$t('twoPwdNotSame')));
      } else {
        return callback();
      }
    },
    checkMobile(rule, value, callback) {
      const v = value + '';
      this.formData.mobile = v;

      if (v.length > this.phoneCount) {
        // 号码过长
        return callback(new Error(this.$t('mobileErr')));
      }

      if (!(/^[6|7]\d{8}$/ || this.appRegexp).test(v)) {
        // 正则校验失败
        return callback(new Error(this.$t('mobileErr')));
      }
      return callback();
    },
    getImg() {
      if (this.imgLoading) return;
      this.imgLoading = true;
      let captchaObj =
        this.$config.appId || this.formData.mobile || this.deviceId
          ? Object.assign(
              {
                mobile: this.$route.query.phone || this.formData.mobile,
                scenes: this.$route.query.scenes || 'register',
              },
              {
                appId: this.$config.appId,
                appName: this.$config.appName,
                appVersion: this.$config.appVersion,
                registerChannel: this.$config.registerChannel,
                distinctId: this.deviceId,
              }
            )
          : {
              mobile: this.$route.query.phone || this.formData.mobile,
              scenes: this.$route.query.scenes || 'register',
            };
      apiGetCaptcha({ ...captchaObj })
        .then((res) => {
          const blob = new Blob([res], { type: 'image/png' });
          this.imgUrl = (window.URL || window.webkitURL).createObjectURL(blob);
        })
        .finally(() => {
          this.imgLoading = false;
        });
    },
    sensorsInit(saSdk) {
      const curTime = Date.now();
      saSdk.registerPage({
        current_url: window.location.href,
        pagename: 'h5_register',
        appName: this.$config.appName,
      });

      saSdk.quick('autoTrack');
      saSdk.track('h5_register_pageview', {
        load_time: curTime - getWhiteScreenBaseTime(),
      });
    },
    initBranch() {
      let that = this;
      const deepLink = window.location.href;
      // load branch
      asyncLoadJs('https://cdn.branch.io/branch-latest.min.js')
        .then(() => {
          that.branchJs = window.branch;
          // init branch
          that.branchJs.init(that.$config.branchKey, { metadata: deepLink });
          // 记录pv
          that.branchJs.deepview({
            channel: 'mobile_web',
            feature: 'deepview',
            data: {
              custom_bool: true,
              custom_int: Date.now(),
              deeplink: deepLink,
              $deeplink_path: deepLink,
            },
          });
        })
        .catch((err) => {});
    },
    setMonitorData(key, data) {
      // 神策上传
      this.saSdk.track(key, {
        ...data,
      });

      // Branch上传
      if (this.branchJs) {
        this.branchJs.logEvent(key, data);
      }
    },
    async getKeyIv() {
      await apiGetEncryptoKeyIv({ distinctId: this.deviceId })
        .then((_) => {
          const keyIv = this.jsEncrypt.decrypt(_);
          if (keyIv) {
            const parseJson = JSON.parse(keyIv);
            this.key = parseJson.secretKey;
            this.iv = parseJson.iv;
          }
        })
        .catch((_err) => {
          this.loading = false;
        });
    },
    async registerProxy() {
      this.setMonitorData('register');
      await this.getKeyIv();
      const data = aesEncrypt(JSON.stringify(this.formData), this.key, this.iv);
      const encrypted = {
        token: rsaEncrypt(this.key),
        data: data,
        distinctId: this.deviceId,
      };
      apiRegister(encrypted)
        .then((res) => {
          this.$message({
            type: 'success',
            message: this.$t('registerSuccess'),
            duration: 2000,
          });
          this.saSdk.login(res.customerId || '');
          this.setMonitorData('h5_registercomplete');
          this.setMonitorData('register', {
            is_success: true,
            register_type: 'h5',
            invitation_code: this.formData.inviteCode,
          });
          this.proxySuccess(res);
          this.$store.commit('login/reSendCount');
          this.$store.commit('login/setPhoneNumber', {
            phoneNumberObj: {
              [this.formData.mobile]: null,
            },
          });
        })
        .catch((err) => {
          // if (this.formData.captcha) {
          //   proxy.$refs['captchaRef'].init();
          // }
          this.loading = false;
          this.setMonitorData('register', {
            is_success: false,
            register_type: 'h5',
            invitation_code: this.formData.inviteCode,
            message: err.msg || err.message,
          });

          if (err.code === '3006') {
            this.setMonitorData('h5_otpwrong');
          }
          this.setMonitorData('h5_registerfail');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getConfig() {
      apiGetUserConfig({ distinctId: this.deviceId }).then((res) => {
        this.$store.commit('login/setUserConfig', res || null);
      });
    },
    register() {
      const s1 = 1;
      const s2 = 1;
      apiUpdateUserConfig({
        customerId: this.customerId,
        marketingStatus: 1,
        marketingEmailStatus: 1,
      })
        .then(() => {
          if (s1 === 1 || s2 === 1) {
            // this.$toast.success(this.$t('subscribedSuccess'));
            this.getConfig();
          } else {
            // this.$toast.success(this.$t('subscribedFailed'));
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    proxySuccess(res) {
      const data = {};
      for (let i in res) i !== 'token' && (data[i] = res[i]);

      Cookies.set('loan_app_token', `Bearer ${res.token || ''}`);
      sessionStorage.setItem('openPage', '1');
      this.$store.commit('login/setLoginData', {
        mobile: this.formData.mobile,
        ...data,
      });
      const isAgree = this.formData.agree;
      if (isAgree) {
        this.register();
      }

      this.$nextTick(() => {
        // 填写资料后置 登录无需判断是否填写资料 在首页点击时判断
        // const name = res.rewrite === 'Y' && 'UserModify' || 'SysIndex';
        this.$router.push({ name: `UserModify___${this.$i18n.locale}` });
      });
    },
    checkData() {
      const {
        agree,
        password,
        rePassword,
        smsCode,
        mobile,
        inviteCode,
        captcha,
      } = this.formData;

      const p1 = password.trim();
      const p2 = rePassword.trim();

      if (!agree) {
        this.isAgree = false;
      }
      if (!password) {
        this.isPassword = false;
      }
      if (!rePassword) {
        this.isRePassword = false;
      }
      if (!mobile) {
        this.isMobile = false;
      }
      if (!inviteCode) {
        this.isInviteCode = false;
      }
      if (!captcha) {
        this.isCaptcha = false;
      }
      if (!smsCode) {
        this.isSmsCode = false;
      }

      if (
        p1 === '' ||
        p2 === '' ||
        smsCode === '' ||
        mobile === '' ||
        inviteCode === '' ||
        captcha === ''
      ) {
        this.$message({
          type: 'error',
          message: this.$t('plzInput'),
          duration: 2000,
        });
        return false;
      }

      if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[\da-zA-Z!@#$%^&*()]{8,16}$/.test(
          p1
        )
      ) {
        this.$message({
          type: 'error',
          message: this.$t('inputError'),
          duration: 2000,
        });
        return false;
      }
      if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[\da-zA-Z!@#$%^&*()]{8,16}$/.test(
          p2
        )
      ) {
        this.$message({
          type: 'error',
          message: this.$t('inputError'),
          duration: 2000,
        });
        return false;
      }

      if (p1 !== p2) {
        this.$message({
          type: 'error',
          message: this.$t('diffPassword'),
          duration: 2000,
        });
        return false;
      }

      if (!agree) {
        this.$message({
          type: 'error',
          message: this.$t('requiredPolicy'),
          duration: 2000,
        });
        return false;
      }

      return true;
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
    verifyNum(item) {
      const reg = /[^\d]/g;
      const matchRet = this.formData.smsCode
        .toString()
        .replace(reg, '')
        .slice(0, 4);
      this.$nextTick(() => {
        this.formData.smsCode = matchRet;
      });
    },
    onAgreeChange() {
      // 不同意INE协议 不能注册
    },
    onCheckChange(v, label) {
      this.$nextTick(() => {
        if (v) {
          this.formData.agree = true;
        } else {
          this.formData.agree = false;
        }
      });
    },
    onChange(val) {
      const reg = /[^\d]/g;
      const matchRet = this.formData.mobile
        .toString()
        .replace(reg, '')
        .slice(0, 9);
      // const v = val + '';
      this.$nextTick(() => {
        this.formData.mobile = matchRet;
        this.errMsg = '';
        if (matchRet.length > this.phoneCount) {
          // 号码过长
          this.errMsg = this.$t('inputError');
          return;
        }
        if (!this.appRegexp.test(matchRet)) {
          // 正则校验失败
          this.isMobile = true;
          this.isRight = false;
          this.errMsg = this.$t('inputError');
          return;
        } else {
          this.isRight = true;
        }
        if (
          this.formData.mobile &&
          this.formData.mobile.length === this.phoneCount &&
          this.isRight
        ) {
          this.getImg();
        }
      });
    },
    onChangeInviteCode() {},
    onSend(smsType) {
      if (this.sent) return;
      this.setMonitorData('h5_clicksend');
      this.sent = true;

      this.sendLoading = true;
      const send = {
        country: this.formData.country,
        mobile: this.formData.mobile,
        scenes: this.sendScenes,
        // time: parseInt((Date.now() / 1000).toString()),
        // smsType,
        appId: this.$config.appId,
        appName: this.$config.appName,
        appVersion: this.$config.appVersion,
        captcha: this.formData.captcha,
        deviceId: this.deviceId,
        registerChannel: this.$config.registerChannel,
        distinctId: this.deviceId,
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
          this.setMonitorData('h5_otperror');
          this.errNumber++;
        })
        .finally(() => {
          this.sendLoading = false;
        });
    },

    async onSubmit() {
      if (!this.checkData()) return;
      this.setMonitorData('h5_register_click');
      await apiVerifySms({
        country: this.formData.country,
        mobile: this.formData.mobile,
        smsCode: this.formData.smsCode,
        // captcha: captcha,
        appId: this.$config.appId,
      })
        .then((res) => {
          this.$store.commit('login/setSmsCode', this.formData.smsCode);
        })
        .catch(() => {
          // this.loading = false;
        })
        .finally(() => {
          // this.loading = false;
        });
      this.registerProxy();
    },
  },
};
</script>
<style lang="scss">
@import '../index.scss';
.outside {
  &.register {
    height: auto;
    .body {
      height: auto;
    }
  }
  .nut-input-label {
    display: none;
  }
}
</style>
