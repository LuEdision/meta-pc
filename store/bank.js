// 一些登录信息
const state = () => ({
  historyRecord: null,
  fromOrigin: '',
  payWay: '',
  openBank: 0,
  bankCard: 0,
});
const mutations = {
  setHistoryRecord(state, data) {
    state.historyRecord = data;
  },
  setOrigin(state, data) {
    state.fromOrigin = data;
  },
  setPayWay(state, data) {
    state.payWay = data;
  },
  setOpenBank(state, data) {
    state.openBank = data;
  },
  setBankCard(state, data) {
    state.bankCard = data;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
