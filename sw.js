//credit to matthewcranford
let mwsCacheName = 'mws-restaturant';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(mwsCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/data/restaurants.json',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/register.js',
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
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mws-restaurant') &&
                 cacheName != staticCacheName;
        })
        .map(function(cacheName) {
            return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      else
      {
        return fetch(event.request)
        .then(function(response) {
          let clonedResponse = response.clone();
          caches.open(mwsCacheName).then(function(cache) {
            cache.put(event.request, clonedResponse);
          })
          return response;
        })
      }
    })
  )
});
