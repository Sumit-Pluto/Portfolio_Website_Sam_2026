"use client";

import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import { FiGithub } from "react-icons/fi";

const LOGO = {
  leetcode: SiLeetcode,
  codeforces: SiCodeforces,
  codechef: SiCodechef,
  github: FiGithub,
};

// A signature yellow/red circle that shows a live competitive-programming stat.
// `data-wall="circle"` marks it as a Pac-Man obstacle (read by the game).
export default function StatCircle({ stat, className = "", floatDelay = 0 }) {
  if (!stat) return null;
  const Logo = LOGO[stat.key];
  return (
    <a
      href={stat.href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      data-wall="circle"
      className={`group absolute z-20 grid place-items-center rounded-full bg-pop text-ink circle-glow
                  animate-floaty transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ animationDelay: `${floatDelay}s` }}
      title={`${stat.label} — open profile`}
    >
      <div className="text-center px-2 leading-tight select-none">
        {Logo && <Logo className="mx-auto text-xl md:text-2xl text-ink/85" aria-hidden />}
        <div className="mt-0.5 font-display text-[10px] md:text-xs font-bold uppercase tracking-wide text-ink/70">
          {stat.label}
        </div>
        <div className="font-display text-2xl md:text-4xl font-extrabold tabular-nums leading-none">{stat.value}</div>
        <div className="text-[10px] md:text-xs font-semibold text-ink/80">{stat.sub}</div>
      </div>
      {/* live indicator */}
      <span
        className={`absolute top-3 right-3 h-2 w-2 rounded-full ${
          stat.source === "live" ? "bg-emerald-600" : "bg-ink/40"
        }`}
        title={stat.source === "live" ? "live" : "cached"}
      />
    </a>
  );
}

// A compact chip version used on small screens (no absolute positioning / game).
export function StatChip({ stat }) {
  if (!stat) return null;
  const Logo = LOGO[stat.key];
  return (
    <a
      href={stat.href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl bg-pop text-ink px-4 py-3 shadow-lg shadow-black/30"
    >
      {Logo && <Logo className="text-2xl text-ink/85 shrink-0" aria-hidden />}
      <span className="leading-tight">
        <span className="block font-display text-xl font-extrabold tabular-nums">{stat.value}</span>
        <span className="block text-[11px] font-bold uppercase tracking-wide text-ink/70">{stat.label}</span>
        <span className="block text-xs font-semibold text-ink/80">{stat.sub}</span>
      </span>
    </a>
  );
}
