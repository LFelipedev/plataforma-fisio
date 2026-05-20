import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import SlidePanel from "../components/SlidePanel";
import {
  MODULOS,
  getAula,
  getModuloByAulaId,
} from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";

function contarAcertosBloco(questoes, questoesRespondidas) {
  return questoes.filter((q) => questoesRespondidas[q.id]?.correta).length;
}

export default function Aula() {
  const { aulaId } = useParams();
  const aula = getAula(aulaId);
  const modulo = getModuloByAulaId(aulaId);
  const { getAulaProgress, marcarSlide, registrarResposta, calcularPercentual } =
    useProgress();

  const prog = getAulaProgress(aulaId);
  const [slideAtivo, setSlideAtivo] = useState(0);
  const apenasQuestoes = aula?.apenasQuestoes ?? false;

  useEffect(() => {
    setSlideAtivo(0);
  }, [aulaId]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [aulaId, slideAtivo]);

  const indiceModulo = MODULOS.findIndex((m) => m.aulaId === aulaId);
  const moduloAnterior = indiceModulo > 0 ? MODULOS[indiceModulo - 1] : null;
  const moduloProximo =
    indiceModulo < MODULOS.length - 1 ? MODULOS[indiceModulo + 1] : null;

  const slide = aula?.slides[slideAtivo];
  const pct = aula ? calcularPercentual(aula) : 0;

  const questoesDoSlide = useMemo(() => slide?.questoes ?? [], [slide]);

  const statsRespostas = useMemo(() => {
    const respondidas = Object.values(prog.questoesRespondidas);
    return {
      total: respondidas.length,
      corretas: respondidas.filter((r) => r.correta).length,
    };
  }, [prog.questoesRespondidas]);

  if (!aula) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-xl font-bold">Aula não encontrada</h1>
        <Link
          to="/modulos"
          className="mt-4 inline-block text-teal-800 hover:underline"
        >
          Voltar aos módulos
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-sm text-slate-500">
        <Link to="/modulos" className="hover:text-teal-800">
          Módulos
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">
          Módulo {modulo?.ordem}: {modulo?.titulo}
        </span>
      </nav>

      <header className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            {modulo?.area}
          </p>
          {apenasQuestoes && (
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-white">
              Somente questões
            </span>
          )}
        </div>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">{aula.titulo}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
          {aula.visaoGeral}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex flex-1 items-center gap-3 min-w-[200px]">
            <div className="h-2 flex-1 max-w-xs overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-teal-700 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-sm font-medium text-slate-600">{pct}%</span>
          </div>
          {apenasQuestoes && (
            <p className="text-sm text-slate-500">
              {statsRespostas.corretas} acertos de {aula.totalQuestoes} ·{" "}
              {statsRespostas.total} respondidas
            </p>
          )}
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {apenasQuestoes ? "Blocos" : "Seções"}
          </p>
          <ul className="space-y-1">
            {aula.slides.map((s, idx) => {
              const acertos = contarAcertosBloco(
                s.questoes,
                prog.questoesRespondidas,
              );
              const total = s.questoes.length;
              const concluido = apenasQuestoes
                ? acertos === total && total > 0
                : prog.slidesConcluidos.includes(s.id);

              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setSlideAtivo(idx)}
                    className={`flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left text-sm transition ${
                      slideAtivo === idx
                        ? "bg-teal-900 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs font-bold ${
                          slideAtivo === idx
                            ? "bg-white/20"
                            : concluido
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {concluido ? "✓" : s.numero}
                      </span>
                      <span className="line-clamp-2 font-medium">{s.titulo}</span>
                    </span>
                    {apenasQuestoes && (
                      <span
                        className={`pl-7 text-xs ${
                          slideAtivo === idx ? "text-teal-100" : "text-slate-500"
                        }`}
                      >
                        {acertos}/{total} corretas
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="space-y-8">
          {slide && (
            <>
              {apenasQuestoes ? (
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Bloco {slide.numero}
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {slide.titulo}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {slide.questoes.length} questões neste bloco
                  </p>
                </div>
              ) : (
                <SlidePanel
                  slide={slide}
                  concluido={prog.slidesConcluidos.includes(slide.id)}
                  onConcluir={() => marcarSlide(aulaId, slide.id)}
                />
              )}

              {questoesDoSlide.length > 0 ? (
                <div className="space-y-4">
                  {questoesDoSlide.map((q) => (
                    <QuestionCard
                      key={q.id}
                      questao={q}
                      respostaSalva={prog.questoesRespondidas[q.id]}
                      onResponder={(id, letra, correta) =>
                        registrarResposta(aulaId, id, letra, correta)
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Nenhuma questão neste bloco.
                </p>
              )}
            </>
          )}

          <nav className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              disabled={slideAtivo === 0}
              onClick={() => setSlideAtivo((i) => Math.max(0, i - 1))}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
              ← {apenasQuestoes ? "Bloco" : "Seção"} anterior
            </button>
            {slideAtivo < aula.slides.length - 1 ? (
              <button
                type="button"
                onClick={() =>
                  setSlideAtivo((i) => Math.min(aula.slides.length - 1, i + 1))
                }
                className="rounded-lg bg-teal-900 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
              >
                Próximo {apenasQuestoes ? "bloco" : "seção"} →
              </button>
            ) : (
              <div className="flex gap-2">
                {moduloProximo ? (
                  <Link
                    to={`/aula/${moduloProximo.aulaId}`}
                    className="rounded-lg bg-teal-900 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
                  >
                    Próximo módulo →
                  </Link>
                ) : (
                  <Link
                    to="/modulos"
                    className="rounded-lg bg-teal-900 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
                  >
                    Concluir trilha
                  </Link>
                )}
              </div>
            )}
          </nav>

          {(moduloAnterior || moduloProximo) && (
            <div className="flex gap-3 text-sm">
              {moduloAnterior && (
                <Link
                  to={`/aula/${moduloAnterior.aulaId}`}
                  className="text-slate-500 hover:text-teal-800"
                >
                  ← {moduloAnterior.titulo}
                </Link>
              )}
              {moduloProximo && (
                <Link
                  to={`/aula/${moduloProximo.aulaId}`}
                  className="ml-auto text-slate-500 hover:text-teal-800"
                >
                  {moduloProximo.titulo} →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
