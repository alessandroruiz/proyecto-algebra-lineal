import { cn } from "@/shared/utils/cn";

type Step = 1 | 2 | 3;

export default function Stepper({
  step,
  setStep,
}: {
  step: Step;
  setStep: (s: Step) => void;
}) {
  const items = [
    { n: 1 as const, label: "Alimentos", sub: "Qué usarás" },
    { n: 2 as const, label: "Objetivos", sub: "Mínimos/Máximos" },
    { n: 3 as const, label: "Resultados", sub: "x, A·x y costo" },
  ];

  return (
    <div className="border-b border-slate-200 p-4 sm:p-5">
      <div className="flex items-center gap-2">
        {items.map((it, idx) => {
          const active = step === it.n;
          const done = step > it.n;

          return (
            <div key={it.n} className="flex flex-1 items-center gap-2">
              <button
                onClick={() => setStep(it.n)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left ring-1 transition",
                  active
                    ? "bg-slate-900 text-white ring-slate-900"
                    : done
                    ? "bg-emerald-50 text-emerald-900 ring-emerald-200 hover:bg-emerald-100"
                    : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                )}
              >
                <div
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-lg text-sm font-bold",
                    active
                      ? "bg-white/15 text-white"
                      : done
                      ? "bg-emerald-200 text-emerald-900"
                      : "bg-slate-100 text-slate-700"
                  )}
                >
                  {done ? "✓" : it.n}
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-semibold">{it.label}</div>
                  <div className={cn("text-xs", active ? "text-white/80" : "text-slate-500")}>
                    {it.sub}
                  </div>
                </div>
              </button>

              {idx < items.length - 1 && (
                <div className="hidden w-6 sm:block">
                  <div className="h-0.5 w-full bg-slate-200" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
