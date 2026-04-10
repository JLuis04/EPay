import { useEffect, useRef, useState } from "react";
import {
  ArrowDownUp,
  Download,
  HelpCircle,
  MoreHorizontal,
  MoreVertical,
  Search,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import {
  cartasHonorariosRows,
  cartasHonorariosSummary,
  cartasTableColumnOptions,
  type CartaHonorarioRow,
  type CartasTableColumnId,
} from "../../data/cartasHonorariosMock";

function buildInitialVisibility(): Record<CartasTableColumnId, boolean> {
  const v = {} as Record<CartasTableColumnId, boolean>;
  for (const c of cartasTableColumnOptions) {
    v[c.id] = c.defaultVisible;
  }
  return v;
}

function CartaRowActionsMenu({ row }: { row: CartaHonorarioRow }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const down = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", down);
    return () => document.removeEventListener("mousedown", down);
  }, [menuOpen]);

  useEffect(() => {
    if (!detailOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDetailOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [detailOpen]);

  return (
    <>
      <div className="relative inline-block text-left" ref={wrapRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="grid h-8 w-8 place-content-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          aria-label="Mas opciones"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <MoreVertical size={18} />
        </button>
        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-1 min-w-[12.5rem] rounded-lg border border-slate-100 bg-white py-1 shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              className="w-full px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-50"
              onClick={() => {
                setMenuOpen(false);
                setDetailOpen(true);
              }}
            >
              Detalle de la carta
            </button>
          </div>
        )}
      </div>

      {detailOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"
            aria-label="Cerrar"
            onClick={() => setDetailOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="detalle-carta-titulo"
            className="relative z-10 w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-xl"
          >
            <h3
              id="detalle-carta-titulo"
              className="text-lg font-semibold text-slate-900"
            >
              Detalle de la carta
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Paciente</dt>
                <dd className="font-medium text-slate-900">{row.paciente}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Aseguradora</dt>
                <dd className="font-medium text-slate-900">
                  {row.aseguradora}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Estatus</dt>
                <dd className="font-medium text-slate-900">
                  {row.estatusLabel}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Total a reclamar</dt>
                <dd className="font-medium text-slate-900">
                  {row.totalReclamar}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Folio</dt>
                <dd className="text-slate-800">{row.folio}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Fecha</dt>
                <dd className="text-slate-800">{row.fecha}</dd>
              </div>
            </dl>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setDetailOpen(false)}
                className="rounded-lg bg-[#07c78f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#06b381]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function renderCell(row: CartaHonorarioRow, col: CartasTableColumnId) {
  switch (col) {
    case "paciente":
      return <span className="font-medium text-slate-900">{row.paciente}</span>;
    case "aseguradora":
      return <span className="text-slate-700">{row.aseguradora}</span>;
    case "estatus":
      switch (row.estatus) {
        case "Recibida":
          return (
            <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
              {row.estatusLabel}
            </span>
          );
        case "En Revisión":
          return (
            <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              {row.estatusLabel}
            </span>
          );
        case "Aseguradora":
          return (
            <span className="inline-flex rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800">
              {row.estatusLabel}
            </span>
          );
        case "Pagada":
          return (
            <span className="inline-flex rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
              {row.estatusLabel}
            </span>
          );
        case "Rechazada":
          return (
            <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
              {row.estatusLabel}
            </span>
          );
      }
    case "totalReclamar":
      return (
        <span className="font-medium text-slate-800">{row.totalReclamar}</span>
      );
    case "folio":
      return <span className="text-slate-600">{row.folio}</span>;
    case "fecha":
      return <span className="text-slate-700">{row.fecha}</span>;
    case "totalSinRetenciones":
      return <span className="text-slate-700">{row.totalSinRetenciones}</span>;
    case "posiblePago":
      return <span className="text-slate-700">{row.posiblePago}</span>;
    case "pagoConfirmado":
      return <span className="text-slate-700">{row.pagoConfirmado}</span>;
    case "comentarioSoporte":
      return (
        <span
          className="max-w-[200px] truncate text-slate-600"
          title={row.comentarioSoporte}
        >
          {row.comentarioSoporte}
        </span>
      );
    default:
      return null;
  }
}

export function CartasHonorariosPage() {
  const [columnVisible, setColumnVisible] = useState<
    Record<CartasTableColumnId, boolean>
  >(buildInitialVisibility);
  const [columnPickerOpen, setColumnPickerOpen] = useState(false);
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

  const visibleColumns = cartasTableColumnOptions.filter(
    (c) => columnVisible[c.id],
  );

  const toggleColumn = (id: CartasTableColumnId) => {
    setColumnVisible((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (!cartasTableColumnOptions.some((c) => next[c.id])) return prev;
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Cartas de Honorarios
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Gestiona tus cartas y da seguimiento a tus pagos de aseguradoras
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm transition hover:bg-emerald-50"
        >
          <HelpCircle size={18} className="text-emerald-600" />
          Como funciona?
        </button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cartasHonorariosSummary.map((card) => (
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
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative min-w-0 flex-1 lg:max-w-md">
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
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50"
            >
              <SlidersHorizontal size={18} />
              Filtros
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-content-center rounded-lg border border-emerald-100 bg-white text-emerald-800 hover:bg-emerald-50"
              aria-label="Descargar"
            >
              <Download size={18} />
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-content-center rounded-lg border border-emerald-100 bg-white text-emerald-800 hover:bg-emerald-50"
              aria-label="Configuracion"
            >
              <Settings size={18} />
            </button>

            <div className="relative" ref={pickerRef}>
              <button
                type="button"
                onClick={() => setColumnPickerOpen((o) => !o)}
                aria-expanded={columnPickerOpen}
                aria-haspopup="listbox"
                className="rounded-lg bg-[#07c78f] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06b381]"
              >
                Editar tabla
              </button>

              {columnPickerOpen && (
                <div
                  className="absolute right-0 z-40 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
                  role="listbox"
                  aria-label="Columnas visibles"
                >
                  <div className="max-h-72 overflow-y-auto py-1">
                    {cartasTableColumnOptions.map((col) => (
                      <label
                        key={col.id}
                        className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm text-slate-800 hover:bg-slate-100"
                      >
                        <input
                          type="checkbox"
                          checked={columnVisible[col.id]}
                          onChange={() => toggleColumn(col.id)}
                          className="h-4 w-4 shrink-0 rounded border-2 border-[#07c78f] text-[#07c78f] accent-[#07c78f] focus:ring-2 focus:ring-[#07c78f]/30"
                        />
                        <span className="select-none">{col.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex justify-end border-t border-slate-100 px-3 py-2">
                    <span className="text-slate-400" aria-hidden>
                      ···
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                {visibleColumns.map((col) => (
                  <th
                    key={col.id}
                    className="pb-3 pl-2 pr-2 font-medium first:pl-2"
                  >
                    {col.id === "fecha" ? (
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        <ArrowDownUp size={14} className="text-slate-400" />
                      </span>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cartasHonorariosRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  {visibleColumns.map((col) => (
                    <td key={col.id} className="py-3 pl-2 pr-2 align-middle">
                      {col.id === "acciones" ? (
                        <CartaRowActionsMenu row={row} />
                      ) : (
                        renderCell(row, col.id)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
