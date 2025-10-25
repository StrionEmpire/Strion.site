"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
// import your other hooks, components, and styling below
// example: import { useState, useMemo, useEffect } from "react";

export default function ConfiguratorPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading configurator…</div>}>
      <ConfiguratorInner />
    </Suspense>
  );
}

function ConfiguratorInner() {
  const searchParams = useSearchParams();

  // 🧠 all your existing configurator logic goes here:
  // const [wood, setWood] = useState("Walnut");
  // const riverType = searchParams.get("river") || "None";
  // etc...

  return (
    <main style={{ padding: 32 }}>
      <h1>Custom Build Configurator</h1>
      <p>Design and price your own table, furniture, or feature wall.</p>

      {/* keep your existing JSX layout here, 
          such as dropdowns, previews, buttons, etc. */}
    </main>
  );
}
