<template>
  <!-- <client-only> -->
  <el-container>
    <el-header height="auto">
      <pc-header :not-show-btn="notShowBtn">
        <template v-if="showCustom" #right>
          <div class="right-content">
            <span class="right-username">Hola,{{ username }}</span>
            <span class="right-avatar" @click="onGoMy"
              ><img :src="userAvatar" alt=""
            /></span>
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
        <template v-else-if="breadcrumb && breadcrumb.length" #footer>
          <div class="loan-footer">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                v-for="item in breadcrumb"
                :key="item.to"
                :to="item.to"
                >{{ item.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
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
import { mapGetters } from 'vuex';
import PcHeader from '@/components/pc-loan/header.vue';
import { user } from '@/api/index';
import userAvatar from '@/assets/img/pc/girlAvatar@2x.png';
import Cookies from 'js-cookie';

const { apiGetUserConfig } = user;
export default {
  name: 'SysIndex',
  components: {
    PcHeader,
  },
  data() {
    return {
      userAvatar: userAvatar,
    };
  },
  computed: {
    ...mapGetters(['login']),
    username() {
      const o = this.login.loginData;
      return o.firstName || '';
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
    breadcrumb() {
      return this.$route.meta.breadcrumb;
    },
    notShowBtn() {
      return this.$route.meta.notShowBtn ?? false;
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
  mounted() {
    const token = Cookies.get('loan_app_token');
    if (token) {
      this.getUserData();
    }
  },
  methods: {
    jumpPage(name) {
      this.$router.push({
        name: `${name}___${this.$i18n.locale}`,
      });
    },
    onGoMy() {
      this.$router.push({ name: `UserMy___${this.$i18n.locale}` });
    },
    onLoad() {
      // document.body.scrollTop = 0;
      // document.documentElement.scrollTop = 0;
      document.body.scrollIntoView();
      document.querySelector('.el-main').scrollTop = 0;
      document.querySelector('.el-main').scrollIntoView();
    },
    // 保存一个时间 默认仅保存vuex3h 以防数据泄露 3h后 重新获取新数据
    getUserData() {
      const time = Date.now();
      const max = 3 * 60 * 60 * 1000;
      if (time - Number(localStorage.getItem('user_config_time') ?? 0) > max) {
        localStorage.setItem('user_config_time', time.toString());
        apiGetUserConfig().then((res) => {
          this.$store.commit('login/setUserConfig', res || null);
        });
      }
    },
  },
};
</script>
