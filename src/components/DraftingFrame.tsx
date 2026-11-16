import { ReactNode } from 'react';

interface DraftingFrameProps {
  children: ReactNode;
  className?: string;
  label?: string;
  cornerTone?: 'ink' | 'blueprint' | 'terracotta';
  elevated?: boolean;
}

const TONE_MAP = {
  ink: 'text-[#1C1B18]/45',
  blueprint: 'text-[#1E4D7B]/65',
  terracotta: 'text-[#B84A2E]/70',
};

export function DraftingFrame({
  children,
  className = '',
  label,
  cornerTone = 'blueprint',
  elevated = true,
}: DraftingFrameProps) {
  const tone = TONE_MAP[cornerTone];

  return (
    <div
      className={`relative border hairline ${
        elevated ? 'bg-[#FAF7F0]/92' : 'bg-transparent'
      } ${className}`}
    >
      {/* Corner Crosshairs */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-[7px] -left-[5px] select-none font-mono text-[11px] leading-none ${tone}`}
      >
        +
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-[7px] -right-[5px] select-none font-mono text-[11px] leading-none ${tone}`}
      >
        +
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-[6px] -left-[5px] select-none font-mono text-[11px] leading-none ${tone}`}
      >
        +
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-[6px] -right-[5px] select-none font-mono text-[11px] leading-none ${tone}`}
      >
        +
      </span>

      {label && (
        <span className="pointer-events-none absolute -top-2.5 left-4 bg-[#F5F0E6] px-1.5 font-mono text-[10px] tracking-widest text-[#1E4D7B] uppercase">
          {label}
        </span>
      )}

      {children}
    </div>
  );
}
