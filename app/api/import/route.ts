import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const ADMIN_PIN = process.env.ADMIN_PIN!;

// Hanya link Shopee yang boleh dibuka
const ALLOWED_HOST = /(^|\.)(shopee\.[a-z.]+|shope\.ee|shp\.ee)$/i;

type Item = {
  url: string;
  ok: boolean;
  title: string;
  description: string;
  image: string;
  price: string;
};

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

function meta(html: string, key: string): string {
  const a = new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]*content=["']([^"']*)["']`, "i").exec(html);
  if (a) return decode(a[1]);
  const b = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${key}["']`, "i").exec(html);
  return b ? decode(b[1]) : "";
}

const rupiah = (n: number) => "Rp " + Math.round(n).toLocaleString("id-ID");

async function scrape(url: string): Promise<Item> {
  const empty: Item = { url, ok: false, title: "", description: "", image: "", price: "" };
  try {
    const u = new URL(url);
    if (!/^https?:$/.test(u.protocol) || !ALLOWED_HOST.test(u.hostname)) return empty;

    const r = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36",
        "Accept-Language": "id-ID,id;q=0.9",
      },
    });
    if (!r.ok) return empty;
    const html = (await r.text()).slice(0, 600000);

    let title = meta(html, "og:title") || meta(html, "twitter:title");
    if (!title) {
      const t = /<title[^>]*>([^<]*)<\/title>/i.exec(html);
      title = t ? decode(t[1]) : "";
    }
    title = title.replace(/\s*\|\s*Shopee.*$/i, "").replace(/^Jual\s+/i, "").trim();

    const description = meta(html, "og:description") || meta(html, "description");
    const image = meta(html, "og:image") || meta(html, "twitter:image");

    let price = "";
    const amount = meta(html, "product:price:amount") || meta(html, "og:price:amount");
    const n = Number(amount.replace(/[^0-9.]/g, ""));
    if (amount && n > 0) price = rupiah(n);

    const ok = !!(title || image);
    return { url, ok, title, description: description.slice(0, 300), image, price };
  } catch {
    return empty;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.pin !== ADMIN_PIN) {
      return NextResponse.json({ ok: false, error: "PIN salah" }, { status: 401 });
    }
    const urls: string[] = (Array.isArray(body.urls) ? body.urls : [])
      .map((x: unknown) => String(x).trim())
      .filter(Boolean)
      .slice(0, 10);

    const items = await Promise.all(urls.map((u) => scrape(u)));
    return NextResponse.json({ ok: true, items });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}