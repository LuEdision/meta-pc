const fs = require('fs');
const path = require('path');
const router = require('./router/index');
const i18n = require('./locales/index');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const pkg = require('./package');
const dir = '';

module.exports = {
  mode: 'universal',
  env: {
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    BASE_HOST: process.env.BASE_HOST,
  },
  telemetry: false,
  // target: 'static',
  ssr: true,
  server: {
    port: 7003,
    host: '0.0.0.0',
    timing: true,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    // },
  },
  head: {
    title: process.env.npm_package_name || 'Meta',
    script: [
      {
        src: 'https://web-button.mati.io/button.js',
        ssr: false,
        async: true,
        defer: true,
      },
      {
        src: '/pc/lib/credoappsdk.js',
        ssr: false,
        async: true,
        defer: true,
      },
      {
        src: '/pc/lib/config.js',
        ssr: false,
        async: true,
        defer: true,
      },
      {
        src: '/pc/lib/loader_only.js',
        ssr: false,
        async: true,
        defer: true,
      },
      {
        src: `/pc/lib/px2rem.js?t=${Date.now()}`,
        ssr: false,
        async: false,
        defer: false,
      },
      {
        src: `/lib/fb-track.js?t=${Date.now()}`,
        ssr: false,
        async: true,
        defer: true,
      },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: pkg.name || 'Ezeuro Web' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/pc/favicon.ico' },
      { rel: 'shortcut icon', href: '/pc/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/pc/favicon.ico' },
      // { rel: 'apple-touch-icon', type: 'image/x-icon', href: `${dir}/apple-touch-icon.png` },
      // { rel: 'apple-touch-icon', type: 'image/x-icon',sizes:"57x57", href: `${dir}/apple-touch-icon.png` },
      // { rel: 'apple-touch-icon', type: 'image/x-icon',sizes:"60x60", href: `${dir}/apple-touch-icon.png` },
      // { rel: 'apple-touch-icon', type: 'image/x-icon',sizes:"72x72", href: `${dir}/apple-touch-icon.png` },
      // { rel: 'apple-touch-icon', type: 'image/x-icon',sizes:"76x76", href: `${dir}/apple-touch-icon.png` },
      // { rel: 'apple-touch-icon', type: 'image/x-icon',sizes:"114x114", href: `${dir}/apple-touch-icon.png` },
      // { rel: 'apple-touch-icon', type: 'image/x-icon',sizes:"120x120", href: `${dir}/apple-touch-icon.png` },
      // { rel: 'apple-touch-icon', type: 'image/x-icon',sizes:"144x144", href: `${dir}/apple-touch-icon.png` },
      // { rel: 'apple-touch-icon', type: 'image/x-icon',sizes:"152x152", href: `${dir}/apple-touch-icon.png` },
      // { rel: 'apple-touch-icon', type: 'image/x-icon',sizes:"180x180", href: `${dir}/apple-touch-icon.png` }
    ],
  },
  loading: '@/components/g-loading/index.vue',
  css: [{ src: '@/assets/scss/pc/reset.scss', lang: 'scss' }],
  styleResources: {
    // 此处不能使用@ 或者~ 只能使用相对路径
    scss: ['./assets/scss/pc/reset.scss'],
    hoistUseStatements: true,
  },
  plugins: [
    '~/plugins/elemen-ui',
    // '~/plugins/fullpage',
    { src: '~/plugins/directive', mode: 'client', ssr: false },
    { src: '~/plugins/config/index', mode: 'client', ssr: false },
    { src: '~/plugins/fullpage', mode: 'client', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false, mode: 'client' },
    // { src: '~/plugins/rem', ssr: false, mode: 'client' },
    {
      src: '~/plugins/gtag.js',
      mode: 'client',
    },
    '~/plugins/filter',
    '~/plugins/router',
    '~/plugins/fetch',
    '~/plugins/publicKey',
    '~/plugins/i18n.js', //添加至插件
    '~/plugins/sw.client.js',
  ],
  buildModules: [
    '@nuxtjs/style-resources',
    // '@nuxtjs/eslint-module',
    '@nuxtjs/pwa',
  ], // 2.9以后用
  modules: [
    '@nuxtjs/axios', // https://axios.nuxtjs.org/usage
    // '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '~/modules/sw.update.js',
    '@nuxtjs/style-resources',
    ['@nuxtjs/i18n', i18n.default],
  ],
  pwa: {
    // strategies: 'injectManifest', // 'injectManifest' | 'generateSW'
    icon: {
      /* icon options */
      source: '/pc/icon2.png',
      fileName: 'icon2.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
      // purpose: 'maskable',
    },
    meta: {
      'mobile-web-app-capable': true,
      'apple-mobile-web-app-capable': true,
      'apple-mobile-web-app-status-bar-style': 'black',
      'theme-color': 'white',
      mobileAppIOS: true,
    },
    manifest: {
      name: 'Meta Web',
      short_name: 'Meta Web',
      lang: 'es',
      useWebmanifestExtension: false,
      crossorigin: 'use-credentials',
      display: 'standalone',
      start_url: '/pc/',
      icons: [],
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /\/pc\/lib\/.*/i,
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: {
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: /\/loan\/(.*)|(.*\/*.json)/,
          handler: 'networkFirst',
          method: 'POST',
          strategyOptions: {
            cacheName: 'api-cache',
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
      // maximumFileSizeToCacheInBytes: 3000000, // strategies: 'generateSW'
      dev: true,
      debug: true,
      config: { modulePathPrefix: '/pc/workbox/workbox-v6.5.3' },
      cachingExtensions: [
        '@/plugins/workbox-range-request.js',
        '@/plugins/workbox-sync.js',
        '@/plugins/sw_cached_pages.js',
      ],
      cleanupOutdatedCaches: true,
      // workboxURL:
      //   'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js',
      importScripts: ['/pc/workbox/workbox-v6.5.3/workbox-sw.js'],
    },
    render: {
      http2: {
        push: true,
      },
      static: {
        maxAge: '1y',
        setHeaders(res, path) {
          if (path.includes('sw.js')) {
            res.setHeader(
              'Cache-Control',
              `public, max-age=${15 * 60}, must-revalidate`
            );
          }
        },
      },
    },
  },

  proxy: [
    [
      '/loan',
      {
        target: 'http://159.138.152.208:9090', // 'http://159.138.152.208:9090', //dev //'http://127.0.0.1:9090',//prod
        pathRewrite: { '^/loan': '/loan' },
        changeOrigin: true,
        secure: false,
      },
    ],
  ],
  axios: {
    // proxy: true, // 如果有@nuxtjs/proxy,则不需要此项
    // https://axios.nuxtjs.org/options
  },
  render: {
    resourceHints: false,
  },
  build: {
    transpile: ['vue-notifications', 'element-ui', 'vue', 'vue-fullpage'],
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
      ],
    },
    loaders: {
      file: {},
      fontUrl: { limit: 1000 },
      imgUrl: { limit: 1000 },
      pugPlain: {},
      vue: {
        transformAssetUrls: {
          video: 'src',
          source: 'src',
          object: 'src',
          embed: 'src',
        },
      },
      css: {},
      cssModules: {
        localIdentName: '[local]_[hash:base64:5]',
      },
      less: {},
      sass: {
        indentedSyntax: true,
      },
      scss: {},
      stylus: {},
      vueStyle: {},
    },
    // 开启打包分析
    analyze: true,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
    maxChunkSize: 250000,
    extractCSS: true,
    optimization: {
      minimize: process.env.NODE_ENV === 'production' ? true : false, //是否进行代码压缩
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
        cacheGroups: {
          commons: {
            chunks: 'initial', // 'initial', 'async', 'all'
            name: 'commons',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 0, // 优先级
          },
          // 单独打包vue插件
          'vue-vendor': {
            chunks: 'initial', // 'initial', 'async', 'all',
            test: /[/]node_modules[/]vue/, // <- window | mac -> /node_modules/vue/
            name: 'vue-vendor',
            priority: -9,
            enforce: true,
          },
          vendor: {
            chunks: 'initial', // 'initial', 'async', 'all'
            test: /node_modules/,
            // test: /node_modules/,
            name: 'vendor',
            priority: -10,
            enforce: true,
          },
          'axios-vendor': {
            chunks: 'initial', // 'initial', 'async', 'all'
            test: /[/]node_modules[/]axios/,
            // test: /node_modules/,
            name: 'axios-vendor',
            priority: -11,
            enforce: true,
          },
          'element-vendor': {
            chunks: 'initial', // 'initial', 'async', 'all'
            test: /[/]node_modules[/]element-ui/,
            // test: /node_modules/,
            name: 'element-vendor',
            priority: -12,
            enforce: true,
          },
          styles: {
            name: 'chunk-styles',
            test: /\.(less|scss|sass|css|vue)$/,
            chunks: 'all',
            enforce: true,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: {
        name: 'runtime',
      },
    },
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : '[contenthash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[contenthash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : '[contenthash].css'),
      img: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]',
    },
    extend(config, ctx) {
      config.optimization = Object.assign(config.optimization, {
        minimizer: [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i, //匹配参与压缩的文件
            parallel: true, //使用多进程并发运行
            minify: TerserPlugin.uglifyJsMinify,
            sourceMap: process.env.NODE_ENV === 'production' ? true : false,
            terserOptions: {
              //Terser 压缩配置
              ecma: undefined,
              parse: {},
              compress: {
                drop_console:
                  process.env.NODE_ENV === 'production' ? true : false,
                drop_debugger:
                  process.env.NODE_ENV === 'production' ? true : false,
                pure_funcs: ['console.log'], // 移除console
              },
              mangle: true, // Note `mangle.properties` is `false` by default.
              module: false,
              // Deprecated
              format: {
                comments: false,
                shorthand: true,
                // source_map: {
                //   content:
                //     process.env.NODE_ENV === 'production'
                //       ? 'eval'
                //       : 'source-map',
                // },
              },
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_classnames: undefined,
              keep_fnames: false,
              safari10: false,
            },
            extractComments: true, //将注释剥离到单独的文件中
          }),
        ],
      });
      config.plugins.push(
        new PreloadWebpackPlugin({
          rel: 'preload',
          as(entry) {
            if (/\.css$/.test(entry)) return 'style';
            if (/\.woff$/.test(entry)) return 'font';
            if (/\.png$|\.jpg$|\.jpeg/.test(entry)) return 'image';
            return 'script';
          },
          include: [
            'element-ui',
            'app',
            'chunk',
            'chunks',
            'venders',
            'commons',
          ], // preload模块范围，还可取值'initial'|'allChunks'|'allAssets',
          fileBlacklist: [/\.svg/], // 资源黑名单
          fileWhitelist: [/\.js$|\.css$|\.woff$|\.png$|\.jpg$|\.jpeg/], // 资源白名单
        })
      );
      if (!ctx.isDev && ctx.isClient) {
        config.plugins.push(
          new CompressionPlugin({
            filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
            algorithm: 'gzip', //'brotliCompress'
            test: /\.js$|\.html$|\.css$|\.svg$|\.png$|\.jpg/, // + $|\.svg$|\.png$|\.jpg
            threshold: 10240, //对超过10k的数据压缩
            deleteOriginalAssets: false, //不删除原文件
          })
        );
      }
      if (!ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
    // postcss: [
    //   require('postcss-pxtorem')({
    //     rootValue: 100,
    //     propList: ['*'], // ['font', 'font-size', 'line-height']
    //   }),
    //   require('autoprefixer'),
    // ],
    postcss: {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 100,
          propList: ['*'], // ['font', 'font-size', 'line-height']
        },
      },
      preset: {
        autoprefixer: {
          // overrideBrowserslist: [
          //   'Android 4.1',
          //   'iOS 7.1',
          //   'Chrome > 31',
          //   'ff > 31',
          //   'ie >= 8',
          //   'last 2 versions', // 所有主流浏览器最近2个版本
          // ],
          // grid: true,
        },
      },
    },
  },

  router: {
    ...router,
    middleware: ['i18n'],
  },
};
