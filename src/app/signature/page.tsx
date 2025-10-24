import Link from "next/link";
const wrap={maxWidth:1100,margin:"0 auto",padding:"64px 20px"};
export default function Signature(){
  return (
    <main style={wrap}>
      <h1 style={{fontSize:30,fontWeight:700}}>Signature Series</h1>
      <p style={{color:"#cfcfcf",marginTop:8}}>
        Our pinnacle builds. Protocol-crafted for legacy spaces—material mastery, sacred proportion, and energetic alignment.
      </p>
      <ul style={{marginTop:16,lineHeight:1.9}}>
        <li><b>Resonance Table</b> — flow & clarity</li>
        <li><b>Abundance Octagon</b> — wealth & expansion</li>
        <li><b>Selenite Wall Light</b> — purification & uplift</li>
        <li><b>Sovereign Conference</b> — command & presence</li>
        <li><b>Atlas Desk</b> — focus & dominion</li>
      </ul>
      <div style={{marginTop:20}}>
        <Link href="/shop" style={{background:"#C6A746",color:"#111",padding:"12px 18px",borderRadius:12,fontWeight:700,textDecoration:"none"}}>Browse Catalog</Link>
      </div>
    </main>
  );
}
