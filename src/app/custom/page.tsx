"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/* ──────────────────────────────────────────────────────────────────────────────
   TYPES & CORE CONSTANTS
──────────────────────────────────────────────────────────────────────────────── */

type BuildKind =
  | "table"
  | "panel"
  | "shelf"
  | "trim"
  | "fixture"
  | "entertainment"
  | "lighting"
  | "railing";

const BUILD_TYPES: { id: BuildKind; label: string }[] = [
  { id: "table",         label: "Table" },
  { id: "panel",         label: "Wall Panel" },
  { id: "shelf",         label: "Floating Shelf" },
  { id: "trim",          label: "Interior Trim/Moulding" },
  { id: "fixture",       label: "Feature / Fixture" },
  { id: "entertainment", label: "Entertainment Center" },
  { id: "lighting",      label: "Energetic Lighting" },
  { id: "railing",       label: "Railing / Guard" },
];

// Base rates (raised one tier as requested)
const BASE_RATES = {
  table:         140,   // $/sqft top
  panel:         120,   // $/sqft face
  shelf:          95,   // $/LF per shelf (depth factor)
  trim:           55,   // $/LF (profile factor)
  fixture:       160,   // $/sqft envelope or per-piece fallback
  entertainment:  90,   // $/cubic ft carcass volume
  lighting:      180,   // $/sqft illuminated surface
  railing:       160,   // $/LF
} as const;

const COMPLEXITY = {
  resinRiver: 1.25,
  sacredGeom: 1.15,
  heavyMetal: 1.18,
  crystalFX:  1.12,
  lightingFX: 1.20,
};

// Shop minimums by type
const MINIMUMS = {
  table: 1800, panel: 900, shelf: 450, trim: 350, fixture: 1200,
  entertainment: 2800, lighting: 1100, railing: 1500
} as const;

const inchesToFeet = (n: number) => n / 12;
const n = (v: string | number) => (typeof v === "number" ? v : parseFloat(v || "0"));

/* ──────────────────────────────────────────────────────────────────────────────
   OPTIONS (expand anytime — these won’t break layout)
──────────────────────────────────────────────────────────────────────────────── */

const WOODS = [
  "Walnut","White Oak","Red Oak","Maple","Cherry","Ash","Hickory",
  "Sapele","Mahogany","Teak","Cedar","Pine (select tight-grain)"
] as const;

const WOOD_MULTIPLIERS: Record<(typeof WOODS)[number], number> = {
  Walnut: 1.25, "White Oak": 1.18, "Red Oak": 1.08, Maple: 1.12, Cherry: 1.12,
  Ash: 1.05, Hickory: 1.10, Sapele: 1.18, Mahogany: 1.22, Teak: 1.35,
  Cedar: 1.00, "Pine (select tight-grain)": 0.95,
};

const METALS = [
  "Copper Accents","Brass Accents","Bronze Accents","Stainless Hardware","Blackened Steel"
] as const;

const CRYSTAL_OPTIONS = [
  "Crystal Integration (discreet)","Crystal Integration (visible)"
] as const;

const RESIN_PATTERNS = [
  "None","Straight Pour","River","Galaxy/Tone-Programmed","Marble-Blend"
] as const;

const EDGE_STYLES = [
  "Live Edge","Straight","Chamfer","Roundover","Bevel"
] as const;

const FINISH_TIERS = [
  "Standard Shop Finish","Premium Hand-Rubbed","Ultra Protective"
] as const;

/* ──────────────────────────────────────────────────────────────────────────────
   COMPONENT
──────────────────────────────────────────────────────────────────────────────── */

export default function CustomBuilderPage() {
  const params = useSearchParams();

  // Build type
  const [buildType, setBuildType] = useState<BuildKind>("table");

  // Shared selections
  const [selectedWood, setSelectedWood] = useState<(typeof WOODS)[number]>("Walnut");
  const [edgeStyle, setEdgeStyle] = useState(EDGE_STYLES[0]);
  const [finishTier, setFinishTier] = useState(FINISH_TIERS[1]);

  const [resinPattern, setResinPattern] = useState(RESIN_PATTERNS[0]);
  const [useResinRiver, setUseResinRiver] = useState(false);

  const [hasSacredGeometry, setHasSacredGeometry] = useState(false);
  const [hasCrystalWork, setHasCrystalWork] = useState(false);
  const [hasHeavyMetal, setHasHeavyMetal] = useState(false);
  const [includeLightingFX, setIncludeLightingFX] = useState(false);

  // Dimensions (tables/panels/lighting/fixture by sqft)
  const [lengthIn, setLengthIn] = useState("72");
  const [widthIn, setWidthIn]   = useState("36");
  const [thicknessIn, setThicknessIn] = useState("1.5");

  // Shelves (LF)
  const [shelfLenIn, setShelfLenIn]   = useState("72");
  const [shelfDepthIn, setShelfDepthIn] = useState("12");
  const [shelfCount, setShelfCount]   = useState("2");

  // Trim (LF)
  const [lf, setLf] = useState("40");
  const [profile, setProfile] = useState<"simple"|"detailed"|"signature">("detailed");

  // Casework (cubic ft)
  const [caseWIn, setCaseWIn] = useState("84");
  const [caseHIn, setCaseHIn] = useState("32");
  const [caseDIn, setCaseDIn] = useState("20");

  // Legs note (for table/shelf/railing)
  const showsLegsNote = ["table","shelf","railing"].includes(buildType);

  // Deep-link support: /custom?type=panel
  useEffect(() => {
    const t = (params.get("type") || "").toLowerCase() as BuildKind;
    if (BUILD_TYPES.some(b => b.id === t)) setBuildType(t);
  }, [params]);

  const woodMult = WOOD_MULTIPLIERS[selectedWood] ?? 1.0;

  const estPrice = useMemo(() => {
    // areas & conversions
    const lengthFt = inchesToFeet(n(lengthIn));
    const widthFt  = inchesToFeet(n(widthIn));
    const areaSqFt = Math.max(0, lengthFt * widthFt);
    const tIn      = n(thicknessIn);

    const shelfLenFt   = inchesToFeet(n(shelfLenIn));
    const shelfDepthFt = inchesToFeet(n(shelfDepthIn));
    const shelves      = Math.max(1, Math.floor(n(shelfCount) || 1));

    const linearFeet = Math.max(0, n(lf));

    const caseWft = inchesToFeet(n(caseWIn));
    const caseHft = inchesToFeet(n(caseHIn));
    const caseDft = inchesToFeet(n(caseDIn));
    const cubicFt = Math.max(0, caseWft * caseHft * caseDft);

    let base = 0;
    switch (buildType) {
      case "table":
        base = areaSqFt * BASE_RATES.table;
        break;
      case "panel":
        base = areaSqFt * BASE_RATES.panel;
        break;
      case "lighting":
        base = areaSqFt * BASE_RATES.lighting;
        break;
      case "fixture":
        base = Math.max(1, areaSqFt) * BASE_RATES.fixture;
        break;
      case "shelf":
        base = shelfLenFt * BASE_RATES.shelf * shelves * Math.max(1, shelfDepthFt / 1.0);
        break;
      case "trim":
        {
          const pf = profile === "signature" ? 1.35 : profile === "detailed" ? 1.2 : 1.0;
          base = linearFeet * BASE_RATES.trim * pf;
        }
        break;
      case "entertainment":
        base = Math.max(10, cubicFt) * BASE_RATES.entertainment;
        break;
      case "railing":
        base = linearFeet * BASE_RATES.railing;
        break;
    }

    // wood species
    base *= woodMult;

    // features
    if (hasSacredGeometry) base *= COMPLEXITY.sacredGeom;
    if (useResinRiver || resinPattern === "River") base *= COMPLEXITY.resinRiver;
    if (hasCrystalWork)    base *= COMPLEXITY.crystalFX;
    if (hasHeavyMetal)     base *= COMPLEXITY.heavyMetal;
    if (buildType === "lighting" && includeLightingFX) base *= COMPLEXITY.lightingFX;

    // thickness premium for table/panel > 1.5"
    if (["table","panel"].includes(buildType) && tIn > 1.5) {
      base *= 1.08 + (Math.min(tIn, 3) - 1.5) * 0.04;
    }

    // finish tier
    if (finishTier === "Premium Hand-Rubbed") base *= 1.08;
    if (finishTier === "Ultra Protective")     base *= 1.15;

    // shop minimum
    const min = MINIMUMS[buildType];
    return Math.max(base, min);
  }, [
    buildType,lengthIn,widthIn,thicknessIn,
    shelfLenIn,shelfDepthIn,shelfCount,
    lf,profile,
    caseWIn,caseHIn,caseDIn,
    woodMult,resinPattern,useResinRiver,
    hasSacredGeometry,hasCrystalWork,hasHeavyMetal,
    includeLightingFX,finishTier
  ]);

  const formatted = (v: number) =>
    v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  // share/save helpers
  const copyShareLink = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("type", buildType);
      navigator.clipboard.writeText(url.toString());
      alert("Shareable link copied.");
    } catch { /* noop */ }
  };

  const saveQuote = () => {
    const payload = {
      buildType, selectedWood, edgeStyle, finishTier, resinPattern,
      useResinRiver, hasSacredGeometry, hasCrystalWork, hasHeavyMetal, includeLightingFX,
      dims: { lengthIn, widthIn, thicknessIn, shelfLenIn, shelfDepthIn, shelfCount, lf, profile, caseWIn, caseHIn, caseDIn },
      estimate: Math.round(estPrice),
      ts: Date.now(),
    };
    try {
      const key = `strion-quote-${payload.ts}`;
      localStorage.setItem(key, JSON.stringify(payload));
      alert("Configuration saved locally.");
    } catch { /* noop */ }
  };

  /* ────────────────────────────────────────────────────────────────────────── */

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Crumbs */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#E8C987]/80">
          <Link href="/" className="underline underline-offset-4 hover:text-[#E8C987]">Home</Link>
          <span>›</span>
          <span>Custom</span>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-[#E8C987]">
          Build Your Piece
        </h1>
        <p className="mt-2 text-sm text-neutral-300">
          Tables, panels, shelves, trim, fixtures, entertainment centers, lighting, railings — precision engineered with sacred geometry, premium woods, metals, and crystal integration. Ships nationwide.
        </p>

        {/* Build Type Selector */}
        <section className="mt-8">
          <label className="block text-sm font-semibold tracking-wide text-[#E8C987] mb-2">
            Build Type
          </label>
          <div className="flex flex-wrap gap-2">
            {BUILD_TYPES.map(bt => {
              const active = buildType === bt.id;
              return (
                <button
                  key={bt.id}
                  type="button"
                  onClick={() => setBuildType(bt.id)}
                  className={[
                    "px-3 py-2 rounded-md border transition",
                    active
                      ? "bg-[#E8C987] text-black border-[#E8C987]"
                      : "border-[#E8C987]/40 text-[#E8C987] hover:bg-[#E8C987]/10"
                  ].join(" ")}
                >
                  {bt.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* TWO-COLUMN LAYOUT */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Inputs */}
          <div className="lg:col-span-2 space-y-8">

            {/* Dimensions by Type */}
            <section>
              <h2 className="text-xl font-semibold text-[#E8C987]">Dimensions</h2>

              {["table","panel","lighting","fixture"].includes(buildType) && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Length (in)">
                    <Input value={lengthIn} onChange={setLengthIn} />
                  </Field>
                  <Field label="Width (in)">
                    <Input value={widthIn} onChange={setWidthIn} />
                  </Field>
                  <Field label="Thickness (in)">
                    <Input value={thicknessIn} onChange={setThicknessIn} />
                  </Field>
                </div>
              )}

              {buildType === "shelf" && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Shelf Length (in)">
                    <Input value={shelfLenIn} onChange={setShelfLenIn} />
                  </Field>
                  <Field label="Depth (in)">
                    <Input value={shelfDepthIn} onChange={setShelfDepthIn} />
                  </Field>
                  <Field label="# of Shelves">
                    <Input value={shelfCount} onChange={setShelfCount} />
                  </Field>
                </div>
              )}

              {buildType === "trim" && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Linear Feet">
                    <Input value={lf} onChange={setLf} />
                  </Field>
                  <Field label="Profile Complexity">
                    <Select value={profile} onChange={v => setProfile(v as typeof profile)} options={[
                      { value: "simple", label: "Simple" },
                      { value: "detailed", label: "Detailed" },
                      { value: "signature", label: "Signature (sacred geometry)" },
                    ]}/>
                  </Field>
                </div>
              )}

              {buildType === "entertainment" && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Width (in)">
                    <Input value={caseWIn} onChange={setCaseWIn} />
                  </Field>
                  <Field label="Height (in)">
                    <Input value={caseHIn} onChange={setCaseHIn} />
                  </Field>
                  <Field label="Depth (in)">
                    <Input value={caseDIn} onChange={setCaseDIn} />
                  </Field>
                </div>
              )}
            </section>

            {/* Materials */}
            <section>
              <h2 className="text-xl font-semibold text-[#E8C987]">Materials & Detailing</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Wood Species">
                  <Select value={selectedWood} onChange={v => setSelectedWood(v as (typeof WOODS)[number])}
                    options={WOODS.map(w => ({ value: w, label: w }))} />
                </Field>
                <Field label="Edge Style">
                  <Select value={edgeStyle} onChange={v => setEdgeStyle(v)} options={EDGE_STYLES.map(e => ({ value: e, label: e }))} />
                </Field>
                <Field label="Finish">
                  <Select value={finishTier} onChange={v => setFinishTier(v)} options={FINISH_TIERS.map(f => ({ value: f, label: f }))} />
                </Field>
              </div>

              {/* Resin / Sacred Geometry */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Resin Pattern">
                  <Select value={resinPattern} onChange={v => setResinPattern(v)} options={RESIN_PATTERNS.map(r => ({ value: r, label: r }))} />
                </Field>
                <Toggle label="River / Advanced Resin" checked={useResinRiver} onChange={setUseResinRiver} />
                <Toggle label="Sacred Geometry Detailing" checked={hasSacredGeometry} onChange={setHasSacredGeometry} />
              </div>

              {/* Metals / Crystals / Lighting */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Toggle label="Premium Metal Accents (copper / brass / bronze)" checked={hasHeavyMetal} onChange={setHasHeavyMetal} />
                <Toggle label="Crystal Integration (discreet/visible)" checked={hasCrystalWork} onChange={setHasCrystalWork} />
                {buildType === "lighting" && (
                  <Toggle label="Enhanced Lighting FX / Tuning" checked={includeLightingFX} onChange={setIncludeLightingFX} />
                )}
              </div>
            </section>

            {/* Notes */}
            {showsLegsNote && (
              <p className="text-xs text-neutral-400">
                *Legs and certain hardware are <span className="text-[#E8C987]">sold and arranged separately</span>. Availability changes frequently — we’ll confirm best match during consult.
              </p>
            )}
          </div>

          {/* RIGHT: Summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 rounded-xl border border-[#E8C987]/30 bg-black/40 p-5">
              <h3 className="text-lg font-semibold text-[#E8C987]">Estimate</h3>
              <div className="mt-3 text-4xl font-bold tracking-tight text-[#E8C987]">
                {formatted(estPrice)}
              </div>
              <p className="mt-2 text-xs text-neutral-400">
                Final quote may adjust with design drawings, shop scheduling, freight, and install variables. This tool gives you a transparent preview.
              </p>

              <div className="mt-4 h-px w-full bg-[#E8C987]/20" />

              <ul className="mt-4 space-y-1 text-sm text-neutral-300">
                <li>Type: <span className="text-[#E8C987]">{BUILD_TYPES.find(b => b.id === buildType)?.label}</span></li>
                <li>Wood: <span className="text-[#E8C987]">{selectedWood}</span></li>
                <li>Finish: <span className="text-[#E8C987]">{finishTier}</span></li>
                {["table","panel","lighting","fixture"].includes(buildType) && (
                  <li>Size: <span className="text-[#E8C987]">{lengthIn}" × {widthIn}" × {thicknessIn}"</span></li>
                )}
                {buildType === "shelf" && (
                  <li>Shelves: <span className="text-[#E8C987]">{shelfCount} @ {shelfLenIn}" × {shelfDepthIn}"</span></li>
                )}
                {buildType === "trim" && (
                  <li>Trim: <span className="text-[#E8C987]">{lf} LF • {profile}</span></li>
                )}
                {buildType === "entertainment" && (
                  <li>Casework: <span className="text-[#E8C987]">{caseWIn}" × {caseHIn}" × {caseDIn}"</span></li>
                )}
                {resinPattern !== "None" && <li>Resin: <span className="text-[#E8C987]">{resinPattern}</span></li>}
                {hasSacredGeometry && <li>Detailing: <span className="text-[#E8C987]">Sacred geometry</span></li>}
                {hasCrystalWork && <li>Integration: <span className="text-[#E8C987]">Crystal</span></li>}
                {hasHeavyMetal && <li>Accents: <span className="text-[#E8C987]">Premium metal</span></li>}
                {buildType === "lighting" && includeLightingFX && <li>Lighting FX: <span className="text-[#E8C987]">Enhanced</span></li>}
              </ul>

              <div className="mt-5 grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={saveQuote}
                  className="w-full rounded-lg bg-[#E8C987] px-4 py-3 text-black font-semibold hover:opacity-90 transition"
                >
                  Save Configuration
                </button>
                <button
                  type="button"
                  onClick={copyShareLink}
                  className="w-full rounded-lg border border-[#E8C987] px-4 py-3 text-[#E8C987] font-semibold hover:bg-[#E8C987]/10 transition"
                >
                  Copy Share Link
                </button>
                <Link
                  href="/about"
                  className="text-center w-full rounded-lg border border-[#E8C987]/40 px-4 py-3 text-[#E8C987] font-semibold hover:bg-[#E8C987]/5 transition"
                >
                  Learn Our Method
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* CTA Footer */}
        <div className="mt-12 rounded-xl border border-[#E8C987]/20 bg-black/40 p-5 text-sm text-neutral-300">
          <p>
            Ready to proceed? Submit this configuration with photos of your space and any inspiration. We’ll refine dimensions, provide drawings, and lock the quote with schedule & freight.
          </p>
        </div>
      </div>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   REUSABLE UI
──────────────────────────────────────────────────────────────────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm mb-1 text-neutral-300">{label}</span>
      {children}
    </label>
  );
}

function Input({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      inputMode="decimal"
      className="w-full bg-black/30 border border-[#E8C987]/30 rounded-md px-3 py-2 text-[#E8C987] placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E8C987]"
      placeholder="0"
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black/30 border border-[#E8C987]/30 rounded-md px-3 py-2 text-[#E8C987] focus:outline-none focus:ring-1 focus:ring-[#E8C987]"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={[
        "w-full text-left rounded-md border px-3 py-2 transition",
        checked
          ? "bg-[#E8C987] text-black border-[#E8C987]"
          : "bg-black/30 border-[#E8C987]/30 text-[#E8C987] hover:bg-[#E8C987]/10",
      ].join(" ")}
    >
      <span className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
        style={{ background: checked ? "#000" : "#E8C987" }} />
      {label}
    </button>
  );
}
