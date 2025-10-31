import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO — slimmer, quieter, premium */}
      <section
        className="w-full min-h-[70vh] flex items-center justify-center px-6 relative"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -10%, rgba(232,201,135,0.12), rgba(0,0,0,0) 60%), linear-gradient(to bottom, rgba(0,0,0,0.88), rgba(0,0,0,0.92))"
        }}
      >
        <div className="max-w-4xl w-full text-center mx-auto">
          <div className="mx-auto mb-6 h-20 w-20">
            <img
              src="/file_000000007a4461f59f24187f958711dc~2.png"
              alt="STRION crest"
              width={80}
              height={80}
              className="mx-auto block"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: "#E8C987" }}>
            STRION — Energetic Crafting™
          </h1>

          <p className="mt-4 text-lg md:text-xl text-neutral-300 leading-relaxed">
            Custom carpentry and resonance-aware design. Premium hardwoods, sacred geometry,
            refined metal inlays, and optional crystal integration — engineered for legacy spaces.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/custom"
              className="px-6 py-3 rounded-lg font-semibold bg-[#E8C987] text-black hover:opacity-90 transition"
            >
              Start Your Design
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 rounded-lg font-semibold border border-[#E8C987] text-[#E8C987] hover:bg-[#E8C987] hover:text-black transition"
            >
              Learn Our Method
            </Link>
          </div>

          {/* Subtle chips for credibility */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center text-xs">
            {["Heirloom Craft", "Sacred Geometry", "Premium Hardwoods", "Nationwide Delivery"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-neutral-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT STRIP — succinct brand promise */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              h: "Architected for Presence",
              p: "Proportions, joinery, and finish systems that age with grace and anchor a room with quiet confidence."
            },
            {
              h: "Material Intelligence",
              p: "Selective metal inlays and optional crystal integration, tuned to enhance balance, flow, and intention."
            },
            {
              h: "Commission with Clarity",
              p: "Transparent quoting, prototyping, and white-glove delivery. Built in Georgia • Delivered nationwide."
            }
          ].map((card) => (
            <div key={card.h} className="rounded-xl border border-white/10 bg-white/[0.035] p-6">
              <div className="font-semibold mb-2" style={{ color: "#E8C987" }}>{card.h}</div>
              <div className="text-sm text-neutral-300">{card.p}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED CATEGORIES — lean and elegant */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8" style={{ color: "#E8C987" }}>
            Featured Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: "/custom", title: "Custom Orders", blurb: "From concept to heirloom: tables, panels, lighting, built-ins." },
              { href: "/residential", title: "Residential", blurb: "Dining, consoles, vanities, mantels, stair & wall features." },
              { href: "/commercial", title: "Commercial", blurb: "Reception desks, feature walls, bar tops, conference tables." },
              { href: "/energetic", title: "Energetic Crafting™", blurb: "Geometry-driven motifs and resonance-aware detailing." },
              { href: "/signature", title: "Signature Series", blurb: "Limited runs with rare materials and refined geometries." },
              { href: "/sets", title: "Sets & Collections", blurb: "Coordinated suites for cohesive spaces and brands." }
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="block rounded-xl border border-white/10 bg-white/[0.035] p-6 hover:bg-white/[0.06] transition"
              >
                <div className="text-lg font-semibold" style={{ color: "#E8C987" }}>{c.title}</div>
                <div className="text-sm text-neutral-300 mt-1">{c.blurb}</div>
                <div className="mt-3 text-xs" style={{ color: "#E8C987" }}>Explore →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STORY BAND — tighter copy, About vibe */}
      <section className="px-6 py-14">
        <div
          className="max-w-6xl mx-auto rounded-2xl border border-white/10 p-8 md:p-12"
          style={{
            background:
              "linear-gradient(180deg, rgba(232,201,135,0.08), rgba(232,201,135,0.02))"
          }}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: "#E8C987" }}>
            The STRION Approach
          </h3>
          <p className="text-neutral-300 leading-relaxed">
            We design and build with intention. Every piece is proportioned for harmony, crafted for longevity,
            and detailed for presence. Whether you’re commissioning a statement dining table, a reception feature,
            or resonance lighting, STRION unites advanced carpentry with sacred-geometry discipline and material
            intelligence to achieve a result that feels inevitable — and undeniably yours.
          </p>
          <div className="mt-6">
            <Link
              href="/work"
              className="inline-block rounded-lg px-5 py-3 border border-[#E8C987] text-[#E8C987] hover:bg-[#E8C987] hover:text-black transition"
            >
              View Recent Builds
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-semibold" style={{ color: "#E8C987" }}>
              Ready to begin your commission?
            </h3>
            <p className="mt-3 text-neutral-300">
              Tell us your dimensions, use, and aesthetic direction — we’ll refine, prototype, and quote.
            </p>
            <div className="mt-6">
              <Link
                href="/custom"
                className="inline-block rounded-lg px-6 py-3 font-semibold bg-[#E8C987] text-black hover:opacity-90 transition"
              >
                Start Your Design
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
