import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-[86vh] flex items-center">
        <Image
          src="/file_000000007a4461f59f24187f958711dc~3.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-28">
          <div className="flex items-center gap-4 mb-6">
            <Image src="/crest.svg" alt="STRION crest" width={56} height={56} />
            <span className="tracking-[0.25em] text-sm text-[#E8C987]">STRION</span>
          </div>
          <h1 className="max-w-4xl text-4xl md:text-6xl font-extrabold leading-tight">
            Custom Carpentry &{" "}
            <span className="text-[#E8C987]">Energetic Crafting™</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base md:text-xl text-neutral-200">
            Heirloom furniture and architectural elements forged from premium hardwoods,
            sacred-geometry discipline, refined metals, and optional crystal integration —
            engineered for legacy and presence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/custom"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-[#E8C987] text-black hover:opacity-90 transition"
            >
              Start Your Design
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border border-[#E8C987] text-[#E8C987] hover:bg-[#E8C987] hover:text-black transition"
            >
              View Recent Builds
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-neutral-300">
            <div className="rounded-md border border-white/10 bg-white/5 p-3">Heirloom Craft</div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">Sacred Geometry</div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">Premium Hardwoods</div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">Nationwide Delivery</div>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#E8C987]">Featured Categories</h2>
        <p className="mt-2 text-neutral-300">
          From concept to heirloom: tables, panels, lighting, built-ins, and statement features.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            title="Residential"
            desc="Dining, consoles, vanities, mantels, stair & wall features."
            href="/residential"
          />
          <Card
            title="Commercial"
            desc="Reception desks, feature walls, bar tops, conference tables."
            href="/commercial"
          />
          <Card
            title="Energetic Crafting™"
            desc="Geometry-driven motifs and resonance-aware detailing with refined metals and optional crystal inlays."
            href="/energetic"
          />
          <Card
            title="Signature Series"
            desc="Limited runs with rare materials and refined geometries."
            href="/signature"
          />
          <Card
            title="Resonance Lighting"
            desc="Custom fixtures that anchor presence and soften a room’s feel."
            href="/categories"
          />
          <Card
            title="Sets & Collections"
            desc="Coordinated suites for cohesive spaces and brands."
            href="/sets"
          />
        </div>

        <p className="mt-6 text-xs text-neutral-400">
          Legs are sold & arranged separately due to changing availability.
        </p>
      </section>

      {/* BRAND PANEL */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/file_000000007a4461f59f24187f958711dc~3.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <h3 className="text-2xl md:text-3xl font-semibold">The STRION Approach</h3>
          <p className="mt-3 max-w-4xl text-neutral-300">
            We design and build with intention. Every piece is proportioned for harmony,
            crafted for longevity, and detailed for presence. Whether you’re commissioning a
            statement dining table, a reception feature, or resonance lighting, STRION unites
            advanced carpentry with sacred-geometry discipline and material intelligence to
            achieve a result that feels inevitable — and undeniably yours.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/work" className="underline underline-offset-4 decoration-[#E8C987]">
              View Recent Builds
            </Link>
            <Link href="/about" className="underline underline-offset-4 decoration-[#E8C987]">
              Learn Our Method
            </Link>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="rounded-xl border border-[#E8C987]/30 bg-gradient-to-r from-[#E8C987]/10 to-transparent p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-xl md:text-2xl font-semibold">Ready to begin your commission?</h4>
                <p className="mt-1 text-neutral-300">
                  Tell us your dimensions, use, and aesthetic direction — we’ll refine, prototype, and quote.
                </p>
              </div>
              <Link
                href="/custom"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-[#E8C987] text-black hover:opacity-90 transition"
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

/* lightweight inline card component (no hooks) */
function Card({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-white/10 bg-white/5 p-5 hover:border-[#E8C987]/60 hover:bg-white/[0.08] transition"
    >
      <h3 className="text-lg font-semibold text-white group-hover:text-[#E8C987]">{title}</h3>
      <p className="mt-1 text-sm text-neutral-300">{desc}</p>
      <span className="mt-3 inline-block text-sm text-[#E8C987] group-hover:translate-x-0.5 transition">
        Explore →
      </span>
    </Link>
  );
        }
