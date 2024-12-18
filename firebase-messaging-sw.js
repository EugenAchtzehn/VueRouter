// Firebase Service Worker
importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js");

// 替換為你的 Firebase Config
firebase.initializeApp({
  apiKey: "AIzaSyCT_nBvZoRg9P7J_1OM1nKih9q-Ca_T1f0",
  authDomain: "pwa-test-bff5c.firebaseapp.com",
  projectId: "pwa-test-bff5c",
  storageBucket: "pwa-test-bff5c.firebasestorage.app",
  messagingSenderId: "349644930193",
  appId: "1:349644930193:web:169b9ffef906d401ba5330",
  measurementId: "G-851M0M5MY6",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Message:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png", // 推播圖標
  });
});
