import { Plus, Trash2 } from "lucide-react";
import type { Constraint } from "../domain/types";

export default function StepConstraints({
  constraints,
  universe,
  actions,
}: {
  constraints: Constraint[];
  universe: string[];
  actions: {
    addConstraint: () => void;
    updateConstraint: (idx: number, patch: Partial<Constraint>) => void;
    removeConstraint: (idx: number) => void;
  };
}) {
  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Paso 2 — Definir objetivos</h2>
          <p className="text-sm text-slate-600">
            Define mínimos/máximos. Ej: <b>protein ≥ 50</b>, <b>kcal ≤ 2000</b>.
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
  <button
    type="button"
    onClick={() => {
      // ejemplo: sube proteína (si existe)
      const idx = constraints.findIndex((c) => c.nutrient === "protein");
      if (idx >= 0) actions.updateConstraint(idx, { min: 70 });
    }}
    className="rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100"
  >
    Preset: Alta proteína
  </button>

  <button
    type="button"
    onClick={() => {
      const idx = constraints.findIndex((c) => c.nutrient === "kcal");
      if (idx >= 0) actions.updateConstraint(idx, { max: 1600 });
    }}
    className="rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-100"
  >
    Preset: Control kcal
  </button>
</div>


        <button
          onClick={actions.addConstraint}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Agregar restricción
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        {constraints.map((c, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-3">
                <label className="rounded-xl bg-slate-50 p-2 ring-1 ring-slate-200">
                  <div className="text-xs font-semibold text-slate-600">Nutriente</div>
                  <select
                    value={c.nutrient}
                    onChange={(e) => actions.updateConstraint(idx, { nutrient: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/15"
                  >
                    {universe.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="rounded-xl bg-slate-50 p-2 ring-1 ring-slate-200">
                  <div className="text-xs font-semibold text-slate-600">Mínimo</div>
                  <input
                    type="number"
                    value={c.min ?? ""}
                    placeholder="(opcional)"
                    onChange={(e) =>
                      actions.updateConstraint(idx, {
                        min: e.target.value === "" ? undefined : Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/15"
                  />
                </label>

                <label className="rounded-xl bg-slate-50 p-2 ring-1 ring-slate-200">
                  <div className="text-xs font-semibold text-slate-600">Máximo</div>
                  <input
                    type="number"
                    value={c.max ?? ""}
                    placeholder="(opcional)"
                    onChange={(e) =>
                      actions.updateConstraint(idx, {
                        max: e.target.value === "" ? undefined : Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/15"
                  />
                </label>
              </div>

              <button
                onClick={() => actions.removeConstraint(idx)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
              >
                <Trash2 className="h-4 w-4" />
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
