import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Academics from "@/components/Academics";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contributions from "@/components/Contributions";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import { profile } from "@/data/profile";
import { getCodeforces, getLeetcode, getCodechef, getGithub, getGithubContributions } from "@/lib/stats";

export const revalidate = 3600; // ISR: refresh live stats hourly

export default async function Page() {
  const year = new Date().getFullYear();
  const [codeforces, leetcode, codechef, github, contributions] = await Promise.all([
    getCodeforces(),
    getLeetcode(),
    getCodechef(),
    getGithub(),
    getGithubContributions(year),
  ]);

  const githubStat = {
    key: "github",
    label: "GitHub",
    value: contributions.total != null ? String(contributions.total) : "—",
    sub: `contribs · ${year}`,
    href: profile.socials.github,
    source: contributions.source,
  };

  return (
    <>
      <Nav />
      <main>
        <Hero stats={{ leetcode, codeforces, codechef, github: githubStat }} />
        <About />
        <Academics />
        <Skills />
        <Projects github={github} />
        <Contributions data={contributions} />
        <Journey />
        <Contact />
      </main>
    </>
  );
}
