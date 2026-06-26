"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

type Pedido = {
  id: string;
  code?: string;
  text?: string;
  resposta?: string;
  createdAt?: any;
};

export default function AdminPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [aba, setAba] = useState<"pendentes" | "respondidos">("pendentes");
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [carregando, setCarregando] = useState(true);

  async function carregarPedidos() {
    setCarregando(true);

    const q = query(collection(db, "pedidos"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    const lista = snap.docs.map((documento) => ({
      id: documento.id,
      ...documento.data(),
    })) as Pedido[];

    setPedidos(lista);
    setCarregando(false);
  }

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function salvarResposta(pedidoId: string) {
    const resposta = respostas[pedidoId]?.trim();

    if (!resposta) {
      alert("Digite uma resposta antes de salvar.");
      return;
    }

    await updateDoc(doc(db, "pedidos", pedidoId), {
      resposta,
    });

    setRespostas((respostasAtuais) => ({
      ...respostasAtuais,
      [pedidoId]: "",
    }));

    await carregarPedidos();
  }

  const pedidosPendentes = pedidos.filter((pedido) => !pedido.resposta);
  const pedidosRespondidos = pedidos.filter((pedido) => pedido.resposta);

  const listaAtual =
    aba === "pendentes" ? pedidosPendentes : pedidosRespondidos;

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Painel de Respostas
        </h1>

        <div className="mb-6 flex gap-3">
          <button
            type="button"
            onClick={() => setAba("pendentes")}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              aba === "pendentes"
                ? "bg-blue-700 text-white"
                : "bg-white text-blue-700"
            }`}
          >
            Pendentes ({pedidosPendentes.length})
          </button>

          <button
            type="button"
            onClick={() => setAba("respondidos")}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              aba === "respondidos"
                ? "bg-blue-700 text-white"
                : "bg-white text-blue-700"
            }`}
          >
            Respondidos ({pedidosRespondidos.length})
          </button>
        </div>

        {carregando ? (
          <p className="text-slate-700">Carregando pedidos...</p>
        ) : listaAtual.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow">
            <p className="text-slate-700">Nenhum pedido encontrado.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {listaAtual.map((pedido) => (
              <div
                key={pedido.id}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-blue-700">
                    Código: {pedido.code || "Sem código"}
                  </p>
                </div>

                <p className="mb-4 whitespace-pre-wrap text-slate-700">
                  {pedido.text || "Pedido sem texto."}
                </p>

                {pedido.resposta ? (
                  <div className="rounded-xl bg-blue-50 p-4">
                    <p className="mb-2 font-semibold text-blue-700">
                      Resposta:
                    </p>
                    <p className="whitespace-pre-wrap text-slate-700">
                      {pedido.resposta}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <textarea
                      value={respostas[pedido.id] || ""}
                      onChange={(event) =>
                        setRespostas((respostasAtuais) => ({
                          ...respostasAtuais,
                          [pedido.id]: event.target.value,
                        }))
                      }
                      placeholder="Digite sua resposta..."
                      className="min-h-32 w-full rounded-xl border border-slate-300 p-4 text-slate-700 outline-none focus:border-blue-700"
                    />

                    <button
                      type="button"
                      onClick={() => salvarResposta(pedido.id)}
                      className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
                    >
                      Salvar resposta
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}