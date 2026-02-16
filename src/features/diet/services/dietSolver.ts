import solver from "javascript-lp-solver";
import type { Food, Constraint, SolveResult } from "../domain/types";
import { buildLPModel } from "./lpModel";
import { nutrientUniverse, computeTotals, computeCost, checkConstraints } from "../utils/math";

// Tipado mínimo del resultado del solver (solo lo que necesitamos)
type LPSolveResult = {
  feasible?: boolean;
  result?: number;
  bounded?: boolean;
  // variables (claves dinámicas): food_<id> -> número
  [key: string]: unknown;
};

export function solveDiet(foods: Food[], constraints: Constraint[]): SolveResult {
  const enabledFoods = foods.filter((f) => f.enabled);

  const model = buildLPModel(foods, constraints);

  // El paquete devuelve unknown en TS estricto => lo tipamos a lo mínimo que usamos
  const res = solver.Solve(model) as LPSolveResult;

  const servingsById: Record<string, number> = {};
  for (const f of enabledFoods) {
    const varName = f.id; // si en tu lpModel usas f.id directo, cambia esto abajo
    const rawUnknown = res[varName];

    const raw = typeof rawUnknown === "number" ? rawUnknown : 0;
    servingsById[f.id] = raw > 0 ? raw : 0;
  }

  const universe = nutrientUniverse(foods, constraints);
  const totals = computeTotals(foods, universe, servingsById);
  const totalCost = computeCost(foods, servingsById);
  const check = checkConstraints(totals, constraints);

  const hasAny = Object.values(servingsById).some((v) => v > 1e-9);
  const feasible = (res.feasible ?? true) && hasAny;

  if (!feasible) {
    return {
      servingsById: {},
      totals,
      totalCost: 0,
      feasible: false,
      message: "No hay solución factible. Baja mínimos o sube rangos de porciones.",
      debug: { model, res },
    };
  }

  return {
    servingsById,
    totals,
    totalCost,
    feasible: check.ok,
    message: check.ok
      ? "✅ Solución óptima encontrada."
      : "⚠️ Solución encontrada, pero revisa restricciones (posible tolerancia numérica).",
    debug: { model, res },
  };
}
