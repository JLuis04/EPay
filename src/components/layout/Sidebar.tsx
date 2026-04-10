import { useEffect, useState } from "react";
import {
  BarChart3,
  ChevronDown,
  DollarSign,
  FileText,
  LayoutDashboard,
  List,
  Mail,
  Receipt,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import type { AppView } from "../../navigation";

const restNav: { icon: typeof Receipt; label: string; view: AppView }[] = [
  { icon: Receipt, label: "Facturación", view: "facturacion" },
  { icon: Users, label: "Clientes / Pacientes", view: "clientes" },
  { icon: FileText, label: "Transacciones", view: "transacciones" },
  { icon: BarChart3, label: "Reportes", view: "reportes" },
];

type SidebarProps = {
  active: AppView;
  onNavigate: (view: AppView) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  activeCarta: 1 | 2;
  onSelectCarta: (n: 1 | 2) => void;
};

function SidebarContent({
  active,
  onNavigate,
  activeCarta,
  onSelectCarta,
}: {
  active: AppView;
  onNavigate: (view: AppView) => void;
  activeCarta: 1 | 2;
  onSelectCarta: (n: 1 | 2) => void;
}) {
  const ingresosChildActive =
    active === "cartas_aseguradora" || active === "mis_consultas";
  const [ingresosOpen, setIngresosOpen] = useState(true);

  const estatusActive = active === "carta_estatus";
  const [cartasOpen, setCartasOpen] = useState(estatusActive);
  const [carta1Open, setCarta1Open] = useState(
    estatusActive && activeCarta === 1,
  );
  const [carta2Open, setCarta2Open] = useState(
    estatusActive && activeCarta === 2,
  );

  useEffect(() => {
    if (estatusActive) {
      setCartasOpen(true);
      if (activeCarta === 1) setCarta1Open(true);
      if (activeCarta === 2) setCarta2Open(true);
    }
  }, [estatusActive, activeCarta]);

  const carta1EstatusActive = estatusActive && activeCarta === 1;
  const carta2EstatusActive = estatusActive && activeCarta === 2;

  return (
    <>
      <div className="mb-8 flex w-full items-center gap-3">
        <a href="#" className="flex w-full items-center gap-3">
          <img
            src="/logo-grupo-ethos-pay.png"
            className="h-15 w-full rounded-lg object-cover"
          />
          <div className="flex flex-col leading-none" />
        </a>
      </div>

      <nav className="space-y-1">
        {/* Estadísticas */}
        <button
          type="button"
          onClick={() => onNavigate("estadisticas")}
          className={[
            "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition",
            active === "estadisticas"
              ? "bg-[#07c78f] text-[#05201e] shadow-soft"
              : "text-[#cbf7e8] hover:bg-[#103235]",
          ].join(" ")}
        >
          <LayoutDashboard size={18} />
          <span className="text-sm font-medium">Estadísticas</span>
        </button>

        {/* Mis Ingresos */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIngresosOpen((o) => !o)}
            className={[
              "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition",
              ingresosChildActive ? "text-[#6ee7c5]" : "text-[#6ee7c5]",
              "hover:bg-[#103235]",
            ].join(" ")}
          >
            <span className="grid h-9 w-9 shrink-0 place-content-center rounded-full bg-[#07c78f] text-white">
              <DollarSign size={18} strokeWidth={2.25} />
            </span>
            <span className="min-w-0 flex-1 text-sm font-semibold">
              Mis Ingresos
            </span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-slate-400 transition-transform ${ingresosOpen ? "rotate-180" : ""}`}
            />
          </button>

          {ingresosOpen && (
            <div className="relative ml-[22px] mt-1 border-l border-[#2d5a52] pl-3">
              <button
                type="button"
                onClick={() => onNavigate("cartas_aseguradora")}
                className={[
                  "flex w-full items-center gap-3 rounded-lg py-2.5 pl-2 pr-2 text-left transition",
                  active === "cartas_aseguradora"
                    ? "bg-[#103235] text-[#6ee7c5]"
                    : "text-[#6ee7c5] hover:bg-[#103235]",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid h-8 w-8 shrink-0 place-content-center rounded-lg text-slate-300",
                    active === "cartas_aseguradora"
                      ? "bg-[#07c78f]"
                      : "bg-slate-600/50",
                  ].join(" ")}
                >
                  <FileText size={15} strokeWidth={2} />
                </span>
                <span className="truncate text-sm font-medium">
                  Cartas Aseguradoras
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate("mis_consultas")}
                className={[
                  "flex w-full items-center gap-3 rounded-lg py-2.5 pl-2 pr-2 text-left transition",
                  active === "mis_consultas"
                    ? "bg-[#103235] text-[#6ee7c5]"
                    : "text-[#6ee7c5] hover:bg-[#103235]",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid h-8 w-8 shrink-0 place-content-center rounded-lg text-slate-300",
                    active === "mis_consultas"
                      ? "bg-[#07c78f]"
                      : "bg-slate-600/50",
                  ].join(" ")}
                >
                  <List size={15} strokeWidth={2} />
                </span>
                <span className="truncate text-sm font-medium">
                  Mis Consultas
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Rest nav items */}
        {restNav.map(({ icon: Icon, label, view }) => (
          <button
            key={view}
            type="button"
            onClick={() => onNavigate(view)}
            className={[
              "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition",
              active === view
                ? "bg-[#07c78f] text-[#05201e] shadow-soft"
                : "text-[#cbf7e8] hover:bg-[#103235]",
            ].join(" ")}
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}

        {/* Cartas */}
        <div className="pt-1">
          {/* Cartas parent toggle */}
          <button
            type="button"
            onClick={() => setCartasOpen((o) => !o)}
            className={[
              "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition",
              "text-[#cbf7e8] hover:bg-[#103235]",
            ].join(" ")}
          >
            <Mail size={18} />
            <span className="min-w-0 flex-1 text-sm font-medium">Cartas</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-slate-400 transition-transform ${cartasOpen ? "rotate-180" : ""}`}
            />
          </button>

          {cartasOpen && (
            <div className="relative ml-[22px] mt-1 border-l border-[#2d5a52] pl-3">
              {/* ── Carta 1 toggle ── */}
              <button
                type="button"
                onClick={() => setCarta1Open((o) => !o)}
                className="flex w-full items-center gap-3 rounded-lg py-2.5 pl-2 pr-2 text-left transition text-[#6ee7c5] hover:bg-[#103235]"
              >
                <span className="grid h-8 w-8 shrink-0 place-content-center rounded-lg bg-slate-600/50 text-slate-300">
                  <FileText size={15} strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                  Carta 1
                </span>
                <ChevronDown
                  size={15}
                  className={`shrink-0 text-slate-400 transition-transform ${carta1Open ? "rotate-180" : ""}`}
                />
              </button>

              {/* Carta 1 → Estatus */}
              {carta1Open && (
                <div className="relative ml-[18px] mt-0.5 border-l border-[#2d5a52] pl-3">
                  <button
                    type="button"
                    onClick={() => onSelectCarta(1)}
                    className={[
                      "flex w-full items-center gap-3 rounded-lg py-2.5 pl-2 pr-2 text-left transition",
                      carta1EstatusActive
                        ? "bg-[#07c78f] text-[#05201e] shadow-soft"
                        : "text-[#6ee7c5] hover:bg-[#103235]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "grid h-7 w-7 shrink-0 place-content-center rounded-lg",
                        carta1EstatusActive
                          ? "bg-white/20 text-[#05201e]"
                          : "bg-slate-600/50 text-slate-300",
                      ].join(" ")}
                    >
                      <Sparkles size={14} strokeWidth={2} />
                    </span>
                    <span className="truncate text-sm font-medium">
                      Estatus
                    </span>
                  </button>
                </div>
              )}

              {/* ── Carta 2 toggle ── */}
              <button
                type="button"
                onClick={() => setCarta2Open((o) => !o)}
                className="flex w-full items-center gap-3 rounded-lg py-2.5 pl-2 pr-2 text-left transition text-[#6ee7c5] hover:bg-[#103235]"
              >
                <span className="grid h-8 w-8 shrink-0 place-content-center rounded-lg bg-slate-600/50 text-slate-300">
                  <FileText size={15} strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                  Carta 2
                </span>
                <ChevronDown
                  size={15}
                  className={`shrink-0 text-slate-400 transition-transform ${carta2Open ? "rotate-180" : ""}`}
                />
              </button>

              {/* Carta 2 → Estatus */}
              {carta2Open && (
                <div className="relative ml-[18px] mt-0.5 border-l border-[#2d5a52] pl-3">
                  <button
                    type="button"
                    onClick={() => onSelectCarta(2)}
                    className={[
                      "flex w-full items-center gap-3 rounded-lg py-2.5 pl-2 pr-2 text-left transition",
                      carta2EstatusActive
                        ? "bg-[#07c78f] text-[#05201e] shadow-soft"
                        : "text-[#6ee7c5] hover:bg-[#103235]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "grid h-7 w-7 shrink-0 place-content-center rounded-lg",
                        carta2EstatusActive
                          ? "bg-white/20 text-[#05201e]"
                          : "bg-slate-600/50 text-slate-300",
                      ].join(" ")}
                    >
                      <Sparkles size={14} strokeWidth={2} />
                    </span>
                    <span className="truncate text-sm font-medium">
                      Estatus
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export function Sidebar({
  active,
  onNavigate,
  mobileOpen,
  onMobileClose,
  activeCarta,
  onSelectCarta,
}: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-[#1f5a4d] bg-gradient-to-b from-[#0b2628] to-[#061a1c] p-5 text-slate-100 lg:block">
        <SidebarContent
          active={active}
          onNavigate={onNavigate}
          activeCarta={activeCarta}
          onSelectCarta={onSelectCarta}
        />
      </aside>

      {/* Mobile drawer */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 w-72 shrink-0 border-r border-[#1f5a4d] bg-gradient-to-b from-[#0b2628] to-[#061a1c] p-5 text-slate-100",
          "transform transition-transform duration-300 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onMobileClose}
          className="absolute right-3 top-3 grid h-8 w-8 place-content-center rounded-lg text-slate-400 transition hover:bg-[#103235] hover:text-white"
          aria-label="Cerrar menú"
        >
          <X size={18} />
        </button>

        <SidebarContent
          active={active}
          onNavigate={onNavigate}
          activeCarta={activeCarta}
          onSelectCarta={onSelectCarta}
        />
      </aside>
    </>
  );
}
