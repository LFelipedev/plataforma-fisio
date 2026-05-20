import { useState } from "react";
import NivelBadge from "./NivelBadge";
import RichText from "./RichText";

export default function QuestionCard({
  questao,
  respostaSalva,
  onResponder,
}) {
  const [selecionada, setSelecionada] = useState(respostaSalva?.letra ?? null);
  const [confirmada, setConfirmada] = useState(!!respostaSalva);

  const gabaritoLetra = questao.gabarito.resposta?.toUpperCase()?.[0];
  const opcoesInvalidas = questao.opcoes.length < 2;

  const handleConfirmar = () => {
    if (!selecionada || opcoesInvalidas) return;
    const correta =
      gabaritoLetra && selecionada.toUpperCase() === gabaritoLetra;
    onResponder(questao.id, selecionada, correta);
    setConfirmada(true);
  };

  const estadoOpcao = (letra) => {
    if (!confirmada) return "";
    const upper = letra.toUpperCase();
    if (upper === gabaritoLetra) return "border-emerald-500 bg-emerald-50";
    if (upper === selecionada?.toUpperCase())
      return "border-rose-400 bg-rose-50";
    return "opacity-60";
  };

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Questão {String(questao.numero).padStart(2, "0")}
        </span>
        <NivelBadge nivel={questao.nivel} />
      </div>

      <RichText
        as="p"
        className="mb-4 text-base text-slate-800"
        content={questao.enunciado}
      />

      {opcoesInvalidas ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Não foi possível carregar as alternativas desta questão. Verifique o
          formato no arquivo de conteúdo.
        </p>
      ) : (
        <ul className="space-y-2">
          {questao.opcoes.map((op) => (
            <li key={op.letra}>
              <button
                type="button"
                disabled={confirmada}
                onClick={() => setSelecionada(op.letra)}
                className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
                  selecionada === op.letra && !confirmada
                    ? "border-teal-600 bg-teal-50"
                    : "border-slate-200 hover:border-slate-300"
                } ${estadoOpcao(op.letra)}`}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                  {op.letra}
                </span>
                <RichText as="span" className="flex-1" content={op.texto} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {!confirmada && !opcoesInvalidas && (
        <button
          type="button"
          onClick={handleConfirmar}
          disabled={!selecionada}
          className="mt-4 rounded-lg bg-teal-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Confirmar resposta
        </button>
      )}

      {confirmada && (
        <details className="mt-5 rounded-lg border border-slate-200 bg-slate-50 open:bg-white">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-teal-900">
            Ver Gabarito
          </summary>
          <div className="border-t border-slate-200 px-4 py-4 text-sm leading-relaxed text-slate-700">
            <p className="mb-2">
              <strong>Resposta correta:</strong>{" "}
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                {gabaritoLetra || "—"}
              </span>
            </p>
            {questao.gabarito.justificativa ? (
              <div>
                <strong className="block text-slate-900">
                  Justificativa neurofisiológica:
                </strong>
                <RichText
                  as="p"
                  className="mt-2 text-slate-700"
                  content={questao.gabarito.justificativa}
                />
              </div>
            ) : (
              <p className="text-slate-500 italic">
                Gabarito registrado sem justificativa detalhada no conteúdo
                original.
              </p>
            )}
          </div>
        </details>
      )}
    </article>
  );
}
