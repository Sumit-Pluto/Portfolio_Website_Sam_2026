"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Reveal, { SectionTitle } from "@/components/Reveal";
import { featuredProjects } from "@/data/skills";
import { profile } from "@/data/profile";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { FaStar, FaCodeBranch } from "react-icons/fa6";

export default function Projects({ github }) {
  const repos = github?.repos || [];
  const live = github?.ok && repos.length > 0;

  const featured = useMemo(() => {
    return featuredProjects.map((f) => {
      const gh = f.repo ? repos.find((r) => r.name.toLowerCase() === f.repo.toLowerCase()) : null;
      return {
        ...f,
        url: gh?.url || (f.repo ? `https://github.com/${profile.handles.github}/${f.repo}` : ""),
        homepage: f.href || gh?.homepage || "",
        stars: gh?.stars || 0,
        forks: gh?.forks || 0,
        language: gh?.language || "",
        linked: !!gh,
      };
    });
  }, [repos]);

  const featuredRepoNames = new Set(featuredProjects.map((f) => f.repo?.toLowerCase()).filter(Boolean));
  const extras = repos.filter((r) => !featuredRepoNames.has(r.name.toLowerCase())).slice(0, 6);

  return (
    <section id="projects" className="relative py-24 md:py-28 px-5 md:px-8 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <Reveal>
            <SectionTitle eyebrow="Projects" title="Things I've Built" />
          </Reveal>
          <Reveal delay={0.08}>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-display font-semibold text-white/80 hover:text-pop transition-colors"
            >
              <FiGithub />
              {live ? (
                <span className="flex items-center gap-2">
                  @{profile.handles.github}
                  <span className="h-2 w-2 rounded-full bg-emerald-500" title="live from GitHub" />
                </span>
              ) : (
                <span>@{profile.handles.github}</span>
              )}
            </a>
          </Reveal>
        </div>

        {/* featured cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative glass rounded-2xl p-6 h-full flex flex-col hover:border-gold/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-bold text-white leading-snug">{p.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-mute shrink-0">
                    {p.linked && p.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <FaStar className="text-gold" /> {p.stars}
                      </span>
                    )}
                    {p.linked && p.forks > 0 && (
                      <span className="flex items-center gap-1">
                        <FaCodeBranch /> {p.forks}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-mute flex-1">{p.blurb}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-ink3 border border-white/8 px-2 py-0.5 text-xs text-white/70">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-4 text-sm font-semibold">
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-white/80 hover:text-pop transition-colors"
                    >
                      <FiGithub /> Code
                    </a>
                  )}
                  {p.homepage && (
                    <a
                      href={p.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-white/80 hover:text-pop transition-colors"
                    >
                      <FiExternalLink /> Live
                    </a>
                  )}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* extra repos pulled live from GitHub */}
        {extras.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-mute mb-3">More on GitHub</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {extras.map((r) => (
                  <a
                    key={r.name}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass rounded-xl p-4 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-semibold text-white/90 truncate">{r.name}</span>
                      {r.stars > 0 && (
                        <span className="flex items-center gap-1 text-xs text-mute">
                          <FaStar className="text-gold" /> {r.stars}
                        </span>
                      )}
                    </div>
                    {r.description && <p className="mt-1 text-xs text-mute line-clamp-2">{r.description}</p>}
                    {r.language && <p className="mt-2 text-[11px] text-white/50">{r.language}</p>}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
