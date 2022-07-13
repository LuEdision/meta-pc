import Vue from 'vue';
import { appMap, hostMap, countryMap, getAppSymbols, templateMap } from './app';

const getCdn = (app = '', tpl = '') => {
  if (app.toLowerCase() === 'website') {
    return '';
  }

  return (
    (tpl === 'mexico' &&
      'https://static-mx.obs.myhuaweicloud.com/web/app-h5') ||
    'https://static-af.obs.af-south-1.myhuaweicloud.com/web/app-h5'
  );
};
export function setApp(host) {
  if (!host) {
    host = (process.client && window.location.host) || process.env.BASE_HOST;
  }
  if (host) {
    host = host.replace(/(^https?:)\/\//gi, '').replace(/\/.*/gi, '');
  }
  let app = hostMap[host] || '';
  const country = countryMap[host] || '';
  const tpl = templateMap[country] || ''; // 默认尼日模板
  const lowerApp = app.toLowerCase();
  const defApp = {
    app: '',
    appDesc: '',
    email: '',
    phone: '',
    location: '',
    home: '',
    googlePlay: '',
    googleMap: '',
    api: '',
  };
  const appData = appMap[lowerApp] || defApp;

  // 后期可能做一个域名->app的映射
  process.env.$app = getAppSymbols(app);
  Vue.config.productionTip = false;

  const formatCountry = country.replace(/^\S/, (s) => s.toUpperCase());

  app = getAppSymbols(app);

  // app全局参数配置
  Vue.prototype.$app = app || 'website';
  Vue.prototype.$country = country;
  Vue.prototype.$appData = appData;
  Vue.prototype.$tpl = tpl;
  Vue.prototype.$cdn = getCdn(app, tpl);

  return {
    app,
    formatCountry,
    country,
    appData,
    tpl,
  };
}
