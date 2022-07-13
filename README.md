# website_meta

## 启动
```bash
# install npm
yarn install
# 启动服务
yarn serve
```

## 部署
```bash
# 手动build 并上传dist
yarn build
```

## 解决刷新页面突然变成404的问题
- 添加nginx根路径
- [参考地址](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)

## 上线其他app
- 切分支，愿望是一个app一个分支，且一个国家(可能多个马甲包)同一个布局
- 修改相关国家布局css
- 相关文案更新
- 部署流程
- `npm run build`
- `pm2 start --env development`
- `pm2 start --env production`


##
- `npm cache clean --force`

## `yarn.lock`转`package-lock.json`
- `yarn global add synp`
- `synp --source-file ./yarn.lock`

## 国家简写
- (对照参考)(https://www.gegeurope.com/Pages/CountryCode.htm)
