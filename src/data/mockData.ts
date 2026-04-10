export type TransactionStatus = "Recibida" | "En Revisión" | "Aseguradora" | "Pagada" | "Rechazada";

export type Transaction = {
  id: string;
  cliente: string;
  modulo: "Cobro" | "Facturación" | "Transacción";
  fecha: string;
  monto: number;
  estado: TransactionStatus;
  metodo: string;
  referencia: string;
};

export const kpis = [
  { title: "Total de ingresos", value: "$1,248,240", delta: "+12.5%", tone: "positive" },
  { title: "Pagos pendientes", value: "$186,320", delta: "23 operaciones", tone: "warning" },
  { title: "Cartas Autorizadas", value: "1,032", delta: "+7.8%", tone: "positive" },
  { title: "Transacciones hoy", value: "84", delta: "-2.1%", tone: "neutral" }
] as const;

export const alerts = [
  { id: "A-1", text: "3 pagos mayores a $50,000 esperan aprobación.", level: "warning" },
  { id: "A-2", text: "La conciliación automatica finalizo sin errores.", level: "success" },
  { id: "A-3", text: "Hay 1 factura rechazada por CFDI inválido.", level: "danger" }
] as const;

export const revenueSeries = [
  { mes: "Ene", ingresos: 180000, flujo: 130000 },
  { mes: "Feb", ingresos: 195000, flujo: 141500 },
  { mes: "Mar", ingresos: 220000, flujo: 170000 },
  { mes: "Abr", ingresos: 210000, flujo: 160000 },
  { mes: "May", ingresos: 248000, flujo: 200000 },
  { mes: "Jun", ingresos: 260000, flujo: 219000 }
];

export const moduleSeries = [
  { modulo: "Cobros", valor: 420000 },
  { modulo: "Facturacion", valor: 360000 },
  { modulo: "Clientes", valor: 120000 },
  { modulo: "Transacciones", valor: 240000 },
  { modulo: "Reportes", valor: 90000 }
];

export const statusSeries = [
  { estado: "Recibida", valor: 4 },
  { estado: "En revisión", valor: 18 },
  { estado: "Aseguradora", valor: 6 },
  { estado: "Pagada", valor: 6 },
  { estado: "Rechazada", valor: 3 },
  { estado: "Total", valor: 37 }
];

export const insurerSeries = [
  { aseguradora: "AXA", cartas: 8 },
  { aseguradora: "GNP", cartas: 7 },
  { aseguradora: "MetLife", cartas: 6 },
  { aseguradora: "Mapfre", cartas: 5 },
  { aseguradora: "Inbursa", cartas: 9 }
];

export const transactions: Transaction[] = [
  {
    id: "TRX-93211",
    cliente: "Clinica Salud Integral",
    modulo: "Cobro",
    fecha: "2026-04-09",
    monto: 18500,
    estado: "Pagada",
    metodo: "Transferencia",
    referencia: "REF-82911"
  },
  {
    id: "TRX-93212",
    cliente: "Hospital Norte",
    modulo: "Facturación",
    fecha: "2026-04-08",
    monto: 42100,
    estado: "En Revisión",
    metodo: "Tarjeta",
    referencia: "REF-82912"
  },
  {
    id: "TRX-93213",
    cliente: "Centro Medico Prisma",
    modulo: "Transacción",
    fecha: "2026-04-07",
    monto: 9900,
    estado: "Rechazada",
    metodo: "SPEI",
    referencia: "REF-82913"
  },
  {
    id: "TRX-93214",
    cliente: "Paciente: Ana Ramirez",
    modulo: "Cobro",
    fecha: "2026-04-06",
    monto: 2350,
    estado: "Pagada",
    metodo: "Tarjeta",
    referencia: "REF-82914"
  },
  {
    id: "TRX-93215",
    cliente: "Laboratorio Nova",
    modulo: "Facturación",
    fecha: "2026-04-06",
    monto: 30200,
    estado: "Aseguradora",
    metodo: "Transferencia",
    referencia: "REF-82915"
  },
  {
    id: "TRX-93216",
    cliente: "Paciente: Diego Soto",
    modulo: "Transacción",
    fecha: "2026-04-04",
    monto: 1250,
    estado: "Recibida",
    metodo: "Efectivo",
    referencia: "REF-82916"
  }
];
