import { formatScientificInline } from "./scientificText";

function formatInline(text) {
  return formatScientificInline(text);
}

function getIndentLevel(line) {
  const m = line.match(/^(\s*)/);
  return m ? Math.floor(m[1].length / 2) : 0;
}

export function markdownToHtml(markdown) {
  if (!markdown?.trim()) return "";

  const lines = markdown.trim().split("\n");
  const blocks = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(
        `<p class="mb-3 leading-relaxed">${formatInline(paragraph.join(" "))}</p>`,
      );
      paragraph = [];
    }
  };

  const parseList = (startIdx) => {
    const items = [];
    let i = startIdx;
    while (i < lines.length) {
      const raw = lines[i];
      const trimmed = raw.trim();
      if (!trimmed) break;
      if (!/^[*\-]\s+/.test(trimmed) && !/^\d+\.\s+/.test(trimmed)) break;

      const content = trimmed
        .replace(/^[*\-]\s+/, "")
        .replace(/^\d+\.\s+/, "");
      const indent = getIndentLevel(raw);

      items.push({ indent, content, html: formatInline(content) });
      i++;
    }

    const build = (level = 0) => {
      let html = "<ul class=\"mb-4 list-disc space-y-1.5 pl-5\">";
      while (items.length && items[0].indent <= level) {
        const item = items.shift();
        html += "<li>";
        if (items.length && items[0].indent > item.indent) {
          html += item.html + build(item.indent + 1);
        } else {
          html += item.html;
        }
        html += "</li>";
      }
      html += "</ul>";
      return html;
    };

    while (items.length) {
      blocks.push(build(0));
    }
    return i;
  };

  let i = 0;
  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (!trimmed) {
      flushParagraph();
      i++;
      continue;
    }

    if (/^[*\-]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      i = parseList(i);
      continue;
    }

    paragraph.push(trimmed);
    i++;
  }

  flushParagraph();
  return blocks.join("\n");
}
