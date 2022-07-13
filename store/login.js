// 一些登录信息
const state = () => ({
  loginData: {}, // 登录相关数据
  userConfig: {}, // 用户配置信息
  MaxPassCount: 2,
  sendCount: 0, // 发送短信验证码次数 超过三次 则后续将出现图形验证码
  smsCode: '',
  phoneNumberObj: {},
  keyword: '',
  at_gd: '',
  camp: '',
  params: '',
});
const mutations = {
  setLoginData(state, data) {
    state.loginData = {
      ...state.loginData,
      ...data,
    };
  },
  setSmsCode(state, data) {
    state.smsCode = data;
  },
  setUserConfig(state, data) {
    state.userConfig = {
      ...state.userConfig,
      ...data,
    };
  },
  setSendCount(state) {
    state.sendCount++;
  },
  reSendCount(state) {
    state.sendCount = 0;
  },
  setPhoneNumber(state, data) {
    state.phoneNumberObj = {
      ...state.phoneNumberObj,
      ...data.phoneNumberObj,
    };
  },
  resetPhoneNumber(state) {
    state.phoneNumberObj = {};
  },
  setKeyWord(state, data) {
    state.keyword = data;
  },
  setAtGd(state, data) {
    state.at_gd = data;
  },
  setCamp(state, data) {
    state.camp = data;
  },
  setParams(state, data) {
    state.params = data;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
};
