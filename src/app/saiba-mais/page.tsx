import Link from "next/link";

export default function SaibaMais() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 flex flex-col items-center justify-center p-6">

      <div className="bg-white max-w-3xl w-full rounded-3xl shadow-2xl p-10">

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-700 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
            AC
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Sobre o Projeto LÓGOS
        </h1>

        <p className="text-lg text-slate-700 leading-8 mb-6">
          O projeto <strong>LÓGOS</strong> nasceu com o propósito de acolher
          pedidos de oração, desabafos e mensagens de esperança.
        </p>

        <p className="text-lg text-slate-700 leading-8 mb-6">
          Acreditamos que toda pessoa merece ser ouvida. Muitas vezes,
          carregamos dúvidas, medos e dores que não conseguimos compartilhar
          com ninguém.
        </p>

        <p className="text-lg text-slate-700 leading-8 mb-6">
          Por isso criamos este espaço seguro e anônimo para que você possa
          abrir seu coração.
        </p>

        <p className="text-lg text-slate-700 leading-8">
          Não utilizamos respostas automáticas nem inteligência artificial para
          responder as mensagens. Cada pedido é lido com atenção por nossa
          equipe, que busca responder com amor, respeito e cuidado.
          Por isso, sua resposta pode levar algum tempo, mas garantimos que sua
          mensagem será recebida com carinho.
        </p>
        <div className="mt-10 space-y-4">

  <div className="mt-10">
  <h2 className="text-center text-blue-700 font-semibold mb-4">
    Redes Sociais e Contato
  </h2>

  <div className="flex flex-wrap justify-center gap-3">

    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="
        bg-blue-700
        hover:bg-blue-800
        text-white
        px-5
        py-2
        rounded-lg
        font-medium
        transition
      "
    >
      WhatsApp
    </a>

    <a
      href="https://instagram.com/seuinstagram"
      target="_blank"
      rel="noopener noreferrer"
      className="
        bg-blue-700
        hover:bg-blue-800
        text-white
        px-5
        py-2
        rounded-lg
        font-medium
        transition
      "
    >
      Instagram
    </a>

    <a
      href="https://instagram.com/grupodejovens"
      target="_blank"
      rel="noopener noreferrer"
      className="
        bg-blue-700
        hover:bg-blue-800
        text-white
        px-5
        py-2
        rounded-lg
        font-medium
        transition
      "
    >
      Jovens
    </a>

    <a
      href="https://youtube.com/@canal"
      target="_blank"
      rel="noopener noreferrer"
      className="
        bg-blue-700
        hover:bg-blue-800
        text-white
        px-5
        py-2
        rounded-lg
        font-medium
        transition
      "
    >
      YouTube
    </a>

  </div>
</div>

</div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="
              bg-blue-700
              hover:bg-blue-800
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Voltar ao início
          </Link>
        </div>

      </div>

    </main>
  );
}