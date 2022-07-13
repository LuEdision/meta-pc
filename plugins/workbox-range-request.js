/* eslint-disable no-undef */
workbox.loadModule('workbox-strategies');
workbox.loadModule('workbox-expiration');
workbox.routing.registerRoute(
  /\.(mp4|webm)/,
  new workbox.strategies.CacheFirst({
    plugins: [new workbox.rangeRequests.RangeRequestsPlugin()],
  }),
  'GET'
);
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        // Only cache 60 images.
        maxEntries: 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate()
);
// workbox.routing.registerRoute(
//   /\.(?:js|css)(\?ver=.*)?$/,
//   new workbox.strategies.CacheFirst({
//       cacheName: 'static-resources',
//   })
// );

// import { registerRoute, NavigationRoute } from 'workbox-routing';
// import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// import { CacheFirst, NetworkFirst, NetworkOnly } from 'workbox-strategies';
// import { ExpirationPlugin } from 'workbox-expiration';
// import { RangeRequestsPlugin } from 'workbox-range-requests';
// import { Queue }  from 'workbox-background-sync';
// import * as navigationPreload from 'workbox-navigation-preload';

// registerRoute(
//     ({url}) =>  url.origin === 'https://fonts.googleapis.com' ||
//                 url.origin === 'http://fonts.googleapis.com' ||
//                 url.origin === 'https://fonts.gstatic.com',
//     new CacheFirst({
//         cacheName: 'google-fonts',
//         plugins: [
//             new ExpirationPlugin({maxEntries: 20}),
//         ],
//     })
// );

// registerRoute(
//     /\.(?:png|gif|jpg|jpeg|webp|svg|webmanifest)$/,
//     new CacheFirst({
//         cacheName: 'images',
//         plugins: [
//             new ExpirationPlugin({
//                 maxEntries: 60,
//                 maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//                 purgeOnQuotaError: true,
//             }),
//         ],
//     })
// );

// registerRoute(
//     /\.(?:js|css)(\?ver=.*)?$/,
//     new CacheFirst({
//         cacheName: 'static-resources',
//     })
// );

// registerRoute(
//     /(\.webm$|\.mp4$)/,
//     new CacheFirst({
//         cacheName: 'media',
//         plugins: [
//             new CacheableResponsePlugin({statuses: [200]}),
//             new RangeRequestsPlugin(),
//         ],
//     })
// );

// registerRoute(
//     ({url}) => url.pathname.startsWith('/wp-admin/') ||
//                 url.pathname.startsWith('/wp-login/'),
//     new NetworkOnly()
// );

// const bgSyncPlugin = new Queue('offlineQueue1', {
//     maxRetentionTime: 24 * 60
// });

// registerRoute(
//     /\/api\/.*\/*.json/,
//     new NetworkOnly({
//         plugins: [bgSyncPlugin]
//     }),
//     'POST'
// );

// /* eslint-disable */
// const queue = new Queue('offlineQueue');

// self.addEventListener('fetch', (event) => {
//     // Clone the request to ensure it's safe to read when
//     // adding to the Queue.
//     const promiseChain = fetch(event.request.clone()).catch((err) => {
//         return queue.pushRequest({request: event.request});
//     });

//     event.waitUntil(promiseChain);
// });
// /* eslint-enable */

// navigationPreload.enable();

// registerRoute(
//     new NavigationRoute(
//         new NetworkFirst({
//             cacheName: 'cached-navigations'
//         })
//     )
// );
