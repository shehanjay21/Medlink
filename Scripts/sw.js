// Install service worker and cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/MEDLINK/',
                '/MEDLINK/home.html',
                '/MEDLINK/CSS pages/home.css',
                '/MEDLINK/images/doctor.jpg',
                '/MEDLINK/images/emergency care.jpg',
                '/MEDLINK/images/ambulance.webp',
                '/MEDLINK/images/health consulatations.png',
                '/MEDLINK/Favicon/favicon-32x32.png',
                '/MEDLINK/Favicon/favicon-16x16.png',
                '/MEDLINK/Favicon/apple-touch-icon.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  