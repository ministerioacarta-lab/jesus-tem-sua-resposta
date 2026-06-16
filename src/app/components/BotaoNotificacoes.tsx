"use client";

import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "../lib/firebase";

export default function BotaoNotificacoes() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function ouvirNotificacoes() {
      const messaging = await getFirebaseMessaging();

      if (!messaging) return;

      onMessage(messaging, (payload) => {
        const titulo = payload.notification?.title || "Nova notificação";
        const mensagem =
          payload.notification?.body || "Você recebeu uma nova mensagem.";

        setStatus(`${titulo}: ${mensagem}`);
      });
    }

    ouvirNotificacoes();
  }, []);

  async function ativarNotificacoes() {
    try {
      if (!("Notification" in window)) {
        setStatus("Este navegador não suporta notificações.");
        return;
      }

      const permissao = await Notification.requestPermission();

      if (permissao !== "granted") {
        setStatus("Permissão de notificação negada.");
        return;
      }

      const messaging = await getFirebaseMessaging();

      if (!messaging) {
        setStatus("Este navegador não suporta notificações push.");
        return;
      }

      const token = await getToken(messaging, {
        vapidKey: "COLE_SUA_VAPID_KEY_AQUI",
      });

      console.log("Token de notificação:", token);

      setStatus("Notificações ativadas com sucesso!");
    } catch (error) {
      console.error("Erro ao ativar notificações:", error);
      setStatus("Não foi possível ativar as notificações.");
    }
  }

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={ativarNotificacoes}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
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