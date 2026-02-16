export default function Hero() {
  return (
    <section className="mt-7 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h1 className="text-xl font-bold sm:text-2xl">
        Encuentra la dieta más barata que cumpla tus necesidades
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        Selecciona alimentos, define mínimos/máximos y obtén porciones óptimas automáticamente.
      </p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <span className="text-xs font-semibold text-slate-700">Lista para exposición</span>
      </div>
    </section>
  );
}
