const cacheName="v2";


// Call Install Event
self.addEventListener('install', (e) =>{
    console.log('Service Worker: Installed');
});


// Call Activate Event
self.addEventListener('activate', (e) =>{
    console.log('Service Worker: Activated');

    //removed unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if (cache !== cacheName){
                        console.log('Service Worker Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});


//Call Fetch Event

self.addEventListener('fetch', e =>{
    console.log('Service Wroker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res =>{
            // Make copy/colone of response
            const resColone=res.clone();
            //open the cache
            caches
                .open(cacheName)
                .then(cache =>{
                    // Add Response to cache
                    cache.put(e.request, resColone);
                });
            return res;
        }).catch(err=>caches.match(e.request).then(res =>res))
    );
})