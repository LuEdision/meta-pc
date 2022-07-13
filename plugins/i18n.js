import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
export default ({ app }) => {
  // app.i18n = new VueI18n({
  //   locale:
  //     params.lang ||
  //     Cookies.get('lang') ||
  //     (process.client ? localStorage.getItem('lang') : '') ||
  //     store.state.multiLangs.locale ||
  //     'es-ESP', //通过cookie设置国际化（用户选择一次终身不切换）
  //   fallbackLocale: 'es-ESP', //默认国际化
  //   messages: {
  //     'en-ESP': require('~/locales/en-ESP.js'),
  //     'zh-ESP': require('~/locales/zh-ESP.js'),
  //     'es-ESP': require('~/locales/es-ESP.js'),
  //   },
  // });
  app.i18n.path = (link) => {
    // 如果是默认语言，就省略
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }
    return `/${app.i18n.locale}/${link}`;
  };
  // onBeforeLanguageSwitch called right before setting a new locale
  app.i18n.onBeforeLanguageSwitch = (
    oldLocale,
    newLocale,
    isInitialSetup,
    context
  ) => {};
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {};
};
