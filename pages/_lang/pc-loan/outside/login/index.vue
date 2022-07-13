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
              class="pc-login_form__sms pwd"
              prop="password"
              label=""
              :rules="[
                {
                  required: true,
                  message: 'Por favor, ingrese contraseña',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="formData.password"
                :type="isPwd ? 'text' : 'password'"
                placeholder="Ingresa tu contraseña"
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
              v-if="showImgCode"
              class="pc-login_form__sms"
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
              <el-input
                v-model="formData.captcha"
                maxlength="4"
                :placeholder="$t('imgCode')"
              >
                <div slot="append" class="pic-code">
                  <img :src="imgUrl" alt="" />
                  <span class="el-icon-refresh" @click="getImg"></span>
                </div>
              </el-input>
            </el-form-item>
            <el-form-item class="pc-login_form__sms" label="">
              <div class="reset-pwd">
                <span data-option="web_reset_pwd" @click="resetPwd"
                  >Olvidaste la contraseña?</span
                >
              </div>
            </el-form-item>
            <el-form-item class="pc-login_form__btn">
              <div
                class="forget-pwd"
                data-option="web_forget_pwd"
                @click="forgetPwd"
              >
                <span data-option="web_forget_pwd"
                  >Iniciar sesión por código de verificación</span
                >
              </div>
              <el-button
                type="primary"
                :loading="loading"
                data-option="web_pwd_login"
                @click="onLogin('formData')"
                ><span data-option="web_pwd_login">{{
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
import closeImg from '@/assets/img/pc/icon_close@2x.png';
import openImg from '@/assets/img/pc/icon_open@2x.png';
const { apiPwdLogin, apiGetEncryptoKeyIv, apiGetCaptcha } = login;
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
  name: 'PcLogin',
  components: {
    PcHeaderAdds,
    PcMail,
  },
  data() {
    return {
      isPwd: false,
      closeImg: closeImg,
      openImg: openImg,
      canSend: false,
      loading: false,
      formData: {
        mobile: '',
        password: '',
        captcha: '',
      },
      jsEncrypt: null,
      key: '',
      iv: '',
      routeQuery: this.$route.query,
      imgLoading: false,
      imgUrl: null,
    };
  },
  computed: {
    ...mapGetters(['setting', 'login']),
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    showImgCode() {
      const { sendCount, MaxPassCount } = this.login;
      return (this.phoneNumberObj[this.routeQuery.phone] ?? 0) >= MaxPassCount;
    },
    phoneNumber() {
      return this.routeQuery.phone || '';
    },
    countryCode() {
      return this.$config.areaCode;
    },
    phoneNumberObj() {
      return this.login.phoneNumberObj;
    },
  },
  created() {
    // this.$store.commit('login/setPhoneNumber', {
    //   phoneNumberObj: {
    //     [this.phoneNumber]: null,
    //   },
    // });
    // if (this.$route.query.phone || this.routeQuery.scenes) {
    //   sessionStorage.setItem('logInfo', JSON.stringify(this.$route.query));
    // }
    // const regInfo = sessionStorage.getItem('logInfo');
    // this.routeQuery = regInfo ? JSON.parse(regInfo) : {};
  },
  mounted() {
    this.jsEncrypt = new JSEncrypt();
    this.jsEncrypt.setPublicKey(this.$publicKey);
    if (this.showImgCode) {
      this.getImg();
    }
  },
  methods: {
    resetPwd() {
      this.$router.push({
        name: `OutsideSms___${this.$i18n.locale}`,
        query: {
          ...this.routeQuery,
          scenes: 'resetPassword',
        },
      });
    },
    forgetPwd() {
      this.$router.push({
        name: `OutsideLogin2___${this.$i18n.locale}`,
        query: this.routeQuery,
      });
    },
    getImg() {
      if (this.imgLoading) return;
      this.imgLoading = true;

      apiGetCaptcha({
        mobile: this.phoneNumber,
        scenes: this.routeQuery.scenes || 'login',
      })
        .then((res) => {
          const blob = new Blob([res], { type: 'image/png' });
          this.imgUrl = (window.URL || window.webkitURL).createObjectURL(blob);
        })
        .finally(() => {
          this.imgLoading = false;
        });
    },
    proxySuccess(res) {
      // 保存vuex
      const data = {};
      for (let i in res) i !== 'token' && (data[i] = res[i]);
      this.$store.commit('login/setLoginData', {
        mobile: this.phoneNumber,
        ...data,
      });

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
              this.$router.push({ path: '/sys' });
            });
          });
        return;
      }
      Cookies.set('loan_app_token', `Bearer ${res.token || ''}`);
      this.$nextTick(() => {
        // 填写资料后置 登录无需判断是否填写资料 在首页点击时判断
        // const name = res.rewrite === 'Y' && 'UserModify' || 'SysIndex';
        this.$router.push({ path: '/sys' });
      });
    },
    async onLogin(formName) {
      const p1 = this.formData.password.trim();
      const c1 = this.formData.captcha.trim();
      if (this.loading) return;
      this.loading = true;

      await this.getKeyIv();
      const data = aesEncrypt(
        JSON.stringify({
          country: this.countryCode,
          mobile: this.phoneNumber,
          password: p1,
          captcha: c1 ?? null,
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiPwdLogin(encrypted)
            .then((res) => {
              this.proxySuccess(res);
              sessionStorage.setItem('openPage', '1');
              this.$store.commit('login/setPhoneNumber', {
                phoneNumberObj: {
                  [this.phoneNumber]: null,
                },
              });
            })
            .catch((err) => {
              this.$store.commit('login/setPhoneNumber', {
                phoneNumberObj: {
                  [this.phoneNumber]:
                    (this.phoneNumberObj[this.phoneNumber] ?? 0) + 1,
                },
              });
              this.$store.commit('login/setSendCount');
              if (err && (err.code === '10003' || err.code === '10002')) {
                this.$store.commit('login/setPhoneNumber', {
                  phoneNumberObj: {
                    [this.phoneNumber]:
                      (this.phoneNumberObj[this.phoneNumber] ?? 0) + 1,
                  },
                });
              }
              if (this.showImgCode) {
                this.getImg();
              }
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          if (!p1) {
            this.$message({
              type: 'warning',
              message: 'La contraseña no puede estar en blanco',
              duration: 2000,
            });
          }
          if (this.showImgCode && !c1) {
            this.$message({
              type: 'warning',
              message: 'El código de verificación gráfico no puede estar vacío',
              duration: 2000,
            });
          }
          this.loading = false;
          return false;
        }
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
  },
};
</script>
