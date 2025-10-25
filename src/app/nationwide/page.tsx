import Link from "next/link";

const wrap={maxWidth:900,margin:"0 auto",padding:"64px 20px"};
const card={background:"rgba(255,255,255,.03)",border:"1px solid #2a2a2a",borderRadius:16,padding:16} as React.CSSProperties;

export default function Nationwide(){
  return (
    <main style={wrap}>
      <h1 style={{fontSize:34,fontWeight:800}}>Nationwide, White-Glove Delivery</h1>
      <p style={{color:"#cfcfcf",marginTop:8,lineHeight:1.7}}>
        We ship across the U.S. with insured freight, moisture-controlled crating, liftgate where required, and optional on-site installation for conference and architectural pieces.
      </p>

      <section style={{...card, marginTop:16}}>
        <strong>Logistics & Care</strong>
        <ul style={{marginTop:8, lineHeight:1.9, color:"#bdbdbd"}}>
          <li>Climate-safe crating and padding; hardware protected</li>
          <li>Residential or dock delivery; inside placement on request</li>
          <li>Optional on-site assembly and install for large builds</li>
          <li><em>Care & Resonance Guide</em> included with every commission</li>
        </ul>
      </section>

      <div style={{textAlign:"center",marginTop:20}}>
        <Link href="/custom" style={{background:"#C6A746",color:"#111",padding:"12px 18px",borderRadius:12,fontWeight:800,textDecoration:"none"}}>
          Start Your Design
        </Link>
      </div>
    </main>
  );
}
