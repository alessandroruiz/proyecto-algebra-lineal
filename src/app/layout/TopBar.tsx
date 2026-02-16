import { Info } from "lucide-react";

export default function TopBar({ onShowMath }: { onShowMath: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white font-extrabold">
            A
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Optimización de Dieta Económica</div>
            <div className="text-xs text-slate-500">Modelo A·x</div>
          </div>
        </div>

        <button
          onClick={onShowMath}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
        >
          <Info className="h-4 w-4" />
          Ver explicación matemática
        </button>
      </div>
    </header>
  );
}
