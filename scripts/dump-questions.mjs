import { readFileSync } from "fs";
import { parseLesson } from "../src/utils/parseLesson.js";
import { parseTesteFinal } from "../src/utils/parseTesteFinal.js";

const files = [
  ["M1-aula02", "src/contents/aula02/aula02.md", parseLesson],
  ["M2-aula03", "src/contents/aula03/aula03.md", parseLesson],
  ["M3-aula07", "src/contents/aula07/aula07.md", parseLesson],
  ["M4-aula08", "src/contents/aula08/aula08.md", parseLesson],
  ["M5-teste", "src/contents/testeFinal/testeFinal.md", parseTesteFinal],
];

for (const [label, path, parser] of files) {
  const parsed = parser(readFileSync(path, "utf8"));
  console.log(`\n=== ${label} ===`);
  for (const slide of parsed.slides) {
    for (const q of slide.questoes) {
      const rawMd =
        q.enunciado?.includes("**") ||
        q.enunciado?.includes("- [ ]") ||
        q.opcoes.some((o) => o.texto?.includes("- [ ]") || o.texto?.startsWith("**"));
      if (rawMd || q.opcoes.length < 2) {
        console.log(`Q${q.numero} slide${slide.numero}: opcoes=${q.opcoes.length}`);
        console.log("  enunciado:", q.enunciado?.slice(0, 100));
        if (q.opcoes[0]) console.log("  op1:", q.opcoes[0].texto?.slice(0, 80));
      }
    }
  }
}

const aula03 = parseLesson(readFileSync("src/contents/aula03/aula03.md", "utf8"));
const q1 = aula03.slides[0].questoes[0];
console.log("\n=== M2 Q1 FULL DUMP ===");
console.log(JSON.stringify(q1, null, 2));
