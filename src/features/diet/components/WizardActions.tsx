import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/shared/utils/cn";

type Step = 1 | 2 | 3;

export default function WizardActions({
  step,
  canProceed,
  busy,
  primaryLabel,
  onBack,
  onNext,
  onOptimize,
  hint,
  error,
}: {
  step: Step;
  canProceed: boolean;
  busy: boolean;
  primaryLabel?: string;
  onBack: () => void;
  onNext: () => void;
  onOptimize: () => void;
  hint?: string;
  error?: string;
}) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-slate-600">
        {error ? (
          <span className="text-amber-700">{error}</span>
        ) : (
          <span className="text-emerald-700">{hint ?? "Listo para continuar."}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          className={cn(
            "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ring-1",
            step === 1
              ? "cursor-not-allowed bg-slate-100 text-slate-400 ring-slate-200"
              : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
          )}
          disabled={step === 1}
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Atrás
        </button>

        {step < 3 ? (
          <button
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold",
              "bg-slate-900 text-white hover:bg-slate-800",
              !canProceed && "opacity-60"
            )}
            disabled={!canProceed}
            onClick={onNext}
          >
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold",
              "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:opacity-95",
              (busy || !canProceed) && "opacity-70"
            )}
            disabled={busy || !canProceed}
            onClick={onOptimize}
          >
            {busy ? "Optimizando..." : primaryLabel ?? "Optimizar (Costo mínimo)"}
            <Sparkles className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
