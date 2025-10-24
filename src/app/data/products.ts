export type Product = {
  slug: string;
  title: string;
  line: "Signature"|"Core"|"Accessory";
  starting: number; // USD
  image: string; // /public path
  blurb: string;
  tags: string[];
};
export const products: Product[] = [
  { slug:"resonance-table", title:"Resonance Table", line:"Signature", starting:6500, image:"/resonance-table.png",
    blurb:"Live-edge walnut with clear river, copper energy veins, and quartz core for flow and clarity.",
    tags:["dining","walnut","copper","quartz","river"]
  },
  { slug:"abundance-octagon", title:"Abundance Octagon", line:"Signature", starting:8500, image:"/octagon-table.png",
    blurb:"Eight-sided wealth geometry with 24K inlay and citrine medallion for amplified prosperity.",
    tags:["octagon","gold","citrine","meeting","dining"]
  },
  { slug:"selenite-wall-light", title:"Selenite Wall Light", line:"Signature", starting:1600, image:"/selenite-light.png",
    blurb:"Stacked selenite rods in a brass frame—ambient halo for purification and uplift.",
    tags:["lighting","selenite","brass","wall"]
  },
  { slug:"sovereign-conference", title:"Sovereign Conference", line:"Signature", starting:12000, image:"/resonance-table.png",
    blurb:"Commanding conference build with inner copper coil column and legacy-grade joinery.",
    tags:["conference","corporate","walnut","copper"]
  },
  { slug:"atlas-desk", title:"Atlas Desk", line:"Signature", starting:5500, image:"/resonance-table.png",
    blurb:"Executive desk with energy spine and gold linework—clarity and control.",
    tags:["desk","gold","office"]
  },
  { slug:"flux-river", title:"Flux River Table", line:"Core", starting:3200, image:"/resonance-table.png",
    blurb:"Resin river with mineral inlays—movement and stillness in balance.",
    tags:["coffee","dining","river"]
  },
  { slug:"guardian-wall-panel", title:"Guardian Wall Panel", line:"Core", starting:1800, image:"/selenite-light.png",
    blurb:"Copper-lined geometry panel for subtle shielding and aesthetic impact.",
    tags:["wall","panel","copper","geometry"]
  },
  { slug:"meridian-rail", title:"Meridian Rail", line:"Core", starting:2500, image:"/selenite-light.png",
    blurb:"Stair/loft rail with conductive copper pathways—form with function.",
    tags:["rail","stair","copper"]
  },
  { slug:"sanctuary-altar", title:"Sanctuary Altar", line:"Core", starting:1100, image:"/resonance-table.png",
    blurb:"Meditation altar/bench proportioned to sacred ratios for daily practice.",
    tags:["altar","bench","meditation"]
  },
  { slug:"aureate-mirror", title:"Aureate Mirror", line:"Core", starting:1200, image:"/resonance-table.png",
    blurb:"Octagonal gold-lined mirror—presence and poise.",
    tags:["mirror","octagon","gold"]
  },
  { slug:"sigil-coasters", title:"Sigil Coasters (Set of 4)", line:"Accessory", starting:68, image:"/resonance-table.png",
    blurb:"Gold crest coasters for subtle resonance at the table.",
    tags:["coasters","gift"]
  },
  { slug:"crest-charging-disk", title:"Crest Charging Disk", line:"Accessory", starting:180, image:"/resonance-table.png",
    blurb:"Copper spiral + quartz charging plate for small items.",
    tags:["charging","copper","quartz"]
  },
  { slug:"resonant-tray", title:"Resonant Tray", line:"Accessory", starting:240, image:"/resonance-table.png",
    blurb:"Walnut tray with brass inlay for ritual or service.",
    tags:["tray","walnut","brass"]
  },
  { slug:"grid-candle-plate", title:"Grid Candle Plate", line:"Accessory", starting:120, image:"/resonance-table.png",
    blurb:"3-6-9 engraving for evening alignment.",
    tags:["candle","engraved"]
  },
  { slug:"harmonic-frame", title:"Harmonic Frame", line:"Accessory", starting:280, image:"/resonance-table.png",
    blurb:"Layered geometry wall frame—quiet strength.",
    tags:["frame","wall"]
  }
];
