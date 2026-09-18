"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";
import StatCircle, { StatChip } from "@/components/StatCircle";
import PacmanGame from "@/components/PacmanGame";
import { FiDownload } from "react-icons/fi";

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-gold"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Avatar({ className = "" }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`relative rounded-full overflow-hidden ring-4 ring-white/10 bg-ink3 ${className}`}>
      {!broken ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/profile.jpg"
          alt=""
          className="h-full w-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="h-full w-full grid place-items-center bg-gradient-to-br from-gold/30 to-pop/20">
          <span className="font-display text-5xl font-black text-white/80">SD</span>
        </div>
      )}
    </div>
  );
}

function NameBlock({ center = false }) {
  const letters = profile.name.split("");
  return (
    <div className={center ? "text-center" : ""} data-wall="rect">
      <motion.h1
        className="font-display text-4xl md:text-6xl font-black tracking-tight"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } } }}
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block text-shimmer"
            variants={{ hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-2 font-display text-lg md:text-2xl font-semibold text-white/90"
      >
        <RotatingRole />
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className={`mt-4 text-sm md:text-base leading-relaxed text-mute ${center ? "mx-auto max-w-xl" : "max-w-xl"}`}
      >
        {profile.about}
      </motion.p>
    </div>
  );
}

export default function Hero({ stats }) {
  const ref = useRef(null);
  const gameApi = useRef(null);
  const [gameMode, setGameMode] = useState("auto");
  const [canPlay, setCanPlay] = useState(false);
  const s = stats || {};

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const apply = () => setCanPlay(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section id="home" ref={ref} className="relative min-h-screen w-full overflow-hidden bg-ink bg-grid">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-pop/10 blur-[120px]" />

      {/* Pac-Man arena (lg + fine pointer only) */}
      <PacmanGame containerRef={ref} apiRef={gameApi} onMode={setGameMode} />

      {/* ── desktop artistic layout ── */}
      <div className="relative z-10 hidden lg:block h-screen mx-auto max-w-7xl">
        <div data-wall="circle" className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
          <Avatar className="h-56 w-56 xl:h-64 xl:w-64 animate-floaty" />
        </div>

        {s.github && <StatCircle stat={s.github} floatDelay={0.6} className="top-[11%] left-[7%] h-36 w-36" />}
        <StatCircle stat={s.leetcode} floatDelay={0} className="top-[11%] right-[7%] h-44 w-44" />
        <StatCircle stat={s.codeforces} floatDelay={1.2} className="bottom-[9%] left-[6%] h-40 w-40" />
        <StatCircle stat={s.codechef} floatDelay={2.1} className="bottom-[11%] right-[8%] h-40 w-40" />

        {/* resume bubble — right-center between LeetCode and CodeChef */}
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-wall="rect"
          title="View / download my résumé"
          style={{ animationDelay: "1.6s" }}
          className="absolute z-20 top-[44%] right-[3%] -translate-y-1/2 flex items-center gap-2 rounded-full bg-pop text-ink circle-glow px-4 py-2.5 font-display font-extrabold text-sm animate-floaty hover:scale-105 transition-transform"
        >
          <FiDownload className="text-base" /> RESUME
        </a>

        <div className="absolute left-1/2 top-[56%] -translate-x-1/2 w-[38rem] max-w-[90vw] flex flex-col items-center">
          {canPlay && (
            <div className="mb-5">
              {gameMode !== "play" ? (
                <button
                  onClick={() => gameApi.current?.start()}
                  className="glass rounded-full px-5 py-2.5 text-sm font-display font-semibold text-white/90 hover:text-pop hover:border-pop/50 transition-colors flex items-center gap-2 shadow-lg shadow-pop/10"
                >
                  <span className="text-pop text-base">▶</span> Click to play Pac-Man
                </button>
              ) : (
                <div className="glass rounded-full px-5 py-2.5 text-sm font-display flex items-center gap-3">
                  <span className="text-pop font-semibold">Playing</span>
                  <span className="text-white/60">Arrow / WASD</span>
                  <button onClick={() => gameApi.current?.stop()} className="text-white/70 hover:text-white transition-colors">
                    Esc ✕
                  </button>
                </div>
              )}
            </div>
          )}
          <NameBlock center />
        </div>
      </div>

      {/* ── mobile / tablet stacked layout ── */}
      <div className="relative z-10 lg:hidden min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 gap-6">
        <Avatar className="h-44 w-44 md:h-56 md:w-56 animate-floaty" />
        <NameBlock center />
        <div className="grid grid-cols-2 gap-3 w-full max-w-lg mt-2">
          <StatChip stat={s.leetcode} />
          <StatChip stat={s.codeforces} />
          <StatChip stat={s.codechef} />
          {s.github && <StatChip stat={s.github} />}
        </div>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-pop text-ink px-6 py-3 font-display font-extrabold text-sm shadow-lg shadow-black/30"
        >
          <FiDownload className="text-base" /> RESUME
        </a>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        className="absolute bottom-5 right-6 z-20 hidden lg:flex items-center gap-2 text-xs font-display tracking-widest text-white/40 hover:text-white/80 transition-colors"
      >
        SCROLL <span className="animate-bounce">↓</span>
      </a>
    </section>
  );
}
