import { parseQuestionsFromBody } from "./parseQuestions";

const BLOCO_SPLIT =
  /##\s*(?:🎛️|💾|🔌|🗃️|📑)?\s*Bloco\s*(\d+):\s*([^\n]+)\n([\s\S]*?)(?=\n##\s*(?:🎛️|💾|🔌|🗃️|📑)?\s*Bloco|$)/g;

function sanitizarTituloBloco(titulo) {
  return titulo
    .replace(/\s*\(Questões\s+\d+\s+a\s+\d+\)\s*$/i, "")
    .replace(/\s*\([^)]*\)\s*$/g, "")
    .trim();
}

function parseBlocos(markdown) {
  const blocos = [];
  let match;
  while ((match = BLOCO_SPLIT.exec(markdown)) !== null) {
    const [, numero, tituloRaw, body] = match;
    const questoes = parseQuestionsFromBody(body);
    blocos.push({
      id: `bloco-${numero}`,
      numero: Number(numero),
      titulo: sanitizarTituloBloco(tituloRaw.trim()),
      resumo: "",
      secoes: [],
      questoes,
    });
  }
  return blocos;
}

export function parseTesteFinal(markdown, meta = {}) {
  const slides = parseBlocos(markdown);
  const totalQuestoes = slides.reduce((acc, b) => acc + b.questoes.length, 0);

  return {
    ...meta,
    titulo: meta.titulo ?? "Teste Final",
    visaoGeral:
      meta.visaoGeral ??
      "Avaliação integrada com 100 questões sobre fisiologia geral, bioeletrofisiologia, transmissão sináptica, neurotransmissores e sistema nervoso autônomo.",
    apenasQuestoes: true,
    slides,
    blocos: slides,
    totalQuestoes,
    totalSlides: slides.length,
  };
}
