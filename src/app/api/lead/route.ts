// src/app/api/lead/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  // For now, just log it to the server console
  console.log("New STRION lead:", payload);

  // Later we can email you automatically or save to Airtable/Notion here.
  return NextResponse.json({ ok: true });
}
