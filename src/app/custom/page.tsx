"use client";

import { useMemo, useState } from "react";

/* --------------------- OPTIONS (expanded) --------------------- */
const WOODS = [
  { key: "walnut", label: "Walnut", sf: 95 },
  { key: "white_oak", label: "White Oak", sf: 85 },
  { key: "red_oak", label: "Red Oak", sf: 70 },
  { key: "maple", label: "Hard Maple", sf: 80 },
  { key: "cherry", label: "Cherry", sf: 78 },
  { key: "ash", label: "Ash", sf: 68 },
  { key: "hickory", label: "Hickory", sf: 82 },
  { key: "cedar", label: "Cedar", sf: 60 },
  { key: "elm", label: "Elm", sf: 72 },
  { key: "sycamore", label: "Sycamore", sf: 66 },
  { key: "mahogany", label: "Mahogany (select)", sf: 110 },
  { key: "sapele", label: "Sapele", sf: 92 },
  { key: "padauk", label: "Padauk", sf: 120 },
  { key: "wenge", label: "Wenge", sf: 140 },
  { key: "zebrawood", label: "Zebrawood", sf: 135 },
  // New exotics
  { key: "koa", label: "Koa", sf: 155 },
  { key: "bubinga", label: "Bubinga", sf: 145 },
  { key: "ebony", label: "Ebony (Macassar)", sf: 180 },
  { key: "olive", label: "Olivewood", sf: 160 },
  { key: "purpleheart", label: "Purpleheart", sf: 125 },
];

const RESIN_PATTERNS = [
  { key: "none", label: "None", addSf: 0, complexity: 0 },
  { key: "river_simple", label: "River (simple)", addSf: 45, complexity: 1 },
  { key: "river_complex", label: "River (complex)", addSf: 75, complexity: 2 },
  { key: "inlay_lines", label: "Inlay Lines", addSf: 55, complexity: 1 },
  { key: "geo_inlay", label: "Sacred Geometry Inlay", addSf: 95, complexity: 3 },
  { key: "void_fill", label: "Void Fill/Highlights", addSf: 30, complexity: 0 },
  // New artistic options (no “metallic resin” wording)
  { key: "mica_vein", label: "Mica Vein Highlights", addSf: 40, complexity: 1 },
  { key: "celestial_field", label: "Celestial Field (dense)", addSf: 85, complexity: 3 },
];

const EDGE_STYLES = [
  { key: "live", label: "Live Edge", addLf: 22 },
  { key: "straight", label: "Straight", addLf: 8 },
  { key: "bevel", label: "Bevel", addLf: 14 },
  { key: "roundover", label: "Roundover", addLf: 12 },
];

const BASES = [
  { key: "none", label: "No Base (top only)", add: 0 },
  { key: "steel_u", label: "Steel U (sold separately)", add: 0 },
  { key: "steel_x", label: "Steel X (sold separately)", add: 0 },
  { key: "cast_bronze", label: "Cast Bronze (sold separately)", add: 0 },
  { key: "wood_trestle", label: "Wood Trestle (sold separately)", add: 0 },
]; // legs/bases priced/arranged separately

const METALS = [
  { key: "none", label: "None", add: 0 },
  { key: "copper", label: "Copper Accents", add: 250 },
  { key: "brass", label: "Brass Accents", add: 300 },
  { key: "bronze", label: "Bronze Accents", add: 350 },
  { key: "aluminum", label: "Aluminum Accents", add: 200 },
  { key: "stainless", label: "Stainless Accents", add: 280 },
  { key: "goldleaf", label: "Gold Leaf Detailing", add: 600 },
];

const CRYSTALS = [
  { key: "none", label: "None", each: 0 },
  { key: "selenite", label: "Selenite (per unit)", each: 45 },
  { key: "quartz", label: "Quartz (per unit)", each: 55 },
  { key: "black_tourmaline", label: "Black Tourmaline (per unit)", each: 65 },
  { key: "shungite", label: "Shungite (per unit)", each: 60 },
  { key: "amethyst", label: "Amethyst (per unit)", each: 55 },
  { key: "citrine", label: "Citrine (per unit)", each: 55 },
  { key: "lapis", label: "Lapis (per unit)", each: 70 },
];

const GEOMETRY = [
  { key: "none", label: "None", add: 0 },
  { key: "seed", label: "Seed / Basic Sigils", add: 220 },
  { key: "metatron", label: "Metatron / Complex Sigils", add: 460 },
  { key: "master_grid", label: "Master Grid (multi-layer)", add: 920 },
  { key: "custom_proto", label: "Custom Prototype Geometry", add: 1280 },
];

type RushKey = "none" | "fast" | "express";
const RUSH_OPTIONS: { key: RushKey; label: string; pct: number }[] = [
  { key: "none", label: "Standard Lead Time", pct: 0 },
  { key: "fast", label: "Fast-Track (≈14–21 days)", pct: 0.12 },
  { key: "express", label: "Express (≈7–10 days)", pct: 0.22 },
];

/* --------------------- PRICING MODEL --------------------- */
const NEXT_TIER_MULTIPLIER = 1.18; // premium uplift

const roundCurrency = (n: number) => Math.round(n * 100) / 100;

function calcQuote(input: {
  lengthIn: number;
  widthIn: number;
  thicknessIn: number;
  woodKey: string;
  resinKey: string;
  edgeKey: string;
  baseKey: string;
  metalKey: string;
  crystalKey: string;
  crystalQty: number;
  geometryKey: string;
  finish: "matte" | "satin" | "gloss";
  rushKey: RushKey;
}) {
  const { lengthIn: L, widthIn: W, thicknessIn: T } = input;

  const areaSqIn = L * W;
  const areaSqFt = areaSqIn / 144;
  const edgeLf = (L * 2 + W * 2) / 12;

  const wood = WOODS.find(w => w.key === input.woodKey)!;
  const resin = RESIN_PATTERNS.find(r => r.key === input.resinKey)!;
  const edge = EDGE_STYLES.find(e => e.key === input.edgeKey)!;
  const metal = METALS.find(m => m.key === input.metalKey)!;
  const crystal = CRYSTALS.find(c => c.key === input.crystalKey)!;
  const geo = GEOMETRY.find(g => g.key === input.geometryKey)!;
  const rush = RUSH_OPTIONS.find(r => r.key === input.rushKey)!;

  const woodRate = wood.sf; // $/sqft
  const resinRate = resin.addSf; // $/sqft add
  const thicknessFactor = Math.max(1, T / 1.5);
  const finishAdd = input.finish === "gloss" ? 3.25 : input.finish === "satin" ? 2.25 : 1.75; // $/sqft

  const woodCost = areaSqFt * woodRate * thicknessFactor;
  const resinCost = areaSqFt * resinRate;
  const edgeCost = edgeLf * edge.addLf;
  const metalCost = metal.add;
  const crystalCost = crystal.each * input.crystalQty;
  const geoCost = geo.add;
  const finishCost = areaSqFt * finishAdd;

  // complexity bump for tricky patterns
  const complexityBump =
    resin.complexity === 0 ? 0 : resin.complexity === 1 ? 180 : resin.complexity === 2 ? 340 : 520;

  const preTier =
    woodCost +
    resinCost +
    edgeCost +
    metalCost +
    crystalCost +
    geoCost +
    finishCost +
    complexityBump;

  const premiumSubtotal = preTier * NEXT_TIER_MULTIPLIER;

  // Rush surcharge as % of premium subtotal
  const rushAdd = premiumSubtotal * rush.pct;

  const qa = 95;

  const total = roundCurrency(premiumSubtotal + rushAdd + qa);

  return {
    dims: { areaSqFt: roundCurrency(areaSqFt), edgeLf: roundCurrency(edgeLf) },
    lines: {
      woodCost: roundCurrency(woodCost * NEXT_TIER_MULTIPLIER),
      resinCost: roundCurrency(resinCost * NEXT_TIER_MULTIPLIER),
      edgeCost: roundCurrency(edgeCost * NEXT_TIER_MULTIPLIER),
      metalCost: roundCurrency(metalCost * NEXT_TIER_MULTIPLIER),
      crystalCost: roundCurrency(crystalCost * NEXT_TIER_MULTIPLIER),
      geoCost: roundCurrency(geoCost * NEXT_TIER_MULTIPLIER),
      finishCost: roundCurrency(finishCost * NEXT_TIER_MULTIPLIER),
      complexityBump: roundCurrency(complexityBump * NEXT_TIER_MULTIPLIER),
      rushAdd: roundCurrency(rushAdd),
      qa,
    },
    subtotal: roundCurrency(premiumSubtotal),
    total,
    rushChoice: rush.label,
    notes: [
      "Estimate reflects tabletop only.",
      "Legs/bases are sold and arranged separately due to availability.",
      "Final quote confirmed after design review, slab selection, and freight.",
    ],
  };
}

/* --------------------- UI HELPERS --------------------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-5 shadow-[0_10px_30px_rgba(232,201,135,.08)]">
      <h3 className="text-lg font-semibold text-[#E8C987] mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Chip({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string | React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-2 rounded-lg text-sm font-medium transition",
        "ring-1",
        selected
          ? "bg-[#E8C987] text-black ring-[rgba(232,201,135,.45)]"
          : "bg-black text-neutral-200 ring-white/15 hover:bg-[#141414]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

/* --------------------- PAGE --------------------- */
export default function CustomConfigurator() {
  const [lengthIn, setLengthIn] = useState(72);
  const [widthIn, setWidthIn] = useState(36);
  const [thicknessIn, setThicknessIn] = useState(1.75);

  const [woodKey, setWoodKey] = useState("walnut");
  const [resinKey, setResinKey] = useState("river_simple");
  const [edgeKey, setEdgeKey] = useState("live");
  const [baseKey, setBaseKey] = useState("none");

  const [metalKey, setMetalKey] = useState("copper");
  const [crystalKey, setCrystalKey] = useState("none");
  const [crystalQty, setCrystalQty] = useState(0);
  const [geometryKey, setGeometryKey] = useState("seed");
  const [finish, setFinish] = useState<"matte" | "satin" | "gloss">("satin");

  const [rushKey, setRushKey] = useState<RushKey>("none");

  const quote = useMemo(
    () =>
      calcQuote({
        lengthIn,
        widthIn,
        thicknessIn,
        woodKey,
        resinKey,
        edgeKey,
        baseKey,
        metalKey,
        crystalKey,
        crystalQty,
        geometryKey,
        finish,
        rushKey,
      }),
    [
      lengthIn,
      widthIn,
      thicknessIn,
      woodKey,
      resinKey,
      edgeKey,
      baseKey,
      metalKey,
      crystalKey,
      crystalQty,
      geometryKey,
      finish,
      rushKey,
    ]
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold text-[#E8C987]">
          Design Your Table — Instant Estimate
        </h1>
        <p className="text-neutral-300 mt-2">
          Crafted in Georgia. Built for legacy. Pricing updates live as you choose options.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Controls */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Dimensions">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-neutral-300">Length (inches)</label>
                  <input
                    type="number"
                    min={24}
                    max={144}
                    step={1}
                    value={lengthIn}
                    onChange={(e) => setLengthIn(Number(e.target.value))}
                    className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E8C987] text-neutral-100"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-neutral-300">Width (inches)</label>
                  <input
                    type="number"
                    min={18}
                    max={60}
                    step={1}
                    value={widthIn}
                    onChange={(e) => setWidthIn(Number(e.target.value))}
                    className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E8C987] text-neutral-100"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-neutral-300">Thickness (inches)</label>
                  <input
                    type="number"
                    min={1}
                    max={3}
                    step={0.25}
                    value={thicknessIn}
                    onChange={(e) => setThicknessIn(Number(e.target.value))}
                    className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E8C987] text-neutral-100"
                  />
                </div>
              </div>
            </Section>

            <Section title="Wood Species">
              <div className="flex flex-wrap gap-2">
                {WOODS.map((w) => (
                  <Chip
                    key={w.key}
                    selected={woodKey === w.key}
                    label={w.label}
                    onClick={() => setWoodKey(w.key)}
                  />
                ))}
              </div>
            </Section>

            <Section title="Resin / Inlay Pattern">
              <div className="flex flex-wrap gap-2">
                {RESIN_PATTERNS.map((r) => (
                  <Chip
                    key={r.key}
                    selected={resinKey === r.key}
                    label={r.label}
                    onClick={() => setResinKey(r.key)}
                  />
                ))}
              </div>
            </Section>

            <Section title="Edges & Base Preference">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-wrap gap-2">
                  {EDGE_STYLES.map((e) => (
                    <Chip
                      key={e.key}
                      selected={edgeKey === e.key}
                      label={e.label}
                      onClick={() => setEdgeKey(e.key)}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex flex-wrap gap-2">
                    {BASES.map((b) => (
                      <Chip
                        key={b.key}
                        selected={baseKey === b.key}
                        label={b.label}
                        onClick={() => setBaseKey(b.key)}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    Legs/bases are <span className="text-[#E8C987] font-medium">sold and arranged separately</span> due to availability.
                  </p>
                </div>
              </div>
            </Section>

            <Section title="Metals, Crystals & Geometry">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-neutral-300">Metal Accents</label>
                  <div className="flex flex-wrap gap-2">
                    {METALS.map((m) => (
                      <Chip
                        key={m.key}
                        selected={metalKey === m.key}
                        label={m.label}
                        onClick={() => setMetalKey(m.key)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-neutral-300">Crystals</label>
                  <div className="flex flex-wrap gap-2">
                    {CRYSTALS.map((c) => (
                      <Chip
                        key={c.key}
                        selected={crystalKey === c.key}
                        label={c.label}
                        onClick={() => setCrystalKey(c.key)}
                      />
                    ))}
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm mb-1 text-neutral-300">Crystal Quantity</label>
                    <input
                      type="number"
                      min={0}
                      max={64}
                      step={1}
                      value={crystalQty}
                      onChange={(e) => setCrystalQty(Number(e.target.value))}
                      className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E8C987] text-neutral-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-neutral-300">Sacred Geometry</label>
                  <div className="flex flex-wrap gap-2">
                    {GEOMETRY.map((g) => (
                      <Chip
                        key={g.key}
                        selected={geometryKey === g.key}
                        label={g.label}
                        onClick={() => setGeometryKey(g.key)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Finish & Lead Time">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-wrap gap-2">
                  {["matte", "satin", "gloss"].map((f) => (
                    <Chip
                      key={f}
                      selected={finish === f}
                      label={f.toUpperCase()}
                      onClick={() => setFinish(f as "matte" | "satin" | "gloss")}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {RUSH_OPTIONS.map((r) => (
                    <Chip
                      key={r.key}
                      selected={rushKey === r.key}
                      label={r.label}
                      onClick={() => setRushKey(r.key)}
                    />
                  ))}
                </div>
              </div>
            </Section>
          </div>

          {/* RIGHT: Estimate */}
          <div className="space-y-6">
            <Section title="Estimate">
              <div className="text-sm text-neutral-300 space-y-2">
                <div className="flex justify-between">
                  <span>Area</span>
                  <span>{quote.dims.areaSqFt} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Perimeter</span>
                  <span>{quote.dims.edgeLf} lf</span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between"><span>Wood</span><span>${quote.lines.woodCost}</span></div>
                <div className="flex justify-between"><span>Resin / Inlay</span><span>${quote.lines.resinCost}</span></div>
                <div className="flex justify-between"><span>Edges</span><span>${quote.lines.edgeCost}</span></div>
                <div className="flex justify-between"><span>Metal Accents</span><span>${quote.lines.metalCost}</span></div>
                <div className="flex justify-between"><span>Crystals</span><span>${quote.lines.crystalCost}</span></div>
                <div className="flex justify-between"><span>Sacred Geometry</span><span>${quote.lines.geoCost}</span></div>
                <div className="flex justify-between"><span>Finish</span><span>${quote.lines.finishCost}</span></div>
                <div className="flex justify-between"><span>Complexity Bump</span><span>${quote.lines.complexityBump}</span></div>
                {quote.lines.rushAdd > 0 && (
                  <div className="flex justify-between">
                    <span>Fast-Track Surcharge</span>
                    <span>${quote.lines.rushAdd}</span>
                  </div>
                )}
                <div className="flex justify-between"><span>QA & Handling</span><span>${quote.lines.qa}</span></div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between font-semibold text-[#E8C987]">
                  <span>Estimated Total (tabletop)</span>
                  <span>${quote.total}</span>
                </div>
                <p className="text-xs text-neutral-400 mt-2">
                  {quote.rushChoice}. Legs/bases are{" "}
                  <span className="text-[#E8C987] font-medium">sold and arranged separately</span>.
                </p>
              </div>
            </Section>

            <Section title="Submit Your Design">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E8C987] text-neutral-100"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E8C987] text-neutral-100"
                />
                <textarea
                  placeholder="Notes about your space, intent, timeline, shipping location…"
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 h-28 focus:outline-none focus:border-[#E8C987] text-neutral-100"
                />
                <button
                  className="w-full px-4 py-3 rounded-lg font-semibold text-black"
                  style={{
                    background: "linear-gradient(180deg,#E8C987,#CFAF64)",
                    boxShadow: "0 0 0 1px rgba(232,201,135,.25),0 8px 24px rgba(232,201,135,.15)",
                  }}
                >
                  Request Final Quote
                </button>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}
```0
