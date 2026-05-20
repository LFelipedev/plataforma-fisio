import { readFileSync } from "fs";
import { parseLesson } from "../src/utils/parseLesson.js";
import { parseTesteFinal } from "../src/utils/parseTesteFinal.js";

const files = [
  ["aula02", parseLesson],
  ["aula03", parseLesson],
  ["aula07", parseLesson],
  ["aula08", parseLesson],
  ["testeFinal", parseTesteFinal],
];

let bad = 0;
for (const [id, parser] of files) {
  const p = parser(readFileSync(`./src/contents/${id}/${id}.md`, "utf8"));
  for (const s of p.slides) {
    for (const sec of s.secoes) {
      if (
        sec.conteudo.includes("**Enunciado:**") ||
        sec.conteudo.includes("- [ ]") ||
        /Questão/i.test(sec.titulo)
      ) {
        bad++;
        console.log(`${id} slide ${s.numero} SECAO RUIM:`, sec.titulo);
      }
    }
  }
}
console.log(bad === 0 ? "OK: nenhuma seção com questão em MD" : `ERRO: ${bad} seções`);
