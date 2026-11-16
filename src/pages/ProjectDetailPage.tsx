import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { PROJECT_MAP } from '../data/projects';
import { COMPETENCE_MAP } from '../data/competences';
import { DraftingFrame } from '../components/DraftingFrame';
import { CategoryBadge, TechTag } from '../components/BlueprintBadge';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? PROJECT_MAP[slug] : undefined;

  if (!project) {
    return (
      <DraftingFrame className="p-10 text-center">
        <p className="font-mono text-xs text-[#B84A2E]">ERR // 404</p>
        <h1 className="mt-2 font-display text-4xl text-[#1C1B18]">
          Projet introuvable
        </h1>
        <Link
          to="/projets"
          className="mt-6 inline-flex items-center gap-2 border border-[#1E4D7B] px-4 py-2 font-mono text-xs text-[#1E4D7B] hover:bg-[#1E4D7B] hover:text-[#FAF7F0]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Retour aux projets
        </Link>
      </DraftingFrame>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/projets"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#5C574E] hover:text-[#1E4D7B]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Tous les projets
        </Link>
        <span className="font-mono text-xs text-[#8C8578]">{project.code}</span>
      </div>

      {/* Header */}
      <header className="border-b hairline pb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <CategoryBadge category={project.category} />
          <span className="font-mono text-xs text-[#8C8578]">
            {project.year} · {project.duration}
          </span>
          <span className="font-mono text-xs text-[#1E4D7B]">
            {project.role}
          </span>
        </div>

        <h1 className="font-display text-4xl leading-tight text-[#1C1B18] sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-3xl font-serif text-xl text-[#5C574E]">
          {project.subtitle}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#1C1B18]/30 bg-[#FAF7F0] px-4 py-2 font-mono text-xs text-[#1C1B18] hover:border-[#1E4D7B] hover:text-[#1E4D7B]"
            >
              <Github className="h-3.5 w-3.5" /> Code source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#1E4D7B] bg-[#1E4D7B] px-4 py-2 font-mono text-xs text-[#FAF7F0] hover:bg-[#163A5C]"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Voir en ligne
            </a>
          )}
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <DraftingFrame label="01 // CONTEXTE & OBJECTIF" className="p-6">
            <p className="leading-relaxed text-[#1C1B18]">{project.context}</p>
            <p className="mt-4 leading-relaxed text-[#5C574E]">{project.summary}</p>
          </DraftingFrame>

          <DraftingFrame label="02 // ARCHITECTURE & CHOIX TECHNIQUES" className="p-6">
            <ul className="space-y-2.5 text-sm leading-relaxed text-[#1C1B18]">
              {project.architecture.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#1E4D7B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </DraftingFrame>

          <DraftingFrame label="03 // RÉSULTATS & BILAN" className="p-6">
            <ul className="space-y-2.5 text-sm leading-relaxed text-[#1C1B18]">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#B84A2E]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </DraftingFrame>
        </div>

        {/* Sidebar: Stack + Linked Competences */}
        <aside className="space-y-6 lg:col-span-5">
          <DraftingFrame label="STACK TECHNIQUE" className="p-6">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <TechTag key={tech} label={tech} />
              ))}
            </div>
          </DraftingFrame>

          <DraftingFrame
            label="COMPÉTENCES MOBILISÉES"
            cornerTone="terracotta"
            className="p-6"
          >
            <p className="mb-4 font-serif text-sm text-[#5C574E]">
              Cliquez sur une compétence pour voir tous les autres projets qui l’illustrent.
            </p>
            <div className="space-y-3">
              {project.competences.map((ref) => {
                const comp = COMPETENCE_MAP[ref.competenceId];
                return (
                  <Link
                    key={ref.competenceId}
                    to={`/competences/${comp.id}`}
                    className="group block border hairline bg-[#F5F0E6] p-3.5 transition-colors hover:border-[#1E4D7B]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-[#1E4D7B]">
                        {comp.id} — {comp.title}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#8C8578] group-hover:text-[#1E4D7B]" />
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#5C574E]">
                      {ref.contribution}
                    </p>
                  </Link>
                );
              })}
            </div>
          </DraftingFrame>
        </aside>
      </div>
    </div>
  );
}
