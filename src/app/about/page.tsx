// src/app/about/page.tsx
import Link from "next/link";

const wrap: React.CSSProperties = { maxWidth: 1100, margin: "0 auto", padding: "64px 20px" };
const card: React.CSSProperties = { background: "rgba(255,255,255,.03)", border: "1px solid #2a2a2a", borderRadius: 16, padding: 20, marginTop: 16 };
const h2: React.CSSProperties = { fontSize: 24, fontWeight: 800 };

export default function AboutPage() {
  return (
    <main style={wrap}>
      <h1 style={{ fontSize: 38, fontWeight: 800 }}>About STRION</h1>
      <p style={{ color: "#cfcfcf", marginTop: 8, lineHeight: 1.7 }}>
        <strong>Strion</strong> is the manifestation of divine craftsmanship—a convergence of vision, energy, and precision.
        Every creation is engineered with intention and built to endure. We don’t follow trends; we forge legacy.
      </p>

      {/* Dual Focus */}
      <section style={card}>
        <h2 style={h2}>Our Dual Focus</h2>
        <p style={{ color: "#bdbdbd", marginTop: 6, lineHeight: 1.7 }}>
          Strion operates in two harmonized realms. The first is our <em>Luxury Builds</em>—commercial, residential, and sets—where
          precision carpentry delivers daily-use excellence at scale. The second is our <em>Energetic Crafting</em>—signature masterworks
          mapped to intention using sacred geometry, numerology, and material alchemy.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 12, marginTop: 12 }}>
          <div style={card}>
            <div style={{ fontWeight: 800 }}>Commercial</div>
            <p style={{ color: "#bdbdbd", marginTop: 6 }}>Tables, conference builds, hospitality installations—engineered for presence and performance.</p>
            <Link href="/commercial" style={{ color: "#C6A746", textDecoration: "none" }}>Explore Commercial →</Link>
          </div>
          <div style={card}>
            <div style={{ fontWeight: 800 }}>Energetic Crafting</div>
            <p style={{ color: "#bdbdbd", marginTop: 6 }}>Signature, intention-aligned builds using sacred proportion and curated materials.</p>
            <Link href="/energetic" style={{ color: "#C6A746", textDecoration: "none" }}>Explore Energetic Crafting →</Link>
          </div>
          <div style={card}>
            <div style={{ fontWeight: 800 }}>Residential</div>
            <p style={{ color: "#bdbdbd", marginTop: 6 }}>Custom builds for living spaces—dining, coffee, desks, wall pieces, lighting.</p>
            <Link href="/residential" style={{ color: "#C6A746", textDecoration: "none" }}>Explore Residential →</Link>
          </div>
          <div style={card}>
            <div style={{ fontWeight: 800 }}>Sets & Collections</div>
            <p style={{ color: "#bdbdbd", marginTop: 6 }}>Cohesive groups designed as one vision—tables, panels, rails, lighting.</p>
            <Link href="/sets" style={{ color: "#C6A746", textDecoration: "none" }}>Explore Sets →</Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={card}>
        <h2 style={h2}>Our Mission</h2>
        <p style={{ color: "#bdbdbd", marginTop: 6, lineHeight: 1.7 }}>
          To unite form, function, and frequency across both normal and custom builds. We merge ancient knowledge with modern innovation,
          transforming wood, metal, and crystal into instruments of alignment—whether for a private residence, a boardroom, or a sacred space.
        </p>
      </section>

      {/* Philosophy */}
      <section style={card}>
        <h2 style={h2}>Philosophy & Process</h2>
        <p style={{ color: "#bdbdbd", marginTop: 6, lineHeight: 1.7 }}>
          Every piece begins as a blueprint of purpose—guided by biogeometry, numerology, and sacred ratios. Our protocol: Consultation →
          Energetic Mapping (as needed) → Design → Craft → Activation → Delivery. The result is not just furniture; it’s functional energy architecture.
        </p>
      </section>

      {/* Craft & Materials */}
      <section style={card}>
        <h2 style={h2}>Craftsmanship & Materials</h2>
        <p style={{ color: "#bdbdbd", marginTop: 6, lineHeight: 1.7 }}>
          Live-edge hardwoods, resin rivers, copper, brass, gold inlay, and curated crystals (quartz, selenite, amethyst, citrine).
          Legacy joinery and hand finishing anchor the work. Material selection and geometry are paired to each build’s intention.
        </p>
      </section>

      {/* Nationwide */}
      <section style={card}>
        <h2 style={h2}>Nationwide, White-Glove</h2>
        <p style={{ color: "#bdbdbd", marginTop: 6, lineHeight: 1.7 }}>
          Insured freight, moisture-controlled crating, liftgate where required, optional on-site installation for large pieces.
          Every commission ships with a Care & Resonance Guide.
        </p>
      </section>

      {/* Atelier Note (impersonal founder note) */}
      <section style={card}>
        <h2 style={h2}>From the Atelier</h2>
        <p style={{ color: "#bdbdbd", marginTop: 6, lineHeight: 1.7 }}>
          Strion is a movement of makers and designers committed to sacred precision. Our pledge is simple: build with intention, stand behind the work,
          and leave spaces better—energetically and aesthetically—than we found them.
        </p>
      </section>

      {/* CTA */}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Link href="/custom" style={{ background: "#C6A746", color: "#111", padding: "12px 18px", borderRadius: 12, fontWeight: 800, textDecoration: "none" }}>
          Start Your Design
        </Link>
      </div>
    </main>
  );
}
