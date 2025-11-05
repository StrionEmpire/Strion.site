"use client";

import React, { useMemo, useState } from "react";

/** ---------- shared UI ---------- */
function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-semibold text-neutral-300">{children}</div>;
}
function Field({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}
function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}
function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4">{children}</div>
  );
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-[#E8C987]">{children}</h2>;
}
function Select<T extends string>({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: T;
  onChange: (v: any) => void; // TS-easy for Android edits
  options: readonly T[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg bg-black/50 border border-neutral-800 text-neutral-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8C987]"
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
function Input({
  value,
  onChange,
  type = "text",
  min,
  max,
  step,
  placeholder,
}: {
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      className="w-full rounded-lg bg-black/50 border border-neutral-800 text-neutral-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8C987]"
    />
  );
}
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[#E8C987]"
      />
      <span className="text-neutral-300">{label}</span>
    </label>
  );
}

/** ---------- data ---------- */
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

const WOODS = [
  "Walnut",
  "White Oak",
  "Red Oak",
  "Maple",
  "Cherry",
  "Ash",
  "Hickory",
  "Cedar",
  "Pine",
  "Mahogany",
  "Sapele",
  "Teak",
] as const;

const METALS = [
  "None",
  "Gold (24K Leaf Accents)",
  "Gold (18K Leaf Accents)",
  "Gold (Foil/Flake Inlay)",
  "Copper (Solid Bar Inlay)",
  "Copper (Rod / Piping Edge)",
  "Copper (Hammered Accents)",
  "Brass (Solid Band)",
  "Bronze (Patinated)",
  "Steel (Blackened)",
  "Aluminum (Brushed)",
] as const;

const CRYSTALS = [
  "None",
  "Selenite",
  "Clear Quartz",
  "Black Tourmaline",
  "Amethyst",
  "Citrine",
  "Smoky Quartz",
  "Rose Quartz",
  "Custom (Specified Later)",
] as const;

const RESIN_PATTERNS = [
  "None",
  "River",
  "Galaxy",
  "Metallic Vein",
  "Stone/Marble FX",
  "Smoke/Negative Space",
] as const;

const EDGE_STYLES = ["Square", "Eased", "Chamfer", "Roundover", "Live Edge"] as const;
const TABLE_TYPES = [
  "Dining",
  "Conference",
  "Coffee",
  "Console",
  "Side / End",
  "Live-Edge Slab",
  "Epoxy River",
] as const;
const SHAPES = ["Rectangle", "Oval", "Round", "Square"] as const;

const PANEL_PATTERNS = [
  "Sacred Geometry Grid",
  "Chevron",
  "Slatted",
  "Herringbone",
  "Acoustic Diffuser",
] as const;

const SHELF_STYLES = ["Floating (Concealed)", "Bracketed Metal", "Thick Live Edge"] as const;

const CABINET_STYLES = [
  "Flat Panel",
  "Shaker",
  "Frame-and-Panel",
  "Glass Front",
  "Custom Built-in",
] as const;

const TRIM_STYLES = [
  "Baseboard",
  "Crown",
  "Wainscoting",
  "Door/Window Casing",
  "Custom Profile",
] as const;

const LIGHTING_STYLES = [
  "Pendant Cluster",
  "Sconce Pair",
  "Panel Backlight",
  "Chandelier (Wood/Metal)",
  "Selenite Rod Array",
] as const;

const LEG_NOTICE =
  "Legs/bases are arranged and sold separately. Styles and availability change frequently.";

/** ---------- helpers ---------- */
function toNum(v: string | number) {
  if (typeof v === "number") return v;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

/** ---------- price model (tunable) ---------- */
const BASE = {
  Table: 18, // $/sq ft baseline for simple top
  "Wall Panel": 12,
  "Floating Shelves": 180, // per shelf baseline (L up to 36”)
  Cabinetry: 250, // per linear ft
  "Interior Trim / Moulding": 12, // per linear ft
  Lighting: 450, // per fixture baseline
  "Bench / Seating": 600, // per bench baseline
  "Counter / Bar Top": 26, // $/sq ft
} as const;

const MULTIPLIER = {
  premiumWood: 1.25, // walnut/teak/mahogany
  liveEdge: 1.25,
  resinRiver: 1.35,
  resinFX: 1.2,
  sacredGeom: 1.25,
  crystalFX: 1.15,
  heavyMetal: 1.25,
  goldLeaf: 1.35,
  complexShape: 1.1,
  thickShelf: 1.2,
  builtIn: 1.35,
} as const;

function isPremiumWood(w: string) {
  return ["Walnut", "Teak", "Mahogany", "Sapele"].includes(w);
}
function isGold(m: string) {
  return m.startsWith("Gold");
}
function hasHeavyMetal(m: string) {
  return m !== "None";
}

/** ---------- preview renderer (SVG) ---------- */
function Preview({
  buildType,
  width,
  length,
  depth,
  wood,
  metal,
  resinPattern,
  edgeStyle,
  shape,
}: {
  buildType: string;
  width: string;
  length: string;
  depth: string;
  wood: string;
  metal: string;
  resinPattern: string;
  edgeStyle: string;
  shape: string;
}) {
  const { woodColor, metalColor, L, W, showRiver } = useMemo(() => {
    const L = Math.min(680, Math.max(220, toNum(length) * 5));
    const W = Math.min(440, Math.max(160, toNum(width) * 5));
    const woodColor =
      wood === "Walnut"
        ? "#3b2a1f"
        : wood === "White Oak"
        ? "#c6b089"
        : wood === "Red Oak"
        ? "#b98e6d"
        : wood === "Maple"
        ? "#d9cdb6"
        : wood === "Cherry"
        ? "#b96f54"
        : wood === "Ash"
        ? "#cdbda2"
        : wood === "Hickory"
        ? "#a37e5a"
        : wood === "Cedar"
        ? "#b87a5b"
        : wood === "Pine"
        ? "#d9c18e"
        : wood === "Mahogany"
        ? "#7a3a2a"
        : wood === "Sapele"
        ? "#6f3a2a"
        : wood === "Teak"
        ? "#b38a57"
        : "#b3a089";

    const metalColor = metal.includes("Gold")
      ? "#E8C987"
      : metal.startsWith("Copper")
      ? "#b87333"
      : metal.startsWith("Brass")
      ? "#b5a642"
      : metal.startsWith("Bronze")
      ? "#8c7853"
      : metal.startsWith("Steel")
      ? "#2e2e2e"
      : metal.startsWith("Aluminum")
      ? "#c0c0c0"
      : "transparent";

    const showRiver = resinPattern === "River";
    return { woodColor, metalColor, L, W, showRiver };
  }, [wood, metal, resinPattern, length, width]);

  const borderR =
    edgeStyle === "Roundover" ? 24 : edgeStyle === "Chamfer" ? 4 : edgeStyle === "Eased" ? 2 : 0;

  const frame = (
    <rect
      x={30}
      y={30}
      width={L}
      height={W}
      rx={borderR}
      ry={borderR}
      fill={woodColor}
      stroke={metal === "None" ? "#111" : metalColor}
      strokeWidth={metal === "None" ? 2 : 6}
    />
  );

  function river() {
    if (!showRiver) return null;
    const x = 30 + L / 2 - 18;
    return <rect x={x} y={30} width={36} height={W} fill="#0b7480" opacity={0.55} />;
  }

  function shapeMask() {
    if (shape === "Round") {
      return (
        <circle cx={30 + L / 2} cy={30 + W / 2} r={Math.min(L, W) / 2} fill={woodColor} />
      );
    }
    if (shape === "Oval") {
      return (
        <ellipse
          cx={30 + L / 2}
          cy={30 + W / 2}
          rx={L / 2}
          ry={W / 2}
          fill={woodColor}
          stroke={metal === "None" ? "#111" : metalColor}
          strokeWidth={metal === "None" ? 2 : 6}
        />
      );
    }
    if (shape === "Square") {
      const s = Math.min(L, W);
      return (
        <rect
          x={30 + (L - s) / 2}
          y={30 + (W - s) / 2}
          width={s}
          height={s}
          rx={borderR}
          ry={borderR}
          fill={woodColor}
          stroke={metal === "None" ? "#111" : metalColor}
          strokeWidth={metal === "None" ? 2 : 6}
        />
      );
    }
    return frame;
  }

  // different compositions by type
  return (
    <svg viewBox="0 0 760 520" className="w-full h-auto rounded-xl bg-neutral-900">
      <defs>
        <linearGradient id="goldGlow" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(232,201,135,0.0)" />
          <stop offset="100%" stopColor="rgba(232,201,135,0.15)" />
        </linearGradient>
      </defs>

      {buildType === "Table" || buildType === "Counter / Bar Top" ? (
        <>
          {shape === "Rectangle" ? frame : shapeMask()}
          {river()}
        </>
      ) : null}

      {buildType === "Wall Panel" ? (
        <>
          <rect x={60} y={40} width={L - 60} height={W - 60} fill={woodColor} rx={8} />
          <g opacity={0.22}>
            {/* simple sacred geometry grid */}
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={"v" + i}
                x1={60 + i * ((L - 60) / 8)}
                y1={40}
                x2={60 + i * ((L - 60) / 8)}
                y2={W - 20}
                stroke="#fff"
                strokeWidth={0.7}
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={"h" + i}
                x1={60}
                y1={40 + i * ((W - 60) / 6)}
                x2={L}
                y2={40 + i * ((W - 60) / 6)}
                stroke="#fff"
                strokeWidth={0.7}
              />
            ))}
          </g>
          {hasHeavyMetal(metal) && (
            <rect x={60} y={40} width={L - 60} height={W - 60} fill="url(#goldGlow)" />
          )}
        </>
      ) : null}

      {buildType === "Floating Shelves" ? (
        <>
          <rect x={120} y={120} width={L - 180} height={24} rx={6} fill={woodColor} />
          <rect x={120} y={200} width={L - 240} height={24} rx={6} fill={woodColor} />
          <rect x={120} y={280} width={L - 210} height={24} rx={6} fill={woodColor} />
          {hasHeavyMetal(metal) && (
            <g opacity={0.6}>
              <rect x={120} y={120} width={L - 180} height={2} fill={metalColor} />
              <rect x={120} y={200} width={L - 240} height={2} fill={metalColor} />
              <rect x={120} y={280} width={L - 210} height={2} fill={metalColor} />
            </g>
          )}
        </>
      ) : null}

      {buildType === "Cabinetry" ? (
        <>
          <rect x={80} y={80} width={L - 140} height={W - 160} fill={woodColor} rx={6} />
          <rect x={90} y={90} width={(L - 160) / 2} height={W - 180} fill="#00000022" />
          <rect x={90 + (L - 160) / 2 + 20} y={90} width={(L - 200) / 2} height={W - 180} fill="#00000022" />
          {hasHeavyMetal(metal) && (
            <g>
              <rect x={90} y={90} width={(L - 160) / 2} height={4} fill={metalColor} />
              <rect x={90 + (L - 160) / 2 + 20} y={90} width={(L - 200) / 2} height={4} fill={metalColor} />
            </g>
          )}
        </>
      ) : null}

      {buildType === "Interior Trim / Moulding" ? (
        <>
          <rect x={80} y={240} width={L - 120} height={18} fill={woodColor} />
          <rect x={80} y={320} width={L - 180} height={14} fill={woodColor} />
          <rect x={80} y={160} width={L - 200} height={22} fill={woodColor} />
          {hasHeavyMetal(metal) && (
            <rect x={80} y={238} width={L - 120} height={2} fill={metalColor} />
          )}
        </>
      ) : null}

      {buildType === "Lighting" ? (
        <>
          <rect x={80} y={60} width={L - 140} height={W - 160} fill="#0a0a0a" rx={10} />
          <g opacity={0.2}>
            <circle cx={120} cy={120} r={10} fill="#fff" />
            <circle cx={160} cy={160} r={10} fill="#fff" />
            <circle cx={200} cy={200} r={10} fill="#fff" />
            <circle cx={240} cy={240} r={10} fill="#fff" />
          </g>
          {/* selenite rods feel */}
          <g opacity={0.7}>
            {Array.from({ length: 8 }).map((_, i) => (
              <rect
                key={i}
                x={100 + i * 34}
                y={100}
                width={10}
                height={W - 200}
                rx={4}
                fill="#f7f7f7"
              />
            ))}
          </g>
          {hasHeavyMetal(metal) && (
            <rect x={80} y={60} width={L - 140} height={W - 160} fill="url(#goldGlow)" />
          )}
        </>
      ) : null}

      {buildType === "Bench / Seating" ? (
        <>
          <rect x={60} y={220} width={L - 100} height={50} rx={8} fill={woodColor} />
          {hasHeavyMetal(metal) && (
            <>
              <rect x={80} y={270} width={10} height={50} fill={metalColor} />
              <rect x={L - 120} y={270} width={10} height={50} fill={metalColor} />
            </>
          )}
        </>
      ) : null}
    </svg>
  );
}

/** ---------- main page ---------- */
export default function Custom() {
  // globals
  const [buildType, setBuildType] = useState<(typeof BUILD_TYPES)[number]>("Table");
  const [wood, setWood] = useState<(typeof WOODS)[number]>("Walnut");
  const [metal, setMetal] = useState<(typeof METALS)[number]>("None");
  const [crystal, setCrystal] = useState<(typeof CRYSTALS)[number]>("None");

  // tables + counters
  const [tableType, setTableType] = useState<(typeof TABLE_TYPES)[number]>("Dining");
  const [shape, setShape] = useState<(typeof SHAPES)[number]>("Rectangle");
  const [edgeStyle, setEdgeStyle] = useState<(typeof EDGE_STYLES)[number]>("Eased");
  const [resinPattern, setResinPattern] = useState<(typeof RESIN_PATTERNS)[number]>("None");

  // universal dims
  const [length, setLength] = useState("72"); // in
  const [width, setWidth] = useState("36"); // in
  const [thickness, setThickness] = useState("1.5");
  const [depth, setDepth] = useState("12"); // shelf/depth

  // shelves
  const [shelfStyle, setShelfStyle] = useState<(typeof SHELF_STYLES)[number]>("Floating (Concealed)");
  const [shelfCount, setShelfCount] = useState("2");

  // cabinetry
  const [cabinetStyle, setCabinetStyle] = useState<(typeof CABINET_STYLES)[number]>("Shaker");
  const [linearFeet, setLinearFeet] = useState("8");

  // trim
  const [trimStyle, setTrimStyle] = useState<(typeof TRIM_STYLES)[number]>("Crown");
  const [trimFeet, setTrimFeet] = useState("40");

  // panels
  const [panelPattern, setPanelPattern] =
    useState<(typeof PANEL_PATTERNS)[number]>("Sacred Geometry Grid");

  // lighting
  const [lightingStyle, setLightingStyle] =
    useState<(typeof LIGHTING_STYLES)[number]>("Selenite Rod Array");

  // features
  const [hasSacredGeometry, setHasSacredGeometry] = useState(true);
  const [includeToneWork, setIncludeToneWork] = useState(true);

  // price
  const price = useMemo(() => {
    // area helpers
    const L = toNum(length);
    const W = toNum(width);
    const D = toNum(depth);
    const areaSqFt = Math.max(1, (L * W) / 144);
    const runFt = Math.max(1, L / 12);

    let p = 0;
    switch (buildType) {
      case "Table": {
        p = areaSqFt * BASE.Table;
        if (tableType === "Conference") p *= 1.25;
        if (shape !== "Rectangle") p *= MULTIPLIER.complexShape;
        if (edgeStyle === "Live Edge") p *= MULTIPLIER.liveEdge;
        if (resinPattern === "River") p *= MULTIPLIER.resinRiver;
        if (["Galaxy", "Metallic Vein", "Stone/Marble FX", "Smoke/Negative Space"].includes(resinPattern))
          p *= MULTIPLIER.resinFX;
        break;
      }
      case "Counter / Bar Top": {
        p = areaSqFt * BASE["Counter / Bar Top"];
        if (edgeStyle === "Live Edge") p *= MULTIPLIER.liveEdge;
        break;
      }
      case "Wall Panel": {
        p = areaSqFt * BASE["Wall Panel"];
        if (panelPattern === "Sacred Geometry Grid") p *= MULTIPLIER.sacredGeom;
        break;
      }
      case "Floating Shelves": {
        const each = BASE["Floating Shelves"] * (D > 12 ? MULTIPLIER.thickShelf : 1);
        p = each * Math.max(1, toNum(shelfCount));
        if (shelfStyle === "Bracketed Metal" && hasHeavyMetal(metal)) p *= 1.1;
        break;
      }
      case "Cabinetry": {
        p = BASE.Cabinetry * Math.max(1, toNum(linearFeet));
        if (cabinetStyle === "Custom Built-in") p *= MULTIPLIER.builtIn;
        break;
      }
      case "Interior Trim / Moulding": {
        p = BASE["Interior Trim / Moulding"] * Math.max(1, toNum(trimFeet));
        if (trimStyle === "Custom Profile") p *= 1.25;
        break;
      }
      case "Lighting": {
        p = BASE.Lighting;
        if (lightingStyle === "Selenite Rod Array") p *= 1.3;
        break;
      }
      case "Bench / Seating": {
        p = BASE["Bench / Seating"];
        break;
      }
    }

    // shared multipliers
    if (isPremiumWood(wood)) p *= MULTIPLIER.premiumWood;
    if (hasHeavyMetal(metal)) p *= MULTIPLIER.heavyMetal;
    if (isGold(metal)) p *= MULTIPLIER.goldLeaf;
    if (hasSacredGeometry) p *= MULTIPLIER.sacredGeom;
    if (includeToneWork) p *= 1.06; // small uplift

    // thickness influence for table/counter/panel
    if (["Table", "Counter / Bar Top", "Wall Panel"].includes(buildType)) {
      const t = Math.max(1, toNum(thickness));
      p *= 0.85 + t * 0.15;
    }

    // min floor to keep luxury vibe
    if (p < 450) p = 450;
    return Math.round(p / 10) * 10;
  }, [
    buildType,
    wood,
    metal,
    hasSacredGeometry,
    includeToneWork,
    tableType,
    shape,
    edgeStyle,
    resinPattern,
    length,
    width,
    depth,
    shelfCount,
    shelfStyle,
    cabinetStyle,
    linearFeet,
    trimStyle,
    trimFeet,
    thickness,
    lightingStyle,
  ]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="mb-6 text-sm text-neutral-400">
          <span className="opacity-70">Home</span> <span className="opacity-50">/</span>{" "}
          <span>Custom</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#E8C987]">
          Build Your Custom Piece
        </h1>
        <p className="mt-2 text-neutral-300">
          Configure tables, panels, shelves, cabinetry, lighting and more. Pricing is for
          planning; {LEG_NOTICE}
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <Box>
            <SectionTitle>Basics</SectionTitle>
            <div className="mt-4 space-y-4">
              <Field>
                <Label>Build Type</Label>
                <Select value={buildType} onChange={setBuildType} options={BUILD_TYPES} />
              </Field>

              <Row>
                <Field>
                  <Label>Primary Wood</Label>
                  <Select value={wood} onChange={setWood} options={WOODS} />
                </Field>
                <Field>
                  <Label>Metal Accents</Label>
                  <Select value={metal} onChange={setMetal} options={METALS} />
                </Field>
              </Row>

              <Row>
                <Field>
                  <Label>Crystals</Label>
                  <Select value={crystal} onChange={setCrystal} options={CRYSTALS} />
                </Field>
                <Field>
                  <Label>Thickness (in)</Label>
                  <Input value={thickness} onChange={setThickness} type="number" step={0.25} />
                </Field>
              </Row>

              <Row>
                <Field>
                  <Label>Length (in)</Label>
                  <Input value={length} onChange={setLength} type="number" />
                </Field>
                <Field>
                  <Label>Width (in) / Depth</Label>
                  <Input value={width} onChange={setWidth} type="number" />
                </Field>
              </Row>

              <Row>
                <Field>
                  <Toggle
                    checked={hasSacredGeometry}
                    onChange={setHasSacredGeometry}
                    label="Sacred Geometry Integration"
                  />
                </Field>
                <Field>
                  <Toggle
                    checked={includeToneWork}
                    onChange={setIncludeToneWork}
                    label="Tone Programming (Resonance Tuning)"
                  />
                </Field>
              </Row>
            </div>
          </Box>

          {/* Preview */}
          <Box>
            <SectionTitle>Live Preview</SectionTitle>
            <div className="mt-4">
              <Preview
                buildType={buildType}
                width={width}
                length={length}
                depth={depth}
                wood={wood}
                metal={metal}
                resinPattern={resinPattern}
                edgeStyle={edgeStyle}
                shape={shape}
              />
            </div>
            <div className="mt-4 text-sm text-neutral-400">
              Preview is an approximation for layout and accents (not a photo). Final visuals are
              confirmed during design review.
            </div>
          </Box>

          {/* Type-specific controls */}
          <Box>
            <SectionTitle>Type-Specific Options</SectionTitle>
            <div className="mt-4 space-y-4">
              {buildType === "Table" && (
                <>
                  <Row>
                    <Field>
                      <Label>Table Type</Label>
                      <Select value={tableType} onChange={setTableType} options={TABLE_TYPES} />
                    </Field>
                    <Field>
                      <Label>Shape</Label>
                      <Select value={shape} onChange={setShape} options={SHAPES} />
                    </Field>
                  </Row>
                  <Row>
                    <Field>
                      <Label>Edge Style</Label>
                      <Select value={edgeStyle} onChange={setEdgeStyle} options={EDGE_STYLES} />
                    </Field>
                    <Field>
                      <Label>Resin Pattern</Label>
                      <Select
                        value={resinPattern}
                        onChange={setResinPattern}
                        options={RESIN_PATTERNS}
                      />
                    </Field>
                  </Row>
                </>
              )}

              {buildType === "Counter / Bar Top" && (
                <>
                  <Row>
                    <Field>
                      <Label>Edge Style</Label>
                      <Select value={edgeStyle} onChange={setEdgeStyle} options={EDGE_STYLES} />
                    </Field>
                    <Field>
                      <Label>Resin Pattern</Label>
                      <Select
                        value={resinPattern}
                        onChange={setResinPattern}
                        options={RESIN_PATTERNS}
                      />
                    </Field>
                  </Row>
                </>
              )}

              {buildType === "Wall Panel" && (
                <>
                  <Row>
                    <Field>
                      <Label>Panel Pattern</Label>
                      <Select
                        value={panelPattern}
                        onChange={setPanelPattern}
                        options={PANEL_PATTERNS}
                      />
                    </Field>
                    <Field>
                      <Label>Depth (in)</Label>
                      <Input value={depth} onChange={setDepth} type="number" />
                    </Field>
                  </Row>
                </>
              )}

              {buildType === "Floating Shelves" && (
                <>
                  <Row>
                    <Field>
                      <Label>Shelf Style</Label>
                      <Select value={shelfStyle} onChange={setShelfStyle} options={SHELF_STYLES} />
                    </Field>
                    <Field>
                      <Label>Depth (in)</Label>
                      <Input value={depth} onChange={setDepth} type="number" />
                    </Field>
                  </Row>
                  <Row>
                    <Field>
                      <Label>Number of Shelves</Label>
                      <Input value={shelfCount} onChange={setShelfCount} type="number" />
                    </Field>
                  </Row>
                </>
              )}

              {buildType === "Cabinetry" && (
                <>
                  <Row>
                    <Field>
                      <Label>Cabinet Style</Label>
                      <Select
                        value={cabinetStyle}
                        onChange={setCabinetStyle}
                        options={CABINET_STYLES}
                      />
                    </Field>
                    <Field>
                      <Label>Linear Feet</Label>
                      <Input value={linearFeet} onChange={setLinearFeet} type="number" />
                    </Field>
                  </Row>
                </>
              )}

              {buildType === "Interior Trim / Moulding" && (
                <>
                  <Row>
                    <Field>
                      <Label>Trim Style</Label>
                      <Select value={trimStyle} onChange={setTrimStyle} options={TRIM_STYLES} />
                    </Field>
                    <Field>
                      <Label>Run Length (ft)</Label>
                      <Input value={trimFeet} onChange={setTrimFeet} type="number" />
                    </Field>
                  </Row>
                </>
              )}

              {buildType === "Lighting" && (
                <>
                  <Row>
                    <Field>
                      <Label>Lighting Style</Label>
                      <Select
                        value={lightingStyle}
                        onChange={setLightingStyle}
                        options={LIGHTING_STYLES}
                      />
                    </Field>
                    <Field>
                      <Label>Width / Span (in)</Label>
                      <Input value={width} onChange={setWidth} type="number" />
                    </Field>
                  </Row>
                </>
              )}
            </div>
          </Box>

          {/* Quote + CTA */}
          <Box>
            <SectionTitle>Instant Quote (Estimate)</SectionTitle>
            <div className="mt-4 text-4xl font-extrabold text-[#E8C987]">${price.toLocaleString()}</div>
            <ul className="mt-3 text-sm text-neutral-400 list-disc pl-5 space-y-1">
              <li>Premium hardwoods, hand-finished.</li>
              <li>Metals available: Gold, Copper, Brass, Bronze, Steel, Aluminum.</li>
              <li>Crystals optional; tuned with tone programming.</li>
              <li>{LEG_NOTICE}</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="/about"
                className="flex-1 text-center rounded-lg bg-[#E8C987] text-black font-semibold py-3 hover:opacity-90"
              >
                Learn the Method
              </a>
              <a
                href="/nationwide"
                className="flex-1 text-center rounded-lg border border-[#E8C987] text-[#E8C987] font-semibold py-3 hover:bg-[#E8C987] hover:text-black"
              >
                Book a Design Call
              </a>
            </div>
          </Box>
        </div>
      </div>
    </main>
  );
}
