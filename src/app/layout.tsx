import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STRION — Crafted by Vision. Matter, Mastered.",
  description: "Energetic Crafting for spaces & souls.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{background:"#0C0C0C", color:"#EEE", margin:0}}>
        {children}
      </body>
    </html>
  );
}
