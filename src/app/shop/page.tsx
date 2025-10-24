import Link from "next/link";
import Image from "next/image";
import { products } from "../data/products";

const wrap: React.CSSProperties = { maxWidth: 1100, margin: "0 auto", padding: "64px 20px" };
const card: React.CSSProperties = { background:"rgba(255,255,255,.03)", border:"1px solid #2a2a2a", borderRadius:16, overflow:"hidden" };

export default function ShopPage() {
  return (
    <main style={wrap}>
      <h1 style={{ fontSize: 30, fontWeight: 700 }}>Shop & Catalog</h1>
      <p style={{ color:"#cfcfcf", marginTop:8 }}>Signature, Core, and Accessory lines—each with a purpose and a starting price.</p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))", gap:16, marginTop:16 }}>
        {products.map(p => (
          <Link key={p.slug} href={`/shop/${p.slug}`} style={{ color:"inherit", textDecoration:"none" }}>
            <article style={card}>
              <Image src={p.image} alt={p.title} width={1600} height={1000} style={{ width:"100%", height:200, objectFit:"cover" }} />
              <div style={{ padding:12 }}>
                <div style={{ fontWeight:700 }}>{p.title}</div>
                <div style={{ color:"#bdbdbd", fontSize:14 }}>{p.blurb}</div>
                <div style={{ marginTop:6, color:"#C6A746", fontWeight:700 }}>Starting ${p.starting.toLocaleString()}</div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
