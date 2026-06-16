importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA3mNf_zLjsF_ACWQce75SoMJkVWQ0JSI8",
  authDomain: "jesus-tem-sua-resposta.firebaseapp.com",
  projectId: "jesus-tem-sua-resposta",
  storageBucket: "jesus-tem-sua-resposta.firebasestorage.app",
  messagingSenderId: "1013292935764",
  appId: "1:1013292935764:web:a5befb30673a405a019bc1"
});

var messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  var notificationTitle = "Jesus tem sua resposta";
  var notificationOptions = {
    body: "Você recebeu uma nova mensagem.",
    icon: "/logo.png"
  };

  if (payload && payload.notification) {
    notificationTitle = payload.notification.title || notificationTitle;
    notificationOptions.body = payload.notification.body || notificationOptions.body;
  }

  self.registration.showNotification(notificationTitle, notificationOptions);
});