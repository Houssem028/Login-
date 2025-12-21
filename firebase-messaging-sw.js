importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAJxzFknapSh0fnPfIXwEEK3OijSKlqxco",
  authDomain: "admin-ash-f622c.firebaseapp.com",
  projectId: "admin-ash-f622c",
  messagingSenderId: "76505742154",
  appId: "1:76505742154:web:dc4f190f9f2de80acb1fb3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: 'icon-192.png'
  });
});
