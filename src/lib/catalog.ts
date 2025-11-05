// src/lib/catalog.ts

export type Category =
  | "Tables"
  | "Conference Tables"
  | "Wall Panels"
  | "Floating Shelves"
  | "Cabinetry"
  | "Interior Trim / Moulding"
  | "Lighting"
  | "Benches & Seating"
  | "Counter & Bar Tops"
  | "Doors & Partitions"
  | "Stairs & Railings"
  | "Beds & Headboards"
  | "Consoles & Media Centers"
  | "Reception Desks";

export interface CatalogItem {
  slug: string;        // url-safe key
  title: Category;     // human readable
  blurb: string;       // short description
}

export const CATEGORIES: CatalogItem[] = [
  { slug: "tables", title: "Tables", blurb: "Dining, coffee, live-edge, resin—built for daily impact." },
  { slug: "conference-tables", title: "Conference Tables", blurb: "Boardroom scale with power + cable management." },
  { slug: "wall-panels", title: "Wall Panels", blurb: "Sacred geometry, acoustic, metal/crystal inlays." },
  { slug: "floating-shelves", title: "Floating Shelves", blurb: "Hidden brackets, lighting, metal trims." },
  { slug: "cabinetry", title: "Cabinetry", blurb: "Kitchens, vanities, built-ins, media walls." },
  { slug: "interior-trim", title: "Interior Trim / Moulding", blurb: "Crown, base, casings, wainscoting, beams." },
  { slug: "lighting", title: "Lighting", blurb: "Energetic fixtures with embedded crystal arrays." },
  { slug: "benches", title: "Benches & Seating", blurb: "Entry, dining, meditative seating, outdoor." },
  { slug: "tops", title: "Counter & Bar Tops", blurb: "Solid, butcher block, resin, metal edging." },
  { slug: "doors", title: "Doors & Partitions", blurb: "Slab, panel, slatted, glass/metal dividers." },
  { slug: "stairs", title: "Stairs & Railings", blurb: "Treads, stringers, posts, wood/metal blends." },
  { slug: "beds", title: "Beds & Headboards", blurb: "Hardwood frames, panels, LED/energy options." },
  { slug: "media", title: "Consoles & Media Centers", blurb: "Low boards, built-ins, cable management." },
  { slug: "reception-desks", title: "Reception Desks", blurb: "Front-of-house statement pieces with branding." },
];

// Expandable option pools
export const WOODS = [
  "Walnut","White Oak","Red Oak","Maple","Cherry","Ash",
  "Sapele","African Mahogany","Teak","Wenge","Zebrawood","Bubinga","Iroko","Padauk","Purpleheart",
  // you can keep adding exotics here later and it flows through
];

export const METALS = [
  "None",
  // Gold variants (back, multiple)
  "Gold (24K Leaf Accents)","Gold (18K Leaf Accents)","Gold (Foil/Flake Inlay)","Gold (Edge Band)",
  // Copper variants (multiple)
  "Copper (Solid Bar Inlay)","Copper (Rod / Piping Edge)","Copper (Hammered Accents)","Copper (Patina Verde)",
  // Other metals
  "Brass (Solid Inlay)","Brass (Edge Band)","Bronze (Patinated Accents)",
  "Stainless Steel (Brushed)","Stainless Steel (Mirror)","Aluminum (Brushed)"
];

export const RESIN_PATTERNS = ["None","River","Marble Swirl","Vein Inlay","Window Inlay"];
export const EDGE_STYLES = ["Standard","Live Edge","Chamfer","Roundover","Bevel"];
export const FINISHES = ["Natural Oil","Hardwax Oil (Matte)","Satin Poly","High-Gloss Poly","Two-Part Urethane"];
export const CRYSTAL_MODES = ["None","Embedded Nodes","Removable Nodes","Under-surface Array"];

// Category → specific option sets (keeps Custom in sync with Categories)
export const CATEGORY_OPTIONS: Record<string, {
  woods?: string[];
  metals?: string[];
  resin?: string[];
  edges?: string[];
  finishes?: string[];
  crystals?: string[];
  sizeHints?: string; // small UX hint text
}> = {
  "tables": { woods: WOODS, metals: METALS, resin: RESIN_PATTERNS, edges: EDGE_STYLES, finishes: FINISHES, crystals: CRYSTAL_MODES, sizeHints: "Length/Width/Thickness" },
  "conference-tables": { woods: WOODS, metals: METALS, resin: RESIN_PATTERNS, edges: EDGE_STYLES, finishes: FINISHES, crystals: CRYSTAL_MODES, sizeHints: "Length/Width (power box cutouts optional)" },
  "wall-panels": { woods: WOODS, metals: METALS, resin: ["None","Vein Inlay","Window Inlay"], finishes: FINISHES, crystals: CRYSTAL_MODES, sizeHints: "Panel height/width/pattern repeat" },
  "floating-shelves": { woods: WOODS, metals: METALS, edges: EDGE_STYLES, finishes: FINISHES, crystals: ["None","Embedded Nodes"], sizeHints: "Length/Depth/Thickness, weight rating" },
  "cabinetry": { woods: WOODS, metals: ["None","Brass (Solid Inlay)","Stainless Steel (Brushed)","Aluminum (Brushed)"], finishes: FINISHES, sizeHints: "Run length, door/drawer layout" },
  "interior-trim": { woods: WOODS, metals: ["None","Brass (Edge Band)","Bronze (Patinated Accents)"], finishes: FINISHES, sizeHints: "Linear footage, profile style" },
  "lighting": { woods: WOODS, metals: METALS, finishes: FINISHES, crystals: CRYSTAL_MODES, sizeHints: "Fixture span/height, lumen goals" },
  "benches": { woods: WOODS, metals: METALS, edges: EDGE_STYLES, finishes: FINISHES, sizeHints: "Length/Depth/Seat height" },
  "tops": { woods: WOODS, metals: METALS, resin: RESIN_PATTERNS, finishes: FINISHES, sizeHints: "Length/Width/Thickness" },
  "doors": { woods: WOODS, metals: METALS, finishes: FINISHES, edges: ["Standard","Chamfer","Bevel"], sizeHints: "Width/Height/Thickness, swing/track" },
  "stairs": { woods: WOODS, metals: ["None","Stainless Steel (Brushed)","Brass (Solid Inlay)","Bronze (Patinated Accents)"], finishes: FINISHES, sizeHints: "Rise/run/tread count, railing type" },
  "beds": { woods: WOODS, metals: METALS, finishes: FINISHES, sizeHints: "Size (Queen/King/etc.), headboard height" },
  "media": { woods: WOODS, metals: METALS, finishes: FINISHES, sizeHints: "Overall length/height, device bays" },
  "reception-desks": { woods: WOODS, metals: METALS, resin: ["None","Window Inlay","Marble Swirl"], finishes: FINISHES, crystals: CRYSTAL_MODES, sizeHints: "Overall footprint, front elevation" },

  export function getCategory(slug: string) {
  return CATEGORIES.find(c => c.slug === slug);
}

export function listCategories() {
  return CATEGORIES;
}
