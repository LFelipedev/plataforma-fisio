import { NIVEL_LABELS } from "../data/curriculum";

const cores = {
  emerald: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  amber: "bg-amber-100 text-amber-900 ring-amber-200",
  rose: "bg-rose-100 text-rose-900 ring-rose-200",
};

export default function NivelBadge({ nivel }) {
  const info = NIVEL_LABELS[nivel] ?? { label: nivel, cor: "emerald" };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${cores[info.cor]}`}
    >
      {info.label}
    </span>
  );
}
