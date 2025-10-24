import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "../../data/products";

type Props = { params: { slug: string } };

export default function ProductPage({ params }: Props) {
  const item = products.find(p => p.slug === params.slug);
  if (!item) return notFound();

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "64px 20px" }}>
      <Image src={item.image} alt={item.title} width={1600} height={1000} style={{ width:"100%", height:"auto", borderRadius:16, border:"1px solid #2a2a2a" }}/>
      <h1 style={{ fontSize: 30, fontWeight: 700, marginTop: 16 }}>{item.title}</h1>
      <div style={{ color:"#C6A746", fontWeight:700, marginTop:6 }}>Starting ${item.starting.toLocaleString()}</div>
      <p style={{ color:"#cfcfcf", marginTop:12 }}>{item.blurb}</p>

      {/* Purpose block */}
      <div style={{ background:"rgba(255,255,255,.03)", border:"1px solid #2a2a2a", borderRadius:16, padding:16, marginTop:16 }}>
        <strong>Purpose & Alignment</strong>
        <p style={{ color:"#bdbdbd", marginTop:6 }}>
          Choose intent (Wealth / Healing / Clarity / Protection / Legacy). We map geometry and materials
          to your intention and space. Size, wood, metals, crystals, and finish are configured before a call.
        </p>
      </div>

      <div style={{ display:"flex", gap:12, marginTop:16 }}>
        <Link href="/custom" style={{ background:"#C6A746", color:"#111", padding:"12px 18px", borderRadius:12, fontWeight:700, textDecoration:"none" }}>
          Start Your Design
        </Link>
        <a href="/custom#estimate" style={{ color:"#C6A746", textDecoration:"none", padding:"12px 0" }}>Get a quick estimate →</a>
      </div>
    </main>
  );
}
