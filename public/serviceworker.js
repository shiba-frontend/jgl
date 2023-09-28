let cacheData = 'appv1'

let urltocache = ['index.html', 'offline.html']


const self = this



// install sw
self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            return cache.addAll(urltocache)
        })
    )
})


//Listen for request
self.addEventListener('fetch', (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then((response)=>{
            if(response){
               return   response
            }
            return fetch(event.request)
            .catch(()=>caches.match('offline.html'))
        })
    )
})

//activate the sw
self.addEventListener('activate', (event)=>{
    const cacheWhitelist = [];
    cacheWhitelist.push(cacheData);

    event.waitUntil(
        caches.keys().then((cachen)=>Promise.all(
            cachen.map((cachena)=>{
                if(!cacheWhitelist.includes(cachena)){
                    return caches.delete(cachena)
                }
            })
        ))
    )
})


