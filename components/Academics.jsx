"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import Reveal, { SectionTitle } from "@/components/Reveal";
import { semesters, gradeDistribution, gradeColors, cgpa, degree, college, years } from "@/data/academics";

const lineData = semesters.map((s) => ({ name: `Sem ${s.id}`, id: s.id, sgpa: s.sgpa }));

function distFromSubjects(subjects) {
  const m = {};
  subjects.forEach((s) => (m[s.grade] = (m[s.grade] || 0) + 1));
  return Object.entries(m).map(([grade, count]) => ({ grade, count }));
}

function LineTip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/10 bg-ink2/95 px-3 py-2 text-sm shadow-xl">
      <div className="font-display font-semibold text-white">Sem {p.id}</div>
      <div className="text-gold tabular-nums">SGPA : {p.sgpa.toFixed(2)}</div>
    </div>
  );
}

function DonutTip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-lg border border-white/10 bg-ink2/95 px-3 py-2 text-sm shadow-xl">
      <span className="inline-block h-2.5 w-2.5 rounded-full mr-2 align-middle" style={{ background: p.payload.fill }} />
      <span className="font-semibold text-white">{p.payload.grade}</span>
      <span className="text-mute"> · {p.value} subjects</span>
    </div>
  );
}

export default function Academics() {
  const [sel, setSel] = useState("overall");
  const selectedSem = sel === "overall" ? null : semesters.find((s) => s.id === sel);

  const donutData = useMemo(() => {
    const base = selectedSem ? distFromSubjects(selectedSem.subjects) : gradeDistribution;
    return base.map((d) => ({ ...d, fill: gradeColors[d.grade] || "#8b8b93" }));
  }, [selectedSem]);

  const totalSubjects = donutData.reduce((a, b) => a + b.count, 0);

  return (
    <section id="academics" className="relative py-24 md:py-28 px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionTitle eyebrow="Academics" title="The Scorecard" />
        </Reveal>

        {/* summary row */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="font-display text-lg font-semibold text-white">{degree}</p>
              <p className="text-mute">
                {college} · {years}
              </p>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-display text-5xl md:text-6xl font-black text-shimmer leading-none">{cgpa}</span>
              <span className="text-mute mb-1">/ 10 CGPA</span>
            </div>
          </div>
        </Reveal>

        {/* semester selector */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            <SemBtn active={sel === "overall"} onClick={() => setSel("overall")}>
              Overall
            </SemBtn>
            {semesters.map((s) => (
              <SemBtn key={s.id} active={sel === s.id} onClick={() => setSel(s.id)}>
                Sem {s.id}
              </SemBtn>
            ))}
          </div>
        </Reveal>

        {/* charts */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* line */}
          <Reveal className="rounded-2xl glass p-5">
            <h3 className="font-display text-sm font-bold tracking-widest text-sky-400 uppercase mb-4 border-b border-white/5 pb-2">
              Overall Statistics · GPA Trend
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 16, right: 18, bottom: 4, left: -18 }}>
                  <defs>
                    <linearGradient id="gpaLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <XAxis dataKey="name" tick={{ fill: "#8b8b93", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis
                    domain={[8.5, 10]}
                    tick={{ fill: "#8b8b93", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={48}
                  />
                  <Tooltip content={<LineTip />} cursor={{ stroke: "rgba(255,255,255,0.2)", strokeDasharray: "4 4" }} />
                  <Line
                    type="monotone"
                    dataKey="sgpa"
                    stroke="url(#gpaLine)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#0a0a0b", stroke: "#38bdf8", strokeWidth: 2 }}
                    activeDot={{ r: 5 }}
                  />
                  {selectedSem && (
                    <ReferenceDot
                      x={`Sem ${selectedSem.id}`}
                      y={selectedSem.sgpa}
                      r={7}
                      fill="#FFE500"
                      stroke="#0a0a0b"
                      strokeWidth={2}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          {/* donut */}
          <Reveal delay={0.05} className="rounded-2xl glass p-5">
            <h3 className="font-display text-sm font-bold tracking-widest text-sky-400 uppercase mb-4 border-b border-white/5 pb-2">
              Grade Distribution {selectedSem ? `· Sem ${selectedSem.id}` : "· Overall"}
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="h-[240px] w-full sm:w-1/2 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      dataKey="count"
                      nameKey="grade"
                      innerRadius="62%"
                      outerRadius="92%"
                      paddingAngle={3}
                      stroke="none"
                    >
                      {donutData.map((d) => (
                        <Cell key={d.grade} fill={d.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<DonutTip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="font-display text-3xl font-black text-white tabular-nums">{totalSubjects}</div>
                    <div className="text-[11px] text-mute uppercase tracking-widest">Subjects</div>
                  </div>
                </div>
              </div>
              {/* legend */}
              <ul className="grid grid-cols-2 gap-2 w-full sm:w-1/2">
                {donutData.map((d) => (
                  <li key={d.grade} className="flex items-center gap-2 text-sm">
                    <span className="h-3 w-3 rounded-full" style={{ background: d.fill }} />
                    <span className="font-semibold text-white">{d.grade}</span>
                    <span className="text-mute">({d.count})</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* per-semester detail */}
        <AnimatePresence mode="wait">
          {selectedSem && (
            <motion.div
              key={selectedSem.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mt-5 rounded-2xl glass p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-white">Semester {selectedSem.id} · Subjects</h3>
                <span className="font-display text-sm text-gold">SGPA {selectedSem.sgpa.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                {selectedSem.subjects.map((s) => (
                  <div key={s.code} className="flex items-center gap-3 border-b border-white/5 py-2">
                    <span
                      className="shrink-0 grid place-items-center h-6 min-w-[2.1rem] px-1 rounded-md text-xs font-bold text-white"
                      style={{ background: gradeColors[s.grade] || "#8b8b93" }}
                    >
                      {s.grade}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-white/90 leading-tight">{s.name}</span>
                      <span className="block text-[11px] text-mute tabular-nums">{s.code}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-mute">
                {selectedSem.subjects.length} subjects · SGPA {selectedSem.sgpa.toFixed(2)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function SemBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-display font-semibold transition-colors ${
        active ? "bg-sky-500 text-white" : "bg-ink3 text-white/70 hover:text-white hover:bg-ink3/70 border border-white/8"
      }`}
    >
      {children}
    </button>
  );
}
