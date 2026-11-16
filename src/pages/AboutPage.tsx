import { motion } from 'framer-motion';
import { PROFILE, TIMELINE } from '../data/profile';
import { SectionHeader } from '../components/SectionHeader';
import { DraftingFrame } from '../components/DraftingFrame';
import { TechTag } from '../components/BlueprintBadge';

export function AboutPage() {
  return (
    <div className="space-y-16">
      <SectionHeader
        eyebrow="SEC // 03 — À PROPOS"
        title="Parcours"
        italicWord="& démarche"
        description="Mon cheminement en BUT Informatique, mes expériences sur le terrain et ma façon d’aborder la conception logicielle."
      />

      {/* Bio + Approach */}
      <div className="grid gap-7 md:grid-cols-2">
        <DraftingFrame tilt label="PROFIL" className="p-7">
          <h2 className="font-serif text-3xl font-medium text-[#1C1B18]">
            {PROFILE.name}
          </h2>
          <p className="mt-1 font-mono text-xs text-[#1E4D7B]">{PROFILE.role}</p>
          <p className="mt-4 text-base leading-relaxed text-[#5C574E]">
            {PROFILE.bio}
          </p>
        </DraftingFrame>

        <DraftingFrame
          tilt
          label="MÉTHODE DE TRAVAIL"
          cornerTone="terracotta"
          className="p-7"
        >
          <h2 className="font-serif text-3xl font-medium text-[#1C1B18]">
            L’esprit blueprint
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5C574E]">
            {PROFILE.approach}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t hairline pt-4 font-mono text-xs">
            {PROFILE.languages.map((lang) => (
              <div key={lang.name}>
                <span className="block font-semibold text-[#1C1B18]">
                  {lang.name}
                </span>
                <span className="text-xs text-[#8C8578]">{lang.level}</span>
              </div>
            ))}
          </div>
        </DraftingFrame>
      </div>

      {/* Architectural Timeline with Advancing Vertical Line */}
      <section className="space-y-8">
        <h2 className="font-display text-4xl text-[#1C1B18]">
          Frise <span className="italic text-[#1E4D7B]">chronologique</span>
        </h2>

        <div className="relative space-y-7 pl-7 sm:pl-10">
          {/* Advancing vertical blueprint axis */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 bottom-0 left-0 w-[1.5px] origin-top bg-[#1E4D7B]/45"
          />

          {TIMELINE.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              className="relative"
            >
              {/* Node marker */}
              <span
                aria-hidden="true"
                className={`absolute -left-[35px] top-7 h-3.5 w-3.5 border sm:-left-[47px] ${
                  item.type === 'Expérience'
                    ? 'border-[#B84A2E] bg-[#B84A2E]'
                    : 'border-[#1E4D7B] bg-[#FAF7F0]'
                }`}
              />

              <DraftingFrame tilt className="p-6 sm:p-7">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-[#1E4D7B] font-semibold">
                      {item.period}
                    </span>
                    <span className="text-[#8C8578]">· {item.code}</span>
                  </div>
                  <span
                    className={`border px-2.5 py-0.5 font-mono text-xs uppercase ${
                      item.type === 'Expérience'
                        ? 'border-[#B84A2E]/40 bg-[#B84A2E]/10 text-[#B84A2E]'
                        : 'border-[#1E4D7B]/35 bg-[#1E4D7B]/8 text-[#1E4D7B]'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-medium text-[#1C1B18]">
                  {item.title}
                </h3>
                <p className="mt-0.5 font-mono text-xs text-[#8C8578]">
                  {item.organization} — {item.location}
                </p>

                <p className="mt-3 text-base leading-relaxed text-[#5C574E]">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <TechTag key={tag} label={tag} />
                  ))}
                </div>
              </DraftingFrame>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <DraftingFrame label="CENTRES D’INTÉRÊT TECHNIQUES" className="p-7">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROFILE.interests.map((interest, idx) => (
            <div
              key={interest}
              className="border hairline bg-[#F5F0E6] p-4 font-mono text-sm text-[#1C1B18]"
            >
              <span className="mb-1.5 block text-xs text-[#8C8578]">
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
