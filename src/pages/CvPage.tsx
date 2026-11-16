import { Printer, Mail, Github, MapPin } from 'lucide-react';
import { PROFILE, TIMELINE } from '../data/profile';
import { COMPETENCES } from '../data/competences';
import { PROJECTS } from '../data/projects';
import { SectionHeader } from '../components/SectionHeader';
import { DraftingFrame } from '../components/DraftingFrame';

export function CvPage() {
  return (
    <div className="space-y-8">
      <div className="no-print">
        <SectionHeader
          eyebrow="SEC // 04 — CURRICULUM VITAE"
          title="Curriculum"
          italicWord="Vitae"
          description="Version interactive optimisée pour la lecture à l’écran et l’exportation PDF directe en format A4."
          rightSlot={
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 border border-[#1E4D7B] bg-[#1E4D7B] px-4 py-2 font-mono text-xs text-[#FAF7F0] transition-colors hover:bg-[#163A5C] cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              Imprimer / Exporter en PDF
            </button>
          }
        />
      </div>

      {/* Printable A4 Sheet */}
      <DraftingFrame className="print-container mx-auto max-w-4xl p-6 sm:p-10">
        {/* CV Header */}
        <header className="flex flex-col justify-between gap-4 border-b hairline pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[11px] tracking-widest text-[#1E4D7B] uppercase">
              CURRICULUM VITAE // BUT 3 INFORMATIQUE
            </p>
            <h2 className="mt-1 font-display text-4xl text-[#1C1B18]">
              {PROFILE.name}
            </h2>
            <p className="mt-1 font-serif text-lg text-[#5C574E]">
              {PROFILE.role}
            </p>
          </div>

          <div className="space-y-1 font-mono text-xs text-[#5C574E] sm:text-right">
            <div className="flex items-center gap-1.5 sm:justify-end">
              <Mail className="h-3.5 w-3.5 text-[#1E4D7B]" />
              <span>{PROFILE.email}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:justify-end">
              <Github className="h-3.5 w-3.5 text-[#1E4D7B]" />
              <span>github.com/{PROFILE.handle}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:justify-end">
              <MapPin className="h-3.5 w-3.5 text-[#1E4D7B]" />
              <span>{PROFILE.location}</span>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="mt-6 grid gap-8 md:grid-cols-12">
          {/* Left Column */}
          <div className="space-y-6 md:col-span-4">
            <section>
              <h3 className="mb-2.5 border-b hairline pb-1 font-mono text-xs font-semibold tracking-wider text-[#1E4D7B] uppercase">
                Compétences BUT
              </h3>
              <ul className="space-y-2 text-xs">
                {COMPETENCES.map((c) => (
                  <li key={c.id}>
                    <span className="font-mono font-semibold text-[#1C1B18]">
                      {c.id} · {c.title}
                    </span>
                    <p className="text-[#5C574E]">{c.tools.slice(0, 4).join(', ')}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-2.5 border-b hairline pb-1 font-mono text-xs font-semibold tracking-wider text-[#1E4D7B] uppercase">
                Langues
              </h3>
              <ul className="space-y-1.5 text-xs">
                {PROFILE.languages.map((l) => (
                  <li key={l.name}>
                    <span className="font-medium text-[#1C1B18]">{l.name}</span>
                    <span className="block text-[#5C574E]">{l.level}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-2.5 border-b hairline pb-1 font-mono text-xs font-semibold tracking-wider text-[#1E4D7B] uppercase">
                Centres d’intérêt
              </h3>
              <ul className="space-y-1 text-xs text-[#5C574E]">
                {PROFILE.interests.map((i) => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:col-span-8">
            <section>
              <h3 className="mb-2 border-b hairline pb-1 font-mono text-xs font-semibold tracking-wider text-[#1E4D7B] uppercase">
                Profil
              </h3>
              <p className="text-sm leading-relaxed text-[#5C574E]">{PROFILE.bio}</p>
            </section>

            <section>
              <h3 className="mb-3 border-b hairline pb-1 font-mono text-xs font-semibold tracking-wider text-[#1E4D7B] uppercase">
                Formation & Expériences
              </h3>
              <div className="space-y-4">
                {TIMELINE.map((item) => (
                  <div key={item.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-serif text-base font-medium text-[#1C1B18]">
                        {item.title}
                      </h4>
                      <span className="font-mono text-[11px] text-[#1E4D7B]">
                        {item.period}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-[#8C8578]">
                      {item.organization}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#5C574E]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-3 border-b hairline pb-1 font-mono text-xs font-semibold tracking-wider text-[#1E4D7B] uppercase">
                Projets représentatifs
              </h3>
              <div className="space-y-3">
                {PROJECTS.slice(0, 4).map((p) => (
                  <div key={p.slug}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-serif text-base font-medium text-[#1C1B18]">
                        {p.title}
                      </h4>
                      <span className="font-mono text-[10px] text-[#8C8578]">
                        {p.category} · {p.year}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-[#5C574E]">
                      {p.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </DraftingFrame>
    </div>
  );
}
