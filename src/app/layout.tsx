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
      <head> <meta name="google-site-verification" content="SHH4fuPojnzRiHCP93Fc7lDNLZjHB2RHTKWRtbI6SMQ" />
      </head>
      <body style={{ background: "#0C0C0C", color: "#EEE", margin: 0 }}>
        {/* HEADER */}
<header style={{ position: "sticky", top: 0, zIndex: 50, background: "#0C0C0C", borderBottom: "1px solid #222" }}>
  <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", gap: 16 }}>
    {/* Brand left */}
    <a href="/" aria-label="Strion Home" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
      <img
        src="/file_000000007a4461f59f24187f958711dc~2.png"  // <-- your uploaded logo file
        alt="STRION logo"
        style={{ height: 36, width: "auto", objectFit: "contain" }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/sigil.svg"; }}
      />
      <span style={{ color: "#D6B36E", fontWeight: 700, letterSpacing: 2 }}>STRION</span>
    </a>

    {/* Spacer */}
    <div style={{ flex: 1 }} />

    {/* Mobile menu (details/summary: no JS needed in a Server Component) */}
    <details style={{ position: "relative", display: "block" }}>
      <summary
        role="button"
        aria-label="Toggle navigation"
        style={{
          listStyle: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 10px",
          border: "1px solid #333",
          borderRadius: 8,
          color: "#D6B36E",
          background: "transparent"
        }}
      >
        ☰ Menu
      </summary>

      {/* Menu panel (mobile) */}
      <div
        style={{
          position: "absolute",
          right: 0,
          marginTop: 8,
          minWidth: 260,
          background: "#111",
          border: "1px solid #222",
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,.5)",
          padding: 10
        }}
      >
        <nav style={{ display: "grid", gap: 6 }}>
          <a href="/work"        className="navlink">Work</a>
          <a href="/shop"        className="navlink">Shop</a>
          <a href="/signature"   className="navlink">Signature</a>
          <a href="/energetic"   className="navlink">Energetic</a>
          <a href="/commercial"  className="navlink">Commercial</a>
          <a href="/residential" className="navlink">Residential</a>
          <a href="/sets"        className="navlink">Sets</a>
          <a href="/about"       className="navlink">About</a>
          <a href="/contact"     className="navlink">Contact</a>
          <a href="/custom"      className="cta">Start Your Design</a>
        </nav>
      </div>
    </details>
  </div>

  {/* Desktop nav bar (no wrap, scrolls inside itself on small widths) */}
  <div style={{ borderTop: "1px solid #222" }}>
    <nav className="topnav">
      <a href="/work"        className="navlink">Work</a>
      <a href="/shop"        className="navlink">Shop</a>
      <a href="/signature"   className="navlink">Signature</a>
      <a href="/energetic"   className="navlink">Energetic</a>
      <a href="/commercial"  className="navlink">Commercial</a>
      <a href="/residential" className="navlink">Residential</a>
      <a href="/sets"        className="navlink">Sets</a>
      <a href="/about"       className="navlink">About</a>
      <a href="/contact"     className="navlink">Contact</a>
      <a href="/custom"      className="cta">Start Your Design</a>
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
