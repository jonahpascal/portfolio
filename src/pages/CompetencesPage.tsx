import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { COMPETENCES } from '../data/competences';
import { PROJECTS } from '../data/projects';
import { SectionHeader } from '../components/SectionHeader';
import { DraftingFrame } from '../components/DraftingFrame';
import { BlueprintLinkGraph } from '../components/BlueprintLinkGraph';
import { CategoryBadge, TechTag } from '../components/BlueprintBadge';

export function CompetencesPage() {
  return (
    <div className="space-y-16">
      <SectionHeader
        eyebrow="SEC // 02 — RÉFÉRENTIEL BUT 3"
        title="Compétences"
        italicWord="& liaisons"
        description="Les 6 compétences du BUT Informatique déclinées concrètement, reliées visuellement aux projets réalisés à l’IUT, en stage et en autonomie."
      />

      {/* Interactive Blueprint Wire Graph */}
      <BlueprintLinkGraph />

      {/* 6 Competence Cards */}
      <section className="space-y-8">
        <h2 className="font-display text-4xl text-[#1C1B18]">
          Détail des <span className="italic text-[#1E4D7B]">6 pôles</span>
        </h2>

        <div className="grid gap-7 md:grid-cols-2">
          {COMPETENCES.map((comp, idx) => {
            const linkedProjects = PROJECTS.filter((p) =>
              p.competences.some((c) => c.competenceId === comp.id)
            );

            return (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <DraftingFrame
                  tilt
                  className="flex h-full flex-col justify-between p-6 sm:p-7"
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-[#1E4D7B]">
                        {comp.code} · {comp.id}
                      </span>
                      <span className="font-mono text-xs text-[#B84A2E]">
                        {comp.level}
                      </span>
                    </div>

                    <Link to={`/competences/${comp.id}`} className="group block">
                      <h3 className="font-serif text-2xl font-medium text-[#1C1B18] group-hover:text-[#1E4D7B] sm:text-3xl">
                        {comp.title}
                      </h3>
                    </Link>
                    <p className="mt-1 font-mono text-xs text-[#8C8578]">
                      BUT : {comp.butTitle}
                    </p>

                    <p className="mt-4 text-base leading-relaxed text-[#5C574E]">
                      {comp.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {comp.tools.map((tool) => (
                        <TechTag key={tool} label={tool} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t hairline pt-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-xs tracking-wider text-[#8C8578] uppercase">
                        Projets associés ({linkedProjects.length})
                      </span>
                      <Link
                        to={`/competences/${comp.id}`}
                        className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[#1E4D7B] hover:underline"
                      >
                        Fiche complète <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {linkedProjects.map((proj) => (
                        <Link
                          key={proj.slug}
                          to={`/projets/${proj.slug}`}
                          className="inline-flex items-center gap-2 border hairline bg-[#F5F0E6] px-3 py-1.5 text-sm text-[#1C1B18] hover:border-[#1E4D7B] hover:text-[#1E4D7B]"
                        >
                          <CategoryBadge category={proj.category} />
                          <span className="font-serif">
                            {proj.title.split('—')[0].trim()}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </DraftingFrame>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
