// src/lib/catalog.ts

export type Category =
  | "Dining Tables"
  | "Conference Tables"
  | "Coffee Tables"
  | "Side / End Tables"
  | "Console Tables"
  | "Live-Edge Slab"
  | "River Tables"
  | "Work Desks"
  | "Reception Desks"
  | "Wall Panels"
  | "Floating Shelves"
  | "Cabinetry"
  | "Interior Trim / Moulding"
  | "Stairs & Railing"
  | "Benches / Seating"
  | "Beds"
  | "Vanities"
  | "Doors (Interior/Exterior)"
  | "Counter / Bar Tops"
  | "Lighting"
  | "Outdoor Tables"
  | "Resin Art / Inlays";

export const CATEGORIES: { slug: string; title: Category; blurb: string }[] = [
  { slug: "dining-tables",       title: "Dining Tables",       blurb: "Heirloom dining tables in solid hardwoods, with optional resin rivers, metals, and sacred geometry." },
  { slug: "conference-tables",   title: "Conference Tables",   blurb: "Statement conference tables for boardrooms and collaboration spaces; power & cable mgmt ready." },
  { slug: "coffee-tables",       title: "Coffee Tables",       blurb: "Centerpiece coffee tables—classic slabs, river styles, or geometric inlays." },
  { slug: "side-end-tables",     title: "Side / End Tables",   blurb: "Pairable side tables and nightstands, sized and finished to your space." },
  { slug: "console-tables",      title: "Console Tables",      blurb: "Entry and sofa-back consoles with metal accents, stone/crystal options." },
  { slug: "live-edge",           title: "Live-Edge Slab",      blurb: "Single-slab live edge builds—bookmatched options available." },
  { slug: "river-tables",        title: "River Tables",        blurb: "Epoxy river, delta, whirl, and negative-space patterns with metallic or stone loads optional." },
  { slug: "work-desks",          title: "Work Desks",          blurb: "Executive and sit/stand desks with cable pass-throughs and drawer options." },
  { slug: "reception-desks",     title: "Reception Desks",     blurb: "Brand-forward reception desks—lighting and logo inlays supported." },
  { slug: "wall-panels",         title: "Wall Panels",         blurb: "Acoustic, sacred-geometry, and feature panels in wood/metal/crystal blends." },
  { slug: "floating-shelves",    title: "Floating Shelves",    blurb: "Invisible-mount shelves in matching species and finishes." },
  { slug: "cabinetry",           title: "Cabinetry",           blurb: "Custom built-ins, kitchen islands, and media walls." },
  { slug: "trim",                title: "Interior Trim / Moulding", blurb: "Casing, crown, base, coffered ceilings, and feature millwork." },
  { slug: "stairs-railing",      title: "Stairs & Railing",    blurb: "Treads, stringers, handrails—wood/metal/glass hybrid options." },
  { slug: "benches-seating",     title: "Benches / Seating",   blurb: "Entry, dining, outdoor, and meditation benches." },
  { slug: "beds",                title: "Beds",                 blurb: "Platform frames, headboards, floating designs, hidden lighting." },
  { slug: "vanities",            title: "Vanities",            blurb: "Solid wood vanities, stone tops optional, integrated lighting." },
  { slug: "doors",               title: "Doors (Interior/Exterior)", blurb: "Slab, pivot, and panel doors—metallic and crystal inlays optional." },
  { slug: "bar-tops",            title: "Counter / Bar Tops",  blurb: "Commercial/residential tops with food-safe finishes." },
  { slug: "lighting",            title: "Lighting",            blurb: "Energetic lighting—wood/metal bodies with crystal/tone integration." },
  { slug: "outdoor-tables",      title: "Outdoor Tables",      blurb: "Weather-ready finishes, hardwood or composite hybrids." },
  { slug: "resin-art",           title: "Resin Art / Inlays",  blurb: "Inlays, logos, sacred patterns—subtle to statement." },
];

// Core option pools (used by Configurator + Category pages)
export const WOODS = [
  "White Oak","Red Oak","Walnut","Maple","Cherry","Ash","Hickory",
  "Cedar","Pine","Poplar",
  // exotics
  "Sapele","Iroko","Padauk","Wenge","Zebrawood","Purpleheart","Teak","Mahogany"
] as const;

export const METALS = [
  "None",
  "Gold (24K Leaf Accents)",
  "Gold (18K Leaf Accents)",
  "Gold (Foil/Flake Inlay)",
  "Copper (Solid Bar Inlay)",
  "Copper (Rod / Piping Edge)",
  "Copper (Hammered Accents)",
  "Brass (Solid Band / Inlay)",
  "Brass (Perforated Grill)",
  "Bronze (Patinated Accents)",
  "Stainless Steel (Satin)",
  "Blackened Steel",
  "Aluminum (Brushed)"
] as const;

export const RESIN_PATTERNS = [
  "None","River","Delta","Whirlpool","Vein","Celestial Dust","Negative Space"
] as const;

export const EDGE_STYLES = [
  "Square","Chamfer","Roundover","Live Edge"
] as const;

export const FINISHES = [
  "Natural Matte","Satin","Gloss","Hand-Rubbed Oil","Food-Safe Oil/Wax","Outdoor Marine"
] as const;

export const CRYSTAL_MODES = [
  "None","Subtle Embed","Visible Accent","Grid Array (Panel/Lighting)"
] as const;

// Per-category option visibility (keeps Configurator in sync with Categories)
export const CATEGORY_OPTIONS: Record<Category, {
  woods?: readonly string[];
  metals?: readonly string[];
  resinPatterns?: readonly string[];
  edgeStyles?: readonly string[];
  finishes?: readonly string[];
  crystals?: readonly string[];
  sizeUnits?: "in" | "cm";
  defaults?: Partial<{
    wood: string;
    metal: string;
    resinPattern: string;
    edgeStyle: string;
    finish: string;
    crystals: string;
  }>;
}> = {
  "Dining Tables":            { woods: WOODS, metals: METALS, resinPatterns: RESIN_PATTERNS, edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: CRYSTAL_MODES, sizeUnits: "in", defaults: { finish: "Satin" } },
  "Conference Tables":        { woods: WOODS, metals: METALS, resinPatterns: RESIN_PATTERNS, edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: CRYSTAL_MODES, sizeUnits: "in", defaults: { metal: "Brass (Solid Band / Inlay)" } },
  "Coffee Tables":            { woods: WOODS, metals: METALS, resinPatterns: RESIN_PATTERNS, edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: CRYSTAL_MODES, sizeUnits: "in" },
  "Side / End Tables":        { woods: WOODS, metals: METALS, resinPatterns: RESIN_PATTERNS, edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: CRYSTAL_MODES, sizeUnits: "in" },
  "Console Tables":           { woods: WOODS, metals: METALS, resinPatterns: RESIN_PATTERNS, edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: CRYSTAL_MODES, sizeUnits: "in" },
  "Live-Edge Slab":           { woods: WOODS, metals: METALS, resinPatterns: ["None"], edgeStyles: ["Live Edge"], finishes: FINISHES, crystals: CRYSTAL_MODES, sizeUnits: "in", defaults: { resinPattern: "None", edgeStyle: "Live Edge" } },
  "River Tables":             { woods: WOODS, metals: METALS, resinPatterns: RESIN_PATTERNS.filter(p=>p!=="None"), edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: CRYSTAL_MODES, sizeUnits: "in", defaults: { resinPattern: "River" } },
  "Work Desks":               { woods: WOODS, metals: METALS, resinPatterns: ["None","Vein","Celestial Dust"], edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: CRYSTAL_MODES },
  "Reception Desks":          { woods: WOODS, metals: METALS, resinPatterns: ["None","Vein","Celestial Dust","Negative Space"], edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: CRYSTAL_MODES },
  "Wall Panels":              { woods: WOODS, metals: METALS, resinPatterns: ["None","Celestial Dust","Negative Space"], edgeStyles: ["Square","Chamfer","Roundover"], finishes: FINISHES, crystals: ["None","Subtle Embed","Grid Array (Panel/Lighting)"], sizeUnits: "in" },
  "Floating Shelves":         { woods: WOODS, metals: ["None","Brass (Solid Band / Inlay)","Blackened Steel"], resinPatterns: ["None","Vein"], edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: ["None","Subtle Embed"] },
  "Cabinetry":                { woods: WOODS, metals: ["None","Brass (Solid Band / Inlay)","Blackened Steel"], resinPatterns: ["None","Vein"], edgeStyles: ["Square","Chamfer","Roundover"], finishes: FINISHES, crystals: ["None","Subtle Embed"] },
  "Interior Trim / Moulding": { woods: WOODS, metals: ["None","Brass (Solid Band / Inlay)"], resinPatterns: ["None"], edgeStyles: ["Square","Chamfer","Roundover"], finishes: FINISHES, crystals: ["None"] },
  "Stairs & Railing":         { woods: WOODS, metals: ["None","Brass (Solid Band / Inlay)","Blackened Steel","Stainless Steel (Satin)"], resinPatterns: ["None"], edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: ["None","Subtle Embed"] },
  "Benches / Seating":        { woods: WOODS, metals: METALS, resinPatterns: ["None","Vein"], edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: ["None","Subtle Embed"] },
  "Beds":                     { woods: WOODS, metals: ["None","Brass (Solid Band / Inlay)","Blackened Steel"], resinPatterns: ["None","Vein"], edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: ["None","Subtle Embed"] },
  "Vanities":                 { woods: WOODS, metals: ["None","Brass (Solid Band / Inlay)","Blackened Steel"], resinPatterns: ["None","Vein"], edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: ["None"] },
  "Doors (Interior/Exterior)":{ woods: WOODS, metals: ["None","Brass (Solid Band / Inlay)","Blackened Steel"], resinPatterns: ["None","Vein","Negative Space"], edgeStyles: ["Square","Chamfer","Roundover"], finishes: FINISHES, crystals: ["None","Subtle Embed","Visible Accent"] },
  "Counter / Bar Tops":       { woods: WOODS, metals: METALS, resinPatterns: ["None","Vein","Celestial Dust"], edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: ["None","Subtle Embed"] },
  "Lighting":                 { woods: WOODS, metals: METALS, resinPatterns: ["None","Celestial Dust"], edgeStyles: ["Square","Roundover"], finishes: FINISHES, crystals: ["None","Visible Accent","Grid Array (Panel/Lighting)"] },
  "Outdoor Tables":           { woods: ["Teak","Mahogany","Iroko","Sapele","Cedar","White Oak"] as const, metals: ["None","Stainless Steel (Satin)","Aluminum (Brushed)"] as const, resinPatterns: ["None","Vein"], edgeStyles: EDGE_STYLES, finishes: ["Outdoor Marine"] as const, crystals: ["None"] as const },
  "Resin Art / Inlays":       { woods: WOODS, metals: METALS, resinPatterns: ["Vein","Celestial Dust","Negative Space"], edgeStyles: EDGE_STYLES, finishes: FINISHES, crystals: CRYSTAL_MODES },
};

// Helper for Categories page (keeps your existing call working)
export function listCategories() {
  return CATEGORIES;
}
