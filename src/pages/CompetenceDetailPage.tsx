import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { COMPETENCE_MAP } from '../data/competences';
import { PROJECTS } from '../data/projects';
import { CompetenceId } from '../types/portfolio';
import { DraftingFrame } from '../components/DraftingFrame';
import { CategoryBadge, TechTag } from '../components/BlueprintBadge';

export function CompetenceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const competence = id ? COMPETENCE_MAP[id as CompetenceId] : undefined;

  if (!competence) {
    return (
      <DraftingFrame className="p-12 text-center">
        <p className="font-mono text-xs text-[#B84A2E]">ERR // 404</p>
        <h1 className="mt-2 font-display text-5xl text-[#1C1B18]">
          Compétence introuvable
        </h1>
        <Link
          to="/competences"
          className="mt-6 inline-flex items-center gap-2 border border-[#1E4D7B] px-5 py-2.5 font-mono text-xs text-[#1E4D7B] hover:bg-[#1E4D7B] hover:text-[#FAF7F0]"
        >
          <ArrowLeft className="h-4 w-4" /> Retour aux compétences
        </Link>
      </DraftingFrame>
    );
  }

  const linkedProjects = PROJECTS.filter((p) =>
    p.competences.some((c) => c.competenceId === competence.id)
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/competences"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#5C574E] hover:text-[#1E4D7B]"
        >
          <ArrowLeft className="h-4 w-4" /> Toutes les compétences
        </Link>
        <span className="font-mono text-xs text-[#1E4D7B]">
          {competence.code} · {competence.level}
        </span>
      </div>

      {/* Header */}
      <header className="relative pb-9">
        <p className="font-mono text-xs tracking-wider text-[#B84A2E] uppercase">
          Référentiel BUT : {competence.butTitle}
        </p>
        <h1 className="mt-2 font-display text-5xl text-[#1C1B18] sm:text-6xl">
          {competence.id} — {competence.title}
        </h1>
        <p className="mt-4 max-w-3xl font-serif text-xl leading-relaxed text-[#5C574E] sm:text-2xl">
          {competence.tagline}
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 bottom-0 left-0 h-[1.5px] origin-left bg-[#1E4D7B]/35"
        />
      </header>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Savoir-faire & Outils */}
        <div className="space-y-7 lg:col-span-5">
          <DraftingFrame label="SAVOIR-FAIRE CLÉS" className="p-7">
            <p className="mb-5 text-base leading-relaxed text-[#5C574E]">
              {competence.description}
            </p>
            <ul className="space-y-3 text-base text-[#1C1B18]">
              {competence.pillars.map((pillar) => (
                <li key={pillar} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[#1E4D7B]" />
                  <span>{pillar}</span>
                </li>
              ))}
            </ul>
          </DraftingFrame>

          <DraftingFrame label="OUTILS & TECHNOLOGIES" className="p-7">
            <div className="flex flex-wrap gap-2">
              {competence.tools.map((tool) => (
                <TechTag key={tool} label={tool} />
              ))}
            </div>
          </DraftingFrame>
        </div>

        {/* Linked Projects */}
        <div className="space-y-5 lg:col-span-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-4xl text-[#1C1B18]">
              Projets <span className="italic text-[#1E4D7B]">associés</span> ({linkedProjects.length})
            </h2>
            <Link
              to={`/projets?competence=${competence.id}`}
              className="font-mono text-xs text-[#1E4D7B] hover:underline"
            >
              Filtrer dans Projets →
            </Link>
          </div>

          <div className="space-y-5">
            {linkedProjects.map((project) => {
              const ref = project.competences.find(
                (c) => c.competenceId === competence.id
              );

              return (
                <DraftingFrame
                  key={project.slug}
                  tilt
                  className="p-6"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <CategoryBadge category={project.category} />
                      <span className="font-mono text-xs text-[#8C8578]">
                        {project.code} · {project.year}
                      </span>
                    </div>
                    <Link
                      to={`/projets/${project.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[#1E4D7B] hover:underline"
                    >
                      Voir le projet <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <Link
                    to={`/projets/${project.slug}`}
                    className="font-serif text-2xl font-medium text-[#1C1B18] hover:text-[#1E4D7B]"
                  >
                    {project.title}
                  </Link>

                  {ref && (
                    <div className="mt-4 border-l-2 border-[#B84A2E] bg-[#F5F0E6] px-4 py-3">
                      <p className="font-mono text-[11px] tracking-wider text-[#B84A2E] uppercase">
                        Mise en œuvre de {competence.id}
                      </p>
                      <p className="mt-1 text-base leading-relaxed text-[#1C1B18]">
                        {ref.contribution}
                      </p>
                    </div>
                  )}
                </DraftingFrame>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
