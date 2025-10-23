// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

const section: React.CSSProperties = { maxWidth: 1100, margin: "0 auto", padding: "64px 20px" };
const h1: React.CSSProperties = { fontSize: "42px", letterSpacing: ".02em", fontWeight: 700, textAlign: "center" };
const lead: React.CSSProperties = { color: "#cfcfcf", maxWidth: 760, margin: "16px auto 0", textAlign: "center", lineHeight: 1.6 };
const btn: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, background: "#C6A746", color: "#111", padding: "12px 18px", borderRadius: 12, fontWeight: 700, textDecoration: "none" };
const link: React.CSSProperties = { color: "#C6A746", textDecoration: "none", marginLeft: 16 };

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section style={section}>
        <h1 style={h1}>
          STRION — Crafted by Vision. <span style={{ color: "#C6A746" }}>Matter, Mastered.</span>
        </h1>
        <p style={lead}>
          Energetic Crafting for homes, studios, and institutions — where geometry, metals, crystals,
          and wood converge to align and elevate space.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
          <Link href="/custom" style={btn}>Start Your Design</Link>
          <a href="#work" style={link}>See the Work →</a>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section id="work" style={{ ...section, paddingTop: 0 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700 }}>Featured Work</h2>
        <p style={{ color: "#cfcfcf", marginTop: 8 }}>
          Signature builds that embody resonance, mastery, and legacy.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16, marginTop: 16
        }}>
          <figure style={{ background: "rgba(255,255,255,.03)", borderRadius: 16, overflow: "hidden", border: "1px solid #2a2a2a" }}>
            <Image src="/resonance-table.png" alt="Resonance Table" width={1600} height={1000} style={{ width: "100%", height: 190, objectFit: "cover" }} />
            <figcaption style={{ padding: 12 }}>
              <div style={{ fontWeight: 700 }}>Resonance Table</div>
              <div style={{ color: "#bdbdbd", fontSize: 14 }}>
                Live-edge walnut, epoxy river, copper veins, quartz center.
              </div>
            </figcaption>
          </figure>

          <figure style={{ background: "rgba(255,255,255,.03)", borderRadius: 16, overflow: "hidden", border: "1px solid #2a2a2a" }}>
            <Image src="/octagon-table.png" alt="Abundance Octagon Table" width={1600} height={1000} style={{ width: "100%", height: 190, objectFit: "cover" }} />
            <figcaption style={{ padding: 12 }}>
              <div style={{ fontWeight: 700 }}>Abundance Octagon</div>
              <div style={{ color: "#bdbdbd", fontSize: 14 }}>
                Walnut octagon with gold inlays and citrine medallion.
              </div>
            </figcaption>
          </figure>

          <figure style={{ background: "rgba(255,255,255,.03)", borderRadius: 16, overflow: "hidden", border: "1px solid #2a2a2a" }}>
            <Image src="/selenite-light.png" alt="Selenite Wall Light" width={1600} height={1000} style={{ width: "100%", height: 190, objectFit: "cover" }} />
            <figcaption style={{ padding: 12 }}>
              <div style={{ fontWeight: 700 }}>Selenite Wall Light</div>
              <div style={{ color: "#bdbdbd", fontSize: 14 }}>
                Stacked selenite rods in a brass frame with ambient halo.
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* METHOD */}
      <section style={{ ...section, paddingTop: 24 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700 }}>The Strion Method</h2>
        <p style={{ color: "#cfcfcf", marginTop: 8 }}>
          Consultation → Energetic Mapping → Design → Build → Activation → Delivery
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16, marginTop: 16
        }}>
          {[
            ["Energetic Intake", "Numerology, geometry, materials, and intention — aligned to your space."],
            ["Precision Craft", "Woods, metals, and crystals formed in sacred proportion and flow."],
            ["Activation", "Final alignment and care guidance for long-term resonance."]
          ].map(([title, body]) => (
            <div key={title} style={{ background: "rgba(255,255,255,.03)", border: "1px solid #2a2a2a", borderRadius: 16, padding: 16 }}>
              <div style={{ fontWeight: 700 }}>{title}</div>
              <div style={{ color: "#bdbdbd", fontSize: 14, marginTop: 6 }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...section, textAlign: "center" }}>
        <p style={{ color: "#cfcfcf" }}>Ready to begin?</p>
        <Link href="/custom" style={btn}>Start Your Design</Link>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #2a2a2a", marginTop: 20 }}>
        <div style={{ ...section, padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Image src="/crest.svg" alt="Strion crest" width={28} height={28} />
              <div style={{ fontWeight: 700 }}>STRION</div>
            </div>
            <div style={{ color: "#999" }}>© {new Date().getFullYear()} STRION</div>
          </div>
        </div>
      </footer>
    </>
  );
}
