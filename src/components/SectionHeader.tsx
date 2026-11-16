import { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  description?: string;
  rightSlot?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  italicWord,
  description,
  rightSlot,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 border-b hairline pb-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-[#1E4D7B] uppercase">
          <span className="inline-block h-1.5 w-1.5 bg-[#B84A2E]" />
          <span>{eyebrow}</span>
        </div>
        {rightSlot}
      </div>

      <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-[#1C1B18] sm:text-5xl md:text-6xl">
        {title}{' '}
        {italicWord && (
          <span className="italic text-[#1E4D7B]">{italicWord}</span>
        )}
      </h1>

      {description && (
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-[#5C574E]">
          {description}
        </p>
      )}
    </div>
  );
}
