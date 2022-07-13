import Cookies from 'js-cookie';

export default ({ app, query, redirect }) => {
  app.nuxt.defaultTransition.beforeEnter = () => {
    app.i18n.finalizePendingLocaleChange();
  };

  // Optional: wait for locale before scrolling for a smoother transition
  app.router.options.scrollBehavior = async (to, from, savedPosition) => {
    // Make sure the route has changed
    if (to.name !== from.name) {
      await app.i18n.waitForPendingLocaleChange();
    }
    return savedPosition || { x: 0, y: 0 };
  };
  app.router.beforeEach((to, from, next) => {
    if (
      (process.client || process.browser) &&
      process.env.NODE_ENV === 'production'
    ) {
      if (to.meta.eventName) {
        window.gtag('event', to.meta.eventName, {
          send_to: app.context.$GAID,
        });
      }
    }
    const path = (to.path || '').toLowerCase();
    const full = to.fullPath || '';

    const PageId = (query && query.page_id) || '';
    const RedirectMap = {
      // kashway
      75: '/terms-of-use',
      49: '/privacy-policy',
      // ipesa
      112: '/terms-of-use',
      114: '/privacy-policy',
    };

    if (PageId && RedirectMap[PageId]) {
      redirect(RedirectMap[PageId]);
      return;
    }

    if (to.path.startsWith('/sys')) {
      next();
      return;
    }
    // if (process.client || process.browser) {
    const token = Cookies.get('loan_app_token');
    if (token) {
      if (!to.meta.required) {
        next({
          path: '/sys',
        });
      } else {
        next();
      }
    } else {
      next();
    }
    // }

    // if (path.startsWith('/mpesarepaymentsteps')) {
    //   // 强制跳转到对应h5
    //   redirect(full.replace('/mpesarepaymentsteps', '/h5'));
    // } else {
    //   next();
    // }
  });
};
