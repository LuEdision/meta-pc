/* eslint-disable no-undef */
const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin(
  'formQueue',
  {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
  }
);

workbox.routing.registerRoute(
  /https:\/\/.*\/loan\/.*/,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);
