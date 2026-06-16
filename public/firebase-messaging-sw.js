importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA3mNf_zLjsF_ACWQce75SoMJkVWQ0JSI8",
  authDomain: "jesus-tem-sua-resposta.firebaseapp.com",
  projectId: "jesus-tem-sua-resposta",
  storageBucket: "jesus-tem-sua-resposta.firebasestorage.app",
  messagingSenderId: "1013292935764",
  appId: "1:1013292935764:web:a5befb30673a405a019bc1",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Jesus tem sua resposta";
  const options = {
    body: payload.notification?.body || "Você recebeu uma nova mensagem.",
    icon: "/logo.png",
    badge: "/favicon-32x32.png",
  };

  self.registration.showNotification(title, options);
});