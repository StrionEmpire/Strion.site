export const metadata = {
  title: "STRION — Energetic Crafting™",
  description:
    "Custom carpentry merging sacred geometry, premium hardwoods, refined metal inlays, and optional crystal integration—engineered for legacy.",
};

import Link from "next/link";

const gold = "#E8C987";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {/* Sticky Header */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3">
                <img
                  src="/file_000000007a4461f59f24187f958711dc~2.png"
                  alt="STRION crest"
                  width={28}
                  height={28}
                />
                <span className="font-semibold tracking-[0.14em]" style={{ color: gold }}>
                  STRION
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
                {[
                  ["About", "/about"],
                  ["Categories", "/categories"],
                  ["Custom", "/custom"],
                  ["Residential", "/residential"],
                  ["Commercial", "/commercial"],
                  ["Signature", "/signature"],
                  ["Work", "/work"],
                  ["Nationwide", "/nationwide"],
                  ["Sets", "/sets"],
                  ["Shop", "/shop"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  href="/custom"
                  className="ml-2 rounded-lg px-4 py-2 font-semibold text-black"
                  style={{ backgroundColor: gold }}
                >
                  Start Your Design
                </Link>
              </nav>
            </div>

            {/* mobile quick row */}
            <div className="md:hidden py-2 flex flex-wrap gap-3 text-xs text-neutral-300">
              {[
                ["About", "/about"],
                ["Categories", "/categories"],
                ["Custom", "/custom"],
                ["Residential", "/residential"],
                ["Commercial", "/commercial"],
                ["Signature", "/signature"],
                ["Work", "/work"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
              <Link
                href="/custom"
                className="rounded-md px-3 py-1 font-medium text-black"
                style={{ backgroundColor: gold }}
              >
                Start
              </Link>
            </div>
          </div>
        </header>

        {/* Page */}
        {children}

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-3">
                <img
                  src="/file_000000007a4461f59f24187f958711dc~2.png"
                  alt="STRION crest"
                  width={20}
                  height={20}
                />
                <span className="font-semibold tracking-[0.12em]" style={{ color: gold }}>
                  STRION
                </span>
              </div>
              <p className="text-sm text-neutral-400 max-w-3xl">
                Energetic Crafting™ — custom live-edge & epoxy builds tuned with geometry,
                conductive metals, and crystal lattices. Legs are sold & arranged separately
                due to changing availability. Nationwide white-glove service.
              </p>
            </div>

            <div className="mt-6 text-xs text-neutral-500">
              © {new Date().getFullYear()} STRION. All rights reserved. • Atlanta, GA • Nationwide
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
