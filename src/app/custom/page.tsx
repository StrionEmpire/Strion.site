"use client";
/* @ts-nocheck */

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, CATEGORY_OPTIONS } from "../../lib/catalog";

/* ---------- tiny field components ---------- */
function Label({children}:{children:any}){ return <div style={{fontSize:12,opacity:0.8,marginBottom:6}}>{children}</div>; }
function Select({value,onChange,options}:{value:string;onChange:(v:string)=>void;options:string[]}) {
  return (
    <select value={value} onChange={(e)=>onChange(e.target.value)}
      style={{width:"100%",background:"rgba(0,0,0,0.35)",border:"1px solid rgba(255,255,255,0.12)",color:"#eee",padding:"10px 12px",borderRadius:10}}>
      {options.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  );
}
function Input({value,onChange,placeholder,type="text"}:{value:string|number;onChange:(v:any)=>void;placeholder:string;type?:string}) {
  return (
    <input value={value} type={type} onChange={(e)=>onChange(e.target.value)}
      placeholder={placeholder}
      style={{width:"100%",background:"rgba(0,0,0,0.35)",border:"1px solid rgba(255,255,255,0.12)",color:"#eee",padding:"10px 12px",borderRadius:10}}/>
  );
}

/* ---------- simple SVG preview (cleaner look) ---------- */
function Preview({slug, wood, metal, resin, edge}:{slug:string; wood:string; metal:string; resin:string; edge:string}){
  const label = getCategory(slug)?.label ?? "";
  const darkWood = ["Walnut","Wenge","Bubinga","Rosewood (where legal/compliant)"].includes(wood);
  const woodFill = darkWood ? "#3a2b23" : ["Cherry","Teak","African Mahogany","Sapele","Iroko","Padauk","Zebrawood","Purpleheart"].includes(wood) ? "#7a5132" : "#caa76f";
  const metalFill =
    metal.startsWith("Gold") ? "#E9C65B" :
    metal.startsWith("Copper") ? "#C8753C" :
    metal.startsWith("Brass") ? "#D9B24C" :
    metal.startsWith("Bronze") ? "#8A5E3B" :
    metal.startsWith("Stainless") ? "#BFC6CF" :
    metal.startsWith("Aluminum") ? "#D5DBE3" : "transparent";

  return (
    <svg viewBox="0 0 640 360" width="100%" height="100%" style={{borderRadius:14, background:"radial-gradient(1000px 500px at 50% 0%, #19130e, #0b0a09)"}}>
      <text x="20" y="34" fill="#E8C987" fontWeight={700} fontSize="18">{label}</text>
      <g>
        <rect x="40" y="64" width="560" height="220" rx="12" fill={woodFill}/>
        {edge==="Live Edge" && (
          <>
            <path d="M40,64 C120,72 90,110 40,140 L40,64 Z" fill="#000" opacity="0.18"/>
            <path d="M600,284 C520,272 540,220 600,180 L600,284 Z" fill="#000" opacity="0.18"/>
          </>
        )}
        {resin==="River" && <rect x="310" y="64" width="40" height="220" fill="rgba(70,150,190,0.45)" />}
        {metalFill!=="transparent" && <rect x="40" y="280" width="560" height="6" rx="3" fill={metalFill}/>}
      </g>
      <rect x="0" y="318" width="640" height="42" fill="rgba(10,10,10,0.55)"/>
      <text x="20" y="342" fill="#cfcfcf" fontSize="13">
        {wood}{metal!=="None" ? ` • ${metal}` : ""}{resin!=="None" ? ` • ${resin}` : ""}{edge ? ` • ${edge}` : ""}
      </text>
    </svg>
  );
}

/* ---------- Inner page (wrapped by Suspense) ---------- */
function Inner(){
  const sp = useSearchParams();
  // slug comes from /categories link: ?itemType=slug
  const initialSlug = sp.get("itemType") || "dining-table";
  const initial = defaultsFor(initialSlug);

  const [slug, setSlug] = useState(initial.slug);
  const [width, setWidth] = useState<number>(initial.width);
  const [length, setLength] = useState<number>(initial.length);
  const [thickness, setThickness] = useState<number>(initial.thickness);
  const [wood, setWood] = useState<string>(initial.wood);
  const [finish, setFinish] = useState<string>(initial.finish);
  const [edge, setEdge] = useState<string>(initial.edge);
  const [resin, setResin] = useState<string>(initial.resin);
  const [geometry, setGeometry] = useState<string>(initial.geometry);
  const [lighting, setLighting] = useState<string>(initial.lighting);
  const [metal, setMetal] = useState<string>("None");
  const [cabinetLF, setCabinetLF] = useState<number>(24);

  // if user comes from categories, lock to that slug
  useEffect(()=>{
    const s = sp.get("itemType");
    if (s && getCategory(s)) {
      setSlug(s);
      const d = defaultsFor(s);
      setWidth(d.width); setLength(d.length); setThickness(d.thickness);
      setWood(d.wood); setFinish(d.finish); setEdge(d.edge); setResin(d.resin);
      setGeometry(d.geometry); setLighting(d.lighting); setMetal(d.metal);
      setCabinetLF(d.cabinetLF);
    }
  }, [sp]);

  const cat = getCategory(slug)!;
  const cats = listCategories();

  const est = useMemo(()=>{
    return estimate({
      slug, width, length, thickness, wood, finish, edge, resin,
      geometry, lighting, metal, cabinetLF
    });
  }, [slug,width,length,thickness,wood,finish,edge,resin,geometry,lighting,metal,cabinetLF]);

  return (
    <main style={{maxWidth:1180, margin:"0 auto", padding:24}}>
      <h1 style={{fontSize:32,fontWeight:800,color:"#E8C987"}}>Configure Your {cat.label}</h1>
      <p style={{color:"#cfcfcf",marginTop:6}}>
        This configurator is **in sync** with the catalog. Choose a category, then refine materials and features.
        All legs/bases are **sold and arranged separately** (availability changes frequently).
      </p>

      <section style={{display:"grid",gridTemplateColumns:"1.05fr 1fr",gap:24,marginTop:18}}>
        {/* left: options */}
        <div style={{border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,padding:16,background:"linear-gradient(180deg, rgba(232,201,135,0.06), rgba(0,0,0,0.25))"}}>
          {/* Category */}
          <div style={{marginBottom:12}}>
            <Label>Category</Label>
            <select
              value={slug}
              onChange={(e)=>setSlug(e.target.value)}
              style={{width:"100%",background:"rgba(0,0,0,0.35)",border:"1px solid rgba(255,255,255,0.12)",color:"#eee",padding:"10px 12px",borderRadius:10}}
            >
              {cats.map(c=>(
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
            <div style={{fontSize:12,opacity:0.7,marginTop:6}}>{cat.blurb}</div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {/* Dimensions or LF */}
            {cat.show.dimensions && (
              <>
                <div><Label>Width (in)</Label><Input type="number" value={width} onChange={(v:any)=>setWidth(Number(v))} placeholder="e.g., 36"/></div>
                <div><Label>Length (in)</Label><Input type="number" value={length} onChange={(v:any)=>setLength(Number(v))} placeholder="e.g., 72"/></div>
                {!cat.hide?.thickness && (
                  <div style={{gridColumn:"1 / -1"}}>
                    <Label>Thickness (in)</Label>
                    <Input type="number" value={thickness} onChange={(v:any)=>setThickness(Number(v))} placeholder="e.g., 1.75"/>
                  </div>
                )}
              </>
            )}
            {cat.unit==="lf" && (
              <div style={{gridColumn:"1 / -1"}}>
                <Label>Linear Feet</Label>
                <Input type="number" value={cabinetLF} onChange={(v:any)=>setCabinetLF(Number(v))} placeholder="e.g., 24"/>
              </div>
            )}

            {/* Materials */}
            <div><Label>Wood Species</Label><Select value={wood} onChange={setWood} options={[...WOODS] as unknown as string[]}/></div>
            <div><Label>Finish</Label><Select value={finish} onChange={setFinish} options={[...FINISHES] as unknown as string[]}/></div>

            {/* Metals */}
            <div style={{gridColumn:"1 / -1"}}><Label>Metal Accents / Inlay</Label><Select value={metal} onChange={setMetal} options={[...METALS] as unknown as string[]}/></div>

            {/* Edge / Resin */}
            {cat.show.edge && (<div><Label>Edge Style</Label><Select value={edge} onChange={setEdge} options={[...EDGE_STYLES] as unknown as string[]}/></div>)}
            {cat.show.resin && (<div><Label>Resin / Epoxy Pattern</Label><Select value={resin} onChange={setResin} options={[...RESIN_PATTERNS] as unknown as string[]}/></div>)}

            {/* Geometry */}
            {cat.show.geometry && (
              <div style={{gridColumn:"1 / -1"}}>
                <Label>Sacred Geometry (engrave/inlay)</Label>
                <Select value={geometry} onChange={setGeometry} options={[...GEOMETRIES] as unknown as string[]}/>
              </div>
            )}

            {/* Lighting */}
            {cat.show.lighting && (
              <div style={{gridColumn:"1 / -1"}}>
                <Label>Lighting</Label>
                <Select value={lighting} onChange={setLighting} options={[...LIGHTING] as unknown as string[]}/>
              </div>
            )}

            {/* Cabinetry */}
            {cat.show.cabinetry && (
              <>
                <div><Label>Cabinet Front</Label><Select value={"Shaker"} onChange={()=>{}} options={[...CABINET_FRONTS] as unknown as string[]}/></div>
                <div><Label>Hardware</Label><Select value={"Black Matte"} onChange={()=>{}} options={[...HARDWARE] as unknown as string[]}/></div>
              </>
            )}
          </div>

          {/* Estimate + CTA */}
          <div style={{marginTop:18,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:12,opacity:0.6}}>Estimated from</div>
              <div style={{fontSize:28,fontWeight:800,color:"#E8C987"}}>${est.toLocaleString()}</div>
            </div>
            <a
              href={`/contact?intent=quote&item=${encodeURIComponent(slug)}&w=${width}&l=${length}&t=${thickness}&wood=${encodeURIComponent(wood)}&metal=${encodeURIComponent(metal)}&finish=${encodeURIComponent(finish)}&geom=${encodeURIComponent(geometry)}&resin=${encodeURIComponent(resin)}&lighting=${encodeURIComponent(lighting)}&lf=${cabinetLF}`}
              style={{padding:"12px 16px",borderRadius:10,background:"#E8C987",color:"#000",fontWeight:700}}
            >
              Start Your Quote →
            </a>
          </div>
          <div style={{fontSize:12,opacity:0.6,marginTop:8}}>
            Final quotes account for joinery complexity, finish systems, specialty stock, and delivery scope.
          </div>
        </div>

        {/* right: preview & quick links */}
        <div style={{border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,padding:12}}>
          <div style={{height:360}}>
            <Preview slug={slug} wood={wood} metal={metal} resin={resin} edge={edge}/>
          </div>
          <div style={{display:"flex",gap:10,marginTop:12,flexWrap:"wrap"}}>
            <a href="/work" className="px-4 py-2 rounded-lg" style={{border:"1px solid rgba(255,255,255,0.2)"}}>View Recent Builds</a>
            <a href="/categories" className="px-4 py-2 rounded-lg" style={{border:"1px solid rgba(255,255,255,0.2)"}}>Browse Categories</a>
          </div>
          <div style={{fontSize:12,opacity:0.65,marginTop:10}}>
            Want to upload a real photo or sketch for reference? You can attach it on the quote form after this step.
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Page(){
  return (
    <Suspense fallback={<main style={{maxWidth:1180,margin:"0 auto",padding:24,color:"#cfcfcf"}}>Loading…</main>}>
      <Inner/>
    </Suspense>
  );
}
