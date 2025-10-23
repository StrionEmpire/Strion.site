// src/app/custom/page.tsx
"use client";

import { useState } from "react";

export default function CustomPage() {
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setMsg(res.ok ? "Thanks — we received your blueprint." : "Something went wrong.");
    (e.target as HTMLFormElement).reset();
  }

  const label: React.CSSProperties = { fontSize: 12, color: "#bdbdbd", marginBottom: 6, display: "block" };
  const input: React.CSSProperties = { width: "100%", borderRadius: 10, padding: "10px 12px", background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#eee" };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "64px 20px" }}>
      <h1 style={{ fontSize: 30, fontWeight: 700 }}>Custom Builds</h1>
      <p style={{ color: "#cfcfcf", marginTop: 8 }}>
        Tell us about your space and intention. We'll blueprint a build aligned to your goals.
      </p>

      <form onSubmit={onSubmit} style={{ marginTop: 20, display: "grid", gap: 14 }}>
        <div>
          <label style={label}>Name</label>
          <input name="name" required style={input} />
        </div>
        <div>
          <label style={label}>Email</label>
          <input name="email" type="email" required style={input} />
        </div>
        <div>
          <label style={label}>Phone</label>
          <input name="phone" style={input} />
        </div>
        <div>
          <label style={label}>Location (City, State)</label>
          <input name="location" style={input} />
        </div>
        <div>
          <label style={label}>Intent (Wealth / Healing / Clarity / Protection / Legacy)</label>
          <input name="intent" placeholder="e.g., Wealth, Protection" style={input} />
        </div>
        <div>
          <label style={label}>Placement (Dining / Office / Wall / Lighting / Meditation)</label>
          <input name="placement" style={input} />
        </div>
        <div>
          <label style={label}>Dimensions / Area</label>
          <input name="dimensions" placeholder='e.g., 84" x 40" top' style={input} />
        </div>
        <div>
          <label style={label}>Materials / Geometry (optional)</label>
          <input name="materials" placeholder="Walnut, Copper, Quartz, Octagon" style={input} />
        </div>
        <div>
          <label style={label}>Budget</label>
          <input name="budget" placeholder="$5k–$10k" style={input} />
        </div>
        <div>
          <label style={label}>Desired Timeline</label>
          <input name="timeframe" placeholder="ASAP / 1–2 months" style={input} />
        </div>
        <div>
          <label style={label}>Notes / Vision</label>
          <textarea name="notes" rows={5} style={{ ...input, resize: "vertical" }} />
        </div>

        <button style={{ background: "#C6A746", color: "#111", padding: "12px 18px", fontWeight: 700, borderRadius: 12 }}>Send Blueprint</button>
        {msg && <div style={{ color: "#cfcfcf" }}>{msg}</div>}
      </form>
    </main>
  );
}
