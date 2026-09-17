// ── Journey / experience timeline ───────────────────────────────────────────
// Newest first. `doc` can link to a related doc/certificate (optional).
export const journey = [
  {
    period: "Jul 2026 — Present",
    org: "Insignia Consultancy Solutions",
    role: "AI Engineer · Full-time",
    location: "New Delhi",
    points: [
      "Deploy containerized AI/ML microservices on Kubernetes with GitHub Actions + ArgoCD (GitOps) rollouts.",
      "Built be-credit-center — a multi-tenant credit & usage-metering platform on an append-only Postgres ledger.",
      "Standardized the ML lifecycle: MLflow tracking/registry, Kafka event streaming, Prometheus/Grafana observability.",
    ],
    tags: ["Kubernetes", "MLOps", "Kafka", "PostgreSQL"],
    doc: "",
  },
  {
    period: "Sep 2025 — May 2026",
    org: "Insignia Consultancy Solutions",
    role: "AI Engineer",
    location: "New Delhi",
    points: [
      "Built an MCP server–client that lets an LLM agent query remote databases via tool calling.",
      "Developed Charaka, a pharmacy-management AI agent (inventory, expiry alerts, scoped medical chatbot).",
      "Engineered an English→Indic video-dubbing pipeline (IndicTrans2, GLiNER, Demucs, FFmpeg) and authored the credit platform's HLD/LLD architecture.",
    ],
    tags: ["MCP", "Agents", "NLP", "System Design"],
    doc: "",
  },
  {
    period: "Jul 2025",
    org: "Dataculture Technologies (DCT)",
    role: "AI Engineer Intern",
    location: "Remote",
    points: [
      "Built a RAG pipeline (chunking, embeddings, vector retrieval) over local document stores.",
      "Grounded chatbot answers in source documents to cut hallucination.",
    ],
    tags: ["RAG", "LLM", "Embeddings"],
    doc: "",
  },
  {
    period: "Apr — Oct 2024",
    org: "Insignia Consultancy Solutions",
    role: "AI / ML Intern",
    location: "New Delhi",
    points: [
      "Fine-tuned Mistral 7B (QLoRA) & RoBERTa (PEFT) on NVIDIA GPUs for structured resume entity extraction.",
      "Trained & evaluated YOLO segmentation models; handled annotation/augmentation in Roboflow.",
    ],
    tags: ["Fine-tuning", "PEFT", "YOLO"],
    doc: "",
  },
];

// A couple of highlights shown as badges near the timeline
export const highlights = [
  { label: "2× Springer Publications", icon: "FaBookOpen" },
  { label: "Codeforces 1339 · CodeChef 2★", icon: "FaCode" },
  { label: "CGPA 9.35 / 10", icon: "FaGraduationCap" },
];
