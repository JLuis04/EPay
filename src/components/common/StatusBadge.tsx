import type { TransactionStatus } from "../../data/mockData";

type Props = {
  status: TransactionStatus;
};

const styles: Record<TransactionStatus, string> = {
  Recibida: "bg-blue-100 text-blue-700",
  "En Revisión": "bg-amber-100 text-amber-700",
  Aseguradora: "bg-purple-100 text-purple-700",
  Pagada: "bg-brand-50 text-brand-700",
  Rechazada: "bg-red-100 text-red-700"
};

export function StatusBadge({ status }: Props) {
  return <span className={`rounded-md px-2 py-1 text-xs font-semibold ${styles[status]}`}>{status}</span>;
}
