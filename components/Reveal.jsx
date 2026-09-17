"use client";

import { motion } from "framer-motion";

// Small scroll-reveal wrapper. Usage: <Reveal><Thing/></Reveal>
export default function Reveal({ children, delay = 0, y = 24, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title, className = "" }) {
  return (
    <div className={className}>
      {eyebrow && (
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-8 bg-gold" />
          <span className="font-display text-xs font-semibold tracking-[0.25em] text-gold uppercase">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">{title}</h2>
    </div>
  );
}
