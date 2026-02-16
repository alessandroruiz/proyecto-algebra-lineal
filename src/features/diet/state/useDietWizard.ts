import { useMemo, useState } from "react";
import type { Constraint, Food, SolveResult } from "../domain/types";
import { DEFAULT_CONSTRAINTS, DEFAULT_FOODS } from "../domain/presets";
import { nutrientUniverse } from "../utils/math";
import { validateModel } from "../utils/validate";
import { solveDiet } from "../services/dietSolver";
import { uid } from "@/shared/utils/uid";

type Step = 1 | 2 | 3;

export function useDietWizard() {
  // State base
  const [foods, setFoods] = useState<Food[]>(DEFAULT_FOODS);
  const [constraints, setConstraints] = useState<Constraint[]>(DEFAULT_CONSTRAINTS);

  // Wizard state
  const [step, setStep] = useState<Step>(1);
  const [busy, setBusy] = useState(false);
  const [solution, setSolution] = useState<SolveResult | null>(null);

  // UX helpers
  const [showMath, setShowMath] = useState(false);

  const universe = useMemo(() => nutrientUniverse(foods, constraints), [foods, constraints]);
  const validation = useMemo(() => validateModel(foods, constraints), [foods, constraints]);

  const enabledFoods = useMemo(() => foods.filter((f) => f.enabled), [foods]);

  // -------- Food actions --------
  function updateFood(id: string, patch: Partial<Food>) {
    setFoods((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }

  function updateFoodNutrient(id: string, nutrient: string, value: number) {
    setFoods((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, nutrients: { ...f.nutrients, [nutrient]: value } }
          : f
      )
    );
  }

  function addFood() {
    setFoods((prev) => [
      ...prev,
      {
        id: uid(),
        name: "Nuevo alimento",
        cost: 0,
        nutrients: Object.fromEntries(universe.map((n) => [n, 0])),
        maxServings: 3,
        enabled: true,
      },
    ]);
  }

  function removeFood(id: string) {
    setFoods((prev) => prev.filter((f) => f.id !== id));
  }

  // -------- Constraint actions --------
  function addConstraint() {
    const first = universe[0] ?? "protein";
    setConstraints((prev) => [...prev, { nutrient: first, min: 0 }]);
  }

  function updateConstraint(index: number, patch: Partial<Constraint>) {
    setConstraints((prev) => prev.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }

  function removeConstraint(index: number) {
    setConstraints((prev) => prev.filter((_, i) => i !== index));
  }

  // -------- Wizard flow --------
  function goNext() {
    setStep((s) => (s === 1 ? 2 : 3));
  }

  function goBack() {
    setStep((s) => (s === 3 ? 2 : 1));
  }

  async function optimize() {
    setBusy(true);
    try {
      if (!validation.ok) {
        setSolution({
          servingsById: {},
          totals: {},
          totalCost: 0,
          feasible: false,
          message: validation.errors[0] ?? "Revisa los datos.",
        });
        return;
      }

      const res = solveDiet(foods, constraints);
      setSolution(res);
      setStep(3);
    } finally {
      setBusy(false);
    }
  }

  // API del hook
  return {
    // state
    foods,
    constraints,
    enabledFoods,
    universe,
    step,
    busy,
    solution,
    showMath,
    validation,

    // actions
    actions: {
      setStep,
      setShowMath,

      // food
      updateFood,
      updateFoodNutrient,
      addFood,
      removeFood,

      // constraints
      addConstraint,
      updateConstraint,
      removeConstraint,

      // wizard
      goNext,
      goBack,
      optimize,
    },
  };
}
