self.addEventListener('install', e => {
  console.log("Service Worker installé pour Admin PWA");
});

self.addEventListener('push', e => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "icon-192.png"
  });
});
