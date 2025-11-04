"use client";

import { useMemo, useState } from "react";

// ---------- OPTION SETS ----------
const BUILD_CATEGORIES = [
  "Tables",
  "Cabinetry & Built-ins",
  "Shelving",
  "Wall Panels",
  "Trim & Mouldings",
  "Doors & Slabs",
  "Lighting",
  "Altars / Spiritual Pieces",
  "Outdoor",
  "Reception / Bars",
] as const;

const TABLE_TYPES = [
  "Dining",
  "Coffee",
  "Console",
  "Conference",
  "Desk",
  "Side / End",
  "Live-Edge Slab",
  "River (Epoxy)",
  "Waterfall",
  "Pedestal",
] as const;

// Common residential & commercial hardwoods first, then your exotics
const WOODS = [
  // Common staples
  "Oak (Red)",
  "Oak (White)",
  "Maple (Hard)",
  "Maple (Soft)",
  "Walnut",
  "Cherry",
  "Poplar",
  "Pine (Select)",
  "Birch",
  "Hickory",
  "Ash",
  // Premium & exotics
  "Mahogany",
  "Sapele",
  "Teak",
  "Ipe",
  "Padauk",
  "Wenge",
  "Zebrawood",
  "Bubinga",
  "Purpleheart",
  "Elm",
] as const;

const METALS = [
  // Gold back + multiple options
  "Gold (24K Leaf Accents)",
  "Gold (18K Leaf Accents)",
  "Gold (Foil/Flake Inlay)",
  // Copper family
  "Copper (Solid Bar Inlay)",
  "Copper (Rod / Piping Edge)",
  "Copper (Hammered Accents)",
  "Copper (Patina Panels)",
  // Other metals
  "Brass (Solid Inlay)",
  "Brass (Mesh / Grille)",
  "Bronze (Accents)",
  "Stainless Steel",
  "Blackened Steel",
  "Aluminum (Brushed)",
] as const;

const CRYSTAL_MODES = [
  "None / Not visible",
  "Embedded Nodes (discreet)",
  "Vein Channel (sub-surface)",
  "Edge Band (visible)",
  "Center Cluster (statement)",
] as const;

const RESIN_PATTERNS = [
  "None",
  "River",
  "Marble Vein",
  "Metallic Veil",
  "Galaxy Swirl",
  "Fissure Fill (stabilizing)",
] as const;

const EDGE_STYLES = [
  "Square",
  "Micro Bevel",
  "Roundover",
  "Chamfer",
  "Live Edge",
  "Waterfall Leg",
] as const;

const FINISH_TIERS = [
  "Shop Satin (pro)",
  "Hand-Rubbed Oil",
  "High-Build Poly",
  "Conversion Varnish",
  "Piano Gloss",
] as const;

const LENGTHS = ["36", "48", "60", "72", "84", "96", "108", "120"] as const;
const WIDTHS  = ["18", "24", "30", "36", "42", "48"] as const;
const THICKNESSES = ["1.25", "1.5", "1.75", "2.0", "2.5", "3.0"] as const;

const SHELF_TYPES = ["Floating Shelf", "Bracketed Shelf", "Cubby Shelf"] as const;
const PANEL_TYPES = ["Acoustic Grid", "Sacred Geometry Panel", "Slat Wall", "Chevron", "Parquet"] as const;
const TRIM_TYPES  = ["Casing", "Baseboard", "Crown", "Chair Rail", "Wainscot"] as const;
const DOOR_TYPES  = ["Slab Door", "Panel Door", "Barn Door", "Glass-Lite Door"] as const;
const LIGHT_TYPES = ["Selenite Rod Panel", "Pendant", "Wall Sconce", "Backlit Panel"] as const;
const ALTAR_TYPES = ["Meditation Altar", "Charging Table", "Shrine Panel"] as const;
const OUTDOOR_TYPES = ["Bench", "Dining", "Bar Top", "Pergola Panel"] as const;
const BAR_TYPES = ["Reception Desk", "Host Stand", "Bar Top", "Back Bar"] as const;

// ---------- PRICING CONFIG ----------
const BASES = {
  Tables: {
    Dining: 1200, Coffee: 700, Console: 850, Conference: 2800, Desk: 1400,
    "Side / End": 450, "Live-Edge Slab": 1600, "River (Epoxy)": 1800, Waterfall: 2200, Pedestal: 1600,
  },
  "Cabinetry & Built-ins": { default: 2000 },
  Shelving: { "Floating Shelf": 280, "Bracketed Shelf": 220, "Cubby Shelf": 380 },
  "Wall Panels": { "Acoustic Grid": 900, "Sacred Geometry Panel": 1500, "Slat Wall": 800, Chevron: 1200, Parquet: 1400 },
  "Trim & Mouldings": { Casing: 12, Baseboard: 10, Crown: 18, "Chair Rail": 12, Wainscot: 900 }, // per LF or panel
  "Doors & Slabs": { "Slab Door": 450, "Panel Door": 650, "Barn Door": 900, "Glass-Lite Door": 1200 },
  Lighting: { "Selenite Rod Panel": 1500, Pendant: 480, "Wall Sconce": 350, "Backlit Panel": 1200 },
  "Altars / Spiritual Pieces": { "Meditation Altar": 900, "Charging Table": 1100, "Shrine Panel": 1400 },
  Outdoor: { Bench: 700, Dining: 1600, "Bar Top": 1200, "Pergola Panel": 900 },
  "Reception / Bars": { "Reception Desk": 3200, "Host Stand": 1400, "Bar Top": 1800, "Back Bar": 2600 },
} as const;

const WOOD_MULTIPLIER: Record<string, number> = {
  // Common, value-oriented (1.0–1.05)
  "Poplar": 0.95, "Pine (Select)": 0.9, "Birch": 1.0,
  // Mid-tier (1.0–1.2)
  "Oak (Red)": 1.05, "Oak (White)": 1.15, "Maple (Soft)": 1.05, "Maple (Hard)": 1.15, "Cherry": 1.15, "Ash": 1.05, "Hickory": 1.15,
  // Premium (1.2–1.6)
  "Walnut": 1.35, "Mahogany": 1.35, "Sapele": 1.25, "Teak": 1.6, "Ipe": 1.6,
  "Padauk": 1.4, "Wenge": 1.5, "Zebrawood": 1.5, "Bubinga": 1.45, "Purpleheart": 1.35, "Elm": 1.15,
};

const METAL_MULTIPLIER: Record<string, number> = {
  "None": 1.0,
  "Gold (24K Leaf Accents)": 1.55,
  "Gold (18K Leaf Accents)": 1.45,
  "Gold (Foil/Flake Inlay)": 1.35,
  "Copper (Solid Bar Inlay)": 1.25,
  "Copper (Rod / Piping Edge)": 1.3,
  "Copper (Hammered Accents)": 1.35,
  "Copper (Patina Panels)": 1.4,
  "Brass (Solid Inlay)": 1.25,
  "Brass (Mesh / Grille)": 1.2,
  "Bronze (Accents)": 1.2,
  "Stainless Steel": 1.15,
  "Blackened Steel": 1.2,
  "Aluminum (Brushed)": 1.1,
};

const FINISH_MULTIPLIER: Record<(typeof FINISH_TIERS)[number], number> = {
  "Shop Satin (pro)": 1.0,
  "Hand-Rubbed Oil": 1.05,
  "High-Build Poly": 1.12,
  "Conversion Varnish": 1.22,
  "Piano Gloss": 1.35,
};

const COMPLEXITY = {
  sacredGeom: 1.18,
  resinRiver: 1.25,
  resinPattern: 1.12,
  crystalFX: 1.15,
  heavyMetal: 1.1,
  lightingFX: 1.15,
  waterfall: 1.2,
};

const LEG_NOTE = "Table legs / bases are arranged and sold separately due to availability changes.";

// ---------- SMALL HELPERS ----------
function toNum(s: string) { return parseFloat(s || "0"); }

function sqftFromDims(lenIn: number, widthIn: number) {
  const sqft = (lenIn * widthIn) / 144;
  return Math.max(2, sqft); // minimum charge area
}

function woodHex(wood: string) {
  // simple representative preview colors
  if (wood.includes("Walnut")) return "#5a4636";
  if (wood.includes("Oak (White)")) return "#c7b091";
  if (wood.includes("Oak (Red)")) return "#c29a7a";
  if (wood.includes("Maple (Hard)")) return "#e6d7bf";
  if (wood.includes("Cherry")) return "#c47f5a";
  if (wood.includes("Teak")) return "#b68b4a";
  if (wood.includes("Wenge")) return "#3a2a20";
  if (wood.includes("Zebrawood")) return "#c2a36b";
  if (wood.includes("Mahogany")) return "#9c5c3a";
  if (wood.includes("Pine")) return "#e6d6ab";
  return "#bfa07a";
}

function metalHex(metal: string) {
  if (metal.startsWith("Gold")) return "#E6C767";
  if (metal.startsWith("Copper")) return "#B87333";
  if (metal.startsWith("Brass")) return "#D4AF37";
  if (metal.startsWith("Bronze")) return "#CD7F32";
  if (metal.includes("Blackened Steel")) return "#333333";
  if (metal.includes("Stainless")) return "#C0C0C0";
  if (metal.includes("Aluminum")) return "#C9C9C9";
  return "transparent";
}

// ---------- PAGE ----------
export default function CustomBuilderPage() {
  const [category, setCategory] = useState<(typeof BUILD_CATEGORIES)[number]>("Tables");
  const [tableType, setTableType] = useState<(typeof TABLE_TYPES)[number]>("Dining");

  const [wood, setWood] = useState<(typeof WOODS)[number]>("Walnut");
  const [metal, setMetal] = useState<(typeof METALS)[number]>("Gold (24K Leaf Accents)");
  const [crystalMode, setCrystalMode] = useState<(typeof CRYSTAL_MODES)[number]>("None / Not visible");

  const [resinPattern, setResinPattern] = useState<(typeof RESIN_PATTERNS)[number]>("None");
  const [edgeStyle, setEdgeStyle] = useState<(typeof EDGE_STYLES)[number]>("Square");
  const [finishTier, setFinishTier] = useState<(typeof FINISH_TIERS)[number]>("High-Build Poly");

  const [length, setLength] = useState<(typeof LENGTHS)[number]>("72");
  const [width, setWidth] = useState<(typeof WIDTHS)[number]>("36");
  const [thickness, setThickness] = useState<(typeof THICKNESSES)[number]>("1.75");

  // Non-table subtype selectors
  const [shelfType, setShelfType] = useState<(typeof SHELF_TYPES)[number]>("Floating Shelf");
  const [panelType, setPanelType] = useState<(typeof PANEL_TYPES)[number]>("Sacred Geometry Panel");
  const [trimType, setTrimType]   = useState<(typeof TRIM_TYPES)[number]>("Casing");
  const [doorType, setDoorType]   = useState<(typeof DOOR_TYPES)[number]>("Slab Door");
  const [lightType, setLightType] = useState<(typeof LIGHT_TYPES)[number]>("Selenite Rod Panel");
  const [altarType, setAltarType] = useState<(typeof ALTAR_TYPES)[number]>("Charging Table");
  const [outType, setOutType]     = useState<(typeof OUTDOOR_TYPES)[number]>("Dining");
  const [barType, setBarType]     = useState<(typeof BAR_TYPES)[number]>("Reception Desk");

  const [hasSacredGeometry, setHasSacredGeometry] = useState<boolean>(true);
  const [hasCrystalWork, setHasCrystalWork] = useState<boolean>(false);
  const [includeLightingFX, setIncludeLightingFX] = useState<boolean>(false);

  const [notes, setNotes] = useState<string>("");

  // ---------- PRICE ----------
  const price = useMemo(() => {
    // pick a base
    let base = 0;
    if (category === "Tables") {
      base = BASES.Tables[tableType];
    } else if (category === "Cabinetry & Built-ins") {
      base = BASES["Cabinetry & Built-ins"].default;
    } else if (category === "Shelving") {
      base = BASES.Shelving[shelfType];
    } else if (category === "Wall Panels") {
      base = BASES["Wall Panels"][panelType];
    } else if (category === "Trim & Mouldings") {
      base = BASES["Trim & Mouldings"][trimType];
    } else if (category === "Doors & Slabs") {
      base = BASES["Doors & Slabs"][doorType];
    } else if (category === "Lighting") {
      base = BASES.Lighting[lightType];
    } else if (category === "Altars / Spiritual Pieces") {
      base = BASES["Altars / Spiritual Pieces"][altarType];
    } else if (category === "Outdoor") {
      base = BASES.Outdoor[outType];
    } else if (category === "Reception / Bars") {
      base = BASES["Reception / Bars"][barType];
    }

    // area/length scaling
    if (category === "Tables") {
      const sqft = sqftFromDims(toNum(length), toNum(width));
      base = base * (0.6 + 0.4 * (sqft / 10)); // moderate scaling with size
      if (edgeStyle === "Waterfall Leg") base *= COMPLEXITY.waterfall;
    } else if (category === "Shelving") {
      const lf = Math.max(2, toNum(length) / 12);
      if (shelfType === "Floating Shelf") base = base * lf * 1.1;
      else base = base * lf;
    } else if (category === "Trim & Mouldings") {
      // treat as linear feet input in "length"
      const lf = Math.max(20, toNum(length)); // minimum mobilization
      base = base * lf;
    } else if (category === "Wall Panels") {
      const sqft = sqftFromDims(toNum(length), toNum(width));
      base = base * (sqft / 10);
    } else if (category === "Doors & Slabs" || category === "Outdoor" || category === "Reception / Bars" || category === "Cabinetry & Built-ins" || category === "Altars / Spiritual Pieces" || category === "Lighting") {
      const sqft = sqftFromDims(toNum(length), toNum(width));
      base = base * (0.5 + 0.5 * (sqft / 10));
    }

    // wood, metal, finish multipliers
    base *= (WOOD_MULTIPLIER[wood] ?? 1.15);
    base *= (METAL_MULTIPLIER[metal] ?? 1.0);
    base *= FINISH_MULTIPLIER[finishTier];

    // resin & geometry & crystals & lighting complexity
    if (resinPattern === "River") base *= COMPLEXITY.resinRiver;
    if (resinPattern !== "None" && resinPattern !== "River") base *= COMPLEXITY.resinPattern;
    if (hasSacredGeometry) base *= COMPLEXITY.sacredGeom;
    if (hasCrystalWork && crystalMode !== "None / Not visible") base *= COMPLEXITY.crystalFX;
    if (category === "Lighting" && includeLightingFX) base *= COMPLEXITY.lightingFX;

    // thickness upcharge (beyond 1.5")
    const thick = toNum(thickness);
    if (thick > 1.5) base *= 1 + Math.min(0.35, (thick - 1.5) * 0.15);

    // round
    return Math.max(250, Math.round(base / 5) * 5);
  }, [
    category, tableType, shelfType, panelType, trimType, doorType, lightType, altarType, outType, barType,
    length, width, thickness, wood, metal, finishTier, resinPattern,
    hasSacredGeometry, hasCrystalWork, includeLightingFX, crystalMode, edgeStyle,
  ]);

  // ---------- PREVIEW MODEL ----------
  const preview = useMemo(() => {
    const woodColor = woodHex(wood);
    const metalColor = metalHex(metal);
    const isTable = category === "Tables" || category === "Reception / Bars";
    const L = Math.min(1000, Math.max(400, toNum(length) * 6)); // simple scale
    const W = Math.min(600, Math.max(200, toNum(width) * 6));
    const showRiver = resinPattern === "River";
    const showMetalBand = metal !== "None";
    const isLive = edgeStyle === "Live Edge" || tableType === "Live-Edge Slab";

    return { woodColor, metalColor, L, W, showRiver, showMetalBand, isTable, isLive };
  }, [category, length, width, wood, metal, resinPattern, edgeStyle, tableType]);

  // ---------- RENDER ----------
  const goldNote = metal.startsWith("Gold") ? LEG_NOTE : LEG_NOTE; // keep note consistent

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="px-6 py-6 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full" style={{ background: "linear-gradient(135deg,#E6C767,#8a6b21)" }} />
            <div>
              <div className="text-sm uppercase tracking-widest text-neutral-400">Strion</div>
              <h1 className="text-xl font-semibold" style={{ color: "#E6C767" }}>Custom Builder — Energetic Crafting™</h1>
            </div>
          </div>
          <div className="text-xs text-neutral-400 hidden sm:block">{goldNote}</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Options */}
        <section className="lg:col-span-2 space-y-6">
          <Card title="Build Type">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select label="Category" value={category} onChange={setCategory} options={BUILD_CATEGORIES} />
              {category === "Tables" && (
                <Select label="Table Type" value={tableType} onChange={setTableType} options={TABLE_TYPES} />
              )}
              {category === "Shelving" && (
                <Select label="Shelf Type" value={shelfType} onChange={setShelfType} options={SHELF_TYPES} />
              )}
              {category === "Wall Panels" && (
                <Select label="Panel Style" value={panelType} onChange={setPanelType} options={PANEL_TYPES} />
              )}
              {category === "Trim & Mouldings" && (
                <Select label="Trim Type" value={trimType} onChange={setTrimType} options={TRIM_TYPES} />
              )}
              {category === "Doors & Slabs" && (
                <Select label="Door Type" value={doorType} onChange={setDoorType} options={DOOR_TYPES} />
              )}
              {category === "Lighting" && (
                <Select label="Lighting Type" value={lightType} onChange={setLightType} options={LIGHT_TYPES} />
              )}
              {category === "Altars / Spiritual Pieces" && (
                <Select label="Altar Type" value={altarType} onChange={setAltarType} options={ALTAR_TYPES} />
              )}
              {category === "Outdoor" && (
                <Select label="Outdoor Type" value={outType} onChange={setOutType} options={OUTDOOR_TYPES} />
              )}
              {category === "Reception / Bars" && (
                <Select label="Reception/Bar" value={barType} onChange={setBarType} options={BAR_TYPES} />
              )}
            </div>
          </Card>

          <Card title="Dimensions">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <Select label="Length (in)" value={length} onChange={setLength} options={LENGTHS} />
              <Select label="Width (in)" value={width} onChange={setWidth} options={WIDTHS} />
              <Select label="Thickness (in)" value={thickness} onChange={setThickness} options={THICKNESSES} />
              <Select label="Edge" value={edgeStyle} onChange={setEdgeStyle} options={EDGE_STYLES} />
              <Select label="Finish" value={finishTier} onChange={setFinishTier} options={FINISH_TIERS} />
              <Select label="Resin" value={resinPattern} onChange={setResinPattern} options={RESIN_PATTERNS} />
            </div>
          </Card>

          <Card title="Materials">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select label="Wood" value={wood} onChange={setWood} options={WOODS} />
              <Select label="Metal / Accents" value={metal} onChange={setMetal} options={["None", ...METALS]} />
              <Select label="Crystal Integration" value={crystalMode} onChange={setCrystalMode} options={CRYSTAL_MODES} />
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Toggle label="Sacred Geometry Integration" value={hasSacredGeometry} onChange={setHasSacredGeometry} />
              <Toggle label="Crystal Work Visible" value={hasCrystalWork} onChange={setHasCrystalWork} />
              {category === "Lighting" && (
                <Toggle label="Enhanced Lighting FX" value={includeLightingFX} onChange={setIncludeLightingFX} />
              )}
            </div>
          </Card>

          <Card title="Notes (Blueprint Hints)">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Room intent, numerology cues, geometry preferences, tone program targets, etc."
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-sm focus:outline-none"
              rows={4}
            />
            <p className="text-xs text-neutral-400 mt-2">{LEG_NOTE}</p>
          </Card>
        </section>

        {/* Right: Live Preview + Quote */}
        <section className="space-y-6">
          <Card title="Live Preview">
            <div className="w-full border border-neutral-800 rounded-lg bg-neutral-950 p-4">
              <PreviewSVG {...preview} />
            </div>
            <p className="text-xs text-neutral-400 mt-3">
              Preview is an abstract representation to visualize materials & composition (wood tone, metal accents, and river/resin flow).
            </p>
          </Card>

          <Card title="Instant Quote (Est.)">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-sm text-neutral-400">Estimated Build</div>
                <div className="text-lg font-medium">
                  {category} {category === "Tables" ? `— ${tableType}` : ""}
                </div>
              </div>
              <div className="text-3xl font-bold" style={{ color: "#E6C767" }}>
                ${price.toLocaleString()}
              </div>
            </div>
            <ul className="mt-4 space-y-1 text-sm text-neutral-300">
              <li>Wood: {wood}</li>
              <li>Metal: {metal}</li>
              <li>Finish: {finishTier}</li>
              <li>
                Size: {length}" × {width}" × {thickness}" {category === "Tables" && `• Edge: ${edgeStyle}`}
              </li>
              {resinPattern !== "None" && <li>Resin: {resinPattern}</li>}
              {hasSacredGeometry && <li>Sacred Geometry: Enabled</li>}
              {hasCrystalWork && <li>Crystal Integration: {crystalMode}</li>}
              {category === "Lighting" && includeLightingFX && <li>Lighting FX: Enhanced</li>}
            </ul>
            <div className="mt-4 text-xs text-neutral-400">
              Shipping, legs/bases, onsite install, and special sourcing quoted separately. Final pricing confirmed after design call.
            </div>
            <a
              href={`/quote?c=${encodeURIComponent(category)}&t=${encodeURIComponent(tableType)}&w=${encodeURIComponent(wood)}&m=${encodeURIComponent(metal)}&r=${encodeURIComponent(resinPattern)}&f=${encodeURIComponent(finishTier)}&l=${length}&wd=${width}&th=${thickness}`}
              className="mt-5 inline-block w-full text-center bg-white text-black font-semibold py-3 rounded-lg hover:opacity-90 transition"
            >
              Continue — Lock In Design
            </a>
          </Card>
        </section>
      </main>
    </div>
  );
}

// ---------- UI PRIMS ----------
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-neutral-800 rounded-xl bg-neutral-950/60">
      <div className="px-5 py-3 border-b border-neutral-800 flex items-center justify-between">
        <h3 className="font-semibold" style={{ color: "#E6C767" }}>{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Select<T extends string>({
  label, value, onChange, options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: readonly T[];
}) {
  return (
    <label className="text-sm">
      <div className="mb-1 text-neutral-300">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-sm focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4"
      />
      <span className="text-neutral-300">{label}</span>
    </label>
  );
}

// ---------- SVG PREVIEW ----------
function PreviewSVG({
  woodColor, metalColor, L, W, showRiver, showMetalBand, isTable, isLive,
}: {
  woodColor: string;
  metalColor: string;
  L: number;
  W: number;
  showRiver: boolean;
  showMetalBand: boolean;
  isTable: boolean;
  isLive: boolean;
}) {
  const width = Math.min(700, L / 1.5);
  const height = Math.min(380, W / 1.5);
  const riverPath = `M 0 ${height * 0.2} C ${width * 0.25} ${height * 0.05}, ${width * 0.5} ${height * 0.35}, ${width} ${height * 0.2}
                     L ${width} ${height * 0.8}
                     C ${width * 0.5} ${height * 0.65}, ${width * 0.25} ${height * 0.95}, 0 ${height * 0.8} Z`;

  return (
    <svg width="100%" height={height + 20} viewBox={`0 0 ${width} ${height + 20}`} className="mx-auto">
      {/* table/panel body */}
      <rect
        x={0}
        y={10}
        width={width}
        height={height}
        rx={isLive ? 8 : 4}
        fill={woodColor}
        stroke="#1f1f1f"
        strokeWidth={2}
      />
      {/* subtle wood grain lines */}
      <g opacity={0.15}>
        <path d={`M 0 ${height * 0.3} C ${width*0.2} ${height*0.25}, ${width*0.5} ${height*0.35}, ${width} ${height*0.3}`} stroke="#000" strokeWidth={2} fill="none" />
        <path d={`M 0 ${height * 0.6} C ${width*0.25} ${height*0.55}, ${width*0.6} ${height*0.65}, ${width} ${height*0.6}`} stroke="#000" strokeWidth={2} fill="none" />
      </g>
      {/* resin river */}
      {showRiver && (
        <path d={riverPath} fill="url(#resinGrad)" opacity={0.85} />
      )}
      {/* metal band accent */}
      {showMetalBand && (
        <rect x={width * 0.05} y={height * 0.08} width={width * 0.9} height={height * 0.04} rx={2} fill={metalColor} opacity={0.9} />
      )}
      {/* defs */}
      <defs>
        <linearGradient id="resinGrad" x1="0" y1="0" x2={width} y2={height} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7f9cf5" />
          <stop offset="50%" stopColor="#2a4365" />
          <stop offset="100%" stopColor="#1a365d" />
        </linearGradient>
      </defs>
      {/* feet hint if table */}
      {isTable && (
        <g opacity={0.25}>
          <rect x={width*0.1} y={height} width={width*0.1} height={6} fill="#999" />
          <rect x={width*0.8} y={height} width={width*0.1} height={6} fill="#999" />
        </g>
      )}
    </svg>
  );
}
