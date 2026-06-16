"use client";
import BotaoNotificacoes from "./components/BotaoNotificacoes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { db } from "./lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function Home() {
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [result, setResult] = useState<any>(null);

  function gerarCodigo() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  async function salvarMensagem() {
    const newCode = gerarCodigo();

    await addDoc(collection(db, "pedidos"), {
      text: message,
      createdAt: new Date(),
      code: newCode,
    });

    setCode(newCode);
    setMessage("");
  }

  async function buscarMensagem() {
    const q = query(collection(db, "pedidos"), where("code", "==", searchCode));
    const snap = await getDocs(q);

    if (!snap.empty) {
      setResult(snap.docs[0].data());
    } else {
      setResult(null);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center px-6 py-10">

      {/* CABEÇALHO */}
      <div className="text-center text-white mb-10">
        <p className="uppercase tracking-[0.3em] text-sm opacity-80">
          Jesus Tem Sua Resposta
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mt-4">
          LÓGOS
        </h1>

        <p className="mt-6 text-lg opacity-90">
          Escreva o que está em seu coração.
          <br />
          Sua mensagem será recebida de forma anônima.
        </p>
      </div>

      {/* ENVELOPE */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Aba */}
        <div className="relative w-full h-48">

          <div
            className="absolute inset-0 bg-slate-100"
            style={{
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            }}
          />

          {/* Selo */}
          <div className="absolute left-1/2 top-[86%] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-20 h-20 rounded-full bg-blue-700 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
  <Image
    src="/logo.png"
    alt="Logo"
    width={80}
    height={80}
    className="object-contain p-3"
  />
</div>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="p-8 md:p-10">

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva aqui seu desabafo ou pedido de oração..."
            className="w-full h-60 resize-none border border-slate-200 rounded-xl p-4 outline-none focus:border-blue-500 text-lg text-slate-700"
          />

          <button
            onClick={salvarMensagem}
            className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-semibold transition"
          >
            Enviar Mensagem
          </button>
          <Link
  href="/saiba-mais"
  className="
    mt-4
    block
    text-center
    text-blue-600
    font-semibold
  "
>
  Saiba Mais
</Link>
          

          {code && (
            <p className="mt-4 text-center text-green-600 font-bold">
              Seu código: {code}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 w-full max-w-3xl bg-white text-black p-6 rounded-2xl shadow-2xl border border-slate-200 flex flex-col items-center">

  <h2 className="text-lg mb-6 text-blue-600 text-center">
    É importante guardar o código para consultar sua resposta.
    
  </h2>

  <input
  className="w-full h-12 border border-slate-200 rounded-xl px-4 outline-none focus:border-blue-500 text-center text-slate-700 text-lg"
  placeholder="Digite seu código"
  value={searchCode}
  onChange={(e) => setSearchCode(e.target.value)}
/>

  <button
    onClick={buscarMensagem}
    className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-semibold transition shadow-md"
  >
    Consultar Resposta
  </button>

 {result && (
  <div className="mt-6 text-center w-full">
    <p className="text-slate-700">
      <strong>Mensagem:</strong> {result.text}
    </p>

    {result.resposta ? (
      <p className="text-blue-700 mt-2 font-semibold">
        <strong>Resposta:</strong> {result.resposta}
      </p>
    ) : (
      <p className="text-yellow-600 mt-2 font-semibold">
        Ainda não respondido! Espere só mais um pouco.
      </p>
    )}
  </div>
)}
</div>

      {/* RODAPÉ */}
      <footer className="mt-10 text-center text-white">
        <p className="opacity-80">
          Este projeto é desenvolvido e gerenciado por Márlon de Jesus e Hannah Tiffani.

        </p>

        
      </footer>

    </main>
  );
}