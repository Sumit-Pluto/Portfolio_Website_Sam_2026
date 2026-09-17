"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pac-Man overlay for the hero.
 * - The hero's profile photo, stat circles and name block (elements tagged
 *   [data-wall]) are read every frame as obstacles, so Pac-Man and the ghosts
 *   physically avoid them.
 * - Default: autonomous "flee" demo. Click ▶ Play to drive with Arrow/WASD.
 *   A ghost catching you restarts the round. Esc returns to the demo.
 * - Only runs on large screens with a fine pointer (skipped on touch/mobile).
 */
export default function PacmanGame({ containerRef, apiRef, onMode }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const gs = useRef(null); // mutable game state (avoids re-renders)
  const spawnRef = useRef(null); // lets the buttons reset the round
  const ctrl = useRef({ start: () => {}, stop: () => {} });
  const [enabled, setEnabled] = useState(false);
  const [ui, setUi] = useState({ mode: "auto", score: 0, best: 0 });

  // decide after mount to avoid hydration mismatch
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const host = containerRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");

    const COLORS = ["#ff4d4d", "#4dd2ff", "#ff9ce0", "#ffb85c"];
    const state = {
      w: 0,
      h: 0,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      pac: { x: 0, y: 0, r: 18, dir: 0, speed: 2.6 },
      ghosts: [],
      keys: {},
      mode: "auto", // 'auto' | 'play' | 'over'
      t: 0,
      startT: 0,
      score: 0,
      best: 0,
      overT: 0,
    };
    gs.current = state;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      state.w = rect.width;
      state.h = rect.height;
      canvas.width = Math.floor(rect.width * state.dpr);
      canvas.height = Math.floor(rect.height * state.dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    };
    resize();

    const spawn = () => {
      state.pac.x = state.w * 0.5;
      state.pac.y = state.h * 0.24;
      state.pac.dir = Math.PI / 2;
      const spots = [
        [state.w * 0.3, state.h * 0.34],
        [state.w * 0.7, state.h * 0.34],
        [state.w * 0.7, state.h * 0.62],
      ];
      state.ghosts = spots.map((c, i) => ({
        x: c[0],
        y: c[1],
        r: 15,
        dir: Math.random() * Math.PI * 2,
        color: COLORS[i % COLORS.length],
        speed: 1.7,
      }));
      state.startT = performance.now();
      state.score = 0;
    };
    spawn();
    spawnRef.current = spawn;

    function startGame() {
      spawn();
      state.mode = "play";
      state.startT = performance.now();
      state.score = 0;
      setUi((u) => ({ ...u, mode: "play", score: 0 }));
      if (onMode) onMode("play");
    }
    function stopGame() {
      state.mode = "auto";
      setUi((u) => ({ ...u, mode: "auto" }));
      if (onMode) onMode("auto");
    }
    ctrl.current = { start: startGame, stop: stopGame };
    if (apiRef) apiRef.current = ctrl.current;
    if (onMode) onMode("auto");

    // read the DOM walls as obstacles, relative to the host
    const readObstacles = () => {
      const hostRect = host.getBoundingClientRect();
      const els = host.querySelectorAll("[data-wall]");
      const obs = [];
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const x = r.left - hostRect.left;
        const y = r.top - hostRect.top;
        if (el.getAttribute("data-wall") === "circle") {
          obs.push({ type: "circle", cx: x + r.width / 2, cy: y + r.height / 2, r: Math.min(r.width, r.height) / 2 + 4 });
        } else {
          obs.push({ type: "rect", x: x - 4, y: y - 4, w: r.width + 8, h: r.height + 8 });
        }
      });
      return obs;
    };

    const inBounds = (x, y, r) => x > r && y > r && x < state.w - r && y < state.h - r;
    const hitCircle = (x, y, r, o) => Math.hypot(x - o.cx, y - o.cy) < r + o.r;
    const hitRect = (x, y, r, o) => {
      const nx = Math.max(o.x, Math.min(x, o.x + o.w));
      const ny = Math.max(o.y, Math.min(y, o.y + o.h));
      return Math.hypot(x - nx, y - ny) < r;
    };
    const blocked = (x, y, r, obs) =>
      !inBounds(x, y, r) || obs.some((o) => (o.type === "circle" ? hitCircle(x, y, r, o) : hitRect(x, y, r, o)));
    const insideObs = (x, y, r, obs) =>
      obs.some((o) => (o.type === "circle" ? hitCircle(x, y, r, o) : hitRect(x, y, r, o)));
    const findOpen = (r, obs) => {
      for (let k = 0; k < 60; k++) {
        const x = r + Math.random() * (state.w - 2 * r);
        const y = r + Math.random() * (state.h - 2 * r);
        if (!blocked(x, y, r, obs)) return { x, y };
      }
      return null;
    };

    const openDir = (px, py, pr, obs, away) => {
      let best = Math.random() * Math.PI * 2;
      let bestScore = -Infinity;
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2;
        const tx = px + Math.cos(a) * pr * 3.5;
        const ty = py + Math.sin(a) * pr * 3.5;
        if (blocked(tx, ty, pr, obs)) continue;
        let score = Math.random() * 0.6;
        if (away) score += Math.cos(a - Math.atan2(py - away.y, px - away.x)) * 1.4; // flee
        if (score > bestScore) {
          bestScore = score;
          best = a;
        }
      }
      return best;
    };

    const stepBody = (b, dx, dy, obs) => {
      // axis-separated movement so bodies slide along walls
      let moved = false;
      const nx = b.x + dx * b.speed;
      const ny = b.y + dy * b.speed;
      if (!blocked(nx, b.y, b.r, obs)) {
        b.x = nx;
        moved = true;
      }
      if (!blocked(b.x, ny, b.r, obs)) {
        b.y = ny;
        moved = true;
      }
      return moved;
    };

    const nearestGhost = () => {
      let g = null;
      let d = Infinity;
      for (const gh of state.ghosts) {
        const dd = Math.hypot(gh.x - state.pac.x, gh.y - state.pac.y);
        if (dd < d) {
          d = dd;
          g = gh;
        }
      }
      return g;
    };

    // ── input ──────────────────────────────────────────────────────────────
    const onKey = (e, down) => {
      const k = e.key.toLowerCase();
      const map = {
        arrowup: "up", w: "up",
        arrowdown: "down", s: "down",
        arrowleft: "left", a: "left",
        arrowright: "right", d: "right",
      };
      if (map[k]) {
        state.keys[map[k]] = down;
        if (state.mode === "play") e.preventDefault();
      }
      if (down && k === "escape" && state.mode !== "auto") {
        stopGame();
      }
    };
    const kd = (e) => onKey(e, true);
    const ku = (e) => onKey(e, false);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // ── main loop ────────────────────────────────────────────────────────────
    const loop = (now) => {
      state.t = now;
      const obs = readObstacles();
      const pac = state.pac;

      // never let a body sit trapped inside a wall (a floating bubble may drift over it)
      [pac, ...state.ghosts].forEach((b) => {
        if (insideObs(b.x, b.y, b.r, obs)) {
          const o = findOpen(b.r, obs);
          if (o) {
            b.x = o.x;
            b.y = o.y;
          }
        }
      });

      // Pac-Man movement
      let dx = 0;
      let dy = 0;
      if (state.mode === "play") {
        pac.speed = 2.6;
        if (state.keys.left) dx -= 1;
        if (state.keys.right) dx += 1;
        if (state.keys.up) dy -= 1;
        if (state.keys.down) dy += 1;
        if (dx || dy) {
          const m = Math.hypot(dx, dy);
          dx /= m;
          dy /= m;
          pac.dir = Math.atan2(dy, dx);
          stepBody(pac, dx, dy, obs);
        }
        state.score = (performance.now() - state.startT) / 1000;
      } else if (state.mode === "auto") {
        // cat & mouse: Pac-Man flees and outruns the ghosts, so it is never caught
        const ng = nearestGhost();
        const gd = ng ? Math.hypot(ng.x - pac.x, ng.y - pac.y) : Infinity;
        const scared = gd < 175;
        pac.speed = scared ? 3.4 : 2.3;
        if (scared || Math.random() < 0.02) pac.dir = openDir(pac.x, pac.y, pac.r, obs, ng);
        dx = Math.cos(pac.dir);
        dy = Math.sin(pac.dir);
        const moved = stepBody(pac, dx, dy, obs);
        if (!moved) pac.dir = openDir(pac.x, pac.y, pac.r, obs, ng);
      }

      // Ghosts chase
      for (const g of state.ghosts) {
        let a = Math.atan2(pac.y - g.y, pac.x - g.x);
        if (Math.random() < 0.05) a += (Math.random() - 0.5) * 1.2; // wobble
        const moved = stepBody(g, Math.cos(a), Math.sin(a), obs);
        if (!moved) {
          const na = openDir(g.x, g.y, g.r, obs, null);
          stepBody(g, Math.cos(na), Math.sin(na), obs);
        }
        // capture only ends the game while the user is actually playing
        if (state.mode === "play" && Math.hypot(g.x - pac.x, g.y - pac.y) < g.r + pac.r - 4) {
          state.best = Math.max(state.best, state.score);
          state.mode = "over";
          state.overT = performance.now();
          setUi((u) => ({ ...u, mode: "over", score: state.score, best: state.best }));
          if (onMode) onMode("over");
        }
      }

      draw(obs);
      rafRef.current = requestAnimationFrame(loop);
    };

    // ── rendering ────────────────────────────────────────────────────────────
    const drawGhost = (g) => {
      const r = g.r;
      ctx.save();
      ctx.shadowColor = state.mode === "over" ? "#3b5bdb" : g.color;
      ctx.shadowBlur = 16;
      ctx.fillStyle = state.mode === "over" ? "#3b5bdb" : g.color;
      ctx.beginPath();
      ctx.arc(g.x, g.y - 1, r, Math.PI, 0);
      ctx.lineTo(g.x + r, g.y + r - 2);
      const feet = 3;
      for (let i = 0; i < feet; i++) {
        const x1 = g.x + r - ((i + 0.5) * (2 * r)) / feet;
        const x2 = g.x + r - ((i + 1) * (2 * r)) / feet;
        ctx.lineTo(x1, g.y + r - 6);
        ctx.lineTo(x2, g.y + r - 2);
      }
      ctx.closePath();
      ctx.fill();
      // eyes
      const ex = Math.cos(Math.atan2(state.pac.y - g.y, state.pac.x - g.x)) * 2.2;
      const ey = Math.sin(Math.atan2(state.pac.y - g.y, state.pac.x - g.x)) * 2.2;
      for (const s of [-1, 1]) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(g.x + s * 4.5, g.y - 2, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#1b2a6b";
        ctx.beginPath();
        ctx.arc(g.x + s * 4.5 + ex, g.y - 2 + ey, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const draw = (obs) => {
      ctx.clearRect(0, 0, state.w, state.h);
      const pac = state.pac;

      // faint trail dots along the path (decorative pellets)
      // Pac-Man
      const ma = 0.28 * (0.5 + 0.5 * Math.abs(Math.sin(state.t / 90)));
      ctx.save();
      ctx.shadowColor = "rgba(255,229,0,0.55)";
      ctx.shadowBlur = 18;
      ctx.fillStyle = "#FFE500";
      ctx.beginPath();
      ctx.moveTo(pac.x, pac.y);
      ctx.arc(pac.x, pac.y, pac.r, pac.dir + ma, pac.dir + Math.PI * 2 - ma);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      for (const g of state.ghosts) drawGhost(g);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      ro.disconnect();
    };
  }, [enabled, containerRef]);

  if (!enabled) return null;

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden />
      {ui.mode === "over" && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-ink/60 backdrop-blur-sm">
          <div className="glass rounded-2xl px-8 py-6 text-center max-w-xs">
            <div className="font-display text-3xl md:text-4xl font-black text-popline">GAME OVER</div>
            <p className="mt-2 text-white/85">
              A ghost caught you after <span className="text-pop font-bold">{ui.score.toFixed(1)}s</span>.
            </p>
            <p className="text-mute text-sm mt-0.5">Best run: {ui.best.toFixed(1)}s</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => ctrl.current.start()}
                className="rounded-full bg-pop text-ink font-display font-bold px-6 py-2.5 hover:brightness-95 transition"
              >
                Play again
              </button>
              <button
                onClick={() => ctrl.current.stop()}
                className="rounded-full glass px-5 py-2.5 text-white/80 hover:text-white transition"
              >
                Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
