// src/lib/catalog.ts

// ---------- Types ----------
export type Category =
  | "Tables"
  | "Wall Panels"
  | "Floating Shelves"
  | "Cabinetry"
  | "Interior Trim / Moulding"
  | "Benches & Seating"
  | "Media Walls"
  | "Reception Desks"
  | "Conference Tables"
  | "Bar / Counter Tops"
  | "Fixtures & Displays"
  | "Altars & Sanctuaries"
  | "Doors & Room Dividers";

export type CatalogItem = {
  slug: string;
  title: Category;
  blurb: string;
};

export type CategoryOptionSet = {
  woods?: string[];
  metals?: string[];
  resin?: string[];
  edge?: string[];
  finishes?: string[];
  crystals?: string[];
  sizeHints?: string;
};

// ---------- Option Pools (shared) ----------
export const WOODS = [
  // Common domestics
  "Walnut",
  "White Oak",
  "Red Oak",
  "Maple (Hard)",
  "Cherry",
  "Ash",
  "Hickory",
  "Birch",
  "Pine (Clear)",
  // Exotics (bring-back pack)
  "African Mahogany",
  "Sapele",
  "Iroko",
  "Teak",
  "Padauk",
  "Zebrawood",
  "Wenge",
  "Purpleheart",
  "Bubinga",
  "Rosewood (compliant sources only)"
];

export const METALS = [
  // Gold family (multiple ways)
  "Gold (24K Leaf Accents)",
  "Gold (18K Leaf Accents)",
  "Gold (Foil/Flake Inlay)",
  // Copper family (multiple ways)
  "Copper (Solid Bar Inlay)",
  "Copper (Rod / Piping Edge)",
  "Copper (Hammered Accents)",
  "Copper (Patina Verdigris)",
  // Other metals
  "Brass (Brushed)",
  "Bronze (Oil-Rubbed)",
  "Stainless (Polished)",
  "Stainless (Brushed)",
  "Blackened Steel",
  "Aluminum (Brushed)",
  "None"
];

export const RESIN_PATTERNS = [
  "None",
  "River",
  "Galaxy Swirl",
  "Marble Vein",
  "Metallic Flake",
  "Crystal Window",
  "Glow Inlay"
];

export const EDGE_STYLES = [
  "Square",
  "Rounded",
  "Beveled",
  "Live Edge",
  "Chamfer Heavy",
  "Bullnose"
];

export const FINISHES = [
  "Matte Oil",
  "Satin Poly",
  "High-Gloss Poly",
  "Hardwax Oil",
  "Nano-Ceramic Topcoat"
];

export const CRYSTAL_MODES = [
  "None",
  "Amethyst Points",
  "Clear Quartz Points",
  "Selenite Inlay",
  "Smoky Quartz Inlay"
];

// ---------- Catalog (for the grid/cards) ----------
export const CATEGORIES: CatalogItem[] = [
  { slug: "tables", title: "Tables", blurb: "Dining, coffee, console, side, writing — slab or laminated." },
  { slug: "conference-tables", title: "Conference Tables", blurb: "Boardroom centerpieces with power grommets and cable management." },
  { slug: "bar-tops", title: "Bar / Counter Tops", blurb: "Commercial bars and residential counters; sanitary edges & finishes." },
  { slug: "wall-panels", title: "Wall Panels", blurb: "Acoustic, fluted, geometric, sacred-tech motifs, backlit options." },
  { slug: "floating-shelves", title: "Floating Shelves", blurb: "Hidden brackets, LED underglow, live edge or crisp modern." },
  { slug: "cabinetry", title: "Cabinetry", blurb: "Kitchens, vanities, built-ins, shop-fitted media & storage." },
  { slug: "interior-trim", title: "Interior Trim / Moulding", blurb: "Casing, crown, wainscot, coffered ceilings, custom profiles." },
  { slug: "benches", title: "Benches & Seating", blurb: "Entry benches, banquettes, dining benches, outdoor seating." },
  { slug: "media", title: "Media Walls", blurb: "Fireplace/media combos, fluted panels, stone or resin inlays." },
  { slug: "reception-desks", title: "Reception Desks", blurb: "Lobby statement pieces, curved faces, lighting and metal bands." },
  { slug: "fixtures", title: "Fixtures & Displays", blurb: "Retail tables, shelving, cash wraps, product pedestals." },
  { slug: "altars", title: "Altars & Sanctuaries", blurb: "Ceremonial tables, crystal grids, meditation installations." },
  { slug: "doors-dividers", title: "Doors & Room Dividers", blurb: "Slab, paneled, shoji-inspired, acoustical & decorative dividers." }
];

// ---------- Per-category option visibility ----------
export const CATEGORY_OPTIONS: Record<string, CategoryOptionSet> = {
  "tables": {
    woods: WOODS,
    metals: METALS,
    resin: RESIN_PATTERNS,
    edge: EDGE_STYLES,
    finishes: FINISHES,
    crystals: CRYSTAL_MODES,
    sizeHints: "Overall L×W×H, seating count, base/leg style"
  },
  "conference-tables": {
    woods: WOODS,
    metals: METALS,
    resin: ["None","River","Galaxy Swirl","Marble Vein"],
    edge: EDGE_STYLES,
    finishes: FINISHES,
    sizeHints: "Overall L×W, power/data grommets, base style"
  },
  "bar-tops": {
    woods: WOODS,
    metals: METALS,
    resin: ["None","Marble Vein","Metallic Flake","Glow Inlay"],
    edge: ["Square","Beveled","Bullnose"],
    finishes: ["Satin Poly","High-Gloss Poly","Nano-Ceramic Topcoat"],
    sizeHints: "Run length, depth, overhang, service counter"
  },
  "wall-panels": {
    woods: WOODS,
    metals: ["Brass (Brushed)","Bronze (Oil-Rubbed)","Blackened Steel","Aluminum (Brushed)","Gold (Foil/Flake Inlay)","Copper (Patina Verdigris)","None"],
    resin: ["None","Glow Inlay","Marble Vein"],
    finishes: FINISHES,
    crystals: ["None","Selenite Inlay","Clear Quartz Points"],
    sizeHints: "Wall width/height, pattern type (fluted, slat, geometric), lighting"
  },
  "floating-shelves": {
    woods: WOODS,
    metals: ["Brass (Brushed)","Blackened Steel","Stainless (Brushed)","None"],
    finishes: FINISHES,
    sizeHints: "Span length, depth, load rating, LED underglow"
  },
  "cabinetry": {
    woods: WOODS,
    metals: ["Brass (Brushed)","Bronze (Oil-Rubbed)","Stainless (Brushed)","Blackened Steel","Gold (Foil/Flake Inlay)","None"],
    finishes: ["Matte Oil","Satin Poly","Hardwax Oil","Nano-Ceramic Topcoat"],
    sizeHints: "Run lengths, appliance panels, door style, drawers vs. doors"
  },
  "interior-trim": {
    woods: ["White Oak","Red Oak","Maple (Hard)","Poplar","Pine (Clear)","Sapele","Walnut"],
    metals: ["None","Brass (Brushed)","Blackened Steel"],
    finishes: ["Matte Oil","Satin Poly","Hardwax Oil"],
    sizeHints: "Linear feet per profile, profile height/depth, rooms"
  },
  "benches": {
    woods: WOODS,
    metals: METALS,
    edge: EDGE_STYLES,
    finishes: FINISHES,
    sizeHints: "Length, depth, base style, indoor/outdoor"
  },
  "media": {
    woods: WOODS,
    metals: METALS,
    finishes: FINISHES,
    sizeHints: "Overall length/height, device bays, fireplace surround"
  },
  "reception-desks": {
    woods: WOODS,
    metals: METALS,
    resin: ["None","Window Inlay","Marble Vein"],
    finishes: FINISHES,
    crystals: CRYSTAL_MODES,
    sizeHints: "Overall footprint, front elevation, logo panel, lighting"
  },
  "fixtures": {
    woods: WOODS,
    metals: METALS,
    finishes: FINISHES,
    sizeHints: "Tabletop sizes, shelf spans, load ratings"
  },
  "altars": {
    woods: WOODS,
    metals: METALS,
    resin: ["None","Galaxy Swirl","Crystal Window","Glow Inlay"],
    finishes: FINISHES,
    crystals: CRYSTAL_MODES,
    sizeHints: "Footprint, height, crystal grid layout"
  },
  "doors-dividers": {
    woods: WOODS,
    metals: ["Blackened Steel","Brass (Brushed)","Aluminum (Brushed)","None"],
    finishes: FINISHES,
    sizeHints: "Door slab size or divider width/height, panel pattern"
  }
};

// ---------- Small helpers ----------
export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function listCategories() {
  return CATEGORIES;
}

export function getOptionsFor(slug: string): CategoryOptionSet {
  return CATEGORY_OPTIONS[slug] ?? {};
}
