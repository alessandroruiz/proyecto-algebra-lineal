import type { Food, Constraint, SolveResult } from "../domain/types";
import { fmt } from "@/shared/utils/format";

function safeNum(x: unknown) {
  return typeof x === "number" && Number.isFinite(x) ? x : 0;
}

export default function MathModal({
  onClose,
  foods,
  constraints,
  universe,
  solution,
}: {
  onClose: () => void;
  foods: Food[];
  constraints: Constraint[];
  universe: string[];
  solution: SolveResult | null;
}) {
  const enabledFoods = foods.filter((f) => f.enabled);

  // Matriz A: filas = nutrientes, columnas = alimentos
  const A = universe.map((n) => enabledFoods.map((f) => safeNum(f.nutrients[n])));

  // Vector x (porciones)
  const x = enabledFoods.map((f) => safeNum(solution?.servingsById?.[f.id] ?? 0));

  // A·x (totales)
  const ax = universe.map((_, i) =>
    A[i].reduce((sum, aij, j) => sum + aij * x[j], 0)
  );

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <div className="text-sm font-bold">Explicación matemática</div>
            <div className="text-xs text-slate-500">
              Modelo: minimizar costo sujeto a restricciones sobre A·x
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Cerrar
          </button>
        </div>

        <div className="grid gap-4 p-5 lg:grid-cols-2">
          {/* Panel explicación */}
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <div className="text-sm font-bold">1) Definición del modelo</div>

            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                <div className="text-xs font-semibold text-slate-500">Variables</div>
                <div className="mt-1">
                  <b>x</b> = vector de porciones (una variable por alimento)
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                <div className="text-xs font-semibold text-slate-500">Matriz</div>
                <div className="mt-1">
                  <b>A</b> = aportes nutricionales (nutrientes × alimentos)
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                <div className="text-xs font-semibold text-slate-500">Totales</div>
                <div className="mt-1">
                  <b>A·x</b> = totales por nutriente (lo que realmente consumimos)
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                <div className="text-xs font-semibold text-slate-500">Objetivo</div>
                <div className="mt-1">
                  Minimizar <b>cᵀx</b> (costo total)
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                <div className="text-xs font-semibold text-slate-500">Restricciones</div>
                <ul className="mt-2 space-y-1">
                  {constraints.map((c, i) => (
                    <li key={i}>
                      <b>{c.nutrient}</b>{" "}
                      {c.min != null && <>≥ {fmt(c.min, 2)} </>}
                      {c.max != null && <>≤ {fmt(c.max, 2)}</>}
                    </li>
                  ))}
                </ul>
              </div>

              {!solution && (
                <div className="rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-800 ring-1 ring-amber-200">
                  Aún no optimizaste. Ve a “Resultados” y presiona <b>Optimizar</b> para ver x y A·x reales.
                </div>
              )}
            </div>
          </div>

          {/* Tablas */}
          <div className="space-y-4">
            {/* Vector x */}
            <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <div className="text-sm font-bold">2) Vector x (porciones)</div>
              <div className="mt-3 grid gap-2">
                {enabledFoods.map((f, i) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200"
                  >
                    <div className="text-sm font-semibold">{f.name}</div>
                    <div className="text-sm font-bold">{fmt(x[i], 3)}</div>
                  </div>
                ))}
              </div>
              {enabledFoods.length === 0 && (
                <div className="mt-3 text-sm text-slate-600">
                  No hay alimentos activos.
                </div>
              )}
            </div>

            {/* Ax */}
            <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <div className="text-sm font-bold">3) Resultado A·x (totales)</div>
              <div className="mt-3 grid gap-2">
                {universe.map((n, i) => (
                  <div
                    key={n}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200"
                  >
                    <div className="text-sm font-semibold">{n}</div>
                    <div className="text-sm font-bold">{fmt(ax[i], 3)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Matriz A en tabla grande */}
        <div className="border-t border-slate-200 p-5">
          <div className="text-sm font-bold">4) Matriz A (nutrientes × alimentos)</div>
          <div className="mt-3 overflow-auto rounded-2xl ring-1 ring-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="sticky left-0 bg-slate-50 p-2 text-left">Nutriente</th>
                  {enabledFoods.map((f) => (
                    <th key={f.id} className="p-2 text-left">
                      {f.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {universe.map((n, i) => (
                  <tr key={n} className="border-t border-slate-200">
                    <td className="sticky left-0 bg-white p-2 font-semibold">{n}</td>
                    {enabledFoods.map((f, j) => (
                      <td key={f.id} className="p-2">
                        {fmt(A[i][j], 3)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            Interpretación: cada celda A[i,j] es el aporte del nutriente i por 1 porción del alimento j.
          </div>
        </div>
      </div>
    </div>
  );
}
