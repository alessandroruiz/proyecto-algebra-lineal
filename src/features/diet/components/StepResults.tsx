import { CheckCircle2, AlertTriangle } from "lucide-react";
import type { Food, Constraint, SolveResult } from "../domain/types";
import { fmt } from "@/shared/utils/format";

function clamp(n: number, a = 0, b = 100) {
  return Math.max(a, Math.min(b, n));
}

function getRule(constraints: { nutrient: string; min?: number; max?: number }[], nutrient: string) {
  return constraints.find((c) => c.nutrient === nutrient);
}


export default function StepResults({
  foods,
  universe,
  constraints,
  solution,
}: {
  foods: Food[];
  universe: string[];
  constraints: Constraint[];
  solution: SolveResult | null;
}) {
  const enabledFoods = foods.filter((f) => f.enabled);

  return (
    <div>
      <h2 className="text-lg font-bold">Paso 3 — Resultados</h2>
      <p className="mt-1 text-sm text-slate-600">
        Porciones óptimas (<b>x</b>), totales (<b>A·x</b>) y costo mínimo.
      </p>

      {!solution ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
          Aún no ejecutaste la optimización. Presiona <b>Optimizar</b>.
        </div>
      ) : (
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold">Porciones óptimas (x)</div>
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                  solution.feasible
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                    : "bg-amber-50 text-amber-700 ring-amber-200"
                }`}
              >
                {solution.feasible ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                {!solution.feasible && (
  <div className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700 ring-1 ring-red-200">
    No existe combinación que cumpla todas las restricciones.
    Ajusta los mínimos/máximos.
  </div>
)}

              </div>
            </div>

            <div className="mt-3 space-y-2">
              {enabledFoods.map((f) => {
                const x = solution.servingsById[f.id] ?? 0;
                return (
                  <div
                    key={f.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{f.name}</div>
                      <div className="text-xs text-slate-500">máx {f.maxServings} porciones</div>
                    </div>
                    <div className="text-sm font-bold">{fmt(x, 3)}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-xl bg-slate-900 p-4 text-white">
              <div className="text-xs text-white/70">Costo total</div>
              <div className="mt-1 text-2xl font-extrabold">Bs {fmt(solution.totalCost, 2)}</div>
              <div className="mt-1 text-xs text-white/70">{solution.message}</div>
            </div>
          </div>
          {solution && !solution.feasible && (
  <div className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700 ring-1 ring-red-200">
    No existe una combinación que cumpla todas las restricciones con los límites actuales.
    Prueba bajar mínimos, subir máximos o aumentar “máx porciones”.
  </div>
)}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-bold">Totales nutricionales (A·x)</div>

            <div className="mt-3 grid gap-2">
  {universe.map((n) => {
    const total = solution.totals?.[n] ?? 0;
    const rule = getRule(constraints, n);

    let ok = true;
    let percent = 0;
    let label = "";

    if (rule?.min != null && rule?.max == null) {
      percent = clamp((total / Math.max(rule.min, 1e-9)) * 100);
      ok = total + 1e-9 >= rule.min;
      label = `≥ ${rule.min}`;
    } else if (rule?.max != null && rule?.min == null) {
      percent = clamp((total / Math.max(rule.max, 1e-9)) * 100);
      ok = total - 1e-9 <= rule.max;
      label = `≤ ${rule.max}`;
    } else if (rule?.min != null && rule?.max != null) {
      // si hay rango [min,max], medimos dónde cae dentro
      const span = Math.max(rule.max - rule.min, 1e-9);
      percent = clamp(((total - rule.min) / span) * 100);
      ok = total + 1e-9 >= rule.min && total - 1e-9 <= rule.max;
      label = `${rule.min} — ${rule.max}`;
    }

    return (
      <div key={n} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">{n}</div>
          <div className="text-sm font-bold">{fmt(total, 3)}</div>
        </div>

        {rule && (
          <>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Meta: {label}</span>
              <span className={ok ? "text-emerald-700" : "text-red-700"}>
                {ok ? "Cumple" : "No cumple"}
              </span>
            </div>

            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full ${ok ? "bg-emerald-500" : "bg-red-500"}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </>
        )}
      </div>
    );
  })}
</div>


            <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="text-sm font-semibold text-slate-800">Restricciones activas</div>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {constraints.map((c, i) => (
                  <li key={i}>
                    <b>{c.nutrient}</b>{" "}
                    {c.min != null && <>≥ {fmt(c.min, 2)} </>}
                    {c.max != null && <>≤ {fmt(c.max, 2)}</>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
