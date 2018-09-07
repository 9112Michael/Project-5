const cacheNameIs = "ver1";
const stuffToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
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
    '/img/10.jpg',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css',
   
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

https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/
self.addEventListener('fetch', (event) => {

  event.respondWith(
      caches.match(event.request).then((response) => {

          if (response) {
              return response;
          }

          else {
              return fetch(event.request)
                  .then((response) => {
                      const cloneResponse = response.clone();
                      caches.open('ver1').then((cache) => {
                          cache.put(event.request, cloneResponse);
                      })
                      return response;
                  })
                  .catch((err) => {
                      console.error(err);
                  });
          }         
      })
  );
});

//Update service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheNameIs) => {
        }).map((stuffToCache) => {
          return caches.delete(stuffToCache);
        })
      );
    })
  );
});

