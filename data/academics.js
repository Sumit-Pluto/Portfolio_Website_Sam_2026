// ── Your academic record ────────────────────────────────────────────────────
// SGPA per semester is taken from your dashboard. Subject lists below are
// representative placeholders for a B.Tech (AIML) curriculum — replace the
// `subjects` arrays with your real subjects/credits/grades. The grade-
// distribution donut uses the aggregate `gradeDistribution` numbers (your
// real totals), so it stays correct even before you finish the subject lists.

export const degree = "B.Tech — Artificial Intelligence & Machine Learning";
export const college = "Vivekananda Institute of Professional Studies (GGSIPU)";
export const years = "2022 – 2026";
export const cgpa = 9.35;

// grade -> color (matches the donut legend)
export const gradeColors = {
  O: "#a855f7",   // purple  (CVD-validated set)
  A: "#16a34a",    // green
  "A+": "#6366f1", // indigo/blue
  "B+": "#ea580c", // orange
  B: "#eab308",
  C: "#ef4444",
};

// Aggregate grade totals across the whole degree (from your dashboard).
// Order avoids placing the two close hues (purple/indigo) adjacent in the donut.
export const gradeDistribution = [
  { grade: "O", count: 50 },
  { grade: "A", count: 4 },
  { grade: "A+", count: 29 },
  { grade: "B+", count: 2 },
];

export const semesters = [
  {
    id: 1,
    sgpa: 9.0,
    subjects: [
      { code: "AM-101", name: "Applied Mathematics – I", credits: 4, grade: "A+" },
      { code: "CS-103", name: "Programming in C", credits: 4, grade: "O" },
      { code: "PH-105", name: "Engineering Physics", credits: 4, grade: "A+" },
      { code: "HS-107", name: "Communication Skills", credits: 3, grade: "O" },
      { code: "ME-109", name: "Engineering Graphics", credits: 3, grade: "A" },
    ],
  },
  {
    id: 2,
    sgpa: 9.0,
    subjects: [
      { code: "AM-102", name: "Applied Mathematics – II", credits: 4, grade: "A+" },
      { code: "CS-104", name: "Python Programming", credits: 4, grade: "O" },
      { code: "CH-106", name: "Engineering Chemistry", credits: 4, grade: "A+" },
      { code: "EE-108", name: "Basic Electrical Engineering", credits: 4, grade: "A" },
      { code: "ES-110", name: "Environmental Studies", credits: 2, grade: "O" },
    ],
  },
  {
    id: 3,
    sgpa: 9.08,
    subjects: [
      { code: "CS-201", name: "Data Structures", credits: 4, grade: "O" },
      { code: "MA-203", name: "Discrete Mathematics", credits: 4, grade: "A+" },
      { code: "CS-205", name: "Object-Oriented Programming (C++)", credits: 4, grade: "O" },
      { code: "EC-207", name: "Digital Logic Design", credits: 4, grade: "A+" },
      { code: "MA-209", name: "Probability & Statistics", credits: 4, grade: "A" },
    ],
  },
  {
    id: 4,
    sgpa: 9.36,
    subjects: [
      { code: "CS-202", name: "Database Management Systems", credits: 4, grade: "O" },
      { code: "CS-204", name: "Operating Systems", credits: 4, grade: "A+" },
      { code: "CS-206", name: "Design & Analysis of Algorithms", credits: 4, grade: "O" },
      { code: "CS-208", name: "Computer Organization", credits: 4, grade: "A+" },
      { code: "MA-210", name: "Linear Algebra", credits: 4, grade: "O" },
    ],
  },
  {
    id: 5,
    sgpa: 9.39,
    subjects: [
      { code: "AI-301", name: "Machine Learning", credits: 4, grade: "O" },
      { code: "CS-303", name: "Computer Networks", credits: 4, grade: "A+" },
      { code: "CS-305", name: "Theory of Computation", credits: 4, grade: "A+" },
      { code: "CS-307", name: "Software Engineering", credits: 3, grade: "O" },
      { code: "AI-309", name: "Data Mining & Warehousing", credits: 4, grade: "O" },
    ],
  },
  {
    id: 6,
    sgpa: 9.5,
    subjects: [
      { code: "AI-302", name: "Deep Learning", credits: 4, grade: "O" },
      { code: "AI-304", name: "Artificial Intelligence", credits: 4, grade: "O" },
      { code: "AI-306", name: "Natural Language Processing", credits: 4, grade: "A+" },
      { code: "AI-308", name: "Big Data Analytics", credits: 4, grade: "O" },
      { code: "CS-310", name: "Cloud Computing", credits: 3, grade: "A+" },
    ],
  },
  {
    id: 7,
    sgpa: 9.72,
    subjects: [
      { code: "AI-401", name: "Computer Vision", credits: 4, grade: "O" },
      { code: "AI-403", name: "Reinforcement Learning", credits: 4, grade: "O" },
      { code: "AI-405", name: "MLOps & Model Deployment", credits: 4, grade: "O" },
      { code: "AI-407", name: "Generative AI", credits: 4, grade: "A+" },
      { code: "PR-409", name: "Major Project – I", credits: 4, grade: "O" },
    ],
  },
  {
    id: 8,
    sgpa: 10.0,
    subjects: [
      { code: "AI-402", name: "LLMs & Agentic Systems", credits: 4, grade: "O" },
      { code: "CS-404", name: "Distributed Systems", credits: 4, grade: "O" },
      { code: "PR-406", name: "Major Project – II", credits: 6, grade: "O" },
      { code: "IN-408", name: "Industry Internship", credits: 4, grade: "O" },
      { code: "SE-410", name: "Seminar", credits: 2, grade: "O" },
    ],
  },
];
