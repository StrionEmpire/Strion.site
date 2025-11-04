"use client";

import { useMemo, useState } from "react";

/* ========= OPTION SETS ========= */

const BUILD_TYPES = [
  "Dining Table",
  "Coffee Table",
  "Console Table",
  "Desk",
  "Bar Top",
  "Countertop",
  "Floating Shelves",
  "Wall Panel",
  "Resonance Lighting",
  "Entertainment Center",
  "Bench",
] as const;

const WOODS = [
  // Premiums + common residential/commercial species
  "Walnut",
  "White Oak",
  "Red Oak",
  "Maple",
  "Cherry",
  "Hickory",
  "Birch",
  "Alder",
  "Cedar",
  "Pine (Select)",
  "Poplar",
] as const;

const EDGE_STYLES = [
  "Straight",
  "Live-edge",
  "Chamfer",
  "Radius",
  "Waterfall Leg",
] as const;

const RESIN_PATTERNS = [
  "None",
  "River",
  "Vein",
  "Marble Swirl",
  "Galaxy Mist",
  "Geode Edge",
  "Solid Tint",
] as const;

const FINISH_TIERS = [
  "Shop Satin",
  "Furniture Matte",
  "High-Gloss Show",
  "Food-safe Oil/Wax",
] as const;

const CRYSTAL_LEVELS = [
  "None",
  "Subtle nodes",
  "Moderate grid",
  "Signature matrix",
] as const;

// Metals/Add-ons (includes Copper & Gold options)
type AddOn = {
  key: string;
  label: string;
  kind: "flat" | "mult";
  value: number; // dollars if flat, multiplier if mult
};

const ADDONS: AddOn[] = [
  // Copper-focused
  { key: "copperInlayVeins", label: "Copper inlay veins", kind: "flat", value: 450 },
  { key: "copperEdgeBand", label: "Hammered copper edge band", kind: "flat", value: 650 },
  { key: "copperMeshReveal", label: "Copper mesh reveal (under resin)", kind: "flat", value: 380 },
  { key: "copperBusGround", label: "Hidden copper bus & grounding strap", kind: "flat", value: 290 },
  // Legs note (sold separately)
  { key: "copperLegPackage", label: "Copper leg package (sold separately)", kind: "flat", value: 0 },
  // Gold-focused
  { key: "goldLeafInlay", label: "Gold leaf inlay accents", kind: "flat", value: 520 },
  { key: "goldHardware", label: "Gold-tone hardware/fasteners", kind: "flat", value: 180 },
  // Other metals (nice to have)
  { key: "brassDetails", label: "Satin brass details", kind: "flat", value: 260 },
  { key: "bronzeDetails", label: "Oil-rubbed bronze details", kind: "flat", value: 220 },
  { key: "steelPowderBlack", label: "Steel hardware powder-coated black", kind: "flat", value: 160 },
];

/* ========= PRICING ENGINE (adjusted upward) ========= */

// Base $/sqft by wood tier
const WOOD_RATE_PER_SQFT: Record<(typeof WOODS)[number], number> = {
  Walnut: 125,
  "White Oak": 110,
  "Red Oak": 85,
  Maple: 95,
  Cherry: 105,
  Hickory: 100,
  Birch: 80,
  Alder: 80,
  Cedar: 75,
  "Pine (Select)": 70,
  Poplar: 78,
};

// Build type complexity multipliers
const BUILD_MULT: Record<(typeof BUILD_TYPES)[number], number> = {
  "Dining Table": 1.25,
  "Coffee Table": 1.05,
  "Console Table": 1.05,
  Desk: 1.15,
  "Bar Top": 1.2,
  Countertop: 1.25,
  "Floating Shelves": 0.75,
  "Wall Panel": 0.85,
  "Resonance Lighting": 1.35,
  "Entertainment Center": 1.4,
  Bench: 0.95,
};

// Feature complexity multipliers
const COMPLEXITY = {
  liveEdge: 1.10,
  waterfall: 1.20,
  resinRiver: 1.20,
  sacredGeom: 1.18,
  crystalFX: 1.15,
  heavyMetal: 1.12,
  lightingFX: 1.12,
};

// Finish bump (flat)
const FINISH_FLAT: Record<(typeof FINISH_TIERS)[number], number> = {
  "Shop Satin": 0,
  "Furniture Matte": 140,
  "High-Gloss Show": 420,
  "Food-safe Oil/Wax": 90,
};

// Minimums per build type (keeps quotes realistic)
const MINIMUMS: Partial<Record<(typeof BUILD_TYPES)[number], number>> = {
  "Dining Table": 2500,
  "Coffee Table": 1200,
  Desk: 1800,
  "Bar Top": 2200,
  Countertop: 2500,
  "Entertainment Center": 4000,
  "Resonance Lighting": 900,
};

/* ========= UI HELPERS ========= */

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl md:text-2xl font-semibold text-[#E8C987] mt-10 mb-3">
    {children}
  </h3>
);

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm md:text-base font-medium text-neutral-200 mb-1">
    {children}
  </label>
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className={`w-full bg-black/60 border border-[#E8C987]/40 text-neutral-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8C987] ${props.className ?? ""}`}
  />
);

const NumberInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type="number"
    inputMode="numeric"
    {...props}
    className={`w-full bg-black/60 border border-[#E8C987]/40 text-neutral-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8C987] ${props.className ?? ""}`}
  />
);

const Checkbox = ({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) => (
  <label className={`flex items-center gap-3 text-sm md:text-base ${disabled ? "opacity-60" : ""}`}>
    <input
      type="checkbox"
      className="size-4 accent-[#E8C987]"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <span className="text-neutral-200">{label}</span>
  </label>
);

/* ========= PAGE ========= */

export default function CustomConfigurator() {
  // Typed unions from readonly tuples
  const [buildType, setBuildType] = useState<(typeof BUILD_TYPES)[number]>("Dining Table");
  const [wood, setWood] = useState<(typeof WOODS)[number]>("Walnut");
  const [edgeStyle, setEdgeStyle] = useState<(typeof EDGE_STYLES)[number]>("Straight");

  const [resinPattern, setResinPattern] =
    useState<(typeof RESIN_PATTERNS)[number]>(RESIN_PATTERNS[0]);

  const [finishTier, setFinishTier] =
    useState<(typeof FINISH_TIERS)[number]>("Furniture Matte");

  const [crystalLevel, setCrystalLevel] =
    useState<(typeof CRYSTAL_LEVELS)[number]>("None");

  // Dimensions (inches)
  const [length, setLength] = useState(72); // default 6ft
  const [width, setWidth] = useState(36);
  const [thickness, setThickness] = useState(1.75);

  // Feature toggles
  const [includeSacredGeometry, setIncludeSacredGeometry] = useState(false);
  const [includeLightingFX, setIncludeLightingFX] = useState(false);

  // Metals / add-ons
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>(
    Object.fromEntries(ADDONS.map(a => [a.key, false]))
  );

  // Price calculation
  const quote = useMemo(() => {
    // base by area
    const sqft = Math.max(1, Math.round((length * width) / 144));
    let base = sqft * (WOOD_RATE_PER_SQFT[wood] ?? 90);

    // build type
    base *= BUILD_MULT[buildType] ?? 1;

    // edge complexity
    if (edgeStyle === "Live-edge") base *= COMPLEXITY.liveEdge;
    if (edgeStyle === "Waterfall Leg") base *= COMPLEXITY.waterfall;

    // resin complexity
    const useResinRiver = resinPattern === "River";
    if (useResinRiver) base *= COMPLEXITY.resinRiver;

    // sacred geometry / lighting
    if (includeSacredGeometry) base *= COMPLEXITY.sacredGeom;
    if (buildType === "Resonance Lighting" && includeLightingFX) {
      base *= COMPLEXITY.lightingFX;
    }

    // crystals
    if (crystalLevel === "Subtle nodes") base *= 1.06;
    if (crystalLevel === "Moderate grid") base *= 1.10;
    if (crystalLevel === "Signature matrix") base *= 1.18;

    // thickness premium (beyond 1.5")
    if (thickness > 1.5) {
      base *= 1 + Math.min(0.35, (thickness - 1.5) * 0.18);
    }

    // finish flat
    base += FINISH_FLAT[finishTier] ?? 0;

    // add-ons
    for (const a of ADDONS) {
      if (!selectedAddOns[a.key]) continue;
      if (a.kind === "flat") base += a.value;
      else base *= a.value;
    }

    // minimums for big builds
    const min = MINIMUMS[buildType] ?? 0;
    if (base < min) base = min;

    // margin buffer
    const total = Math.round(base * 1.06); // small buffer

    return {
      sqft,
      total,
    };
  }, [
    buildType,
    wood,
    width,
    length,
    thickness,
    edgeStyle,
    resinPattern,
    finishTier,
    includeSacredGeometry,
    includeLightingFX,
    crystalLevel,
    selectedAddOns,
  ]);

  // Simple “status line” describing configuration (can also drive a preview image key)
  const configKey = useMemo(() => {
    const bits = [
      buildType,
      wood,
      edgeStyle,
      resinPattern !== "None" ? `Resin-${resinPattern}` : "",
      includeSacredGeometry ? "SacredGeo" : "",
      crystalLevel !== "None" ? `Crystals-${crystalLevel}` : "",
      Object.entries(selectedAddOns).some(([, v]) => v) ? "Metals" : "",
    ].filter(Boolean);
    return bits.join("_");
  }, [
    buildType,
    wood,
    edgeStyle,
    resinPattern,
    includeSacredGeometry,
    crystalLevel,
    selectedAddOns,
  ]);

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#E8C987]">
            Build Your Custom Piece
          </h1>
          <p className="mt-3 text-neutral-300">
            Tables, panels, lighting, shelving, bars & more — engineered to your dimensions,
            materials, and energetic intent. <span className="text-[#E8C987]">Legs are arranged and sold separately</span> to reflect real-time availability.
          </p>
        </header>

        {/* Grid: Config (left) + Quote & Preview (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Form */}
          <div className="space-y-6">
            <SectionTitle>Core</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Build Type</FieldLabel>
                <Select
                  value={buildType}
                  onChange={(e) => setBuildType(e.target.value as (typeof BUILD_TYPES)[number])}
                >
                  {BUILD_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                </Select>
              </div>
              <div>
                <FieldLabel>Wood Species</FieldLabel>
                <Select
                  value={wood}
                  onChange={(e) => setWood(e.target.value as (typeof WOODS)[number])}
                >
                  {WOODS.map(w => <option key={w} value={w}>{w}</option>)}
                </Select>
              </div>
              <div>
                <FieldLabel>Edge Style</FieldLabel>
                <Select
                  value={edgeStyle}
                  onChange={(e) => setEdgeStyle(e.target.value as (typeof EDGE_STYLES)[number])}
                >
                  {EDGE_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                </Select>
              </div>
              <div>
                <FieldLabel>Finish</FieldLabel>
                <Select
                  value={finishTier}
                  onChange={(e) => setFinishTier(e.target.value as (typeof FINISH_TIERS)[number])}
                >
                  {FINISH_TIERS.map(f => <option key={f} value={f}>{f}</option>)}
                </Select>
              </div>
            </div>

            <SectionTitle>Dimensions</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <FieldLabel>Length (in)</FieldLabel>
                <NumberInput
                  value={length}
                  min={18}
                  max={180}
                  onChange={(e) => setLength(parseInt(e.target.value || "0", 10))}
                />
              </div>
              <div>
                <FieldLabel>Width (in)</FieldLabel>
                <NumberInput
                  value={width}
                  min={12}
                  max={60}
                  onChange={(e) => setWidth(parseInt(e.target.value || "0", 10))}
                />
              </div>
              <div>
                <FieldLabel>Thickness (in)</FieldLabel>
                <NumberInput
                  step="0.25"
                  value={thickness}
                  min={1}
                  max={3}
                  onChange={(e) => setThickness(parseFloat(e.target.value || "0"))}
                />
              </div>
            </div>

            <SectionTitle>Resin & Energetics</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Resin Pattern</FieldLabel>
                <Select
                  value={resinPattern}
                  onChange={(e) => setResinPattern(e.target.value as (typeof RESIN_PATTERNS)[number])}
                >
                  {RESIN_PATTERNS.map(r => <option key={r} value={r}>{r}</option>)}
                </Select>
              </div>
              <div>
                <FieldLabel>Crystals</FieldLabel>
                <Select
                  value={crystalLevel}
                  onChange={(e) => setCrystalLevel(e.target.value as (typeof CRYSTAL_LEVELS)[number])}
                >
                  {CRYSTAL_LEVELS.map(c => <option key={c} value={c}>{c}</option>)}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Checkbox
                label="Include sacred geometry programming"
                checked={includeSacredGeometry}
                onChange={() => setIncludeSacredGeometry(v => !v)}
              />
              <Checkbox
                label="Include resonance lighting effects"
                checked={includeLightingFX}
                onChange={() => setIncludeLightingFX(v => !v)}
              />
            </div>

            <SectionTitle>Metals & Accents</SectionTitle>
            <p className="text-sm text-neutral-400 mb-3">
              Copper and gold options below are popular for energetic conduction and luxury detailing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADDONS.map(a => (
                <Checkbox
                  key={a.key}
                  label={`${a.label}${a.value ? (a.kind === "flat" ? ` (+$${a.value})` : ` (×${a.value})`) : ""}`}
                  checked={!!selectedAddOns[a.key]}
                  onChange={() =>
                    setSelectedAddOns(prev => ({ ...prev, [a.key]: !prev[a.key] }))
                  }
                />
              ))}
            </div>

            <p className="text-xs text-neutral-400 mt-3">
              * Legs are always arranged and sold separately (availability varies). Copper leg package line above is informational only.
            </p>
          </div>

          {/* RIGHT: Quote + “Preview” */}
          <aside className="bg-[#0b0b0b] border border-[#E8C987]/30 rounded-xl p-5 h-fit sticky top-6">
            <h3 className="text-2xl font-semibold text-[#E8C987]">Instant Quote</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between text-neutral-300">
                <span>Build</span>
                <span className="text-neutral-100">{buildType}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Wood</span>
                <span className="text-neutral-100">{wood}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Size</span>
                <span className="text-neutral-100">
                  {length}" × {width}" × {thickness}" ({quote.sqft} sqft)
                </span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Finish</span>
                <span className="text-neutral-100">{finishTier}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Edge</span>
                <span className="text-neutral-100">{edgeStyle}</span>
              </div>
              {resinPattern !== "None" && (
                <div className="flex justify-between text-neutral-300">
                  <span>Resin</span>
                  <span className="text-neutral-100">{resinPattern}</span>
                </div>
              )}
              {Object.values(selectedAddOns).some(Boolean) && (
                <div className="text-neutral-300">
                  <span>Metals/Add-ons:</span>
                  <ul className="list-disc ml-5 mt-1 text-neutral-100">
                    {ADDONS.filter(a => selectedAddOns[a.key]).map(a => (
                      <li key={a.key}>{a.label}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="text-neutral-400 text-sm">Estimated total</div>
              <div className="text-4xl font-bold text-white tracking-tight">
                ${quote.total.toLocaleString()}
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Freight, legs, installation, and on-site fitting are quoted separately.
              </div>

              <button
                className="mt-6 w-full rounded-lg bg-[#E8C987] text-black font-semibold py-3 hover:opacity-90 transition"
                onClick={() => {
                  // This would normally push to /custom/submit with config payload
                  const payload = {
                    buildType,
                    wood,
                    edgeStyle,
                    resinPattern,
                    finishTier,
                    crystalLevel,
                    sacredGeometry: includeSacredGeometry,
                    lightingFX: includeLightingFX,
                    addOns: Object.entries(selectedAddOns)
                      .filter(([, v]) => v)
                      .map(([k]) => k),
                    length,
                    width,
                    thickness,
                    quote: quote.total,
                    configKey,
                  };
                  alert(
                    "Config captured. We’ll attach this to your inquiry form.\n\n" +
                    JSON.stringify(payload, null, 2)
                  );
                }}
              >
                Save & Continue → Inquiry
              </button>

              {/* “Preview” stub: shows a live-changing key you can use to drive images */}
              <div className="mt-6 rounded-lg bg-black/40 border border-white/10 p-4">
                <div className="text-sm text-neutral-400 mb-1">Preview profile key</div>
                <code className="block text-xs text-neutral-200 break-words">
                  {configKey}
                </code>
                <p className="text-xs text-neutral-500 mt-2">
                  Use this key to swap a representative preview image (see note below).
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
