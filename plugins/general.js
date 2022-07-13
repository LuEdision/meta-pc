const copyText = (text) => {
  const oInput = document.createElement('input');
  oInput.value = text;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand('Copy'); // 执行浏览器复制命令
  oInput.remove();
};

const isMobile = () => {
  const flag =
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
      navigator.userAgent
    );
  return flag;
};

/**
 * @description: 设置cookies
 * @event: setCookie
 * @param {*} cookieName 键名
 * @param {*} cookieValue 键值
 * @param {*} expires 过期时间
 * @param {*} path 路径
 * @param {*} domain 域名
 * @param {*} secure 安全
 * @return: void
 */
const setCookie = (
  cookieName,
  cookieValue,
  expires,
  path = '/',
  domain,
  secure
) => {
  let cookie = escape(cookieName) + '=' + escape(cookieValue);
  if (expires) {
    cookie += ';expires=' + expires.toUTCString();
  }
  if (path) {
    cookie += ';path=' + path;
  }
  if (domain) {
    cookie += ';domain=' + domain;
  }
  if (secure) {
    cookie += ';secure=' + secure;
  }
  document.cookie = cookie;
};

/**
 * @description: 获取cookies
 * @event: getCookie
 * @param {*} cookieName 键名
 * @return: 返回键值
 */
const getCookie = (cookieName) => {
  let cookieValue = '';
  const cookie = document.cookie,
    posName = cookie.indexOf(escape(cookieName) + '=');
  if (posName !== -1) {
    const posValue = posName + (escape(cookieName) + '=').length,
      endPos = cookie.indexOf(';', posValue);
    if (endPos !== -1) {
      cookieValue = unescape(cookie.substring(posValue, endPos));
    } else {
      cookieValue = unescape(cookie.substring(posValue));
    }
  }
  return cookieValue;
};

/**
 * @description: cookieName
 * @event: clearCookie
 * @param {*} cookieName 键名
 * @return: void
 */
const clearCookie = (cookieName) => {
  const now = new Date(),
    yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
  setCookie(cookieName, '', yesterday);
};

// 获取本地存储
const getLocalStorage = (name) => {
  return localStorage.getItem(name) || '';
};
// 设置本地存储
const setLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
};

const clearLocalStorage = (name) => {
  localStorage.removeItem(name);
};

// 获取会话存储
const getSession = (name) => {
  return sessionStorage.getItem(name) || '';
};
// 设置会话存储
const setSession = (name, value) => {
  sessionStorage.setItem(name, value);
};

const clearSession = (name) => {
  sessionStorage.removeItem(name);
};

/**
 * @description: 时间格式化
 * @event: formatTime
 * @param {*} date 需要格式化的时间/字符串
 * @param {*} fmt：格式，如"yyyy-MM-dd"为2016-05-03，"yyyy-M-d"为2016-5-3，"MM-dd hh:mm"为05-03 17:08
 * @return: 格式化后的时间格式
 */
const formatTime = (date, fmt) => {
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

// 获取所有的url参数，有参数时，只返回指定参数
const getUrlParam = (name, search) => {
  search = search || location.search.replace(/^\?/, '');
  const r = {};
  if (search) {
    const param = unescape(search).split('&');
    for (const i of param) {
      const item = param[i].split('=');
      r[item[0]] = item[1];
    }
  }
  return name ? r[name] : r;
};
// 根据QueryString参数名称获取值
const getQueryStringByName = (name, search) => {
  search = search || location.search;
  const result = search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'));
  if (result === undefined || (result && result.length < 1)) {
    return '';
  }
  return unescape(result && result[1] ? result[1] : '');
};
// url参数及操作 ============================
// 获取所有的url参数，有参数时，只返回指定参数
const getQueryString = (name) => {
  return name ? getQueryStringByName(name) : getUrlParam(name);
};

/**
 * @description: 深拷贝-递归调用
 * @event: deepCopy
 * @param {*} obj 需要进行深拷贝的对象
 * @return: 返回深拷贝值
 */
const deepCloneRecursion = (source) => {
  const targetObj = source.constructor === Array ? [] : new Object({}); // 判断复制的目标是数组还是对象
  for (const keys in source) {
    // 遍历目标
    if (Object.prototype.hasOwnProperty.call(targetObj, keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        // 如果值是对象，就递归一下
        targetObj[keys] =
          source[keys].constructor === Array ? [] : new Object({});
        targetObj[keys] = deepCloneRecursion(source[keys]);
      } else {
        // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
};

// 阻止浏览器的默认行为
const stopDefault = (e) => {
  const event = window.event || e;
  // 阻止默认浏览器动作(W3C)
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  // IE中阻止函数器默认动作的方式
  else {
    event.returnValue = false;
  }
  return false;
};
// 停止冒泡行为
const stopBubble = (e) => {
  const event = window.event || e;
  // 如果提供了事件对象，则这是一个非IE浏览器
  if (e && e.stopPropagation) {
    // 因此它支持W3C的stopPropagation()方法
    e.stopPropagation();
  }
  // 否则，我们需要使用IE的方式来取消事件冒泡
  else {
    event.cancelBubble = true;
  }
};

export default {
  copyText,
  isMobile,
  setCookie,
  getCookie,
  clearCookie,
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  setSession,
  getSession,
  clearSession,
  deepCloneRecursion,
  formatTime,
  getQueryString,
  getQueryStringByName,
  getUrlParam,
  stopDefault,
  stopBubble,
};
