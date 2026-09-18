// ── Edit your personal details here ─────────────────────────────────────────
export const profile = {
  name: "Sumit Dhankhar",
  // rotating role words under your name
  roles: ["AI / ML Engineer", "Full-Stack Developer", "Competitive Programmer", "Quant Tinkerer"],
  // 2–3 sentence intro shown under your name in the hero
  about:
    "I'm an AI/ML engineer who ships the whole path — from RAG and agentic systems to the Kubernetes, CI/CD, and Kafka plumbing that runs them in production. On the side I build quant and agentic trading systems, and I've co-authored two Springer papers. I like problems that need both a clean model and a clean system.",

  email: "sumitx368@gmail.com",
  phone: "+91-7703937033",
  location: "New Delhi, India",
  resumeUrl: "https://drive.google.com/drive/folders/1Hp7iG9TpebDSffXb6pJWrSU04KbC9SM-?usp=sharing",

  // your public handles
  handles: {
    github: "Sumit-Pluto",
    linkedin: "sumit-dhankhar24",
    leetcode: "Sumit_369",
    codeforces: "Sumit_369",
    codechef: "sumit_3_6_9",
    atcoder: "Sumit_369",
  },

  socials: {
    github: "https://github.com/Sumit-Pluto",
    linkedin: "https://www.linkedin.com/in/sumit-dhankhar24/",
    leetcode: "https://leetcode.com/u/Sumit_369/",
    codeforces: "https://codeforces.com/profile/Sumit_369",
    codechef: "https://www.codechef.com/users/sumit_3_6_9",
    email: "mailto:sumitx368@gmail.com",
  },

  // Fallback numbers used if a live API is unreachable. Keep these current.
  statsFallback: {
    leetcode: { label: "LeetCode", value: "500+", sub: "Problems Solved", href: "https://leetcode.com/u/Sumit_369/" },
    codeforces: { label: "Codeforces", value: "1339", sub: "Pupil", href: "https://codeforces.com/profile/Sumit_369" },
    codechef: { label: "CodeChef", value: "1587", sub: "2★", href: "https://www.codechef.com/users/sumit_3_6_9" },
  },
};

// The nav — map labels to section ids on the page.
export const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "ACADEMICS", href: "#academics" },
  { label: "WORK", href: "#work" },
  { label: "JOURNEY", href: "#journey" },
  { label: "CONTACT", href: "#contact" },
];
