import { request } from '@/plugins/fetch';

// 发送短信验证码
export default {
  apiGetSmsCode: (data) =>
    request('/security/getSmsCode', 'post', 'loan', data),
  // 注册 用户/密码注册
  apiRegister: (data) => request('/security/register', 'post', 'loan', data),
  // 获取图形验证码
  apiGetCaptcha: (data) =>
    request('/captcha/getCaptcha', 'post', 'loan', {
      responseType: 'arraybuffer',
      ...data,
    }),
  // 短信登录
  apiSmsLogin: (data) =>
    request('/security/loginBySmsCode', 'post', 'loan', data),
  // 账号密码登录
  apiPwdLogin: (data) => request('/security/login', 'post', 'loan', data),
  // 判断手机号码是否注册
  apiIsRegister: (data) =>
    request('/security/checkMobileRegister', 'post', 'loan', data),
  // 此处的验证码需要单独调用短信验证码校验 校验通过才能发起重置密码
  apiResetPassword: (data) =>
    request('/security/resetPassword', 'post', 'loan', data),
  apiVerifySms: (data) =>
    request('/security/verifySmsCodeForOTP', 'post', 'loan', data),
  apiGetEncryptoKeyIv: (data) =>
    request('/security/getEncrypt', 'post', 'loan', data),
  apiLogout: (data) => request('/user/v1/clearUserInfo', 'post', 'loan', data),
};
