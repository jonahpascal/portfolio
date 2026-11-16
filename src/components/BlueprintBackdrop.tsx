import { motion, useScroll, useTransform } from 'framer-motion';

export function BlueprintBackdrop({ enabled }: { enabled: boolean }) {
  const { scrollYProgress } = useScroll();
  const lineAdvance = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const rotateCompass = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const slideX = useTransform(scrollYProgress, [0, 1], [0, 120]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="no-print pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Top Scroll Progress Drafting Ruler */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 right-0 left-0 z-50 h-[2.5px] origin-left bg-[#1E4D7B]"
      />

      {/* Fullscreen Animated Blueprint Construction SVG */}
      <svg
        className="h-full w-full opacity-65"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Advancing Diagonal Construction Axis */}
        <motion.line
          x1="-80"
          y1="780"
          x2="1520"
          y2="140"
          stroke="#1E4D7B"
          strokeOpacity="0.14"
          strokeWidth="1"
          strokeDasharray="6 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />

        {/* Advancing Horizontal Reference Lines */}
        <motion.line
          x1="0"
          y1="190"
          x2="1440"
          y2="190"
          stroke="#1E4D7B"
          strokeOpacity="0.12"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, delay: 0.2, ease: 'easeOut' }}
        />

        <motion.line
          x1="1440"
          y1="710"
          x2="0"
          y2="710"
          stroke="#B84A2E"
          strokeOpacity="0.11"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.35, ease: 'easeOut' }}
        />

        {/* Scroll-Driven Advancing Vertical Axis */}
        <motion.line
          x1="96"
          y1="0"
          x2="96"
          y2="900"
          stroke="#1E4D7B"
          strokeOpacity="0.18"
          strokeWidth="1.2"
          style={{ pathLength: lineAdvance }}
        />
        <motion.line
          x1="1344"
          y1="900"
          x2="1344"
          y2="0"
          stroke="#1E4D7B"
          strokeOpacity="0.14"
          strokeWidth="1"
          style={{ pathLength: lineAdvance }}
        />

        {/* Rotating Architectural Compass Arc (Top Right) */}
        <motion.g
          style={{
            rotate: rotateCompass,
            transformOrigin: '1240px 180px',
          }}
        >
          <motion.circle
            cx="1240"
            cy="180"
            r="210"
            stroke="#1E4D7B"
            strokeOpacity="0.11"
            strokeWidth="1"
            strokeDasharray="4 8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="1240"
            cy="180"
            r="145"
            stroke="#B84A2E"
            strokeOpacity="0.12"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease: 'easeInOut' }}
          />
        </motion.g>

        {/* Scroll-Shifted Drafting Dimension Ticks */}
        <motion.g style={{ x: slideX }}>
          <line
            x1="280"
            y1="820"
            x2="680"
            y2="820"
            stroke="#1E4D7B"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
          <line
            x1="280"
            y1="812"
            x2="280"
            y2="828"
            stroke="#1E4D7B"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <line
            x1="680"
            y1="812"
            x2="680"
            y2="828"
            stroke="#1E4D7B"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
        </motion.g>
      </svg>
    </div>
  );
}
