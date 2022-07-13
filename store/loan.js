// 一些登录信息
const state = () => ({
  lastLoan: {},
  preCredit: {}, // 预授信接口返回的数据 比如reqId mati相关数据
  preLoan: {}, // 预试算接口返回数据 确认时展示使用
  applyData: {}, // 申请借款返回的数据
  logData: {},
  bankList: {},
  accountId: '',
  preResult: {},
  homeStatus: '',
  productInfo: [],
  repayAmount: 0,
  periodDays: 0,
  extendId: '',
  repayType: 0,
});
const mutations = {
  setLastLoan(state, data) {
    state.lastLoan = data;
  },
  setPreCredit(state, data) {
    state.preCredit = {
      ...state.preCredit,
      ...data,
    };
  },
  setPreLoan(state, data) {
    state.preLoan = {
      ...state.preLoan,
      ...data,
    };
  },
  setApplyData(state, data) {
    state.applyData = {
      ...state.applyData,
      ...data,
    };
  },
  setLogData(state, data) {
    state.logData = {
      ...state.logData,
      ...data,
    };
  },
  setBankList(state, data) {
    state.bankList = {
      ...state.bankList,
      ...data,
    };
  },
  setAccountId(state, data) {
    state.accountId = data;
  },
  setPreResult(state, data) {
    state.preResult = {
      ...state.preResult,
      ...data,
    };
  },
  setHomeStatus(state, data) {
    state.homeStatus = data;
  },
  setProductInfo(state, data) {
    state.productInfo = [...data];
  },
  setRepayAmount(state, data) {
    state.repayAmount = data;
  },
  setExtensionDays(state, data) {
    state.periodDays = data;
  },
  setExtensionId(state, data) {
    state.extendId = data;
  },
  setRepayByExtension(state, data) {
    state.repayType = data;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
};
