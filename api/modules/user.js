import { request } from '@/plugins/fetch';

export default {
  // 获取个人信息
  apiGetUserinfo: (data) => request('/user/getUserInfo', 'post', 'loan', data),
  // 获取个人全部信息 + 工作信息
  apiGetFullUserinfo: (data) =>
    request('/user/getUserFullInfo', 'post', 'loan', data),
  // 更新用户信息
  apiUpdateUserinfo: (data) =>
    request('/user/updateUserInfo', 'post', 'loan', data),
  // 判断用户是否填完个人资料
  apiFinishUserinfo: (data) =>
    request('/user/finishPersonalInfo', 'post', 'loan', data),
  // 用户流水记录
  apiCashLog: (data) => request('/user/getCashFlow', 'post', 'loan', data),
  // 获取用户邀请码
  apiGetInviteCode: (data) =>
    request('/user/getInviteCode', 'post', 'loan', data),
  // 修改用户配置信息
  apiUpdateUserConfig: (data) =>
    request('/user/modifyUserInfoConfig', 'post', 'loan', data),
  // 查询用户配置信息
  apiGetUserConfig: (data) =>
    request('/user/getUserInfoConfig', 'post', 'loan', data),
  // 删除 注销个人信息
  apiDelUserInfo: (data) =>
    request(
      '/user/clearUserInfo',
      'post', // 1 删除个人信息 2注销账号
      'loan',
      data
    ),
  // 获取电子简章
  apiUploadSignature: (data) =>
    request('/user/getSignatureUrl', 'post', 'loan', {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest',
      },
      ...data,
    }),
};
