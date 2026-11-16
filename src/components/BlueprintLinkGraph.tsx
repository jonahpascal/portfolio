import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { COMPETENCES, COMPETENCE_MAP } from '../data/competences';
import { PROJECTS } from '../data/projects';
import { CompetenceId } from '../types/portfolio';
import { DraftingFrame } from './DraftingFrame';
import { CategoryBadge } from './BlueprintBadge';

interface WireLine {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active: boolean;
}

export function BlueprintLinkGraph() {
  const [activeComp, setActiveComp] = useState<CompetenceId | null>('C1');
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const compRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const projRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [wires, setWires] = useState<WireLine[]>([]);

  const computeWires = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();

    const nextWires: WireLine[] = [];

    for (const proj of PROJECTS) {
      const pEl = projRefs.current[proj.slug];
      if (!pEl) continue;
      const pRect = pEl.getBoundingClientRect();
      const x2 = pRect.left - stageRect.left;
      const y2 = pRect.top - stageRect.top + pRect.height / 2;

      for (const link of proj.competences) {
        const cEl = compRefs.current[link.competenceId];
        if (!cEl) continue;
        const cRect = cEl.getBoundingClientRect();
        const x1 = cRect.right - stageRect.left;
        const y1 = cRect.top - stageRect.top + cRect.height / 2;

        const isHighlighted =
          (activeComp !== null && link.competenceId === activeComp) ||
          (activeProject !== null && proj.slug === activeProject);

        nextWires.push({
          key: `${link.competenceId}-${proj.slug}`,
          x1,
          y1,
          x2,
          y2,
          active: isHighlighted,
        });
      }
    }

    setWires(nextWires);
  };

  useLayoutEffect(() => {
    computeWires();
  }, [activeComp, activeProject]);

  useEffect(() => {
    const onResize = () => computeWires();
    window.addEventListener('resize', onResize);
    const id = setTimeout(computeWires, 250);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(id);
    };
  }, [activeComp, activeProject]);

  const selectedCompObj = activeComp ? COMPETENCE_MAP[activeComp] : null;
  const selectedProjObj = activeProject
    ? PROJECTS.find((p) => p.slug === activeProject) ?? null
    : null;

  return (
    <DraftingFrame
      label="SCHÉMA DE LIAISON // COMPÉTENCES ↔ PROJETS"
      className="p-6 sm:p-8"
      drawBorder
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="font-serif text-lg text-[#5C574E]">
          Sélectionnez une <span className="text-[#1E4D7B] font-medium">compétence</span> ou un{' '}
          <span className="text-[#B84A2E] font-medium">projet</span> pour tracer ses liaisons en direct.
        </p>
        <span className="font-mono text-xs text-[#8C8578]">
          LIAISONS DYNAMIQUES
        </span>
      </div>

      {/* Desktop Interactive Node & SVG Cable Graph */}
      <div
        ref={stageRef}
        className="relative grid gap-8 lg:grid-cols-12 lg:gap-12"
      >
        {/* SVG Animated Bézier Wires (Desktop) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        >
          {wires.map((w, idx) => {
            const dx = (w.x2 - w.x1) * 0.5;
            const d = `M ${w.x1} ${w.y1} C ${w.x1 + dx} ${w.y1}, ${
              w.x2 - dx
            } ${w.y2}, ${w.x2} ${w.y2}`;

            return (
              <motion.path
                key={w.key}
                d={d}
                fill="none"
                stroke={w.active ? '#1E4D7B' : '#1C1B18'}
                strokeOpacity={w.active ? 0.85 : 0.1}
                strokeWidth={w.active ? 2.2 : 1}
                strokeDasharray={w.active ? undefined : '4 4'}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: w.active ? 0.55 : 0.35,
                  delay: w.active ? idx * 0.02 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            );
          })}
        </svg>

        {/* Left Column: 6 Competences */}
        <div className="relative z-10 space-y-3 lg:col-span-5">
          <div className="mb-2 font-mono text-xs tracking-wider text-[#1E4D7B] uppercase">
            01 // 6 Compétences BUT
          </div>
          {COMPETENCES.map((comp) => {
            const isSelected = activeComp === comp.id;
            const isLinkedToProj =
              selectedProjObj?.competences.some(
                (c) => c.competenceId === comp.id
              ) ?? false;
            const isActive = isSelected || isLinkedToProj;

            return (
              <button
                key={comp.id}
                ref={(el) => {
                  compRefs.current[comp.id] = el;
                }}
                type="button"
                onClick={() => {
                  setActiveProject(null);
                  setActiveComp(comp.id);
                }}
                className={`flex w-full items-center justify-between gap-3 border p-4 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#1E4D7B] bg-[#1E4D7B] text-[#FAF7F0] shadow-md'
                    : isLinkedToProj
                    ? 'border-[#1E4D7B] bg-[#1E4D7B]/10 text-[#1C1B18]'
                    : 'hairline bg-[#F5F0E6] text-[#1C1B18] hover:border-[#1E4D7B]/60'
                }`}
              >
                <div>
                  <span
                    className={`block font-mono text-xs font-semibold ${
                      isSelected ? 'text-[#FAF7F0]/80' : 'text-[#1E4D7B]'
                    }`}
                  >
                    {comp.id} · {comp.accentNote}
                  </span>
                  <span className="mt-0.5 block font-serif text-lg font-medium">
                    {comp.title}
                  </span>
                </div>
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full border ${
                    isActive
                      ? 'border-[#FAF7F0] bg-[#B84A2E]'
                      : 'border-[#1E4D7B]/40 bg-transparent'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Center Spacer for Wires on Desktop */}
        <div className="hidden lg:col-span-2 lg:block" />

        {/* Right Column: Projects */}
        <div className="relative z-10 space-y-3 lg:col-span-5">
          <div className="mb-2 font-mono text-xs tracking-wider text-[#B84A2E] uppercase">
            02 // Projets associés
          </div>
          {PROJECTS.map((proj) => {
            const isSelected = activeProject === proj.slug;
            const isLinkedToComp =
              activeComp !== null &&
              proj.competences.some((c) => c.competenceId === activeComp);
            const isActive = isSelected || isLinkedToComp;

            return (
              <button
                key={proj.slug}
                ref={(el) => {
                  projRefs.current[proj.slug] = el;
                }}
                type="button"
                onClick={() => {
                  setActiveComp(null);
                  setActiveProject(proj.slug);
                }}
                className={`flex w-full items-center justify-between gap-3 border p-4 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#B84A2E] bg-[#B84A2E] text-[#FAF7F0] shadow-md'
                    : isLinkedToComp
                    ? 'border-[#1E4D7B] bg-[#1E4D7B]/10 text-[#1C1B18]'
                    : 'hairline bg-[#F5F0E6] text-[#1C1B18] opacity-65 hover:opacity-100 hover:border-[#1E4D7B]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full border ${
                      isActive
                        ? 'border-[#FAF7F0] bg-[#1E4D7B]'
                        : 'border-[#8C8578]/50 bg-transparent'
                    }`}
                  />
                  <div>
                    <span
                      className={`block font-serif text-lg font-medium ${
                        isSelected ? 'text-[#FAF7F0]' : 'text-[#1C1B18]'
                      }`}
                    >
                      {proj.title.split('—')[0].trim()}
                    </span>
                    <span
                      className={`font-mono text-xs ${
                        isSelected ? 'text-[#FAF7F0]/80' : 'text-[#5C574E]'
                      }`}
                    >
                      {proj.subtitle}
                    </span>
                  </div>
                </div>
                <CategoryBadge category={proj.category} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Inspection Panel Below the Graph */}
      <AnimatePresence mode="wait">
        {selectedCompObj && (
          <motion.div
            key={`comp-${selectedCompObj.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-8 border-t hairline pt-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="font-mono text-xs font-semibold text-[#1E4D7B]">
                  FOCUS COMPÉTENCE // {selectedCompObj.id}
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1C1B18]">
                  {selectedCompObj.title}
                </h3>
              </div>
              <Link
                to={`/competences/${selectedCompObj.id}`}
                className="inline-flex items-center gap-1.5 border border-[#1E4D7B] bg-[#1E4D7B] px-4 py-2 font-mono text-xs text-[#FAF7F0] hover:bg-[#163A5C]"
              >
                Ouvrir la fiche {selectedCompObj.id} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {PROJECTS.filter((p) =>
                p.competences.some((c) => c.competenceId === selectedCompObj.id)
              ).map((proj) => {
                const ref = proj.competences.find(
                  (c) => c.competenceId === selectedCompObj.id
                );
                return (
                  <Link
                    key={proj.slug}
                    to={`/projets/${proj.slug}`}
                    className="group block border hairline bg-[#F5F0E6] p-4 transition-colors hover:border-[#1E4D7B]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif text-lg font-medium text-[#1C1B18] group-hover:text-[#1E4D7B]">
                        {proj.title.split('—')[0].trim()}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[#8C8578] group-hover:text-[#1E4D7B]" />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#5C574E]">
                      {ref?.contribution}
                    </p>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        {selectedProjObj && (
          <motion.div
            key={`proj-${selectedProjObj.slug}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-8 border-t hairline pt-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="font-mono text-xs font-semibold text-[#B84A2E]">
                  FOCUS PROJET // {selectedProjObj.code}
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#1C1B18]">
                  {selectedProjObj.title}
                </h3>
              </div>
              <Link
                to={`/projets/${selectedProjObj.slug}`}
                className="inline-flex items-center gap-1.5 border border-[#B84A2E] bg-[#B84A2E] px-4 py-2 font-mono text-xs text-[#FAF7F0] hover:opacity-90"
              >
                Ouvrir le projet <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {selectedProjObj.competences.map((ref) => {
                const comp = COMPETENCE_MAP[ref.competenceId];
                return (
                  <Link
                    key={ref.competenceId}
                    to={`/competences/${comp.id}`}
                    className="group block border hairline bg-[#F5F0E6] p-4 transition-colors hover:border-[#1E4D7B]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm font-semibold text-[#1E4D7B]">
                        {comp.id} — {comp.title}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[#8C8578] group-hover:text-[#1E4D7B]" />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#5C574E]">
                      {ref.contribution}
                    </p>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DraftingFrame>
  );
}
