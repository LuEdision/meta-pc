if ('serviceWorker' in navigator) {
  if (process.client || process.browser) {
    window.addEventListener('load', () => {
      console.log('Service Worker: Registered (Pages)');
      // register();
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const worker of registrations) {
          console.log('Service worker:', worker);
        }
      });
    });
  }
}

async function register() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('serviceWorker is not supported in current browser!');
  }

  const workbox = await window.$workbox;
  if (workbox) {
    workbox.then((res) => {
      res.update();
    });
  }
  return workbox;
}
