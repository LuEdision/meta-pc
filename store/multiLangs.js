/* eslint-disable no-unused-vars */
const state = () => ({
  locales: ['es', 'en', 'zh'],
  locale: 'es',
});
const getters = {
  getLangs: (state) => () => {
    return state;
  },
};
const mutations = {
  SET_LANG(state, locale) {
    //用于更改当前国际化
    if (state.locales.includes(locale)) {
      state.locale = locale;
    }
  },
};
const actions = {
  async setLang({ state, commit }, val) {
    commit('SET_LANG', val);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
