import { PROFILE, TIMELINE } from '../data/profile';
import { SectionHeader } from '../components/SectionHeader';
import { DraftingFrame } from '../components/DraftingFrame';
import { TechTag } from '../components/BlueprintBadge';

export function AboutPage() {
  return (
    <div className="space-y-14">
      <SectionHeader
        eyebrow="SEC // 03 — À PROPOS"
        title="Parcours"
        italicWord="& démarche"
        description="Mon cheminement en BUT Informatique, mes expériences sur le terrain et ma façon d’aborder la conception logicielle."
      />

      {/* Bio + Approach */}
      <div className="grid gap-6 md:grid-cols-2">
        <DraftingFrame label="PROFIL" className="p-6">
          <h2 className="font-serif text-2xl font-medium text-[#1C1B18]">
            {PROFILE.name}
          </h2>
          <p className="mt-1 font-mono text-xs text-[#1E4D7B]">{PROFILE.role}</p>
          <p className="mt-4 leading-relaxed text-[#5C574E]">{PROFILE.bio}</p>
        </DraftingFrame>

        <DraftingFrame label="MÉTHODE DE TRAVAIL" cornerTone="terracotta" className="p-6">
          <h2 className="font-serif text-2xl font-medium text-[#1C1B18]">
            L’esprit blueprint
          </h2>
          <p className="mt-4 leading-relaxed text-[#5C574E]">{PROFILE.approach}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t hairline pt-4 font-mono text-xs">
            {PROFILE.languages.map((lang) => (
              <div key={lang.name}>
                <span className="block font-semibold text-[#1C1B18]">{lang.name}</span>
                <span className="text-[11px] text-[#8C8578]">{lang.level}</span>
              </div>
            ))}
          </div>
        </DraftingFrame>
      </div>

      {/* Architectural Timeline */}
      <section className="space-y-6">
        <h2 className="font-display text-3xl text-[#1C1B18]">
          Frise <span className="italic text-[#1E4D7B]">chronologique</span>
        </h2>

        <div className="relative space-y-6 border-l border-[#1E4D7B]/35 pl-6 sm:pl-8">
          {TIMELINE.map((item) => (
            <div key={item.id} className="relative">
              {/* Node marker */}
              <span
                aria-hidden="true"
                className={`absolute -left-[30px] top-6 h-3 w-3 border sm:-left-[38px] ${
                  item.type === 'Expérience'
                    ? 'border-[#B84A2E] bg-[#B84A2E]'
                    : 'border-[#1E4D7B] bg-[#FAF7F0]'
                }`}
              />

              <DraftingFrame className="p-5 sm:p-6">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 font-mono text-xs">
                    <span className="text-[#1E4D7B] font-semibold">{item.period}</span>
                    <span className="text-[#8C8578]">· {item.code}</span>
                  </div>
                  <span
                    className={`border px-2 py-0.5 font-mono text-[10px] uppercase ${
                      item.type === 'Expérience'
                        ? 'border-[#B84A2E]/40 bg-[#B84A2E]/10 text-[#B84A2E]'
                        : 'border-[#1E4D7B]/35 bg-[#1E4D7B]/8 text-[#1E4D7B]'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-[#1C1B18]">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-[#8C8578]">
                  {item.organization} — {item.location}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#5C574E]">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <TechTag key={tag} label={tag} />
                  ))}
                </div>
              </DraftingFrame>
            </div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <DraftingFrame label="CENTRES D’INTÉRÊT TECHNIQUES" className="p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PROFILE.interests.map((interest, idx) => (
            <div
              key={interest}
              className="border hairline bg-[#F5F0E6] p-3.5 font-mono text-xs text-[#1C1B18]"
            >
              <span className="mb-1 block text-[10px] text-[#8C8578]">
                0{idx + 1}
              </span>
              {interest}
            </div>
          ))}
        </div>
      </DraftingFrame>
    </div>
  );
}
