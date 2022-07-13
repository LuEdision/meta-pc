<template>
  <router-view></router-view>
</template>
<script>
/* eslint-disable no-empty */
import { setApp } from '@/plugins/config/index';
import { getHomeTitle } from '@/plugins/utils.js';
export default {
  name: 'PcHome',
  layout: ({ route, store, env, params, query, req, res, redirect, error }) => {
    // 刷新页面会出现默认的nigeria layout
    // 切换页面可以拿到location.host 故切换页面没事
    // 所以使用(尼日|乌干达)的模板无需进行修改{'127.0.0.1:3006': 'nigeria',}的对应关系 (墨西哥|西班牙)需要修改对应关系
    let host = process.env.BASE_HOST;
    const { tpl } = setApp(host);

    const $tpl1 = (tpl === 'meta' ? 'pc_meta' : '') || 'pc_default';
    return $tpl1;
  },
  middleware: ['host'],
  asyncData({ route, store, env, params, query, req, res, redirect, error }) {
    setApp((req && req.headers.host) || window.location.host);
  },
  head(nuxt) {
    const lowerApp = (nuxt.$app || '').toLowerCase();

    return {
      title: getHomeTitle(nuxt.$country, nuxt.$tpl),
      link: [
        { rel: 'icon', href: `/icon/${lowerApp}.webp` },
        { rel: 'shortcut icon', href: `/icon/${lowerApp}.webp` },
      ],
    };
  },
  mounted() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (evt) => {
        console.log('Notification', evt.data);
      });
    }

    setApp(window.location.host);
    this.initIcon();
    this.initSelfAdaption();
    this.$nextTick(() => {
      this.$nuxt.$loading.finish();
      // this.setInitPage();
      window.addEventListener('resize', () => {
        // this.setInitPage();
        this.initSelfAdaption();
      });

      // this.$nuxt.setLayout(this.$tpl);
    });
    // setInterval(function () {
    //   this.check();
    // }, 4000);
    // this.check();
    window.gtag('config', this.$GAID);
  },
  methods: {
    check() {
      function doCheck(a) {
        if (('' + a / a)['length'] !== 1 || a % 20 === 0) {
          (function () {}['constructor']('debugger')());
        } else {
          (function () {}['constructor']('debugger')());
        }
        doCheck(++a);
      }
      try {
        doCheck(0);
      } catch (err) {}
    },
    initSelfAdaption() {
      const screenWidth = document.body.clientWidth;
      if (
        screenWidth < 769 &&
        navigator.userAgent.toLowerCase().indexOf('mobile') > -1
      ) {
        window.location.href = window.location.href.replace('/pc/', '/web/');
      } else if (
        screenWidth < 769 &&
        navigator.userAgent.toLowerCase().indexOf('mobile') < 0
      ) {
        window.location.href = window.location.href.replace('/pc/', '/web/');
      }
    },
    setInitPage() {
      const $tpl1 = (this.$tpl === 'meta' ? 'pc_meta' : '') || 'pc_default';
      this.$nuxt.setLayout($tpl1 || this.$tpl);
    },
    initIcon() {
      let bagType = '';
      if (
        location.origin.indexOf('website.es') > -1 ||
        location.origin.indexOf('website.xcreditech.com') > -1
      ) {
        bagType = 'website';
      } else if (
        location.origin.indexOf('websitepro.com') > -1 ||
        location.origin.indexOf('www-test.websitepro.com') > -1
      ) {
        bagType = 'websitepro';
      }
      const dom = document.querySelectorAll('link');

      dom.forEach((_) => {
        if (_.rel === 'icon' || _.rel === 'shortcut icon') {
          _.href = `/icon/${(bagType || this.$app || '').toLowerCase()}.webp`;
        }
      });
      document.title = this.$route.meta.title || 'Meta';
    },
  },
};
</script>
