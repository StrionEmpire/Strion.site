import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "STRION — Crafted by Vision. Matter, Mastered.",
  description: "Energetic Crafting for spaces & souls.",
};

const wrap: React.CSSProperties = { maxWidth: 1100, margin: "0 auto", padding: "0 20px" };
const header: React.CSSProperties = { position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(6px)", background: "rgba(0,0,0,.5)", borderBottom: "1px solid #2a2a2a" };
const navLink: React.CSSProperties = { padding: "10px 12px", color: "#ddd", textDecoration: "none" };
const cta: React.CSSProperties = { background: "#C6A746", color: "#111", padding: "10px 14px", borderRadius: 10, fontWeight: 700, textDecoration: "none" };
const footer: React.CSSProperties = { borderTop: "1px solid #2a2a2a", marginTop: 40 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#0C0C0C", color: "#EEE", margin: 0 }}>
        {/* HEADER */}
        <header style={header}>
          <div style={{ ...wrap, display: "flex", alignItems: "center", gap: 14, height: 64 }}>
            <Link href="/" style={{ ...navLink, fontWeight: 700, letterSpacing: ".04em" }}>STRION</Link>
            <nav style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              <Link href="/work" style={navLink}>Work</Link>
              <Link href="/about" style={navLink}>About</Link>
              <Link href="/contact" style={navLink}>Contact</Link>
              <Link href="/custom" style={cta}>Start Your Design</Link>
            </nav>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer style={footer}>
          <div style={{ ...wrap, padding: 18, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ fontWeight: 700 }}>STRION</div>
            <div style={{ color: "#999" }}>© {new Date().getFullYear()} STRION — Crafted by Vision. Matter, Mastered.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
