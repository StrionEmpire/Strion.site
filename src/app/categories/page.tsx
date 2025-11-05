// src/app/categories/page.tsx
import Link from "next/link";
import { CATEGORIES, CATEGORY_OPTIONS, listCategories } from "../../lib/catalog";
export default function Categories(){
  const cats = listCategories();

  return (
    <main style={{maxWidth:1180, margin:"0 auto", padding:"24px"}}>
      <h1 style={{fontSize:34,fontWeight:800,color:"#E8C987"}}>Browse by Category</h1>
      <p style={{color:"#cfcfcf",marginTop:8,lineHeight:1.7}}>
        Every category here maps 1:1 to the Custom Configurator. Click any card to jump in with that
        category pre-selected. Legs/metal bases are typically sold and arranged separately.
      </p>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",
        gap:16, marginTop:18
      }}>
        {cats.map(cat=>(
          <div key={cat.slug}
            style={{
              border:"1px solid rgba(255,255,255,0.12)",
              borderRadius:14, padding:16,
              background:"linear-gradient(180deg, rgba(232,201,135,0.06), rgba(0,0,0,0.25))"
            }}>
            <div style={{fontWeight:800, fontSize:18, color:"#E8C987"}}>{cat.label}</div>
            <div style={{opacity:0.8, color:"#ddd", fontSize:14, marginTop:6}}>{cat.blurb}</div>
            <div style={{marginTop:14, display:"flex", gap:10}}>
              <Link
                href={`/custom?itemType=${encodeURIComponent(cat.slug)}`}
                style={{padding:"10px 12px",borderRadius:10, background:"#E8C987", color:"#000", fontWeight:700}}
              >
                Customize this category →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
