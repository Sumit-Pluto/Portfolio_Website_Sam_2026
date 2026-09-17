"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal, { SectionTitle } from "@/components/Reveal";
import { journey } from "@/data/journey";
import { FiArrowUpRight } from "react-icons/fi";

export default function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative py-24 md:py-28 px-5 md:px-8 border-t border-white/5 overflow-hidden">
      {/* decorative rotating wheel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-24 h-[440px] w-[440px] rounded-full border border-dashed border-white/10 animate-spinSlow"
      >
        <span className="absolute left-1/2 top-0 -translate-x-1/2 h-3 w-3 rounded-full bg-pop" />
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-gold" />
        <span className="absolute right-2 bottom-6 h-2 w-2 rounded-full bg-sky-400" />
      </div>

      <div className="mx-auto max-w-5xl relative">
        <Reveal>
          <SectionTitle eyebrow="Journey" title="Where I've Been" />
        </Reveal>

        <div ref={ref} className="relative mt-12">
          {/* center rail */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2">
            <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-gradient-to-b from-gold via-pop to-sky-400" />
          </div>

          {journey.map((it, i) => {
            const right = i % 2 === 1; // alternate sides on desktop
            return (
              <div key={i} className="relative mb-12 md:mb-16 md:grid md:grid-cols-2 md:gap-12">
                {/* node */}
                <span className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 z-10">
                  <span className="relative grid place-items-center">
                    <span className="absolute h-6 w-6 rounded-full bg-pop/25 animate-ping" />
                    <span className="h-3.5 w-3.5 rounded-full bg-pop ring-4 ring-ink" />
                  </span>
                </span>

                <div className={right ? "md:col-start-2 md:pl-6" : "md:col-start-1 md:pr-6 md:text-right"}>
                  <motion.div
                    initial={{ opacity: 0, x: right ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="ml-12 md:ml-0 glass rounded-2xl p-5 hover:border-gold/40 transition-colors"
                  >
                    <span className="inline-block font-display text-xs font-bold tracking-wider text-gold uppercase">
                      {it.period}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold text-white">{it.role}</h3>
                    <p className="text-sm text-white/70">
                      {it.org}
                      {it.location ? ` · ${it.location}` : ""}
                    </p>
                    <ul className={`mt-3 space-y-1.5 ${right ? "" : "md:ml-auto"}`}>
                      {it.points.map((p, j) => (
                        <li key={j} className="text-sm text-mute leading-relaxed">
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-3 flex flex-wrap gap-2 ${right ? "" : "md:justify-end"}`}>
                      {it.tags?.map((t) => (
                        <span key={t} className="rounded-md bg-ink3 border border-white/8 px-2 py-0.5 text-xs text-white/70">
                          {t}
                        </span>
                      ))}
                    </div>
                    {it.doc && (
                      <a
                        href={it.doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 ${
                          right ? "" : "md:justify-end md:w-full"
                        }`}
                      >
                        Related doc <FiArrowUpRight />
                      </a>
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
