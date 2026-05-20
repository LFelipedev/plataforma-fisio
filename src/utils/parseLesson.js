const SLIDE_SPLIT =
  /##\s*💻\s*Slide\s*(\d+):\s*([^\n]+)\n([\s\S]*?)(?=\n##\s*💻\s*Slide|\n##\s*📈|$)/g;

function sanitizarTitulo(titulo) {
  return titulo
    .replace(/\s*\([^)]+\)\s*$/g, "")
    .replace(/\s*\/\s*[^/]+$/g, "")
    .trim();
}

import { parseQuestionsFromBody } from "./parseQuestions";

function extractOverview(markdown) {
  const match = markdown.match(
    /##\s*📌[^\n]*\n([\s\S]*?)(?=\n---\n|\n##\s*💻)/,
  );
  return match?.[1]?.trim() ?? "";
}

function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  if (!match) return "Aula";
  return match[1]
    .replace(/^📑\s*/, "")
    .replace(/Aula\s*\d+:\s*/i, "")
    .replace(/\([^)]*\)/g, "")
    .trim();
}

const H3 = "###(?!#)";
const H3_OR_H4 = "(?:###(?!#)|####)";

function parseSummary(slideBody) {
  const match = slideBody.match(
    new RegExp(
      `${H3}\\s*📝[^\\n]*\\n([\\s\\S]*?)(?=\\n${H3_OR_H4}|$)`,
    ),
  );
  return match?.[1]?.trim() ?? "";
}

function parseExtraSections(slideBody) {
  const sections = [];
  const regex = new RegExp(
    `${H3}\\s*([^\\n]+)\\n([\\s\\S]*?)(?=\\n${H3_OR_H4}|$)`,
    "g",
  );
  let m;
  while ((m = regex.exec(slideBody)) !== null) {
    const heading = m[1].trim();
    if (
      heading.includes("📝") ||
      heading.includes("Testes") ||
      heading.includes("❓") ||
      /Questão/i.test(heading)
    ) {
      continue;
    }
    sections.push({
      titulo: heading.replace(/[🛠️📊🧼🔌⚡]/g, "").trim(),
      conteudo: m[2].trim(),
    });
  }
  return sections;
}

function parseSlides(markdown) {
  const slides = [];
  let match;
  while ((match = SLIDE_SPLIT.exec(markdown)) !== null) {
    const [, numero, tituloRaw, body] = match;
    const titulo = sanitizarTitulo(tituloRaw.trim());
    const resumo = parseSummary(body);
    const secoes = parseExtraSections(body);

    const questoes = parseQuestionsFromBody(body);

    slides.push({
      id: `slide-${numero}`,
      numero: Number(numero),
      titulo,
      resumo,
      secoes,
      questoes,
    });
  }
  return slides;
}

export function parseLesson(markdown, meta = {}) {
  const titulo = meta.titulo ?? extractTitle(markdown);
  const visaoGeral = extractOverview(markdown);
  const slides = parseSlides(markdown);

  const totalQuestoes = slides.reduce((acc, s) => acc + s.questoes.length, 0);

  return {
    ...meta,
    titulo,
    visaoGeral,
    apenasQuestoes: false,
    slides,
    totalQuestoes,
    totalSlides: slides.length,
  };
}
