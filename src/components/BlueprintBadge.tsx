import { ProjectCategory } from '../types/portfolio';

export function CategoryBadge({ category }: { category: ProjectCategory }) {
  const styles: Record<ProjectCategory, string> = {
    IUT: 'border-[#1E4D7B]/40 bg-[#1E4D7B]/10 text-[#1E4D7B]',
    Stage: 'border-[#B84A2E]/45 bg-[#B84A2E]/12 text-[#B84A2E]',
    Perso: 'border-[#1C1B18]/30 bg-[#1C1B18]/8 text-[#1C1B18]',
  };

  return (
    <span
      className={`inline-flex items-center border px-2.5 py-0.5 font-mono text-xs font-medium tracking-wider uppercase ${styles[category]}`}
    >
      {category}
    </span>
  );
}

export function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center border hairline bg-[#F5F0E6]/90 px-2.5 py-1 font-mono text-xs text-[#5C574E]">
      {label}
    </span>
  );
}
