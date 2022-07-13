const state = () => ({
  app: null, // 当前app id
  appConfig: {}, // 当前app对应配置数据
  loginCount: 0, // 当前登录次数 使用该次数来判断是否显示图像验证码
  bannerList: [],
});
const mutations = {
  setApp(state, data) {
    state.app = data;
  },
  setAppConfig(state, data) {
    const old = state.appConfig;
    state.appConfig = {
      ...old,
      ...data,
    };
  },
  setBanner(state, data) {
    state.bannerList = data;
  },
};
const getters = {
  localApp(state) {
    return state.app;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
