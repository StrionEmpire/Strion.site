"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/** ---------- Types ---------- */

type ItemType =
  | "Dining Table"
  | "Coffee Table"
  | "Conference Table"
  | "Desk"
  | "Console"
  | "Bar Table"
  | "Side Table"
  | "Nightstand"
  | "Bench"
  | "Kitchen Island Top"
  | "Bar / Counter Top"
  | "Reception Desk Top"
  | "Wall Panel"
  | "Wall Light";

type Wood =
  | "Walnut"
  | "White Oak"
  | "Red Oak"
  | "Maple"
  | "Cherry"
  | "Ash"
  | "Hickory"
  | "Beech"
  | "Birch"
  | "Poplar"
  | "Elm"
  | "Douglas Fir"
  | "Cedar"
  | "Teak"
  | "Mahogany"
  | "Sapele"
  | "Bubinga"
  | "Padauk"
  | "Zebrawood"
  | "Wenge"
  | "Purpleheart"
  | "Olive";

type River = "None" | "Clear Resin River" | "Tinted Resin River";

type Pattern =
  | "None"
  | "Single River"
  | "Double River"
  | "Offset River"
  | "Edge Pour"
  | "Galaxy / Metallic Swirl"
  | "Geode Inlay"
  | "Crystal Veil Window"
  | "Void Fill (Natural Voids)";

type Edge = "Live" | "Straight / Chamfered";

type Finish = "Oil-Wax" | "Matte" | "Satin" | "High-Gloss";

type Metal =
  | "None"
  | "Copper"
  | "Brass"
  | "Bronze"
  | "Gold (24k leaf/inlay)"
  | "Stainless";

type Crystal =
  | "None"
  | "Quartz"
  | "Selenite"
  | "Amethyst"
  | "Citrine"
  | "Labradorite"
  | "Shungite"
  | "Malachite"
  | "Black Tourmaline"
  | "Tiger’s Eye"
  | "Lapis Lazuli"
  | "Obsidian"
  | "Pyrite"
  | "Rose Quartz"
  | "Smoky Quartz";

/** ---------- Pricing Model (editable) ---------- */

// $/ft² base by species (tables & tops use this; wall lights/panels scale down via ITEM_MULTIPLIER)
const WOOD_RATE: Record<Wood, number> = {
  Walnut: 95,
  "White Oak": 85,
  "Red Oak": 75,
  Maple: 80,
  Cherry: 82,
  Ash: 70,
  Hickory: 78,
  Beech: 68,
  Birch: 66,
  Poplar: 60,
  Elm: 72,
  "Douglas Fir": 58,
  Cedar: 64,
  Teak: 130,
  Mahogany: 105,
  Sapele: 110,
  Bubinga: 140,
  Padauk: 120,
  Zebrawood: 135,
  Wenge: 145,
  Purpleheart: 125,
  Olive: 150,
};

const ITEM_MULTIPLIER: Record<ItemType, number> = {
  "Dining Table": 1.0,
  "Coffee Table": 0.75,
  "Conference Table": 1.25,
  Desk: 0.9,
  Console: 0.7,
  "Bar Table": 0.85,
  "Side Table": 0.55,
  Nightstand: 0.5,
  Bench: 0.6,
  "Kitchen Island Top": 1.05,
  "Bar / Counter Top": 0.95,
  "Reception Desk Top": 1.15,
  "Wall Panel": 0.6,
  "Wall Light": 0.35,
};

const MINIMUMS: Record<ItemType, number> = {
  "Dining Table": 2500,
  "Coffee Table": 900,
  "Conference Table": 4200,
  Desk: 1500,
  Console: 1200,
  "Bar Table": 1800,
  "Side Table": 600,
  Nightstand: 550,
  Bench: 800,
  "Kitchen Island Top": 2200,
  "Bar / Counter Top": 1600,
  "Reception Desk Top": 3000,
  "Wall Panel": 600,
  "Wall Light": 300,
};

const METAL_FEE: Record<Metal, number> = {
  None: 0,
  Copper: 250,
  Brass: 250,
  Bronze: 275,
  "Gold (24k leaf/inlay)": 900,
  Stainless: 300,
};

const FINISH_FEE: Record<Finish, number> = {
  "Oil-Wax": 0,
  Matte: 150,
  Satin: 200,
  "High-Gloss": 450,
};

const CRYSTAL_FEE: Record<Crystal, number> = {
  None: 0,
  Quartz: 180,
  Selenite: 220,
  Amethyst: 260,
  Citrine: 240,
  Labradorite: 320,
  Shungite: 200,
  Malachite: 340,
  "Black Tourmaline": 220,
  "Tiger’s Eye": 200,
  "Lapis Lazuli": 300,
  Obsidian: 220,
  Pyrite: 260,
  "Rose Quartz": 200,
  "Smoky Quartz": 220,
};

// Pattern multipliers/fees on top of River choice
const PATTERN_FEE: Record<Pattern, { add: number; mult: number }> = {
  None: { add: 0, mult: 0 },
  "Single River": { add: 250, mult: 0.12 },
  "Double River": { add: 450, mult: 0.18 },
  "Offset River": { add: 350, mult: 0.16 },
  "Edge Pour": { add: 280, mult: 0.1 },
  "Galaxy / Metallic Swirl": { add: 380, mult: 0.12 },
  "Geode Inlay": { add: 520, mult: 0.22 },
  "Crystal Veil Window": { add: 600, mult: 0.25 },
  "Void Fill (Natural Voids)": { add: 180, mult: 0.08 },
};

function calcEstimate(params: {
  itemType: ItemType;
  wood: Wood;
  river: River;
  pattern: Pattern;
  edge: Edge;
  length: number; // inches
  width: number;  // inches
  thickness: number; // inches
  finish: Finish;
  metal: Metal;
  crystal: Crystal;
}) {
  const { itemType, wood, river, pattern, edge, length, width, thickness, finish, metal, crystal } = params;

  const sqft = (length * width) / 144; // in^2 -> ft^2
  const thicknessFactor = Math.max(1, thickness / 1.75); // baseline 1.75"

  const base = sqft * WOOD_RATE[wood] * thicknessFactor * ITEM_MULTIPLIER[itemType];

  // River baseline
  let riverFee = 0;
  let riverMult = 0;
  if (river === "Clear Resin River") {
    riverFee = 300;
    riverMult = 0.12;
  } else if (river === "Tinted Resin River") {
    riverFee = 350;
    riverMult = 0.16;
  }

  // Pattern overlay
  const pat = PATTERN_FEE[pattern];

  const edgeFee = edge === "Live" ? base * 0.1 : 0;

  const subtotal =
    base +
    base * riverMult +
    riverFee +
    base * pat.mult +
    pat.add +
    edgeFee +
    FINISH_FEE[finish] +
    METAL_FEE[metal] +
    CRYSTAL_FEE[crystal];

  const clamped = Math.max(subtotal, MINIMUMS[itemType]);
  const low = Math.round(clamped * 0.9);
  const high = Math.round(clamped * 1.1);

  return { low, high, basis: Math.round(clamped), sqft: +sqft.toFixed(2) };
}

/** ---------- Page ---------- */

type LegPref =
  | "None (tabletop only)"
  | "I’ll provide my own"
  | "Quote Steel U-Frame"
  | "Quote Steel Trapezoid"
  | "Quote Hairpin"
  | "Quote Steel Trestle"
  | "Quote Steel Pedestal"
  | "Quote Solid Wood Base";

export default function CustomConfiguratorPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
    itemType: "Dining Table" as ItemType,
    wood: "Walnut" as Wood,
    river: "None" as River,
    pattern: "None" as Pattern,
    edge: "Live" as Edge,
    length: 84,
    width: 40,
    thickness: 1.75,
    metal: "None" as Metal,
    crystal: "None" as Crystal,
    finish: "Satin" as Finish,
    intent: "Luxury / Signature",
    legPref: "None (tabletop only)" as LegPref,
    notes: "",
  });

  function update<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  const estimate = useMemo(
    () =>
      calcEstimate({
        itemType: form.itemType,
        wood: form.wood,
        river: form.river,
        pattern: form.pattern,
        edge: form.edge,
        length: form.length,
        width: form.width,
        thickness: form.thickness,
        finish: form.finish,
        metal: form.metal,
        crystal: form.crystal,
      }),
    [form]
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "custom-configurator",
          ...form,
          estimate_low: estimate.low,
          estimate_high: estimate.high,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setMsg("✅ Thanks! We received your blueprint and initial estimate. A Strion specialist will follow up with a refined quote & lead time.");
    } catch (err) {
      console.error(err);
      setMsg("❌ Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /** ---------- Styles ---------- */
  const wrap: React.CSSProperties = { maxWidth: 1080, margin: "0 auto", padding: "24px", color: "#e7d38c" };
  const grid: React.CSSProperties = { display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 20 };
  const card: React.CSSProperties = { background: "#0b0b0b", border: "1px solid #2c2c2c", borderRadius: 16, padding: 24 };
  const row2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };
  const row3: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 };
  const label: React.CSSProperties = { fontSize: 14, opacity: 0.85, marginBottom: 6 };
  const input: React.CSSProperties = { background: "#111", border: "1px solid #2a2a2a", color: "#eaeaea", padding: "12px 14px", borderRadius: 10, width: "100%" };
  const h1: React.CSSProperties = { fontSize: 28, fontWeight: 700, margin: "8px 0 16px" };
  const sub: React.CSSProperties = { opacity: 0.8, marginBottom: 20, lineHeight: 1.5 };

  return (
    <div style={wrap}>
      <header style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
        <Link href="/" style={{ textDecoration: "none", color: "#e7d38c" }}>← Home</Link>
        <span style={{ opacity: 0.5 }}>/</span>
        <span>Custom</span>
      </header>

      <h1 style={h1}>Design Your Strion Piece</h1>
      <p style={sub}>
        Build a starting blueprint for your custom commission. Your <b>instant estimate</b> updates as you design.
        Final pricing may vary after material selections, availability, and logistics are confirmed during consultation.
      </p>

      <div style={grid}>
        {/* Left: Form */}
        <form style={card} onSubmit={submit} noValidate>
          <div style={row2}>
            <div>
              <div style={label}>Your Name</div>
              <input style={input} value={form.name} onChange={(e) => update("name", e.target.value)} required placeholder="Full name" />
            </div>
            <div>
              <div style={label}>Email</div>
              <input style={input} type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required placeholder="you@email.com" />
            </div>
          </div>

          <div style={{ height: 14 }} />

          <div style={row2}>
            <div>
              <div style={label}>City</div>
              <input style={input} value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" />
            </div>
            <div>
              <div style={label}>State</div>
              <input style={input} value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="State" />
            </div>
          </div>

          <div style={{ height: 18 }} />

          <div style={row2}>
            <div>
              <div style={label}>Item Type</div>
              <select style={input} value={form.itemType} onChange={(e) => update("itemType", e.target.value as ItemType)}>
                {[
                  "Dining Table","Coffee Table","Conference Table","Desk","Console","Bar Table",
                  "Side Table","Nightstand","Bench","Kitchen Island Top","Bar / Counter Top",
                  "Reception Desk Top","Wall Panel","Wall Light",
                ].map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>

            <div>
              <div style={label}>Primary Wood</div>
              <select style={input} value={form.wood} onChange={(e) => update("wood", e.target.value as Wood)}>
                {[
                  "Walnut","White Oak","Red Oak","Maple","Cherry","Ash","Hickory","Beech","Birch","Poplar",
                  "Elm","Douglas Fir","Cedar","Teak","Mahogany","Sapele","Bubinga","Padauk",
                  "Zebrawood","Wenge","Purpleheart","Olive",
                ].map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>

          <div style={{ height: 12 }} />

          <div style={row3}>
            <div>
              <div style={label}>River / Resin</div>
              <select style={input} value={form.river} onChange={(e) => update("river", e.target.value as River)}>
                {["None", "Clear Resin River", "Tinted Resin River"].map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>

            <div>
              <div style={label}>Pattern</div>
              <select style={input} value={form.pattern} onChange={(e) => update("pattern", e.target.value as Pattern)}>
                {[
                  "None","Single River","Double River","Offset River","Edge Pour","Galaxy / Metallic Swirl",
                  "Geode Inlay","Crystal Veil Window","Void Fill (Natural Voids)",
                ].map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>

            <div>
              <div style={label}>Edge</div>
              <select style={input} value={form.edge} onChange={(e) => update("edge", e.target.value as Edge)}>
                {["Live", "Straight / Chamfered"].map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>

          <div style={{ height: 12 }} />

          <div style={row3}>
            <div>
              <div style={label}>Length (in)</div>
              <input style={input} type="number" min={12} value={form.length} onChange={(e) => update("length", Number(e.target.value))} />
            </div>
            <div>
              <div style={label}>Width (in)</div>
              <input style={input} type="number" min={12} value={form.width} onChange={(e) => update("width", Number(e.target.value))} />
            </div>
            <div>
              <div style={label}>Thickness (in)</div>
              <input style={input} type="number" step="0.25" min={1} value={form.thickness} onChange={(e) => update("thickness", Number(e.target.value))} />
            </div>
          </div>

          <div style={{ height: 12 }} />

          <div style={row2}>
            <div>
              <div style={label}>Finish</div>
              <select style={input} value={form.finish} onChange={(e) => update("finish", e.target.value as Finish)}>
                {["Oil-Wax", "Matte", "Satin", "High-Gloss"].map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <div style={label}>Metal Accents</div>
              <select style={input} value={form.metal} onChange={(e) => update("metal", e.target.value as Metal)}>
                {["None", "Copper", "Brass", "Bronze", "Gold (24k leaf/inlay)", "Stainless"].map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>

          <div style={{ height: 12 }} />

          <div style={row2}>
            <div>
              <div style={label}>Crystal / Energetic</div>
              <select style={input} value={form.crystal} onChange={(e) => update("crystal", e.target.value as Crystal)}>
                {[
                  "None","Quartz","Selenite","Amethyst","Citrine","Labradorite","Shungite","Malachite",
                  "Black Tourmaline","Tiger’s Eye","Lapis Lazuli","Obsidian","Pyrite","Rose Quartz","Smoky Quartz",
                ].map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>

            <div>
              <div style={label}>Legs (sold separately)</div>
              <select style={input} value={form.legPref} onChange={(e) => update("legPref", e.target.value as LegPref)}>
                {[
                  "None (tabletop only)","I’ll provide my own","Quote Steel U-Frame","Quote Steel Trapezoid",
                  "Quote Hairpin","Quote Steel Trestle","Quote Steel Pedestal","Quote Solid Wood Base",
                ].map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>

          <div style={{ height: 12 }} />

          <div>
            <div style={label}>Project Intent (optional)</div>
            <input style={input} value={form.intent} onChange={(e) => update("intent", e.target.value)} placeholder="Luxury / Signature, Healing, Prosperity, etc." />
          </div>

          <div style={{ height: 12 }} />

          <div>
            <div style={label}>Notes</div>
            <textarea style={{ ...input, minHeight: 120, resize: "vertical" }} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Room size, seating, vibe, deadlines, budget window..." />
          </div>

          <div style={{ height: 18 }} />

          <button
            type="submit"
            disabled={loading}
            style={{ background: "#a4892f", color: "#0b0b0b", border: "none", borderRadius: 10, padding: "12px 18px", fontWeight: 700, cursor: "pointer" }}
          >
            {loading ? "Sending..." : "Request Quote"}
          </button>

          {msg && <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.4 }}>{msg}</div>}
        </form>

        {/* Right: Estimate Panel */}
        <aside style={card}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Instant Estimate</div>
          <div style={{ opacity: 0.75, marginBottom: 14 }}>
            Estimates update live as you design. Final quote follows detailed review, material availability, and logistics.
          </div>

          <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 12, padding: 16, marginBottom: 14 }}>
            <div style={{ fontSize: 14, opacity: 0.75 }}>Estimated range</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>
              ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
            </div>
            <div style={{ fontSize: 12, opacity: 0.65 }}>
              Basis: ${estimate.basis.toLocaleString()} • Area: {estimate.sqft} ft²
            </div>
          </div>

          <ul style={{ lineHeight: 1.6, paddingLeft: 18, margin: 0 }}>
            <li><b>Top only:</b> Legs are <b>sold and arranged separately</b> due to changing availability. Choose a leg option and we’ll add a separate line item to your quote.</li>
            <li><b>Shipping / install</b> priced after destination, access, and weight are confirmed.</li>
            <li><b>Lead time</b> varies by slab selection, resin cure time, finishing schedule, and crate logistics.</li>
          </ul>

          <div style={{ marginTop: 16, fontSize: 13, opacity: 0.7 }}>
            Typical leg packages (not included): Hairpin ($250–$400), Steel U-Frame ($450–$900), Trapezoid ($500–$950),
            Trestle/Pedestal ($900–$1,800), Solid Wood Bases ($1,200+).
          </div>
        </aside>
      </div>
    </div>
  );
}
