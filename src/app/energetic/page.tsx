import Image from "next/image";
import Link from "next/link";

const wrap={maxWidth:1100,margin:"0 auto",padding:"64px 20px"};
const card={background:"rgba(255,255,255,.03)",border:"1px solid #2a2a2a",borderRadius:16,padding:16} as React.CSSProperties;

export default function Energetic(){
  return (
    <main style={wrap}>
      <h1 style={{fontSize:34,fontWeight:800}}>Energetic Crafting</h1>
      <p style={{color:"#cfcfcf",marginTop:8,lineHeight:1.7}}>
        Furniture as frequency. Signature builds mapped to intent—Wealth, Healing, Clarity, Protection, and Legacy—via sacred geometry,
        curated materials, and activation protocol.
      </p>

      <section style={{...card, marginTop:16}}>
        <strong>Signature Series</strong>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginTop:12}}>
          {[
            {href:"/shop/resonance-table",src:"/resonance-table.png",title:"Resonance Table",$:"$6,500+"},
            {href:"/shop/abundance-octagon",src:"/octagon-table.png",title:"Abundance Octagon",$:"$8,500+"},
            {href:"/shop/selenite-wall-light",src:"/selenite-light.png",title:"Selenite Wall Light",$:"$1,600+"},
          ].map(x=>(
            <Link key={x.title} href={x.href} style={{color:"inherit",textDecoration:"none"}}>
              <article style={card}>
                <Image src={x.src} alt={x.title} width={1600} height={1000} style={{width:"100%",height:200,objectFit:"cover"}}/>
                <div style={{fontWeight:800,marginTop:8}}>{x.title}</div>
                <div style={{color:"#C6A746",fontWeight:800}}>{x.$}</div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section style={{...card, marginTop:16}}>
        <strong>Protocol</strong>
        <ol style={{marginTop:8, lineHeight:1.9, color:"#bdbdbd"}}>
          <li>Consultation → Goals, space, intent</li>
          <li>Energetic Mapping → numerology, geometry, material pairing</li>
          <li>Design → drawings, finishes, logistics</li>
          <li>Craft → joinery, pouring, inlays, polish</li>
          <li>Activation → final alignment & inspection</li>
          <li>Delivery → insured freight, optional install</li>
        </ol>
      </section>

      <div style={{textAlign:"center",marginTop:20}}>
        <Link href="/custom" style={{background:"#C6A746",color:"#111",padding:"12px 18px",borderRadius:12,fontWeight:800,textDecoration:"none"}}>
          Start an Energetic Commission
        </Link>
      </div>
    </main>
  );
}
