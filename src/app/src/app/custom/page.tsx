"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type ItemType =
  | "Dining Table" | "Coffee Table" | "Console Table" | "Side Table"
  | "Desk" | "Conference Table" | "Bar Table"
  | "Wall Panel" | "Wall Light" | "Shelf" | "Bench" | "Altar" | "Mirror" | "Rail";

type Wood =
  | "Walnut" | "White Oak" | "Red Oak" | "Cedar" | "Maple" | "Cherry" | "Ash" | "Mahogany" | "Ebony" | "Reclaimed";

type River = "None" | "Clear Resin River" | "Pigmented Resin River" | "Dual River";
type Edge = "Live" | "Straight / Chamfered" | "Bullnose" | "Eased";
type Finish = "Oil-Wax" | "Matte" | "Satin" | "Gloss";
type Geometry = "None" | "Octagon" | "Phi Spiral" | "3-6-9" | "Vesica" | "Flower of Life" | "Metatron";

type Metal =
  | "Copper" | "Brass" | "Bronze" | "Gold (24K)" | "Silver" | "Stainless" | "Blued Steel" | "Aluminum";

type Crystal =
  | "Quartz" | "Selenite" | "Amethyst" | "Citrine" | "Black Tourmaline" | "Smoky Quartz" | "Rose Quartz"
  | "Labradorite" | "Malachite" | "Shungite" | "Lapis" | "Obsidian" | "Carnelian" | "Jade";

type Intent = "Wealth" | "Healing" | "Clarity" | "Protection" | "Legacy";

type Payload = {
  // contact
  name?: string; email?: string; phone?: string; location?: string;
  // config
  itemType: ItemType;
  lengthIn: number; widthIn: number; thicknessIn: number;
  wood: Wood; river: River; edge: Edge; finish: Finish;
  metals: Metal[]; crystals: Crystal[]; geometry: Geometry; intent: Intent[];
  timeframe: "ASAP" | "2–4 weeks" | "1–2 months" | "3+ months";
  budget?: string; notes?: string;
};

const BASE_RATE: Record<ItemType, number> = {
  "Dining Table": 180, "Coffee Table": 150, "Console Table": 140, "Side Table": 130,
  "Desk": 170, "Conference Table": 220, "Bar Table": 170,
  "Wall Panel": 145, "Wall Light": 95, "Shelf": 120, "Bench": 135, "Altar": 140, "Mirror": 120, "Rail": 160,
};

const WOOD_ADD: Record<Wood, number> = {
  Walnut: 24, "White Oak": 12, "Red Oak": 8, Cedar: 8, Maple: 10, Cherry: 12, Ash: 8, Mahogany: 20, Ebony: 65, Reclaimed: 16,
};

const RIVER_ADD: Record<River, number> = {
  None: 0, "Clear Resin River": 90, "Pigmented Resin River": 100, "Dual River": 120,
};

const EDGE_ADD: Record<Edge, number> = {
  "Live": 18, "Straight / Chamfered": 8, "Bullnose": 12, "Eased": 10,
};

const FINISH_FACTOR: Record<Finish, number> = {
  "Oil-Wax": 1.0, "Matte": 1.02, "Satin": 1.04, "Gloss": 1.07,
};

const METAL_ADD: Record<Metal, number> = {
  Copper: 28, Brass: 24, Bronze: 24, "Gold (24K)": 62, Silver: 26, Stainless: 20, "Blued Steel": 22, Aluminum: 18,
};

const CRYSTAL_ADD: Record<Crystal, number> = {
  Quartz: 20, Selenite: 26, Amethyst: 24, Citrine: 24, "Black Tourmaline": 22, "Smoky Quartz": 22,
  "Rose Quartz": 22, Labradorite: 24, Malachite: 26, Shungite: 28, Lapis: 24, Obsidian: 22, Carnelian: 22, Jade: 24,
};

const GEOM_ADD: Record<Geometry, number> = {
  None: 0, Octagon: 22, "Phi Spiral": 28, "3-6-9": 28, Vesica: 28, "Flower of Life": 32, Metatron: 34,
};

function estimateUSD(p: Payload) {
  const areaSqFt = (Math.max(1, p.lengthIn) * Math.max(1, p.widthIn)) / 144;

  let rate = BASE_RATE[p.itemType] ?? 160;
  rate += WOOD_ADD[p.wood] ?? 0;
  rate += RIVER_ADD[p.river] ?? 0;
  rate += EDGE_ADD[p.edge] ?? 0;
  rate += GEOM_ADD[p.geometry] ?? 0;

  p.metals.forEach(m => rate += METAL_ADD[m] ?? 0);
  p.crystals.forEach(c => rate += CRYSTAL_ADD[c] ?? 0);

  let subtotal = areaSqFt * rate;

  // thickness (1.75" baseline)
  subtotal *= Math.max(0.8, p.thicknessIn / 1.75);

  // finish factor
  subtotal *= FINISH_FACTOR[p.finish] ?? 1.0;

  // big installs (conference, rails) slight labor factor
  if (p.itemType === "Conference Table" || p.itemType === "Rail") subtotal *= 1.08;

  const low = Math.round(subtotal * 0.85);
  const high = Math.round(subtotal * 1.15);
  return { low, high };
}

const wrap: React.CSSProperties = { maxWidth: 1100, margin: "0 auto", padding: "64px 20px" };
const label: React.CSSProperties = { fontSize: 12, color: "#bdbdbd", marginBottom: 6, display: "block" };
const input: React.CSSProperties = { width: "100%", borderRadius: 10, padding: "10px 12px", background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#eee" };
const card: React.CSSProperties = { background: "rgba(255,255,255,.03)", border: "1px solid #2a2a2a", borderRadius: 16, padding: 16 };

export default function CustomPage() {
  const qs = useSearchParams();
  const [msg, setMsg] = useState<string | null>(null);
  const [data, setData] = useState<Payload>({
    itemType: "Dining Table",
    lengthIn: 84, widthIn: 40, thicknessIn: 1.75,
    wood: "Walnut", river: "None", edge: "Live", finish: "Satin",
    metals: ["Copper"], crystals: ["Quartz"], geometry: "None",
    intent: ["Wealth"], timeframe: "1–2 months",
  });

  // Prefill from URL params
  useEffect(() => {
    const pick = (k: string) => qs?.get(k) || undefined;
    const list = (k: string) => (qs?.get(k)?.split(",").map(s => s.trim()).filter(Boolean)) || [];
    if (!qs) return;
    const length = Number(pick("length")), width = Number(pick("width")), thickness = Number(pick("thickness"));
    setData(d => ({
      ...d,
      itemType: (pick("itemType") as ItemType) || d.itemType,
      wood: (pick("wood") as Wood) || d.wood,
      river: (pick("river") as River) || d.river,
      edge: (pick("edge") as Edge) || d.edge,
      finish: (pick("finish") as Finish) || d.finish,
      geometry: (pick("geometry") as Geometry) || d.geometry,
      intent: (list("intent") as Intent[]) || d.intent,
      metals: (list("metals") as Metal[]).length ? list("metals") as Metal[] : d.metals,
      crystals: (list("crystals") as Crystal[]).length ? list("crystals") as Crystal[] : d.crystals,
      lengthIn: !Number.isNaN(length) && length > 0 ? length : d.lengthIn,
      widthIn: !Number.isNaN(width) && width > 0 ? width : d.widthIn,
      thicknessIn: !Number.isNaN(thickness) && thickness > 0 ? thickness : d.thicknessIn,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const price = useMemo(() => estimateUSD(data), [data]);
  const set = <K extends keyof Payload>(k: K, v: Payload[K]) => setData(d => ({ ...d, [k]: v }));

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
      <h1 style={{ fontSize: 30, fontWeight: 800 }}>Custom Builds</h1>
      <p style={{ color: "#cfcfcf", marginTop: 8 }}>
        Configure your build to see a starting price range. Submit your blueprint to begin the white-glove process.
      </p>

      {/* Estimate panel */}
      <div style={{ ...card, marginTop: 16 }}>
        <div style={{ fontWeight: 800 }}>Estimated Range</div>
        <div style={{ marginTop: 6 }}>
          <span style={{ color: "#C6A746", fontWeight: 800, fontSize: 20 }}>
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
              <select value={data.itemType} onChange={(e) => set("itemType", e.target.value as ItemType)} style={input}>
                {["Dining Table","Coffee Table","Console Table","Side Table","Desk","Conference Table","Bar Table","Wall Panel","Wall Light","Shelf","Bench","Altar","Mirror","Rail"].map(x=> <option key={x}>{x}</option>)}
              </select>
            </div>
            <div><label style={label}>Length (in)</label><input type="number" value={data.lengthIn} min={18} onChange={(e)=>set("lengthIn", Number(e.target.value))} style={input}/></div>
            <div><label style={label}>Width (in)</label><input type="number" value={data.widthIn} min={12} onChange={(e)=>set("widthIn", Number(e.target.value))} style={input}/></div>
            <div><label style={label}>Thickness (in)</label><input type="number" step="0.25" value={data.thicknessIn} min={1} onChange={(e)=>set("thicknessIn", Number(e.target.value))} style={input}/></div>

            <div>
              <label style={label}>Wood</label>
              <select value={data.wood} onChange={(e)=>set("wood", e.target.value as Wood)} style={input}>
                {["Walnut","White Oak","Red Oak","Cedar","Maple","Cherry","Ash","Mahogany","Ebony","Reclaimed"].map(x=> <option key={x}>{x}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Resin / River</label>
              <select value={data.river} onChange={(e)=>set("river", e.target.value as River)} style={input}>
                {["None","Clear Resin River","Pigmented Resin River","Dual River"].map(x=> <option key={x}>{x}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Edge</label>
              <select value={data.edge} onChange={(e)=>set("edge", e.target.value as Edge)} style={input}>
                {["Live","Straight / Chamfered","Bullnose","Eased"].map(x=> <option key={x}>{x}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Finish</label>
              <select value={data.finish} onChange={(e)=>set("finish", e.target.value as Finish)} style={input}>
                {["Oil-Wax","Matte","Satin","Gloss"].map(x=> <option key={x}>{x}</option>)}
              </select>
            </div>
          </div>

          {/* Metals */}
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Metals</div>
            {["Copper","Brass","Bronze","Gold (24K)","Silver","Stainless","Blued Steel","Aluminum"].map((m)=>(
              <label key={m} style={{ marginRight: 12 }}>
                <input
                  type="checkbox"
                  checked={data.metals.includes(m as Metal)}
                  onChange={(e)=>{
                    const s = new Set(data.metals);
                    e.target.checked ? s.add(m as Metal) : s.delete(m as Metal);
                    set("metals", Array.from(s));
                  }}
                />{" "}{m}
              </label>
            ))}
          </div>

          {/* Crystals */}
          <div style={{ marginTop: 8 }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Crystals</div>
            {["Quartz","Selenite","Amethyst","Citrine","Black Tourmaline","Smoky Quartz","Rose Quartz","Labradorite","Malachite","Shungite","Lapis","Obsidian","Carnelian","Jade"].map((c)=>(
              <label key={c} style={{ marginRight: 12 }}>
                <input
                  type="checkbox"
                  checked={data.crystals.includes(c as Crystal)}
                  onChange={(e)=>{
                    const s = new Set(data.crystals);
                    e.target.checked ? s.add(c as Crystal) : s.delete(c as Crystal);
                    set("crystals", Array.from(s));
                  }}
                />{" "}{c}
              </label>
            ))}
          </div>

          {/* Geometry + Intent */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap: 12, marginTop: 12 }}>
            <div>
              <label style={label}>Geometry</label>
              <select value={data.geometry} onChange={(e)=>set("geometry", e.target.value as Geometry)} style={input}>
                {["None","Octagon","Phi Spiral","3-6-9","Vesica","Flower of Life","Metatron"].map(x=> <option key={x}>{x}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Intent (multi-select)</label>
              <select multiple value={data.intent as any} onChange={(e)=>{ const vals = Array.from(e.target.selectedOptions).map(o=>o.value as Intent); set("intent", vals); }} style={{...input, height: 100}}>
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
          <button type="submit" style={{ background:"#C6A746", color:"#111", padding:"12px 18px", borderRadius:12, fontWeight:800 }}>
            Submit & Request Callback
          </button>
          <Link href="/categories" style={{ color:"#C6A746", padding:"12px 0", textDecoration:"none" }}>Browse by Category →</Link>
        </div>

        {msg && <div style={{ color:"#cfcfcf" }}>{msg}</div>}
      </form>
    </main>
  );
}
