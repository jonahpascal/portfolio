import { ReactNode } from 'react';
import { motion } from 'framer-motion';

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
    <div className="relative mb-12 pb-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 font-mono text-xs tracking-[0.18em] text-[#1E4D7B] uppercase">
          <span className="inline-block h-2 w-2 bg-[#B84A2E]" />
          <span>{eyebrow}</span>
        </div>
        {rightSlot}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-5xl leading-[1.02] tracking-tight text-[#1C1B18] sm:text-6xl lg:text-7xl"
      >
        {title}{' '}
        {italicWord && (
          <span className="italic text-[#1E4D7B]">{italicWord}</span>
        )}
      </motion.h1>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-5 max-w-3xl font-serif text-xl leading-relaxed text-[#5C574E]"
        >
          {description}
        </motion.p>
      )}

      {/* Advancing Blueprint Dimension Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 bottom-0 left-0 h-[1.5px] origin-left bg-[#1E4D7B]/35"
      />
    </div>
  );
}
