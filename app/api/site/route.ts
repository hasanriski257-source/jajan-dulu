
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SB_URL = process.env.SUPABASE_URL!;
const SB_KEY = process.env.SUPABASE_SERVICE_KEY!;
const ADMIN_PIN = process.env.ADMIN_PIN!;
const BUCKET = "produk";

const H = {
  apikey: SB_KEY,
  Authorization: `Bearer ${SB_KEY}`,
  "Content-Type": "application/json",
};

async function read() {
  const r = await fetch(`${SB_URL}/rest/v1/site_data?id=eq.main&select=data`, { headers: H, cache: "no-store" });
  if (!r.ok) throw new Error("read failed");
  const rows = await r.json();
  return rows[0]?.data ?? null;
}

async function write(data: unknown) {
  const r = await fetch(`${SB_URL}/rest/v1/site_data`, {
    method: "POST",
    headers: { ...H, Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify({ id: "main", data }),
  });
  if (!r.ok) throw new Error("write failed");
}

export async function GET() {
  try {
    return NextResponse.json({ data: await read() });
  } catch {
    return NextResponse.json({ data: null, error: true }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.action === "verify") {
      return NextResponse.json({ ok: body.pin === ADMIN_PIN });
    }

    // Upload foto ke Supabase Storage, kembalikan link publiknya
    if (body.action === "upload") {
      if (body.pin !== ADMIN_PIN) return NextResponse.json({ ok: false, error: "PIN salah" }, { status: 401 });
      const m = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(String(body.image ?? ""));
      if (!m) return NextResponse.json({ ok: false, error: "Format foto tidak valid" }, { status: 400 });

      const mime = m[1];
      const ext = mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const bytes = new Uint8Array(Buffer.from(m[2], "base64"));

      const r = await fetch(`${SB_URL}/storage/v1/object/${BUCKET}/${path}`, {
        method: "POST",
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": mime },
        body: bytes,
      });
      if (!r.ok) return NextResponse.json({ ok: false, error: "Upload gagal" }, { status: 500 });

      return NextResponse.json({ ok: true, url: `${SB_URL}/storage/v1/object/public/${BUCKET}/${path}` });
    }

    if (body.action === "save") {
      if (body.pin !== ADMIN_PIN) return NextResponse.json({ ok: false, error: "PIN salah" }, { status: 401 });
      const current = await read();
      await write({ ...body.data, requests: current?.requests ?? body.data.requests ?? [] });
      return NextResponse.json({ ok: true });
    }

    if (body.action === "request") {
      const message = String(body.message ?? "").trim().slice(0, 200);
      const name = String(body.name ?? "").trim().slice(0, 40) || "Anonim";
      if (!message) return NextResponse.json({ ok: false }, { status: 400 });
      const current = (await read()) ?? {};
      const item = { id: Date.now().toString(), name, message, date: new Date().toISOString() };
      await write({ ...current, requests: [item, ...(current.requests ?? [])].slice(0, 30) });
      return NextResponse.json({ ok: true, item });
    }

    return NextResponse.json({ ok: false }, { status: 400 });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}