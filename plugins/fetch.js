import axios, { Method } from 'axios';
import { Message } from 'element-ui';
import general from './general';
import Cookies from 'js-cookie';

const { isMobile } = general;
let baseUrl = '/';

// if (process.client || process.browser) {
//   baseUrl = process.env.BASE_URL || (location ? location.origin : '/');
// }

// const commenPrefix = '/api';
function sendRequest(url, type, commenPrefix, condition, redirectUrl = false) {
  // 创建axios实例
  const defaultHeader = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    ProxyChannel: 'web',
    App_id: '',
    'Accept-Language': 'es',
    strategy: 'default',
    App_name: 'Meta',
  };
  const service = axios.create({
    baseURL: !redirectUrl
      ? commenPrefix
        ? baseUrl + commenPrefix
        : baseUrl
      : url, // api的base_url
    timeout: 60000, // 请求超时时间
    headers:
      condition && condition.headers
        ? Object.assign(defaultHeader, condition.headers)
        : defaultHeader,
    withCredentials: true,
    notify: condition && condition.notify === false ? false : true,
  });
  // request拦截器
  service.interceptors.request.use(
    (config) => {
      // 设置请求类型
      const token = Cookies.get('loan_app_token');

      if (token) {
        config.headers.Authorization = token;
      }
      config.method = type;
      if (condition && condition.responseType) {
        config.responseType = condition.responseType;
        delete condition.responseType;
      }
      // Do something before request is sent
      if (condition && condition.headers) {
        delete condition.headers;
      }
      if (condition && condition.notify) {
        delete condition.notify;
      }
      let param = condition ? { ...condition } : undefined;
      if (config.method === 'post') {
        config.data = param;
      } else {
        config.params = param;
      }

      return config;
    },
    (error) => {
      // Do something with request error

      Message({
        message: error,
        type: 'error',
        duration: 3000,
      });

      Promise.reject(error);
    }
  );
  // respone拦截器
  service.interceptors.response.use(
    (r) => {
      const { config, status, data } = r;
      if (commenPrefix) {
        if (status === 200) {
          // arraybuffer会转换为二进制对象 通过decode解析 如果是返回文件则解析失败 则直接返回对应文件
          if (config.responseType === 'arraybuffer') {
            try {
              const enc = new TextDecoder('utf-8');
              // 转换code 进行判断
              const json = JSON.parse(enc.decode(new Uint8Array(data)));

              if (config.notify) {
                Message({
                  message: json.msg || '请求异常',
                  type: 'error',
                  duration: 3000,
                });
              }
              if (json.code === '3101') {
                window.$nuxt.$router.push({
                  name: `OutsideNext___${window.$nuxt.$i18n.locale}`,
                });
              }
              return Promise.resolve(json);
            } catch (error) {
              return data;
            }
          }
          if (data.status === 'OK') {
            // ok是Google place返回的参数
            return data;
          }
          if (data.code === '0000') {
            return data.data;
          } else if (data.code === '3101') {
            // 跳转到登录页
            if (config.notify) {
              Message({
                message: data.msg || 'tiempo de espera del token',
                type: 'error',
                duration: 3000,
              });
            }

            Cookies.remove('loan_app_token');
            setTimeout(() => {
              const url = window.location.href;
              const urlList = [
                '/wait-apply-result',
                '/wait-pay-result',
                '/agreement',
              ];
              const index = urlList.findIndex((_) => {
                return url.indexOf(_) > -1;
              });
              if (index < 0) {
                return window.$nuxt.$router.push({
                  name: `OutsideNext___${window.$nuxt.$i18n.locale}`,
                });
              } else {
                return Promise.reject(data);
              }
            }, 80);
          } else {
            if (config.notify) {
              Message({
                message: data.msg || 'Obtener datos anormales',
                type: 'error',
                duration: 3000,
              });
            }
            return Promise.reject(data.data);
          }
        } else {
          // config.notify && Toast.fail(msg || 'Obtener datos anormales');
          return Promise.reject(new Error('status not 200!'));
        }
      } else {
        if (data.code === '0000') {
          return Promise.resolve(data.data);
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 3000,
          });
          if (data.code === '3101') {
            window.$nuxt.$router.push({
              name: `OutsideNext___${window.$nuxt.$i18n.locale}`,
            });
          }

          return Promise.reject(data.msg);
        }
      }
    },
    (error) => {
      Message({
        message: `${error?.response?.status}: ${error?.message}`,
        type: 'error',
        duration: 3000,
      });

      return Promise.reject(error);
    }
  );
  return service(url);
}
const request = (url, type, commenPrefix, data, redirectUrl = false) =>
  sendRequest(url, type, commenPrefix, data, redirectUrl);

export { request };
