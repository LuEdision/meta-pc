export const AppMap = {
  meta: {
    name: 'website',
    appName: 'Meta',
    country: 'ES',
    areaCode: '34',
    regexp: /^[6|7]\d{8}$/,
    phoneLength: 9,
    i18n: 'es',
    appId: '',
    appVersion: '1.0.3',
    branchKey: 'key_live_joZdAu25uaPLMfVigYMfqomjstgIAVof',
    registerChannel: 'web',
  },
};

export const Host2App = {
  'website.es': 'meta',
  'www.website.es': 'meta',
  'www-test.website.es': 'meta',
  'website.com': 'meta',
  'localhost:8080': 'meta',
  'website.xcreditech.com': 'meta',
  [process.env.BASE_HOST]: 'meta',
};
