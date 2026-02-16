import TopBar from "@/app/layout/TopBar";
import Hero from "@/app/layout/Hero";
import Stepper from "@/features/diet/components/Stepper";
import WizardActions from "@/features/diet/components/WizardActions";
import StepFoods from "@/features/diet/components/StepFoods";
import StepConstraints from "@/features/diet/components/StepConstraints";
import StepResults from "@/features/diet/components/StepResults";
import MiniPreview from "@/features/diet/components/MiniPreview";
import TipsCard from "@/features/diet/components/TipsCard";
import MathModal from "@/features/diet/components/MathModal";
import { useDietWizard } from "@/features/diet/state/useDietWizard";

export default function WizardPage() {
  const w = useDietWizard();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <TopBar onShowMath={() => w.actions.setShowMath(true)} />

      <main className="mx-auto max-w-6xl px-4 pb-14">
        <Hero />

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <Stepper step={w.step} setStep={w.actions.setStep} />

            <div className="p-5 sm:p-6 transition-all duration-300 ease-in-out">
              {w.step === 1 && (
                <StepFoods foods={w.foods} universe={w.universe} actions={w.actions} />
              )}

              {w.step === 2 && (
                <StepConstraints constraints={w.constraints} universe={w.universe} actions={w.actions} />
              )}

              {w.step === 3 && (
                <StepResults
                  foods={w.foods}
                  universe={w.universe}
                  constraints={w.constraints}
                  solution={w.solution}
                />
              )}

              <WizardActions
                step={w.step}
                canProceed={
  w.validation.ok &&
  (w.step !== 1 || w.enabledFoods.length > 0)
}


                busy={w.busy}
                onBack={w.actions.goBack}
                onNext={w.actions.goNext}
                onOptimize={w.actions.optimize}
                hint={
  w.step === 1 && w.enabledFoods.length === 0
    ? "Activa al menos 1 alimento para continuar."
    : "Datos listos para continuar."
}


                error={!w.validation.ok ? w.validation.errors[0] : undefined}
              />
            </div>
          </div>

          <aside className="space-y-4">
            <MiniPreview foods={w.foods} constraints={w.constraints} solution={w.solution} />
            <TipsCard />
          </aside>
        </div>
      </main>

      {w.showMath && (
  <MathModal
    onClose={() => w.actions.setShowMath(false)}
    foods={w.foods}
    constraints={w.constraints}
    universe={w.universe}
    solution={w.solution}
  />
)}

    </div>
  );
}
