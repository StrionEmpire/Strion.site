import "./globals.css";import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "STRION — Energetic Crafting™",
  description:
    "Luxury live-edge & epoxy builds tuned with sacred geometry, metals, and crystal inlays. Instant estimates. Nationwide white-glove service.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Header (simple, fully responsive, no event handlers) */}
        <header className="site-header">
          <div className="site-row">
            <Link href="/" className="brand" aria-label="STRION Home">
              <img
                src="/file_000000007a4461f59f24187f958711dc~2.png"
                alt="STRION logo"
                className="brand-logo"
              />
              <span className="brand-text">STRION</span>
            </Link>

            <nav className="primary-nav">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/custom">Custom</Link>
              <Link href="/commercial">Commercial</Link>
              <Link href="/residential">Residential</Link>
              <Link href="/signature">Signature</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/work">Work</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/nationwide">Nationwide</Link>
              <Link href="/sets">Sets</Link>
              <Link href="/custom" className="btn-cta">Start Your Design</Link>
            </nav>
          </div>
        </header>

        {/* Page container (prevents sideways scroll; centers content) */}
        <main className="page-container">
          <div className="page-inner">{children}</div>
        </main>

        {/* Footer (simple, responsive) */}
        <footer className="site-footer">
          <div className="site-row footer-grid">
            <div>
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
                conductive metals, and crystal lattices. Legs are sold & arranged separately due to
                changing availability. Nationwide white-glove service.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <Link href="/custom">Configurator</Link><br/>
              <Link href="/categories">Build Categories</Link><br/>
              <Link href="/about">About the Movement</Link>
            </div>
            <div>
              <h4>Contact</h4>
              <a href="mailto:hello@strioncraft.com">hello@strioncraft.com</a>
              <p className="muted">Atlanta, GA • Nationwide</p>
            </div>
          </div>
          <div className="site-row footer-legal">
            © {new Date().getFullYear()} STRION. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
