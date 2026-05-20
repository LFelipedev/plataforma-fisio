import { readFileSync } from "fs";
import { parseLesson } from "../src/utils/parseLesson.js";
import { parseTesteFinal } from "../src/utils/parseTesteFinal.js";
import { validateQuestion } from "../src/utils/parseQuestions.js";

const files = [
  ["aula02", "src/contents/aula02/aula02.md", parseLesson],
  ["aula03", "src/contents/aula03/aula03.md", parseLesson],
  ["aula07", "src/contents/aula07/aula07.md", parseLesson],
  ["aula08", "src/contents/aula08/aula08.md", parseLesson],
  ["testeFinal", "src/contents/testeFinal/testeFinal.md", parseTesteFinal],
];

let total = 0;
const problems = [];

for (const [id, path, parser] of files) {
  const raw = readFileSync(path, "utf8");
  const parsed = parser(raw, { aulaId: id });
  for (const slide of parsed.slides) {
    for (const q of slide.questoes) {
      total++;
      const issues = validateQuestion(q);
      if (issues.length) {
        problems.push({
          modulo: id,
          bloco: slide.numero,
          numero: q.numero,
          issues,
          enunciado: q.enunciado?.slice(0, 80),
          opcoes: q.opcoes.length,
          gabarito: q.gabarito.resposta,
        });
      }
      if (!q.enunciado || q.opcoes.length < 2) {
        // dump raw block hint
        const re = new RegExp(
          `####\\s*❓\\s*Questão\\s*${String(q.numero).padStart(2, "0")}|####\\s*❓\\s*Questão\\s*${q.numero}`,
          "i",
        );
        const idx = raw.search(re);
        if (idx >= 0) {
          problems[problems.length - 1] ||= {};
          problems[problems.length - 1].rawSnippet = raw
            .slice(idx, idx + 400)
            .replace(/\n/g, "\\n");
        }
      }
    }
  }
}

console.log(`Total questões: ${total}`);
console.log(`Problemas: ${problems.length}`);
console.log(JSON.stringify(problems, null, 2));
