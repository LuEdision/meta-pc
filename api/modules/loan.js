import { request } from '@/plugins/fetch';

// 获取产品详情
export default {
  apiGetAppInfo: (data) => request('/loan/getProducts', 'post', 'loan', data),
  // 预授信申请
  apiApplyPreCredit: (data) =>
    request('/preCredit/apply', 'post', 'loan', data),
  // 预授信结果查询
  apiGetPreCredit: (data) =>
    request('/preCredit/getResult', 'post', 'loan', {
      notify: false,
      ...data,
    }),
  // 申请贷款 - 试算
  apiApplyPreLoan: (data) => request('/loan/calLoan', 'post', 'loan', data),
  // 申请贷款
  apiApplyLoan: (data) => request('/loan/applyLoan', 'post', 'loan', data),
  // 申请贷款 - 电子签章
  apiHandleESignature: (data) =>
    request('/preCredit/getSignatureUrl', 'post', 'loan', data),
  // 申请贷款 - 电子签章
  apiGetESignature: (data) =>
    request('/loan/getSignatureUrl', 'post', 'loan', data),
  // 申请贷款 - 电子签章
  apiSubmitESignature: (data) =>
    request('/loan/submitSignature', 'post', 'loan', data),
  // 查看合同pdf文档
  apiGetPdf: (data) =>
    request('/preCredit/downloadSignatureFile', 'post', 'loan', data),
  // 获取最后一个未还清的贷款单
  apiGetLastUnpayLoan: (data) =>
    request('/loan/getLastUnpaidOffLoan', 'post', 'loan', {
      ...data,
      notify: false,
    }),

  // 查看贷款总账单
  apiGetAllPayment: (data) =>
    request('/loan/getLoanSummaryByPaymentId', 'post', 'loan', data),

  // 借据历史
  apiGetLoanLog: (data) => request('/loan/getLoanList', 'post', 'loan', data),

  // 删除用户 - 获取mati
  apiGetMatiConfig: (data) =>
    request('/user/getMatiConfig', 'post', 'loan', data),
  // 删除用户 - mati认证完成 发起请求
  apiSendMatiSubmit: (data) =>
    request('/user/matiSubmit', 'post', 'loan', data),
  // 删除用户 - 获取mati认证状态
  apiGetMatiResult: (data) => request('/user/matiResult', 'post', 'loan', data),
  // 获取mati状态数据
  apiGetHasMati: (data) => request('/user/hasMatiCheck', 'post', 'loan', data),
  // 查询还款结果
  apiGetPayResult: (data) => request('loan/getPayResult', 'post', 'loan', data),
  // 展期申请试算接口
  apiCalExtendRequest: (data) =>
    request('loan/calExtendRequest', 'post', 'loan', data),
  apiSubmitExtendRequest: (data) =>
    request('loan/submitExtendRequest', 'post', 'loan', data),
  apiGetExtendRequestStatus: (data) =>
    request('loan/getExtendRequestStatus', 'post', 'loan', data),
};
