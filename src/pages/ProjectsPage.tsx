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
      <DraftingFrame className="mb-10 p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 font-mono text-xs text-[#8C8578] uppercase">
              Origine :
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`border px-3.5 py-1.5 font-mono text-xs transition-colors cursor-pointer ${
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
              <span className="text-xs text-[#8C8578] uppercase">Compétence :</span>
              <select
                value={competenceFilter}
                onChange={(e) =>
                  handleCompChange(e.target.value as 'Toutes' | CompetenceId)
                }
                className="border hairline bg-[#F5F0E6] px-3 py-1.5 font-mono text-xs text-[#1C1B18] focus:border-[#1E4D7B] focus:outline-none"
              >
                <option value="Toutes">Toutes (C1–C6)</option>
                {COMPETENCES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} — {c.title}
                  </option>
                ))}
              </select>
            </label>

            <div className="relative flex-1 sm:w-56 sm:flex-none">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8C8578]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher (React, SQL...)"
                className="w-full border hairline bg-[#F5F0E6] py-1.5 pr-3 pl-9 font-mono text-xs text-[#1C1B18] placeholder:text-[#8C8578] focus:border-[#1E4D7B] focus:outline-none"
              />
            </div>

            {(category !== 'Tous' || competenceFilter !== 'Toutes' || query) && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#B84A2E] hover:underline cursor-pointer"
              >
                <FilterX className="h-4 w-4" /> Réinitialiser
              </button>
            )}
          </div>
        </div>
      </DraftingFrame>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <DraftingFrame className="p-12 text-center">
          <p className="font-serif text-xl text-[#5C574E]">
            Aucun projet ne correspond à ces critères.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 border border-[#1E4D7B] px-5 py-2 font-mono text-xs text-[#1E4D7B] hover:bg-[#1E4D7B] hover:text-[#FAF7F0] cursor-pointer"
          >
            Afficher tous les projets
          </button>
        </DraftingFrame>
      ) : (
        <div className="grid gap-7 md:grid-cols-2">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
            >
              <DraftingFrame
                tilt
                className="flex h-full flex-col justify-between p-6 sm:p-8"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#8C8578]">
                        {project.code}
                      </span>
                      <span className="font-mono text-xs text-[#8C8578]">
                        · {project.year}
                      </span>
                    </div>
                    <CategoryBadge category={project.category} />
                  </div>

                  <Link to={`/projets/${project.slug}`} className="group block">
                    <h2 className="font-serif text-2xl font-medium text-[#1C1B18] group-hover:text-[#1E4D7B] sm:text-3xl">
                      {project.title}
                    </h2>
                  </Link>

                  <p className="mt-2 text-base font-medium text-[#5C574E]">
                    {project.subtitle}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-[#5C574E]">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 space-y-4 border-t hairline pt-5">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <TechTag key={tech} label={tech} />
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="mr-1 font-mono text-[11px] text-[#8C8578] uppercase">
                        Compétences :
                      </span>
                      {project.competences.map((c) => (
                        <Link
                          key={c.competenceId}
                          to={`/competences/${c.competenceId}`}
                          className={`border px-2 py-0.5 font-mono text-xs font-medium transition-colors ${
                            competenceFilter === c.competenceId
                              ? 'border-[#B84A2E] bg-[#B84A2E] text-[#FAF7F0]'
                              : 'border-[#1E4D7B]/40 bg-[#1E4D7B]/10 text-[#1E4D7B] hover:bg-[#1E4D7B] hover:text-[#FAF7F0]'
                          }`}
                        >
                          {c.competenceId}
                        </Link>
                      ))}
                    </div>

                    <Link
                      to={`/projets/${project.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#1E4D7B] hover:underline"
                    >
                      Ouvrir la fiche <ArrowUpRight className="h-4 w-4" />
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
