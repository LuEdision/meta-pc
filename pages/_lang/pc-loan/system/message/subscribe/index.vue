<template>
  <!-- 订阅信息 -->
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <section class="account-usable">
            <div class="account-title">Suscripción</div>
            <div class="account-list">
              <div class="account-list-item">
                <div class="account-custom">
                  <div class="account-item_title">
                    <span class="m-collapse-title_text">
                      {{ $t('subscribeSms') }}
                    </span>
                    <div class="account-item_content">
                      <span class="m-collapse-title_url"> </span>
                    </div>
                    <div class="account-footer">
                      <el-switch
                        v-model="marketingStatus"
                        :disabled="loading"
                        active-color="#13ce66"
                        @change="onFix($event, 1)"
                      ></el-switch>
                    </div>
                  </div>
                </div>
              </div>
              <div class="account-list-item">
                <div class="account-custom">
                  <div class="account-item_title">
                    <span class="m-collapse-title_text">
                      {{ $t('subscribeMail') }}
                    </span>
                    <div class="account-item_content">
                      <span class="m-collapse-title_url"> </span>
                    </div>
                    <div class="account-footer">
                      <el-switch
                        v-model="marketingEmailStatus"
                        :disabled="loading"
                        active-color="#13ce66"
                        @change="onFix($event, 2)"
                      ></el-switch>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="pc-sys-right">
          <pc-mail :mail-info="facebookUrl"></pc-mail>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang>
import { mapGetters } from 'vuex';
import { user } from '@/api/index';
import PcMail from '@/components/pc-loan/mailContainer.vue';
const { apiGetUserConfig, apiUpdateUserConfig } = user;
export default {
  components: { PcMail },
  data() {
    return {
      marketingStatus: false,
      marketingEmailStatus: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['login', 'setting']),
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    userConfig() {
      return this.login.userConfig;
    },
    customerId() {
      const o = this.login.loginData;
      return o.customerId || '';
    },
  },
  mounted() {
    this.getConfig();
  },
  methods: {
    getConfig() {
      apiGetUserConfig().then((res) => {
        this.$store.commit('login/setUserConfig', res || null);

        this.$nextTick(() => {
          this.init();
        });
      });
    },
    init() {
      const o = this.userConfig;
      this.marketingStatus = o.marketingStatus === 1;
      this.marketingEmailStatus = o.marketingEmailStatus === 1;
    },
    onFix(val, index) {
      if (this.loading) return;
      this.loading = true;
      const s1 = this.marketingStatus;
      const s2 = this.marketingEmailStatus;
      apiUpdateUserConfig({
        customerId: this.customerId,
        marketingStatus: s1 ? 1 : 0,
        marketingEmailStatus: s2 ? 1 : 0,
      })
        .then(() => {
          if (index === 1) {
            if (s1) {
              this.$message({
                type: 'success',
                message: this.$t('subscribedSmsOpen'),
                duration: 2000,
              });
            } else {
              this.$message({
                type: 'success',
                message: this.$t('subscribedSmsClose'),
                duration: 2000,
              });
            }
          } else {
            if (s2) {
              this.$message({
                type: 'success',
                message: this.$t('subscribedMailOpen'),
                duration: 2000,
              });
            } else {
              this.$message({
                type: 'success',
                message: this.$t('subscribedMailClose'),
                duration: 2000,
              });
            }
          }
        })
        .finally(() => {
          this.getConfig();
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
