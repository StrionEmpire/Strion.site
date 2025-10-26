export default function Head() {
  const title = "STRION — Custom Live-Edge & Epoxy Builds | Energetic Crafting™";
  const desc  = "Luxury custom tables, tops, and wall pieces merging hardwoods, resin rivers, sacred geometry, metals, and crystal inlays. Instant estimates. Nationwide white-glove service.";
  const url   = "https://strion-site.vercel.app/";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "STRION",
    url,
    sameAs: [
      "https://www.instagram.com/", // add your socials when live
      "https://www.pinterest.com/"
    ],
    brand: "STRION",
    slogan: "Energetic Crafting™",
    makesOffer: {
      "@type": "OfferCatalog",
      name: "Custom Live-Edge & Epoxy Builds",
      itemListElement: [
        { "@type": "Offer", name: "Custom Dining Tables" },
        { "@type": "Offer", name: "Conference Tables" },
        { "@type": "Offer", name: "Kitchen Island Tops" },
        { "@type": "Offer", name: "Bar & Counter Tops" },
        { "@type": "Offer", name: "Wall Panels & Lights" }
      ]
    }
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta name="keywords" content="custom epoxy table, live edge table, river table, conference table, kitchen island top, bar top, crystal inlay table, metallic swirl, geode table, nationwide delivery" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="STRION" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
