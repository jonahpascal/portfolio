import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { COMPETENCES, COMPETENCE_MAP } from '../data/competences';
import { PROJECTS } from '../data/projects';
import { CompetenceId, Project } from '../types/portfolio';
import { DraftingFrame } from './DraftingFrame';
import { CategoryBadge } from './BlueprintBadge';

interface ActiveCell {
  project: Project;
  competenceId: CompetenceId;
  contribution: string;
}

export function CompetenceMatrix() {
  const [hoveredComp, setHoveredComp] = useState<CompetenceId | null>(null);
  const [hoveredProj, setHoveredProj] = useState<string | null>(null);
  const [selectedCell, setSelectedCell] = useState<ActiveCell | null>(null);

  return (
    <DraftingFrame label="MATRICE // PROJETS × COMPÉTENCES" className="p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="font-serif text-base text-[#5C574E]">
          Survolez ou cliquez sur une intersection pour inspecter le lien entre un projet et une compétence.
        </p>
        <span className="font-mono text-[11px] text-[#8C8578]">
          {PROJECTS.length} PROJETS · {COMPETENCES.length} COMPÉTENCES
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b hairline">
              <th className="py-3 pr-4 font-mono text-[11px] font-medium tracking-wider text-[#8C8578] uppercase">
                Projet / Origine
              </th>
              {COMPETENCES.map((comp) => {
                const isColActive = hoveredComp === comp.id;
                return (
                  <th
                    key={comp.id}
                    onMouseEnter={() => setHoveredComp(comp.id)}
                    onMouseLeave={() => setHoveredComp(null)}
                    className={`px-2 py-3 text-center transition-colors ${
                      isColActive ? 'bg-[#1E4D7B]/10' : ''
                    }`}
                  >
                    <Link
                      to={`/competences/${comp.id}`}
                      className="group inline-flex flex-col items-center gap-0.5"
                      title={comp.title}
                    >
                      <span className="font-mono text-xs font-semibold text-[#1E4D7B] group-hover:underline">
                        {comp.id}
                      </span>
                      <span className="max-w-[90px] truncate font-mono text-[9px] text-[#5C574E]">
                        {comp.title.split(' ')[0]}
                      </span>
                    </Link>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {PROJECTS.map((project) => {
              const isRowActive = hoveredProj === project.slug;
              return (
                <tr
                  key={project.slug}
                  onMouseEnter={() => setHoveredProj(project.slug)}
                  onMouseLeave={() => setHoveredProj(null)}
                  className={`border-b hairline last:border-b-0 transition-colors ${
                    isRowActive ? 'bg-[#1E4D7B]/6' : ''
                  }`}
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <CategoryBadge category={project.category} />
                      <Link
                        to={`/projets/${project.slug}`}
                        className="font-serif text-base font-medium text-[#1C1B18] hover:text-[#1E4D7B] hover:underline"
                      >
                        {project.title.split('—')[0].trim()}
                      </Link>
                    </div>
                  </td>

                  {COMPETENCES.map((comp) => {
                    const ref = project.competences.find(
                      (c) => c.competenceId === comp.id
                    );
                    const isColActive = hoveredComp === comp.id;
                    const isSelected =
                      selectedCell?.project.slug === project.slug &&
                      selectedCell?.competenceId === comp.id;

                    return (
                      <td
                        key={comp.id}
                        onMouseEnter={() => {
                          setHoveredComp(comp.id);
                          if (ref) {
                            setSelectedCell({
                              project,
                              competenceId: comp.id,
                              contribution: ref.contribution,
                            });
                          }
                        }}
                        onMouseLeave={() => setHoveredComp(null)}
                        className={`px-2 py-3 text-center transition-colors ${
                          isColActive && !isRowActive ? 'bg-[#1E4D7B]/6' : ''
                        }`}
                      >
                        {ref ? (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedCell({
                                project,
                                competenceId: comp.id,
                                contribution: ref.contribution,
                              })
                            }
                            aria-label={`${project.title} — ${comp.id}`}
                            className={`inline-flex h-6 w-6 items-center justify-center border font-mono text-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#B84A2E] bg-[#B84A2E] text-[#FAF7F0] scale-110'
                                : 'border-[#1E4D7B]/50 bg-[#1E4D7B]/12 text-[#1E4D7B] hover:bg-[#1E4D7B] hover:text-[#FAF7F0]'
                            }`}
                          >
                            ✓
                          </button>
                        ) : (
                          <span className="font-mono text-xs text-[#8C8578]/35">
                            ·
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Live Inspection Bar */}
      <div className="mt-5 border-t hairline pt-4">
        {selectedCell ? (
          <div className="flex flex-col justify-between gap-3 bg-[#F5F0E6] p-3.5 border hairline sm:flex-row sm:items-center">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span className="font-semibold text-[#B84A2E]">
                  {selectedCell.competenceId} ·{' '}
                  {COMPETENCE_MAP[selectedCell.competenceId].title}
                </span>
                <span className="text-[#8C8578]">→</span>
                <span className="font-medium text-[#1E4D7B]">
                  {selectedCell.project.title}
                </span>
              </div>
              <p className="text-sm text-[#1C1B18]">
                {selectedCell.contribution}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                to={`/projets/${selectedCell.project.slug}`}
                className="inline-flex items-center gap-1 border border-[#1E4D7B]/40 bg-[#FAF7F0] px-2.5 py-1 font-mono text-[11px] text-[#1E4D7B] hover:bg-[#1E4D7B] hover:text-[#FAF7F0] transition-colors"
              >
                Projet <ArrowUpRight className="h-3 w-3" />
              </Link>
              <Link
                to={`/competences/${selectedCell.competenceId}`}
                className="inline-flex items-center gap-1 border hairline bg-[#FAF7F0] px-2.5 py-1 font-mono text-[11px] text-[#1C1B18] hover:border-[#1E4D7B] transition-colors"
              >
                {selectedCell.competenceId} <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ) : (
          <p className="font-mono text-xs text-[#8C8578]">
            TIP // Survolez une case marquée ✓ pour afficher l’apport exact du projet sur la compétence.
          </p>
        )}
      </div>
    </DraftingFrame>
  );
}
