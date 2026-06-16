importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// ⚠️ COLOQUE AQUI A CONFIG DO SEU FIREBASE
firebase.initializeApp({
 apiKey: "AIzaSyA3mNf_zLjsF_ACWQce75SoMJkVWQ0JSI8",
  authDomain: "jesus-tem-sua-resposta.firebaseapp.com",
  projectId: "jesus-tem-sua-resposta",
  storageBucket: "jesus-tem-sua-resposta.firebasestorage.app",
  messagingSenderId: "1013292935764",
  appId: "1:1013292935764:web:a5befb30673a405a019bc1",
});

const messaging = firebase.messaging();

// Receber notificação quando o app estiver fechado
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Mensagem recebida:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});