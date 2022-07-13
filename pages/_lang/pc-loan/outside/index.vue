<template>
  <!-- <client-only> -->
  <el-container>
    <el-header height="auto">
      <!-- <pc-header></pc-header> -->
      <pc-header>
        <template v-if="showCustom" #right>
          <div class="right-content">
            <span class="right-username">Hola,{{ username }}</span>
            <span class="right-avatar"><img :src="userAvatar" alt="" /></span>
          </div>
        </template>
        <template v-if="!showCustom && tabs && tabs.length" #footer>
          <div class="loan-footer">
            <div
              v-for="(item, index) in tabs"
              :key="index"
              :class="[
                'loan-footer-title',
                $route.path.indexOf(item.path) > -1 ? 'active' : '',
              ]"
            >
              {{ item.title }}
            </div>
          </div>
        </template>
      </pc-header>
    </el-header>
    <el-main @hook:mounted="onLoad">
      <router-view></router-view>
    </el-main>
  </el-container>
  <!-- </client-only> -->
</template>
<script>
import PcHeader from '@/components/pc-loan/header.vue';
import { utils, user } from '@/api/index';
import { setApp } from '@/utils/index.client';
import userAvatar from '@/assets/img/pc/girlAvatar@2x.png';
import Cookies from 'js-cookie';
import { mapGetters } from 'vuex';

const { apiGetUserinfo } = user;

const { apiGetAppConfigNotToken } = utils;
export default {
  name: 'OutsideIndex',
  components: {
    PcHeader,
  },
  data() {
    return {
      userAvatar: userAvatar,
      loginData: null,
    };
  },
  computed: {
    ...mapGetters(['login']),
    username() {
      const o = this.loginData || this.login.loginData;
      return (o && o.firstName) || '';
    },
    showCustom() {
      const showInfo =
        ['/sys/index', '/outside/invite'].findIndex((_) => {
          return this.$route.path.indexOf(_) > -1;
        }) > -1;
      return showInfo;
    },
    tabs() {
      return this.$route.meta.tabs;
    },
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        if (process.client || process.browser) {
          document.body.scrollIntoView();
          document.querySelector('.el-main').scrollTop = 0;
          document.querySelector('.el-main').scrollIntoView();
        }
      },
      immediate: false,
      deep: true,
    },
  },
  created() {},

  mounted() {
    this.init();
    const token = Cookies.get('loan_app_token');
    if (token) {
      this.getUserData();
    }
  },
  methods: {
    getUserData() {
      apiGetUserinfo().then((res) => {
        this.$store.commit('login/setLoginData', res);
        this.loginData = res;
      });
    },
    onLoad() {
      // document.body.scrollTop = 0;
      // document.documentElement.scrollTop = 0;
      document.body.scrollIntoView();
      document.querySelector('.el-main').scrollTop = 0;
      document.querySelector('.el-main').scrollIntoView();
    },
    onBack() {
      this.$router.back();
    },
    init() {
      const time = Date.now();
      const max = 3 * 60 * 60 * 1000;
      if (time - Number(localStorage.getItem('app_config_time') ?? 0) > max) {
        localStorage.setItem('app_config_time', time.toString());
        apiGetAppConfigNotToken().then((res) => {
          this.$store.commit('setting/setAppConfig', res || null);
        });
      } else {
        const { app, appConfig } = setApp('');
        this.$store.commit('setting/setApp', app);
        this.$store.commit('setting/setAppConfig', appConfig);
      }
    },
  },
};
</script>
<style lang="scss" scope>
@import './index.scss';
</style>
