import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { COMPETENCES } from '../data/competences';

export function HeroBlueprint3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const smoothX = useSpring(rawX, { stiffness: 140, damping: 20 });
  const smoothY = useSpring(rawY, { stiffness: 140, damping: 20 });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-scene relative flex min-h-[430px] items-center justify-center py-6 select-none sm:min-h-[480px]"
    >
      {/* Advancing SVG Projection Rays behind the 3D layers */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 520 480"
        fill="none"
      >
        <motion.line
          x1="40"
          y1="60"
          x2="480"
          y2="420"
          stroke="#1E4D7B"
          strokeOpacity="0.22"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
        <motion.line
          x1="480"
          y1="70"
          x2="45"
          y2="410"
          stroke="#B84A2E"
          strokeOpacity="0.22"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="260"
          cy="240"
          r="185"
          stroke="#1E4D7B"
          strokeOpacity="0.2"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
        <motion.circle
          cx="260"
          cy="240"
          r="135"
          stroke="#1E4D7B"
          strokeOpacity="0.3"
          strokeDasharray="3 6"
          initial={{ pathLength: 0, rotate: 0 }}
          animate={{ pathLength: 1, rotate: 360 }}
          transition={{
            pathLength: { duration: 1.4, ease: 'easeOut' },
            rotate: { duration: 48, repeat: Infinity, ease: 'linear' },
          }}
          style={{ transformOrigin: '260px 240px' }}
        />
      </svg>

      {/* 3D Stacked Architectural Planes */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="preserve-3d relative w-full max-w-[400px]"
      >
        {/* Back Wireframe Layer (Z = -55px) */}
        <div
          style={{ transform: 'translateZ(-55px) translate(-18px, 18px)' }}
          className="pointer-events-none absolute inset-0 border border-dashed border-[#1E4D7B]/40 bg-[#1E4D7B]/[0.03]"
        />

        {/* Mid Blueprint Grid Layer (Z = -25px) */}
        <div
          style={{ transform: 'translateZ(-25px) translate(14px, -14px)' }}
          className="pointer-events-none absolute inset-0 border border-[#B84A2E]/35 bg-[#FAF7F0]/45"
        />

        {/* Primary Spec Card (Z = 20px) */}
        <motion.div
          style={{ transform: 'translateZ(20px)' }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="preserve-3d relative border border-[#1E4D7B]/45 bg-[#FAF7F0]/96 p-7 shadow-[0_28px_60px_-24px_rgba(28,27,24,0.28)]"
        >
          {/* Animated Drawing Borders */}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute top-[-1px] right-0 left-0 h-[2px] origin-left bg-[#1E4D7B]"
          />
          <motion.span
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="absolute top-0 right-[-1px] bottom-0 w-[2px] origin-top bg-[#B84A2E]"
          />

          {/* Floating Header Tag in Z-Space */}
          <div
            style={{ transform: 'translateZ(30px)' }}
            className="mb-5 flex items-center justify-between border-b hairline pb-3"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.18em] text-[#1E4D7B] uppercase">
              PLAN // BUT3-INFO
            </span>
            <span className="font-mono text-xs text-[#B84A2E]">ECH. 1:1</span>
          </div>

          <dl
            style={{ transform: 'translateZ(24px)' }}
            className="space-y-3.5 font-mono text-sm"
          >
            <div className="flex items-baseline justify-between gap-4 border-b border-dashed hairline pb-2.5">
              <dt className="text-xs text-[#8C8578]">AUTEUR</dt>
              <dd className="text-right font-medium text-[#1C1B18]">
                {PROFILE.name}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-dashed hairline pb-2.5">
              <dt className="text-xs text-[#8C8578]">RÉALISATIONS</dt>
              <dd className="text-right font-medium text-[#1E4D7B]">
                {PROJECTS.length} projets documentés
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-dashed hairline pb-2.5">
              <dt className="text-xs text-[#8C8578]">RÉFÉRENTIEL</dt>
              <dd className="text-right font-medium text-[#B84A2E]">
                {COMPETENCES.length} compétences liées
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-xs text-[#8C8578]">GITHUB</dt>
              <dd className="text-right">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#1E4D7B] hover:underline"
                >
                  @{PROFILE.handle} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </dd>
            </div>
          </dl>

          {/* Floating 3D Pill Badge */}
          <div
            style={{ transform: 'translateZ(42px)' }}
            className="mt-6 flex items-center justify-between border border-[#1E4D7B]/30 bg-[#F5F0E6] px-4 py-2.5"
          >
            <span className="font-serif text-sm italic text-[#5C574E]">
              Architecture · Code · Terrain
            </span>
            <Link
              to="/competences"
              className="font-mono text-xs font-semibold text-[#1E4D7B] hover:underline"
            >
              Explorer →
            </Link>
          </div>
        </motion.div>

        {/* Floating Corner Coordinate Tag (Z = 60px) */}
        <motion.div
          style={{ transform: 'translateZ(60px)' }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -right-4 -bottom-5 border border-[#B84A2E]/60 bg-[#FAF7F0] px-3 py-1.5 font-mono text-xs font-medium text-[#B84A2E] shadow-md"
        >
          Z // +42.0mm · 3D INTERACTIF
        </motion.div>
      </motion.div>
    </div>
  );
}
