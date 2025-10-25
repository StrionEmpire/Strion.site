import Image from "next/image";
import Link from "next/link";

const wrap={maxWidth:1100,margin:"0 auto",padding:"64px 20px"};
const card={background:"rgba(255,255,255,.03)",border:"1px solid #2a2a2a",borderRadius:16,padding:16} as React.CSSProperties;

export default function Commercial(){
  return (
    <main style={wrap}>
      <h1 style={{fontSize:34,fontWeight:800}}>Commercial Division</h1>
      <p style={{color:"#cfcfcf",marginTop:8,lineHeight:1.7}}>
        Tables, conference builds, and hospitality installations engineered for presence, durability, and brand alignment.
        We collaborate with architects and interior teams nationwide.
      </p>

      <section style={{...card, marginTop:16}}>
        <strong>Applications</strong>
        <ul style={{marginTop:8, lineHeight:1.9, color:"#bdbdbd"}}>
          <li>Conference & boardroom tables (power pass-through, cable management)</li>
          <li>Restaurant & hospitality tables (durable finishes, repeatable specs)</li>
          <li>Office desks, reception counters, wall panels, and branded features</li>
        </ul>
      </section>

      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:16}}>
        {[
          {src:"/resonance-table.png",title:"Sovereign Conference"},
          {src:"/resonance-table.png",title:"Reception Counter"},
          {src:"/selenite-light.png",title:"Feature Wall & Lighting"},
        ].map(x=>(
          <article key={x.title} style={card}>
            <Image src={x.src} alt={x.title} width={1600} height={1000} style={{width:"100%",height:200,objectFit:"cover"}}/>
            <div style={{fontWeight:800,marginTop:8}}>{x.title}</div>
          </article>
        ))}
      </section>

      <div style={{textAlign:"center",marginTop:20}}>
        <Link href="/custom" style={{background:"#C6A746",color:"#111",padding:"12px 18px",borderRadius:12,fontWeight:800,textDecoration:"none"}}>
          Start a Commercial Build
        </Link>
      </div>
    </main>
  );
}
