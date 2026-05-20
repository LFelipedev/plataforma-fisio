import { Link } from "react-router-dom";
import { MODULOS, getAula } from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";

const corClasses = {
  teal: "from-teal-600 to-teal-800",
  indigo: "from-indigo-600 to-indigo-800",
  violet: "from-violet-600 to-violet-800",
  rose: "from-rose-600 to-rose-800",
  slate: "from-slate-700 to-slate-900",
};

export default function Home() {
  const { calcularPercentual } = useProgress();

  return (
    <main>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-teal-300">
            Fisiologia
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
            Prova da Juliaa
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            minha contribuição para sua prova com muitas questões lerolero
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/modulos"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-teal-950 transition hover:bg-teal-50"
            >
              Ver módulos
            </Link>
            <Link
              to="/aula/aula02"
              className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Iniciar Módulo 1
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900">Áreas de estudo</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              titulo: "Neurofisiologia",
              itens: ["Potencial de repouso", "Potencial de ação", "Sinapses"],
            },
            {
              titulo: "Biofísica",
              itens: ["Gradientes iônicos", "Equilíbrio de Nernst", "Permeabilidade"],
            },
            {
              titulo: "Neurotransmissores",
              itens: ["Serotonina", "GABA", "Acetilcolina", "Noradrenalina"],
            },
            {
              titulo: "Neurofarmacologia",
              itens: ["ISRS", "Benzodiazepínicos", "Receptores adrenérgicos"],
            },
          ].map((area) => (
            <div
              key={area.titulo}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <h3 className="font-semibold text-teal-900">{area.titulo}</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {area.itens.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900">Trilha de módulos</h2>
            <Link
              to="/modulos"
              className="text-sm font-medium text-teal-800 hover:underline"
            >
              Ver todos →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {MODULOS.map((mod) => {
              const aula = getAula(mod.aulaId);
              const pct = aula ? calcularPercentual(aula) : 0;
              return (
                <Link
                  key={mod.id}
                  to={`/aula/${mod.aulaId}`}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-teal-200 hover:shadow-md"
                >
                  <div
                    className={`h-1.5 bg-gradient-to-r ${corClasses[mod.cor]}`}
                  />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-400">
                        Módulo {mod.ordem}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {pct}%
                      </span>
                    </div>
                    <h3 className="mt-1 font-semibold text-slate-900 group-hover:text-teal-900">
                      {mod.titulo}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {mod.descricao}
                    </p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${corClasses[mod.cor]} transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-semibold text-amber-950">Níveis de avaliação</h3>
          <div className="mt-3 grid gap-3 text-sm text-amber-950/90 sm:grid-cols-3">
            <p>
              <strong>Junior:</strong> estruturas, conceitos fundamentais e
              identificação de neurotransmissores e canais.
            </p>
            <p>
              <strong>Pleno:</strong> correlação entre mecanismos, gráficos
              eletrofisiológicos e farmacodinâmica básica.
            </p>
            <p>
              <strong>Senior:</strong> integração sináptica complexa,
              antagonistas, plasticidade e interações farmacológicas.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
