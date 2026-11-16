import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Layers, Compass, FileText } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { COMPETENCES } from '../data/competences';
import { DraftingFrame } from '../components/DraftingFrame';
import { CategoryBadge, TechTag } from '../components/BlueprintBadge';

export function HomePage() {
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-20">
      {/* HERO SECTION */}
      <section className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2.5 border border-[#1E4D7B]/35 bg-[#FAF7F0] px-3 py-1 font-mono text-[11px] tracking-[0.15em] text-[#1E4D7B] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B84A2E]" />
            <span>{PROFILE.availability}</span>
          </div>

          <h1 className="font-display text-5xl leading-[0.98] tracking-tight text-[#1C1B18] sm:text-6xl lg:text-7xl">
            Concevoir des logiciels{' '}
            <span className="italic text-[#1E4D7B]">lisibles</span>,{' '}
            <span className="underline decoration-[#B84A2E]/45 decoration-1 underline-offset-8">
              structurés
            </span>{' '}
            et durables.
          </h1>

          <p className="max-w-xl font-serif text-lg leading-relaxed text-[#5C574E] sm:text-xl">
            {PROFILE.bio}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/projets"
              className="inline-flex items-center gap-2 border border-[#1E4D7B] bg-[#1E4D7B] px-5 py-2.5 font-mono text-xs tracking-wide text-[#FAF7F0] transition-colors hover:bg-[#163A5C]"
            >
              Explorer les projets <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              to="/competences"
              className="inline-flex items-center gap-2 border hairline bg-[#FAF7F0] px-5 py-2.5 font-mono text-xs tracking-wide text-[#1C1B18] transition-colors hover:border-[#1E4D7B] hover:text-[#1E4D7B]"
            >
              <Compass className="h-3.5 w-3.5 text-[#1E4D7B]" />
              Matrice des compétences
            </Link>

            <Link
              to="/cv"
              className="inline-flex items-center gap-2 px-3 py-2.5 font-mono text-xs text-[#5C574E] underline decoration-[#8C8578]/50 underline-offset-4 hover:text-[#1C1B18]"
            >
              <FileText className="h-3.5 w-3.5" />
              Consulter le CV
            </Link>
          </div>
        </div>

        {/* Architectural Spec Sheet Card */}
        <div className="lg:col-span-5">
          <DraftingFrame label="FICHE // PROFIL-01" className="p-6">
            <div className="mb-4 flex items-center justify-between border-b hairline pb-3">
              <span className="font-mono text-[11px] tracking-widest text-[#8C8578] uppercase">
                SPÉCIFICATIONS
              </span>
              <span className="font-mono text-[11px] text-[#1E4D7B]">
                ECH. 1:1
              </span>
            </div>

            <dl className="space-y-3 font-mono text-xs">
              <div className="flex justify-between gap-4 border-b border-dashed hairline pb-2">
                <dt className="text-[#8C8578]">CANDIDAT</dt>
                <dd className="text-right font-medium text-[#1C1B18]">
                  {PROFILE.name}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-dashed hairline pb-2">
                <dt className="text-[#8C8578]">CURSUS</dt>
                <dd className="text-right font-medium text-[#1C1B18]">
                  BUT 3 Informatique
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-dashed hairline pb-2">
                <dt className="text-[#8C8578]">PROJETS</dt>
                <dd className="text-right text-[#1E4D7B]">
                  {PROJECTS.length} réalisations (IUT · Stage · Perso)
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-dashed hairline pb-2">
                <dt className="text-[#8C8578]">COMPÉTENCES</dt>
                <dd className="text-right text-[#B84A2E]">
                  {COMPETENCES.length} pôles BUT Info
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#8C8578]">GITHUB</dt>
                <dd className="text-right">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#1E4D7B] hover:underline"
                  >
                    @{PROFILE.handle} <ArrowUpRight className="h-3 w-3" />
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-5 border-t hairline pt-4">
              <p className="font-serif text-sm italic leading-relaxed text-[#5C574E]">
                « {PROFILE.approach} »
              </p>
            </div>
          </DraftingFrame>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b hairline pb-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-[#1E4D7B] uppercase">
              SEC // 01 — SÉLECTION
            </p>
            <h2 className="mt-1 font-display text-3xl text-[#1C1B18] sm:text-4xl">
              Projets <span className="italic text-[#1E4D7B]">à la une</span>
            </h2>
          </div>
          <Link
            to="/projets"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#1E4D7B] hover:underline"
          >
            Tous les projets ({PROJECTS.length}) <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project, idx) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.3 }}
            >
              <DraftingFrame className="flex h-full flex-col justify-between p-5 transition-colors hover:border-[#1E4D7B]/55">
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-[#8C8578]">
                      {project.code}
                    </span>
                    <CategoryBadge category={project.category} />
                  </div>

                  <Link
                    to={`/projets/${project.slug}`}
                    className="group block"
                  >
                    <h3 className="font-serif text-xl font-medium leading-snug text-[#1C1B18] group-hover:text-[#1E4D7B]">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="mt-2 text-sm leading-relaxed text-[#5C574E]">
                    {project.subtitle}
                  </p>
                </div>

                <div className="mt-5 space-y-3 border-t hairline pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <TechTag key={tech} label={tech} />
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap gap-1">
                      {project.competences.map((c) => (
                        <Link
                          key={c.competenceId}
                          to={`/competences/${c.competenceId}`}
                          className="border border-[#1E4D7B]/35 bg-[#1E4D7B]/8 px-1.5 py-0.5 font-mono text-[10px] font-medium text-[#1E4D7B] hover:bg-[#1E4D7B] hover:text-[#FAF7F0] transition-colors"
                        >
                          {c.competenceId}
                        </Link>
                      ))}
                    </div>

                    <Link
                      to={`/projets/${project.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-[#B84A2E] hover:underline"
                    >
                      Détails <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </DraftingFrame>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 6 COMPETENCES OVERVIEW */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b hairline pb-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-[#1E4D7B] uppercase">
              SEC // 02 — RÉFÉRENTIEL BUT
            </p>
            <h2 className="mt-1 font-display text-3xl text-[#1C1B18] sm:text-4xl">
              Les 6 <span className="italic text-[#1E4D7B]">compétences</span>
            </h2>
          </div>
          <Link
            to="/competences"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#1E4D7B] hover:underline"
          >
            Ouvrir la matrice interactive <Layers className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPETENCES.map((comp) => {
            const linkedCount = PROJECTS.filter((p) =>
              p.competences.some((c) => c.competenceId === comp.id)
            ).length;

            return (
              <Link
                key={comp.id}
                to={`/competences/${comp.id}`}
                className="group block"
              >
                <DraftingFrame className="h-full p-5 transition-colors group-hover:border-[#1E4D7B]/60 group-hover:bg-[#FAF7F0]">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#1E4D7B]">
                      {comp.id} · {comp.accentNote}
                    </span>
                    <span className="font-mono text-[11px] text-[#8C8578]">
                      {linkedCount} projet{linkedCount > 1 ? 's' : ''}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#1C1B18] group-hover:text-[#1E4D7B]">
                    {comp.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5C574E]">
                    {comp.tagline}
                  </p>
                </DraftingFrame>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
