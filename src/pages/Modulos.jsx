import { Link } from "react-router-dom";
import { MODULOS, getAula } from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";

const corBadge = {
  teal: "bg-teal-100 text-teal-800",
  indigo: "bg-indigo-100 text-indigo-800",
  violet: "bg-violet-100 text-violet-800",
  rose: "bg-rose-100 text-rose-800",
  slate: "bg-slate-200 text-slate-800",
};

export default function Modulos() {
  const { calcularPercentual, getAulaProgress } = useProgress();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Módulos e aulas</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Quatro módulos progressivos cobrindo fisiologia geral, excitabilidade
          neuronal, transmissão sináptica e sistema nervoso autônomo.
        </p>
      </header>

      <div className="space-y-4">
        {MODULOS.map((mod) => {
          const aula = getAula(mod.aulaId);
          const prog = getAulaProgress(mod.aulaId);
          const pct = aula ? calcularPercentual(aula) : 0;

          return (
            <article
              key={mod.id}
              className="rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${corBadge[mod.cor]}`}
                    >
                      Módulo {mod.ordem}
                    </span>
                    {mod.apenasQuestoes && (
                      <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-white">
                        Teste
                      </span>
                    )}
                    <span className="text-xs text-slate-500">{mod.area}</span>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">
                    {mod.titulo}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{mod.descricao}</p>
                  {aula && (
                    <p className="mt-3 text-xs text-slate-500">
                      {mod.apenasQuestoes
                        ? `${aula.totalQuestoes} questões em ${aula.totalSlides} blocos`
                        : `${aula.totalSlides} seções · ${aula.totalQuestoes} questões`}
                      {!mod.apenasQuestoes &&
                        prog.slidesConcluidos.length > 0 &&
                        ` · ${prog.slidesConcluidos.length} seções concluídas`}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-teal-700 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-600">
                      {pct}%
                    </span>
                  </div>
                  <Link
                    to={`/aula/${mod.aulaId}`}
                    className="rounded-lg bg-teal-900 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-teal-800"
                  >
                    Acessar aula
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
