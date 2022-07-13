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
                data-option="web_dlmobile"
              >
                <span slot="prefix" class="">+34</span>
              </el-input>
            </el-form-item>
            <el-form-item class="pc-login_form__btn">
              <el-button
                type="primary"
                :loading="loading"
                data-option="web_registerlogin_continue"
                @click="onNext('formData')"
                ><span data-option="web_registerlogin_continue">{{
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
import { login } from '@/api/index';
import { mapGetters } from 'vuex';
import PcHeaderAdds from '@/components/pc-loan/headerAdds.vue';
import PcMail from '@/components/pc-loan/mailContainer.vue';

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

const { apiIsRegister, apiGetEncryptoKeyIv } = login;

export default {
  name: 'PcNext',
  components: {
    PcHeaderAdds,
    PcMail,
  },
  data() {
    return {
      canSend: false,
      sent: false,
      loading: false,
      formData: {
        mobile: '',
      },
      countDown: 60,
      key: null,
      iv: null,
      jsEncrypt: null,
      routeQuery: this.$route.query,
    };
  },
  computed: {
    ...mapGetters(['setting', 'login']),
    keyword() {
      return this.routeQuery.kw;
    },
    camp() {
      return this.routeQuery.camp;
    },
    at_gd() {
      return this.routeQuery.at_gd;
    },
    params() {
      return this.routeQuery.params;
    },
    appRegexp() {
      return this.$config.regexp;
    },
    countryCode() {
      return this.$config.country;
    },
    phoneCount() {
      return this.$config.phoneLength;
    },
    sentMsg() {
      return this.sent ? this.countDown : 'Sned';
    },
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    vuexPhone() {
      const o = this.login.loginData;
      return o.mobile || '';
    },
    areaCode() {
      return this.$config.areaCode || '34';
    },
  },
  created() {
    // if (this.$route.query.phone || this.routeQuery.scenes) {
    //   sessionStorage.setItem('nextInfo', JSON.stringify(this.$route.query));
    // }
    // const regInfo = sessionStorage.getItem('nextInfo');
    // this.routeQuery = regInfo ? JSON.parse(regInfo) : {};
  },
  mounted() {
    this.init();
    this.jsEncrypt = new JSEncrypt();
    this.jsEncrypt.setPublicKey(this.$publicKey);
    if (this.keyword) {
      this.$store.commit('login/setKeyWord', this.keyword);
    }
    if (this.camp) {
      this.$store.commit('login/setCamp', this.camp);
    }
    if (this.at_gd) {
      this.$store.commit('login/setAtGd', this.at_gd);
    }
    if (this.params) {
      this.$store.commit(
        'login/setAtGd',
        this.params ? window.atob(decodeURIComponent(this.params)) : ''
      );
    }
  },
  methods: {
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
    init() {
      this.formData.mobile = this.vuexPhone;
    },
    onSend(formName) {
      this.sent = true;
      this.countDown = this.maxTimeout;
      const timer = setInterval(() => {
        this.countDown--;
        if (this.countDown <= 0) {
          clearInterval(timer);
          this.sent = false;
        }
      }, 1000);

      // 此处需判断号码是否已注册
      // 1、如果已注册跳转到(密码/验证码)登录页 登录页中有忘记密码入口
      // 2、未注册则跳转到注册页 设置密码等
    },
    onNext(formName) {
      // 此处校验号码是否合法 校验通过再判断是否注册 跳转到不同页面
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.checkPhone(formName);
        } else {
          this.$message({
            message: this.$t('mobileErr'),
            type: 'error',
            duration: 2000,
          });
          return false;
        }
      });
    },
    async checkPhone(formName) {
      if (this.loading) return;
      this.loading = true;
      await this.getKeyIv();
      const data = aesEncrypt(
        JSON.stringify({
          country: this.countryCode,
          mobile: this.formData.mobile,
        }),
        this.key,
        this.iv
      );
      const encrypted = {
        token: rsaEncrypt(this.key),
        data: data,
      };

      apiIsRegister(encrypted)
        .then((res) => {
          if (res && res.registerFlag) {
            this.$router.push({
              name: `OutsideLogin___${this.$i18n.locale}`,
              query: {
                ...this.routeQuery,
                phone: this.formData.mobile,
                scenes: 'login',
              },
            });
          } else {
            this.$router.push({
              name: `OutsideSms___${this.$i18n.locale}`,
              query: {
                ...this.routeQuery,
                phone: this.formData.mobile,
                scenes: 'register',
              },
            });
          }
          this.$refs[formName].resetFields();
        })
        .finally(() => {
          this.loading = false;
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
        .catch((_err) => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-box {
  overflow: hidden;
  width: 100%;
  height: 100%;

  .box {
    display: flex;
  }
}
</style>
