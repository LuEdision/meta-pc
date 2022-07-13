/* eslint-disable no-undef */
import Vue from 'vue';
import VueGtag from 'vue-gtag';

if (process.client || process.browser) {
  if (location.origin.indexOf('website.es') > -1) {
    Vue.prototype.$GAID = 'G-9ZDX6PRX7V';
    Vue.use(VueGtag, {
      config: {
        id: 'G-9ZDX6PRX7V',
      },
      appName: 'Meta',
    });
  } else if (location.origin.indexOf('websitepro.com')) {
    Vue.prototype.$GAID = 'G-EL0MHW99LQ';
    Vue.use(VueGtag, {
      config: {
        id: 'G-EL0MHW99LQ',
      },
      appName: 'Meta Pro',
    });
  }
}

export default ({ app: { router, context, store } }, inject) => {
  if (process.client || process.browser) {
    if (location.origin.indexOf('website.es') > -1) {
      Vue.prototype.$GAID = 'G-9ZDX6PRX7V';
      context.$GAID = 'G-9ZDX6PRX7V';
    } else if (location.origin.indexOf('websitepro.com')) {
      Vue.prototype.$GAID = 'G-EL0MHW99LQ';
      context.$GAID = 'G-EL0MHW99LQ';
    }
  }
  if (
    (process.client || process.browser) &&
    process.env.NODE_ENV === 'production'
  ) {
    window.addEventListener('click', (e) => {
      const formEle = ['input', 'textarea', 'select', 'radio', 'checkbox'];
      if (
        e.target.dataset.option &&
        !formEle.includes(e.target.nodeName.toLowerCase())
      ) {
        window.gtag('event', e.target.dataset.option, {
          send_to: window.$nuxt.$GAID,
        });
      }
    });
    // window.addEventListener('input', (e) => {
    //   if (e.target.dataset.option) {
    //     window.gtag('event', e.target.dataset.option, {
    //       send_to: window.$nuxt.$GAID,
    //     });
    //   }
    // });
    window.addEventListener('change', (e) => {
      if (e.target.dataset.option) {
        window.gtag('event', e.target.dataset.option, {
          send_to: window.$nuxt.$GAID,
        });
      }
    });
    // //当用户进行点击
    // inject('googleLogin', (params) => {
    //   gtag('event', 'login', params);
    // });
    // //当用户进行输入
    // inject('googleRegister', (params) => {
    //   gtag('event', 'register', params);
    // });
    // //当用户
    // inject('googleViewPromotion', (params) => {
    //   gtag('event', 'view_promotion', params);
    // });
    // //当用户
    // inject('googleBeginCheckout', (params) => {
    //   gtag('event', 'begin_checkout', params);
    // });
  }
};
