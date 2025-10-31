import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO (server-safe) */}
      <section
        className="w-full min-h-[88vh] flex items-center justify-center text-center px-6 relative"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.78), rgba(0,0,0,0.88)), url('/file_000000007a4461f59f24187f958711dc~3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mx-auto mb-6 h-24 w-24">
            <img
              src="/file_000000007a4461f59f24187f958711dc~2.png"
              alt="STRION crest"
              width={96}
              height={96}
              className="mx-auto block"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#E8C987]">
            Custom Carpentry • Energetic Crafting™
          </h1>
          <p className="mt-5 text-lg md:text-xl text-neutral-200 leading-relaxed">
            Heirloom furniture and architectural elements forged from premium hardwoods,
            sacred geometry, refined metals, and crystal integration — engineered for legacy.
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
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#E8C987]">
          Precision Meets Resonance
        </h2>
        <p className="mt-4 text-lg text-neutral-300">
          Live-edge tables, resin inlays, sacred geometry panels, resonance lighting, and statement builds
          for residential, commercial, and spiritual spaces — crafted in Georgia, delivered nationwide.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
          <Link href="/categories" className="underline hover:no-underline">Explore Categories</Link>
          <span className="opacity-50">•</span>
          <Link href="/work" className="underline hover:no-underline">Recent Builds</Link>
          <span className="opacity-50">•</span>
          <Link href="/signature" className="underline hover:no-underline">Signature Series</Link>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#E8C987]">Featured Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { href: "/custom", title: "Custom Orders", blurb: "From napkin sketch to heirloom builds: tables, panels, lighting, built-ins." },
            { href: "/residential", title: "Residential", blurb: "Dining, consoles, vanities, mantels, stair & wall features tailored to your space." },
            { href: "/commercial", title: "Commercial", blurb: "Reception desks, feature walls, bar tops, conference tables—brand-forward and durable." },
            { href: "/energetic", title: "Energetic Crafting™", blurb: "Geometry-driven motifs, crystal and metal integration, resonance-aware detailing." },
            { href: "/signature", title: "Signature Series", blurb: "Limited editions featuring rare materials and refined geometries." },
            { href: "/sets", title: "Sets & Collections", blurb: "Cohesive multi-piece suites for homes, studios, and hospitality." }
          ].map((c) => (
            <Link key={c.href} href={c.href} className="block rounded-xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.07] transition">
              <div className="text-lg font-semibold text-[#E8C987]">{c.title}</div>
              <div className="text-sm text-neutral-300 mt-1">{c.blurb}</div>
              <div className="mt-3 text-xs text-[#E8C987]">Explore →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="px-6 py-14 max-w-6xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-[#E8C987]">What Sets STRION Apart</h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ["Heirloom Craft", "Premium hardwoods, precision joinery, finish systems built to age gracefully."],
              ["Sacred Geometry", "Motifs and proportions aligned for balance, flow, and presence."],
              ["Material Intelligence", "Selective metal inlays and optional crystal integration to elevate resonance."],
              ["Nationwide Service", "White-glove quoting, careful crating, and delivery across the U.S."]
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-white/10 bg-black/40 p-5">
                <div className="font-semibold text-[#E8C987]">{title}</div>
                <div className="mt-2 text-sm text-neutral-300">{text}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/custom"
              className="inline-block rounded-lg px-5 py-3 border border-[#E8C987] text-[#E8C987] hover:bg-[#E8C987] hover:text-black transition"
            >
              Begin Your Commission
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
