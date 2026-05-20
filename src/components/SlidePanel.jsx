import { markdownToHtml } from "../utils/markdownToHtml";

export default function SlidePanel({ slide, onConcluir, concluido }) {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
          Seção {slide.numero}
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">{slide.titulo}</h2>
      </header>

      {slide.resumo && (
        <section className="rounded-xl border border-teal-100 bg-teal-50/50 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal-800">
            Resumo fisiológico
          </h3>
          <div
            className="prose-lesson text-slate-800"
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(slide.resumo),
            }}
          />
        </section>
      )}

      {slide.secoes.map((sec) => (
        <section
          key={sec.titulo}
          className="rounded-xl border border-slate-200 bg-white p-5"
        >
          <h3 className="mb-3 text-sm font-semibold text-slate-900">
            {sec.titulo}
          </h3>
          <div
            className="prose-lesson text-slate-700"
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(sec.conteudo),
            }}
          />
        </section>
      ))}

      {slide.questoes.length > 0 && (
        <section>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Avaliação — {slide.questoes.length}{" "}
            {slide.questoes.length === 1 ? "questão" : "questões"}
          </h3>
        </section>
      )}

      <div className="flex justify-end border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={onConcluir}
          disabled={concluido}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            concluido
              ? "bg-emerald-100 text-emerald-800"
              : "bg-slate-900 text-white hover:bg-slate-700"
          }`}
        >
          {concluido ? "Seção concluída" : "Marcar seção como concluída"}
        </button>
      </div>
    </div>
  );
}
