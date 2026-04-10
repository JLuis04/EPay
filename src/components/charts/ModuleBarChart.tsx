import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Point = {
  aseguradora: string;
  cartas: number;
};

type Props = {
  data: Point[];
};

export function ModuleBarChart({ data }: Props) {
  const colors = ["#07c78f", "#19b886", "#2ca27a", "#3a8f70", "#4a7f6a"];
  const total = data.reduce((sum, item) => sum + item.cartas, 0);

  return (
    <section className="panel h-[320px] dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-emerald-950 dark:text-white">Cartas por Aseguradora</h3>
      <p className="mb-4 text-sm text-emerald-700 dark:text-emerald-200">Enero - Abril 2026</p>
      <ResponsiveContainer width="100%" height="88%">
        <PieChart>
          <Tooltip />
          <Pie
            data={data}
            dataKey="cartas"
            nameKey="aseguradora"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={96}
            paddingAngle={3}
          >
            {data.map((entry, idx) => (
              <Cell key={`${entry.aseguradora}-${idx}`} fill={colors[idx % colors.length]} />
            ))}
          </Pie>
          <text x="50%" y="48%" textAnchor="middle" className="fill-emerald-950 text-3xl font-semibold">
            {total}
          </text>
          <text x="50%" y="56%" textAnchor="middle" className="fill-emerald-700 text-xs">
            Cartas
          </text>
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}
