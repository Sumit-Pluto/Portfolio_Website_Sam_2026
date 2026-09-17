"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/profile";
import { FiGithub, FiLinkedin, FiMail, FiCopy, FiCheck } from "react-icons/fi";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";

const socials = [
  { label: "GitHub", href: profile.socials.github, Icon: FiGithub },
  { label: "LinkedIn", href: profile.socials.linkedin, Icon: FiLinkedin },
  { label: "LeetCode", href: profile.socials.leetcode, Icon: SiLeetcode },
  { label: "Codeforces", href: profile.socials.codeforces, Icon: SiCodeforces },
  { label: "CodeChef", href: profile.socials.codechef, Icon: SiCodechef },
  { label: "Email", href: profile.socials.email, Icon: FiMail },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-5 md:px-8 border-t border-white/5 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[130px]" />
      <div className="mx-auto max-w-3xl text-center relative">
        <Reveal>
          <p className="font-display text-xs font-semibold tracking-[0.3em] text-gold uppercase">Contact</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-black tracking-tight">
            Let's build something <span className="text-shimmer">great.</span>
          </h2>
          <p className="mt-5 text-mute md:text-lg">
            Open to AI/ML, MLOps and full-stack roles. Have an idea, a role, or just want to talk shop? My inbox is open.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={profile.socials.email}
              className="rounded-full bg-pop text-ink font-display font-bold px-7 py-3 hover:brightness-95 transition"
            >
              Say hello
            </a>
            <button
              onClick={copy}
              className="rounded-full glass px-6 py-3 font-display font-semibold text-white/85 hover:text-white transition inline-flex items-center gap-2"
            >
              {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
              {copied ? "Copied!" : profile.email}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                aria-label={s.label}
                title={s.label}
                className="grid place-items-center h-12 w-12 rounded-xl glass text-lg text-white/80 hover:text-pop hover:border-pop/40 transition-colors"
              >
                <s.Icon />
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>

      <footer className="mt-20 border-t border-white/5 pt-6 text-center text-xs text-mute">
        <p>
          © {new Date().getFullYear()} {profile.name} · Built with Next.js, Tailwind CSS & Framer Motion.
        </p>
        <p className="mt-1">Tip: press ▶ in the hero and play some Pac-Man.</p>
      </footer>
    </section>
  );
}
