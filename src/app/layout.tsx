import "./globals.css";import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "STRION — Energetic Crafting™",
  description:
    "Luxury live-edge & epoxy builds tuned with sacred geometry, metals, and crystal inlays. Instant estimates. Nationwide white-glove service.",
};
const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://strion-site.vercel.app/#organization",
      "name": "STRION Custom Carpentry",
      "url": "https://strion-site.vercel.app/",
      "logo": "https://strion-site.vercel.app/logo.svg",
      "image": [
        "https://strion-site.vercel.app/file_000000007a4461f59f24187f958711dc~2.png",
        "https://strion-site.vercel.app/file_000000007a4461f59f24187f958711dc~3.png"
      ],
      "slogan": "Energetic Crafting™ — Precision builds engineered for legacy.",
      "description": "STRION Custom Carpentry forges heirloom-grade builds that merge geometry, energy, and craftsmanship. From live-edge resin tables to bespoke interiors, we engineer works to endure generations.",
      "sameAs": [
        // add your real profiles when ready:
        "https://www.instagram.com/strion", 
        "https://www.facebook.com/strion"
      ],
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "hello@strion.example",   // replace when you have it
        "availableLanguage": ["en"]
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "STRION Signature & Custom Catalog",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Tables",
            "itemListElement": [
              {"@type":"Offer","itemOffered":{"@type":"Service","name":"Live-edge dining table (with or without resin river)" }},
              {"@type":"Offer","itemOffered":{"@type":"Service","name":"Coffee & console tables"}},
              {"@type":"Offer","itemOffered":{"@type":"Service","name":"Conference tables"}}
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Wall & Architectural",
            "itemListElement": [
              {"@type":"Offer","itemOffered":{"@type":"Service","name":"Wall panels & art (wood, resin, metal, crystals)"}},
              {"@type":"Offer","itemOffered":{"@type":"Service","name":"Shelving & built-ins"}}
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Materials & Energy Options",
            "itemListElement": [
              {"@type":"Offer","itemOffered":{"@type":"Service","name":"Hardwoods: walnut, white oak, red oak, maple, cherry, cedar, ash, elm, hickory"}},
              {"@type":"Offer","itemOffered":{"@type":"Service","name":"Metals: brass, bronze, copper, steel, gold accents"}},
              {"@type":"Offer","itemOffered":{"@type":"Service","name":"Crystals: quartz, selenite, amethyst, citrine, shungite, labradorite"}}
            ]
          }
        ]
      }
    },

    {
      "@type": "Service",
      "@id": "https://strion-site.vercel.app/#service",
      "serviceType": "Custom carpentry, bespoke furniture & energetic design",
      "provider": { "@id": "https://strion-site.vercel.app/#organization" },
      "areaServed": "United States",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://strion-site.vercel.app/custom",
        "name": "Online design inquiry & instant estimate"
      },
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "USD"
        },
        "availability": "https://schema.org/PreOrder",
        "description": "Legs are quoted and sold separately; availability varies."
      }
    },

    {
      "@type": "WebSite",
      "@id": "https://strion-site.vercel.app/#website",
      "url": "https://strion-site.vercel.app/",
      "name": "STRION Custom Carpentry",
      "publisher": { "@id": "https://strion-site.vercel.app/#organization" },
      "inLanguage": "en",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://strion-site.vercel.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://strion-site.vercel.app/#breadcrumbs",
      "itemListElement": [
        {"@type":"ListItem","position":1,"name":"Home","item":"https://strion-site.vercel.app/"},
        {"@type":"ListItem","position":2,"name":"About","item":"https://strion-site.vercel.app/about"},
        {"@type":"ListItem","position":3,"name":"Custom","item":"https://strion-site.vercel.app/custom"},
        {"@type":"ListItem","position":4,"name":"Categories","item":"https://strion-site.vercel.app/categories"},
        {"@type":"ListItem","position":5,"name":"Commercial","item":"https://strion-site.vercel.app/commercial"},
        {"@type":"ListItem","position":6,"name":"Residential","item":"https://strion-site.vercel.app/residential"},
        {"@type":"ListItem","position":7,"name":"Signature","item":"https://strion-site.vercel.app/signature"},
        {"@type":"ListItem","position":8,"name":"Energetic","item":"https://strion-site.vercel.app/energetic"},
        {"@type":"ListItem","position":9,"name":"Sets","item":"https://strion-site.vercel.app/sets"},
        {"@type":"ListItem","position":10,"name":"Work","item":"https://strion-site.vercel.app/work"},
        {"@type":"ListItem","position":11,"name":"Shop","item":"https://strion-site.vercel.app/shop"},
        {"@type":"ListItem","position":12,"name":"Nationwide","item":"https://strion-site.vercel.app/nationwide"}
      ]
    }
  ]
};

/* --- inside your <head> in RootLayout --- */
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }}
/>

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Header (simple, fully responsive, no event handlers) */}
        <header className="site-header">
          <div className="site-row">
            <Link href="/" className="brand" aria-label="STRION Home">
              <img
                src="/file_000000007a4461f59f24187f958711dc~2.png"
                alt="STRION logo"
                className="brand-logo"
              />
              <span className="brand-text">STRION</span>
            </Link>

            <nav className="primary-nav">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/custom">Custom</Link>
              <Link href="/commercial">Commercial</Link>
              <Link href="/residential">Residential</Link>
              <Link href="/signature">Signature</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/work">Work</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/nationwide">Nationwide</Link>
              <Link href="/sets">Sets</Link>
              <Link href="/custom" className="btn-cta">Start Your Design</Link>
            </nav>
          </div>
        </header>

        {/* Page container (prevents sideways scroll; centers content) */}
        <main className="page-container">
          <div className="page-inner">{children}</div>
        </main>

        {/* Footer (simple, responsive) */}
        <footer className="site-footer">
          <div className="site-row footer-grid">
            <div>
              <div className="brand footer-brand">
                <img
                  src="/file_000000007a4461f59f24187f958711dc~2.png"
                  alt="STRION logo"
                  className="brand-logo"
                />
                <span className="brand-text">STRION</span>
              </div>
              <p className="muted">
                Energetic Crafting™ — custom live-edge & epoxy builds tuned with geometry,
                conductive metals, and crystal lattices. Legs are sold & arranged separately due to
                changing availability. Nationwide white-glove service.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <Link href="/custom">Configurator</Link><br/>
              <Link href="/categories">Build Categories</Link><br/>
              <Link href="/about">About the Movement</Link>
            </div>
            <div>
              <h4>Contact</h4>
              <a href="mailto:hello@strioncraft.com">hello@strioncraft.com</a>
              <p className="muted">Atlanta, GA • Nationwide</p>
            </div>
          </div>
          <div className="site-row footer-legal">
            © {new Date().getFullYear()} STRION. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
