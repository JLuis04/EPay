type AlertItem = {
  id: string;
  text: string;
  level: "warning" | "success" | "danger";
};

type Props = {
  items: readonly AlertItem[];
};

const toneStyles: Record<AlertItem["level"], string> = {
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  success: "border-brand-100 bg-brand-50 text-brand-700",
  danger: "border-rose-200 bg-rose-50 text-rose-800"
};

export function AlertList({ items }: Props) {
  return (
    <section className="panel dark:border-emerald-900/50 dark:bg-navy-900">
      <h3 className="mb-4 text-lg font-semibold text-emerald-950 dark:text-white">Notificaciones</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className={`rounded-xl border px-3 py-2 text-sm ${toneStyles[item.level]}`}>
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}
