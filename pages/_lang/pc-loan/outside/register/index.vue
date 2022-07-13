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
                data-option="web_setpassword"
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
                placeholder="Vuelva a escribir su contraseña"
                autocomplete="off"
                data-option="web_reenterpassword"
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
                data-option="web_enter_invitecode"
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
            <el-form-item class="pc-login_form__btn btn">
              <el-button
                type="primary"
                :loading="loading"
                :disabled="!canSubmit"
                data-option="web_register_click"
                @click="onSubmit('formData')"
                ><span data-option="web_register_click">{{
                  $t('next')
                }}</span></el-button
              >
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
              <el-checkbox-group
                v-model="formData.agree"
                @change="onAgreeChange"
              >
                <el-checkbox label="SMS" name="agree">
                  <span>
                    Deseo y acepto recibir comunicaciones comerciales y ofertas
                    adaptadas a mis intereses relevantes para el producto
                    ofrecido por RIVENDELL TECHNOLOGY, S.L.U. y las empresas del
                    Grupo.
                  </span>
                </el-checkbox>
                <el-checkbox label="INE" name="agree" @change="selectThirdPart">
                  <span>
                    He leído, entiendo y acepto:
                    <a :href="secci" target="_blank" class="link"
                      >Información Europea Normalizada del Contrato</a
                    >
                    (INE) (debe dar su consentimiento).
                  </span>
                </el-checkbox>
                <el-checkbox
                  label="Policy"
                  name="agree"
                  @change="selectUseAndPolicy"
                >
                  <span>
                    He leído, entiendo y acepto (debe consentir el este
                    apartado) el Aviso Legal, los
                    <a
                      :href="
                        teamOfUrl || 'https://website.es/terms-of-use/app'
                      "
                      target="_blank"
                      class="link"
                      >Términos y Condiciones</a
                    >, la
                    <a
                      :href="
                        privacyPolicy ||
                        'https://website.es/privacy-policy/app'
                      "
                      target="_blank"
                      class="link"
                      >Política de Privacidad</a
                    >
                    y consiento que mis datos personales sean tratados de
                    acuerdo con el Aviso Legal, los
                    <a
                      :href="
                        teamOfUrl || 'https://website.es/terms-of-use/app'
                      "
                      target="_blank"
                      class="link"
                      >Términos y Condiciones</a
                    >
                    y la
                    <a
                      :href="
                        privacyPolicy ||
                        'https://website.es/privacy-policy/app'
                      "
                      target="_blank"
                      class="link"
                      >Términos y Condiciones</a
                    >.
                  </span>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="" label="" class="pc-login_form__sms desc">
              <ul class="pc-register_tips">
                <li class="pc-register_tips__item">
                  <div class="title">Información básica de RIVENDELL</div>
                  <span class="content"
                    >TECHNOLOGY, S.L.U. sobre protección de datos de carácter
                    personal</span
                  >
                </li>
                <li class="pc-register_tips__item">
                  <div class="title">Responsable del tratamiento</div>
                  <span class="content">RIVENDELL TECHNOLOGY, S.L.U.</span>
                </li>
                <li class="pc-register_tips__item">
                  <div class="title">Finalidad</div>
                  <span class="content"
                    >Tramitar su solicitud de préstamo, así como desarrollar un
                    perfil de usuario que será objeto de decisiones
                    automatizadas.
                    <a class="link" :href="homeUrl" target="_blank"
                      >Ver más información.</a
                    ></span
                  >
                </li>
                <li class="pc-register_tips__item">
                  <div class="title">Legitimación</div>
                  <span class="content"
                    >Ejecución del contrato de préstamo.
                    <a class="link" :href="homeUrl" target="_blank"
                      >Ver más información.</a
                    ></span
                  >
                </li>
                <li class="pc-register_tips__item">
                  <div class="title">Destinatarios</div>
                  <span class="content"
                    >Transferencia internacional de datos personales.
                    <a class="link" :href="homeUrl" target="_blank"
                      >Ver más información.</a
                    ></span
                  >
                </li>
                <li class="pc-register_tips__item">
                  <div class="title">Derechos</div>
                  <span class="content"
                    >Usted tiene derecho de acceso, rectificación, supresión,
                    limitación, portabilidad y oposición, así como otros
                    derechos.
                    <a class="link" :href="homeUrl" target="_blank"
                      >Ver más información.</a
                    ></span
                  >
                </li>
                <li class="pc-register_tips__item">
                  <div class="title">
                    Información adicional: Puede encontrar
                  </div>
                  <span class="content"
                    >Información más detallada en nuestra
                    <a
                      class="link"
                      :href="
                        privacyPolicy ||
                        'https://website.es/privacy-policy/app'
                      "
                      target="_blank"
                    ></a
                    >Política de privacidad.</span
                  >
                </li>
              </ul>
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
    <el-dialog
      title="RIVENDELL TECHNOLOGY usa cookies propias y de terceros"
      :visible.sync="acceptShow"
      width="50%"
      top="30vh"
      center
    >
      <p class="content">
        En caso de que no esté de acuerdo y no acepte el Aviso Legal,
        <a
          :href="teamOfUrl || 'https://website.es/terms-of-use/app'"
          target="_blank"
          rel="noopener noreferrer"
          >los Términos y Condiciones</a
        >,
        <a :href="privacyPolicy" target="_blank" rel="noopener noreferrer"
          >la Política de Privacidad</a
        >, así como la
        <a :href="secci" target="_blank" rel="noopener noreferrer"
          >Información Europea Normalizada del Contrato (INE)</a
        >, RIVENDELL TECHNOLOGY, S.L.U. no podrá prestarle ningún servicio, por
        lo que saldrá de esta APP de forma inmediata.
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onAcceptCancel">No acepto</el-button>
        <el-button type="primary" @click="onAcceptOk">Acepto</el-button>
      </span>
    </el-dialog>
    <div
      id="registerSuccess"
      style="display: none"
      data-option="web_complete_registretion"
    ></div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import Cookies from 'js-cookie';
import { login, user } from '@/api/index';
import PcHeaderAdds from '@/components/pc-loan/headerAdds.vue';
import PcMail from '@/components/pc-loan/mailContainer.vue';
import closeImg from '@/assets/img/pc/icon_close@2x.png';
import openImg from '@/assets/img/pc/icon_open@2x.png';
const { apiRegister, apiGetEncryptoKeyIv, apiGetCaptcha } = login;
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
      formData: {
        password: '',
        rePassword: '',
        inviteCode: '',
        agree: [],
        captcha: '',
      },
      loading: false,
      imgLoading: false,
      acceptShow: false,
      sendLoading: false,
      sent: false,
      countDown: 0,
      localAgree: '', // 记录下当前的变化checkbox
      marketingStatus: false,
      marketingEmailStatus: false,
      key: '',
      iv: '',
      jsEncrypt: null,
      routeQuery: this.$route.query,
      imgUrl: '',
    };
  },
  computed: {
    ...mapGetters(['setting', 'login']),
    appConfig() {
      return this.setting.appConfig;
    },
    showImgCode() {
      return false; // 仅密码登录需要
      // const { sendCount, MaxPassCount } = this.login;
      // return sendCount >= MaxPassCount;
    },
    facebookUrl() {
      const o = this.appConfig ?? null;
      return (o && o.facebookUrl) || '';
    },
    phoneNumber() {
      return this.routeQuery.phone || '';
    },
    scenes() {
      return this.routeQuery.scenes || 'login';
    },
    sentMsg() {
      return this.sent ? `${this.countDown}S` : 'Sned';
    },
    maxTimeout() {
      return 59;
    },
    countryCode() {
      return this.$config.areaCode;
    },
    secci() {
      return location.origin + '/secci/app';
    },
    teamOfUrl() {
      return (this.appConfig && this.appConfig.termUse) || '';
    },
    privacyPolicy() {
      return (this.appConfig && this.appConfig.privacyPolicy) || '';
    },
    homeUrl() {
      return (this.appConfig && this.appConfig.webUrl) || '';
    },
    smsCode() {
      return this.login && this.login.smsCode;
    },
    canSubmit() {
      const l = this.formData.agree;
      return l.includes('INE') && l.includes('Policy');
    },

    userConfig() {
      return (this.login && this.login.userConfig) ?? null;
    },
    customerId() {
      const o = (this.login && this.login.loginData) ?? '';
      return o.customerId || '';
    },
    keyword() {
      return this.login.keyword;
    },
    camp() {
      return this.login.camp;
    },
    params() {
      return this.login.params;
    },
  },
  created() {
    // this.getImg();
    // if (this.$route.query.phone) {
    //   sessionStorage.setItem('regInfo', JSON.stringify(this.$route.query));
    // }
    // const regInfo = sessionStorage.getItem('regInfo');
    // this.routeQuery = regInfo ? JSON.parse(regInfo) : {};
  },
  mounted() {
    this.jsEncrypt = new JSEncrypt();
    this.jsEncrypt.setPublicKey(this.$publicKey);
  },
  methods: {
    selectThirdPart(value) {
      this.localAgree = 'INE';
      if (!value) {
        this.acceptShow = true;
      }
    },
    selectUseAndPolicy(value) {
      this.localAgree = 'Policy';
      if (!value) {
        this.acceptShow = true;
      }
    },
    validateAgree(rule, value, callback) {
      if (value.length < 1) {
        return callback(new Error(this.$t('policyItem')));
      }
      if (!value.includes('INE') || !value.includes('Policy')) {
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
    onBack() {
      this.$router.back();
    },
    onAcceptOk() {
      const v = this.localAgree;
      this.formData.agree = [...this.formData.agree, v];
      this.acceptShow = false;
    },
    onAcceptCancel() {
      const { agree } = this.formData;
      const v = this.localAgree;
      const index = agree.indexOf(v);
      if (index >= 0) {
        agree.splice(index, 1);
      }
      this.acceptShow = false;
    },
    onAgreeChange(value) {
      // 不同意INE协议 不能注册
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
    async registerProxy() {
      await this.getKeyIv();
      const data = aesEncrypt(
        JSON.stringify({
          country: this.$config.areaCode,
          latitude: this.$config.latitude,
          longitude: this.$config.longitude,
          mobile: this.phoneNumber,
          registerChannel: this.params || this.$config.registerChannel,
          adChannel: this.camp,
          channel: 'web',
          smsCode: this.smsCode,
          inviteCode: this.formData.inviteCode,
          password: this.formData.password.trim(),
          rePassword: this.formData.rePassword.trim(),
        }),
        this.key,
        this.iv
      );
      const encrypted = {
        token: rsaEncrypt(this.key),
        data: data,
      };
      apiRegister(encrypted)
        .then((res) => {
          this.$message({
            type: 'success',
            message: this.$t('registerSuccess'),
            duration: 20000,
          });
          this.$store.commit('login/reSendCount');
          this.$store.commit('login/setPhoneNumber', {
            phoneNumberObj: {
              [this.phoneNumber]: null,
            },
          });
          // eslint-disable-next-line no-undef
          fbq('track', 'CompleteRegistration');
          const ev = new Event('click', {
            bubbles: true,
            cancelable: true,
            composed: true,
          });

          const ele = document.querySelector('#registerSuccess');
          ele && ele.dispatchEvent(ev);
          this.proxySuccess(res);
        })
        .catch(() => {
          if (this.showImgCode) {
            this.$refs['captchaRef'].init();
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.registerProxy();
        } else {
          return false;
        }
      });
    },
    proxySuccess(res) {
      const data = {};
      for (let i in res) {
        i !== 'token' && (data[i] = res[i]);
      }

      Cookies.set('loan_app_token', `Bearer ${res.token || ''}`);
      sessionStorage.setItem('openPage', '1');
      this.$store.commit('login/setLoginData', {
        mobile: this.phoneNumber,
        ...data,
      });
      const l = this.formData.agree;
      if (l.includes('INE') && l.includes('SMS')) {
        this.register();
      }

      this.$nextTick(() => {
        // 填写资料后置 登录无需判断是否填写资料 在首页点击时判断
        // const name = res.rewrite === 'Y' && 'UserModify' || 'SysIndex';
        this.$router.push({ name: `UserModify___${this.$i18n.locale}` });
      });
    },
    getConfig() {
      apiGetUserConfig().then((res) => {
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
