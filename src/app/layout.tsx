import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "STRION — Energetic Crafting™",
  description:
    "Custom Carpentry- Tables, Fixtures, and epoxy builds tuned with sacred geometry, metals, and crystals. Instant estimates. Nationwide white-glove service.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ===== Header ===== */}
        <header className="site-header">
          <div className="header-inner">
            {/* Brand */}
            <Link href="/" className="brand" aria-label="STRION Home">
              {/* If you uploaded a logo file, update the src below to your filename */}
              <img
                src="/file_000000007a4461f59f24187f958711dc~2.png"
                alt="STRION logo"
                className="brand-logo"
              />
              <span className="brand-text">STRION</span>
            </Link>

            {/* Primary Nav */}
            <nav className="primary-nav">
              <Link href="/about">About</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/energetic">Energetic</Link>
              <Link href="/commercial">Commercial</Link>
              <Link href="/residential">Residential</Link>
              <Link href="/signature">Signature</Link>
              <Link href="/work">Work</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/custom" className="btn-cta">Start Your Design</Link>
            </nav>
          </div>

          {/* Optional ribbon (secondary) */}
          <nav className="secondary-nav">
            <Link href="/nationwide">Nationwide Service</Link>
            <Link href="/sets">Sets</Link>
            <Link href="/categories#wall">Wall Panels & Lights</Link>
            <Link href="/categories#conference">Conference</Link>
            <Link href="/categories#island">Kitchen Islands</Link>
            <Link href="/categories#bar">Bar & Counter Tops</Link>
          </nav>
        </header>

        {/* ===== Page Container ===== */}
        <main className="page-container">
          <div className="page-inner">{children}</div>
        </main>

        {/* ===== Footer ===== */}
        <footer className="site-footer">
          <div className="footer-wrap">
            <div className="footer-col">
              <div className="brand footer-brand">
                <img
                  src="/file_000000007a4461f59f24187f958711dc~2.png"
                  alt="STRION logo"
                  className="brand-logo"
                />
                <span className="brand-text">STRION</span>
              </div>
              <p className="muted">
                Energetic Crafting™ — custom live-edge & epoxy builds tuned with geometry,
                conductive metals, and crystal lattices. Legs are sold & arranged separately due
                to changing availability. Nationwide white-glove service.
              </p>
            </div>

            <div className="footer-col">
              <h4>Explore</h4>
              <Link href="/custom">Configurator</Link>
              <Link href="/categories">Build Categories</Link>
              <Link href="/about">About the Movement</Link>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <a href="mailto:hello@strioncraft.com">hello@strioncraft.com</a>
              <p className="muted">Atlanta, GA • Nationwide</p>
            </div>
          </div>

          <div className="footer-legal">© {new Date().getFullYear()} STRION. All rights reserved.</div>
        </footer>
      </body>
    </html>
  );
