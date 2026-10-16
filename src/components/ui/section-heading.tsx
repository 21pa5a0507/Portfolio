export function SectionHeading({
  number,
  label,
  title,
  id,
}: {
  number: string;
  label: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="mb-10">
      <p className="eyebrow mb-4">
        {number} / {label}
      </p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
