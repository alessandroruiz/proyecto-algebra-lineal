import type { Food, Nutrients, Constraint } from "../domain/types";

export function nutrientUniverse(foods: Food[], constraints: Constraint[]) {
  const s = new Set<string>();
  foods.forEach((f) => Object.keys(f.nutrients).forEach((n) => s.add(n)));
  constraints.forEach((c) => s.add(c.nutrient));
  return Array.from(s).sort();
}

export function computeTotals(
  foods: Food[],
  universe: string[],
  servingsById: Record<string, number>
): Nutrients {
  const totals: Nutrients = Object.fromEntries(universe.map((n) => [n, 0]));

  for (const f of foods) {
    if (!f.enabled) continue;
    const x = servingsById[f.id] ?? 0;
    for (const n of universe) {
      totals[n] += (f.nutrients[n] ?? 0) * x;
    }
  }
  return totals;
}

export function computeCost(foods: Food[], servingsById: Record<string, number>) {
  let sum = 0;
  for (const f of foods) {
    if (!f.enabled) continue;
    sum += (servingsById[f.id] ?? 0) * f.cost;
  }
  return sum;
}

export function checkConstraints(totals: Nutrients, constraints: Constraint[]) {
  const violations: string[] = [];
  for (const c of constraints) {
    const v = totals[c.nutrient] ?? 0;
    if (c.min != null && v + 1e-9 < c.min) violations.push(`${c.nutrient}: por debajo del mínimo`);
    if (c.max != null && v - 1e-9 > c.max) violations.push(`${c.nutrient}: por encima del máximo`);
  }
  return { ok: violations.length === 0, violations };
}
