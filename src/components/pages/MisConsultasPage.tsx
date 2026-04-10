import { useEffect, useRef, useState } from "react";
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  HelpCircle,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Upload,
  X,
} from "lucide-react";
import { RegisterPaymentModal } from "../common/RegisterPaymentModal";
import {
  consultasRows,
  consultasSummary,
  consultasTableColumnOptions,
  type ConsultaRow,
  type ConsultasColumnId,
} from "../../data/consultasMock";

type RangoTiempo = "hoy" | "ayer" | "todos";

function buildColumnVisibility(): Record<ConsultasColumnId, boolean> {
  const v = {} as Record<ConsultasColumnId, boolean>;
  for (const c of consultasTableColumnOptions) {
    v[c.id] = c.defaultVisible;
  }
  return v;
}

function metodoBadge(metodo: ConsultaRow["metodo"]) {
  const map = {
    Efectivo: "bg-emerald-100 text-emerald-800",
    Tarjeta: "bg-orange-100 text-orange-800",
    SPEI: "bg-violet-100 text-violet-800",
  } as const;
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[metodo]}`}
    >
      {metodo}
    </span>
  );
}

function renderCell(row: ConsultaRow, col: ConsultasColumnId) {
  switch (col) {
    case "paciente":
      return <span className="font-medium text-slate-900">{row.paciente}</span>;
    case "fecha":
      return <span className="text-slate-700">{row.fecha}</span>;
    case "metodo":
      return metodoBadge(row.metodo);
    case "monto":
      return <span className="font-semibold text-slate-800">{row.monto}</span>;
    case "acciones":
      return (
        <button
          type="button"
          className="grid h-8 w-8 place-content-center rounded-lg text-slate-500 hover:bg-slate-100"
          aria-label="Más opciones"
        >
          <MoreVertical size={18} />
        </button>
      );
    default:
      return null;
  }
}

export function MisConsultasPage() {
  const [rango, setRango] = useState<RangoTiempo>("hoy");
  const [columnVisible, setColumnVisible] = useState(buildColumnVisibility);
  const [columnPickerOpen, setColumnPickerOpen] = useState(false);
  const [registerPaymentOpen, setRegisterPaymentOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!columnPickerOpen) return;
    const onDown = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setColumnPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [columnPickerOpen]);

  const visibleColumns = consultasTableColumnOptions.filter(
    (c) => columnVisible[c.id],
  );

  const toggleColumn = (id: ConsultasColumnId) => {
    setColumnVisible((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (!consultasTableColumnOptions.some((c) => next[c.id])) return prev;
      return next;
    });
  };

  const fechaTitulo = "10 de abril, 2026";

  return (
    <div className="space-y-6">
      <RegisterPaymentModal
        open={registerPaymentOpen}
        onClose={() => setRegisterPaymentOpen(false)}
      />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Registro de Consultas
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Gestiona los pagos y consultas de tus pacientes
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-lg border border-emerald-200 bg-white p-1 shadow-sm">
              {(
                [
                  { id: "hoy" as const, label: "Hoy" },
                  { id: "ayer" as const, label: "Ayer" },
                  { id: "todos" as const, label: "Todos" },
                ] as const
              ).map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRango(id)}
                  className={[
                    "rounded-md px-3 py-1.5 text-sm font-medium transition",
                    rango === id
                      ? "bg-[#07c78f] text-white shadow-sm"
                      : "text-emerald-800 hover:bg-emerald-50",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className="text-sm font-medium text-slate-600">
              {fechaTitulo}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-emerald-800 shadow-sm hover:bg-emerald-50"
          >
            <HelpCircle size={18} className="text-emerald-600" />
            Como funciona?
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-emerald-800 shadow-sm hover:bg-emerald-50"
          >
            <Upload size={18} className="text-emerald-600" />
            Exportar Excel
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-emerald-800 shadow-sm hover:bg-emerald-50"
          >
            <Banknote size={18} className="text-emerald-600" />
            Generar Corte
          </button>
          <button
            type="button"
            onClick={() => setRegisterPaymentOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#07c78f] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#06b381]"
          >
            <Plus size={18} />
            Registrar Pago
          </button>
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {consultasSummary.map((card) => (
          <article
            key={card.key}
            className={`rounded-xl p-4 shadow-soft ${card.bg}`}
          >
            <p className={`text-sm font-medium ${card.accent}`}>{card.title}</p>
            <p className={`mt-2 text-2xl font-semibold ${card.accent}`}>
              {card.count}
            </p>
            <p className={`mt-1 text-sm font-semibold ${card.accent}`}>
              {card.amount}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-soft sm:p-5">
        <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative min-w-0 flex-1">
            <input
              type="search"
              placeholder="Texto a buscar"
              className="w-full rounded-lg border border-emerald-100 bg-slate-50 py-2.5 pl-3 pr-10 text-sm text-slate-900 outline-none ring-[#07c78f] transition focus:border-[#07c78f] focus:ring-2"
            />
            <Search
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="relative inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50"
            >
              <SlidersHorizontal size={18} />
              Filtros
              <span className="grid h-5 min-w-[1.25rem] place-content-center rounded-full bg-[#07c78f] px-1 text-[10px] font-bold text-white">
                2
              </span>
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-content-center rounded-lg border border-emerald-100 bg-white text-emerald-800 hover:bg-emerald-50"
              aria-label="Configuracion"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-900">
            10/03/2026 - 10/04/2026
            <button
              type="button"
              className="rounded p-0.5 hover:bg-sky-200"
              aria-label="Quitar filtro"
            >
              <X size={14} />
            </button>
          </span>
        </div>

        <div className="mb-3 flex justify-end">
          <div className="relative" ref={pickerRef}>
            <button
              type="button"
              onClick={() => setColumnPickerOpen((o) => !o)}
              className="rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-[#0e8765] hover:bg-emerald-50"
            >
              Editar tabla
            </button>
            {columnPickerOpen && (
              <div className="absolute right-0 z-40 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                <div className="max-h-60 overflow-y-auto">
                  {consultasTableColumnOptions.map((col) => (
                    <label
                      key={col.id}
                      className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm text-slate-800 hover:bg-slate-100"
                    >
                      <input
                        type="checkbox"
                        checked={columnVisible[col.id]}
                        onChange={() => toggleColumn(col.id)}
                        className="h-4 w-4 rounded border-2 border-[#07c78f] accent-[#07c78f]"
                      />
                      <span className="select-none">{col.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                {visibleColumns.map((col, i) => (
                  <th key={col.id} className="pb-3 pl-2 pr-2 font-medium">
                    <span className="inline-flex items-center gap-2">
                      {i > 0 && (
                        <MoreHorizontal
                          size={14}
                          className="text-slate-300"
                          aria-hidden
                        />
                      )}
                      {col.label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {consultasRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  {visibleColumns.map((col) => (
                    <td key={col.id} className="py-3 pl-2 pr-2 align-middle">
                      {renderCell(row, col.id)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">Página 1 de 1</p>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              className="grid h-9 w-9 place-content-center rounded-lg border border-emerald-100 text-slate-500 hover:bg-emerald-50 disabled:opacity-40"
              disabled
              aria-label="Primera pagina"
            >
              <ChevronsLeft size={18} />
            </button>
            <button
              type="button"
              className="grid h-9 w-9 place-content-center rounded-lg border border-emerald-100 text-slate-500 hover:bg-emerald-50 disabled:opacity-40"
              disabled
              aria-label="Pagina anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="grid h-9 w-9 place-content-center rounded-lg border border-emerald-100 text-slate-500 hover:bg-emerald-50 disabled:opacity-40"
              disabled
              aria-label="Pagina siguiente"
            >
              <ChevronRight size={18} />
            </button>
            <button
              type="button"
              className="grid h-9 w-9 place-content-center rounded-lg border border-emerald-100 text-slate-500 hover:bg-emerald-50 disabled:opacity-40"
              disabled
              aria-label="Última página"
            >
              <ChevronsRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
