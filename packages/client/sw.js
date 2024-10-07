const CACHE_NAME = 'game-cache-v2'

const URLS = ['/index.html', '/favicon.ico', '/src/App.css', '/src/main.tsx']

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS)
      })
      .catch(err => {
        throw err
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(response => {
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                 void cache.put(event.request, responseToCache);
                });
              return response;
            }
          );
      })
  );
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name === CACHE_NAME)
          .map(name => caches.delete(name))
      )
    })
  )
})
