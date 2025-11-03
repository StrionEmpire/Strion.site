import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STRION — Custom Carpentry & Energetic Crafting™",
  description:
    "Heirloom-grade custom carpentry, live-edge & epoxy builds, sacred-geometry motifs, refined metals, and resonance lighting. Built in Georgia • Delivered nationwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
