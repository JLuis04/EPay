export type ConsultaMetodo = "Efectivo" | "Tarjeta" | "SPEI";

export type ConsultaRow = {
  id: string;
  paciente: string;
  fecha: string;
  metodo: ConsultaMetodo;
  monto: string;
};

export const consultasSummary = [
  {
    key: "total",
    title: "Total",
    count: 1,
    amount: "$1,200.00",
    bg: "bg-sky-50 border border-sky-100",
    accent: "text-sky-900",
  },
  {
    key: "efectivo",
    title: "Efectivo",
    count: 0,
    amount: "$0.00",
    bg: "bg-emerald-50 border border-emerald-100",
    accent: "text-emerald-900",
  },
  {
    key: "tarjeta",
    title: "Tarjeta",
    count: 1,
    amount: "$1,200.00",
    bg: "bg-sky-50 border border-sky-100",
    accent: "text-sky-900",
  },
  {
    key: "spei",
    title: "SPEI",
    count: 0,
    amount: "$0.00",
    bg: "bg-violet-50 border border-violet-100",
    accent: "text-violet-900",
  },
] as const;

export const consultasRows: ConsultaRow[] = [
  {
    id: "1",
    paciente: "PRUEBA ",
    fecha: "10 de abril, 2026",
    metodo: "Tarjeta",
    monto: "$1,200",
  },
];

export type ConsultasColumnId =
  | "paciente"
  | "fecha"
  | "metodo"
  | "monto"
  | "acciones";

export const consultasTableColumnOptions: {
  id: ConsultasColumnId;
  label: string;
  defaultVisible: boolean;
}[] = [
  { id: "paciente", label: "Paciente", defaultVisible: true },
  { id: "fecha", label: "Fecha", defaultVisible: true },
  { id: "metodo", label: "Método de pago", defaultVisible: true },
  { id: "monto", label: "Monto", defaultVisible: true },
  { id: "acciones", label: "Acciones", defaultVisible: true },
];
