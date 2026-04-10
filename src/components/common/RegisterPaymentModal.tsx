import { useEffect, useState } from "react";
import { X } from "lucide-react";

const inputBase =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none ring-[#07c78f] transition focus:border-[#07c78f] focus:ring-2";

const labelClass = "text-sm font-medium text-sky-700";

type ConceptoId = "onco" | "odonto" | "biopsia";

const conceptos: { id: ConceptoId; label: string }[] = [
  { id: "onco", label: "CONSULTA MEDICA ONCOLOGICA" },
  { id: "odonto", label: "Consulta Odontologica" },
  { id: "biopsia", label: "BIOPSIA" }
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export function RegisterPaymentModal({ open, onClose }: Props) {
  const [generarFactura, setGenerarFactura] = useState("Si");
  const [concepto, setConcepto] = useState<ConceptoId>("odonto");
  const [formaPago, setFormaPago] = useState("Efectivo");
  const [monto, setMonto] = useState("1200");
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [codigoPais, setCodigoPais] = useState("+52");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleConfirm = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        aria-label="Cerrar modal"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="registrar-pago-titulo"
        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 pb-4 pt-6">
          <div>
            <h2 id="registrar-pago-titulo" className="text-xl font-semibold text-slate-900">
              Registrar Pago
            </h2>
            <p className="mt-1 text-sm text-slate-500">Registra el pago de una consulta</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            <div>
              <label htmlFor="generar-factura" className={labelClass}>
                ¿Deseas generar factura?
              </label>
              <select
                id="generar-factura"
                value={generarFactura}
                onChange={(e) => setGenerarFactura(e.target.value)}
                className={`${inputBase} mt-1.5`}
              >
                <option>Si</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">¿Que quieres facturar?</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {conceptos.map((c) => {
                  const selected = concepto === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setConcepto(c.id)}
                      className={[
                        "rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition sm:text-sm",
                        selected
                          ? "border-sky-400 bg-sky-50 font-semibold text-slate-900 shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      ].join(" ")}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="forma-pago" className={labelClass}>
                Forma de Pago
              </label>
              <select
                id="forma-pago"
                value={formaPago}
                onChange={(e) => setFormaPago(e.target.value)}
                className={`${inputBase} mt-1.5`}
              >
                <option>Efectivo</option>
                <option>Tarjeta</option>
                <option>SPEI</option>
              </select>
            </div>

            <div>
              <label htmlFor="monto" className={labelClass}>
                Monto <span className="text-sky-600">*</span>
              </label>
              <input
                id="monto"
                type="number"
                min={0}
                step="0.01"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className={`${inputBase} mt-1.5`}
              />
            </div>

            <div>
              <label htmlFor="nombre-paciente" className={labelClass}>
                Nombre del Paciente <span className="text-sky-600">*</span>
              </label>
              <input
                id="nombre-paciente"
                type="text"
                value={nombrePaciente}
                onChange={(e) => setNombrePaciente(e.target.value)}
                placeholder="Escribe..."
                className={`${inputBase} mt-1.5`}
              />
            </div>

            <div>
              <label htmlFor="telefono" className={labelClass}>
                Celular del Paciente <span className="text-sky-600">*</span>
              </label>
              <div className="mt-1.5 flex gap-2">
                <select
                  value={codigoPais}
                  onChange={(e) => setCodigoPais(e.target.value)}
                  className={`${inputBase} w-[8.5rem] shrink-0`}
                  aria-label="Codigo de pais"
                >
                  <option value="+52">🇲🇽 +52</option>
                  <option value="+1">🇺🇸 +1</option>
                </select>
                <input
                  id="telefono"
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Numero de telefono"
                  className={`${inputBase} min-w-0 flex-1`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50/80 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-lg bg-[#07c78f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06b381]"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
