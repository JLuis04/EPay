import { ConsultationFlowCard } from "../charts/ConsultationFlowCard";
import { ModuleBarChart } from "../charts/ModuleBarChart";
import { RevenueChart } from "../charts/RevenueChart";
import { AlertList } from "../common/AlertList";
import { KpiCard } from "../common/KpiCard";
import { TransactionDetail } from "../common/TransactionDetail";
import { TransactionTable } from "../common/TransactionTable";
import { alerts, insurerSeries, kpis, statusSeries, transactions, type Transaction } from "../../data/mockData";

type Props = {
  selected: Transaction | null;
  onSelectTransaction: (t: Transaction) => void;
};

export function EstadisticasPage({ selected, onSelectTransaction }: Props) {
  return (
    <>
      <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-emerald-950">Hola! Bienvenido a EthosPay</h1>
            <p className="mt-1 text-sm text-emerald-700">Aquí podrás ver un resumen de tu actividad.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
              Último mes
            </button>
            <button className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50">
              Últimos 3 meses
            </button>
            <button className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50">
              Últimos 6 meses
            </button>
            <button className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50">
              Seleccionar período
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item, idx) => (
          <KpiCard
            key={item.title}
            title={item.title}
            value={item.value}
            delta={item.delta}
            tone={item.tone}
            featured={idx === 0}
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <RevenueChart data={statusSeries} />
        <ModuleBarChart data={insurerSeries} />
        <ConsultationFlowCard />
      </section>

      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <TransactionTable data={transactions} onSelect={onSelectTransaction} />
        <div className="space-y-4">
          <TransactionDetail transaction={selected} />
          <AlertList items={alerts} />
        </div>
      </section>
    </>
  );
}
