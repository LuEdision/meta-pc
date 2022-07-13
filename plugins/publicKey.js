import Vue from 'vue';
import { setApp } from '@/utils/index.client';
export const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9wHo7XSzVO6v5CFsAEGa
7TLwcwZHDBpP+LpOJbeM1LS2VAJWibJchaYd+IHui3flSNBn/LDVjB4f1fxVQLOi
uP5PvDTUUzjuIyKhS+kIe9eTd5jpijcCqh309LS3aVZebDWCerDeae0NaEGTLFeo
ix5Jvav8svAEbP/4jvCfBWrr5qG8XUeTLlFxADpxl9/83UUheDgvNX1gKFKuG6bT
dHN7puge5fb6q4/49AHVs4nc0eX3jr4yJaLaY4wbWkpLti7SbDqXUQLb7zqcsbNy
6gH4nagq1+fPBowhLrfrEla0S/VHz7APjQgOPg9F5K4tE05B132Aw4JmSSYUcTSt
IQIDAQAB
-----END PUBLIC KEY-----`;
export const prodPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq4ssEe/I69C/9ZSXfvrU
WYr5KQ2uTMEj2/39wdn73mnJW9zPuUVQ/QHAZMEhsuZLOjmFcxxXPQX9s8muSnwu
ONctqpnCQZAKBr7M0E5HbWkUeGrfuyrcZjumHHXVrZBgcqCzb1tbj8LEXM82k2k8
y/2q3Y5G8R6FBh2GGwIxB+//r8uowNDd186yDXw+FiXv8hBaMDIdrIjpcmp3jqX8
WiHCq4dWjKjF2/IGFC8QF47XkIQTtcr8TypxkhAtuJm6oVjFa8D8gYn90eo32+tp
17PilE2k3JBy03A5ZGYtvPMhUBLAOPzoKB/vA6Jt6fwA7JQY5BHSdAHRm61N5W52
EQIDAQAB
-----END PUBLIC KEY-----`;
if (process.client || process.browser) {
  const { appConfig } = setApp('');
  Vue.prototype.$publicKey =
    process.env.NODE_ENV === 'production' ? prodPublicKey : publicKey;
  Vue.prototype.$config = {
    ...appConfig,
    latitude: '',
    longitude: '',
  };
}
