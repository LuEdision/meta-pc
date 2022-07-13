<template>
  <section class="pc-login">
    <!-- <client-only> -->
    <div class="pc-login_left">
      <div class="pc-login_left__wrapper">
        <pc-header-adds></pc-header-adds>
        <div class="pc-login_form">
          <!-- <client-only> -->
          <div class="pc-login_form__title">Reconfigurar la contraseña</div>
          <el-form ref="formData" :model="formData">
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
              v-if="showImgCode"
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
            <el-form-item class="pc-login_form__btn">
              <el-button
                type="primary"
                :loading="loading"
                @click="onSubmit('formData')"
                >Confirmar</el-button
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

const { apiResetPassword, apiGetEncryptoKeyIv, apiGetCaptcha } = login;

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
      formData: {
        password: '',
        rePassword: '',
        captcha: '',
      },
      sent: false, // 短信是否已发送
      countDown: 0,
      sendLoading: false,
      loading: false,
      key: '',
      iv: '',
      jsEncrypt: null,
      routeQuery: this.$route.query,
      isPwd: false,
      isRePwd: false,
      closeImg: closeImg,
      openImg: openImg,
      imgLoading: false,
    };
  },
  computed: {
    ...mapGetters(['setting', 'login']),
    showImgCode() {
      return false; // 仅密码登录需要
    },
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    sentMsg() {
      return this.sent ? `${this.countDown}S` : 'Sned';
    },
    countryCode() {
      return this.$config.areaCode;
    },
    phoneNumber() {
      return this.routeQuery.phone || '';
    },
    maxTimeout() {
      return 59;
    },
  },
  created() {
    // if (this.$route.query.phone || this.routeQuery.scenes) {
    //   sessionStorage.setItem('fgInfo', JSON.stringify(this.$route.query));
    // }
    // const regInfo = sessionStorage.getItem('fgInfo');
    // this.routeQuery = regInfo ? JSON.parse(regInfo) : {};
  },
  mounted() {
    this.jsEncrypt = new JSEncrypt();
    this.jsEncrypt.setPublicKey(this.$publicKey);
  },
  methods: {
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
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onProxy();
        } else {
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
    async onProxy() {
      await this.getKeyIv();
      const data = aesEncrypt(
        JSON.stringify({
          country: this.countryCode,
          mobile: this.phoneNumber,
          smsCode: this.login.smsCode,
          password: this.formData.password.trim(),
          rePassword: this.formData.rePassword.trim(),
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
      apiResetPassword(encrypted)
        .then((res) => {
          this.$message({
            type: 'success',
            message: this.$t('fixPwdSuccess'),
            duration: 2000,
          });
          this.$store.commit('login/reSendCount');
          this.$store.commit('login/setPhoneNumber', {
            phoneNumberObj: {
              [this.phoneNumber]: null,
            },
          });
          const data = {};
          for (let i in res) {
            i !== 'token' && (data[i] = res[i]);
          }
          this.$store.commit('login/setLoginData', {
            mobile: this.phoneNumber,
            ...data,
          });
          const cookies = Cookies.get();
          const keys = Object.keys(cookies);
          for (const key of keys) {
            Cookies.remove(key);
          }
          sessionStorage.clear();
          localStorage.clear();
          this.$router.push({ name: `OutsideNext___${this.$i18n.locale}` });
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
  },
};
</script>
<style lang="scss">
.forget-layout {
  .form-item {
    display: flex;
    flex-flow: row;
  }
}
</style>
