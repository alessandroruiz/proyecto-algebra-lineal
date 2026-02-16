import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import type { Food } from "../domain/types";

export default function StepFoods({
  foods,
  universe,
  actions,
}: {
  foods: Food[];
  universe: string[];
  actions: {
    updateFood: (id: string, patch: Partial<Food>) => void;
    updateFoodNutrient: (id: string, nutrient: string, value: number) => void;
    addFood: () => void;
    removeFood: (id: string) => void;
  };
}) {
  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Paso 1 — Seleccionar alimentos</h2>
          <p className="text-sm text-slate-600">
            Activa/desactiva alimentos y define el <b>máximo de porciones</b> (slider).
          </p>
        </div>

        <button
          onClick={actions.addFood}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Agregar alimento
        </button>
      </div>
     <div className="mt-3 flex flex-wrap gap-2">
  <button
    type="button"
    onClick={() => foods.forEach((f) => actions.updateFood(f.id, { maxServings: 2 }))}
    className="rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-100"
  >
    Preset: Bajo costo
  </button>

  <button
    type="button"
    onClick={() => foods.forEach((f) => actions.updateFood(f.id, { maxServings: 6 }))}
    className="rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100"
  >
    Preset: Deportista
  </button>

  <button
    type="button"
    onClick={() => foods.forEach((f) => actions.updateFood(f.id, { enabled: true }))}
    className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200"
  >
    Activar todos
  </button>
</div>



      <div className="mt-4 grid gap-3">
        {foods.map((f) => (
          <div
            key={f.id}
            className={`rounded-2xl border bg-white p-4 shadow-sm ${
              f.enabled ? "border-slate-200" : "border-slate-200 opacity-60"
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => actions.updateFood(f.id, { enabled: !f.enabled })}
                  className={`mt-0.5 grid h-9 w-9 place-items-center rounded-xl ring-1 ${
                    f.enabled
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-200 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-600 ring-slate-200 hover:bg-slate-200"
                  }`}
                  title={f.enabled ? "Activo" : "Inactivo"}
                >
                  {f.enabled ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-xs font-bold">OFF</span>}
                </button>

                <div className="min-w-0">
                  <input
                    value={f.name}
                    onChange={(e) => actions.updateFood(f.id, { name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-slate-900/15"
                  />

                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    <label className="rounded-xl bg-slate-50 p-2 ring-1 ring-slate-200">
                      <div className="text-xs font-semibold text-slate-600">Costo (Bs/porción)</div>
                      <input
                        type="number"
                        value={f.cost}
                        onChange={(e) => actions.updateFood(f.id, { cost: Number(e.target.value) })}
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-slate-900/15"
                      />
                    </label>

                    <label className="col-span-2 rounded-xl bg-slate-50 p-2 ring-1 ring-slate-200 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold text-slate-600">Máx porciones</div>
                        <div className="text-xs font-bold text-slate-700">{f.maxServings}</div>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={12}
                        value={f.maxServings}
                        onChange={(e) => actions.updateFood(f.id, { maxServings: Number(e.target.value) })}
                        className="mt-2 w-full"
                      />
                      <div className="mt-1 text-xs text-slate-500">
                        El optimizador elegirá entre <b>0</b> y <b>{f.maxServings}</b> porciones.
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={() => actions.removeFood(f.id)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                title="Eliminar"
              >
                <Trash2 className="h-4 w-4" />
                Eliminar
              </button>
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold text-slate-600">Nutrientes por porción</div>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {universe.map((n) => (
                  <label key={n} className="rounded-xl bg-slate-50 p-2 ring-1 ring-slate-200">
                    <div className="text-xs font-semibold text-slate-600">{n}</div>
                    <input
                      type="number"
                      value={f.nutrients[n] ?? 0}
                      onChange={(e) => actions.updateFoodNutrient(f.id, n, Number(e.target.value))}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-slate-900/15"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
