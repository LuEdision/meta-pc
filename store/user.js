// 一些登录信息
const state = () => ({
  userInfo: {}, // 用户信息
});

const mutations = {
  setUserInfo(state, data) {
    state.userInfo = {
      ...state.userInfo,
      ...data,
    };
  },
};
export default {
  namespaced: true,
  state,
  mutations,
};
