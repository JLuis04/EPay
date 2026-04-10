import type { Transaction } from "../../data/mockData";
import { StatusBadge } from "./StatusBadge";

type Props = {
  transaction: Transaction | null;
};

export function TransactionDetail({ transaction }: Props) {
  return (
    <section className="panel dark:border-emerald-900/50 dark:bg-navy-900">
      <h3 className="mb-4 text-lg font-semibold text-emerald-950 dark:text-white">Detalle de transaccion</h3>

      {!transaction ? (
        <div className="rounded-xl border border-dashed border-emerald-200 p-8 text-center text-sm text-emerald-700 dark:border-emerald-900/50 dark:text-emerald-200">
          Selecciona una transacción para ver información completa.
        </div>
      ) : (
        <dl className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <dt className="text-emerald-700 dark:text-emerald-200">ID</dt>
            <dd className="font-medium dark:text-slate-100">{transaction.id}</dd>
          </div>
          <div className="flex items-center justify-between text-sm">
            <dt className="text-emerald-700 dark:text-emerald-200">Cliente</dt>
            <dd className="font-medium dark:text-slate-100">{transaction.cliente}</dd>
          </div>
          <div className="flex items-center justify-between text-sm">
            <dt className="text-emerald-700 dark:text-emerald-200">Modulo</dt>
            <dd className="font-medium dark:text-slate-100">{transaction.modulo}</dd>
          </div>
          <div className="flex items-center justify-between text-sm">
            <dt className="text-emerald-700 dark:text-emerald-200">Monto</dt>
            <dd className="font-semibold text-brand-700 dark:text-brand-100">${transaction.monto.toLocaleString()}</dd>
          </div>
          <div className="flex items-center justify-between text-sm">
            <dt className="text-emerald-700 dark:text-emerald-200">Método</dt>
            <dd className="font-medium dark:text-slate-100">{transaction.metodo}</dd>
          </div>
          <div className="flex items-center justify-between text-sm">
            <dt className="text-emerald-700 dark:text-emerald-200">Referencia</dt>
            <dd className="font-medium dark:text-slate-100">{transaction.referencia}</dd>
          </div>
          <div className="flex items-center justify-between text-sm">
            <dt className="text-emerald-700 dark:text-emerald-200">Estado</dt>
            <dd>
              <StatusBadge status={transaction.estado} />
            </dd>
          </div>
        </dl>
      )}
    </section>
  );
}
