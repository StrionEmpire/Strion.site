// src/app/components/Hero.tsx
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/file_000000007a4461f59f24187f958711dc~3.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-15"
          aria-hidden
        />
        {/* subtle vignette + tint */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.65)_65%,rgba(0,0,0,0.85)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      </div>

      {/* Top stripe with round logo + wordmark */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center gap-3 py-4">
          <Image
            src="/file_000000007a4461f59f24187f958711dc~2.png"
            alt="STRION crest"
            width={48}
            height={48}
            className="rounded-full border border-amber-500/60 shadow"
          />
          <span className="text-lg font-semibold tracking-wider text-amber-400">
            STRION
          </span>
        </div>
      </div>

      {/* Main hero content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-4 inline-block rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold tracking-wide text-amber-300 ring-1 ring-amber-400/30">
            Energetic Crafting™ • Custom Carpentry
          </p>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Custom live-edge & epoxy builds
            <span className="text-amber-300"> engineered for legacy.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-200 sm:text-lg">
            We fuse heirloom hardwoods, sacred geometry, conductive metals, and
            crystal inlays—tuned with tone programming—to craft tables, panels,
            lighting, and statement pieces that feel alive. Built to be used,
            kept, and passed on.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/custom"
              className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-black shadow hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            >
              Start Your Design
            </Link>
            <Link
              href="/work"
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              See Recent Builds
            </Link>
          </div>

          {/* Trust row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-neutral-300/90">
            <span className="whitespace-nowrap">Live-edge slabs</span>
            <span className="hidden h-1 w-1 rounded-full bg-neutral-500 sm:inline-block" />
            <span className="whitespace-nowrap">Resin rivers & inlays</span>
            <span className="hidden h-1 w-1 rounded-full bg-neutral-500 sm:inline-block" />
            <span className="whitespace-nowrap">Crystal & metal accents</span>
            <span className="hidden h-1 w-1 rounded-full bg-neutral-500 sm:inline-block" />
            <span className="whitespace-nowrap">Made in Georgia • Nationwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}
