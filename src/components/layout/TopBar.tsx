import { Bell, Menu, Moon, Search, Sun } from "lucide-react";

type TopBarProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onMenuToggle: () => void;
};

export function TopBar({
  darkMode,
  onToggleDarkMode,
  onMenuToggle,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#0f3d34] bg-[#0b2628] px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        {/* Hamburger button — only visible on mobile/tablet */}
        <button
          type="button"
          onClick={onMenuToggle}
          className="grid h-10 w-10 shrink-0 place-content-center rounded-xl border border-[#1f5a4d] bg-[#103235] text-[#cbf7e8] transition hover:bg-[#164348] lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>

        <div className="relative hidden flex-1 md:block">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#4f7f73]"
          />
          <input
            type="text"
            placeholder="Buscar transacción, cliente o factura..."
            className="w-full rounded-xl border border-[#1f5a4d] bg-[#f4fffb] py-2 pl-9 pr-3 text-sm text-[#0f3d34] placeholder:text-[#4f7f73] outline-none ring-[#07c78f] transition focus:border-[#07c78f] focus:ring-2"
          />
        </div>

        <button className="hidden rounded-xl bg-[#07c78f] px-4 py-2 text-sm font-medium text-[#05201e] transition hover:bg-[#1ed7a5] lg:block">
          Subir Nueva Carta
        </button>
        <button className="hidden rounded-xl border border-[#1ed7a5]/60 bg-transparent px-4 py-2 text-sm font-medium text-[#cbf7e8] transition hover:bg-[#07c78f]/15 lg:block">
          Descargar reporte
        </button>

        <button
          className="grid h-10 w-10 place-content-center rounded-xl border border-[#1f5a4d] bg-[#103235] text-[#cbf7e8] transition hover:bg-[#164348]"
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="relative grid h-10 w-10 place-content-center rounded-xl border border-[#1f5a4d] bg-[#103235] text-[#cbf7e8] transition hover:bg-[#164348]">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#07c78f]" />
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-[#1f5a4d] bg-[#103235] px-3 py-2">
          <div className="grid h-8 w-8 place-content-center rounded-full bg-[#07c78f] text-xs font-semibold text-[#05201e]">
            TS
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-[#9fdccb]">Administrador</p>
            <p className="text-sm font-semibold text-white">Towa Software</p>
          </div>
        </div>
      </div>
    </header>
  );
}
