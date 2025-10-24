"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;

  // Configurator fields
  itemType: "Dining Table" | "Coffee Table" | "Desk" | "Conference Table" | "Wall Panel" | "Wall Light";
  lengthIn: number;
  widthIn: number;
  thicknessIn: number;
  wood: "Walnut" | "Oak" | "Cedar" | "Ebony";
  river: "None" | "Clear Resin River";
  edge: "Live" | "Straight / Chamfered";
  metals: string[];       // Copper, Gold, Brass, Silver
  crystals: string[];     // Quartz, Selenite, Amethyst, Citrine
  geometry: "Octagon" | "Phi Spiral" | "3-6-9" | "Vesica" | "None";
  finish: "Matte" | "Satin" | "Gloss";
  intent: string[];       // Wealth, Healing, Clarity, Protection, Legacy
  timeframe: "ASAP" | "2–4 weeks" | "1–2 months" | "3+ months";
  budget?: string;
  notes?: string;
};

// --- simple pricing model (transparent & fast) ---
function estimateUSD(p: Payload) {
  const areaSqIn = Math.max(1, p.lengthIn) * Math.max(1, p.widthIn); // in²
  const areaSqFt = areaSqIn / 144;

  // Base by item type (USD / ft²)
  const baseRates: Record<Payload["itemType"], number> = {
    "Dining Table": 180,
    "Coffee Table": 150,
    "Desk": 170,
    "Conference Table": 220,
    "Wall Panel": 140,
    "Wall Light": 90,
  };
  let rate = baseRates[p.itemType] ?? 160;

  // Wood premium
  if (p.wood === "Walnut") rate += 20;
  if (p.wood === "Ebony") rate += 60;

  // Resin river
  if (p.river === "Clear Resin River") rate += 90;

  // Edge
  if (p.edge === "Live") rate += 18;

  // Metals (add per-ft²)
  const metalAdds = { Copper: 28, Gold: 60, Brass: 24, Silver: 26 } as const;
  p.metals.forEach((m) => { rate += (metalAdds as any)[m] ?? 0; });

  // Crystals (per-ft², average)
  const crystalAdds = { Quartz: 20, Selenite: 26, Amethyst: 24, Citrine: 24 } as const;
  p.crystals.forEach((c) => { rate += (crystalAdds as any)[c] ?? 0; });

  // Geometry premium
  if (p.geometry === "Octagon") rate += 22;
  if (p.geometry === "Phi Spiral" || p.geometry === "3-6-9" || p.geometry === "Vesica") rate += 28;

  // Finish factor
  let finishFactor = 1.0;
  if (p.finish === "Gloss") finishFactor = 1.06;

  // Thickness factor (1.75" baseline)
  const thicknessFactor = Math.max(0.8, p.thicknessIn / 1.75);

  let subtotal = areaSqFt * rate * finishFactor * thicknessFactor;

  // Conference install handling (extra labor typically)
  if (p.itemType === "Conference Table") subtotal *= 1.08;

  // Range +/- 15%
  const low = Math.round(subtotal * 0.85);
  const high = Math.round(subtotal * 1.15);
  return { low, high };
}

const wrap: React.CSSProperties = { maxWidth: 1000, margin: "0 auto", padding: "64px 20px" };
const label: React.CSSProperties = { fontSize: 12, color: "#bdbdbd", marginBottom: 6, display: "block" };
const input: React.CSSProperties = { width: "100%", borderRadius: 10, padding: "10px 12px", background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#eee" };
const card: React.CSSProperties = { background: "rgba(255,255,255,.03)", border: "1px solid #2a2a2a", borderRadius: 16, padding: 16 };

export default function CustomPage() {
  const [msg, setMsg] = useState<string | null>(null);

  const [data, setData] = useState<Payload>({
    itemType: "Dining Table",
    lengthIn: 84,
    widthIn: 40,
    thicknessIn: 1.75,
    wood: "Walnut",
    river: "None",
    edge: "Live",
    metals: ["Copper"],
    crystals: ["Quartz"],
    geometry: "None",
    finish: "Satin",
    intent: ["Wealth"],
    timeframe: "1–2 months",
  });

  const price = useMemo(() => estimateUSD(data), [data]);

  function set<K extends keyof Payload>(k: K, v: Payload[K]) {
    setData((d) => ({ ...d, [k]: v }));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, estimate: price }),
    });
    setMsg(res.ok ? "Thanks — we received your blueprint and estimate request. We’ll reply with next steps." : "Something went wrong.");
    (e.target as HTMLFormElement).reset?.();
  }

  return (
    <main style={wrap}>
      <h1 style={{ fontSize: 30, fontWeight: 700 }}>Custom Builds</h1>
      <p style={{ color: "#cfcfcf", marginTop: 8 }}>
        Configure your build to see a starting price range. Submit your blueprint to begin the white-glove process.
      </p>

      {/* Estimate panel */}
      <div style={{ ...card, marginTop: 16 }}>
        <div style={{ fontWeight: 700 }}>Estimated Range</div>
        <div style={{ marginTop: 6 }}>
          <span style={{ color: "#C6A746", fontWeight: 700, fontSize: 20 }}>
            ${price.low.toLocaleString()} — ${price.high.toLocaleString()}
          </span>
          <div style={{ color: "#bdbdbd", fontSize: 14, marginTop: 4 }}>
            Non-binding estimate. Final quote after drawings, materials confirmation & logistics.
          </div>
        </div>
      </div>

      {/* Configurator */}
      <form onSubmit={submit} style={{ display: "grid", gap: 16, marginTop: 16 }}>
        <div style={card}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 12 }}>
            <div>
              <label style={label}>Item Type</label>
              <select value={data.itemType} onChange={(e) => set("itemType", e.target.value as any)} style={input}>
                {["Dining Table","Coffee Table","Desk","Conference Table","Wall Panel","Wall Light"].map((x)=> <option key={x}>{x}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Length (inches)</label>
              <input type="number" value={data.lengthIn} min={24} onChange={(e)=>set("lengthIn", Number(e.target.value))} style={input}/>
            </div>
            <div>
              <label style={label}>Width (inches)</label>
              <input type="number" value={data.widthIn} min={18} onChange={(e)=>set("widthIn", Number(e.target.value))} style={input}/>
            </div>
            <div>
              <label style={label}>Thickness (inches)</label>
              <input type="number" step="0.25" value={data.thicknessIn} min={1} onChange={(e)=>set("thicknessIn", Number(e.target.value))} style={input}/>
            </div>
            <div>
              <label style={label}>Wood</label>
              <select value={data.wood} onChange={(e)=>set("wood", e.target.value as any)} style={input}>
                {["Walnut","Oak","Cedar","Ebony"].map(x=> <option key={x}>{x}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Resin / River</label>
              <select value={data.river} onChange={(e)=>set("river", e.target.value as any)} style={input}>
                {["None","Clear Resin River"].map(x=> <option key={x}>{x}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Edge</label>
              <select value={data.edge} onChange={(e)=>set("edge", e.target.value as any)} style={input}>
                {["Live","Straight / Chamfered"].map(x=> <option key={x}>{x}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Finish</label>
              <select value={data.finish} onChange={(e)=>set("finish", e.target.value as any)} style={input}>
                {["Matte","Satin","Gloss"].map(x=> <option key={x}>{x}</option>)}
              </select>
            </div>
          </div>

          {/* Metals */}
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Metals</div>
            {["Copper","Gold","Brass","Silver"].map((m)=>(
              <label key={m} style={{ marginRight: 12 }}>
                <input
                  type="checkbox"
                  checked={data.metals.includes(m)}
                  onChange={(e)=>{
                    const s = new Set(data.metals);
                    e.target.checked ? s.add(m) : s.delete(m);
                    set("metals", Array.from(s));
                  }}
                />{" "}
                {m}
              </label>
            ))}
          </div>

          {/* Crystals */}
          <div style={{ marginTop: 8 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Crystals</div>
            {["Quartz","Selenite","Amethyst","Citrine"].map((c)=>(
              <label key={c} style={{ marginRight: 12 }}>
                <input
                  type="checkbox"
                  checked={data.crystals.includes(c)}
                  onChange={(e)=>{
                    const s = new Set(data.crystals);
                    e.target.checked ? s.add(c) : s.delete(c);
                    set("crystals", Array.from(s));
                  }}
                />{" "}
                {c}
              </label>
            ))}
          </div>

          {/* Geometry + Intent */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap: 12, marginTop: 12 }}>
            <div>
              <label style={label}>Geometry</label>
              <select value={data.geometry} onChange={(e)=>set("geometry", e.target.value as any)} style={input}>
                {["None","Octagon","Phi Spiral","3-6-9","Vesica"].map(x=> <option key={x}>{x}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Intent</label>
              <select multiple value={data.intent as any}
                onChange={(e)=>{
                  const vals = Array.from(e.target.selectedOptions).map(o=>o.value);
                  set("intent", vals);
                }} style={{...input, height: 90}}>
                {["Wealth","Healing","Clarity","Protection","Legacy"].map(x=> <option key={x}>{x}</option>)}
              </select>
              <div style={{ color:"#888", fontSize:12, marginTop:6 }}>Tip: tap to select multiple intents</div>
            </div>
            <div>
              <label style={label}>Desired Timeline</label>
              <select value={data.timeframe} onChange={(e)=>set("timeframe", e.target.value as any)} style={input}>
                {["ASAP","2–4 weeks","1–2 months","3+ months"].map(x=> <option key={x}>{x}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Contact & Notes */}
        <div style={card}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap: 12 }}>
            <div><label style={label}>Name</label><input style={input} onChange={(e)=>set("name", e.target.value)} /></div>
            <div><label style={label}>Email</label><input type="email" style={input} onChange={(e)=>set("email", e.target.value)} /></div>
            <div><label style={label}>Phone</label><input style={input} onChange={(e)=>set("phone", e.target.value)} /></div>
            <div><label style={label}>Location (City, State)</label><input style={input} onChange={(e)=>set("location", e.target.value)} /></div>
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={label}>Notes / Vision</label>
            <textarea rows={5} style={{ ...input, resize: "vertical" }} onChange={(e)=>set("notes", e.target.value)} />
          </div>
        </div>

        <div style={{ display:"flex", gap: 12, flexWrap: "wrap" }}>
          <button type="submit" style={{ background:"#C6A746", color:"#111", padding:"12px 18px", borderRadius:12, fontWeight:700 }}>
            Submit & Request Callback
          </button>
          <Link href="/shop" style={{ color:"#C6A746", padding:"12px 0", textDecoration:"none" }}>Browse the Catalog →</Link>
        </div>

        {msg && <div style={{ color:"#cfcfcf" }}>{msg}</div>}
      </form>
    </main>
  );
}
