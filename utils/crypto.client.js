import { AES_GCM } from 'asmcrypto.js';

const publicKey = '';
const encoder = new TextEncoder();
const utf8decoder = new TextDecoder();

export function byteToString(arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  let str = '',
    _arr = arr;
  for (let i = 0; i < _arr.length; i++) {
    let one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      let bytesLength = v[0].length;
      let store = _arr[i].toString(2).slice(7 - bytesLength);
      for (let st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
} //字符串转byte数组
export function stringToByte(str) {
  let bytes = new Array();
  let len, c;
  len = str.length;
  for (let i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10ffff) {
      bytes.push(((c >> 18) & 0x07) | 0xf0);
      bytes.push(((c >> 12) & 0x3f) | 0x80);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      bytes.push(((c >> 12) & 0x0f) | 0xe0);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      bytes.push(((c >> 6) & 0x1f) | 0xc0);
      bytes.push((c & 0x3f) | 0x80);
    } else {
      bytes.push(c & 0xff);
    }
  }
  return bytes;
}
export function Uint8ToBase64(u8Arr) {
  var CHUNK_SIZE = 0x8000; //arbitrary number
  var index = 0;
  var length = u8Arr.length;
  var result = '';
  var slice;
  while (index < length) {
    slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
    result += String.fromCharCode.apply(null, slice);
    index += CHUNK_SIZE;
  }
  return window.btoa(result);
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
export function base64ToArrayBuffer(base64) {
  var arr = base64.split(',');
  var binaryString = window.atob(arr[1]);
  var len = binaryString.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
export function aesEncrypt(data, keyStr, iv) {
  keyStr = keyStr ? keyStr : publicKey;
  let content = AES_GCM.encrypt(
    encoder.encode(data),
    base64ToUint8Array(keyStr),
    base64ToUint8Array(iv)
  );
  const encrypted = new Uint8Array(
    content.byteLength + base64ToUint8Array(iv).byteLength
  );
  encrypted.set([...base64ToUint8Array(iv), ...content]);

  return Uint8ToBase64(encrypted);
}
//解密
export function aesDecrypt(data, keyStr, iv) {
  keyStr = keyStr ? keyStr : publicKey;
  let result = AES_GCM.decrypt(
    base64ToUint8Array(data).slice(12, base64ToUint8Array(data).byteLength),
    base64ToUint8Array(keyStr),
    base64ToUint8Array(iv)
  );
  return utf8decoder.decode(result);
}
// export function aesEncrypt(data: any, keyStr?: string) {
//   keyStr = keyStr ? keyStr : publicKey;
//   let key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
//   const str2Byte = stringToByte(' '.repeat(12) + data + ' '.repeat(16));
//   let srcs = CryptoJS.enc.Utf8.parse(' '.repeat(12) + data + ' '.repeat(16));
//   let encrypted = CryptoJS.AES.encrypt(srcs, key, {
//     iv: key,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.ZeroPadding,
//   });
//   return encrypted.toString();
// }
// //解密
// export function aesDecrypt(data: any, keyStr?: string) {
//   keyStr = keyStr ? keyStr : publicKey;
//   let key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
//   let decrypt = CryptoJS.AES.decrypt(data, key, {
//     iv: key,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.ZeroPadding,
//   });
//   return CryptoJS.enc.Utf8.stringify(decrypt).toString();
// }

// export function aesEncrypt(data: any, keyStr?: string) {
//   keyStr = keyStr ? keyStr : publicKey;
//   let content = ' '.repeat(12) + data + ' '.repeat(16);
//   const cipher = crypto.createCipheriv('aes-256-gcm', keyStr, keyStr);
//   var crypted = cipher.update(content, 'utf8', 'base64');
//   crypted += cipher.final('base64');
//   return crypted;
// }
// //解密
// export function aesDecrypt(encrypted: any, keyStr?: string) {
//   keyStr = keyStr ? keyStr : publicKey;
//   const decipher = crypto.createDecipheriv('aes-256-gcm', keyStr, keyStr);
//   var decrypted = decipher.update(encrypted, 'base64', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }

export function generatekey(num) {
  let library =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < num; i++) {
    let randomPoz = Math.floor(Math.random() * library.length);
    key += library.substring(randomPoz, randomPoz + 1);
  }
  return key;
}

export default {
  byteToString,
  stringToByte,
  generatekey,
  aesEncrypt,
  aesDecrypt,
};
