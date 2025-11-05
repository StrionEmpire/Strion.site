"use client";
/* @ts-nocheck */

import Link from "next/link";

// One source of truth for categories shown on /categories.
// Each category lists a few common subtypes. The button pushes
// users into /custom with ?itemType=<Category>.
const BUILD_TYPES = [
  "Dining Tables",
  "Coffee Tables",
  "Side / End Tables",
  "Console Tables",
  "Conference Tables",
  "Desks & Consoles",
  "Live-Edge Slab",
  "Epoxy River",
  "Wall Panels",
  "Wall Lights",
  "Rails & Shelves",
  "Benches & Altars",
  "Mirrors & Frames",
  "Trays & Accessories",
  "Cabinetry",
  "Interior Trim / Moulding",
  "Counters & Bar Tops",
  "Seating",
  "Outdoor",
];

const SUBTYPES = {
  "Dining Tables": ["Rectangular", "Round / Oval", "Extendable"],
  "Coffee Tables": ["Rectangular", "Square", "Round"],
  "Side / End Tables": ["Square", "Round", "C-shape"],
  "Console Tables": ["Entry Console", "Sofa Back", "Narrow Hall"],
  "Conference Tables": ["Boat-shape", "Rectangle", "Racetrack"],
  "Desks & Consoles": ["Executive Desk", "Work Desk", "Console"],
  "Live-Edge Slab": ["Single Slab", "Book-matched", "Butterfly Keys"],
  "Epoxy River": ["Center River", "Edge River", "Vein / Marbling"],
  "Wall Panels": ["Geometric", "Sacred Geometry", "Acoustic"],
  "Wall Lights": ["Sconces", "Panel-backlit", "Resonance Lighting"],
  "Rails & Shelves": ["Floating Shelves", "Handrails", "Mantels"],
  "Benches & Altars": ["Entry Bench", "Meditation Altar", "Plinth"],
  "Mirrors & Frames": ["Framed Mirrors", "Art Frames", "Profiles"],
  "Trays & Accessories": ["Valet Trays", "Boards", "Desk Sets"],
  "Cabinetry": ["Built-ins", "Media Walls", "Vanities"],
  "Interior Trim / Moulding": ["Casing", "Baseboards", "Coffered"],
  "Counters & Bar Tops": ["Kitchen Island", "Bar", "Reception Top"],
  "Seating": ["Benches", "Stools", "Banquettes"],
  "Outdoor": ["Tables", "Benches", "Pergola Details"],
};

const wrap: React.CSSProperties = {
  maxWidth: 1080,
  margin: "0 auto",
  padding: 24,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
  marginTop: 24,
};

const card: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "linear-gradient(180deg, rgba(232,201,135,0.06), rgba(0,0,0,0.2))",
  borderRadius: 14,
  padding: 18,
};

export default function Categories() {
  return (
    <main style={wrap}>
      <h1 style={{ fontSize: 34, fontWeight: 800, color: "#E8C987" }}>
        Browse by Category
      </h1>
      <p style={{ color: "#cfcfcf", marginTop: 8, lineHeight: 1.7 }}>
        Explore our most requested builds. Every category can be configured on the Custom page.
      </p>

      <section style={grid}>
        {BUILD_TYPES.map((type) => (
          <article key={type} style={card}>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#E8C987" }}>{type}</div>

            <ul style={{ marginTop: 10, color: "#bdbdbd", lineHeight: 1.6, fontSize: 14 }}>
              {(SUBTYPES[type] ?? []).map((sub: string) => (
                <li key={sub}>• {sub}</li>
              ))}
            </ul>

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link
                href={`/custom?itemType=${encodeURIComponent(type)}`}
                className="px-4 py-2 rounded-lg bg-[#E8C987] text-black font-semibold hover:opacity-90 transition"
              >
                Customize this Category
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
