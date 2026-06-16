const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();

exports.notificarResposta = onDocumentUpdated("pedidos/{pedidoId}", async (event) => {
  const antes = event.data.before.data();
  const depois = event.data.after.data();

  const respostaAntes = antes.resposta || "";
  const respostaDepois = depois.resposta || "";
  const token = depois.notificationToken;

  if (!token) {
    console.log("Pedido sem notificationToken.");
    return;
  }

  if (!respostaDepois || respostaDepois === respostaAntes) {
    console.log("Resposta não foi alterada.");
    return;
  }

  await getMessaging().send({
    token,
    notification: {
      title: "Sua resposta chegou",
      body: "Você recebeu uma resposta no Projeto LÓGOS.",
    },
    webpush: {
      notification: {
        icon: "/logo.png",
      },
      fcmOptions: {
        link: "https://jesus-tem-sua-resposta.vercel.app",
      },
    },
  });

  console.log("Notificação enviada para o pedido:", event.params.pedidoId);
});