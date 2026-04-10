import { useMemo, useState } from "react";
import type { Transaction, TransactionStatus } from "../../data/mockData";
import { StatusBadge } from "./StatusBadge";

type Props = {
  data: Transaction[];
  onSelect: (item: Transaction) => void;
};

type Filters = {
  status: "Todos" | TransactionStatus;
  min: string;
  max: string;
  date: string;
};

export function TransactionTable({ data, onSelect }: Props) {
  const [filters, setFilters] = useState<Filters>({
    status: "Todos",
    min: "",
    max: "",
    date: ""
  });
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    return data.filter((item) => {
      if (filters.status !== "Todos" && item.estado !== filters.status) return false;
      if (filters.date && item.fecha !== filters.date) return false;
      if (filters.min && item.monto < Number(filters.min)) return false;
      if (filters.max && item.monto > Number(filters.max)) return false;
      return true;
    });
  }, [data, filters]);

  const inputClass =
    "rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm outline-none ring-brand-500 transition focus:border-brand-400 focus:ring-2 dark:border-emerald-900/50 dark:bg-navy-900 dark:text-white";

  return (
    <section className="panel dark:border-emerald-900/50 dark:bg-navy-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-emerald-950 dark:text-white">Registros recientes</h3>
        <div className="flex flex-wrap gap-2">
          <select
            className={inputClass}
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value as Filters["status"] }))}
          >
            <option>Todos</option>
            <option>Recibida</option>
            <option>En Revisión</option>
            <option>Aseguradora</option>
            <option>Pagada</option>
            <option>Rechazada</option>s
          </select>
          <input
            type="date"
            className={inputClass}
            value={filters.date}
            onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))}
          />
          <input
            type="number"
            className={inputClass}
            placeholder="Minimo"
            value={filters.min}
            onChange={(e) => setFilters((prev) => ({ ...prev, min: e.target.value }))}
          />
          <input
            type="number"
            className={inputClass}
            placeholder="Maximo"
            value={filters.max}
            onChange={(e) => setFilters((prev) => ({ ...prev, max: e.target.value }))}
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="h-10 animate-pulse rounded-lg bg-emerald-100 dark:bg-emerald-900/40" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-emerald-100 text-emerald-700 dark:border-emerald-900/50 dark:text-emerald-200">
                <th className="py-3 font-medium">ID</th>
                <th className="py-3 font-medium">Cliente</th>
                <th className="py-3 font-medium">Fecha</th>
                <th className="py-3 font-medium">Monto</th>
                <th className="py-3 font-medium">Estado</th>
                <th className="py-3 font-medium">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-emerald-50 dark:border-emerald-900/30">
                  <td className="py-3 font-medium dark:text-white">{item.id}</td>
                  <td className="py-3 text-emerald-900 dark:text-emerald-100">{item.cliente}</td>
                  <td className="py-3 text-emerald-900 dark:text-emerald-100">{item.fecha}</td>
                  <td className="py-3 text-emerald-900 dark:text-emerald-100">${item.monto.toLocaleString()}</td>
                  <td className="py-3">
                    <StatusBadge status={item.estado} />
                  </td>
                  <td className="py-3">
                    <button
                      className="rounded-lg bg-[#eafbf4] px-3 py-1 text-xs font-semibold text-[#0e8765] transition hover:bg-[#cdf7e8]"
                      onClick={() => onSelect(item)}
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="py-6 text-center text-sm text-emerald-700 dark:text-emerald-200">Sin resultados con esos filtros.</p>
          )}
        </div>
      )}
    </section>
  );
}
