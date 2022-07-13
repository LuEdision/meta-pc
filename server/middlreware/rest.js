const logger = require('koa-log4').getLogger('app');

module.exports = {
  APIError: function (message, code) {
    logger.error(code + ':' + message);
    this.code = code || '400';
    this.message = message || '';
  },
  restify: (pathPrefix) => {
    pathPrefix = pathPrefix || '/api/';

    return async (ctx, next) => {
      if (ctx.request.path.startsWith(pathPrefix)) {
        ctx.rest = (data, statusCode, message) => {
          ctx.response.type = 'application/json';
          ctx.response.body = {
            data: data,
            code: statusCode || 200,
            msg: message || 'OK',
          };
        };
        ctx.err = (message, data, statusCode) => {
          ctx.response.type = 'application/json';
          ctx.response.body = {
            data: data || {},
            code: statusCode || 300,
            msg: message || 'Server exception',
          };
        };
        try {
          await next();
        } catch (e) {
          // 返回错误:
          ctx.response.status = 500;
          ctx.response.type = 'application/json';
          ctx.response.body = {
            code: e.code || 'internal:unknown_error',
            msg: e.message || '',
          };
          return;
        }
      } else {
        await next();
      }
    };
  },
};
