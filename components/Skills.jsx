"use client";

import { motion } from "framer-motion";
import Reveal, { SectionTitle } from "@/components/Reveal";
import { resolveIcon } from "@/lib/icons";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <section id="work" className="relative py-24 md:py-28 px-5 md:px-8 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionTitle eyebrow="Skills" title="The Toolbox" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.05}>
              <div className="glass rounded-2xl p-5 h-full hover:border-white/15 transition-colors">
                <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold mb-4">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((it) => {
                    const Icon = resolveIcon(it.icon);
                    return (
                      <motion.span
                        key={it.name}
                        whileHover={{ y: -3 }}
                        className="group flex items-center gap-2 rounded-xl bg-ink3 border border-white/8 px-3 py-2 text-sm"
                      >
                        <Icon className="text-base" style={{ color: it.color }} />
                        <span className="text-white/85">{it.name}</span>
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
