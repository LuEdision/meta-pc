import es_ESP from './es-ESP';
import en_ESP from './en-ESP';
import zh_ESP from './zh-ESP';

export default {
  locales: ['es', 'en', 'zh'],
  defaultLocale: 'es',
  vuex: { moduleName: 'i18n', syncRouteParams: true },
  skipSettingLocaleOnNavigate: true,
  vueI18n: {
    fallbackLocale: 'es',
    messages: {
      es: es_ESP,
      en: en_ESP,
      zh: zh_ESP,
    },
  },
};
