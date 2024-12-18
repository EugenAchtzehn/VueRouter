import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// 請求通知權限並取得 Token
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const registration = await navigator.serviceWorker.register(
        "/VueRouter/firebase-messaging-sw.js"
      );
      const token = await getToken(messaging, {
        vapidKey:
          "BIPue1nO5Rksq7ociGjbnm7wNDWXW1nz92HUBgQSMCTZqI3hpt-PVnTntB7if9Zip8-IbefA2U8LUVqw7IhFbAg",
        serviceWorkerRegistration: registration,
      });
      console.log("FCM Token:", token);
      // alert("FCM: " + token);
      // 這裡可以將 token 傳送到後端進行儲存，後續發送推播通知
    } else {
      console.log("Notification permission denied.");
    }
  } catch (err) {
    console.error("Error getting permission or token:", err);
  }
};

// 監聽接收通知
onMessage(messaging, (payload) => {
  console.log("前景接收到訊息:", payload);
  alert(`前景通知: ${payload.notification?.title} - ${payload.notification?.body}`);
});
