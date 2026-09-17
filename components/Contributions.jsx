"use client";

import Reveal from "@/components/Reveal";
import { profile } from "@/data/profile";
import { FiGithub } from "react-icons/fi";

const LEVELS = ["#1c1c22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Contributions({ data }) {
  const days = data?.days || [];
  if (!data || (data.total == null && days.length === 0)) return null;

  // group days into week-columns (rows = weekday, Sun..Sat)
  const weeks = [];
  let week = new Array(7).fill(null);
  days.forEach((d) => {
    const wd = new Date(d.date + "T00:00:00Z").getUTCDay();
    week[wd] = d;
    if (wd === 6) {
      weeks.push(week);
      week = new Array(7).fill(null);
    }
  });
  if (week.some(Boolean)) weeks.push(week);

  const monthOf = (w) => {
    const first = w.find(Boolean);
    return first ? new Date(first.date + "T00:00:00Z").getUTCMonth() : null;
  };

  return (
    <section className="relative py-16 px-5 md:px-8 border-t border-white/5">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <FiGithub className="text-xl text-white/80" />
              <h3 className="font-display text-lg font-bold text-white">
                {data.total ?? 0} contributions in {data.year}
              </h3>
              <span
                className={`h-2 w-2 rounded-full ${data.source === "live" ? "bg-emerald-500" : "bg-white/30"}`}
                title={data.source === "live" ? "live" : "cached"}
              />
            </div>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-mute hover:text-white transition-colors"
            >
              @{profile.handles.github}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-5 glass rounded-2xl p-4 overflow-x-auto">
            {/* month labels */}
            <div className="flex gap-[3px] mb-1 text-[10px] text-mute">
              {weeks.map((w, i) => {
                const m = monthOf(w);
                const show = m !== null && (i === 0 || m !== monthOf(weeks[i - 1]));
                return (
                  <div key={i} className="w-[11px] whitespace-nowrap">
                    {show ? MONTHS[m] : ""}
                  </div>
                );
              })}
            </div>
            {/* grid */}
            <div className="flex gap-[3px]">
              {weeks.map((w, i) => (
                <div key={i} className="flex flex-col gap-[3px]">
                  {w.map((d, j) => (
                    <div
                      key={j}
                      className="h-[11px] w-[11px] rounded-[2px]"
                      style={{ background: d ? LEVELS[Math.min(d.level ?? 0, 4)] : "transparent" }}
                      title={d ? `${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}` : ""}
                    />
                  ))}
                </div>
              ))}
            </div>
            {/* legend */}
            <div className="mt-3 flex items-center justify-end gap-1 text-[10px] text-mute">
              <span className="mr-1">Less</span>
              {LEVELS.map((c, i) => (
                <span key={i} className="h-[11px] w-[11px] rounded-[2px]" style={{ background: c }} />
              ))}
              <span className="ml-1">More</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
