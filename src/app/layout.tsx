import "./globals.css";
import type { Metadata } from "next";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "STRION — Energetic Crafting",
  description: "Custom carpentry • sacred geometry • resonance design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Header />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
