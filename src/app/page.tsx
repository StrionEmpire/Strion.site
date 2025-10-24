// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

const wrap: React.CSSProperties = { maxWidth: 1120, margin: "0 auto", padding: "64px 20px" };
const h1: React.CSSProperties = { fontSize: 44, letterSpacing: ".02em", fontWeight: 800, textAlign: "center" };
const lead: React.CSSProperties = { color: "#cfcfcf", maxWidth: 820, margin: "16px auto 0", textAlign: "center", lineHeight: 1.65 };
const btn: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 10, background: "#C6A746", color: "#111", padding: "12px 18px", borderRadius: 12, fontWeight: 800, textDecoration: "none" };
const link: React.CSSProperties = { color: "#C6A746", textDecoration: "none" };
const card: React.CSSProperties = { background: "rgba(255,255,255,.03)", border: "1px solid #2a2a2a", borderRadius: 16, overflow: "hidden" };
const sectionTitle: React.CSSProperties = { fontSize: 28, fontWeight: 800 };

export default function Page() {
  return (
    <>
      {/* HERO — Purpose-first */}
      <section style={wrap}>
        <h1 style={h1}>
          STRION — <span style={{ color: "#C6A746" }}>Luxury Energetic Crafting</span> for Tables, Walls & Light
        </h1>
        <p style={lead}>
          We design and build **purpose-aligned** furniture and architectural pieces—mapped to intent
          (Wealth, Healing, Clarity, Protection, Legacy), engineered with sacred geometry, premium woods,
          metals (copper/gold/brass), crystals (quartz/selenite), and legacy joinery. Nationwide commissions.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
          <Link href="/custom" style={btn}>Start Your Design</Link>
          <Link href="/shop" style={link}>See Starting Prices →</Link>
          <Link href="/nationwide" style={link}>Nationwide Delivery →</Link>
        </div>
      </section>

      {/* SIGNATURE — hero line */}
      <section style={{ ...wrap, paddingTop: 0 }}>
        <h2 style={sectionTitle}>Signature Series</h2>
        <p style={{ color: "#cfcfcf", marginTop: 8 }}>
          Our pinnacle builds—where precision carpentry meets energetic alignment.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
          {[
            { href: "/shop/resonance-table", src: "/resonance-table.png", title: "Resonance Table", price: "$6,500+", blurb: "Live-edge walnut, resin river, copper veins, quartz core." },
            { href: "/shop/abundance-octagon", src: "/octagon-table.png", title: "Abundance Octagon", price: "$8,500+", blurb: "Eight-sided wealth geometry, 24K inlay, citrine medallion." },
            { href: "/shop/selenite-wall-light", src: "/selenite-light.png", title: "Selenite Wall Light", price: "$1,600+", blurb: "Selenite rods, brass frame, ambient halo." },
          ].map((x) => (
            <Link key={x.title} href={x.href} style={{ color: "inherit", textDecoration: "none" }}>
              <article style={card}>
                <Image src={x.src} alt={x.title} width={1600} height={1000} style={{ width: "100%", height: 210, objectFit: "cover" }} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 800 }}>{x.title}</div>
                  <div style={{ color: "#bdbdbd", fontSize: 14 }}>{x.blurb}</div>
                  <div style={{ marginTop: 6, color: "#C6A746", fontWeight: 800 }}>{x.price}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <Link href="/signature" style={link}>Explore Signature Series →</Link>
        </div>
      </section>

      {/* CATALOG PREVIEW — breadth + starting prices */}
      <section style={{ ...wrap, paddingTop: 0 }}>
        <h2 style={sectionTitle}>Shop & Catalog</h2>
        <p style={{ color: "#cfcfcf", marginTop: 8 }}>
          Tables, trays, wall pieces, rails, and lighting—each with a clear purpose and starting price.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
          {[
            { href: "/shop/flux-river", src: "/resonance-table.png", title: "Flux River Table", price: "$3,200+" },
            { href: "/shop/guardian-wall-panel", src: "/selenite-light.png", title: "Guardian Wall Panel", price: "$1,800+" },
            { href: "/shop/meridian-rail", src: "/selenite-light.png", title: "Meridian Rail", price: "$2,500+" },
            { href: "/shop/sigil-coasters", src: "/resonance-table.png", title: "Sigil Coasters (4)", price: "$68" },
          ].map((x) => (
            <Link key={x.title} href={x.href} style={{ color: "inherit", textDecoration: "none" }}>
              <article style={card}>
                <Image src={x.src} alt={x.title} width={1600} height={1000} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 800 }}>{x.title}</div>
                  <div style={{ marginTop: 6, color: "#C6A746", fontWeight: 800 }}>{x.price}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <Link href="/shop" style={btn}>Browse All Products</Link>
        </div>
      </section>

      {/* CONFIGURATOR CTA — pre-consult build */}
      <section style={{ ...wrap, paddingTop: 0 }}>
        <div style={{ ...card, padding: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 14 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Design Your Build — See a Starting Range</h3>
              <p style={{ color: "#bdbdbd", marginTop: 6 }}>
                Use our fast configurator to choose size, wood, resin, metals, crystals, geometry, finish and intent.
                You’ll see an **instant estimate range** before we do a full consultation.
              </p>
              <Link href="/custom" style={btn}>Open Configurator</Link>
            </div>
            <div style={{ alignSelf: "center", color: "#cfcfcf", fontSize: 14 }}>
              <ul style={{ margin: 0, padding: "0 0 0 18px", lineHeight: 1.7 }}>
                <li>Purpose-aligned (Wealth / Healing / Clarity / Protection / Legacy)</li>
                <li>Material pairing (walnut, copper, quartz, selenite, 24K accents)</li>
                <li>Geometry options (Octagon, Phi, 3-6-9, Vesica)</li>
                <li>Nationwide white-glove freight & optional install</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / NATIONWIDE */}
      <section style={{ ...wrap, paddingTop: 0 }}>
        <h2 style={sectionTitle}>Nationwide, White-Glove</h2>
        <p style={{ color: "#cfcfcf", marginTop: 8 }}>
          Insured freight, moisture-controlled crating, liftgate where required, optional on-site installation for conference and architectural pieces.
          Every commission ships with a **Care & Resonance Guide**.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 }}>
          <Link href="/nationwide" style={link}>Shipping & Lead Times →</Link>
          <Link href="/about" style={link}>Our Method & Philosophy →</Link>
          <Link href="/signature" style={link}>Signature Series →</Link>
        </div>
      </section>

      {/* SEO / WHY STRION — concise, luxury tone */}
      <section style={{ ...wrap, paddingTop: 0 }}>
        <h2 style={sectionTitle}>What Sets STRION Apart</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
          {[
            ["Energetic Crafting", "Every build is mapped to intent and space—then engineered with sacred proportion."],
            ["Material Alchemy", "Walnut, copper, quartz, selenite, and 24K accents paired to purpose."],
            ["Protocol & Precision", "Consult → Energetic Mapping → Geometry → Build → Activation → Delivery."],
            ["Luxury & Privacy", "White-glove, limited runs, legacy-grade craftsmanship. Nationwide availability."],
          ].map(([t, d]) => (
            <div key={t} style={{ ...card, padding: 16 }}>
              <div style={{ fontWeight: 800 }}>{t}</div>
              <div style={{ color: "#bdbdbd", marginTop: 6 }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ ...wrap, textAlign: "center", paddingTop: 0 }}>
        <p style={{ color: "#cfcfcf" }}>Ready when you are.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/custom" style={btn}>Start Your Design</Link>
          <Link href="/shop" style={link}>Browse the Catalog →</Link>
        </div>
      </section>
    </>
  );
}
