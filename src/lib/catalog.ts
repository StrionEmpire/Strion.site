export const BUILD_TYPES = [
  "Tables",
  "Wall Panels",
  "Wall Lights",
  "Rails & Shelves",
  "Benches & Altars",
  "Mirrors & Frames",
  "Trays & Accessories",
  "Cabinetry",
  "Interior Trim / Moulding",
  "Counters & Bar Tops",
  "Desks & Consoles",
  "Seating",
  "Outdoor",
] as const;

type BuildType = (typeof BUILD_TYPES)[number];

export const SUBTYPES: Record<BuildType, string[]> = {
  "Tables": ["Dining", "Coffee", "Side", "Console", "Conference", "Live-Edge Slab", "Epoxy River"],
  "Wall Panels": ["Geometric Panels", "Sacred Geometry Panels", "Acoustic Panels"],
  "Wall Lights": ["Sconces", "Resonance Lighting", "Panel Backlighting"],
  "Rails & Shelves": ["Floating Shelves", "Handrails", "Mantels"],
  "Benches & Altars": ["Entry Benches", "Meditation Altars", "Display Plinths"],
  "Mirrors & Frames": ["Framed Mirrors", "Art Frames", "Profiled Frames"],
  "Trays & Accessories": ["Valet Trays", "Serving Boards", "Desk Sets"],
  "Cabinetry": ["Built-ins", "Media Walls", "Vanities"],
  "Interior Trim / Moulding": ["Casing", "Baseboards", "Coffered Ceilings"],
  "Counters & Bar Tops": ["Kitchen Islands", "Bars", "Reception Tops"],
  "Desks & Consoles": ["Work Desks", "Executive Desks", "Console Tables"],
  "Seating": ["Benches", "Stools", "Banquettes"],
  "Outdoor": ["Tables", "Benches", "Pergola Details"],
};

export function toSlug(s: string) {
  return s.toLowerCase().replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, "");
}
