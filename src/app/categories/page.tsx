import Link from "next/link";

const wrap={maxWidth:1100,margin:"0 auto",padding:"64px 20px"};
const card={background:"rgba(255,255,255,.03)",border:"1px solid #2a2a2a",borderRadius:16,padding:16} as React.CSSProperties;

import Link from "next/link";
import { BUILD_TYPES, SUBTYPES, toSlug } from "@/lib/catalog";

// inside your component's JSX where you map categories:
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {BUILD_TYPES.map((type) => (
    <div key={type} className="rounded-xl border border-white/10 bg-black/40 p-5">
      <h3 className="text-xl font-semibold text-[#E8C987]">{type}</h3>

      <ul className="mt-3 text-sm text-neutral-300 space-y-1">
        {SUBTYPES[type].map((sub) => (
          <li key={sub} className="opacity-80">• {sub}</li>
        ))}
      </ul>

      <div className="mt-5 flex gap-3">
        <Link
          href={`/custom?type=${encodeURIComponent(type)}`}
          className="px-4 py-2 rounded-lg bg-[#E8C987] text-black font-semibold hover:opacity-90 transition"
        >
          Customize this Category
        </Link>
        <Link
          href={`/work?filter=${toSlug(type)}`}
          className="px-4 py-2 rounded-lg border border-[#E8C987] text-[#E8C987] hover:bg-[#E8C987] hover:text-black transition"
        >
          See Examples
        </Link>
      </div>
    </div>
  ))}
</div>

export default function Categories(){
  return (
    <main style={wrap}>
      <h1 style={{fontSize:34,fontWeight:800}}>Browse by Category</h1>
      <p style={{color:"#cfcfcf",marginTop:8,lineHeight:1.7}}>
        Explore our most requested builds. Each category links to examples and can be configured in the Custom page.
      </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

