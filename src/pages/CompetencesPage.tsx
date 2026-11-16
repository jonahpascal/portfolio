import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { COMPETENCES } from '../data/competences';
import { PROJECTS } from '../data/projects';
import { SectionHeader } from '../components/SectionHeader';
import { DraftingFrame } from '../components/DraftingFrame';
import { CompetenceMatrix } from '../components/CompetenceMatrix';
import { CategoryBadge, TechTag } from '../components/BlueprintBadge';

export function CompetencesPage() {
  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="SEC // 02 — RÉFÉRENTIEL BUT 3"
        title="Compétences"
        italicWord="& correspondances"
        description="Les 6 compétences du BUT Informatique déclinées concrètement, reliées de manière bidirectionnelle aux projets réalisés à l’IUT, en stage et en autonomie."
      />

      {/* Interactive Matrix */}
      <CompetenceMatrix />

      {/* 6 Competence Cards */}
      <section className="space-y-6">
        <h2 className="font-display text-3xl text-[#1C1B18]">
          Détail des <span className="italic text-[#1E4D7B]">6 pôles</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {COMPETENCES.map((comp) => {
            const linkedProjects = PROJECTS.filter((p) =>
              p.competences.some((c) => c.competenceId === comp.id)
            );

            return (
              <DraftingFrame key={comp.id} className="flex flex-col justify-between p-6">
                <div>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-[#1E4D7B]">
                      {comp.code} · {comp.id}
                    </span>
                    <span className="font-mono text-[11px] text-[#B84A2E]">
                      {comp.level}
                    </span>
                  </div>

                  <Link to={`/competences/${comp.id}`} className="group block">
                    <h3 className="font-serif text-2xl font-medium text-[#1C1B18] group-hover:text-[#1E4D7B]">
                      {comp.title}
                    </h3>
                  </Link>
                  <p className="mt-0.5 font-mono text-[11px] text-[#8C8578]">
                    BUT : {comp.butTitle}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-[#5C574E]">
                    {comp.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {comp.tools.map((tool) => (
                      <TechTag key={tool} label={tool} />
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t hairline pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-wider text-[#8C8578] uppercase">
                      Projets associés ({linkedProjects.length})
                    </span>
                    <Link
                      to={`/competences/${comp.id}`}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-[#1E4D7B] hover:underline"
                    >
                      Fiche complète <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {linkedProjects.map((proj) => (
                      <Link
                        key={proj.slug}
                        to={`/projets/${proj.slug}`}
                        className="inline-flex items-center gap-1.5 border hairline bg-[#F5F0E6] px-2.5 py-1 text-xs text-[#1C1B18] hover:border-[#1E4D7B] hover:text-[#1E4D7B]"
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
            );
          })}
        </div>
      </section>
    </div>
  );
}
