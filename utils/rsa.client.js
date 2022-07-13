/* 产引入jsencrypt实现数据RSA加密 */
import { JSEncrypt } from 'jsencrypt'; // 处理长文本数据时报错 jsencrypt.js Message too long for RSA
import { hex2b64, b64tohex } from 'jsencrypt/lib/lib/jsbn/base64';

// 公钥key
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9wHo7XSzVO6v5CFsAEGa
7TLwcwZHDBpP+LpOJbeM1LS2VAJWibJchaYd+IHui3flSNBn/LDVjB4f1fxVQLOi
uP5PvDTUUzjuIyKhS+kIe9eTd5jpijcCqh309LS3aVZebDWCerDeae0NaEGTLFeo
ix5Jvav8svAEbP/4jvCfBWrr5qG8XUeTLlFxADpxl9/83UUheDgvNX1gKFKuG6bT
dHN7puge5fb6q4/49AHVs4nc0eX3jr4yJaLaY4wbWkpLti7SbDqXUQLb7zqcsbNy
6gH4nagq1+fPBowhLrfrEla0S/VHz7APjQgOPg9F5K4tE05B132Aw4JmSSYUcTSt
IQIDAQAB
-----END PUBLIC KEY-----`;
const prodPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq4ssEe/I69C/9ZSXfvrU
WYr5KQ2uTMEj2/39wdn73mnJW9zPuUVQ/QHAZMEhsuZLOjmFcxxXPQX9s8muSnwu
ONctqpnCQZAKBr7M0E5HbWkUeGrfuyrcZjumHHXVrZBgcqCzb1tbj8LEXM82k2k8
y/2q3Y5G8R6FBh2GGwIxB+//r8uowNDd186yDXw+FiXv8hBaMDIdrIjpcmp3jqX8
WiHCq4dWjKjF2/IGFC8QF47XkIQTtcr8TypxkhAtuJm6oVjFa8D8gYn90eo32+tp
17PilE2k3JBy03A5ZGYtvPMhUBLAOPzoKB/vA6Jt6fwA7JQY5BHSdAHRm61N5W52
EQIDAQAB
-----END PUBLIC KEY-----`;
// 私钥key
const privateKey = '';
// function pkcs1unpad2(d: BigInteger, n: number) {
//   var b = d.toByteArray();
//   var i = 0;
//   while (i < b.length && b[i] == 0) {
//     ++i;
//   }
//   //注释即可
//   // if (b.length - i != n - 1 || b[i] != 2) {
//   //     return null;
//   // }
//   ++i;
//   while (b[i] != 0) {
//     if (++i >= b.length) {
//       return null;
//     }
//   }
//   var ret = '';
//   while (++i < b.length) {
//     var c = b[i] & 255;
//     if (c < 128) {
//       // utf-8 decode
//       ret += String.fromCharCode(c);
//     } else if (c > 191 && c < 224) {
//       ret += String.fromCharCode(((c & 31) << 6) | (b[i + 1] & 63));
//       ++i;
//     } else {
//       ret += String.fromCharCode(
//         ((c & 15) << 12) | ((b[i + 1] & 63) << 6) | (b[i + 2] & 63)
//       );
//       i += 2;
//     }
//   }
//   return ret;
// }
export function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

// byte数组转16进制

export function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xf).toString(16));
  }
  return hex.join('');
}

export function base64ToUint8Array(base64, type) {
  let bstr = window.atob(base64),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n); // 转换编码后才可以使用charCodeAt 找到Unicode编码
  }
  return u8arr;
}

// btye数组转base64
export function arrayBufferToBase64(buffer) {
  var binary = '';

  var bytes = new Uint8Array(buffer);

  var len = bytes.byteLength;

  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}

// base64转btye数组
export function base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);

  var len = binary_string.length;

  var bytes = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }

  return bytes;
}

// utf-8数组转字符串

export function utf8ByteToUnicodeStr(utf8Bytes) {
  var unicodeStr = '';

  for (var pos = 0; pos < utf8Bytes.length; ) {
    var flag = utf8Bytes[pos];

    var unicode = 0;

    if (flag >>> 7 === 0) {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);

      pos += 1;
    } else if ((flag & 0xfc) === 0xfc) {
      unicode = (utf8Bytes[pos] & 0x3) << 30;

      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 24;

      unicode |= (utf8Bytes[pos + 2] & 0x3f) << 18;

      unicode |= (utf8Bytes[pos + 3] & 0x3f) << 12;

      unicode |= (utf8Bytes[pos + 4] & 0x3f) << 6;

      unicode |= utf8Bytes[pos + 5] & 0x3f;

      unicodeStr += String.fromCharCode(unicode);

      pos += 6;
    } else if ((flag & 0xf8) === 0xf8) {
      unicode = (utf8Bytes[pos] & 0x7) << 24;

      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 18;

      unicode |= (utf8Bytes[pos + 2] & 0x3f) << 12;

      unicode |= (utf8Bytes[pos + 3] & 0x3f) << 6;

      unicode |= utf8Bytes[pos + 4] & 0x3f;

      unicodeStr += String.fromCharCode(unicode);

      pos += 5;
    } else if ((flag & 0xf0) === 0xf0) {
      unicode = (utf8Bytes[pos] & 0xf) << 18;

      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 12;

      unicode |= (utf8Bytes[pos + 2] & 0x3f) << 6;

      unicode |= utf8Bytes[pos + 3] & 0x3f;

      unicodeStr += String.fromCharCode(unicode);

      pos += 4;
    } else if ((flag & 0xe0) === 0xe0) {
      unicode = (utf8Bytes[pos] & 0x1f) << 12;

      unicode |= (utf8Bytes[pos + 1] & 0x3f) << 6;

      unicode |= utf8Bytes[pos + 2] & 0x3f;

      unicodeStr += String.fromCharCode(unicode);

      pos += 3;
    } else if ((flag & 0xc0) === 0xc0) {
      //110

      unicode = (utf8Bytes[pos] & 0x3f) << 6;

      unicode |= utf8Bytes[pos + 1] & 0x3f;

      unicodeStr += String.fromCharCode(unicode);

      pos += 2;
    } else {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);

      pos += 1;
    }
  }

  return unicodeStr;
}
export class JSEncryptExt extends JSEncrypt {
  constructor(options = {}) {
    super();
    this.logSrc = options.log || false;
    this.keySrc = null;
  }
  encryptLong2(string) {
    var k = this.getKey();
    try {
      var lt = '';
      var ct = '';
      //1.获取字符串截取点
      var bytes = new Array();
      bytes.push(0);
      var byteNo = 0;
      var len, c;
      len = string.length;
      var temp = 0;
      for (var i = 0; i < len; i++) {
        c = string.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10ffff) {
          byteNo += 4;
        } else if (c >= 0x000800 && c <= 0x00ffff) {
          byteNo += 3;
        } else if (c >= 0x000080 && c <= 0x0007ff) {
          byteNo += 2;
        } else {
          byteNo += 1;
        }
        if (byteNo % 117 >= 114 || byteNo % 117 == 0) {
          if (byteNo - temp >= 114) {
            bytes.push(i);
            temp = byteNo;
          }
        }
      }
      //2.截取字符串并分段加密
      if (bytes.length > 1) {
        for (var j = 0; j < bytes.length - 1; j++) {
          var str;
          if (j == 0) {
            str = string.substring(0, bytes[j + 1] + 1);
          } else {
            str = string.substring(bytes[j] + 1, bytes[j + 1] + 1);
          }
          var t1 = k.encrypt(str);
          ct += t1;
        }
        if (bytes[bytes.length - 1] != string.length - 1) {
          var lastStr = string.substring(bytes[bytes.length - 1] + 1);
          ct += k.encrypt(lastStr);
        }
        return hex2b64(ct);
      }
      var t = k.encrypt(string);
      var y = hex2b64(t);
      return y;
    } catch (ex) {
      return false;
    }
  }
  decryptLong2(string) {
    var k = this.getKey();
    var MAX_DECRYPT_BLOCK = 128;
    try {
      var ct = '';
      var t1;
      var bufTmp;
      var hexTmp;
      var str = b64tohex(string);
      var buf = hexToBytes(str);
      var inputLen = buf.length;
      //开始长度
      var offSet = 0;
      //结束长度
      var endOffSet = MAX_DECRYPT_BLOCK;

      //分段加密
      while (inputLen - offSet > 0) {
        if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
          bufTmp = buf.slice(offSet, endOffSet);
          hexTmp = bytesToHex(bufTmp);
          t1 = k.decrypt(hexTmp);
          ct += t1;
        } else {
          bufTmp = buf.slice(offSet, inputLen);
          hexTmp = bytesToHex(bufTmp);
          t1 = k.decrypt(hexTmp);
          ct += t1;
        }
        offSet += MAX_DECRYPT_BLOCK;
        endOffSet += MAX_DECRYPT_BLOCK;
      }
      return ct;
    } catch (ex) {
      return false;
    }
  }
}

/* JSEncrypt加密 */
export function rsaEncrypt(data) {
  var jsencrypt = new JSEncryptExt();
  jsencrypt.setPublicKey(
    process.env.NODE_ENV === 'production' ? prodPublicKey : publicKey
  );
  // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
  var result = jsencrypt.encryptLong2(data);
  return result;
}
/* JSEncrypt解密 */
export function rsaDecrypt(data) {
  var jsencrypt = new JSEncrypt();
  jsencrypt.setPublicKey(
    process.env.NODE_ENV === 'production' ? prodPublicKey : publicKey
  );
  // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
  var result = jsencrypt.decrypt(data);
  return result;
}

export default { rsaEncrypt, rsaDecrypt };
