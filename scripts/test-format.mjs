import {
  formatScientificInline,
  normalizeLatexFragment,
} from "../src/utils/scientificText.js";

console.log("beta frag:", normalizeLatexFragment("\\beta_1"));
console.log("beta fmt:", formatScientificInline("($\\beta_1$)"));

const samples = [
  "**Beta-1 ($\\beta_1$)**",
  "$E_{Na}$",
  "$p_{Na} = 0,04$",
  "$\\approx 120\\text{ mM}$",
  "$-75\\text{ mV}$",
  "($E_K$)",
  "`Status = (Soma de PEPS - Soma de PIPS) >= -55mV ? DISPARAR : TRAVAR`",
  "ou $-70\\text{ mV}$ a $-75\\text{ mV}$",
];

for (const s of samples) {
  const h = formatScientificInline(s);
  const p = h.replace(/<[^>]+>/g, "");
  console.log("IN:", s);
  console.log("OUT:", p);
  console.log("hasBackslash:", /\\/.test(p));
  console.log("---");
}
