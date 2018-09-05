const cacheNameIs = "ver1";
const stuffToCache = [
  '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

//https://developers.google.com/web/fundamentals/primers/service-workers/

//Install a service worker
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheNameIs)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(stuffToCache);
      })
  );
});

//Cache and return requests (...making your app offline-first!)
//https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        {
          return response||fetch(event.request)
          .then((response) => {
            const cloneResponse = response.clone();
            caches.open(cacheNameIs).then((cache) => {
              cache.put(event.request,cloneResponse);
            })
            return response;
          })
          .catch((error) => {
            console.error(error);
          });
          }
      })
    )})
