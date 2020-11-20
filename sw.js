self.addEventListener('install', event => {
    console.log('SW installed at: ', new Date().toLocaleTimeString());

    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/index.html',
                '/style.css',
                '/manifest.webmanifest',
                '/img/cat-512.png'
            ]);
        })
    )
})

self.addEventListener('activate', event => {
    console.log('SW activates at: ', new Date().toLocaleTimeString());
})

self.addEventListener('fetch', event => {
    console.log('Service worker fetching resource: ', event.request.url);

    if (navigator.onLine) {
        console.log('Fetch: online');
        event.respondWith(fetch(event.request).then(response => {
            let clone = response.clone();
            caches.open('v1').then(cache => {
                cache.put(event.request, clone);
            })
            return response;
        }) )
    } 
    else {
        console.log('Fetch: offline, request url is:', event.request.url);

        event.respondWith(caches.match(event.request).then(maybeResponse => {
            if(maybeResponse !== undefined) {
                console.log('Fetch: maybeResponse=', maybeResponse);
                return maybeResponse;
            } else {
                console.log('Fetch: returns new response');
                return new Response('<h1>No internet!</h1>', {
                    headers: {'Content-Type': 'text/html'}
                })
            }
       }))
    }
})