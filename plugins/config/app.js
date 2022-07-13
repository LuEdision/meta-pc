export const hostMap = {
  // 西班牙
  'website.com': 'Meta',
  'www.website.com': 'Meta',
  'website.es': 'Meta',
  'www.website.es': 'Meta',
  'website.xcreditech.com': 'Meta',
  'www-test.website.es': 'Meta',
  [process.env.BASE_HOST]: 'Meta',
};

/** 有些AppName有音标 不好对照关系 在此获取音标对应AppName
 * @app 传进来小写的AppName
 *  */

export const getAppSymbols = (app) => {
  const syMap = {
    Meta: 'Meta',
  };

  return syMap[app] || app;
};

export const appMap = {
  meta: {
    app: 'Meta',
    appDesc: 'Préstamos Inteligentes Y De Confianza Para Los Españols',
    email: 'hola@website.es',
    phone: '',
    location: '',
    home: process.env.BASE_HOST || 'website.es', // 官网地址
    googlePlay:
      'https://play.google.com/store/apps/details?id=',
    googleMap: '',
    api: 'https://mxloanapi.website.es',
    payBank:
      'BBVA, Santander, HSBC, Banorte, Citibanamex, Banco Azteca, Scotiabank,',
    company: '', // 公司主体
    fullCountry: 'Españols',
  },
};

export const countryMap = {
  'website.com': 'meta',
  'www.website.com': 'meta',
  'www.website.es': 'meta',
  'website.es': 'meta',
  'website.xcreditech.com': 'meta',
  'www-test.website.es': 'meta',
  [process.env.BASE_HOST]: 'meta',
};

// 目前仅墨西哥及尼日两个模板
export const templateMap = {
  meta: 'meta',
};
