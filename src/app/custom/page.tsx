"use client";
/* @ts-nocheck */

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

/* ------------------------------
   Shared list with /categories
--------------------------------*/
const BUILD_TYPES = [
  "Dining Tables","Coffee Tables","Side / End Tables","Console Tables",
  "Conference Tables","Desks & Consoles","Live-Edge Slab","Epoxy River",
  "Wall Panels","Wall Lights","Rails & Shelves","Benches & Altars",
  "Mirrors & Frames","Trays & Accessories","Cabinetry",
  "Interior Trim / Moulding","Counters & Bar Tops","Seating","Outdoor",
];

const TYPE_PROFILE: Record<string, any> = {
  "Dining Tables": { showDimensions:true, showTableSpecific:true, showEdgeStyles:true, showResinOptions:true },
  "Coffee Tables": { showDimensions:true, showTableSpecific:true, showEdgeStyles:true, showResinOptions:true },
  "Side / End Tables": { showDimensions:true, showTableSpecific:true, showEdgeStyles:true, showResinOptions:false },
  "Console Tables": { showDimensions:true, showTableSpecific:true, showEdgeStyles:true, showResinOptions:false },
  "Conference Tables": { showDimensions:true, showTableSpecific:true, showEdgeStyles:true, showResinOptions:true },
  "Desks & Consoles": { showDimensions:true, showTableSpecific:true, showEdgeStyles:true, showResinOptions:false },
  "Live-Edge Slab": { showDimensions:true, showTableSpecific:true, showEdgeStyles:true, showResinOptions:false },
  "Epoxy River": { showDimensions:true, showTableSpecific:true, showEdgeStyles:true, showResinOptions:true },
  "Wall Panels": { showDimensions:true, showPanelGeometry:true },
  "Wall Lights": { showDimensions:false, showLighting:true, showPanelGeometry:true },
  "Rails & Shelves": { showDimensions:true, showEdgeStyles:false },
  "Benches & Altars": { showDimensions:true, showTableSpecific:false, showEdgeStyles:true },
  "Mirrors & Frames": { showDimensions:false, showPanelGeometry:true, showEdgeStyles:true },
  "Trays & Accessories": { showDimensions:false, showTableSpecific:false, showResinOptions:true, showEdgeStyles:true },
  "Cabinetry": { showDimensions:true, showCabinetry:true },
  "Interior Trim / Moulding": { showDimensions:false, showEdgeStyles:true },
  "Counters & Bar Tops": { showDimensions:true, showTableSpecific:false, showResinOptions:true, showEdgeStyles:true },
  "Seating": { showDimensions:true, showEdgeStyles:true },
  "Outdoor": { showDimensions:true, showEdgeStyles:true, showResinOptions:false },
};

/* ------------------------------
   Option sets
--------------------------------*/
const WOODS = [
  "White Oak","Red Oak","Maple","Walnut","Cherry","Ash","Pine",
  "African Mahogany","Sapele","Wenge","Padauk","Zebrawood",
  "Purpleheart","Bubinga","Teak","Iroko","Rosewood (where legal/compliant)"
];

const METALS = [
  "Gold (24K Leaf Accents)","Gold (18K Leaf Accents)","Gold (Flake/Veil Inlay)",
  "Copper (Solid Bar Inlay)","Copper (Rod Edge Band)","Copper (Hammered Accents)",
  "Brass (Polished)","Brass (Satin)","Bronze (Oil-Rubbed)","Stainless (Brushed)","Aluminum (Brushed)",
  "None"
];

const EDGE_STYLES = ["Square","Chamfer","Roundover","Live Edge"];
const RESIN_PATTERNS = ["None","River","Vein / Marble","Cells / Lacing"];
const FINISHES = ["Natural Oil","Hardwax Oil (Matte)","Satin Poly","High-Gloss"];
const GEOMETRIES = ["None","Seed of Life","Sri Yantra","Metatron Grid","Hex Weave","Diamond Quads"];
const LIGHTING = ["None","Backlit Panel","Resonance Sconce","Edge Glow","Undershelf Glow"];
const CABINET_FRONTS = ["Shaker","Slab","Inset Frame","Fluted","Slatted"];
const HARDWARE = ["Minimal (Hidden)","Black Matte","Brass","Bronze","Stainless"];

/* ------------------------------
   Pricing
--------------------------------*/
const BASE_BY_TYPE: Record<string, number> = {
  "Dining Tables":2400,"Coffee Tables":900,"Side / End Tables":450,"Console Tables":1100,
  "Conference Tables":5200,"Desks & Consoles":1600,"Live-Edge Slab":1900,"Epoxy River":2600,
  "Wall Panels":1400,"Wall Lights":750,"Rails & Shelves":350,"Benches & Altars":900,
  "Mirrors & Frames":380,"Trays & Accessories":180,"Cabinetry":4200,
  "Interior Trim / Moulding":18,"Counters & Bar Tops":2200,"Seating":680,"Outdoor":1200
};

const WOOD_MULTIPLIER: Record<string, number> = {
  "Pine":0.8,"Ash":1.0,"Red Oak":1.0,"Maple":1.05,"White Oak":1.2,"Cherry":1.15,"Walnut":1.35,
  "African Mahogany":1.25,"Sapele":1.25,"Wenge":1.7,"Padauk":1.6,"Zebrawood":1.7,
  "Purpleheart":1.5,"Bubinga":1.8,"Teak":1.9,"Iroko":1.4,"Rosewood (where legal/compliant)":2.2
};

const METAL_ADD: Record<string, number> = {
  "None":0,"Gold (24K Leaf Accents)":950,"Gold (18K Leaf Accents)":650,"Gold (Flake/Veil Inlay)":480,
  "Copper (Solid Bar Inlay)":420,"Copper (Rod Edge Band)":360,"Copper (Hammered Accents)":280,
  "Brass (Polished)":260,"Brass (Satin)":240,"Bronze (Oil-Rubbed)":250,"Stainless (Brushed)":220,"Aluminum (Brushed)":180,
};

const COMPLEXITY = { sacred:1.12, resinRiver:1.18, resinVein:1.10, liveEdge:1.06, lighting:1.14, cabinet:1.18 };

function toNum(v:string){ const n=parseFloat(v); return Number.isFinite(n)?n:0; }

function priceEstimate(opts:any){
  const { itemType, width, length, thickness, wood, metal, geometry, resinPattern, includeLighting, cabinetryScopeLF } = opts;
  let base = BASE_BY_TYPE[itemType] ?? 1200;

  const sqft = (toNum(width)*toNum(length))/144;
  if (["Dining Tables","Coffee Tables","Console Tables","Conference Tables","Desks & Consoles","Live-Edge Slab","Epoxy River","Counters & Bar Tops","Wall Panels"].includes(itemType)) {
    base *= Math.max(1, sqft*0.85);
  }
  if (itemType==="Interior Trim / Moulding") base = (BASE_BY_TYPE[itemType] ?? 18) * Math.max(20, cabinetryScopeLF || 20);

  base *= WOOD_MULTIPLIER[wood] ?? 1.0;
  base += METAL_ADD[metal] ?? 0;

  if (geometry!=="None") base *= COMPLEXITY.sacred;
  if (resinPattern==="River") base *= COMPLEXITY.resinRiver;
  if (resinPattern==="Vein / Marble" || resinPattern==="Cells / Lacing") base *= COMPLEXITY.resinVein;
  if (includeLighting && ["Wall Lights","Wall Panels","Rails & Shelves","Counters & Bar Tops"].includes(itemType)) base *= COMPLEXITY.lighting;
  if (itemType==="Cabinetry") base *= COMPLEXITY.cabinet;
  if (thickness && toNum(thickness)>=2) base *= 1.08;

  return Math.round(base/25)*25;
}

/* ------------------------------
   SVG Preview
--------------------------------*/
function PreviewSVG({ itemType, width, length, wood, metal, resinPattern, edgeStyle }: any){
  const W=620,H=360;

  const woodTone = useMemo(()=>{
    const dark=["Walnut","Wenge","Bubinga","Rosewood (where legal/compliant)"];
    const med=["Cherry","Teak","African Mahogany","Sapele","Iroko","Padauk","Zebrawood","Purpleheart"];
    const light=["Maple","Pine","Ash","White Oak","Red Oak"];
    if (dark.includes(wood)) return ["#3a2b23","#251a14"];
    if (med.includes(wood)) return ["#7a5132","#4b2f1c"];
    return ["#caa76f","#9a7a4e"];
  },[wood]);

  const metalColor = useMemo(()=>{
    if (metal.startsWith("Gold")) return ["#E9C65B","#8C6B20"];
    if (metal.startsWith("Copper")) return ["#C8753C","#7A3B1E"];
    if (metal.startsWith("Brass")) return ["#D9B24C","#876F25"];
    if (metal.startsWith("Bronze")) return ["#8A5E3B","#4A311E"];
    if (metal.startsWith("Stainless")) return ["#BFC6CF","#6E7681"];
    if (metal.startsWith("Aluminum")) return ["#D5DBE3","#8A96A3"];
    return null;
  },[metal]);

  const showRiver = resinPattern==="River";
  const isTableLike = ["Dining Tables","Coffee Tables","Console Tables","Conference Tables","Desks & Consoles","Live-Edge Slab","Epoxy River","Counters & Bar Tops"].includes(itemType);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{borderRadius:12, background:"radial-gradient(1200px 600px at 50% 0%, #201a14, #0c0b09)"}}>
      <defs>
        <linearGradient id="woodG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={woodTone[0]}/>
          <stop offset="100%" stopColor={woodTone[1]}/>
        </linearGradient>
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="4" result="n"/>
          <feColorMatrix type="saturate" values="0.2"/>
          <feBlend in="SourceGraphic" in2="n" mode="overlay"/>
        </filter>
        <linearGradient id="metalG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={metalColor?.[0] || "#888"}/>
          <stop offset="50%" stopColor={metalColor?.[1] || "#555"}/>
          <stop offset="100%" stopColor={metalColor?.[0] || "#888"}/>
        </linearGradient>
        <filter id="softShadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.4"/>
        </filter>
      </defs>

      <text x={24} y={34} fill="#E8C987" fontWeight={700} fontSize="18">{itemType}</text>

      <g filter="url(#softShadow)">
        <rect x="40" y="64" width={W-80} height={H-120} rx={isTableLike?14:10} fill="url(#woodG)" filter="url(#grain)"/>
        {edgeStyle==="Live Edge" && (
          <>
            <path d={`M40,64 C120,72 90,110 40,140 L40,64 Z`} fill="#2b2119" opacity="0.25"/>
            <path d={`M${W-40},${H-56} C${W-120},${H-72} ${W-100},${H-120} ${W-40},${H-160} L${W-40},${H-56} Z`} fill="#2b2119" opacity="0.3"/>
          </>
        )}
        {showRiver && (
          <path
            d={`M ${W/2-40} 64 C ${W/2-80} ${H/2-40}, ${W/2+80} ${H/2+40}, ${W/2+30} ${H-56}
                L ${W/2+70} ${H-56} C ${W/2+10} ${H/2+30}, ${W/2-50} ${H/2-30}, ${W/2} 64 Z`}
            fill="rgba(70,150,190,0.45)"/>
        )}
        {!!metalColor && (
          <rect x="40" y={H-120-10} width={W-80} height={8} rx={4} fill="url(#metalG)" opacity="0.9"/>
        )}
      </g>

      <rect x="0" y={H-48} width={W} height="48" fill="rgba(10,10,10,0.55)"/>
      <text x="24" y={H-22} fill="#cfcfcf" fontSize="13">
        {wood}{metal!=="None" ? ` • ${metal}` : ""}{resinPattern!=="None" ? ` • ${resinPattern}` : ""}{edgeStyle ? ` • ${edgeStyle}` : ""}
      </text>
    </svg>
  );
}

/* ------------------------------
   Simple field components
--------------------------------*/
function Label({children}:{children:any}){ return <div style={{fontSize:12,letterSpacing:0.4,opacity:0.8,marginBottom:6}}>{children}</div>; }
function Select({value,onChange,options}:{value:string;onChange:(v:string)=>void;options:string[]}) {
  return (
    <select value={value} onChange={(e)=>onChange(e.target.value)}
      style={{width:"100%",background:"rgba(0,0,0,0.35)",border:"1px solid rgba(255,255,255,0.12)",color:"#eee",padding:"10px 12px",borderRadius:10}}>
      {options.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  );
}
function Input({value,onChange,placeholder}:{value:string;onChange:(v:string)=>void;placeholder:string}) {
  return (
    <input value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder}
      style={{width:"100%",background:"rgba(0,0,0,0.35)",border:"1px solid rgba(255,255,255,0.12)",color:"#eee",padding:"10px 12px",borderRadius:10}}/>
  );
}
function Toggle({checked,onChange,label}:{checked:boolean;onChange:(b:boolean)=>void;label:string}) {
  return (
    <label style={{display:"flex",gap:10,alignItems:"center"}}>
      <input type="checkbox" checked={checked} onChange={(e)=>onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

/* ------------------------------
   Inner client component that uses useSearchParams
--------------------------------*/
function ConfiguratorInner(){
  const sp = useSearchParams();
  const fromQuery = sp.get("itemType") || "";
  const initial = BUILD_TYPES.includes(fromQuery) ? fromQuery : "Dining Tables";

  const [itemType, setItemType] = useState(initial);
  const [width, setWidth] = useState("36");
  const [length, setLength] = useState("72");
  const [thickness, setThickness] = useState("1.75");
  const [wood, setWood] = useState("Walnut");
  const [metal, setMetal] = useState("None");
  const [finish, setFinish] = useState("Hardwax Oil (Matte)");
  const [geometry, setGeometry] = useState("None");
  const [edgeStyle, setEdgeStyle] = useState("Square");
  const [resinPattern, setResinPattern] = useState("None");
  const [includeLighting, setIncludeLighting] = useState(false);
  const [cabinetFront, setCabinetFront] = useState("Shaker");
  const [hardware, setHardware] = useState("Black Matte");
  const [cabinetLF, setCabinetLF] = useState("24");

  useEffect(()=>{ if (fromQuery && BUILD_TYPES.includes(fromQuery)) setItemType(fromQuery); },[fromQuery]);
  const profile = TYPE_PROFILE[itemType] || {};

  const est = useMemo(()=>priceEstimate({
    itemType, width, length, thickness, wood, metal, geometry, resinPattern,
    includeLighting, cabinetryScopeLF: toNum(cabinetLF)
  }), [itemType,width,length,thickness,wood,metal,geometry,resinPattern,includeLighting,cabinetLF]);

  return (
    <main style={{maxWidth:1180, margin:"0 auto", padding:24}}>
      <h1 style={{fontSize:32,fontWeight:800,color:"#E8C987"}}>Configure Your {itemType}</h1>
      <p style={{color:"#cfcfcf",marginTop:6}}>Choose materials, geometry, finishes, and optional metal/crystal accents. Your selections update the estimate and visual preview.</p>

      <section style={{display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:24,marginTop:18}}>
        <div style={{border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,padding:16,background:"linear-gradient(180deg, rgba(232,201,135,0.06), rgba(0,0,0,0.25))"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <div style={{gridColumn:"1 / -1"}}>
              <Label>Build Type</Label>
              <Select value={itemType} onChange={(v)=>setItemType(v)} options={BUILD_TYPES}/>
            </div>

            {profile.showDimensions && (
              <>
                <div><Label>Width (in)</Label><Input value={width} onChange={setWidth} placeholder="e.g., 36"/></div>
                <div><Label>Length (in)</Label><Input value={length} onChange={setLength} placeholder="e.g., 72"/></div>
                <div><Label>Thickness (in)</Label><Input value={thickness} onChange={setThickness} placeholder="e.g., 1.75"/></div>
              </>
            )}

            <div><Label>Wood Species</Label><Select value={wood} onChange={setWood} options={WOODS}/></div>
            <div><Label>Finish</Label><Select value={finish} onChange={setFinish} options={FINISHES}/></div>

            <div style={{gridColumn:"1 / -1"}}><Label>Metal Accents / Inlay</Label><Select value={metal} onChange={setMetal} options={METALS}/></div>

            {profile.showEdgeStyles && (<div><Label>Edge Style</Label><Select value={edgeStyle} onChange={setEdgeStyle} options={EDGE_STYLES}/></div>)}
            {profile.showResinOptions && (<div><Label>Resin & Epoxy Pattern</Label><Select value={resinPattern} onChange={setResinPattern} options={RESIN_PATTERNS}/></div>)}

            {(profile.showPanelGeometry || profile.showTableSpecific) && (
              <div style={{gridColumn:"1 / -1"}}><Label>Sacred Geometry (engrave/inlay)</Label><Select value={geometry} onChange={setGeometry} options={GEOMETRIES}/></div>
            )}

            {profile.showLighting && (
              <div style={{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:14,marginTop:6}}>
                <Toggle checked={includeLighting} onChange={setIncludeLighting} label="Include lighting effects (backlit / edge glow)"/>
                <span style={{opacity:0.5,fontSize:12}}>Great for resonance lighting and wall features.</span>
              </div>
            )}

            {profile.showCabinetry && (
              <>
                <div><Label>Cabinet Front</Label><Select value={cabinetFront} onChange={setCabinetFront} options={CABINET_FRONTS}/></div>
                <div><Label>Hardware</Label><Select value={hardware} onChange={setHardware} options={HARDWARE}/></div>
                <div><Label>Estimated Linear Feet</Label><Input value={cabinetLF} onChange={setCabinetLF} placeholder="e.g., 24"/></div>
              </>
            )}
          </div>

          <div style={{marginTop:18,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:12,opacity:0.6}}>Estimated from</div>
              <div style={{fontSize:28,fontWeight:800,color:"#E8C987"}}>${est.toLocaleString()}</div>
            </div>
            <a
              href={`/contact?intent=quote&itemType=${encodeURIComponent(itemType)}&w=${width}&l=${length}&t=${thickness}&wood=${encodeURIComponent(wood)}&metal=${encodeURIComponent(metal)}&finish=${encodeURIComponent(finish)}&geom=${encodeURIComponent(geometry)}&resin=${encodeURIComponent(resinPattern)}&lighting=${includeLighting}`}
              style={{padding:"12px 16px",borderRadius:10,background:"#E8C987",color:"#000",fontWeight:700}}
            >
              Start Your Quote →
            </a>
          </div>
          <div style={{fontSize:12,opacity:0.6,marginTop:8}}>
            Prices adjust for rare stock, joinery complexity, finishing systems, and delivery scope.
          </div>
        </div>

        <div style={{border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,padding:12}}>
          <div style={{height:360}}>
            <PreviewSVG
              itemType={itemType}
              width={width}
              length={length}
              wood={wood}
              metal={metal}
              resinPattern={resinPattern}
              edgeStyle={edgeStyle}
            />
          </div>
          <div style={{display:"flex",gap:10,marginTop:12,flexWrap:"wrap"}}>
            <a href="/work" className="px-4 py-2 rounded-lg" style={{border:"1px solid rgba(255,255,255,0.2)"}}>View Recent Builds</a>
            <a href="/categories" className="px-4 py-2 rounded-lg" style={{border:"1px solid rgba(255,255,255,0.2)"}}>Browse Categories</a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------
   Exported page with Suspense wrapper
--------------------------------*/
export default function CustomConfiguratorPage(){
  return (
    <Suspense fallback={<main style={{maxWidth:1180,margin:"0 auto",padding:24,color:"#cfcfcf"}}>Loading…</main>}>
      <ConfiguratorInner />
    </Suspense>
  );
}
