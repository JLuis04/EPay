import { useState } from "react";
import { Building2, Coins, FileSearch, Mail } from "lucide-react";

type StepDef = {
  id: number;
  label: string;
  renderIcon: (active: boolean) => React.ReactNode;
};

const stepDefs: StepDef[] = [
  {
    id: 1,
    label: "Recibido",
    renderIcon: (active) => (
      <div
        className={[
          "flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all duration-300",
          active
            ? "border-amber-200 bg-amber-50"
            : "border-slate-100 bg-slate-50",
        ].join(" ")}
      >
        <Mail
          size={30}
          strokeWidth={1.5}
          className={[
            "transition-colors duration-300",
            active ? "text-amber-500" : "text-slate-300",
          ].join(" ")}
        />
      </div>
    ),
  },
  {
    id: 2,
    label: "En revisión",
    renderIcon: (active) => (
      <div
        className={[
          "flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all duration-300",
          active
            ? "border-emerald-200 bg-emerald-50"
            : "border-slate-100 bg-slate-50",
        ].join(" ")}
      >
        <FileSearch
          size={30}
          strokeWidth={1.5}
          className={[
            "transition-colors duration-300",
            active ? "text-emerald-500" : "text-slate-300",
          ].join(" ")}
        />
      </div>
    ),
  },
  {
    id: 3,
    label: "Aseguradora",
    renderIcon: (active) => (
      <div
        className={[
          "flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all duration-300",
          active
            ? "border-blue-200 bg-blue-50"
            : "border-slate-100 bg-slate-50",
        ].join(" ")}
      >
        <Building2
          size={30}
          strokeWidth={1.5}
          className={[
            "transition-colors duration-300",
            active ? "text-blue-500" : "text-slate-300",
          ].join(" ")}
        />
      </div>
    ),
  },
  {
    id: 4,
    label: "Pagada",
    renderIcon: (active) => (
      <div
        className={[
          "flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all duration-300",
          active
            ? "border-yellow-200 bg-yellow-50"
            : "border-slate-100 bg-slate-50",
        ].join(" ")}
      >
        <Coins
          size={30}
          strokeWidth={1.5}
          className={[
            "transition-colors duration-300",
            active ? "text-yellow-500" : "text-slate-300",
          ].join(" ")}
        />
      </div>
    ),
  },
];

type Props = {
  cartaLabel?: string;
  initialStep?: number;
};

export function CartasEstatusPage({
  cartaLabel = "Carta 1",
  initialStep = 1,
}: Props) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          Estatus de la carta
        </h1>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm font-semibold text-emerald-800 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {cartaLabel}
        </span>
      </div>

      {/* ── Progress card ── */}
      <div className="rounded-2xl border border-slate-100 bg-white px-10 py-8 shadow-sm">
        <div className="flex items-start">
          {stepDefs.map((step, idx) => {
            const completed = idx + 1 <= currentStep;
            const isFirst = idx === 0;
            const isLast = idx === stepDefs.length - 1;

            /* A connector segment between step[idx] and step[idx+1] is green
               when step[idx+1] is also completed, i.e. idx+2 <= currentStep  */
            const rightGreen = idx + 2 <= currentStep;
            const leftGreen = completed;

            return (
              <div key={step.id} className="flex flex-1 flex-col items-center">
                {/* Clickable icon */}
                <button
                  type="button"
                  onClick={() => setCurrentStep(idx + 1)}
                  className={[
                    "mb-4 rounded-2xl outline-none ring-offset-2 transition-transform duration-150",
                    "hover:scale-105 active:scale-95",
                    "focus-visible:ring-2 focus-visible:ring-[#07c78f]",
                    completed ? "cursor-pointer" : "cursor-pointer",
                  ].join(" ")}
                  aria-label={`Seleccionar estatus: ${step.label}`}
                >
                  {step.renderIcon(completed)}
                </button>

                {/* Label */}
                <span
                  className={[
                    "mb-6 text-center text-sm font-semibold transition-colors duration-300",
                    completed ? "text-slate-800" : "text-slate-400",
                  ].join(" ")}
                >
                  {step.label}
                </span>

                {/* Dot + connectors */}
                <div className="flex w-full items-center">
                  {/* Left half-connector */}
                  {isFirst ? (
                    <div className="flex-1" />
                  ) : (
                    <div
                      className={[
                        "h-[4px] flex-1 transition-colors duration-500",
                        leftGreen ? "bg-[#07c78f]" : "bg-slate-200",
                      ].join(" ")}
                    />
                  )}

                  {/* Dot */}
                  <button
                    type="button"
                    onClick={() => setCurrentStep(idx + 1)}
                    aria-label={`Ir a: ${step.label}`}
                    className={[
                      "h-[14px] w-[14px] shrink-0 rounded-full border-[3px] outline-none transition-all duration-500",
                      "focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#07c78f]",
                      completed
                        ? "border-[#07c78f] bg-[#07c78f] shadow-[0_0_0_3px_rgba(7,199,143,0.2)]"
                        : "border-slate-300 bg-white hover:border-[#07c78f]/50",
                    ].join(" ")}
                  />

                  {/* Right half-connector */}
                  {isLast ? (
                    <div className="flex-1" />
                  ) : (
                    <div
                      className={[
                        "h-[4px] flex-1 transition-colors duration-500",
                        rightGreen ? "bg-[#07c78f]" : "bg-slate-200",
                      ].join(" ")}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
