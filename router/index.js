import { setApp } from '../plugins/config/index';
const mexico = require('./MX');
const nigeria = require('./NG');
const uganda = require('./UG');
const meta = require('./ES');

const routerMap = {
  nigeria,
  mexico,
  uganda,
  meta,
};

const $routes = (res) => {
  const resolve = (url) => res(__dirname, `../pages/_lang/${url}`);
  const countryDoamin = process.env.BASE_URL;
  const { country } = setApp(countryDoamin);
  const routes = routerMap[country] || routerMap['mexico']; // 后期手动更新
  return routes(resolve);
};

module.exports = {
  base: '/pc',
  // middleware: 'stats',
  extendRoutes: (routes, resolve) => {
    routes.length = 0; // 清除 nuxt 自己生成的路由，这里不要用 空数组 赋值
    routes.push(...$routes(resolve));
  },
};
