const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
// 服务端路由前缀
const baseUrl = '/api/';
var exports = {};

exports['auto'] = function (app) {
  let files = fs.readdirSync(path.join(__dirname, '../interface'));
  let jsFiles = files.filter((f) => {
    return f.endsWith('.js');
  }, files);

  for (let f of jsFiles) {
    let name = f.substring(0, f.length - 3);
    exports[name] = require('../interface/' + f);
    router.use(
      baseUrl + name,
      exports[name].routes(),
      exports[name].allowedMethods()
    );
    app.use(exports[name].routes(), exports[name].allowedMethods());
  }
};
module.exports = exports;
