const router = require('koa-router')();
router.prefix('/api');
router.get('/health', async (cxt, next) => {
  let rs = null;
  try {
    rs = await new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve('启动成功');
      }, 2000);
    });
    // eslint-disable-next-line no-empty
  } catch (err) {}

  cxt.body = 'Hello, ' + rs;
});
module.exports = router;
