"use client";

export const dynamic = "force-dynamic"; // render at request time; avoids prerender issues
// DO NOT export `revalidate` here

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// ---------- Types ----------
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

// ---------- Pricing Tables ----------
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

// ---------- Estimator ----------
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

// ---------- Wrapper with Suspense ----------
export default function ConfiguratorPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading configurator…</div>}>
      <ConfiguratorInner />
    </Suspense>
  );
}

// ---------- Inner (uses useSearchParams) ----------
function ConfiguratorInner() {
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
    const res = await fetch("/api/estimate", { // <- CHANGE to "/api/lead" if that's your route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, estimate: price }),
    });
    setMsg(res.ok ? "Thanks — we received your blueprint and estimate request. We’ll reply with next steps." : "Something went wrong.");
    (e.target as HTMLFormElement).reset?.();
  }

  const wrap = { maxWidth: 1100, margin: "0 auto", padding: "64px 20px" };
  const label = { fontSize: 12, color: "#bdbdbd", marginBottom: 6, display: "block" };
  const input = { width: "100%", borderRadius: 10, padding: "10px 12px", background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#eee" } as React.CSSProperties;
  const card = { background: "rgba(255,255,255,.03)", border: "1px solid #2a2a2a", borderRadius: 16, padding: 16 } as React.CSSProperties;

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
              <
