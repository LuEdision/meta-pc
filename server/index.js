const Koa = require('koa');
const body = require('koa-body');
const path = require('path');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const rest = require('./middlreware/rest');
const AutoRoutes = require('./middlreware/autoRouter');
// const health = require('./interface/health');

const app = new Koa();

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(app.env === 'production');

//拦截静态资源 开始
const statics = require('koa-static');
const staticpath = './static/';
app.use(
  statics(path.join(__dirname, staticpath), {
    immutable: true,
  })
);
// rest middlreware
app.use(rest.restify());
async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || '0.0.0.0',
    port = process.env.PORT || 7003,
  } = nuxt.options.server;

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.on('error', (err, ctx) => {});

  // 启动api路由
  AutoRoutes.auto(app);
  // app.use(health.routes());
  // app.use(health.allowedMethods());
  // nuxt 路由
  app.use(async (ctx, next) => {
    consola.ready({
      message: `Server request url: ${ctx.request.url}`,
      badge: true,
    });
    if (/\/api/.test(ctx.request.url)) {
      //如果url中包含 /api 判定为koa2
      await next();
    } else {
      //不然使用nuxt的的render渲染
      ctx.status = 200;
      ctx.respond = false; // Bypass Koa's built-in response handling
      ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve);
        ctx.res.on('finish', resolve);
        nuxt.render(ctx.req, ctx.res, (promise) => {
          promise.then(resolve).catch(reject);
        });
      });
    }
  });

  let server = app.listen(port, host);
  server.timeout = 5 * 60 * 1000; // 超时设置
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

start();
