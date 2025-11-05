"use client";

import Image from "next/image";
import Link from "next/link";
import SoundToggle from "@/components/SoundToggle";

export default function Home() {
  // call this on important clicks for the subtle chime
  const ping = () => (window as any).__strionChime?.();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative w-full min-h-[92vh] overflow-hidden flex items-center">
        {/* Background: your full-bleed image */}
        <Image
          src="/file_000000007a4461f59f24187f958711dc~3.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        {/* Parallax-ish grid overlay (CSS animated) */}
        <div className="absolute inset-0 mystic-grid pointer-events-none" />

        {/* Dark gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
            <div className="relative h-24 w-24 mb-6 rounded-full ring-1 ring-[#E8C987]/50 overflow-hidden">
              <Image
                src="/file_000000007a4461f59f24187f958711dc~2.png"
                alt="STRION Crest"
                fill
                className="object-contain"
              />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#E8C987] drop-shadow-[0_0_20px_rgba(232,201,135,0.25)]">
              Custom Carpentry • Energetic Crafting™
            </h1>

            <p className="mt-5 max-w-3xl text-lg md:text-xl text-neutral-200 leading-relaxed">
              Heirloom furniture and architectural elements forged from premium hardwoods,
              sacred geometry, metals, and crystal integration—engineered for legacy and tuned for resonance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link href="/custom" className="btn-gold" onClick={ping}>Start Your Design</Link>
              <Link href="/about" className="btn-ghost" onClick={ping}>Learn Our Method</Link>
              <SoundToggle />
            </div>

            {/* Category cards */}
            <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/categories#tables", title: "Tables", text: "Dining • Conference • River • Live-edge" },
                { href: "/categories#panels", title: "Wall Panels", text: "Sacred geometry • Acoustic • Resonance" },
                { href: "/categories#lighting", title: "Lighting", text: "Selenite • Crystal • Copper & Gold accents" },
                { href: "/categories#trim", title: "Trim & Built-ins", text: "Cabinetry • Shelves • Feature walls" },
              ].map((c) => (
                <Link
                  key={c.title}
                  href={c.href}
                  className="card hover:shadow-[0_0_40px_rgba(232,201,135,0.18)]"
                  onClick={ping}
                >
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#E8C987]">{c.title}</h3>
                    <p className="mt-1 text-sm text-neutral-300">{c.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS PREVIEW */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#E8C987]">The Commissioning Process</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { n: "01", t: "Discovery", d: "Share your intent, space, and desired function. We align materials, geometry, and finish to your vision." },
            { n: "02", t: "Design & Spec", d: "We translate intent into drawings, materials, and resonance specs. Includes mood boards and pricing." },
            { n: "03", t: "Craft & Deliver", d: "We hand-build, tune, and finish. White-glove delivery nationwide; install available." },
          ].map((s) => (
            <div key={s.n} className="card p-5">
              <div className="text-[#E8C987] font-semibold">{s.n}</div>
              <div className="mt-1 text-lg font-semibold">{s.t}</div>
              <div className="mt-2 text-neutral-300 text-sm">{s.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/custom" className="btn-gold" onClick={ping}>Get Instant Estimate</Link>
          <Link href="/about" className="btn-ghost" onClick={ping}>See Materials & Methods</Link>
        </div>
      </section>
    </main>
  );
}
