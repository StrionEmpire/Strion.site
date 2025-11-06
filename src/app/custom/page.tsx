// src/app/custom/page.tsx
"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getCategory,
  getOptionsFor,
  CATEGORIES,
  CATEGORY_OPTIONS,
  WOODS,
  METALS,
  RESIN_PATTERNS,
  EDGE_STYLES,
  FINISHES,
  CRYSTAL_MODES
} from "../../lib/catalog";

// ---------- tiny field components ----------
function Label({children}:{children:any}){ return <div style={{fontSize:12,opacity:0.8,marginBottom:6}}>{children}</div>; }
function Select({value,onChange,options}:{value:string;onChange:(v:string)=>void;options:string[]}) {
  return (
    <select
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      style={{
        width:"100%", background:"rgba(0,0,0,0.55)", color:"#E8C987",
        border:"1px solid rgba(232,201,135,0.25)", borderRadius:10,
        padding:"10px 12px"
      }}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
function Input({value,onChange,placeholder}:{value:string;onChange:(v:string)=>void;placeholder:string}) {
  return (
    <input
      value={value} placeholder={placeholder}
      onChange={(e)=>onChange(e.target.value)}
      style={{
        width:"100%", background:"rgba(0,0,0,0.55)", color:"#E8C987",
        border:"1px solid rgba(232,201,135,0.25)", borderRadius:10,
        padding:"10px 12px"
      }}
    />
  );
}
function Field({label,children}:{label:string;children:any}) {
  return (
    <div style={{display:"grid", gap:6}}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
function Section({title,children}:{title:string;children:any}) {
  return (
    <div style={{border:"1px solid rgba(232,201,135,0.18)", borderRadius:14, padding:16}}>
      <div style={{fontWeight:800, color:"#E8C987", marginBottom:10}}>{title}</div>
      {children}
    </div>
  );
}

// ---------- quick pricing model (coherent, not minimalist) ----------
const BASE_BY_CATEGORY: Record<string, number> = {
  "tables": 1800, "conference-tables": 4200, "wall-panels": 900,
  "floating-shelves": 350, "cabinetry": 2200, "interior-trim": 12, // per lf hint
  "lighting": 800, "benches": 750, "tops": 950, "doors": 1200,
  "stairs": 2800, "beds": 1800, "media": 1400, "reception-desks": 3600
};

const METAL_MULTIPLIER: Record<string, number> = {
  "None": 1,
  "Gold (24K Leaf Accents)": 1.6,
  "Gold (18K Leaf Accents)": 1.45,
  "Gold (Foil/Flake Inlay)": 1.35,
  "Gold (Edge Band)": 1.30,
  "Copper (Solid Bar Inlay)": 1.25,
  "Copper (Rod / Piping Edge)": 1.2,
  "Copper (Hammered Accents)": 1.22,
  "Copper (Patina Verde)": 1.28,
  "Brass (Solid Inlay)": 1.22,
  "Brass (Edge Band)": 1.18,
  "Bronze (Patinated Accents)": 1.2,
  "Stainless Steel (Brushed)": 1.15,
  "Stainless Steel (Mirror)": 1.2,
  "Aluminum (Brushed)": 1.1,
};
const RESIN_UPCHARGE: Record<string, number> = {
  "None": 0, "River": 550, "Marble Swirl": 380, "Vein Inlay": 320, "Window Inlay": 440
};
const EDGE_UPCHARGE: Record<string, number> = {
  "Standard": 0, "Live Edge": 300, "Chamfer": 80, "Roundover": 80, "Bevel": 120
};
const FINISH_UPCHARGE: Record<string, number> = {
  "Natural Oil": 0, "Hardwax Oil (Matte)": 120, "Satin Poly": 140, "High-Gloss Poly": 220, "Two-Part Urethane": 340
};
const CRYSTAL_UPCHARGE: Record<string, number> = {
  "None": 0, "Embedded Nodes": 260, "Removable Nodes": 220, "Under-surface Array": 320
};

function toNum(v:string){ const n = parseFloat(v); return Number.isFinite(n) ? n : 0; }

// ---------- visual preview (cleaner; reacts to options) ----------
function Preview({
  slug, wood, metal, resin, edge
}:{slug:string; wood:string; metal:string; resin:string; edge:string}){
  const colors = useMemo(()=>{
    const dark = ["Walnut","Wenge","Bubinga","Zebrawood","Rosewood (where legal/compliant)"].includes(wood);
    const woodFill = dark ? "#3a2b23" : ["Cherry","Teak","African Mahogany","Sapele","Iroko","Padauk","Purpleheart"].includes(wood) ? "#7a5132" : "#caa76f";
    const metalFill =
      metal.startsWith("Gold") ? "#d7b24a" :
      metal.startsWith("Copper") ? "#b87333" :
      metal.startsWith("Brass") ? "#b5a642" :
      metal.startsWith("Bronze") ? "#8c7853" :
      metal.includes("Mirror") ? "#efefef" :
      metal.includes("Stainless") ? "#c9c9c9" :
      metal.includes("Aluminum") ? "#bfbfbf" : "transparent";
    return { woodFill, metalFill };
  },[wood, metal]);

  const isTable = slug==="tables" || slug==="conference-tables" || slug==="tops";
  const isPanel = slug==="wall-panels";
  const isShelves = slug==="floating-shelves";
  const isLighting = slug==="lighting";

  return (
    <div style={{
      background:"linear-gradient(180deg, #121212, #000)",
      border:"1px solid rgba(232,201,135,0.2)", borderRadius:14,
      display:"grid", placeItems:"center", minHeight:260, position:"relative"
    }}>
      <svg width="100%" height="240" viewBox="0 0 800 240" preserveAspectRatio="xMidYMid meet">
        {/* Base piece */}
        <rect x="80" y="80" width="640" height="80" rx={edge==="Roundover" ? 16 : edge==="Bevel" ? 2 : edge==="Chamfer" ? 4 : edge==="Live Edge" ? 20 : 6}
              fill={colors.woodFill} stroke="#000" opacity={0.95}/>
        {/* Resin window/river */}
        {resin==="River" && <rect x="360" y="80" width="80" height="80" fill="#2a3f47" opacity={0.9}/>}
        {resin==="Marble Swirl" && <rect x="120" y="80" width="560" height="80" fill="#cfd3d6" opacity={0.18}/>}
        {resin==="Vein Inlay" && <rect x="350" y="80" width="6" height="80" fill="#cfd3d6" opacity={0.35}/>}
        {resin==="Window Inlay" && <rect x="140" y="95" width="520" height="50" fill="#28434c" opacity={0.22}/>}
        {/* Metal band hint */}
        {metal!=="None" && <rect x="80" y="160" width="640" height="8" fill={colors.metalFill} opacity={0.9}/>}
        {/* Category silhouette tweaks */}
        {isShelves && <rect x="120" y="60" width="560" height="14" fill={colors.metalFill==="transparent"?"#333":colors.metalFill} opacity={0.5}/>}
        {isPanel && <rect x="120" y="60" width="560" height="12" fill="#000" opacity={0.35}/>}
        {isLighting && (
          <>
            <circle cx="220" cy="120" r="8" fill="#e8c987" opacity={0.8}/>
            <circle cx="400" cy="120" r="8" fill="#e8c987" opacity={0.8}/>
            <circle cx="580" cy="120" r="8" fill="#e8c987" opacity={0.8}/>
          </>
        )}
      </svg>
      <div style={{position:"absolute", bottom:10, right:14, fontSize:12, opacity:0.7, color:"#cfcfcf"}}>
        Preview is illustrative — final designs are photoreal at proposal stage.
      </div>
    </div>
  );
}

// ---------- main (with Suspense wrapper for search params) ----------
function CustomInner(){
  const search = useSearchParams();
  const slug = (search.get("category") || "tables").toString();
  const cat = getCategory(slug);
  const map = CATEGORY_OPTIONS[slug] ?? {};

  // State tied to current category’s option pools (fallbacks provided)
  const [wood, setWood] = useState((map.woods ?? WOODS)[0]);
  const [metal, setMetal] = useState((map.metals ?? METALS)[0]);
  const [resin, setResin] = useState((map.resin ?? RESIN_PATTERNS)[0]);
  const [edge, setEdge] = useState((map.edge ?? EDGE_STYLES)[0]);
  const [finish, setFinish] = useState((map.finishes ?? FINISHES)[0]);
  const [crystal, setCrystal] = useState((map.crystals ?? CRYSTAL_MODES)[0]);

  // Size fields (string inputs; convert safely for math)
  const [length, setLength] = useState("72");   // in
  const [width, setWidth]   = useState("36");   // in
  const [thick, setThick]   = useState("1.5");  // in

  const price = useMemo(()=>{
    const base = BASE_BY_CATEGORY[slug] ?? 900;
    let p = base;
    p += RESIN_UPCHARGE[resin] ?? 0;
    p += EDGE_UPCHARGE[edge] ?? 0;
    p += FINISH_UPCHARGE[finish] ?? 0;
    p += CRYSTAL_UPCHARGE[crystal] ?? 0;
    p *= METAL_MULTIPLIER[metal] ?? 1;

    // Rough size impact (only for table/tops/panels/shelves)
    const L = toNum(length), W = toNum(width), T = toNum(thick);
    const area = Math.max(1, (L*W)/144); // sq ft
    if (["tables","conference-tables","tops"].includes(slug)) {
      p += Math.max(0, (area - 12)) * 85; // beyond 12 sqft
      p += Math.max(0, (T - 1)) * 180;    // thickness prem.
    }
    if (slug==="wall-panels") p += Math.max(0, (area - 8)) * 60;
    if (slug==="floating-shelves") p += Math.max(0, (L - 36)/6) * 25;

    return Math.round(p);
  },[slug, resin, edge, finish, crystal, metal, length, width, thick]);

  return (
    <main style={{minHeight:"100dvh", background:"#000", color:"#eee"}}>
      <div style={{maxWidth:1180, margin:"0 auto", padding:"24px"}}>
        <h1 style={{fontSize:28, fontWeight:800, color:"#E8C987"}}>
          {cat?.title ?? "Custom Build"}
        </h1>
        <p style={{opacity:0.8, marginTop:6}}>
          Configure materials and details. This is a live estimate; your formal proposal includes photoreal renders and engineered drawings.
        </p>

        <div style={{display:"grid", gridTemplateColumns:"1.05fr 0.95fr", gap:20, marginTop:20}}>
          {/* Left: visual + headline price */}
          <div style={{display:"grid", gap:16}}>
            <Preview slug={slug} wood={wood} metal={metal} resin={resin} edge={edge} />
            <div style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              border:"1px solid rgba(232,201,135,0.2)", borderRadius:14, padding:"14px 16px"
            }}>
              <div>
                <div style={{fontSize:12, opacity:0.8}}>Live Estimate</div>
                <div style={{fontSize:28, fontWeight:800, color:"#E8C987"}}>${price.toLocaleString()}</div>
              </div>
              <a href={`/inquire?category=${slug}`}
                 style={{padding:"10px 14px", borderRadius:10, border:"1px solid #E8C987", color:"#E8C987"}}>
                Start Commission
              </a>
            </div>
          </div>

          {/* Right: options */}
          <div style={{display:"grid", gap:14}}>
            <Section title="Core Materials">
              <div style={{display:"grid", gap:12}}>
                <Field label="Wood Species">
                  <Select value={wood} onChange={setWood} options={map.woods ?? WOODS}/>
                </Field>
                <Field label="Metal Treatment">
                  <Select value={metal} onChange={setMetal} options={map.metals ?? METALS}/>
                </Field>
                {"resin" in map || ["tables","conference-tables","tops","wall-panels","reception-desks"].includes(slug) ? (
                  <Field label="Resin Pattern">
                    <Select value={resin} onChange={setResin} options={map.resin ?? RESIN_PATTERNS}/>
                  </Field>
                ) : null}
                {"edges" in map || ["tables","conference-tables","tops","benches","doors"].includes(slug) ? (
                  <Field label="Edge Profile">
                    <Select value={edge} onChange={setEdge} options={map.edges ?? EDGE_STYLES}/>
                  </Field>
                ) : null}
                <Field label="Finish">
                  <Select value={finish} onChange={setFinish} options={map.finishes ?? FINISHES}/>
                </Field>
                {"crystals" in map || slug==="lighting" ? (
                  <Field label="Crystal Integration">
                    <Select value={crystal} onChange={setCrystal} options={map.crystals ?? CRYSTAL_MODES}/>
                  </Field>
                ) : null}
              </div>
            </Section>

            <Section title="Dimensions">
              <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10}}>
                <div>
                  <Label>Length (in)</Label>
                  <Input value={length} onChange={setLength} placeholder="e.g. 72" />
                </div>
                <div>
                  <Label>Width (in)</Label>
                  <Input value={width} onChange={setWidth} placeholder="e.g. 36" />
                </div>
                <div>
                  <Label>Thickness (in)</Label>
                  <Input value={thick} onChange={setThick} placeholder="e.g. 1.5" />
                </div>
              </div>
              {CATEGORY_OPTIONS[slug]?.sizeHints && (
                <div style={{fontSize:12, opacity:0.7, marginTop:8}}>
                  Hint: {CATEGORY_OPTIONS[slug]?.sizeHints}
                </div>
              )}
            </Section>

            <Section title="Notes for the Workshop">
              <textarea
                placeholder="Describe patterns, joinery preferences, lighting intent, spiritual function, room context, etc."
                style={{
                  width:"100%", minHeight:100, background:"rgba(0,0,0,0.55)", color:"#E8C987",
                  border:"1px solid rgba(232,201,135,0.25)", borderRadius:10, padding:"10px 12px"
                }}
              />
            </Section>

            <div style={{display:"grid", gap:10}}>
              <a href={`/inquire?category=${slug}`}
                 style={{display:"inline-block", textAlign:"center", padding:"12px 16px", borderRadius:12,
                         background:"#E8C987", color:"#000", fontWeight:800}}>
                Continue → Submit for Design & Photoreal Renders
              </a>
              <div style={{fontSize:12, opacity:0.65}}>
                Next step includes a paid design session (applied to build) and photoreal visuals tailored to your space.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CustomPage(){
  // Suspense wrapper satisfies Next warning for client search param hooks
  return (
    <Suspense fallback={<div style={{padding:24}}>Loading configurator…</div>}>
      <CustomInner />
    </Suspense>
  );
}
