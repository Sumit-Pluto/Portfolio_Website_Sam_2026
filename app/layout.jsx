import "./globals.css";
import { Sora, Inter } from "next/font/google";
import { profile } from "@/data/profile";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: `${profile.name} — AI/ML Engineer`,
  description:
    "AI/ML engineer building LLM, agentic, and quant systems in production — RAG, MLOps, and scalable backends. Portfolio, scorecard, projects and journey.",
  keywords: ["AI Engineer", "ML Engineer", "MLOps", "Full-Stack", "Sumit Dhankhar", "Portfolio"],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — AI/ML Engineer`,
    description: "AI/ML engineer building production LLM, agentic and quant systems.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-body bg-ink text-white antialiased">{children}</body>
    </html>
  );
}
