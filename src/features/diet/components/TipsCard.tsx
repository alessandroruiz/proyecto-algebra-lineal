import { Sparkles } from "lucide-react";

export default function TipsCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 p-5 text-white shadow-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5" />
        <div className="text-sm font-bold">Demo dieta-app</div>
      </div>

      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-white/90">
        <li>Sube proteína mínima (ej. 50 → 70).</li>
        <li>Optimiza y muestra cómo cambian porciones y costo.</li>
        <li>Abre “Ver explicación matemática” para mostrar A, x y A·x.</li>
      </ol>
    </div>
  );
}
