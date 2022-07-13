import { request } from '@/plugins/fetch';

export default {
  // 获取产品详情
  apiGetBankList: (data) =>
    request('/bank/getBankAccountList', 'post', 'loan', data),
  // 银行卡转账还款
  apiGetBankRepay: (data) => request('/bank/cardRepay', 'post', 'loan', data),
  // 银行卡转账还款
  apiGetBankTransfer: (data) =>
    request('/bank/directTransfer', 'post', 'loan', data),
  // 绑卡相关
  // 绑定开放银行认证 获取open bank 链接
  apiBindOpenBank: (data) =>
    request('/bank/getAccessToken', 'post', 'loan', data),
  // 保存open bank数据
  apiSaveOpenBank: (data) =>
    request('/bank/saveOpenBankInfo', 'post', 'loan', data),
  // 绑定银行卡账号 - 存折 一个账号可以包含多张银行卡
  apiBindAccount: (data) => request('/bank/bindAccount', 'post', 'loan', data),
  // 绑定银行卡
  apiBindBank: (data) => request('/bank/bindBank', 'post', 'loan', data),
  // 删除银行卡 (账号/卡号)
  apiDeleteBank: (data) =>
    request('/bank/deleteBankAccount', 'post', 'loan', data),
  // 查询当前app下可用的还款方式与对应支付商的手续费
  apiGetPaymentHandlingFee: (data) =>
    request('/repay/getRepayWaysAndFee', 'post', 'loan', data),
  // 查询open bank返回的账户列表
  apiGetOpenBankAccountList: (data) =>
    request('/bank/getOpenBankAccountList', 'post', 'loan', data),
};
