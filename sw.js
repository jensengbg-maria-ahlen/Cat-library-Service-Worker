self.addEventListener('install', event => {
    console.log('SW installed at: ', new Date().toLocaleTimeString());

    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/index.html',
                '/style.css',
                '/manifest.webmanifest',
                '/img/cat 512.png'
            ]);
        })
    )
})

self.addEventListener('activate', event => {
    console.log('SW activates at: ', new Date().toLocaleTimeString());
})

self.addEventListener('fetch', event => {
    if (navigator.online) {
        event.respondWith(fetch(event.request).then(response => {
            let clone = response.clone();
            caches.open('v1').then(cache => {
                cache.put(event.request, clone);
            })
            return response;
        }))
    } else {
        event.respondWith(
           caches.match(event.request).then(maybeResponse => {
            if(maybeResponse !== undefined) {
                return maybeResponse;
            } else {
                return new Response('<h1>No internet!</h1>', {
                    headers: {'Content-Type': 'text/html'}
                })
            }
       }))
    }
})