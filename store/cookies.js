const state = () => ({
  uuid: '',
});
const getters = {
  getUUID: (state) => () => {
    return state.uuid;
  },
};
const mutations = {
  setUUID(state, value) {
    state.uuid = value;
  },
};
const actions = {
  async setUUID({ state, commit }, val) {
    commit('setUUID', val);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
