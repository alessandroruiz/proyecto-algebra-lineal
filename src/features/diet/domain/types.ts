export type Nutrients = Record<string, number>;

export type Food = {
  id: string;
  name: string;
  cost: number;            // Bs por porción
  nutrients: Nutrients;    // nutrientes por porción (p. ej. protein, kcal, fiber)
  maxServings: number;     // cota superior (UX: slider)
  enabled: boolean;        // si participa en el modelo
};

export type Constraint = {
  nutrient: string;  // nombre del nutriente (debe existir en el universo)
  min?: number;      // mínimo requerido
  max?: number;      // máximo permitido
};

export type SolveResult = {
  servingsById: Record<string, number>; // x
  totals: Nutrients;                    // A·x
  totalCost: number;                    // cᵀx
  feasible: boolean;
  message: string;
  debug?: unknown;
};

export type Validation = {
  ok: boolean;
  errors: string[];
};
