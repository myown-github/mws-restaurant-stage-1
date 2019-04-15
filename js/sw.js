//credit to https://matthewcranford.com
console.log('SW: Registered');

const cacheFiles = [
  '/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/data/restaurants.json',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/js/sw.js',
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

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWidth(
    caches.macth(e.request).then(function(response) {
      if (response) {
        console.log('Found ', e.request, ' in cache');
        return response;
      }
      else
      {
        console.log(e.request, ' not found in cache');
        return fetch(e.request)
        .then(function(response) {
          const clonedResponse = response.clone();
          caches.open('v1').then(function(cache) {
            cache.put(e.request, clonedResponse);
          })
          return response;
        })
        .catch(function(err) {
          console.error(err);
        })
      }
    })
  )
});
