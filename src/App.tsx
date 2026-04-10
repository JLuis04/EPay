import { useEffect, useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { TopBar } from "./components/layout/TopBar";
import { CartasHonorariosPage } from "./components/pages/CartasHonorariosPage";
import { EstadisticasPage } from "./components/pages/EstadisticasPage";
import { MisConsultasPage } from "./components/pages/MisConsultasPage";
import { PlaceholderPage } from "./components/pages/PlaceholderPage";
import { transactions, type Transaction } from "./data/mockData";
import type { AppView } from "./navigation";

function App() {
  const [activeView, setActiveView] = useState<AppView>("estadisticas");
  const [selected, setSelected] = useState<Transaction | null>(
    transactions[0] ?? null,
  );
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleNavigate = (view: AppView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#eef7f2] text-slate-900 dark:bg-navy-900 dark:text-slate-100">
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        active={activeView}
        onNavigate={handleNavigate}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((prev) => !prev)}
          onMenuToggle={() => setMobileMenuOpen((prev) => !prev)}
        />

        <main className="space-y-6 p-4 sm:p-6">
          {activeView === "estadisticas" && (
            <EstadisticasPage
              selected={selected}
              onSelectTransaction={setSelected}
            />
          )}
          {activeView === "cartas_aseguradora" && <CartasHonorariosPage />}
          {activeView === "mis_consultas" && <MisConsultasPage />}
          {activeView === "facturacion" && (
            <PlaceholderPage
              title="Facturación"
              description="Módulo en preparación."
            />
          )}
          {activeView === "clientes" && (
            <PlaceholderPage
              title="Clientes / Pacientes"
              description="Módulo en preparación."
            />
          )}
          {activeView === "transacciones" && (
            <PlaceholderPage
              title="Transacciones"
              description="Módulo en preparación."
            />
          )}
          {activeView === "reportes" && (
            <PlaceholderPage
              title="Reportes"
              description="Módulo en preparación."
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
