import VuexPersist from 'vuex-persist';
import cookies from './cookies';
import bank from './bank';
import loan from './loan';
import login from './login';
import setting from './setting';
import scheme from './scheme';
import user from './user';
import multiLangs from './multiLangs';
let vuexLocal;
if (process.client || process.browser) {
  vuexLocal = new VuexPersist({
    storage: window.localStorage,
  });
} else {
  vuexLocal = new VuexPersist({});
}

export const store = {
  getters: {
    setting: (state) => state.setting,
    login: (state) => state.login,
    loan: (state) => state.loan,
    user: (state) => state.user,
    scheme: (state) => state.scheme,
    bank: (state) => state.bank,
    cookies: (state) => state.cookies,
    multiLangs: (state) => state.multiLangs,
  },
  modules: {
    cookies,
    setting,
    login,
    loan,
    user,
    scheme,
    bank,
    multiLangs,
  },
  plugins: [vuexLocal.plugin],
};

export default store;
