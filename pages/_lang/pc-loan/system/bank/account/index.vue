<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <section class="account-usable">
            <div class="account-title">Cuenta bancaria</div>
            <div class="account-list">
              <div
                v-for="(item, index) in accountList"
                :key="index"
                class="account-list-item"
              >
                <div class="account-custom">
                  <div class="account-item_title">
                    <div class="account-item_money">
                      {{ getBankName(item) }}
                    </div>
                    <el-button
                      v-if="accountList.length > 1"
                      plain
                      type="primary"
                      @click="onUnbind(item)"
                      >{{ $t('unbind') }}</el-button
                    >
                  </div>

                  <div class="account-item_content">
                    <div class="account-card"><img :src="cardImg" /></div>
                    <span class="account-item_date">{{ getNumber(item) }}</span>
                  </div>
                  <div v-if="item && item.paymentCode" class="binding-channel">
                    <img :src="formatType(item.paymentCode)" alt="Mib" />
                  </div>
                </div>
              </div>
              <div
                class="account-list-item add"
                data-option="web_click_account"
                @click="onAddAccount"
              >
                <el-button
                  type="text"
                  data-option="web_click_account"
                  icon="el-icon-plus"
                  ><span data-option="web_click_account"
                    >Añadir más</span
                  ></el-button
                >
              </div>
            </div>
          </section>
          <section class="account-usable">
            <div class="account-title">Tarjeta bancaria</div>
            <div class="account-list">
              <div
                v-for="(item, index) in cardList"
                :key="index"
                class="account-list-item"
              >
                <div class="account-custom">
                  <div class="account-item_title">
                    <div class="account-item_money">
                      {{ getBankName(item, true) }}
                    </div>
                    <el-button
                      v-if="cardList.length > 1"
                      plain
                      type="primary"
                      @click="onUnbind(item, true)"
                      >{{ $t('unbind') }}</el-button
                    >
                  </div>

                  <div class="account-item_content">
                    <div class="account-card"><img :src="cardImg" /></div>
                    <span class="account-item_date">{{
                      getNumber(item, true)
                    }}</span>
                  </div>
                  <div v-if="item && item.paymentCode" class="binding-channel">
                    <img :src="formatType(item.paymentCode)" alt="Mib" />
                  </div>
                </div>
              </div>
              <div
                class="account-list-item add"
                data-option="web_click_openbank"
                @click="onAddCard"
              >
                <el-button
                  type="text"
                  :loading="addLoading"
                  icon="el-icon-plus"
                  data-option="web_click_openbank"
                  ><span data-option="web_click_openbank">{{
                    $t('addBankCard')
                  }}</span></el-button
                >
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import { bank, user } from '@/api/index';
import cardImg from '@/assets/img/bank/bank-chip.png';
import paymatico from '@/assets/img/bank/paymatico.png';
import unnax from '@/assets/img/bank/unnax.png';
const { apiGetBankList, apiBindBank, apiDeleteBank } = bank;
const { apiGetFullUserinfo } = user;

export default {
  components: {},
  data() {
    return {
      tabVal: 'account',
      loading: false,
      accountList: [],
      cardList: [],
      addLoading: false,
      cardImg: cardImg,
      routeQuery: this.$route.query,
      cardType: {
        paymatico: paymatico,
        unnax: unnax,
      },
    };
  },
  computed: {
    ...mapGetters(['bank']),
    canAddCard() {
      return this.cardList.length >= 3;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    formatType(val) {
      return this.cardType[val.toLowerCase()];
    },
    getNumber(item, isCard) {
      const o = item;
      let no = '';
      if (isCard) {
        no = o.first6 + '****' + o.last4;
      } else {
        no = (o && o.accountNumber) || '';
      }
      return no;
      // return (no + '').replaceAll('*', '•');
    },
    getBankName(item, isCard) {
      const o = item;
      if (isCard) {
        return (
          ((o && o.cardBank).toLowerCase().indexOf('n/a') > -1
            ? ''
            : o && o.cardBank) || ''
        );
      }

      return (
        ((o && o.bankName).toLowerCase().indexOf('n/a') > -1
          ? ''
          : o && o.bankName) || ''
      );
    },
    onUnbind(item, isCard) {
      if (this.loading) return;
      this.loading = true;

      const send = {};
      const o = item;
      if (isCard) {
        send['bankCardNo'] = o.cardId;
      } else {
        send['bankAccountNo'] = o.accountId;
      }
      apiDeleteBank(send)
        .then(() => {
          this.$message({
            type: 'success',
            message: this.$t('oprSuccess'),
            duration: 2000,
          });
          this.loading = false;
          this.getList();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onAddCard() {
      // if (this.canAddCard) return;

      if (this.addLoading) return;
      this.addLoading = true;
      this.$store.commit('bank/setOrigin', 'account');
      apiBindBank({
        scenes: this.routeQuery.from || 'info',
      })
        .then((res) => {
          this.$message({
            type: 'success',
            message: this.$t('soonToBindCard'),
            duration: 2000,
          });
          // if (res.widgetUrl && res.widgetUrl.indexOf('unnax') > -1) {
          // res.widgetUrl &&
          //   this.$router.push({
          //     name: `SysThirdParty___${this.$i18n.locale}`,
          //     query: {
          //       url: window.btoa(res.widgetUrl),
          //     },
          //   });
          window.open(
            `/pc/third-part?url=${window.btoa(res.widgetUrl)}&card=ok`,
            '_blank'
          );
          // } else {
          //   res.widgetUrl && window.open(res.widgetUrl, '_blank');
          // }
        })
        .finally(() => {
          this.addLoading = false;
        });
    },
    onAddAccount() {
      this.$router.push({
        name: `SysBankBind___${this.$i18n.locale}`,
        query: {
          ...this.routeQuery,
          back: 'SysBankAccount',
        },
      });
    },
    getList() {
      if (this.loading) return;
      this.loading = true;

      apiGetBankList()
        .then((res) => {
          this.accountList = res.account || [];
          this.cardList = res.card || [];
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
