// src/app/categories/page.tsx
import Link from "next/link";
import { listCategories } from "../../lib/catalog";

export default function Categories(){
  const cats = listCategories();

  return (
    <main style={{maxWidth:1180, margin:"0 auto", padding:"24px"}}>
      <h1 style={{fontSize:34, fontWeight:800}}>Browse by Category</h1>
      <p style={{color:"#cfcfcf", marginTop:8, lineHeight:1.7}}>
        Explore our most requested builds. Each category links to examples and can be configured in the Custom page.
      </p>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))",
        gap:16, marginTop:18
      }}>
        {cats.map(cat => (
          <div key={cat.slug} style={{
            border:"1px solid rgba(232,201,135,0.25)",
            borderRadius:14, padding:16,
            background:"linear-gradient(180deg, rgba(232,201,135,0.06), rgba(0,0,0,0.25))"
          }}>
            <div style={{fontWeight:800, fontSize:18, color:"#E8C987"}}>{cat.title}</div>
            <div style={{opacity:0.8, color:"#ddd", fontSize:14, marginTop:6}}>{cat.blurb}</div>

            <div style={{marginTop:14, display:"flex", gap:12, flexWrap:"wrap"}}>
              <Link href={`/custom?category=${cat.slug}`} className="underline">
                Customize this category
              </Link>
              <Link href={`/work?category=${cat.slug}`} className="underline">
                See examples
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
