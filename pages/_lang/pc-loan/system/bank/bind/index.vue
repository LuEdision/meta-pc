<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <div class="bank-bind">
            <div class="bank-bind-title">Cuenta bancaria</div>
            <p class="bank-bind-label">
              Número de cuenta corriente IBAN <span class="red">*</span>
            </p>
            <div class="bank-bind-form">
              <el-input
                v-if="!readonly"
                v-model="accountNumber"
                maxlength="22"
                placeholder="22 digitos"
                data-option="web_click_bankcard"
              >
                <template slot="prepend">{{ countryCode }}</template>
              </el-input>
              <el-autocomplete
                v-else
                v-model="accountNumber"
                :fetch-suggestions="querySearchAsync"
                placeholder="22 digitos"
                readonly
                data-option="web_click_bankcard"
                @select="handleSelect"
              >
                <template slot="prepend">{{ countryCode }}</template>
              </el-autocomplete>
            </div>
            <p class="bank-bind-desc">
              Introduce la cuenta en la que recibes tus ingresos mensuales. Aquí
              es donde enviaremos tu dinero.
            </p>

            <div class="bank-bind-btn">
              <el-button
                type="primary"
                :loading="loading"
                data-option="web_submit_bank_info"
                @click="onAdd"
                ><span data-option="web_submit_bank_info">{{
                  $t('confirm')
                }}</span></el-button
              >
            </div>
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
import { mapGetters } from 'vuex';
import { bank } from '@/api/index';
import PcMail from '@/components/pc-loan/mailContainer.vue';
const { apiBindAccount, apiGetOpenBankAccountList } = bank;
export default {
  components: {
    PcMail,
  },
  data() {
    return {
      timeout: null,
      accountNumber: '',
      loading: false,
      isVisible: false,
      menuItems: [],
      readonly: false,
      scenes: this.$route.query.from || 'info',
      backName: this.$route.query.back || 'SysBankAccount', // 添加成功后返回的地址name
    };
  },
  computed: {
    ...mapGetters(['setting']),
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    countryCode() {
      const o = this.setting.appConfig;
      return o.country || 'ES';
    },
  },
  created() {
    // if (this.$route.query.from) {
    //   sessionStorage.setItem('bindFrom', this.scenes);
    // }
    // if (this.$route.query.back) {
    //   sessionStorage.setItem('bindBack', this.backName);
    // }
  },
  mounted() {
    this.getOpenBankList();
  },

  methods: {
    querySearchAsync(queryString, cb) {
      var menuItems = this.menuItems;
      var results = queryString ? menuItems : menuItems;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    getOpenBankList() {
      apiGetOpenBankAccountList()
        .then((_) => {
          this.menuItems = _.length
            ? _.map((item) => {
                return {
                  value: item,
                  label: item,
                };
              })
            : [];
          if (this.menuItems.length) {
            this.readonly = true;
          }
        })
        .catch((_err) => {});
    },
    handleSelect(item) {
      this.accountNumber = item.value.replace(/es.*?/gi, '');
    },
    switchActionSheet() {
      this.isVisible = !this.isVisible && this.menuItems.length > 0;
    },
    onClose() {},
    onAdd() {
      const n = this.accountNumber + '';
      if (n.length === 0) {
        this.$message({
          type: 'error',
          message: this.$t('plzInput'),
          duration: 2000,
        });
        return;
      }
      if (!/^\d{22}$/.test(n)) {
        this.$message({
          type: 'error',
          message: this.$t('inputError'),
          duration: 2000,
        });
        return;
      }

      if (this.loading) return;
      this.loading = true;
      const bindFrom = sessionStorage.getItem('bindFrom');
      apiBindAccount({
        accountNumber: this.countryCode + n,
        scenes: bindFrom || this.scenes,
      })
        .then((res) => {
          this.$message({
            type: 'success',
            message: this.$t('oprSuccess'),
            duration: 2000,
          });
          const backName = sessionStorage.getItem('bindBack');
          this.$router.push({
            name: `${backName || this.backName}___${this.$i18n.locale}`,
            query: {
              from: bindFrom || this.scenes,
            },
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
