import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section
        className="w-full min-h-[80vh] flex items-center justify-center text-center px-6"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('/file_000000007a4461f59f24187f958711dc~3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="mx-auto mb-6 h-24 w-24 relative">
            <Image
              src="/file_000000007a4461f59f24187f958711dc~2.png"
              alt="STRION crest"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#E8C987]">
            STRION — Energetic Crafting™
          </h1>
          <p className="mt-5 text-lg md:text-xl text-neutral-200 leading-relaxed">
            Heirloom furniture and architectural elements in premium hardwoods,
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

      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#E8C987]">
          Precision Meets Resonance
        </h2>
        <p className="mt-4 text-lg text-neutral-300">
          Live-edge tables, resin inlays, sacred geometry panels, resonance lighting, and statement builds
          for residential, commercial, and spiritual spaces — crafted in Georgia, delivered nationwide.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
          <Link href="/categories" className="underline hover:no-underline">
            Explore Categories
          </Link>
          <span className="opacity-50">•</span>
          <Link href="/work" className="underline hover:no-underline">
            Recent Builds
          </Link>
          <span className="opacity-50">•</span>
          <Link href="/signature" className="underline hover:no-underline">
            Signature Series
          </Link>
        </div>
      </section>
    </main>
  );
}
