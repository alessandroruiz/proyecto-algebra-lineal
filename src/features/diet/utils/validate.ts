import type { Constraint, Food, Validation } from "../domain/types";

export function validateModel(foods: Food[], constraints: Constraint[]): Validation {
  const enabledFoods = foods.filter((f) => f.enabled);
  const errors: string[] = [];

  if (enabledFoods.length === 0) errors.push("Selecciona al menos 1 alimento.");

  for (const f of enabledFoods) {
    if (!f.name.trim()) errors.push("Hay un alimento sin nombre.");
    if (!Number.isFinite(f.cost) || f.cost < 0) errors.push(`Costo inválido en "${f.name}".`);
    if (!Number.isFinite(f.maxServings) || f.maxServings <= 0)
      errors.push(`Máx porciones inválido en "${f.name}".`);
  }

  for (const c of constraints) {
    if (!c.nutrient.trim()) errors.push("Hay una restricción sin nutriente.");
    if (c.min != null && (!Number.isFinite(c.min) || c.min < 0))
      errors.push(`Mínimo inválido en ${c.nutrient}.`);
    if (c.max != null && (!Number.isFinite(c.max) || c.max < 0))
      errors.push(`Máximo inválido en ${c.nutrient}.`);
    if (c.min != null && c.max != null && c.min > c.max)
      errors.push(`Min > Max en ${c.nutrient}.`);
  }

  return { ok: errors.length === 0, errors };
}
