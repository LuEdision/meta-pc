/* eslint-disable no-undef */
workbox.loadModule('workbox-strategies');
workbox.loadModule('workbox-core');

const checkForUpdate = async (context, err, firstTime = true) => {
  if (process.client || process.browser) {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.update();
        if (firstTime) {
          registration.addEventListener('updatefound', () => {
            // any code you need to do to suppress "unsaved changes" warnings
            window.location.reload();
          });
        }
      }
    }
  }

  setTimeout(() => checkForUpdate(context, err, false), 5000);
};

const cacheName = 'v1';

const data = {
  race: false,
  debug: false,
  credentials: 'same-origin',
  networkTimeoutSeconds: 0,
  fallback: 'index.html',
};

// Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching');
  if (
    e.request.url.startsWith('chrome-extension') ||
    e.request.url.includes('extension') ||
    !(e.request.url.indexOf('http') === 0)
  ) {
    //skip request
    return;
  } else {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          // Make copy/clone of response
          console.log('xxxx-ernter', res);
          if (
            (e.request.cache === 'only-if-cached' &&
              e.request.mode !== 'same-origin') ||
            e.request.method !== 'GET'
          ) {
            return;
          }
          const resClone = res.clone();
          // Open cahce
          caches.open(cacheName).then((cache) => {
            // Add response to cache
            cache.put(e.request, resClone);
          });
          console.log('xxxx', res);
          return res;
        })
        .catch((err) =>
          caches.match(e.request).then((res) => {
            console.log('xxx-err', res);
            return res;
          })
        )
    );
  }
});
// const queue = new Queue('offlineQueue');

// workbox.addEventListener('fetch', (event) => {
//     // Clone the request to ensure it's safe to read when
//     // adding to the Queue.
//     const promiseChain = fetch(event.request.clone()).catch((err) => {
//         return queue.pushRequest({request: event.request});
//     });

//     event.waitUntil(promiseChain);
// });

// Call Install Event
self.addEventListener('installed', (e) => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('Service Worker: Caching Files');
        cache.addAll([
          /\/pc\/_nuxt\/(.*)/i,
          '/pc/lib/config.js',
          '/pc/lib/credoappsdk.js',
          '/pc/lib/loader_only.js',
          /^https:\/\/web-button.mati\.io\/.*/i,
          /\/pc\/workbox\/workbox-v6.5.3\/(.*)/i,
        ]);
      })
      .then(() => self.skipWaiting())
  );
  // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
  if (!e.isUpdate) {
    // whatever logic you want to use to notify the user that they need to refresh the page.
    console.debug('The PWA is on the latest version.');
    return;
  }
  console.debug('There is an update for the PWA, reloading...');
  // window.location.reload();
  checkForUpdate();
});
self.addEventListener('push', (evt) => {
  const message = evt.data.json();
  self.registration.showNotification(message.title, {
    body: message.content,
  });
});

self.addEventListener('notificationclick', (evt) => {
  evt.notification.close();
  // 获取client
  evt.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      clients.forEach((client) => {
        // postMessage将信息发送给界面
        client.postMessage(evt.notification.body);
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event && event.data) {
    console.debug('Skipping waiting...', event.data);
    if (event.data === 'SKIP_WAITING') {
      console.debug('Skipping waiting...');
      self.skipWaiting();
      self.clients.claim();
    }
  }
});
