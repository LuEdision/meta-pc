/* eslint-disable no-undef */
// import sensors from 'sa-sdk-javascript';
import { AppMap, Host2App } from './app.client';
// 当前地理位置经纬度
export const getLocation = () => {
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        let { latitude, longitude } = pos.coords;

        res({
          latitude,
          longitude,
        });
      });
    } else {
      rej({
        latitude: '',
        longitude: '',
      });
    }
  });
};

export const setApp = (h) => {
  const host = (
    h ||
    (process.client || process.browser
      ? window.location.host
      : process.env.BASE_HOST)
  ).toLowerCase();
  const app = Host2App[host] || 'meta';
  return {
    app,
    appConfig: AppMap[app] || null,
  };
};

export const ObjIsEmpty = (obj) => {
  if (!obj) return false;

  for (const key in obj) return false;
  return true;
};

// 复制内容到剪切板
export async function copyToClip(content, cb) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(content).then(cb, () => {});
    } else {
      const aux = document.createElement('textarea');
      aux.setAttribute('value', content);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand('Copy');
      document.body.removeChild(aux);
      cb && cb();
    }
    // eslint-disable-next-line no-empty
  } catch (err) {}
}

// 判断ios
function isIos() {
  // 浏览器的用户代理报头
  const ua = navigator.userAgent;
  return /(iPhone|iPad|iPod|iOS)/i.test(ua);
}

export function openDownloadApp(url) {
  // 判断是那种设备
  // let u = navigator.userAgent;
  // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // Android系统或者uc浏览器
  // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // iOS系统

  // // 如果为Android系统
  // if (isAndroid) {
  //   window.location.href = url; // 直接跳转到App的链接，可以是 scheme 也可以是 App link 链接
  //   window.setTimeout(function () {
  //     window.location.href = url; // 3s后如果不能跳转到 App，则跳转到 App 的下载地址，一般是应用宝的对应的下载地址
  //   }, 3000);
  //   return;
  // }

  // // ios设备：原理：判断是否认识这个协议，认识则直接跳转，不认识就在这里下载appios();
  // if (isiOS) {
  //   let startIndex = u.indexOf('iPhone OS') + 9;
  //   let endIndex = u.indexOf('like Mac OS') - 1;
  //   let num = +u.slice(startIndex, endIndex).split('_')[0]; // 计算版本号的前面数值
  //   if (num < 9) {
  //     window.location.href = url; // URL scheme 链接
  //   } else {
  //     window.location.href = url; // universal link 链接
  //   }
  //   window.setTimeout(function () {
  //     window.location.href = url; // 3s后如果不能跳转到 App，则跳转到 AppStore 的下载地址
  //   }, 3000);
  //   return;
  // }
  window.open(url, '_blank');
}

// 打开短信
export function sendSms(phone = '', sms = '') {
  // 短信内容需要转码
  const body = encodeURIComponent(sms);
  let link = '';
  if (isIos()) {
    // ios系统
    link = `sms:${phone}&body=${body}`;
  } else {
    link = `sms:${phone}?body=${body}`;
  }

  // window.location.href = link;
  // window.open(link);
  copyToClip(link);
}

// 打开邮箱
export function sendMail(mail = '', body = '') {
  const link = `mailto:${mail}?body=${encodeURIComponent(body)}`;
  // window.location.href = link;
  // window.open(link);
  copyToClip(link);
}

/**
 * 打开WhatsApp app
 * @phone 发送内容
 * @body 号码
 * @notOpenDownload 是否打开下载app链接、默认(false)打开
 */
export function openWhatsapp(phone = '', body = '', notOpenDownload = false) {
  let link = `https://wa.me/${phone}?text=${encodeURIComponent(body)}`;
  // window.location.href = link;

  // 防止未触发app 跳转到下载链接
  // let link = '';
  // if (isIos()) {
  //   // 先拨打WhatsApp 然后跳转到下载app
  //   link = 'https://apps.apple.com/us/app/whatsapp-messenger/id310633997';
  // } else {
  //   // Android
  //   link = 'https://play.google.com/store/apps/details?id=com.whatsapp';
  // }

  // !notOpenDownload && openDownloadApp(link);
  copyToClip(link);
}

// 打开Messenger
export function openMessenger(url = '', text = '', notOpenDownload = false) {
  // 有些手机没有安装messenger
  let link = 'fb-messenger://share?link=' + encodeURIComponent(text);
  // window.location.href = link;

  // 防止未触发app 跳转到下载链接
  // if (isIos()) {
  //   // 先拨打WhatsApp 然后跳转到下载app
  //   link =
  //     'https://itunes.apple.com/us/app/whatsapp-messenger/id310633997?mt=8';
  // } else {
  //   // Android
  //   link = 'https://play.google.com/store/apps/details?id=com.facebook.orca';
  // }
  // !notOpenDownload && openDownloadApp(link);
  copyToClip(link);
}

export function openTwitter(url = '', text = '', notOpenDownload = false) {
  let link = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}`;

  // window.location.href = link;
  // 防止未触发app 跳转到下载链接
  // if (isIos()) {
  //   // 先拨打WhatsApp 然后跳转到下载app
  //   link = 'https://apps.apple.com/us/app/twitter/id333903271';
  // } else {
  //   // Android
  //   link = 'https://play.google.com/store/apps/details?id=com.twitter.android';
  // }
  // !notOpenDownload && openDownloadApp(link);
  copyToClip(link);
}

export function openInstagram(url = '', text = '', notOpenDownload = false) {
  let link = `https://www.instagram.com/aiaindonesia/?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}`;
  // window.location.href = link;

  // 防止未触发app 跳转到下载链接
  // if (isIos()) {
  //   // 先拨打WhatsApp 然后跳转到下载app
  //   link = 'https://apps.apple.com/app/instagram/id389801252?vt=lo';
  // } else {
  //   // Android
  //   link =
  //     'https://play.google.com/store/apps/details?id=com.instagram.android';
  // }
  // !notOpenDownload && openDownloadApp(link);
  copyToClip(link);
}

export function numFormat(num = 1000, splitStr, lang) {
  var c =
    num.toString().indexOf('.') !== -1
      ? num
          .toLocaleString()
          .replace(/\./g, '&')
          .replace(/,/g, '.')
          .replace('&', ',')
      : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, `$1${splitStr}`);
  return c;
}

export function pushHistory() {
  var state = {
    title: '',
    url: `${location.href}#`,
  };
  window.history.pushState(state, '', `${location.href}#`);
}

export function generateArray(start, end) {
  return Array.from(new Array((end ?? 0) + 1).keys()).slice(start);
}

export function debounce(proxy, func, delay = 500, ...args) {
  let context = proxy;
  if (proxy.debounceTimer) clearTimeout(proxy.debounceTimer);
  let callNow = !proxy.debounceTimer; //是否立即执行
  proxy.debounceTimer = setTimeout(() => {
    proxy.debounceTimer = null;
  }, delay);
  if (callNow) func.apply(context, args);
}

export function sendTransunion(subKey) {
  let bb;
  try {
    window.IGLOO = Object.assign({}, window.IGLOO, {
      bbout_element_id: 'ioBlackBox',
      loader: {
        subkey: subKey,
        version: 'general5',
      },
    });
    bb = window.IGLOO.getBlackbox();
    console.log('bb: ', bb.blackbox);
  } catch (e) {
    console.log('Unable to get blackbox. ', e);
  }
  return bb;
}

export function initCredoAppSDK(refNumber, url, authKey) {
  // CredoApp authentication key provided by CredoLab team
  const credoAppService = new credoappsdk.CredoAppService(url, authKey);
  credoAppService.startTracking();
  return credoAppService;
}
export const formatTime = (date, fmt) => {
  if (!date) {
    return '';
  }
  if (
    typeof date === 'string' ||
    (typeof date === 'object' && date.constructor === Date)
  ) {
    if (typeof date === 'string') {
      date = date.replace(/-/g, '/');
      const index = date.indexOf(',');
      if (index > -1) {
        date = date.substring(0, index);
      }
      date = new Date(date);
      if (date.toString() === 'Invalid Date') {
        return date;
      }
    }
    const o = {
      'M+': Number(date.getMonth()) + 1, // 月份
      'D+': date.getDate(), // 日
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((Number(date.getMonth()) + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/((y+)|(Y+))/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    }
    return fmt;
  } else {
    return date;
  }
};
export function debounceFunc(fn, delay) {
  let timer = null; //借助闭包
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay); // 简化写法
  };
}

export function throttle(fn, delay) {
  let valid = true;
  return function () {
    if (!valid) {
      //休息时间
      return false;
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    setTimeout(() => {
      fn();
      valid = true;
    }, delay);
  };
}

// 神策打点 - 初始化相关
export function sensorsMonitor(config = {}) {
  return new Promise((resolve, reject) => {
    let sensors;
    if (process.client || process.browser) {
      sensors = require('sa-sdk-javascript');
    }
    const isDev = process.env.NODE_ENV === 'development';
    sensors.init({
      server_url: isDev
        ? 'https://salasa.xcreditech.com/sa'
        : 'https://salasa.xcreditech.com/sa?project=production',
      heatmap: {
        // 是否开启点击图，default 表示开启，
        // 自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
        clickmap: 'default',
        // 是否开启触达注意力图，not_collect 表示关闭，
        // 不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
        scroll_notice_map: 'default',
        track_attr: ['data-sa', 'data-sensors'], // 全埋点自定义属性
      },
      is_track_single_page: true, // 是否单页面
      show_log: false, // isDev,
      app_js_bridge: true,
      batch_send: true,
      is_track_device_id: true, // 收集神策is_track_device_id
    });

    sensors.registerPage({
      current_url: window.location.href,
    });
    sensors.quick('autoTrack');
    resolve(sensors);
  });
}
// 异步load js
export function asyncLoadJs(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      reject();
    };
    script.src = url;
    document.getElementsByTagName('body')[0].appendChild(script);
  });
}

// 获取白屏时间
export const getWhiteScreenBaseTime = () => {
  const t = window.performance.timeOrigin;
  // 记录白屏时间 ms
  return t;
};

// 打乱数组
export function upsetArray(newArr, oldArr) {
  const deepArr = [];
  for (const i of oldArr) {
    deepArr.push(i);
  }
  const randomNum = Math.ceil(Math.random() * deepArr.length);
  newArr.push(deepArr[randomNum - 1]);
  deepArr.splice(randomNum - 1, 1);
  if (deepArr.length > 0) {
    upsetArray(newArr, deepArr);
  }
  return newArr;
}

// 打乱数组
export function upset2Array(arr) {
  const keys = [];
  for (const i of arr) {
    keys.push(i);
  }
  return keys.sort(() => (Math.random() > 0.5 ? 1 : -1));
}
export const handleAddListener = (type, fn) => {
  if (window.addEventListener) {
    window.addEventListener(type, fn);
  } else {
    window.attachEvent('on' + type, fn);
  }
};
export const getTiming = () => {
  const timingObj = {};
  try {
    const time = performance.timing;
    const loadTime = (time.loadEventEnd - time.loadEventStart) / 1000;
    if (loadTime < 0) {
      setTimeout(function () {
        getTiming();
      }, 200);
      return;
    }
    timingObj['重定向时间'] = (time.redirectEnd - time.redirectStart) / 1000;
    timingObj['DNS解析时间'] =
      (time.domainLookupEnd - time.domainLookupStart) / 1000;
    timingObj['TCP完成握手时间'] = (time.connectEnd - time.connectStart) / 1000;
    timingObj['HTTP请求响应完成时间'] =
      (time.responseEnd - time.requestStart) / 1000;
    timingObj['DOM开始加载前所花费时间'] =
      (time.responseEnd - time.navigationStart) / 1000;
    timingObj['DOM加载完成时间'] = (time.domComplete - time.domLoading) / 1000;
    timingObj['DOM结构解析完成时间'] =
      (time.domInteractive - time.domLoading) / 1000;
    timingObj['脚本加载时间'] =
      (time.domContentLoadedEventEnd - time.domContentLoadedEventStart) / 1000;
    timingObj['onload事件时间'] =
      (time.loadEventEnd - time.loadEventStart) / 1000;
    timingObj['**白屏时间**'] = (time.domLoading - time.fetchStart) / 1000;
    timingObj['页面完全加载时间'] =
      timingObj['重定向时间'] +
      timingObj['DNS解析时间'] +
      timingObj['TCP完成握手时间'] +
      timingObj['HTTP请求响应完成时间'] +
      timingObj['DOM结构解析完成时间'] +
      timingObj['DOM加载完成时间'];
    Object.keys(timingObj).forEach((key) => {
      console.log(key + ':' + timingObj[key] + '毫秒(ms)');
    });
    console.log(performance.timing);
  } catch (e) {
    console.log(e);
    console.log(timingObj);
    console.log(performance.timing);
  }
};
export function onTriggerTranction(amount, id, key) {
  const _axios = window.$nuxt.axios;
  // _axios
  //   .get(
  //     `https://cnv.adt623.net/t/t?t=3&tk=1&am=${amount}&c=EUR&ti=${id}&tp=1726357731&trt=4&ss=1&ap=1726356492&at_gd=${key}`
  //   )
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
}
export default {
  getLocation,
  setApp,
  ObjIsEmpty,
  copyToClip,
  sendSms,
  openWhatsapp,
  openMessenger,
  openTwitter,
  openInstagram,
  numFormat,
  pushHistory,
  generateArray,
  debounce,
  sendTransunion,
  initCredoAppSDK,
  formatTime,
  debounceFunc,
  throttle,
  sensorsMonitor,
  asyncLoadJs,
  upsetArray,
  upset2Array,
  handleAddListener,
  getTiming,
  onTriggerTranction,
};
