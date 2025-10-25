import Image from "next/image";
import Link from "next/link";

const wrap={maxWidth:1100,margin:"0 auto",padding:"64px 20px"};
const card={background:"rgba(255,255,255,.03)",border:"1px solid #2a2a2a",borderRadius:16,padding:16} as React.CSSProperties;

export default function Sets(){
  return (
    <main style={wrap}>
      <h1 style={{fontSize:34,fontWeight:800}}>Sets & Collections</h1>
      <p style={{color:"#cfcfcf",marginTop:8,lineHeight:1.7}}>
        Cohesive groups designed as one vision—tables, wall panels, rails, and lighting aligned by geometry and material.
      </p>

      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:16}}>
        {[
          {src:"/resonance-table.png",title:"Dining Set (Table + Benches)"},
          {src:"/selenite-light.png",title:"Wall Feature + Lighting"},
          {src:"/resonance-table.png",title:"Office Suite (Desk + Credenza)"},
        ].map(x=>(
          <article key={x.title} style={card}>
            <Image src={x.src} alt={x.title} width={1600} height={1000} style={{width:"100%",height:200,objectFit:"cover"}}/>
            <div style={{fontWeight:800,marginTop:8}}>{x.title}</div>
          </article>
        ))}
      </section>

      <div style={{textAlign:"center",marginTop:20}}>
        <Link href="/custom" style={{background:"#C6A746",color:"#111",padding:"12px 18px",borderRadius:12,fontWeight:800,textDecoration:"none"}}>
          Start a Set or Collection
        </Link>
      </div>
    </main>
  );
}
