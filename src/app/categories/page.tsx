"use client";

import Link from "next/link";
import { BUILD_TYPES, SUBTYPES, toSlug } from "@/lib/catalog";

const wrap: React.CSSProperties = {
  maxWidth: 1080,
  margin: "0 auto",
  padding: 24,
};

export default function Categories() {
  return (
    <main style={wrap}>
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>Browse by Category</h1>
      <p style={{ color: "#cfcfcf", marginTop: 8, lineHeight: 1.7 }}>
        Explore our most requested builds. Each category links to examples and can be configured in the Custom page.
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 24,
          marginTop: 24,
        }}
      >
        {BUILD_TYPES.map((type) => (
          <article
            key={type}
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.4)",
              borderRadius: 14,
              padding: 20,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 18, color: "#E8C987" }}>{type}</div>

            <ul style={{ marginTop: 10, color: "#bdbdbd", lineHeight: 1.6, fontSize: 14 }}>
              {SUBTYPES[type].map((sub) => (
                <li key={sub}>• {sub}</li>
              ))}
            </ul>

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link
                href={`/custom?type=${encodeURIComponent(type)}`}
                className="px-4 py-2 rounded-lg bg-[#E8C987] text-black font-semibold hover:opacity-90 transition"
              >
                Customize this Category
              </Link>
              <Link
                href={`/work?filter=${toSlug(type)}`}
                className="px-4 py-2 rounded-lg border border-[#E8C987] text-[#E8C987] hover:bg-[#E8C987] hover:text-black transition"
              >
                See Examples
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
