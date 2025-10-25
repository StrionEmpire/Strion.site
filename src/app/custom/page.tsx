"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Keep this page dynamic so Next doesn't try to pre-render it.
export const dynamic = "force-dynamic"; // ✅
// DO NOT export `revalidate` here.

export default function ConfiguratorPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading configurator…</div>}>
      <ConfiguratorInner />
    </Suspense>
  );
}

function ConfiguratorInner() {
  const searchParams = useSearchParams();

  // TODO: keep your existing configurator state + UI here.
  // Example placeholder UI so the page compiles:
  return (
    <main style={{ padding: 32 }}>
      <h1>Custom Build Configurator</h1>
      <p>Design and price your build.</p>
      {/* paste your existing controls/sections back in here */}
    </main>
  );
}
