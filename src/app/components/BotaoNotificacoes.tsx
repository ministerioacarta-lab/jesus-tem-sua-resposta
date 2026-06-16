"use client";

import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import {
  collection,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, getFirebaseMessaging } from "../lib/firebase";

type BotaoNotificacoesProps = {
  codigo: string;
};

export default function BotaoNotificacoes({ codigo }: BotaoNotificacoesProps) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function ouvirNotificacoes() {
      try {
        const messaging = await getFirebaseMessaging();

        if (!messaging) return;

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
      const codigoLimpo = codigo.trim();

      if (!codigoLimpo) {
        setStatus("As notificações ainda não estão funcionando. Em breve resolveremos.");
        return;
      }

      setStatus("Solicitando permissão...");

      if (!("Notification" in window)) {
        setStatus("As notificações ainda não estão funcionando. Em breve resolveremos.");
        return;
      }

      if (!("serviceWorker" in navigator)) {
        setStatus("As notificações ainda não estão funcionando. Em breve resolveremos.");
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
        vapidKey:
          "BE6gO7cTbrEc9k8iFpNPQ4YKU98q6cocIV2Q_YlaTpnGt37h6MjpXfz3uPPNLu5zmgfJQRmPuNaRzzjeAjErN9g",
        serviceWorkerRegistration: registration,
      });

      if (!token) {
        setStatus("Não foi possível gerar o token de notificação.");
        return;
      }

      const pedidosRef = collection(db, "pedidos");
      const pedidoQuery = query(pedidosRef, where("code", "==", codigoLimpo));
      const pedidoSnapshot = await getDocs(pedidoQuery);

      if (pedidoSnapshot.empty) {
        setStatus("Código não encontrado. Confira e tente novamente.");
        return;
      }

      const pedidoDoc = pedidoSnapshot.docs[0];

      await updateDoc(pedidoDoc.ref, {
        notificationToken: token,
        notificationTokenUpdatedAt: serverTimestamp(),
      });

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
    <div className="mt-5 flex flex-col items-center">
      <button
        type="button"
        onClick={ativarNotificacoes}
        className="text-blue-700 hover:text-blue-800 font-semibold transition"
      >
        Ativar notificações
      </button>

      {status && (
        <p className="mt-3 text-sm font-medium text-slate-700 text-center">
          {status}
        </p>
      )}
    </div>
  );
}