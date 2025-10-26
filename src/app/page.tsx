"use client";

import Link from "next/link";
import { useMemo } from "react";

export default function HomePage() {
  return (
    <main className="wrap">
      <style jsx global>{`
        html, body, #__next { overflow-x: hidden; }
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>
      <style jsx>{`
        .wrap { color:#e7d38c; }
        .hero {
          position: relative; padding: 80px 24px 56px; overflow: hidden;
          background: radial-gradient(1400px 600px at 10% -20%, rgba(198,167,70,.18), transparent),
                      radial-gradient(900px 500px at 100% 0%, rgba(198,167,70,.1), transparent),
                      #0b0b0b;
        }
        .max { max-width: 1180px; margin: 0 auto; }
        .h1 { font-size: clamp(32px, 4.5vw, 56px); line-height: 1.05; font-weight: 800; margin: 0 0 14px; letter-spacing: .2px; }
        .sub { color:#d6c07a; opacity:.9; font-size: clamp(16px, 1.8vw, 20px); line-height:1.5; max-width: 900px; }
        .ctaRow { display:flex; gap:12px; flex-wrap:wrap; margin-top: 22px; }
        .btn {
          display:inline-block; padding:12px 18px; border-radius:12px; font-weight:800;
          text-decoration:none; transition: transform .12s ease;
        }
        .btn:hover { transform: translateY(-1px); }
        .btnGold { background:#c6a746; color:#0b0b0b; }
        .btnGhost { color:#c6a746; border:1px solid #2a2a2a; }
        .heroGrid { display:grid; gap:18px; margin-top: 36px; }
        @media (min-width: 980px) { .heroGrid { grid-template-columns: 1.2fr .8fr; } }

        .card {
          background:#0f0f0f; border:1px solid #232323; border-radius:16px; padding:20px; min-width:0;
        }
        .tag { display:inline-block; font-size:12px; padding:4px 8px; border:1px solid #2a2a2a; border-radius:999px; color:#cbb66e; }
        .kv { display:grid; gap:12px; grid-template-columns: 1fr 1fr; }
        .kv div { background:#101010; border:1px solid #232323; border-radius:12px; padding:14px; }
        .kv h4 { margin:0 0 8px; font-size:14px; color:#d5bf78; }
        .kv p { margin:0; font-size:13px; color:#cfcfcf; line-height:1.5; }

        .section { padding: 40px 24px; background:#0a0a0a; border-top:1px solid #1a1a1a; }
        .h2 { font-size: clamp(22px, 3vw, 32px); font-weight:800; margin:0 0 8px; }
        .lead { opacity:.85; margin:0 0 20px; max-width:920px; }

        .grid3 { display:grid; gap:16px; }
        @media (min-width: 860px) { .grid3 { grid-template-columns: repeat(3, minmax(0,1fr)); } }

        .tile { background:#0f0f0f; border:1px solid #232323; border-radius:16px; padding:18px; }
        .tile h3 { margin:6px 0 6px; font-weight:800; font-size:18px; }
        .tile p { margin:0; font-size:14px; color:#cfcfcf; line-height:1.6; }
        .tile a { color:#c6a746; text-decoration:none; font-weight:700; }

        .list {
          display:grid; gap:10px;
          grid-template-columns: repeat(2, minmax(0,1fr));
        }
        @media (min-width: 860px) { .list { grid-template-columns: repeat(4, minmax(0,1fr)); } }
        .chip {
          background:#0f0f0f; border:1px solid #232323; color:#eae3bf;
          padding:10px 12px; border-radius:12px; font-size:14px; text-align:center;
        }

        .process { display:grid; gap:12px; }
        @media (min-width: 900px) { .process { grid-template-columns: repeat(4, minmax(0,1fr)); } }
        .step { background:#0f0f0f; border:1px solid #232323; border-radius:16px; padding:18px; }
        .num  { font-weight:900; color:#c6a746; }
        .step h4 { margin:6px 0 8px; font-size:16px; }
        .step p { margin:0; font-size:14px; color:#cfcfcf; }

        .trust { display:grid; gap:16px; }
        @media (min-width: 900px) { .trust { grid-template-columns: 1fr 1fr; } }
        .quote {
          background:#0f0f0f; border:1px solid #232323; border-radius:16px; padding:18px;
          font-size:14px; color:#d8c98a; line-height:1.6;
        }
        .quote strong { color:#c6a746; }

        .footerCta { text-align:center; padding: 48px 24px; }
        .muted { color:#b9b18c; font-size:13px; opacity:.8; margin-top:8px; }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="max">
          <div className="tag">STRION — Energetic Crafting™</div>
          <h1 className="h1">
            Custom live-edge & epoxy builds engineered for <em>legacy</em>.
          </h1>
          <p className="sub">
            Strion is the convergence of vision, energy, and precision. We fuse hardwoods,
            resin rivers, ancient geometry, conductive metals, and crystal inlays to craft
            pieces that elevate spaces—residential, commercial, and ceremonial.
          </p>
          <div className="ctaRow">
            <Link href="/custom" className="btn btnGold">Design your build →</Link>
            <Link href="/categories" className="btn btnGhost">Browse categories</Link>
            <Link href="/about" className="btn btnGhost">Our purpose</Link>
          </div>

          <div className="heroGrid">
            <div className="card">
              <h3 style={{margin:"0 0 10px", fontSize:18, fontWeight:800}}>What makes Strion different</h3>
              <div className="kv">
                <div>
                  <h4>Energetic Materials</h4>
                  <p>Crystal lattices (selenite, quartz, shungite), copper & 24k leaf, tuned to intent: wealth, healing, clarity, protection.</p>
                </div>
                <div>
                  <h4>Precision & Geometry</h4>
                  <p>Phi proportions, octagons, vesica patterns, and 3-6-9 sequencing integrated with disciplined carpentry.</p>
                </div>
                <div>
                  <h4>Custom, Not Generic</h4>
                  <p>Every commission is spec-driven—dimensioned CAD, curated slabs, lab-grade resin systems, and finish workflows.</p>
                </div>
                <div>
                  <h4>Nationwide White-Glove</h4>
                  <p>Concierge logistics: crating, insured freight, on-site install options. Legs quoted separately for accuracy.</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{margin:"0 0 6px", fontSize:18, fontWeight:800}}>Start with an instant estimate</h3>
              <p style={{margin:"0 0 14px", color:"#cfcfcf"}}>
                Use our configurator to price dining, coffee, conference & island tops.
                We’ll refine your quote after material confirmation.
              </p>
              <Link href="/custom" className="btn btnGold">Open configurator →</Link>
              <p className="muted">Legs are sold/arranged separately due to changing inventory.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE LINES */}
      <section className="section">
        <div className="max">
          <h2 className="h2">Signature Series</h2>
          <p className="lead">
            Bespoke collections that embody Strion’s design language—each anchored in intention and materials.
          </p>
          <div className="grid3">
            <div className="tile">
              <div className="tag">Wealth / Legacy</div>
              <h3>Ascendant</h3>
              <p>Walnut or white oak with copper/24k accents, satin finish, and subtle Phi mapping for balanced proportion.</p>
              <p style={{marginTop:8}}><Link href="/custom">Configure Ascendant →</Link></p>
            </div>
            <div className="tile">
              <div className="tag">Clarity / Focus</div>
              <h3>Vesica</h3>
              <p>Clear or tinted river with “Vesica” patterning, quartz/selenite veil windows, oil-wax finish for tactile warmth.</p>
              <p style={{marginTop:8}}><Link href="/custom">Configure Vesica →</Link></p>
            </div>
            <div className="tile">
              <div className="tag">Protection / Ground</div>
              <h3>Obsidian</h3>
              <p>Darkened hardwoods, blued steel or brass insets, shungite / obsidian lattice—refined for serene strength.</p>
              <p style={{marginTop:8}}><Link href="/custom">Configure Obsidian →</Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="max">
          <h2 className="h2">Build Types</h2>
          <p className="lead">From intimate pieces to statement installations.</p>
          <div className="list" aria-label="Primary categories">
            <Link href="/categories#dining" className="chip">Dining Tables</Link>
            <Link href="/categories#coffee" className="chip">Coffee Tables</Link>
            <Link href="/categories#conference" className="chip">Conference Tables</Link>
            <Link href="/categories#island" className="chip">Kitchen Island Tops</Link>
            <Link href="/categories#bar" className="chip">Bar / Counter Tops</Link>
            <Link href="/categories#console" className="chip">Console & Side</Link>
            <Link href="/categories#wall" className="chip">Wall Panels & Lights</Link>
            <Link href="/categories#bench" className="chip">Benches & Altars</Link>
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="section">
        <div className="max">
          <h2 className="h2">Materials, Patterns & Finishes</h2>
        </div>
        <div className="max grid3">
          <div className="tile">
            <h3>Hardwoods</h3>
            <p>Walnut, White/Red Oak, Maple, Cherry, Ash, Hickory, Cedar, Teak, Mahogany, Sapele, Bubinga, Wenge, Zebrawood, Olive.</p>
          </div>
          <div className="tile">
            <h3>Resin Work</h3>
            <p>Clear & tinted rivers, dual/offset rivers, edge pours, galaxy metallic swirls, geode inlays, crystal veil windows, natural void fills.</p>
          </div>
          <div className="tile">
            <h3>Accents & Finish</h3>
            <p>Copper, brass, bronze, stainless, 24k leaf; oil-wax, matte, satin, or high-gloss. Crystals: quartz, selenite, shungite, amethyst & more.</p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="max">
          <h2 className="h2">White-Glove Process</h2>
          <p className="lead">We keep it effortless while maintaining technical rigor.</p>
          <div className="process">
            <div className="step">
              <div className="num">01</div>
              <h4>Blueprint</h4>
              <p>Use the configurator or send inspiration. We translate intent into specs & materials.</p>
            </div>
            <div className="step">
              <div className="num">02</div>
              <h4>Design</h4>
              <p>CAD drawings, slab selects, resin/pattern proofs, and crystal/metal placements for sign-off.</p>
            </div>
            <div className="step">
              <div className="num">03</div>
              <h4>Craft</h4>
              <p>Joinery, pours, cure, surfacing, and finishing. QC at each gate. Legs quoted separately.</p>
            </div>
            <div className="step">
              <div className="num">04</div>
              <h4>Deliver</h4>
              <p>Crate, ship, install. Final alignment & care briefing. Legacy piece, lifetime presence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="section">
        <div className="max">
          <h2 className="h2">What Clients Say</h2>
          <div className="trust">
            <div className="quote">“Our conference table is a show-stopper. The metallic swirl is subtle in daylight and luminous at night. Install was flawless.” — <strong>Hospitality Group, TX</strong></div>
            <div className="quote">“The Vesica altar shifted the whole room. You don’t just see it—you feel it.” — <strong>Private Studio, CA</strong></div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="footerCta">
        <div className="max">
          <h2 className="h2">Ready to design yours?</h2>
          <p className="lead">Get an instant estimate, then we’ll refine the quote with drawings & material confirmation.</p>
          <div className="ctaRow" style={{justifyContent:"center"}}>
            <Link href="/custom" className="btn btnGold">Start your build →</Link>
            <Link href="/about" className="btn btnGhost">Learn about Strion</Link>
          </div>
          <p className="muted">Legs are sold & arranged separately due to changing availability.</p>
        </div>
      </section>
    </main>
  );
}
