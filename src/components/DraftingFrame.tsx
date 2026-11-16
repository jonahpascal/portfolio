import { ReactNode, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';

interface DraftingFrameProps {
  children: ReactNode;
  className?: string;
  label?: string;
  cornerTone?: 'ink' | 'blueprint' | 'terracotta';
  elevated?: boolean;
  tilt?: boolean;
  drawBorder?: boolean;
}

const TONE_MAP = {
  ink: 'text-[#1C1B18]/55',
  blueprint: 'text-[#1E4D7B]/75',
  terracotta: 'text-[#B84A2E]/80',
};

export function DraftingFrame({
  children,
  className = '',
  label,
  cornerTone = 'blueprint',
  elevated = true,
  tilt = false,
  drawBorder = true,
}: DraftingFrameProps) {
  const tone = TONE_MAP[cornerTone];
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(50);

  const rotateX = useSpring(mouseY, { stiffness: 220, damping: 24 });
  const rotateY = useSpring(mouseX, { stiffness: 220, damping: 24 });
  const sheen = useMotionTemplate`radial-gradient(520px circle at ${sheenX}% ${sheenY}%, rgba(30, 77, 123, 0.08), transparent 65%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mouseX.set((px - 0.5) * 8);
    mouseY.set((0.5 - py) * 8);
    sheenX.set(px * 100);
    sheenY.set(py * 100);
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className={tilt ? 'perspective-scene' : undefined}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          tilt
            ? {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
            : undefined
        }
        className={`relative border hairline ${
          elevated ? 'bg-[#FAF7F0]/95' : 'bg-transparent'
        } ${tilt ? 'transition-shadow duration-300 hover:shadow-[0_18px_40px_-18px_rgba(30,77,123,0.22)]' : ''} ${className}`}
      >
        {/* Dynamic Blueprint Sheen on 3D Hover */}
        {tilt && (
          <motion.div
            aria-hidden="true"
            style={{ background: sheen }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
          />
        )}

        {/* Animated Advancing Blueprint Border Lines */}
        {drawBorder && (
          <>
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute top-[-1px] right-0 left-0 h-[1.5px] origin-left bg-[#1E4D7B]/45"
            />
            <motion.span
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute top-0 right-[-1px] bottom-0 w-[1.5px] origin-top bg-[#1E4D7B]/35"
            />
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute right-0 bottom-[-1px] left-0 h-[1.5px] origin-right bg-[#1E4D7B]/30"
            />
          </>
        )}

        {/* Corner Crosshairs (elevated slightly in 3D space when tilt is active) */}
        <span
          aria-hidden="true"
          style={tilt ? { transform: 'translateZ(18px)' } : undefined}
          className={`pointer-events-none absolute -top-[8px] -left-[6px] select-none font-mono text-sm leading-none ${tone}`}
        >
          +
        </span>
        <span
          aria-hidden="true"
          style={tilt ? { transform: 'translateZ(18px)' } : undefined}
          className={`pointer-events-none absolute -top-[8px] -right-[6px] select-none font-mono text-sm leading-none ${tone}`}
        >
          +
        </span>
        <span
          aria-hidden="true"
          style={tilt ? { transform: 'translateZ(18px)' } : undefined}
          className={`pointer-events-none absolute -bottom-[7px] -left-[6px] select-none font-mono text-sm leading-none ${tone}`}
        >
          +
        </span>
        <span
          aria-hidden="true"
          style={tilt ? { transform: 'translateZ(18px)' } : undefined}
          className={`pointer-events-none absolute -bottom-[7px] -right-[6px] select-none font-mono text-sm leading-none ${tone}`}
        >
          +
        </span>

        {label && (
          <span
            style={tilt ? { transform: 'translateZ(22px)' } : undefined}
            className="pointer-events-none absolute -top-3 left-4 bg-[#F5F0E6] px-2 font-mono text-[11px] font-medium tracking-widest text-[#1E4D7B] uppercase"
          >
            {label}
          </span>
        )}

        {children}
      </motion.div>
    </div>
  );
}
