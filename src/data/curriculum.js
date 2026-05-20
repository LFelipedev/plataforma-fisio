import aula02Raw from "../contents/aula02/aula02.md?raw";
import aula03Raw from "../contents/aula03/aula03.md?raw";
import aula07Raw from "../contents/aula07/aula07.md?raw";
import aula08Raw from "../contents/aula08/aula08.md?raw";
import testeFinalRaw from "../contents/testeFinal/testeFinal.md?raw";
import { parseLesson } from "../utils/parseLesson";
import { validateQuestions } from "../utils/parseQuestions";
import { parseTesteFinal } from "../utils/parseTesteFinal";

export const MODULOS = [
  {
    id: "modulo-1",
    ordem: 1,
    titulo: "Fisiologia Introdutória",
    descricao:
      "Níveis de organização biológica, compartimentos de fluidos, transporte hidrostático e homeostase.",
    area: "Fisiologia Geral",
    aulaId: "aula02",
    cor: "teal",
  },
  {
    id: "modulo-2",
    ordem: 2,
    titulo: "Potencial de Ação e Propagação",
    descricao:
      "Potencial de repouso, limiar de disparo, fases do potencial de ação, períodos refratários e condução saltatória.",
    area: "Neurofisiologia",
    aulaId: "aula03",
    cor: "indigo",
  },
  {
    id: "modulo-3",
    ordem: 3,
    titulo: "Transmissão Sináptica",
    descricao:
      "Sinapses elétricas e químicas, receptores pós-sinápticos, integração PEPS/PIPS e clareamento da fenda sináptica.",
    area: "Neurofisiologia",
    aulaId: "aula07",
    cor: "violet",
  },
  {
    id: "modulo-4",
    ordem: 4,
    titulo: "Sistema Nervoso Autônomo",
    descricao:
      "Divisões do SNA, vias pré e pós-ganglionares, neurotransmissores colinérgicos e adrenérgicos e receptores.",
    area: "Neurofisiologia",
    aulaId: "aula08",
    cor: "rose",
  },
  {
    id: "modulo-teste-final",
    ordem: 5,
    titulo: "Teste Final",
    descricao:
      "Avaliação integrada com 100 questões cobrindo toda a trilha: fisiologia geral, potencial de ação, sinapses, neurotransmissores e SNA.",
    area: "Avaliação",
    aulaId: "testeFinal",
    cor: "slate",
    apenasQuestoes: true,
  },
];

const RAW_BY_ID = {
  aula02: aula02Raw,
  aula03: aula03Raw,
  aula07: aula07Raw,
  aula08: aula08Raw,
  testeFinal: testeFinalRaw,
};

const PARSERS = {
  testeFinal: parseTesteFinal,
};

const parsedCache = new Map();

export function getAula(aulaId) {
  if (!parsedCache.has(aulaId)) {
    const raw = RAW_BY_ID[aulaId];
    if (!raw) return null;
    const modulo = MODULOS.find((m) => m.aulaId === aulaId);
    const parser = PARSERS[aulaId] ?? parseLesson;
    const parsed = parser(raw, {
      aulaId,
      modulo,
      titulo: modulo?.titulo,
      visaoGeral: modulo?.descricao,
      apenasQuestoes: modulo?.apenasQuestoes ?? false,
    });

    if (import.meta.env.DEV) {
      const todas = parsed.slides.flatMap((s) => s.questoes);
      const erros = validateQuestions(todas, aulaId);
      if (erros.length) {
        console.warn(
          `[plataforma-fisio] ${erros.length} questão(ões) com problemas em ${aulaId}:`,
          erros,
        );
      }
    }

    parsedCache.set(aulaId, parsed);
  }
  return parsedCache.get(aulaId);
}

export function getModuloByAulaId(aulaId) {
  return MODULOS.find((m) => m.aulaId === aulaId);
}

export const NIVEL_LABELS = {
  junior: { label: "Junior", cor: "emerald" },
  pleno: { label: "Pleno", cor: "amber" },
  senior: { label: "Senior", cor: "rose" },
};

export const AREAS = [
  "Neurofisiologia",
  "Neurofarmacologia",
  "Biofísica celular",
  "Fisiologia sináptica",
  "Fisiologia Geral",
];
