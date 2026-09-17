"use client";

import Reveal, { SectionTitle } from "@/components/Reveal";
import { resolveIcon } from "@/lib/icons";
import { profile } from "@/data/profile";
import { highlights } from "@/data/journey";
import { FiMapPin, FiMail } from "react-icons/fi";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-28 px-5 md:px-8 border-t border-white/5">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <Reveal>
            <SectionTitle eyebrow="About" title="Model + system, both clean." />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-white/80">
              I graduated in May 2026 with a B.Tech in AI &amp; ML, and I'm now an AI engineer at Insignia — shipping
              production AI (RAG, agentic systems, fine-tuned models) behind real infrastructure: Kubernetes, CI/CD,
              Kafka, observability. I care as much about a look-ahead-safe backtest and an idempotent ledger as I do
              about a good prompt.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 text-base leading-relaxed text-mute">
              Outside work I build quant and agentic trading systems from scratch, grind competitive programming, and
              occasionally publish — two Springer papers so far. If it needs both a clean model and a clean system, I'm in.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <FiMapPin className="text-gold" /> {profile.location}
              </span>
              <a href={profile.socials.email} className="flex items-center gap-2 hover:text-white transition-colors">
                <FiMail className="text-gold" /> {profile.email}
              </a>
            </div>
          </Reveal>
        </div>

        {/* highlight cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
          {highlights.map((h, i) => {
            const Icon = resolveIcon(h.icon);
            return (
              <Reveal key={h.label} delay={0.1 + i * 0.08}>
                <div className="glass rounded-2xl p-5 h-full flex items-center gap-4 hover:border-gold/40 transition-colors">
                  <div className="grid place-items-center h-11 w-11 rounded-xl bg-gold/15 text-gold text-xl shrink-0">
                    <Icon />
                  </div>
                  <span className="font-display font-semibold text-white/90 leading-snug">{h.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
