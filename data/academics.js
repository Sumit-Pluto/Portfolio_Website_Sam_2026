// ── Academic record (from the official GGSIPU result summary) ────────────────
export const degree = "B.Tech — Artificial Intelligence & Machine Learning";
export const college = "Vivekananda Institute of Professional Studies (GGSIPU)";
export const years = "2022 – 2026";
export const cgpa = 9.36;

// grade -> color (CVD-validated set; matches the donut legend)
export const gradeColors = {
  O: "#a855f7", // purple
  A: "#16a34a", // green
  "A+": "#6366f1", // indigo
  "B+": "#ea580c", // orange
  B: "#eab308",
  C: "#ef4444",
};

// Aggregate grade totals across the degree (85 subjects → matches the result summary)
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
      { code: "BS-103", name: "Applied Chemistry", grade: "A+" },
      { code: "BS-105", name: "Applied Physics – I", grade: "A" },
      { code: "ES-107", name: "Electrical Science", grade: "A+" },
      { code: "BS-111", name: "Applied Mathematics – I", grade: "A" },
      { code: "HS-113", name: "Communication Skills", grade: "A+" },
      { code: "ES-119", name: "Manufacturing Process", grade: "O" },
      { code: "BS-151", name: "Physics – I Lab", grade: "A+" },
      { code: "BS-155", name: "Applied Chemistry Lab", grade: "O" },
      { code: "ES-157", name: "Engineering Graphics – I", grade: "O" },
      { code: "ES-159", name: "Electrical Science Lab", grade: "O" },
    ],
  },
  {
    id: 2,
    sgpa: 9.0,
    subjects: [
      { code: "ES-102", name: "Programming in C", grade: "A+" },
      { code: "BS-106", name: "Applied Physics – II", grade: "A+" },
      { code: "BS-110", name: "Environmental Studies", grade: "O" },
      { code: "BS-112", name: "Applied Mathematics – II", grade: "B+" },
      { code: "ES-114", name: "Engineering Mechanics", grade: "B+" },
      { code: "HS-116", name: "Indian Constitution", grade: "O" },
      { code: "HS-118", name: "Human Values and Ethics", grade: "O" },
      { code: "BS-152", name: "Physics – II Lab", grade: "O" },
      { code: "ES-154", name: "Programming in C Lab", grade: "A+" },
      { code: "ES-158", name: "Engineering Graphics – II", grade: "O" },
      { code: "BS-162", name: "Environmental Studies Lab", grade: "O" },
      { code: "ES-164", name: "Workshop Practice", grade: "O" },
    ],
  },
  {
    id: 3,
    sgpa: 9.08,
    subjects: [
      { code: "AIML-201", name: "Data Structures", grade: "A+" },
      { code: "AIML-203", name: "Foundations of Data Science", grade: "A+" },
      { code: "AIML-205", name: "Digital Logic Design", grade: "A+" },
      { code: "AIML-207", name: "Principles of Artificial Intelligence", grade: "A" },
      { code: "AIML-209", name: "Probability, Statistics & Linear Algebra", grade: "A+" },
      { code: "AIML-211", name: "Universal Human Values – II", grade: "A+" },
      { code: "AIML-213", name: "Critical Reasoning & Systems Thinking", grade: "A+" },
      { code: "AIML-215", name: "Selected Reading", grade: "O" },
      { code: "AIML-251", name: "Data Structures Lab", grade: "O" },
      { code: "AIML-253", name: "Foundations of Data Science Lab", grade: "O" },
      { code: "AIML-255", name: "Digital Logic Design Lab", grade: "O" },
      { code: "AIML-257", name: "Principles of AI Lab", grade: "A+" },
      { code: "AIML-259", name: "Web Programming Lab", grade: "O" },
    ],
  },
  {
    id: 4,
    sgpa: 9.36,
    subjects: [
      { code: "AIML-202", name: "Object Oriented Programming", grade: "A+" },
      { code: "AIML-204", name: "Database Management Systems", grade: "O" },
      { code: "AIML-206", name: "Software Engineering", grade: "A+" },
      { code: "AIML-208", name: "Computer Networks & Internet Protocol", grade: "O" },
      { code: "AIML-210", name: "Fundamentals of Machine Learning", grade: "A+" },
      { code: "AIML-212", name: "Computational Methods", grade: "A" },
      { code: "AIML-214", name: "Effective Technical Writing", grade: "O" },
      { code: "AIML-216", name: "Emerging Trends in Technological Industries", grade: "A+" },
      { code: "AIML-252", name: "OOP Lab", grade: "O" },
      { code: "AIML-254", name: "DBMS Lab", grade: "O" },
      { code: "AIML-256", name: "Computer Networks Lab", grade: "O" },
      { code: "AIML-258", name: "Fundamentals of Machine Learning Lab", grade: "O" },
      { code: "AIML-260", name: "Practicum (Integrated Project)", grade: "O" },
    ],
  },
  {
    id: 5,
    sgpa: 9.39,
    subjects: [
      { code: "AIML-301", name: "Operating Systems", grade: "A+" },
      { code: "AIML-303", name: "Design & Analysis of Algorithms", grade: "A+" },
      { code: "AIML-305", name: "Fundamentals of Deep Learning", grade: "O" },
      { code: "AIML-307", name: "Computer Organization & Architecture", grade: "A+" },
      { code: "AIML-309", name: "Introduction to Internet of Things", grade: "A+" },
      { code: "AIML-311", name: "Principles of Entrepreneurship Mindset", grade: "A+" },
      { code: "AIML-351", name: "Operating Systems Lab", grade: "O" },
      { code: "AIML-353", name: "Design & Analysis of Algorithms Lab", grade: "O" },
      { code: "AIML-355", name: "Fundamentals of Deep Learning Lab", grade: "O" },
      { code: "AIML-357", name: "Introduction to IoT Lab", grade: "O" },
      { code: "AIML-359", name: "Summer Training Report – 1", grade: "O" },
      { code: "AIML-361", name: "Seminar on Emerging Areas of Technology", grade: "O" },
    ],
  },
  {
    id: 6,
    sgpa: 9.5,
    subjects: [
      { code: "AIML-302", name: "Digital Image Processing", grade: "O" },
      { code: "AIML-304T", name: "Introduction to Data Mining", grade: "A+" },
      { code: "AIML-308T", name: "Advances in Deep Learning", grade: "O" },
      { code: "AIML-316T", name: "Natural Language Processing", grade: "A+" },
      { code: "OAE-308T", name: "Quantum Computing", grade: "A+" },
      { code: "OAE-312T", name: "Mobile Application Development", grade: "A+" },
      { code: "AIML-354", name: "Digital Image Processing Lab", grade: "O" },
      { code: "AIML-304P", name: "Introduction to Data Mining Lab", grade: "O" },
      { code: "AIML-308P", name: "Advances in Deep Learning Lab", grade: "O" },
      { code: "AIML-316P", name: "Natural Language Processing Lab", grade: "O" },
      { code: "OAE-312P", name: "Mobile Application Development Lab", grade: "O" },
      { code: "HS-352", name: "NSS / NCC / Technical Club", grade: "O" },
    ],
  },
  {
    id: 7,
    sgpa: 9.72,
    subjects: [
      { code: "AIML-407T", name: "Reinforcement Learning", grade: "O" },
      { code: "AIML-411T", name: "Advances in Machine Learning", grade: "O" },
      { code: "AIML-401", name: "Principles of Management for Engineers", grade: "O" },
      { code: "OAE-409T", name: "Web Intelligence", grade: "A+" },
      { code: "OAE-415T", name: "Cyber Forensics & Cyber Crime Investigation", grade: "O" },
      { code: "OAE-421T", name: "Digital & Smart Cities", grade: "A+" },
      { code: "AIML-407P", name: "Reinforcement Learning Lab", grade: "O" },
      { code: "AIML-411P", name: "Advances in Machine Learning Lab", grade: "O" },
      { code: "OAE-409P", name: "Web Intelligence Lab", grade: "O" },
      { code: "AIML-451", name: "Minor Project", grade: "O" },
      { code: "AIML-453", name: "Summer Training Report – 2", grade: "O" },
    ],
  },
  {
    id: 8,
    sgpa: 10.0,
    subjects: [
      { code: "AIML-456", name: "Internship Report & Viva Voce", grade: "O" },
      { code: "AIML-458", name: "Internship Progress Evaluation", grade: "O" },
    ],
  },
];
