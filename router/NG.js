const { country } = require('../plugins/config/index.js');

module.exports = (resolve) => [
  {
    path: '/',
    name: 'Index',
    component: resolve('index.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: resolve('home/index.vue'),
        meta: {
          title: `Fast and Reliable Loan in ${country}`,
        },
      },
      {
        path: 'privacy-policy',
        name: 'privacyPolicy',
        component: resolve('privacy-policy/index.vue'),
        meta: {
          title: 'Privacy Policy',
        },
      },
      {
        path: 'cookie-policy',
        name: 'cookiePolicy',
        component: resolve('cookie-policy/index.vue'),
        meta: {
          title: 'POLÍTICA DE COOKIES',
        },
      },
      {
        path: 'secci',
        name: 'Secci',
        component: resolve('secci/index.vue'),
        meta: {
          title: 'INFORMACIÓN NORMALIZADA EUROPEA CRÉDITO AL CONSUMO',
        },
      },
      {
        path: 'agreement',
        name: 'Agreement',
        component: resolve('agreement/index.vue'),
        meta: {
          title: 'Modelo de contrato de préstamo',
        },
      },
      {
        path: 'terms-of-use',
        name: 'termsOfUse',
        component: resolve('terms-of-use/index.vue'),
        meta: {
          title: 'Terms Of Use',
        },
      },
      {
        path: 'about-us',
        name: 'AboutUs',
        component: resolve('about-us/index.vue'),
        meta: {
          title: 'About Us',
        },
      },
      {
        path: 'faq',
        name: 'Faq',
        component: resolve('faq/index.vue'),
        meta: {
          title: 'Frequently Asked Questions',
        },
      },
      {
        path: 'mobile/home',
        name: 'H5Home',
        component: resolve('mobile/home/index.vue'),
        meta: {
          title: `Fast and Reliable Loan in ${country}`,
        },
      },
      {
        path: 'mobile/privacy-policy',
        name: 'H5privacyPolicy',
        component: resolve('mobile/privacy-policy/index.vue'),
        meta: {
          title: 'Privacy Policy',
        },
      },
      {
        path: 'mobile/cookie-policy',
        name: 'h5CookiePolicy',
        component: resolve('mobile/cookie-policy/index.vue'),
        meta: {
          title: 'POLÍTICA DE COOKIES',
        },
      },
      {
        path: 'mobile/secci',
        name: 'h5Secci',
        component: resolve('mobile/secci/index.vue'),
        meta: {
          title: 'INFORMACIÓN NORMALIZADA EUROPEA CRÉDITO AL CONSUMO',
        },
      },
      {
        path: 'mobile/agreement',
        name: 'H5Agreement',
        component: resolve('mobile/agreement/index.vue'),
        meta: {
          title: 'Modelo de contrato de préstamo',
        },
      },
      {
        path: 'mobile/terms-of-use',
        name: 'H5termsOfUse',
        component: resolve('mobile/terms-of-use/index.vue'),
        meta: {
          title: 'Terms Of Use',
        },
      },
      {
        path: 'mobile/about-us',
        name: 'H5AboutUs',
        component: resolve('mobile/about-us/index.vue'),
        meta: {
          title: 'About Us',
        },
      },
      {
        path: 'mobile/faq',
        name: 'H5Faq',
        component: resolve('mobile/faq/index.vue'),
        meta: {
          title: 'Frequently Asked Questions',
        },
      },
    ],
  },
];
