type Props = {
  title: string;
  description?: string;
};

export function PlaceholderPage({ title, description }: Props) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-10 text-center shadow-soft">
      <h1 className="text-2xl font-semibold text-emerald-950">{title}</h1>
      {description && <p className="mt-2 text-sm text-emerald-700">{description}</p>}
    </div>
  );
}
