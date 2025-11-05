// src/lib/catalog.ts
/* Shared catalog + pricing for BOTH /categories and /custom */

export type Unit = "item" | "sqft" | "lf";

export type Category = {
  slug: string;
  label: string;
  blurb: string;
  unit: Unit;
  base: number;               // base price per unit (item/sqft/lf)
  show: {
    dimensions?: boolean;     // width/length/thickness
    edge?: boolean;
    resin?: boolean;
    geometry?: boolean;
    lighting?: boolean;
    cabinetry?: boolean;      // fronts + hardware + linear feet
  };
  // fields excluded for this category
  hide?: {
    thickness?: boolean;
  };
};

export const WOODS = [
  "Pine","Ash","Red Oak","White Oak","Maple","Cherry","Walnut",
  "African Mahogany","Sapele","Teak","Iroko",
  "Wenge","Padauk","Zebrawood","Purpleheart","Bubinga",
  "Rosewood (where legal/compliant)"
] as const;

export const METALS = [
  "None",
  "Gold (24K Leaf Accents)","Gold (18K Leaf Accents)","Gold (Foil/Flake Inlay)",
  "Copper (Solid Bar Inlay)","Copper (Rod / Piping Edge)","Copper (Hammered Accents)",
  "Brass (Polished)","Brass (Satin)","Bronze (Oil-Rubbed)",
  "Stainless (Brushed)","Aluminum (Brushed)"
] as const;

export const EDGE_STYLES = ["Square","Chamfer","Roundover","Live Edge"] as const;
export const RESIN_PATTERNS = ["None","River","Vein / Marble","Cells / Lacing"] as const;
export const FINISHES = ["Natural Oil","Hardwax Oil (Matte)","Satin Poly","High-Gloss"] as const;
export const GEOMETRIES = ["None","Seed of Life","Sri Yantra","Metatron Grid","Hex Weave","Diamond Quads"] as const;
export const LIGHTING = ["None","Backlit Panel","Resonance Sconce","Edge Glow","Undershelf Glow"] as const;
export const CABINET_FRONTS = ["Shaker","Slab","Inset Frame","Fluted","Slatted"] as const;
export const HARDWARE = ["Minimal (Hidden)","Black Matte","Brass","Bronze","Stainless"] as const;

// master catalog used by BOTH pages
export const CATALOG: Category[] = [
  // TABLES
  { slug:"dining-table", label:"Dining Tables", unit:"sqft", base: 95,
    blurb:"Heirloom dining tables in premium hardwoods; live edge, resin rivers, metals, and sacred geometry available.",
    show:{ dimensions:true, edge:true, resin:true, geometry:true } },
  { slug:"coffee-table", label:"Coffee Tables", unit:"sqft", base: 85,
    blurb:"Statement coffee tables with precise joinery, optional resin inlays and metal accents.",
    show:{ dimensions:true, edge:true, resin:true, geometry:true } },
  { slug:"end-table", label:"Side / End Tables", unit:"item", base: 450,
    blurb:"Compact, sculptural pieces for living spaces; live edge available.",
    show:{ dimensions:true, edge:true, geometry:true }, hide:{ thickness:true } },
  { slug:"console-table", label:"Console Tables", unit:"sqft", base: 90,
    blurb:"Slim, elegant consoles for entries and halls with optional metal accents.",
    show:{ dimensions:true, edge:true, geometry:true } },
  { slug:"conference-table", label:"Conference Tables", unit:"sqft", base: 125,
    blurb:"Boardroom-grade builds with resin rivers, cable channels, and metal options.",
    show:{ dimensions:true, edge:true, resin:true, geometry:true } },
  { slug:"desk", label:"Desks & Consoles", unit:"sqft", base: 95,
    blurb:"Work surfaces with ergonomic sizing; metal leg systems sold separately.",
    show:{ dimensions:true, edge:true, geometry:true } },
  { slug:"live-edge", label:"Live-Edge Slab", unit:"sqft", base: 105,
    blurb:"Natural-edge slabs finished for dining, desks, or bars.",
    show:{ dimensions:true, edge:true, geometry:true } },
  { slug:"epoxy-river", label:"Epoxy River", unit:"sqft", base: 115,
    blurb:"River tables with transparent/opaque flows; metals and crystals optional.",
    show:{ dimensions:true, edge:true, resin:true, geometry:true } },

  // PANELS / LIGHTING / RAILS
  { slug:"wall-panel", label:"Wall Panels", unit:"sqft", base: 85,
    blurb:"Acoustic/sacred geometry panels; optional backlighting and metal inlays.",
    show:{ dimensions:true, geometry:true, lighting:true } },
  { slug:"wall-light", label:"Wall Lights", unit:"item", base: 750,
    blurb:"Custom resonance sconces and backlit totems in wood/metal.",
    show:{ lighting:true, geometry:true } },
  { slug:"rails-shelves", label:"Rails & Shelves", unit:"item", base: 350,
    blurb:"Floating shelves and rail systems; edge styles and lighting available.",
    show:{ dimensions:true, lighting:true } },

  // BENCHES / ALTARS / FRAMES / TRAYS
  { slug:"bench-altar", label:"Benches & Altars", unit:"item", base: 900,
    blurb:"Seating and ceremonial builds honoring proportion and resonance.",
    show:{ dimensions:true, edge:true, geometry:true } },
  { slug:"mirror-frame", label:"Mirrors & Frames", unit:"item", base: 380,
    blurb:"Premium frames with sacred geometry motifs or metal fillets.",
    show:{ edge:true, geometry:true } },
  { slug:"tray-accessory", label:"Trays & Accessories", unit:"item", base: 180,
    blurb:"Small goods with tasteful geometry, resin, and metal details.",
    show:{ edge:true, resin:true, geometry:true } },

  // CABINETRY / TRIM / COUNTERS / SEATING / OUTDOOR
  { slug:"cabinetry", label:"Cabinetry", unit:"lf", base: 420,
    blurb:"Custom fronts, boxes, and hardware. Linear-feet pricing; finishes and install scoped separately.",
    show:{ cabinetry:true } },
  { slug:"interior-trim", label:"Interior Trim / Moulding", unit:"lf", base: 22,
    blurb:"Casing, crown, base, wainscot; premium hardwood profiles available.",
    show:{}, hide:{ thickness:true } },
  { slug:"counter-bartop", label:"Counters & Bar Tops", unit:"sqft", base: 110,
    blurb:"Butcherblock, slab, or resin; lighting and metal inlays optional.",
    show:{ dimensions:true, edge:true, resin:true, geometry:true, lighting:true } },
  { slug:"seating", label:"Seating", unit:"item", base: 680,
    blurb:"Stools and chairs to match your table; joinery-focused builds.",
    show:{ dimensions:true, edge:true } },
  { slug:"outdoor", label:"Outdoor", unit:"sqft", base: 95,
    blurb:"Exterior-rated woods/finishes for patios and sanctuaries.",
    show:{ dimensions:true, edge:true } },
];

// multipliers / adders
const WOOD_MULT: Record<string, number> = {
  Pine:0.8, Ash:1.0, "Red Oak":1.0, "White Oak":1.2, Maple:1.05, Cherry:1.15, Walnut:1.35,
  "African Mahogany":1.25, Sapele:1.25, Teak:1.9, Iroko:1.4, Wenge:1.7, Padauk:1.6,
  Zebrawood:1.7, Purpleheart:1.5, Bubinga:1.8, "Rosewood (where legal/compliant)":2.2
};

const METAL_ADD: Record<string, number> = {
  "None":0,
  "Gold (24K Leaf Accents)":950, "Gold (18K Leaf Accents)":650, "Gold (Foil/Flake Inlay)":480,
  "Copper (Solid Bar Inlay)":420, "Copper (Rod / Piping Edge)":360, "Copper (Hammered Accents)":280,
  "Brass (Polished)":260, "Brass (Satin)":240, "Bronze (Oil-Rubbed)":250,
  "Stainless (Brushed)":220, "Aluminum (Brushed)":180
};

const COMPLEXITY = {
  sacred:1.12, resinRiver:1.18, resinVein:1.10, liveEdge:1.06, lighting:1.14, cabinet:1.18
};

export function listCategories(){ return CATALOG; }
export function getCategory(slug: string){ return CATALOG.find(c=>c.slug===slug); }

function toNum(v: unknown){ const n = parseFloat(String(v ?? "0")); return Number.isFinite(n)?n:0; }

export type QuoteInput = {
  slug: string;
  width?: number; length?: number; thickness?: number;
  wood?: string; finish?: string; edge?: string; resin?: string;
  geometry?: string; lighting?: string;
  cabinetLF?: number; // linear feet
  metal?: string;
};

export function estimate(input: QuoteInput){
  const cat = getCategory(input.slug);
  if (!cat) return 0;
  let base = cat.base;
  const wood = input.wood && WOOD_MULT[input.wood] ? input.wood : "Ash";
  const metal = input.metal ?? "None";

  // units
  if (cat.unit === "sqft") {
    const sqft = (Math.max(12,toNum(input.width))*Math.max(12,toNum(input.length)))/144;
    base = Math.max(1, sqft) * cat.base;
  }
  if (cat.unit === "lf") {
    const lf = Math.max(10, toNum(input.cabinetLF));
    base = lf * cat.base;
  }

  // wood + metal
  base *= (WOOD_MULT[wood] ?? 1.0);
  base += (METAL_ADD[metal] ?? 0);

  // complexity
  if (input.geometry && input.geometry !== "None") base *= COMPLEXITY.sacred;
  if (input.resin === "River") base *= COMPLEXITY.resinRiver;
  if (input.resin === "Vein / Marble" || input.resin === "Cells / Lacing") base *= COMPLEXITY.resinVein;
  if (input.edge === "Live Edge") base *= COMPLEXITY.liveEdge;
  if (input.lighting && input.lighting !== "None") base *= COMPLEXITY.lighting;
  if (cat.slug === "cabinetry") base *= COMPLEXITY.cabinet;

  if (!cat.hide?.thickness && toNum(input.thickness) >= 2) base *= 1.08;

  // round
  return Math.round(base / 25) * 25;
}

// default set for a category (used by custom page)
export function defaultsFor(slug:string){
  const cat = getCategory(slug) ?? CATALOG[0];
  return {
    slug: cat.slug,
    width: 36, length: 72, thickness: 1.75,
    wood: "Walnut", finish: "Hardwax Oil (Matte)",
    edge: "Square", resin: "None",
    geometry: "None", lighting: "None",
    metal: "None",
    cabinetLF: 24
  };
}
