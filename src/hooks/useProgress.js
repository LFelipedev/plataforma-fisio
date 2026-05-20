import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "plataforma-fisio-progresso";

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("progress-updated"));
}

let cache = readStore();

function subscribe(callback) {
  const handler = () => {
    cache = readStore();
    callback();
  };
  window.addEventListener("progress-updated", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("progress-updated", handler);
    window.removeEventListener("storage", handler);
  };
}

function getSnapshot() {
  return cache;
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, () => ({}));

  const getAulaProgress = useCallback(
    (aulaId) =>
      progress[aulaId] ?? {
        slidesConcluidos: [],
        questoesRespondidas: {},
      },
    [progress],
  );

  const marcarSlide = useCallback((aulaId, slideId) => {
    const current = readStore();
    const aula = current[aulaId] ?? {
      slidesConcluidos: [],
      questoesRespondidas: {},
    };
    if (!aula.slidesConcluidos.includes(slideId)) {
      aula.slidesConcluidos = [...aula.slidesConcluidos, slideId];
    }
    writeStore({ ...current, [aulaId]: aula });
  }, []);

  const registrarResposta = useCallback(
    (aulaId, questaoId, letra, correta) => {
      const current = readStore();
      const aula = current[aulaId] ?? {
        slidesConcluidos: [],
        questoesRespondidas: {},
      };
      aula.questoesRespondidas = {
        ...aula.questoesRespondidas,
        [questaoId]: { letra, correta, em: Date.now() },
      };
      writeStore({ ...current, [aulaId]: aula });
    },
    [],
  );

  const calcularPercentual = useCallback(
    (aula) => {
      const prog = getAulaProgress(aula.aulaId);
      const totalQuestoes = aula.totalQuestoes || 1;
      const questoesOk = Object.values(prog.questoesRespondidas).filter(
        (r) => r.correta,
      ).length;

      if (aula.apenasQuestoes) {
        return Math.round((questoesOk / totalQuestoes) * 100);
      }

      const totalSlides = aula.totalSlides || 1;
      const slidePct = (prog.slidesConcluidos.length / totalSlides) * 50;
      const questPct = (questoesOk / totalQuestoes) * 50;
      return Math.round(slidePct + questPct);
    },
    [getAulaProgress],
  );

  return {
    progress,
    getAulaProgress,
    marcarSlide,
    registrarResposta,
    calcularPercentual,
  };
}
