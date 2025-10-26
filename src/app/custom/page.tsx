"use client";

import { useState } from "react";
import Link from "next/link";

type ItemType =
  | "Dining Table"
  | "Coffee Table"
  | "Conference Table"
  | "Desk"
  | "Wall Panel"
  | "Wall Light"
  | "Console"
  | "Bar Table";

type Wood =
  | "Walnut"
  | "White Oak"
  | "Red Oak"
  | "Maple"
  | "Cherry"
  | "Ash"
  | "Bubinga"
  | "Sapele"
  | "Mahogany";

type River = "None" | "Clear Resin River" | "Tinted Resin River";

type Edge = "Live" | "Straight / Chamfered";

type Finish = "Oil-Wax" | "Matte" | "Satin" | "High-Gloss";

type Metal =
  | "None"
  | "Copper"
  | "Brass"
  | "Bronze"
  | "Gold (24k leaf/inlay)"
  | "Stainless";

type Crystal =
  | "None"
  | "Quartz"
  | "Selenite"
  | "Amethyst"
  | "Citrine"
  | "Labradorite"
  | "Shungite";

export default function CustomConfiguratorPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
    itemType: "Dining Table" as ItemType,
    wood: "Walnut" as Wood,
    river: "None" as River,
    edge: "Live" as Edge,
    length: 84,
    width: 40,
    thickness: 1.75,
    metal: "None" as Metal,
    crystal: "None" as Crystal,
    finish: "Satin" as Finish,
    intent: "Luxury / Signature",
    notes: "",
  });

  function update<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "custom-configurator", ...form }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setMsg(
        "✅ Thanks! We received your blueprint. A Strion specialist will follow up with pricing & lead time."
      );
    } catch (err: any) {
      console.error("Lead submit error:", err);
      setMsg("❌ Something went wrong submitting your request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const wrap: React.CSSProperties = {
    maxWidth: 960,
    margin: "0 auto",
    padding: "24px",
    color: "#e7d38c",
  };

  const card: React.CSSProperties = {
    background: "#0b0b0b",
    border: "1px solid #2c2c2c",
    borderRadius: 16,
    padding: 24,
  };

  const row: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  };

  const label: React.CSSProperties = { fontSize: 14, opacity: 0.85, marginBottom: 6 };
  const input: React.CSSProperties = {
    background: "#111",
    border: "1px solid #2a2a2a",
    color: "#eaeaea",
    padding: "12px 14px",
    borderRadius: 10,
    width: "100%",
  };

  const h1: React.CSSProperties = { fontSize: 28, fontWeight: 700, margin: "8px 0 16px" };
  const sub: React.CSSProperties = { opacity: 0.8, marginBottom: 20 };

  return (
    <div style={wrap}>
      <header style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
        <Link href="/" style={{ textDecoration: "none", color: "#e7d38c" }}>
          ← Home
        </Link>
        <span style={{ opacity: 0.5 }}>/</span>
        <span>Custom</span>
      </header>

      <h1 style={h1}>Design Your Strion Piece</h1>
      <p style={sub}>
        Build a starting blueprint for your custom commission. We’ll review and reply with a tailored
        quote and timeline. Nothing is final until you approve.
      </p>

      <form style={card} onSubmit={submit} noValidate>
        <div style={row}>
          <div>
            <div style={label}>Your Name</div>
            <input
              style={input}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
              placeholder="Full name"
            />
          </div>
          <div>
            <div style={label}>Email</div>
            <input
              style={input}
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
              placeholder="you@email.com"
            />
          </div>
        </div>

        <div style={{ height: 14 }} />

        <div style={row}>
          <div>
            <div style={label}>City</div>
            <input
              style={input}
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="City"
            />
          </div>
          <div>
            <div style={label}>State</div>
            <input
              style={input}
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              placeholder="State"
            />
          </div>
        </div>

        <div style={{ height: 24 }} />

        <div style={row}>
          <div>
            <div style={label}>Item Type</div>
            <select
              style={input}
              value={form.itemType}
              onChange={(e) => update("itemType", e.target.value as ItemType)}
            >
              {[
                "Dining Table",
                "Coffee Table",
                "Conference Table",
                "Desk",
                "Wall Panel",
                "Wall Light",
                "Console",
                "Bar Table",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>

          <div>
            <div style={label}>Primary Wood</div>
            <select
              style={input}
              value={form.wood}
              onChange={(e) => update("wood", e.target.value as Wood)}
            >
              {[
                "Walnut",
                "White Oak",
                "Red Oak",
                "Maple",
                "Cherry",
                "Ash",
                "Bubinga",
                "Sapele",
                "Mahogany",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ height: 16 }} />

        <div style={row}>
          <div>
            <div style={label}>River / Resin</div>
            <select
              style={input}
              value={form.river}
              onChange={(e) => update("river", e.target.value as River)}
            >
              {["None", "Clear Resin River", "Tinted Resin River"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>

          <div>
            <div style={label}>Edge</div>
            <select
              style={input}
              value={form.edge}
              onChange={(e) => update("edge", e.target.value as Edge)}
            >
              {["Live", "Straight / Chamfered"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ height: 16 }} />

        <div style={row}>
          <div>
            <div style={label}>Length (inches)</div>
            <input
              style={input}
              type="number"
              min={12}
              value={form.length}
              onChange={(e) => update("length", Number(e.target.value))}
            />
          </div>
          <div>
            <div style={label}>Width (inches)</div>
            <input
              style={input}
              type="number"
              min={12}
              value={form.width}
              onChange={(e) => update("width", Number(e.target.value))}
            />
          </div>
        </div>

        <div style={{ height: 16 }} />

        <div style={row}>
          <div>
            <div style={label}>Thickness (inches)</div>
            <input
              style={input}
              type="number"
              step="0.25"
              min={1}
              value={form.thickness}
              onChange={(e) => update("thickness", Number(e.target.value))}
            />
          </div>

          <div>
            <div style={label}>Metal Accents</div>
            <select
              style={input}
              value={form.metal}
              onChange={(e) => update("metal", e.target.value as Metal)}
            >
              {["None", "Copper", "Brass", "Bronze", "Gold (24k leaf/inlay)", "Stainless"].map(
                (v) => (
                  <option key={v}>{v}</option>
                )
              )}
            </select>
          </div>
        </div>

        <div style={{ height: 16 }} />

        <div style={row}>
          <div>
            <div style={label}>Crystal / Energetic</div>
            <select
              style={input}
              value={form.crystal}
              onChange={(e) => update("crystal", e.target.value as Crystal)}
            >
              {["None", "Quartz", "Selenite", "Amethyst", "Citrine", "Labradorite", "Shungite"].map(
                (v) => (
                  <option key={v}>{v}</option>
                )
              )}
            </select>
          </div>

          <div>
            <div style={label}>Finish</div>
            <select
              style={input}
              value={form.finish}
              onChange={(e) => update("finish", e.target.value as Finish)}
            >
              {["Oil-Wax", "Matte", "Satin", "High-Gloss"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ height: 16 }} />

        <div>
          <div style={label}>Project Intent (optional)</div>
          <input
            style={input}
            value={form.intent}
            onChange={(e) => update("intent", e.target.value)}
            placeholder="Luxury / Signature, Healing, Prosperity, etc."
          />
        </div>

        <div style={{ height: 16 }} />

        <div>
          <div style={label}>Notes</div>
          <textarea
            style={{ ...input, minHeight: 120, resize: "vertical" }}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Room size, seating, vibe, deadlines, budget window..."
          />
        </div>

        <div style={{ height: 20 }} />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#a4892f",
            color: "#0b0b0b",
            border: "none",
            borderRadius: 10,
            padding: "12px 18px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "Sending..." : "Request Quote"}
        </button>

        {msg && (
          <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.4 }}>
            {msg}
          </div>
        )}
      </form>
    </div>
  );
}
