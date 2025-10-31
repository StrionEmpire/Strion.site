import Link from "next/link";
const gold = "#E8C987";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section
        className="relative min-h-[70vh] flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.96)), url('/file_000000007a4461f59f24187f958711dc~3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container text-center">
          <img
            src="/file_000000007a4461f59f24187f958711dc~2.png"
            alt=""
            width={72}
            height={72}
            className="mx-auto mb-5 opacity-95"
          />
          <p className="uppercase tracking-[0.25em] text-[11px] text-neutral-400">
            Original Studio • Pioneering
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-bold tracking-tight" style={{ color: gold }}>
            Energetic Crafting™
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-neutral-300 text-lg md:text-xl leading-relaxed">
            Custom carpentry that merges sacred geometry, premium hardwoods, refined metal inlays,
            and optional crystal integration—engineered for legacy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/custom"
              className="rounded-lg px-6 py-3 font-semibold text-black"
              style={{ backgroundColor: gold }}
            >
              Start Your Design
            </Link>
            <Link
              href="/about"
              className="rounded-lg px-6 py-3 font-semibold border border-[--gold] text-[--gold] hover:bg-[--gold] hover:text-black transition"
              style={{ ["--gold" as any]: gold }}
            >
              Learn Our Method
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 justify-center text-[11px]">
            {["Heirloom Craft", "Sacred Geometry", "Premium Hardwoods", "Nationwide Delivery"].map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-neutral-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="container py-14">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8" style={{ color: gold }}>
          Explore Commissions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              href: "/residential",
              title: "Residential",
              blurb: "Dining tables, consoles, vanities, mantels, stair & wall features.",
            },
            {
              href: "/commercial",
              title: "Commercial",
              blurb: "Reception desks, feature walls, bar tops, conference tables.",
            },
            {
              href: "/energetic",
              title: "Energetic Crafting™",
              blurb: "Geometry-driven motifs and resonance-aware detailing.",
            },
            {
              href: "/signature",
              title: "Signature Series",
              blurb: "Limited runs with rare materials and refined geometries.",
            },
            {
              href: "/sets",
              title: "Sets & Collections",
              blurb: "Coordinated suites for cohesive homes and brands.",
            },
            {
              href: "/work",
              title: "Recent Builds",
              blurb: "A living archive of select projects and processes.",
            },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 hover:bg-white/[0.06] transition"
            >
              <div className="pointer-events-none absolute -top-20 -right-20 h-52 w-52 rounded-full"
                   style={{ background: "radial-gradient(closest-side, rgba(232,201,135,0.10), transparent 70%)" }} />
              <div className="relative">
                <div className="text-lg font-semibold" style={{ color: gold }}>
                  {c.title}
                </div>
                <div className="text-sm text-neutral-300 mt-2">{c.blurb}</div>
                <div
                  className="mt-4 inline-block text-xs font-medium text-neutral-300 group-hover:text-black px-3 py-1 rounded-full border border-white/10 group-hover:bg-[--gold] group-hover:border-transparent transition"
                  style={{ ["--gold" as any]: gold }}
                >
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STORY STRIP */}
      <section className="container pb-20">
        <div
          className="rounded-2xl border border-white/10 p-8 md:p-12 bg-white/[0.03]"
          style={{ background: "linear-gradient(180deg, rgba(232,201,135,0.06), rgba(232,201,135,0.02))" }}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-3" style={{ color: gold }}>
            The STRION Approach
          </h3>
          <p className="text-neutral-300 leading-relaxed">
            We design and build with intention. Every piece is proportioned for harmony, crafted for longevity,
            and detailed for presence. From statement dining tables to reception features and resonance lighting,
            STRION unites advanced carpentry with sacred-geometry discipline and material intelligence to achieve
            a result that feels inevitable — and undeniably yours.
          </p>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link
              href="/work"
              className="inline-block rounded-lg px-5 py-3 border border-[--gold] text-[--gold] hover:bg-[--gold] hover:text-black transition"
              style={{ ["--gold" as any]: gold }}
            >
              View Recent Builds
            </Link>
            <Link
              href="/custom"
              className="inline-block rounded-lg px-5 py-3 font-semibold text-black"
              style={{ backgroundColor: gold }}
            >
              Commission a Piece
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
