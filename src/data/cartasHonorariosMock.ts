export type CartaEstatusTipo =
  | "Recibida"
  | "En Revisión"
  | "Aseguradora"
  | "Pagada"
  | "Rechazada";

export type CartaHonorarioRow = {
  id: string;
  paciente: string;
  aseguradora: string;
  estatus: CartaEstatusTipo;
  estatusLabel: string;
  totalReclamar: string;
  folio: string;
  fecha: string;
  totalSinRetenciones: string;
  posiblePago: string;
  pagoConfirmado: string;
  comentarioSoporte: string;
};

export type CartasTableColumnId =
  | "paciente"
  | "aseguradora"
  | "estatus"
  | "totalReclamar"
  | "folio"
  | "fecha"
  | "totalSinRetenciones"
  | "posiblePago"
  | "pagoConfirmado"
  | "comentarioSoporte"
  | "acciones";

export const cartasTableColumnOptions: {
  id: CartasTableColumnId;
  label: string;
  defaultVisible: boolean;
}[] = [
  { id: "paciente", label: "Paciente", defaultVisible: true },
  { id: "aseguradora", label: "Aseguradora", defaultVisible: true },
  { id: "estatus", label: "Estatus", defaultVisible: true },
  { id: "totalReclamar", label: "Total a reclamar", defaultVisible: true },
  { id: "folio", label: "Folio", defaultVisible: true },
  { id: "fecha", label: "Fecha de envío", defaultVisible: true },
  {
    id: "totalSinRetenciones",
    label: "Total sin retenciones",
    defaultVisible: false,
  },
  { id: "posiblePago", label: "Posible pago", defaultVisible: false },
  { id: "pagoConfirmado", label: "Pago confirmado", defaultVisible: false },
  {
    id: "comentarioSoporte",
    label: "Comentario de soporte",
    defaultVisible: false,
  },
  { id: "acciones", label: "Acciones", defaultVisible: true },
];

export const cartasHonorariosSummary = [
  {
    key: "total",
    title: "Total",
    count: 35,
    amount: "$722,742.84",
    bg: "bg-white border border-emerald-100",
    accent: "text-emerald-950",
  },
  {
    key: "recibida",
    title: "Recibida",
    count: 4,
    amount: "$418,686.30",
    bg: "bg-blue-50 border border-blue-200",
    accent: "text-blue-900",
  },
  {
    key: "revision",
    title: "En Revisión",
    count: 1,
    amount: "$110.00",
    bg: "bg-amber-50 border border-amber-200",
    accent: "text-amber-900",
  },
  {
    key: "aseguradora",
    title: "Aseguradora",
    count: 28,
    amount: "$256,321.04",
    bg: "bg-purple-50 border border-purple-200",
    accent: "text-purple-900",
  },
  {
    key: "pagada",
    title: "Pagada",
    count: 28,
    amount: "$256,321.04",
    bg: "bg-brand-50 border border-brand-200",
    accent: "text-brand-700",
  },
  {
    key: "rechazada",
    title: "Rechazada",
    count: 2,
    amount: "$47,735.50",
    bg: "bg-red-50 border border-red-200",
    accent: "text-red-900",
  },
] as const;

export const cartasHonorariosRows: CartaHonorarioRow[] = [
  {
    id: "1",
    paciente: "MORA ESPARZA PERLA Y..",
    aseguradora: "Metlife",
    estatus: "En Revisión",
    estatusLabel: "En Revisión",
    totalReclamar: "$110.00",
    folio: "000000",
    fecha: "12/03/2025",
    totalSinRetenciones: "$0.00",
    posiblePago: "$100.00",
    pagoConfirmado: "-",
    comentarioSoporte: "Pendiente revision",
  },
  {
    id: "2",
    paciente: "RAUL PACHECO BARRIOS",
    aseguradora: "GNP",
    estatus: "Pagada",
    estatusLabel: "Pagada",
    totalReclamar: "$12,010.00",
    folio: "1382217PC6 / SIGPRC2...",
    fecha: "27/02/2025",
    totalSinRetenciones: "$11,200.00",
    posiblePago: "$12,010.00",
    pagoConfirmado: "$12,010.00",
    comentarioSoporte: "-",
  },
  {
    id: "3",
    paciente: "LOPEZ GARCIA MARIA",
    aseguradora: "Monterrey",
    estatus: "Recibida",
    estatusLabel: "Recibida",
    totalReclamar: "$8,450.00",
    folio: "992831AA1",
    fecha: "15/02/2025",
    totalSinRetenciones: "$8,000.00",
    posiblePago: "$8,450.00",
    pagoConfirmado: "$8,450.00",
    comentarioSoporte: "-",
  },
  {
    id: "4",
    paciente: "HERNANDEZ RUIZ CARLOS",
    aseguradora: "MAPFRE",
    estatus: "Aseguradora",
    estatusLabel: "Aseguradora",
    totalReclamar: "$500.00",
    folio: "000000",
    fecha: "10/02/2025",
    totalSinRetenciones: "$0.00",
    posiblePago: "$4,200.00",
    pagoConfirmado: "-",
    comentarioSoporte: "Falta documentacion",
  },
  {
    id: "5",
    paciente: "SANTOS MENDOZA ANA",
    aseguradora: "Metlife",
    estatus: "Rechazada",
    estatusLabel: "Rechazada",
    totalReclamar: "$25,300.00",
    folio: "445521PC8",
    fecha: "05/02/2025",
    totalSinRetenciones: "$24,100.00",
    posiblePago: "$25,300.00",
    pagoConfirmado: "$25,300.00",
    comentarioSoporte: "-",
  },
];
