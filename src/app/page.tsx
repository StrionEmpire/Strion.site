import Link from "next/link";

const linkGold =
  "inline-block text-[#E8C987] underline-offset-4 decoration-[#E8C987]/40 hover:decoration-[#E8C987] hover:text-[#f1d9a1] transition";

const chip =
  "rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-neutral-300";

const card =
  "rounded-2xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.06] transition p-6 md:p-7";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Announcement / proof line */}
      <div className="w-full text-center text-[13px] tracking-wide py-2 bg-white/[0.03] border-b border-white/10">
        <span className="text-[#E8C987]">STRION</span> — Originators of
        <span className="mx-1 font-semibold text-[#E8C987]">Energetic Crafting™</span>
        • Custom carpentry engineered for legacy
      </div>

      {/* HERO */}
      <section
        className="relative w-full min-h-[70vh] flex items-center justify-center px-6"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -10%, rgba(232,201,135,0.10), rgba(0,0,0,0) 60%), linear-gradient(to bottom, rgba(0,0,0,0.94), rgba(0,0,0,0.90))",
        }}
      >
        <div className="max-w-6xl w-full mx-auto text-center">
          <div className="mx-auto mb-6 h-[84px] w-[84px]">
            <img
              src="/file_000000007a4461f59f24187f958711dc~2.png"
              alt="STRION crest"
              width={84}
              height={84}
              className="mx-auto block"
            />
          </div>

          <h1
            className="font-bold tracking-tight leading-[1.1] text-4xl md:text-6xl"
            style={{ color: "#E8C987" }}
          >
            Custom Carpentry • Energetic Crafting™
          </h1>

          <p className="mx-auto max-w-3xl mt-4 text-lg md:text-xl text-neutral-300 leading-relaxed">
            We fuse premium hardwoods with sacred geometry, conductive metal inlays,
            and optional crystal integration to create pieces that don’t just fill a
            space—they tune it. Designed in Georgia, delivered nationwide.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <span className={chip}>Heirloom Craft</span>
            <span className={chip}>Sacred Geometry</span>
            <span className={chip}>Premium Hardwoods</span>
            <span className={chip}>Nationwide Delivery</span>
          </div>
        </div>
      </section>

      {/* BRAND PROMISE STRIP */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={card}>
            <div className="font-semibold mb-2" style={{ color: "#E8C987" }}>
              Architected for Presence
            </div>
            <p className="text-sm text-neutral-300">
              Proportions, joinery, and finishes that age with grace and anchor a room with
              quiet confidence.
            </p>
          </div>
          <div className={card}>
            <div className="font-semibold mb-2" style={{ color: "#E8C987" }}>
              Material Intelligence
            </div>
            <p className="text-sm text-neutral-300">
              Refined metal inlays and optional crystal integration, tuned to enhance balance,
              flow, and intention.
            </p>
          </div>
          <div className={card}>
            <div className="font-semibold mb-2" style={{ color: "#E8C987" }}>
              Commission with Clarity
            </div>
            <p className="text-sm text-neutral-300">
              Transparent quoting, prototyping, and white-glove delivery. Built in Georgia •
              Delivered nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="px-6 pb-4">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-semibold text-center mb-6"
            style={{ color: "#E8C987" }}
          >
            Featured Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: "/custom",
                title: "Custom Orders",
                blurb: "From concept to heirloom: tables, panels, lighting, built-ins.",
              },
              {
                href: "/residential",
                title: "Residential",
                blurb:
                  "Dining, consoles, vanities, mantels, stair & wall features.",
              },
              {
                href: "/commercial",
                title: "Commercial",
                blurb:
                  "Reception desks, feature walls, bar tops, conference tables.",
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
                blurb: "Coordinated suites for cohesive spaces and brands.",
              },
            ].map((c) => (
              <Link key={c.href} href={c.href} className={card}>
                <div className="text-lg font-semibold" style={{ color: "#E8C987" }}>
                  {c.title}
                </div>
                <p className="text-sm text-neutral-300 mt-1">{c.blurb}</p>
                <span className="mt-3 text-sm " style={{ color: "#E8C987" }}>
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STORY BAND */}
      <section className="px-6 py-12">
        <div
          className="max-w-6xl mx-auto rounded-2xl border border-white/10 p-8 md:p-12"
          style={{
            background:
              "linear-gradient(180deg, rgba(232,201,135,0.08), rgba(232,201,135,0.02))",
          }}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: "#E8C987" }}>
            Why STRION is Different
          </h3>
          <p className="text-neutral-300 leading-relaxed max-w-4xl">
            We pioneered <span className="text-[#E8C987]">Energetic Crafting™</span> — a discipline that merges
            master carpentry with sacred-geometry rigor and material resonance. Every commission is proportioned
            for harmony, crafted for longevity, and detailed to shape how the room feels. The result isn’t just
            beautiful; it’s **felt**.
          </p>
          <div className="mt-6">
            <Link href="/work" className={linkGold}>
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
