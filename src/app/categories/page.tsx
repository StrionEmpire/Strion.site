import Link from "next/link";

const wrap={maxWidth:1100,margin:"0 auto",padding:"64px 20px"};
const card={background:"rgba(255,255,255,.03)",border:"1px solid #2a2a2a",borderRadius:16,padding:16} as React.CSSProperties;

const cats = [
  { slug:"epoxy-river-tables", title:"Epoxy River Tables", blurb:"Single or dual rivers, clear or pigmented, mineral inlays." },
  { slug:"live-edge-tables", title:"Live-Edge Tables", blurb:"Natural edge slabs with legacy joinery and curated finishes." },
  { slug:"dining-tables", title:"Dining Tables", blurb:"Built for daily use, proportioned for conversation and flow." },
  { slug:"coffee-tables", title:"Coffee Tables", blurb:"Compact function with high presence; layered geometry options." },
  { slug:"desks", title:"Desks & Consoles", blurb:"Executive, writing, reception—cable management available." },
  { slug:"conference-tables", title:"Conference Tables", blurb:"Boardroom builds with power, routing, and install options." },
  { slug:"wall-panels", title:"Wall Panels", blurb:"Geometric or copper-lined feature panels for resonance." },
  { slug:"wall-lights", title:"Wall Lights", blurb:"Selenite/brass or geometric fixtures—ambient halo lighting." },
  { slug:"benches-altars", title:"Benches & Altars", blurb:"Meditation benches, sanctuary altars, ceremonial builds." },
  { slug:"rails-shelves", title:"Rails & Shelves", blurb:"Meridian rails, floating shelves, copper pathway options." },
  { slug:"mirrors-frames", title:"Mirrors & Frames", blurb:"Octagon mirrors, harmonic frames, subtle inlay work." },
  { slug:"trays-accessories", title:"Trays & Accessories", blurb:"Coasters, charging disks, ritual trays, grid plates." },
];

export default function Categories(){
  return (
    <main style={wrap}>
      <h1 style={{fontSize:34,fontWeight:800}}>Browse by Category</h1>
      <p style={{color:"#cfcfcf",marginTop:8,lineHeight:1.7}}>
        Explore our most requested builds. Each category links to examples and can be configured in the Custom page.
      </p>

      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:16}}>
        {cats.map(c => (
          <article key={c.slug} style={card}>
            <div style={{fontWeight:800}}>{c.title}</div>
            <div style={{color:"#bdbdbd",marginTop:6}}>{c.blurb}</div>
            <div style={{marginTop:10}}>
              <Link href={`/custom?itemType=${encodeURIComponent(toItemType(c.slug))}`} style={{ color:"#C6A746", textDecoration:"none" }}>
                Configure this category →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function toItemType(slug: string){
  if (slug.includes("conference")) return "Conference Table";
  if (slug.includes("dining")) return "Dining Table";
  if (slug.includes("coffee")) return "Coffee Table";
  if (slug.includes("desks")) return "Desk";
  if (slug.includes("wall-panels")) return "Wall Panel";
  if (slug.includes("wall-lights")) return "Wall Light";
  if (slug.includes("rails")) return "Rail";
  if (slug.includes("benches")) return "Bench";
  if (slug.includes("altars")) return "Altar";
  if (slug.includes("mirrors")) return "Mirror";
  if (slug.includes("trays")) return "Side Table";
  if (slug.includes("live-edge")) return "Dining Table";
  if (slug.includes("epoxy-river")) return "Dining Table";
  return "Dining Table";
}
