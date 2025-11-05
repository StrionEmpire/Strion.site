"use client";

import { useMemo, useState } from "react";

/* ---------------------------
   MASTER OPTION SETS
----------------------------*/

// Build categories
const BUILD_TYPES = [
  "Table",
  "Wall Panel",
  "Floating Shelves",
  "Cabinetry",
  "Interior Trim / Moulding",
  "Lighting",
  "Bench / Seating",
  "Counter / Bar Top",
] as const;

// Table subtypes
const TABLE_TYPES = [
  "Live-Edge Slab",
  "Live-Edge River",
  "Bookmatched River",
  "Classic Plank",
  "Conference Table",
  "Coffee Table",
  "Console Table",
  "Dining Table",
  "Round Table",
] as const;

// Common + luxury woods (expanded)
const WOODS = [
  "Walnut",
  "Maple (Hard)",
  "White Oak",
  "Red Oak",
  "Cherry",
  "Hickory",
  "Ash",
  "Mahogany",
  "Cedar",
  "Pine (Select)",
  "Poplar (Paint-Grade)",
  "Teak (Premium)",
  "Sapele",
  "Zebrawood (Premium)",
] as const;

// Edges
const EDGE_STYLES = ["Live Edge", "Straight", "Rounded", "Chamfered"] as const;

// Resin patterns
const RESIN_PATTERNS = ["None", "River", "Vein", "Smoky Swirl", "Galaxy", "Solid Tint"] as const;

// Metals (bring back gold + copper variants and more)
const METALS = [
  "Gold (24K Leaf Accents)",
  "Gold (18K Leaf Accents)",
  "Gold (Foil/Flake Inlay)",
  "Copper (Solid Bar Inlay)",
  "Copper (Rod / Piping Edge)",
  "Copper (Hammered Accents)",
  "Brass (Inlay / Banding)",
  "Bronze (Inlay / Banding)",
  "Stainless Steel (Brushed)",
  "Blackened Steel",
  "Aluminum (Brushed)",
] as const;

// Allow "None" safely in TS:
type MetalOption = "None" | (typeof METALS)[number];
const METALS_WITH_NONE = ["None", ...METALS] as const;

// Finishes
const FINISHES = ["Hardwax Oil (Matte)", "Polyurethane (Satin)", "Polyurethane (High Gloss)", "Natural Oil (Low Sheen)"] as const;

// Legs policy reminder
const LEGS_POLICY = `Legs/stands are arranged and sold separately due to fluctuating availability. We’ll spec and quote them for you in the proposal.`;

// “Crystal work” (broad — doesn’t pin you to specific stones)
const CRYSTAL_INTENSITY = ["None", "Light Accent", "Integrated Array", "Full Energetic Layout"] as const;

// Sacred geometry layer
const SACRED_GEOM = ["None", "Subtle Pattern", "Primary Motif", "Signature Array"] as const;

// Lighting FX choices (only used when build type = Lighting)
const LIGHTING_FX = ["None", "Warm Glow", "Cool Glow", "Dual-Zone", "Programmable"] as const;

/* ---------------------------
   SIMPLE SELECT & INPUT UI
----------------------------*/

function FieldWrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-neutral-200">{label}</div>
      {children}
    </div>
  );
}

function Select<T extends string>({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: T;
  onChange: (v: any) => void;
  options: readonly T[];
  placeholder?: string;
}) {
  return (
    <select
      className="w-full rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8C987]"
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function NumberField({
  value,
  onChange,
  min = 0,
  step = 1,
  unit,
}: {
  value: number | string;
  onChange: (n: number) => void;
  min?: number;
  step?: number;
  unit?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        className="w-full rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8C987] [-moz-appearance:textfield]"
        value={value}
        min={min}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {unit && <span className="text-neutral-400 text-sm">{unit}</span>}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (b: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        className="h-5 w-5 accent-[#E8C987]"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-neutral-200">{label}</span>
    </label>
  );
}

/* ---------------------------
   PRICING ENGINE
----------------------------*/

// Base by build type
const BASE_BY_BUILD: Record<(typeof BUILD_TYPES)[number], number> = {
  "Table": 900,
  "Wall Panel": 600,
  "Floating Shelves": 300,
  "Cabinetry": 2500,
  "Interior Trim / Moulding": 1200,
  "Lighting": 750,
  "Bench / Seating": 700,
  "Counter / Bar Top": 1500,
};

// Table complexity bump
const TABLE_COMPLEXITY: Record<(typeof TABLE_TYPES)[number], number> = {
  "Live-Edge Slab": 1.15,
  "Live-Edge River": 1.35,
  "Bookmatched River": 1.45,
  "Classic Plank": 1.0,
  "Conference Table": 1.6,
  "Coffee Table": 0.75,
  "Console Table": 0.9,
  "Dining Table": 1.25,
  "Round Table": 1.1,
};

// Wood multipliers
const WOOD_MULT: Record<(typeof WOODS)[number], number> = {
  Walnut: 1.45,
  "Maple (Hard)": 1.2,
  "White Oak": 1.3,
  "Red Oak": 1.15,
  Cherry: 1.25,
  Hickory: 1.25,
  Ash: 1.15,
  Mahogany: 1.35,
  Cedar: 1.1,
  "Pine (Select)": 0.9,
  "Poplar (Paint-Grade)": 0.85,
  "Teak (Premium)": 1.8,
  Sapele: 1.35,
  "Zebrawood (Premium)": 1.9,
};

// Resin complexity
const RESIN_MULT: Record<(typeof RESIN_PATTERNS)[number], number> = {
  None: 1.0,
  River: 1.35,
  Vein: 1.2,
  "Smoky Swirl": 1.25,
  Galaxy: 1.35,
  "Solid Tint": 1.15,
};

// Metal complexity
const METAL_MULT: Record<Exclude<MetalOption, "None">, number> = {
  "Gold (24K Leaf Accents)": 1.6,
  "Gold (18K Leaf Accents)": 1.45,
  "Gold (Foil/Flake Inlay)": 1.35,
  "Copper (Solid Bar Inlay)": 1.35,
  "Copper (Rod / Piping Edge)": 1.25,
  "Copper (Hammered Accents)": 1.25,
  "Brass (Inlay / Banding)": 1.25,
  "Bronze (Inlay / Banding)": 1.2,
  "Stainless Steel (Brushed)": 1.15,
  "Blackened Steel": 1.15,
  "Aluminum (Brushed)": 1.1,
};

// Crystal intensity bump
const CRYSTAL_MULT: Record<(typeof CRYSTAL_INTENSITY)[number], number> = {
  None: 1.0,
  "Light Accent": 1.08,
  "Integrated Array": 1.18,
  "Full Energetic Layout": 1.35,
};

// Sacred geometry bump
const GEOM_MULT: Record<(typeof SACRED_GEOM)[number], number> = {
  None: 1.0,
  "Subtle Pattern": 1.08,
  "Primary Motif": 1.18,
  "Signature Array": 1.35,
};

// Finish bump
const FINISH_MULT: Record<(typeof FINISHES)[number], number> = {
  "Hardwax Oil (Matte)": 1.0,
  "Polyurethane (Satin)": 1.05,
  "Polyurethane (High Gloss)": 1.12,
  "Natural Oil (Low Sheen)": 1.0,
};

// Lighting FX bump when build type is Lighting
const LIGHTING_MULT: Record<(typeof LIGHTING_FX)[number], number> = {
  None: 1.0,
  "Warm Glow": 1.1,
  "Cool Glow": 1.1,
  "Dual-Zone": 1.2,
  Programmable: 1.35,
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

/* ---------------------------
   PREVIEW COLOR HELPERS
----------------------------*/

function woodHex(wood: (typeof WOODS)[number]) {
  const map: Partial<Record<(typeof WOODS)[number], string>> = {
    Walnut: "#5b3a29",
    "Maple (Hard)": "#e1cda7",
    "White Oak": "#c8ad7f",
    "Red Oak": "#b58563",
    Cherry: "#b16a4a",
    Hickory: "#b79b78",
    Ash: "#cbbfa7",
    Mahogany: "#7a3f2a",
    Cedar: "#ad6d4a",
    "Pine (Select)": "#e9d7a9",
    "Poplar (Paint-Grade)": "#d6cfbf",
    "Teak (Premium)": "#996f3b",
    Sapele: "#8c5138",
    "Zebrawood (Premium)": "#aa8a5c",
  };
  return map[wood] ?? "#bfa782";
}

function metalHex(metal: MetalOption) {
  const map: Partial<Record<MetalOption, string>> = {
    "None": "transparent",
    "Gold (24K Leaf Accents)": "#d4af37",
    "Gold (18K Leaf Accents)": "#c9a335",
    "Gold (Foil/Flake Inlay)": "#bb9934",
    "Copper (Solid Bar Inlay)": "#b87333",
    "Copper (Rod / Piping Edge)": "#b87333",
    "Copper (Hammered Accents)": "#b87333",
    "Brass (Inlay / Banding)": "#b5a642",
    "Bronze (Inlay / Banding)": "#8c7853",
    "Stainless Steel (Brushed)": "#c0c0c0",
    "Blackened Steel": "#2b2b2b",
    "Aluminum (Brushed)": "#c7c7c7",
  };
  return map[metal] ?? "transparent";
}

/* ---------------------------
   PAGE
----------------------------*/

export default function CustomConfiguratorPage() {
  // Core selection
  const [buildType, setBuildType] = useState<(typeof BUILD_TYPES)[number]>("Table");
  const [tableType, setTableType] = useState<(typeof TABLE_TYPES)[number]>("Dining Table");
  const [wood, setWood] = useState<(typeof WOODS)[number]>("Walnut");
  const [edgeStyle, setEdgeStyle] = useState<(typeof EDGE_STYLES)[number]>("Live Edge");
  const [resinPattern, setResinPattern] = useState<(typeof RESIN_PATTERNS)[number]>("None");
  const [metal, setMetal] = useState<MetalOption>("None");
  const [finish, setFinish] = useState<(typeof FINISHES)[number]>("Hardwax Oil (Matte)");
  const [crystal, setCrystal] = useState<(typeof CRYSTAL_INTENSITY)[number]>("None");
  const [geom, setGeom] = useState<(typeof SACRED_GEOM)[number]>("None");
  const [lightingFx, setLightingFx] = useState<(typeof LIGHTING_FX)[number]>("None");

  // Dimensions
  const [lengthIn, setLengthIn] = useState(72);
  const [widthIn, setWidthIn] = useState(36);
  const [thicknessIn, setThicknessIn] = useState(1.75);

  // Options
  const [includeDelivery, setIncludeDelivery] = useState(false);
  const [rush, setRush] = useState(false);

  // Price calculation
  const price = useMemo(() => {
    let base = BASE_BY_BUILD[buildType];

    // If table, add subtype complexity
    if (buildType === "Table") {
      base *= TABLE_COMPLEXITY[tableType];
    }

    // Size influence (simple area factor against a nominal baseline)
    const area = (lengthIn * widthIn) / 144; // sq ft
    const sizeFactor = clamp(area / 12, 0.6, 2.2); // normalize vs ~12 sq ft
    base *= sizeFactor;

    // Material & features
    base *= WOOD_MULT[wood];
    base *= RESIN_MULT[resinPattern];
    if (metal !== "None") base *= METAL_MULT[metal];
    base *= CRYSTAL_MULT[crystal];
    base *= GEOM_MULT[geom];
    base *= FINISH_MULT[finish];

    // Thickness bump
    if (thicknessIn >= 2.25) base *= 1.18;
    else if (thicknessIn >= 2.0) base *= 1.12;
    else if (thicknessIn >= 1.75) base *= 1.06;

    // Lighting builds can stack a FX bump
    if (buildType === "Lighting") {
      base *= LIGHTING_MULT[lightingFx];
    }

    // Add delivery/rush surcharges (simple flat multipliers)
    if (includeDelivery) base *= 1.06;
    if (rush) base *= 1.15;

    // Legs are always separate (not priced here)
    // Round for display
    return Math.round(base / 10) * 10;
  }, [
    buildType,
    tableType,
    wood,
    edgeStyle,
    resinPattern,
    metal,
    finish,
    crystal,
    geom,
    lightingFx,
    lengthIn,
    widthIn,
    thicknessIn,
    includeDelivery,
    rush,
  ]);

  // Preview model
  const preview = useMemo(() => {
    // Map to colors and sizes that feel proportional
    const L = clamp(lengthIn * 5, 240, 900); // px
    const W = clamp(widthIn * 5, 180, 700); // px
    const woodColor = woodHex(wood);
    const metalColor = metalHex(metal);
    const showRiver = resinPattern === "River";
    const isTable = buildType === "Table";
    const isLive = edgeStyle === "Live Edge" || (isTable && (tableType === "Live-Edge Slab" || tableType.includes("River")));

    return { L, W, woodColor, metalColor, showRiver, isTable, isLive };
  }, [lengthIn, widthIn, wood, metal, resinPattern, buildType, tableType, edgeStyle]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#E8C987]">
            Design Your Custom Build
          </h1>
          <p className="mt-3 text-neutral-300">
            Tables, panels, shelves, cabinetry, trim, lighting, seating, counters — engineered to your space,
            frequency, and function. {LEGS_POLICY}
          </p>
        </div>

        {/* Responsive layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <FieldWrap label="Build Type">
              <Select value={buildType} onChange={setBuildType} options={BUILD_TYPES} />
            </FieldWrap>

            {buildType === "Table" && (
              <>
                <FieldWrap label="Table Type">
                  <Select value={tableType} onChange={setTableType} options={TABLE_TYPES} />
                </FieldWrap>
                <FieldWrap label="Edge Style">
                  <Select value={edgeStyle} onChange={setEdgeStyle} options={EDGE_STYLES} />
                </FieldWrap>
              </>
            )}

            {buildType !== "Table" && (
              <FieldWrap label="Edge Style">
                <Select value={edgeStyle} onChange={setEdgeStyle} options={EDGE_STYLES} />
              </FieldWrap>
            )}

            <div className="grid grid-cols-3 gap-4">
              <FieldWrap label="Length">
                <NumberField value={lengthIn} onChange={setLengthIn} min={12} step={1} unit="in" />
              </FieldWrap>
              <FieldWrap label="Width / Depth">
                <NumberField value={widthIn} onChange={setWidthIn} min={6} step={1} unit="in" />
              </FieldWrap>
              <FieldWrap label="Thickness">
                <NumberField value={thicknessIn} onChange={setThicknessIn} min={1} step={0.25} unit="in" />
              </FieldWrap>
            </div>

            <FieldWrap label="Primary Wood">
              <Select value={wood} onChange={setWood} options={WOODS} />
            </FieldWrap>

            <div className="grid md:grid-cols-2 gap-4">
              <FieldWrap label="Resin Pattern">
                <Select value={resinPattern} onChange={setResinPattern} options={RESIN_PATTERNS} />
              </FieldWrap>
              <FieldWrap label="Metal / Accents">
                <Select value={metal} onChange={setMetal} options={METALS_WITH_NONE} />
              </FieldWrap>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FieldWrap label="Energetic Crystals (Level)">
                <Select value={crystal} onChange={setCrystal} options={CRYSTAL_INTENSITY} />
              </FieldWrap>
              <FieldWrap label="Sacred Geometry Layer">
                <Select value={geom} onChange={setGeom} options={SACRED_GEOM} />
              </FieldWrap>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FieldWrap label="Finish">
                <Select value={finish} onChange={setFinish} options={FINISHES} />
              </FieldWrap>

              {buildType === "Lighting" && (
                <FieldWrap label="Lighting Effects">
                  <Select value={lightingFx} onChange={setLightingFx} options={LIGHTING_FX} />
                </FieldWrap>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Toggle checked={includeDelivery} onChange={setIncludeDelivery} label="Include White-Glove Delivery" />
              <Toggle checked={rush} onChange={setRush} label="Rush Fabrication" />
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
              <div className="text-sm text-neutral-400">Instant Estimate*</div>
              <div className="text-3xl font-bold text-[#E8C987] mt-1">${price.toLocaleString()}</div>
              <div className="text-xs text-neutral-500 mt-2">
                *Subject to final design, materials availability, legs/hardware, logistics, and on-site requirements.
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
            <div className="text-sm text-neutral-400 mb-3">Live Preview (illustrative)</div>
            <div className="w-full overflow-x-auto">
              <svg
                width={preview.L + 40}
                height={preview.W + 40}
                viewBox={`0 0 ${preview.L + 40} ${preview.W + 40}`}
                className="mx-auto block"
                role="img"
                aria-label="Design preview"
              >
                {/* backdrop */}
                <rect x={0} y={0} width={preview.L + 40} height={preview.W + 40} fill="#0b0b0b" />
                {/* table / panel shape */}
                <g transform="translate(20,20)">
                  {/* wood body */}
                  <rect
                    x={0}
                    y={0}
                    width={preview.L}
                    height={preview.W}
                    rx={edgeRadius(edgeStyle)}
                    ry={edgeRadius(edgeStyle)}
                    fill={preview.woodColor}
                    stroke={preview.metalColor === "transparent" ? "#1c1c1c" : preview.metalColor}
                    strokeWidth={preview.metalColor === "transparent" ? 2 : 6}
                  />
                  {/* river */}
                  {preview.showRiver && (
                    <path
                      d={riverPath(preview.L, preview.W)}
                      fill="#2d98c2"
                      fillOpacity="0.6"
                    />
                  )}
                  {/* subtle grain lines */}
                  {grain(preview.L, preview.W, edgeStyle)}
                </g>
              </svg>
            </div>

            <ul className="mt-4 text-sm text-neutral-300 space-y-1">
              <li>
                <strong>Wood:</strong> {wood}
              </li>
              <li>
                <strong>Metal Accents:</strong> {metal}
              </li>
              <li>
                <strong>Resin:</strong> {resinPattern}
              </li>
              <li>
                <strong>Geometry:</strong> {geom} &nbsp; • &nbsp; <strong>Crystals:</strong> {crystal}
              </li>
              <li>
                <strong>Finish:</strong> {finish}
              </li>
              <li>
                <strong>Dims:</strong> {lengthIn}" × {widthIn}" × {thicknessIn}"
              </li>
            </ul>

            <div className="mt-5 text-xs text-neutral-500">
              Visuals are illustrative. Final proposals include detailed drawings/specs. {LEGS_POLICY}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------------------------
   SVG HELPERS
----------------------------*/

function edgeRadius(edge: (typeof EDGE_STYLES)[number]) {
  if (edge === "Rounded") return 18;
  if (edge === "Chamfered") return 4;
  return 2; // Live & Straight render similarly in this 2D abstraction
}

function riverPath(L: number, W: number) {
  // A soft bezier river down the center third
  const x0 = 20, x1 = L - 20;
  const yMid = W / 2;
  const amp = Math.max(18, W * 0.12);
  return `
    M ${x0} ${yMid - amp}
    C ${L * 0.33} ${yMid - amp * 1.5}, ${L * 0.66} ${yMid + amp * 1.5}, ${x1} ${yMid + amp}
    L ${x1} ${yMid + amp * 2}
    C ${L * 0.66} ${yMid + amp * 3}, ${L * 0.33} ${yMid - amp}, ${x0} ${yMid - amp * 2}
    Z
  `;
}

function grain(L: number, W: number, edge: (typeof EDGE_STYLES)[number]) {
  // Draw faint grain lines to avoid flat look
  const lines = [];
  const rows = 6;
  for (let i = 1; i <= rows; i++) {
    const y = Math.round((W / (rows + 1)) * i);
    lines.push(
      <line
        key={`g-${i}`}
        x1={26}
        y1={y + 20}
        x2={L - 6}
        y2={y + 20}
        stroke="rgba(0,0,0,0.12)"
        strokeWidth={edge === "Live Edge" ? 1.2 : 0.9}
      />
    );
  }
  return <g>{lines}</g>;
}
