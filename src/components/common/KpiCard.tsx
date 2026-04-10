import { TrendingDown, TrendingUp } from "lucide-react";

type KpiCardProps = {
  title: string;
  value: string;
  delta: string;
  tone: "positive" | "warning" | "neutral";
  featured?: boolean;
};

export function KpiCard({ title, value, delta, tone, featured = false }: KpiCardProps) {
  const color =
    tone === "positive"
      ? "text-brand-700 bg-brand-50"
      : tone === "warning"
        ? "text-amber-700 bg-amber-50"
        : "text-emerald-800 bg-emerald-50";

  return (
    <article
      className={[
        "kpi-card dark:border-emerald-900/50 dark:bg-navy-900",
        featured ? "border-brand-100 bg-gradient-to-br from-navy-900 to-navy-800 text-white" : ""
      ].join(" ")}
    >
      <p className={`mb-2 text-sm ${featured ? "text-brand-100" : "text-emerald-700 dark:text-emerald-200"}`}>{title}</p>
      <p className={`mb-3 text-3xl font-semibold ${featured ? "text-white" : "text-emerald-950 dark:text-white"}`}>{value}</p>
      <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${color}`}>
        {tone === "neutral" ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
        {delta}
      </span>
    </article>
  );
}
