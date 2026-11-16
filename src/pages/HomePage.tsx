import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Layers, Compass, FileText } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { COMPETENCES } from '../data/competences';
import { DraftingFrame } from '../components/DraftingFrame';
import { HeroBlueprint3D } from '../components/HeroBlueprint3D';
import { CategoryBadge, TechTag } from '../components/BlueprintBadge';

export function HomePage() {
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-24">
      {/* HERO SECTION WITH 3D INTERACTIVE BLUEPRINT */}
      <section className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7 space-y-7">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-3 border border-[#1E4D7B]/40 bg-[#FAF7F0] px-4 py-1.5 font-mono text-xs tracking-[0.14em] text-[#1E4D7B] uppercase"
          >
            <span className="h-2 w-2 rounded-full bg-[#B84A2E]" />
            <span>{PROFILE.availability}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl leading-[0.96] tracking-tight text-[#1C1B18] sm:text-7xl lg:text-[5.25rem]"
          >
            Concevoir des logiciels{' '}
            <span className="italic text-[#1E4D7B]">lisibles</span>,{' '}
            <span className="underline decoration-[#B84A2E]/50 decoration-2 underline-offset-8">
              structurés
            </span>{' '}
            et durables.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl font-serif text-xl leading-relaxed text-[#5C574E] sm:text-2xl"
          >
            {PROFILE.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              to="/projets"
              className="inline-flex items-center gap-2.5 border border-[#1E4D7B] bg-[#1E4D7B] px-6 py-3.5 font-mono text-sm tracking-wide text-[#FAF7F0] transition-colors hover:bg-[#163A5C]"
            >
              Explorer les projets <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/competences"
              className="inline-flex items-center gap-2.5 border hairline bg-[#FAF7F0] px-6 py-3.5 font-mono text-sm tracking-wide text-[#1C1B18] transition-colors hover:border-[#1E4D7B] hover:text-[#1E4D7B]"
            >
              <Compass className="h-4 w-4 text-[#1E4D7B]" />
              Liaisons & Compétences
            </Link>

            <Link
              to="/cv"
              className="inline-flex items-center gap-2 px-3 py-3 font-mono text-sm text-[#5C574E] underline decoration-[#8C8578]/50 underline-offset-4 hover:text-[#1C1B18]"
            >
              <FileText className="h-4 w-4" />
              Consulter le CV
            </Link>
          </motion.div>
        </div>

        {/* 3D Interactive Wireframe Blueprint */}
        <div className="lg:col-span-5">
          <HeroBlueprint3D />
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="space-y-8">
        <div className="relative flex flex-wrap items-end justify-between gap-4 pb-5">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-[#1E4D7B] uppercase">
              SEC // 01 — SÉLECTION
            </p>
            <h2 className="mt-1.5 font-display text-4xl text-[#1C1B18] sm:text-5xl">
              Projets <span className="italic text-[#1E4D7B]">à la une</span>
            </h2>
          </div>
          <Link
            to="/projets"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#1E4D7B] hover:underline"
          >
            Tous les projets ({PROJECTS.length}) <ArrowRight className="h-4 w-4" />
          </Link>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 bottom-0 left-0 h-[1.5px] origin-left bg-[#1E4D7B]/30"
          />
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {featuredProjects.map((project, idx) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
            >
              <DraftingFrame
                tilt
                className="flex h-full flex-col justify-between p-6 sm:p-7"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-[#8C8578]">
                      {project.code}
                    </span>
                    <CategoryBadge category={project.category} />
                  </div>

                  <Link to={`/projets/${project.slug}`} className="group block">
                    <h3 className="font-serif text-2xl font-medium leading-snug text-[#1C1B18] group-hover:text-[#1E4D7B]">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="mt-3 text-base leading-relaxed text-[#5C574E]">
                    {project.subtitle}
                  </p>
                </div>

                <div className="mt-6 space-y-4 border-t hairline pt-5">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <TechTag key={tech} label={tech} />
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {project.competences.map((c) => (
                        <Link
                          key={c.competenceId}
                          to={`/competences/${c.competenceId}`}
                          className="border border-[#1E4D7B]/40 bg-[#1E4D7B]/10 px-2 py-0.5 font-mono text-xs font-medium text-[#1E4D7B] hover:bg-[#1E4D7B] hover:text-[#FAF7F0] transition-colors"
                        >
                          {c.competenceId}
                        </Link>
                      ))}
                    </div>

                    <Link
                      to={`/projets/${project.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[#B84A2E] hover:underline"
                    >
                      Détails <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </DraftingFrame>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 6 COMPETENCES OVERVIEW */}
      <section className="space-y-8">
        <div className="relative flex flex-wrap items-end justify-between gap-4 pb-5">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-[#1E4D7B] uppercase">
              SEC // 02 — RÉFÉRENTIEL BUT
            </p>
            <h2 className="mt-1.5 font-display text-4xl text-[#1C1B18] sm:text-5xl">
              Les 6 <span className="italic text-[#1E4D7B]">compétences</span>
            </h2>
          </div>
          <Link
            to="/competences"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#1E4D7B] hover:underline"
          >
            Ouvrir le schéma des liaisons <Layers className="h-4 w-4" />
          </Link>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 bottom-0 left-0 h-[1.5px] origin-left bg-[#1E4D7B]/30"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COMPETENCES.map((comp, idx) => {
            const linkedCount = PROJECTS.filter((p) =>
              p.competences.some((c) => c.competenceId === comp.id)
            ).length;

            return (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <Link to={`/competences/${comp.id}`} className="group block h-full">
                  <DraftingFrame tilt className="h-full p-6 sm:p-7">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-[#1E4D7B]">
                        {comp.id} · {comp.accentNote}
                      </span>
                      <span className="font-mono text-xs text-[#8C8578]">
                        {linkedCount} projet{linkedCount > 1 ? 's' : ''}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-[#1C1B18] group-hover:text-[#1E4D7B]">
                      {comp.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-[#5C574E]">
                      {comp.tagline}
                    </p>
                  </DraftingFrame>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
