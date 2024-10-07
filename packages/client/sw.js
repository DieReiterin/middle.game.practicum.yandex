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
        const fetchRequest = event.request.clone()

        if (response) {
          void update(fetchRequest)
          return response
        }

        return update(fetchRequest)
      })
  )
})



const update = (request) => {
  return fetch(request)
    .then(response => {
        if (!response || response.status !== 200) {
          return response
        }
        const responseToCache = response.clone()

        caches.open(CACHE_NAME)
          .then(cache => {
            void cache.put(request, responseToCache)
          })

        return response
      }
    ).catch(err => {
    return err
  })

}

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
