"use client";

import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "../lib/firebase";

export default function BotaoNotificacoes() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function ouvirNotificacoes() {
      try {
        const messaging = await getFirebaseMessaging();

        if (!messaging) {
          return;
        }

        onMessage(messaging, (payload) => {
          const titulo = payload.notification?.title || "Nova notificação";
          const mensagem =
            payload.notification?.body || "Você recebeu uma nova mensagem.";

          setStatus(`${titulo}: ${mensagem}`);
        });
      } catch (error) {
        console.error("Erro ao ouvir notificações:", error);
      }
    }

    ouvirNotificacoes();
  }, []);

  async function ativarNotificacoes() {
    try {
      setStatus("Solicitando permissão...");

      if (!("Notification" in window)) {
        setStatus("Este navegador não suporta notificações.");
        return;
      }

      if (!("serviceWorker" in navigator)) {
        setStatus("Este navegador não suporta service worker.");
        return;
      }

      const permissao = await Notification.requestPermission();

      if (permissao !== "granted") {
        setStatus("Permissão de notificação negada.");
        return;
      }

      setStatus("Registrando notificações...");

      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

      const messaging = await getFirebaseMessaging();

      if (!messaging) {
        setStatus("Este navegador não suporta notificações push.");
        return;
      }

      const token = await getToken(messaging, {
        vapidKey: "BE6gO7cTbrEc9k8iFpNPQ4YKU98q6cocIV2Q_YlaTpnGt37h6MjpXfz3uPPNLu5zmgfJQRmPuNaRzzjeAjErN9g",
        serviceWorkerRegistration: registration,
      });

      if (!token) {
        setStatus("Não foi possível gerar o token de notificação.");
        return;
      }

      console.log("Token de notificação:", token);

      setStatus("Notificações ativadas com sucesso!");
    } catch (error) {
      console.error("Erro ao ativar notificações:", error);

      if (error instanceof Error) {
        setStatus(`Erro: ${error.message}`);
        return;
      }

      setStatus("Não foi possível ativar as notificações.");
    }
  }

  return (
  <div className="mt-4 w-full flex flex-col items-center gap-3">
    <button
      type="button"
      onClick={ativarNotificacoes}
      className="w-full bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition"
    >
      Ativar notificações
    </button>

    {status && (
      <p className="text-sm font-medium text-slate-700 text-center">
        {status}
      </p>
    )}
  </div>
);
}