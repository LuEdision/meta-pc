<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-home">
      <div class="my-user-info">
        <div class="my-user-info_avatar" @click="onGoInfo">
          <img :src="boyImg" alt="Mib" />
        </div>
        <div class="my-user-info_content">
          <div class="user-name">Hola, {{ username }}</div>
          <div class="user-phone">
            <span>{{ userNumber }}</span>
            <span @click="onTrigger"><img :src="iconName" alt="Mib" /></span>
          </div>
        </div>
      </div>
      <div class="pc-sys-container home">
        <div class="pc-sys-left my">
          <ul>
            <li v-for="item in config" :key="item.title">
              <a v-show="!item.notLink" :href="item.url" target="_blank"
                ><img :src="item.icon" alt="Mib" /><span>{{
                  item.title
                }}</span></a
              >
              <div v-show="item.notLink" @click="openUrl(item.url)">
                <img :src="item.icon" alt="Mib" /><span>{{ item.title }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="pc-sys-right">
          <div v-show="hasData" class="right-first">
            <div class="right right-date">
              <div class="right-my-icon"><img :src="dateImg" alt="Mib" /></div>
              <div class="right-desc">
                <div class="right-desc_title">{{ dueDate }}</div>
                <div class="right-desc_content">Vencimiento próxima cuota</div>
              </div>
            </div>
            <div class="right right-money">
              <div class="right-my-icon"><img :src="money" alt="Mib" /></div>
              <div class="right-desc">
                <div class="right-desc_title">
                  {{ formatMoney(totalSurplusAmount) }} €
                </div>
                <div class="right-desc_content">Importe próxima cuota</div>
              </div>
            </div>
          </div>
          <div class="right-second">
            <!-- <div class="right-second_content"> -->
            <div class="right right-second_history" @click="goTo('SysLogLoan')">
              <div class="right-my-icon"><img :src="history" alt="Mib" /></div>
              <div class="right-desc">
                <div class="right-desc_content">
                  Historial de préstamo<span class="el-icon-arrow-right"></span>
                </div>
              </div>
            </div>
            <div
              class="right right-second_Movimientos"
              @click="goTo('SysLogTransaction')"
            >
              <div class="right-my-icon"><img :src="applying" alt="Mib" /></div>
              <div class="right-desc">
                <div class="right-desc_content">
                  Movimientos<span class="el-icon-arrow-right"></span>
                </div>
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
    <pc-footer></pc-footer>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import PcFooter from '@/components/pc-loan/footer.vue';
import { loan } from '@/api/index';
import { ObjIsEmpty, numFormat } from '@/utils/index.client';
import dayjs from 'dayjs';
import cupones from '@/assets/img/myinfo/cupones.png';
import bankcard from '@/assets/img/myinfo/bankcard.png';
import question from '@/assets/img/myinfo/question.png';
import solution from '@/assets/img/myinfo/solution.png';
import setting from '@/assets/img/myinfo/setting.png';
import mail from '@/assets/img/myinfo/mail.png';
import dateImg from '@/assets/img/myinfo/date.png';
import money from '@/assets/img/myinfo/money.png';
import history from '@/assets/img/myinfo/history.png';
import applying from '@/assets/img/myinfo/applying.png';
import boyImg from '@/assets/img/myinfo/boy@2x.png';
import closeImg from '@/assets/img/myinfo/close@2x.png';
import openImg from '@/assets/img/pc/icon_open@2x.png';

const { apiGetLastUnpayLoan } = loan;

export default {
  components: {
    PcFooter,
  },
  data() {
    return {
      formData: {},
      routeQuery: this.$route.query,
      dateImg: dateImg,
      money: money,
      history: history,
      applying: applying,
      boyImg: boyImg,
      closeImg: closeImg,
      openImg: openImg,
      showMobile: false,
    };
  },
  computed: {
    ...mapGetters(['login', 'setting', 'loan']),
    BASE_URL() {
      return `${process.env.BASE_URL}/pc/` || '/pc/';
    },
    loanData() {
      const o = this.loan;

      return (o && o.lastLoan) || null;
    },
    loanStatu() {
      const o = this.loanData;
      return o && o.status;
    },
    showDate() {
      return [2002, 3001, 3002].includes(this.loanStatu);
    },
    config() {
      return [
        {
          icon: cupones,
          title: 'Cupones',
          notLink: true,
          url: 'Coupon',
          query: {
            from: 'my',
          },
        },
        {
          name: '银行账号',
          icon: bankcard,
          title: 'Mi cuenta bancaria',
          notLink: true,
          url: 'SysBankAccount',
          query: {
            from: 'my',
          },
        },
        {
          name: '常见问题',
          icon: question,
          title: 'Preguntas frecuentes',
          url: this.getObj(this.appData, 'urlFaq'),
        },
        {
          name: '设置',
          icon: setting,
          title: 'Configuración',
          notLink: true,
          url: 'SysMessageConfig', // 手动添加根目录 后期添加全局变量
        },
        {
          name: '关于我们',
          icon: solution,
          title: 'Acerca de nosotros',
          notLink: true,
          url: 'SysMessageAboutApp',
        },
        {
          name: '支持邮箱',
          icon: mail,
          title: 'Correo de soporte',
          url: `mailto:${this.getObj(this.appData, 'contactEmail')}`,
          val: this.getObj(this.appData, 'contactEmail'),
        },
      ];
    },
    appData() {
      const o = this.setting;
      return o.appConfig || null;
    },
    dueDate() {
      const o = this.loanData;
      const day = dayjs((o && o.dueDate) || '').format('DD');
      const month = dayjs((o && o.dueDate) || '').format('MM');
      return `${day} de ${this.$t('month.' + month)}`;
    },
    hasData() {
      const isShow = this.loanData && !ObjIsEmpty(this.loanData);
      return isShow;
    },
    totalSurplusAmount() {
      // 待还金额
      const o = this.loanData;
      return (o && o.totalSurplusAmount) || '-';
    },
    userNumber() {
      const o = this.loginData;
      const code = `+${this.$config.areaCode || '34'}`;
      const phone = o.mobile || '';
      if (this.showMobile) {
        return `${code} ${phone}`;
      }

      return `${code} *******${phone.slice(-4)}`;
    },
    iconName() {
      return (this.showMobile && this.openImg) || this.closeImg;
    },
    loginData() {
      const o = this.login;
      return o.loginData || null;
    },
    username() {
      const o = this.loginData;
      return o.firstName || '';
    },
  },
  created() {
    // this.getLastLoan();
  },
  mounted() {
    this.getLastLoan();
  },
  methods: {
    goTo(name) {
      this.$router.push({
        name: `${name}___${this.$i18n.locale}`,
      });
    },
    onGoInfo() {
      this.$router.push({ name: `UserInfo___${this.$i18n.locale}` });
    },
    onTrigger() {
      this.showMobile = !this.showMobile;
    },
    formatMoney(val) {
      return numFormat(Number(val), '.');
    },
    openUrl(url, query) {
      let config = {
        name: `${url}___${this.$i18n.locale}`,
      };
      Object.assign(config, query ? query : {});
      this.$router.push({
        ...config,
      });
    },
    getObj(o, k) {
      return (o && o[k]) || '';
    },
    getLastLoan() {
      return apiGetLastUnpayLoan()
        .then((res) => {
          // this.loanData = res || null;

          this.$store.commit('loan/setLastLoan', res || null);
        })
        .catch(() => {
          this.$store.commit('loan/setLastLoan', null);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
