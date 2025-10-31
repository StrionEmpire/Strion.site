import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <Hero />

      {/* Intro */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Precision Craft · Energetic Design · Timeless Materials
        </h2>
        <p className="text-lg text-gray-300">
          Custom carpentry, sacred geometry installations, energetic furnishings, and luxury made-to-order pieces engineered to outlive trends — and build legacies.
        </p>
      </section>

      {/* CTA */}
      <section className="w-full flex justify-center py-10">
        <Link
          href="/custom"
          className="px-8 py-4 bg-neutral-900 border border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition"
        >
          Begin Your Custom Order
        </Link>
      </section>
    </main>
  );
}
