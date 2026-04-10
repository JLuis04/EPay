export function ConsultationFlowCard() {
  return (
    <section className="panel h-[320px] dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-emerald-950 dark:text-white">Flujo de Consultas</h3>
      <p className="mb-4 text-sm text-emerald-700 dark:text-emerald-200">Enero - Abril 2026</p>

      <div className="grid h-[230px] place-content-center rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 text-center dark:border-emerald-900/50 dark:bg-emerald-900/10">
        <p className="text-base font-semibold text-emerald-900 dark:text-emerald-100">Aún no tienes datos para graficar</p>
      </div>
    </section>
  );
}
