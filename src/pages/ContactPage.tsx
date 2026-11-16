import { FormEvent, useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail, Send } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { SectionHeader } from '../components/SectionHeader';
import { DraftingFrame } from '../components/DraftingFrame';

export function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject || 'Prise de contact — Portfolio'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
  };

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="SEC // 05 — CONTACT"
        title="Entrons en"
        italicWord="contact"
        description="Disponible pour un stage de fin d’études, une alternance ou un échange technique autour d’un projet."
      />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Direct Channels */}
        <div className="space-y-4 lg:col-span-5">
          <DraftingFrame label="CANAUX DIRECTS" className="p-6 space-y-5">
            <div>
              <p className="font-mono text-[10px] tracking-wider text-[#8C8578] uppercase">
                Email principal
              </p>
              <div className="mt-1.5 flex items-center justify-between gap-2 border hairline bg-[#F5F0E6] px-3 py-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="truncate font-mono text-xs text-[#1C1B18] hover:text-[#1E4D7B]"
                >
                  {PROFILE.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex shrink-0 items-center gap-1 border hairline bg-[#FAF7F0] px-2 py-1 font-mono text-[10px] text-[#1E4D7B] hover:bg-[#1E4D7B] hover:text-[#FAF7F0] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" /> Copié
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copier
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border hairline bg-[#F5F0E6] p-3.5 transition-colors hover:border-[#1E4D7B]"
              >
                <div className="flex items-center gap-3">
                  <Github className="h-4 w-4 text-[#1E4D7B]" />
                  <div>
                    <span className="block font-serif text-base text-[#1C1B18]">
                      GitHub
                    </span>
                    <span className="font-mono text-[11px] text-[#8C8578]">
                      @{PROFILE.handle}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#1E4D7B]">→</span>
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border hairline bg-[#F5F0E6] p-3.5 transition-colors hover:border-[#1E4D7B]"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4 text-[#1E4D7B]" />
                  <div>
                    <span className="block font-serif text-base text-[#1C1B18]">
                      LinkedIn
                    </span>
                    <span className="font-mono text-[11px] text-[#8C8578]">
                      {PROFILE.name}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#1E4D7B]">→</span>
              </a>
            </div>
          </DraftingFrame>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <DraftingFrame label="ENVOYER UN MESSAGE" cornerTone="terracotta" className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="subject"
                  className="mb-1.5 block font-mono text-[11px] tracking-wider text-[#5C574E] uppercase"
                >
                  Objet
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex. Proposition de stage / Opportunité"
                  className="w-full border hairline bg-[#F5F0E6] px-3 py-2 text-sm text-[#1C1B18] placeholder:text-[#8C8578] focus:border-[#1E4D7B] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block font-mono text-[11px] tracking-wider text-[#5C574E] uppercase"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Votre message..."
                  required
                  className="w-full border hairline bg-[#F5F0E6] px-3 py-2 text-sm text-[#1C1B18] placeholder:text-[#8C8578] focus:border-[#1E4D7B] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#8C8578]">
                  <Mail className="h-3.5 w-3.5" /> Ouvre votre client mail par défaut
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 border border-[#1E4D7B] bg-[#1E4D7B] px-5 py-2 font-mono text-xs text-[#FAF7F0] transition-colors hover:bg-[#163A5C] cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" /> Préparer l’email
                </button>
              </div>
            </form>
          </DraftingFrame>
        </div>
      </div>
    </div>
  );
}
