import Image from "next/image";
import Link from "next/link";

const wrap: React.CSSProperties = { maxWidth: 1120, margin: "0 auto", padding: "64px 20px" };
const card: React.CSSProperties = { background: "rgba(255,255,255,.03)", border: "1px solid #2a2a2a", borderRadius: 16, overflow: "hidden" };
const pad: React.CSSProperties = { padding: 16 };

export default function Page() {
  return (
    <>
      {/* HERO (About energy) */}
      <section style={wrap}>
        <h1 style={{ fontSize: 42, fontWeight: 800, letterSpacing: ".02em", textAlign: "center" }}>
          STRION — <span style={{ color: "#C6A746" }}>Luxury Energetic Crafting</span>
        </h1>
        <p style={{ color: "#cfcfcf", maxWidth: 820, margin: "16px auto 0", textAlign: "center", lineHeight: 1.7 }}>
          Strion is the manifestation of divine craftsmanship — a convergence of vision, energy, and precision.
          We craft purpose-aligned furniture and architectural pieces for homes and institutions nationwide.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 22, flexWrap: "wrap" }}>
          <Link href="/custom" style={btn()}>Start Your Design</Link>
          <Link href="/categories" style={link()}>Browse by Category →</Link>
          <Link href="/energetic" style={link()}>Energetic Crafting →</Link>
        </div>
      </section>

      {/* DUAL FOCUS */}
      <section style={{ ...wrap, paddingTop: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16 }}>
          {[
            ["Luxury Builds", "Commercial, residential, and sets—precision carpentry for daily excellence.", "/commercial"],
            ["Energetic Crafting", "Signature masterworks mapped to intention via sacred geometry and materials.", "/energetic"],
            ["Nationwide", "Insured white-glove freight, optional on-site install. Care & Resonance Guide included.", "/nationwide"],
          ].map(([t, d, href]) => (
            <article key={t as string} style={{ ...card }}>
              <div style={pad}>
                <div style={{ fontWeight: 800, fontSize: 20 }}>{t}</div>
                <div style={{ color: "#bdbdbd", marginTop: 6 }}>{d}</div>
                <div style={{ marginTop: 10 }}>
                  <Link href={href as string} style={link()}>
                    Learn more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CATEGORIES PREVIEW */}
      <section style={{ ...wrap, paddingTop: 0 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800 }}>Most Requested Categories</h2>
        <p style={{ color: "#cfcfcf", marginTop: 6 }}>Explore classic requests and configure instantly.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
          {[
            { href: "/custom?itemType=Dining%20Table&river=Clear%20Resin%20River", title: "Epoxy River Tables" },
            { href: "/custom?itemType=Dining%20Table&edge=Live", title: "Live-Edge Tables" },
            { href: "/custom?itemType=Conference%20Table", title: "Conference Tables" },
            { href: "/custom?itemType=Desk", title: "Desks & Consoles" },
            { href: "/custom?itemType=Wall%20Panel", title: "Wall Panels" },
            { href: "/custom?itemType=Wall%20Light&crystals=Selenite", title: "Wall Lights (Selenite)" },
          ].map((x) => (
            <Link key={x.title} href={x.href} style={{ color: "inherit", textDecoration: "none" }}>
              <article style={card}>
                <div style={{ ...pad, minHeight: 120 }}>
                  <div style={{ fontWeight: 800 }}>{x.title}</div>
                  <div style={{ color: "#bdbdbd", marginTop: 6 }}>Start with defaults, then refine materials and geometry.</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link href="/categories" style={btn()}>Browse All Categories</Link>
        </div>
      </section>

      {/* SIGNATURE PREVIEW */}
      <section style={{ ...wrap, paddingTop: 0 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800 }}>Signature Series</h2>
        <p style={{ color: "#cfcfcf", marginTop: 6 }}>Our pinnacle builds—where precision carpentry meets energetic alignment.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
          {[
            { href: "/shop/resonance-table", src: "/resonance-table.png", title: "Resonance Table", price: "$6,500+" },
            { href: "/shop/abundance-octagon", src: "/octagon-table.png", title: "Abundance Octagon", price: "$8,500+" },
            { href: "/shop/selenite-wall-light", src: "/selenite-light.png", title: "Selenite Wall Light", price: "$1,600+" },
          ].map((x) => (
            <Link key={x.title} href={x.href} style={{ color: "inherit", textDecoration: "none" }}>
              <article style={card}>
                <Image src={x.src} alt={x.title} width={1600} height={1000} style={{ width: "100%", height: 210, objectFit: "cover" }} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 800 }}>{x.title}</div>
                  <div style={{ marginTop: 6, color: "#C6A746", fontWeight: 800 }}>{x.price}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link href="/energetic" style={link()}>Explore Energetic Crafting →</Link>
        </div>
      </section>

      {/* WHY STRION */}
      <section style={{ ...wrap, paddingTop: 0 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800 }}>What Sets STRION Apart</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
          {[
            ["Energetic Crafting", "Every build can be mapped to intention—Wealth, Healing, Clarity, Protection, Legacy."],
            ["Material Alchemy", "Walnut, oak, cedar; copper, brass, gold; quartz, selenite, and more—paired to purpose."],
            ["Protocol & Precision", "Consult → Mapping → Design → Craft → Activation → Delivery."],
            ["Luxury & Privacy", "White-glove, limited runs, legacy-grade craftsmanship. Nationwide availability."],
          ].map(([t, d]) => (
            <div key={t as string} style={{ ...card, padding: 16 }}>
              <div style={{ fontWeight: 800 }}>{t}</div>
              <div style={{ color: "#bdbdbd", marginTop: 6 }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...wrap, textAlign: "center", paddingTop: 0 }}>
        <p style={{ color: "#cfcfcf" }}>Ready when you are.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/custom" style={btn()}>Start Your Design</Link>
          <Link href="/categories" style={link()}>Browse by Category →</Link>
        </div>
      </section>
    </>
  );
}

function btn(): React.CSSProperties {
  return { display: "inline-flex", alignItems: "center", gap: 10, background: "#C6A746", color: "#111", padding: "12px 18px", borderRadius: 12, fontWeight: 800, textDecoration: "none" };
}
function link(): React.CSSProperties {
  return { color: "#C6A746", textDecoration: "none" };
}
