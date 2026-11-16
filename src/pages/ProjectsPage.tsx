import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight, FilterX } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { COMPETENCES } from '../data/competences';
import { CompetenceId, ProjectCategory } from '../types/portfolio';
import { SectionHeader } from '../components/SectionHeader';
import { DraftingFrame } from '../components/DraftingFrame';
import { CategoryBadge, TechTag } from '../components/BlueprintBadge';

const CATEGORIES: Array<'Tous' | ProjectCategory> = ['Tous', 'IUT', 'Stage', 'Perso'];

export function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialComp = (searchParams.get('competence') as CompetenceId | null) || 'Toutes';

  const [category, setCategory] = useState<'Tous' | ProjectCategory>('Tous');
  const [competenceFilter, setCompetenceFilter] = useState<'Toutes' | CompetenceId>(
    initialComp
  );
  const [query, setQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (category !== 'Tous' && p.category !== category) return false;
      if (
        competenceFilter !== 'Toutes' &&
        !p.competences.some((c) => c.competenceId === competenceFilter)
      ) {
        return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${p.title} ${p.subtitle} ${p.stack.join(' ')} ${p.context}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [category, competenceFilter, query]);

  const handleCompChange = (val: 'Toutes' | CompetenceId) => {
    setCompetenceFilter(val);
    if (val === 'Toutes') {
      searchParams.delete('competence');
    } else {
      searchParams.set('competence', val);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const resetFilters = () => {
    setCategory('Tous');
    setQuery('');
    handleCompChange('Toutes');
  };

  return (
    <div>
      <SectionHeader
        eyebrow="SEC // 01 — RÉALISATIONS"
        title="Projets"
        italicWord="& études de cas"
        description="Projets académiques (SAÉ à l’IUT), réalisations en stage et projets personnels. Chaque fiche détaille l’architecture et les compétences mobilisées."
        rightSlot={
          <span className="font-mono text-xs text-[#5C574E]">
            {filteredProjects.length} / {PROJECTS.length} AFFICHÉS
          </span>
        }
      />

      {/* Filter Bar */}
      <DraftingFrame className="mb-8 p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-2 font-mono text-[11px] text-[#8C8578] uppercase">
              Origine :
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`border px-3 py-1 font-mono text-xs transition-colors cursor-pointer ${
                  category === cat
                    ? 'border-[#1E4D7B] bg-[#1E4D7B] text-[#FAF7F0]'
                    : 'hairline bg-[#F5F0E6] text-[#5C574E] hover:border-[#1E4D7B]/50 hover:text-[#1C1B18]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Competence & Search */}
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 font-mono text-xs text-[#5C574E]">
              <span className="text-[11px] text-[#8C8578] uppercase">Compétence :</span>
              <select
                value={competenceFilter}
                onChange={(e) =>
                  handleCompChange(e.target.value as 'Toutes' | CompetenceId)
                }
                className="border hairline bg-[#F5F0E6] px-2.5 py-1 font-mono text-xs text-[#1C1B18] focus:border-[#1E4D7B] focus:outline-none"
              >
                <option value="Toutes">Toutes (C1–C6)</option>
                {COMPETENCES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} — {c.title}
                  </option>
                ))}
              </select>
            </label>

            <div className="relative flex-1 sm:w-52 sm:flex-none">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[#8C8578]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher (React, SQL...)"
                className="w-full border hairline bg-[#F5F0E6] py-1 pr-3 pl-8 font-mono text-xs text-[#1C1B18] placeholder:text-[#8C8578] focus:border-[#1E4D7B] focus:outline-none"
              />
            </div>

            {(category !== 'Tous' || competenceFilter !== 'Toutes' || query) && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 font-mono text-[11px] text-[#B84A2E] hover:underline cursor-pointer"
              >
                <FilterX className="h-3.5 w-3.5" /> Réinitialiser
              </button>
            )}
          </div>
        </div>
      </DraftingFrame>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <DraftingFrame className="p-10 text-center">
          <p className="font-serif text-lg text-[#5C574E]">
            Aucun projet ne correspond à ces critères.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 border border-[#1E4D7B] px-4 py-1.5 font-mono text-xs text-[#1E4D7B] hover:bg-[#1E4D7B] hover:text-[#FAF7F0] cursor-pointer"
          >
            Afficher tous les projets
          </button>
        </DraftingFrame>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.25 }}
            >
              <DraftingFrame className="flex h-full flex-col justify-between p-6 transition-colors hover:border-[#1E4D7B]/60">
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] text-[#8C8578]">
                        {project.code}
                      </span>
                      <span className="font-mono text-[11px] text-[#8C8578]">
                        · {project.year}
                      </span>
                    </div>
                    <CategoryBadge category={project.category} />
                  </div>

                  <Link to={`/projets/${project.slug}`} className="group block">
                    <h2 className="font-serif text-2xl font-medium text-[#1C1B18] group-hover:text-[#1E4D7B]">
                      {project.title}
                    </h2>
                  </Link>

                  <p className="mt-1.5 text-sm font-medium text-[#5C574E]">
                    {project.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5C574E]">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 space-y-4 border-t hairline pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <TechTag key={tech} label={tech} />
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="mr-1 font-mono text-[10px] text-[#8C8578] uppercase">
                        Compétences :
                      </span>
                      {project.competences.map((c) => (
                        <Link
                          key={c.competenceId}
                          to={`/competences/${c.competenceId}`}
                          className={`border px-1.5 py-0.5 font-mono text-[10px] font-medium transition-colors ${
                            competenceFilter === c.competenceId
                              ? 'border-[#B84A2E] bg-[#B84A2E] text-[#FAF7F0]'
                              : 'border-[#1E4D7B]/35 bg-[#1E4D7B]/8 text-[#1E4D7B] hover:bg-[#1E4D7B] hover:text-[#FAF7F0]'
                          }`}
                        >
                          {c.competenceId}
                        </Link>
                      ))}
                    </div>

                    <Link
                      to={`/projets/${project.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[#1E4D7B] hover:underline"
                    >
                      Ouvrir la fiche <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </DraftingFrame>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
