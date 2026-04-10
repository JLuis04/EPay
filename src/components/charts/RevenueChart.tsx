import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type Point = {
  estado: string;
  valor: number;
};

type Props = {
  data: Point[];
};

export function RevenueChart({ data }: Props) {
  return (
    <section className="panel h-[320px] dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-emerald-950 dark:text-white">Cartas por Estatus</h3>
      <p className="mb-4 text-sm text-emerald-700 dark:text-emerald-200">Enero - Abril 2026</p>
      <ResponsiveContainer width="100%" height="88%">
        <BarChart data={data} layout="vertical" margin={{ left: 25, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d6e7de" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="estado" width={90} />
          <Tooltip />
          <Bar dataKey="valor" fill="#07c78f" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
