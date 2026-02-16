import { uid } from "@/shared/utils/uid";
import type { Food, Constraint } from "./types";

export const DEFAULT_NUTRIENTS = ["protein", "fiber", "kcal"] as const;

/**
 * Dataset inicial (demo) basado en el ejemplo del informe:
 * 5 alimentos y 3 nutrientes. Puedes editarlo desde la UI luego.
 */
export const DEFAULT_FOODS: Food[] = [
  {
    id: uid(),
    name: "Arroz cocido",
    cost: 30,
    nutrients: { protein: 2.7, kcal: 130, fiber: 0.4 },
    maxServings: 5,
    enabled: true,
  },
  {
    id: uid(),
    name: "Pollo cocido",
    cost: 180,
    nutrients: { protein: 31, kcal: 165, fiber: 0 },
    maxServings: 3,
    enabled: true,
  },
  {
    id: uid(),
    name: "Lentejas cocidas",
    cost: 45,
    nutrients: { protein: 9, kcal: 116, fiber: 7.9 },
    maxServings: 5,
    enabled: true,
  },
  {
    id: uid(),
    name: "Leche descremada",
    cost: 25,
    nutrients: { protein: 3.4, kcal: 35, fiber: 0 },
    maxServings: 6,
    enabled: true,
  },
  {
    id: uid(),
    name: "Avena",
    cost: 60,
    nutrients: { protein: 13.5, kcal: 389, fiber: 10.6 },
    maxServings: 3,
    enabled: true,
  },
];

export const DEFAULT_CONSTRAINTS: Constraint[] = [
  { nutrient: "protein", min: 50 },
  { nutrient: "fiber", min: 25 },
  { nutrient: "kcal", min: 700, max: 2000 },
];
