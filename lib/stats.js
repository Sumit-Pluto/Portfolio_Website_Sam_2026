import { profile } from "@/data/profile";

const REVALIDATE = 3600;

export async function getCodeforces() {
  const fb = profile.statsFallback.codeforces;
  const handle = profile.handles.codeforces;
  try {
    const res = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`, {
      next: { revalidate: REVALIDATE },
    });
    const j = await res.json();
    const u = j?.status === "OK" ? j.result?.[0] : null;
    if (!u) throw new Error("cf");
    const rank = (u.rank || fb.sub).replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      key: "codeforces",
      label: "Codeforces",
      value: String(u.rating ?? fb.value),
      sub: rank,
      extra: u.maxRating ? `max ${u.maxRating}` : "",
      href: fb.href,
      source: "live",
    };
  } catch {
    return { key: "codeforces", ...fb, extra: "", source: "fallback" };
  }
}

const LC_QUERY = `
query userStats($username: String!) {
  matchedUser(username: $username) {
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
  }
}`;

export async function getLeetcode() {
  const fb = profile.statsFallback.leetcode;
  const username = profile.handles.leetcode;
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/u/${username}/`,
        "User-Agent": "Mozilla/5.0 (portfolio stats)",
      },
      body: JSON.stringify({ query: LC_QUERY, variables: { username } }),
      next: { revalidate: REVALIDATE },
    });
    const j = await res.json();
    const u = j?.data?.matchedUser;
    const all = u?.submitStatsGlobal?.acSubmissionNum?.find((d) => d.difficulty === "All");
    const solved = all?.count ?? 0;
    if (!solved) throw new Error("lc");
    return {
      key: "leetcode",
      label: "LeetCode",
      value: `${solved}`,
      sub: "Problems Solved",
      extra: u.profile?.ranking ? `rank #${Number(u.profile.ranking).toLocaleString()}` : "",
      href: fb.href,
      source: "live",
    };
  } catch {
    return { key: "leetcode", ...fb, extra: "", source: "fallback" };
  }
}

export async function getCodechef() {
  const fb = profile.statsFallback.codechef;
  const handle = profile.handles.codechef;
  try {
    const res = await fetch(`https://codechef-api.vercel.app/handle/${handle}`, {
      headers: { "User-Agent": "Mozilla/5.0 (portfolio stats)" },
      next: { revalidate: REVALIDATE },
    });
    const j = await res.json();
    const rating = j?.currentRating ?? j?.data?.currentRating ?? j?.rating;
    const stars = j?.stars ?? j?.data?.stars;
    if (!rating) throw new Error("cc");
    return {
      key: "codechef",
      label: "CodeChef",
      value: String(rating),
      sub: stars ? `${stars}`.replace(/star/i, "★").trim() : fb.sub,
      extra: j?.highestRating ? `max ${j.highestRating}` : "",
      href: fb.href,
      source: "live",
    };
  } catch {
    return { key: "codechef", ...fb, extra: "", source: "fallback" };
  }
}

export async function getGithub() {
  const user = profile.handles.github;
  try {
    const headers = { Accept: "application/vnd.github+json", "User-Agent": "sumit-portfolio" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error(`gh ${res.status}`);
    const repos = await res.json();
    if (!Array.isArray(repos)) throw new Error("gh payload");
    const cleaned = repos
      .filter((r) => !r.fork && !r.archived)
      .map((r) => ({
        name: r.name,
        description: r.description || "",
        url: r.html_url,
        homepage: r.homepage || "",
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        language: r.language || "",
        topics: r.topics || [],
        updated: r.pushed_at,
      }))
      .sort((a, b) => b.stars - a.stars || new Date(b.updated) - new Date(a.updated));
    return { ok: true, repos: cleaned, source: "live" };
  } catch (e) {
    return { ok: false, repos: [], source: "fallback", error: String(e) };
  }
}

// Contribution calendar (per-day counts + level 0-4) via a no-auth community API.
export async function getGithubContributions(year) {
  const user = profile.handles.github;
  const y = year || 2026;
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=${y}`, {
      headers: { "User-Agent": "sumit-portfolio" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("gc " + res.status);
    const j = await res.json();
    const total = j?.total?.[String(y)];
    const days = Array.isArray(j?.contributions) ? j.contributions : [];
    if (total == null && days.length === 0) throw new Error("gc empty");
    return { ok: true, year: y, total: total ?? 0, days, source: "live" };
  } catch (e) {
    return { ok: false, year: y, total: null, days: [], source: "fallback", error: String(e) };
  }
}
