import { readFileSync } from "fs";
import { parseLesson } from "../src/utils/parseLesson.js";
import { markdownToHtml } from "../src/utils/markdownToHtml.js";

const a = parseLesson(readFileSync("./src/contents/aula03/aula03.md", "utf8"));
const s = a.slides[0];
console.log("secoes:", s.secoes.length, s.secoes.map((x) => x.titulo));
console.log("questoes:", s.questoes.length);
console.log("\n---RESUMO (first 300 chars)---\n", s.resumo.slice(0, 300));
const html = markdownToHtml(s.resumo);
console.log("\n---HTML has raw **?---", html.includes("**"));
console.log("\n---HTML has raw * ?---", /\* [^<]/.test(html));
