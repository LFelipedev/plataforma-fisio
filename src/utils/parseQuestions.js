export const QUESTION_SPLIT =
  /####\s*❓\s*Questão\s*(\d+)\s*\(Nível:\s*(\w+)\)\s*\n([\s\S]*?)(?=\n####\s*❓|\n---\n|\n##\s|$)/gi;

function splitCorpoEGabarito(block) {
  const detailsMatch = block.match(
    /(\*?<details[\s\S]*?<\/details>\*?)\s*$/i,
  );
  if (detailsMatch) {
    const corpo = block.slice(0, detailsMatch.index).trim();
    return { corpo, gabaritoRaw: detailsMatch[1] };
  }
  return { corpo: block.trim(), gabaritoRaw: "" };
}

function parseGabarito(gabaritoRaw) {
  if (!gabaritoRaw) return { resposta: "", justificativa: "" };

  const detailsMatch = gabaritoRaw.match(
    /<details>[\s\S]*?<summary>[\s\S]*?<\/summary>([\s\S]*?)<\/details>/i,
  );
  const content = detailsMatch?.[1] ?? gabaritoRaw;
  return splitGabaritoContent(content);
}

function splitGabaritoContent(content) {
  const plain = content
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const altMatch = plain.match(/Alternativa\s+Correta:\s*([A-D])/i);
  const respMatch = plain.match(/Resposta\s+correta:\s*([A-D])/i);
  const resposta = (altMatch?.[1] ?? respMatch?.[1] ?? "").toUpperCase();

  const expMatch =
    plain.match(/\(Explicação:\s*(.+?)\)\s*\.?\s*$/i) ||
    plain.match(/\(Explicacao:\s*(.+?)\)\s*\.?\s*$/i);
  const justMatch = plain.match(
    /Justificativa\s+neurofisiológica[^:]*:\s*(.+)$/i,
  );

  let justificativa = "";
  if (expMatch) {
    justificativa = expMatch[1].trim();
  } else if (justMatch) {
    justificativa = justMatch[1].trim();
  } else {
    const resto = plain
      .replace(/Alternativa\s+Correta:\s*[A-D]\s*\.?\s*/i, "")
      .replace(/Resposta\s+correta:\s*[A-D]\s*\.?\s*/i, "")
      .replace(/^[.\s]+/, "")
      .trim();
    if (resto && resto.length > 3 && !/^[\sA-D.]$/i.test(resto)) {
      justificativa = resto;
    }
  }

  return { resposta, justificativa };
}

function extractEnunciado(corpo) {
  const match = corpo.match(
    /\*\*Enunciado:\*\*\s*([\s\S]*?)(?=\n-\s*\[\s*[x ]?\s*\]\s*[A-D][).]|\n\*?<details|\n<details|$)/i,
  );
  if (match) {
    return match[1]
      .replace(/^\*\*|\*\*$/g, "")
      .replace(/\s*\n\s*/g, " ")
      .trim();
  }
  const lines = corpo.split("\n").filter((l) => l.trim());
  return lines[0]?.trim() ?? "";
}

function extractOpcoes(corpo) {
  const opcoes = [];
  const patterns = [
    /^-\s*\[\s*[x ]?\s*\]\s*([A-D])\)\s*(.+)$/gim,
    /^-\s*\[\s*[x ]?\s*\]\s*([A-D])\.\s*(.+)$/gim,
    /^([A-D])\)\s*(.+)$/gim,
  ];

  for (const regex of patterns) {
    regex.lastIndex = 0;
    let m;
    while ((m = regex.exec(corpo)) !== null) {
      const letra = m[1].toUpperCase();
      if (!opcoes.some((o) => o.letra === letra)) {
        opcoes.push({ letra, texto: m[2].trim() });
      }
    }
    if (opcoes.length >= 2) break;
  }

  return opcoes.sort((a, b) => a.letra.localeCompare(b.letra));
}

export function parseQuestion(block, numero, nivelRaw) {
  const nivel = nivelRaw.toLowerCase();
  const { corpo, gabaritoRaw } = splitCorpoEGabarito(block);
  const enunciado = extractEnunciado(corpo);
  const opcoes = extractOpcoes(corpo);
  const gabarito = parseGabarito(gabaritoRaw);

  return {
    id: `q${numero}`,
    numero: Number(numero),
    nivel,
    enunciado,
    opcoes,
    gabarito,
  };
}

export function parseQuestionsFromBody(body) {
  const questoes = [];
  const qRegex = new RegExp(QUESTION_SPLIT.source, "gi");
  let qm;
  while ((qm = qRegex.exec(body)) !== null) {
    questoes.push(parseQuestion(qm[3], qm[1], qm[2]));
  }
  return questoes;
}

export function validateQuestion(questao) {
  const issues = [];
  if (!questao.enunciado) issues.push("sem enunciado");
  if (questao.opcoes.length < 2) issues.push("opções insuficientes");
  if (!questao.gabarito.resposta) issues.push("sem gabarito");
  return issues;
}

export function validateQuestions(questoes, context = "") {
  const erros = [];
  for (const q of questoes) {
    const issues = validateQuestion(q);
    if (issues.length) {
      erros.push({ context, numero: q.numero, issues });
    }
  }
  return erros;
}
