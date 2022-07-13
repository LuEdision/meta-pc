import { request } from '@/plugins/fetch';

export default {
  acceptCookies: (data) => request('/util/submitWebInfo', 'post', 'loan', data),
  sendEmail: (data) =>
    request('/util/submitContactMessage', 'post', 'loan', data),
  checkHealth: (data) => request('/api/health', 'get', '', data),
};
