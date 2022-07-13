export default ({ isHMR, app, store, route, params, redirect, error }) => {
  const defaultLocale = app.i18n.fallbackLocale;
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return;
  // Get locale from params

  const locale =
    (process.client ? localStorage.getItem('lang') : '') ||
    params.lang ||
    app.i18n.locale ||
    store.state.multiLangs.locale ||
    defaultLocale;
  if (store.state.multiLangs.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 });
  }
  // Set locale
  store.commit('multiLangs/SET_LANG', locale);
  app.i18n.locale = locale;
  // app.i18n.fallbackLocale = locale;
  // app.i18n.defaultLocale = locale;
  app.i18n.setLocale(locale);
  if (process.client || process.browser) {
    localStorage.setItem('lang', locale);
  }
  // If route is /<defaultLocale>/... -> redirect to /...
  app.i18n.path = (link) => {
    // 如果是默认语言，就省略
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }
    return `/${app.i18n.locale}/${link}`;
  };
  if (
    locale === defaultLocale &&
    route.fullPath.indexOf('/' + defaultLocale) === 0
  ) {
    const toReplace =
      '^/' +
      defaultLocale +
      (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '');
    const re = new RegExp(toReplace);
    return redirect(route.fullPath.replace(re, '/'));
  }
};
