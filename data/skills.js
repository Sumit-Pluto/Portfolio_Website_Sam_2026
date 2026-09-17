// ── Skills ──────────────────────────────────────────────────────────────────
// `icon` is a react-icons name (from the "si" or "fa" packs). Unknown names
// fall back to a generic code glyph, so it's safe to add/rename freely.
export const skillGroups = [
  {
    title: "Languages",
    items: [
      { name: "Python", icon: "SiPython", color: "#3776AB" },
      { name: "C++", icon: "SiCplusplus", color: "#00599C" },
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
      { name: "SQL", icon: "SiPostgresql", color: "#4169E1" },
      { name: "Bash", icon: "SiGnubash", color: "#4EAA25" },
    ],
  },
  {
    title: "AI / ML & Deep Learning",
    items: [
      { name: "PyTorch", icon: "SiPytorch", color: "#EE4C2C" },
      { name: "TensorFlow", icon: "SiTensorflow", color: "#FF6F00" },
      { name: "scikit-learn", icon: "SiScikitlearn", color: "#F7931E" },
      { name: "Hugging Face", icon: "SiHuggingface", color: "#FFD21E" },
      { name: "NumPy", icon: "SiNumpy", color: "#013243" },
      { name: "Pandas", icon: "SiPandas", color: "#150458" },
      { name: "OpenCV", icon: "SiOpencv", color: "#5C3EE8" },
    ],
  },
  {
    title: "Generative & Agentic AI",
    items: [
      { name: "LangChain", icon: "SiLangchain", color: "#1C3C3C" },
      { name: "OpenAI / Claude", icon: "FaBrain", color: "#10a37f" },
      { name: "RAG", icon: "FaMagnifyingGlass", color: "#22c55e" },
      { name: "Agents / MCP", icon: "FaRobot", color: "#6366f1" },
      { name: "Vector DBs", icon: "FaDatabase", color: "#FF6B6B" },
      { name: "Ollama", icon: "FaTerminal", color: "#ffffff" },
    ],
  },
  {
    title: "MLOps & Cloud",
    items: [
      { name: "Docker", icon: "SiDocker", color: "#2496ED" },
      { name: "Kubernetes", icon: "SiKubernetes", color: "#326CE5" },
      { name: "GitHub Actions", icon: "SiGithubactions", color: "#2088FF" },
      { name: "Argo CD", icon: "FaGears", color: "#EF7B4D" },
      { name: "Terraform", icon: "SiTerraform", color: "#7B42BC" },
      { name: "MLflow", icon: "FaChartLine", color: "#0194E2" },
      { name: "Prometheus", icon: "SiPrometheus", color: "#E6522C" },
      { name: "Grafana", icon: "SiGrafana", color: "#F46800" },
    ],
  },
  {
    title: "Backend & Data",
    items: [
      { name: "FastAPI", icon: "SiFastapi", color: "#009688" },
      { name: "Node.js", icon: "SiNodedotjs", color: "#5FA04E" },
      { name: "Apache Kafka", icon: "SiApachekafka", color: "#ffffff" },
      { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1" },
      { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
      { name: "Redis", icon: "SiRedis", color: "#FF4438" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", icon: "SiReact", color: "#61DAFB" },
      { name: "Next.js", icon: "SiNextdotjs", color: "#ffffff" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
      { name: "Framer Motion", icon: "SiFramer", color: "#0055FF" },
    ],
  },
];

// ── Featured projects (used as fallback + to enrich GitHub repos) ────────────
// Match `repo` to your GitHub repo name to merge live stars/links automatically.
export const featuredProjects = [
  {
    title: "OptionSmith — Options & Quant Engine",
    repo: "OptionSmith",
    blurb:
      "~29K-LOC engine that ranks fully-priced option structures — Black-Scholes/Greeks/IV, closed-form EV (verified to 1e-9), an SVI vol surface, and a MILP structure optimizer. 1,731 tests.",
    tags: ["Python", "FastAPI", "Quant", "MILP", "SVI"],
    href: "",
  },
  {
    title: "Agentic Intraday Trading System",
    repo: "agentic-trading",
    blurb:
      "~30K-LOC agentic system: a multi-agent scoring tree feeding a live execution engine (kill switch, idempotent orders, reconciliation), an ML meta-model, a pybind11 C++ kernel, and a guardrailed LLM assistant with BM25 RAG.",
    tags: ["Python", "C++", "React", "LLM", "Agents"],
    href: "",
  },
  {
    title: "HireIQ — AI Interview Platform",
    repo: "HireIQ-Web",
    blurb:
      "Full-stack AI mock-interview app (Next.js + TypeScript) using an LLM for role-tailored questions and JSON-scored feedback, with a 14-language code editor and speech I/O.",
    tags: ["Next.js", "TypeScript", "LLM", "Groq"],
    href: "https://hire-iq-web.vercel.app",
  },
  {
    title: "Genome Mutation Transformer",
    repo: "",
    blurb:
      "An encoder-only transformer built from scratch (attention, positional encoding, training loop) that classifies protein mutations as pathogenic or benign.",
    tags: ["PyTorch", "Transformers", "Genomics"],
    href: "https://huggingface.co/spaces/Sumitx369/Genome_SLM",
  },
];
