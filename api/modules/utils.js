import { request } from '@/plugins/fetch';

export default {
  // 收集设备信息
  apiPushDeviceInfo: (data) =>
    request('/util/submitInfo', 'post', 'loan', data),
  // 获取app通用配置
  apiGetAppConfig: (data) => request('/util/getConf', 'post', 'loan', data),
  // 获取通用配置
  apiGetAppConfigNotToken: (data) =>
    request('/security/getConfNoToken', 'post', 'loan', data),
  // 获取banner
  apiGetAppBanner: (data) =>
    request('/util/getBannerConfForH5', 'post', 'loan', data),
  // 谷歌地址
  apiQueryGooglePlace: (data) =>
    request('/google/maps/api/place/autocomplete/json', 'get', '', {
      types: 'address', // '(cities)',
      // region: 'ES',
      components: 'country:es',
      language: 'es',
      key: 'AIzaSyB6hgoRZM3CZCCpx06JOpaKcxnPumc2YAA',
      ...data,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  apiQueryPlace: (data) =>
    request('/util/getCity', 'post', 'loan', {
      notify: false,
      ...data,
    }),
};
