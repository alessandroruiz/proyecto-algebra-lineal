import { CheckCircle2, AlertTriangle } from "lucide-react";
import type { Food, Constraint, SolveResult } from "../domain/types";

export default function MiniPreview({
  foods,
  constraints,
  solution,
}: {
  foods: Food[];
  constraints: Constraint[];
  solution: SolveResult | null;
}) {
  const enabled = foods.filter((f) => f.enabled).length;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="text-sm font-bold">Resumen rápido</div>

      <div className="mt-3 grid gap-2">
        <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
          <div className="text-xs font-semibold text-slate-600">Alimentos activos</div>
          <div className="mt-1 text-lg font-extrabold text-slate-900">{enabled}</div>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
          <div className="text-xs font-semibold text-slate-600">Restricciones</div>
          <div className="mt-1 text-lg font-extrabold text-slate-900">{constraints.length}</div>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
          <div className="text-xs font-semibold text-slate-600">Estado</div>
          <div className="mt-1 flex items-center gap-2">
            {solution?.feasible ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">Óptimo / Factible</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span className="text-sm font-bold text-amber-700">Pendiente</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-500">
        Tip: cambia 1 restricción y vuelve a optimizar para demostrar el modelo.
      </div>
    </div>
  );
}
