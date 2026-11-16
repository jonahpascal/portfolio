import { ProjectCategory } from '../types/portfolio';

export function CategoryBadge({ category }: { category: ProjectCategory }) {
  const styles: Record<ProjectCategory, string> = {
    IUT: 'border-[#1E4D7B]/35 bg-[#1E4D7B]/8 text-[#1E4D7B]',
    Stage: 'border-[#B84A2E]/40 bg-[#B84A2E]/10 text-[#B84A2E]',
    Perso: 'border-[#1C1B18]/25 bg-[#1C1B18]/6 text-[#1C1B18]',
  };

  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider uppercase ${styles[category]}`}
    >
      {category}
    </span>
  );
}

export function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center border hairline bg-[#F5F0E6]/80 px-2 py-0.5 font-mono text-[11px] text-[#5C574E]">
      {label}
    </span>
  );
}
