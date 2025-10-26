export default function Head() {
  const title = "Design a Custom Epoxy & Live-Edge Table | STRION";
  const desc =
    "Build your custom dining, coffee, conference, or island top with Strion’s live-edge hardwoods, resin rivers, metallic swirls, and energetic crystal inlays. Instant estimate + nationwide service.";
  const url = "https://strion-site.vercel.app/custom";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Epoxy & Live-Edge Tables",
    brand: { "@type": "Brand", name: "STRION" },
    areaServed: "US",
    serviceType:
      "Custom resin river tables, live-edge hardwood tables, countertops, island tops, and wall panels",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "900",
      highPrice: "12000",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="STRION" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Helpful keywords without stuffing */}
      <meta
        name="keywords"
        content="custom epoxy table, live edge table, resin river table, conference table, kitchen island top, bar top, custom furniture, crystal inlay table, metallic swirl resin, geode table, Atlanta epoxy, nationwide delivery"
      />
    </>
  );
}
