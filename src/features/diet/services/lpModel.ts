import type { Food, Constraint } from "../domain/types";

/* ------------------------
   Tipos internos del modelo LP
------------------------- */

type LPConstraint = {
  min?: number;
  max?: number;
};

type LPVariable = {
  cost: number;
  [nutrient: string]: number;
};

type LPModel = {
  optimize: "cost";
  opType: "min";
  constraints: Record<string, LPConstraint>;
  variables: Record<string, LPVariable>;
};

/* ------------------------
   Construcción del modelo
------------------------- */

export function buildLPModel(
  foods: Food[],
  constraints: Constraint[]
): LPModel {
  const constraintsObj: Record<string, LPConstraint> = {};
  const variables: Record<string, LPVariable> = {};

  // Restricciones (min/max por nutriente)
  constraints.forEach((c) => {
    constraintsObj[c.nutrient] = {
      min: c.min,
      max: c.max,
    };
  });

  // Variables (alimentos activos)
  foods
    .filter((f) => f.enabled)
    .forEach((f) => {
      variables[f.id] = {
        cost: f.cost,
        ...f.nutrients,
      };
    });

  return {
    optimize: "cost",
    opType: "min",
    constraints: constraintsObj,
    variables,
  };
}
