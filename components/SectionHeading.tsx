type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
};

export function SectionHeading({ title, eyebrow }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2>{title}</h2>
    </div>
  );
}
