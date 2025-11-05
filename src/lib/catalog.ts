// src/lib/catalog.ts
export type BuildType =
  | "Table"
  | "Wall Panel"
  | "Floating Shelves"
  | "Cabinetry"
  | "Interior Trim / Moulding"
  | "Lighting"
  | "Bench / Seating"
  | "Counter / Bar Top"
  | "Railings / Stairs"
  | "Doors & Portals"
  | "Headboard"
  | "Altars / Shrines"
  | "Signage & Plaques";

export const BUILD_TYPES: BuildType[] = [
  "Table",
  "Wall Panel",
  "Floating Shelves",
  "Cabinetry",
  "Interior Trim / Moulding",
  "Lighting",
  "Bench / Seating",
  "Counter / Bar Top",
  "Railings / Stairs",
  "Doors & Portals",
  "Headboard",
  "Altars / Shrines",
  "Signage & Plaques",
];

// Subtypes per build type (used by /categories and /custom)
export const SUBTYPES: Record<BuildType, string[]> = {
  Table: [
    "Live-Edge Slab",
    "River (Epoxy)",
    "Bookmatched",
    "Round / Pedestal",
    "Conference",
    "Coffee",
    "Dining",
    "Console",
    "End / Side",
    "Desk",
  ],
  "Wall Panel": [
    "Sacred Geometry Panel",
    "Acoustic Slat Panel",
    "Selenite / Crystal Light Panel",
    "Carved Relief Panel",
  ],
  "Floating Shelves": [
    "Hidden-Bracket",
    "Live-Edge Shelf",
    "Metal-Edged Shelf",
  ],
  Cabinetry: [
    "Custom Face-Frame",
    "Flat-Panel Modern",
    "Glass Display",
  ],
  "Interior Trim / Moulding": [
    "Crown / Base / Casing",
    "Wainscoting",
    "Coffered Ceiling",
  ],
  Lighting: [
    "Pendant Cluster",
    "Wall Sconce",
    "Panel Backlight",
    "Chandelier Feature",
  ],
  "Bench / Seating": [
    "Entry Bench",
    "Dining Bench",
    "Meditation Bench",
  ],
  "Counter / Bar Top": [
    "Live-Edge Counter",
    "Epoxy Inlay Top",
    "Solid Hardwood Top",
  ],
  "Railings / Stairs": [
    "Solid Tread Caps",
    "Metal & Wood Rails",
  ],
  "Doors & Portals": [
    "Solid Slab Door",
    "Carved Entry",
    "Resin Inlay Door",
  ],
  Headboard: [
    "Live-Edge Headboard",
    "Panel Headboard",
  ],
  "Altars / Shrines": [
    "Temple Table",
    "Wall Altar",
  ],
  "Signage & Plaques": [
    "Carved Logo",
    "Gilded Plaque",
  ],
};

// Woods (add more anytime)
export const WOODS = [
  // Common domestics
  "Walnut", "White Oak", "Red Oak", "Hard Maple", "Cherry", "Hickory", "Ash", "Pine", "Cedar",
  // Exotics (kept general for breadth)
  "Sapele", "Padauk", "Purpleheart", "Wenge", "Zebrawood", "Bubinga", "Teak", "Mahogany (Genuine)",
];

// Metals (includes your gold + copper variants)
export const METALS = [
  "None",
  "Gold (24K Leaf Accents)",
  "Gold (18K Leaf Accents)",
  "Gold (Foil / Flake Inlay)",
  "Copper (Solid Bar Inlay)",
  "Copper (Rod / Piping Edge)",
  "Copper (Hammered Accents)",
  "Brass (Satin)",
  "Bronze (Oil-Rubbed)",
  "Stainless Steel (Brushed)",
  "Blackened Steel (Patina)",
  "Aluminum (Brushed)",
];

// Edge styles, resin patterns, finishes reused
export const EDGE_STYLES = ["Live Edge", "Straight", "Chamfered", "Eased"] as const;
export const RESIN_PATTERNS = ["None", "River", "Vein", "Cellular / Lacing", "Galaxy"] as const;
export const FINISHES = ["Matte", "Satin", "Semi-Gloss", "High-Gloss"] as const;

// Helper: safe slug for URLs/queries
export const toSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
