import Link from "next/link";
import Image from "next/image";

const gold = "#E8C987";
const ink = "#0b0a08";

export default function Home() {
  return (
    <main className="min-h-screen bg-[--ink] text-white" style={{ ["--ink" as any]: ink }}>
      {/* Sticky Top Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/70 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8">
              <Image
                src="/file_000000007a4461f59f24187f958711dc~2.png"
                alt="STRION Crest"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-semibold tracking-wide" style={{ color: gold }}>
              STRION
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-[--gold]" style={{ ["--gold" as any]: gold }}>Home</Link>
            <Link href="/categories" className="hover:text-[--gold]" style={{ ["--gold" as any]: gold }}>Categories</Link>
            <Link href="/custom" className="hover:text-[--gold]" style={{ ["--gold" as any]: gold }}>Custom</Link>
            <Link href="/residential" className="hover:text-[--gold]" style={{ ["--gold" as any]: gold }}>Residential</Link>
            <Link href="/commercial" className="hover:text-[--gold]" style={{ ["--gold" as any]: gold }}>Commercial</Link>
            <Link href="/energetic" className="hover:text-[--gold]" style={{ ["--gold" as any]: gold }}>Energetic</Link>
            <Link href="/signature" className="hover:text-[--gold]" style={{ ["--gold" as any]: gold }}>Signature</Link>
            <Link href="/work" className="hover:text-[--gold]" style={{ ["--gold" as any]: gold }}>Work</Link>
            <Link href="/about" className="hover:text-[--gold]" style={{ ["--gold" as any]: gold }}>About</Link>
            <Link href="/custom" className="ml-4 rounded-lg px-4 py-2 border border-[--gold] text-[--gold] hover:bg-[--gold] hover:text-black transition"
              style={{ ["--gold" as any]: gold }}>
              Start Your Design
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Subtle vignette / glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 50% -10%, rgba(232,201,135,0.22), transparent 60%), radial-gradient(800px 400px at 85% 20%, rgba(232,201,135,0.12), transparent 50%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-20 w-20 md:h-24 md:w-24 mb-5">
              <Image
                src="/file_000000007a4461f59f24187f958711dc~3.png"
                alt="STRION Wordmark"
                fill
                className="object-contain opacity-90"
                priority
              />
            </div>

            <h1 className="max-w-4xl text-4xl md:text-6xl font-bold tracking-tight">
              Custom live-edge & fine carpentry
              <span style={{ color: gold }}> engineered for legacy</span>.
            </h1>

            <p className="mt-6 max-w-3xl text-base md:text-lg text-gray-300 leading-relaxed">
              We fuse heirloom hardwoods, precision joinery, metal inlays, sacred geometry motifs, and
              resonance-aware detailing to craft tables, panels, lighting, and built-ins that elevate space and endure.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                href="/custom"
                className="bg-[--gold] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#d3b270] transition"
                style={{ ["--gold" as any]: gold }}
              >
                Design Your Piece
              </Link>
              <Link
                href="/gallery"
                className="border border-[--gold] text-[--gold] px-6 py-3 rounded-lg hover:bg-[--gold] hover:text-black transition"
                style={{ ["--gold" as any]: gold }}
              >
                View Portfolio
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
              {[
                ["Heirloom Builds", "Bespoke + One-of-ones"],
                ["Geometric Precision", "Sacred motif options"],
                ["Premium Materials", "Hardwoods & metal inlays"],
                ["Nationwide", "White-glove delivery"],
              ].map(([title, sub], i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm uppercase tracking-wide text-gray-400">{sub}</div>
                  <div className="mt-1 font-semibold" style={{ color: gold }}>
                    {title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10" style={{ color: gold }}>
          Craft Disciplines
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { href: "/custom", title: "Custom Orders", blurb: "From napkin sketch to heirloom: tables, panels, built-ins, lighting." },
            { href: "/residential", title: "Residential", blurb: "Dining tables, consoles, vanities, mantels, stair & wall features." },
            { href: "/commercial", title: "Commercial", blurb: "Reception desks, feature walls, bar tops, conference tables." },
            { href: "/energetic", title: "Energetic Crafting™", blurb: "Geometry-driven motifs and resonance-aware detailing." },
            { href: "/signature", title: "Signature Series", blurb: "Limited runs with rare materials and refined geometries." },
            { href: "/sets", title: "Sets & Collections", blurb: "Coordinated pieces for cohesive spaces and brand stories." },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] transition"
            >
              <div className="text-lg font-semibold mb-1" style={{ color: gold }}>
                {c.title}
              </div>
              <div className="text-sm text-gray-300">{c.blurb}</div>
              <div className="mt-4 text-xs text-[color:var(--gold)] opacity-90 group-hover:opacity-100" style={{ ["--gold" as any]: gold }}>
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(232,201,135,0.15), rgba(232,201,135,0.04))",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-sm uppercase tracking-wider text-gray-400">Begin Your Commission</div>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold">
                Tell us your dimensions, use, and vibe. We’ll refine and quote.
              </h3>
            </div>
            <Link
              href="/custom"
              className="rounded-lg px-5 py-3 border border-[--gold] text-[--gold] hover:bg-[--gold] hover:text-black transition"
              style={{ ["--gold" as any]: gold }}
            >
              Start Your Design
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-6 w-6">
                <Image
                  src="/file_000000007a4461f59f24187f958711dc~2.png"
                  alt="STRION Crest"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-gray-300">
                © {new Date().getFullYear()} STRION — Custom Crafting™
              </span>
            </div>
            <div className="flex gap-5 text-sm">
              <Link href="/about" className="text-gray-300 hover:text-white">About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              <Link href="/policy" className="text-gray-300 hover:text-white">Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
                }
