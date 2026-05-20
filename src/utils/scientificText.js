import katex from "katex";

const LATEX_FALLBACK = [
  [/\\text\s*\{\s*([^}]*)\s*\}/g, "$1"],
  [/\\Delta/g, "Δ"],
  [/\\delta/g, "δ"],
  [/\\alpha/g, "α"],
  [/\\beta/g, "β"],
  [/\\gamma/g, "γ"],
  [/\\mu/g, "μ"],
  [/\\pi/g, "π"],
  [/\\approx/g, "≈"],
  [/\\geq/g, "≥"],
  [/\\leq/g, "≤"],
  [/\\cdot/g, "·"],
  [/\\times/g, "×"],
  [/\\longrightarrow/g, "→"],
  [/\\rightarrow/g, "→"],
  [/\\to/g, "→"],
  [/\\,/g, " "],
  [/\\ /g, " "],
];

const SUPER = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "+": "⁺",
  "-": "⁻",
};

function toSuper(s) {
  return [...s].map((c) => SUPER[c] ?? c).join("");
}

export function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function normalizeLatexFragment(fragment) {
  let t = fragment.trim();

  for (const [pattern, replacement] of LATEX_FALLBACK) {
    t = t.replace(pattern, replacement);
  }

  t = t.replace(/\^\{([^}]+)\}/g, (_, e) => `<sup>${toSuper(e)}</sup>`);
  t = t.replace(/\^([0-9+\-]+)/g, (_, e) => `<sup>${toSuper(e)}</sup>`);
  t = t.replace(/_\{([^}]+)\}/g, (_, e) => `<sub>${e}</sub>`);
  t = t.replace(/_([A-Za-z]{1,4})/g, (_, e) => `<sub>${e}</sub>`);
  t = t.replace(/_([0-9]+)/g, (_, e) => `<sub>${toSuper(e)}</sub>`);

  return t.replace(/\s+/g, " ").trim();
}

function renderKatex(latex) {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      strict: "ignore",
      output: "html",
      trust: false,
    });
  } catch {
    return normalizeLatexFragment(latex);
  }
}

function formatTextMarkup(text) {
  if (!text) return "";

  let out = escapeHtml(text);
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  return out;
}

export function formatScientificInline(text) {
  if (!text) return "";

  const mathParts = [];
  const protectedText = text.replace(/\$[^$]+\$/g, (match) => {
    const id = mathParts.length;
    mathParts.push(match);
    return `\uE000MATH${id}\uE001`;
  });

  let html = formatTextMarkup(protectedText);

  mathParts.forEach((latex, id) => {
    const rendered = renderKatex(latex.slice(1, -1));
    html = html.replace(
      `\uE000MATH${id}\uE001`,
      `<span class="math-inline katex-wrap">${rendered}</span>`,
    );
  });

  return html;
}

export function richTextToHtml(text) {
  if (!text?.trim()) return "";
  const normalized = text.replace(/\s*\n\s*/g, " ").trim();
  return `<span class="rich-text">${formatScientificInline(normalized)}</span>`;
}
