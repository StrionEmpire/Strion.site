import Image from "next/image";
import Link from "next/link";

const section: React.CSSProperties = { maxWidth: 1100, margin: "0 auto", padding: "64px 20px" };

export default function WorkPage() {
  return (
    <main style={section}>
      <h1 style={{ fontSize: 30, fontWeight: 700 }}>Work</h1>
      <p style={{ color: "#cfcfcf", marginTop: 8 }}>
        Tables, wall pieces, and lighting — engineered with geometry, metals, crystals, and wood.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
        {[
          { src: "/resonance-table.png", title: "Resonance Table", note: "Live-edge walnut · epoxy river · copper veins · quartz center" },
          { src: "/octagon-table.png", title: "Abundance Octagon", note: "Walnut octagon · gold inlay · citrine medallion" },
          { src: "/selenite-light.png", title: "Selenite Wall Light", note: "Selenite rods · brass frame · ambient halo" },
        ].map((x) => (
          <figure key={x.title} style={{ background: "rgba(255,255,255,.03)", borderRadius: 16, overflow: "hidden", border: "1px solid #2a2a2a" }}>
            <Image src={x.src} alt={x.title} width={1600} height={1000} style={{ width: "100%", height: 220, objectFit: "cover" }} />
            <figcaption style={{ padding: 12 }}>
              <div style={{ fontWeight: 700 }}>{x.title}</div>
              <div style={{ color: "#bdbdbd", fontSize: 14 }}>{x.note}</div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Link href="/custom" style={{ background: "#C6A746", color: "#111", padding: "12px 18px", borderRadius: 12, fontWeight: 700, textDecoration: "none" }}>
          Start Your Design
        </Link>
      </div>
    </main>
  );
}
