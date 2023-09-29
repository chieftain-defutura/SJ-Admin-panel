importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDJ5SkpxFFasqUruu6E5PMfnm-6P9ueE7Q",
  authDomain: "sj-clothing.firebaseapp.com",
  projectId: "sj-clothing",
  storageBucket: "sj-clothing.appspot.com",
  messagingSenderId: "638073995197",
  appId: "1:638073995197:web:7beb5bb3792613ec951cd4",
  measurementId: "G-MGEFW61FNK",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
