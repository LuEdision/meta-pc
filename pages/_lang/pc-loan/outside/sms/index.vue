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
                data-option="web_enter_otp"
                @input="verifyNum"
              >
                <div
                  slot="append"
                  :class="[
                    'pc-login_form__append',
                    { active: sent ? true : false },
                  ]"
                  :disabled="sent"
                  :data-option="
                    !reSend ? 'web_register_smsotp' : 'web_register_clickresend'
                  "
                  @click="onSend(1)"
                >
                  <span
                    :data-option="
                      !reSend
                        ? 'web_register_smsotp'
                        : 'web_register_clickresend'
                    "
                    >{{ sentMsg }}</span
                  >
                </div>
              </el-input>
            </el-form-item>
            <el-form-item class="pc-login_form__notice">
              <div class="pc-login_form__voice">
                Ingresa Código de verificación que te hemos enviado a
                <span class="pc-login_form__mobile"> {{ phoneNumber }} </span
                ><span class="pc-login_form__qa">¿No llegó el código? </span
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
                v-show="sendScenes !== 'logout'"
                type="primary"
                :loading="loading"
                :data-option="
                  sendScenes === 'register'
                    ? 'web_register_first'
                    : 'web_reset_pwd'
                "
                @click="onSubmit('formData')"
                ><span
                  :data-option="
                    sendScenes === 'register'
                      ? 'web_register_first'
                      : 'web_reset_pwd'
                  "
                  >{{ $t('next') }}</span
                ></el-button
              >
              <el-button
                v-show="sendScenes === 'logout'"
                type="primary"
                :loading="loading"
                :data-option="
                  sendScenes === 'register'
                    ? 'web_register_first'
                    : 'web_reset_pwd'
                "
                @click="onSubmit('formData')"
                ><span
                  :data-option="
                    sendScenes === 'register'
                      ? 'web_register_first'
                      : 'web_reset_pwd'
                  "
                  >{{ $t('next') }}</span
                ></el-button
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
import PcHeaderAdds from '@/components/pc-loan/headerAdds.vue';
import PcMail from '@/components/pc-loan/mailContainer.vue';
import { login } from '@/api/index';
const { apiGetSmsCode, apiVerifySms } = login;
export default {
  name: 'PcSms',
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
        smsCode: null,
        captcha: '',
      },
      routeQuery: this.$route.query,
      smsType: 1,
    };
  },
  computed: {
    ...mapGetters(['setting', 'login']),
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    phoneNumberObj() {
      return this.login.phoneNumberObj;
    },
    showImgCode() {
      const { sendCount, MaxPassCount } = this.login;
      return (this.phoneNumberObj[this.routeQuery.phone] ?? 0) >= MaxPassCount;
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
    lastRoute() {
      // 上一页的route
      const r = this.router.getRoutes();
      const len = r.length;

      return (len > 0 && r[len - 1]) || null;
    },
    lastPath() {
      const r = this.lastRoute;
      return (r && r.path) || '';
    },
    isNextPath() {
      // 上一页是验证码输入
      return (
        this.lastPath === '/pc/outside' || this.lastPath === '/pc/outside/next'
      );
    },
    sendScenes() {
      return this.routeQuery.scenes || '';
    },
  },
  created() {
    // if (this.$route.query.phone || this.routeQuery.scenes) {
    //   sessionStorage.setItem('smsInfo', JSON.stringify(this.$route.query));
    // }
    // const regInfo = sessionStorage.getItem('smsInfo');
    // this.routeQuery = regInfo ? JSON.parse(regInfo) : {};
    // this.onSend(1); // 默认发送验证码
  },
  mounted() {
    // 需判断是否从上一页面登录进来 如果是上一页面则直接发送短信验证码
    const ev = new Event('click', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    const ele = document.querySelector('.pc-login_form__append');
    ele && ele.dispatchEvent(ev);
    this.$store.commit('login/setPhoneNumber', {
      phoneNumberObj: {
        [this.phoneNumber]: null,
      },
    });
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
    onSend(smsType = 1 || '1') {
      if (this.sent) return;
      this.sent = true;

      this.sendLoading = true;
      this.smsType = smsType;
      const send = {
        country: this.countryCode,
        mobile: this.phoneNumber,
        scenes: this.sendScenes,
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
          this.$message({
            type: 'error',
            message: this.$t('codeErr'),
            duration: 2000,
          });
          this.sent = false;
          this.reSend = true;
        })
        .finally(() => {
          this.sendLoading = false;
        });
    },
    onSubmit(formName) {
      const { smsCode, captcha } = this.formData;
      if (this.loading) return;
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiVerifySms({
            country: this.countryCode,
            mobile: this.phoneNumber,
            smsCode: smsCode,
            // captcha: captcha,
            appId: this.$config.appId,
            notify: false,
          })
            .then((res) => {
              this.$store.commit('login/setSmsCode', smsCode);
              let name = '';
              if (this.sendScenes === 'register') {
                // 验证成功 跳转到注册页面
                name = `OutsideRegister___${this.$i18n.locale}`;
              } else if (this.sendScenes === 'resetPassword') {
                name = `OutsideForget___${this.$i18n.locale}`;
              } else if (this.sendScenes === 'logout') {
                name = `SysMessageWaitLogout___${this.$i18n.locale}`;
              }
              this.loading = false;
              this.$router.push({
                name: name,
                query: this.routeQuery,
              });
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message:
                  this.smsType == 1 ? this.$t('smsError') : this.$t('voiceErr'),
                duration: 2000,
              });
              // this.commit('login/setPhoneNumber', {
              //   phoneNumberObj: {
              //     [this.phoneNumber]:
              //       (this.phoneNumberObj[this.phoneNumber] ?? 0) + 1,
              //   },
              // });
              this.loading = false;
            })
            .finally(() => {
              this.loading = false;
              this.$refs[formName].resetFields();
            });
        } else {
          this.$message({
            message: this.$t('smsError'),
            type: 'error',
            duration: 2000,
          });
          setTimeout(() => {
            this.loading = false;
          }, 2000);

          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss"></style>
