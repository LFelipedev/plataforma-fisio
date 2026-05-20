import { readFileSync } from "fs";
import { parseLesson } from "../src/utils/parseLesson.js";
import { parseTesteFinal } from "../src/utils/parseTesteFinal.js";
import { formatScientificInline } from "../src/utils/scientificText.js";

const files = [
  ["aula02", "src/contents/aula02/aula02.md", parseLesson],
  ["aula03", "src/contents/aula03/aula03.md", parseLesson],
  ["aula07", "src/contents/aula07/aula07.md", parseLesson],
  ["aula08", "src/contents/aula08/aula08.md", parseLesson],
  ["testeFinal", "src/contents/testeFinal/testeFinal.md", parseTesteFinal],
];

const LATEX_REMAIN = /\\[a-zA-Z]+|(?:^|[^>])\$[^$]+\$|_\{|\^\{|`[^`]+`/;

const issues = [];

for (const [id, path, parser] of files) {
  const parsed = parser(readFileSync(path, "utf8"), { aulaId: id });
  for (const slide of parsed.slides) {
    for (const q of slide.questoes) {
      for (const field of [
        ["enunciado", q.enunciado],
        ...q.opcoes.map((o) => [`opção ${o.letra}`, o.texto]),
        ["justificativa", q.gabarito.justificativa],
      ]) {
        const [name, text] = field;
        if (!text) continue;
        const html = formatScientificInline(text);
        const plainAfter = html.replace(/<[^>]+>/g, "");
        if (LATEX_REMAIN.test(text) || /\\text|\\approx/.test(plainAfter)) {
          const stillHas = [];
          if (/\\[a-zA-Z]{2,}/.test(plainAfter)) stillHas.push("latex-cmd");
          if (/\$/.test(plainAfter)) stillHas.push("dollar");
          if (/\\text/.test(text) && /\\text/.test(plainAfter)) stillHas.push("text-cmd");
          if (stillHas.length) {
            issues.push({
              modulo: id,
              q: q.numero,
              field: name,
              text: text.slice(0, 120),
              stillHas,
            });
          }
        }
      }
    }
  }
}

console.log("Possíveis não interpretados:", issues.length);
console.log(JSON.stringify(issues.slice(0, 40), null, 2));
